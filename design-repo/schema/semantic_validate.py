#!/usr/bin/env python3
"""Semantic validator for Dovetail-clone PageSpecs: everything JSON Schema cannot express.

    python3 schema/semantic_validate.py <pagespec.json> [...] [--json]

Layers (in order):
  1. Draft-07 schema (schema/pagespec.schema.json) when `jsonschema` is importable (else a warning; the rest still runs).
  2. Registry pins: asset-role availability, forbidden-in-all-modes roles, retrieval eligibility and the hero-less
     template list are pinned in THIS file; a registry/contract/allowlist edit that loosens them is an error.
  3. Template linkage + compatibility/graph.json rules (GRAPH_RULES_IMPLEMENTED): node sequence vs the declared
     template's real node list, chrome variants (data-driven banner/nav/footer), theme, hero, overlays, adjacency.
  4. Contract rules: variants, required/forbidden fields, list sizes, maxWords/maxChars, motion, style tokens, asset roles.
  5. Mode rules: generated mode may contain nothing that identifies or reproduces the source (GENERATED_MODE_* rules);
     live form endpoints, store badges and the source's long-form copy are rejected in every mode.

Stdlib only (jsonschema optional). Repo root is derived from this file's location.
"""
import hashlib, json, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------------ pins (independent of the registries)
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
SHELL_HEAD = ["shell.banner", "shell.navbar", "shell.nav-dropdowns"]
AUTOPLAY = {"marquee.loop", "carousel.autoplay", "tabs.auto-advance", "logo.cycler"}
GRAPH_RULES_IMPLEMENTED = {"TEMPLATE_SEQUENCE", "SHELL_ORDER", "CHROME_VARIANT", "TEMPLATE_THEME", "ONE_HERO", "HERO_FIRST_CONTENT", "SECTION_MAX_PER_PAGE",
                           "NO_ADJACENT_IDENTICAL", "OVERLAY_LAST", "FOOTER_CTA_BAND", "CTA_CLOSES_PAGE", "AUTOPLAY_BUDGET", "RUNTIME_UI_INELIGIBLE",
                           "HOME_ROUTE_ONLY", "REFERENCE_ROUTE_IN_TEMPLATE"}
GENERATED_MODE_RULES = ["GENERATED_MODE_BRAND", "GENERATED_MODE_CTA", "GENERATED_MODE_COPY", "GENERATED_MODE_URL", "GENERATED_MODE_ASSET",
                        "GENERATED_MODE_PERSON", "GENERATED_MODE_RATING", "GENERATED_MODE_STORE"]
GENERATED_REF = re.compile(r"^(generate:|user-supplied:|https://[a-z0-9.-]+\.(example|invalid)(/|$))")
RESERVED_URL = re.compile(r"^https://([a-z0-9-]+\.)*[a-z0-9-]+\.(example|invalid)(/|$)")


def _load(rel):
    return json.loads((REPO / rel).read_text())


def load_repo():
    """Everything the validator reads, as one dict (tests deep-copy and mutate it)."""
    return {
        "schema": _load("schema/pagespec.schema.json"),
        "contracts": {p.stem: json.loads(p.read_text()) for p in sorted((REPO / "sections").glob("*.json"))},
        "templates": _load("templates/templates.json")["templates"],
        "routes": _load("routes/routes.json"),
        "graph": _load("compatibility/graph.json"),
        "roles": _load("assets/asset-roles.json"),
        "brand": _load("schema/source-brand.json"),
        "fingerprints": _load("schema/source-copy-fingerprints.json"),
        "catalog": _load("tokens/llm/token-catalog.json")["tokens"],
        "policy": _load("tokens/llm/token-policy.json"),
        "allowlist": _load("tokens/llm/component-allowlist.json"),
        "motion": _load("tokens/00-foundation/motion-patterns.json")["patterns"],
    }


# ------------------------------------------------------------------ helpers
def leaves(v, path=""):
    if isinstance(v, dict):
        for k, x in v.items():
            yield from leaves(x, f"{path}.{k}" if path else k)
    elif isinstance(v, list):
        for x in v:
            yield from leaves(x, path + "[]")
    else:
        yield path, path.split(".")[-1].replace("[]", ""), v


def assets_in(v, path=""):
    if isinstance(v, dict):
        if "assetRole" in v:
            yield path, v
            return
        for k, x in v.items():
            yield from assets_in(x, f"{path}.{k}" if path else k)
    elif isinstance(v, list):
        for x in v:
            yield from assets_in(x, path + "[]")


def nwords(s):
    return len(re.findall(r"\S+", s))


def norm_words(s):
    return re.findall(r"[a-z0-9']+", s.lower())


def h16(s):
    return hashlib.sha1(s.encode()).hexdigest()[:16]


def node_pattern(n):
    v = "|".join(re.escape(x) for x in n.get("variants") or []) or r"[a-z0-9-]+"
    body = rf"(?:{re.escape(n['section'])}#(?:{v});)"
    if n.get("repeatable"):
        return body + "{%d,%d}" % (n.get("minCount", 1 if n["required"] else 0), n.get("maxCount", 99))
    return body if n["required"] else body + "?"


def registry_pin_errors(repo):
    errs = []
    roles = repo["roles"]["roles"]
    for rid, av in PINNED_AVAILABILITY.items():
        if rid not in roles:
            errs.append(("REGISTRY_PIN_MISMATCH", f"pinned asset role {rid} missing from assets/asset-roles.json"))
        elif roles[rid].get("availability") != av:
            errs.append(("REGISTRY_PIN_MISMATCH", f"asset role {rid}: registry availability {roles[rid].get('availability')!r} != pinned {av!r}"))
    for rid in roles:
        if rid not in PINNED_AVAILABILITY:
            errs.append(("REGISTRY_PIN_MISMATCH", f"asset role {rid} is not pinned in code"))
    forb = {r for r, d in roles.items() if d.get("forbiddenInAllModes")}
    if forb != PINNED_FORBIDDEN_ALL_MODES or set(repo["roles"].get("forbiddenInAllModes", [])) != PINNED_FORBIDDEN_ALL_MODES:
        errs.append(("REGISTRY_PIN_MISMATCH", f"forbiddenInAllModes drift: registry {sorted(forb)} vs pinned {sorted(PINNED_FORBIDDEN_ALL_MODES)}"))
    if roles.get("brand.wordmark", {}).get("generationPolicy") == "must-reuse-exact":
        errs.append(("REGISTRY_PIN_MISMATCH", "the source wordmark may never be must-reuse-exact"))
    for sid, c in repo["contracts"].items():
        pinned_ok = sid not in RETRIEVAL_INELIGIBLE
        if c.get("retrievalEligible") is not pinned_ok:
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"contract {sid}: retrievalEligible {c.get('retrievalEligible')} != pinned {pinned_ok}"))
        if RUNTIME_UI_HINT.search(sid + " " + c.get("title", "")) and sid not in RETRIEVAL_INELIGIBLE:
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"contract {sid} looks like runtime/utility UI but is not in RETRIEVAL_INELIGIBLE"))
    for e in repo["allowlist"]["entries"]:
        if e["kind"] == "section" and e.get("retrievalEligible") is not (e["id"] not in RETRIEVAL_INELIGIBLE):
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"allowlist {e['id']}: retrievalEligible {e.get('retrievalEligible')} contradicts the pin"))
    return errs


def compile_brand(b):
    def rx(names, cs=True, slugs=False):
        if not names:
            return None
        parts = []
        for x in names:
            if slugs:
                parts.append(r"[\s-]+".join(re.escape(t) for t in x.split("-")))
            else:
                parts.append(re.escape(x))
        return re.compile(r"(?<![A-Za-z0-9])(" + "|".join(sorted(parts, key=len, reverse=True)) + r")(?![A-Za-z0-9])", 0 if cs else re.I)
    return {
        "brand": re.compile("|".join(b["sourceBrand"]["patterns"]), re.I),
        "product": rx(b["productNames"]["names"], cs=False),
        "org": rx(b["customerOrgs"]["names"]),
        "orgslug": rx(b["customerOrgSlugs"]["slugs"], cs=False, slugs=True),
        "person": rx(b["persons"]["names"]),
        "rating": re.compile("|".join(b["rating"]["patterns"]), re.I),
        "store": re.compile("|".join(b["storeAndMarketplace"]["domains"] + b["storeAndMarketplace"]["words"]), re.I),
        "domain": re.compile("|".join(re.escape(d) for d in b["sourceDomains"]["domains"]), re.I),
        "endpoint": re.compile("|".join(b["liveEndpoints"]["patterns"]), re.I),
        "verbs": set(b["cta"]["verbs"]),
    }


_BRAND_CACHE = {}


# ------------------------------------------------------------------ main entry
def validate(spec, repo=None, use_schema=True):
    """returns (errors, warnings): lists of (RULE_ID, message)."""
    repo = repo or load_repo()
    E, W = [], []
    err = lambda r, m: E.append((r, m))
    warn = lambda r, m: W.append((r, m))

    # 1. schema
    if use_schema:
        try:
            from jsonschema import Draft7Validator
            for e in sorted(Draft7Validator(repo["schema"]).iter_errors(spec), key=lambda e: list(e.path)):
                err("SCHEMA", f"{'/'.join(str(p) for p in e.path) or '<root>'}: {e.message[:200]}")
        except ImportError:
            warn("SCHEMA_SKIPPED", "jsonschema not installed; Draft-07 layer skipped (pip install jsonschema)")
    if not isinstance(spec, dict) or not isinstance(spec.get("nodes"), list):
        err("SCHEMA", "spec must be an object with a nodes array")
        return E, W

    # 2. pins
    E.extend(registry_pin_errors(repo))
    contracts, templates = repo["contracts"], repo["templates"]
    mode = spec.get("mode")
    if mode not in ("reference", "generated"):
        err("MODE", f"mode must be 'reference' or 'generated', got {mode!r}")
    if spec.get("theme") not in repo["policy"]["themes"]:
        err("THEME_UNSUPPORTED", f"theme {spec.get('theme')!r} not in token-policy themes {repo['policy']['themes']}")
    nodes = [n for n in spec["nodes"] if isinstance(n, dict)]
    for i, n in enumerate(nodes):
        if n.get("section") not in contracts:
            err("UNKNOWN_SECTION", f"node {i}: section {n.get('section')!r} has no contract")
    nodes = [n for n in nodes if n.get("section") in contracts]
    cat = lambda n: contracts[n["section"]]["semantic"]["category"]
    place = lambda n: contracts[n["section"]]["placement"]
    ids = [n["section"] for n in nodes]

    # 3. template linkage + graph rules
    tid, route = spec.get("template"), spec.get("route")
    t = templates.get(tid)
    chrome = spec.get("chrome") or {}
    if t is None:
        err("TEMPLATE_SEQUENCE", f"unknown template {tid!r}")
    else:
        seq = "".join(f"{n['section']}#{n.get('variant')};" for n in nodes)
        if not re.fullmatch("".join(node_pattern(x) for x in t["nodes"]), seq):
            err("TEMPLATE_SEQUENCE", f"node sequence does not match template {tid}. got: {[n['section'] + '#' + str(n.get('variant')) for n in nodes]}")
        for k in ("banner", "nav", "footer"):
            if chrome.get(k) not in t["chrome"][k]:
                err("CHROME_VARIANT", f"chrome.{k}={chrome.get(k)!r} not allowed by template {tid} (allowed {t['chrome'][k]})")
        if spec.get("theme") != t["theme"]:
            err("TEMPLATE_THEME", f"theme {spec.get('theme')!r} but template {tid} requires {t['theme']!r}")
        if mode == "reference":
            rmap = {r["path"]: r for r in repo["routes"]["routes"]}
            r = rmap.get(route)
            if r is None:
                if tid != repo["routes"]["fallback"]["template"]:
                    err("REFERENCE_ROUTE_IN_TEMPLATE", f"route {route!r} is not in routes/routes.json and {tid} is not the fallback template")
            elif r["template"] != tid:
                err("REFERENCE_ROUTE_IN_TEMPLATE", f"route {route!r} is mapped to {r['template']} in routes/routes.json, not {tid}")
            elif r.get("chrome") != chrome:
                err("CHROME_VARIANT", f"route {route!r} renders chrome {r.get('chrome')} (measured) but the spec declares {chrome}")
    # chrome <-> shell nodes
    want_shell = {"shell.banner": chrome.get("banner"), "shell.navbar": chrome.get("nav"), "shell.footer": chrome.get("footer")}
    for sid, val in want_shell.items():
        present = [n for n in nodes if n["section"] == sid]
        if val in (None, "none"):
            if present:
                err("CHROME_VARIANT", f"chrome says no {sid.split('.')[1]} but the page has a {sid} node")
        else:
            if not present:
                err("CHROME_VARIANT", f"chrome.{sid.split('.')[1]}={val!r} but the page has no {sid} node")
            for n in present:
                if n.get("variant") != val:
                    err("CHROME_VARIANT", f"{sid} variant {n.get('variant')!r} != chrome value {val!r}")
    if ("shell.navbar" in ids) != ("shell.nav-dropdowns" in ids):
        err("CHROME_VARIANT", "shell.nav-dropdowns exists exactly when shell.navbar does")
    head = [s for s in ids if s in SHELL_HEAD]
    if ids[:len(head)] != head or head != [s for s in SHELL_HEAD if s in head]:
        err("SHELL_ORDER", f"shell head nodes must open the page in order {SHELL_HEAD}; got {ids[:4]}")
    if "shell.footer" in ids:
        j = ids.index("shell.footer")
        tail_bad = [s for s in ids[j + 1:] if place({"section": s}) != "overlay" and s != "listing.az-index"]
        if tail_bad:
            err("SHELL_ORDER", f"only the A-Z index and overlays may follow the site footer; found {tail_bad}")
    seen_overlay = False
    for n in nodes:
        if place(n) == "overlay" and n["section"] not in SHELL_HEAD:
            seen_overlay = True
        elif seen_overlay:
            err("OVERLAY_LAST", f"{n['section']} follows an overlay node; overlays (dialogs, sheets, fixed bars) come last")
            break
    fnodes = [n for n in nodes if n["section"] == "shell.footer"]
    for n in fnodes:
        has = "heading" in (n.get("content") or {})
        if (chrome.get("footer") == "cta-band") != has:
            err("FOOTER_CTA_BAND", "cta-band footer requires content.heading (the band heading)" if not has else "only the cta-band footer carries a heading")
    if (tid == "T0") != (route == "/"):
        err("HOME_ROUTE_ONLY", f"template T0 is only valid on '/', and '/' only on T0 (got {tid} on {route})")
    heroes = [i for i, n in enumerate(nodes) if cat(n) == "HERO"]
    if tid in HEROLESS_TEMPLATES:
        if heroes:
            err("ONE_HERO", f"{tid} is a hero-less template (page-specific header) but has a HERO node")
    elif len(heroes) != 1:
        err("ONE_HERO", f"expected exactly one HERO node on {tid}, found {len(heroes)}")
    content_nodes = [n for n in nodes if cat(n) != "SHELL" and place(n) != "overlay"]
    if heroes and tid not in HEROLESS_TEMPLATES and content_nodes and cat(content_nodes[0]) != "HERO":
        err("HERO_FIRST_CONTENT", f"first non-shell node is {content_nodes[0]['section']}, not the hero")
    counts = {}
    for n in nodes:
        counts[n["section"]] = counts.get(n["section"], 0) + 1
    for sid, k in counts.items():
        if k > contracts[sid]["constraints"]["maxPerPage"]:
            err("SECTION_MAX_PER_PAGE", f"{sid} appears {k} times (maxPerPage {contracts[sid]['constraints']['maxPerPage']})")
    for a, b in zip(nodes, nodes[1:]):
        if (a["section"], a.get("variant")) == (b["section"], b.get("variant")) and a.get("variant") not in contracts[a["section"]]["constraints"]["consecutiveVariants"]:
            err("NO_ADJACENT_IDENTICAL", f"adjacent identical nodes {a['section']}#{a.get('variant')} (not a consecutive-allowed variant)")
    if content_nodes and cat(content_nodes[-1]) not in ("CTA", "CONVERSION"):
        warn("CTA_CLOSES_PAGE", f"last content node {content_nodes[-1]['section']} is not CTA-category")
    auto = [n["section"] for n in nodes if ({(n.get("motion") or {}).get("pattern")} | {x.get("pattern") for x in (n.get("motion") or {}).get("additional", [])}) & AUTOPLAY]
    if len(auto) > 3:
        warn("AUTOPLAY_BUDGET", f"{len(auto)} autoplaying sections: {auto}")

    # 4. per-node contract rules
    roles = repo["roles"]["roles"]
    catalog, policy = repo["catalog"], repo["policy"]
    for i, n in enumerate(nodes):
        sid, c = n["section"], contracts[n["section"]]
        where = f"node {i} ({sid})"
        content = n.get("content") or {}
        if "retrievalEligible" in n and n["retrievalEligible"] is not (sid not in RETRIEVAL_INELIGIBLE):
            err("RUNTIME_UI_INELIGIBLE", f"{where}: retrievalEligible {n['retrievalEligible']} contradicts the pinned value {sid not in RETRIEVAL_INELIGIBLE}")
        v = n.get("variant")
        vd = c["variants"].get(v)
        if vd is None:
            err("VARIANT_UNKNOWN", f"{where}: variant {v!r} not in {sorted(c['variants'])}")
        else:
            for f in vd["requiredFields"]:
                if f not in content:
                    err("VARIANT_REQUIRED_FIELD", f"{where}: variant {v} requires content.{f}")
            for f in vd["forbiddenFields"]:
                if f in content:
                    err("VARIANT_FORBIDDEN_FIELD", f"{where}: variant {v} does not render content.{f}")
        for f in c["content"]["requiredFields"]:
            if f not in content:
                err("CONTENT_REQUIRED_FIELD", f"{where}: content.{f} is required")
        for lk, (lo, hi) in c["content"]["listSizes"].items():
            if lk in content and isinstance(content[lk], list) and not lo <= len(content[lk]) <= hi:
                err("LIST_SIZE", f"{where}: content.{lk} takes {lo}-{hi} items, got {len(content[lk])}")
        fields = c["content"]["fields"]
        for path, key, val in leaves(content):
            if key in ("ref", "assetRole", "kind") or not isinstance(val, str):
                continue
            fd = fields.get(path)
            if fd is None:
                err("CONTENT_FIELD_UNKNOWN", f"{where}: content.{path} is not a contract field")
            elif fd["type"] == "text":
                if nwords(val) > fd["maxWords"]:
                    err("MAX_WORDS", f"{where}: content.{path} has {nwords(val)} words (maxWords {fd['maxWords']})")
                if len(val) > fd["maxChars"]:
                    err("MAX_CHARS", f"{where}: content.{path} has {len(val)} chars (maxChars {fd['maxChars']})")
        m = n.get("motion") or {}
        pats = [m.get("pattern")] + [x.get("pattern") for x in m.get("additional", [])]
        for p in pats:
            if p not in c["motion"]["allowedPatterns"]:
                err("MOTION_PATTERN_NOT_ALLOWED", f"{where}: motion {p!r} not allowed (allowed {c['motion']['allowedPatterns']})")
        for p in c["motion"]["requiredPatterns"]:
            if p not in pats:
                err("MOTION_REQUIRED_PATTERN", f"{where}: motion must include {p}")
        for entry in [m] + list(m.get("additional", [])):
            p = entry.get("pattern")
            if p in repo["motion"] and entry.get("reducedMotionFallback") != repo["motion"][p]["reducedMotionFallback"]:
                err("MOTION_FALLBACK", f"{where}: {p} requires reducedMotionFallback {repo['motion'][p]['reducedMotionFallback']!r}")
        for prop, val in (n.get("style") or {}).items():
            sp = c["style"]["props"].get(prop)
            pol = policy["styleProps"].get(prop)
            sval = str(val)
            if sp is None or pol is None:
                err("STYLE_PROP_UNKNOWN", f"{where}: style.{prop} is not a settable style prop for {sid}")
                continue
            if re.search(r"#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|oklab|oklch|color-mix)\(", sval):
                err("TOKEN_RAW_COLOR", f"{where}: style.{prop}={sval!r} is a raw colour; use a catalog token")
            elif re.search(r"^-?[0-9.]+(px|rem|em|%|vw|vh|svh)$", sval.strip()):
                err("TOKEN_ARBITRARY_SPACING", f"{where}: style.{prop}={sval!r} is a raw length; use a catalog token")
            elif any(fn.lower() in sval.lower() for fn in policy["unsupportedFonts"]) or (sval.startswith("font.") and sval not in catalog) or "'" in sval or '"' in sval:
                err("TOKEN_UNSUPPORTED_FONT", f"{where}: style.{prop}={sval!r} names an unsupported font or font token")
            elif sval not in catalog:
                err("TOKEN_UNKNOWN", f"{where}: style.{prop}={sval!r} is not in tokens/llm/token-catalog.json")
            elif catalog[sval]["category"] not in pol["categories"] or sval not in pol["allowedBySection"].get(sid, []):
                err("TOKEN_INVALID_COMBINATION", f"{where}: style.{prop}={sval!r} (category {catalog[sval]['category']}) not allowed for {sid}; allowed {pol['allowedBySection'].get(sid)}")
            elif prop in policy["themeTokenRules"] and spec.get("theme") not in policy["themeTokenRules"][prop]["themes"]:
                err("TOKEN_INVALID_COMBINATION", f"{where}: style.{prop} is only valid on themes {policy['themeTokenRules'][prop]['themes']} (page theme {spec.get('theme')!r})")
        afields = c["assets"]["fields"]
        for path, a in assets_in(content):
            role = a.get("assetRole")
            if role not in roles:
                err("ASSET_ROLE_UNKNOWN", f"{where}: content.{path} role {role!r} not in assets/asset-roles.json")
                continue
            if role in PINNED_FORBIDDEN_ALL_MODES:
                err("ASSET_FORBIDDEN_ALL_MODES", f"{where}: content.{path} uses {role}, forbidden in every mode")
            fd = afields.get(path)
            if fd is None:
                err("ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", f"{where}: content.{path} is not an asset field")
            elif role not in set(fd["referenceRoles"]) | set(fd["generatedRoles"]):
                err("ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", f"{where}: content.{path} role {role} not in {sorted(set(fd['referenceRoles']) | set(fd['generatedRoles']))}")
            if mode == "generated":
                if PINNED_AVAILABILITY.get(role) != "generation-safe":
                    rule = "GENERATED_MODE_RATING" if role in ("rating.badge", "analyst.mark") else "GENERATED_MODE_PERSON" if role == "person.photo" else "GENERATED_MODE_ASSET"
                    err(rule, f"{where}: content.{path} uses {role} ({PINNED_AVAILABILITY.get(role)}); use one of {roles[role].get('generationSafeSubstitutes')}")
                if not GENERATED_REF.match(str(a.get("ref", ""))):
                    err("GENERATED_MODE_ASSET", f"{where}: content.{path}.ref {a.get('ref')!r} reuses a source file; use generate:/user-supplied:/https://*.example")

    # 5. identity / leakage
    key = id(repo["brand"])
    rx = _BRAND_CACHE.get(key) or _BRAND_CACHE.setdefault(key, compile_brand(repo["brand"]))
    route_paths = {r["path"] for r in repo["routes"]["routes"]}
    fp = repo["fingerprints"]
    shingles, fulls, k = set(fp["shingles"]), set(fp["fullStrings"]), fp["shingleSize"]
    strings = [("brand.name", "name", (spec.get("brand") or {}).get("name", "")), ("meta.title", "title", (spec.get("meta") or {}).get("title", "")), ("route", "route", route or "")]
    for i, n in enumerate(nodes):
        for path, key2, val in leaves(n.get("content") or {}):
            if isinstance(val, str):
                strings.append((f"node {i} ({n['section']}).{path}", key2, val))
    for where, key2, val in strings:
        if key2 in ("assetRole", "kind"):
            continue
        if key2 in ("href", "route") and rx["endpoint"].search(val):
            err("LIVE_ENDPOINT_ALL_MODES", f"{where}: {val!r} is a live form/registration endpoint (forbidden in every mode; the clone's forms never submit)")
        if mode != "generated":
            continue
        if rx["store"].search(val):
            err("GENERATED_MODE_STORE", f"{where}: {val!r} is a store/marketplace mark or link")
        if key2 in ("href", "ref", "route"):
            if val.startswith("https://") and not RESERVED_URL.match(val):
                err("GENERATED_MODE_URL", f"{where}: absolute URL {val!r} must use a reserved .example/.invalid domain")
            if val.startswith("mailto:") and not re.search(r"@[a-z0-9.-]+\.(example|invalid)$", val):
                err("GENERATED_MODE_URL", f"{where}: mail link {val!r} must use a reserved .example/.invalid domain")
            if rx["domain"].search(val) or rx["brand"].search(val):
                err("GENERATED_MODE_URL", f"{where}: {val!r} points at a source domain or carries the source brand")
            if key2 != "route" and val.startswith("/") and (val in route_paths or val.rstrip("/") + "/" in route_paths) and val not in ("/",):
                err("GENERATED_MODE_URL", f"{where}: {val!r} is a source-site route")
            if key2 == "route" and val != "/" and (val in route_paths):
                err("GENERATED_MODE_URL", f"route {val!r} reuses a source-site route")
            continue
        if rx["brand"].search(val) or (rx["product"] and rx["product"].search(val)):
            err("GENERATED_MODE_BRAND", f"{where}: {val!r} names the source brand or one of its products")
        if (rx["org"] and rx["org"].search(val)) or (rx["orgslug"] and rx["orgslug"].search(val)):
            err("GENERATED_MODE_BRAND", f"{where}: {val!r} names a real customer / company from the source")
        if rx["domain"].search(val):
            err("GENERATED_MODE_URL", f"{where}: {val!r} mentions a source domain")
        if rx["person"] and rx["person"].search(val):
            err("GENERATED_MODE_PERSON", f"{where}: {val!r} reuses a real person's name from the source")
        if rx["rating"].search(val):
            err("GENERATED_MODE_RATING", f"{where}: {val!r} looks like a review score / award claim; use rating.placeholder")
        w = norm_words(val)
        hit = len(w) >= fp["fullStringMinWords"] and h16(" ".join(w)) in fulls
        hit = hit or any(h16(" ".join(w[j:j + k])) in shingles for j in range(len(w) - k + 1))
        if hit:
            err("GENERATED_MODE_COPY", f"{where}: copy reproduces source copy ({val[:60]!r}...)")
    if mode == "generated":
        for n in nodes:
            for a in (n.get("content") or {}).get("actions", []):
                lab = str(a.get("label", "")).strip()
                first = (lab.split() or [""])[0].lower()
                if first in rx["verbs"] and (rx["brand"].search(lab) or (rx["product"] and rx["product"].search(lab))):
                    err("GENERATED_MODE_CTA", f"{n['section']}: action {lab!r} is a source-specific CTA")
    return E, W


def main(argv):
    as_json = "--json" in argv
    files = [a for a in argv if not a.startswith("--")]
    if not files:
        print(__doc__)
        return 2
    repo = load_repo()
    bad, report = 0, {}
    for f in files:
        E, W = validate(json.loads(Path(f).read_text()), repo)
        report[f] = {"errors": E, "warnings": W}
        bad += bool(E)
        if not as_json:
            print(f"{'FAIL' if E else 'ok  '}  {f}  errors={len(E)} warnings={len(W)}")
            for r, m in E:
                print(f"   ERROR {r}: {m}")
            for r, m in W:
                print(f"   warn  {r}: {m}")
    if as_json:
        print(json.dumps(report, indent=1))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
