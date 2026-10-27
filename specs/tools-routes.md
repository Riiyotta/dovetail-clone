Source: https://dovetail.com/

# Routes → template → data (tools / forms / comparisons / legal group)

Shared components, light-theme chrome, buttons and spacers: `specs/tools-shared.md`. Assets: `specs/tools-assets.md`.

## URL patterns

| URL pattern | Template | Spec | Data file |
|---|---|---|---|
| `/contact-sales/`, `/request-a-demo/` | demo-form | specs/demo-form.md | `src/data/tools/{slug}.json` |
| `/dovetail-vs-:competitor/` (16) | comparison | specs/comparison.md | `src/data/tools/dovetail-vs-{competitor}.json` |
| `/quiz/` | quiz-hub | specs/quiz.md | `src/data/tools/quiz.json` |
| `/roles/{product-management,research,design}/quiz/` (not in this group's list; flow specced here) | role-quiz | specs/quiz.md §B | `src/data/tools/quiz.json → roleQuizzes.{product,research,design}` |
| `/roi-calculator/` | roi-calculator | specs/roi-calculator.md | `src/data/tools/roi-calculator.json` |
| `/ux-research-plan-template/`, `/user-persona-template/`, `/research-report-template/` | template-landing | specs/template-landing.md | `src/data/tools/{slug}.json` |
| `/legal/` | legal-index | specs/legal-index.md | `src/data/tools/legal.json` |
| `/legal/:slug/` (14), `/privacy/:slug/` (5) | legal-doc | specs/legal-doc.md | `src/data/tools/legal--{slug}.json`, `src/data/tools/privacy--{slug}.json` |
| `/research-maturity-assessment/`, `/resources/dovetail-vs-{aurelius,enterpret,marvin,qualtrics}/` | article (shared with content agent) | specs/tools-article.md → specs/guide-article.md | `src/data/tools/research-maturity-assessment.json`, `src/data/tools/resources--dovetail-vs-{x}.json` |
| `*` (no match) | 404 | specs/not-found.md | `src/data/tools/404.json` |

Slug rule: path without the leading and trailing slashes, with `/` replaced by `--`.

## Every route

| URL | Template | Data file |
|---|---|---|
| `*` | 404 | `src/data/tools/404.json` |
| `/research-maturity-assessment/` | article | `src/data/tools/research-maturity-assessment.json` |
| `/resources/dovetail-vs-aurelius/` | article | `src/data/tools/resources--dovetail-vs-aurelius.json` |
| `/resources/dovetail-vs-enterpret/` | article | `src/data/tools/resources--dovetail-vs-enterpret.json` |
| `/resources/dovetail-vs-marvin/` | article | `src/data/tools/resources--dovetail-vs-marvin.json` |
| `/resources/dovetail-vs-qualtrics/` | article | `src/data/tools/resources--dovetail-vs-qualtrics.json` |
| `/dovetail-vs-aurelius/` | comparison | `src/data/tools/dovetail-vs-aurelius.json` |
| `/dovetail-vs-chattermill/` | comparison | `src/data/tools/dovetail-vs-chattermill.json` |
| `/dovetail-vs-condens/` | comparison | `src/data/tools/dovetail-vs-condens.json` |
| `/dovetail-vs-enterpret/` | comparison | `src/data/tools/dovetail-vs-enterpret.json` |
| `/dovetail-vs-great-question/` | comparison | `src/data/tools/dovetail-vs-great-question.json` |
| `/dovetail-vs-insight7/` | comparison | `src/data/tools/dovetail-vs-insight7.json` |
| `/dovetail-vs-lookback/` | comparison | `src/data/tools/dovetail-vs-lookback.json` |
| `/dovetail-vs-looppanel/` | comparison | `src/data/tools/dovetail-vs-looppanel.json` |
| `/dovetail-vs-marvin/` | comparison | `src/data/tools/dovetail-vs-marvin.json` |
| `/dovetail-vs-maze/` | comparison | `src/data/tools/dovetail-vs-maze.json` |
| `/dovetail-vs-medallia/` | comparison | `src/data/tools/dovetail-vs-medallia.json` |
| `/dovetail-vs-notably/` | comparison | `src/data/tools/dovetail-vs-notably.json` |
| `/dovetail-vs-pendo/` | comparison | `src/data/tools/dovetail-vs-pendo.json` |
| `/dovetail-vs-qualtrics/` | comparison | `src/data/tools/dovetail-vs-qualtrics.json` |
| `/dovetail-vs-thematic/` | comparison | `src/data/tools/dovetail-vs-thematic.json` |
| `/dovetail-vs-usertesting/` | comparison | `src/data/tools/dovetail-vs-usertesting.json` |
| `/contact-sales/` | demo-form | `src/data/tools/contact-sales.json` |
| `/request-a-demo/` | demo-form | `src/data/tools/request-a-demo.json` |
| `/legal/acceptable-use-policy/` | legal-doc | `src/data/tools/legal--acceptable-use-policy.json` |
| `/legal/accessibility-statement/` | legal-doc | `src/data/tools/legal--accessibility-statement.json` |
| `/legal/ai-features/` | legal-doc | `src/data/tools/legal--ai-features.json` |
| `/legal/ai-models/` | legal-doc | `src/data/tools/legal--ai-models.json` |
| `/legal/anti-bribery-and-anti-corruption-statement/` | legal-doc | `src/data/tools/legal--anti-bribery-and-anti-corruption-statement.json` |
| `/legal/community-code-of-conduct/` | legal-doc | `src/data/tools/legal--community-code-of-conduct.json` |
| `/legal/insurance/` | legal-doc | `src/data/tools/legal--insurance.json` |
| `/legal/master-subscription-agreement/` | legal-doc | `src/data/tools/legal--master-subscription-agreement.json` |
| `/legal/modern-slavery-statement/` | legal-doc | `src/data/tools/legal--modern-slavery-statement.json` |
| `/legal/mutual-non-disclosure-agreement/` | legal-doc | `src/data/tools/legal--mutual-non-disclosure-agreement.json` |
| `/legal/open-source/` | legal-doc | `src/data/tools/legal--open-source.json` |
| `/legal/press-kit/` | legal-doc | `src/data/tools/legal--press-kit.json` |
| `/legal/product-specific-terms-recruit/` | legal-doc | `src/data/tools/legal--product-specific-terms-recruit.json` |
| `/legal/user-terms-of-service/` | legal-doc | `src/data/tools/legal--user-terms-of-service.json` |
| `/privacy/compliance-with-laws/` | legal-doc | `src/data/tools/privacy--compliance-with-laws.json` |
| `/privacy/data-processing-agreement/` | legal-doc | `src/data/tools/privacy--data-processing-agreement.json` |
| `/privacy/data-subject-access-request/` | legal-doc | `src/data/tools/privacy--data-subject-access-request.json` |
| `/privacy/event-release/` | legal-doc | `src/data/tools/privacy--event-release.json` |
| `/privacy/privacy-policy/` | legal-doc | `src/data/tools/privacy--privacy-policy.json` |
| `/legal/` | legal-index | `src/data/tools/legal.json` |
| `/quiz/` | quiz-hub | `src/data/tools/quiz.json` |
| `/roi-calculator/` | roi-calculator | `src/data/tools/roi-calculator.json` |
| `/research-report-template/` | template-landing | `src/data/tools/research-report-template.json` |
| `/user-persona-template/` | template-landing | `src/data/tools/user-persona-template.json` |
| `/ux-research-plan-template/` | template-landing | `src/data/tools/ux-research-plan-template.json` |
