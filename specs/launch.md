Source: https://dovetail.com/

# Template: `launch` (1 page): `/launch/suns-out/`

"Dovetail Launch ’26: Sun’s Out" is a one-off campaign page (chunk `3z1a_gch6zlfa`, ~100 KB of bespoke components). The **whole page is blue** (`html` bg `#0044FF`). The standard site **nav is present** (transparent, white links, "Log in" / "Book a demo"), but there's **no alert bar** and **no site footer**: it has a slim campaign footer. A second, **fixed section nav** appears while you're scrolling through the feature sections. Data: `src/data/marketing/launch__suns-out.json`. Read `marketing-shared.md` first.

I took a full-page screenshot for reference at `/Users/riyaghosh/V3/dovetail/.playwright-mcp/launch-full.jpg` (plus `launch-part0..3.jpg`).

Common styles for these sections: blue background throughout, white text, section headings Inter 600. Secondary text is `rgba(255,255,255,.64)`-ish. Chips and cards use `#0029A6` (b90) and `#001A75`/`#081331` (darker blues). Exact values are in the CSS blocks.

## 0. Order (spacers between sections: 240 / 320 / 160 alternating, as in the data file)
| # | Section (root class) | Anchor id | Content |
|---|---|---|---|
| 0 | Section nav `nav.enicust0` (fixed) | – | 4 buttons with icons: "AI Agents in GA", "Channels 2.0", "Dovetail ecosystem", "Enterprise upgrades" |
| 1 | Hero `.e4sdv0e0` | – | "Dovetail Launch ’26" eyebrow, giant "Sun’s [sun] Out", intro + 2 CTAs, sticky scaling video |
| 2 | Shipped `.e1ot4t9i0` | `launch-shipped` | "A lot shipped" with a 3D key icon ("SHIP IT!") + pixel glyphs, "Here’s what’s new", 20 chips linking to anchors |
| 3 | Agents intro `.e1osxjcu0` | `launch-agents` | "[bolt] AI Agents" / "Now available in GA"; "Autonomous. Self-improving." + diagram `launch-2026-agents-diagram.png` + 3 arrow bullets (`#launch-agents-autonomous`) |
| 4 | Digital twins `.e5zj3j0` | `launch-digital-twins` | "Build a digital twin of your customer"; a 3-persona carousel (Jess / Anahita / Travis) with floating UI cards |
| 5 | Multiplayer `.ea0q8q80` | `launch-multiplayer` | "Multiplayer AI for human-agent collaboration" + image + bullets; "The agents deployed at Dovetail:" + 3 agent cards (Ronald, Rita, "Build your own custom agent") that open a modal |
| 6 | Channels intro `.eeuo5qc0` | `launch-channels` | "[nodes] Channels ²·⁰" / "Closing the gap between feedback and code"; "Idea to PR in one click" (`#launch-channels-idea-to-pr`) |
| 7 | Channels features `.e2brdi70` | `launch-trends` | "Spot trends *before* problems arise" + 3 cards (GTM gets a vote, Close the loop automatically, Now with 30+ integrations `#launch-integrations`) + "Now available in your workspace. Try it in open beta →" |
| 8 | Ecosystem `.e5j80f50` | `launch-ecosystem` | "Ecosystem [star]" + two staggered feature blocks (`#launch-ecosystem-integrations`, `#launch-ecosystem-enrich`) |
| 9 | Enterprise `.e1l1dk620` | `launch-enterprise` | "[queen] Enterprise" / "Built for the complexity of large organizations"; a scroll-driven 4-layer stack (Query/Apps/Data/Platform) `.erteesl0`; "AI that knows your business" (`#launch-enterprise-context`) |
| 10 | One way `.ecsil9t0` | `launch-one-way` | "One way to work, across every team" + wide screenshot `enterprise-launch-2.png` + bullets and copy |
| 11 | Protected `.e120p5ma0` | `launch-protected` | "Protected by default" + image + 3 bullets |
| 12 | CTA `.e1uk7pdk0` | – | giant "The best [rotating logo] never guess" + keynote thumbnail ("Watch the keynote") + copy + 2 CTAs |
| 13 | Footer `footer.e1560hmp0` | – | © line, Cookie preferences, Legal & Privacy, Follow us + 4 social icons |

Measured at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `e4sdv0e0` | 1440x1800 @x0 | 1280x1248.4 @x0 | 768x1038.8 @x0 | 390x865.9 @x0 |
| `e4sdv0e7` | 574.4x182.1 @x124 227.672px/182.138px | 549x174.1 @x64 217.6px/174.08px | 704x114.4 @x32 130px/114.4px | 326x113.3 @x32 128.7px/113.256px |
| `e4sdv0e8` | 376.7x376.7 @x634 | 358.4x358.4 @x555 | 240x240 @x264 | 234x234 @x78 |
| `e4sdv0e15` | 381.4x214.6 @x935 | 1152x648 @x64 | 704x396 @x32 | 326x183.4 @x32 |
| `e1ot4t9i3` | 950x340 @x124 200px/170px | 950x340 @x64 200px/170px | 704x48 @x32 56px/48px | 326x96 @x32 56px/48px |
| `e1ot4t9i7` | 177.2x44 @x162 20px/28px | 177.2x44 @x102 20px/28px | 147.4x40 @x70 16px/24px | 147.4x40 @x70 16px/24px |
| `e1osxjcu0` | 1440x1018.6 @x0 | 1280x1269.2 @x0 | 768x1137.1 @x0 | 390x902.7 @x0 |
| `e5zj3j0` | 1440x664.6 @x0 | 1280x1214.1 @x0 | 768x1270.1 @x0 | 390x1262.6 @x0 |
| `eeuo5qc0` | 1440x991.7 @x0 | 1280x1177.2 @x0 | 768x1046 @x0 | 390x1030.1 @x0 |
| `e2brdi70` | 1440x1337.3 @x0 | 1280x1410.8 @x0 | 768x2725.2 @x0 | 390x1968.9 @x0 |
| `e5j80f50` | 1440x1414.1 @x0 | 1280x1574.8 @x0 | 768x1486.5 @x0 | 390x1556 @x0 |
| `e1l1dk620` | 1440x2932 @x0 | 1280x3315.6 @x0 | 768x2773.3 @x0 | 390x2001.4 @x0 |
| `erteesl0` | 1192x1980 @x124 | 1152x1901.5 @x64 | 704x1496.3 @x32 | 326x827.3 @x32 |
| `ecsil9t0` | 1440x388 @x0 | 1280x907.7 @x0 | 768x758.5 @x0 | 390x717.3 @x0 |
| `e120p5ma0` | 1440x460 @x0 | 1280x935.5 @x0 | 768x975.5 @x0 | 390x730.4 @x0 |
| `e1uk7pdk1` | 1192x320 @x124 200px/160px | 1152x220 @x64 120px/110px | 704x56 @x32 56px/56px | 326x112 @x32 56px/56px |
| `e1560hmp1` | 1192x86 @x124 | 1152x86 @x64 | 704x180 @x32 | 326x180 @x32 |

Page height 16732 at 1440. Section heights vary run to run by a few px because of lazy media.

## 1. Section nav (fixed) `enicust*`
- `position:fixed; top:0; left:0; right:0; height:56px; background:#0029A6; box-shadow:0 8px 24px rgba(0,0,0,.16); z-index:5; opacity:0; transform:translateY(-100%); transition: transform 300ms, opacity 300ms; pointer-events:none`. It's shown (opacity 1, translateY 0, pointer-events auto) while visible, and hidden at ≤799.
- Inner SliceContainer: flex, centred, gap 48. Each button has a 32px-tall 3D icon (`launch-2026-icon-{bolt,channels,star,queen}.png`) and a label (20/28 w500). The active item is white, the others dimmed (see CSS).
- **Logic** (rAF-throttled `scroll`/`resize`):
  - `visible = #launch-shipped.bottom ≤ 0 && #launch-protected.bottom > 0`.
  - Active = the last of `[launch-agents, launch-channels, launch-ecosystem, launch-enterprise]` whose top ≤ 120px.
  - Click: `scrollTo({top: el.top + scrollY - 160, behavior:"smooth"})`.

```css
/* enicust0 = nav 1440x56 */
.enicust0 { background-color: rgb(0, 41, 166); box-shadow: rgba(0, 0, 0, 0.16) 0px 8px 24px; height: 56px; left: 0px; opacity: 0; pointer-events: none; position: fixed; right: 0px; top: 0px; transform: translateY(-100%); transition: transform 300ms, opacity 300ms; z-index: 5 }
@media (max-width: 799px) { .enicust0 { display: none } }
/* enicust1 = section 1440x56 */
.enicust1 { margin: 0px auto; max-width: 1512px; padding: 0px 124px; position: relative; text-align: left; width: 100%; align-items: center; display: flex; gap: 48px; height: 100%; justify-content: center }
@media (max-width: 1280px) { .enicust1 { padding: 0px 64px } }
@media (max-width: 799px) { .enicust1 { padding: 0px 32px } }
/* enicust2 = button «AI Agents in GA» 178x32 */
.enicust2 { align-items: center; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: flex; gap: 8px; opacity: 1; padding: 0px; transition: opacity 200ms }
.enicust2:hover { opacity: 1 }
/* enicust3 = img 23x32 */
.enicust3 { display: block; flex-shrink: 0; height: 32px; object-fit: contain; width: auto }
/* enicust4 = span «AI Agents in GA» 146x28 */
.enicust4 { font-family: $sans; font-size: 20px; line-height: 28px; letter-spacing: -0.25px; color: rgb(255, 255, 255); font-weight: 600; white-space: nowrap }
@media (max-width: 1280px) { .enicust4 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .enicust4 { font-size: 16px; line-height: 24px } }
/* enicust2--v2 = button «Channels 2.0» 173x32 */
.enicust2--v2 { align-items: center; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: flex; gap: 8px; opacity: 0.6; padding: 0px; transition: opacity 200ms }
.enicust2--v2:hover { opacity: 1 }
```

## 2. Hero `e4sdv0e*`
- Root `margin-top:-88px` (under the site nav). Its height is 1800 at 1440: a 900px content section plus a sticky video layer.
- **Content** `.e4sdv0e1` (SliceContainer, 900 tall, flex column, space-between, padding-bottom 64, z 1):
  - eyebrow row (margin `160px 0 -62px`): a 20x24 Dovetail mark + "Dovetail Launch ’26" (H24-ish, white);
  - the title row `.e4sdv0e6` (`aria-hidden`; a visually-hidden h1 carries the text): "Sun’s" + the sun image + "Out". The words are Inter 600, **`font-size: clamp(72px, calc((100vw - 248px) * .191), 240px)`** (227.7px at 1440), `letter-spacing:-.02em; line-height:.8; white-space:nowrap`. md: `clamp(72px, 17vw, 240px)`; sm: `clamp(96px, 33vw, 130px)`, lh .88, centred, stacked.
  - The sun `.e4sdv0e8` (`launch-2026-sun.png`, size `clamp(96px, calc((100vw - 248px) * .316), 400px)` = 377px at 1440; negative side margins `clamp(-64px, -4.5vw, -24px)`; z 2; `transition: transform .5s ease-out`) is **magnetic**. While the hero is intersecting, each pointermove (rAF) computes the distance d from the sun's centre. If `d < 190px`: `translate(clamp(±12, .12*dx*(1 - d/190)), clamp(±12, .12*dy*(1 - d/190)))`, else no transform.
  - Behind the title, an SVG of 53.33px **blue pixel squares** (`#0029A6`; viewBox 800x480, height 480, `left:58%`; hidden 800–1280, smaller at ≤799). Squares in the top row, or more than .46 of the max radius from the centre with 28% (seeded) probability, **blink**: `animation: irxrfh steps(1) infinite` with keyframes `0–45% opacity 1, 46–95% 0, 96–100% 1`, duration .6–1.6s and a random negative delay. The others are static.
  - Bottom grid, columns 1/7: intro P20-ish (placeholder) and CTAs "Talk to our team" (primary white → `/contact-sales/`) and "Try Dovetail free" (secondary → `/auth/signup/`).
- **Sticky video** `.e4sdv0e13`: `position:sticky; top:0; height:100vh; margin-top:-900px; display:flex; align-items:flex-end; padding-bottom:64px; z 2`. Inside, a SliceContainer > card `.e4sdv0e15` (16:9, bg `#081331`, `transform-origin: right bottom`). It holds a muted looping video `suns-out-hero-loop.mp4` (poster `suns-out-hero-poster.jpg`) and a 64px white play tile.
  - **Scroll scale (≥768):** `start = 400 / contentWidth` (0.32 at 1440), `p = clamp(scrollY / innerHeight)`, `scale = start + p*(1 - start)`. The card is `translate3d(0,0,0) scale(scale)`, and the play tile counter-scales `1/scale` at >1280. So the small card at the bottom-right grows to full container width over the first viewport of scroll. At ≤1280 the transform is `none !important`.
  - Click: at ≥768 it smooth-scrolls to `innerHeight`, then plays the YouTube video `f0adQ-1hnNc` in place.

```css
/* e4sdv0e0 = div 1440x1800 */
.e4sdv0e0 { height: 200vh; margin-top: -88px; position: relative }
@media (max-width: 1280px) { .e4sdv0e0 { height: auto; margin-top: 0px } }
@media (max-width: 799px) { .e4sdv0e0 { overflow-x: clip } }
/* e4sdv0e1 = section 1440x900 */
.e4sdv0e1 { margin: 0px auto; max-width: 1512px; padding: 0px 124px 64px; text-align: left; width: 100%; display: flex; flex-direction: column; height: 100vh; justify-content: space-between; position: relative; z-index: 1 }
@media (max-width: 1280px) { .e4sdv0e1 { padding: 0px 64px } .e4sdv0e1 { display: block; height: auto; padding-bottom: 0px } }
@media (max-width: 799px) { .e4sdv0e1 { padding: 0px 32px } }
/* e4sdv0e2 = div 1192x594 */
.e4sdv0e2 { flex-shrink: 0 }
/* e4sdv0e3 = div 1192x32 */
.e4sdv0e3 { align-items: center; display: flex; gap: 8px; margin-bottom: -62px; margin-top: 160px }
@media (max-width: 1280px) { .e4sdv0e3 { margin-bottom: 16px; margin-top: 64px } }
@media (max-width: 799px) { .e4sdv0e3 { justify-content: center; margin-bottom: 20px; margin-top: 32px } }
/* e4sdv0e4 = svg 20x24 */
.e4sdv0e4 { height: 24px; width: 20.776px }
@media (max-width: 799px) { .e4sdv0e4 { display: none } }
/* e4sdv0e5 = p «Dovetail Launch ’26» 217x32 */
.e4sdv0e5 { font-family: $sans; font-size: 24px; line-height: 32px; font-weight: 500; letter-spacing: -0.5px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e4sdv0e5 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e4sdv0e5 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } .e4sdv0e5 { font-size: 20px; letter-spacing: -0.25px; line-height: 28px } }
/* e4sdv0e6 = div 1192x376 */
.e4sdv0e6 { align-items: center; display: flex; justify-content: flex-start; margin-bottom: 88px; position: relative }
@media (max-width: 1280px) { .e4sdv0e6 { margin-bottom: 32px } }
@media (max-width: 799px) { .e4sdv0e6 { align-items: center; flex-direction: column; justify-content: center; margin-bottom: 32px } }
/* e4sdv0e9 = svg 800x480 */
.e4sdv0e9 { height: 480px; left: 58%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: auto; z-index: 0 }
.e4sdv0e9 rect { fill: rgb(0, 41, 166); animation: 3s steps(1) 0s infinite normal none running animation-irxrfh }
@media (prefers-reduced-motion: reduce) { .e4sdv0e9 rect { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 1280px) { .e4sdv0e9 { display: none } }
@media (max-width: 799px) { .e4sdv0e9 { display: block; height: 320px; left: 50%; top: 50%; transform: translate(-50%, -50%); width: auto } }
/* e4sdv0e7 = p «Sun’s» 574x182 */
.e4sdv0e7 { font-family: $sans; font-weight: 600; font-size: clamp(72px, -47.368px + 19.1vw, 240px); letter-spacing: -0.02em; line-height: 0.8; margin: 0px; pointer-events: none; position: relative; white-space: nowrap; z-index: 1 }
@media (max-width: 1280px) { .e4sdv0e7 { font-size: clamp(72px, 17vw, 240px) } }
@media (max-width: 799px) { .e4sdv0e7 { font-size: clamp(96px, 33vw, 130px); letter-spacing: -0.02em; line-height: 0.88; text-align: center; width: 100% } }
/* e4sdv0e8 = div 376x376 */
.e4sdv0e8 { flex-shrink: 0; height: clamp(96px, -78.368px + 31.6vw, 400px); margin: 0px clamp(-64px, -4.5vw, -24px); pointer-events: none; position: relative; transition: transform 0.5s ease-out; width: clamp(96px, -78.368px + 31.6vw, 400px); will-change: transform; z-index: 2 }
.e4sdv0e8 img { display: block; height: 100%; object-fit: contain; width: 100% }
@media (max-width: 1280px) { .e4sdv0e8 { height: clamp(96px, 28vw, 400px); width: clamp(96px, 28vw, 400px) } }
@media (max-width: 799px) { .e4sdv0e8 { height: clamp(200px, 60vw, 240px); margin: -48px 0px; width: clamp(200px, 60vw, 240px) } }
/* e4sdv0e10 = div 580x225 */
.e4sdv0e10 { min-height: 225px }
@media (max-width: 1280px) { .e4sdv0e10 { min-height: 0px } }
/* e4sdv0e11 = p «Meet digital twins and AI Agents, Channe» 580x128 */
.e4sdv0e11 { font-family: $sans; font-size: 24px; font-weight: 400; line-height: 32px; letter-spacing: -0.5px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e4sdv0e11 { font-size: 16px; letter-spacing: normal; line-height: 24px } }
@media (max-width: 799px) { .e4sdv0e11 { font-size: 16px; letter-spacing: normal; line-height: 24px } }
/* e4sdv0e12 = div 580x40 */
.e4sdv0e12 { align-items: center; display: flex; gap: 8px; margin-top: 32px }
/* e4sdv0e13 = div 1440x900 */
.e4sdv0e13 { align-items: flex-end; display: flex; height: 100vh; margin-top: -100vh; padding-bottom: 64px; pointer-events: none; position: sticky; top: 0px; z-index: 2 }
@media (max-width: 1280px) { .e4sdv0e13 { height: auto; margin-top: 48px; padding: 0px; position: static } }
/* e4sdv0e14 = section 1440x670 */
.e4sdv0e14 { margin: 0px auto; max-width: 1512px; padding: 0px 124px; position: relative; text-align: left; pointer-events: none; width: 100% }
@media (max-width: 1280px) { .e4sdv0e14 { padding: 0px 64px } }
@media (max-width: 799px) { .e4sdv0e14 { padding: 0px 32px } }
/* e4sdv0e15 = div 381x214 */
.e4sdv0e15 { aspect-ratio: 16 / 9; backface-visibility: hidden; background: rgb(8, 19, 49); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; display: block; overflow: hidden; padding: 0px; pointer-events: auto; position: relative; transform: translate3d(0px, 0px, 0px) scale(0.32); transform-origin: right bottom; width: 100%; will-change: transform }
@media (max-width: 1280px) { .e4sdv0e15 { transform: none !important } }
/* e4sdv0e17 = button 381x214 */
.e4sdv0e17 { appearance: none; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: block; height: 100%; inset: 0px; padding: 0px; position: absolute; width: 100% }
/* e4sdv0e16 = video 381x214 */
.e4sdv0e16 { height: 100%; left: 0px; object-fit: cover; position: absolute; top: 0px; width: 100% }
/* e4sdv0e19 = span 20x20 */
.e4sdv0e19 { align-items: center; background: rgb(255, 255, 255); border-radius: 8px; display: flex; filter: drop-shadow(rgba(0, 0, 0, 0.64) 0px 24px 64px); height: 64px; justify-content: center; left: 50%; padding: 8px; pointer-events: none; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 64px; z-index: 1 }
.e4sdv0e19 svg { color: rgb(10, 10, 10); height: 40px; width: 40px }
@keyframes animation-irxrfh { 0%, 45% { opacity: 1; } 46%, 95% { opacity: 0; } 96%, 100% { opacity: 1; } }
```

## 3. Shipped + pixel-glyph decorations (`e1ot4t9i*`, `e1keqfn6*`)
- "A lot shipped" is Inter 600 **200px/170px** (950x340, 2 lines; sm 56/48) with a 3D key-cap image ("SHIP IT!" + flames, `launch-2026-shipped-sticker.png`) beside it.
- Behind the heading is a **pixel-glyph SVG decoration** `.e1keqfn60` (absolute, centred at `top:30%`, height 420; hidden ≤799). Its rects blink with the same `irxrfh` keyframes: JS picks squares farther than 50% of the max radius from the centroid, with 50% chance, and gives them durations .6–1.6s and random negative delays. Every big section heading on the page reuses this decoration (5 more variants: 427x427, 480x374, 400x400; `svg/*-e1keqfn60-*.svg`).
- "Here’s what’s new" (H56). Below it, a wrap of **20 chips** (gap 8, max-width 1000). Each chip is a link to an anchor: 44 tall, pad, radius, bg `#0029A6`, 20/28 w500 white, with an optional 40px-tall 3D icon at the left. A non-link chip variant `.e1ot4t9i8` exists for some items. The chips are listed in the data file.

```css
/* e1erknzq0 = div 1440x780 */
.e1erknzq0 { scroll-margin-top: 160px }
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* e1keqfn60 = div 472x420 */
.e1keqfn60 { height: 420px; left: 50%; position: absolute; top: 30%; transform: translate(-50%, -50%); width: auto; z-index: 0 }
.e1keqfn60 svg { display: block; height: 100%; width: auto }
.e1keqfn60 svg rect { animation: 3s steps(1) 0s infinite normal none running animation-irxrfh }
@media (prefers-reduced-motion: reduce) { .e1keqfn60 svg rect { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 799px) { .e1keqfn60 { display: none } }
/* e1ot4t9i4 = div 255x353 */
.e1ot4t9i4 { position: absolute; left: 458px; top: -104px; width: 255px; z-index: 3 }
.e1ot4t9i4 img { display: block; width: 100% }
@media (max-width: 799px) { .e1ot4t9i4 { display: none } }
/* e1ot4t9i3 = p «A lot shipped» 950x340 */
.e1ot4t9i3 { font-family: $sans; font-weight: 600; font-size: 200px; letter-spacing: -4px; line-height: 170px; margin: 0px; max-width: 950px; position: relative; z-index: 1 }
@media (max-width: 799px) { .e1ot4t9i3 { font-size: 56px; letter-spacing: -1px; line-height: 48px } }
/* e1ot4t9i5 = p «Here’s what’s new» 1192x60 */
.e1ot4t9i5 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin-top: 96px }
@media (max-width: 1280px) { .e1ot4t9i5 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1ot4t9i5 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } .e1ot4t9i5 { margin-top: 32px } }
/* e1ot4t9i6 = div 1000x252 */
.e1ot4t9i6 { align-items: center; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; max-width: 1000px }
/* e1ot4t9i9 = img 29x40 */
.e1ot4t9i9 { display: block; height: 40px; object-fit: contain; width: auto }
/* e1ot4t9i7 = a «AI Agents in GA» 177x44 */
.e1ot4t9i7 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; align-items: center; color: rgb(255, 255, 255); display: flex; isolation: isolate; justify-content: center; padding: 8px 16px; position: relative; white-space: nowrap; cursor: pointer; text-decoration: none }
.e1ot4t9i7::before { background: rgb(4, 47, 167); content: ""; inset: 0px; position: absolute; transition: opacity 150ms; z-index: -1 }
.e1ot4t9i7:hover::before, .e1ot4t9i7:focus-visible::before { opacity: 0.6 }
@media (max-width: 1280px) { .e1ot4t9i7 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1ot4t9i7 { font-size: 16px; line-height: 24px } }
/* e1ot4t9i8 = span «Version history» 172x44 */
.e1ot4t9i8 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; align-items: center; color: rgb(255, 255, 255); display: flex; isolation: isolate; justify-content: center; padding: 8px 16px; position: relative; white-space: nowrap }
.e1ot4t9i8::before { background: rgb(4, 47, 167); content: ""; inset: 0px; position: absolute; transition: opacity 150ms; z-index: -1 }
@media (max-width: 1280px) { .e1ot4t9i8 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1ot4t9i8 { font-size: 16px; line-height: 24px } }
/* e1keqfn60--v2 = div 427x427 */
.e1keqfn60--v2 { height: 427px; left: 0px; position: absolute; top: -135px; width: auto; z-index: 0 }
.e1keqfn60--v2 svg { display: block; height: 100%; width: auto }
.e1keqfn60--v2 svg rect { animation: 3s steps(1) 0s infinite normal none running animation-irxrfh }
@media (prefers-reduced-motion: reduce) { .e1keqfn60--v2 svg rect { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 799px) { .e1keqfn60--v2 { display: none } }
/* e1keqfn60--v3 = div 427x427 */
.e1keqfn60--v3 { height: 427px; left: 0px; position: absolute; top: -30%; width: auto; z-index: 0 }
.e1keqfn60--v3 svg { display: block; height: 100%; width: auto }
.e1keqfn60--v3 svg rect { animation: 3s steps(1) 0s infinite normal none running animation-irxrfh }
@media (prefers-reduced-motion: reduce) { .e1keqfn60--v3 svg rect { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 799px) { .e1keqfn60--v3 { display: none } }
/* e1keqfn60--v4 = div 480x374 */
.e1keqfn60--v4 { height: 374px; position: absolute; right: 0px; top: -118px; width: auto; z-index: 0 }
.e1keqfn60--v4 svg { display: block; height: 100%; width: auto }
.e1keqfn60--v4 svg rect { animation: 3s steps(1) 0s infinite normal none running animation-irxrfh }
@media (prefers-reduced-motion: reduce) { .e1keqfn60--v4 svg rect { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 799px) { .e1keqfn60--v4 { display: none } }
/* e1keqfn60--v5 = div 427x427 */
.e1keqfn60--v5 { height: 427px; left: 0px; position: absolute; top: -112px; width: auto; z-index: 0 }
.e1keqfn60--v5 svg { display: block; height: 100%; width: auto }
.e1keqfn60--v5 svg rect { animation: 3s steps(1) 0s infinite normal none running animation-irxrfh }
@media (prefers-reduced-motion: reduce) { .e1keqfn60--v5 svg rect { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 799px) { .e1keqfn60--v5 { display: none } }
/* e1keqfn60--v6 = div 400x400 */
.e1keqfn60--v6 { height: auto; left: 43%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 400px; z-index: 0 }
.e1keqfn60--v6 svg { display: block; height: 100%; width: auto }
.e1keqfn60--v6 svg rect { animation: 3s steps(1) 0s infinite normal none running animation-irxrfh }
.e1keqfn60--v6 svg { height: auto; width: 100% }
@media (prefers-reduced-motion: reduce) { .e1keqfn60--v6 svg rect { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 1280px) { .e1keqfn60--v6 { width: 260px } }
@media (max-width: 799px) { .e1keqfn60--v6 { display: none } }
@keyframes animation-irxrfh { 0%, 45% { opacity: 1; } 46%, 95% { opacity: 0; } 96%, 100% { opacity: 1; } }
```

## 4–11. Feature sections
Each section shares a layout grammar:
- a **section title row**: big Inter 600 word(s) at ~200px with a 3D icon and the pixel-glyph decoration, plus a subtitle (H40-ish);
- then **feature rows** on InnerGrid: text in one column (H40-ish heading, P16/P18 body, and an "arrow bullet" list where each item is a `→` arrow svg + a `#0029A6` pill label) and an image in the other, alternating.

Specific motion:
- **Digital twins carousel** (`e5zj3j*`): 3 personas (Jess "Enterprise IT buyer", Anahita "Power user", Travis "Churned customer").
  - Left column: name (H32), role, bio (placeholder) and number buttons 01 02 03 (the active one is highlighted).
  - Centre (4/10): a pixel bg (`launch-2026-twin-pixels.svg`), the persona photo (crossfade on `shown`), and floating elements: a video tile (`launch-2026-twin-{jess,ana,trav}.mp4`), 3 tool logos, a card image, and two question bubbles.
  - Right column: "FOR EVERY USE CASE" + 5 use cases + prev/next arrows.
  - **Auto-advance every 10s** (a `setTimeout` reset on each change). Arrows and numbers select. On slide change the floating items pop in with `@keyframes {from{opacity:0; transform:scale(.9) translateY(12px)} to{none}}` **0.7s cubic-bezier(.2,.7,.3,1)**, delayed `--order * 0.16s` (order 1–7).
  - **Parallax:** mousemove over the stage pushes each `[data-float]` element **away from** the cursor: `f = max(0, 1 - dist/340)`, smoothstep `f²(3-2f)`, offset = `12 * depth * smooth / dist` × (dx, dy). It's applied via `--cx/--cy`, which drive `translate3d(var(--cx), var(--cy), 0)` with `transition: transform .5s cubic-bezier(.22,1,.36,1)`. Mouseleave resets. Depths are 1.1–1.35.
- **Multiplayer agent cards** (`ea0q8q8*`): 3 cards (Ronald "Research Agent →", Rita "RevOps Agent →", "Build your own custom agent"). Each opens a left slide-in modal (same mechanics as the product prompt modal: `translateX(calc(-100% - 24px)) → 0`, backdrop fade). It shows the avatar (`launch-2026-agent-{ronald,rita,custom}.png`), role, description and a prompt with copy / open-in-Dovetail buttons (32x32, border `rgba(255,255,255,.08)`, radius 4).
- **Channels logo strip:** an inline logo column rotates with keyframes `0–11% 0; 16–23% -6.25%; … 88–95% -43.75%; 100% -50%` (8 logos, duplicated).
- **Enterprise layer stack** (`erteesl*`, `e1l1dk62*`): a tall wrapper with a sticky inner panel. Left (1/8): 4 stacked PNG layers (`launch-2026-enterprise-layer-{query,apps,data,platform}.png` at `top:0 / 16.4% / 32.7% / 49.1%`, z 4→1). Right (9/13): the titles "Query", "Apps", "Data", "Platform" (inactive dimmed; the active one shows its body with `@keyframes {opacity 0, translateY(4px) → 1, 0}`).
  - **Scroll (≥1281):** `p = clamp(-rect.top / (rect.height - innerHeight))`, `active = min(3, floor(p*4))`. Layers with index < active get `data-peeled=true`, which lifts them away via CSS (see generated CSS). Click on a title selects it. ≤1280: everything is shown and active (no scroll mapping).
- **CTA** (`e1uk7pdk*`): "The best / never guess" in Inter 600 **200px/160px ls -8px** (md 120/110; sm 56/56), with an inline rotating logo square (Notion etc.; `svg/e1uk7pdk4-e1keqfn60-787385.svg` decoration). Below it:
  - left: the keynote thumbnail button (`suns-out-keynote-thumbnail.png`, "Watch the keynote" + play icon) opens a YouTube modal (`8EP6vZF1Et4`);
  - right: P20 copy (placeholder) + "Talk to our team" / "Try Dovetail free".

Generated CSS per section:

Agents intro:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* e1osxjcu3 = div 1076x200 */
.e1osxjcu3 { align-items: center; display: flex; gap: 24px; margin-left: clamp(0px, -1324px + 100vw, 140px); position: relative; z-index: 1 }
@media (max-width: 1280px) { .e1osxjcu3 { margin-left: 0px } }
@media (max-width: 799px) { .e1osxjcu3 { gap: 12px; margin-left: 0px } }
/* e1osxjcu4 = img 147x200 */
.e1osxjcu4 { flex-shrink: 0; height: clamp(160px, 14vw, 200px); width: auto }
@media (max-width: 799px) { .e1osxjcu4 { height: 64px } }
/* e1osxjcu5 = p «AI Agents» 902x170 */
.e1osxjcu5 { font-family: $sans; font-weight: 600; font-size: clamp(120px, 14vw, 200px); letter-spacing: -0.02em; line-height: 0.85; margin: 0px; white-space: nowrap }
@media (max-width: 799px) { .e1osxjcu5 { font-size: clamp(40px, 12vw, 56px); letter-spacing: -0.02em; line-height: 1 } }
/* e1osxjcu6 = div 1192x60 */
.e1osxjcu6 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; margin-top: 24px; position: relative; z-index: 1 }
@media (max-width: 1280px) { .e1osxjcu6 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .e1osxjcu6 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e1osxjcu7 = p «Now available in GA» 580x60 */
.e1osxjcu7 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1osxjcu7 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu7 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1osxjcu8 = div 1192x574 */
.e1osxjcu8 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: center; margin-top: 160px; scroll-margin-top: 160px }
@media (max-width: 1280px) { .e1osxjcu8 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .e1osxjcu8 { margin-top: 96px } }
@media (max-width: 799px) { .e1osxjcu8 { gap: 24px; grid-template-columns: repeat(4, 1fr) } .e1osxjcu8 { margin-top: 64px } }
/* e1osxjcu9 = div 376x520 */
.e1osxjcu9 { display: flex; flex-direction: column }
/* e1osxjcu10 = p «Autonomous. Self-improving.» 376x180 */
.e1osxjcu10 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1osxjcu10 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu10 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1osxjcu11 = p «Agents solve complex tasks alongside you» 376x140 */
.e1osxjcu11 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 24px }
@media (max-width: 1280px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
/* e1osxjcu12 = div 376x136 */
.e1osxjcu12 { display: flex; flex-direction: column; gap: 8px; margin-top: 40px }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1osxjcu14 = svg 29x24 */
.e1osxjcu14 { color: rgb(255, 255, 255); flex-shrink: 0; height: 24px; width: auto }
/* e1osxjcu15 = div «Choose your trigger» 184x40 */
.e1osxjcu15 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; background: rgb(4, 47, 167); color: rgb(255, 255, 255); display: inline-flex; padding: 8px 16px; white-space: nowrap }
@media (max-width: 1280px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } .e1osxjcu15 { white-space: normal } }
/* e1osxjcu16 = img 682x574 */
.e1osxjcu16 { display: block; height: auto; width: 100% }
@media (max-width: 1280px) { .e1osxjcu16 { max-width: 724px } }
@media (max-width: 799px) { .e1osxjcu16 { margin-top: 48px } }
```

Digital twins:
```css
/* e5zj3j0 = div 1440x664 */
.e5zj3j0 { isolation: isolate; position: relative }
/* e1osxjcu10 = p «Autonomous. Self-improving.» 376x180 */
.e1osxjcu10 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1osxjcu10 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu10 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e5zj3j2 = p «Build a persona from real calls, tickets» 478x112 */
.e5zj3j2 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255) }
.e5zj3j2 em { font-style: italic }
@media (max-width: 1280px) { .e5zj3j2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e5zj3j2 { font-size: 16px; line-height: 24px } }
/* e5zj3j3 = div 1192x448 */
.e5zj3j3 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: stretch; margin-top: 96px }
@media (max-width: 1280px) { .e5zj3j3 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .e5zj3j3 { margin-top: 64px } }
@media (max-width: 799px) { .e5zj3j3 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e5zj3j4 = div 274x448 */
.e5zj3j4 { display: flex; flex-direction: column; height: 100%; justify-content: center; position: relative }
@media (max-width: 1280px) { .e5zj3j4 { display: block; height: auto } }
/* e5zj3j6 = p «Jess» 274x48 */
.e5zj3j6 { font-family: $sans; font-size: 40px; font-weight: 500; letter-spacing: -1px; line-height: 48px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e5zj3j6 { font-size: 32px; line-height: 40px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e5zj3j6 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e5zj3j7 = p «Enterprise IT buyer» 274x28 */
.e5zj3j7 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 8px }
@media (max-width: 1280px) { .e5zj3j7 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e5zj3j7 { font-size: 16px; line-height: 24px } }
/* e5zj3j8 = p «Hi, I’m a digital twin built from your p» 274x144 */
.e5zj3j8 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(255, 255, 255); margin-top: 24px }
@media (max-width: 1280px) { .e5zj3j8 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e5zj3j8 { font-size: 16px; line-height: 24px } }
/* e5zj3j9 = div 132x35 */
.e5zj3j9 { bottom: 0px; display: flex; gap: 8px; left: 0px; position: absolute }
@media (max-width: 1280px) { .e5zj3j9 { margin-top: 40px; position: static } }
/* e5zj3j10 = button «01» 38x35 */
.e5zj3j10 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; background: rgb(4, 47, 167); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: rgb(255, 255, 255); cursor: pointer; opacity: 1; padding: 8px 10px; text-align: center; transition: opacity 150ms }
.e5zj3j10:hover { opacity: 1 }
@media (max-width: 1280px) { .e5zj3j10 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e5zj3j10 { font-size: 14px; line-height: 140% } }
/* e5zj3j10--v2 = button «02» 38x35 */
.e5zj3j10--v2 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; background: rgb(4, 47, 167); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: rgb(255, 255, 255); cursor: pointer; opacity: 0.5; padding: 8px 10px; text-align: center; transition: opacity 150ms }
.e5zj3j10--v2:hover { opacity: 0.75 }
@media (max-width: 1280px) { .e5zj3j10--v2 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e5zj3j10--v2 { font-size: 14px; line-height: 140% } }
/* e5zj3j13 = div 560x448 */
.e5zj3j13 { aspect-ratio: 533 / 427; margin: 0px auto; max-width: 560px; position: relative; width: 100% }
@media (max-width: 799px) { .e5zj3j13 { margin-top: 48px } }
/* e5zj3j14 = img 560x448 */
.e5zj3j14 { height: 100%; left: 0px; object-fit: contain; position: absolute; top: 0px; width: 100%; z-index: 0 }
/* e5zj3j16 = div 420x420 */
.e5zj3j16 { aspect-ratio: 1 / 1; left: 13.5%; position: absolute; top: 6.3%; width: 75%; z-index: 1 }
/* e5zj3j17 = img 420x420 */
.e5zj3j17 { height: 100%; inset: 0px; object-fit: cover; object-position: center center; opacity: 1; position: absolute; transition: opacity 0.6s; width: 100% }
/* e5zj3j17--v2 = img 420x420 */
.e5zj3j17--v2 { height: 100%; inset: 0px; object-fit: cover; object-position: center center; opacity: 0; position: absolute; transition: opacity 0.6s; width: 100% }
/* e5zj3j15 = div 560x448 */
.e5zj3j15 { inset: 0px; position: absolute }
/* e5zj3j18 = div 161x100 */
.e5zj3j18 { position: absolute; transform: translate3d(var(--cx, 0px), var(--cy, 0px), 0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; left: 3.9%; top: 10.8%; width: 28.8%; z-index: 4 }
/* e5zj3j19 = div 161x100 */
.e5zj3j19 { animation: animation-1daj87e 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) calc(var(--order, 0) * 0.16s) both; will-change: transform; aspect-ratio: 8 / 5; border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.22) 0px 20px 40px; overflow: hidden; width: 100% }
@media (prefers-reduced-motion: reduce) { .e5zj3j19 { animation: auto ease 0s 1 normal none running none } }
/* e5zj3j20 = video 233x146 */
.e5zj3j20 { height: 100%; object-fit: cover; transform: scale(1.45); transform-origin: center 32%; width: 100% }
/* e5zj3j21 = div 67x67 */
.e5zj3j21 { position: absolute; transform: translate3d(var(--cx, 0px), var(--cy, 0px), 0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; left: 3.9%; top: 41%; width: 12%; z-index: 3 }
/* e5zj3j22 = img 67x67 */
.e5zj3j22 { animation: animation-1daj87e 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) calc(var(--order, 0) * 0.16s) both; will-change: transform; display: block; width: 100% }
@media (prefers-reduced-motion: reduce) { .e5zj3j22 { animation: auto ease 0s 1 normal none running none } }
/* e5zj3j21--v2 = div 67x67 */
.e5zj3j21--v2 { position: absolute; transform: translate3d(var(--cx, 0px), var(--cy, 0px), 0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; left: 14.1%; top: 52.5%; width: 12%; z-index: 3 }
/* e5zj3j21--v3 = div 67x67 */
.e5zj3j21--v3 { position: absolute; transform: translate3d(var(--cx, 0px), var(--cy, 0px), 0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; left: 74.9%; top: 17.1%; width: 12%; z-index: 3 }
/* e5zj3j23 = div 110x147 */
.e5zj3j23 { position: absolute; transform: translate3d(var(--cx, 0px), var(--cy, 0px), 0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; left: 76%; top: 40.7%; width: 19.7%; z-index: 3 }
/* e5zj3j24 = img 110x147 */
.e5zj3j24 { animation: animation-1daj87e 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) calc(var(--order, 0) * 0.16s) both; will-change: transform; border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.2) 0px 24px 44px; display: block; width: 100% }
@media (prefers-reduced-motion: reduce) { .e5zj3j24 { animation: auto ease 0s 1 normal none running none } }
/* e5zj3j25 = div 285x44 */
.e5zj3j25 { position: absolute; transform: translate3d(var(--cx, 0px), var(--cy, 0px), 0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; left: 40%; top: 0px; z-index: 5 }
/* e5zj3j26 = div «What’s blocking this deal from closing?» 285x44 */
.e5zj3j26 { animation: animation-1daj87e 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) calc(var(--order, 0) * 0.16s) both; will-change: transform; background: rgb(255, 255, 255); border-radius: 8px; color: rgb(10, 10, 10); font-family: $sans; font-size: 14px; font-weight: 500; line-height: 20px; padding: 12px; white-space: nowrap }
@media (prefers-reduced-motion: reduce) { .e5zj3j26 { animation: auto ease 0s 1 normal none running none } }
@media (max-width: 799px) { .e5zj3j26 { max-width: 160px; white-space: normal } }
/* e5zj3j27 = div 215x90 */
.e5zj3j27 { position: absolute; transform: translate3d(var(--cx, 0px), var(--cy, 0px), 0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; left: 5.6%; top: 73.8%; z-index: 5 }
/* e5zj3j28 = div «What does your security team need to see» 215x90 */
.e5zj3j28 { animation: animation-1daj87e 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) calc(var(--order, 0) * 0.16s) both; will-change: transform; background: rgb(255, 255, 255); border-radius: 8px; color: rgb(10, 10, 10); font-family: $sans; font-size: 14px; font-weight: 500; line-height: 22px; padding: 12px; box-shadow: rgba(0, 0, 0, 0.16) 0px 20px 40px; max-width: 215px }
@media (prefers-reduced-motion: reduce) { .e5zj3j28 { animation: auto ease 0s 1 normal none running none } }
/* e5zj3j29 = div 274x203 */
.e5zj3j29 { display: flex; flex-direction: column; text-align: right }
@media (max-width: 1280px) { .e5zj3j29 { margin-top: 48px; text-align: left } }
/* e5zj3j30 = p «for every use case» 274x19 */
.e5zj3j30 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(255, 255, 255); margin-bottom: 24px }
@media (max-width: 1280px) { .e5zj3j30 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e5zj3j30 { font-size: 14px; line-height: 140% } }
/* e5zj3j31 = p «Validate design work» 274x32 */
.e5zj3j31 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; color: rgb(255, 255, 255); padding: 4px 0px }
@media (max-width: 1280px) { .e5zj3j31 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e5zj3j31 { font-size: 16px; line-height: 24px } }
/* e5zj3j11 = div 104x42 */
.e5zj3j11 { align-items: center; bottom: 0px; display: flex; gap: 8px; position: absolute; right: 0px }
@media (max-width: 1280px) { .e5zj3j11 { margin-top: 24px; position: static } }
/* e5zj3j12 = button 48x42 */
.e5zj3j12 { align-items: center; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: rgba(255, 255, 255, 0.32); cursor: pointer; display: flex; padding: 8px }
.e5zj3j12 svg { display: block; height: auto; transform: scaleX(-1); width: 32px }
.e5zj3j12:hover { opacity: 0.75 }
/* e5zj3j12--v2 = button 48x42 */
.e5zj3j12--v2 { align-items: center; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: rgb(255, 255, 255); cursor: pointer; display: flex; padding: 8px }
.e5zj3j12--v2 svg { display: block; height: auto; transform: none; width: 32px }
.e5zj3j12--v2:hover { opacity: 0.75 }
@keyframes animation-1daj87e { 0% { opacity: 0; transform: scale(0.9) translateY(12px); } 100% { opacity: 1; transform: none; } }
```

Multiplayer:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* ea0q8q81 = div 1192x602 */
.ea0q8q81 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: center }
@media (max-width: 1280px) { .ea0q8q81 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .ea0q8q81 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e1osxjcu10 = p «Autonomous. Self-improving.» 376x180 */
.e1osxjcu10 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1osxjcu10 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu10 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1osxjcu11 = p «Agents solve complex tasks alongside you» 376x140 */
.e1osxjcu11 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 24px }
@media (max-width: 1280px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
/* e1osxjcu12 = div 376x136 */
.e1osxjcu12 { display: flex; flex-direction: column; gap: 8px; margin-top: 40px }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1osxjcu14 = svg 29x24 */
.e1osxjcu14 { color: rgb(255, 255, 255); flex-shrink: 0; height: 24px; width: auto }
/* ea0q8q87 = div «Access controls» 154x40 */
.ea0q8q87 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; background: rgb(4, 47, 167); color: rgb(255, 255, 255); display: inline-flex; padding: 8px 16px; white-space: nowrap }
@media (max-width: 1280px) { .ea0q8q87 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .ea0q8q87 { font-size: 16px; line-height: 24px } }
/* ea0q8q88 = img 580x602 */
.ea0q8q88 { display: block; height: auto; width: 100% }
@media (max-width: 1280px) { .ea0q8q88 { max-width: 616px } }
@media (max-width: 799px) { .ea0q8q88 { margin-top: 48px } }
/* ea0q8q89 = p «The agents deployed at Dovetail:» 1192x19 */
.ea0q8q89 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(255, 255, 255); margin-bottom: 32px; margin-top: 64px }
@media (max-width: 1280px) { .ea0q8q89 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .ea0q8q89 { font-size: 14px; line-height: 140% } }
/* ea0q8q811 = button «Ronald Research Agent →» 376x128 */
.ea0q8q811 { align-items: center; appearance: none; background: rgb(2, 56, 206); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: inherit; cursor: pointer; display: flex; font: inherit; gap: 32px; height: 100%; padding: 32px; text-align: left; text-decoration: none; transition: background 150ms, border-radius 150ms; width: 100% }
.ea0q8q811:hover { background: rgb(0, 41, 166); border-radius: 16px }
.ea0q8q811:hover .ea0q8q810 { transform: translateX(4px) }
@media (max-width: 1280px) { .ea0q8q811 { gap: 20px; padding: 24px } }
/* ea0q8q812 = img 64x64 */
.ea0q8q812 { border-radius: 50%; display: block; flex-shrink: 0; height: 64px; width: 64px }
@media (max-width: 1280px) { .ea0q8q812 { height: 56px; width: 56px } }
/* ea0q8q813 = div 171x60 */
.ea0q8q813 { display: flex; flex-direction: column; min-width: 0px }
/* ea0q8q814 = p «Ronald» 171x32 */
.ea0q8q814 { font-family: $sans; font-size: 24px; line-height: 32px; color: rgb(255, 255, 255); font-weight: 700; letter-spacing: -0.25px; margin: 0px }
@media (max-width: 1280px) { .ea0q8q814 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .ea0q8q814 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } }
/* ea0q8q815 = p «Research Agent» 171x28 */
.ea0q8q815 { font-family: $sans; font-size: 20px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255); line-height: 28px; margin: 0px }
@media (max-width: 1280px) { .ea0q8q815 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .ea0q8q815 { font-size: 16px; line-height: 24px } }
/* ea0q8q810 = span «→» 17x28 */
.ea0q8q810 { display: inline-block; transition: transform 150ms }
/* ea0q8q811--v2 = a «Build your own custom agent →» 376x128 */
.ea0q8q811--v2 { align-items: center; appearance: none; background: rgb(0, 41, 166); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: inherit; cursor: pointer; display: flex; font: inherit; gap: 32px; height: 100%; padding: 32px; text-align: left; text-decoration: none; transition: background 150ms, border-radius 150ms; width: 100% }
.ea0q8q811--v2:hover { background: rgb(0, 26, 117); border-radius: 16px }
.ea0q8q811--v2:hover .ea0q8q810 { transform: translateX(4px) }
@media (max-width: 1280px) { .ea0q8q811--v2 { gap: 20px; padding: 24px } }
```

Channels intro:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* eeuo5qc3 = div 1122x200 */
.eeuo5qc3 { align-items: center; display: flex; gap: 24px; margin-left: -32px; position: relative; z-index: 1 }
@media (max-width: 799px) { .eeuo5qc3 { gap: 12px; margin-left: 0px } }
/* eeuo5qc4 = img 230x200 */
.eeuo5qc4 { flex-shrink: 0; height: clamp(140px, 14vw, 200px); width: auto }
@media (max-width: 799px) { .eeuo5qc4 { height: 64px } }
/* eeuo5qc5 = p «Channels» 954x170 */
.eeuo5qc5 { font-family: $sans; font-weight: 600; font-size: clamp(120px, 14vw, 200px); letter-spacing: -0.02em; line-height: 0.85; margin: 0px }
@media (max-width: 799px) { .eeuo5qc5 { font-size: clamp(40px, 12vw, 56px); letter-spacing: -0.02em; line-height: 1 } }
/* eeuo5qc6 = sup «2.0» 76x68 */
.eeuo5qc6 { font-size: 0.28em; font-weight: 600; left: 0.05em; line-height: 1; position: relative; top: -1.85em; vertical-align: baseline }
/* e1osxjcu6 = div 1192x60 */
.e1osxjcu6 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; margin-top: 24px; position: relative; z-index: 1 }
@media (max-width: 1280px) { .e1osxjcu6 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .e1osxjcu6 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e1osxjcu7 = p «Now available in GA» 580x60 */
.e1osxjcu7 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1osxjcu7 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu7 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* eeuo5qc9 = div 1192x487 */
.eeuo5qc9 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: center; margin-top: 160px; scroll-margin-top: 160px }
@media (max-width: 1280px) { .eeuo5qc9 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .eeuo5qc9 { margin-top: 96px } }
@media (max-width: 799px) { .eeuo5qc9 { gap: 24px; grid-template-columns: repeat(4, 1fr) } .eeuo5qc9 { margin-top: 48px } }
/* e1osxjcu10 = p «Autonomous. Self-improving.» 376x180 */
.e1osxjcu10 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1osxjcu10 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu10 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1osxjcu11 = p «Agents solve complex tasks alongside you» 376x140 */
.e1osxjcu11 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 24px }
@media (max-width: 1280px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
/* e1osxjcu12 = div 376x136 */
.e1osxjcu12 { display: flex; flex-direction: column; gap: 8px; margin-top: 40px }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1osxjcu14 = svg 29x24 */
.e1osxjcu14 { color: rgb(255, 255, 255); flex-shrink: 0; height: 24px; width: auto }
/* e1osxjcu15 = div «Choose your trigger» 184x40 */
.e1osxjcu15 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; background: rgb(4, 47, 167); color: rgb(255, 255, 255); display: inline-flex; padding: 8px 16px; white-space: nowrap }
@media (max-width: 1280px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } .e1osxjcu15 { white-space: normal } }
/* ea0q8q88 = img 580x602 */
.ea0q8q88 { display: block; height: auto; width: 100% }
@media (max-width: 1280px) { .ea0q8q88 { max-width: 616px } }
@media (max-width: 799px) { .ea0q8q88 { margin-top: 48px } }
```

Channels features:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* ea0q8q81 = div 1192x602 */
.ea0q8q81 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: center }
@media (max-width: 1280px) { .ea0q8q81 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .ea0q8q81 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e2brdi72 = img 580x487 */
.e2brdi72 { display: block; height: auto; width: 100% }
@media (max-width: 1280px) { .e2brdi72 { max-width: 616px } }
/* e2brdi73 = p «Spot trends problems arise» 478x120 */
.e2brdi73 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255) }
.e2brdi73 em { font-style: italic }
@media (max-width: 1280px) { .e2brdi73 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e2brdi73 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1osxjcu11 = p «Agents solve complex tasks alongside you» 376x140 */
.e1osxjcu11 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 24px }
@media (max-width: 1280px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
/* e1osxjcu12 = div 376x136 */
.e1osxjcu12 { display: flex; flex-direction: column; gap: 8px; margin-top: 40px }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1osxjcu14 = svg 29x24 */
.e1osxjcu14 { color: rgb(255, 255, 255); flex-shrink: 0; height: 24px; width: auto }
/* e1osxjcu15 = div «Choose your trigger» 184x40 */
.e1osxjcu15 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; background: rgb(4, 47, 167); color: rgb(255, 255, 255); display: inline-flex; padding: 8px 16px; white-space: nowrap }
@media (max-width: 1280px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } .e1osxjcu15 { white-space: normal } }
/* e2brdi79 = div 1192x409 */
.e2brdi79 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; margin-top: 160px }
@media (max-width: 1280px) { .e2brdi79 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .e2brdi79 { margin-top: 80px } }
@media (max-width: 799px) { .e2brdi79 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e2brdi710 = img 376x225 */
.e2brdi710 { display: block; height: auto; width: 100% }
/* e2brdi711 = p «GTM gets a vote» 376x32 */
.e2brdi711 { font-family: $sans; font-size: 24px; line-height: 32px; letter-spacing: -0.5px; color: rgb(255, 255, 255); font-weight: 700; margin-top: 24px }
@media (max-width: 1280px) { .e2brdi711 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e2brdi711 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } }
/* e2brdi712 = p «Sales, CS, and support react and comment» 360x112 */
.e2brdi712 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 16px; max-width: 360px }
@media (max-width: 1280px) { .e2brdi712 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e2brdi712 { font-size: 16px; line-height: 24px } }
/* e2brdi713 = p «Now available in your workspace.» 1192x120 */
.e2brdi713 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin-top: 160px }
@media (max-width: 1280px) { .e2brdi713 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e2brdi713 { margin-top: 96px } }
@media (max-width: 799px) { .e2brdi713 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e2brdi714 = a «Try it in open beta →» 1192x60 */
.e2brdi714 { color: rgba(255, 255, 255, 0.64); display: block; text-decoration: none; transition: color 150ms }
.e2brdi714:hover, .e2brdi714:focus-visible { color: rgb(255, 255, 255) }
```

Ecosystem:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* e5j80f53 = img 197x200 */
.e5j80f53 { height: 200px; position: absolute; right: 18px; top: -15px; width: auto; z-index: 2 }
@media (max-width: 1280px) { .e5j80f53 { height: 220px; right: 0px; top: -40px } }
@media (max-width: 799px) { .e5j80f53 { height: 120px; right: 0px; top: -24px } }
/* e5j80f54 = p «Ecosystem» 1192x170 */
.e5j80f54 { font-family: $sans; font-weight: 600; font-size: clamp(120px, 14vw, 200px); letter-spacing: -0.02em; line-height: 0.85; margin: 0px; position: relative; z-index: 1 }
@media (max-width: 799px) { .e5j80f54 { font-size: clamp(40px, 12vw, 56px); letter-spacing: -0.02em; line-height: 1 } }
/* e5j80f511 = div 0x0 */
.e5j80f511 { display: none }
@media (max-width: 1280px) { .e5j80f511 { display: block; margin-top: 64px } }
@media (max-width: 799px) { .e5j80f511 { margin-top: 48px } }
/* e1osxjcu7 = p «Now available in GA» 580x60 */
.e1osxjcu7 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1osxjcu7 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu7 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1osxjcu11 = p «Agents solve complex tasks alongside you» 376x140 */
.e1osxjcu11 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 24px }
@media (max-width: 1280px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
/* e5j80f55 = div 1192x1084 */
.e5j80f55 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; margin-top: 160px }
@media (max-width: 1280px) { .e5j80f55 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .e5j80f55 { margin-top: 64px } }
@media (max-width: 799px) { .e5j80f55 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e5j80f56 = div 478x709 */
.e5j80f56 { margin-top: 127px; scroll-margin-top: 160px }
@media (max-width: 1280px) { .e5j80f56 { margin-top: 0px } }
/* e5j80f58 = img 478x393 */
.e5j80f58 { display: block; height: auto; width: 100% }
@media (max-width: 1280px) { .e5j80f58 { max-width: 508px } }
/* e5j80f512 = p «Agents can now talk to your tools» 478x120 */
.e5j80f512 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin-top: 32px }
@media (max-width: 1280px) { .e5j80f512 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e5j80f512 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e5j80f510 = div 580x228 */
@media (max-width: 1280px) { .e5j80f510 { display: none } }
/* e5j80f57 = div 472x660 */
.e5j80f57 { margin-left: 108px; margin-top: 196px; scroll-margin-top: 160px }
@media (max-width: 1280px) { .e5j80f57 { margin-left: 0px; margin-top: 64px } }
```

Enterprise + layer stack:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* e1l1dk623 = div 1090x220 */
.e1l1dk623 { align-items: center; display: flex; gap: 24px; position: relative; z-index: 1 }
@media (max-width: 799px) { .e1l1dk623 { gap: 12px } }
/* e1l1dk624 = img 167x220 */
.e1l1dk624 { flex-shrink: 0; height: clamp(160px, 15.4vw, 220px); width: auto }
@media (max-width: 799px) { .e1l1dk624 { height: 64px } }
/* eeuo5qc5 = p «Channels» 954x170 */
.eeuo5qc5 { font-family: $sans; font-weight: 600; font-size: clamp(120px, 14vw, 200px); letter-spacing: -0.02em; line-height: 0.85; margin: 0px }
@media (max-width: 799px) { .eeuo5qc5 { font-size: clamp(40px, 12vw, 56px); letter-spacing: -0.02em; line-height: 1 } }
/* e1osxjcu6 = div 1192x60 */
.e1osxjcu6 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; margin-top: 24px; position: relative; z-index: 1 }
@media (max-width: 1280px) { .e1osxjcu6 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .e1osxjcu6 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e1osxjcu7 = p «Now available in GA» 580x60 */
.e1osxjcu7 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1osxjcu7 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1osxjcu7 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* erteesl0 = div 1192x1980 */
.erteesl0 { height: 220vh; margin-top: 64px; position: relative }
@media (max-width: 1280px) { .erteesl0 { height: auto; margin-top: 80px } }
@media (max-width: 799px) { .erteesl0 { margin-top: 64px } }
/* erteesl1 = div 1192x900 */
.erteesl1 { align-items: center; display: flex; height: 100vh; position: sticky; top: 40px }
@media (max-width: 1280px) { .erteesl1 { display: block; height: auto; position: static } }
/* erteesl2 = div 1192x757 */
.erteesl2 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); align-items: start; width: 100% }
@media (max-width: 1280px) { .erteesl2 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .erteesl2 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* erteesl3 = div 600x757 */
.erteesl3 { aspect-ratio: 596 / 752; margin: 0px auto; position: relative; width: min(88%, 88vh) }
@media (max-width: 1280px) { .erteesl3 { width: 100% } }
/* erteesl4 = img 600x277 */
.erteesl4 { height: auto; left: 0px; position: absolute; transition: opacity 0.6s, transform 0.6s; width: 100%; will-change: opacity, transform }
.erteesl4[data-peeled="true"] { opacity: 0; transform: translateY(-120px) }
/* erteesl5 = div 376x528 */
.erteesl5 { display: flex; flex-direction: column; gap: 56px; margin-top: calc(-30px + (0.148 * min(88vh, 637px))) }
@media (max-width: 1280px) { .erteesl5 { margin-top: 0px } }
/* erteesl6 = div 376x180 */
.erteesl6 { cursor: pointer }
/* erteesl7 = p «Query» 376x60 */
.erteesl7 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px; opacity: 0.4; transition: opacity 300ms }
.erteesl7[data-active="true"] { opacity: 1 }
.erteesl6:hover .erteesl7 { opacity: 1 }
@media (max-width: 1280px) { .erteesl7 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .erteesl7 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* erteesl8 = p «One layer lets humans and agents query a» 376x112 */
.erteesl8 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; animation: 250ms ease 0s 1 normal both running animation-1e051ht; color: rgb(255, 255, 255); margin: 8px 0px 0px; max-width: 400px }
@media (max-width: 1280px) { .erteesl8 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .erteesl8 { font-size: 16px; line-height: 24px } }
/* e1l1dk628 = div 1192x601 */
.e1l1dk628 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: flex-start; margin-top: 64px; scroll-margin-top: 160px }
@media (max-width: 1280px) { .e1l1dk628 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .e1l1dk628 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e1l1dk629 = p «AI that knows your business» 432x120 */
.e1l1dk629 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); max-width: 432px }
@media (max-width: 1280px) { .e1l1dk629 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1l1dk629 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1osxjcu11 = p «Agents solve complex tasks alongside you» 376x140 */
.e1osxjcu11 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 24px }
@media (max-width: 1280px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu11 { font-size: 16px; line-height: 24px } }
/* e1osxjcu12 = div 376x136 */
.e1osxjcu12 { display: flex; flex-direction: column; gap: 8px; margin-top: 40px }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1osxjcu14 = svg 29x24 */
.e1osxjcu14 { color: rgb(255, 255, 255); flex-shrink: 0; height: 24px; width: auto }
/* e1osxjcu15 = div «Choose your trigger» 184x40 */
.e1osxjcu15 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; background: rgb(4, 47, 167); color: rgb(255, 255, 255); display: inline-flex; padding: 8px 16px; white-space: nowrap }
@media (max-width: 1280px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } .e1osxjcu15 { white-space: normal } }
/* e1l1dk6215 = img 580x601 */
.e1l1dk6215 { display: block; height: auto; width: 100% }
@media (max-width: 1280px) { .e1l1dk6215 { max-width: 622px } }
@media (max-width: 799px) { .e1l1dk6215 { margin-top: 48px } }
@keyframes animation-1e051ht { 0% { opacity: 0; transform: translateY(4px); } 100% { opacity: 1; transform: translateY(0px); } }
```

One way:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* ecsil9t1 = p «One way to work, across every team» 1192x60 */
.ecsil9t1 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px; text-align: center }
@media (max-width: 1280px) { .ecsil9t1 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .ecsil9t1 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* ecsil9t2 = img 1192x546 */
.ecsil9t2 { display: block; height: auto; margin-top: 96px; width: 100% }
@media (max-width: 1280px) { .ecsil9t2 { margin-top: 64px } }
/* ecsil9t3 = div 1192x168 */
.ecsil9t3 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: flex-start; margin-top: 64px }
@media (max-width: 1280px) { .ecsil9t3 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .ecsil9t3 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* ecsil9t4 = div 478x136 */
.ecsil9t4 { display: flex; flex-direction: column; gap: 8px }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1osxjcu14 = svg 29x24 */
.e1osxjcu14 { color: rgb(255, 255, 255); flex-shrink: 0; height: 24px; width: auto }
/* e1osxjcu15 = div «Choose your trigger» 184x40 */
.e1osxjcu15 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; background: rgb(4, 47, 167); color: rgb(255, 255, 255); display: inline-flex; padding: 8px 16px; white-space: nowrap }
@media (max-width: 1280px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } .e1osxjcu15 { white-space: normal } }
/* ecsil9t8 = p «Every team works from the same playbook » 478x168 */
.ecsil9t8 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .ecsil9t8 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .ecsil9t8 { font-size: 16px; line-height: 24px } .ecsil9t8 { margin-top: 40px } }
```

Protected:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* ea0q8q81 = div 1192x602 */
.ea0q8q81 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: center }
@media (max-width: 1280px) { .ea0q8q81 { gap: 24px; grid-template-columns: repeat(12, 1fr) } }
@media (max-width: 799px) { .ea0q8q81 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e120p5ma2 = img 580x538 */
.e120p5ma2 { display: block; height: auto; width: 100% }
@media (max-width: 1280px) { .e120p5ma2 { max-width: 616px } }
@media (max-width: 799px) { .e120p5ma2 { margin-bottom: 48px } }
/* e120p5ma3 = p «Protected by default» 432x120 */
.e120p5ma3 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px; max-width: 432px }
@media (max-width: 1280px) { .e120p5ma3 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e120p5ma3 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e120p5ma4 = p «AI Redaction protects sensitive data aut» 464x140 */
.e120p5ma4 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin-top: 24px; max-width: 464px }
@media (max-width: 1280px) { .e120p5ma4 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e120p5ma4 { font-size: 16px; line-height: 24px } }
/* e1osxjcu12 = div 376x136 */
.e1osxjcu12 { display: flex; flex-direction: column; gap: 8px; margin-top: 40px }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1osxjcu14 = svg 29x24 */
.e1osxjcu14 { color: rgb(255, 255, 255); flex-shrink: 0; height: 24px; width: auto }
/* e1osxjcu15 = div «Choose your trigger» 184x40 */
.e1osxjcu15 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; background: rgb(4, 47, 167); color: rgb(255, 255, 255); display: inline-flex; padding: 8px 16px; white-space: nowrap }
@media (max-width: 1280px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1osxjcu15 { font-size: 16px; line-height: 24px } .e1osxjcu15 { white-space: normal } }
```

CTA:
```css
/* e1ot4t9i0 = div 1440x780 */
.e1ot4t9i0 { position: relative }
/* e1uk7pdk1 = h2 «The best never guess» 1192x320 */
.e1uk7pdk1 { align-items: center; color: rgb(255, 255, 255); gap: 0px 16px; display: flex; flex-wrap: wrap; font-family: $sans; font-size: 200px; font-weight: 600; isolation: isolate; justify-content: flex-start; letter-spacing: -8px; line-height: 160px; margin: 0px; text-align: left }
@media (max-width: 1280px) { .e1uk7pdk1 { column-gap: 12px; font-size: 120px; letter-spacing: -4px; line-height: 110px } }
@media (max-width: 799px) { .e1uk7pdk1 { column-gap: 8px; font-size: 56px; letter-spacing: -1px; line-height: 56px } }
/* e1uk7pdk2 = span «The best» 782x160 */
.e1uk7pdk2 { position: relative; z-index: 1 }
/* e1uk7pdk3 = span 244x0 */
.e1uk7pdk3 { display: inline-block; font-size: 0px; height: 0px; line-height: 0; overflow: visible; position: relative; vertical-align: middle; width: 244px }
@media (max-width: 1280px) { .e1uk7pdk3 { width: 150px } }
@media (max-width: 799px) { .e1uk7pdk3 { width: 72px } }
/* e1uk7pdk5 = span 244x210 */
.e1uk7pdk5 { display: block; height: 210px; left: 50%; overflow: hidden; position: absolute; top: 50%; transform: translate(-50%, -50%); mask-image: linear-gradient(transparent, black 12%, black 88%, transparent); width: 244px; z-index: 1 }
@media (max-width: 1280px) { .e1uk7pdk5 { height: 130px; width: 150px } }
@media (max-width: 799px) { .e1uk7pdk5 { height: 60px; width: 72px } }
/* e1uk7pdk6 = div 244x3360 */
.e1uk7pdk6 { animation: 16s ease-in-out 0s infinite normal none running animation-1f1cum0; display: flex; flex-direction: column }
/* e1uk7pdk7 = div 244x210 */
.e1uk7pdk7 { align-items: center; display: flex; flex-shrink: 0; height: 210px; justify-content: center; padding-bottom: 30px; padding-top: 30px }
.e1uk7pdk7 img, .e1uk7pdk7 svg { height: auto; max-height: 100%; max-width: 100%; object-fit: contain; width: auto }
@media (max-width: 1280px) { .e1uk7pdk7 { height: 130px; padding-bottom: 20px; padding-top: 20px } }
@media (max-width: 799px) { .e1uk7pdk7 { height: 60px; padding-bottom: 8px; padding-top: 8px } }
/* e1uk7pdk10 = div 1192x224 */
.e1uk7pdk10 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); width: 100%; align-items: start; margin-top: 64px }
@media (max-width: 1280px) { .e1uk7pdk10 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .e1uk7pdk10 { margin-top: 48px } }
@media (max-width: 799px) { .e1uk7pdk10 { gap: 24px; grid-template-columns: repeat(4, 1fr) } }
/* e1uk7pdk12 = button «WATCH THE KEYNOTE» 400x224 */
.e1uk7pdk12 { align-items: flex-end; appearance: none; aspect-ratio: 400 / 224; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: flex; font: inherit; max-width: 400px; overflow: hidden; padding: 16px; position: relative; text-align: left; width: 100% }
.e1uk7pdk12::before { background: url("/media/suns-out-keynote-thumbnail.png") center center / cover no-repeat; content: ""; inset: 0px; position: absolute; transition: transform 400ms; z-index: 0 }
.e1uk7pdk12:hover::before, .e1uk7pdk12:focus-visible::before { transform: scale(1.05) }
@media (max-width: 799px) { .e1uk7pdk12 { max-width: none } }
/* e1uk7pdk14 = span 195x24 */
.e1uk7pdk14 { align-items: center; display: flex; gap: 12px; position: relative; z-index: 1 }
/* e1uk7pdk15 = span 24x24 */
.e1uk7pdk15 { align-items: center; background: rgb(255, 255, 255); border-radius: 4px; color: rgb(10, 10, 10); display: flex; flex-shrink: 0; height: 24px; justify-content: center; width: 24px }
.e1uk7pdk15 svg { display: block; height: 12px; width: 12px }
/* e1uk7pdk16 = span «Watch the keynote» 159x19 */
.e1uk7pdk16 { font-family: $mono; font-size: 14px; font-weight: 400; line-height: 140%; color: rgb(255, 255, 255); letter-spacing: 1px; text-transform: uppercase }
@media (max-width: 1280px) { .e1uk7pdk16 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e1uk7pdk16 { font-size: 14px; line-height: 140% } }
/* e1uk7pdk11 = div 540x212 */
.e1uk7pdk11 { display: flex; flex-direction: column; max-width: 540px }
/* e1uk7pdk8 = p «AI made building fast. What separates te» 540x140 */
.e1uk7pdk8 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1uk7pdk8 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1uk7pdk8 { font-size: 16px; line-height: 24px } }
/* e4sdv0e12 = div 580x40 */
.e4sdv0e12 { align-items: center; display: flex; gap: 8px; margin-top: 32px }
@keyframes animation-1f1cum0 { 0%, 11% { transform: translateY(0px); } 16%, 23% { transform: translateY(-6.25%); } 28%, 35% { transform: translateY(-12.5%); } 40%, 47% { transform: translateY(-18.75%); } 52%, 59% { transform: translateY(-25%); } 64%, 71% { transform: translateY(-31.25%); } 76%, 83% { transform: translateY(-37.5%); } 88%, 95% { transform: translateY(-43.75%); } 100% { transform: translateY(-50%); } }
```

## 12. Footer `e1560hmp*`
SliceContainer > row (flex, space-between, centred, padding-bottom 48):
- "© 2026 Dovetail Research Pty. Ltd." (M12 white);
- "Cookie preferences" and "Legal & Privacy" (M12, `#A7A7A7`-ish, hover white);
- "Follow us" + LinkedIn, X, Instagram, YouTube icons (gap 16).

At ≤799 it stacks (180 tall).

```css
/* e1560hmp0 = footer 1440x86 */
.e1560hmp0 { position: relative; z-index: 0 }
/* e1560hmp1 = div 1192x86 */
.e1560hmp1 { font-family: $mono; font-size: 12px; font-weight: 400; letter-spacing: 1px; line-height: 12px; text-transform: uppercase; align-items: center; display: flex; justify-content: space-between; padding-bottom: 48px }
@media (max-width: 1280px) { .e1560hmp1 { font-size: 12px; line-height: 12px } }
@media (max-width: 799px) { .e1560hmp1 { font-size: 12px; line-height: 12px } .e1560hmp1 { align-items: flex-start; flex-direction: column; gap: 24px } }
/* e1560hmp2 = div «© 2026 Dovetail Research Pty. Ltd.» 278x12 */
.e1560hmp2 { color: rgb(255, 255, 255) }
/* e1560hmp3 = div 338x38 */
.e1560hmp3 { align-items: center; display: flex; flex-wrap: wrap }
@media (max-width: 799px) { .e1560hmp3 { margin-left: -16px } }
/* e1560hmp4 = button «Cookie preferences» 181x38 */
.e1560hmp4 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: $mono; font-size: 12px; font-weight: 400; letter-spacing: 1px; line-height: 12px; text-transform: uppercase; color: rgb(255, 255, 255); padding: 12px 16px; text-decoration: none }
.e1560hmp4:disabled { opacity: 0.6; pointer-events: none }
.e1560hmp4:hover, .e1560hmp4:focus-visible { color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e1560hmp4 { font-size: 12px; line-height: 12px } }
@media (max-width: 799px) { .e1560hmp4 { font-size: 12px; line-height: 12px } }
/* e1560hmp4--v2 = a «Legal & Privacy» 157x38 */
.e1560hmp4--v2 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: $mono; font-size: 12px; font-weight: 400; letter-spacing: 1px; line-height: 12px; text-transform: uppercase; color: rgb(255, 255, 255); padding: 12px 16px; text-decoration: none }
.e1560hmp4--v2:disabled { opacity: 0.6; pointer-events: none }
.e1560hmp4--v2:hover, .e1560hmp4--v2:focus-visible { color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e1560hmp4--v2 { font-size: 12px; line-height: 12px } }
@media (max-width: 799px) { .e1560hmp4--v2 { font-size: 12px; line-height: 12px } }
/* e1osxjcu13 = div 376x40 */
.e1osxjcu13 { align-items: center; display: flex; gap: 16px }
/* e1560hmp7 = div 160x34 */
.e1560hmp7 { display: flex; gap: 8px }
/* e1560hmp8 = a 34x34 */
.e1560hmp8 { background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; align-items: center; color: rgb(255, 255, 255); display: flex; justify-content: center }
.e1560hmp8:disabled { opacity: 0.6; pointer-events: none }
.e1560hmp8:hover, .e1560hmp8:focus-visible { color: rgb(167, 167, 167) }
.e1560hmp8 svg { height: 32px; width: 32px }
```

## 13. Motion summary
| Element | Trigger | Detail |
|---|---|---|
| Section nav | scroll (rAF) | show between #launch-shipped bottom and #launch-protected bottom; 300ms transform+opacity; active by top ≤ 120 |
| Hero sun | pointermove (in view) | magnetic ±12px within 190px, transition .5s ease-out |
| Pixel squares / glyphs | always | steps(1) blink, .6–1.6s, random negative delays, outer squares only |
| Hero video | scroll 0→100vh (≥768) | scale 400/w → 1 from bottom-right |
| Twin carousel | 10s timeout + click | pop-in .7s, stagger .16s; cursor parallax .5s |
| Logo rotators | always | CSS steps keyframes (6.25% steps) |
| Enterprise stack | scroll within section (≥1281) | 4 states, layers peel |
| Agent / keynote modals | click | slide-in 320ms, fade 200ms; YouTube |

## 14. Gaps
- This page has the most bespoke code in my group. Section layouts are covered by the generated CSS and the data file, and motion by source. I didn't hand-verify every inner card position for sections 4–11 at all four widths. Use the screenshot plus CSS.
- I didn't capture the "peeled" visual state of the enterprise layers or the open agent modal visually. The CSS selectors for `[data-peeled=true]` are in the enterprise CSS block.
- The YouTube embeds (hero `f0adQ-1hnNc`, keynote `8EP6vZF1Et4`) are external.
