#!/usr/bin/env python3
"""Adversarial suite: every mutation must be rejected with its expected rule, every control must pass.

    python3 schema/tests/adversarial_test.py

Controls: every reference example (real recorded content and assets), every generation-safe example, the bundled
example, AND one generated-mode control per template synthesised from templates/templates.json by schema/synthesize.py
(so a new or split template is covered with zero new control code).
Mutations are applied to deep copies; registry-level mutations (contract / allowlist / asset registry / templates) are
applied to an in-memory copy of the loaded repo, never to files.
"""
import copy, importlib.util, json, sys

sys.dont_write_bytecode = True
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]


def mod(name, rel):
    s = importlib.util.spec_from_file_location(name, REPO / rel)
    m = importlib.util.module_from_spec(s)
    s.loader.exec_module(m)
    return m


sv = mod("semantic_validate", "schema/semantic_validate.py")
sy = mod("synthesize", "schema/synthesize.py")
BASE = sv.load_repo()
J = lambda rel: json.loads((REPO / rel).read_text())
REF = lambda name: J(f"schema/examples/reference/{name}.pagespec.json")
GEN = lambda name: J(f"schema/examples/generated/{name}.generated.pagespec.json")

R_PRICING, R_HOME, R_AGENTS = REF("pricing"), REF("home"), REF("product--ai-agents")
R_POST, R_LEGAL, R_STORY = REF("blog--introducing-agentic-chat"), REF("privacy--privacy-policy"), REF("customers--zapier")
R_GUIDE, R_HUB, R_SOL = REF("ux--what-is-wireframe-testing"), REF("ux"), REF("solutions--voice-of-customer")
R_CMP, R_CL = REF("dovetail-vs-marvin"), REF("changelog")
G_HOME, G_PROD, G_ART, G_LEGAL = GEN("home"), GEN("product"), GEN("editorial-article"), GEN("legal-doc")
G_STORY, G_CMP, G_PRICE, G_SOL = GEN("customer-story"), GEN("comparison-landing"), GEN("pricing"), GEN("solutions")


def idx(s, section, nth=0):
    return [i for i, n in enumerate(s["nodes"]) if n["section"] == section][nth]


def node(s, section, nth=0):
    return s["nodes"][idx(s, section, nth)]


CASES = []


def case(name, base, fn, expect, repo_fn=None):
    s = copy.deepcopy(base)
    fn(s)
    r = BASE
    if repo_fn:
        r = copy.deepcopy(BASE)
        repo_fn(r)
    CASES.append((name, s, expect, r))


def setp(path, value):
    def f(s):
        cur = s
        for k in path[:-1]:
            cur = cur[k]
        cur[path[-1]] = value
    return f


def first_text(s, section, field="heading"):
    return node(s, section)["content"][field]


# ---------------------------------------------------------------- schema layer
case("unknown template id", R_PRICING, setp(["template"], "T99"), "SCHEMA")
case("missing mode", R_PRICING, lambda s: s.pop("mode"), "SCHEMA")
case("mode outside enum", R_PRICING, setp(["mode"], "draft"), "SCHEMA")
case("invented section id", R_PRICING, lambda s: s["nodes"].insert(4, {"section": "hero.video", "variant": "default", "content": {}, "motion": {"pattern": "static", "reducedMotionFallback": "none-needed"}}), "SCHEMA")
case("missing reducedMotionFallback", R_PRICING, lambda s: node(s, "interactive.faq")["motion"].pop("reducedMotionFallback"), "SCHEMA")
case("wrong reducedMotionFallback for pattern", R_PRICING, lambda s: node(s, "interactive.faq")["motion"].update(reducedMotionFallback="unchanged"), "SCHEMA")
case("invented motion field", R_PRICING, lambda s: node(s, "interactive.faq")["motion"].update(inventedAnimation="spin"), "SCHEMA")
case("invented content field", R_PRICING, lambda s: node(s, "hero.pricing")["content"].update(subtitle="Extra line"), "SCHEMA")
case("invented asset role", R_PRICING, lambda s: node(s, "hero.pricing")["content"]["media"][0].update(assetRole="hero.photo"), "SCHEMA")
case("invented chrome value", R_PRICING, lambda s: s["chrome"].update(footer="mega"), "SCHEMA")
case("list over observed max", R_PRICING, lambda s: node(s, "interactive.faq")["content"]["items"].extend(copy.deepcopy(node(s, "interactive.faq")["content"]["items"]) * 6), "SCHEMA")
case("href scheme outside the allowed set", R_PRICING, lambda s: node(s, "pricing.plan-cards")["content"]["actions"][0].update(href="javascript:alert(1)"), "SCHEMA")
case("unknown theme", R_PRICING, setp(["theme"], "sepia"), "THEME_UNSUPPORTED")

# ---------------------------------------------------------------- template linkage / graph rules
case("template/node mismatch (pricing page declared as enterprise)", R_PRICING, setp(["template"], "T4"), "TEMPLATE_SEQUENCE")
case("required section removed", R_PRICING, lambda s: s["nodes"].pop(idx(s, "pricing.plan-cards")), "TEMPLATE_SEQUENCE")
case("sections reordered", R_PRICING, lambda s: s["nodes"].insert(idx(s, "hero.pricing"), s["nodes"].pop(idx(s, "interactive.faq"))), "TEMPLATE_SEQUENCE")
case("variant not observed at this template position", R_PRICING, lambda s: node(s, "social-proof.logo-marquee").update(variant="with-ratings"), "TEMPLATE_SEQUENCE")
case("second hero", R_PRICING, lambda s: s["nodes"].insert(idx(s, "hero.pricing") + 1, copy.deepcopy(node(s, "hero.pricing"))), "ONE_HERO")
case("hero added to a hero-less template (blog post)", R_POST, lambda s: s["nodes"].insert(3, copy.deepcopy(node(R_PRICING, "hero.pricing"))), "ONE_HERO")
case("hero-less marketing page", R_PRICING, lambda s: s["nodes"].pop(idx(s, "hero.pricing")), "ONE_HERO")
case("hero not first content node", R_PRICING, lambda s: s["nodes"].insert(idx(s, "hero.pricing"), s["nodes"].pop(idx(s, "pricing.plan-cards"))), "HERO_FIRST_CONTENT")
case("section over maxPerPage", R_PRICING, lambda s: [s["nodes"].insert(idx(s, "interactive.faq"), copy.deepcopy(node(s, "pricing.comparison-group"))) for _ in range(3)], "SECTION_MAX_PER_PAGE")
case("adjacent identical non-repeatable section", R_PRICING, lambda s: s["nodes"].insert(idx(s, "interactive.faq"), copy.deepcopy(node(s, "interactive.faq"))), "NO_ADJACENT_IDENTICAL")
case("consecutive allowance removed from the contract (registry)", R_PRICING, lambda s: None, "NO_ADJACENT_IDENTICAL", lambda r: r["contracts"]["pricing.comparison-group"]["constraints"].update(consecutiveVariants=[]))
case("footer moved before content", R_PRICING, lambda s: s["nodes"].insert(4, s["nodes"].pop(idx(s, "shell.footer"))), "SHELL_ORDER")
case("navbar before banner", R_PRICING, lambda s: s["nodes"].insert(0, s["nodes"].pop(1)), "SHELL_ORDER")
case("overlay placed mid-page", R_PRICING, lambda s: s["nodes"].insert(5, s["nodes"].pop(idx(s, "pricing.sticky-plan-bar"))), "OVERLAY_LAST")
case("home template on a non-home route", R_HOME, setp(["route"], "/pricing/"), "HOME_ROUTE_ONLY")
case("reference route not mapped to its template", R_PRICING, setp(["route"], "/enterprise/"), "REFERENCE_ROUTE_IN_TEMPLATE")
case("theme does not match the template", R_PRICING, setp(["theme"], "light"), "TEMPLATE_THEME")
case("chrome value the template never uses", R_PRICING, lambda s: s["chrome"].update(footer="cta-band"), "CHROME_VARIANT")
case("chrome says no banner but the banner node stays", R_PRICING, lambda s: s["chrome"].update(banner="none"), "CHROME_VARIANT")
case("navbar variant contradicts chrome", R_PRICING, lambda s: node(s, "shell.navbar").update(variant="light"), "CHROME_VARIANT")
case("reference chrome differs from the route's measured chrome", R_AGENTS, lambda s: [s["chrome"].update(banner="none"), s["nodes"].pop(0)], "CHROME_VARIANT")
case("nav dropdowns without a navbar", R_PRICING, lambda s: s["nodes"].pop(idx(s, "shell.navbar")), "CHROME_VARIANT")
case("cta-band footer without its band heading", R_SOL, lambda s: node(s, "shell.footer")["content"].pop("heading"), "FOOTER_CTA_BAND")
case("plain footer carrying a band heading", R_PRICING, lambda s: node(s, "shell.footer")["content"].update(heading="Book a demo"), "FOOTER_CTA_BAND")
case("A-Z index moved before the footer", R_HUB, lambda s: s["nodes"].insert(idx(s, "shell.footer"), s["nodes"].pop(idx(s, "listing.az-index"))), "TEMPLATE_SEQUENCE")
case("article chapter dropped from a legal doc", R_LEGAL, lambda s: [s["nodes"].pop(i) for i in sorted([i for i, n in enumerate(s["nodes"]) if n["section"] == "legal.doc-part"], reverse=True)], "TEMPLATE_SEQUENCE")

# ---------------------------------------------------------------- content contract
case("maxWords overflow on a real field", R_PRICING, lambda s: node(s, "hero.pricing")["content"].update(heading=" ".join(["word"] * 60)), "MAX_WORDS")
case("maxChars overflow (schema layer)", R_PRICING, lambda s: node(s, "hero.pricing")["content"].update(heading="x" * 900), "SCHEMA")
case("variant forbidden field (company FAQ has no sub line)", REF("customers--global-management-consulting-firm"), lambda s: node(s, "interactive.faq")["content"].update(lead="An extra sub line here"), "VARIANT_FORBIDDEN_FIELD")
case("variant required field missing", R_PRICING, lambda s: node(s, "interactive.faq")["content"].pop("items"), "VARIANT_REQUIRED_FIELD")
case("unknown variant", R_PRICING, lambda s: node(s, "interactive.faq").update(variant="carousel"), "SCHEMA")
case("list under observed minimum", R_PRICING, lambda s: node(s, "shell.navbar")["content"].update(items=node(s, "shell.navbar")["content"]["items"][:1]), "LIST_SIZE")
case("generated article over a body budget", G_ART, lambda s: node(s, "article.chapter")["content"]["body"][-1].update(text=" ".join(["word"] * 3000)), "MAX_WORDS")

# ---------------------------------------------------------------- motion
case("motion pattern not allowed for section", R_PRICING, lambda s: node(s, "hero.pricing").update(motion={"pattern": "marquee.loop", "reducedMotionFallback": "paused"}), "MOTION_PATTERN_NOT_ALLOWED")
case("required motion pattern missing (logo marquee without its loop)", R_PRICING, lambda s: node(s, "social-proof.logo-marquee").update(motion={"pattern": "static", "reducedMotionFallback": "none-needed"}), "MOTION_REQUIRED_PATTERN")
case("registry fallback edited (motion-patterns.json)", R_PRICING, lambda s: None, "MOTION_FALLBACK", lambda r: r["motion"]["marquee.loop"].update(reducedMotionFallback="keep-moving"))

# ---------------------------------------------------------------- retrieval eligibility (node / contract / allowlist)
case("runtime UI marked retrievable at node level", R_PRICING, lambda s: node(s, "shell.nav-dropdowns").update(retrievalEligible=True), "RUNTIME_UI_INELIGIBLE")
case("sticky plan bar marked retrievable", R_PRICING, lambda s: node(s, "pricing.sticky-plan-bar").update(retrievalEligible=True), "RUNTIME_UI_INELIGIBLE")
case("promo modal marked retrievable", R_HOME, lambda s: node(s, "cta.twins-modal").update(retrievalEligible=True), "RUNTIME_UI_INELIGIBLE")
case("content section marked ineligible at node level", R_PRICING, lambda s: node(s, "interactive.faq").update(retrievalEligible=False), "RUNTIME_UI_INELIGIBLE")
case("contract flipped to eligible (registry)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["interactive.toc-sheet"].update(retrievalEligible=True))
case("allowlist flipped to eligible (registry)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: [e.update(retrievalEligible=True) for e in r["allowlist"]["entries"] if e["id"] == "shell.banner"])
case("content contract marked ineligible (registry)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["interactive.faq"].update(retrievalEligible=False))
case("runtime-looking contract not pinned (dialog title, registry)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["pricing.plan-cards"].update(title="Plan cards dialog"))

# ---------------------------------------------------------------- asset registry pins
case("registry loosens customer.logo to generation-safe", G_PROD, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["customer.logo"].update(availability="generation-safe"))
case("registry loosens person.photo to reference-only", G_PROD, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["person.photo"].update(availability="reference-only"))
case("registry drops forbiddenInAllModes", R_PRICING, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["link.live-endpoint"].pop("forbiddenInAllModes"))
case("wordmark set to must-reuse-exact", R_PRICING, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["brand.wordmark"].update(generationPolicy="must-reuse-exact"))
case("new role missing from the code pins", R_PRICING, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"].update({"sponsor.mark": copy.deepcopy(r["roles"]["roles"]["customer.logo"])}))
case("asset role not allowed for the field", R_PRICING, lambda s: node(s, "hero.pricing")["content"]["media"][0].update(assetRole="customer.logo"), "ASSET_ROLE_NOT_ALLOWED_FOR_FIELD")
case("store badge in reference mode", R_PRICING, lambda s: node(s, "hero.pricing")["content"]["media"][0].update(assetRole="store.badge"), "ASSET_FORBIDDEN_ALL_MODES")
case("live form endpoint (reference mode)", R_PRICING, lambda s: node(s, "pricing.plan-cards")["content"]["actions"][0].update(href="https://forms.hubspot.com/uploads/form/v2/123/abc"), "LIVE_ENDPOINT_ALL_MODES")

# ---------------------------------------------------------------- tokens / policy
case("unknown token", R_PRICING, lambda s: node(s, "pricing.plan-cards").update(style={"spaceBefore": "space.section.s999"}), "TOKEN_UNKNOWN")
case("raw hex colour", G_PROD, lambda s: node(s, "shell.navbar").update(style={"accent": "#5D00A1"}), "TOKEN_RAW_COLOR")
case("raw rgb colour", G_PROD, lambda s: node(s, "shell.navbar").update(style={"accent": "rgb(93,0,161)"}), "TOKEN_RAW_COLOR")
case("arbitrary spacing value", R_PRICING, lambda s: node(s, "pricing.plan-cards").update(style={"spaceBefore": "120px"}), "TOKEN_ARBITRARY_SPACING")
case("unsupported font", R_PRICING, lambda s: node(s, "pricing.plan-cards").update(style={"spaceBefore": "font.family.mondwest-display"}), "TOKEN_UNSUPPORTED_FONT")
case("invalid token combination (colour token as a spacer)", R_PRICING, lambda s: node(s, "pricing.plan-cards").update(style={"spaceBefore": "color.blue.base"}), "TOKEN_INVALID_COMBINATION")
case("invalid theme/token combination (accent on a light page)", R_GUIDE, lambda s: [s.update(chrome=dict(s["chrome"])), node(s, "shell.navbar").update(style={"accent": "color.accent.agents"})], "TOKEN_INVALID_COMBINATION")
case("style prop the section does not expose", R_PRICING, lambda s: node(s, "hero.pricing").update(style={"accent": "color.blue.base"}), "STYLE_PROP_UNKNOWN")

# ---------------------------------------------------------------- generated mode leakage (controls: generated examples)
brand = BASE["brand"]
person = sorted(brand["persons"]["names"])[0]
org = "Atlassian" if "Atlassian" in brand["customerOrgs"]["names"] else sorted(brand["customerOrgs"]["names"])[0]
case("source brand in a heading", G_HOME, lambda s: node(s, "hero.home")["content"].update(heading="Dovetail for everyone"), "GENERATED_MODE_BRAND")
case("source brand as page brand", G_HOME, setp(["brand", "name"], "Dovetail"), "GENERATED_MODE_BRAND")
case("legal entity in the footer", G_HOME, lambda s: node(s, "shell.footer")["content"].update(lead="© 2026 Dovetail Research Pty. Ltd."), "GENERATED_MODE_BRAND")
case("source product name", G_PROD, lambda s: node(s, "hero.product")["content"].update(heading="Meet Digital Twins"), "GENERATED_MODE_BRAND")
case("real customer name", G_STORY, lambda s: node(s, "hero.story")["content"].update(heading=f"How {org} ships faster"), "GENERATED_MODE_BRAND")
case("logo-wall customer slug as text", G_HOME, lambda s: node(s, "hero.home")["content"].update(lead="Trusted by Khan Academy teams"), "GENERATED_MODE_BRAND")
case("real customer logo asset", G_HOME, lambda s: node(s, "social-proof.story-marquee")["content"]["media"][0].update(assetRole="customer.logo", ref="/assets/marketing/customer-okta-white-logo.svg"), "GENERATED_MODE_ASSET")
case("source wordmark reused", G_HOME, lambda s: node(s, "shell.navbar")["content"]["media"][0].update(assetRole="brand.wordmark", ref="/assets/svg/nav-dovetail-logo.svg"), "GENERATED_MODE_ASSET")
case("proprietary product screenshot reused", G_HOME, lambda s: node(s, "hero.home")["content"]["media"][0].update(assetRole="product.screenshot", ref="/assets/hero-image-bg.png"), "GENERATED_MODE_ASSET")
case("source file path with a safe role", G_HOME, lambda s: node(s, "hero.home")["content"]["media"][0].update(ref="/assets/hero-image-bg.png"), "GENERATED_MODE_ASSET")
case("real person photo", G_HOME, lambda s: node(s, "hero.home")["content"]["media"][0].update(assetRole="person.photo"), "GENERATED_MODE_PERSON")
case("real person name (testimonial)", G_HOME, lambda s: node(s, "hero.home")["content"].update(lead=f"Says {person}"), "GENERATED_MODE_PERSON")
case("review-site rating claim", G_HOME, lambda s: node(s, "hero.home")["content"].update(lead="Rated 4.5 out of 5 on G2"), "GENERATED_MODE_RATING")
case("award badge asset", G_CMP, lambda s: node(s, "social-proof.awards-marquee")["content"]["items"][0]["media"].update(assetRole="rating.badge"), "GENERATED_MODE_RATING")
case("analyst study mark", G_CMP, lambda s: node(s, "social-proof.tei-card")["content"]["media"][0].update(assetRole="analyst.mark"), "GENERATED_MODE_RATING")
case("store mark text", G_HOME, lambda s: node(s, "hero.home")["content"].update(lead="Download it on the App Store"), "GENERATED_MODE_STORE")
case("store URL", G_HOME, lambda s: node(s, "hero.home")["content"]["actions"][0].update(href="https://apps.apple.com/app/id1"), "GENERATED_MODE_STORE")
case("source domain URL", G_HOME, lambda s: node(s, "hero.home")["content"]["actions"][0].update(href="https://dovetail.com/pricing/"), "GENERATED_MODE_URL")
case("source social profile", G_HOME, lambda s: node(s, "shell.footer")["content"]["actions"][0].update(href="https://www.linkedin.com/company/heydovetail/"), "GENERATED_MODE_URL")
case("non-reserved absolute URL", G_HOME, lambda s: node(s, "hero.home")["content"]["actions"][0].update(href="https://fernlight.io/demo"), "GENERATED_MODE_URL")
case("source-site route reused", G_HOME, lambda s: node(s, "hero.home")["content"]["actions"][0].update(href="/customers/okta/"), "GENERATED_MODE_URL")
case("source copy reuse (full verbatim heading)", G_HOME, lambda s: node(s, "features.govern-grid")["content"].update(heading=first_text(R_HOME, "features.topic-tabs")), "GENERATED_MODE_COPY")
case("source copy reuse (6-word fragment)", G_HOME, lambda s: node(s, "hero.home")["content"].update(lead="We say: " + " ".join(first_text(R_HOME, "features.sticky-loop", "lead").split()[:9])), "GENERATED_MODE_COPY")
case("source-specific CTA", G_HOME, lambda s: node(s, "hero.home")["content"]["actions"][0].update(label="Try Dovetail free"), "GENERATED_MODE_CTA")
case("source brand in alt text", G_HOME, lambda s: node(s, "hero.home")["content"]["media"][0].update(alt="Dovetail product screenshot"), "GENERATED_MODE_BRAND")
case("live endpoint in a generated page", G_HOME, lambda s: node(s, "hero.home")["content"]["actions"][0].update(href="https://zoom.us/webinar/register/WN_abc"), "LIVE_ENDPOINT_ALL_MODES")

# ---------------------------------------------------------------- template-specific structure
case("changelog year groups removed", R_CL, lambda s: [s["nodes"].pop(i) for i in sorted([i for i, n in enumerate(s["nodes"]) if n["section"] == "listing.year-group"], reverse=True)], "TEMPLATE_SEQUENCE")
case("comparison table moved above the hero", R_CMP, lambda s: s["nodes"].insert(3, s["nodes"].pop(idx(s, "comparison.table"))), "TEMPLATE_SEQUENCE")
case("blog post chapters collapsed into the header slot order", R_POST, lambda s: s["nodes"].insert(3, s["nodes"].pop(idx(s, "article.chapter"))), "TEMPLATE_SEQUENCE")
case("solutions page without its trial band", R_SOL, lambda s: s["nodes"].pop(idx(s, "cta.trial-band")), "TEMPLATE_SEQUENCE")
case("template removed from the registry", R_PRICING, lambda s: None, "TEMPLATE_SEQUENCE", lambda r: r["templates"].pop("T5"))

TM, CT = sy.load()
SYNTH = [(f"synthesised generated control {tid} ({t['name']})", sy.synthesize(tid, repo=(TM, CT))) for tid, t in TM.items()]
CONTROLS = [(str(p.relative_to(REPO)), json.loads(p.read_text())) for p in sorted((REPO / "schema/examples").rglob("*.json"))] + \
           [("schema/example.pagespec.json", J("schema/example.pagespec.json"))] + SYNTH


def main():
    fails = 0
    print(f"CONTROLS (must pass with 0 errors): {len(CONTROLS)} ({len(SYNTH)} synthesised from templates.json, one per template)")
    for name, s in CONTROLS:
        E, W = sv.validate(s, BASE)
        fails += bool(E)
        print(f"  {'pass' if not E else 'FAIL'}  {name}" + ("" if not E else f"  {E[:3]}"))
    print(f"\nMUTATIONS (must be rejected with the expected rule): {len(CASES)}")
    for name, s, expect, repo in CASES:
        E, W = sv.validate(s, repo)
        rules = {r for r, _ in E}
        ok = expect in rules
        fails += not ok
        print(f"  {'rejected' if ok else 'MISSED  '}  [{expect}] {name}" + ("" if ok else f"  got {sorted(rules) or 'no errors'}"))
    gen = sum(1 for _, s in CONTROLS if s.get("mode") == "generated")
    print(f"\nadversarial: {len(CONTROLS)} controls ({gen} generated-mode), {len(CASES)} mutations, {fails} failures")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
