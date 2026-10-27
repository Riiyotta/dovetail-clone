Source: https://dovetail.com/this-page-does-not-exist-xyz/

# Template: 404 (any unknown path)

The live site returns **HTTP 404** with document title "Dovetail". Theme: **dark**. The nav is normal (with Log in / Book a demo), then this hero, then the shared dark final CTA "The best never guess", then the footer. Data: `src/data/tools/404.json`.

## Geometry
| Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| 404 hero wrapper (pulled up under the nav) | 118 / 891 | 118 / 602 | 126 / 490 | 126 / 514 |
| Background image rect | 0,33 1440x1061 | 0,-53 1280x943 | 0,88 768x566 | 0,239 390x287 |
| **Document height** | 2678 | 3023 | 3175 | 3169 |

## Layout
- **Wrapper** `div`: `position:relative; margin-top:-88px`. (Main starts at y=118, so the wrapper box is reported at 118 after the negative margin is folded into the nav flow; the image visually extends under the nav and banner.)
- **Background** `<img src="/assets/tools/Hero_BG.png" alt="">` (3024x2228 PNG: a dark perspective "room" of 1px grid lines):
  - `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); height:1270px`.
  - The global `img{max-width:100%; height:auto}` caps it to the viewport width, so it renders 1440x1061 at 1440 and 390x287 at 390, centred on the wrapper's vertical middle.
  - No overlay or gradient. The image's own edges fade to #0A0A0A.
- **Content section** (`max-width:1512px; margin:0 auto; width:100%; position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:187px 0 276px`; ≤1280 `padding:120px 16px`):
  - H1 "404": Inter 600 **160/164 ls -4** `#FFF` (stays 160 at 1280; ≤799 **48/52 ls -1**). It's 307x164 at 1440.
  - `p` "Page not found": Inter 500 32/40 ls -0.5 `#FFF`, `margin-bottom:24px` (≤1280 24/32 ls -0.25).
  - `p` body: Inter 400 24/32 ls -0.5 `#FFF`, `max-width:522px; text-align:center; margin:0 0 32px` (≤1280 16/24 ls normal). 4 lines at 1440. Placeholder is 150 chars.
  - Button row: `display:flex; flex-wrap:wrap; gap:16px; justify-content:center`.
    - White "Back home" → `/` (108x40).
    - Secondary "Check Dovetail status" → `//status.dovetail.com/` (`target=_blank`; 180x40).
    - Height is 38 at ≤1280.
- **Measured at 1440:** H1 at y=305, "Page not found" at 469, body at 533, buttons at 693. The hero box spans 118→1009.

## Routing note for the build
- Use a catch-all route (`*`) that renders this page.
- The dev server can't set a real 404 status. Note this as a deviation, if relevant.

## Motion
None.
