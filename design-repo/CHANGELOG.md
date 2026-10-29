# Changelog

## 1.2.0 - 2026-10-29

Live-drift re-capture: clears the 5 parity exceptions of 1.1.0. Each was live content published after the clone was captured; the live
pages were re-checked on 2026-10-29 and the clone's data now matches them (src/data/** plus three measured layout fixes in src/).

Content re-captured (copy rules unchanged: titles, dates, job titles and event titles are real; long-form copy stays placeholder of the
original length; covers are hot-linked from the live media host, as the clone already does for posts and events without a local copy):
- Blog: "Channels 2.0 in GA: one customer context layer for every team" (/blog/channels-2-is-generally-available/, 26 October 2026,
  [Product] [AI]) added to src/data/content/blog.json. It is the new featured post, so the /blog/ grid, the 5 category pages
  (categoryPages, order checked against each live page) and the /resources/ "From the blog" row (src/data/company/resources.json) shift one slot.
  The post body uses a measured `bodyBlocks` list (35 blocks: paragraph chars/lines, h2/h3, 3 figures with image aspect 1376/774 and
  2-line captions, 1 blockquote); src/pages/blog/placeholderBody.js and BlogPost.jsx now render `figure` (aspect, caption lines) and
  `blockquote` (lines) blocks. Every block's top and height match the live post within 1px.
- Careers: the open-positions list gained "IT and Cloud Support Tech" (Engineering, Sydney); all 10 job links now equal the live list.
- Events: "How SmartRecruiters grounds every design decision in a customer context layer" (17 Nov 2026, Zoom) added to events.json,
  webinars.json and as src/data/company/events/how-smartrecruiters-grounds-design-decisions-in-customer-context.json (every event has a
  detail route and the card links to it). It now leads the "More events" row on every event page, as on the live site.
- New routes (2): /blog/channels-2-is-generally-available/ (T17) and /events/how-smartrecruiters-grounds-design-decisions-in-customer-context/
  (T29), added to src/data/routes.txt, routes/routes.json, ia/ and sectionHeights. 1,897 -> 1,899 routes.

Layout causes found while re-measuring (DOM measurement of live vs clone):
- Blog cards: the original text link has a transparent 1px border like the image link (card 404.25px live vs 402.25px), 2px per card row
  (src/styles/blog/blog.css). /blog/ and the 5 category pages now have the live document heights exactly.
- Careers job rows: the same 1px transparent border on each row link (58px live vs 56px); the open-positions list is now 1,278px, the live height
  (src/styles/company-pages/careers.css; the selector added during the interrupted first attempt targeted a class the rows do not use and was fixed).
- Blog hero image and event hero image are inline on the original (their line box adds ~5px below the image); event pages also have the
  detail grid's 32px row-gap before "More events"; placeholder event paragraphs reserve their measured line count (`lines`).
  Event pages moved 60-65px closer to the live heights; a ~28px shortfall in the More events card row remains (not a gate failure).

Results: full 39-route run, 294 sections, average 94.62% (was 94.13), 294 >= 80 (was 289), **gate passed**; exceptions list is empty.
Before -> after: /resources/ listing.card-grid 75.61 -> 85.77, /blog/ listing.card-grid 60.09 -> 88.17, /careers/ company.video-gallery
59 -> 83.22, /careers/ company.values 71.6 -> 83.28, /events/a-balancing-act-mastering-customer-feedback/ listing.event-cards 77.27 -> 91.61.

Repo updates: sectionHeights re-measured for every T16, T17, T28, T29, T31 and T33 route (261 routes incl. the 2 new; node lists unchanged except
/events/how-cs-turns-customer-conversations-into-roadmap-decisions/, which now has a More events row); responsive doc heights for
T16/T17/T28/T29/T31/T33 (the other 33 templates re-ran unchanged); measuredHeightsPx recomputed in the 13 affected contracts (the recompute
reproduces all 136 contracts exactly on the 1.1.0 data); template routeCount T17 202 -> 203, T29 47 -> 48; manifest/README counts
(routes 1,899, measuredRoutes1440 1,900); 9 reference examples re-synced where the render changed (blog, blog--engineering, blog--product,
resources, events, webinars and 3 event detail examples) with the derived budgets loosened only (listing.featured-header title maxWords 10 -> 11;
listing.event-cards title 8 -> 11 words / 58 -> 77 chars, items 1-1 -> 1-2, matching pagespec.schema.json maxLength/maxItems), so
pageSpecVersion stays 1.0.0; source-copy-fingerprints.json extended with the 16 new real copy strings (29 shingles, 7 full strings; additive only).

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
