Source: https://dovetail.com/

# Dovetail homepage: clone spec

Recon was done on 2026-10-26 against the live site using Playwright: computed styles, bounding rects, the full emotion stylesheet dump, and the de-minified homepage JS chunks. Viewports measured were 1440x900, 1280x800, 768x1024 and 390x844. Assets are listed in `ASSETS.md`, and everything sits under `public/assets/` (served as `/assets/...`).

The live stack is Next.js 16.2.10 with Emotion CSS-in-JS. GSAP 3.11.3 (via `useGSAP`) is used **only** for the final CTA intro. Every other animation is either a CSS keyframe/transition or a hand-written `requestAnimationFrame` loop on a 2D `<canvas>` or SVG. The page has no Lenis, Framer Motion, ScrollTrigger usage, Lottie, WebGL or video.

Page order (top to bottom):
0. Announcement banner
1. Nav
2. Hero
3. "Build your customer context layer"
4. "Turn raw data into rich context"
5. "Put the customer in every prompt"
6. "Make your software self improving" (sticky globe)
7. "Govern customer context at scale"
8. "In their words, not ours" (marquee)
9. Final CTA "The best never guess"
10. Footer
11. Digital Twins modal (timed)

Every section background is `#0A0A0A`.

Total document height is 13,683px at 1440x900, 14,951 at 1280x800, 13,770 at 768x1024 and 12,720 at 390x844.

---

## 0. Global tokens

### 0.1 Breakpoints (exact media queries used by the original)

| Name | Query | What changes |
|---|---|---|
| xl-cap | `max-width: 1512px` | Final-CTA word size switches to vw-based |
| lg-mid | `min-width: 1281px and max-width: 1513px` | Final-CTA logos use `--hero-logo-size` (fallback 150px) |
| short-desktop | `min-width: 1281px and max-height: 800px` | Hero: `--hero-pad` 112px, H1 128/128, margin-top 16, fax width 150, logo-row margin-top 40 |
| **md** | `max-width: 1280px` | Main tablet tier. Container padding 64. Display type steps down. Topic tabs become carousels. Govern grid has 2 columns. Hero ratings move under the intro. **Note: 1280 exactly is md.** |
| nav-collapse | `max-width: 1185px` | Desktop nav links and right buttons hide, and the white "Menu" pill appears. Nav padding `0 64px` |
| loop-mobile | `max-width: 1023px` | Sticky globe hides and the loop becomes a horizontal carousel |
| **sm** | `max-width: 799px` | Mobile tier. Container padding 16 |
| xs | `max-width: 588px` | Final CTA scale 0.72 and margin tweaks |
| hover | `(hover: hover)` / `(hover: none)` | Marquee pauses on hover only with hover:hover. Stat-card pixel/download overlay is hidden on hover:none |

### 0.2 Container
- `.container`: `max-width:1512px; margin:0 auto; width:100%; padding:0 124px` (>1280), `0 64px` (≤1280), `0 16px` (≤799).
- Content width is 1192px at 1440, 1152 at 1280, 736 at 768 and 358 at 390. At ≥1512 it's 1264.

### 0.3 Colors (computed)

| Token | Value | Used for |
|---|---|---|
| bg | `#0A0A0A` rgb(10,10,10) | html background, every section, footer, nav dropdown footer card, CTA tooltip bg |
| text-strong | `#FAFAFA` rgb(250,250,250) | headings, most text |
| text-white | `#FFFFFF` | nav/banner text, body default `color`, final CTA words |
| text-muted | `rgba(255,255,255,0.64)` | body paragraphs, inactive tabs, rating labels, nav descriptions |
| text-dim | `#A7A7A7` rgb(167,167,167) | footer headings/meta, footer badges |
| chat-grey | `#B1B1B1` rgb(177,177,177) | hero chat placeholder/sources/"Stop" chip bg |
| blue (primary) | `#0044FF` rgb(0,68,255) | primary buttons, loop numbers, globe nodes, diagram nodes |
| blue-80 | `#0238CE` rgb(2,56,206) | quote cards, story hover overlay + pixel dissolve |
| surface-1 | `#121212` | stat card |
| surface-2 | `#191919` rgb(25,25,25) | hero chat window, modal, nav footer-card hover |
| surface-3 | `#1D1D1D` rgb(29,29,29) | nav dropdown panel |
| surface-4 | `#272727` rgb(39,39,39) | chat question bubble |
| pill-hover | `#2C2C2C` | diagram step pill hover/pressed |
| line | `#3B3B3B` | tab progress track, half-star fill |
| globe-line | `#626262` | globe wireframe, dashed outer ring |
| border-subtle | `rgba(255,255,255,0.08)` | cards, dropdown, story thumbs, quote cards |
| border-strong | `rgba(255,255,255,0.24)` | glass button border, chat tool chips |
| pill-border | `rgba(250,250,250,0.16)` | diagram pills |
| fill-08 | `rgba(255,255,255,0.08)` | ghost hover bg, badges, pill bg (`rgba(250,250,250,.08)`) |
| banner-bg | `rgba(255,255,255,0.16)` over #0A0A0A, which composites to about `#313131` | announcement banner |
| twin purple | `#A65CFF` (text/icon), `#5D00A1` (chip bg), `#9601FF` (glow blob, nav tile) | hero chat window |
| nav tile colors | Digital Twins `#9601FF`, Agents `#5D00A1`, Channels `#982500`, Docs `#99004F`, Chat/Projects `#0029A6`, Dashboards `#154C14` | 20x20 icon tiles in Product dropdown |
| overlay | `rgba(10,10,10,0.64)` | story thumbnail dim; `rgba(10,10,10,0.6)` modal backdrop |
| white-btn hover | `#CECECE` rgb(206,206,206) | nav "Book a demo" hover, modal CTA hover |

**Gradients**
- Hero screenshot fade (`section::after`): `linear-gradient(rgba(10,10,10,0) 0%, #0A0A0A 100%)`, width 100vw, centred, bottom 0, height 55%, z-index 0 (the image is z-index 1, so this sits behind the image and only fades the ASCII field around it).
- Final CTA top banner: `linear-gradient(0deg, rgba(0,0,0,0) 0%, #0A0A0A 100%)`, height 14vh, `inset:-88px 0 0`, z-index 1.
- Final CTA canvas mask: `mask-image: linear-gradient(transparent, black 25%, black 75%, transparent)`.
- Marquee edge mask: `mask-image: linear-gradient(to right, transparent, #000 140px, #000 calc(100% - 140px), transparent)` (40px at ≤799).
- Fax eyeball white: `radial-gradient(circle at 38% 32%, #FFF 0%, #F4F4F4 52%, #DCDCDC 74%, #B9B9B9 100%)`. Pupil: `radial-gradient(circle at 34% 30%, #5A5A5A 0%, #1A1A1A 38%, #000 100%)`.

### 0.4 Fonts
Declare these in global CSS (the files are in `public/assets/fonts/`):
```css
@font-face{font-family:Inter;font-weight:400;font-display:swap;src:url(/assets/fonts/inter-400.woff2) format("woff2")}
@font-face{font-family:Inter;font-weight:500;font-display:swap;src:url(/assets/fonts/Inter-Medium.woff2) format("woff2")}
@font-face{font-family:Inter;font-weight:600;font-display:swap;src:url(/assets/fonts/Inter-SemiBold.woff2) format("woff2")}
@font-face{font-family:"JetBrains Mono";font-display:swap;src:url(/assets/fonts/JetBrainsMono-Regular.woff2) format("woff2")}
@font-face{font-family:"PP Mondwest";font-weight:400;font-display:swap;src:url(/assets/fonts/PPMondwest-Regular.woff2) format("woff2")}
```
- Sans stack: `Inter, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, "Segoe UI", Roboto, sans-serif`
- Mono stack: `"JetBrains Mono", "SF Mono", Consolas, Roboto, sans-serif`
- Serif accent stack: `"PP Mondwest", Georgia, serif`
- Body globals: `color:#FFF; font-size:20px; -webkit-font-smoothing:antialiased; font-feature-settings:"liga"; margin:0`. `p` defaults to `font-size:20px; font-weight:400`. Set `h1–h6, p { margin:0; padding:0 }`, `a { color:inherit; text-decoration:none }`, `* { box-sizing:border-box }`.

### 0.5 Type scale (computed; size / line-height / weight / letter-spacing). Columns are >1280, ≤1280, ≤799

| Role | >1280 | ≤1280 | ≤799 |
|---|---|---|---|
| Hero H1 (Inter 600, #FAFAFA) | 160/140, ls -2.3px (short-desktop: 128/128) | 96/86, ls -1.5 | `max(48px, min(80px, 75vw/4.15))`, lh 0.9, ls -1 (80px @768, 70.48 @390) |
| Section H2 "H96" (Inter 600) | 96/100, ls -2px | 72/76, ls -2 | 48/52, ls -1 |
| Serif accent inside H2 (PP Mondwest 400) | 120px (Govern: 126px), inherits lh 100 | 90 (Govern 94) | 60 (Govern 63) |
| Stories H2 "H64" | 64/68 ls -2 | 48/52 ls -1 | 32/36 ls -0.25 |
| Final CTA words (Inter 600, #FFF) | `--hero-text-size` = `min(9.26vw,170px,(100vh-354px)/3.9)`; lh = size; ls -4px (≤1512: -0.01736vw) → 133.344px @1440x900 | `clamp(80px,10vw,170px)` (128 @1280), lh 0.9 | 80px, lh normal, ls -2 (then scaled 0.82 / 0.72) |
| Modal H2 | 48/56 ls -1 | 32/40 ls -0.25 | 24/32 ls -0.25 |
| Loop step title | 32/40 w600 ls -1 | same | 20/28 |
| Nav promo heading | 40px w600 lh 1.05 ls -1.2 | | |
| P24 (section intros) | 24/32 w400 ls -0.25 (centred intros: -0.5) | 16/24 ls normal | 16/24 |
| Topic tab label / carousel h3 | 24/32 w500 ls -0.25 | 24/32 | 20/28 |
| Quote card text | 24/32 w500 ls -0.5 | 20/28 ls -0.25 | 18/24 ls -0.25 |
| Diagram active title | 24/32 w500 | | |
| P20 (hero intro, loop bodies, diagram desc, modal) | 20/28 w400 ls -0.25 | 16/24 | 16/24 |
| H20 (govern card title) | 20/24 w600 | | |
| Story card title / overlay quote | 20/28 w500 ls -0.25 | 20/28 | 16/24 |
| P16 body | 16/24 w400 | | |
| Link-16 ("Explore …") | 16/24 w600 #FAFAFA | | |
| Name | 16/24 w500 | | |
| Footer link | 16/24 w500 #FFF | | |
| Nav dropdown item title | 16/24 w500 | | |
| Role / meta | 14/16 w400 | | |
| Stat desc | 14/20 w400 muted | | |
| Nav dropdown desc | 14/22 w400 muted | | |
| Button (all) | 14/18 w600 (modal & glass md: also 600; base Button: 500) | 14/16 | 14/16 |
| Button lg (final CTA) | 18/24 w600 ls -0.25 | 16/24 | 14/16 (pad 12 16) |
| Mono M14 (diagram pills, footer headings) | 14px, lh 20px (pills) / 140% (footer), ls 1px, uppercase | | |
| Mono M12 (banner, ratings labels, eyebrows, badges, tooltip, footer meta) | 12/12, ls 1px, uppercase | | |
| Stat number (PP Mondwest) | 96/96 | | 74/74 |
| Loop step number (PP Mondwest, #0044FF) | 24/24, ls -1 | | |
| Hero intro serif lead (PP Mondwest, #FAFAFA) | 25px | 20px | 20px |

### 0.6 Radii, shadows, blur
- Radius 8px: buttons, cards, dropdown panel, images, chat window (scaled), story thumbs, CTA logo tiles. Radius 4px: badges, icon tiles, avatars, tooltip, modal close. 50% for the Canva CTA logo and the eyeballs.
- Shadows: only the fax eyeballs use one (`0 2px 4px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.8)`). Chat window outline is `inset 0 0 0 calc(var(--u)*1) rgba(250,250,250,.16)` on `::after`.
- Backdrop filters: nav dropdown `blur(32px)`, glass button `blur(16px)`, diagram pills `blur(12px)`. Diagram centre mask uses `filter: blur(32px)`.

### 0.7 Buttons (all `display:inline-flex; align-items:center; justify-content:center; border-radius:8px; white-space:nowrap`)

| Variant | Where | Style | Hover |
|---|---|---|---|
| Primary blue md | "Book a demo" in sections | pad 12px 16px, 14/18 w600, bg #0044FF, color #FAFAFA, measured 119x42 | `opacity:.85`, `transition: opacity 150ms` |
| Glass md | "Start free trial" in sections | border 1px rgba(255,255,255,.24), pad 11px 15px, 14/18 w600, color #FFF, bg `rgba(30,30,30,.85)` (`color-mix(in srgb, rgb(30,30,30) 85%, transparent)`), `backdrop-filter: blur(16px)`, measured 125x42 | bg `color-mix(in srgb, rgb(30,30,30) 85%, white 15%)` (about rgb(64,64,64)); `transition: color 200ms, background 200ms, opacity 200ms` |
| Primary lg / Glass lg | Final CTA | pad 16px 24px / 15px 23px, 18/24 w600 ls -0.25 → 158x56 and 164x56 | same as md |
| Nav white | Nav "Book a demo" | pad 10px 16px, 14/18 w600, bg #FFF, color #0A0A0A, 121x40 | bg #CECECE, transition 300ms (all) |
| Nav ghost | Nav links, "Log in" | pad 10px 16px, 14/18 w600, transparent | bg rgba(255,255,255,.08), transition 300ms |
| Light | "See all stories" | pad 12px 16px, bg #FAFAFA, color #0A0A0A, 14/18 w600 | opacity .85, 150ms |
| Section CTA row | Every section intro | `display:flex; flex-wrap:wrap; gap:8px` (Book a demo + Start free trial) | |

`transition` with no easing means CSS default `ease`. The original button `> span` arrow uses `transform 150ms cubic-bezier(.2,.6,.6,1)` (no arrow spans appear on the homepage).

---

## Shared component A: ASCII field canvas ("QuoteAsciiBackground")

This is used in four places: hero background (1440x1440 at 1440), both blue quote cards, and the final CTA background. It's `position:absolute; inset:0; z-index:0; overflow:hidden; pointer-events:none`, with `canvas{display:block;width:100%;height:100%}`. Mouse listeners are attached to the wrapper's **parent** (the section or card). Reproduce this logic exactly (defaults are used everywhere):

```js
const GLYPHS=["0","1","0","1","2","+","=","-",".",":","/","*","<",">","|","%"];
const opts={hoverReveal:.8,hoverMax:.18,pushStrength:16,hoverRadius:230,baseMin:.08,baseMax:.24,rgb:"255, 255, 255"};
// cell = 15px; cols=ceil(w/15), rows=ceil(h/15); DPR capped at 2
// per cell: glyph=random index, thr=Math.random(), offsetX/Y, velX/Y = 0
// alpha LUT: 101 entries "rgba(rgb, i/100)"
draw(t):  ctx.font="11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"; textAlign=center; textBaseline=middle
  s = reducedMotion ? 0 : 0.0011*t
  for each cell (r,c): x=15c+7.5, y=15r+7.5, u=c/cols, v=r/rows
    U=u+.06*sin(4v+.6s); V=v+.06*sin(4u-.5s)
    I=(sin(6U+1.1s)+sin(5V-.9s)+sin((U+V)*4.5+.75s)+sin(10*hypot(U-.5,V-.55)-1.3s)+4)/8
    T = mouse.active && d<230 ? (1-d/230)^2 : 0          // d = dist(cell, mouse)
    E = .9*I + ((1-u)*.25 + .25*v) + T*.8               // brighter toward left & bottom
    D = .62 + thr*.4;  if (E<D) skip
    alpha = min(.95, .08 + min(1,(E-D)/.45)*(.24-.08) + T*.18)
    fillStyle = LUT[round(alpha*100)]; fillText(glyph, x+offX, y+offY)
tick (rAF, but only every 33.33ms ≈ 30fps):
  spring per cell: target push = mouse within 230px ? unit(cell-mouse) * (1-d/230)^2 * 16 : 0
    vel += .18*(target-offset) - .45*vel ; offset += vel
  re-randomise max(1, floor(.004*cells)) random glyphs per tick
  draw(t)
Run only while IntersectionObserver says visible AND document is visible. ResizeObserver rebuilds the grid.
mousemove on parent: mouse={x,y relative to canvas, active:true}; mouseleave: active=false.
```

## Shared component B: PixelDissolve canvas

This is used on the stat cards (colour `#0A0A0A`) and the story thumbnails (colour `#0238CE`). It's `position:absolute; inset:0; width/height:100%; z-index:2; pointer-events:none`.

```js
// grid of 16px squares covering parent; order = Fisher–Yates shuffle of all cell indices (re-shuffled on resize)
// progress p animates toward target (active?1:0) linearly over 300ms via rAF: p = p0 + (target-p0)*min(1,(now-start)/300)
// draw: clearRect; fillStyle=color; fill first round(p*cells) cells of the shuffled order: fillRect(i%cols*16, floor(i/cols)*16, 16, 16)
```

## Shared component C: cursor Tooltip ("Read customer story")

Rendered in a portal to `body`: `position:fixed; top:0; left:0; z-index:4; display:flex; opacity:0; pointer-events:none; transition: opacity 150ms`, hidden at ≤799. It has its own `mousemove` listener while active that sets `transform: translate3d(x+16px, y+16px, 0)`. It flips to the left/top side (`x-16-width`, `y-16-height`) if it would overflow the viewport, and sets opacity 1 on first move; on deactivate opacity is 0.

The inner label is mono 12/12, ls 1, uppercase, `#FAFAFA` on `#0A0A0A`, pad 8px 10px, radius 4. It goes from `opacity:0; transform:translateY(6px)` to `opacity:1; translateY(0)` with `transition: opacity 260ms, transform 260ms` when `data-visible="true"`.

Used on hover of both quote cards and the story cards. Text: "Read customer story".

---

## 1. Announcement banner (top of page, not sticky)

- **Layout:** full-width flex, centred, `padding:4px 48px` → height **30px** (desktop). At ≤799 it's `padding:12px 24px` → **38px**. bg `rgba(255,255,255,.16)`. `overflow:hidden; position:relative`.
- **Link:** a single `<a href="/product/digital-twins/">` with flex gap 16, 451px wide at 1440, containing:
  - `3d-icon-digital-twin.png` 20x20
  - "Ask. Never guess." (mono 12/12 ls 1 uppercase, #FFF)
  - "Introducing Digital Twins →" (same style, opacity .64)
  - `3d-icon-digital-twin.png` 20x20

  At ≤799 the icons and "Ask. Never guess." hide, and the second label becomes `#FAFAFA` at opacity 1. Labels use `white-space:nowrap; text-overflow:ellipsis`.
- **Dismiss button** (`aria-label="Dismiss banner"`): absolute `right:24px; top:50%; translateY(-50%)`, pad 4, radius 8, 16x16 `svg/banner-dismiss-x.svg`. Hover: opacity .64 (200ms). It removes the banner.

## 2. Nav (`<nav aria-label="Main navigation">`)

- **Not sticky or fixed.** It's `position:relative; z-index:5` and scrolls away with the page. I verified there are no scroll-state changes (no background, blur or hide/show) at any scroll position. `transition:300ms` is declared but never triggered on the homepage.
- **Box:** height **88px**, `padding:24px` (≤1185: `0 64px`; ≤799: `0 16px`), flex, `justify-content:space-between`, align centre, transparent bg. The hero below pulls up under it with `margin-top:-88px`.
- **Logo:** `svg/nav-dovetail-logo.svg` (rendered 22x24, white) inside a 46x46 link (pad 10px 11px, radius 8), margin-right 8. Hover has no bg change.
- **Left links** (flex, gap 4, start x=78 at 1440): Product ▾, Solutions ▾, Resources ▾ (buttons), then Enterprise `/enterprise/`, Customers `/customers/`, Pricing `/pricing/`. Measured widths are 87/97/105/104/108/82 x40. Each dropdown trigger is wrapped in a `div` with `padding:0 8px; margin:0 -8px; position:relative`, which forms the hover bridge.
- **Right** (flex-end, gap 8): "Log in" (ghost, `/start/`, 75x40) and "Book a demo" (white, `/request-a-demo/`, 121x40). x=1212–1416 at 1440.
- **≤1185:** links and right group become `display:none`, and a white **"Menu"** pill (pad 10px 16px, 14/16 w600, bg #FFF, color #0A0A0A, radius 8, 72x38) appears at the right. It **navigates to `/menu/`**, a separate route that isn't specced here.

**Dropdowns** (open on CSS `:hover` of the wrapper; no JS)
- Positioner: `position:absolute; top:100%; left:0; z-index:6; opacity:0; visibility:hidden; pointer-events:none; transition: opacity 150ms, visibility 150ms`. On wrapper hover: `opacity:1; visibility:visible; pointer-events:auto`.
- Panel: `margin-top:8px; padding:16px; display:flex; flex-direction:column; gap:16px; background:#1D1D1D; backdrop-filter:blur(32px); border:1px solid rgba(255,255,255,.08); border-radius:8px`.
- Columns: `display:grid; grid-template-columns:repeat(3,1fr); gap:8px; min-width:552px`. Each column is flex-column gap 4.
- Column heading: mono 12/12 uppercase, pad `16px 16px 8px`, min-height 44 (may be empty).
- Item: `<a>` flex-column, gap 4, pad 12px 16px, min-width 272, radius 8, `transition:300ms`, hover bg `rgba(255,255,255,.08)`.
  - Title row: flex gap 8, containing an optional 20x20 icon tile (radius 4), the title (16/24 w500), and an optional badge (mono 12/12, bg rgba(255,255,255,.08), pad 4px 6px, radius 4, color .64).
  - Description: 14/22 muted, width 260 (Product) or 238 (others).
- **Product** (panel 1240x458 at 1440, left aligned to the trigger):
  - Columns: [Platform: Digital Twins (New, tile #9601FF) "Talk with a replica of your customer segments, built from real data"; Agents (#5D00A1) "Transform customer signals into intelligent, automated action"; Channels 2.0 (Beta, #982500) "Classify raw data into ideas and identify emerging issues"] · [no heading: Docs (#99004F) "Create shareable AI outputs to drive decisions and action"; Chat (#0029A6) "Get instant answers and discover anything across customer data"] · [no heading: Projects (#0029A6) "Automatic analysis to turn feedback into structured intelligence"; Dashboards (Beta, #154C14) "Visualize customer trends alongside key business metrics"].
  - Promo card on the right, 292x350, radius 8, overflow hidden, bg #0A0A0A. It holds `nav-digital-twins.webp` (absolute, cover, `object-position:center bottom`, `transition: transform 400ms`, **hover scale(1.04)**), an eyebrow "Introducing: Digital Twins" (mono 12, pad 16) at the top, and a heading "Ask.<br>Never guess." (40px w600 lh 1.05 ls -1.2, pad 16) at the bottom. Flex column space-between.
  - Footer card full width: "API and Integrations" (16/24 w500) + "Connect your stack end-to-end: data in, intelligence out" (14/22 muted). bg #0A0A0A, border rgba(255,255,255,.08), radius 8, pad 16px 24px, gap 8, hover bg #191919.
  - Icon SVGs: `svg/nav-icon-*.svg`.
- **Solutions** (866x384):
  - [Roles: Design "Surface real user signals to back every design decision"; Product Management "Prioritize with confidence using quantified customer evidence"; Research "Scale research impact and share insights across your org"]
  - [no heading: Customer Experience "Act on support tickets, NPS, and renewals before they escalate"; Sales & Customer Success "Win more deals and reduce churn with revenue intelligence"; Marketing "Build campaigns on real customer language, not assumptions"]
  - [Use cases: Voice of Customer "Connect every feedback channel into one intelligence layer"; Product Research "Ground prioritization and tradeoffs in customer evidence"; Research Repository "Turn studies and transcripts into shared customer intelligence"]
  - No icons.
- **Resources** (866x384):
  - [Resources: Blog "Breaking news, opinions, and product thinking from Dovetail"; Live demos "Learn the workflows and features that help teams move faster"]
  - [Help: Help center "Find answers to common product and workflow issues"; Academy "Learn best practices and sharpen your skills with guided training"; Changelog "See the latest releases, improvements, and updates"]
  - [Company: Events "Live and virtual events that connect the global Dovetail community"; Careers "Join a fast-growing team shaping the future of customer intelligence"]

## 3. Hero

**Outer** (`div`): bg #0A0A0A, `position:relative; overflow:hidden; margin-top:-88px; padding-top:var(--hero-pad)`. `--hero-pad` is 152px (≤799 and short-desktop: 112px). At 1440x900 it spans y 30→1470 (1440 tall).
- Layer 0: ASCII field canvas (component A) filling the whole outer box.

**Section 1** (`.container`, flex column, `justify-content:space-between`, z-index 1). It has `min-height: calc(100svh - var(--hero-top) - 64px)`, where JS sets `--hero-top` to the section's document top (182px at 1440, so min-height is 654). At ≤1280: `min-height:0; justify-content:flex-start`.

- **Top row** (flex, space-between, align start, gap 32; ≤1280: column, gap 40):
  - **Intro block** (flex column, gap 24, max-width 534, animated with `data-hero-text`, see Motion):
    - Paragraph P20 muted, `text-wrap:pretty`, 534 wide, **3 lines at 1440**, about 143 chars after the lead-in. It starts with the serif lead-in **"The Customer Context Layer"** (PP Mondwest 25px #FAFAFA, inline), then continues with roughly 143 chars of muted sans text about turning sales calls, support tickets and interviews into agent context. Use placeholder copy of the same length.
    - CTA row: "Book a demo" → `/request-a-demo/` (primary md) and "Start free trial" → `/auth/signup/` (glass md).
  - **Ratings** (flex, gap 48; ≤1280 gap 32; ≤799 hidden): three links, G2 / CAPTERRA / TRUSTRADIUS (`https://www.g2.com/products/dovetail-research-pty-ltd-dovetail`, `https://www.capterra.com.au/software/174077/dovetail`, `https://www.trustradius.com/products/dovetail-user-research`). Each is a flex column, gap 8, 104x40:
    - 5 stars, 18px each, gap 3: 4× `rating-star-full.svg` + 1× `rating-star-half.svg`.
    - Label in mono 12/12 uppercase, muted .64.
    - Hover: label → #FAFAFA (`transition: color 150ms`).
- **Bottom block** (flex column; ≤1280 margin-top 104; ≤799 margin-top 40):
  - **H1** (margin-top 40; ≤1280 32; ≤799 24), Inter 600 160/140 ls -2.3 #FAFAFA, `data-hero-text` fade. It has two flex rows (gap 32, align centre; ≤1280 gap 24; ≤799 gap 12):
    - Row 1: "Feed" · [fax] · "the"
    - Row 2: "facts" · "machine"

    At ≤799 the first-row "the" is hidden, a "the " is shown inline at the start of row 2, and row 2 becomes `display:block` (wraps).
  - **Fax inline image:** wrapper `--fax-w:188px` (short-desktop 150, ≤1280 113, ≤799 `calc(var(--hero-h1)*1.175)`), `height:0; position:relative; flex-shrink:0`. Inside, an absolute box `width:100%; aspect-ratio:188/200; transform:translate(4%,-55%)` holds `home-hero-fax.png`. Two eyeballs sit at `left:21.3%; top:34.3%` and `left:56.3%; top:37.7%`: each is `width:17%; aspect-ratio:1; translate(-50%,-50%); border-radius:50%` with the gradient and shadow from 0.3, and a pupil that is 47% wide, round, with the radial gradient and `will-change:transform`.
  - **Logo row** (margin-top 48; short-desktop 40; ≤1280 48; ≤799 32), flex gap 32 (≤1280 24), 10 slots `flex:1; display:flex; justify-content:center; transition:opacity 350ms; opacity:.72`. The SVGs are height 40, width auto (≤799 height 28).
    - At ≤1280 only the first 6 slots show.
    - At ≤799 it wraps: `gap:24px 16px`, each slot `flex:0 0 calc(25% - 12px)`, 8 slots shown.
    - Logos come from `svg/hero-logo-*.svg`. The initial order is Amazon, Toyota, Canva, Ford, Notion, Salesforce, Dyson, Milwaukee, Shopify, Wise (the cycle continues with Mercedes-Benz, Volvo, KPMG, McKinsey & Company, Walgreens, AWS, Qantas).

**Section 2: screenshot** (`.container`, margin-top 96; ≤1280 72; ≤799 48; z-index 1). It has an `::after` fade (see 0.3).
- Inner box: `position:relative; z-index:1; container-type:inline-size`.
- `<picture>`: `<source media="(max-width: 799px)" srcset="/assets/hero-image-bg-mobile.png">` + `<img src="/assets/hero-image-bg.png" alt="Dovetail product screenshot" width=2528 height=1140>`, `display:block; width:100%; height:auto`. Rendered 1192x538 at 1440.
- **Hero chat window** (absolute, over the screenshot's right panel):
  - Base unit `--u: calc(100cqw / 1264)`. Positioned at `left: 877u; top: 114u; width: 387u; height: 456u`, radius 8u, bg #191919, Inter 500 14u/24u, white, z-index 2, `pointer-events:none`. `::after` adds the inset 1u outline rgba(250,250,250,.16).
  - At 1440 that measures 365x430 at (951,1040). At ≤799: `--u: calc(100cqw/588); left:0`.
  - **Header** (pad 16u, flex space-between): twin icon (24u, #A65CFF) + twin name (16u, #A65CFF), and 3 icon buttons (32u boxes, 24u icons #F4F4F4: menu, history, close).
  - **Body** (pad `8u 16u 24u`, flex column, gap 24u):
    - Question bubble, right aligned with 48u left padding: pad 11u, border 1u rgba(244,244,244,.32), radius 8u, bg #272727, color #F4F4F4.
    - Answer block: pad `11u 0 11u 11u`, one word-span per word, then a sources line (12u/16u, #B1B1B1, margin-top 16u).
  - **Composer** (absolute, top 312u, height 144u): purple glow blob `svg/chat-glow.svg` (451x212.861u at top -53.86u) behind a composer box (inset 16u, pad 16u). The box has pad 11u, border 1u rgba(255,255,255,.28), radius 8u, bg #191919. It shows the placeholder "Chat with {twin}" (#B1B1B1) above a toolbar:
    - Left: plus chip (24u, border rgba(255,255,255,.24), radius 8u).
    - Right group, gap 8u: sliders chip; agent chip (bg #5D00A1, border/icon #A65CFF); square chip; sparkle chip; and a "Stop" pill (bg #B1B1B1, color #0A0A0A, 12u/16u, pad 4u, radius 8u, stop-square icon).
  - Conversations, which cycle (copy is verbatim because the typing timing depends on word lengths):
    1. **Customer Success Twin**: Q "Which accounts are at risk this quarter?" A lines: "Corvel Health. Their champion left in" / "August, and the new stakeholder has asked" / "about cost per seat on every call since. Get" / "their VP Product in the room before renewal." Sources: "5 sources from Sales calls and Customer success"
    2. **Churned Customer Twin**: Q "Why did you really leave?" A: "It wasn’t price. Nobody outside our research" / "team ever logged in, so when budget review" / "came, no one could explain what we’d lose." Sources: "7 sources from Exit interviews and Sales calls"
    3. **Product Expert Twin**: Q "Would you use automated tagging?" A: "Only if I can approve it. I’ve spent two years" / "building tags my team trusts. Suggest them," / "show me why, and let me accept them in bulk." Sources: "6 sources from Continuous research and Support"
    4. **Sales Expert Twin**: Q "How do we win against Fieldnote?" A: "Don’t compete on research features. We win" / "when Sales and Support join the first" / "demo—Fieldnote can’t show value outside" / "research. Bring a second team in early." Sources: "9 sources from Sales calls, Support, and Win-loss"

### Hero motion
- **Entrance:** elements with `[data-hero-text]` (the intro block and the H1) use `opacity:0; animation: hero-fade-in 150ms ease-out 300ms both` (0→1 opacity only, no translate). Nothing else animates in.
- **Eyeballs follow the pointer** (only if `(hover:hover)` and no reduced motion):
  - On window `pointermove`: for each eye, compute the vector from the eye centre to the pointer; `k = min(1, dist/240)`; target = unit vector × k.
  - Every rAF: `cur += (target-cur)*.25`; set the pupil `transform: translate(${42*cur.x}%, ${42*cur.y}%)`. Stop rAF once the delta is < .002.
  - Rest position before any move is `(x .2, y .25)`, i.e. `translate(8.4%, 10.5%)`.
- **Logo cycler:** every **2200ms**, replace slot `a % 10` (a = 0,1,2…) with the next logo from the 17-item list that isn't already displayed. The slot fades out (`opacity:0`, CSS `transition: opacity 350ms`), swaps after **350ms**, then fades back in to .72.
- **Chat window:** it starts when the window is first ≥40% visible (`IntersectionObserver threshold .4` sets `data-playing`, which switches `--play` from `paused` to `running` for all its CSS animations). Timers only advance while it is intersecting. Per conversation:
  - Question bubble: `opacity 0, translateY(8u)` → `1, 0` over 450ms ease-out, 250ms delay.
  - Answer container: fade in 350ms ease-out, 1150ms delay.
  - Each word: `color rgba(255,255,255,.33)` → `#FFF` over 140ms ease-out at delay `--d`. Word delays start at 1750ms, and each word adds `an(w) = 70 + 20*letters + (endsWith(',')?100:0) + (endsWith('.')?170:0) + (includes('—')?80:0)` ms.
  - A caret (`::after`, 0.5u wide × 16u, white, left = 100% + 1u) is shown during each word (`opacity 1` for `--caret` = gap to the next word). The last word blinks with steps `0–24% 1, 25–49% 0, 50–74% 1, 75–100% 0` over 1800ms.
  - Sources line: fade 350ms at last-word end + 250ms.
  - Glow blob: fades in 1200ms at 850ms delay, then "talks" with `animation-1rdja6t` (keyframes: 0/100% none op1; 18% `translateX(-3%) scale(1.06,1.22)`; 40% `translateX(2%) scale(.97,.9)` op .8; 62% `translateX(-1%) scale(1.04,1.15)`; 82% `translateX(3%) scale(.98,.95)` op .85), ease-in-out, alternate, starting at 1750ms. `--talk-count = max(1, round((end-1750)/800))` and `--talk-cycle = (end-1750)/count` ms (about 776ms × 7 for convo 1).
  - Total duration = end + 2600ms. Then `data-leaving` fades the title, body and placeholder to opacity 0 over 400ms, and after 400ms the next conversation (index+1 mod 4) re-mounts.
  - Reduced motion: no animation.

### Hero breakpoints (measured)
- **1280:** padding 0 64. Top row is stacked (intro, then ratings at y 358). H1 96/86 at y 534. Logo row is 6 logos, each 172 wide. Screenshot is 1152x519 starting at y 866. Chat window 353x416.
- **768:** hero pad-top 112. Intro is 16/24. Ratings hidden. H1 80px/72. Logos 4 per row × 2, 28 tall. The mobile screenshot is 736x713 and the chat window 484x571 at left 0.
- **390:** H1 70.48/63.43, 3 lines. Fax 83 wide. Logos 4×2 (78 wide each). Screenshot 358x347. Chat 236x278.

---

## 4. "Build your customer context layer" (context topics)

**Outer:** pad `160px 0 120px` (≤1280 `96 0 96`; ≤799 `108 0 48`). The `.container` is a flex column, gap 64 (≤1280 24). At 1440 it spans y 1470→2984.

- **H2** (H96, 1192 wide, 2 rows of 100px). Each row is a `display:flex; align-items:center; flex-wrap:wrap; column-gap:16px` (≤799 8px) div:
  - Row 1: "Build your" + serif "customer" (PP Mondwest 120)
  - Row 2: "context" + `home-context-magnifier.png` + "layer"

  The image is `height:128px; width:auto; margin:-14px -86px -14px -3px; position:relative; z-index:0` (≤1280: 96px, margin `-10px -64px -10px -3px`; ≤799: 64px, `-6px -43px -6px -2px`). Text spans are z-index 1, so the image tucks behind "layer".
- **Topics row** (flex, space-between, gap 140; ≤1280 becomes block):
  - **Left column**, width 510, flex column, space-between, gap 64:
    - Intro block (gap 24): P24 #FAFAFA, 4 lines, about 165 chars (placeholder), followed by the CTA row.
    - Tab list (`role=tablist`, vertical, flex column, gap 24; hidden ≤1280). Four `button role=tab`s at 24/32 w500 ls -0.25, color muted .64, active/hover #FAFAFA, `transition: color 150ms`, flex column, gap 24:
      1. "Turn every customer interaction into context"
      2. "Stop paying to process the same data twice"
      3. "Bring customer context into your AI tools"
      4. "Integrate Dovetail into your existing stack"

      The active tab also renders a progress track under its text: 1px tall, full width, `#3B3B3B`, containing a fill bar (`#FAFAFA`, `transform-origin:left`, `scaleX 0→1`, linear, **6000ms**, `animation-fill-mode:forwards`). The active tab is 57px tall (32 + 24 + 1); the others are 32.
  - **Right column**, width 616 (renders 542 at 1440), flex column, gap 32 (hidden ≤1280):
    - Image stack: `display:grid; border-radius:8px; overflow:hidden; aspect-ratio:616/400` (542x352). All 4 images sit in `grid-area:1/1`, `object-fit:cover`, `opacity:0; transition: opacity 300ms`, with the active one at opacity 1. Images: `home-context-integrations.png`, `home-context-ai.png`, `home-context-mcp.png`, `home-context-api.png`.
    - Panel stack (grid, all panels in `grid-area:1/1`, `transition: opacity 150ms`, inactive `opacity:0; visibility:hidden`). Each panel is a flex column, gap 16:
      - Description P16 muted, max-width 568. Lengths: 210ch/4 lines, 188/3, 191/3, 193/3 (placeholder).
      - Link (16/24 w600 #FAFAFA, underline `::after` at bottom 1px, 1px #FAFAFA, `scaleX(0)` → hover `scaleX(1)`, `transform 200ms ease-out`, origin left): "Explore integrations" → `https://docs.dovetail.com/integrations/` (new tab), "Explore Dovetail AI", "Explore MCP connectors", "Explore API and CLI".
- **≤1280 carousel** (replaces the tabs and right column): `display:grid; grid-auto-flow:column; grid-auto-columns:88%` (≤799 85%), gap 32, `overflow-x:auto; scroll-snap-type:x mandatory; overscroll-behavior-x:contain; scrollbar hidden`, `margin-inline:-gutter; padding-inline:gutter; scroll-padding-inline:gutter` (gutter 64 / 16), margin-top 24. Each item is `scroll-snap-align:start`, flex column, gap 32:
  - Image box (aspect 616/400, radius 8)
  - Text block (flex column, gap 16): h3 at the topic-tab style (24/32 w500; ≤799 20/28), then description, then link.
- **Proof row** (margin-top 56; ≤1280 column, margin-top 24; ≤799 40; flex, gap 32, align stretch). At 1440: y 2533, height 330.
  - **Quote card** (`<a href="/customers/itau-unibanco/">`, flex 1, 760x330):
    - Box: pad 48 (≤799 32), flex column, space-between, gap 64 (≤799 40), bg #0238CE, border 1px rgba(255,255,255,.08), radius 8, overflow hidden. ASCII field (component A) behind it.
    - Quote text: 24/32 w500 ls -0.5 #FAFAFA, max-width 700, z-index 1, 4 lines, about 215 chars incl. curly quotes (placeholder).
    - Bottom row (flex, space-between, gap 16):
      - Left (gap 16): avatar `home-punch-avatar-renato.png` 40x40 radius 4; name "Renato Leite" (16/24 w500); role "Head of Research Ops, Itaú Unibanco" (14/16 w400 #FAFAFA).
      - Right (hidden ≤799): logo crop box 40x40, `overflow:hidden; position:relative`, containing `white-logo.svg` absolute at top -3.99px, left 0, 106.67x48.
    - Hover shows the Tooltip (component C).
  - **Stat card** (`<a href="/resources/industry-reports/2025-forrester-TEI-of-Dovetail/">`, `flex:0 0 400px`; ≤1280 `flex:1 1 auto`):
    - Box: bg #121212, border rgba(255,255,255,.08), radius 8, overflow hidden.
    - Content (pad 48, ≤799 32; flex column, space-between, gap 40):
      - Top row (flex, gap 8): `svg/forrester-mark.svg` 32x39 with margin-top 16, then "30hrs" (PP Mondwest 96/96 #FAFAFA; ≤799 74).
      - Bottom (gap 4): "Weekly time saved per user" (16/24 w500) and "A full workweek back, every week. Powered by AI analysis." (14/20 muted, max-width 283).
    - PixelDissolve canvas (component B, colour #0A0A0A).
    - Download overlay: absolute inset 0, pad 48, flex column, centred, gap 10, z-index 3, `opacity:0`. It holds `svg/icon-download.svg` (32px, stroke-width 1.33) and "Download the Forrester Total Economic Impact™ Study" (16/24 w500 centred, max-width 280).

### Section 4 motion
- **Tabs auto-advance:** when the progress bar's `animationend` fires, the section advances to the next tab (wrapping). The bar is paused (`animation-play-state:paused` via `data-paused`) while:
  - the pointer is over the tablist,
  - focus is within the tablist, or
  - the topics block is not intersecting (`IntersectionObserver threshold .3`).

  Clicking a tab selects it immediately and the bar restarts (it's keyed by index). Keyboard: Arrow keys ±1, Home, End.
- **Stat card hover:** PixelDissolve fills black over 300ms, then the download overlay transitions to `opacity:1` with `transition: opacity 400ms 300ms`. On `(hover:none)` the canvas and overlay are `display:none`.
- **Quote card hover:** Tooltip only.

---

## 5. "Turn raw data into rich context" (multimodal diagram)

**Outer:** pad `120px 0` (≤1280 96; ≤799 `55 0 45`), `overflow:hidden`. The `.container` is a flex column, centred, gap 96 (≤1280 64; ≤799 40). At 1440: y 2983→4309.

- **Header** (flex column, centred, gap 32, text-align centre; ≤799 left aligned):
  - H2 H96, max-width 871: "Turn raw [img] data into **rich context**", where "rich context" is the PP Mondwest 120 serif. 2 lines at 1440.
  - Inline image wrapper: `display:inline-block; vertical-align:middle; width:151px; height:0; position:relative; z-index:1; line-height:0; font-size:0` (≤1280 113; ≤799 75). The img inside is absolute, `top:50%; left:50%; height:120px` (≤1280 90; ≤799 60), `transform:translate(-48%, calc(-56% - 4px))`, `object-fit:contain`, using `home-diagram-raw-data.png`.
  - Paragraph P24 #FAFAFA, ls -0.5, max-width 823, centred, 3 lines, about 189 chars (placeholder).
  - CTA row, centred.
- **Diagram** (hidden ≤799): wrapper `width:100%; max-width:1280px; aspect-ratio:1280/630`. The inner stage is 1280x630, `position:absolute; top:0; left:0; transform-origin:0 0; transform:scale(containerWidth/1280)` (0.93125 at 1440 → 1192x587; 0.9 at 1280), `opacity:0` → `1` once measured (`data-ready`, `transition: opacity 400ms`). Inside the stage, in diagram units:
  - **SVG** (viewBox 0 0 1280 630, `position:absolute; inset:0; overflow:visible`) with 3 ellipses (`fill:none; stroke:rgba(250,250,250,.24); stroke-width:1; stroke-dasharray:4 4`):
    - `cx 639.29, cy 322.27, rx 602.52, ry 250, rotate(-15)`
    - `cx 654.95, cy 318, rx 476, ry 191, rotate(15)`
    - `cx 638.53, cy 325.66, rx 414.1, ry 164.15, rotate(-25.01)`

    It also holds 96 node rects (6x6, x/y -3, fill #0044FF) placed on the ellipses (see motion).
  - **Centre mask** (behind the centre content): absolute `left: 632.5-553/2; top: 326.5-479/2; width 553; height 479`, `border-radius:50%; background:#0A0A0A; filter:blur(32px); transition: transform 400ms`. It hides the orbit lines in the middle.
  - **Centre group** (`transition: opacity 250ms`, `opacity:0` while a step is active):
    - `home-diagram-glow.svg` at left 429, top 111, size 417.94x389.15
    - `home-diagram-database.png` at left 515, top 183, size 240x240
    - Caption "MULTIMODAL DATA PROCESSING" (mono 12, lh 16, #FAFAFA, centred, width 154) at left 565, top 423
  - **Active-step copy:** grid at left 440, top 241, width 400. Each item is a flex column, centred, gap 8, `opacity:0; translateY(6px)`, going to `opacity 1, translateY 0` over 250ms (transition on opacity and transform). Title: 24/32 w500 #FAFAFA (OCR shows "Optical Character Recognition"). Description: 20/28 muted ls -0.25. Descriptions are 104–124 chars, 3 lines each (placeholder).
  - **10 step pills** (`<button>`, absolute):
    - Style: mono 14/20 ls 1 uppercase #FAFAFA, height 34, pad 10, gap 8, border 1px rgba(250,250,250,.16), radius 8, bg rgba(250,250,250,.08), `backdrop-filter:blur(12px)`, z-index 1. Hover/focus/pressed: bg #2C2C2C (`transition: background-color 150ms`).
    - "+" icon 10x10 at opacity .64 → hover: opacity 1, `rotate(45deg)` (150ms).
    - Labels and positions (left, top in diagram units): Indexation (207,105), Classification (127,231), Synthesis (205,436), Embedding (10,380), Enrichment (193,580), Redaction (898,16), Transcription (942,143), Translation (1144,233), Diarization (1045,368), OCR (983,505).
    - mouseenter/focus sets the active step; mouseleave/blur clears it; click toggles.
- **≤799 mobile variant** (flex column, centred, full width):
  - Static 240x240 box with the glow image (417.94x389.15 at offset glow−database = (-86,-72)) animating on `animation-1r4yej1` (4s ease-in-out infinite: 0/100% `scale(1)` opacity .45; 50% `scale(1.22)` opacity 1), with the database image above it.
  - Horizontal snap list (grid, auto-flow column, columns 80%, gap 32, margin-top 48, gutter 16) of items, each a flex column, start-aligned, gap 16: a pill (static, same style, no "+") and a P16 muted description.

### Section 5 motion (desktop orbit loop, rAF only while intersecting, disabled with reduced motion)
```js
// seeded PRNG (mulberry32) used to place nodes deterministically
function n4(rings, weights, count, [lapMin,lapMax], seed){
  let r=seed; const rnd=()=>{let e=Math.imul((r=r+0x6d2b79f5|0)^r>>>15,1|r); return (((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/4294967296};
  return Array.from({length:count},()=>{let a=rnd(),i=0; while(i<weights.length-1&&a>weights[i]){a-=weights[i];i++}
    return {ring:rings[i], angle:2*rnd()*Math.PI-Math.PI, lap:lapMin+rnd()*(lapMax-lapMin)}});
}
nodes = n4([0,1,2],[.4,.32,.28],96,[24,60],21)       // ring dirs: +1, -1, +1
point(ring,θ): x=cx+rx·cosθ·cos(rot)-ry·sinθ·sin(rot); y=cy+rx·cosθ·sin(rot)+ry·sinθ·cos(rot)   (rot in rad)
node transform = translate(x y) rotate(atan2(ry·cosθ, -rx·sinθ)deg + rotDeg)
per frame (dt capped .05s, m += dt): θ_i += 2·dir·π/lap_i · (1 + .3·sin(.35m + 1.7i)) · dt
glow ("breathe", period 4s): f=(1-cos(2πm/4))/2; glow.style.transform=`translateX(0px) scale(${1+.22f})`; opacity = .45 + f·.55
```

---

## 6. "Put the customer in every prompt" (prompt topics)

The structure, styles and motion are **identical to section 4**, with these differences:
- **Outer:** pad `120px 0` (≤1280 96; ≤799 `51 0 48`). At 1440: y 4310→5817.
- **H2** (H96, 2 lines): "Put the customer" `<br>` "in [img] **every prompt**", with "every prompt" in serif 120.
  - Inline image wrapper: width 123 (≤1280 92; ≤799 61).
  - Img: `home-prompt-ship-it.png`, height 156 (≤1280 117; ≤799 78), `translate(-48%, calc(-64% - 4px))`.
- **Intro:** P24, 4 lines, about 172 chars (placeholder).
- **Tabs:**
  1. "Simulate customers and market segments" → `home-prompt-twins.png`, desc 219ch/4 lines, link "Explore Digital Twins" `/product/digital-twins/`
  2. "Bring customer evidence into every build" → `home-prompt-channels.png`, 171ch/3, "Explore Channels"
  3. "Align your whole team with your customers" → `home-prompt-chat.png`, 196ch/4, "Explore Chat"
  4. "Automate entire workflows" → `home-prompt-agents.png`, 207ch/3, "Explore Agents"
- **Quote card:** links to `/customers/okta/`, 760x362. Quote is about 264 chars, **5 lines**, max-width 680. Name "Kevonte Mitchell", role "Staff UX Researcher, Okta". **No avatar.** Logo crop box 85x28 containing `white-logo(1).svg` at top -8.04px, left -6.07px, 97.08x43.68.
- **Stat card:** "66%" / "Faster shipping" / "Faster from discovery to delivery—without sacrificing quality." (desc max-width 227). Same Forrester link and download overlay as section 4.

---

## 7. "Make your software self improving" (sticky globe loop)

**Outer:** pad `120px 0` (≤1280 96; ≤799 `51 0 45`), `overflow-x:clip`. At 1440x900: y 5817→9521 (3704 tall).

- **Header** (`.container`, flex, centred). The inner block is a flex column, centred, gap 32, text-align centre (≤799 left):
  - H2 H96, max-width 1093, 2 lines: "Make your **software**" `<br>` "self [atom] improving". "software" is serif 120.
  - Inline wrapper width 147 (≤1280 110; ≤799 73). Img `home-loop-atom.svg`, height 120 (90/60), `translate(-50%, calc(-50% - 4px))`.
  - P24 ls -0.5, max-width 812, centred, 3 lines, about 178 chars (placeholder).
  - CTA row.
- **Sticky track** (hidden ≤1023): `position:relative; height: 340vh` (= `100 + 4*60` vh; 3060px at 900 tall).
  - Child: `position:sticky; top:0; height:100vh; --globe: min(840px, calc(100vh - 96px))` (804px at 900 tall).
  - **SVG** viewBox 0 0 840 840: `position:absolute; top:50%; left:calc(50% - var(--globe)*1.1905); width/height:var(--globe); transform:translateY(-50%); overflow:visible`. At 1440 it sits at x -237, i.e. mostly off the left edge, so you see the right half of the ring. Contents:
    1. Wireframe globe group at `translate(56 60)`, `stroke:#626262; stroke-width:.5; fill:none`: a circle (cx 360, cy 360, r 360); latitude paths at [-60,-45,-30,-15,0,15,30,45,60,75]°; 18 rotating longitude paths; and 22 node rects (6x6, x/y -3, fill #0044FF, opacity by depth). See motion.
    2. Outer ring: `circle cx420 cy420 r420 fill none stroke #626262 stroke-dasharray "4 4" stroke-width .5`.
    3. Progress arc: same circle, `stroke:#FFF; stroke-width:.5; pathLength:1; transform:rotate(-180 420 420)`, `stroke-dasharray: "${(p+90)/360} 1"` (initial `.041666 1`).
    4. 5 step markers at angles [0,45,90,135,180]°, positioned at `(420+420·sin a, 420-420·cos a)`: rect 6x6 (x/y -3) `rotate(a)`, fill `#0044FF` if `p ≥ a-.01`, otherwise `#FFF`.
    5. Moving dot: circle r 16, fill #0044FF, stroke #FFF .5, at angle p (initially -75°).
  - **Panel:** `position:absolute; top:50%; left:calc(50% + 16px); width:min(508px, 50% - 48px); display:grid; transform:translateY(-50%)`. Five stacked items (`grid-area:1/1`), each a flex column, gap 32, `opacity:0; translateY(12px)`, going to `opacity 1, translateY 0` when active (`transition: opacity 300ms, transform 300ms`). Each item contains:
    - Image: `home-loop-step-N.png`, aspect 508/340, width 100%.
    - Text block (flex column, gap 16):
      - h3: flex, gap 16, ls -1. Number "01"…"05" in PP Mondwest 24/24 #0044FF, then the title in Inter 32/40 w600 #FAFAFA (≤799 20/28). ≤1023: column, gap 8.
      - Body: P20 muted ls -0.25, 4 lines each, about 176–187 chars (placeholder).

      Titles: "Stack ranked ideas", "Faster customer discovery", "Synthesized into context", "Hand off to coding agents", "Close the loop with customers".
- **≤1023 carousel:** grid, auto-flow column, columns 60% (≤799 80%), gap 32, margin-top 64 (≤799 40), `padding:0 var(--gutter)` (64 / 16), snap. Each item is a flex column, gap 32, containing the image and the text block (same text styles at 16/24 and 20/28).

### Section 7 motion (scroll-driven, rAF-throttled on `scroll`/`resize`, active while the track intersects)
```js
r = track.getBoundingClientRect(), vh = innerHeight, clamp01 = x=>min(1,max(0,x))
p = r.top > 0      ? -75*(1 - clamp01(1 - r.top/vh))          // approaching: -75° → 0°
  : r.bottom > vh  ? 180*clamp01(-r.top/(r.height - vh))       // pinned: 0° → 180°
  :                  180 + 75*clamp01(1 - r.bottom/vh)         // leaving: 180° → 255°
dot (cx,cy) = (420+420·sin p°, 420-420·cos p°); arc dasharray = ((p+90)/360) + " 1"
activeStep = last i where p >= [0,45,90,135,180][i] - .01
```
- The globe spins continuously while visible (independent of scroll):
  - Longitude offset `o -= 2π/60 · dt` (one revolution every 60s), with `dt` capped at .05s.
  - Projection: `nx(lat,lon)`: `a=cos lat·cos lon, n=sin lat, i=cos lat·sin lon`, tilt `ng = 28.3°`: `r = n·cos ng − i·sin ng`, `depth = n·sin ng + i·cos ng` → `x=360+360a, y=360−360r`.
  - Paths only draw points with depth>0 (front hemisphere). Longitudes use 49 samples over -90..90°; latitudes use 97 samples.
  - Nodes: `lat = nh[7t mod 10]`, `lon = (5t mod 18)/18·2π` for t in 0..21. Node opacity = `clamp(5·depth, 0, 1)`.
  - Disabled with reduced motion.

---

## 8. "Govern customer context at scale"

**Outer:** pad `72px 0 120px` (≤1280 `96 0 96`; ≤799 `69 0 45`). The `.container` is a flex column, gap 120 (≤1280 64; ≤799 48). At 1440: y 9521→11029.

- **Header** (flex column, start-aligned, gap 32):
  - H2 H96, `position:relative; z-index:0`, 906 wide, 2 lines: "Govern [icon] customer" `<br>` "**context** at scale", with "context" in serif **126px** (≤1280 94; ≤799 63).
  - Icon wrapper: inline-block, width 212, `margin:0 -40px 0 -16px`, **z-index -1** so the icon sits behind the words (≤1280 width 159, margin `0 -30 0 -12`; ≤799 106, `0 -20 0 -8`). Img `home-govern-icon.png`, height 147 (110/74), `translate(-50%, calc(-64% - 4px))`.
  - Paragraph P24 #FAFAFA ls -0.25, max-width 940, 3 lines, about 248 chars (placeholder). Then the CTA row (left aligned).
- **Grid:** `grid-template-columns: repeat(3, minmax(0,1fr)); gap:64px 32px` (≤1280 2 columns, row-gap 48; ≤799 1 column, row-gap 40). Columns are 376 wide at 1440. Each card is a flex column, gap 32 (≤799 24):
  - Img aspect 804/464 (376x217)
  - Text (flex column, gap 8, max-width 382): h3 20/24 w600 #FAFAFA, then P16 muted.

  Cards, in order:
  1. "Multiplayer AI": `home-govern-multiplayer.png`, 141ch/3 lines
  2. "Built-in privacy": `-privacy`, 143ch/4
  3. "Shared standards": `-standards`, 119ch/3
  4. "Predictable token usage": `-tokens`, 121ch/3
  5. "Granular permissions": `-permissions`, 111ch/3
  6. "Enterprise-grade security": `-security`, 114ch/3
- **Motion:** none. No scroll reveals anywhere on this page (I verified this with a MutationObserver over a full scroll).

---

## 9. "In their words, not ours" (story marquee)

**Outer:** pad `120px 0 160px` (≤1280 `80 0 80`; ≤799 `49 0 52`). The `.container` is a flex column, gap 96 (≤799 40), with `--gutter:124px` (64 / 16). At 1440: y 11029→12001.

- **Head** (flex, space-between, centred, gap 24; ≤799 column, start-aligned): H2 "In their words, not ours" (H64, max-width 680, 665x68 at 1440) and "See all stories" → `/customers/` (light button, 126x42).
- **Marquee viewport:** `overflow:hidden; margin-inline: calc(-1 * var(--gutter))` (full-bleed, 1440 wide), with the 140px edge mask (see 0.3).
- **Track:** `display:flex; width:max-content; align-items:flex-start; padding-bottom:8px; animation: marquee 170s linear infinite` (`from translateX(0) to translateX(-50%)`). It pauses on `:hover` (only within `@media (hover:hover)`) and on `:focus-within`. Reduced motion: no animation. The track contains the 6 stories rendered twice (the duplicate set has `aria-hidden` and `inert`), 5208px wide in total.
- **Card** (`<a>`, `flex:0 0 402px; margin-right:32px`, flex column, gap 24; ≤799 `flex:0 0 80vw; max-width:360px; margin-right:16px; gap:16px`):
  - **Thumb:** `position:relative; aspect-ratio:402/440; border-radius:8px; border:1px solid rgba(255,255,255,.08); overflow:hidden`. Layers, bottom to top:
    1. Thumbnail img (cover)
    2. Dim overlay `rgba(10,10,10,.64)`
    3. Centred logo box (pad 24) with logo img 200x88 contain (≤799 160x70)
    4. PixelDissolve canvas (component B, colour **#0238CE**)
    5. Quote overlay: absolute, inset 0, z-index 3, flex column, space-between, gap 24, pad 48 (≤799 32), bg #0238CE, `opacity:0; pointer-events:none; transition: opacity 200ms 90ms`, opacity 1 when `data-active="true"`. It holds the quote (20/28 w500 ls -0.25 #FAFAFA; ≤799 16/24) and the name (16/24 w500) above the role (14/16).
  - **Title** under the thumb: 20/28 w500 ls -0.25 #FAFAFA (≤1280 20/28; ≤799 16/24), 2 lines.
  - Hover (mouseenter/leave on the thumb): the PixelDissolve fills, the overlay fades in, and the Tooltip appears.
- **Stories** (order, link, thumb, logo, title verbatim, quote length, name, role):
  1. `/customers/itau-unibanco/`, `Customer_Itau.png`, `home-story-itau-mark.svg`. "How Itaú Unibanco delivers better banking experiences with Dovetail". Quote 215ch (8 lines in the overlay). Renato Cerqueira Leite, "Head of research Operations, Itaú Unibanco".
  2. `/customers/atlassian-design/`, `Customer_Atlassian.png`, `home-story-atlassian-mark.svg`. "How Atlassian turns customer signals into confident product decisions". 192ch (6). Martin Jerkovic, "Lead Product Designer, Atlassian".
  3. `/customers/canva-ai/`, `Customer_Canva_AI.png`, `white-logo(2).svg`. "Dovetail helps Canva turn millions of design moments into product decisions". 171ch (6). Craig Boustred, "Design Researcher, Canva".
  4. `/customers/breville/`, `Customer_Breville.png`, `white-logo(3).svg`. "How customer insights drive and inspire Breville’s product innovation". 219ch (8). Constance Docos, "Senior UX Designer, Breville".
  5. `/customers/cnh/`, `Customer_CNHIndustrial.png`, `white-logo(4).svg`. "How CNH builds better agricultural machinery, 50% faster with Dovetail". 209ch (7). Matthew Klopfenstein, "Portfolio Management–Cash Crop Segment Specialist, CNH".
  6. `/customers/smartrecruiters/`, `Customer_SmartRecruiter.png`, `white-logo(5).svg`. "Unlocking the AI edge for hiring the best talent with SmartRecruiters and Dovetail". 214ch (7). Danielle Reid, "Senior Design Manager, SmartRecruiters".
- Measured card sizes: 402x520 (thumb 402x440) at 1440; 360x458 at 768; 312x405 at 390.

---

## 10. Final CTA "The best never guess"

**Outer:** bg #0A0A0A, `position:relative; overflow:hidden` (≤799 `padding-bottom:64px`). It contains `section svg { scale: 0.9 }`, which shrinks the logos inside their tiles. At 1440x900: y 12001→12901 (exactly 100vh).

- **Background:** a wrapper (absolute, inset 0, `pointer-events:none`) with `mask-image: linear-gradient(transparent, black 25%, black 75%, transparent)`, containing the ASCII field (component A).
- **Section:** flex column, `min-height:100vh`, relative. At ≥1281 it sets `--hero-text-size: min(9.26vw, 170px, calc((100vh - 354px)/3.9))` and `--hero-logo-size: calc(var(--hero-text-size) * 1.07)`. ≤799: `min-height:auto; overflow-x:clip`.
  - Gradient banner (see 0.3).
  - **Centre block:** `position:absolute; left:0; right:0; top:calc(50vh - 44px); transform:translateY(-50%)`, flex column, centred. ≤799: `position:relative; top:0; transform:none; padding-top:36px`.
    - Visually-hidden `<h1>The best never guess</h1>`.
    - Scale wrapper: ≤799 `display:inline-block; transform:scale(.82); transform-origin:center top`; ≤588 `scale(.72)`.
    - Words stack (`aria-hidden`): flex column, centred, gap 10 (≤799 0, with `> * + * { margin-top:-0.08em }`), `font-size:170px; letter-spacing:-6.8px` (≤1280 `clamp(80px,10vw,170px)`; 800–1280 `line-height:.9`; ≤799 80px).
    - Each **row** is `display:flex; align-items:center; position:relative; width:fit-content; opacity:0` (GSAP fades it in). The word `p` uses Inter 600, `font-size/line-height: var(--hero-text-size)`, ls -4px (≤1512 `-0.01736vw`), `position:relative; z-index:1; text-align:center`.
    - **Logo tiles:** absolute, `font-size: var(--hero-logo-size)` (1281–1513 fallback 150px), `width:1em; height:1em; border-radius:8px; overflow:hidden; display:flex; align-items:center; opacity:0`. ≤1280: `font-size:inherit; width/height:1.18056em`. The SVG fills the tile (100%), then the 0.9 scale from the section rule applies.

      Positions are relative to the word or row:

      | Row | Row transform | Logo | Position | Notes |
      |---|---|---|---|---|
      | "The" | `translateX(-50%)` | Salesforce `cta-logo-theright-salesforce.svg` | inside the word, `left:108%; top:-8%` | width `1.42941em` (≤1280 1.6875em, height 1.18056em), no radius |
      | "best" | `translate(1%,-15%)` | AWS `cta-logo-bestfarleft-aws.svg` | `left:-92%; top:-50%` (≤799 top -45%) | |
      | "best" | | Canva `cta-logo-bestleft-canva.svg` | `left:-55%; top:4%` | radius 50%, z-index 2 |
      | "best" | | Airwallex `cta-logo-bestright-airwallex.svg` | `right:-60%; top:-8%` (≤799 top 0) | |
      | "never" | word `translate(-35%,-42%)` | Notion `cta-logo-neverright-notion.svg` | logos are siblings of the word in the row, `left:68%; top:-33%` | z-index 2 |
      | "never" | | Zapier `cta-logo-neverfarright-zapier.svg` | `right:-50%; top:-48%` (≤799 -42%) | |
      | "guess" | word `translate(17%,-70%)` | Wise `cta-logo-guessleft-wise.svg` | `right:87%; top:-43%` | |
      | "guess" | | Breville `cta-logo-guessfarleft-breville.svg` | `right:116%; top:-84%` | |

      Measured at 1440x900 (page coordinates):
      - Words: "The" 248x133 at x472, "best" 281x161 (span) at x582, "never" 364x133 at x410, "guess" 389x133 at x592.
      - Tiles are 143x143 with the SVG at 128. Salesforce is 204x143 at (740,12103), AWS (323,12170), Canva (427,12242), Airwallex (890,12226), Notion (786,12356), Zapier (942,12336), Wise (433,12486), Breville (321,12431).
    - **Footer:** flex column, centred, gap 32, pad `0 24px`, z-index 2, `opacity:0` (GSAP). ≤799: gap 24, margin-top -74; ≤588 margin-top -104. It holds the CTA row (margin-top -32, gap 8; ≤799 margin-top 0): "Book a demo" (primary **lg**, 158x56) and "Start free trial" (glass **lg**, 164x56).

### Section 10 motion: GSAP 3.11.3 (`useGSAP`, runs once **on mount**, not scroll-triggered)
```js
gsap.set(logoTiles, {scale:.82});
const tl = gsap.timeline({defaults:{ease:"power2.out"}});
tl.to(rows,      {opacity:1, duration:.35, stagger:.06})          // rows in DOM order The, best, never, guess
  .to(logoTiles, {opacity:1, scale:1, duration:.3, stagger:.04}, "-=0.25")
  .to(footer,    {opacity:1, duration:.3}, "-=0.2");
```
Logo-tile ref order (the stagger order): AWS, Canva, Airwallex, Notion, Wise, Breville, Salesforce, Zapier.

Because the original runs on mount, the animation has already finished by the time a user scrolls down. To be faithful, run it on mount. If you'd rather it be visible, an in-view trigger is the only sensible alternative, but that would be a deviation. This is the only GSAP usage on the page, so a hand-rolled WAAPI/CSS equivalent with the same timings is fine.

---

## 11. Footer

**Outer:** `<footer>` bg #0A0A0A, z-index 0. The inner `.container` has pad `64px 124px 0` (≤1280 `0 64px`; ≤799 `64px 16px 0`) and is a flex column. At 1440: y 12901→13683 (782 tall).

- **Grid:** `display:grid; grid-template-columns:repeat(12,1fr); gap:32px` (≤1280 gap 24; ≤799 `repeat(4,1fr)`, gap 24). Six column blocks each `grid-column: span 2` (172px wide at 1440, x = 124, 328, 532, 736, 940, 1144).
  - ≤1280: Platform `1/7`, Roles `7/13`, Resources `1/7`, Comparisons **hidden**, Customers `1/7`, Contact `7/13`.
  - ≤799: every column is `1/-1`.
- **Heading:** mono 14px, lh 140% (19.6), ls 1, uppercase, #A7A7A7, margin-bottom 24. A second group inside the same column has margin-top 32.
- **List item:** `margin:8px 0; display:flex; gap:4px; align-items:center` (28px rows).
  - Link: Inter 16/24 w500 #FFF, `position:relative`, with an underline `::after` (bottom 2px, height 1px, #FFF, `scaleX(0)` → hover `scaleX(1)`, `transform 200ms ease-out`, origin left).
  - Optional badge: mono 12/12 #A7A7A7, bg rgba(255,255,255,.08), pad 2px 4px, radius 4.
- **Columns (verbatim):**
  - **Platform:** Digital Twins `new`, Channels 2.0 `beta`, Agents, Dashboards `beta`, Projects, Chat, Docs, Deploy, Enterprise, Customers, Pricing
  - **Roles:** Designer, Researcher, Product Manager, Customer Experience, Sales & CS, Marketing. Then **Use Cases:** Voice of Customer, Product Research, Research Repository
  - **Resources:** Blog, Changelog, Community, Events, Help centre, Academy, Live Demos
  - **Comparisons:** Marvin, Condens, Maze, UserTesting, Lookback, Great Question, Enterpret, Qualtrics, Medallia, Pendo, Chattermill, Thematic, Aurelius
  - **Customers:** Breville, Okta, Atlassian, Canva, Itaú Unibanco, Zapier, AWS, CNH
  - **Contact:** Request a demo, Contact sales. Then **Company:** Careers, Trust center
- **≤1280 CTA stack** (grid column `1/-1`, flex column, gap 8): "Log in" (pad 10px 16px, bg rgba(255,255,255,.08), border 1px rgba(255,255,255,.24), 14/16 w600; hover bg .16) and "Book a demo" (bg #0044FF, #FAFAFA; hover opacity .85), each full width × 38.
- **Bottom bar:** flex, space-between, centred, `padding:120px 0 48px` (≤799 column, start-aligned, `padding:32px 0; margin-left:-16px`), mono 12/12 ls 1 uppercase, colour #A7A7A7:
  - Left: "© 2026 Dovetail Research Pty. Ltd." (pad `12px 16px 12px 0`).
  - Middle: "COOKIE PREFERENCES" (button) and "Legal & Privacy" → `/legal/`, each pad 12px 16px, hover #FFF.
  - Right (hidden ≤799): "FOLLOW US" + 4 icon links (gap 8, 32x32 SVGs, hover colour #A7A7A7): LinkedIn `https://www.linkedin.com/company/heydovetail/`, X `https://x.com/hidovetail`, Instagram `https://www.instagram.com/hidovetail/?hl=en`, YouTube `https://www.youtube.com/@hidovetail`.

---

## 12. Digital Twins modal (timed promo)

- **Trigger:** 10s after mount, wait for the first `scroll | pointerdown | keydown | touchstart`. Then open it and set `localStorage['digital-twins-popup-seen']='true'` so it never shows again. It isn't shown on `/product/digital-twins/`. While open, `html{overflow:hidden}`. Esc closes it, focus is trapped, and clicking the backdrop or ✕ closes it.
- **Layout:**
  - Root: `position:fixed; inset:0; z-index:6; display:flex; align-items:center; justify-content:center`.
  - Backdrop: `rgba(10,10,10,.6)`.
  - Dialog: `width:calc(100vw - 32px); max-width:832px; display:flex; align-items:center; bg:#191919; border:1px solid rgba(255,255,255,.08); radius:8; overflow:hidden`. At 1440 it's 832x346. Entry animation: `opacity:0; translateY(8px) scale(.98)` → none over **300ms ease**.
  - Close: 32x32 at top/right 8, bg rgba(255,255,255,.16) (hover .24, 150ms), radius 4, 20px ✕.
  - Copy column: pad 48, flex column, gap 8.
    - H2 "Introducing<br>Digital Twins" (48/56 w600 ls -1).
    - P20 muted: "Personas describe your customers. Digital Twins let you talk to them."
    - CTA "See how they work" → `/product/digital-twins/` (white button, 14/18 w500, pad 10 16, margin-top 24, hover bg #CECECE).
  - Image: `digital-twins-popup.png` width 400.
- **≤799:** dialog stacks as a column with the image first (`width:min(320px,80%)`, centred). Copy pad `0 24px 32px`; CTA margin-top 16.

---

## Motion summary (quick reference)

| Thing | Trigger | Property | Duration / easing / delay |
|---|---|---|---|
| Hero intro + H1 | load | opacity 0→1 | 150ms ease-out, 300ms delay |
| Hero ASCII / quote ASCII / CTA ASCII | always (visible) + mouse | canvas | ~30fps, spring push radius 230px |
| Hero logo cycler | interval | slot opacity .72→0→.72 | every 2200ms, 350ms fade |
| Fax eyes | pointermove | pupil translate ≤42% | lerp .25/frame |
| Hero chat | in view ≥40% | see section 3 | multi-step, ~10s per convo |
| Topic tabs | auto | progress scaleX | 6000ms linear; image 300ms, text 150ms |
| Stat card hover | hover | pixel dissolve then overlay | 300ms then 400ms (delay 300) |
| Diagram orbits | visible | node rotation + glow breathe | lap 24–60s, 4s breathe |
| Diagram step hover | hover/focus | centre group fade, copy fade+6px | 250ms |
| Loop globe | scroll | dot angle / arc / active step | direct mapping; panel 300ms fade+12px |
| Globe spin | visible | longitudes | 60s/rev |
| Marquee | always | translateX 0→-50% | 170s linear infinite, pause on hover |
| Story hover | hover | pixel dissolve #0238CE + overlay | 300ms + overlay 200ms (90ms delay) |
| Tooltip | hover | follow cursor +16px; label 6px rise | 150ms wrapper, 260ms label |
| Final CTA | mount | rows / logos / buttons | GSAP power2.out (see section 10) |
| Nav dropdown | :hover | opacity/visibility | 150ms |
| Buttons | hover | opacity .85 (150ms) or bg (200–300ms) | ease |
| Links | hover | underline scaleX 0→1 | 200ms ease-out |
| Nav promo card | hover | image scale 1.04 | 400ms |
| Modal | 10s + interaction | opacity/translateY 8/scale .98 | 300ms ease |

`prefers-reduced-motion: reduce` disables all keyframe animations, the canvas animation loops (ASCII draws one static frame), the orbit/globe loops, the logo cycler, the chat, the eyes and the marquee.

---

## Gaps and things I couldn't measure

- **`/menu/` (mobile menu):** the ≤1185 "Menu" pill navigates to a separate route. I didn't recon it, so the mobile nav panel isn't specced.
- **ASCII canvases:** the output is procedural and random per load, so it can't be pixel-matched. The algorithm above is the exact source logic. The glyph font is `11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`, i.e. system mono, **not** JetBrains Mono.
- **Final CTA:** the slice receives a `hideDecorations` prop whose decoration component I couldn't de-minify. On the live page the only decoration rendered is the masked ASCII canvas, which I measured. I took logo positions from the CSS and confirmed them with 1440 rects; ≤1280 positions come from CSS only.
- **Nav dropdown open state:** I took this from CSS rules and measured the dropdown boxes while closed (the rects are valid). I didn't visually screenshot it open.
- **Viewports ≥1513px and the short-desktop tier (≥1281 wide, ≤800 tall):** values come from the CSS rules; I didn't measure them live.
- **Diagram "loops" layout:** the original has an alternate layout behind `?diagram=loops`. I ignored it, and the default "orbits" layout is specced.
- **Long paragraphs:** per instructions, I recorded only character and line counts. Write same-length placeholder copy.
- **`KE1Vtd1F-*` files:** the ones already in `public/assets/` are GTM scripts, not fonts. The real fonts are in `public/assets/fonts/`.
