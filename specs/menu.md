Source: https://dovetail.com/

# Template: `menu` (1 page): `/menu/`

This is the page the ≤1185px **"Menu"** pill in the site nav links to (CLONE_SPEC §2 left it unspecced). It isn't an overlay: it's a real route (`PageLayout hideHeader hideFooterCtaSlice`). The menu content **is the standard site footer**. Data: `src/data/marketing/menu.json`.

## Layout
1. **Alert bar**: the default (CLONE_SPEC §1). 30 tall desktop, 38 at ≤799.
2. **Menu header** `.e1tmyrcp0`: `display:flex; justify-content:space-between; align-items:center; height:88px; padding:0 64px` (≤799 `0 16px`). Note it uses the **tablet padding (64) at every width ≥800**, not 24 like the normal nav.
   - Left: the Dovetail logo link (`a.e1ndvfkf0`, 45.6x46, pad `10px 11px`, radius 8, 24px-tall white mark SVG `svg/e1ndvfkf0-972496.svg`, → `/`). No hover background.
   - Right: **"Close"** button, `navPrimary` style: white bg, `#0A0A0A` text, 14/16 w500 (measured at 390), pad `10px 16px`, radius 8, 72x38, `transition: all 300ms`, hover `#CECECE`. **Behaviour:** if `history.state === null` (direct landing) it pushes `/`; otherwise it calls `history.back()`.
3. **Footer variant C** (plain link grid, CLONE_SPEC §11). At ≤1280 that includes the **CTA stack** (`.e1gpmlco14`, full-width "Log in" (bg `rgba(255,255,255,.08)`, border `.24`) and "Book a demo" (bg `#0044FF`), each 38 tall, gap 8). This is what makes the page work as a mobile menu.

Measured at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `e1mhpc0o0` | 1440x30 @x0 | 1280x30 @x0 | 768x38 @x0 | 390x38 @x0 |
| `e1tmyrcp0` | 1440x88 @x0 | 1280x88 @x0 | 768x88 @x0 | 390x88 @x0 |
| `e1ndvfkf0` | 45.6x46 @x64 | 45.6x46 @x64 | 45.6x46 @x16 | 45.6x46 @x16 |
| `e1gpmlco2` | 1440x768.6 @x0 | 1280x1402.8 @x0 | 768x2124.2 @x0 | 390x2124.2 @x0 |
| `e1gpmlco13` | 1440x768.6 @x0 | 1280x1402.8 @x0 | 768x2124.2 @x0 | 390x2124.2 @x0 |
| `e1gpmlco14` | hidden | 1152x84 @x64 | 736x84 @x16 | 358x84 @x16 |

Page heights: 900 at 1440 (the footer is 768.6, so the page is shorter than the viewport and the html bg `#0A0A0A` fills the rest); 2250 at 390.

```css
/* e1tmyrcp0 = div 390x88 */
.e1tmyrcp0 { padding: 0px 64px; align-items: center; display: flex; height: 88px; justify-content: space-between }
@media (max-width: 799px) { .e1tmyrcp0 { padding: 0px 16px } }
/* e1ndvfkf0 = a 45x46 */
.e1ndvfkf0 { border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: $sans; font-size: 14px; line-height: 18px; letter-spacing: 0px; margin: 0px; max-width: 100%; text-align: center; white-space: nowrap; width: auto; transition: 300ms; background: transparent; font-weight: 600; border-radius: 8px; color: rgb(255, 255, 255); padding: 10px 11px; display: flex; justify-content: center; align-items: center }
.e1ndvfkf0:disabled { opacity: 0.6; pointer-events: none }
.e1ndvfkf0 > span { margin-left: 4px; margin-right: 0px; transition: transform 150ms cubic-bezier(0.2, 0.6, 0.6, 1) }
.e1ndvfkf0:focus-visible { outline: solid 1px; outline-offset: 1px }
.e1ndvfkf0:hover, .e1ndvfkf0:focus-visible { background: rgba(255, 255, 255, 0.16) }
.e1ndvfkf0:focus-visible { outline-color: rgb(255, 255, 255) }
html[data-scroll-theme="dark"] .e1ndvfkf0 { color: rgb(255, 255, 255) }
html[data-scroll-theme="light"] .e1ndvfkf0 { color: rgb(10, 10, 10) }
.e1ndvfkf0:hover { background: rgba(255, 255, 255, 0.08) }
html[data-scroll-theme="light"] .e1ndvfkf0 { background: transparent }
html[data-scroll-theme="light"] .e1ndvfkf0:hover { background: rgb(235, 235, 235) }
.e1ndvfkf0 svg { height: 24px; width: auto }
.e1ndvfkf0:hover { background: transparent }
html[data-scroll-theme="light"] .e1ndvfkf0:hover { background: transparent }
.e1ndvfkf0:focus-visible { outline: rgb(255, 255, 255) solid 1px; outline-offset: 1px }
@media (max-width: 1280px) { .e1ndvfkf0 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .e1ndvfkf0 { font-size: 14px; line-height: 16px } }
```

## Motion
None beyond the button hover (300ms) and footer link underlines (CLONE_SPEC §11).

## Gaps
- None material. The footer itself is specced in CLONE_SPEC §11.
