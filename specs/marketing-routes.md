Source: https://dovetail.com/

# Marketing routes → template → data

Every route in this recon group, the template spec that builds it (`specs/<template>.md`), and its content file. Shared conventions and the data schema are in `specs/marketing-shared.md`, and the asset manifest is `specs/marketing-assets.json`. Footer variants (A finalCta / B ctaBand / C plain / C-light) are defined in marketing-shared §6.

## Pattern summary

| URL pattern | Template spec | Pages | Notes |
|---|---|---|---|
| `/pricing/` | `specs/pricing.md` | 1 | 2 plans (Free / Enterprise), no billing toggle; comparison table + sticky plan header |
| `/enterprise/` | `specs/enterprise.md` | 1 | vertical tabs, ROI hotspot map, security grid, resources |
| `/enterprise/*` | `specs/enterprise-article.md` | 3 | generic SEO article layout, light theme |
| `/product/*` | `specs/product.md` | 7 | one slice library; per-page composition table in the spec (§0) |
| `/solutions/*` | `specs/solutions.md` | 4 | alternating sections, 60-day trial slice, footer CTA band |
| `/roles/<role>/` | `specs/roles.md` | 6 | single page component; PM adds Prioritization; design/PM/research add Quiz promo |
| `/roles/<role>/quiz/` | `specs/quiz.md` | 3 | client-side 10-question quiz (intro → quiz → result) |
| `/deploy/` | `specs/deploy.md` | 1 | scoping-call form (SalesforceForm minimal) |
| `/the-best-never-guess/` | `specs/best-never-guess.md` | 1 | blue campaign theme, own nav/footer, HubSpot form |
| `/launch/*` (only `/launch/suns-out/`) | `specs/launch.md` | 1 | blue launch microsite, fixed section nav |
| `/menu/` | `specs/menu.md` | 1 | mobile-menu route = header + site footer (not listed in routes.txt; the nav "Menu" pill links here) |

## Every route

| URL | Template | Data file | Doc height @1440 | Alert bar | Nav bg | Footer |
|---|---|---|---|---|---|---|
| `/pricing/` | `pricing` | `src/data/marketing/pricing.json` | 9134 | yes | transparent | finalCta |
| `/enterprise/` | `enterprise` | `src/data/marketing/enterprise.json` | 11417 | yes | transparent | finalCta |
| `/enterprise/how-leading-organizations-use-dovetail/` | `enterprise-article` | `src/data/marketing/enterprise__how-leading-organizations-use-dovetail.json` | 9464 | yes | transparent | plain-light |
| `/enterprise/research-tool-stack-integration/` | `enterprise-article` | `src/data/marketing/enterprise__research-tool-stack-integration.json` | 13480 | yes | transparent | plain-light |
| `/enterprise/why-leading-teams-choose-dovetail/` | `enterprise-article` | `src/data/marketing/enterprise__why-leading-teams-choose-dovetail.json` | 7672 | yes | transparent | plain-light |
| `/product/ai-agents/` | `product` | `src/data/marketing/product__ai-agents.json` | 13145 | yes | #5D00A1 | finalCta |
| `/product/ai-channels/` | `product` | `src/data/marketing/product__ai-channels.json` | 16464 | yes | #982500 | finalCta |
| `/product/ai-chat/` | `product` | `src/data/marketing/product__ai-chat.json` | 12659 | yes | #0029A6 | finalCta |
| `/product/ai-dashboards/` | `product` | `src/data/marketing/product__ai-dashboards.json` | 15302 | yes | #154C14 | finalCta |
| `/product/ai-docs/` | `product` | `src/data/marketing/product__ai-docs.json` | 14655 | yes | #99004F | finalCta |
| `/product/ai-projects/` | `product` | `src/data/marketing/product__ai-projects.json` | 15539 | yes | #0029A6 | finalCta |
| `/product/digital-twins/` | `product` | `src/data/marketing/product__digital-twins.json` | 14937 | no | #7D00D6 | finalCta |
| `/solutions/healthcare/` | `solutions` | `src/data/marketing/solutions__healthcare.json` | 7366 | yes | transparent | ctaBand |
| `/solutions/product-research/` | `solutions` | `src/data/marketing/solutions__product-research.json` | 8748 | yes | transparent | ctaBand |
| `/solutions/research-repository/` | `solutions` | `src/data/marketing/solutions__research-repository.json` | 10858 | yes | transparent | ctaBand |
| `/solutions/voice-of-customer/` | `solutions` | `src/data/marketing/solutions__voice-of-customer.json` | 10739 | yes | transparent | ctaBand |
| `/roles/customer-experience/` | `roles` | `src/data/marketing/roles__customer-experience.json` | 11010 | yes | transparent | finalCta |
| `/roles/design/` | `roles` | `src/data/marketing/roles__design.json` | 11371 | yes | transparent | finalCta |
| `/roles/marketing/` | `roles` | `src/data/marketing/roles__marketing.json` | 10909 | yes | transparent | finalCta |
| `/roles/product-management/` | `roles` | `src/data/marketing/roles__product-management.json` | 12526 | yes | transparent | finalCta |
| `/roles/research/` | `roles` | `src/data/marketing/roles__research.json` | 11061 | yes | transparent | finalCta |
| `/roles/sales-and-cs/` | `roles` | `src/data/marketing/roles__sales-and-cs.json` | 10772 | yes | transparent | finalCta |
| `/roles/design/quiz/` | `quiz` | `src/data/marketing/roles__design__quiz.json` | 2308 | yes | transparent | finalCta |
| `/roles/product-management/quiz/` | `quiz` | `src/data/marketing/roles__product-management__quiz.json` | 2332 | yes | transparent | finalCta |
| `/roles/research/quiz/` | `quiz` | `src/data/marketing/roles__research__quiz.json` | 2308 | yes | transparent | finalCta |
| `/deploy/` | `deploy` | `src/data/marketing/deploy.json` | 10086 | yes | transparent | plain |
| `/the-best-never-guess/` | `best-never-guess` | `src/data/marketing/the-best-never-guess.json` | 5823 | no | transparent | campaign |
| `/launch/suns-out/` | `launch` | `src/data/marketing/launch__suns-out.json` | 16732 | no | transparent | campaign |
| `/menu/` | `menu` | `src/data/marketing/menu.json` | 900 | yes | transparent | plain |

Notes:
- `/menu/` isn't in `src/data/routes.txt`, but the nav links to it, so it's included.
- `footer: campaign` means the page renders its own footer inside `<main>` (best-never-guess, launch). `finalCta` = homepage final CTA + footer; `ctaBand` = 560px `footer-bg.webp` band; `plain` = link grid only; `-light` = light theme.
- Chrome per page is also in each data file under `chrome`.
