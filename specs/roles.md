Source: https://dovetail.com/

# Template: `roles` (6 pages)

Covers `/roles/design/`, `/roles/product-management/`, `/roles/research/`, `/roles/customer-experience/`, `/roles/sales-and-cs/` and `/roles/marketing/`.

All six render the **same page component** (source module 354155, `PageLayout hideHeaderSpacing`) from a per-role CMS object. I compared the DOM slice by slice and the sequence is identical. The only differences:
- `/roles/product-management/` has an extra **Prioritization** block.
- design, product-management and research have a **Quiz promo** block.

Data: `src/data/marketing/roles__<role>.json`. Read `marketing-shared.md` first. Footer is variant **A** (homepage final CTA). The default alert bar and transparent nav are used, and the hero sits **under** the nav.

## 0. Section order
| # | Slice | Spacer after (desktop / ≤1280 / ≤799) |
|---|---|---|
| 1 | RoleHero (`eb5iodx*`) | 160 / 96 / 96 |
| 2 | Challenge "manifesto" (`e1qa43fr*`) | 200 / 96 / 96 |
| 3 | HowDovetailHelps feature grid (`e1hzr4mi*`) | 200 / 96 / 96 |
| (3b) | Prioritization (`exidxjs*`, PM only) | 200 / 96 / 96 |
| 4 | Integrations list (`e1ttzgas*`) | 200 / 96 / 96 |
| 5 | Use-case tabs (`e1af4wr4*`) | 200 / 96 / 96 |
| 6 | TestimonialSlice (shared §7.4, one testimonial, no tabs) | 200 / 96 / 96 |
| 7 | Customer story cards (`e1xybz54*`) | 200 / 96 / 96 |
| (7b) | QuizPromo (`e1l2hegs*`; design, PM, research) | 200 / 96 / 96 |
| 8 | FAQ (shared §7.1, heading "FAQs") | 200 → **160** (last child) / 96 / 96 |

Measured page heights (1440): CX 11010, design 11371, marketing 10909, PM 12526, research 11061, sales 10772. All widths are in the data files.

Key measurements (design) at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `eb5iodx0` | 1440x857.1 @x0 | 1280x761.9 @x0 | 768x756.6 @x0 | 390x637.5 @x0 |
| `eb5iodx2` | 1440x857.1 @x0 | 1280x761.9 @x0 | hidden | hidden |
| `eb5iodx3` | hidden | hidden | 768x445 @x0 | 390x225.9 @x0 |
| `eb5iodx4` | 1440x355.6 @x0 | 1280x263.6 @x0 | 768x311.6 @x0 | 390x411.6 @x0 |
| `eb5iodx6` | 682x120 @x124 56px/60px | 1152x44 @x64 40px/44px | 736x36 @x16 32px/36px | 358x72 @x16 32px/36px |
| `eb5iodx10` | 381.3x32 @x935 | 662x32 @x64 | 736x32 @x16 | 358x96 @x16 |
| `e1qa43fr1` | 781.3x432 @x329 40px/48px | 1024x240 @x128 32px/40px | 704x192 @x32 24px/32px | 326x416 @x32 24px/32px |
| `e1hzr4mi1` | 580x120 @x124 56px/60px | 1152x44 @x64 40px/44px | 736x36 @x16 32px/36px | 358x72 @x16 32px/36px |
| `e1hzr4mi2` | 584x576.6 @x124 | 564x561.7 @x64 | 736x670.1 @x16 | 358x435.8 @x16 |
| `e1ttzgas4` | 376x243.6 @x124 | 1152x157.6 @x64 | 736x149.6 @x16 | 358x185.6 @x16 |
| `e1ttzgas5` | 682x1819 @x634 | 1152x1747 @x64 | 736x1771 @x16 | 358x2323 @x16 |
| `e1af4wr43` | 1192x600 @x124 | 1152x1199.4 @x64 | 736x904.6 @x16 | 358x663 @x16 |
| `e1af4wr44` | 616x472 @x189 | 1102x844.4 @x89 | 686x525.6 @x41 | 308x236 @x41 |
| `e1af4wr49` | 382x38.4 @x869 32px/38.4px | 1102x32 @x89 24px/32px | 686x32 @x41 24px/32px | 308x32 @x41 24px/32px |
| `eqa8jb90` | 1440x560 @x0 | 1280x560 @x0 | 768x362 @x0 | 390x500.8 @x0 |
| `e1xybz544` | 376x503.8 @x124 | 564x710.7 @x64 | 736x876 @x16 | 358x460 @x16 |
| `e1l2hegs1` | 1192x419 @x124 | 1152x385 @x64 | 736x305 @x16 | 358x361 @x16 |
| `e1l2hegs4` | 640x112 @x400 48px/56px | 640x80 @x320 32px/40px | 640x32 @x64 24px/32px | 308x64 @x41 24px/32px |

## 1. RoleHero (`eb5iodx*`)
- Root `margin-top:-88px` (pulls under the nav; the collapsed margin makes `<main>` start at y=30).
- Full-bleed hero art `roles-<role>-hero.png` as a `<picture>`: `width:1512px; max-width:100%; aspect-ratio:3024/1800; margin:0 auto`. That's 1440x857 at 1440 and 1280x762 at 1280. Hidden at ≤799, where `roles-<role>-hero-mobile.png` shows **after** the text block (full width, auto height).
- Text overlay `.eb5iodx4`: `position:absolute; top:0; left:0; right:0; padding-top:184px` (= 88 + 96; md 88+24 = 112). At sm it's `position:relative; padding:112px 0 48px`. It contains a SliceGrid (row-gap 0, sm 32):
  - Column `span 7` (md `span 12`): eyebrow (Eyebrow/M14 `#A7A7A7`, margin-bottom 32), e.g. "Dovetail for Design"; then `h1.eb5iodx6` in **H56** white (max-width from CMS, 682 on design).
  - Column `8 / -1` (md `span 7`) `.eb5iodx9`: `display:flex; align-items:flex-end; justify-content:flex-end` (md flex-start). It holds the **logo swapper** `.eb5iodx10` (`flex-wrap:wrap; gap:32px; justify-content:flex-end`, md flex-start): 4 white customer logos, `height:32px; width:auto; opacity:.64; transition: opacity 350ms ease`.
- **Logo swapper motion:** the slots are pairs `[notion↔wise] [salesforce↔aws] [toyota↔zapier] [shopify↔amazon]` and start at the first of each. `setInterval` 1800ms; slot order `[0,2,1,3]` repeating. Each tick fades that slot to `opacity:0`, after 350ms swaps its logo to the pair partner, then on the next animation frame fades back to .64. All 8 logos are preloaded. It's disabled under reduced motion.
- Logo files: `/assets/marketing/customer-<slug>-white-logo.svg`.
- No CTA buttons are rendered in the hero (the props aren't passed).

```css
/* eb5iodx0 = div 1440x857 */
.eb5iodx0 { position: relative; margin-top: -88px }
/* eb5iodx1 = picture 1440x857 */
.eb5iodx1 { display: block }
@media (max-width: 799px) { .eb5iodx1 { display: none } }
/* eb5iodx2 = img 1440x857 */
.eb5iodx2 { display: block; width: 1512px; max-width: 100%; height: auto; aspect-ratio: 3024 / 1800; margin-left: auto; margin-right: auto }
/* eb5iodx4 = div 1440x355 */
.eb5iodx4 { position: absolute; top: 0px; left: 0px; right: 0px; padding-top: 184px }
@media (max-width: 1280px) { .eb5iodx4 { padding-top: 112px } }
@media (max-width: 799px) { .eb5iodx4 { position: relative; top: auto; left: auto; right: auto; padding-top: 112px; padding-bottom: 48px } }
/* eb5iodx6 = h1 «Design with customer evidence from the s» 682x120 */
.eb5iodx6 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; margin-bottom: 0px }
@media (max-width: 1280px) { .eb5iodx6 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .eb5iodx6 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* eb5iodx9 = div 478x171 */
.eb5iodx9 { grid-column: 8 / -1; order: unset; max-width: unset; min-width: unset; display: flex; align-items: flex-end; justify-content: flex-end }
@media (max-width: 1280px) { .eb5iodx9 { grid-column: span 7; display: block } .eb5iodx9 { align-items: flex-start; justify-content: flex-start } }
@media (max-width: 799px) { .eb5iodx9 { grid-column: 1 / -1; display: block; min-width: unset } }
/* eb5iodx10 = div 381x32 */
.eb5iodx10 { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 32px }
@media (max-width: 1280px) { .eb5iodx10 { justify-content: flex-start } }
/* eb5iodx11 = img 71x32 */
.eb5iodx11 { height: 32px; width: auto; display: block; opacity: 0; transition: opacity 350ms }
/* eb5iodx11--v2 = img 72x32 */
.eb5iodx11--v2 { height: 32px; width: auto; display: block; opacity: 0.64; transition: opacity 350ms }
/* eb5iodx3 = img 0x0 */
.eb5iodx3 { display: none }
@media (max-width: 799px) { .eb5iodx3 { display: block; width: 100%; height: auto } }
```

## 2. Challenge / manifesto (`e1qa43fr*`)
- SliceContainer > GridImageBackground (shared §7.7; image `how-it-works-grid-bg.png.png` 2520x1712 natural, drawn 1260x856, content height 856) > SliceGrid > Column `2 / span 10` (md full).
- Inside: eyebrow "The challenge" (M14 `#A7A7A7`, mb 32); a visually-hidden `<p>` holding the full text; then the visible `p.e1qa43fr1` (`aria-hidden`), preset **H40** (40/48 w500 ls -1; md 32/40; sm 24/32). Then a BaseHeading button row (`margin-top:32px; display:flex; gap:8px; flex-wrap:wrap`) with **"Try Dovetail free"** (primary → `/auth/signup/`, new tab) and **"Request a demo"** (secondary → `/request-a-demo/`).
- **Scroll word-colour motion:** GSAP SplitText splits the paragraph into words (`span.word {display:inline-block; white-space:nowrap}`). Every word starts at `text.manifestoText` = `rgba(255,255,255,.48)`. A ScrollTrigger `{trigger:p, start:"top 80%", end:"bottom 50%", scrub:true}` on each update, with progress p and N words:
  - word i is fully white (`#FFFFFF`) once `p ≥ (i+1)/N`;
  - it's interpolated between .48 and white while `i/N ≤ p < (i+1)/N`;
  - otherwise it stays at .48.

  So the text "reads" itself white as you scroll. It refreshes on resize.
- The paragraph is long, so it's a placeholder (~430 chars on design). It renders 9 lines at 1440 (781 wide).

```css
/* e1qa43fr1 = p «Design teams are expected to iterate and» 781x432 */
.e1qa43fr1 { font-family: $sans; font-size: 40px; font-weight: 500; letter-spacing: -1px; line-height: 48px }
.e1qa43fr1 .word { display: inline-block; white-space: nowrap }
@media (max-width: 1280px) { .e1qa43fr1 { font-size: 32px; line-height: 40px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1qa43fr1 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e18o1u1v5 = div 781x40 */
.e18o1u1v5 { margin-top: 32px; display: flex; flex-flow: wrap; gap: 8px }
```

## 3. How Dovetail helps (`e1hzr4mi*`)
- SliceGrid > Column `span 6` (md 12): eyebrow "How Dovetail helps" (mb 32), then h2 **H56** (margin-bottom **96**, md 48).
- Then SliceContainer > InnerGrid (gap 24, row-gap 24) of **4 cards**, each Column `span 6` (tablet `span 6`, mobile full): bg `#141414`, border 1px `#1E1E1E`, radius 8, overflow hidden, flex column.
  - Image `roles-<role>-feature-N.png` (1232x920, full width, auto height).
  - Text (pad `0 48px 48px`, sm `0 32px 32px`, gap 16): h3 H20 white, then P16 `rgba(255,255,255,.64)` with max-width 464.
- The card is 584x577 at 1440.

```css
/* e1hzr4mi1 = h2 «Insight that sharpens every decision» 580x120 */
.e1hzr4mi1 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; margin-bottom: 96px }
@media (max-width: 1280px) { .e1hzr4mi1 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e1hzr4mi1 { margin-bottom: 48px } }
@media (max-width: 799px) { .e1hzr4mi1 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1hzr4mi2 = div 584x576 */
.e1hzr4mi2 { display: flex; flex-direction: column; background: rgb(20, 20, 20); border: 1px solid rgb(30, 30, 30); border-radius: 8px; overflow: hidden }
/* e1hzr4mi3 = img 582x434 */
.e1hzr4mi3 { display: block; width: 100%; height: auto }
/* e1hzr4mi4 = div 582x140 */
.e1hzr4mi4 { display: flex; flex-direction: column; gap: 16px; padding: 0px 48px 48px }
@media (max-width: 799px) { .e1hzr4mi4 { padding: 0px 32px 32px } }
/* e1hzr4mi5 = h3 «Identify friction and unmet needs instan» 486x28 */
.e1hzr4mi5 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1hzr4mi5 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1hzr4mi5 { font-size: 16px; line-height: 24px } }
/* e1hzr4mi6 = p «AI analyzes interviews, tickets, surveys» 464x48 */
.e1hzr4mi6 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(255, 255, 255, 0.64); margin: 0px; max-width: 464px }
@media (max-width: 1280px) { .e1hzr4mi6 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1hzr4mi6 { font-size: 16px; line-height: 24px } }
```

## 3b. Prioritization (PM only, `exidxjs*`)
SliceGrid:
- left Column `span 6`: eyebrow, H56 heading, optional P16 secondary body (margin-top 24, max-width 480);
- right Column `8 / span 5`: `<ol>` (flex column, gap 32; md margin-top 48) of steps. Each step is a flex row, gap 20: the number (H20, colour `accentPrimary` = `#FF4400`, width 32), then h3 H20 over P16 `#A7A7A7` (gap 4).

```css
/* exidxjs1 = h2 «Using Dovetail to prioritize what to bui» 580x120 */
.exidxjs1 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; margin: 0px }
@media (max-width: 1280px) { .exidxjs1 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .exidxjs1 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* exidxjs2 = p «Every roadmap decision comes down to fig» 480x168 */
.exidxjs2 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); margin-top: 24px; max-width: 480px }
@media (max-width: 1280px) { .exidxjs2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .exidxjs2 { font-size: 16px; line-height: 24px } }
/* exidxjs3 = ol 478x400 */
.exidxjs3 { display: flex; flex-direction: column; gap: 32px; list-style: none; margin: 0px; padding: 0px }
@media (max-width: 1280px) { .exidxjs3 { margin-top: 48px } }
/* exidxjs4 = li 478x104 */
.exidxjs4 { display: flex; gap: 20px }
/* exidxjs5 = span «1» 32x104 */
.exidxjs5 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 68, 0); flex-shrink: 0; width: 32px }
@media (max-width: 1280px) { .exidxjs5 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .exidxjs5 { font-size: 16px; line-height: 24px } }
/* e635ctc6 = div 294x350 */
.e635ctc6 { display: flex; flex-direction: column; gap: 4px }
/* exidxjs7 = h3 «Gather feedback in Dovetail» 426x28 */
.exidxjs7 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; margin: 0px }
@media (max-width: 1280px) { .exidxjs7 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .exidxjs7 { font-size: 16px; line-height: 24px } }
/* exidxjs8 = p «Centralize support tickets, sales calls,» 426x72 */
.exidxjs8 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); margin: 0px }
@media (max-width: 1280px) { .exidxjs8 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .exidxjs8 { font-size: 16px; line-height: 24px } }
```

## 4. Integrations (`e1ttzgas*`)
SliceGrid (row-gap 0, mobile 48):
- **Left** Column `span 4` (md 12) `.e1ttzgas4` is **sticky**: `position:sticky; top:96px; align-self:flex-start` (md static). It holds:
  - eyebrow "Integrations";
  - h2 H56 "Connect to the tools you use" (mb 24);
  - buttons row (gap 12, margin-top 8): "Try Dovetail free" primary (→ `/auth/signup/`) and "Request a demo" secondary.
- **Right** Column `6 / -1` (x634, 682 wide): `<ul>` of items. Each item is an HR (1px `rgba(255,255,255,.24)`) followed by a block (pad `32px 0`, gap 8): a row (gap 8) with a 40x40 icon (two icons for "Slack & Teams") and the name (H20 white), then P16 `#A7A7A7`.
- After the list: a final HR, then the "Discover all integrations ↘" link (`linkWithArrowDownRight` + growing underline; 16/24 w500; margin-top 32) → `https://docs.dovetail.com/integrations/`.
- The default list (used when the CMS has none) is Figma, ChatGPT, Linear, Alloy, Jira, Slack & Teams. Pages have 6–12 items; see the data files.

```css
/* e1ttzgas4 = div 376x243 */
.e1ttzgas4 { grid-column: span 4; order: unset; max-width: unset; min-width: unset; display: flex; flex-direction: column; justify-content: flex-start; position: sticky; top: 96px; align-self: flex-start }
@media (max-width: 1280px) { .e1ttzgas4 { grid-column: span 12; display: block } .e1ttzgas4 { position: static } }
@media (max-width: 799px) { .e1ttzgas4 { grid-column: 1 / -1; display: block; min-width: unset } }
/* e1ttzgas1 = h2 «Connect to the tools you use» 376x120 */
.e1ttzgas1 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; margin-bottom: 24px }
@media (max-width: 1280px) { .e1ttzgas1 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1ttzgas1 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1ttzgas3 = div 376x40 */
.e1ttzgas3 { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px }
/* e1ttzgas5 = ul 682x1819 */
.e1ttzgas5 { list-style: none; margin: 0px; padding: 0px }
/* e1ttzgas6 = li 682x161 */
.e1ttzgas6 { display: flex; flex-direction: column }
/* e14wzqz0 = hr 682x1 */
.e14wzqz0 { height: 1px; background-color: rgba(255, 255, 255, 0.24); margin: 0px }
/* e1ttzgas7 = div 682x160 */
.e1ttzgas7 { display: flex; flex-direction: column; gap: 8px; padding: 32px 0px }
/* e635ctc7 = div «Digital Twins» 170x24 */
.e635ctc7 { display: flex; align-items: center; gap: 8px }
/* e1ttzgas9 = div 40x40 */
.e1ttzgas9 { display: flex; align-items: center }
/* e1ttzgas10 = img 40x40 */
.e1ttzgas10 { width: 40px; height: 40px; display: block }
/* e1ttzgas11 = span «Figma Make» 113x28 */
.e1ttzgas11 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1ttzgas11 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1ttzgas11 { font-size: 16px; line-height: 24px } }
/* e1ttzgas12 = p «Design with real customer context. The D» 682x48 */
.e1ttzgas12 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); margin: 0px }
@media (max-width: 1280px) { .e1ttzgas12 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1ttzgas12 { font-size: 16px; line-height: 24px } }
/* e1ttzgas13 = a «Discover all integrations» 209x26 */
.e1ttzgas13 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; box-shadow: none; font-family: inherit; color: rgb(255, 255, 255); display: inline-flex; text-decoration: underline 1px transparent; text-underline-offset: 1.5px; position: relative; font-size: inherit; font-weight: inherit; padding: 0px; text-align: left; white-space: normal; transition: color 200ms ease-out; margin-top: 32px }
.e1ttzgas13:disabled { opacity: 0.6; pointer-events: none }
.e1ttzgas13 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px }
.e1ttzgas13::after { content: ""; position: absolute; bottom: 2px; left: 0px; width: 100%; height: 1px; background-color: rgb(255, 255, 255); transform: scaleX(0); transform-origin: left center; transition: transform 200ms ease-out }
.e1ttzgas13:hover::after, .e1ttzgas13:focus-visible::after { transform: scaleX(1) }
@media (max-width: 1280px) { .e1ttzgas13 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1ttzgas13 { font-size: 16px; line-height: 24px } }
/* e14wzqz3 = div 1x40 */
.e14wzqz3 { width: 1px; background-color: rgba(255, 255, 255, 0.24); height: 100% }
```

## 5. Use-case tabs (`e1af4wr4*`)
- SliceGrid > Column `span 6`: eyebrow "Use cases" and H56 (mb 96, md 48).
- Then a SliceContainer > card `.e1af4wr43`: `display:grid; grid-template-columns:7fr 5fr; gap:64px; align-items:flex-start; bg #141414; border 1px #1E1E1E; border-radius:16px; padding:64px; height:600px; overflow:hidden`. At md it's 1 column, gap 32, pad 24, height auto.
  - **Image stack** (616x472, radius 8; md full width, `aspect-ratio:616/472`): 4 absolutely stacked images (`roles-<role>-usecase-*.png`, 1232x944). The active one is opacity 1, the others 0, `transition: opacity 300ms ease`.
  - **Right column** (`height:472px`, md auto; flex column): tab buttons (preset **H32** but `line-height:1.2`, white; inactive opacity **.32**, hover .64; 300ms ease; margin-bottom 8). Then, pushed to the bottom (`margin-top:auto`, md 64): the active description (P16 **white**) and a progress line (1px `rgba(255,255,255,.16)`, fill white `width:<progress>%`, with a 7x7 white square at its right end, `right:-3px; top:-3px`). Gap 32 between them.
- **Motion:** `useTabGroup(0, 60, false)` gives 6s per tab and wraps. It starts when first scrolled into view. **Hovering the card pauses** and leaving resumes. Clicking a tab selects it and stops auto-advance permanently.

```css
/* e1af4wr40 = div 1440x867 */
/* e1hzr4mi1 = h2 «Insight that sharpens every decision» 580x120 */
.e1hzr4mi1 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; margin-bottom: 96px }
@media (max-width: 1280px) { .e1hzr4mi1 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e1hzr4mi1 { margin-bottom: 48px } }
@media (max-width: 799px) { .e1hzr4mi1 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1af4wr43 = div 1192x600 */
.e1af4wr43 { display: grid; grid-template-columns: 7fr 5fr; gap: 64px; align-items: flex-start; background-color: rgb(20, 20, 20); border: 1px solid rgb(30, 30, 30); border-radius: 16px; overflow: hidden; padding: 64px; height: 600px }
@media (max-width: 1280px) { .e1af4wr43 { grid-template-columns: 1fr; gap: 32px; padding: 24px; height: auto } }
/* e1af4wr44 = div 616x472 */
.e1af4wr44 { position: relative; width: 616px; height: 472px; max-width: 100%; border-radius: 8px; overflow: hidden; flex-shrink: 0 }
@media (max-width: 1280px) { .e1af4wr44 { width: 100%; height: auto; aspect-ratio: 616 / 472 } }
/* e1af4wr45 = img 616x472 */
.e1af4wr45 { display: block; width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0px; left: 0px; opacity: 1; transition: opacity 300ms; pointer-events: auto }
/* e1af4wr45--v2 = img 616x472 */
.e1af4wr45--v2 { display: block; width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0px; left: 0px; opacity: 0; transition: opacity 300ms; pointer-events: none }
/* e1af4wr46 = div 382x472 */
.e1af4wr46 { display: flex; flex-direction: column; height: 472px; min-width: 0px }
@media (max-width: 1280px) { .e1af4wr46 { height: auto } }
/* e1af4wr48 = div 382x177 */
.e1af4wr48 { display: flex; flex-direction: column; gap: 0px }
/* e1af4wr49 = button «Usability testing» 382x38 */
.e1af4wr49 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; display: block; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; padding: 0px; cursor: pointer; text-align: left; color: rgb(255, 255, 255); opacity: 1; transition: opacity 300ms; line-height: 1.2; margin-bottom: 8px }
.e1af4wr49:last-child { margin-bottom: 0px }
.e1af4wr49:hover { opacity: 1 }
@media (max-width: 1280px) { .e1af4wr49 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1af4wr49 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e1af4wr49--v2 = button «Friction mapping» 382x38 */
.e1af4wr49--v2 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; display: block; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; padding: 0px; cursor: pointer; text-align: left; color: rgb(255, 255, 255); opacity: 0.32; transition: opacity 300ms; line-height: 1.2; margin-bottom: 8px }
.e1af4wr49--v2:last-child { margin-bottom: 0px }
.e1af4wr49--v2:hover { opacity: 0.64 }
@media (max-width: 1280px) { .e1af4wr49--v2 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1af4wr49--v2 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e1af4wr47 = div 382x105 */
.e1af4wr47 { margin-top: auto; display: flex; flex-direction: column; gap: 32px }
@media (max-width: 1280px) { .e1af4wr47 { margin-top: 64px } }
/* e1af4wr410 = p «Validate new user journeys before rollou» 382x72 */
.e1af4wr410 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1af4wr410 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1af4wr410 { font-size: 16px; line-height: 24px } }
/* e1af4wr411 = div 382x1 */
.e1af4wr411 { position: relative; height: 1px; background: rgba(255, 255, 255, 0.16) }
/* e1af4wr412 = div 0x1 */
.e1af4wr412 { position: absolute; top: 0px; left: 0px; height: 100%; width: 0%; background: rgb(255, 255, 255) }
.e1af4wr412::after { content: ""; position: absolute; right: -3px; top: -3px; width: 7px; height: 7px; background: rgb(255, 255, 255) }
```

## 6. Testimonial
Shared TestimonialSlice (§7.4): a single featured testimonial (H40 quote, 80px photo, logo, name/title), no tabs, with the testimonial-grid background. 1440x560.

## 7. Customer story cards (`e1xybz54*`, pixel hover `e17v5ad*`)
- SliceContainer > BaseGrid (row-gap 32) of cards, Column `span 4` (tablet `span 6`, mobile full). Pages have 3–4 cards; see the data.
- **Card** (flex column, gap 32; sm 16):
  - **Thumb link** (radius 8, overflow hidden, full width): image box `aspect-ratio:398/438`, cover (`Customer_*.png`). The company logo sits at bottom-left 16 (white logo, z 2).
    - The hover overlay `.e1xybz540` (pad 32, opacity 0→1, **80ms ease-out**, hidden ≤1280) shows the highlighted testimonial: quote H24 white, clamped to 10 lines, in curly quotes; then name (H16) and title (M14 `#A7A7A7`), spaced between.
    - **Pixel hover (≥1281 only):** a 7x7 grid of absolutely positioned cells (each `calc(14.857% + 1px)` square, starting at -2% and stepping 14.857%) in `currentColor` = `#212121`. On mouseenter, GSAP sets every cell `display:block` with `stagger:{each: .3/49, from:"random"}` (0.3s total, random order). On mouseleave they hide the same way. The quote overlay sits above the pixels.
  - **Title link**: "<story heading> ↘", H20 white → `#A7A7A7` on hover, max-width 430.

```css
/* e1xybz544 = div 376x503 */
.e1xybz544 { align-items: flex-start; box-sizing: border-box; display: flex; flex-direction: column; gap: 32px; width: 100% }
@media (max-width: 799px) { .e1xybz544 { gap: 16px } }
/* e1xybz549 = a 376x413 */
.e1xybz549 { align-items: center; justify-content: center; background: transparent; cursor: pointer; text-decoration: none; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; border-radius: 8px; flex-shrink: 0; height: auto; outline: none; overflow: hidden; position: relative; width: 100% }
.e1xybz549:disabled { opacity: 0.6; pointer-events: none }
.e1xybz549:hover, .e1xybz549:focus-visible { color: rgb(167, 167, 167) }
/* e17v5ad0 = div 0x0 */
.e17v5ad0 { position: relative; display: contents; color: rgb(33, 33, 33) }
/* e17v5ad1 = div 376x413 */
.e17v5ad1 { position: relative; border-radius: 8px; overflow: hidden }
@media (min-width: 1281px) { .e17v5ad1 { cursor: pointer } }
/* e17v5ad3 = div 376x413 */
.e17v5ad3 { pointer-events: auto }
/* e1xybz548 = div 376x413 */
.e1xybz548 { aspect-ratio: 398 / 438; overflow: hidden; position: relative; width: 100% }
.e1xybz548 > * { height: 100%; left: 0px; object-fit: cover; position: absolute; top: 0px; width: 100% }
.e1xybz548 img { height: 100%; object-fit: cover; width: 100% }
/* e1xybz540 = div 376x413 */
.e1xybz540 { background-color: transparent; inset: 0px; color: rgb(255, 255, 255); opacity: 0; padding: 32px; pointer-events: none; position: absolute; text-align: left; transition: opacity 80ms ease-out; z-index: 3 }
@media (max-width: 1280px) { .e1xybz540 { display: none } }
/* e1xybz546 = div 142x64 */
.e1xybz546 { position: absolute; left: 16px; bottom: 16px; z-index: 2 }
/* e17v5ad2 = div 376x413 */
.e17v5ad2 { position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; pointer-events: none; z-index: 2 }
/* e1xybz545 = div 376x58 */
.e1xybz545 { display: flex; flex-direction: column; gap: 64px }
/* e1xybz5410 = a «How customer insights drive and inspire » 376x58 */
.e1xybz5410 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); max-width: 430px; text-align: left; white-space: normal; overflow-wrap: anywhere }
.e1xybz5410:disabled { opacity: 0.6; pointer-events: none }
.e1xybz5410:hover, .e1xybz5410:focus-visible { color: rgb(167, 167, 167) }
.e1xybz5410 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px }
@media (max-width: 1280px) { .e1xybz5410 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1xybz5410 { font-size: 16px; line-height: 24px } }
```

## 7b. Quiz promo (`e1l2hegs*`)
- SliceContainer (`display:flex; justify-content:center`) > box: bg `#141414`, border 1px `#1E1E1E`, radius 16, pad `64px 48px` (sm `48px 24px`).
- Content is centred, max-width 640:
  - "2-minute quiz" (P14 in mono, w500, `letter-spacing:.08em` (1.12px), uppercase, `#808080`, line-height 22);
  - Spacer 16;
  - h2 **H48** white (sm H32);
  - Spacer 16;
  - P18 `#A7A7A7`;
  - Spacer 32;
  - **"Take the quiz"** secondary button → `/roles/<role>/quiz/`.

```css
/* e1l2hegs0 = section 1440x419 */
.e1l2hegs0 { margin: 0px auto; max-width: 1512px; padding: 0px 124px; position: relative; text-align: left; width: 100%; display: flex; justify-content: center }
@media (max-width: 1280px) { .e1l2hegs0 { padding: 0px 64px } }
@media (max-width: 799px) { .e1l2hegs0 { padding: 0px 16px } }
/* e1l2hegs1 = div 1192x419 */
.e1l2hegs1 { background-color: rgb(20, 20, 20); border: 1px solid rgb(30, 30, 30); border-radius: 16px; display: flex; justify-content: center; padding: 64px 48px; width: 100% }
@media (max-width: 799px) { .e1l2hegs1 { padding: 48px 24px } }
/* e1l2hegs2 = div 640x289 */
.e1l2hegs2 { max-width: 640px; text-align: center; width: 100% }
/* e1l2hegs3 = span «2-minute quiz» 123x22 */
.e1l2hegs3 { font-size: 14px; line-height: 22px; color: rgb(128, 128, 128); display: inline-block; font-family: $mono; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase }
@media (max-width: 1280px) { .e1l2hegs3 { font-size: 14px; line-height: 22px } }
@media (max-width: 799px) { .e1l2hegs3 { font-size: 14px; line-height: 22px } }
/* e1l2hegs4 = h2 «Are your designs grounded in real custom» 640x112 */
.e1l2hegs4 { font-family: $sans; font-size: 48px; font-weight: 500; line-height: 56px; letter-spacing: -1px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1l2hegs4 { font-size: 32px; line-height: 40px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1l2hegs4 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } .e1l2hegs4 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 40px } }
/* e1l2hegs5 = p «Answer 10 questions and find out how gro» 640x48 */
.e1l2hegs5 { font-family: $sans; font-size: 18px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e1l2hegs5 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1l2hegs5 { font-size: 16px; line-height: 24px } }
```

## 8. FAQ
Shared §7.1. There are 4–6 questions per role, verbatim in the data and answers as placeholders. The FAQ grid sits directly in `main` (no pixel band).

## 9. Motion summary (roles)
| Element | Trigger | Detail |
|---|---|---|
| Hero logos | interval 1800ms | fade a slot out (350ms), swap, fade in |
| Challenge text | scroll scrub, top 80% → bottom 50% | per-word colour .48 → 1 |
| Use-case tabs | in view → 60ms ticks | 6s/tab, pause on hover, image crossfade 300ms |
| Story cards | hover (≥1281) | 7x7 random pixel fill over 0.3s, overlay 80ms |
| Testimonial | hover | tooltip "Read customer story" |
| FAQ | click | shared |

## 10. Gaps
- Hero logo state at capture time was mid-cycle (e.g. "Wise" in slot 1). The initial state is notion/salesforce/toyota/shopify.
- The source's default integrations list (with Alloy) isn't used by any of the six pages; each role supplies its own list from the CMS.
