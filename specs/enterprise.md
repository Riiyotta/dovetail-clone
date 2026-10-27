Source: https://dovetail.com/

# Template: `enterprise` (1 page): `/enterprise/`

A one-off page component (chunk `0m91gsbg5tw12`, `PageLayout hideHeaderSpacing`). Chrome: default alert bar, transparent nav (`main` at y=118, because the hero's leading Spacer provides the offset). Footer is **variant A** (homepage final CTA + footer). Data: `src/data/marketing/enterprise.json`. Read `marketing-shared.md` first.

## 0. Section order (spacer default = 200 desktop / 96 mobile unless noted)
1. Spacer hero (96 / sm 56)
2. **EnterpriseHero**
3. Spacer → **CompactLogoSlice** (shared §7.5; heading "Connecting the world's greatest companies to their customers")
4. Spacer → **VerticalTabs** "Intelligent decisions, made faster"
5. Spacer → **ROI map** "Save time, reduce risk…"
6. Spacer (mobile 0) → **Integrations** "Connected to your enterprise stack" (SectionImageBackgroundContainer + FeatureCardGrid)
7. Spacer → **TestimonialSlice** (shared §7.4)
8. Spacer → PixelTransition▼ [**SecurityAndCompliance** + Spacer]
9. **CustomerStories** (shared §7.3)
10. PixelTransition▲ [Spacer SECTION + **Resources for enterprise**]
11. Spacer 200 (→160 as last child)

Measured at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `e18o1u1v3` | 774x136 @x124 64px/68px | 774x104 @x64 48px/52px | 736x36 @x16 32px/36px | 358x72 @x16 32px/36px |
| `ezcuxt20` | 1192x853.4 @x124 | 1152x824.8 @x64 | 736x527 @x16 | 358x256.3 @x16 |
| `etikis33` | 376x659.4 @x124 | 1152x110 @x64 | 736x106 @x16 | 358x106 @x16 |
| `etikis310` | 376x86 @x124 | 1152x110 @x64 | 736x106 @x16 | 358x106 @x16 |
| `etikis311` | 682x659.4 @x634 | 760x734.8 @x64 | 736x711.6 @x16 | 358x346.1 @x16 |
| `ev8np7u2` | 1440x786 @x0 | 1280x710.6 @x0 | 768x706.6 @x0 | 390x795.6 @x0 |
| `ev8np7u1` | 70x786 @x124 | hidden | hidden | hidden |
| `ev8np7u3` | hidden | 1152x489.6 @x64 | 736x489.6 @x16 | 358x489.6 @x16 |
| `ev8np7u4` | 580x245 @x736 | 858x157 @x64 | 736x153 @x16 | 358x242 @x16 |
| `e1ml9unk2` | 332x372 @x88 | 332x372 @x64 | 736x372 @x16 | 358x372 @x16 |
| `e1jvfgez0` | 1440x1589.6 @x0 | 1280x1499.7 @x0 | 768x2405.7 @x0 | 390x1726.8 @x0 |
| `e1jvfgez2` | 1440x586.7 @x0 | 1280x521.5 @x0 | hidden | hidden |
| `e1rt7vde0` | 1192x479 @x124 | 1152x479 @x64 | 736x629.5 @x16 | 358x407.1 @x16 |
| `e10uz04f0` | 1192x987 @x124 | 1152x1289 @x64 | 736x2579 @x16 | 358x2867 @x16 |
| `e10uz04f1` | 397.3x493 @x124 | 576x429 @x64 | 736x429 @x16 | 358x477 @x16 |
| `e183docx0` | 682x167 @x634 | 1152x167 @x64 | 736x167 @x16 | 358x215 @x16 |

Page height: 11417 (1440).

## 1. EnterpriseHero
SliceGrid:
- Column `span 8` (z-index 2) holds a BaseHeading (hero):
  - eyebrow "Enterprise AI customer intelligence platform" (M14 `#A7A7A7`, mb 32);
  - `h1` **H64** (max-width 774): "Turn feedback into foresight—at scale";
  - P20 white subheading (max-width 508, margin `32px 0`);
  - buttons (margin-top 32, gap 8): "Request a demo" (primary → `/request-a-demo/`) and "Contact sales" (secondary → `/contact-sales/enterprise-lp/`). Every "Contact sales" on this page uses that href.
- Image column `.ezcuxt20` (span 12): `position:relative; top:-200px; margin-bottom:-200px` (md 0/0), so the screenshot slides up behind the text column. Image `continuous_AI_analysis__9_.png` (2528x1810, contain, `aspect-ratio 2528/1810`), 1192x853 at 1440. Desktop and mobile `<img>` variants use the same file.

```css
/* e18o1u1v3 = h1 «Turn feedback into foresight—at scale» 774x136 */
.e18o1u1v3 { display: block; color: rgb(255, 255, 255); max-width: 774px; font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px }
@media (max-width: 1280px) { .e18o1u1v3 { font-size: 64px; line-height: 68px; letter-spacing: -2px } .e18o1u1v3 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e18o1u1v3 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e18o1u1v4 = p «Our AI-native platform helps enterprises» 508x112 */
.e18o1u1v4 { margin: 32px 0px; max-width: 508px; display: block; color: rgb(255, 255, 255); font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e18o1u1v4 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e18o1u1v4 { font-size: 16px; line-height: 24px } }
/* e18o1u1v5 = div 784x40 */
.e18o1u1v5 { margin-top: 32px; display: flex; flex-flow: wrap; gap: 8px }
/* ezcuxt20 = div 1192x853 */
.ezcuxt20 { grid-column: 1 / -1; order: unset; max-width: unset; min-width: unset; position: relative; top: -200px; margin-bottom: -200px; z-index: 1 }
@media (max-width: 1280px) { .ezcuxt20 { grid-column: 1 / -1; display: block } .ezcuxt20 { top: 0px; margin-bottom: 0px } }
@media (max-width: 799px) { .ezcuxt20 { grid-column: 1 / -1; display: block; min-width: unset } }
/* ejdubc80 = img 1192x853 */
.ejdubc80 { display: block }
@media (max-width: 1280px) { .ejdubc80 { display: none } }
/* ejdubc81 = img 0x0 */
.ejdubc81 { display: none }
@media (max-width: 1280px) { .ejdubc81 { display: block } }
/* e18o1u1v3--v2 = h2 «Intelligent decisions, made faster» 726x136 */
.e18o1u1v3--v2 { display: block; color: rgb(255, 255, 255); max-width: 726px; font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px }
@media (max-width: 1280px) { .e18o1u1v3--v2 { font-size: 64px; line-height: 68px; letter-spacing: -2px } .e18o1u1v3--v2 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e18o1u1v3--v2 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3--v2 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e18o1u1v4--v2 = p «Make sense of thousands of complex data » 620x56 */
.e18o1u1v4--v2 { margin: 32px 0px; max-width: 620px; display: block; color: rgb(255, 255, 255); font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e18o1u1v4--v2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e18o1u1v4--v2 { font-size: 16px; line-height: 24px } }
/* e18o1u1v3--v3 = h2 «Connected to your enterprise stack» 682x136 */
.e18o1u1v3--v3 { display: block; color: rgb(255, 255, 255); max-width: 871px; font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px }
@media (max-width: 1280px) { .e18o1u1v3--v3 { font-size: 64px; line-height: 68px; letter-spacing: -2px } .e18o1u1v3--v3 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e18o1u1v3--v3 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3--v3 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e18o1u1v4--v3 = p «Enrich and activate customer intelligenc» 682x28 */
.e18o1u1v4--v3 { margin: 32px 0px; max-width: 800px; display: block; color: rgb(255, 255, 255); font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e18o1u1v4--v3 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e18o1u1v4--v3 { font-size: 16px; line-height: 24px } }
/* e18o1u1v3--v4 = h2 «Resources for enterprise» 376x204 */
.e18o1u1v3--v4 { display: block; color: rgb(255, 255, 255); font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px }
@media (max-width: 1280px) { .e18o1u1v3--v4 { font-size: 64px; line-height: 68px; letter-spacing: -2px } .e18o1u1v3--v4 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e18o1u1v3--v4 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3--v4 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e18o1u1v1 = div 28x28 */
.e18o1u1v1 { background: rgba(255, 255, 255, 0.24); border-radius: 4px; display: inline-flex; padding: 2px; vertical-align: bottom }
```

## 2. VerticalTabs (`etikis3*`, line `e19rlehn*`, heading `e1rdhwkq*`)
- A SliceContainer holds a BaseHeading: H64 "Intelligent decisions, made faster" (max 726), P20 subheading (max 620), "Request a demo" + "Contact sales". Then Spacer 0 (sm 56).
- Then InnerGrid (row-gap 32):
  - **Tabs column** `span 4` (`.etikis33`, flex column centred; md full width, order 2). Inside there's a relative box with:
    - **Rail** `.etikis35` (absolute, `left:6.5px; top:24px; bottom:24px; width:1px`; hidden ≤1280) holding three layers:
      - track `#212121` (`tabs.disabledLine`) from the first tab marker to the last;
      - solid fill `#FFF` up to the active tab;
      - a 70%-opacity white "progress" fill whose height grows by `tabProgress/70 × (segment length)` toward the next tab.

      The line geometry is measured from the tab elements' rects (top of first tab + 5px, etc.) and recomputed on resize.
    - **Tablist** (`role=tablist`, vertical). Each tab is a button `.e1rdhwkq2` (flex row, gap 24, padding `20px 0`; md `8px 0`; left-aligned) holding:
      - a 10x10 square marker `.etikis30` (`top:8px`): `#FFF` if active or already passed or hovered, else `#212121`; 300ms ease; hidden ≤1280;
      - text: h3 **H20** white at opacity 1 when active/hovered, else .64 (mb 16); then the description P16 `rgba(255,255,255,.64)` (max-width 296), **only displayed for the active tab**.
    - At ≤1280 only the active tab is displayed, and a horizontal progress line (1px `#212121` track, white fill `width:progress%`) sits 12px below.
  - **Image column** `6 / span 7` (tablet span 8): 4 panels stacked (the first is relative, the others absolute), active opacity 1, others 0, **300ms ease**. Images (1448x1400): `continuous_AI_analysis__8_.png` (Real-time dashboards), `sentiment-detection-vertical-tabs.png`, `customer-narratives-vertical-tabs.png`, `answers-on-demand-vertical-tabs.png`.
- Tabs: "Real-time dashboards", "Sentiment detection", "Customer narratives", "Answers on demand" (descriptions verbatim in data; they're one sentence each).
- **Motion:** `useTabGroup(0, 40)` gives **4s per tab** (100 ticks × 40ms), auto-advancing once in view. Hovering a tab **previews it** (pause + hover highlight). Mouse-leave resumes. Click or focus selects it and stops auto-advance.

```css
/* etikis33 = div 376x659 */
.etikis33 { grid-column: span 4; order: unset; max-width: unset; min-width: unset; align-items: flex-start; display: flex; flex-direction: column; justify-content: center; position: relative }
@media (max-width: 1280px) { .etikis33 { grid-column: span 12; display: block } .etikis33 { display: flex; order: 2 } }
@media (max-width: 799px) { .etikis33 { grid-column: span 4; display: block; min-width: unset } }
/* etikis35 = div 1x344 */
.etikis35 { position: absolute; left: 6.5px; top: 24px; bottom: 24px; width: 1px }
@media (max-width: 1280px) { .etikis35 { display: none } }
/* e19rlehn0 = div 1x311 */
.e19rlehn0 { position: absolute; top: 5px; left: -1px; width: 100%; height: 311px; background-color: rgb(33, 33, 33) }
/* e19rlehn1 = div 1x91 */
.e19rlehn1 { position: absolute; top: 5px; left: -1px; width: 100%; height: 91px; background-color: rgb(255, 255, 255) }
/* e19rlehn2 = div 1x116 */
.e19rlehn2 { position: absolute; top: 5px; left: -1px; width: 100%; height: 116.176px; background-color: rgb(255, 255, 255); opacity: 0.7 }
/* etikis39 = div 376x392 */
.etikis39 { display: flex; flex-direction: column; width: 100% }
/* etikis310 = div 376x86 */
@media (max-width: 1280px) { .etikis310 { display: none } }
/* e1rdhwkq2 = button «Real-time dashboards» 376x86 */
.e1rdhwkq2 { background: transparent; border: 1px solid transparent; text-decoration: none; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); align-items: flex-start; cursor: pointer; display: flex; flex-direction: row; flex-shrink: 1; padding: 20px 0px; gap: 24px; justify-content: flex-start; text-align: left; white-space: normal; width: 100% }
.e1rdhwkq2:disabled { opacity: 0.6; pointer-events: none }
.e1rdhwkq2:hover, .e1rdhwkq2:focus-visible { color: rgb(167, 167, 167) }
.e1rdhwkq2:hover, .e1rdhwkq2:focus { text-decoration: none }
@media (max-width: 1280px) { .e1rdhwkq2 { padding: 8px 0px } }
/* etikis30 = div 10x10 */
.etikis30 { min-height: 10px; min-width: 10px; background-color: rgb(255, 255, 255); transition: background-color 300ms; position: relative; z-index: 1; top: 8px }
@media (max-width: 1280px) { .etikis30 { display: none } }
/* e1rdhwkq0 = h3 «Real-time dashboards» 205x28 */
.e1rdhwkq0 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255); opacity: 0.64; margin: 0px 0px 16px; transition: color 300ms }
@media (max-width: 1280px) { .e1rdhwkq0 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1rdhwkq0 { font-size: 16px; line-height: 24px } }
/* etikis34 = p 0x0 */
.etikis34 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(255, 255, 255, 0.64); display: none; max-width: 296px }
@media (max-width: 1280px) { .etikis34 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .etikis34 { font-size: 16px; line-height: 24px } }
/* etikis310--v2 = div 376x134 */
@media (max-width: 1280px) { .etikis310--v2 { display: flex } }
/* e1rdhwkq0--v2 = h3 «Sentiment detection» 296x28 */
.e1rdhwkq0--v2 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255); opacity: 1; margin: 0px 0px 16px; transition: color 300ms }
@media (max-width: 1280px) { .e1rdhwkq0--v2 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1rdhwkq0--v2 { font-size: 16px; line-height: 24px } }
/* etikis34--v2 = p «Spot themes, emerging issues, and opport» 296x48 */
.etikis34--v2 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(255, 255, 255, 0.64); display: block; max-width: 296px }
@media (max-width: 1280px) { .etikis34--v2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .etikis34--v2 { font-size: 16px; line-height: 24px } }
/* etikis30--v2 = div 10x10 */
.etikis30--v2 { min-height: 10px; min-width: 10px; background-color: rgb(33, 33, 33); transition: background-color 300ms; position: relative; z-index: 1; top: 8px }
@media (max-width: 1280px) { .etikis30--v2 { display: none } }
/* etikis36 = div 0x0 */
.etikis36 { display: none }
@media (max-width: 1280px) { .etikis36 { display: block; position: absolute; left: 1px; right: 1px; bottom: -12px; width: auto; height: 1px } }
/* etikis37 = div 0x0 */
.etikis37 { position: absolute; top: 0px; left: 0px; width: 100%; height: 1px; background-color: rgb(33, 33, 33) }
/* etikis38 = div 0x0 */
.etikis38 { position: absolute; top: 0px; left: 0px; width: 17%; height: 1px; background-color: rgb(255, 255, 255) }
/* etikis311 = div 682x659 */
.etikis311 { position: relative; top: auto; left: auto; width: 100%; opacity: 0; transition: opacity 300ms; pointer-events: none }
/* etikis311--v2 = div 682x659 */
.etikis311--v2 { position: absolute; top: 0px; left: 0px; width: 100%; opacity: 1; transition: opacity 300ms; pointer-events: auto }
/* etikis311--v3 = div 682x659 */
.etikis311--v3 { position: absolute; top: 0px; left: 0px; width: 100%; opacity: 0; transition: opacity 300ms; pointer-events: none }
```

## 3. ROI map (`ev8np7u*`)
Root `.ev8np7u2`: SliceGrid, `height:786px; overflow-x:clip; position:relative`. At ≤1400px: `height:unset; overflow:clip`.

**Decor layers** (z 1–3):
- **Dashed grid** `.ev8np7u8`: absolute, `top:0; left:calc(50% - 685px); right:0; bottom:140px` (≤1400: left 0). It's a flex row of 3 columns × 3 rows of cells, `width:1512px; margin:6px`. Cells have `1px dashed` borders in `#0A0C14`-ish `colors.onBackground` (`#4F4F4F` dark, rendered rgb(79,79,79)), and each cell corner carries a 10x10 `#4F4F4F` square at -6px offsets.
- **Connector line SVG** `.ev8np7u7` (1424x663, absolute, `top:-20px; left:calc(50% - 680px)`; inner svg offset `left:calc(50% - 856px); top:72px`; hidden ≤799): one path stroked with a linear gradient `#585858 → #FFFFFF (50%) → #585858`, stroke-width .875. File `svg/ev8np7u7-e1ovzewl0-254952.svg`.
- **Six GradientBanners** in `#0A0A0A` fade every edge:
  - top 192px at -30;
  - bottom 300px (180deg);
  - left 300px (270deg);
  - a 700px-wide band rotated **32°** (`.ev8np7u16`, top/bottom -100);
  - right 400px (90deg);
  - bottom 600px (180deg).

**Hotspots** (`.ev8np7u1`, hidden ≤1400). There are 4 points at `{top:calc(50% - 50px), left:calc(50% - 182px)}`, `{calc(50% - 86px), calc(50% + 38px)}`, `{calc(50% - 86px), calc(50% + 118px)}`, `{calc(50% - 251px), calc(50% + 191px)}`. Each is a 12x12 anchor with:
- a **pulsing button** `.e51bqc31` (48x48 at -18/-18, pad 6) > 36x36 > 24x24 > 12x12 nested squares, coloured orange alphas `rgba(255,68,0,.16)`, `.32`, `.48`, `.48`;
- when active/hovered/focused, each layer animates `background-color` over **1800ms infinite** with keyframes `{24%: transparent, 94%: .16}`, `{16%: transparent, 86%: .32}`, `{8%: transparent, 78%: .48}`. That gives an inward-rippling pulse. Background transitions are 300ms with a 300ms delay;
- the **stat card** `.e1ml9unk2` (`position:absolute; top:-180px; right:4px`; 332x372; pad 32; bg `#191919`; border 1px `#454545`; radius 8; opacity 0↔1, 300ms). It holds an eyebrow (M14 `#A7A7A7`, mb 8, e.g. "Return on investment"), the stat in **H80** ("2.3x", "30hrs", "30%", "66%"), the heading H16 (`margin-top:auto`, mb 8), and P16 `#A7A7A7`;
- a **connector** `.ev8np7u11` (132x62 svg, `top:132px`): an elbow path `M6 6.5L82.5 6.5L132 56` drawn with a stroke-dash reveal (`strokeDashoffset: len → 0`, 1s `power1.inOut`) via ScrollTrigger `start:"top bottom-=100"` when first in view.

**ProgressTabs** "01"–"04" (`.ev8np7u14`): absolute at `bottom:0; left:124px` (hidden ≤1400; an alternative ProgressTabs `.ev8np7u15` shows in the ≤1400 layout).

**Copy column** `.ev8np7u4` (`7 / span 6`, `margin-top:auto`, z 3; ≤1400 `span 9`; sm full):
- an inline-paired H32: "Save time, reduce risk, and build what moves the needle." (white, `display:inline`) + " Intelligence that pays off *across the product lifecycle.*" (`#A7A7A7` H32 inline; the last phrase is `white-space:nowrap`);
- Spacer 64 (sm 32);
- "Want to see the full ROI of Dovetail?" (H20, mb 8);
- link "Download the Forrester Total Economic Impact™ Study →" (H16, `#A7A7A7`, growing underline) → `/resources/industry-reports/2025-forrester-TEI-of-Dovetail/`.

**≤1400 layout** `.ev8np7u3`: grid column 1/-1, `flex-direction:column-reverse; margin-bottom:40px`, holding the active stat card (static, `margin:64px 0 32px`) and the ProgressTabs.

**Motion:** `useTabGroup(0, 70)` gives **7s per stat**. Clicking a hotspot or tab selects it and stops auto-advance.

```css
/* ev8np7u2 = section 1440x786 */
.ev8np7u2 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); margin: auto; width: 100%; padding: 0px 124px; max-width: 1512px; position: relative; height: 786px; overflow-x: clip }
@media (max-width: 1280px) { .ev8np7u2 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .ev8np7u2 { padding: 0px 64px } }
@media (max-width: 799px) { .ev8np7u2 { gap: 24px; grid-template-columns: repeat(4, 1fr) } .ev8np7u2 { padding: 0px 16px } }
@media (max-width: 1400px) { .ev8np7u2 { overflow: clip; height: unset } }
/* ev8np7u16 = div 1116x1207 */
.ev8np7u16 { background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgb(10, 10, 10) 100%); height: unset; bottom: -100px; left: 0px; right: unset; position: absolute; pointer-events: none; top: -100px; width: 700px; z-index: 3; transform: rotate(32deg); transform-origin: center center }
@media (max-width: 1280px) { .ev8np7u16 { bottom: -100px; height: unset; top: -100px; left: 0px; right: unset; width: 700px } }
/* ev8np7u3 = div 0x0 */
.ev8np7u3 { grid-column: 1 / -1; order: unset; max-width: unset; min-width: unset; display: none }
@media (max-width: 1280px) { .ev8np7u3 { grid-column: 1 / -1; display: block } }
@media (max-width: 799px) { .ev8np7u3 { grid-column: 1 / -1; display: block; min-width: unset } }
@media (max-width: 1400px) { .ev8np7u3 { display: flex; grid-column: 1 / -1; flex-direction: column-reverse; margin-bottom: 40px } }
/* e1ml9unk2 = div 0x0 */
.e1ml9unk2 { padding: 32px; flex-direction: column; height: 372px; width: 332px; background: rgb(25, 25, 25); border-radius: 8px; border: 1px solid rgb(69, 69, 69); display: flex; position: relative; margin: 64px 0px 32px; z-index: 3 }
@media (max-width: 799px) { .e1ml9unk2 { width: 100% } }
/* e1ml9unk3 = p «2.3x» 0x0 */
.e1ml9unk3 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 80px; line-height: 84px }
@media (max-width: 1280px) { .e1ml9unk3 { font-size: 64px; line-height: 68px; letter-spacing: -2px } }
@media (max-width: 799px) { .e1ml9unk3 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
/* e1ml9unk4 = div «Deliver outsized value fast» 0x0 */
.e1ml9unk4 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; margin-top: auto; margin-bottom: 8px }
@media (max-width: 1280px) { .e1ml9unk4 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1ml9unk4 { font-size: 16px; line-height: 24px } }
/* e1ml9unk1 = p «See more than double the return on your » 0x0 */
.e1ml9unk1 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e1ml9unk1 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1ml9unk1 { font-size: 16px; line-height: 24px } }
/* e1ml9unk2--v2 = div 0x0 */
.e1ml9unk2--v2 { padding: 32px; flex-direction: column; height: 372px; width: 332px; background: rgb(25, 25, 25); border-radius: 8px; border: 1px solid rgb(69, 69, 69); display: none; position: relative; margin: 64px 0px 32px; z-index: 3 }
@media (max-width: 799px) { .e1ml9unk2--v2 { width: 100% } }
/* ev8np7u1 = div 70x786 */
@media (max-width: 1400px) { .ev8np7u1 { display: none } }
/* e51bqc30 = div 12x12 */
.e51bqc30 { height: 12px; width: 12px; position: absolute; left: calc(50% - 182px); top: calc(50% - 50px); z-index: 3 }
/* ev8np7u10 = div 458x372 */
.ev8np7u10 { color: rgb(255, 255, 255); display: flex; flex-direction: row; pointer-events: none; position: absolute; top: -180px; right: 4px; z-index: 3 }
@media (max-width: 1400px) { .ev8np7u10 { position: relative; top: 0px; right: 0px; width: 100% } }
/* e1ml9unk2--v3 = div 332x372 */
.e1ml9unk2--v3 { padding: 32px; display: flex; flex-direction: column; height: 372px; width: 332px; background: rgb(25, 25, 25); border-radius: 8px; border: 1px solid rgb(69, 69, 69); margin-right: -6px; opacity: 1; transition: opacity 300ms }
/* e17gze030 = div 132x372 */
.e17gze030 { opacity: 1; position: relative; width: fit-content; top: 132px }
@media (max-width: 1400px) { .e17gze030 { display: none } }
/* e51bqc31 = button 48x48 */
.e51bqc31 { align-items: center; justify-content: center; border: 1px solid transparent; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); animation: 1800ms ease 0s infinite normal none running animation-1crwsso; background: rgba(255, 68, 0, 0.16); border-radius: 0px; display: block; transition: background 300ms 300ms; position: relative; left: -18px; top: -18px; height: 48px; width: 48px; padding: 6px; cursor: pointer; max-width: unset; z-index: 3 }
.e51bqc31:disabled { opacity: 0.6; pointer-events: none }
.e51bqc31:hover, .e51bqc31:focus-visible { color: rgb(167, 167, 167) }
/* e51bqc32 = div 36x36 */
.e51bqc32 { animation: 1800ms ease 0s infinite normal none running animation-c4nyx3; background: rgba(255, 68, 0, 0.32); height: 36px; width: 36px; padding: 6px }
/* e51bqc33 = div 24x24 */
.e51bqc33 { animation: 1800ms ease 0s infinite normal none running animation-1fa58hf; background: rgba(255, 68, 0, 0.48); height: 24px; width: 24px; padding: 6px }
/* e51bqc34 = div 12x12 */
.e51bqc34 { background: rgba(255, 68, 0, 0.48); height: 12px; width: 12px; padding: 6px }
/* e51bqc30--v2 = div 12x12 */
.e51bqc30--v2 { height: 12px; width: 12px; position: absolute; left: calc(50% + 38px); top: calc(50% - 86px); z-index: 3 }
/* e1ml9unk2--v4 = div 332x372 */
.e1ml9unk2--v4 { padding: 32px; display: flex; flex-direction: column; height: 372px; width: 332px; background: rgb(25, 25, 25); border-radius: 8px; border: 1px solid rgb(69, 69, 69); margin-right: -6px; opacity: 0; transition: opacity 300ms }
/* e17gze030--v2 = div 132x372 */
.e17gze030--v2 { opacity: 0; position: relative; width: fit-content; top: 132px }
@media (max-width: 1400px) { .e17gze030--v2 { display: none } }
/* e51bqc31--v2 = button 48x48 */
.e51bqc31--v2 { align-items: center; justify-content: center; border: 1px solid transparent; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); animation: unset; background: rgba(255, 68, 0, 0.16); border-radius: 0px; display: block; transition: background 300ms 300ms; position: relative; left: -18px; top: -18px; height: 48px; width: 48px; padding: 6px; cursor: pointer; max-width: unset; z-index: 3 }
.e51bqc31--v2:disabled { opacity: 0.6; pointer-events: none }
.e51bqc31--v2:hover, .e51bqc31--v2:focus-visible { color: rgb(167, 167, 167) }
/* e51bqc32--v2 = div 36x36 */
.e51bqc32--v2 { animation: unset; background: rgba(255, 68, 0, 0.32); height: 36px; width: 36px; padding: 6px }
/* e51bqc33--v2 = div 24x24 */
.e51bqc33--v2 { animation: unset; background: rgba(255, 68, 0, 0.48); height: 24px; width: 24px; padding: 6px }
/* e51bqc30--v3 = div 12x12 */
.e51bqc30--v3 { height: 12px; width: 12px; position: absolute; left: calc(50% + 118px); top: calc(50% - 86px); z-index: 3 }
/* e51bqc30--v4 = div 12x12 */
.e51bqc30--v4 { height: 12px; width: 12px; position: absolute; left: calc(50% + 191px); top: calc(50% - 251px); z-index: 3 }
/* e1ovzewl0 = div 1424x668 */
.e1ovzewl0 { position: absolute; top: -20px; left: calc(50% - 680px); margin: 0px auto; z-index: 2 }
@media (max-width: 799px) { .e1ovzewl0 { display: none } }
/* ev8np7u4 = div 580x245 */
.ev8np7u4 { order: unset; max-width: unset; min-width: unset; margin-top: auto; position: relative; z-index: 3; grid-column: 7 / span 6 }
@media (max-width: 1280px) { .ev8np7u4 { grid-column: 1 / -1; display: block } }
@media (max-width: 799px) { .ev8np7u4 { grid-column: 1 / -1; display: block; min-width: unset } .ev8np7u4 { grid-column: 1 / -1 } }
@media (max-width: 1400px) { .ev8np7u4 { grid-column: span 9 } }
/* eycheoc0 = h2 «Save time, reduce risk, and build what m» 561x79 */
.eycheoc0 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 40px; display: inline; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .eycheoc0 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .eycheoc0 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* eycheoc1 = p «Intelligence that pays off across the pr» 546x79 */
.eycheoc1 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 40px; margin: 32px 0px; max-width: unset; display: inline; color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .eycheoc1 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .eycheoc1 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* ev8np7u0 = span «across the product lifecycle.» 418x39 */
.ev8np7u0 { white-space: nowrap }
@media (max-width: 799px) { .ev8np7u0 { white-space: normal } }
/* ev8np7u5 = p «Want to see the full ROI of Dovetail?» 580x28 */
.ev8np7u5 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; margin-bottom: 8px }
@media (max-width: 1280px) { .ev8np7u5 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .ev8np7u5 { font-size: 16px; line-height: 24px } }
/* ev8np7u6 = a «Download the Forrester Total Economic Im» 436x26 */
.ev8np7u6 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; box-shadow: none; font-family: inherit; text-decoration: underline 1px transparent; text-underline-offset: 1.5px; position: relative; font-size: inherit; font-weight: inherit; padding: 0px; text-align: left; white-space: normal; transition: color 200ms ease-out; color: rgb(167, 167, 167) }
.ev8np7u6:disabled { opacity: 0.6; pointer-events: none }
.ev8np7u6::after { content: ""; position: absolute; bottom: 2px; left: 0px; width: 100%; height: 1px; background-color: rgb(255, 255, 255); transform: scaleX(0); transform-origin: left center; transition: transform 200ms ease-out }
.ev8np7u6:hover, .ev8np7u6:focus-visible { color: rgb(255, 255, 255) }
.ev8np7u6:hover::after, .ev8np7u6:focus-visible::after { transform: scaleX(1) }
.ev8np7u6 svg { color: rgb(167, 167, 167) }
.ev8np7u6::after { background-color: rgb(167, 167, 167) }
/* e1521wpn1 = div 1512x634 */
.e1521wpn1 { display: flex; flex-direction: row; width: 1512px; margin: 6px; position: absolute; inset: 0px 0px 140px calc(50% - 685px); pointer-events: none; z-index: 1 }
@media (max-width: 1400px) { .e1521wpn1 { left: 0px } }
/* e1521wpn3 = div 503x634 */
.e1521wpn3 { color: rgb(79, 79, 79); border-left: 1px dashed; display: flex; flex-direction: column; flex-grow: 1 }
.e1521wpn3:last-of-type { border-right: 1px dashed }
/* e1521wpn2 = div 502x211 */
.e1521wpn2 { color: rgb(79, 79, 79); border-top: 1px dashed; flex-grow: 1; position: relative }
.e1521wpn2:last-of-type { border-bottom: 1px dashed }
/* e1521wpn0 = div 10x10 */
.e1521wpn0 { position: absolute; height: 10px; width: 10px; background: rgb(79, 79, 79); top: -6px; left: -6px }
/* e1521wpn0--v2 = div 10x10 */
.e1521wpn0--v2 { position: absolute; height: 10px; width: 10px; background: rgb(79, 79, 79); top: -6px; right: -6px }
/* e1521wpn0--v3 = div 10x10 */
.e1521wpn0--v3 { position: absolute; height: 10px; width: 10px; background: rgb(79, 79, 79); bottom: -6px; right: -6px }
/* e1521wpn0--v4 = div 10x10 */
.e1521wpn0--v4 { position: absolute; height: 10px; width: 10px; background: rgb(79, 79, 79); left: -6px; bottom: -6px }
@keyframes animation-1crwsso { 24% { background-color: rgba(255, 255, 255, 0); } 94% { background-color: rgba(255, 68, 0, 0.16); } }
@keyframes animation-c4nyx3 { 16% { background-color: rgba(255, 255, 255, 0); } 86% { background-color: rgba(255, 68, 0, 0.32); } }
@keyframes animation-1fa58hf { 8% { background-color: rgba(255, 255, 255, 0); } 78% { background-color: rgba(255, 68, 0, 0.48); } }
```

## 4. Integrations (`e1jvfgez*` + FeatureCardGrid `e1rt7vde*`)
- SectionImageBackgroundContainer: overflow-x clip. The background image `Frame_1948762751.png` (3456x1408) is absolute at the top, full width (1440x587), z 0, and hidden at ≤799 (no mobile image). Content is `padding:96px 0 0`, z 1.
- SliceContainer > InnerGrid > Column `span 7` (tablet 8): BaseHeading H64 "Connected to your enterprise stack" (max 871), P20 "Enrich and activate customer intelligence where decisions happen.", and the two buttons.
- Spacer INNER_SECTION (96 / sm 56).
- FeatureCardGrid (same card styles as product Findings, §10 of `product.md`):
  - "CRM integrations": **horizontal-reverse**, full width, image `crm-integrations-horizontal-feature-card.png`, text max 380;
  - "APIs & MCP server": vertical, half, `apis-and-mcp-server-vertical-feature-card.png`, text max 336;
  - "SSO & admin controls": vertical, half, `sso-and-admin-controls-vertical-feature-card.png`, text max 354.

  Descriptions are verbatim in data (one sentence each, but over 140 chars, so placeholders).

```css
/* e1jvfgez0 = div 1440x1589 */
.e1jvfgez0 { overflow-x: clip; position: relative }
/* e1jvfgez4 = div 1440x1589 */
.e1jvfgez4 { padding: 96px 0px 0px; position: relative; z-index: 1 }
@media (max-width: 1280px) { .e1jvfgez4 { padding: 96px 0px 0px } }
/* e1rt7vde0 = div 1192x479 */
.e1rt7vde0 { align-items: center; justify-content: space-between; display: flex; flex-direction: row-reverse; background: rgb(20, 20, 20); border: 1px solid rgb(30, 30, 30); border-radius: 8px; overflow: hidden; gap: 0px }
@media (max-width: 799px) { .e1rt7vde0 { flex-direction: column; align-items: flex-start } }
/* e1rt7vde2 = div 724x477 */
.e1rt7vde2 { flex-grow: 7; max-width: 724px; position: relative }
@media (max-width: 799px) { .e1rt7vde2 { max-width: 100% } }
/* eiz8yhc0 = div 380x116 */
.eiz8yhc0 { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; flex-grow: 5; max-width: 380px; margin: 64px }
@media (max-width: 1512px) { .eiz8yhc0 { margin: 0px 0px 0px 64px } }
@media (max-width: 799px) { .eiz8yhc0 { margin: 0px 32px 32px; max-width: 100% } }
/* eiz8yhc1 = h3 «CRM integrations» 160x28 */
.eiz8yhc1 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .eiz8yhc1 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .eiz8yhc1 { font-size: 16px; line-height: 24px } }
/* eiz8yhc2 = p «Sync Salesforce, HubSpot, and other sour» 380x72 */
.eiz8yhc2 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); max-width: 380px }
@media (max-width: 1280px) { .eiz8yhc2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eiz8yhc2 { font-size: 16px; line-height: 24px } }
/* e1rt7vde0--v2 = div 580x618 */
.e1rt7vde0--v2 { align-items: flex-start; justify-content: flex-start; display: flex; flex-direction: column; background: linear-gradient(rgb(20, 20, 20) 60%, rgba(20, 20, 20, 0) 100%); border: 1px solid rgb(30, 30, 30); border-radius: 8px; overflow: hidden; gap: 0px }
@media (max-width: 799px) { .e1rt7vde0--v2 { flex-direction: column; align-items: flex-start } }
/* e1rt7vde2--v2 = div 578x436 */
.e1rt7vde2--v2 { flex-grow: 1; max-width: 100%; position: relative }
@media (max-width: 799px) { .e1rt7vde2--v2 { max-width: 100% } }
/* eiz8yhc0--v2 = div 336x116 */
.eiz8yhc0--v2 { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; flex-grow: 1; max-width: 336px; margin: 0px 0px 64px 64px }
@media (max-width: 1512px) { .eiz8yhc0--v2 { margin: 0px 0px 64px 64px } }
@media (max-width: 799px) { .eiz8yhc0--v2 { margin: 0px 32px 32px; max-width: 100% } }
/* eiz8yhc2--v2 = p «Build custom workflows with open APIs, o» 336x72 */
.eiz8yhc2--v2 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); max-width: 336px }
@media (max-width: 1280px) { .eiz8yhc2--v2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eiz8yhc2--v2 { font-size: 16px; line-height: 24px } }
/* eiz8yhc0--v3 = div 354x116 */
.eiz8yhc0--v3 { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; flex-grow: 1; max-width: 354px; margin: 0px 0px 64px 64px }
@media (max-width: 1512px) { .eiz8yhc0--v3 { margin: 0px 0px 64px 64px } }
@media (max-width: 799px) { .eiz8yhc0--v3 { margin: 0px 32px 32px; max-width: 100% } }
/* eiz8yhc2--v3 = p «Manage roles, permissions, and authentic» 354x72 */
.eiz8yhc2--v3 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); max-width: 354px }
@media (max-width: 1280px) { .eiz8yhc2--v3 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eiz8yhc2--v3 { font-size: 16px; line-height: 24px } }
/* e1jvfgez2 = img 1440x586 */
.e1jvfgez2 { bottom: unset; position: absolute; top: 0px; left: 0px; right: 0px; margin: unset; z-index: 0; pointer-events: none; display: block }
@media (max-width: 799px) { .e1jvfgez2 { display: none } }
/* e1jvfgez3 = img 0x0 */
.e1jvfgez3 { bottom: unset; position: absolute; top: 0px; left: 0px; right: 0px; margin: unset; z-index: 0; pointer-events: none; display: none }
@media (max-width: 799px) { .e1jvfgez3 { display: block } }
/* e1jvfgez4--v2 = div 1440x1107 */
.e1jvfgez4--v2 { padding: 120px 0px 0px; margin: -120px 0px 0px; position: relative; z-index: 1 }
@media (max-width: 1280px) { .e1jvfgez4--v2 { padding: 120px 0px 0px } }
```

## 5. SecurityAndCompliance (`e10uz04f*`, `e1u51w9m*`), inside PixelTransition▼
- SectionImageBackgroundContainer with bg image `Frame_1948762767.png` (3024x1060, 1440x505 at top), `margin:-120px 0 0; padding:120px 0 0`.
- SliceGrid (row-gap 0) > Column span 12 > FlexRow (wrap, gap 0) with an `::after` 1px `#454545` border, radius 8 (the outer frame).
- 6 cells (`flex-basis:33.33%`; md 50%; sm 100%):
  - bg `#141414`, pad 40 (md 32), flex column, gap 32;
  - inner dividers: `border-right:1px solid #454545` on columns 1–2, `border-top` on row 2 (md and sm patterns in the CSS);
  - a **pictogram** SVG (252x252, centred, strokes `#626262`; files `svg/e1u51w9m3-*.svg`), then h3 **H18** (mb 4) and P16 `#A7A7A7`.
- Cells: "Data residency & retention", "Granular access controls", "SOC 2 Type II certified" (its text includes a "report" link → `trust.dovetail.com/...`), "PII redaction & audit logs", "ISO/IEC 42001:2023", "HIPAA".

```css
/* e10uz04f0 = div 1192x987 */
.e10uz04f0 { display: flex; gap: 0px; justify-content: center; flex-wrap: wrap; margin: auto; position: relative }
.e10uz04f0::after { border-radius: 8px; inset: 0px; content: ""; display: block; height: 100%; pointer-events: none; position: absolute; width: 100%; border: 1px solid rgb(69, 69, 69) }
@media (max-width: 1280px) { .e10uz04f0 { gap: 0px } }
/* e1u51w9m2 = div 397x493 */
.e1u51w9m2 { display: flex; flex-direction: column; gap: 32px; padding: 40px; background: rgb(20, 20, 20); border-right: 1px solid rgb(69, 69, 69); border-top: unset; box-sizing: border-box; flex-basis: 33.33% }
.e1u51w9m2 svg { width: 100% }
@media (max-width: 1280px) { .e1u51w9m2 { padding: 32px } .e1u51w9m2 { border-right: 1px solid rgb(69, 69, 69); border-top: unset; flex-basis: 50% } }
@media (max-width: 799px) { .e1u51w9m2 { border-right: unset; border-top: unset; flex-basis: 100% } }
/* e1u51w9m3 = div 253x257 */
.e1u51w9m3 { color: rgb(167, 167, 167); margin: auto }
/* e1u51w9m0 = h3 «Data residency & retention» 316x24 */
.e1u51w9m0 { font-family: $sans; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.25px; margin-bottom: 4px }
@media (max-width: 1280px) { .e1u51w9m0 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1u51w9m0 { font-size: 16px; line-height: 24px } }
/* e1ml9unk1 = p «See more than double the return on your » 0x0 */
.e1ml9unk1 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e1ml9unk1 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1ml9unk1 { font-size: 16px; line-height: 24px } }
/* e1u51w9m2--v2 = div 397x493 */
.e1u51w9m2--v2 { display: flex; flex-direction: column; gap: 32px; padding: 40px; background: rgb(20, 20, 20); border-right: 1px solid rgb(69, 69, 69); border-top: unset; box-sizing: border-box; flex-basis: 33.33% }
.e1u51w9m2--v2 svg { width: 100% }
@media (max-width: 1280px) { .e1u51w9m2--v2 { padding: 32px } .e1u51w9m2--v2 { border-right: unset; border-top: unset; flex-basis: 50% } }
@media (max-width: 799px) { .e1u51w9m2--v2 { border-right: unset; border-top: 1px solid rgb(69, 69, 69); flex-basis: 100% } }
/* e1u51w9m2--v3 = div 397x493 */
.e1u51w9m2--v3 { display: flex; flex-direction: column; gap: 32px; padding: 40px; background: rgb(20, 20, 20); border-right: unset; border-top: unset; box-sizing: border-box; flex-basis: 33.33% }
.e1u51w9m2--v3 svg { width: 100% }
@media (max-width: 1280px) { .e1u51w9m2--v3 { padding: 32px } .e1u51w9m2--v3 { border-right: 1px solid rgb(69, 69, 69); border-top: 1px solid rgb(69, 69, 69); flex-basis: 50% } }
@media (max-width: 799px) { .e1u51w9m2--v3 { border-right: unset; border-top: 1px solid rgb(69, 69, 69); flex-basis: 100% } }
/* e1u51w9m2--v4 = div 397x494 */
.e1u51w9m2--v4 { display: flex; flex-direction: column; gap: 32px; padding: 40px; background: rgb(20, 20, 20); border-right: 1px solid rgb(69, 69, 69); border-top: 1px solid rgb(69, 69, 69); box-sizing: border-box; flex-basis: 33.33% }
.e1u51w9m2--v4 svg { width: 100% }
@media (max-width: 1280px) { .e1u51w9m2--v4 { padding: 32px } .e1u51w9m2--v4 { border-right: unset; border-top: 1px solid rgb(69, 69, 69); flex-basis: 50% } }
@media (max-width: 799px) { .e1u51w9m2--v4 { border-right: unset; border-top: 1px solid rgb(69, 69, 69); flex-basis: 100% } }
/* e1u51w9m2--v5 = div 397x494 */
.e1u51w9m2--v5 { display: flex; flex-direction: column; gap: 32px; padding: 40px; background: rgb(20, 20, 20); border-right: 1px solid rgb(69, 69, 69); border-top: 1px solid rgb(69, 69, 69); box-sizing: border-box; flex-basis: 33.33% }
.e1u51w9m2--v5 svg { width: 100% }
@media (max-width: 1280px) { .e1u51w9m2--v5 { padding: 32px } .e1u51w9m2--v5 { border-right: 1px solid rgb(69, 69, 69); border-top: 1px solid rgb(69, 69, 69); flex-basis: 50% } }
@media (max-width: 799px) { .e1u51w9m2--v5 { border-right: unset; border-top: 1px solid rgb(69, 69, 69); flex-basis: 100% } }
/* e1u51w9m2--v6 = div 397x494 */
.e1u51w9m2--v6 { display: flex; flex-direction: column; gap: 32px; padding: 40px; background: rgb(20, 20, 20); border-right: unset; border-top: 1px solid rgb(69, 69, 69); box-sizing: border-box; flex-basis: 33.33% }
.e1u51w9m2--v6 svg { width: 100% }
@media (max-width: 1280px) { .e1u51w9m2--v6 { padding: 32px } .e1u51w9m2--v6 { border-right: unset; border-top: 1px solid rgb(69, 69, 69); flex-basis: 50% } }
@media (max-width: 799px) { .e1u51w9m2--v6 { border-right: unset; border-top: 1px solid rgb(69, 69, 69); flex-basis: 100% } }
```

## 6. Resources for enterprise (`e183docx*`), inside PixelTransition▲
- Spacer SECTION (200 / 96), then the **list layout** (no thumbnails): SliceGrid (mobile row-gap 64).
- Left Column `span 4`: BaseHeading H64 "Resources for enterprise" (wraps to 3 lines at 376px), P20 "Everything you need to assess Dovetail for your organization.", and the buttons.
- Right Column `6 / span 7`: rows `.e183docx0` (`border-top:1px solid #454545; padding:40px 0`; the last also has a border-bottom). Each holds:
  - a link (flex) > h3 **H20** (flex, gap 8, mb 8) with a 24px download icon for downloadables or a trailing " ↗" for links;
  - P16 `#A7A7A7`.
- Rows: "Dovetail platform overview" (PDF), "Buyers guide" (PDF), "ROI report" (PDF), "API Docs" ↗ (`https://developers.dovetail.com`). The PDF hrefs are HubSpot file URLs, recorded in data.

```css
/* e183docx0 = div 682x167 */
.e183docx0 { border-top: 1px solid rgb(69, 69, 69); padding: 40px 0px }
.e183docx0:last-of-type { border-bottom: 1px solid rgb(69, 69, 69) }
/* e183docx3 = a «Dovetail platform overview» 682x38 */
.e183docx3 { align-items: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); display: flex; justify-content: flex-start }
.e183docx3:disabled { opacity: 0.6; pointer-events: none }
.e183docx3:hover, .e183docx3:focus-visible { color: rgb(167, 167, 167) }
/* e183docx1 = h3 «Dovetail platform overview» 284x28 */
.e183docx1 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; align-items: center; display: flex; gap: 8px; margin-bottom: 8px }
@media (max-width: 1280px) { .e183docx1 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e183docx1 { font-size: 16px; line-height: 24px } }
/* e1ml9unk1 = p «See more than double the return on your » 0x0 */
.e1ml9unk1 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e1ml9unk1 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1ml9unk1 { font-size: 16px; line-height: 24px } }
```

## 7. Motion summary
| Element | Trigger | Detail |
|---|---|---|
| Vertical tabs | in view → 40ms ticks | 4s/tab, hover preview pauses, image 300ms crossfade, rail fill grows |
| ROI hotspots | in view → 70ms ticks | 7s/stat, card opacity 300ms, pulse keyframes 1800ms infinite |
| ROI connector | ScrollTrigger top bottom-=100 (once) | stroke-dashoffset draw 1s power1.inOut |
| Logo marquee | always | GSAP 60s |
| Pixel bands, stories, testimonial | | shared |

## 8. Gaps
- The ≤1400 ROI layout values come from CSS. I didn't measure a 1400px viewport. 1280 is measured, and the table above shows the stacked variant there.
- I didn't verify the exact path geometry of the connector SVG visually. The saved SVG is the live markup.
