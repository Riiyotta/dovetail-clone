Source: https://dovetail.com/guides/

# Template: guides-index

**Route:** `/guides/` only.

**Data:** `src/data/content/guides.json` (`intro`, `ctas`, `teiCard`, `topics[]`; also `articles[]` for the 3 `/guides/*` article pages, which use `guide-article.md`).

Theme is **dark**. The header has the 88px spacer (`main` y 206; 214 at ≤799). The footer variant is final-CTA + footer.

## Layout (1440)

1. **Intro** (`.container` section, no top spacer; y 206–450):
   - **H1 "Guides"** (`css-fbbgxe`): Inter 600 **80/84 ls −2**, #FFF (≤1280 64/68 ls −2; ≤799 40/44 ls −1).
   - **Intro `p`**: Inter **20/28 w400 #FFF**, `margin:32px 0; max-width:800px` (≤1280 16/24). 2 lines at 1440, 149 chars. Starts "Welcome to our comprehensive guides and resources page."
   - **Buttons** (`margin-top:32px; display:flex; gap:8px; flex-wrap:wrap`): "Contact sales" → `/contact-sales/` (white: bg #FFF, #0A0A0A, hover #CECECE; 125x40) and "Try Dovetail free" → `/auth/signup/` `target=_blank` (glass: bg rgba(255,255,255,.08), border .24, #FFF, hover .16; 145x40). Both use pad 10px 16px, 14/18 w500 (≤1280 lh 16), radius 8.
2. **Spacer:** 96 (≤1280: 56).
3. **TEI card** (`.container` > `section`):
   - Card box: `display:grid; grid-template-columns:repeat(12,1fr); gap:32px; background:#191919; border-radius:8px; overflow:hidden`. 1192x615 at 1440; ≤799 4 cols.
   - **Text cell** `span 6` (≤1280 1/-1): `display:flex; flex-direction:column; padding:64px`. An inner `div{margin:auto 0}` centres it vertically. It contains:
     - `h2` "The Total Economic Impact™ of Dovetail": Inter **48/56 w500 ls −1** #FFF (≤1280 32/40 ls −0.25; ≤799 24/32). 452 wide, 2 lines.
     - `p`: 16/24 #FFF, `margin-top:32px; max-width:800px`, 129 chars, 3 lines. Starts "Discover how orgs using Dovetail achieved 236% ROI."
   - **Image cell** `span 6`: `img` `/assets/content/Contact_sales_slice__3_.png` (1232x1296 PNG), inline `object-fit:contain; width:100%; height:auto`. 580x610 at 1440.
   - The card **isn't a link** and has no hover state.
   - At 390 the card stacks: text block 358x344 (still padded 64 on all sides, so the text column is 230 wide), then image 358x377.
4. **Spacer:** 200 (≤1280: 96).
5. **Topics section** (grid `css-1wnk2sd`: 12 cols, gap 32, row-gap 32; ≤799 row-gap 64):
   - **Left** `span 4`:
     - `h2` "Topics": Inter 600 **64/68 ls −2** (≤1280 48/52 ls −1; ≤799 32/36 ls −0.25).
     - `p`: 20/28 #FFF, `margin-top:32px` (≤1280 16/24), 244 chars, 7 lines in 376px.
   - **Right** `grid-column:6/span 7` (x 634, w 682; ≤1280 full width): 7 rows.
     - Each row is `div{border-top:1px solid #454545; padding:40px 0}`. The last row also has `border-bottom:1px solid #454545`.
     - **Link** (`a`, flex, `justify-content:flex-start`, #FFF, hover/focus **#A7A7A7**, instant) > `h3`: Inter **20/28 w500 ls −0.25**, `display:flex; gap:8px; align-items:center; margin-bottom:8px` (≤799 16/24). Text is "<Topic> ↗" (a literal U+2197 arrow after a space).
     - **Description** `p`: Inter 16/24 w400 **#A7A7A7** (not part of the link).
     - Row heights at 1440: 167 / 191 / 167 / 143 / 167 / 167 / 168 (1–3 description lines).
     - Rows, in order: Customer research, Product development, User experience (UX), Patient experience, Market research, Surveys, Employee experience. Hrefs are the hub roots. Design thinking, Product management and Research methods are **not** listed.
6. **Spacer:** 200 (as the last child of `main` at ≥1281: 160).
7. Final CTA + footer.

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| H1 | 80/84 | 64/68 | 40/44 | 40/44 (y 214) |
| TEI card | 124,546 1192x615 | stacked | stacked | 16,512 358x750 |
| Topics heading y | 1361 | – | – | 1358 |
| topic list x / w | 634 / 682 | 64 / 1152 | 16 / 736 | 16 / 358 (y 1634) |
| doc height | 4360 | 5594 | 5604 | 5689 |

## Motion

- Topic link colour changes instantly on hover. Buttons transition over 200ms.
- Nothing else moves.
