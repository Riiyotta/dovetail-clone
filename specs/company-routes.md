Source: https://dovetail.com/

# Company group: route → template → data

Covers 101 routes from `src/data/routes.txt`. Every route returned HTTP 200 with no redirect on 2026-10-26.

- Shared components and tokens: `specs/company-shared.md`.
- Asset manifest: `specs/company-assets.json`.
- Data root: `src/data/company/`. Image paths in the data are already local (`/assets/...`).

## Patterns

| URL pattern | Template spec | Data file | Count |
|---|---|---|---|
| `/customers/` | `customers-index.md` | `customers.json` | 1 |
| `/customers/{slug}/` | `customers-story.md` | `customers/{slug}.json` | 39 (21 named, 18 anonymous) |
| `/events/`, `/webinars/` | `events-index.md` | `events.json`, `webinars.json` | 2 |
| `/events/{slug}/` | `event-detail.md` | `events/{slug}.json` | 47 |
| `/live-demos/` | `live-demos.md` | `live-demos.json` | 1 |
| `/resources/` | `resources-index.md` | `resources.json` | 1 |
| `/resources/{slug}/` (comparison/guide) | `resources-guide.md` | `resources/{slug}.json` | 6 |
| `/resources/industry-reports/{slug}/` | `resources-report.md` | `resources/industry-reports/{slug}.json` | 1 |
| `/careers/` | `careers.md` | `careers.json` | 1 |
| `/b2bsaasy/` | `podcast.md` | `b2bsaasy.json` | 1 |
| `/aws-summit-sydney-2026/` | `campaign-aws-summit.md` | `aws-summit-sydney-2026.json` | 1 |

Notes:
- `/customers/{slug}/` uses `slug` as the file name. The anonymous stories are the `global-*`, `iconic-*`, `leading-*`, `major-*`, `modern-*`, `flagship-*` and `fleet-*` slugs.
- Upcoming vs past events must be computed at runtime from `startDate`. `events.json` → `allEvents` has every ISO date.

## Every route

| Route | Template (variant) | Data file |
|---|---|---|
| `/events/` | events-index | `src/data/company/events.json` |
| `/customers/` | customers-index | `src/data/company/customers.json` |
| `/live-demos/` | live-demos | `src/data/company/live-demos.json` |
| `/resources/` | resources-index | `src/data/company/resources.json` |
| `/webinars/` | events-index | `src/data/company/webinars.json` |
| `/careers/` | careers | `src/data/company/careers.json` |
| `/b2bsaasy/` | podcast | `src/data/company/b2bsaasy.json` |
| `/aws-summit-sydney-2026/` | campaign-aws-summit | `src/data/company/aws-summit-sydney-2026.json` |
| `/resources/industry-reports/2025-forrester-TEI-of-Dovetail/` | resources-report | `src/data/company/resources/industry-reports/2025-forrester-TEI-of-Dovetail.json` |
| `/customers/achievers/` | customers-story (no stats) | `src/data/company/customers/achievers.json` |
| `/customers/atlassian/` | customers-story (video hero) | `src/data/company/customers/atlassian.json` |
| `/customers/atlassian-design/` | customers-story (video hero) | `src/data/company/customers/atlassian-design.json` |
| `/customers/aws/` | customers-story | `src/data/company/customers/aws.json` |
| `/customers/bower/` | customers-story | `src/data/company/customers/bower.json` |
| `/customers/breville/` | customers-story (video hero) | `src/data/company/customers/breville.json` |
| `/customers/canva/` | customers-story (video hero) | `src/data/company/customers/canva.json` |
| `/customers/canva-ai/` | customers-story (video hero) | `src/data/company/customers/canva-ai.json` |
| `/customers/careship/` | customers-story (no stats) | `src/data/company/customers/careship.json` |
| `/customers/cnh/` | customers-story | `src/data/company/customers/cnh.json` |
| `/customers/eucalyptus/` | customers-story (no stats) | `src/data/company/customers/eucalyptus.json` |
| `/customers/harvard-business-publishing/` | customers-story (no stats) | `src/data/company/customers/harvard-business-publishing.json` |
| `/customers/itau-unibanco/` | customers-story | `src/data/company/customers/itau-unibanco.json` |
| `/customers/netguru/` | customers-story | `src/data/company/customers/netguru.json` |
| `/customers/okta/` | customers-story | `src/data/company/customers/okta.json` |
| `/customers/petal-health/` | customers-story (no stats) | `src/data/company/customers/petal-health.json` |
| `/customers/pvcase/` | customers-story | `src/data/company/customers/pvcase.json` |
| `/customers/safetyculture/` | customers-story (video hero) (no stats) | `src/data/company/customers/safetyculture.json` |
| `/customers/smartrecruiters/` | customers-story (video hero) | `src/data/company/customers/smartrecruiters.json` |
| `/customers/vital-voices/` | customers-story | `src/data/company/customers/vital-voices.json` |
| `/customers/zapier/` | customers-story | `src/data/company/customers/zapier.json` |
| `/customers/flagship-airline-group/` | customers-story (anonymous + FAQ) | `src/data/company/customers/flagship-airline-group.json` |
| `/customers/fleet-management-tech-leader/` | customers-story (anonymous + FAQ) | `src/data/company/customers/fleet-management-tech-leader.json` |
| `/customers/global-agricultural-equipment-maker/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-agricultural-equipment-maker.json` |
| `/customers/global-enterprise-cloud-platform/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-enterprise-cloud-platform.json` |
| `/customers/global-enterprise-life-sciences/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-enterprise-life-sciences.json` |
| `/customers/global-financial-institution/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-financial-institution.json` |
| `/customers/global-home-furnishings-retailer/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-home-furnishings-retailer.json` |
| `/customers/global-industrial-tech-leader/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-industrial-tech-leader.json` |
| `/customers/global-management-consulting-firm/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-management-consulting-firm.json` |
| `/customers/global-pos-and-payments-platform/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-pos-and-payments-platform.json` |
| `/customers/global-power-tool-manufacturer/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-power-tool-manufacturer.json` |
| `/customers/global-professional-services-network/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-professional-services-network.json` |
| `/customers/global-saas-leader/` | customers-story (anonymous + FAQ) | `src/data/company/customers/global-saas-leader.json` |
| `/customers/iconic-global-automaker/` | customers-story (anonymous + FAQ) | `src/data/company/customers/iconic-global-automaker.json` |
| `/customers/iconic-toy-brand/` | customers-story (anonymous + FAQ) | `src/data/company/customers/iconic-toy-brand.json` |
| `/customers/leading-education-publisher/` | customers-story (anonymous + FAQ) | `src/data/company/customers/leading-education-publisher.json` |
| `/customers/major-personal-bank/` | customers-story (anonymous + FAQ) | `src/data/company/customers/major-personal-bank.json` |
| `/customers/modern-business-banking-platform/` | customers-story (anonymous + FAQ) | `src/data/company/customers/modern-business-banking-platform.json` |
| `/events/a-balancing-act-mastering-customer-feedback/` | event-detail | `src/data/company/events/a-balancing-act-mastering-customer-feedback.json` |
| `/events/a-chat-with-jon-alferness/` | event-detail (register link) | `src/data/company/events/a-chat-with-jon-alferness.json` |
| `/events/ai-powered-ux-process-how-ai-is-transforming-the-design-process/` | event-detail | `src/data/company/events/ai-powered-ux-process-how-ai-is-transforming-the-design-process.json` |
| `/events/channels-by-dovetail-a-deep-dive-into-automating-your-feedback-workflows/` | event-detail (recording) | `src/data/company/events/channels-by-dovetail-a-deep-dive-into-automating-your-feedback-workflows.json` |
| `/events/config-watch-party-sydney/` | event-detail | `src/data/company/events/config-watch-party-sydney.json` |
| `/events/cursor-curated-sydney/` | event-detail | `src/data/company/events/cursor-curated-sydney.json` |
| `/events/data-driven-design-mastering-user-research/` | event-detail | `src/data/company/events/data-driven-design-mastering-user-research.json` |
| `/events/dig-deeper-level-up-your-a-b-testing-to-build-better-products/` | event-detail (recording) | `src/data/company/events/dig-deeper-level-up-your-a-b-testing-to-build-better-products.json` |
| `/events/dovetail-for-designers-webinar/` | event-detail (recording) | `src/data/company/events/dovetail-for-designers-webinar.json` |
| `/events/dovetail-for-product-managers-webinar/` | event-detail (recording) | `src/data/company/events/dovetail-for-product-managers-webinar.json` |
| `/events/dovetail-for-researchers-webinar/` | event-detail | `src/data/company/events/dovetail-for-researchers-webinar.json` |
| `/events/forrester-cx-summit-north-america/` | event-detail | `src/data/company/events/forrester-cx-summit-north-america.json` |
| `/events/friends-of-figma-x-dovetail/` | event-detail | `src/data/company/events/friends-of-figma-x-dovetail.json` |
| `/events/from-customer-feedback-to-business-impact-how-dovetail-customers-build-a/` | event-detail (recording) | `src/data/company/events/from-customer-feedback-to-business-impact-how-dovetail-customers-build-a.json` |
| `/events/from-insights-to-impact-in-medical-products-evolving-our-research-practices/` | event-detail (recording) | `src/data/company/events/from-insights-to-impact-in-medical-products-evolving-our-research-practices.json` |
| `/events/future-product-days-2025/` | event-detail | `src/data/company/events/future-product-days-2025.json` |
| `/events/gen-ai-x-dovetail-meetup/` | event-detail | `src/data/company/events/gen-ai-x-dovetail-meetup.json` |
| `/events/how-cs-turns-customer-conversations-into-roadmap-decisions/` | event-detail (register link) | `src/data/company/events/how-cs-turns-customer-conversations-into-roadmap-decisions.json` |
| `/events/how-customer-insights-drive-innovative-product-design-at-autodesk/` | event-detail (recording) | `src/data/company/events/how-customer-insights-drive-innovative-product-design-at-autodesk.json` |
| `/events/how-verizon-connect-built-a-winning-culture-of-ux-research-and-insights/` | event-detail (recording) | `src/data/company/events/how-verizon-connect-built-a-winning-culture-of-ux-research-and-insights.json` |
| `/events/insight-out-conf-2025/` | event-detail | `src/data/company/events/insight-out-conf-2025.json` |
| `/events/insights-at-scale-learn-how-okta-and-webflow-are-growing-their-research/` | event-detail (recording) | `src/data/company/events/insights-at-scale-learn-how-okta-and-webflow-are-growing-their-research.json` |
| `/events/io-connect-boston-discovery-workshop/` | event-detail | `src/data/company/events/io-connect-boston-discovery-workshop.json` |
| `/events/io-connect-chicago-discovery-workshop/` | event-detail | `src/data/company/events/io-connect-chicago-discovery-workshop.json` |
| `/events/io-connect-los-angeles-june-5/` | event-detail | `src/data/company/events/io-connect-los-angeles-june-5.json` |
| `/events/level-up-your-research-how-ai-in-dovetail-is-transforming-user-research/` | event-detail (recording) | `src/data/company/events/level-up-your-research-how-ai-in-dovetail-is-transforming-user-research.json` |
| `/events/offline-and-unfiltered-config-comedy-night/` | event-detail | `src/data/company/events/offline-and-unfiltered-config-comedy-night.json` |
| `/events/openclaw-sydney/` | event-detail | `src/data/company/events/openclaw-sydney.json` |
| `/events/perfect-vs-possible-how-real-product-decisions-get-made/` | event-detail | `src/data/company/events/perfect-vs-possible-how-real-product-decisions-get-made.json` |
| `/events/product-leaders-dinner-singapore/` | event-detail | `src/data/company/events/product-leaders-dinner-singapore.json` |
| `/events/product-led-summit-sydney/` | event-detail | `src/data/company/events/product-led-summit-sydney.json` |
| `/events/product-strategy-is-simple-an-actionable-and-hands-on-guide-to-getting-it/` | event-detail (recording) | `src/data/company/events/product-strategy-is-simple-an-actionable-and-hands-on-guide-to-getting-it.json` |
| `/events/productcon-san-francisco-2025/` | event-detail | `src/data/company/events/productcon-san-francisco-2025.json` |
| `/events/suns-out-digital-twins-deep-dive/` | event-detail (Zoom form) | `src/data/company/events/suns-out-digital-twins-deep-dive.json` |
| `/events/suns-out-ny-launch-party/` | event-detail | `src/data/company/events/suns-out-ny-launch-party.json` |
| `/events/suns-out-product-deep-dive/` | event-detail (Q&A, register link) | `src/data/company/events/suns-out-product-deep-dive.json` |
| `/events/suns-out-sf-launch-party/` | event-detail | `src/data/company/events/suns-out-sf-launch-party.json` |
| `/events/suns-out-sydney-launch-party/` | event-detail | `src/data/company/events/suns-out-sydney-launch-party.json` |
| `/events/the-ai-future-of-customer-intelligence-ceo-insights/` | event-detail (recording) | `src/data/company/events/the-ai-future-of-customer-intelligence-ceo-insights.json` |
| `/events/the-great-purge-a-seance-soiree-for-product-guilt/` | event-detail | `src/data/company/events/the-great-purge-a-seance-soiree-for-product-guilt.json` |
| `/events/the-widening-empathy-gap/` | event-detail | `src/data/company/events/the-widening-empathy-gap.json` |
| `/events/turning-heads-how-to-craft-insights-that-influence/` | event-detail (recording) | `src/data/company/events/turning-heads-how-to-craft-insights-that-influence.json` |
| `/events/usability-age-AI/` | event-detail (recording) | `src/data/company/events/usability-age-AI.json` |
| `/events/uxdx-happy-hour/` | event-detail | `src/data/company/events/uxdx-happy-hour.json` |
| `/events/voice-of-the-customer-transforming-financial-services-through-listening/` | event-detail (recording) | `src/data/company/events/voice-of-the-customer-transforming-financial-services-through-listening.json` |
| `/events/whats-new-in-dovetail-IO-launch-2025/` | event-detail (recording) | `src/data/company/events/whats-new-in-dovetail-IO-launch-2025.json` |
| `/events/whats-new-in-dovetail-jan-2026/` | event-detail | `src/data/company/events/whats-new-in-dovetail-jan-2026.json` |
| `/resources/dovetail-review/` | resources-guide (light theme) | `src/data/company/resources/dovetail-review.json` |
| `/resources/dovetail-vs-aurelius/` | resources-guide (light theme) | `src/data/company/resources/dovetail-vs-aurelius.json` |
| `/resources/dovetail-vs-enterpret/` | resources-guide (light theme) | `src/data/company/resources/dovetail-vs-enterpret.json` |
| `/resources/dovetail-vs-marvin/` | resources-guide (light theme) | `src/data/company/resources/dovetail-vs-marvin.json` |
| `/resources/dovetail-vs-qualtrics/` | resources-guide (light theme) | `src/data/company/resources/dovetail-vs-qualtrics.json` |
| `/resources/insight7-alternatives/` | resources-guide (light theme) | `src/data/company/resources/insight7-alternatives.json` |
