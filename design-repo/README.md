# Design-repo: Dovetail site clone

Machine-validated design system + PageSpec contract extracted from the clone project that contains this folder: a pixel clone of the
marketing site of a real, live company (Dovetail). An AI can compose pages from real, measured sections without inventing colours,
copy budgets or structure, in two explicit modes (`reference` reconstructs the clone; `generated` builds a page for someone else).

Status: **design-review-pending**, not production-approved. Version 1.2.0 (PageSpec 1.0.0, allowlist 1.0.0).

## Counts (recomputed from disk by the build; extraction/verify_all.py checks this block against registry.manifest.json)

<!-- counts:start -->
```json
{
 "tokensInCatalog": 185,
 "foundationTokens": 136,
 "layoutTokens": 8,
 "semanticTokens": 22,
 "componentTokens": 19,
 "motionPatterns": 29,
 "primitives": 12,
 "components": 14,
 "sections": 146,
 "sectionsRetrievalIneligible": 9,
 "templates": 39,
 "templateFamilies": 16,
 "routes": 1899,
 "routesMapped": 1899,
 "assetRoles": 33,
 "assetRolesGenerationSafe": 14,
 "graphRules": 15,
 "allowlistEntries": 172,
 "referenceExamples": 75,
 "generatedExamples": 39,
 "themes": 3,
 "measuredRoutes1440": 1900,
 "wrapperWhitelistEntries": 12
}
```
<!-- counts:end -->

## Templates (route counts from routes/routes.json)

| id | name | family | routes | pattern |
|---|---|---|---|---|
| T0 | home | home | 1 | / |
| T1 | product | marketing | 7 | /product/* |
| T2 | roles | marketing | 6 | /roles/<role>/ |
| T3 | solutions | marketing | 4 | /solutions/* |
| T4 | enterprise | marketing | 1 | /enterprise/ |
| T5 | pricing | pricing | 1 | /pricing/ |
| T6 | deploy | marketing | 1 | /deploy/ |
| T7 | demo-form | conversion | 2 | /contact-sales/, /request-a-demo/ |
| T8 | comparison-landing | comparison | 16 | /dovetail-vs-*/ |
| T9 | template-landing | lead-tool | 3 | /*-template/ |
| T10 | roi-calculator | lead-tool | 1 | /roi-calculator/ |
| T11 | quiz-hub | lead-tool | 1 | /quiz/ |
| T12 | role-quiz | lead-tool | 3 | /roles/<role>/quiz/ |
| T13 | campaign-best-never-guess | campaign | 1 | /the-best-never-guess/ |
| T14 | campaign-launch | campaign | 1 | /launch/suns-out/ |
| T15 | campaign-event | campaign | 1 | /aws-summit-sydney-2026/ |
| T16 | blog-index | blog | 6 | /blog/, /blog/<tag>/ |
| T17 | blog-post | blog | 202 | /blog/<slug>/ |
| T18 | changelog-index | changelog | 7 | /changelog/, /changelog/category/*/ |
| T19 | changelog-entry | changelog | 349 | /changelog/<slug>/ |
| T20 | guide-hub | editorial | 10 | /<hub>/ |
| T21 | editorial-article | editorial | 1130 | /<hub>/<slug>/, /guides/<slug>/, /enterprise/<article>/, /research-maturity-assessment/ |
| T22 | comparison-article | comparison | 6 | /resources/dovetail-vs-*/, /resources/dovetail-review/, /resources/insight7-alternatives/ |
| T23 | guides-index | editorial | 1 | /guides/ |
| T24 | contributors-index | editorial | 1 | /contributors/ |
| T25 | contributor-profile | editorial | 20 | /contributors/<slug>/ |
| T26 | customers-index | customers | 1 | /customers/ |
| T27 | customer-story | customers | 39 | /customers/<slug>/ |
| T28 | events-index | events | 2 | /events/, /webinars/ |
| T29 | event-detail | events | 47 | /events/<slug>/ |
| T30 | live-demos | events | 1 | /live-demos/ |
| T31 | resources-index | resources | 1 | /resources/ |
| T32 | resources-report | conversion | 1 | /resources/industry-reports/*/ |
| T33 | careers | company | 1 | /careers/ |
| T34 | podcast | company | 1 | /b2bsaasy/ |
| T35 | legal-index | legal | 1 | /legal/ |
| T36 | legal-doc | legal | 19 | /legal/<doc>/, /privacy/<doc>/ |
| T37 | menu | utility | 1 | /menu/ |
| T38 | not-found | utility | 0 | * (fallback only) |

Template families group pages by purpose (R6), not DOM:
- **editorial** (T20-T25): the 10 topic hubs and 1,130 editorial articles share one article shape; enterprise SEO articles (3) and /research-maturity-assessment/
  render the same article DOM *and* serve the same purpose (long-form explainer), so they are T21, not separate templates.
- **comparison** (T8, T22): `/dovetail-vs-*` (16) are conversion landings (hero, tables, trial CTA); `/resources/dovetail-vs-*` (4, ToolsArticle) plus
  `/resources/dovetail-review/` and `/resources/insight7-alternatives/` (ResourcesGuide) are buyer-evaluation *articles*. Same purpose, different page shape:
  one family, two templates. ToolsArticle is split by purpose: /research-maturity-assessment/ goes to T21.
- Chrome (banner/nav/footer variants, theme) is data-driven per page and modelled as shell-section variants + `PageSpec.chrome`, never as templates.

## Content and licensing (read before generating)

The clone reproduces a **real company's** identity: real customer logos (a 368-logo wall), customer names and stories (Okta, Atlassian, Canva, Breville,
Itaú ...), named testimonials, G2/Capterra/TrustRadius ratings and awards, employee/speaker photos, a Forrester TEI study, YouTube ids, social links and
third-party form/registration links. Its long-form copy is already placeholder text; headings, labels, names, stats and short quotes are verbatim.

- `mode: "reference"` PageSpecs reconstruct the clone and may carry the recorded strings and asset refs as evidence.
- `mode: "generated"` PageSpecs are for someone else: the semantic validator rejects the Dovetail brand and its variants, product names, customer/company
  names (incl. 300+ logo-wall slugs), real people's names, review-site ratings/awards, source copy (hashed 6-word shingles), source routes and every
  non-`.example`/`.invalid` URL, and any blocked or reference-only asset role (`GENERATED_MODE_*`). Live form/registration endpoints, store badges and the
  original long-form copy are rejected in every mode.
- Asset roles (assets/asset-roles.json) are three-way: `reference-only` (the source's own product/brand material), `blocked-for-generation` (real third-party
  logos, real people, ratings, analyst marks, real scene photos) and `generation-safe` substitutes. Never reproduce, trace or imitate real logos, photos,
  ratings or proprietary media; PP Mondwest is a commercial face (reference only).
- Do not publish this repo or the clone; do not make it public.

## Layout

```
registry.manifest.json      status, versions, counts, entry points (all inside this folder)
tokens/00-foundation/       colour, typography, radius, spacing, breakpoint, elevation, motion, z-index, icon-size, motion-patterns (every token cites path:line + matched text)
tokens/10-semantic|20-component|30-layout|themes/   semantic roles, component tokens, layout, themes dark / light / campaign
tokens/llm/                 token-catalog.json, token-policy.json, component-allowlist.json
primitives/ components/     documented building blocks with evidence
sections/                   one closed contract per semantic section (source vs semantic split, variants, budgets, assets, motion, responsive, measured heights)
templates/templates.json    T0-T38 node patterns derived from every served route's measured node sequence
routes/routes.json          every served route mapped once (+ measured chrome), 404 fallback
compatibility/graph.json    rhythm/position rules (each implemented in the validator)
assets/asset-roles.json     closed media/link/copy roles, three-way availability, licensing
schema/                     pagespec.schema.json (Draft-07), section-contract.schema.json, semantic_validate.py, synthesize.py, source-brand.json, fingerprints, examples/, tests/
extraction/                 measured-values.json (evidence ledger), section-map.json, verify_all.py, wrapper_gate.py, prove_drift.py, measure_sections.mjs, measure_responsive.mjs, parity.mjs
```

## Verify

```bash
pip install jsonschema                      # only third-party dependency (Draft-07 layer)
python3 extraction/verify_all.py            # schema, contracts, routes, parity, citations, pins, tokens, counts, wrapper gate, hygiene
python3 schema/tests/adversarial_test.py    # every mutation rejected, every control passes (one synthesised control per template)
python3 extraction/prove_drift.py           # proves the drift checks fail on injected drift (scratch copies only)
python3 schema/semantic_validate.py <pagespec.json>
python3 schema/synthesize.py T21 --rich --brand Example   # a generation-safe starting PageSpec for any template
```

Re-measure (needs the clone's dev server and a Playwright install; the browser path comes from env, never this repo):
`PLAYWRIGHT_MODULE=<playwright> BASE_URL=http://localhost:5210 node extraction/measure_sections.mjs > out.jsonl`.
Citations (`path:line`) point into the clone project root (the folder containing `design-repo/`); standalone, those checks degrade to warnings.
To rebuild the clone itself use its lockfile: `npm ci && npm run dev` (port 5210); never ship `node_modules`, `dist` or `public/assets` (372MB).

## Clone quality (R12)

Measured against the live site at 1440x900 (extraction/parity.mjs, tolerance 24), full re-run 2026-10-29 after the 1.2.0 live-drift re-capture: 294 section viewports on 39 representative routes, average 94.62% matching pixels (1.1.0 run: 94.13%), **294 of 294 sections >= 80%; per-section gate passed** (lowest: /customers/ 81.58, /changelog/15-small-improvements/ 81.65, /legal/ 82.27). The 5 exceptions of the 1.1.0 run were live content added after capture (a new featured blog post, a new open position, a new upcoming event); the clone's data was re-captured from the live pages and all 5 now pass (before -> after in cloneQuality.pixelParity.revision20261029b); no exceptions remain. The live site keeps changing, so a later run can drop again for the same reason, and live animation makes single sections vary between runs (/launch/suns-out/ features.launch-feature 88.46 in the full run, 96.9 on an immediate re-run). Long-form copy is placeholder, ASCII/marquee/canvas art is procedural, so scores below 100 are expected and real. Harness: both pages are scrolled through, then wait for pending images (switched to eager) and fonts before capture; videos are paused and hidden on both. Per-route numbers: extraction/measured-values.json cloneQuality.pixelParity.

Placeholder copy keeps the original's line count where it was measured: data fields `{placeholder, chars, lines}` reserve `lines` lines at >=1281px (src/index.css `[data-ph-lines]`), so placeholder wording no longer shortens sections relative to the live page.

## Structurally unusual (recorded, not normalised away)

- `/menu/` is served by the clone and linked from the collapsed nav but is not in the original route list (src/data/routes.txt); it maps to T37.
- Unknown slugs under /blog/, /changelog/, the 10 hubs, /guides/, /contributors/, /customers/ and /events/ render their template with a slug-derived title,
  not the 404; T38 is reached only by paths no route table matches.
- Long-form copy is placeholder of the original length; article, legal and story bodies are decomposed into heading/spacer-bounded chapters (R6).
  12 measured share hits above 60% (8 heading-less blog posts, 4 contributor 'reviewed' lists) carry agent-attested whitelist entries.
- Guide hubs render the A-Z article index *after* the site footer (faithful to the live site).
- Blog/changelog cover images are hot-linked from the live site's media host (external requests).
- The changelog index rendered its feedback CTA twice in the first measurement pass; the source changed mid-build and was re-measured (one band now).
- Specs vs clone: roles pages and role quizzes omit the spec'd final CTA (about 900-1000px shorter than spec); the banner links to '#';
  the promo modal mounts only on the home page. See extraction/measured-values.json preExistingClaimChecks.
- Between 1186 and 1280px the nav is 1310px wide and overflows its box (measured on the clone and the live site alike); it collapses to a 'Menu' pill at <=1185px.

## Known gaps

- Reduced-motion fallbacks marked `gap` in motion-patterns.json have no rule on the live site (hover dissolve, cursor tooltip, in-view video, pixel bands, CSS rotators).
- Content budgets come from 75 reference examples (up to 3 routes per template); heights come from all 1,899 routes.
- Forms never submit; filters, quizzes and the ROI calculator are client-side only (contract `runtimeUi`).
