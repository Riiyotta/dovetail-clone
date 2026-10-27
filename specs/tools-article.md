Source: https://dovetail.com/research-maturity-assessment/

# Template: article (`/research-maturity-assessment/`; also `/resources/dovetail-vs-{aurelius,enterpret,marvin,qualtrics}/`)

These pages use the **same article component tree as the content/guide articles** (labels `e1i8w341*`, `etar5k9*`, `e19x9lsh*`, `e1i61jy3*`, `e1qeafv2*`, `eryb6ok*`, `e1769tw5*`, `e1noy6on*`, `e8fk9sg*`). That template is already specced in full by the content agent in **`specs/guide-article.md`** (with `content-shared.md` and `enterprise-article.md`). Build these routes with that template. Only the deltas and per-page data are recorded here.

Data: `src/data/tools/research-maturity-assessment.json` and `resources--dovetail-vs-*.json`. They contain:
- `breadcrumb`, `h1`, `lastUpdated`
- `share` and `summarize` button sets (aria labels, URL patterns, icon files)
- `sidebarCta`
- `toc[]` (verbatim headings)
- `body[]`: block outline with verbatim h2/h3, `{placeholder, chars}` for paragraphs and list items, and **comparison tables with verbatim headers and short cells** (e.g. "If you need... / Dovetail / Marvin", rows "Fast qualitative tagging and synthesis | Yes | Yes", …)
- `relatedTopics`
- `ctaFooter`

## Verified values on /research-maturity-assessment/ (they match guide-article)
- **Theme:** light html bg `#FAFAFA` but **no** `data-scroll-theme`, so the announcement banner keeps its dark styling (white text, `rgba(255,255,255,.16)` bg) and is near-invisible. The nav is light: black "Book a demo". The footer is light. There is **no** "The best never guess" final CTA.
- **Title block:** `padding:80px 0 160px` (≤1280 `40px 0 0`).
  - Breadcrumb: "Guides" (`/guides/`, M14 at opacity .6), slash, then a **button** "Research maturity assessment" (Inter 400 14/22 uppercase, `padding:1px 6px`).
  - Spacer 32.
  - H1 72/76 w600 ls -2 `#0A0A0A` (2 lines at 1440, 152 tall; 56/60 at ≤1280; 40/44 at ≤799).
- **Body** (`div`, bg `#FAFAFA`) > SliceGrid:
  - `aside` `span 4` (≤1280 `1/-1`):
    - Meta table `max-width:600px`: hr, row "LAST UPDATED | 8 September 2026" (two 150px M14 `#626262` cells, `padding:16px 0`), hr. **There's no author row on this page.**
    - Share/Summarize row (`display:flex; flex-wrap:wrap; gap:48px; margin-top:48px`). It has two groups (flex column, gap 16), each with a heading Inter 600 14/18 `#0A0A0A` ("Share", "Summarize with AI") followed by 32x32 icon buttons:
      - Buttons: `border:1px solid #C4C4C4; border-radius:8px; color:#0A0A0A; margin-right:8px`; svg 14x14 (Summarize icons 20 viewBox), `fill: currentColor`.
      - Share: Copy link (button) / Facebook / LinkedIn / X.
      - Summarize: ChatGPT / Claude / Perplexity / Grok.
      - Icons are `/assets/tools/svg/share-*.svg` and `summarize-*.svg`. Their source fills are `#FAFAFA` and get overridden to `currentColor`.
    - Sidebar CTA: P16 `#0A0A0A` (156-char placeholder, 4 lines), then a Light-secondary button "Contact sales" → `/contact-sales/` (`margin-top:16px`, 125x40).
  - Content column `6/-1` (≤1280 `1/-1`):
    - `hr` (rgba(10,10,10,.24)), then spacer 40.
    - Prose: the same `.e8fk9sg2` styles as legal-doc (`specs/legal-doc.md §2b`). p 18/28 `#626262`; h2 32/40; h3 24/32; bold `#0A0A0A`; lists with a bold lead-in.
    - Spacer 80.
    - "Related topics" block: flex column, gap 40. Heading M14 `#626262`, then inline M14 `#626262` links rendered in brackets ("[Customer research]" …, 11 links). Hover `#0A0A0A` + underline.
- **≤1280 Contents drawer:** a fixed bottom sheet.
  - Box: `position:fixed; inset:calc(100% - 64px) 0 0; max-height:520px; z-index:7; background:#FAFAFA; border-top:1px solid #C4C4C4`.
  - Header button (64 tall): sticky, `padding:0 32px`, Inter 500 18/24 ls -0.25 "Contents", with a chevron on the right.
  - List: `padding:16px 32px 40px`, with the TOC buttons inside.
  - Backdrop: `rgba(10,10,10,.8)` + `blur(4px)`, `opacity 0.2s`.
  - The desktop TOC isn't visible in the measured states. At 1440 the aside only shows meta, share and CTA (per guide-article).
- **CTA footer slice** (shared H, light): H64 `#0A0A0A` "Turn customer feedback into product innovation"; Black primary "Contact sales" + Light secondary "Try Dovetail free".
- **Document heights:** 13998 at 1440, 11526 at 1280, 14140 at 768, 21011 at 390.

## The 4 `/resources/dovetail-vs-*` pages
Same template. Their breadcrumb, H1, last-updated date, TOC (11–21 entries), body outline and **tables** are in the data files. They duplicate topics with the top-level comparison pages but are separate long-form articles. If the content agent already emits data for `/resources/*`, prefer theirs and treat these files as a cross-check.

## Motion
None besides link and button hovers and the drawer opacity (0.2s). No scroll-spy (MutationObserver verified).
