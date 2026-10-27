Source: https://dovetail.com/

# Template: `best-never-guess` (1 page): `/the-best-never-guess/`

A standalone campaign page in the **bestNeverGuess theme**: page background **`#0044FF`** (html bg), primary button **black** (`#0A0A0A`, white text, **H18** 18/24 w500 ls -0.25, hover `rgba(10,10,10,.8)`), secondary button white, and mobile gutter **32px**. It has **no alert bar, no site nav and no site footer**. It uses its own campaign nav and footer. Data: `src/data/marketing/the-best-never-guess.json`. Read `marketing-shared.md` and CLONE_SPEC §10 (the hero reuses that component).

I confirmed the hero visually with a 1440 screenshot (`.playwright-mcp/bng-top.jpg`).

## 0. Order
1. **CampaignNav** `.eciainh0`
2. **Hero** = the homepage final CTA "The best never guess" (`e4352py*`), on blue, with corner decorations
3. **TextSlice** `.e29458r3`
4. Spacer 224 → **TestimonialSlice (BNG)** `.et58vsw0`
5. Spacer 96 → **Customer stories grid** `.e18efzco0` (≤799: carousel `.e18efzco1`)
6. Spacer 246 → **TeamSwitchSlice** `.e1268f4r0`
7. Spacer 246 → **Form slice** `.e1yij67q0` (HubSpot embed)
8. **BNG footer** `.e1nbsdsv2`

Measured at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `eciainh0` | 1440x88 @x0 | 1280x88 @x0 | 768x88 @x0 | 390x88 @x0 |
| `eciainh5` | 229.4x46 @x1187 | 207x46 @x1049 | hidden | hidden |
| `e4352py0` | 1440x900 @x0 | 1280x800 @x0 | 768x404.8 @x0 | 390x404.8 @x0 |
| `e4352py13` | 641x478 @x0 | hidden | hidden | hidden |
| `e4352py2` | 1440x455.4 @x0 | 1280x394.8 @x0 | 768x404.8 @x0 | 390x404.8 @x0 |
| `e29458r7` | 783x384 @x329 40px/48px | 783x280 @x249 32px/40px | 704x193.5 @x32 24px/32px | 326x417.5 @x32 24px/32px |
| `e29458r2` | 120x34 @x661 | 120x34 @x268 | 112x32 @x47 | 112x32 @x47 |
| `et58vsw2` | 860x340 @x124 64px/68px | 860x156 @x64 48px/52px | 704x108 @x32 32px/36px | 326x216 @x32 32px/36px |
| `et58vsw4` | 320x160 @x1042 | 1152x80 @x64 | 704x80 @x32 | 326x80 @x32 |
| `e18efzco0` | 1440x1127.6 @x0 | 1280x2208 @x0 | hidden | hidden |
| `e1xybz544` | 376x503.8 @x124 | 564x710.7 @x64 | 237.6x351.4 @x32 | 237.6x351.4 @x32 |
| `e1268f4r10` | 988x142.6 @x328 124px/142.6px | 1152x93.6 @x64 72px/93.6px | 680x46 @x16 40px/46px | 302x46 @x16 40px/46px |
| `e1268f4r8` | 124x124 @x714 | 72x72 @x607 | 48x48 @x366 | 48x48 @x177 |
| `e1268f4r11` | 832x240 @x304 40px/48px | 832x160 @x64 32px/40px | 680x128 @x32 24px/32px | 302x256 @x32 24px/32px |
| `e1268f4r12` | 274x84 @x328 80px/84px | 1152x68 @x64 64px/68px | 504x44 @x32 64px/44px | 220.5x44 @x32 64px/44px |
| `e1yij67q4` | 1090x204 @x124 64px/68px | 1152x156 @x64 48px/52px | 704x108 @x32 32px/36px | 326x216 @x32 32px/36px |
| `e1yij67q5` | 682x200 @x328 32px/40px | 1152x96 @x64 24px/32px | 704x128 @x32 24px/32px | 326x288 @x32 24px/32px |
| `e1nbsdsv3` | 1192x227.6 @x124 | 1152x227.6 @x64 | 704x322.8 @x32 | 326x322.8 @x32 |

Page height 5823 at 1440.

## 1. CampaignNav (`eciainh*`)
- `nav`: 88 tall, `padding:24px`, flex space-between, `position:relative; z-index:5`, transparent (blue page shows through).
- Left: the Dovetail **wordmark** SVG (172x31, white; `svg/eciainh4-670785.svg`) in a 196x53 link to `/`, `aria-label="Dovetail home"`.
- Right: primary button **"Get 60 days full access"** (black, H18, pad `10px 16px`, 229x46). It links to `#60-day-trial-offer` (the form section anchor, so the browser jumps there). Hidden ≤799.

## 2. Hero
Identical structure, type scale and GSAP intro to CLONE_SPEC §10 ("The / best / never / guess" with 8 logo tiles: AWS, Canva, Airwallex, Notion, Wise, Breville, Salesforce, Zapier; reuse `public/assets/svg/cta-logo-*.svg`). The differences:
- Background is the page blue `#0044FF`. **No ASCII canvas.** The top GradientBanner fades from blue: `linear-gradient(0deg, transparent, #0044FF)`.
- Section box: 1440x900 at y=88 (min-height 100vh). At ≤799 it's 405 tall, with the centre block static.
- **Corner decorations** `.e4352py13–16` (desktop; `.e4352py17–20` mobile versions, hidden on desktop). They're white pixel-glyph clusters (crosses, diamonds, hatched squares, circles, arrows) as inline SVGs (`svg/e99h80d2-*.svg`):
  - top-left 641x478 at `top:-88px; left:0`;
  - top-right 620x376 at `top:-88px; right:0`;
  - bottom-left 588x726 at `bottom:-220px; left:0`;
  - bottom-right 302x526 at `bottom:-120px; right:0`.

  Mobile variants sit at `top:-128px` (left/right) and `bottom:16%`/`15%`. All start at `opacity:0`.
- **Motion:** decorations use `gsap.to(children, {opacity:1, duration:.25, stagger:.03, delay:.66, ease:"power2.out"})` on mount. The words and logo tiles use the homepage timeline (rows .35s stagger .06 → tiles .3s stagger .04 from scale .82 → footer, power2.out).

## 3. TextSlice (`e29458r*`)
- SliceContainer > centred box (max-width 783):
  - `h2` **H40** white (40/48 w500 ls -1; md 32/40; sm 24/32), 8 lines at 1440 (placeholder text, ~300 chars). It contains an inline **rotating logo** "[ logo ]" right after "Used by the most ambitious teams…".
  - The rotator is `span.e29458r2` (inline-block, 120x34, overflow hidden; sm 112x32) holding a column `.e29458r0` of 10 logo rows (`e29458r1`, 120x34 each; 5 logos duplicated: Airwallex, Lovable, Qantas, Shopify, Wise). It runs `animation: animation-1tmekdq 6s ease-in-out infinite`:
    ```
    0%,10% {translateY(0)} 13%,30% {-10%} 33%,50% {-20%} 53%,70% {-30%} 73%,90% {-40%} 93%,100% {-50%}
    ```
    The logo strip ticks up one logo every ~1.2s and loops seamlessly at -50%.
  - The "[" and "]" brackets are text.
  - Then the CTA row (margin-top 32, gap 8): "Get 60 days full access" (black, → `#60-day-trial-offer`).
- Decoration: `bng-text-slice-bottom-right-decoration.svg` (371x418) absolute at the section's right edge, top 298px.

## 4. TestimonialSlice, BNG version (`et58vsw*`)
- SliceGrid:
  - Column `span 9` (886): blockquote **H64** white (max-width 860, mb 24; placeholder ~200 chars, curly quotes). Then the attribution "Constance Docos, Senior UX Designer at Breville" (**H24**, margin-top 64).
  - Column `span 3` (flex, align end): an image pair 320x160. A 160x160 photo (`breville-girl.webp`, cover, translateX(12px)) overlaps a 160x160 logo tile (`breville.png`, contain, z 1). At ≤1280 the pair is 80px tall.
- Mobile decoration `bng-mobile-testimonial-top-right-decoration.svg`.

## 5. Customer stories grid (`e18efzco*`)
- SliceContainer > BaseGrid (gap `64px 32px`) of **6 CustomerStoryCards** (same component as `roles.md` §7, span 4, 376 wide, with the pixel hover). On the blue theme the hover pixels and overlay bg are `#0A0A0A` (`customerStoryCard.hoverColor = black`).
- Order (thumbnails): Itaú (`Customer_Itau.png`), Atlassian (`Customer_Atlassian.png`), Canva (`Customer_Canva_AI.png`), Breville (`Customer_Breville.png`), CNH (`Customer_CNHIndustrial.png`), SmartRecruiters (`Customer_SmartRecruiter.png`). These are the homepage story set, already in `public/assets/`; titles are in the data.
- ≤799: the grid hides and `.e18efzco1` shows a horizontal Carousel (cards 237.6 wide).

## 6. TeamSwitchSlice (`e1268f4r*`)
- Decorations: SVGs at left-centre (201x730), right-top (234x442 at `top:-169px`), right-bottom (228x623). Mobile variants hidden on desktop. Files are `bng-team-switch-*.svg` and `bng-mobile-team-switch-*.svg`.
- SliceGrid (row-gap 0):
  1. `h2` "Trusted by the best. Built by us." (28px w500 ls -0.22, centred).
  2. Four giant lines (`.e1268f4r10`, Inter 600 **124px / 1.15**, ls -3; md 72px ls -2 lh 1.3 centred; sm 40px ls -1). Each line has its own grid column and a progressive upward nudge:
     - "Why teams": `3 / -1`, no shift;
     - "like [logo] are": `4 / -1`, `translateY(-16px)`;
     - "innovating with": `3 / -1`, `-32px`;
     - "↳ Dovetail": `5 / -1`, `-48px`.

     At sm the lines also shift ±16px horizontally (see CSS).
  3. The inline **logo rotator** `.e1268f4r8` (124x124, overflow hidden, margin `0 .15em`; md 72; sm 48) holds a column `.e1268f4r6` of 8 square logos (124x124: Notion, Canva, Itaú, Zapier, ×2). It runs `animation: animation-bf2vhn 6s ease-in-out infinite`:
     ```
     0%,10% {0} 13%,30% {-12.5%} 33%,50% {-25%} 53%,70% {-37.5%} 73%,90% {-50%} 93%,100% {-50%}
     ```
  4. `h2.e1268f4r11` **H40** (max 832, margin `96px 180px`; placeholder ~230 chars).
  5. A source line "Forrester’s The Total Economic Impact™ of Dovetail, 2025" (14px), then 3 stats in columns `span 3` (274 wide), each **H80** stat ("2.3x", "30%", "66%") over an H20 label ("Return on investment", "Increased team capacity", "Faster shipping").

## 7. Form slice (`e1yij67q*`)
- SliceGrid (row-gap 96):
  - Column 1–11: `h2` **H64** "Join the world's leading teams.\nSign up for Enterprise and get your first 60 days on us." (1090 wide);
  - Column `3 / span 7` (682): `h3` **H32** (placeholder ~170 chars, mb 64), then the **HubSpot form** (`HubspotForm` > `.form-insert`).
- The HubSpot embed (`js.hsforms.net/forms/embed/v2.js`) is third-party. It **didn't render at 1440 in my run** (0px tall); it rendered at 390 (486 tall). Fields (stacked, gap 16, labels visually hidden, placeholder-only):
  - First name*, Last name* (a 2-column fieldset that stacks on mobile);
  - Company email*;
  - Company name*;
  - Job title*.
  - Inputs: height 40, `padding:10px 40px 16px 0`, **bottom border only** 1px white, transparent bg, white 16px text, `transition: all .3s`.
  - Submit: black button (pad `10px 16px`, radius 8, 46 tall, `transition: background .15s, color .15s`).
  - A business-email domain check shows an error under the form.
- Decorations: `bng-form-bottom-left-decoration.svg` (159x516) and `bng-form-bottom-right-decoration.svg` (228x510) at the section's bottom edges.

## 8. BNG footer (`e1nbsdsv*`)
- SliceContainer > row (`flex-direction:row-reverse; justify-content:space-between; align-items:center; padding:64px 0`):
  - right: links (gap 32, wrap): "Cookie preferences" (button), "Trust center", "Legal and privacy". All are M14 white uppercase (the button has ls normal).
  - left: "© 2026 Dovetail" (M14, margin `32px 0 48px`).
- At ≤799 it stacks (322 tall).

## 9. CSS (generated)
Campaign slices:
```css
/* eciainh0 = nav 1440x88 */
.eciainh0 { align-items: center; display: flex; height: 88px; justify-content: space-between; margin: auto; padding: 24px; position: relative; z-index: 5 }
@media (max-width: 799px) { .eciainh0 { justify-content: center; padding: 0px 32px } }
/* eciainh4 = a 196x53 */
.eciainh4 { background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); display: flex; align-items: center; justify-content: center; padding: 10px 11px; border-radius: 8px }
.eciainh4:disabled { opacity: 0.6; pointer-events: none }
.eciainh4:hover, .eciainh4:focus-visible { color: rgb(167, 167, 167) }
.eciainh4:hover { color: rgba(255, 255, 255, 0.8) }
.eciainh4:focus-visible { outline: rgb(255, 255, 255) solid 1px; outline-offset: 1px }
.eciainh4 svg { display: block }
/* eciainh5 = div 229x46 */
.eciainh5 { display: flex; gap: 8px; align-items: center }
@media (max-width: 799px) { .eciainh5 { display: none } }
/* eciainh1 = div 0x0 */
.eciainh1 { display: none }
@media (max-width: 799px) { .eciainh1 { display: block; position: fixed; bottom: 0px; left: 0px; right: 0px; z-index: 5; overflow: visible; opacity: 1; transform: translateY(0px); pointer-events: auto; visibility: visible; transition: opacity 0.3s, transform 0.3s, visibility 0.3s } }
/* eciainh2 = div 0x0 */
.eciainh2 { background: linear-gradient(0deg, rgb(0, 68, 255) 70.33%, transparent 100%); height: 204px; pointer-events: none; width: unset; position: absolute; bottom: 0px; left: 0px; right: 0px; z-index: 1 }
@media (max-width: 1280px) { .eciainh2 { bottom: 0px; height: 204px; left: 0px; right: 0px; width: unset } }
/* eciainh3 = div 0x0 */
.eciainh3 { display: none }
@media (max-width: 799px) { .eciainh3 { display: flex; flex-direction: column; gap: 8px; position: relative; padding: 0px 32px 32px; z-index: 2 } .eciainh3 a { width: 100%; justify-content: center } }
/* e99h80d2 = div 641x478 */
.e99h80d2 path { transform-box: fill-box; transform-origin: center center }
/* e29458r3 = section 1440x462 */
.e29458r3 { position: relative }
/* e29458r4 = div 371x418 */
.e29458r4 { position: absolute; pointer-events: none; bottom: -55%; right: 0px }
.e29458r4.e29458r4 img { display: block; width: 100%; height: auto }
.e29458r4.e29458r4 svg { display: block; width: 100%; height: auto; overflow: visible }
.e29458r4.e29458r4 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e29458r4.e29458r4 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e29458r4 { display: none } }
/* e29458r5 = div 783x462 */
.e29458r5 { margin: 0px auto; max-width: 783px }
/* e29458r7 = h2 «Built in Sydney. Used by the most ambiti» 783x384 */
.e29458r7 { font-family: $sans; font-size: 40px; font-weight: 500; letter-spacing: -1px; line-height: 48px; margin-bottom: 32px }
@media (max-width: 1280px) { .e29458r7 { font-size: 32px; line-height: 40px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e29458r7 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e29458r2 = span 120x34 */
.e29458r2 { display: inline-block; height: 34px; overflow: hidden; vertical-align: middle }
@media (max-width: 799px) { .e29458r2 { height: 32px } }
/* e29458r0 = div 120x340 */
.e29458r0 { animation: 6s ease-in-out 0s infinite normal none running animation-1tmekdq; display: flex; flex-direction: column; width: 100% }
/* e29458r1 = div 120x34 */
.e29458r1 { flex-shrink: 0; width: 120px; height: 34px; display: flex; align-items: center; justify-content: center }
.e29458r1 img, .e29458r1 svg { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain }
@media (max-width: 799px) { .e29458r1 { height: 32px; width: 112px } }
/* e29458r6 = div 783x46 */
.e29458r6 { display: flex; gap: 8px; flex-wrap: wrap }
/* et58vsw1 = div 0x0 */
.et58vsw1 { position: absolute; pointer-events: none; display: none; top: -25%; right: 0px }
.et58vsw1.et58vsw1 img { display: block; width: 100%; height: auto }
.et58vsw1.et58vsw1 svg { display: block; width: 100%; height: auto; overflow: visible }
.et58vsw1.et58vsw1 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.et58vsw1.et58vsw1 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .et58vsw1 { display: block } }
/* et58vsw2 = blockquote «“Dovetail enables us to access all of Br» 860x340 */
.et58vsw2 { font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px; margin: 0px 0px 24px; max-width: 860px }
@media (max-width: 1280px) { .et58vsw2 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .et58vsw2 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* et58vsw3 = p «Constance Docos, Senior UX Designer at B» 886x32 */
.et58vsw3 { font-family: $sans; font-size: 24px; line-height: 32px; font-weight: 500; letter-spacing: -0.5px; margin: 64px 0px 0px }
@media (max-width: 1280px) { .et58vsw3 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } .et58vsw3 { margin: 0px } }
@media (max-width: 799px) { .et58vsw3 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } }
/* et58vsw5 = div 274x436 */
.et58vsw5 { grid-column: 10 / span 3; order: unset; max-width: unset; min-width: unset; display: flex; align-items: flex-end }
@media (max-width: 1280px) { .et58vsw5 { grid-column: 1 / -1; display: block } .et58vsw5 { align-items: flex-start } }
@media (max-width: 799px) { .et58vsw5 { grid-column: 1 / -1; order: 0; display: block; min-width: unset } }
/* et58vsw4 = div 320x160 */
.et58vsw4 { display: flex }
.et58vsw4 .gatsby-image-wrapper [data-main-image] { opacity: 1 }
/* et58vsw7 = div 160x160 */
.et58vsw7 { transform: translateX(12px); height: 160px; width: 160px }
@media (max-width: 1280px) { .et58vsw7 { transform: unset; height: 80px; width: 80px } }
/* et58vsw6 = img 160x160 */
/* et58vsw8 = div 160x160 */
.et58vsw8 { position: relative; z-index: 1; height: 160px; width: 160px }
@media (max-width: 1280px) { .et58vsw8 { transform: translateX(-24px); height: 80px; width: 80px } }
/* e18efzco0 = div 1440x1127 */
.e18efzco0 { display: block }
@media (max-width: 799px) { .e18efzco0 { display: none } }
/* e18efzco1 = div 0x0 */
.e18efzco1 { display: none }
@media (max-width: 799px) { .e18efzco1 { display: block } }
/* e1268f4r1 = div 0x0 */
.e1268f4r1 { position: absolute; pointer-events: none; left: 0px; top: 50%; transform: translateY(-50%) }
.e1268f4r1.e1268f4r1 img { display: block; width: 100%; height: auto }
.e1268f4r1.e1268f4r1 svg { display: block; width: 100%; height: auto; overflow: visible }
.e1268f4r1.e1268f4r1 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e1268f4r1.e1268f4r1 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e1268f4r1 { display: none } }
/* e1268f4r2 = div 234x442 */
.e1268f4r2 { position: absolute; pointer-events: none; right: 0px; top: -14% }
.e1268f4r2.e1268f4r2 img { display: block; width: 100%; height: auto }
.e1268f4r2.e1268f4r2 svg { display: block; width: 100%; height: auto; overflow: visible }
.e1268f4r2.e1268f4r2 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e1268f4r2.e1268f4r2 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e1268f4r2 { display: none } }
/* e1268f4r3 = div 0x0 */
.e1268f4r3 { position: absolute; pointer-events: none; right: 0px; bottom: -16% }
.e1268f4r3.e1268f4r3 img { display: block; width: 100%; height: auto }
.e1268f4r3.e1268f4r3 svg { display: block; width: 100%; height: auto; overflow: visible }
.e1268f4r3.e1268f4r3 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e1268f4r3.e1268f4r3 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e1268f4r3 { display: none } }
/* e1268f4r4 = div 0x0 */
.e1268f4r4 { position: absolute; pointer-events: none; display: none; bottom: -6%; left: 0px }
.e1268f4r4.e1268f4r4 img { display: block; width: 100%; height: auto }
.e1268f4r4.e1268f4r4 svg { display: block; width: 100%; height: auto; overflow: visible }
.e1268f4r4.e1268f4r4 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e1268f4r4.e1268f4r4 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e1268f4r4 { display: block } }
/* e1268f4r5 = div 0x0 */
.e1268f4r5 { position: absolute; pointer-events: none; display: none; right: 0px; top: 55% }
.e1268f4r5.e1268f4r5 img { display: block; width: 100%; height: auto }
.e1268f4r5.e1268f4r5 svg { display: block; width: 100%; height: auto; overflow: visible }
.e1268f4r5.e1268f4r5 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e1268f4r5.e1268f4r5 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e1268f4r5 { display: block } }
/* e1268f4r9 = div 1192x34 */
.e1268f4r9 { grid-column: span 12; order: unset; max-width: unset; min-width: unset; display: flex; align-items: center; justify-content: center; text-align: center }
.e1268f4r9 h2 { font-size: 28px; letter-spacing: -0.22px; font-weight: 500; text-align: center }
@media (max-width: 1280px) { .e1268f4r9 { grid-column: 1 / -1; display: block } }
@media (max-width: 799px) { .e1268f4r9 { grid-column: 1 / -1; display: none; min-width: unset } }
/* e1268f4r10 = div «Why teams» 988x142 */
.e1268f4r10 { grid-column: 3 / -1; order: unset; max-width: unset; min-width: unset; font-size: 124px; font-weight: 600; line-height: 1.15; letter-spacing: -3px; color: inherit }
@media (max-width: 1280px) { .e1268f4r10 { grid-column: 1 / -1; display: block } .e1268f4r10 { font-size: 72px; letter-spacing: -2px; display: flex; justify-content: center } }
@media (max-width: 799px) { .e1268f4r10 { grid-column: 1 / -1; display: block; min-width: unset } .e1268f4r10 { font-size: 40px; letter-spacing: -1px; transform: translateX(-16px) } }
@media (min-width: 800px) and (max-width: 1280px) { .e1268f4r10 { line-height: 1.3 } }
/* e1268f4r10--v2 = div «like [] are» 886x144 */
.e1268f4r10--v2 { grid-column: 4 / -1; order: unset; max-width: unset; min-width: unset; font-size: 124px; font-weight: 600; line-height: 1.15; letter-spacing: -3px; color: inherit; transform: translateY(-16px) }
@media (max-width: 1280px) { .e1268f4r10--v2 { grid-column: 1 / -1; display: block } .e1268f4r10--v2 { font-size: 72px; letter-spacing: -2px; display: flex; justify-content: center; transform: translateY(-16px) } }
@media (max-width: 799px) { .e1268f4r10--v2 { grid-column: 1 / -1; display: block; min-width: unset } .e1268f4r10--v2 { font-size: 40px; letter-spacing: -1px; transform: translateX(16px) translateY(-16px) } }
@media (min-width: 800px) and (max-width: 1280px) { .e1268f4r10--v2 { line-height: 1.3 } }
/* e1268f4r8 = span 124x124 */
.e1268f4r8 { display: inline-block; height: 124px; min-width: 124px; overflow: hidden; vertical-align: middle; margin: 0px 0.15em }
@media (min-width: 800px) and (max-width: 1280px) { .e1268f4r8 { transform: translateY(0.12em) } }
@media (max-width: 1280px) { .e1268f4r8 { height: 72px; min-width: 72px } }
@media (max-width: 799px) { .e1268f4r8 { height: 48px; min-width: 48px } }
/* e1268f4r6 = div 124x992 */
.e1268f4r6 { animation: 6s ease-in-out 0s infinite normal none running animation-bf2vhn; display: flex; flex-direction: column; width: 100% }
/* e1268f4r7 = div 124x124 */
.e1268f4r7 { flex-shrink: 0; height: 124px; display: flex; align-items: center; justify-content: flex-start }
.e1268f4r7 img, .e1268f4r7 svg { height: 100%; width: auto; object-fit: contain }
@media (max-width: 1280px) { .e1268f4r7 { height: 72px } }
@media (max-width: 799px) { .e1268f4r7 { height: 48px } }
/* e1268f4r10--v3 = div «innovating with» 988x142 */
.e1268f4r10--v3 { grid-column: 3 / -1; order: unset; max-width: unset; min-width: unset; font-size: 124px; font-weight: 600; line-height: 1.15; letter-spacing: -3px; color: inherit; transform: translateY(-32px) }
@media (max-width: 1280px) { .e1268f4r10--v3 { grid-column: 1 / -1; display: block } .e1268f4r10--v3 { font-size: 72px; letter-spacing: -2px; display: flex; justify-content: center; transform: translateY(-32px) } }
@media (max-width: 799px) { .e1268f4r10--v3 { grid-column: 1 / -1; display: block; min-width: unset } .e1268f4r10--v3 { font-size: 40px; letter-spacing: -1px; transform: translateX(-16px) translateY(-32px) } }
@media (min-width: 800px) and (max-width: 1280px) { .e1268f4r10--v3 { line-height: 1.3 } }
/* e1268f4r10--v4 = div «↳ Dovetail» 784x142 */
.e1268f4r10--v4 { grid-column: 5 / -1; order: unset; max-width: unset; min-width: unset; font-size: 124px; font-weight: 600; line-height: 1.15; letter-spacing: -3px; color: inherit; transform: translateY(-48px) }
@media (max-width: 1280px) { .e1268f4r10--v4 { grid-column: 1 / -1; display: block } .e1268f4r10--v4 { font-size: 72px; letter-spacing: -2px; display: flex; justify-content: center; transform: translateY(-48px) } }
@media (max-width: 799px) { .e1268f4r10--v4 { grid-column: 1 / -1; display: block; min-width: unset } .e1268f4r10--v4 { font-size: 40px; letter-spacing: -1px; transform: translateX(16px) translateY(-48px) } }
@media (min-width: 800px) and (max-width: 1280px) { .e1268f4r10--v4 { line-height: 1.3 } }
/* e1268f4r11 = h2 «From Sydney to Silicon Valley, 100,000+ » 832x240 */
.e1268f4r11 { font-family: $sans; font-size: 40px; font-weight: 500; letter-spacing: -1px; line-height: 48px; max-width: 832px; margin: 96px auto }
@media (max-width: 1280px) { .e1268f4r11 { font-size: 32px; line-height: 40px; letter-spacing: -0.25px } .e1268f4r11 { margin: 48px 0px } }
@media (max-width: 799px) { .e1268f4r11 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } .e1268f4r11 { margin: 0px } }
/* e1268f4r12 = p «2.3x» 274x84 */
.e1268f4r12 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 80px; line-height: 84px; margin-bottom: 4px }
@media (max-width: 1280px) { .e1268f4r12 { font-size: 64px; line-height: 68px; letter-spacing: -2px } }
@media (max-width: 799px) { .e1268f4r12 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e1268f4r12 { font-size: 64px; margin-bottom: 8px } }
/* e1268f4r13 = p «Return on investment» 274x28 */
.e1268f4r13 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px }
@media (max-width: 1280px) { .e1268f4r13 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1268f4r13 { font-size: 16px; line-height: 24px } .e1268f4r13 { margin-bottom: 32px; font-size: 14px; line-height: 21px } }
/* e1yij67q1 = div 0x0 */
.e1yij67q1 { position: absolute; pointer-events: none; bottom: 0px; left: 0px }
.e1yij67q1.e1yij67q1 img { display: block; width: 100%; height: auto }
.e1yij67q1.e1yij67q1 svg { display: block; width: 100%; height: auto; overflow: visible }
.e1yij67q1.e1yij67q1 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e1yij67q1.e1yij67q1 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e1yij67q1 { display: none } }
/* e1yij67q2 = div 0x0 */
.e1yij67q2 { position: absolute; pointer-events: none; bottom: 5%; right: 0px }
.e1yij67q2.e1yij67q2 img { display: block; width: 100%; height: auto }
.e1yij67q2.e1yij67q2 svg { display: block; width: 100%; height: auto; overflow: visible }
.e1yij67q2.e1yij67q2 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e1yij67q2.e1yij67q2 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e1yij67q2 { display: none } }
/* e1yij67q4 = h2 «Join the world's leading teams. Sign up » 1090x204 */
.e1yij67q4 { font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px }
@media (max-width: 1280px) { .e1yij67q4 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1yij67q4 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1yij67q5 = h3 «The best never guess. Now, you won't eit» 682x200 */
.e1yij67q5 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 40px; margin-bottom: 64px }
@media (max-width: 1280px) { .e1yij67q5 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1yij67q5 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e18jsg1g0 = div 682x0 */
.e18jsg1g0 { position: relative; margin: 0px !important }
.e18jsg1g0 form { display: flex; flex-direction: column; gap: 24px; padding: 32px; background-color: rgb(30, 30, 30); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08) }
.e18jsg1g0 fieldset { display: flex !important; gap: 16px !important; max-width: 100% !important }
.e18jsg1g0 label { display: flex; margin: 0px 0px 8px !important; font-size: 16px !important; font-weight: 400 !important; line-height: 24px !important; letter-spacing: 0px !important }
.e18jsg1g0 input, .e18jsg1g0 textarea { transition: 300ms; flex: 1 1 0%; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.48); box-sizing: border-box; font-family: Inter; font-size: 16px; font-weight: 400; line-height: 28px; letter-spacing: -0.5px; padding: 10px 40px 10px 16px; text-overflow: ellipsis; appearance: none; border-radius: 8px; color: rgb(255, 255, 255); width: 100% !important; margin-right: 0px !important; margin-bottom: 0px !important; height: 40px !important }
.e18jsg1g0 input:hover, .e18jsg1g0 textarea:hover, .e18jsg1g0 input:focus, .e18jsg1g0 textarea:focus { border: 1px solid rgba(255, 255, 255, 0.64); background: rgba(255, 255, 255, 0.08) }
.e18jsg1g0 input::placeholder, .e18jsg1g0 textarea::placeholder, .e18jsg1g0 input::-webkit-input-placeholder, .e18jsg1g0 textarea::-webkit-input-placeholder { color: rgb(167, 167, 167) }
.e18jsg1g0 select { transition: 300ms; flex: 1 1 0%; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.48); box-sizing: border-box; font-size: 16px; font-weight: 500; line-height: 24px; padding: 8px 40px 8px 16px; text-overflow: ellipsis; appearance: none; border-radius: 8px; color: rgb(255, 255, 255); width: 100% !important; margin-right: 0px !important; margin-bottom: 0px !important; height: 40px !important }
.e18jsg1g0 select:hover, .e18jsg1g0 select:focus { background: rgba(255, 255, 255, 0.08) }
.e18jsg1g0 select::placeholder, .e18jsg1g0 select::-webkit-input-placeholder { color: rgb(167, 167, 167); background: rgb(30, 30, 30) !important }
.e18jsg1g0 option { font-family: Inter !important; background: rgb(30, 30, 30) !important }
.e18jsg1g0 option[value=""][disabled] { display: none }
.e18jsg1g0 .input { margin-right: 0px !important }
.e18jsg1g0 textarea { height: 200px !important }
.e18jsg1g0 a { text-decoration: underline }
.e18jsg1g0 div { width: 100% !important }
.e18jsg1g0 .hs-dependent-field { display: flex; flex-direction: column; gap: 24px }
.e18jsg1g0 .hs-submit { flex-shrink: 1 }
.e18jsg1g0 .actions { margin-top: 0px !important }
.e18jsg1g0 .actions input { color: rgb(10, 10, 10); box-shadow: none; cursor: pointer; font-size: 16px; font-weight: 500; line-height: 18px; letter-spacing: 0px; border-radius: 8px; padding: 10px 16px; border: 0px; min-width: 146px; transition: background 150ms, color 150ms; background-color: rgb(255, 255, 255) !important; width: 100% !important }
.e18jsg1g0 .actions input:hover, .e18jsg1g0 .actions input:focus-visible { background-color: rgba(10, 10, 10, 0.8) !important }
.e18jsg1g0 .hubspot-domain-error:not(:empty) { padding: 0px; font-weight: 500; color: rgb(255, 68, 0); margin: 0px 0px 8px !important; font-size: 14px !important }
.e18jsg1g0 .hs-error-msgs { margin: 8px 0px 0px !important; padding: 0px !important }
.e18jsg1g0 .hs-error-msgs label { font-weight: 500 !important; color: rgb(255, 68, 0) !important }
.e18jsg1g0 .hs-error-msgs li { list-style: none !important }
.e18jsg1g0 .submitted-message { display: flex; align-items: center; justify-content: center; padding: 128px 32px; flex-direction: column; background-color: black; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.24) }
.e18jsg1g0 .submitted-message h2 { text-align: center; margin-bottom: 8px; font-weight: 800; letter-spacing: 0px; font-size: 24px !important; line-height: 32px !important }
.e18jsg1g0 .submitted-message p { text-align: center; color: rgb(167, 167, 167); margin-bottom: 32px; max-width: 476px; font-weight: 500; font-size: 18px !important; line-height: 30px !important }
.e18jsg1g0 .legal-consent-container p { font-weight: 400; font-size: 12px !important; line-height: 16px !important }
.e18jsg1g0 .legal-consent-container div { font-weight: 400; font-size: 12px !important; line-height: 16px !important }
.e18jsg1g0 .grecaptcha-badge { box-shadow: none !important }
.e18jsg1g0 form { background-color: transparent; box-shadow: none; padding: 0px; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; gap: 16px }
.e18jsg1g0 fieldset { flex-direction: column !important }
.e18jsg1g0 input, .e18jsg1g0 textarea, .e18jsg1g0 select { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; border-radius: 0px; background-color: transparent !important; border-width: medium medium 1px !important; border-style: none none solid !important; border-color: currentcolor currentcolor rgb(255, 255, 255) !important; border-image: none !important; color: rgb(255, 255, 255) !important; padding-left: 0px !important; padding-bottom: 16px !important }
.e18jsg1g0 input:hover, .e18jsg1g0 input:focus, .e18jsg1g0 textarea:hover, .e18jsg1g0 textarea:focus, .e18jsg1g0 select:hover, .e18jsg1g0 select:focus { background-color: transparent !important; border-bottom: 1px solid rgb(255, 255, 255) !important }
.e18jsg1g0 input::placeholder, .e18jsg1g0 input::-webkit-input-placeholder, .e18jsg1g0 textarea::placeholder, .e18jsg1g0 textarea::-webkit-input-placeholder { color: rgba(255, 255, 255, 0.64) }
.e18jsg1g0 .hs-form-field label { position: absolute; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border: 0px }
.e18jsg1g0 .hs-button { padding: 10px 16px !important; font-size: 18px !important; line-height: 24px !important; height: 46px !important }
.e18jsg1g0 .hs-richtext { margin: 24px 0px }
.e18jsg1g0 .submitted-message { background-color: transparent; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: rgb(255, 255, 255) }
.e18jsg1g0 .submitted-message h2, .e18jsg1g0 .submitted-message p { color: rgb(255, 255, 255) }
.e18jsg1g0 .actions input { background-color: rgb(10, 10, 10) !important; color: rgb(255, 255, 255) !important; width: fit-content !important; border-width: medium !important; border-style: none !important; border-color: currentcolor !important; border-image: none !important }
@media (max-width: 1280px) { .e18jsg1g0 form { padding: 32px 20px } .e18jsg1g0 fieldset { flex-direction: column } .e18jsg1g0 { margin: 48px 0px } .e18jsg1g0 input, .e18jsg1g0 textarea, .e18jsg1g0 select { font-size: 16px; line-height: 24px } .e18jsg1g0 { margin: 48px 0px } }
@media (max-width: 799px) { .e18jsg1g0 input, .e18jsg1g0 textarea, .e18jsg1g0 select { font-size: 16px; line-height: 24px } }
/* e1nbsdsv2 = footer 1440x227 */
.e1nbsdsv2 { position: relative; z-index: 1 }
/* e1nbsdsv3 = div 1192x227 */
.e1nbsdsv3 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center; padding: 64px 0px }
@media (max-width: 1280px) { .e1nbsdsv3 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e1nbsdsv3 { font-size: 14px; line-height: 140% } .e1nbsdsv3 { flex-direction: column; align-items: flex-start; padding: 96px 0px 32px } }
/* e1nbsdsv4 = div 493x21 */
.e1nbsdsv4 { display: flex; flex-wrap: wrap; gap: 32px }
@media (max-width: 799px) { .e1nbsdsv4 { flex-direction: column; gap: 16px } }
/* e1nbsdsv0 = button «Cookie preferences» 153x21 */
.e1nbsdsv0 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); text-decoration: none; padding: 0px; text-transform: uppercase }
.e1nbsdsv0:disabled { opacity: 0.6; pointer-events: none }
.e1nbsdsv0:hover, .e1nbsdsv0:focus-visible { color: rgb(167, 167, 167) }
.e1nbsdsv0 { font-size: 14px }
.e1nbsdsv0:hover, .e1nbsdsv0:focus-visible { color: rgb(255, 255, 255) }
/* e1nbsdsv0--v2 = a «Trust center» 114x21 */
.e1nbsdsv0--v2 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); text-decoration: none; padding: 0px; text-transform: uppercase }
.e1nbsdsv0--v2:disabled { opacity: 0.6; pointer-events: none }
.e1nbsdsv0--v2:hover, .e1nbsdsv0--v2:focus-visible { color: rgb(167, 167, 167) }
.e1nbsdsv0--v2 { font-size: 14px }
.e1nbsdsv0--v2:hover, .e1nbsdsv0--v2:focus-visible { color: rgb(255, 255, 255) }
/* e1nbsdsv1 = div «© 2026 Dovetail» 141x19 */
.e1nbsdsv1 { color: rgb(255, 255, 255); margin: 32px 0px 48px }
@keyframes animation-1tmekdq { 0%, 10% { transform: translateY(0px); } 13%, 30% { transform: translateY(-10%); } 33%, 50% { transform: translateY(-20%); } 53%, 70% { transform: translateY(-30%); } 73%, 90% { transform: translateY(-40%); } 93%, 100% { transform: translateY(-50%); } }
@keyframes animation-bf2vhn { 0%, 10% { transform: translateY(0px); } 13%, 30% { transform: translateY(-12.5%); } 33%, 50% { transform: translateY(-25%); } 53%, 70% { transform: translateY(-37.5%); } 73%, 90% { transform: translateY(-50%); } 93%, 100% { transform: translateY(-50%); } }
```

Hero overrides on this page (decorations etc.; the rest = CLONE_SPEC §10):
```css
/* e4352py0 = section 1440x900 */
.e4352py0 { display: flex; flex-direction: column; min-height: 100vh; position: relative }
@media (max-width: 799px) { .e4352py0 { min-height: auto; overflow-x: clip } }
/* e4352py1 = div 1440x900 */
.e4352py1 { inset: 0px; pointer-events: none; position: absolute }
/* e4352py13 = div 641x478 */
.e4352py13 { position: absolute; pointer-events: none; left: 0px; opacity: 0; top: -88px }
.e4352py13.e4352py13 img { display: block; width: 100%; height: auto }
.e4352py13.e4352py13 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py13.e4352py13 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py13.e4352py13 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py13 { display: none } }
/* e4352py14 = div 620x376 */
.e4352py14 { position: absolute; pointer-events: none; opacity: 0; right: 0px; top: -88px }
.e4352py14.e4352py14 img { display: block; width: 100%; height: auto }
.e4352py14.e4352py14 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py14.e4352py14 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py14.e4352py14 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py14 { display: none } }
/* e4352py15 = div 588x726 */
.e4352py15 { position: absolute; pointer-events: none; bottom: -220px; left: 0px; opacity: 0 }
.e4352py15.e4352py15 img { display: block; width: 100%; height: auto }
.e4352py15.e4352py15 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py15.e4352py15 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py15.e4352py15 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py15 { display: none } }
/* e4352py16 = div 302x526 */
.e4352py16 { position: absolute; pointer-events: none; bottom: -120px; opacity: 0; right: 0px }
.e4352py16.e4352py16 img { display: block; width: 100%; height: auto }
.e4352py16.e4352py16 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py16.e4352py16 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py16.e4352py16 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py16 { display: none } }
/* e4352py17 = div 0x0 */
.e4352py17 { position: absolute; pointer-events: none; display: none; left: 0px; opacity: 0; top: -128px }
.e4352py17.e4352py17 img { display: block; width: 100%; height: auto }
.e4352py17.e4352py17 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py17.e4352py17 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py17.e4352py17 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py17 { display: block } }
/* e4352py18 = div 0x0 */
.e4352py18 { position: absolute; pointer-events: none; display: none; opacity: 0; right: 0px; top: -128px }
.e4352py18.e4352py18 img { display: block; width: 100%; height: auto }
.e4352py18.e4352py18 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py18.e4352py18 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py18.e4352py18 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py18 { display: block } }
/* e4352py19 = div 0x0 */
.e4352py19 { position: absolute; pointer-events: none; display: none; bottom: 16%; left: 0px; opacity: 0 }
.e4352py19.e4352py19 img { display: block; width: 100%; height: auto }
.e4352py19.e4352py19 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py19.e4352py19 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py19.e4352py19 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py19 { display: block } }
/* e4352py20 = div 0x0 */
.e4352py20 { position: absolute; pointer-events: none; display: none; bottom: 15%; opacity: 0; right: 0px }
.e4352py20.e4352py20 img { display: block; width: 100%; height: auto }
.e4352py20.e4352py20 svg { display: block; width: 100%; height: auto; overflow: visible }
.e4352py20.e4352py20 svg path { transform-box: fill-box; transform-origin: center center; opacity: 0.95 }
.e4352py20.e4352py20 svg path:nth-of-type(5n+2) { opacity: 0.3 }
@media (max-width: 1280px) { .e4352py20 { display: block } }
/* e4352py2 = div 1440x455 */
.e4352py2 { align-items: center; display: flex; flex-direction: column; justify-content: center; left: 0px; position: absolute; right: 0px; top: calc(-88px + 50vh); transform: translateY(-50%) }
@media (max-width: 799px) { .e4352py2 { align-items: center; padding-top: 36px; position: relative; top: 0px; transform: none } }
/* e4352py3 = div 389x563 */
.e4352py3 { margin-bottom: -12vh; position: relative }
@media (max-width: 799px) { .e4352py3 { display: flex; justify-content: center; margin-bottom: 0px } }
/* e4352py5 = div 389x563 */
@media (max-width: 799px) { .e4352py5 { display: inline-block; transform: scale(0.82); transform-origin: center top } }
@media (max-width: 588px) { .e4352py5 { transform: scale(0.72) } }
/* e4352py6 = div 389x563 */
.e4352py6 { align-items: center; display: flex; flex-direction: column; font-size: 170px; gap: 10px; letter-spacing: -6.8px }
@media (min-width: 800px) and (max-width: 1280px) { .e4352py6 { line-height: 0.9 } }
@media (max-width: 1280px) { .e4352py6 { font-size: clamp(80px, 10vw, 170px) } }
@media (max-width: 799px) { .e4352py6 { font-size: 80px; gap: 0px } .e4352py6 > * + * { margin-top: -0.08em } }
/* e4352py8 = div 247x133 */
.e4352py8 { align-items: center; display: flex; opacity: 0; position: relative; width: fit-content }
/* e4352py7 = p «The» 247x133 */
.e4352py7 { letter-spacing: -4px; margin: 0px; font-size: var(--hero-text-size, 170px); font-weight: 600; line-height: var(--hero-text-size, 170px); position: relative; text-align: center; width: fit-content; z-index: 1; transform: translateX(-50%) }
@media (max-width: 1512px) { .e4352py7 { font-size: 9.26vw; line-height: 9.26vw; letter-spacing: -0.01736vw } .e4352py7 { font-size: var(--hero-text-size, 9.26vw); line-height: var(--hero-text-size, 9.26vw) } }
@media (max-width: 799px) { .e4352py7 { font-size: 56px; line-height: 64px; letter-spacing: -2px } .e4352py7 { font-size: inherit; line-height: inherit } .e4352py7 { transform: translateX(-50%) } }
@media (max-width: 1280px) { .e4352py7 { font-size: inherit; line-height: inherit } }
@media (min-width: 800px) and (max-width: 1280px) { .e4352py7 { line-height: 0.9 } }
/* e4352py12 = span 214x150 */
.e4352py12 { align-items: center; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; isolation: isolate; justify-content: center; opacity: 0; position: absolute; width: calc(1.42941em); left: 108%; top: -8%; transform: rotate(0deg); border-radius: 0px !important; clip-path: none !important; overflow: visible !important }
.e4352py12 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100%; border-radius: 0px !important; overflow: visible !important }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py12 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py12 { font-size: inherit; height: calc(1.18056em); width: calc(1.6875em) } }
@media (max-width: 799px) { .e4352py12 { left: 108%; top: 0%; transform: rotate(0deg) } }
/* e4352py7--v2 = p «best» 281x133 */
.e4352py7--v2 { letter-spacing: -4px; margin: 0px; font-size: var(--hero-text-size, 170px); font-weight: 600; line-height: var(--hero-text-size, 170px); position: relative; text-align: center; width: fit-content; z-index: 1; transform: translate(1%, -15%) }
@media (max-width: 1512px) { .e4352py7--v2 { font-size: 9.26vw; line-height: 9.26vw; letter-spacing: -0.01736vw } .e4352py7--v2 { font-size: var(--hero-text-size, 9.26vw); line-height: var(--hero-text-size, 9.26vw) } }
@media (max-width: 799px) { .e4352py7--v2 { font-size: 56px; line-height: 64px; letter-spacing: -2px } .e4352py7--v2 { font-size: inherit; line-height: inherit } .e4352py7--v2 { transform: translate(1%, -15%) } }
@media (max-width: 1280px) { .e4352py7--v2 { font-size: inherit; line-height: inherit } }
@media (min-width: 800px) and (max-width: 1280px) { .e4352py7--v2 { line-height: 0.9 } }
/* e4352py10 = span 150x150 */
.e4352py10 { align-items: center; border-radius: 8px; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; opacity: 0; overflow: hidden; position: absolute; width: 1em; left: -92%; top: -50%; transform: rotate(0deg) }
.e4352py10 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100% }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py10 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py10 { font-size: inherit; height: calc(1.18056em); width: calc(1.18056em) } }
@media (max-width: 799px) { .e4352py10 { left: -92%; top: -45%; transform: rotate(0deg) } }
/* e4352py11 = span 150x150 */
.e4352py11 { align-items: center; border-radius: 50%; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; opacity: 0; overflow: hidden; position: absolute; width: 1em; isolation: isolate; z-index: 2; left: -56%; top: 16%; transform: rotate(0deg) }
.e4352py11 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100% }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py11 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py11 { font-size: inherit; height: calc(1.18056em); width: calc(1.18056em) } }
@media (max-width: 799px) { .e4352py11 { left: -58%; top: 18%; transform: rotate(0deg) } }
/* e4352py9 = span 150x150 */
.e4352py9 { align-items: center; border-radius: 8px; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; opacity: 0; overflow: hidden; position: absolute; width: 1em; right: -60%; top: -8%; transform: rotate(0deg) }
.e4352py9 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100% }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py9 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py9 { font-size: inherit; height: calc(1.18056em); width: calc(1.18056em) } }
@media (max-width: 799px) { .e4352py9 { right: -60%; top: 0%; transform: rotate(0deg) } }
/* e4352py7--v3 = p «never» 364x133 */
.e4352py7--v3 { letter-spacing: -4px; margin: 0px; font-size: var(--hero-text-size, 170px); font-weight: 600; line-height: var(--hero-text-size, 170px); position: relative; text-align: center; width: fit-content; z-index: 1; transform: translate(-35%, -42%) }
@media (max-width: 1512px) { .e4352py7--v3 { font-size: 9.26vw; line-height: 9.26vw; letter-spacing: -0.01736vw } .e4352py7--v3 { font-size: var(--hero-text-size, 9.26vw); line-height: var(--hero-text-size, 9.26vw) } }
@media (max-width: 799px) { .e4352py7--v3 { font-size: 56px; line-height: 64px; letter-spacing: -2px } .e4352py7--v3 { font-size: inherit; line-height: inherit } .e4352py7--v3 { transform: translate(-35%, -42%) } }
@media (max-width: 1280px) { .e4352py7--v3 { font-size: inherit; line-height: inherit } }
@media (min-width: 800px) and (max-width: 1280px) { .e4352py7--v3 { line-height: 0.9 } }
/* e4352py9--v2 = span 150x150 */
.e4352py9--v2 { align-items: center; border-radius: 8px; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; opacity: 0; overflow: hidden; position: absolute; width: 1em; z-index: 2; left: 70%; top: -22%; transform: rotate(0deg) }
.e4352py9--v2 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100% }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py9--v2 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py9--v2 { font-size: inherit; height: calc(1.18056em); width: calc(1.18056em) } }
@media (max-width: 799px) { .e4352py9--v2 { left: 72%; top: -18%; transform: rotate(0deg) } }
/* e4352py9--v3 = span 150x150 */
.e4352py9--v3 { align-items: center; border-radius: 8px; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; opacity: 0; overflow: hidden; position: absolute; width: 1em; right: -54%; top: -48%; transform: rotate(0deg) }
.e4352py9--v3 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100% }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py9--v3 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py9--v3 { font-size: inherit; height: calc(1.18056em); width: calc(1.18056em) } }
@media (max-width: 799px) { .e4352py9--v3 { right: -54%; top: -42%; transform: rotate(0deg) } }
/* e4352py10--v2 = span 150x150 */
.e4352py10--v2 { align-items: center; border-radius: 8px; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; opacity: 0; overflow: hidden; position: absolute; width: 1em; right: 86%; top: -30%; transform: rotate(0deg) }
.e4352py10--v2 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100% }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py10--v2 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py10--v2 { font-size: inherit; height: calc(1.18056em); width: calc(1.18056em) } }
@media (max-width: 799px) { .e4352py10--v2 { right: 86%; top: -28%; transform: rotate(0deg) } }
/* e4352py10--v3 = span 150x150 */
.e4352py10--v3 { align-items: center; border-radius: 8px; box-sizing: border-box; display: flex; font-size: var(--hero-logo-size, 170px); flex-shrink: 0; height: 1em; opacity: 0; overflow: hidden; position: absolute; width: 1em; right: 115%; top: -78%; transform: rotate(0deg) }
.e4352py10--v3 svg { display: block; height: 100%; max-height: 100%; max-width: 100%; width: 100% }
@media (min-width: 1281px) and (max-width: 1513px) { .e4352py10--v3 { font-size: var(--hero-logo-size, 150px) } }
@media (max-width: 1280px) { .e4352py10--v3 { font-size: inherit; height: calc(1.18056em); width: calc(1.18056em) } }
@media (max-width: 799px) { .e4352py10--v3 { right: 115%; top: -75%; transform: rotate(0deg) } }
/* e4352py7--v4 = p «guess» 389x133 */
.e4352py7--v4 { letter-spacing: -4px; margin: 0px; font-size: var(--hero-text-size, 170px); font-weight: 600; line-height: var(--hero-text-size, 170px); position: relative; text-align: center; width: fit-content; z-index: 1; transform: translate(17%, -70%) }
@media (max-width: 1512px) { .e4352py7--v4 { font-size: 9.26vw; line-height: 9.26vw; letter-spacing: -0.01736vw } .e4352py7--v4 { font-size: var(--hero-text-size, 9.26vw); line-height: var(--hero-text-size, 9.26vw) } }
@media (max-width: 799px) { .e4352py7--v4 { font-size: 56px; line-height: 64px; letter-spacing: -2px } .e4352py7--v4 { font-size: inherit; line-height: inherit } .e4352py7--v4 { transform: translate(17%, -70%) } }
@media (max-width: 1280px) { .e4352py7--v4 { font-size: inherit; line-height: inherit } }
@media (min-width: 800px) and (max-width: 1280px) { .e4352py7--v4 { line-height: 0.9 } }
```

## 10. Motion summary
| Element | Trigger | Detail |
|---|---|---|
| Hero words/logos | mount | homepage GSAP timeline |
| Hero decorations | mount | opacity 0→1, .25s, stagger .03, delay .66, power2.out |
| Text-slice logo rotator | always | CSS 6s ease-in-out infinite, 5 steps |
| TeamSwitch logo rotator | always | CSS 6s ease-in-out infinite, 4 steps |
| Story cards | hover ≥1281 | pixel fill (black) + overlay |

## 11. Gaps
- **HubSpot form:** third-party, and it didn't render at 1440 in my session. The structure above is from the 390 render. I couldn't read the submit label (an `<input type=submit>` value). Treat the form as an embed placeholder or rebuild the fields as listed.
