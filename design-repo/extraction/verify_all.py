#!/usr/bin/env python3
"""One-shot verification of this design-repo. Exit 1 on any failed check.

    python3 extraction/verify_all.py [--quiet]

Checks (each prints PASS/FAIL/WARN):
  SCHEMAS            Draft-07 meta-validation of pagespec + section-contract schemas; every contract validates; id/semantic/source split
  EXAMPLES           every reference + generated example: schema + semantic validator, 0 errors; >=1 reference example per template;
                     a generated example for every template (so every template family is covered)
  ROUTE_COVERAGE     every served route mapped exactly once; (sibling) routes.json == src/data/routes.txt + '/menu/', and every route's
                     template == a re-derivation from the clone's own route tables (src/pages/*/routes.jsx + data files)
  TEMPLATES          template routeCount == routes.json; node sections/variants exist; chrome options cover the routes' measured chrome
  ALLOWLIST_PARITY   allowlist ids == primitives/components/sections files; section 'settable' == contract + schema; version parity
  GRAPH_AGREEMENT    compatibility/graph.json rule ids/severity == semantic_validate.GRAPH_RULES_IMPLEMENTED and its err()/warn() calls
  PINS               availability + forbidden-all-modes + retrieval + hero-less pins: this file == semantic_validate == registries
  TOKENS             catalog == regenerated from tokens/ files; policy categories/values exist; (sibling) tailwind colours == tokens
  MOTION             every contract motion pattern exists with the same fallback; schema motion patterns == motion-patterns.json
  SOURCE_PROVENANCE  (sibling) every contract source: <tag> at tagLine and the anchor text at anchorLine of the real file
  CITATIONS          (sibling) every path:line[-line] citation resolves; every token's `match` text is on its cited line
  ASSET_REFS         (sibling) every reference-example local asset ref exists under public/
  COUNTS             registry.manifest.json counts == recomputed; README counts block == manifest
  ENTRYPOINTS        every entry point exists and is inside this folder
  WRAPPER_GATE       extraction/wrapper_gate.py (R9)
  HYGIENE            no absolute machine paths, no junk files
"(sibling)" checks need the clone project around this folder; standalone they WARN instead of failing.
"""
import importlib.util, json, re, sys

sys.dont_write_bytecode = True  # never leave __pycache__ inside the package
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
PROJECT = REPO.parent
SIBLING = (PROJECT / "src").is_dir() and (PROJECT / "package.json").exists()
QUIET = "--quiet" in sys.argv

# pins, duplicated on purpose (independent of the registries and of semantic_validate.py)
PINNED_AVAILABILITY = {
    "brand.wordmark": "reference-only", "product.screenshot": "reference-only", "illustration.brand": "reference-only", "video.product": "reference-only",
    "content.cover": "reference-only", "icon.source": "reference-only",
    "customer.logo": "blocked-for-generation", "partner.logo": "blocked-for-generation", "person.photo": "blocked-for-generation", "rating.badge": "blocked-for-generation",
    "analyst.mark": "blocked-for-generation", "photo.real-scene": "blocked-for-generation", "store.badge": "blocked-for-generation",
    "brand.placeholder-mark": "generation-safe", "brand.user-supplied-mark": "generation-safe", "customer.placeholder-logo": "generation-safe",
    "partner.placeholder-icon": "generation-safe", "person.fictional-avatar": "generation-safe", "rating.placeholder": "generation-safe",
    "product.generated-visual": "generation-safe", "illustration.generated": "generation-safe", "video.placeholder-poster": "generation-safe",
    "content.generated-cover": "generation-safe", "icon.generic": "generation-safe", "photo.generated-scene": "generation-safe",
    "link.site-route": "reference-only", "link.source-external": "blocked-for-generation", "link.live-endpoint": "blocked-for-generation", "link.placeholder": "generation-safe",
    "copy.source-verbatim": "reference-only", "copy.clone-placeholder": "reference-only", "copy.source-longform": "blocked-for-generation", "copy.original": "generation-safe",
}
PINNED_FORBIDDEN_ALL_MODES = {"store.badge", "link.live-endpoint", "copy.source-longform"}
RETRIEVAL_INELIGIBLE = {"shell.banner", "shell.nav-dropdowns", "shell.section-nav", "cta.twins-modal", "interactive.toc-sheet", "interactive.video-modal",
                        "pricing.sticky-plan-bar", "article.contents-nav", "legal.on-this-page"}
RUNTIME_UI_HINT = re.compile(r"(cookie|consent|banner|modal|dialog|drawer|sheet|overlay|preloader|cursor|ticker|toast|popover|dropdown|tooltip|sticky.?plan|on-this-page|contents-nav|section-nav)", re.I)
HEROLESS_TEMPLATES = {"T7", "T12", "T16", "T17", "T18", "T19", "T20", "T21", "T22", "T23", "T24", "T25", "T29", "T32", "T35", "T36", "T37", "T38"}

RESULTS = []


def rec(name, errors, warnings=(), info=""):
    RESULTS.append((name, "FAIL" if errors else ("WARN" if warnings else "PASS"), list(errors), list(warnings), info))


def J(rel):
    return json.loads((REPO / rel).read_text())


def import_file(name, rel):
    spec = importlib.util.spec_from_file_location(name, REPO / rel)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


sv = import_file("semantic_validate", "schema/semantic_validate.py")
wg = import_file("wrapper_gate", "extraction/wrapper_gate.py")
repo = sv.load_repo()
contracts, templates, schema = repo["contracts"], repo["templates"], repo["schema"]
routes_doc = repo["routes"]
manifest = J("registry.manifest.json")
slug = lambda r: "home" if r == "/" else r.strip("/").replace("/", "--")

# ---------------------------------------------------------------- SCHEMAS
errs = []
try:
    from jsonschema import Draft7Validator
    Draft7Validator.check_schema(schema)
    cs = J("schema/section-contract.schema.json")
    Draft7Validator.check_schema(cs)
    cv = Draft7Validator(cs)
    for sid, c in contracts.items():
        for e in cv.iter_errors(c):
            errs.append(f"sections/{sid}.json: {'/'.join(map(str, e.path))}: {e.message[:160]}")
        if c["id"] != sid or c["semantic"]["id"] != sid:
            errs.append(f"sections/{sid}.json: id/semantic.id must equal the file stem")
        if c["source"]["id"] == sid:
            errs.append(f"sections/{sid}.json: source.id must not equal the semantic id")
    rec("SCHEMAS", errs, info=f"{len(contracts)} contracts validated against section-contract.schema.json")
except ImportError:
    rec("SCHEMAS", ["jsonschema not installed (pip install jsonschema)"])

# ---------------------------------------------------------------- EXAMPLES
errs, warns = [], []
ex_files = sorted((REPO / "schema/examples").rglob("*.json")) + [REPO / "schema/example.pagespec.json"]
modes = {"reference": 0, "generated": 0}
ref_t, gen_t = set(), set()
for f in ex_files:
    spec = json.loads(f.read_text())
    E, W = sv.validate(spec, repo)
    modes[spec.get("mode")] = modes.get(spec.get("mode"), 0) + 1
    errs += [f"{f.relative_to(REPO)}: {r}: {m}" for r, m in E]
    warns += [f"{f.relative_to(REPO)}: {r}: {m}" for r, m in W if r not in ("CTA_CLOSES_PAGE",)]
    if "generated" in f.parts:
        gen_t.add(spec.get("template"))
        if spec.get("mode") != "generated":
            errs.append(f"{f.relative_to(REPO)} is under examples/generated but mode != generated")
    elif "reference" in f.parts:
        ref_t.add(spec.get("template"))
        if spec.get("mode") != "reference" or f.stem.replace(".pagespec", "") != slug(spec["route"]):
            errs.append(f"{f.name}: reference example must be mode reference and named after its route")
if set(templates) - gen_t:
    errs.append(f"templates without a generation-safe example: {sorted(set(templates) - gen_t)}")
if set(templates) - ref_t:
    errs.append(f"templates without a reference example: {sorted(set(templates) - ref_t)}")
fam_gen = {templates[t]["family"] for t in gen_t if t in templates}
if fam_gen != {t["family"] for t in templates.values()}:
    errs.append("some template family has no generated example")
rec("EXAMPLES", errs, warns, info=f"{len(ex_files)} examples ({modes}); {len(ref_t)} templates with reference, {len(gen_t)} with generated examples")

# ---------------------------------------------------------------- ROUTE_COVERAGE
errs, warns = [], []
paths = [r["path"] for r in routes_doc["routes"]]
dups = {p for p in paths if paths.count(p) > 1}
if dups:
    errs.append(f"routes mapped more than once: {sorted(dups)[:5]}")
for r in routes_doc["routes"]:
    if r["template"] not in templates:
        errs.append(f"{r['path']} -> unknown template {r['template']}")
if routes_doc["fallback"]["template"] not in templates:
    errs.append("fallback template missing")


def derive_template(p, L):
    """mirror of the clone's route tables (react-router ranks static segments above :params)."""
    s = [x for x in p.strip("/").split("/") if x]
    if not s:
        return "T0"
    j = "/".join(s)
    if j in L["static"]:
        return L["static"][j]
    if s[0] == "blog" and len(s) == 2:
        return "T16" if s[1] in L["tags"] else "T17"
    if s[0] == "changelog" and len(s) == 3 and s[1] == "category" and s[2] in L["cats"]:
        return "T18"
    if s[0] == "changelog" and len(s) == 2:
        return "T19"
    if s[0] in L["hubs"] and len(s) == 2:
        return "T21"
    if s[0] == "guides" and len(s) == 2:
        return "T21"
    if s[0] == "contributors" and len(s) == 2:
        return "T25"
    if s[0] == "customers" and len(s) == 2:
        return "T27"
    if s[0] == "events" and len(s) == 2:
        return "T29"
    return "T38"


if SIBLING:
    rd = lambda rel: (PROJECT / rel).read_text()
    listed = set(rd("src/data/routes.txt").split())
    want = listed | {"/menu/"}
    if set(paths) != want:
        errs.append(f"routes.json drifted from src/data/routes.txt + /menu/: missing {sorted(want - set(paths))[:5]}, extra {sorted(set(paths) - want)[:5]}")
    lst = lambda name, txt: re.findall(r"'([a-z0-9-]+)'", re.search(name + r"\s*=\s*\[(.*?)\]", txt, re.S).group(1))
    legal = rd("src/pages/legal/routes.jsx")
    L = {"static": {"menu": "T37", "pricing": "T5", "enterprise": "T4", "deploy": "T6", "launch/suns-out": "T14", "the-best-never-guess": "T13", "contact-sales": "T7", "request-a-demo": "T7",
                    "roi-calculator": "T10", "quiz": "T11", "ux-research-plan-template": "T9", "user-persona-template": "T9", "research-report-template": "T9", "legal": "T35",
                    "research-maturity-assessment": "T21", "customers": "T26", "events": "T28", "webinars": "T28", "live-demos": "T30", "resources": "T31",
                    "resources/industry-reports/2025-forrester-TEI-of-Dovetail": "T32", "resources/dovetail-review": "T22", "resources/insight7-alternatives": "T22",
                    "careers": "T33", "b2bsaasy": "T34", "aws-summit-sydney-2026": "T15", "blog": "T16", "changelog": "T18", "guides": "T23", "contributors": "T24"},
         "tags": lst("TAG_SLUGS", rd("src/pages/blog/routes.jsx")),
         "hubs": lst("HUBS", rd("src/pages/guides/data.js")),
         "cats": [c["path"].strip("/").split("/")[-1] for c in json.loads(rd("src/data/content/changelog.json"))["categories"] if c["path"] != "/changelog/"]}
    for c in lst("COMPETITORS", legal):
        L["static"][f"dovetail-vs-{c}"] = "T8"
    for d in lst("LEGAL_DOCS", legal):
        L["static"][f"legal/{d}"] = "T36"
    for d in lst("PRIVACY_DOCS", legal):
        L["static"][f"privacy/{d}"] = "T36"
    for c in lst("RESOURCE_ARTICLES", legal):
        L["static"][f"resources/dovetail-vs-{c}"] = "T22"
    for h in L["hubs"]:
        L["static"][h] = "T20"
    for f in (PROJECT / "src/data/marketing").glob("*.json"):
        d = json.loads(f.read_text())
        tm = {"product": "T1", "roles": "T2", "solutions": "T3", "quiz": "T12", "enterprise-article": "T21"}.get(d.get("template"))
        if tm:
            L["static"][d["url"].strip("/")] = tm
    mism = [(r["path"], r["template"], derive_template(r["path"], L)) for r in routes_doc["routes"] if derive_template(r["path"], L) != r["template"]]
    if mism:
        errs.append(f"{len(mism)} routes disagree with the template re-derived from the clone's route tables: {mism[:5]}")
    if derive_template(routes_doc["fallback"]["probedWith"], L) != routes_doc["fallback"]["template"]:
        errs.append("the 404 probe path is matched by a route table")
else:
    warns.append("no sibling clone source: routes.txt / route-table drift not checked")
rec("ROUTE_COVERAGE", errs, warns, info=f"{len(paths)} routes mapped once, fallback {routes_doc['fallback']['template']}")

# ---------------------------------------------------------------- TEMPLATES
errs = []
mv = J("extraction/measured-values.json")
for tid, t in templates.items():
    n = sum(1 for r in routes_doc["routes"] if r["template"] == tid)
    if t["routeCount"] != n:
        errs.append(f"{tid}.routeCount {t['routeCount']} != routes.json {n}")
    for nd in t["nodes"]:
        if nd["section"] not in contracts:
            errs.append(f"{tid} references unknown section {nd['section']}")
            continue
        for v in nd.get("variants", []):
            if v not in contracts[nd["section"]]["variants"]:
                errs.append(f"{tid}: {nd['section']} has no variant {v}")
for r in routes_doc["routes"]:
    t = templates.get(r["template"])
    for k in ("banner", "nav", "footer"):
        if t and r["chrome"][k] not in t["chrome"][k]:
            errs.append(f"{r['path']}: chrome {k}={r['chrome'][k]} not allowed by {r['template']}")
    m = mv["sectionHeights"]["routes"].get(r["path"])
    if m and m["chrome"] != r["chrome"]:
        errs.append(f"{r['path']}: routes.json chrome != measured chrome")
    if t and r["theme"] != t["theme"]:
        errs.append(f"{r['path']}: theme != template theme")
rec("TEMPLATES", errs, info=f"{len(templates)} templates")

# ---------------------------------------------------------------- ALLOWLIST_PARITY
errs = []
al = repo["allowlist"]
files = {}
for d, kind in (("primitives", "primitive"), ("components", "component"), ("sections", "section")):
    for p in (REPO / d).glob("*.json"):
        files[json.loads(p.read_text())["id"]] = (kind, f"{d}/{p.name}")
ids = [e["id"] for e in al["entries"]]
if len(ids) != len(set(ids)):
    errs.append("duplicate allowlist ids")
for e in al["entries"]:
    if e["id"] not in files:
        errs.append(f"phantom allowlist entry {e['id']} (no contract file)")
    elif files[e["id"]] != (e["kind"], e["file"]):
        errs.append(f"allowlist {e['id']}: kind/file {e['kind']}/{e['file']} != {files[e['id']]}")
for i in files:
    if i not in ids:
        errs.append(f"orphan contract {i} has no allowlist entry")
for e in al["entries"]:
    if e["kind"] != "section" or e["id"] not in contracts:
        continue
    c = contracts[e["id"]]
    want = {"variant": sorted(c["variants"]), "content": sorted(schema["definitions"][f"content.{e['id']}"]["properties"]), "style": sorted(c["style"]["props"]),
            "motion": c["motion"]["allowedPatterns"], "assetRoles": c["generatedAssetRoles"]}
    if e.get("settable") != want:
        errs.append(f"allowlist {e['id']} settable drifted from contract/schema: {e.get('settable')} != {want}")
    if e.get("retrievalEligible") != c["retrievalEligible"]:
        errs.append(f"allowlist {e['id']} retrievalEligible != contract")
if manifest.get("allowlistVersion") != al.get("version"):
    errs.append(f"manifest allowlistVersion {manifest.get('allowlistVersion')} != allowlist version {al.get('version')}")
if manifest.get("pageSpecVersion") != schema["properties"]["pageSpecVersion"]["const"]:
    errs.append("manifest pageSpecVersion != schema const")
rec("ALLOWLIST_PARITY", errs, info=f"{len(ids)} entries == {len(files)} contract files")

# ---------------------------------------------------------------- GRAPH_AGREEMENT
gids = {r["id"] for r in repo["graph"]["rules"]}
errs = []
if gids != sv.GRAPH_RULES_IMPLEMENTED:
    errs.append(f"graph rules not implemented: {sorted(gids - sv.GRAPH_RULES_IMPLEMENTED)}; implemented but undocumented: {sorted(sv.GRAPH_RULES_IMPLEMENTED - gids)}")
src_sv = (REPO / "schema/semantic_validate.py").read_text()
for r in repo["graph"]["rules"]:
    if f'err("{r["id"]}"' not in src_sv and f'warn("{r["id"]}"' not in src_sv:
        errs.append(f"graph rule {r['id']} has no err()/warn() call in semantic_validate.py")
    sev = "warn" if f'warn("{r["id"]}"' in src_sv else "error"
    if sev != r.get("severity"):
        errs.append(f"rule {r['id']}: graph severity {r.get('severity')} != validator {sev}")
one = next((r for r in repo["graph"]["rules"] if r["id"] == "ONE_HERO"), {})
if set(one.get("exceptions", [])) != HEROLESS_TEMPLATES:
    errs.append("graph ONE_HERO exceptions != pinned hero-less templates")
rec("GRAPH_AGREEMENT", errs, info=f"{len(gids)} rules")

# ---------------------------------------------------------------- PINS
errs = []
roles = repo["roles"]["roles"]
for a, b, name in ((PINNED_AVAILABILITY, sv.PINNED_AVAILABILITY, "PINNED_AVAILABILITY"), (PINNED_FORBIDDEN_ALL_MODES, sv.PINNED_FORBIDDEN_ALL_MODES, "PINNED_FORBIDDEN_ALL_MODES"),
                   (RETRIEVAL_INELIGIBLE, sv.RETRIEVAL_INELIGIBLE, "RETRIEVAL_INELIGIBLE"), (HEROLESS_TEMPLATES, sv.HEROLESS_TEMPLATES, "HEROLESS_TEMPLATES")):
    if a != b:
        errs.append(f"{name} differs between verify_all and semantic_validate")
hero_less = {tid for tid, t in templates.items() if not any(contracts[n["section"]]["semantic"]["category"] == "HERO" for n in t["nodes"] if n["section"] in contracts)}
if hero_less != HEROLESS_TEMPLATES:
    errs.append(f"hero-less templates computed from templates.json {sorted(hero_less)} != pinned {sorted(HEROLESS_TEMPLATES)}")
for rid, av in PINNED_AVAILABILITY.items():
    if roles.get(rid, {}).get("availability") != av:
        errs.append(f"asset role {rid}: registry {roles.get(rid, {}).get('availability')!r} != pinned {av!r}")
for rid, d in roles.items():
    if rid not in PINNED_AVAILABILITY:
        errs.append(f"asset role {rid} not pinned")
    if d.get("availability") != "generation-safe":
        subs = d.get("generationSafeSubstitutes") or []
        if not subs or any(PINNED_AVAILABILITY.get(s) != "generation-safe" for s in subs):
            errs.append(f"asset role {rid}: generationSafeSubstitutes must be non-empty and generation-safe")
    if rid in PINNED_FORBIDDEN_ALL_MODES and not d.get("forbiddenInAllModes"):
        errs.append(f"asset role {rid} lost forbiddenInAllModes")
for rid in ("customer.logo", "person.photo", "rating.badge", "analyst.mark", "partner.logo"):
    if roles.get(rid, {}).get("generationPolicy") != "must-not-fabricate":
        errs.append(f"{rid} must stay pinned to generationPolicy must-not-fabricate")
if roles.get("link.live-endpoint", {}).get("generationPolicy") != "must-not-reuse-live-endpoint":
    errs.append("link.live-endpoint must stay pinned to must-not-reuse-live-endpoint")
if set(schema["definitions"]["assetRole"]["enum"]) != {r for r, d in roles.items() if d["kind"] == "media"}:
    errs.append("schema assetRole enum != media roles in assets/asset-roles.json")
for sid, c in contracts.items():
    for gr in c["generatedAssetRoles"]:
        if PINNED_AVAILABILITY.get(gr) != "generation-safe":
            errs.append(f"{sid}: generatedAssetRoles contains non-generation-safe {gr}")
    if c["retrievalEligible"] is not (sid not in RETRIEVAL_INELIGIBLE):
        errs.append(f"{sid}: retrievalEligible {c['retrievalEligible']} contradicts the pin")
    if RUNTIME_UI_HINT.search(sid + " " + c["title"]) and sid not in RETRIEVAL_INELIGIBLE:
        errs.append(f"{sid} looks like runtime UI but is not pinned retrieval-ineligible")
errs += [f"{r}: {m}" for r, m in sv.registry_pin_errors(repo)]
rec("PINS", errs, info=f"{len(PINNED_AVAILABILITY)} roles, {len(RETRIEVAL_INELIGIBLE)} retrieval-ineligible sections, {len(HEROLESS_TEMPLATES)} hero-less templates")

# ---------------------------------------------------------------- TOKENS
errs, warns = [], []
cat = repo["catalog"]
regen = {}
for p in sorted((REPO / "tokens/00-foundation").glob("*.json")):
    if p.name == "motion-patterns.json":
        continue
    for k, v in json.loads(p.read_text())["tokens"].items():
        regen[k] = {"value": v["value"], "category": v["category"]}
for k, v in J("tokens/30-layout/layout.json")["tokens"].items():
    regen[k] = {"value": v["value"], "category": v["category"]}
SEM = J("tokens/10-semantic/semantic.json")["tokens"]
for rel in ("tokens/10-semantic/semantic.json", "tokens/20-component/component.json"):
    for k, ref in J(rel)["tokens"].items():
        tgt = regen.get(ref) or regen.get(SEM.get(ref, ""))
        if tgt is None:
            errs.append(f"{rel}: {k} -> {ref} does not resolve to a foundation token")
            continue
        regen[k] = {"value": "{" + ref + "}", "category": tgt["category"]}
for th in (REPO / "tokens/themes").glob("*.json"):
    for k, ref in json.loads(th.read_text())["tokens"].items():
        if k not in SEM or ref not in regen:
            errs.append(f"{th.name}: {k} -> {ref} is not a semantic role resolving to a foundation token")
if {k: {"value": v["value"], "category": v["category"]} for k, v in cat.items()} != regen:
    diff = sorted(set(cat) ^ set(regen)) or sorted(k for k in cat if regen.get(k) != {"value": cat[k]["value"], "category": cat[k]["category"]})
    errs.append(f"token-catalog drifted from tokens/ files: {diff[:8]}")
if J("tokens/llm/token-catalog.json").get("count") != len(cat):
    errs.append("token-catalog count field != number of tokens")
pol = repo["policy"]
cats = {v["category"] for v in cat.values()}
if set(pol["categories"]) != cats:
    errs.append(f"policy categories {sorted(pol['categories'])} != catalog categories {sorted(cats)}")
for ck in pol["rawValueRestrictions"]:
    if ck not in cats:
        errs.append(f"policy rawValueRestrictions key {ck!r} is not a catalog category")
for prop, d in pol["styleProps"].items():
    for ck in d["categories"]:
        if ck not in cats:
            errs.append(f"styleProps.{prop} category {ck} not in catalog")
    for sid, vals in d["allowedBySection"].items():
        if sid not in contracts or contracts[sid]["style"]["props"].get(prop, {}).get("allowed") != vals:
            errs.append(f"styleProps.{prop}.{sid} != contract style props")
        for v in vals:
            if v not in cat or cat[v]["category"] not in d["categories"]:
                errs.append(f"styleProps.{prop}: {v} not a catalog token of {d['categories']}")
if pol["themes"] != manifest["schemaValidatedThemes"] or schema["properties"]["theme"]["enum"] != pol["themes"] or sorted(p.stem for p in (REPO / "tokens/themes").glob("*.json")) != sorted(pol["themes"]):
    errs.append("themes differ between token-policy, manifest, schema and tokens/themes/")
for key in ("token-catalog.json", "token-policy.json", "component-allowlist.json", "motion-patterns.json"):
    if not any(str(v).endswith(key) for v in manifest["entryPoints"].values()):
        errs.append(f"{key} not registered in registry.manifest.json entryPoints")
if SIBLING:
    tw = (PROJECT / "tailwind.config.js").read_text()
    for k, v in cat.items():
        if not str(v["value"]).startswith("#"):
            continue
        tok = json.loads((REPO / "tokens/00-foundation/color.json").read_text())["tokens"].get(k)
        if tok and tok["cite"].startswith("tailwind.config.js:"):
            line = tw.split("\n")[int(tok["cite"].split(":")[1]) - 1]
            if v["value"].lower() not in line.lower():
                errs.append(f"{k} = {v['value']} but tailwind.config.js:{tok['cite'].split(':')[1]} is `{line.strip()}`")
else:
    warns.append("no sibling tailwind.config.js: token-vs-source drift not checked")
rec("TOKENS", errs, warns, info=f"{len(cat)} catalog tokens, {len(cats)} categories")

# ---------------------------------------------------------------- MOTION
errs = []
mp = repo["motion"]
for sid, c in contracts.items():
    for p in c["motion"]["allowedPatterns"]:
        if p not in mp:
            errs.append(f"{sid}: motion pattern {p} not in motion-patterns.json")
        elif c["motion"]["reducedMotionFallback"].get(p) != mp[p]["reducedMotionFallback"]:
            errs.append(f"{sid}: reducedMotionFallback for {p} != motion-patterns.json")
    for p in c["motion"]["requiredPatterns"]:
        if p not in c["motion"]["allowedPatterns"]:
            errs.append(f"{sid}: required pattern {p} not allowed")
schema_patterns = {o["properties"]["pattern"]["const"] for o in schema["definitions"]["motion"]["oneOf"]}
if schema_patterns != set(mp):
    errs.append(f"schema motion patterns {sorted(schema_patterns)} != motion-patterns.json {sorted(mp)}")
rec("MOTION", errs, info=f"{len(mp)} patterns")

# ---------------------------------------------------------------- SOURCE_PROVENANCE + CITATIONS + ASSET_REFS
CITE = re.compile(r"((?:src/|specs/|public/)[\w./()\[\]-]+|[A-Z_]+\.md|tailwind\.config\.js|package\.json|index\.html):(\d+)(?:-(\d+))?")
if SIBLING:
    errs, n = [], 0
    for sid, c in contracts.items():
        s = c["source"]
        n += 1
        f = PROJECT / s["file"]
        if not f.exists():
            errs.append(f"{sid}: source file {s['file']} missing")
            continue
        ls = f.read_text().split("\n")
        a, b = map(int, s["lines"].split("-"))
        if not (1 <= a <= b <= len(ls)):
            errs.append(f"{sid}: source range {s['lines']} outside {s['file']} ({len(ls)} lines)")
            continue
        if not (a <= s["tagLine"] <= b) or f"<{s['tag']}" not in ls[s["tagLine"] - 1]:
            errs.append(f"{sid}: <{s['tag']}> not at {s['file']}:{s['tagLine']}")
        if s["anchor"] not in ls[s["anchorLine"] - 1]:
            errs.append(f"{sid}: anchor {s['anchor']!r} not at {s['file']}:{s['anchorLine']}")
    rec("SOURCE_PROVENANCE", errs, info=f"{n} source anchors re-read")
    errs, total = [], 0
    for p in REPO.rglob("*"):
        if p.suffix not in (".json", ".md") or not p.is_file() or p.name in ("source-copy-fingerprints.json",):
            continue
        for m in CITE.finditer(p.read_text()):
            total += 1
            f = PROJECT / m.group(1)
            if not f.exists():
                errs.append(f"{p.relative_to(REPO)}: cites missing file {m.group(1)}")
                continue
            nl = len(f.read_text().split("\n"))
            a, b = int(m.group(2)), int(m.group(3) or m.group(2))
            if not (1 <= a <= b <= nl):
                errs.append(f"{p.relative_to(REPO)}: {m.group(0)} out of range ({nl} lines)")
    matched = 0
    for p in list((REPO / "tokens/00-foundation").glob("*.json")) + [REPO / "tokens/30-layout/layout.json"]:
        d = json.loads(p.read_text())
        items = d.get("tokens") or d.get("patterns") or {}
        for k, v in items.items():
            if "cite" in v and "match" in v:
                rel, ln = v["cite"].rsplit(":", 1)
                line = (PROJECT / rel).read_text().split("\n")[int(ln) - 1]
                matched += 1
                if v["match"] not in line:
                    errs.append(f"{p.name}: {k} cites {v['cite']} but that line does not contain {v['match'][:50]!r}")
    rec("CITATIONS", errs, info=f"{total} path:line citations resolved, {matched} token/motion citations matched to their line text")
    errs, total = [], 0
    for f in (REPO / "schema/examples/reference").glob("*.json"):
        for _, a in sv.assets_in(json.loads(f.read_text())["nodes"]):
            ref = a["ref"].split("?")[0]
            if ref.startswith("/assets/"):
                total += 1
                if not (PROJECT / "public" / ref.lstrip("/")).exists():
                    errs.append(f"{f.name}: asset {ref} not found under public/")
    rec("ASSET_REFS", errs, info=f"{total} local asset refs found under public/")
else:
    for name in ("SOURCE_PROVENANCE", "CITATIONS", "ASSET_REFS"):
        rec(name, [], ["no sibling clone source tree: skipped (degrades gracefully)"])

# ---------------------------------------------------------------- COUNTS
errs = []
roles = repo["roles"]["roles"]
want = {
    "tokensInCatalog": len(cat), "foundationTokens": sum(len(json.loads(p.read_text())["tokens"]) for p in (REPO / "tokens/00-foundation").glob("*.json") if p.name != "motion-patterns.json"),
    "layoutTokens": len(J("tokens/30-layout/layout.json")["tokens"]), "semanticTokens": len(SEM), "componentTokens": len(J("tokens/20-component/component.json")["tokens"]),
    "motionPatterns": len(mp), "primitives": len(list((REPO / "primitives").glob("*.json"))), "components": len(list((REPO / "components").glob("*.json"))),
    "sections": len(contracts), "sectionsRetrievalIneligible": sum(1 for c in contracts.values() if not c["retrievalEligible"]),
    "templates": len(templates), "templateFamilies": len({t["family"] for t in templates.values()}), "routes": len(paths), "routesMapped": sum(1 for r in routes_doc["routes"] if r["template"] in templates),
    "assetRoles": len(roles), "assetRolesGenerationSafe": sum(1 for d in roles.values() if d["availability"] == "generation-safe"),
    "graphRules": len(repo["graph"]["rules"]), "allowlistEntries": len(al["entries"]), "referenceExamples": len(list((REPO / "schema/examples/reference").glob("*.json"))),
    "generatedExamples": len(list((REPO / "schema/examples/generated").glob("*.json"))), "themes": len(list((REPO / "tokens/themes").glob("*.json"))),
    "measuredRoutes1440": len(mv["sectionHeights"]["routes"]), "wrapperWhitelistEntries": len(mv["wrapperGateWhitelist"]),
}
if manifest["counts"] != want:
    errs.append("manifest counts drifted: " + ", ".join(f"{k} {manifest['counts'].get(k)}!={v}" for k, v in want.items() if manifest["counts"].get(k) != v) + (f" (keys {sorted(set(manifest['counts']) ^ set(want))})" if set(manifest["counts"]) != set(want) else ""))
m = re.search(r"<!-- counts:start -->\s*```json\s*(\{.*?\})\s*```\s*<!-- counts:end -->", (REPO / "README.md").read_text(), re.S)
if not m or json.loads(m.group(1)) != manifest["counts"]:
    errs.append("README counts block != manifest counts")
if manifest.get("status") != "design-review-pending" or manifest.get("productionApproved") is not False:
    errs.append("manifest must stay design-review-pending / productionApproved false")
rec("COUNTS", errs, info=f"{len(want)} counts recomputed")

# ---------------------------------------------------------------- ENTRYPOINTS
errs = []
for k, v in manifest["entryPoints"].items():
    if v.startswith("..") or v.startswith("/") or ":" in v:
        errs.append(f"entryPoint {k} points outside the package: {v}")
    elif not (REPO / v).exists():
        errs.append(f"entryPoint {k} missing: {v}")
rec("ENTRYPOINTS", errs, info=f"{len(manifest['entryPoints'])} entry points")

# ---------------------------------------------------------------- WRAPPER_GATE
E, W, S = wg.run(REPO)
rec("WRAPPER_GATE", E, W, info=str(S))

# ---------------------------------------------------------------- HYGIENE
errs = []
WIN_HOME = re.escape("C:" + "\\" + "Users" + "\\")  # built from pieces so this line never matches itself
HOMES = "|".join("/" + d + r"/[A-Za-z0-9._-]+/" for d in ("Users", "home"))
ABS = re.compile(HOMES + r"|/private/(tmp|var)/|" + WIN_HOME)
for p in REPO.rglob("*"):
    if p.is_file():
        if p.name in (".DS_Store", "Thumbs.db", "desktop.ini") or "__MACOSX" in p.parts or "__pycache__" in p.parts or p.suffix == ".pyc":
            errs.append(f"junk file {p.relative_to(REPO)}")
        elif p.suffix in (".json", ".md", ".py", ".mjs", ".txt") and ABS.search(p.read_text(errors="ignore")):
            errs.append(f"absolute machine path in {p.relative_to(REPO)}")
rec("HYGIENE", errs)

fails = 0
for name, status, e, w, info in RESULTS:
    fails += status == "FAIL"
    print(f"{status:4}  {name:18} {info}")
    if not QUIET or status == "FAIL":
        for x in e[:12]:
            print(f"        ERROR {x}")
        for x in w[:4]:
            print(f"        warn  {x}")
print(f"\nverify_all: {len(RESULTS) - fails} passed/warned, {fails} failed  (sibling clone source: {'present' if SIBLING else 'absent'})")
sys.exit(1 if fails else 0)
