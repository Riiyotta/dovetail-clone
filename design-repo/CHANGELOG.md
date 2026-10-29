# Changelog

## 1.1.0 - 2026-10-29

Clone-fidelity revision for the 13 sections below the 80% parity gate on 2026-10-26 (src/ changes for those sections plus the
measurements and contracts they touch; the rest of the design-repo was not rebuilt).

Causes found (screenshots of live and clone at the same scroll offset, offset search, DOM measurement of both):
- Most low scores were vertical drift: an earlier section on the same route was shorter in the clone, so the section was captured
  48-364px off. Causes: placeholder copy wrapping to fewer lines than the original; missing card titles; a missing 32px grid gap.
- Story cards: the data had `text: null` for 3-line card titles (Okta, Zapier on /roles/customer-experience/; Canva, SmartRecruiters
  on /the-best-never-guess/), so those titles did not render. Filled from the live page.
- /customers/ hero: min-height was computed once at mount (top 206px instead of 118px), 88px short. Now re-measured on resize, fonts and layout changes.
- /customers/ story band: rendered an <img> poster where the original has a muted looping <video> (opacity .16). Now a <video>
  (Breville loop stored locally, poster for the others); the harness hides videos on both pages, so they compare equal.
- Customer stories (T27): on the original each section heading shares a grid with its body (row-gap 32/24); the clone had no gap.
- Legal docs (T36): a fixed 48px top padding; on the original the 48px is the first heading's margin, so paragraph-first docs start flush.
- /resources/ link lists: the original link has a transparent 1px border (2px per row).
- /blog/2025-fall-launch/: the synthetic body did not follow the post (wrong block order, 16:9 image boxes). Added a measured
  `bodyBlocks` list (order, paragraph chars/lines, image aspect 1472/984); body height now equals the live 12,478px.
- The 12-18% customer-stories scores on /product/ai-agents/ and /enterprise/ did not reproduce (4 runs on 2026-10-29: 94-95% / 86-88%,
  live tabs do not advance under reduced motion). The live /enterprise/ page was 413px shorter on 2026-10-26, which shifts that capture.

Harness (extraction/parity.mjs): after the scroll-through both pages now wait (cap 10s) for pending images (lazy ones switched to eager)
and fonts; `imagesPending` is recorded per route. Reason: the live blog post's height varied 13,031-16,497px between runs while lazy images loaded.

Results: 39 routes / 294 sections, average 94.13% (was 92.3), 289 >= 80 (was 281), gate NOT passed. 12 of the 13 sections pass.
Exceptions, pending human approval (live content changed after capture, re-capture needed): /resources/ listing.card-grid 75.61,
/blog/ listing.card-grid 60.09, /careers/ company.video-gallery 59 and company.values 71.6, /events/a-balancing-act-mastering-customer-feedback/
listing.event-cards 77.27. Details: cloneQuality.pixelParity.exceptions.

Repo updates: sectionHeights re-measured for the changed routes and all T27/T36 routes (58 + 8 routes, node lists unchanged);
responsive doc heights for T2/T8/T13/T17/T26/T27/T31/T36; measuredHeightsPx recomputed in 12 contracts; source anchors and
path:line citations re-pointed after the src edits; reference examples re-synced where the render changed (roles--customer-experience
story-cards titles, the-best-never-guess story-grid titles, blog--2025-fall-launch chapter bodies), with the derived budgets
(article.chapter body text 586 -> 665 chars, story-cards title 79 -> 98, story-grid items 10 -> 12) in the contracts and
pagespec.schema.json (loosened only, so pageSpecVersion stays 1.0.0).

## 1.0.0 - 2026-10-26

First build (Situation A) from the clone's rendered DOM and source, cross-checked against CLONE_SPEC.md, specs/ and ia/ia.json (read-only).

- Routes: all 1897 served routes mapped once to 39 templates (16 families) using the clone's own router (react-router matchRoutes),
  re-derived independently in verify_all ROUTE_COVERAGE; 404 fallback probed.
- Tokens: 136 foundation + 8 layout + 22 semantic + 19 component (185 in the LLM catalog), every foundation value cited to a line that contains it; 3 themes.
- 146 section contracts (9 retrieval-ineligible runtime UI), 12 primitives, 14 components, 29 motion patterns.
- Measured: every route at 1440 (section heights per semantic node), responsive doc heights at 1440/1280/768/390 for one route per template, live-vs-clone pixel parity.
- Examples: 75 reference PageSpecs extracted from the rendered clone, 39 generation-safe PageSpecs (one per template, fictional brands).
- Mid-build re-measures: article templates re-split at h2+h3 (R6), changelog index after its source changed (duplicate CTA removed).
