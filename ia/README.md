# Dovetail clone: information architecture

**Edit `ia.json` by hand. Don't edit `IA.md` or `matrix.csv`:** `build.mjs` regenerates them and overwrites any changes.

| file | kind | what it is |
|---|---|---|
| `ia.json` | **hand-edited** (source of truth) | 41 templates, 1,899 routes, 158 sections in 14 categories |
| `IA.md` | generated | readable IA: template shares, chrome split, sections by reuse (with implementation column), per-template tables, section reference |
| `matrix.csv` | generated | section × template grid for spreadsheets |
| `validate.mjs`, `build.mjs` | copied unchanged from the `ia-builder` skill | generic; everything they do comes from `ia.json` |

## Re-run

```bash
cd ia
node validate.mjs && node build.mjs
```

Update `ia.json` and re-run both scripts after any change to `src/routes.jsx`, `src/pages/*/routes.jsx`, the data globs those files read (`src/data/marketing/{roles,solutions,product}__*.json`, the slug arrays in `src/pages/legal/routes.jsx`, `HUBS` in `src/pages/guides/data.js`), `src/chrome.jsx`, or a page's section order. Each section's `scope` contains exactly one number: that section's computed route count. The validator flags any mismatch.

## How it was built

- **Routes.** Every line of `src/data/routes.txt` (1,898) plus `/menu/` (not in routes.txt; the nav's Menu pill links to it, and the clone serves it) was matched with react-router's own `matchRoutes` against a mirror of the real route config, data globs and slug arrays included. All 1,899 routes landed in a template. None were left over and none fell through to the 404 catch-all.
- **Section order** comes from each page component's JSX. It was checked top to bottom against the running clone (`http://localhost:5210`, headless Playwright at 1440px) on one route per template, plus variants: an anonymous and a video customer story, a recording event, the Digital Twins product page, the product-management role page, a privacy doc and an unmatched path.
- **`chrome`** is simplified from each page's `usePageChrome({...})` call (`src/chrome.jsx`) and takes the form `<theme/nav> · <page bottom>`. `final-cta` means the page renders `FinalCta` and then the footer. `inline-cta` is the `plain` footer, which puts `InlineCta` above the link grid. `cta-band` is the 560px image band above the link grid. `footer-only` means the link grid only, which some pages precede with their own CTA. `campaign` and `launch` pages draw their own footer.
- **`implementedBy`** is set on every section, with paths relative to `src/`. When one original block is built more than once in the clone, the implementations are separated by ` | `. Every such section is a duplication finding (see below).
- **`notes`** on a template record per-member differences (optional sections, repeats, sections that render only in one state). `build.mjs` doesn't print them, so they live only in `ia.json`.
- **`template.not-found`** has `routeCount: 0` (`routes: ["*"]`). The clone renders it for any unmatched path, but no listed route resolves to it.

### Informational: what the counts mean

`validate.mjs` reported 0 hard failures and 0 scope mismatches. Route counts are **per template, not per member**. For example, `help.faq` shows 127 routes because all 39 customer stories count, even though only the 18 anonymous stories render a FAQ. Likewise, `chrome.banner` counts all 7 product pages, although Digital Twins hides the banner. Member-level placement is in each template's `notes`. Don't "correct" these numbers to member counts: the validator computes at template level and would flag the change.

## Findings (from this run of validate.mjs / build.mjs)

1. **88% of routes are three templates.** Guide article (1,126), changelog entry (349) and blog post (203) cover 1,678 of 1,899 routes. The other 221 routes span 38 templates, and 19 of those templates have a single route (the 404 template has none). The light `inline-cta` chrome alone covers 1,141 routes (guide articles, hubs and tools articles).
2. **27 sections are shared and 131 are page-local.** The shared ones include the site chrome (banner, navbar and footer on 38 templates and 1,896 routes), `cta.final-cta` (19 templates, 703 routes), `cta.feedback-cta` (14 templates, 1,164 routes), `help.faq` (11 templates), `proof.logo-strip` (8 templates) and the article family's title, body and contents-sheet sections (5 templates, 1,146 routes). Some of this reuse is real and should stay that way: `FinalCta.jsx`, `corporate/common.jsx > SecurityGrid`, the guides article components that the enterprise and tools articles also use, and `company/PixelBand.jsx`, which wraps the marketing `PixelTransitionSlice` instead of copying it.
3. **18 shared sections are implemented more than once.** These are the build debt:
   - **"Turn customer feedback into product innovation" CTA** (`cta.feedback-cta`): 6 implementations.
   - **FAQ** (`help.faq`): 4 implementations, in the marketing, company, tools and legal folders.
   - **Logo strip** (`proof.logo-strip`): 4 implementations. Each sits on its own Marquee primitive, and `marketing`, `company`, `tools` and `legal` each ship a `Marquee.jsx`.
   - **Featured testimonial** (`proof.testimonial`): 3 implementations.
   - **60-day trial offer** (`conversion.trial-offer`): solutions and comparison pages each have their own.
   - **Footer CTA band** (`chrome.footer-cta-band`): `Footer.jsx` for solutions, plus a local `PreFooter` in careers.
   - **Campaign pages**: `/the-best-never-guess/` and the AWS Summit page share 8 blocks (nav, hero, text slice, testimonial, story grid, team switch, trial form, footer), and every one is built twice. The best-never-guess page also carries its own `StoryCard` copy.
   - **Other near-copies:** careers uses a local `RowList` in `pages/company/Parts.jsx` (because job links open in the same tab), the resources guides re-implement the breadcrumb, TOC, contents drawer and a carousel that the guides components already provide, and `roles/RoleSections.jsx` carries its own `useTabGroup` next to `components/marketing/useTabGroup.js`.
4. **The changelog index rendered the feedback CTA twice** (7 routes): once inside `<main>` and again from the `plain` footer. Fixed 2026-10-26 by switching that page to the links-only `default` footer; `/changelog/` now shows one.

## Where the running clone and the specs disagree

| claim | source | clone |
|---|---|---|
| Role pages (6) end with the "The best never guess" final CTA (footer variant A) | `marketing-shared.md` §6, `roles.md` | no final CTA; footer only (`RolePage.jsx` doesn't render `FinalCta`) |
| Role quizzes (3) end with the CTA footer slice and then the final CTA | `quiz.md`, `marketing-shared.md` §6, `tools-shared.md` §J | the CTA slice appears only on the result screen, and there's no final CTA |
| Changelog index has one inline CTA, then the plain footer | `changelog-index.md`, `content-shared.md` §1 | two inline CTAs (finding 4) |
| `/resources/dovetail-vs-{aurelius,enterpret,marvin,qualtrics}/` are resources-guide pages | `company-routes.md` | rendered by `ToolsArticle` (`legal/routes.jsx`), as `tools-routes.md` says |
| 404 returns HTTP 404 | `not-found.md` | the dev server returns 200 for unmatched paths (a code comment in `NotFound.jsx` acknowledges this) |
