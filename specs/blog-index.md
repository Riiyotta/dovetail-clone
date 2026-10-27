Source: https://dovetail.com/blog/

# Template: blog-index

**Routes:** `/blog/` and the 5 tag pages `/blog/ai/`, `/blog/dovetail-team/`, `/blog/engineering/`, `/blog/product/`, `/blog/ideas/`.

**Data:** `src/data/content/blog.json`. Shared parts (card, chrome, grid) are in `content-shared.md`.

Theme is dark (#0A0A0A). The header has the 88px spacer, so `main` starts at y 206 (214 at ≤799). The footer variant is final-CTA + footer.

## Structure (top → bottom)

1. **Top spacer:** 96px (≤1280: 0).
2. **Hero grid section** `css-1sf5qe9`: 12 columns, gap 32, **row-gap 64**, pad 0 124. ≤1280: gap 24/24, pad 0 64. ≤799: 4 columns, gap 24, row-gap 64, pad 0 16.
   - **Featured card A** (`grid-column:2/span 4`): at 1440, x 226, w 376; image 376x251 (3:2).
   - **Featured card B** (`grid-column:7/span 5`): x 736, w 478; image 478x319.
   - Both are the shared image card with the **featured title** style (24/32 w500 ls −0.5) and the text block `margin:32px 0`, which contains the title and date (gap 16) and then the tag line.
   - Card A spans y 302–810 and card B y 302–810 (the B image is taller, so A's text sits higher). Both featured cells are **`display:none` at ≤1280**.
   - The featured pair is the same on every tag page (`blog.json → featured`).
   - **Title row** (`grid-column:1/-1; margin-top:64px`; ≤1280: `order:-1; margin-top:56px; margin-bottom:64px`): flex, `justify-content:space-between; align-items:flex-end; gap:24px`. ≤1280: column, align-start, gap 32.
     - **H1 "Blog"** (`css-1smlclh`): Inter 600, **160/164, ls −4px**, #FFF (329x164 at 1440). At ≤1280 and at 390 it's **72/80 ls −2** (147x80). The ≤799 48/52 rule is overridden by a later duplicate rule, so 72/80 is what renders at 768 and 390.
     - **Filter pills** (`div{display:flex; flex-wrap:wrap; gap:8px; padding-bottom:16px}`; ≤1280 pb 0): six `<button>`s: All, AI, Dovetail team, Engineering, Product, Ideas.
       - Each is Inter 14/22 w400, `padding:8px 12px`, radius 8, `backdrop-filter:blur(8px)`, `transition: background 150ms, color 150ms`.
       - Inactive: bg `rgba(255,255,255,.08)`, colour #A7A7A7; hover bg .16, #FFF.
       - Active (current route): bg `rgba(255,255,255,.16)`, colour #FFF.
       - Measured sizes (h 38): 40 / 37 / 115 / 102 / 76 / 60 px wide. At 1440 the row spans x 846–1316, y 1048. At 390 it wraps to 2 rows (84 tall).
       - **Clicking navigates** (client-side router push) to `/blog/<tag>/`. All → `/blog/`.
3. **Spacer:** 80px (≤1280: 0).
4. **Grid wrapper** (≤1280: `padding-bottom:64px`) > `section.css-1sf5qe9`:
   - A zero-height full-width cell, then the cards.
   - **≤1280 only:** the featured posts that match the current filter are repeated as the first grid cards (`css-1vpodit`, hidden above 1280). On `/blog/` that's both; on `/blog/ai/` only the second.
   - **Grid cards** `grid-column:span 4` (3 per row at 1440: x 124 / 532 / 940, w 376). ≤1280: full width (1152 @1280, 736 @768, 358 @390).
     - Card = flex column, gap 32 (≤1280: 16): image 3:2 (376x251 @1440; 1152x768 @1280; 736x491 @768; 358x239 @390), then the text link (`flex:2`, column, gap 32 / 16).
     - Text link contains the title (20/28 w500 ls −0.25; ≤799 16/24) and date (16/24 #FFF) with gap 16, then the tags (mono 14 uppercase #A7A7A7).
     - Card heights at 1440: 432–460 (title 1–3 lines + tags 1–2 lines). Row-gap 64. First grid row y = 1246 at 1440.
   - **Load more:** `div{display:flex; justify-content:center; padding-top:64px}` holding a button.
     - Glass style: `padding:10px 16px`, 14/18 w500, bg rgba(255,255,255,.08), border 1px rgba(255,255,255,.24), radius 8, #FFF, hover bg .16, `transition: color/background/opacity 200ms`.
     - 105x40 (38 tall ≤1280). Centred: x 667 @1440.
     - **Each click appends the next 24 posts** (verified 24 → 48 → 72 grid cards). The button stays while more remain. Engineering (8 posts) has no button. URL unchanged; no animation.
5. **Spacer:** 320px (≤1280: 0). Then a spacer of 0 (≤1280: 32px).
6. Final CTA + footer.

## Responsive summary (measured)

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| main top | 206 | 206 | 214 | 214 |
| H1 | 160/164, at y 938 | 72/80, y 262 | 72/80, y 270 | 72/80, y 270 |
| filters top | 1048 (right-aligned to H1 baseline) | 374 (under H1, +32) | 382 | 382 (2 rows) |
| first grid card y | 1246 (after featured) | 500 (featured A as card) | 548 | 594 |
| card w × image h | 376 × 251 | 1152 × 768 | 736 × 491 | 358 × 239 |
| card gap (vertical) | 64 | 24 | 64 | 64 |
| doc height (24 cards) | 7432 | 26658 | 20767 | 14890 |

## Data → UI mapping

`blog.json → posts[]` is newest-first (203 posts).
- The **grid excludes the 2 `featured` paths**. Page 1 = posts 1–24 that aren't featured.
- Tag pages filter by `tags` containing the label. `categoryPages` gives the exact SSR first page for each tag route (featured pair + grid).
- Card date = `date`. Tags = `tags` rendered as `[Tag]` joined by spaces.
- Image = `thumbnail` (local, first page only) or `thumbnailRemote`. Always the `-poster.png` for GIF covers.

## Motion

- Card hover: image `::after` dims to rgba(0,0,0,.2) over 200ms ease-in-out; title/date/tags turn #A7A7A7 instantly.
- Filter pill hover: 150ms.
- No entrance animations.
