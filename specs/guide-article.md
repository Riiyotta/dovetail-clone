Source: https://dovetail.com/research/action-research/

# Template: guide-article (with `hub` variant)

**Routes:**
- **Articles:** `/<hub>/<slug>/` for the 10 hubs, 1,123 pages: research 268, product-development 222, ux 172, employee-experience 133, customer-research 116, market-research 82, patient-experience 55, surveys 52, product-management 16, design-thinking 7.
- Plus `/guides/<slug>/` (3 pages: `automated-feedback-categorization`, `compare-customer-sentiment-across-channels`, `dovetail-usability-faq`). Their breadcrumb middle crumb is "Guides".
- **Hub variant:** the 10 hub roots `/research/`, `/ux/`, `/product-development/`, `/employee-experience/`, `/customer-research/`, `/market-research/`, `/patient-experience/`, `/surveys/`, `/product-management/`, `/design-thinking/`. Each hub root is itself a long "pillar" article (e.g. `/research/` = "Types of research: A deep dive") using the same DOM, plus the A-Z "All <Category> articles" list after the footer.

**Data:**
- `src/data/content/<hub>.json`:
  - `pillar`: the hub page's own H1, meta and shape.
  - `editorsPicks` / `latestArticles`.
  - `sidebarCta`.
  - `articles[]` in A-Z order, each with `title`, `lastUpdated`, `author`, `reviewer`, `tocItems`, `bodyShape`, `bodyOrder`, and optional per-article carousel overrides.
- `/guides/*` articles are in `guides.json → articles`, with their CTA in `articleSidebarCta`.

The hub's display name (used in the breadcrumb and the "All … articles" heading) is `categoryName`:

| Hub | `categoryName` |
|---|---|
| research | Research methods |
| ux | User experience (UX) |
| product-development | Product development |
| employee-experience | Employee experience |
| customer-research | Customer research |
| market-research | Market research |
| patient-experience | Patient experience |
| surveys | Surveys |
| product-management | Product management |
| design-thinking | Design thinking |

**Theme is LIGHT** (`content-shared.md` §2): html bg #FAFAFA, light nav, light banner quirk, **plain light footer**. The header has the 88px spacer (`main` y 206 / 214).

## Layout (1440)

1. **Title block** `div.css-18r8b5z`: `padding:80px 0 160px; border-radius:8px`. ≤1280: `padding:40px 0 0; border-radius:0`. Inside a `.container` section:
   - **Breadcrumb** (`content-shared.md` §4.5): "GUIDES / RESEARCH METHODS / WHAT IS ACTION RESEARCH?" at y 286. On a hub page: "GUIDES / RESEARCH METHODS".
   - Spacer: 32.
   - **H1** (`css-1a19ybh`): Inter 600 **72/76 ls −2**, #0A0A0A, `margin-bottom:32px`. ≤1280: **56/60** ls −2, mb 24. ≤799: **40/44 ls −1**. y 344 at 1440.
   - The block is 406px tall at 1440 (y 206–612).
2. **Body wrapper** `div{background:#fafafa}`, containing:
   - **Article grid** (`css-1y9l2ec`: 12 × 70, gap 32, row-gap 32, pad 124) with two cells.
   - **Left `aside`** `grid-column:span 4` (x 124, w 376; ≤1280 full width, stacked above the content). Contents:
     - `div{display:flex; flex-direction:column; max-width:600px}` holding:
       - **Meta table** (light; `content-shared.md` §4.3). Label column `width:150px`, so values start at x 274.
         - Rows: **Last updated** "26 April 2023"; **Author** → link to `/contributors/<slug>/`; **Reviewed by** → link.
         - Some articles show only Last updated, or Last updated + Reviewed by (per-article in data).
         - 3 rows = 163px.
       - **Share + Summarize with AI** (light variant: borders #C4C4C4, icons #0A0A0A), `margin-top:48px`.
     - Spacer: 48.
     - **Desktop-only block** (`display:none` at ≤1280). **Articles only; hub pillar pages render just the 40px spacer here.** Contents in order:
       - Spacer: 40.
       - **Sidebar promo** (per hub, from `sidebarCta`):
         - `h2` Inter **18/24 w500 ls −0.25** #0A0A0A (≤1280 16/24).
         - `p` Inter 14/22 #0A0A0A, `margin:8px 0 16px`.
         - Full-width button "Contact sales" → `/contact-sales/`: 376x40, pad 10px 16px, 14/18 w500, bg #0A0A0A, colour #FAFAFA, radius 8, hover bg #3B3B3B, `transition: color/background/opacity 200ms`.
       - Spacer 40, then `hr` (rgba(10,10,10,.24)), then spacer 40.
       - **"Contents"** `h3`: Inter 18/24 w500 ls −0.25, `margin-bottom:16px`.
       - **TOC list** `ul{display:flex; flex-direction:column; gap:16px; list-style:none; margin:8px 0 16px; padding:0}`.
         - Each `li > button` is Inter **14/22 w400 #0A0A0A**, left-aligned, wraps (`overflow-wrap:anywhere`). Hover/active: colour #626262 + underline.
         - One entry per rich-text **h2 and h3, in document order, all at the same indent** (no nesting or numbering).
         - Count: p10 10, **median 19**, p90 28, max 60.
       - **The TOC isn't sticky.** It scrolls away with the page; I measured ul y 1230 at scrollY 0 and −1270 at 2500. There's **no active-section highlighting**.
       - **Click** smooth-scrolls via JS (≈500ms; scrollY samples 878 → 1022 → 1321 → 1387 → 1401) so the heading's top lands at **0** (no offset; headings have `scroll-margin-top:0`). The URL hash doesn't change.
   - **Content cell** `grid-column:6/-1` (x 634, w 682; ≤1280 full width). Contents in order:
     - `hr` (1px rgba(10,10,10,.24)) at the very top, aligned with the first meta `hr`.
     - Spacer: 40.
     - **Rich text** (light; `content-shared.md` §4.1): p #626262 18/28; h2 #0A0A0A 32/40 w500 (48 / 24 margins); h3 24/32 (40 / 24); ul/ol; tables; inline glossary `<button>`s styled as links.
     - Spacer: 80. Then a wrapper holding another 80 spacer and the **Related topics** cloud (`content-shared.md` §4.8).
3. **Carousels section** (`css-1aby5n6`): "Editor's picks↘" (4 items) and "Latest articles↘" (8 items). See `content-shared.md` §4.7. At 1440: Editor's picks heading y 5352, carousel 5472–5708, Latest below it, then a 64 spacer.
4. **Mobile "Contents" sheet** (≤1280 only; `display:none` above). Present on articles and hubs.
   - Bar: `position:fixed; left:0; right:0; bottom:0; top:calc(100% - 64px); max-height:520px; z-index:7; background:#FAFAFA; border-top:1px solid #C4C4C4; overflow:hidden`.
   - Header `button` (`position:sticky; top:0; height:64px; width:100%; padding:0 32px; display:flex; justify-content:space-between; align-items:center; background:#FAFAFA; border-bottom:1px solid #C4C4C4`): label "Contents" in Inter **18/24 w500 ls −0.25** (≤1280: 16/24) #0A0A0A, hover #626262. On the right, a 24x24 chevron-down (stroke 2px, square caps). The chevron does **not** rotate.
   - Body: `div{padding:16px 32px 40px}` > the same TOC `ul` (gap 16), with `opacity:0` when closed.
   - **Open (tap header):**
     - JS tweens inline `top` from 780 to **324** (= viewport height − 520) over ≈500ms, ease-in-out. Samples: 0ms 780 · 140ms 764 · 190ms 700 · 240ms 514 · 290ms 425 · 340ms 380 · 390ms 353 · 440ms 338 · 540ms 325 · 590ms 324.
     - Then `top:auto`, the sheet is 520 tall with `overflow:auto`.
     - The list fades in from opacity 0 to 1, starting ≈350ms, reaching 1 at ≈700ms.
     - The **backdrop** (`div{position:fixed; inset:0; z-index:1; background:rgba(10,10,10,.8); backdrop-filter:blur(4px); transition:opacity .2s}`) goes from `opacity:0; visibility:hidden` to `opacity:1; visibility:visible`.
   - **Close:** tap the header again, or pick an item. Picking an item closes the sheet (verified) and smooth-scrolls to the heading. I didn't verify whether tapping the backdrop closes it. Body scroll isn't locked while open (`html`/`body` overflow stays visible).
5. **Inline CTA** (light; `content-shared.md` §4.6).
6. **Plain light footer.**
7. **Hub variant only, after the footer:** `<nav aria-labelledby="category-article-index">`. These are inline styles, not Emotion:
   - `nav{margin:0 auto; max-width:1512px; padding:64px clamp(16px, 8vw, 124px) 96px}`. Computed side padding: 115.2 @1440, 61.44 @768, 31.2 @390.
   - `h2#category-article-index`: "All <categoryName> articles", Inter **24px w500, line-height normal**, #0A0A0A, `margin:0 0 24px`.
   - `ul{columns:18rem; column-gap:32px; list-style:none; margin:0; padding:0}`. That's 3 columns at 1440 (x 115 / 529 / 943), 2 at 768, 1 at 390.
   - `li{break-inside:avoid; font-size:14px; line-height:1.5 (21px); padding:4px 0}`. `a` is #0A0A0A w400 with no underline and no hover style.
   - Items = `articles[]` (titles verbatim, A-Z as served).
   - Height: 3668 at 1440 for 268 items; 11731 at 390.

## Measured positions

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| breadcrumb y | 286 | 246 | 254 | 254 (wraps to 2 lines) |
| H1 | 72/76, y 344 | 56/60, y 304 | 40/44, y 312 | 40/44, y 340 |
| meta table | x124 y612 w376 | x64 y388 w600 (max-width) | x16 y380 w600 | x16 y452 w358 |
| content | x634 y612 w682 | x64 y783 w1152 | x16 y775 w736 | x16 y959 w358 |
| rich text starts | 653 | 824 | 816 | 1000 |
| doc height (action-research) | 7744 | 7070 | 8316 | 11118 |

## Representative body (1,126 articles measured)

- Characters: p10 7.7k · **median 11.9k** · p90 16.1k.
- Paragraphs: median 47 (p10 29, p90 72).
- **h2: median 7** (p10 5, p90 10). **h3: median 14** (p10 6, p90 23).
- ul: median 4 per article (87% of articles), median 18 li in total. ol in 30% of articles.
- Tables in 35 articles. Blockquotes in 9. **Images almost never** (1 article).
- `bodyOrder` per article gives the exact h2/h3/list sequence.

Placeholder recipe: an intro of 2 paragraphs (~300 + ~150 chars), then about 7 h2 sections. Each h2 is followed by 1–2 paragraphs and then 1–3 h3 subsections, each with 2–3 paragraphs (~200–350 chars). About half the sections include a 3–6 item ul. Finish with an FAQ-style h2 ("…?") containing 3–5 h3 questions, each answered by 1–2 paragraphs. Build the TOC from those h2/h3s.

Hub pillars are similar (median 12.1k chars, 64 paragraphs, 7 h2, 10 h3). `/surveys/` is shorter (≈3k).

## Motion

- TOC click: smooth scroll (~500ms).
- Mobile sheet: ~500ms top tween, list fade, backdrop 200ms.
- Carousel: progress bar and handle follow scroll.
- Link underline grows over 200ms.
- Nothing animates on load.
