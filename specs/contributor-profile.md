Source: https://dovetail.com/contributors/hugh-good/

# Template: contributor-profile

**Routes:** `/contributors/<slug>/` (20 profiles).

**Data:** `src/data/content/contributors.json → profiles[]` by `path`: `name`, `role`, `skills[] {href,text}`, `articleLists` (`{ "<exact heading>": [{href,title,date}] }`).
- Headings are "Articles written by <FirstName>" and/or "Articles reviewed by <FirstName>". Either may be absent.
- List sizes range from 1 to 742. For example, Hugh Good has 11 written and 119 reviewed, and Dovetail Editorial Team has 742 written.

Theme is **LIGHT**. The header has the 88px spacer. The footer variant is the light final CTA + light footer.

## Layout (1440)

1. **Spacer:** 112.
2. **Title block** (same box as contributors-index: `padding:80px 0 160px`; ≤1280 `40px 0 0`). Contents in order:
   - **Breadcrumb**: "CONTRIBUTORS" (mono, opacity .6, link `/contributors/`), a "/" SVG, then the current name as a `<button>` (Inter 14/22 uppercase). At y 398.
   - Spacer: 32.
   - **H1** = name: Inter 600 **72/76 ls −2**, mb 32 (≤1280 56/60, mb 24; ≤799 40/44 ls −1).
   - Role: a 12-col grid with a `span 9` cell holding `p` Inter **16/24** #0A0A0A (the job title). Empty when null.
3. **Spacer:** 64 (≤1280: 40).
4. **Skills** (`.container`) > `div{max-width:736px}`, containing:
   - Spacer 80.
   - Block `{display:flex; flex-direction:column; gap:40px}`:
     - `p` "Skills" (mono 14 / 140% / ls 1 / uppercase #626262, mb 16) followed by an `hr`.
     - Tag links `[Customer research]` etc. (mono 14 uppercase #626262, inline `margin:0 8px 8px 0`, hover #0A0A0A + underline). Hrefs are hub roots. Same component as "Related topics" (`content-shared.md` §4.8).
5. **Spacer:** 200 (≤1280: 96).
6. **Editorial process box**: identical to contributors-index item 6.
7. **Spacer:** 200 (≤1280: 96).
8. **Article list section(s)**: one per `articleLists` key, separated by 200 spacers (≤1280: 96).
   - Grid `css-kpwz4p`: 12 cols, gap 32, **row-gap 64** (≤1280 24; ≤799 4 cols, row-gap 24).
   - **Heading** cell `1/-1`: `h2` Inter **24/32 w500 ls −0.5** (≤1280 20/28; ≤799 18/24).
   - **Items** `grid-column:span 4`, i.e. 3 per row at 1440 (x 124 / 532 / 940, w 376). It stays span 4 of 12 at ≤1280 (3 per row) and becomes full width at ≤799 (4 of 4 cols).
     - Title link (`css-1pt420k`): Inter **18/24 w500 ls −0.25** #0A0A0A (≤1280 16/24), `margin-bottom:8px`, block, wraps. Hover: colour #626262 + underline.
     - Date `p`: mono 14 / 140% / ls 1 / uppercase **#626262**, e.g. "22 February 2024".
     - Item height 54–102 depending on title lines.
   - **No pagination**: all items render. No thumbnails.
9. Light final CTA + footer.

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| H1 y | 456 | – | 424 | – |
| skills block | 124,892 w736 | – | 16,636 | – |
| list columns | 3 × 376 | 3 | 1 (736) | 1 (358) |
| doc height (hugh-good) | 9997 | 7983 | 14128 | 15827 |

## Motion

- Link hover colour and underline change instantly.
- There are no avatars or photos, and no other motion.
