Source: https://dovetail.com/blog/stakeholder-trust-design-decisions/

# Template: blog-post

**Routes:** `/blog/<slug>/`, 202 posts. Every route under `/blog/` except `/blog/` and the 5 tag routes (`ai`, `dovetail-team`, `engineering`, `product`, `ideas`).

**Data:** `src/data/content/blog.json → posts[]`, matched by `path`. Each post carries `title`, `date`, `tags`, `metaRows`, `credits`, `hero`, `ledeChars`, `bodyShape`, `bodyOrder`, `sidebarCards` and `relatedArticles`. Shared parts are in `content-shared.md` (rich text §4.1, card §4.2, meta table §4.3, share §4.4).

Theme is dark. **There's no 88px header spacer**: `main` starts at 118 (126 at ≤799). The footer variant is final-CTA + footer.

I sampled 15 posts (2017–2026). They all use the same DOM. The variants are listed at the end.

## Layout (values at 1440; grid = 12 cols × 70px, gap 32, pad 124)

1. **Spacer:** 96 (≤1280: 56).
2. **Header grid section** (`css-1y9l2ec`, row-gap 32):
   - **Title cell** `grid-column:span 10` (x 124, w 988; ≤1280 full width). Contents in order:
     - Breadcrumb: a single "Blog" link → `/blog/`. Mono 14 / 140% / ls 1 / uppercase #A7A7A7, hover #FFF + underline. 40x22.
     - Spacer: 32.
     - **H1** (`css-z8gwza`): Inter 600 **64/68 ls −2**, #FFF (≤1280: 48/52 ls −1; ≤799: 32/36 ls −0.25). Two lines at 1440 (988x136).
     - Spacer: 80 (≤1280: 24).
   - **Meta cell** `grid-column:span 6` (x 124, w 580; ≤1280 full width). Flex column, `justify-content:space-between; height:100%`.
     - **Meta table** (dark): rows are Tags `[Ideas]`, Published `7 September 2026`, then credit rows labelled **Content** and **Creative** with the name in mono uppercase.
       - Labels have `min-width:135px`, so values start at x 259.
       - 4 rows = 211px tall (y 516–727).
       - Some posts use a person's name as the label instead of "Content"/"Creative", and some show only 2–3 rows. `metaRows` has the exact rows per post.
     - **Share / Summarize with AI** block: `margin-top:48px` (≤1280 also mb 48), at y 775 (66 tall).
   - **Hero media cell** `grid-column:8/-1` (x 838, w 478; ≤1280 full width):
     - **Video** (28 posts): `<video autoplay loop muted playsinline poster=… src=….mp4>`, `display:block; width:100%; height:auto; border-radius:8px`. 478x269 at 1440 (16:9), 1152x648 @1280, 736x414 @768, 358x201 @390.
     - **Image** (174 posts): `<img loading=eager>` with inline `border:1px solid #313131; border-radius:8px; object-fit:contain; width:100%; height:auto`. Natural aspect.
     - Top-aligned with the meta table at y 516.
3. **Spacer:** 200 (≤1280: 24).
4. **Body grid section** (`css-1y9l2ec`):
   - **Lede cell** `grid-column:span 11` (w 1090):
     - `p.css-hiem65`: Inter **40/48 w500 ls −1**, #FFF (≤1280: 32/40 ls −0.25; ≤799: 24/32 ls −0.25).
     - Then spacer 96 (≤1280: 24).
     - Present on 201/202 posts. Length p10 74, median 145, p90 279, max 449 chars (4 lines at 1440 for 180 chars).
   - **Content cell** `grid-column:2/span 8` (x 226, w 784; ≤1280 1/-1) holds an inner 12-col grid (36px cols, gap 32, row-gap 0). The **rich text** cell is `grid-column:2/span 10`, so **the text column is x 294, w 648** at 1440. At ≤1280 it's full width: 1152 @1280, 736 @768, 358 @390.
     - Dark rich text: see `content-shared.md` §4.1. Paragraphs are #A7A7A7 18/28 (mb 24); h2 32/40 #FFF (48 / 24 margins); images full column width with 64px vertical margins.
   - **Sidebar** `aside` `grid-column:span 3` (x 1042, w 274), `display:flex`. **Hidden at ≤1280.**
     - Inner `aside` is a flex column, `align-items:stretch; flex:1`, height = body height.
     - It contains **3 wrappers** (`flex:1; margin-bottom:80px`, last 0). Each is about (bodyHeight − 160)/3 tall: 2366px for a 7258px body.
     - Each wrapper holds **one sticky card** (`position:sticky; top:112px`). I verified this live: card 1 pins at 112 from scroll ≈1250 until its wrapper ends, then card 2 takes over, then card 3.
     - Sidebar card = shared image card, 274 wide: image 274x183 (3:2); text block `margin:32px 0` containing **title only** (20/28 w500 ls −0.25, #FFF), **no date and no tags**. Card heights 305–361.
     - Cards come from `sidebarCards` (3 other recent posts).
   - **Related Articles** cell `1/-1`:
     - Spacer 200 (≤1280: 96).
     - `p.css-rccvdn` "Related Articles": Inter **48/56 w500 ls −1**, #FFF (≤1280: 32/40 ls −0.25; ≤799: 24/32).
     - Spacer 64.
     - Then 3 cards `span 4` (x 124 / 532 / 940, w 376; ≤1280 full width): image 376x251 plus **title only** (20/28; ≤799 16/24). Same 3 posts as the sidebar (`relatedArticles`). Row-gap 32 (≤1280: 24).
5. **Spacer:** 200 (as the last child of `main` at ≥1281: **160**).
6. Final CTA + footer.

## Measured positions

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| crumb y | 214 | 174 | 182 | 182 |
| H1 y / h | 268 / 136 | 228 / 104 | 236 / 72 | 236 / 108 |
| meta table y | 516 | 380 | 356 | 392 |
| hero media | 838,516 478x269 | 64,775 1152x648 | 16,751 736x414 | 16,899 358x201 |
| lede y | 1041 | 1447 | 1189 | 1124 |
| body text x / w | 294 / 648 | 64 / 1152 | 16 / 736 | 16 / 358 |
| body y | 1361 | 1615 | 1333 | 1364 |
| "Related Articles" y | 8851 | 8379 | – | 10538 |

## Representative body (for placeholders)

Measured across all 202 posts (`bodyShape` has per-post counts):
- Characters: p10 3.4k · **median 7.2k** · p90 10.5k.
- Paragraphs: median 27 (p10 12, p90 42).
- h2: median 3 (153/202 posts have any).
- h3: in 61 posts. h4: in 9 interview posts, formatted as bold questions.
- Lists: ul in 70 posts, ol in 29 posts.
- Inline images: median 1 (in 112 posts, up to 14).
- Blockquotes: in 56 posts. Figures with captions: in 18 posts, sometimes as a 2-up `css-1iaa25u` grid. Tables: in 3 posts. YouTube iframes: in 13 posts. Inline `<video>`: in 23 posts. `<hr>`: in 6 posts.

A typical placeholder: lede ~150 chars; intro 3–4 paragraphs (~250–450 chars each); then 4–5 h2 sections, each with 3–6 paragraphs; 1–3 full-width images between sections; one ol/ul of 3–6 items; optionally one blockquote.

## Variants

- **Hero:** video (28) vs image (174). The image hero has a 1px #313131 border; the video hero has none.
- **Credits:** 164 posts have Tags/Published/Content/Creative; 34 have Tags/Published/Content; 4 have only Tags/Published.
- **No lede:** 1 post.
- Very short posts exist (e.g. `/blog/design-can-play-and-is-already-playing-a-critical-role/`, 93 chars plus 1 image). The sticky sidebar wrappers are still 3 equal parts of the body height.

## Motion

- Hero video autoplays and loops. Body videos play/pause via IntersectionObserver. Sticky sidebar is pure CSS.
- Card hover: see the shared card spec. Rich-text links: underline grow over 200ms.
- Nothing animates on load.
