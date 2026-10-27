Source: https://dovetail.com/

# Template: `pricing` (1 page): `/pricing/`

A one-off page component (chunk `2fy8qfjovg8e7`). There are **two plans (Free, Enterprise) and no monthly/annual toggle**. Below them is a 4-group feature comparison table with hover tooltips, a sticky plan header that slides in over the table, and a mobile plan switcher. Chrome: default alert bar and transparent nav (`main` y=118). Footer **variant A**. Data: `src/data/marketing/pricing.json`. Besides `sections`, it has `plans[]` (verbatim names, prices, descriptions, feature bullets, tooltip texts, CTA) and `comparisonTable[]` (every row: feature, tooltip, free/enterprise value, where `"included"` means a check icon and `null` means not included). Read `marketing-shared.md` first.

## 0. Order
1. **PricingHero** (bg image section)
2. Spacer 96 (sm 32)
3. **PlanCards** (z-index 1)
4. Spacer 200/96 → **CompactLogoSlice** (shared §7.5)
5. **ComparisonTable** (with sticky header + mobile bottom bar)
6. Spacer → **FAQ** (shared §7.1) with a subtitle
7. Spacer 200 (→160)

Measured at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `e16w69m62` | 623x168 @x124 80px/84px | 492x136 @x64 64px/68px | 311.5x88 @x16 40px/44px | 311.5x88 @x16 40px/44px |
| `eeys7nh0` | 376x925.6 @x124 | 368x875.6 @x64 | 736x587.6 @x16 | 358x683.6 @x16 |
| `eeys7nh2` | 278x292 @x173 | 302x240 @x97 | 670x232 @x49 | 292x232 @x49 |
| `eeys7nh13` | 144.5x40 @x173 14px/18px | 144.5x38 @x97 14px/16px | 144.5x38 @x49 14px/16px | 144.5x38 @x49 14px/16px |
| `e1hik68n5` | 470x120 @x124 56px/60px | 470x88 @x64 40px/44px | 470x36 @x16 32px/36px | 358x72 @x16 32px/36px |
| `e1hik68n12` | 1192x73 @x124 | 1152x73 @x64 | 736x69 @x16 | 358x69 @x16 |
| `e1hik68n4` | 392x72 @x532 | 368x72 @x456 | 356x68 @x396 | 167x68 @x207 |
| `e1hik68n8` | 1440x161 @x0 | 1280x102 @x0 | 768x94 @x0 | 390x94 @x0 |
| `e1hik68n13` | hidden | 1280x87 @x0 | 768x87 @x0 | 390x87 @x0 |
| `e1nf9i3t0` | hidden | 1152x32 @x64 | 736x28 @x16 | 358x28 @x16 |
| `e3jx3k93` | 1192x136 @x124 | hidden | hidden | hidden |

Page height 9134 at 1440.

## 1. PricingHero (`e16w69m*`)
- A relative wrapper holds two GradientBanners: top 143px (`0deg`, `#0A0A0A` → transparent from the top) and bottom 238px (180deg) at `bottom:-160px`.
- SectionImageBackgroundContainer (`overflow:visible`). Its bg image `Frame_1948763217.png` (3024x1026, contain, absolute top, 1440x489 at 1440, eager) is a 3D grid illustration. It hides at ≤799 (no mobile image).
- Content: Spacer hero (96 / 56), then SliceContainer > row `.e16w69m61` (flex, space-between, align end):
  - eyebrow "Pricing" (M14 `#A7A7A7`);
  - `h1` **H80** white, margin-top 32: "Start free" `<br>` then span "Upgrade to scale" in `#A7A7A7`.

```css
/* e1jvfgez0 = div 1440x315 */
.e1jvfgez0 { position: relative; overflow: visible }
/* e1jvfgez4 = div 1440x315 */
.e1jvfgez4 { position: relative; z-index: 1 }
/* e16w69m61 = div 1192x219 */
.e16w69m61 { display: flex; justify-content: space-between; align-items: flex-end }
@media (max-width: 1280px) { .e16w69m61 { flex-direction: column; gap: 32px; align-items: flex-start } }
/* e16w69m62 = h1 «Start free» 623x168 */
.e16w69m62 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 80px; line-height: 84px; margin-top: 32px }
@media (max-width: 1280px) { .e16w69m62 { font-size: 64px; line-height: 68px; letter-spacing: -2px } }
@media (max-width: 799px) { .e16w69m62 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
/* e16w69m63 = span «Upgrade to scale» 623x97 */
.e16w69m63 { color: rgb(167, 167, 167) }
/* e1jvfgez2 = img 1440x488 */
.e1jvfgez2 { bottom: unset; position: absolute; top: 0px; left: 0px; right: 0px; margin: unset; z-index: 0; pointer-events: none; display: block }
@media (max-width: 799px) { .e1jvfgez2 { display: none } }
```

## 2. PlanCards (`eeys7nh*`)
SliceGrid:
- **Free** Column `span 4` (tablet 4);
- **Enterprise** Column `span 8` (tablet 8) with the `active` variant.

At ≤799 both are full width.

Card `.eeys7nh0`:
- `padding:48px` (md 32), `gap:32px`, border 1px `#454545`, radius 8, full height;
- bg `#0A0A0A` (Free) or **`#212121`** (Enterprise).

Three stacked blocks:
1. **Header block**:
   - a 64x64 plan icon SVG (`svg/eeys7nh2-061718.svg` Free, `-839454` Enterprise);
   - then (margin-top 32, gap 8, max-width 416): the title (H48 w500), price line (16/24 w500 white), and description (P20 `#A7A7A7` ls -0.25, max-width 304, margin-top 16).
   - The title row stacks at ≤1280.
2. **Button block**: `width:fit-content`. Free has "Try Dovetail free" (secondary → `/auth/signup/`); Enterprise has "Contact sales" (primary white → `/contact-sales/`).
3. **Features block**:
   - label (M14 `#A7A7A7`): "What's included" / "Everything in Free, plus";
   - list. When there are more than 5 items it splits into **two columns** (first 5 / rest) in a row with gap 80 (≤1280 column, gap 16).
   - Each `li` is an 8x8 white square bullet `.eeys7nh1` then a P16 span.
   - **Tooltip terms** inside items (e.g. "One channel", "Unlimited Agents") are underlined dotted and show a hover tooltip, the same component as the table (§3).

Measured: Free 376x926, Enterprise 784x926 at 1440.

```css
/* eeys7nh0 = div 376x925 */
.eeys7nh0 { display: flex; flex-direction: column; gap: 32px; padding: 48px; border: 1px solid rgb(69, 69, 69); border-radius: 8px; background-color: rgb(10, 10, 10); height: 100% }
@media (max-width: 1280px) { .eeys7nh0 { padding: 32px; gap: 32px } }
/* eeys7nh2 = div 278x292 */
.eeys7nh2 { display: flex; flex-direction: column }
/* eeys7nh3 = div 278x196 */
.eeys7nh3 { display: flex; flex-direction: column; gap: 8px; margin-top: 32px; max-width: 416px }
/* eeys7nh11 = div 278x56 */
.eeys7nh11 { display: flex; gap: 16px; align-items: center }
@media (max-width: 1280px) { .eeys7nh11 { flex-direction: column; align-items: flex-start } }
/* eeys7nh12 = p «$0, no card required» 278x24 */
.eeys7nh12 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px }
@media (max-width: 1280px) { .eeys7nh12 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eeys7nh12 { font-size: 16px; line-height: 24px } }
/* eeys7nh9 = p «For individuals to make sense of calls, » 278x84 */
.eeys7nh9 { color: rgb(167, 167, 167); max-width: 304px; margin-top: 16px; letter-spacing: -0.25px }
.eeys7nh9 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .eeys7nh9 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eeys7nh9 { font-size: 16px; line-height: 24px } }
/* eeys7nh13 = a «Try Dovetail free» 144x40 */
.eeys7nh13 { align-items: center; justify-content: center; border: 1px solid rgba(255, 255, 255, 0.24); cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: $sans; font-size: 14px; line-height: 18px; letter-spacing: 0px; margin: 0px; max-width: 100%; text-align: center; white-space: nowrap; transition: color 200ms, background 200ms, opacity 200ms; border-radius: 8px; display: inline-flex; padding: 10px 16px; font-weight: 500; background: rgba(255, 255, 255, 0.08); color: rgb(255, 255, 255); width: fit-content }
.eeys7nh13:disabled { opacity: 0.6; pointer-events: none }
.eeys7nh13 > span { margin-left: 4px; margin-right: 0px; transition: transform 150ms cubic-bezier(0.2, 0.6, 0.6, 1) }
.eeys7nh13:focus-visible { outline: solid 1px; outline-offset: 1px }
.eeys7nh13:hover, .eeys7nh13:focus-visible { background: rgba(255, 255, 255, 0.16) }
.eeys7nh13:focus-visible { outline-color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .eeys7nh13 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .eeys7nh13 { font-size: 14px; line-height: 16px } }
/* eeys7nh4 = div 278x331 */
.eeys7nh4 { display: flex; flex-direction: column; gap: 32px }
/* eeys7nh10 = p «What's included» 278x19 */
.eeys7nh10 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(167, 167, 167); margin-top: 32px }
@media (max-width: 1280px) { .eeys7nh10 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .eeys7nh10 { font-size: 14px; line-height: 140% } }
/* eeys7nh5 = div 278x248 */
.eeys7nh5 { display: flex; flex-direction: column; gap: 16px }
@media (max-width: 1280px) { .eeys7nh5 { flex-direction: column; gap: 16px } }
/* eeys7nh6 = ul 278x248 */
.eeys7nh6 { display: flex; flex-direction: column; gap: 16px; flex: 1 1 0%; list-style: none; margin: 0px; padding: 0px }
/* eeys7nh7 = li 278x72 */
.eeys7nh7 { display: flex; align-items: flex-start; gap: 12px }
.eeys7nh7 svg { width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px }
/* eeys7nh1 = div 8x8 */
.eeys7nh1 { width: 8px; height: 8px; background-color: rgb(255, 255, 255); margin-top: 8px }
/* eeys7nh8 = span 258x72 */
.eeys7nh8 { flex: 1 1 0%; font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px }
@media (max-width: 1280px) { .eeys7nh8 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eeys7nh8 { font-size: 16px; line-height: 24px } }
/* eeys7nh0--v2 = div 784x925 */
.eeys7nh0--v2 { display: flex; flex-direction: column; gap: 32px; padding: 48px; border: 1px solid rgb(69, 69, 69); border-radius: 8px; background-color: rgb(33, 33, 33); height: 100% }
@media (max-width: 1280px) { .eeys7nh0--v2 { padding: 32px; gap: 32px } }
/* eeys7nh13--v2 = a «Contact sales» 125x40 */
.eeys7nh13--v2 { align-items: center; justify-content: center; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: $sans; font-size: 14px; line-height: 18px; letter-spacing: 0px; margin: 0px; max-width: 100%; text-align: center; white-space: nowrap; transition: color 200ms, background 200ms, opacity 200ms; border-radius: 8px; display: inline-flex; padding: 10px 16px; font-weight: 500; background: rgb(255, 255, 255); color: rgb(10, 10, 10); width: fit-content }
.eeys7nh13--v2:disabled { opacity: 0.6; pointer-events: none }
.eeys7nh13--v2 > span { margin-left: 4px; margin-right: 0px; transition: transform 150ms cubic-bezier(0.2, 0.6, 0.6, 1) }
.eeys7nh13--v2:focus-visible { outline: solid 1px; outline-offset: 1px }
.eeys7nh13--v2:hover, .eeys7nh13--v2:focus-visible { background: rgb(206, 206, 206) }
.eeys7nh13--v2:focus-visible { outline-color: rgb(10, 10, 10) }
@media (max-width: 1280px) { .eeys7nh13--v2 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .eeys7nh13--v2 { font-size: 14px; line-height: 16px } }
/* eeys7nh5--v2 = div 686x376 */
.eeys7nh5--v2 { display: flex; flex-direction: row; gap: 80px }
@media (max-width: 1280px) { .eeys7nh5--v2 { flex-direction: column; gap: 16px } }
```

## 3. ComparisonTable (`e1hik68n*`, sticky header `e3jx3k*`, mobile tabs `e1nf9i3t*`)
- Four groups, each starting with Spacer 120 (sm 64):
  - an `h2` H56 (max 470–507);
  - P20 `#A7A7A7` (margin `16px 0 32px`, max width per group);
  - Spacer 32;
  - an HR.

  The groups are: "Centralize your user feedback" (12 rows), "Analyze your customer data" (7), "Act on your intelligence" (7) and "Platform" (sub-sections "Security" with 4 certification badges, and "Support"). Sub-section titles are H24 with `padding:64px 0 32px` next to a badge row (`gap:8px`, md 4) followed by an HR.
- **Row** `.e1hik68n12` (BaseGrid, row-gap 0, `border-bottom:1px solid #454545`, 73px tall):
  - Label cell `span 4` (pad `22px 0`): the feature name in **H20** with a dotted underline when it has a tooltip (`text-decoration: underline dotted rgba(255,255,255,.64) 1px; thickness 8%; underline-offset 5px`).
  - Values cell `span 8` (md `justify-content:flex-end`): two equal flex cells (`.e1hik68n4`, `flex:1`, centred, pad `16px 0`). The **Free column cell has bg `#212121`**, the Enterprise one is transparent. A value is a 24x24 check icon (`svg/included-105611.svg`, `aria-label="Included"`), a text value (e.g. "1 channel", "Unlimited channels", "Basic", "Advanced", "1 dashboard", "Unlimited"), or empty (visually-hidden "Not included").
  - At ≤799 the label is `span 2` and values `span 2`, and **only the selected plan's column is shown** (see the mobile tabs).
- **Tooltip** `.tooltip.e1hik68n3`:
  - `position:fixed; width:280px; padding:16px; gap:10px; bg #212121; border:1px solid #454545; radius 8; P14 white; z-index: modal; opacity 0↔1`;
  - shown on mouseover or focus of the label;
  - on mousemove it follows the cursor at `(clientX+16, clientY±16)` and flips above when it would overflow the bottom;
  - on keyboard focus it's placed at `label.bottom + 16, label.left`;
  - hidden on mouseout, blur, or any document scroll.
  - At ≤1280 it's positioned under the label (`top:calc(100% + 16px)`, no left/transform overrides).
- **Sticky plan header** `.e1hik68n8`:
  - `position:fixed; top:-170px; left:0; right:0; z-index:6; padding-top:24px` (md 8); `background:rgba(10,10,10,.8); backdrop-filter:blur(48px); border-bottom:1px solid #454545`.
  - Desktop content `.e3jx3k93` (12-col grid, pad-bottom 24, hidden ≤1280) has three columns of span 4: an empty one; "Free" with H18 title, H18 "$0" + M14 "user/month", and a full-width "Try Dovetail free"; and "Enterprise" with M14 "Custom pricing" and "Contact sales".
  - **Motion:** a GSAP ScrollTrigger on the table wrapper (`start:"top top+=160"`, `end:"bottom top"`). `onEnter`/`onEnterBack` tweens `top → 0` over 0.5s; `onLeave`/`onLeaveBack` tweens `top → -170px` over 0.5s (default ease `power1.out`).
- **≤1280 variant** of the sticky header holds plan tabs `.e1nf9i3t0`: two H24 buttons "Free" / "Enterprise" (active white, inactive `#A7A7A7`), an HR, and the active plan's price in H24.
- **≤1280 bottom CTA bar** `.e1hik68n13`: `position:fixed; left:0; right:0; bottom:-100px → 0` (GSAP, toggled with the sticky header); `padding:24px 32px; background:#141414; border-top:1px solid #454545; backdrop-filter:blur(48px)`. It holds the selected plan's button at full width.

```css
/* e1hik68n8 = div 1440x161 */
.e1hik68n8 { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(48px); padding-top: 24px; position: fixed; top: -170px; z-index: 6; left: 0px; right: 0px; border-bottom: 1px solid rgb(69, 69, 69) }
@media (max-width: 1280px) { .e1hik68n8 { padding-top: 8px } }
/* e3jx3k93 = section 1192x136 */
.e3jx3k93 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); margin: auto; position: relative; width: 100%; padding-bottom: 24px }
@media (max-width: 1280px) { .e3jx3k93 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .e3jx3k93 { display: none } }
@media (max-width: 799px) { .e3jx3k93 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e3jx3k95 = div 376x112 */
.e3jx3k95 { grid-column: span 4; order: unset; max-width: unset; min-width: unset; align-items: flex-end; display: flex; gap: 16px }
@media (max-width: 1280px) { .e3jx3k95 { grid-column: 1 / -1; display: block } }
@media (max-width: 799px) { .e3jx3k95 { grid-column: 1 / -1; display: block; min-width: unset } }
/* e3jx3k90 = div 376x24 */
.e3jx3k90 { display: flex; gap: 4px; align-items: center }
/* e3jx3k96 = p «user/month» 94x19 */
.e3jx3k96 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase }
@media (max-width: 1280px) { .e3jx3k96 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e3jx3k96 { font-size: 14px; line-height: 140% } }
/* e3jx3k94 = a «Try Dovetail free» 376x40 */
.e3jx3k94 { align-items: center; justify-content: center; border: 1px solid rgba(255, 255, 255, 0.24); cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: $sans; font-size: 14px; line-height: 18px; letter-spacing: 0px; margin: 0px; max-width: 100%; text-align: center; white-space: nowrap; transition: color 200ms, background 200ms, opacity 200ms; border-radius: 8px; display: inline-flex; padding: 10px 16px; font-weight: 500; background: rgba(255, 255, 255, 0.08); color: rgb(255, 255, 255); width: 100% }
.e3jx3k94:disabled { opacity: 0.6; pointer-events: none }
.e3jx3k94 > span { margin-left: 4px; margin-right: 0px; transition: transform 150ms cubic-bezier(0.2, 0.6, 0.6, 1) }
.e3jx3k94:focus-visible { outline: solid 1px; outline-offset: 1px }
.e3jx3k94:hover, .e3jx3k94:focus-visible { background: rgba(255, 255, 255, 0.16) }
.e3jx3k94:focus-visible { outline-color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e3jx3k94 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .e3jx3k94 { font-size: 14px; line-height: 16px } }
/* e3jx3k94--v2 = a «Contact sales» 376x40 */
.e3jx3k94--v2 { align-items: center; justify-content: center; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: $sans; font-size: 14px; line-height: 18px; letter-spacing: 0px; margin: 0px; max-width: 100%; text-align: center; white-space: nowrap; transition: color 200ms, background 200ms, opacity 200ms; border-radius: 8px; display: inline-flex; padding: 10px 16px; font-weight: 500; background: rgb(255, 255, 255); color: rgb(10, 10, 10); width: 100% }
.e3jx3k94--v2:disabled { opacity: 0.6; pointer-events: none }
.e3jx3k94--v2 > span { margin-left: 4px; margin-right: 0px; transition: transform 150ms cubic-bezier(0.2, 0.6, 0.6, 1) }
.e3jx3k94--v2:focus-visible { outline: solid 1px; outline-offset: 1px }
.e3jx3k94--v2:hover, .e3jx3k94--v2:focus-visible { background: rgb(206, 206, 206) }
.e3jx3k94--v2:focus-visible { outline-color: rgb(10, 10, 10) }
@media (max-width: 1280px) { .e3jx3k94--v2 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .e3jx3k94--v2 { font-size: 14px; line-height: 16px } }
/* e3jx3k92 = div 0x0 */
.e3jx3k92 { display: none }
@media (max-width: 1280px) { .e3jx3k92 { display: flex; flex-direction: column; gap: 8px } }
/* e1nf9i3t0 = div 0x0 */
.e1nf9i3t0 { display: flex; gap: 8px }
/* e1nf9i3t1 = button «Free» 0x0 */
.e1nf9i3t1 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: $sans; font-size: 24px; line-height: 32px; font-weight: 500; letter-spacing: -0.5px; color: rgb(167, 167, 167); text-decoration: none }
.e1nf9i3t1:disabled { opacity: 0.6; pointer-events: none }
.e1nf9i3t1:hover, .e1nf9i3t1:focus-visible { color: rgb(167, 167, 167) }
.e1nf9i3t1:hover, .e1nf9i3t1:focus { color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e1nf9i3t1 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1nf9i3t1 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } }
/* e1nf9i3t1--v2 = button «Enterprise» 0x0 */
.e1nf9i3t1--v2 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: $sans; font-size: 24px; line-height: 32px; font-weight: 500; letter-spacing: -0.5px; color: rgb(255, 255, 255); text-decoration: none }
.e1nf9i3t1--v2:disabled { opacity: 0.6; pointer-events: none }
.e1nf9i3t1--v2:hover, .e1nf9i3t1--v2:focus-visible { color: rgb(167, 167, 167) }
.e1nf9i3t1--v2:hover, .e1nf9i3t1--v2:focus { color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1nf9i3t1--v2 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1nf9i3t1--v2 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } }
/* e3jx3k91 = div 0x0 */
.e3jx3k91 { align-items: flex-end; display: flex; gap: 8px; margin-bottom: 16px }
/* e1hik68n5 = h2 «Centralize your user feedback» 470x120 */
.e1hik68n5 { max-width: 470px }
.e1hik68n5 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px }
@media (max-width: 1280px) { .e1hik68n5 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1hik68n5 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1hik68n6 = p «Create a single, searchable source of tr» 482x84 */
.e1hik68n6 { color: rgb(167, 167, 167); margin: 16px 0px 32px; max-width: 482px }
.e1hik68n6 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e1hik68n6 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1hik68n6 { font-size: 16px; line-height: 24px } }
/* e1hik68n12 = section 1192x73 */
.e1hik68n12 { display: grid; gap: 0px 32px; grid-template-columns: repeat(12, 1fr); margin: auto; position: relative; width: 100%; border-bottom: 1px solid rgb(69, 69, 69) }
@media (max-width: 1280px) { .e1hik68n12 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .e1hik68n12 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e1hik68n7 = div 376x72 */
.e1hik68n7 { grid-column: span 4; order: unset; max-width: unset; min-width: unset; display: flex; align-items: center; padding: 22px 0px }
@media (max-width: 1280px) { .e1hik68n7 { grid-column: span 4; display: block } }
@media (max-width: 799px) { .e1hik68n7 { grid-column: span 2; display: block; min-width: unset } }
/* e1hik68n0 = div 111x28 */
.e1hik68n0 { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px; cursor: default; display: block; width: fit-content }
@media (max-width: 1280px) { .e1hik68n0 { font-size: 14px; line-height: 22px } .e1hik68n0 { color: rgb(255, 255, 255) } }
@media (max-width: 799px) { .e1hik68n0 { font-size: 14px; line-height: 22px } }
/* e1hik68n1 = span «Integrations» 111x24 */
.e1hik68n1 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; text-decoration: underline 8% dotted rgba(255, 255, 255, 0.64); text-underline-offset: 5px }
@media (max-width: 1280px) { .e1hik68n1 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1hik68n1 { font-size: 16px; line-height: 24px } }
/* e1hik68n3 = div «Connect essential tools to automate work» 280x100 */
.e1hik68n3 { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px; background: rgb(33, 33, 33); border-radius: 8px; border: 1px solid rgb(69, 69, 69); display: flex; flex-direction: column; gap: 10px; opacity: 0; padding: 16px; pointer-events: none; position: fixed; top: 50%; width: 280px; z-index: 6 }
.e1hik68n3 .gatsby-image-wrapper { opacity: 0; transition: opacity 150ms cubic-bezier(0.2, 0.6, 0.6, 1) }
@media (max-width: 1280px) { .e1hik68n3 { font-size: 14px; line-height: 22px } .e1hik68n3 { top: calc(100% + 16px); margin-left: unset; margin-right: unset; right: unset; left: unset !important; transform: unset !important } }
@media (max-width: 799px) { .e1hik68n3 { font-size: 14px; line-height: 22px } }
/* e1hik68n2 = div 784x72 */
.e1hik68n2 { grid-column: span 8; order: unset; max-width: unset; min-width: unset; display: flex }
@media (max-width: 1280px) { .e1hik68n2 { grid-column: span 4; display: block } .e1hik68n2 { justify-content: flex-end } }
@media (max-width: 799px) { .e1hik68n2 { grid-column: span 2; display: block; min-width: unset } }
/* e1hik68n4 = div 392x72 */
.e1hik68n4 { display: flex; justify-content: center; align-items: center; flex: 1 1 0%; background-color: rgb(33, 33, 33); padding: 16px 0px; font-weight: 500; height: 100% }
.e1hik68n4 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px }
@media (max-width: 1280px) { .e1hik68n4 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } .e1hik68n4 { display: none; background-color: transparent } }
@media (max-width: 799px) { .e1hik68n4 { font-size: 16px; line-height: 24px } }
/* e1hik68n4--v2 = div 392x72 */
.e1hik68n4--v2 { display: flex; justify-content: center; align-items: center; flex: 1 1 0%; background-color: transparent; padding: 16px 0px; font-weight: 500; height: 100% }
.e1hik68n4--v2 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px }
@media (max-width: 1280px) { .e1hik68n4--v2 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } .e1hik68n4--v2 { display: flex; background-color: transparent } }
@media (max-width: 799px) { .e1hik68n4--v2 { font-size: 16px; line-height: 24px } }
/* e1hik68n9 = div 1192x980 */
.e1hik68n9 { margin-top: -64px; padding-top: 64px }
@media (max-width: 1280px) { .e1hik68n9 { margin-top: -128px; padding-top: 128px } }
/* e1hik68n5--v2 = h2 «Analyze your customer data» 507x120 */
.e1hik68n5--v2 { max-width: 507px }
.e1hik68n5--v2 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px }
@media (max-width: 1280px) { .e1hik68n5--v2 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1hik68n5--v2 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1hik68n6--v2 = p «Let AI turn high-volume feedback into al» 507x84 */
.e1hik68n6--v2 { color: rgb(167, 167, 167); margin: 16px 0px 32px; max-width: 507px }
.e1hik68n6--v2 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e1hik68n6--v2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1hik68n6--v2 { font-size: 16px; line-height: 24px } }
/* e1hik68n6--v3 = p «Bridge the gap between discovery and del» 500x84 */
.e1hik68n6--v3 { color: rgb(167, 167, 167); margin: 16px 0px 32px; max-width: 500px }
.e1hik68n6--v3 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e1hik68n6--v3 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1hik68n6--v3 { font-size: 16px; line-height: 24px } }
/* e1hik68n6--v4 = p «Built-in operational features for enterp» 376x56 */
.e1hik68n6--v4 { color: rgb(167, 167, 167); margin: 16px 0px 32px; max-width: 376px }
.e1hik68n6--v4 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e1hik68n6--v4 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1hik68n6--v4 { font-size: 16px; line-height: 24px } }
/* e1hik68n11 = div 1192x128 */
.e1hik68n11 { display: flex; justify-content: space-between; flex-direction: row }
/* e1hik68n10 = div 440x128 */
.e1hik68n10 { align-items: center; display: flex; flex-direction: row; gap: 8px }
@media (max-width: 1280px) { .e1hik68n10 { gap: 4px } }
/* e1hik68n13 = div 0x0 */
.e1hik68n13 { display: none }
@media (max-width: 1280px) { .e1hik68n13 { border-top: 1px solid rgb(69, 69, 69); bottom: -100px; display: block; left: 0px; padding: 24px 32px; position: fixed; right: 0px; background: rgb(20, 20, 20); backdrop-filter: blur(48px) } }
```

## 4. FAQ
Shared FAQ with 7 questions (verbatim in data, answers placeholders). The left column adds a subtitle under "FAQs": "Can’t find the answer here? " followed by a **"Contact support"** link-button (`#A7A7A7` → white on hover) that opens Intercom (`window.Intercom("show")`). The subtitle is `color:text.secondary; margin-top:16px`.

```css
/* ef2kgtv1 = p «Can’t find the answer here?» 274x50 */
.ef2kgtv1 { color: rgb(167, 167, 167); margin-top: 16px }
/* e1rc0f0x0 = button «Contact support» 156x26 */
.e1rc0f0x0 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; box-shadow: none; font-family: inherit; text-decoration: underline 1px rgb(128, 128, 128); text-underline-offset: 1.5px; position: relative; padding: 0px; font-size: inherit; font-weight: inherit; text-align: left; white-space: normal; transition: color 200ms ease-out; color: rgb(167, 167, 167) }
.e1rc0f0x0:disabled { opacity: 0.6; pointer-events: none }
.e1rc0f0x0::after { content: ""; position: absolute; bottom: 2px; left: 0px; width: 100%; height: 1px; background-color: rgb(255, 255, 255); transform: scaleX(0); transform-origin: left center; transition: transform 200ms ease-out }
.e1rc0f0x0:hover, .e1rc0f0x0:focus-visible { color: rgb(255, 255, 255) }
.e1rc0f0x0:hover::after, .e1rc0f0x0:focus-visible::after { transform: scaleX(1) }
```

## 5. Motion summary
| Element | Trigger | Detail |
|---|---|---|
| Sticky plan header | ScrollTrigger on table (top top+=160 → bottom top) | `top` -170 ↔ 0, 0.5s |
| Mobile bottom bar | same | `bottom` -89/-100 ↔ 0 |
| Tooltips | hover/focus | follow cursor +16px; hide on scroll |
| Logo marquee | always | GSAP 60s |
| Buttons, FAQ | | shared |

## 6. Gaps
- I didn't capture the sticky header and mobile tab bar in their shown state at each width. Values are from CSS/source and the hidden-state rects.
- Plan icons are inline SVGs (saved). The Security badges were measured in DOM order at 1440, left to right at x=876, 980, 1084, 1188: `Frame_1699554981.png` (96x96, SOC 2), `BARR-Certifications-Badge-ISO-27001-2022.png` (96x96), `ISO_42001_Badge_BARR__1_.png` (96x96), `Frame_1699554982.png` (128x96, HIPAA). They're right-aligned in the 440px badge row next to the "Security" title.
