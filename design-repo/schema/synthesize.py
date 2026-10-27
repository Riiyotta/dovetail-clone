#!/usr/bin/env python3
"""Synthesises a generation-safe PageSpec for any template, purely from templates/templates.json + section contracts.

    python3 schema/synthesize.py <template-id> [--rich] [--brand "Name"] [--domain name.example]

Used by schema/tests/adversarial_test.py (one control per template, synthesised from templates.json, so a new template
is covered with zero new test code) and to produce schema/examples/generated/*. Copy is original filler from a neutral
word list (never the source's), assets use generation-safe roles with generate: refs, links use a reserved .example host.
Stdlib only; repo root is derived from this file's location.
"""
import json, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LEX = ("lantern field ledger harbor sprout canvas orbit meadow quarry signal thread compass pebble harvest beacon atlas "
       "willow ember cobalt tidal summit grove prism cinder marble falcon cedar delta nimbus juniper basil rowan fjord "
       "plan sort share notice tidy shape gather sketch weigh map trace bundle steer refine measure").split()
NAMES = ["Rowan Vale", "Imogen Sato", "Tomas Brightwater", "Priya Lindqvist", "Ada Moreno", "Felix Okafor"]


class Gen:
    def __init__(self, brand, domain, seed=7):
        self.brand, self.domain, self.i = brand, domain, seed

    def words(self, n):
        out = []
        for _ in range(n):
            self.i = (self.i * 1103515245 + 12345) % 2147483648
            out.append(LEX[self.i % len(LEX)])
        return out

    def text(self, max_words, max_chars, want=None):
        n = max(1, min(max_words, want or max(1, min(12, (max_words + 1) // 2))))
        s = " ".join(self.words(n))
        s = s[0].upper() + s[1:]
        while len(s) > max_chars and " " in s:
            s = s.rsplit(" ", 1)[0]
        return s[:max_chars]


def load():
    tm = json.loads((REPO / "templates/templates.json").read_text())["templates"]
    contracts = {p.stem: json.loads(p.read_text()) for p in sorted((REPO / "sections").glob("*.json"))}
    return tm, contracts


def node_content(sid, variant, c, g, rich):
    f = c["content"]["fields"]
    vd = c["variants"][variant]
    ls = c["content"]["listSizes"]
    af = c["assets"]["fields"]
    present = set(vd["requiredFields"]) | set(c["content"]["requiredFields"])
    if rich:
        present |= {k.split(".")[0].split("[")[0] for k in f} | {k.split("[")[0] for k in af}
    present -= set(vd["forbiddenFields"])
    out = {}
    T = lambda p, want=None: g.text(f[p]["maxWords"], f[p]["maxChars"], want)
    def asset(path, k):
        ap = (path[:-2] if path.endswith("[]") else path) + ("[].alt" if path.endswith("[]") else ".alt")
        fa = f.get(ap)
        alt = g.text(fa["maxWords"], fa["maxChars"], 3) if fa and fa["maxWords"] >= 2 else ""
        return {"assetRole": af[path]["generatedRoles"][0], "alt": alt, "ref": f"generate:{af[path]['generatedRoles'][0]}/{sid}-{k}"}
    href = lambda k: f"https://{g.domain}/{sid.split('.')[-1]}-{k}"
    if "heading" in present and "heading" in f:
        out["heading"] = T("heading", 4)
    if "lead" in present and "lead" in f:
        out["lead"] = T("lead", 14)
    if "quote" in present and "quote.text" in f:
        out["quote"] = {"text": T("quote.text", 16)}
    def n_of(key):
        lo, hi = ls[key]
        return max(1, lo if not rich else min(hi, max(lo, 3)))
    if "actions" in present and "actions" in ls:
        out["actions"] = [{"label": T("actions[].label", 2), "href": href(k)} for k in range(n_of("actions"))]
    if "items" in present and "items" in ls:
        req = set(c["content"]["itemRequiredFields"])
        items = []
        for k in range(n_of("items")):
            it = {}
            for key in ("title", "text"):
                if f"items[].{key}" in f and (key in req or rich):
                    it[key] = T(f"items[].{key}", 3 if key == "title" else 8)
            if "items[].href" in f and ("href" in req or rich):
                it["href"] = href(f"item{k}")
            if "items[].media" in af and ("media" in req or rich) and af["items[].media"]["generatedRoles"]:
                it["media"] = asset("items[].media", f"item{k}")
            if not it:
                key = "title" if "items[].title" in f else "text"
                it[key] = T(f"items[].{key}", 3)
            items.append(it)
        out["items"] = items
    if "media" in present and "media" in ls and af.get("media[]", {}).get("generatedRoles"):
        out["media"] = [asset("media[]", k) for k in range(n_of("media"))]
    if "body" in present and "body" in ls:
        kinds = c["content"]["bodyBlockKinds"]
        body = []
        for k in range(n_of("body")):
            kind = "heading" if k == 0 and "heading" in kinds else ("paragraph" if "paragraph" in kinds else kinds[0])
            b = {"kind": kind}
            if kind == "image" and af.get("body[].media", {}).get("generatedRoles"):
                b["media"] = asset("body[].media", f"b{k}")
            elif "body[].text" in f:
                b["text"] = T("body[].text", 4 if kind == "heading" else 30)
            else:
                b["kind"] = "image"
                b["media"] = asset("body[].media", f"b{k}")
            body.append(b)
        out["body"] = body
    return out


def pick_variant(slot, c):
    vs = slot.get("variants") or sorted(c["variants"])
    return vs[0]


def synthesize(tid, brand="Fernlight", domain="fernlight.example", rich=False, repo=None):
    tm, contracts = repo if repo else load()
    t = tm[tid]
    mp = json.loads((REPO / "tokens/00-foundation/motion-patterns.json").read_text())["patterns"]
    g = Gen(brand, domain, seed=sum(map(ord, tid)) + (1 if rich else 0))
    chrome = {k: (v[0] if v else "none") for k, v in t["chrome"].items()}
    nodes = []
    for slot in t["nodes"]:
        sid = slot["section"]
        if sid in ("shell.banner",) and chrome["banner"] == "none":
            continue
        if not slot["required"] and not rich and not sid.startswith("shell."):
            continue
        c = contracts[sid]
        count = slot.get("minCount", 1) if slot.get("repeatable") else 1
        if rich and slot.get("repeatable"):
            count = min(slot.get("maxCount", 2), max(count, 2))
        count = max(1, count)
        variants = slot.get("variants") or sorted(c["variants"])
        for k in range(count):
            v = variants[k % len(variants)] if len(variants) > 1 and not c["constraints"]["consecutiveVariants"] else pick_variant(slot, c)
            if c["constraints"]["consecutiveVariants"] and count > 1:
                v = c["constraints"]["consecutiveVariants"][0] if c["constraints"]["consecutiveVariants"][0] in variants else v
            pat = (c["motion"]["requiredPatterns"] or c["motion"]["allowedPatterns"])[0]
            n = {"section": sid, "variant": v, "content": node_content(sid, v, c, g, rich), "motion": {"pattern": pat, "reducedMotionFallback": mp[pat]["reducedMotionFallback"]}}
            if not c["retrievalEligible"]:
                n["retrievalEligible"] = False
            if sid == "shell.footer" and chrome["footer"] == "cta-band":
                n["content"]["heading"] = g.text(c["content"]["fields"]["heading"]["maxWords"], c["content"]["fields"]["heading"]["maxChars"], 5)
            nodes.append(n)
    for n in nodes:  # chrome variants follow the chrome choice
        if n["section"] == "shell.banner":
            n["variant"] = chrome["banner"]
        if n["section"] == "shell.navbar":
            n["variant"] = chrome["nav"]
        if n["section"] == "shell.footer":
            n["variant"] = chrome["footer"]
    nodes = [n for n in nodes if not (n["section"] == "shell.navbar" and chrome["nav"] == "none") and not (n["section"] == "shell.nav-dropdowns" and chrome["nav"] == "none")
             and not (n["section"] == "shell.footer" and chrome["footer"] == "none")]
    for n in nodes:
        if n["section"] in ("shell.navbar", "shell.banner") and n["variant"] == "accent":
            n["style"] = {"accent": contracts[n["section"]]["style"]["props"]["accent"]["allowed"][0]}
    route = "/" if tid == "T0" else f"/{t['name']}-{brand.lower()}/"
    return {"pageSpecVersion": "1.0.0", "mode": "generated", "template": tid, "route": route, "theme": t["theme"], "chrome": chrome,
            "brand": {"name": brand}, "meta": {"title": f"{brand} | {t['family'].replace('-', ' ').title()}"[:160]}, "nodes": nodes}


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        sys.exit(2)
    brand = a[a.index("--brand") + 1] if "--brand" in a else "Fernlight"
    dom = a[a.index("--domain") + 1] if "--domain" in a else re.sub(r"[^a-z0-9]", "", brand.lower()) + ".example"
    print(json.dumps(synthesize(a[0], brand, dom, rich="--rich" in a), indent=1, ensure_ascii=False))
