Source: https://dovetail.com/

# Template: `enterprise-article` (3 pages)

Covers `/enterprise/how-leading-organizations-use-dovetail/`, `/enterprise/research-tool-stack-integration/` and `/enterprise/why-leading-teams-choose-dovetail/`.

These are the site's generic **SEO article ("guide") layout** (`HeroSlice` + `PageContent`, chunk `0h4deuv85ezdl`), rendered in the **light theme**. The three pages differ only in content length. The `/product-development/*`, `/customer-research/*` etc. guides elsewhere in `routes.txt` use the same layout, so it's also specced by the content group in **`specs/guide-article.md`** (plus `content-shared.md`). The two agree. This file is complete for the three enterprise pages on its own, and the enterprise-specific bits are: the breadcrumb "Guides / Enterprise / <title>", the sidebar CTA "Get started with Dovetail Enterprise", and Editor's picks / Latest articles with **2 items each** (so their carousels don't scroll at 1440). Read `marketing-shared.md` first.

Data: `src/data/marketing/enterprise__<slug>.json`. The article body is mostly placeholders: h2s, TOC entries, breadcrumb, meta, related topics and card titles are verbatim, and paragraphs/list items are `{placeholder, chars}`.

## 0. Light theme and chrome
- `html` background `#FAFAFA`. Body text `#0A0A0A`.
- Light palette used here: black `#0A0A0A`, black80 `#3B3B3B`, black64 `#626262` (secondary text), black48 `#898989`, black32 `#B1B1B1`, black24 `#C4C4C4` (borders), black16 `#D8D8D8`, black08 `#EBEBEB`, black04 `#F5F5F5`, black02/white `#FAFAFA`, hr `rgba(10,10,10,.24)`, carousel track `rgba(10,10,10,.24)`, accentTertiary `#0044FF`.
- Primary button: bg `#0A0A0A`, text `#FAFAFA`, hover `#3B3B3B`. Secondary: bg `#F5F5F5`, border `#EBEBEB`, text `#0A0A0A`, hover `rgba(255,255,255,.08)`.
- **Alert bar:** the default component is still rendered (bg `rgba(255,255,255,.16)`, white text) over the light page, so it is **almost invisible** (white on `#FAFAFA`). I confirmed this with a screenshot. Keep it faithful.
- **Nav:** logo and links render `#0A0A0A` (light theme). The right-hand "Log in / Book a demo" group is **not rendered** (`hideCta`; the container is empty). At ≤1185 the "Menu" pill shows as usual.
- `<main>` starts at y=206: banner 30 + nav 88 + an 88px header spacer.
- Footer: **variant C-light** (link grid only, bg `#FAFAFA`, headings and meta `#626262`, links `#0A0A0A`). It's preceded inside `main` by the **CtaFooterSlice** (see `quiz.md` result section: H64 "Turn customer feedback into product innovation", "Start for free" + "Book a demo", light colours).

## 1. Layout
Measured (why-leading-teams…) at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `e1i8w3410` | 1440x558 @x0 | 1280x218 @x0 | 768x258 @x0 | 390x346 @x0 |
| `e1i8w3411` | 1192x228 @x124 72px/76px | 1152x120 @x64 56px/60px | 736x132 @x16 40px/44px | 358x220 @x16 40px/44px |
| `e1maalc80` | 1192x26 @x124 | 1152x26 @x64 | 736x54 @x16 | 358x54 @x16 |
| `etar5k91` | 376x4440 @x124 | 1152x316.2 @x64 | 736x316.2 @x16 | 358x428.2 @x16 |
| `e19x9lsh0` | 376x222.2 @x124 | 600x268.2 @x64 | 600x268.2 @x16 | 358x380.2 @x16 |
| `e7v85bj0` | 376x549 @x124 | hidden | hidden | hidden |
| `e1noy6on1` | 376x318 @x124 | 1216x278 @x32 | 704x278 @x32 | 326x318 @x32 |
| `e8fk9sg2` | 682x4040 @x634 | 1152x2856 @x64 | 736x3728 @x16 | 358x6464 @x16 |
| `etar5k92` | 682x175 @x634 | 1152x125.8 @x64 | 736x175 @x16 | 358x273.3 @x16 |
| `elhtsr50` | 1192x32 @x124 24px/32px | 1152x28 @x64 20px/28px | 736x24 @x16 18px/24px | 358x24 @x16 18px/24px |
| `efftjk91` | 760x142.6 @x124 | 160x142.6 @x64 | 592x130.6 @x16 | 592x130.6 @x16 |
| `e1ub092j0` | 320x86 @x124 20px/28px | 320x86 @x64 20px/28px | 288x74 @x16 16px/24px | 288x74 @x16 16px/24px |
| `e1k85z8w0` | 1192x1 @x124 | 1152x1 @x64 | 736x1 @x16 | 358x1 @x16 |
| `e18o1u1v3` | 712x204 @x124 64px/68px | 712x104 @x64 48px/52px | 712x72 @x16 32px/36px | 358x108 @x16 32px/36px |

1. **Hero** `.e1i8w3410` (pad `80px 0 160px`, radius 8; md/sm values in the CSS below), SliceContainer:
   - **Breadcrumb** `.e1maalc80` (flex, wrap, gap 4): "Guides" (M14 link → `/guides/`, opacity .6), a 24px chevron svg (opacity .6), "Enterprise" (P14 uppercase link → `/enterprise/`, opacity .6), chevron, then the current title as a P14 uppercase `<button>` (pad `1px 6px`; no visible chrome).
   - Spacer 32.
   - `h1` **H72** `#0A0A0A` (72/76; md 56/60; sm 40/44), margin-bottom 32.
2. **Body** `.etar5k90` (bg `#FAFAFA`) > SliceGrid:
   - **Aside** Column `1 / 5` (376 wide at 1440; full width at ≤1280; **not sticky**):
     - meta table `.e19x9lsh0` (max-width 600): rows separated by hr, each row `display:flex; padding:16px 0` with two 150px-wide M14 `#626262` cells: "Last updated" / date, "Author" / "Dovetail Editorial Team" (link → `/contributors/dovetail-editorial-team/`).
     - Actions `.e1i61jy30` (margin-top 48, flex, wrap, gap 48). It has two groups (flex column, gap 16), each with an H14-ish heading ("Share", "Summarize with AI"; 14/18 w600) and a row of 32x32 icon buttons (border 1px `#C4C4C4`, radius 8, margin-right 8, 14px icons). Share holds Copy link (button; announces via an aria-live span), then Facebook, LinkedIn and X share links. Summarize holds 4 links (ChatGPT `chat.openai.com/?q=`, Claude `claude.ai/new?q=`, Perplexity `perplexity.ai/search?q=`, Grok `x.com/i/grok?text=`) with a prefilled "Summarize this article \"<title>\" …" query. The icons are in `public/assets/marketing/svg/e1qeafv21-*.svg` and `eryb6ok1-*.svg`.
     - Spacer 48.
     - **≥1281 only** (`FromMD`): Spacer 40, then the sidebar CTA `.e7v85bj0`:
       - h2 H18 "Get started with Dovetail Enterprise";
       - P14 "See how Dovetail Enterprise can help your team." (margin `8px 0 16px`);
       - full-width primary button "Contact sales" → `/contact-sales/`;
       - Spacer 40, hr, Spacer 40;
       - h3 H18 "Contents" (mb 16);
       - the **TOC** list (flex column, gap 16, margin `8px 0 16px`). Each entry is a P14 `#0A0A0A` button, underline on hover. Click smooth-scrolls to the heading (`scrollIntoView({behavior:"smooth", block:"start"})`). There's no active-section highlight (`activeHeadingId` is always null).
   - **Article column** Column `6 / -1` (682 wide at 1440): hr, Spacer 40, then rich text `.e8fk9sg2`:
     - `p` 18/28 `#626262`, margin-bottom 24;
     - `h2` H32 (32/40 w500 ls -0.5) `#0A0A0A`, margin `48px 0 24px`;
     - `ol`/`ul` padding-left 24, `li` margin-bottom 8 at the same 18/28.
   - Then Spacer 80, Spacer 80, and **Related topics** `.etar5k92` (flex column, gap 40): an M14 heading `#626262` (mb 16) + hr, then inline M14 links in brackets, e.g. "[Customer research]" (margin `0 8px 8px 0`, `#626262`).
3. **Editor's picks / Latest articles** (SliceContainer): Spacer 160 (sm 64), then each block is:
   - h2 H24 with a "↘" suffix (mb 48, md 32);
   - Spacer 40;
   - **Carousel** of 320px cards (2 per view on desktop/tablet): title link (H20 `#0A0A0A`, mb 32, underline on hover) and date (M14 `#626262`);
   - a 122px right-edge fade (`linear-gradient(90deg, transparent, #FAFAFA)`);
   - below (pad-top 64), a **scrollbar**: a 1px `rgba(10,10,10,.24)` track, a fill span `#0A0A0A` whose width = scroll progress, and a 12x12 `#0A0A0A` square thumb (`top:-6px`) at `x = progress*trackWidth - 12`;
   - Spacer 64.
   - Behaviour (GSAP Draggable + ScrollTo + Inertia): native scroll updates fill and thumb. Dragging the thumb (bounded to the track, inertia) scrolls the list. At ≥1281 the list itself is drag-scrollable (`Draggable type:"scroll"`, inertia). `scrollToItem` tweens are 0.3s `power1.out`.
   - With only 2 items the track can't scroll at 1440, so the thumb stays at 0.
4. **CtaFooterSlice** (light): SliceGrid > Column `span 9` > Spacer 200 > BaseHeading (H64, max-width 712) + buttons > Spacer 120.
5. **≤1280 "Contents" drawer** `.e1769tw50`:
   - Fixed to the bottom: `top:calc(100% - 64px); max-height:520px; bg #FAFAFA; border-top:1px solid #C4C4C4; z-index:7`. Its header button is 64px (H18 16/24 w500, pad `0 32px`, sticky, chevron right). The body (pad `16px 32px 40px`) holds the TOC.
   - Tap to open: GSAP timeline `to(drawer,{top:"auto", duration:.5, ease:CustomEase("0.5, 0, 0, 1")})`, then the TOC children fade `opacity 0→1` over .4s (overlapping by .2s). Closing reverses it. The header icon is a chevron when closed and swaps to a ✕ icon when open (source: `icon: show ? Close : ChevronDown`); it doesn't rotate.
   - The overlay `.e1vq3q070` (`rgba(10,10,10,.8)`, `backdrop-filter:blur(4px)`, opacity transition .2s, z 1) shows behind it. Tapping the overlay or a TOC item closes the drawer.

```css
/* generated, 1440 run */
```
```css
/* e1i8w3410 = div 1440x558 */
.e1i8w3410 { border-radius: 8px; padding: 80px 0px 160px }
@media (max-width: 1280px) { .e1i8w3410 { border-radius: 0px; margin: 0px; padding: 40px 0px 0px } }
/* e1maalc80 = div 1192x26 */
.e1maalc80 { align-items: center; display: flex; flex-wrap: wrap; gap: 4px }
/* e1maalc81 = a «Guides» 58x21 */
.e1maalc81 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(10, 10, 10); opacity: 0.6; text-decoration: none }
.e1maalc81:disabled { opacity: 0.6; pointer-events: none }
.e1maalc81:hover, .e1maalc81:focus { color: rgb(10, 10, 10); text-decoration: underline }
.e1maalc81:hover, .e1maalc81:focus { text-decoration: underline }
@media (max-width: 1280px) { .e1maalc81 { font-size: 14px; line-height: 140% } .e1maalc81 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e1maalc81 { font-size: 14px; line-height: 140% } .e1maalc81 { font-size: 14px; line-height: 140% } }
/* e1maalc82 = a «Enterprise» 86x24 */
.e1maalc82 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; text-decoration: none; color: rgb(10, 10, 10); opacity: 0.6 }
.e1maalc82:disabled { opacity: 0.6; pointer-events: none }
.e1maalc82:hover, .e1maalc82:focus { color: rgb(10, 10, 10); text-decoration: underline }
.e1maalc82 { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px }
.e1maalc82:hover, .e1maalc82:focus { text-decoration: underline }
.e1maalc82:disabled { opacity: 1 }
.e1maalc82:disabled { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px }
.e1maalc82:disabled:hover, .e1maalc82:disabled:focus { text-decoration: none }
@media (max-width: 1280px) { .e1maalc82 { font-size: 14px; line-height: 140% } .e1maalc82 { font-size: 14px; line-height: 140% } .e1maalc82 { font-size: 14px; line-height: 22px } .e1maalc82:disabled { font-size: 14px; line-height: 22px } }
@media (max-width: 799px) { .e1maalc82 { font-size: 14px; line-height: 140% } .e1maalc82 { font-size: 14px; line-height: 140% } .e1maalc82 { font-size: 14px; line-height: 22px } .e1maalc82:disabled { font-size: 14px; line-height: 22px } }
/* e1maalc82--v2 = button «Why leading teams choose Dovetail—unlock» 641x26 */
.e1maalc82--v2 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-align: left; box-shadow: none; font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; text-decoration: none; color: rgb(10, 10, 10); opacity: 1 }
.e1maalc82--v2:disabled { opacity: 0.6; pointer-events: none }
.e1maalc82--v2:hover, .e1maalc82--v2:focus { color: rgb(10, 10, 10); text-decoration: underline }
.e1maalc82--v2 { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px }
.e1maalc82--v2:hover, .e1maalc82--v2:focus { text-decoration: underline }
.e1maalc82--v2:disabled { opacity: 1 }
.e1maalc82--v2:disabled { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px }
.e1maalc82--v2:disabled:hover, .e1maalc82--v2:disabled:focus { text-decoration: none }
@media (max-width: 1280px) { .e1maalc82--v2 { font-size: 14px; line-height: 140% } .e1maalc82--v2 { font-size: 14px; line-height: 140% } .e1maalc82--v2 { font-size: 14px; line-height: 22px } .e1maalc82--v2:disabled { font-size: 14px; line-height: 22px } }
@media (max-width: 799px) { .e1maalc82--v2 { font-size: 14px; line-height: 140% } .e1maalc82--v2 { font-size: 14px; line-height: 140% } .e1maalc82--v2 { font-size: 14px; line-height: 22px } .e1maalc82--v2:disabled { font-size: 14px; line-height: 22px } }
/* e1i8w3411 = h1 «Why leading teams choose Dovetail—unlock» 1192x228 */
.e1i8w3411 { font-family: $sans; font-weight: 600; font-size: 72px; line-height: 76px; letter-spacing: -2px; margin-bottom: 32px }
@media (max-width: 1280px) { .e1i8w3411 { font-size: 56px; line-height: 60px; letter-spacing: -2px } .e1i8w3411 { margin-bottom: 24px } }
@media (max-width: 799px) { .e1i8w3411 { font-size: 40px; line-height: 44px; letter-spacing: -1px } }
/* etar5k90 = div 1440x6139 */
.etar5k90 { background: rgb(250, 250, 250) }
/* etar5k91 = aside 376x4440 */
.etar5k91 { grid-column: span 4; order: unset; max-width: unset; min-width: unset }
@media (max-width: 1280px) { .etar5k91 { grid-column: 1 / -1; display: block } }
@media (max-width: 799px) { .etar5k91 { grid-column: 1 / -1; display: block; min-width: unset } }
/* e19x9lsh0 = div 376x222 */
.e19x9lsh0 { display: flex; flex-direction: column; max-width: 600px }
/* e19x9lsh4 = hr 376x1 */
.e19x9lsh4 { height: 1px; background-color: rgba(10, 10, 10, 0.24); margin: 0px }
/* e19x9lsh1 = div 376x51 */
.e19x9lsh1 { display: flex; padding: 16px 0px }
/* e19x9lsh2 = p «Last updated» 150x19 */
.e19x9lsh2 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(98, 98, 98); width: 150px }
@media (max-width: 1280px) { .e19x9lsh2 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e19x9lsh2 { font-size: 14px; line-height: 140% } }
/* e19x9lsh3 = a «Dovetail Editorial Team» 218x21 */
.e19x9lsh3 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(98, 98, 98) }
.e19x9lsh3:disabled { opacity: 0.6; pointer-events: none }
.e19x9lsh3:hover, .e19x9lsh3:focus-visible { color: rgb(98, 98, 98) }
.e19x9lsh3:hover, .e19x9lsh3:focus { text-decoration: underline }
@media (max-width: 1280px) { .e19x9lsh3 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e19x9lsh3 { font-size: 14px; line-height: 140% } }
/* e1i61jy30 = div 376x66 */
.e1i61jy30 { display: flex; gap: 48px; flex-wrap: wrap; margin-top: 48px }
@media (max-width: 1280px) { .e1i61jy30 { margin-bottom: 48px } }
/* e1i61jy31 = div 160x66 */
.e1i61jy31 { display: flex; flex-direction: column; gap: 16px }
/* e1i61jy32 = h2 «Share» 144x18 */
.e1i61jy32 { font-family: $sans; font-size: 14px; font-weight: 600; line-height: 18px; letter-spacing: 0px; margin-right: 16px }
@media (max-width: 1280px) { .e1i61jy32 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .e1i61jy32 { font-size: 14px; line-height: 16px } }
/* e1qeafv20 = div 160x32 */
.e1qeafv20 { display: flex }
/* e1qeafv21 = button 32x32 */
.e1qeafv21 { align-items: center; background: transparent; border: 1px solid rgb(196, 196, 196); border-radius: 8px; color: rgb(10, 10, 10); cursor: pointer; display: flex; height: 32px; justify-content: center; margin-right: 8px; padding: 0px; text-decoration: none; width: 32px }
.e1qeafv21 svg { width: 14px; height: 14px }
.e1qeafv21 svg path { fill: currentcolor }
/* eryb6ok1 = a 32x32 */
.eryb6ok1 { align-items: center; background: transparent; border: 1px solid rgb(196, 196, 196); border-radius: 8px; color: rgb(10, 10, 10); cursor: pointer; display: flex; height: 32px; justify-content: center; margin-right: 8px; text-decoration: none; width: 32px }
.eryb6ok1 svg { width: 14px; height: 14px }
.eryb6ok1 svg path { fill: currentcolor }
/* etid8i60 = div 376x589 */
@media (max-width: 1280px) { .etid8i60 { display: none } }
/* e7v85bj0 = div 376x549 */
/* e7v85bj2 = p «See how Dovetail Enterprise can help you» 376x22 */
.e7v85bj2 { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px; margin: 8px 0px 16px }
@media (max-width: 1280px) { .e7v85bj2 { font-size: 14px; line-height: 22px } }
@media (max-width: 799px) { .e7v85bj2 { font-size: 14px; line-height: 22px } }
/* e7v85bj3 = a «Contact sales» 376x40 */
.e7v85bj3 { align-items: center; justify-content: center; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: $sans; font-size: 14px; line-height: 18px; letter-spacing: 0px; margin: 0px; max-width: 100%; text-align: center; white-space: nowrap; transition: color 200ms, background 200ms, opacity 200ms; border-radius: 8px; display: inline-flex; padding: 10px 16px; font-weight: 500; background: rgb(10, 10, 10); color: rgb(250, 250, 250); width: 100% }
.e7v85bj3:disabled { opacity: 0.6; pointer-events: none }
.e7v85bj3 > span { margin-left: 4px; margin-right: 0px; transition: transform 150ms cubic-bezier(0.2, 0.6, 0.6, 1) }
.e7v85bj3:focus-visible { outline: solid 1px; outline-offset: 1px }
.e7v85bj3:hover, .e7v85bj3:focus-visible { background: rgb(59, 59, 59) }
.e7v85bj3:focus-visible { outline-color: rgb(250, 250, 250) }
@media (max-width: 1280px) { .e7v85bj3 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .e7v85bj3 { font-size: 14px; line-height: 16px } }
/* e14wzqz0 = hr 376x1 */
.e14wzqz0 { height: 1px; background-color: rgba(10, 10, 10, 0.24); margin: 0px }
/* e7v85bj1 = h3 «Contents» 376x24 */
.e7v85bj1 { font-family: $sans; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.25px; margin-bottom: 16px }
@media (max-width: 1280px) { .e7v85bj1 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e7v85bj1 { font-size: 16px; line-height: 24px } }
/* e1noy6on1 = ul 376x318 */
.e1noy6on1 { display: flex; flex-direction: column; gap: 16px; list-style-type: none; margin: 8px 0px 16px; opacity: 1; padding: 0px }
/* e1noy6on0 = button «Why the right platform matters» 376x24 */
.e1noy6on0 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; text-decoration: none; box-shadow: none; font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px; display: inline; padding: 0px; color: rgb(10, 10, 10); text-align: left; white-space: normal; overflow-wrap: anywhere; width: 100% }
.e1noy6on0:disabled { opacity: 0.6; pointer-events: none }
.e1noy6on0:hover, .e1noy6on0:focus-visible { color: rgb(98, 98, 98) }
.e1noy6on0:hover, .e1noy6on0:active { text-decoration: underline }
@media (max-width: 1280px) { .e1noy6on0 { font-size: 14px; line-height: 22px } }
@media (max-width: 799px) { .e1noy6on0 { font-size: 14px; line-height: 22px } }
/* e8fk9sg2 = div 682x4040 */
.e8fk9sg2 { font-family: $sans; font-size: 18px; font-weight: 400; line-height: 24px; color: rgb(98, 98, 98) }
.e8fk9sg2 h1 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 40px }
.e8fk9sg2 h2 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 40px }
.e8fk9sg2 h3, .e8fk9sg2 h4, .e8fk9sg2 h5, .e8fk9sg2 h6 { font-family: $sans; font-size: 24px; line-height: 32px; font-weight: 500; letter-spacing: -0.5px }
.e8fk9sg2 p { font-size: 18px; font-weight: 400; line-height: 28px; margin: 0px 0px 24px; text-wrap: pretty }
.e8fk9sg2 ul { font-size: 18px; padding-left: 24px; margin-bottom: 24px }
.e8fk9sg2 ul li, .e8fk9sg2 ul li p { line-height: 28px; margin-bottom: 0px }
.e8fk9sg2 ul li { margin-bottom: 8px }
.e8fk9sg2 ul li p { margin-bottom: 8px }
.e8fk9sg2 ol { font-size: 18px; list-style-position: outside; padding-left: 24px }
.e8fk9sg2 ol li, .e8fk9sg2 ol li p { line-height: 28px; margin-bottom: 0px }
.e8fk9sg2 ol li { margin-bottom: 8px }
.e8fk9sg2 ol li p { margin-bottom: 8px }
.e8fk9sg2 blockquote { color: rgb(98, 98, 98); border-left: 2px solid rgb(98, 98, 98); padding-left: 16px }
.e8fk9sg2 table { border-collapse: collapse; width: 100%; margin: 48px 0px; font-size: 16px }
.e8fk9sg2 th { color: rgb(10, 10, 10); font-weight: 600; text-align: left; padding: 12px 16px; border-bottom: 2px solid rgb(216, 216, 216); background-color: rgba(255, 255, 255, 0.04) }
.e8fk9sg2 td { color: rgb(98, 98, 98); padding: 10px 16px; border-bottom: 1px solid rgb(216, 216, 216); vertical-align: top }
.e8fk9sg2 tr:last-child td { border-bottom-width: medium; border-bottom-style: none; border-bottom-color: currentcolor }
.e8fk9sg2 h1, .e8fk9sg2 h2 { color: rgb(10, 10, 10); margin: 48px 0px 24px }
.e8fk9sg2 h3 { color: rgb(10, 10, 10); margin: 40px 0px 24px }
.e8fk9sg2 h4, .e8fk9sg2 h5, .e8fk9sg2 h6 { color: rgb(10, 10, 10); margin: 16px 0px 8px }
.e8fk9sg2 a { color: rgb(10, 10, 10) }
.e8fk9sg2 strong, .e8fk9sg2 b { color: rgb(10, 10, 10) }
.e8fk9sg2 img { display: block; width: 100%; height: auto; border-radius: 8px; margin: 64px 0px }
.e8fk9sg2 pre { overflow-x: auto }
.e8fk9sg2 code { font-family: monospace }
@media (max-width: 1280px) { .e8fk9sg2 { font-size: 16px; line-height: 24px } .e8fk9sg2 h1 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } .e8fk9sg2 h2 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } .e8fk9sg2 h3, .e8fk9sg2 h4, .e8fk9sg2 h5, .e8fk9sg2 h6 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e8fk9sg2 { font-size: 16px; line-height: 24px } .e8fk9sg2 h1 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } .e8fk9sg2 h2 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } .e8fk9sg2 h3, .e8fk9sg2 h4, .e8fk9sg2 h5, .e8fk9sg2 h6 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } .e8fk9sg2 table { margin: 32px 0px } .e8fk9sg2 img { margin: 32px 0px } }
/* etar5k92 = div 682x175 */
.etar5k92 { display: flex; flex-direction: column; gap: 40px }
/* etar5k93 = h2 «Related topics» 682x19 */
.etar5k93 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(98, 98, 98); margin-bottom: 16px }
@media (max-width: 1280px) { .etar5k93 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .etar5k93 { font-size: 14px; line-height: 140% } }
/* elhtsr50 = h2 «Editor's picks↘» 1192x32 */
.elhtsr50 { font-family: $sans; font-size: 24px; line-height: 32px; font-weight: 500; letter-spacing: -0.5px; margin-bottom: 48px }
@media (max-width: 1280px) { .elhtsr50 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } .elhtsr50 { margin-bottom: 32px } }
@media (max-width: 799px) { .elhtsr50 { font-size: 18px; line-height: 24px; letter-spacing: -0.25px } }
/* efftjk90 = div 1192x142 */
.efftjk90 { height: 100%; overflow: scroll hidden; position: relative; padding-right: 0px; scrollbar-width: none }
.efftjk90::-webkit-scrollbar { display: none }
/* efftjk91 = div 760x142 */
.efftjk91 { display: grid; gap: 32px; grid-template-columns: repeat(2, 320px); margin: 0px; position: relative; width: calc(40px + 50vw) }
@media (max-width: 1512px) { .efftjk91 { margin: 0px } }
@media (max-width: 1280px) { .efftjk91 { margin: 0px; width: calc(-160px + min(100%, 320px)) } }
@media (max-width: 799px) { .efftjk91 { margin: 0px; grid-template-columns: repeat(2, 1fr); gap: 16px; width: calc(-48px + min(200%, 640px)) } }
/* e1ub092j0 = a «Tool stack integration for product ops: » 320x86 */
.e1ub092j0 { align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; cursor: pointer; flex-shrink: 0; box-shadow: none; font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; display: block; text-align: left; white-space: normal; overflow-wrap: anywhere; margin-bottom: 32px; color: inherit; text-decoration: none }
.e1ub092j0:disabled { opacity: 0.6; pointer-events: none }
.e1ub092j0:hover, .e1ub092j0:focus-visible { color: rgb(98, 98, 98) }
.e1ub092j0:hover, .e1ub092j0:active { text-decoration: underline }
@media (max-width: 1280px) { .e1ub092j0 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e1ub092j0 { font-size: 16px; line-height: 24px } }
/* e1ub092j1 = span «20 April 2026» 122x18 */
.e1ub092j1 { font-family: $mono; font-size: 14px; font-weight: 400; letter-spacing: 1px; line-height: 140%; text-transform: uppercase; color: rgb(98, 98, 98) }
@media (max-width: 1280px) { .e1ub092j1 { font-size: 14px; line-height: 140% } }
@media (max-width: 799px) { .e1ub092j1 { font-size: 14px; line-height: 140% } }
/* efftjk92 = div 1192x65 */
.efftjk92 { display: block; padding: 64px 0px 0px; position: relative; max-width: 1512px; margin: 0px auto; z-index: 2 }
@media (max-width: 1280px) { .efftjk92 { display: block; padding: 48px 0px 0px } }
@media (max-width: 799px) { .efftjk92 { padding: 48px 0px 0px } }
/* e1k85z8w0 = div 1192x1 */
.e1k85z8w0 { background: rgba(10, 10, 10, 0.24); display: flex; align-items: center; height: 1px; position: relative; width: 100% }
@media (max-width: 1280px) { .e1k85z8w0 { display: flex } }
/* e1k85z8w1 = div 0x1 */
.e1k85z8w1 { left: 0px; overflow: hidden; position: absolute; top: 0px; width: 0% }
/* e1k85z8w2 = span 0x1 */
.e1k85z8w2 { background: rgb(10, 10, 10); display: block; height: 1px; width: 100% }
/* e1k85z8w3 = div 12x12 */
.e1k85z8w3 { background: rgb(10, 10, 10); height: 12px; left: 0px; position: absolute; top: -6px; width: 12px }
/* e1noy6on1--v2 = ul 0x0 */
.e1noy6on1--v2 { display: flex; flex-direction: column; gap: 16px; list-style-type: none; margin: 8px 0px 16px; opacity: 0; padding: 0px }
/* e18o1u1v3 = h2 «Turn customer feedback into product inno» 712x204 */
.e18o1u1v3 { display: block; color: rgb(10, 10, 10); max-width: 712px; font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px }
@media (max-width: 1280px) { .e18o1u1v3 { font-size: 64px; line-height: 68px; letter-spacing: -2px } .e18o1u1v3 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e18o1u1v3 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e18o1u1v5 = div 886x40 */
.e18o1u1v5 { margin-top: 32px; display: flex; flex-flow: wrap; gap: 8px }
```

Drawer (≤1280):
```css
/* e1769tw50 = div 1280x64 */
.e1769tw50 { display: none }
@media (max-width: 1280px) { .e1769tw50 { background: rgb(250, 250, 250); border-top: 1px solid rgb(196, 196, 196); inset: calc(100% - 64px) 0px 0px; display: block; max-height: 520px; position: fixed; z-index: 7 } }
/* e1769tw51 = button «Contents» 1280x64 */
.e1769tw51 { border-width: 1px; border-style: solid; border-image: none; border-color: transparent transparent rgb(196, 196, 196); cursor: pointer; flex-shrink: 0; text-decoration: none; text-align: left; box-shadow: none; color: rgb(10, 10, 10); font-family: $sans; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.25px; align-items: center; background: rgb(250, 250, 250); display: flex; height: 64px; justify-content: space-between; padding: 0px 32px; position: sticky; top: 0px; width: 100% }
.e1769tw51:disabled { opacity: 0.6; pointer-events: none }
.e1769tw51:hover, .e1769tw51:focus-visible { color: rgb(98, 98, 98) }
@media (max-width: 1280px) { .e1769tw51 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1769tw51 { font-size: 16px; line-height: 24px } }
/* e1769tw52 = div 1280x358 */
.e1769tw52 { padding: 16px 32px 40px }
/* e1vq3q070 = div 1280x800 */
.e1vq3q070 { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(4px); inset: 0px; opacity: 0; position: fixed; transition: opacity 0.2s; visibility: hidden; z-index: 1 }
```

## 2. Motion
- TOC click: smooth scroll.
- Carousel: native/drag scroll with GSAP inertia; the scrollbar thumb follows scroll.
- Mobile drawer: 0.5s custom ease + 0.4s fade.
- No entrance animations.

## 3. Gaps
- I didn't open the mobile contents drawer in a browser; the values are from source.
- The share/AI link URLs are templated per article (they're recorded in the data file as hrefs).
