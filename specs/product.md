Source: https://dovetail.com/

# Template: `product` (7 pages)

Covers `/product/ai-agents/`, `/product/ai-channels/`, `/product/ai-chat/`, `/product/ai-dashboards/`, `/product/ai-docs/`, `/product/ai-projects/` and `/product/digital-twins/`.

Read `specs/marketing-shared.md` first: layout primitives, buttons, page chrome (accent nav), footer variant A, FAQ, PixelTransition, CustomerStories and the data schema. Data lives in `src/data/marketing/product__<name>.json`.

All seven pages are hand-written page components composed from the same slice library. Their DOM was compared slice by slice. Every page is `ProductHero` → a logo-marquee wrapper → a subset of the slices below → `CustomerStories` → FAQ, with footer variant **A** (homepage final CTA + footer).

## 0. Composition per page

| # | agents | channels | chat | dashboards | docs | projects | digital-twins |
|---|---|---|---|---|---|---|---|
| 1 | ProductHero | ProductHero (+video card) | ProductHero | ProductHero | ProductHero | ProductHero | ProductHero |
| 2 | LogoMarqueeWrap | LogoMarqueeWrap | LogoMarqueeWrap | LogoMarqueeWrap | LogoMarqueeWrap | LogoMarqueeWrap | LogoMarqueeWrap **+ Ratings row** |
| 3 | ProductStatement | ProductFeatures | ProductFeatures | ProductFeatures | ProductFeatures | ProductFeatures | ProductStatement |
| 4 | ProductScrollVideo | ProductFor (6 items) | ProductPromptCards | ProductFor (5) | ProductFor (5) | ProductFor (6) | ProductScrollVideo |
| 5 | ProductFeatures | ProductQuote | ProductQuote | ProductQuote | ProductQuote | ProductQuote | ProductQuote (statement testimonials) |
| 6 | ProductPromptCards | ProductCarousel | ProductCarousel | ProductCarousel | ProductCarousel | ProductCarousel | ProductFeatures |
| 7 | ProductQuote | Pixel▼[Findings] | Pixel▼[Findings] | Pixel▼[Findings] | Pixel▼[Findings] | Pixel▼[Findings] | VoiceMode |
| 8 | Pixel▼[ProductCarousel] | CustomerStories | CustomerStories | CustomerStories | CustomerStories | CustomerStories | ProductPromptCards (label variant) |
| 9 | CustomerStories | Pixel▲[Spacer 160 + FAQ] | ← same | ← same | ← same | ← same | ProductQuote |
| 10 | Pixel▲[Spacer 160 + FAQ] | Spacer 200→160 | | | | | Pixel▼[ProductCarousel] |
| 11 | Spacer 200→160 | | | | | | CustomerStories, Pixel▲[Spacer 160 + FAQ], Spacer |

- Pixel▼ = PixelTransition `{pixelateBottom, marginBottom:-120, pixelSize:48, sectionHeight:120}`. Pixel▲ = `{pixelateTop, marginTop:-120}` (see shared §7.2). The FAQ wrapper inside Pixel▲ is `{background:#0A0A0A; position:relative; z-index:3}`. The inner Spacer is 160 (sm 64). The final page Spacer is 200 (sm 64), which renders 160 at ≥1281 as the last child of `#main-content`.
- Accent colour per page (hero bg, nav bg, feature numbers): Agents `#5D00A1`, Channels `#982500`, Chat `#0029A6`, Dashboards `#154C14`, Docs `#99004F`, Projects `#0029A6`. Digital Twins: hero/nav `#7D00D6`, feature numbers `#9C57EF`.
- Digital Twins has no alert bar.
- Document heights (1440 / 1280 / 768 / 390): agents 13145/13561/13789/12634; channels 16464/16865/12897/13005; chat 12659/13219/14613/13002; dashboards 15302/15568/13658/11709; docs 14655/14953/8335/10852; projects 15539/16169/13785/12130; digital-twins 14937/15547/15259/14001.

Key measurements (ai-agents) at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `e10k4luw0` | 1440x907.4 @x0 | 1280x896.8 @x0 | 768x1055.1 @x0 | 390x749.1 @x0 |
| `e10k4luw13` | 896x160 @x124 40px/68px | 940x132 @x64 40px/60px | 646x89 @x16 40px/44px | 358x89 @x16 40px/44px |
| `e10k4luw9` | 429x167 @x124 72px/68px | 328.8x134 @x64 56px/60px | 239.6x93 @x16 40px/44px | 239.6x93 @x16 40px/44px |
| `e10k4luw14` | 646x84 @x124 20px/28px | 646x48 @x64 16px/24px | 646x48 @x16 16px/24px | 358x96 @x16 16px/24px |
| `e10k4luw17` | 272x60 @x1044 | 1152x60 @x64 | hidden | hidden |
| `e10k4luw24` | 1192x603.4 @x124 | 1152x583.2 @x64 | hidden | hidden |
| `e10k4luw25` | hidden | hidden | 736x688.1 @x16 | 358x334.1 @x16 |
| `e1rv36b91` | 1440x503.6 @x0 | 1280x444.9 @x0 | 768x79.6 @x0 | 390x99.2 @x0 |
| `e1jzkpz92` | 5231.5x40 @x-492 | 5231.5x40 @x-202 | 3498.9x28 @x-311 | 3498.9x28 @x-117 |
| `e1ql6xhm0` | 1440x544 @x0 | 1280x340 @x0 | 768x196 @x0 | 390x280 @x0 |
| `e1ql6xhm1` | 616x120 @x412 56px/60px | 616x44 @x332 40px/44px | 616x36 @x76 32px/36px | 358x72 @x16 32px/36px |
| `psv-card` | 827x465.2 @x307 | 1152x648 @x64 | 736x414 @x16 | 358x201.4 @x16 |
| `e182vtoz0` | 1440x830.5 @x0 | 1280x768 @x0 | 768x510 @x0 | 390x297.4 @x0 |
| `e1r1adlk0` | 1440x3600 @x0 | 1280x4100 @x0 | 768x4327.4 @x0 | 390x3009.3 @x0 |
| `e1h3sdf51` | 1440x3600 @x0 | hidden | hidden | hidden |
| `e1h3sdf59` | hidden | 1280x4036 @x0 | 768x4327.4 @x0 | 390x3009.3 @x0 |
| `e1y8zjgx0` | 1440x1128 @x0 | 1280x1298 @x0 | 768x2200 @x0 | 390x2416 @x0 |
| `e1y8zjgx3` | 376x330 @x124 13.3333px/normal | 564x306 @x64 13.3333px/normal | 736x302 @x16 13.3333px/normal | 358x350 @x16 13.3333px/normal |
| `e1cnxsk60` | 1440x560 @x0 | 1280x560 @x0 | 768x221.6 @x0 | 390x285.6 @x0 |
| `e1cnxsk66` | 940x144 @x250 40px/48px | 940x120 @x170 32px/40px | 736x96 @x16 24px/32px | 358x160 @x16 24px/32px |
| `e1c9zraz0` | 1440x1213.8 @x0 | 1280x1095.8 @x0 | 768x879.2 @x0 | 390x903.2 @x0 |
| `e1c9zraz11` | 402x589.8 @x124 | 402x589.8 @x64 | 280x505.2 @x16 | 280x505.2 @x16 |
| `e1c9zraz12` | 402x449.8 @x124 | 402x449.8 @x64 | 280x313.2 @x16 | 280x313.2 @x16 |
| `elme6fd0` | 1440x910 @x0 | 1280x700 @x0 | 768x501.9 @x0 | 390x621.9 @x0 |
| `e1wn1hrv5` | 812x184.7 @x314 56px/60px | 812x91.1 @x234 40px/44px | 736x74.3 @x16 32px/36px | 358x146.3 @x16 32px/36px |
| `ef2kgtv0` | 274x60 @x124 56px/60px | 1152x44 @x64 40px/44px | 736x36 @x16 32px/36px | 358x36 @x16 32px/36px |
| `ea410al0` | 886x28 @x430 13.3333px/normal | 1152x28 @x64 13.3333px/normal | 736x24 @x16 13.3333px/normal | 358x24 @x16 13.3333px/normal |
| `e70som00` | 1440x120 @x0 | hidden | hidden | hidden |

---

## 1. ProductHero (`e10k4luw*`, export `ProductHeroSlice`)

**Structure.** Root `div.e10k4luw0` (bg = accent) holds:
- two decorative pixel-shape images pinned to its bottom-left and bottom-right (`/assets/marketing/pixel-shapes-left.png` 573x206 natural, `pixel-shapes-right.png` 570x246; rendered 286 wide → 200 at md → 120 at sm, `z-index:0`);
- a `SliceGrid` (row-gap 0) with one `Column span 12` holding the row `.e10k4luw4`:
  - **Left** `.e10k4luw5` (max-width 940, gap 32):
    - eyebrow row `.e10k4luw6`: a 24x24 product icon SVG, the product name (`.e10k4luw7`, H20-like) and an optional "Beta" tag `.e10k4luw8`;
    - `h1.e10k4luw13`, made of spans: Inter part `.e10k4luw9` (72px), inline icon `.e10k4luw11` > `img.e10k4luw12` (72px tall), serif part `.e10k4luw10` (PP Mondwest 84px);
    - subheading `p.e10k4luw14` (max-width = page prop, 646 on agents; default 826);
    - CTA row `.e10k4luw15`: one primary button "Request a demo" → `/contact-sales/`.
  - **Right** `.e10k4luw16` (`align-self:stretch; justify-content:space-between; align-items:flex-end`):
    - optional **video card** (Channels only, see 1.1);
    - the "Act on your data from" / "Connect data sources from" integrations block `.e10k4luw17`: a right-aligned M12 label, then a row of 32x32 glass chips (`.e10k4luw21`, 3px radius, `backdrop-filter:blur(5px)`, bg `rgba(255,255,255,.16)` → hover `.32`, 150ms) holding 24x24 logos (each links to `docs.dovetail.com/integrations/...`, new tab), and a final "+" chip linking to all integrations.
- a hero image column `.e10k4luw23` (`margin-top:86px; margin-bottom:-286px`), so the screenshot overlaps 286px into the next block. Desktop/tablet image `*-hero.png` (natural 1440x729 for agents, `object-fit:contain; border-radius:8px; aspect-ratio 2528/1280`); at ≤799 that one hides and `*-mobile-hero.png` shows.
- The `h1` line breaks are hard `<br>`s and are kept in the data file as `\n`. Inline icon width = `round(72*aspect)` px desktop, `round(54*aspect)` md, `round(36*aspect)` sm, set as CSS vars `--hero-icon-w`, `--hero-icon-w-md`, `--hero-icon-w-sm`. Aspects: agents .7917 (57px). For the others, use the image's natural aspect (rendered widths are in the data file `parts`).

```css
/* e10k4luw0 = div 1440x907 */
.e10k4luw0 { background-color: rgb(93, 0, 161); padding-top: 96px; position: relative }
@media (max-width: 1280px) { .e10k4luw0 { padding-top: 64px } }
@media (max-width: 799px) { .e10k4luw0 { padding-top: 32px } }
/* e10k4luw2 = img 286x102 */
.e10k4luw2 { bottom: 0px; height: auto; pointer-events: none; position: absolute; user-select: none; width: 286px; z-index: 0; left: 0px }
@media (max-width: 1280px) { .e10k4luw2 { width: 200px } }
@media (max-width: 799px) { .e10k4luw2 { width: 120px } }
/* e10k4luw3 = img 286x123 */
.e10k4luw3 { bottom: 0px; height: auto; pointer-events: none; position: absolute; user-select: none; width: 286px; z-index: 0; right: 0px }
@media (max-width: 1280px) { .e10k4luw3 { width: 200px } }
@media (max-width: 799px) { .e10k4luw3 { width: 120px } }
/* e10k4luw4 = div 1192x408 */
.e10k4luw4 { align-items: flex-end; display: flex; gap: 24px; justify-content: space-between }
@media (min-width: 800px) and (max-width: 1280px) { .e10k4luw4 { align-items: stretch; flex-direction: column; gap: 40px } }
@media (max-width: 799px) { .e10k4luw4 { align-items: flex-start; flex-direction: column; gap: 64px } }
/* e10k4luw5 = div 896x408 */
.e10k4luw5 { display: flex; flex-direction: column; flex: 1 1 0%; gap: 32px; max-width: 940px }
@media (max-width: 799px) { .e10k4luw5 { gap: 24px } }
/* e10k4luw6 = div 896x28 */
.e10k4luw6 { align-items: center; display: flex; gap: 8px }
/* e10k4luw7 = p «Agents» 66x28 */
.e10k4luw7 { color: rgb(255, 255, 255); font-size: 20px; font-weight: 500; letter-spacing: -0.25px; line-height: 28px; margin: 0px }
@media (max-width: 1280px) { .e10k4luw7 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e10k4luw7 { font-size: 16px; line-height: 24px } }
/* e10k4luw13 = h1 «Punch above your headcount» 896x160 */
.e10k4luw13 { color: rgb(255, 255, 255); font-weight: 600; letter-spacing: -2px; line-height: 68px; margin: 0px }
@media (max-width: 1280px) { .e10k4luw13 { letter-spacing: -2px; line-height: 60px } }
@media (max-width: 799px) { .e10k4luw13 { letter-spacing: -1px; line-height: 44px } }
/* e10k4luw9 = span «Punch aboveyour» 429x167 */
.e10k4luw9 { font-size: 72px }
@media (max-width: 1280px) { .e10k4luw9 { font-size: 56px } }
@media (max-width: 799px) { .e10k4luw9 { font-size: 40px } }
/* e10k4luw11 = span 57x0 */
.e10k4luw11 { display: inline-block; vertical-align: middle; height: 0px; line-height: 0; font-size: 0px; position: relative; overflow: visible; z-index: 1; margin: 0px 12px; width: var(--hero-icon-w) }
@media (max-width: 1280px) { .e10k4luw11 { margin: 0px 8px; width: var(--hero-icon-w-md) } }
@media (max-width: 799px) { .e10k4luw11 { margin: 0px 6px; width: var(--hero-icon-w-sm) } }
/* e10k4luw12 = img 57x72 */
.e10k4luw12 { position: absolute; width: auto; object-fit: contain; top: 50%; left: 50%; transform: translate(-50%, calc(-50% - 12px)); height: 72px }
@media (max-width: 1280px) { .e10k4luw12 { height: 54px } }
@media (max-width: 799px) { .e10k4luw12 { height: 36px; transform: translate(-50%, calc(-50% - 4px)) } }
/* e10k4luw10 = span «headcount» 334x87 */
.e10k4luw10 { font-family: $serif; font-size: 84px; font-weight: 400 }
@media (max-width: 1280px) { .e10k4luw10 { font-size: 65px } }
@media (max-width: 799px) { .e10k4luw10 { font-size: 46px } }
/* e10k4luw14 = p «Back your team with Dovetail. Automate e» 646x84 */
.e10k4luw14 { color: rgb(255, 255, 255); font-size: 20px; font-weight: 400; letter-spacing: -0.25px; line-height: 28px; margin: 0px; max-width: 646px }
@media (max-width: 1280px) { .e10k4luw14 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e10k4luw14 { font-size: 16px; line-height: 24px } }
/* e10k4luw17 = div 272x60 */
.e10k4luw17 { display: flex; flex-direction: column; gap: 16px; flex-shrink: 0 }
@media (max-width: 799px) { .e10k4luw17 { display: none } }
/* e10k4luw18 = p «Act on your data from» 272x12 */
.e10k4luw18 { color: rgb(255, 255, 255); font-family: $mono; font-size: 12px; font-weight: 400; letter-spacing: 1px; line-height: 12px; margin: 0px; text-align: right; text-transform: uppercase }
@media (min-width: 800px) and (max-width: 1280px) { .e10k4luw18 { text-align: left } }
/* e10k4luw21 = a 32x32 */
.e10k4luw21 { align-items: center; backdrop-filter: blur(5px); background-color: rgba(255, 255, 255, 0.16); border-radius: 3px; display: flex; flex-shrink: 0; height: 32px; justify-content: center; padding: 3px; transition: background-color 150ms; width: 32px }
.e10k4luw21:hover, .e10k4luw21:focus-visible { background-color: rgba(255, 255, 255, 0.32) }
/* e10k4luw22 = span «+» 10x16 */
.e10k4luw22 { color: rgb(255, 255, 255); font-size: 16px; font-weight: 500; line-height: 1 }
/* e10k4luw23 = div 1192x603 */
.e10k4luw23 { grid-column: span 12; order: unset; max-width: unset; min-width: unset; margin-bottom: -286px; margin-top: 86px }
@media (max-width: 1280px) { .e10k4luw23 { grid-column: span 12; display: block } .e10k4luw23 { margin-bottom: -22.6%; margin-top: 48px } }
@media (max-width: 799px) { .e10k4luw23 { grid-column: 1 / -1; display: block; min-width: unset } .e10k4luw23 { margin-bottom: 0px; margin-top: 64px } }
/* e10k4luw24 = img 1192x603 */
.e10k4luw24 { display: block }
@media (max-width: 799px) { .e10k4luw24 { display: none } }
/* e10k4luw25 = img 0x0 */
.e10k4luw25 { display: none }
@media (max-width: 799px) { .e10k4luw25 { display: block } }
```

### 1.1 Hero video card (Channels only, `efrydo*`)
A 172-wide button at the top of the right column: a 16:9 thumbnail (`launch-2026-twin-trav.mp4`, poster `launch-2026-twin-trav-poster.jpg`, `autoplay loop muted playsInline preload=none`) with a centred 24x24 white play chip, then "Channels 2.0 is here" (H16) and "See what's new →" (P16 64% → white on hover, 200ms ease-out).
- Hover scales the thumbnail ×1.05 over 400ms.
- Click opens a YouTube modal (portal, locks `html` scroll and pads for the scrollbar; modal content 1120px wide, md `calc(100% - 32px)`).

```css
/* e10k4luw8 = span «Beta» 44x20 */
.e10k4luw8 { font-family: $mono; font-size: 12px; font-weight: 400; letter-spacing: 1px; line-height: 12px; text-transform: uppercase; background-color: rgba(255, 255, 255, 0.16); border-radius: 4px; color: rgb(255, 255, 255); padding: 4px 6px }
@media (max-width: 1280px) { .e10k4luw8 { font-size: 12px; line-height: 12px } }
@media (max-width: 799px) { .e10k4luw8 { font-size: 12px; line-height: 12px } }
/* e10k4luw16 = div 272x408 */
.e10k4luw16 { align-items: flex-end; align-self: stretch; display: flex; flex-direction: column; flex-shrink: 0; gap: 24px; justify-content: space-between }
@media (min-width: 800px) and (max-width: 1280px) { .e10k4luw16 { align-items: flex-start; gap: 40px } }
@media (max-width: 799px) { .e10k4luw16 { align-items: flex-start } }
/* efrydo00 = button «Channels 2.0 is here See what's new →» 172x156 */
.efrydo00 { align-items: flex-start; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: flex; flex-direction: column; gap: 12px; margin: 0px; padding: 0px; text-align: left; width: min(184px, -68px + 16.6667vw) }
.efrydo00:focus-visible { outline: rgb(255, 255, 255) solid 2px; outline-offset: 4px }
@media (max-width: 1280px) { .efrydo00 { width: calc(-41.3333px + 16.6667vw) } }
@media (min-width: 800px) and (max-width: 1280px) { .efrydo00 { align-items: center; flex-direction: row; gap: 24px; width: auto } }
@media (max-width: 799px) { .efrydo00 { width: calc(-28px + 50vw) } }
/* efrydo01 = div 172x96 */
.efrydo01 { aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; position: relative; width: 100% }
.efrydo01 img, .efrydo01 video { display: block; height: 100%; object-fit: cover; transform: scale(var(--thumb-scale, 1)); transition: transform 400ms; width: 100% }
button:hover .efrydo01 img, button:hover .efrydo01 video, button:focus-visible .efrydo01 img, button:focus-visible .efrydo01 video { transform: scale(calc(var(--thumb-scale, 1) * 1.05)) }
@media (min-width: 800px) and (max-width: 1280px) { .efrydo01 { flex-shrink: 0; width: 184px } }
/* efrydo02 = span 24x24 */
.efrydo02 { align-items: center; background: rgb(255, 255, 255); border-radius: 4px; color: rgb(10, 10, 10); display: flex; height: 24px; justify-content: center; left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 24px }
.efrydo02 svg { display: block; height: 12px; width: 12px }
/* efrydo03 = div 156x48 */
.efrydo03 { display: flex; flex-direction: column }
/* efrydo04 = p «Channels 2.0 is here» 156x24 */
.efrydo04 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .efrydo04 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .efrydo04 { font-size: 16px; line-height: 24px } }
/* efrydo05 = p «See what's new →» 156x24 */
.efrydo05 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(255, 255, 255, 0.64); margin: 0px; transition: color 200ms ease-out }
button:hover .efrydo05, button:focus-visible .efrydo05 { color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .efrydo05 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .efrydo05 { font-size: 16px; line-height: 24px } }
```

## 2. LogoMarqueeWrap (page wrapper, e.g. `e1rv36b91`) + ProductLogoMarqueeSlice (`e1jzkpz9*`)
- The wrapper is `padding-top:380px` (md `calc(22.6% + 32px)`, sm 0). This makes room for the hero image overlapping by 286px; the marquee label sits 94px below the image bottom.
- Label `p.e1jzkpz90`: "Connecting the world’s greatest companies to their customers" (curly apostrophe), M14, 64% white, centred, margin-bottom 64 (sm: margin `64px 0 32px`).
- Track: full-bleed (`width:100vw; margin:0 -50vw` trick). Inside, a flex row `width:max-content` holding the brand list **twice**, animated `translateX(0) → translateX(-50%)` over **60s linear infinite** (CSS keyframes, `will-change:transform`).
- Each item `.e1jzkpz93`: opacity .64, `padding-right:64px` (sm 40), logo SVG height 40 (sm 28). The order is Amazon, Dyson, Mercedes-Benz, Qantas, AWS, Toyota, Canva, Volvo, Notion, Salesforce, Milwaukee, KPMG, Wise, McKinsey & Company, Ford, Walgreens, Shopify. The files are in `public/assets/marketing/svg/<brand>-*.svg`, and the same marks are in `public/assets/svg/hero-logo-*.svg` from the homepage.
- Digital Twins only: above the label, a ratings row `.eoxsi443` (flex, gap 32, centred, margin-bottom 48; sm column, gap 16, mb 32). It has three `Rating` links: G2 4.5, Capterra 4.6, TrustRadius 4.3. Each is 16px stars (white full stars, and a half star whose right half is `#3B3B3B`), gap 3, then the M12 label in 64% white → white on hover (150ms). They open the review sites in a new tab.

## 3. ProductStatementSlice (`e1ql6xhm*`), agents + DT
Centred H56 heading (max-width 616) and P20 64% body (max-width 600). Section padding `200px 0 96px` (md `120/64`, sm `0/48`).

```css
/* e1ql6xhm0 = section 1440x544 */
.e1ql6xhm0 { background-color: rgb(10, 10, 10); padding-bottom: 96px; padding-top: 200px }
@media (max-width: 1280px) { .e1ql6xhm0 { padding-bottom: 64px; padding-top: 120px } }
@media (max-width: 799px) { .e1ql6xhm0 { padding-bottom: 48px; padding-top: 0px } }
/* e1ql6xhm1 = h2 «Your team, minus the busywork» 616x120 */
.e1ql6xhm1 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px auto 16px; max-width: 616px; text-align: center }
@media (max-width: 1280px) { .e1ql6xhm1 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1ql6xhm1 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1ql6xhm2 = p «AI Agents run in the background—watching» 600x112 */
.e1ql6xhm2 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgba(255, 255, 255, 0.64); margin: 0px auto; max-width: 600px; text-align: center }
@media (max-width: 1280px) { .e1ql6xhm2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1ql6xhm2 { font-size: 16px; line-height: 24px } }
```

## 4. ProductScrollVideoSlice (`e182vtoz*`), agents + DT
- A 16:9 card (`max-width:1264px`, radius 8, black) containing a muted looping poster video (`launch-2026-twin-cheri.mp4` + poster jpg on agents; `digital-twins-scroll-loop.mp4` on DT, whose poster is a YouTube maxres image) and a centred 64x64 white play tile (radius 8, `drop-shadow(0 24px 64px rgba(0,0,0,.64))`, 40px play icon). The poster video is scaled ×`videoScale` (agents 1.2) via an inline transform.
- **Scroll motion (≥1281 only, rAF-throttled `scroll`/`resize` listener, disabled by reduced motion):**
  ```js
  a = clamp(startWidth / card.offsetWidth)      // startWidth = 827  → 0.6938 at 1440
  n = 0.55 * innerHeight
  top = card's document top (re-measured on resize/load)
  s = clamp((innerHeight - (top - scrollY)) / n)  // 0 → 1 as the card's top rises through the bottom 55% of the viewport
  scale = a + s * (1 - a)
  card.style.transform = `scale(${scale})`           // transform-origin: center top
  playTile.style.transform = `translate(-50%,-50%) scale(${1/scale})`   // the play tile keeps its size
  ```
  At <1281 the transform is `none !important`.
- **Click:** at ≥1281 it first smooth-scrolls so that s = 1, then swaps the card content for a YouTube iframe (autoplay; video ids `UInpLwSAVzE` agents, `llo7_0UC4v8` DT). The iframe is reset if the user scrolls back so s < .95.
- The poster video plays only while within `rootMargin:100px` of the viewport (IntersectionObserver).

```css
/* e182vtoz0 = div 1440x830 */
.e182vtoz0 { padding-bottom: 160px; padding-top: 0px }
@media (max-width: 1280px) { .e182vtoz0 { padding-bottom: 120px } }
@media (max-width: 799px) { .e182vtoz0 { padding-bottom: 96px } }
/* e182vtoz1 = section 1440x670 */
.e182vtoz1 { margin: 0px auto; max-width: none; padding: 0px 124px; position: relative; text-align: left; width: 100%; pointer-events: none }
@media (max-width: 1280px) { .e182vtoz1 { padding: 0px 64px } }
@media (max-width: 799px) { .e182vtoz1 { padding: 0px 16px } }
/* e182vtoz2 = div 827x465 */
.e182vtoz2 { aspect-ratio: 16 / 9; backface-visibility: hidden; background: rgb(10, 10, 10); border-radius: 8px; display: block; margin: 0px auto; max-width: 1264px; overflow: hidden; pointer-events: auto; position: relative; transform: scale(0.65); transform-origin: center top; width: 100%; will-change: transform }
[data-disabled="true"] .e182vtoz2 { transform: none }
@media (max-width: 1280px) { .e182vtoz2 { max-width: none; transform: none !important } }
/* e182vtoz4 = button 827x465 */
.e182vtoz4 { appearance: none; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: block; height: 100%; inset: 0px; padding: 0px; position: absolute; width: 100% }
/* e182vtoz3 = video 992x558 */
.e182vtoz3 { height: 100%; left: 0px; object-fit: cover; position: absolute; top: 0px; width: 100% }
/* e182vtoz6 = span 64x64 */
.e182vtoz6 { align-items: center; background: rgb(255, 255, 255); border-radius: 8px; color: rgb(10, 10, 10); display: flex; filter: drop-shadow(rgba(0, 0, 0, 0.64) 0px 24px 64px); height: 64px; justify-content: center; left: 50%; padding: 8px; pointer-events: none; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 64px; z-index: 1 }
.e182vtoz6 svg { height: 40px; width: 40px }
```

## 5. ProductFeaturesSlice (`e1r1adlk*`, sticky engine `e1h3sdf5*`)
4 numbered features. There are two DOM variants, both rendered, toggled by CSS:
- **Desktop sticky (≥1281, `.e1h3sdf51`)**: SliceGrid with the content column `1 / 6` (x124, 478 wide) and the image column `7 / 13` (x736, 580 wide).
  - Image column: `position:sticky; top:0` box of `height:100vh` holding all 4 images stacked absolutely. The active one has `opacity:1`, the others 0 (`transition: opacity 300ms ease-in-out`). Images are `*-feature-N.png` (1232x1400 natural, rendered 580x659 contain).
  - Content column: 4 items, each `height:100vh; position:sticky; display:flex; flex-direction:column; justify-content:center`, opacity 1 when active and **.4** otherwise (0.3s ease-in-out).
  - Item content (gap 32): a text block (gap 24) holding the number "01"–"04" (PP Mondwest 32/32 ls -1, **accent colour**), h2 (56/60 w600 ls -2; md 40/48; sm 32/40 ls -1) and body (P20 64%, ls -0.25). Then the CTA row: "Request a demo" primary, plus "Learn more" secondary on item 4 of agents (→ `/product/digital-twins/`).
  - The section height = items × 100vh (3600 at 900 tall).
  - **Active-index logic:** GSAP ScrollTrigger per item, `start:"center 85%"`, `end:"center 15%"`; `onEnter` and `onEnterBack` set the active index. `ScrollTrigger.refresh()` runs on mount and again after 2000ms.
- **Stacked (≤1280, `.e1h3sdf59`)**: a flex column with **gap 64** between features. Each feature is image (max-width 616 centred at md, full width at sm) then the text block, with no gap between them. The CTA row only shows on the last feature at ≤799. The section gets `padding-top:64px` at md and 0 at sm.

```css
/* e1r1adlk0 = section 1440x3600 */
.e1r1adlk0 { background-color: rgb(10, 10, 10) }
@media (max-width: 1280px) { .e1r1adlk0 { padding-top: 64px } }
@media (max-width: 799px) { .e1r1adlk0 { padding-top: 0px } }
/* e1h3sdf51 = div 1440x3600 */
.e1h3sdf51 { position: relative }
@media (max-width: 1280px) { .e1h3sdf51 { display: none } }
@media (max-width: 799px) { .e1h3sdf51 { display: none } }
/* e1h3sdf52 = div 580x900 */
.e1h3sdf52 { position: sticky; top: 0px }
/* e1h3sdf53 = div 580x900 */
.e1h3sdf53 { height: 100vh; min-height: fit-content; display: flex; align-items: center; position: relative }
/* e1h3sdf54 = div 580x900 */
.e1h3sdf54 { position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; display: flex; align-items: center; opacity: 1; transition: opacity 300ms ease-in-out; pointer-events: auto }
/* e1h3sdf54--v2 = div 580x900 */
.e1h3sdf54--v2 { position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; display: flex; align-items: center; opacity: 0; transition: opacity 300ms ease-in-out; pointer-events: none }
/* e1h3sdf55 = div 478x900 */
.e1h3sdf55 { display: flex; flex-direction: column; min-height: fit-content; height: 100vh; justify-content: center; opacity: 1; position: sticky; transition: opacity 0.3s ease-in-out }
/* e1r1adlk1 = div 478x472 */
.e1r1adlk1 { display: flex; flex-direction: column; gap: 32px }
/* e1r1adlk2 = div 478x400 */
.e1r1adlk2 { display: flex; flex-direction: column; gap: 24px }
/* e1r1adlk3 = p «01» 478x32 */
.e1r1adlk3 { color: rgb(93, 0, 161); font-family: $serif; font-size: 32px; font-weight: 400; letter-spacing: -1px; line-height: 32px; margin: 0px }
/* e1r1adlk4 = h2 «Set up once, sharpen with every run» 478x180 */
.e1r1adlk4 { color: rgb(255, 255, 255); font-size: 56px; font-weight: 600; letter-spacing: -2px; line-height: 60px; margin: 0px }
@media (max-width: 1280px) { .e1r1adlk4 { font-size: 40px; line-height: 48px } }
@media (max-width: 799px) { .e1r1adlk4 { font-size: 32px; line-height: 40px; letter-spacing: -1px } }
/* e1r1adlk5 = p «Give each agent its context and skills, » 478x140 */
.e1r1adlk5 { color: rgba(255, 255, 255, 0.64); font-size: 20px; font-weight: 400; letter-spacing: -0.25px; line-height: 28px; margin: 0px }
@media (max-width: 799px) { .e1r1adlk5 { font-size: 16px; line-height: 24px } }
/* e1r1adlk6 = div 478x40 */
.e1r1adlk6 { align-items: center; display: flex; gap: 8px }
@media (max-width: 799px) { .e1r1adlk6 { display: none } }
/* e1h3sdf55--v2 = div 478x900 */
.e1h3sdf55--v2 { display: flex; flex-direction: column; min-height: fit-content; height: 100vh; justify-content: center; opacity: 0.4; position: sticky; transition: opacity 0.3s ease-in-out }
/* e1r1adlk6--v2 = div 478x40 */
.e1r1adlk6--v2 { align-items: center; display: flex; gap: 8px }
@media (max-width: 799px) { .e1r1adlk6--v2 { display: flex } }
/* e1h3sdf59 = div 0x0 */
.e1h3sdf59 { display: none }
@media (max-width: 1280px) { .e1h3sdf59 { display: block } }
@media (max-width: 799px) { .e1h3sdf59 { display: block } }
/* e1h3sdf57 = div 0x0 */
.e1h3sdf57 { display: flex; flex-direction: column; gap: 64px }
/* e1h3sdf58 = div 0x0 */
.e1h3sdf58 { display: flex; flex-direction: column; gap: 0px }
/* e1h3sdf56 = div 0x0 */
.e1h3sdf56 img { display: block }
@media (max-width: 1280px) { .e1h3sdf56 { max-width: 616px; margin-left: auto; margin-right: auto } }
@media (max-width: 799px) { .e1h3sdf56 { max-width: none } }
```

## 6. ProductPromptCardsSlice (`e1y8zjgx*`, modal `e1bgi5s1*`), agents, chat, DT
- Section padding 120 (md 80, sm 64). H56 heading (margin-bottom 16), then the P20 64% subheading (max-width 600, margin-bottom 64, sm 40).
- **Icon variant (agents, chat):** BaseGrid of cards (`span 4`, tablet `span 6`, mobile full; row-gap 32, mobile 24). Each card is a `<button>`: bg `rgba(255,255,255,.04)`, border 1px `rgba(255,255,255,.08)`, radius 8, pad 32, flex column, gap 12, hover/focus bg `.08` (150ms ease). It contains:
  - a 64px icon row (48px-tall 3D png: `3d-crown.png`, `3d-megaphone.png`, `3d-target.png`, `3d-magnifier.png`, `3d-messy-folder.png`, `3d-temperature.png`; chat uses `ai-chat-prompt-icon-*.png`) with margin-bottom 32;
  - title (H20 white);
  - description (P16 64%);
  - "Try prompts" + 16px arrow (H16 white, margin-top 8).
  - Measured card 376x330 at 1440 (6 cards, 2 rows).
- **Label variant (DT):** a 3-column grid (`repeat(3,1fr)`, md 2, sm 1) with **1px gaps** on a `rgba(255,255,255,.08)` background and top/bottom borders, so the gaps read as hairlines. Each cell is a `<button>` (bg `#0A0A0A`, pad `64px 48px`, sm `48px 24px`, overflow hidden) holding:
  - an M12 64% label ("EXECUTIVE", etc.);
  - a block (gap 72) with an H24 title (max-width 300) and a P16 64% description.
  - On hover/focus an overlay `.e1y8zjgx5` fades in (`opacity 0→1, 400ms ease`, `backdrop-filter:blur(70px)`, bg `rgba(10,10,10,.04)`): an 80px-tall Digital Twin SVG (`svg/prompt-cell-hover-overlay-e1y8zjgx5-284436.svg`) over "Try Digital Twin" (H18).
  - Cells measured 396x364.
- **Modal (both variants)** opens on click:
  - Backdrop `position:fixed; inset:0; background:rgba(0,0,0,.4)`, fade-in 200ms ease. Clicking it closes the modal.
  - Panel `position:fixed; top:24px; bottom:24px; left:24px; width:480px; max-width:calc(100vw - 48px); overflow-y:auto; padding:48px; background:#141414; border:1px solid rgba(255,255,255,.08); border-radius:8px`. It slides in from the left: `translateX(calc(-100% - 24px)) → 0` over **320ms cubic-bezier(.22,1,.36,1)**. At sm it's inset 16 with pad 24.
  - Close button: 32x32 at top/right 16, bg `rgba(255,255,255,.16)` → `.24`, radius 4.
  - Content: icon (64px row) or M12 label, then title (H32 w600, or H24 for the label variant; margin 16px 0), then description P20 64%. Then a list (margin-top 48, gap 32) of prompts: M14 64% label, then a box (bg `#1E1E1E`, border `rgba(255,255,255,.08)`, radius 8, pad 32 / sm 20, gap 16, items aligned end) holding the prompt text (P16 white) and two 24x24 icon buttons: copy (bg `.16` → `.24`; shows a check for 2s after copying) and "open in Dovetail" (white bg, black icon, hover opacity .85) linking to `https://dovetail.com/agents/create?template=<slug>` or `https://dovetail.com/home`.
  - While open, the body is locked (`position:fixed; top:-scrollY; width:100%`, restored on close), focus is trapped, and Esc closes it.
  - Prompt texts are long paragraphs, so they're recorded as placeholders. They exist in the page source but aren't in the visible DOM until opened; the data file lists each card's title, description length and prompt labels.

```css
/* e1y8zjgx0 = div 1440x1128 */
.e1y8zjgx0 { background-color: rgb(10, 10, 10); padding-bottom: 120px; padding-top: 120px }
@media (max-width: 1280px) { .e1y8zjgx0 { padding-bottom: 80px; padding-top: 80px } }
@media (max-width: 799px) { .e1y8zjgx0 { padding-bottom: 64px; padding-top: 64px } }
/* e1y8zjgx1 = h2 «Put AI Agents to work» 1192x60 */
.e1y8zjgx1 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px 0px 16px }
@media (max-width: 1280px) { .e1y8zjgx1 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1y8zjgx1 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1y8zjgx2 = p «Always on, no nudge needed. Every output» 600x56 */
.e1y8zjgx2 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgba(255, 255, 255, 0.64); margin: 0px 0px 64px; max-width: 600px }
@media (max-width: 1280px) { .e1y8zjgx2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1y8zjgx2 { font-size: 16px; line-height: 24px } .e1y8zjgx2 { margin-bottom: 40px } }
/* e1y8zjgx3 = button «Executive narrative Turn feedback into a» 376x330 */
.e1y8zjgx3 { background-color: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; gap: 12px; height: 100%; padding: 32px; text-align: left; transition: background-color 150ms; width: 100% }
.e1y8zjgx3:hover, .e1y8zjgx3:focus-visible { background-color: rgba(255, 255, 255, 0.08) }
/* e1y8zjgx11 = div 310x64 */
.e1y8zjgx11 { align-items: center; display: flex; height: 64px; margin-bottom: 32px }
/* e1y8zjgx12 = p «Executive narrative» 310x28 */
.e1y8zjgx12 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1y8zjgx12 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1y8zjgx12 { font-size: 16px; line-height: 24px } }
/* e1y8zjgx13 = p «Turn feedback into a board-ready narrati» 310x72 */
.e1y8zjgx13 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(255, 255, 255, 0.64); margin: 0px }
@media (max-width: 1280px) { .e1y8zjgx13 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1y8zjgx13 { font-size: 16px; line-height: 24px } }
/* e1y8zjgx14 = span «Try prompts» 310x24 */
.e1y8zjgx14 { font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px; align-items: center; color: rgb(255, 255, 255); display: flex; gap: 4px; margin-top: 8px }
@media (max-width: 1280px) { .e1y8zjgx14 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1y8zjgx14 { font-size: 16px; line-height: 24px } }
```

DT label variant:

```css
/* e1y8zjgx4 = div 1192x1096 */
.e1y8zjgx4 { background-color: rgba(255, 255, 255, 0.08); border-bottom: 1px solid rgba(255, 255, 255, 0.08); border-top: 1px solid rgba(255, 255, 255, 0.08); display: grid; gap: 1px; grid-template-columns: repeat(3, 1fr) }
@media (max-width: 1280px) { .e1y8zjgx4 { grid-template-columns: repeat(2, 1fr) } }
@media (max-width: 799px) { .e1y8zjgx4 { grid-template-columns: 1fr } }
/* e1y8zjgx7 = button «EXECUTIVE End the guessing, get one org-» 396x364 */
.e1y8zjgx7 { appearance: none; background-color: rgb(10, 10, 10); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: flex; flex-direction: column; justify-content: flex-start; overflow: hidden; padding: 64px 48px; position: relative; text-align: left }
.e1y8zjgx7:hover .prompt-cell-hover-overlay, .e1y8zjgx7:focus-visible .prompt-cell-hover-overlay { opacity: 1 }
@media (max-width: 799px) { .e1y8zjgx7 { padding: 48px 24px } }
/* e1y8zjgx8 = div 300x236 */
.e1y8zjgx8 { display: flex; flex-direction: column; gap: 16px }
/* e1y8zjgx9 = span «Executive» 73x12 */
.e1y8zjgx9 { font-family: $mono; font-size: 12px; font-weight: 400; letter-spacing: 1px; line-height: 12px; text-transform: uppercase; align-self: flex-start; color: rgba(255, 255, 255, 0.64) }
@media (max-width: 1280px) { .e1y8zjgx9 { font-size: 12px; line-height: 12px } }
@media (max-width: 799px) { .e1y8zjgx9 { font-size: 12px; line-height: 12px } }
/* e1y8zjgx10 = div 300x208 */
.e1y8zjgx10 { display: flex; flex-direction: column; gap: 72px }
/* e1y8zjgx12 = p «End the guessing, get one org-wide view» 300x64 */
.e1y8zjgx12 { font-family: $sans; font-size: 24px; line-height: 32px; font-weight: 500; letter-spacing: -0.5px; max-width: 300px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1y8zjgx12 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1y8zjgx12 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } }
/* e1y8zjgx5 = div 396x364 */
.e1y8zjgx5 { align-items: center; backdrop-filter: blur(70px); background-color: rgba(10, 10, 10, 0.04); inset: 0px; display: flex; flex-direction: column; gap: 8px; justify-content: center; opacity: 0; pointer-events: none; position: absolute; transition: opacity 400ms }
.e1y8zjgx5 > svg { height: 80px; width: auto }
/* e1y8zjgx6 = span «Try Digital Twin» 129x24 */
.e1y8zjgx6 { font-family: $sans; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.25px; align-items: center; color: rgb(255, 255, 255); display: flex; gap: 4px }
@media (max-width: 1280px) { .e1y8zjgx6 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1y8zjgx6 { font-size: 16px; line-height: 24px } }
```

## 7. ProductForSlice (`eea47v9*`), channels, dashboards, docs, projects
A scroll-driven use-case list.
- Root height = `calc(100vh + 500px * N)` (N = number of use cases; 6 on channels/projects → 3900 at 900 tall, 5 on dashboards/docs → 3400).
- A `sticky; top:0; height:100vh` inner panel centres a SliceContainer (`display:flex; gap:141px`, md 64; sm column, gap 40). It holds:
  - left: an H56 heading `white-space:nowrap`, e.g. "Channels for";
  - right: the list.
- **Active item:** a button row with a 56px 3D icon (md 40, sm 32) at opacity 1, and the label as **Inter H56** white. Below it the description (P20 64%, max-width 720, **fixed height 84px**, md 72px, overflow hidden). The block animates in with `@keyframes {from{opacity:0; transform:translateY(4px)} to{opacity:1; transform:none}}` **250ms ease both**.
- **Inactive items:** icon at opacity .4 and the label in **PP Mondwest** 65px/60 (mondwestSize(56); md 46/48; sm 37/40 ls normal) at opacity .4. Hovering the row brings both to 1 (300ms ease). Clicking selects the item. Rows have padding-bottom 32 (last 0).
- **Scroll logic** (≥768 wide only): on `scroll` (passive, starts after the first rAF), find the ancestor whose `offsetHeight ≥ 500*N`, take `progress = clamp(-top, 0, 500*N)` and set the active index to `min(N-1, floor(progress/500))`. So each item owns 500px of scroll.
- At ≤799 the root is `height:auto; padding:64px 0`, the panel is static, a 20px chevron shows on each row (rotated 90° when active) and descriptions are `height:auto`.
- Icons: `3d-flag.png`, `3d-chess-queen.png`, … (see data file).

```css
/* eea47v90 = div 1440x3900 */
.eea47v90 { background-color: rgb(10, 10, 10); height: calc(3000px + 100vh) }
@media (max-width: 799px) { .eea47v90 { height: auto; padding-top: 64px; padding-bottom: 64px } }
/* eea47v91 = div 1440x900 */
.eea47v91 { position: sticky; top: 0px; height: 100vh; display: flex; align-items: center; overflow: hidden }
@media (max-width: 799px) { .eea47v91 { position: static; height: auto } }
/* eea47v92 = section 1440x644 */
.eea47v92 { margin: 0px auto; max-width: 1512px; padding: 0px 124px; position: relative; text-align: left; display: flex; align-items: flex-start; gap: 141px; width: 100% }
@media (max-width: 1280px) { .eea47v92 { padding: 0px 64px } .eea47v92 { gap: 64px } }
@media (max-width: 799px) { .eea47v92 { padding: 0px 16px } .eea47v92 { flex-direction: column; gap: 40px } }
/* eea47v93 = div 321x60 */
.eea47v93 { flex-shrink: 0 }
/* eea47v94 = h2 «Channels for» 321x60 */
.eea47v94 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px; white-space: nowrap }
@media (max-width: 1280px) { .eea47v94 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .eea47v94 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } .eea47v94 { white-space: normal } }
/* eea47v95 = div 729x644 */
.eea47v95 { flex: 1 1 0%; min-width: 0px; display: flex; flex-direction: column }
/* eea47v96 = div 729x216 */
.eea47v96 { cursor: pointer; padding-bottom: 32px }
.eea47v96:last-child { padding-bottom: 0px }
/* eea47v97 = div 729x184 */
.eea47v97 { display: flex; flex-direction: column; gap: 24px; padding-bottom: 16px; animation: 250ms ease 0s 1 normal both running animation-1e051ht }
/* eea47v98 = button «Roadmap prioritization» 729x60 */
.eea47v98 { align-items: center; appearance: none; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; color: inherit; cursor: pointer; display: flex; font: inherit; gap: 16px; justify-content: space-between; margin: 0px; padding: 0px; text-align: left; width: 100% }
/* eea47v99 = span 650x60 */
.eea47v99 { align-items: center; display: flex; gap: 24px; min-width: 0px }
/* eea47v910 = img 56x56 */
.eea47v910 { flex-shrink: 0; height: 56px; object-fit: contain; opacity: 1; transition: opacity 300ms; width: auto }
.eea47v96:hover .eea47v910 { opacity: 1 }
@media (max-width: 1280px) { .eea47v910 { height: 40px } }
@media (max-width: 799px) { .eea47v910 { height: 32px } }
/* eea47v912 = span «Roadmap prioritization» 570x60 */
.eea47v912 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); display: block; margin: 0px }
@media (max-width: 1280px) { .eea47v912 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .eea47v912 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* eea47v911 = svg 0x0 */
.eea47v911 { color: rgb(255, 255, 255); display: none; flex-shrink: 0; height: auto; opacity: 1; transform: rotate(90deg); width: 20px }
@media (max-width: 799px) { .eea47v911 { display: block } }
/* eea47v913 = p «Classify high-volume feedback into theme» 720x84 */
.eea47v913 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgba(255, 255, 255, 0.64); letter-spacing: -0.25px; margin: 0px; max-width: 720px; height: 84px; overflow: hidden }
@media (max-width: 1280px) { .eea47v913 { font-size: 16px; line-height: 24px } .eea47v913 { height: 72px } }
@media (max-width: 799px) { .eea47v913 { font-size: 16px; line-height: 24px } .eea47v913 { height: auto; overflow: visible } }
/* eea47v910--v2 = img 56x56 */
.eea47v910--v2 { flex-shrink: 0; height: 56px; object-fit: contain; opacity: 0.4; transition: opacity 300ms; width: auto }
.eea47v96:hover .eea47v910--v2 { opacity: 1 }
@media (max-width: 1280px) { .eea47v910--v2 { height: 40px } }
@media (max-width: 799px) { .eea47v910--v2 { height: 32px } }
/* eea47v914 = span «Voice of customer» 427x60 */
.eea47v914 { color: rgb(255, 255, 255); display: block; font-family: $serif; font-size: 65px; font-weight: 400; letter-spacing: -2px; line-height: 60px; margin: 0px; opacity: 0.4; transition: opacity 300ms }
.eea47v96:hover .eea47v914 { opacity: 1 }
@media (max-width: 1280px) { .eea47v914 { font-size: 46px; line-height: 48px } }
@media (max-width: 799px) { .eea47v914 { font-size: 37px; letter-spacing: normal; line-height: 40px } }
/* eea47v911--v2 = svg 0x0 */
.eea47v911--v2 { color: rgb(255, 255, 255); display: none; flex-shrink: 0; height: auto; opacity: 0.4; transform: none; width: 20px }
@media (max-width: 799px) { .eea47v911--v2 { display: block } }
@keyframes animation-1e051ht { 0% { opacity: 0; transform: translateY(4px); } 100% { opacity: 1; transform: translateY(0px); } }
```

## 8. ProductQuoteSlice (`e1cnxsk6*`)
- Root `.e1cnxsk60` (black, overflow hidden) > SliceContainer > GridImageBackground (shared §7.7, image `testimonial-grid-bg.png.png`, 1260x560 at 1440, **hidden at ≤799**) > content box `.e1cnxsk62` (max-width 940, centred).
- Quote `blockquote.e1cnxsk66` is preset H40 white, wrapped in curly quotes. An optional 80x80 photo floats left (radius 8, margin `8px 24px 0 0`; sm 56x56 block, mb 16).
- Footer `.e1cnxsk67` (margin-top 64, sm 32; flex, gap 32, wrap):
  - company white logo (height 24), a 1x40 divider `rgba(255,255,255,.24)`, then name and title (M14 white; the title at opacity .6);
  - ProgressTabs pushed right with `margin-left:auto` (sm 0) when there are several testimonials.
- Quote and author blocks fade in with `@keyframes animation-5j8bii {opacity 0→1}` **400ms ease** each time the index changes.
- Auto-advance: `useTabGroup(0, 60)`, i.e. 6s per testimonial, starting when first in view; clicking a number stops it. Testimonials are fetched per page (agents: 4, the first from Zapier "Roy Olende, Head of UX Research"). The quotes are placeholders in the data file; names, titles and logos are verbatim.

```css
/* e1cnxsk60 = div 1440x560 */
.e1cnxsk60 { background-color: rgb(10, 10, 10); overflow: hidden; position: relative }
/* e1cnxsk62 = div 940x248 */
.e1cnxsk62 { margin: 0px auto; max-width: 940px; position: relative; width: 100% }
/* e1cnxsk63 = div 940x144 */
.e1cnxsk63 { animation: 400ms ease 0s 1 normal none running animation-5j8bii }
@media (prefers-reduced-motion: reduce) { .e1cnxsk63 { animation: auto ease 0s 1 normal none running none } }
/* e1cnxsk66 = blockquote «“I can jump into Dovetail, search for ei» 940x144 */
.e1cnxsk66 { font-family: $sans; font-size: 40px; font-weight: 500; letter-spacing: -1px; line-height: 48px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1cnxsk66 { font-size: 32px; line-height: 40px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1cnxsk66 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e1cnxsk67 = div 940x40 */
.e1cnxsk67 { align-items: center; clear: left; display: flex; flex-wrap: wrap; gap: 32px; margin-top: 64px }
@media (max-width: 799px) { .e1cnxsk67 { align-items: flex-start; flex-direction: column; margin-top: 32px } }
/* e1cnxsk64 = div 296x40 */
.e1cnxsk64 { align-items: center; animation: 400ms ease 0s 1 normal none running animation-5j8bii; display: flex; gap: 32px }
@media (prefers-reduced-motion: reduce) { .e1cnxsk64 { animation: auto ease 0s 1 normal none running none } }
/* e1cnxsk68 = img 53x24 */
.e1cnxsk68 { display: block; height: 24px; width: auto }
/* e1cnxsk69 = div 1x40 */
.e1cnxsk69 { background-color: rgba(255, 255, 255, 0.24); flex-shrink: 0; height: 40px; width: 1px }
/* e1cnxsk610 = div 178x39 */
.e1cnxsk610 { display: flex; flex-direction: column }
/* e1cnxsk611 = p «Roy Olende» 178x19 */
.e1cnxsk611 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .e1cnxsk611 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e1cnxsk611 { font-size: 14px; line-height: 140% } }
/* e1cnxsk612 = p «Head of UX Research» 178x19 */
.e1cnxsk612 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(255, 255, 255); margin: 0px; opacity: 0.6 }
@media (max-width: 1280px) { .e1cnxsk612 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e1cnxsk612 { font-size: 14px; line-height: 140% } }
@keyframes animation-5j8bii { 0% { opacity: 0; } 100% { opacity: 1; } }
```

## 9. ProductCarouselSlice (`e1c9zraz*`)
- Section padding 120 (md 80, sm 64), bg black.
- Head row `.e1c9zraz1` (flex, space-between, align end, margin-bottom 96; sm column, gap 32, mb 40):
  - left (max-width 835, gap 24): h2 with Inter span `.e1c9zraz4` (64px, md 48, sm 32; lh 60/52/36) and an optional Mondwest span (74/56/37px); P20 64% subheading (max-width 616); CTA row (primary "Request a demo" → `/contact-sales/`);
  - right: two 40x34 arrow buttons (32px-wide arrow svg `viewBox 0 0 39 32`; the left one is mirrored with `scaleX(-1)`), gap 8, hidden at sm. Hover opacity .75. Disabled at the start/end: svg colour `rgba(255,255,255,.32)`, `cursor:default`. Click `scrollBy({left: ±434, behavior:"smooth"})` (card 402 + gap 32). The disabled state comes from a scroll listener: left disabled if `scrollLeft == 0`, right disabled if `scrollLeft + clientWidth >= scrollWidth - 1`.
- Track `.e1c9zraz10`: `display:flex; gap:32px; overflow-x:auto; scrollbar hidden; padding-left:max(124px, calc((100vw - 1512px)/2 + 124px)); padding-right:124px` (md 64/64, sm 16/16). The first card aligns with the container while the track bleeds to the right edge.
- Card `.e1c9zraz11`: 402 wide (sm 280), flex column, gap 32. It holds an image (height 450, sm 312, radius 8, border 1px `rgba(255,255,255,.08)`, cover; `*-carousel-N.png` 804x900) and text (gap 8): title H20 white (with an optional mono "Beta"-style chip `.e1c9zraz16`: 11px mono, bg `.08`, radius 4, pad `4px 6px`) and P16 64% body.
- Agents has 5 cards, chat 6, DT 5.

```css
/* e1y8zjgx0 = div 1440x1128 */
.e1y8zjgx0 { background-color: rgb(10, 10, 10); padding-bottom: 120px; padding-top: 120px }
@media (max-width: 1280px) { .e1y8zjgx0 { padding-bottom: 80px; padding-top: 80px } }
@media (max-width: 799px) { .e1y8zjgx0 { padding-bottom: 64px; padding-top: 64px } }
/* e1c9zraz1 = div 1192x288 */
.e1c9zraz1 { align-items: flex-end; display: flex; gap: 24px; justify-content: space-between; margin-bottom: 96px }
@media (max-width: 799px) { .e1c9zraz1 { align-items: flex-start; flex-direction: column; gap: 32px; margin-bottom: 40px } }
/* e1c9zraz2 = div 616x288 */
.e1c9zraz2 { display: flex; flex-direction: column; gap: 24px; max-width: 835px }
/* e1c9zraz3 = h2 «You set the rules. Agents do the rest.» 616x144 */
.e1c9zraz3 { color: rgb(255, 255, 255); font-weight: 600; letter-spacing: -2px; line-height: 60px; margin: 0px }
@media (max-width: 1280px) { .e1c9zraz3 { letter-spacing: -1px; line-height: 52px } }
@media (max-width: 799px) { .e1c9zraz3 { letter-spacing: -0.25px; line-height: 36px } }
/* e1c9zraz4 = span «You set the rules.Agents do the rest.» 548x149 */
.e1c9zraz4 { font-size: 64px }
@media (max-width: 1280px) { .e1c9zraz4 { font-size: 48px } }
@media (max-width: 799px) { .e1c9zraz4 { font-size: 32px } }
/* e1c9zraz6 = p «Control what each agent does, and where » 616x56 */
.e1c9zraz6 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgba(255, 255, 255, 0.64); margin: 0px; max-width: 616px }
@media (max-width: 1280px) { .e1c9zraz6 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1c9zraz6 { font-size: 16px; line-height: 24px } }
/* e10k4luw6 = div 896x28 */
.e10k4luw6 { align-items: center; display: flex; gap: 8px }
/* e1c9zraz8 = div 88x34 */
.e1c9zraz8 { align-items: center; display: flex; flex-shrink: 0; gap: 8px }
@media (max-width: 799px) { .e1c9zraz8 { display: none } }
/* e1c9zraz9 = button 40x34 */
.e1c9zraz9 { align-items: center; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: flex; justify-content: center; padding: 4px }
.e1c9zraz9:disabled { cursor: default }
.e1c9zraz9 svg { color: rgb(255, 255, 255); display: block; height: auto; transform: scaleX(-1); width: 32px }
.e1c9zraz9:hover:not(:disabled) { opacity: 0.75 }
.e1c9zraz9:disabled svg { color: rgba(255, 255, 255, 0.32) }
/* e1c9zraz9--v2 = button 40x34 */
.e1c9zraz9--v2 { align-items: center; background: none; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer; display: flex; justify-content: center; padding: 4px }
.e1c9zraz9--v2:disabled { cursor: default }
.e1c9zraz9--v2 svg { color: rgb(255, 255, 255); display: block; height: auto; transform: none; width: 32px }
.e1c9zraz9--v2:hover:not(:disabled) { opacity: 0.75 }
.e1c9zraz9--v2:disabled svg { color: rgba(255, 255, 255, 0.32) }
/* e1c9zraz10 = div 1440x589 */
.e1c9zraz10 { display: flex; gap: 32px; overflow-x: auto; padding-left: max(124px, -632px + 50vw); padding-right: 124px; scrollbar-width: none }
.e1c9zraz10::-webkit-scrollbar { display: none }
@media (max-width: 1280px) { .e1c9zraz10 { padding-left: 64px; padding-right: 64px } }
@media (max-width: 799px) { .e1c9zraz10 { padding-left: 16px; padding-right: 16px } }
/* e1c9zraz11 = div 402x589 */
.e1c9zraz11 { display: flex; flex-direction: column; flex-shrink: 0; gap: 32px; width: 402px }
@media (max-width: 799px) { .e1c9zraz11 { width: 280px } }
/* e1c9zraz12 = img 402x449 */
.e1c9zraz12 { border-radius: 8px; height: 450px; overflow: hidden; width: 100% }
@media (max-width: 799px) { .e1c9zraz12 { height: 312px } }
/* e1c9zraz13 = div 402x108 */
.e1c9zraz13 { display: flex; flex-direction: column; gap: 8px }
/* e1c9zraz15 = p «On-demand agents» 180x28 */
.e1c9zraz15 { color: rgb(255, 255, 255); font-size: 20px; font-weight: 500; letter-spacing: -0.25px; line-height: 28px; margin: 0px }
/* e1c9zraz17 = p «Always on, ready to answer whatever you » 402x72 */
.e1c9zraz17 { color: rgba(255, 255, 255, 0.64); font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px }
```

## 10. Findings block (`e1fjikez*` + FeatureCardGrid `e1rt7vde*`/`eiz8yhc*`), channels, chat, dashboards, docs, projects
- Section padding 120 (md 80, sm 64).
- Centred heading `h2.e1fjikez1` (max-width 818, lh 76/68/44): "Get" (Inter 80/64/40) + inline icon `product-findings-icon.png` (308x188 natural; wrapper width 157/79/52, image height 96/48/32) + "more" (PP Mondwest 93/74/46) + "from your findings" (Inter).
- P20 64% subheading "The real value isn’t in the analysis. It’s in what you do with it next." (max-width 818, margin `24px auto 96px`; sm `16px auto 40px`).
- InnerGrid (12 col) of feature cards. Each card: bg `#141414`, border 1px `#1E1E1E`, radius 8, overflow hidden.
  - **Vertical card** (column span 6, 580 wide): image on top (contain), then text with margin `0 0 64px 64px` (sm `0 32px 32px`).
  - **Horizontal card** (full width, `flex-direction:row-reverse`): image max-width 614, `flex-grow:7` on the right; text `flex-grow:5`, margin 64 (≤1512: `0 0 0 64px`) on the left.
  - Card text (gap 16, max-width 464): h3 (H20 white, flex with a 24x24 product icon `ai-projects-icon-{chat|docs|agents}.svg`), P16 `#A7A7A7`, and a "Learn more" link (16/24 w500 white, `::after` underline scaleX 0→1 200ms ease-out, 24px arrow; arrow span moves 4px on hover).
- Card sets per page are in the data files (channels, dashboards, projects: AI Chat + AI Docs vertical, AI Agents horizontal; chat: AI Docs + AI Agents, both vertical; docs: AI Agents horizontal only).

```css
/* e1c9zraz0 = div 1440x1213 */
.e1c9zraz0 { background-color: rgb(10, 10, 10); padding-bottom: 120px; padding-top: 120px }
@media (max-width: 1280px) { .e1c9zraz0 { padding-bottom: 80px; padding-top: 80px } }
@media (max-width: 799px) { .e1c9zraz0 { padding-bottom: 64px; padding-top: 64px } }
/* e1fjikez1 = h2 «Get more from your findings» 818x188 */
.e1fjikez1 { color: rgb(255, 255, 255); font-weight: 600; letter-spacing: -2px; line-height: 76px; margin: 0px auto; max-width: 818px; text-align: center }
@media (max-width: 1280px) { .e1fjikez1 { letter-spacing: -2px; line-height: 68px } }
@media (max-width: 799px) { .e1fjikez1 { letter-spacing: -1px; line-height: 44px } }
/* e1fjikez2 = span «Get» 129x97 */
.e1fjikez2 { font-size: 80px }
@media (max-width: 1280px) { .e1fjikez2 { font-size: 64px } }
@media (max-width: 799px) { .e1fjikez2 { font-size: 40px } }
/* e1fjikez4 = span 157x0 */
.e1fjikez4 { display: inline-block; vertical-align: middle; height: 0px; line-height: 0; font-size: 0px; position: relative; overflow: visible; z-index: 1; margin: 0px 12px; width: 157px }
@media (max-width: 1280px) { .e1fjikez4 { margin: 0px 8px; width: 79px } }
@media (max-width: 799px) { .e1fjikez4 { width: 52px } }
/* e1fjikez5 = img 157x96 */
.e1fjikez5 { position: absolute; width: auto; object-fit: contain; top: 50%; left: 50%; height: 96px; transform: translate(-50%, calc(-50% - 12px)) }
@media (max-width: 1280px) { .e1fjikez5 { height: 48px } .e1fjikez5 { transform: translate(-50%, calc(-50% - 4px)) } }
@media (max-width: 799px) { .e1fjikez5 { height: 32px } }
/* e1fjikez3 = span «more» 187x96 */
.e1fjikez3 { font-family: $serif; font-size: 93px; font-weight: 400 }
@media (max-width: 1280px) { .e1fjikez3 { font-size: 74px } }
@media (max-width: 799px) { .e1fjikez3 { font-size: 46px } }
/* e1fjikez6 = p «The real value isn’t in the analysis. It» 818x28 */
.e1fjikez6 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgba(255, 255, 255, 0.64); margin: 24px auto 96px; max-width: 818px; text-align: center }
@media (max-width: 1280px) { .e1fjikez6 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1fjikez6 { font-size: 16px; line-height: 24px } .e1fjikez6 { margin: 16px auto 40px } }
/* e1rt7vde0 = div 580x640 */
.e1rt7vde0 { align-items: flex-start; justify-content: flex-start; display: flex; flex-direction: column; background: rgb(20, 20, 20); border: 1px solid rgb(30, 30, 30); border-radius: 8px; overflow: hidden; gap: 0px }
@media (max-width: 799px) { .e1rt7vde0 { flex-direction: column; align-items: flex-start } }
/* e1rt7vde2 = div 578x416 */
.e1rt7vde2 { flex-grow: 1; max-width: 100%; position: relative }
@media (max-width: 799px) { .e1rt7vde2 { max-width: 100% } }
/* eiz8yhc0 = div 464x158 */
.eiz8yhc0 { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; flex-grow: 1; max-width: 464px; margin: 0px 0px 64px 64px }
@media (max-width: 1512px) { .eiz8yhc0 { margin: 0px 0px 64px 64px } }
@media (max-width: 799px) { .eiz8yhc0 { margin: 0px 32px 32px; max-width: 100% } }
/* e1fjikez7 = h3 «AI Chat» 100x28 */
.e1fjikez7 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; align-items: center; color: rgb(255, 255, 255); display: flex; gap: 8px; margin: 0px }
@media (max-width: 1280px) { .e1fjikez7 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1fjikez7 { font-size: 16px; line-height: 24px } }
/* e1fjikez8 = img 24x24 */
.e1fjikez8 { height: 24px; width: 24px }
/* eiz8yhc2 = p «Ask questions across your channels in na» 464x72 */
.eiz8yhc2 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); max-width: 464px }
@media (max-width: 1280px) { .eiz8yhc2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eiz8yhc2 { font-size: 16px; line-height: 24px } }
/* eiz8yhc4 = a «Learn more» 113x26 */
.eiz8yhc4 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; box-shadow: none; display: inline-flex; color: rgb(255, 255, 255); text-decoration: underline 1px transparent; text-underline-offset: 1.5px; position: relative; padding: 0px; text-align: left; white-space: normal; transition: color 200ms ease-out; font-family: $sans; font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0px }
.eiz8yhc4:disabled { opacity: 0.6; pointer-events: none }
.eiz8yhc4:hover, .eiz8yhc4:focus-visible { opacity: 0.9; text-decoration: underline }
.eiz8yhc4:hover > span, .eiz8yhc4:focus-visible > span { transform: translate3d(4px, 0px, 0px) }
.eiz8yhc4:hover, .eiz8yhc4:focus { text-decoration: underline }
.eiz8yhc4::after { content: ""; position: absolute; bottom: 2px; left: 0px; width: 100%; height: 1px; background-color: rgb(255, 255, 255); transform: scaleX(0); transform-origin: left center; transition: transform 200ms ease-out }
.eiz8yhc4:hover::after, .eiz8yhc4:focus-visible::after { transform: scaleX(1) }
.eiz8yhc4.eiz8yhc4:hover, .eiz8yhc4.eiz8yhc4:focus-visible { text-decoration-color: transparent }
@media (max-width: 1280px) { .eiz8yhc4 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eiz8yhc4 { font-size: 16px; line-height: 24px } }
/* e1rt7vde0--v2 = div 1192x443 */
.e1rt7vde0--v2 { align-items: center; justify-content: space-between; display: flex; flex-direction: row-reverse; background: rgb(20, 20, 20); border: 1px solid rgb(30, 30, 30); border-radius: 8px; overflow: hidden; gap: 0px }
@media (max-width: 799px) { .e1rt7vde0--v2 { flex-direction: column; align-items: flex-start } }
/* e1rt7vde2--v2 = div 614x441 */
.e1rt7vde2--v2 { flex-grow: 7; max-width: 614px; position: relative }
@media (max-width: 799px) { .e1rt7vde2--v2 { max-width: 100% } }
/* eiz8yhc0--v2 = div 464x158 */
.eiz8yhc0--v2 { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; flex-grow: 5; max-width: 464px; margin: 64px }
@media (max-width: 1512px) { .eiz8yhc0--v2 { margin: 0px 0px 0px 64px } }
@media (max-width: 799px) { .eiz8yhc0--v2 { margin: 0px 32px 32px; max-width: 100% } }
```

## 11. Digital Twins only
**VoiceMode** (`e13rmnxw*`):
- Section padding `30px 0 80px` (md 80/80, sm `64px 0 0`).
- Centred column max-width 832, gap 64 (sm 40):
  - text block (gap 24): mono tag (`.e13rmnxw3`: 12px mono, bg `.08`, radius 4, pad `4px 6px`, 64% white), H56 "Ask out loud, with voice mode" (max-width 480, centred), P20 64% (max-width 650), and a CTA row with **"Contact sales" primary (→ `/contact-sales/`) and "Try Dovetail free" secondary (→ `/auth/signup/`)**;
  - image `digital-twins-voice-mode.png` (832x450).

**Statement quote wrapper** `.eoxsi445`: at sm, bg black and padding-bottom 64.

**Carousel heading** `.eoxsi440` uses H56 instead of the 64px span ("Configure once.\nTrust every answer.").

```css
/* eoxsi442 = div 1440x569 */
.eoxsi442 { padding-top: 380px }
@media (max-width: 1280px) { .eoxsi442 { padding-top: calc(22.6% + 32px) } }
@media (max-width: 799px) { .eoxsi442 { padding-top: 0px } }
/* eoxsi443 = div 1440x18 */
.eoxsi443 { align-items: center; display: flex; gap: 32px; justify-content: center; margin-bottom: 48px }
@media (max-width: 799px) { .eoxsi443 { flex-direction: column; gap: 16px; margin-bottom: 32px } }
/* e1oz23xw2 = a «G2» 118x18 */
.e1oz23xw2 { justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; font-family: inherit; font-weight: inherit; color: rgb(255, 255, 255); display: flex; align-items: center; flex-direction: row; gap: 8px; pointer-events: auto; width: fit-content }
.e1oz23xw2:disabled { opacity: 0.6; pointer-events: none }
.e1oz23xw2:hover, .e1oz23xw2:focus-visible { color: rgb(167, 167, 167) }
.e1oz23xw2:hover .e1oz23xw1, .e1oz23xw2:focus-visible .e1oz23xw1 { color: rgb(255, 255, 255) !important }
.e1oz23xw2.e1oz23xw2 svg { color: rgb(250, 250, 250) }
.e1oz23xw2.e1oz23xw2 p { color: rgba(255, 255, 255, 0.64) }
.e1oz23xw2.e1oz23xw2:hover p, .e1oz23xw2.e1oz23xw2:focus-visible p { color: rgb(250, 250, 250) }
/* e1oz23xw0 = div 92x16 */
.e1oz23xw0 { color: rgb(255, 255, 255); display: flex; gap: 3px }
/* e1oz23xw1 = p «G2» 16x12 */
.e1oz23xw1 { transition: color 150ms; color: rgb(167, 167, 167); font-family: $mono; font-size: 12px; font-weight: 400; letter-spacing: 1px; line-height: 12px; text-transform: uppercase }
@media (max-width: 1280px) { .e1oz23xw1 { font-size: 12px; line-height: 12px } }
@media (max-width: 799px) { .e1oz23xw1 { font-size: 12px; line-height: 12px } }
/* eoxsi445 = div 1440x560 */
@media (max-width: 799px) { .eoxsi445 { background-color: rgb(10, 10, 10); padding-bottom: 64px } }
/* e13rmnxw0 = section 1440x888 */
.e13rmnxw0 { background-color: rgb(10, 10, 10); padding-bottom: 80px; padding-top: 30px }
@media (max-width: 1280px) { .e13rmnxw0 { padding-bottom: 80px; padding-top: 80px } }
@media (max-width: 799px) { .e13rmnxw0 { padding-bottom: 0px; padding-top: 64px } }
/* e13rmnxw1 = div 832x778 */
.e13rmnxw1 { align-items: center; display: flex; flex-direction: column; gap: 64px; margin: 0px auto; max-width: 832px }
@media (max-width: 799px) { .e13rmnxw1 { gap: 40px } }
/* e13rmnxw2 = div 650x264 */
.e13rmnxw2 { align-items: center; display: flex; flex-direction: column; gap: 24px }
/* e13rmnxw4 = h2 «Ask out loud, with voice mode» 480x120 */
.e13rmnxw4 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; color: rgb(255, 255, 255); margin: 0px; max-width: 480px; text-align: center }
@media (max-width: 1280px) { .e13rmnxw4 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .e13rmnxw4 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e13rmnxw6 = p «Talk to your Digital Twins the same way » 650x56 */
.e13rmnxw6 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgba(255, 255, 255, 0.64); margin: 0px; max-width: 650px; text-align: center }
@media (max-width: 1280px) { .e13rmnxw6 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e13rmnxw6 { font-size: 16px; line-height: 24px } }
/* e10k4luw6 = div 936x28 */
.e10k4luw6 { align-items: center; display: flex; gap: 8px }
/* e13rmnxw5 = img 832x450 */
.e13rmnxw5 { height: auto; width: 100% }
/* eoxsi440 = span «Configure once.Trust every answer.» 497x137 */
.eoxsi440 { font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px }
@media (max-width: 1280px) { .eoxsi440 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
@media (max-width: 799px) { .eoxsi440 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* eoxsi446 = div 1440x639 */
.eoxsi446 { background: rgb(10, 10, 10); position: relative; z-index: 3 }
```

## 12. FAQ, CustomerStories, PixelTransition
These are the shared slices (marketing-shared §7.1–7.3). The FAQ heading is "FAQs". Per page there are 8 questions on agents and 6–9 on the others; they're verbatim in the data files and the answers are placeholders.

## 13. Motion summary (product)
| Element | Trigger | Implementation |
|---|---|---|
| Logo marquee | always | CSS `translateX(0→-50%)` 60s linear infinite |
| Scroll video card | scroll, ≥1281 | scale 0.69→1 over the first 55% of viewport height; play tile counter-scaled |
| Features | scroll | ScrollTrigger center 85%/15% → active index; images crossfade 300ms ease-in-out, items opacity .4↔1 0.3s |
| ProductFor | scroll | 500px of scroll per item; active block keyframe 250ms (opacity + 4px rise) |
| Prompt modal | click | backdrop 200ms fade, panel 320ms slide `cubic-bezier(.22,1,.36,1)` |
| DT prompt cell | hover | overlay opacity 400ms ease |
| Quote | in view → 60ms ticks | 6s per quote, 400ms fade-in |
| Carousel | click arrows | `scrollBy ±434` smooth |
| Hero video card | hover | thumb scale 1.05, 400ms |
| Integrations chips | hover | bg .16→.32, 150ms |
| Pixel bands, stories, FAQ | | see shared |

## 14. Gaps
- I didn't play the YouTube iframe states (click-to-play). Behaviour is from source.
- Prompt-modal visuals come from source CSS; I didn't screenshot them open.
- At 1280 the hero image is still visible (it hides at ≤799). The 1280 numbers above are from the 1280x800 viewport.
