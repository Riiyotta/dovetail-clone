Source: https://dovetail.com/

# Content routes → template → data

This file covers 1,722 routes from `src/data/routes.txt`. All share the global chrome in `CLONE_SPEC.md`; the deltas are in `content-shared.md`.

| URL pattern | Count | Template (spec) | Data file | Lookup |
|---|---|---|---|---|
| `/blog/` | 1 | blog-index (`blog-index.md`) | `content/blog.json` | whole file; grid = `posts` minus `featured` |
| `/blog/{ai,dovetail-team,engineering,product,ideas}/` | 5 | blog-index (active filter pill) | `content/blog.json` | `categoryPages[path]`, or filter `posts` by tag label (AI, Dovetail team, Engineering, Product, Ideas) |
| `/blog/<slug>/` (any other) | 202 | blog-post (`blog-post.md`) | `content/blog.json` | `posts.find(p => p.path === path)` |
| `/changelog/` | 1 | changelog-index (`changelog-index.md`) | `content/changelog.json` | `entries` |
| `/changelog/category/<cat>/` (ai, agents, channels, projects, integrations, admin-and-security) | 6 | changelog-index (active pill, filtered) | `content/changelog.json` | `entries.filter(e => e.categories.includes(label))`; labels in `categories[]` |
| `/changelog/<slug>/` (any other) | 349 | changelog-entry (`changelog-entry.md`) | `content/changelog.json` | `entries.find(e => e.path === path)` |
| `/research/`, `/ux/`, `/product-development/`, `/employee-experience/`, `/customer-research/`, `/market-research/`, `/patient-experience/`, `/surveys/`, `/product-management/`, `/design-thinking/` | 10 | guide-article, **hub variant** (`guide-article.md`) | `content/<hub>.json` | `pillar`, `editorsPicks`, `latestArticles`, `articles` (A-Z list after footer) |
| `/<hub>/<slug>/` for those 10 hubs | 1,123 | guide-article (`guide-article.md`) | `content/<hub>.json` | `articles.find(a => a.path === path)`, plus hub-level `sidebarCta`, `editorsPicks`, `latestArticles` (or the per-article overrides) |
| `/guides/` | 1 | guides-index (`guides-index.md`) | `content/guides.json` | whole file |
| `/guides/<slug>/` | 3 | guide-article (crumb "Guides", sidebar CTA `articleSidebarCta`) | `content/guides.json` | `articles.find(...)` |
| `/contributors/` | 1 | contributors-index (`contributors-index.md`) | `content/contributors.json` | `groups` |
| `/contributors/<slug>/` | 20 | contributor-profile (`contributor-profile.md`) | `content/contributors.json` | `profiles.find(...)` |

Per-hub article counts: research 268, product-development 222, ux 172, employee-experience 133, customer-research 116, market-research 82, patient-experience 55, surveys 52, product-management 16, design-thinking 7.

## Index URL vs article URL

All of these paths end with `/`. Split on `/` and drop the empty segments to get `segs`.

1. `segs.length === 1` → **index**. `blog` → blog-index; `changelog` → changelog-index; `guides` → guides-index; `contributors` → contributors-index; any of the 10 hub slugs → **guide hub** (an article-style page plus the A-Z list).
2. `segs[0] === 'blog'` and `segs[1] ∈ {ai, dovetail-team, engineering, product, ideas}` → **blog tag index**. Every other `/blog/<x>/` is a **post**. Watch for the post `/blog/product-…/`: only the exact slug `product` is a tag.
3. `segs[0] === 'changelog'` and `segs[1] === 'category'` (3 segments) → **changelog category index**. Every other 2-segment `/changelog/<x>/` is an **entry**, including date-prefixed slugs like `2024-08-14-…`.
4. `segs.length === 2` under a hub, `guides` or `contributors` → **article / profile**.
5. No route in this group has more than 3 segments, and none uses pagination URLs (`/page/2`). Blog "Load more" and the changelog year filter are client-side.

## Titles for article pages

- Blog posts: `posts[].title`. Changelog entries: `entries[].title`.
- Guide articles: `articles[].title` (A-Z list text). This equals the page H1 for all 1,123 checked.
- Every route in the group has an index entry, so slug-derived titles aren't needed. The fallback is to humanise the slug (`what-is-a-cohort-study` → "What is a cohort study").

## Other templates linked from these pages but out of scope

`/research-maturity-assessment/` (linked from the related-topics cloud), `/enterprise/`, `/contact-sales/`, `/auth/signup/`, `/request-a-demo/`, and `docs.dovetail.com` (changelog CTAs).
