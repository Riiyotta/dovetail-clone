Source: https://dovetail.com/

# Tools / forms / comparisons / legal group: shared components

Measured on 2026-10-26 against the live site. I used an isolated headless Chromium (Playwright 1.5x) at 1440x900, 1280x900, 768x900 and 390x900, together with the full emotion stylesheet dump (each rule kept with its `@media` context) and the de-minified page chunks. Everything here **adds to** `CLONE_SPEC.md §0` (tokens, container, nav, footer, final CTA). Where a value isn't repeated here, use the homepage spec.

Templates in this group (one spec file each):

| Template | Spec | Routes |
|---|---|---|
| demo-form | `specs/demo-form.md` | /contact-sales/, /request-a-demo/ |
| comparison | `specs/comparison.md` | 16 × /dovetail-vs-*/ |
| quiz (hub + role quiz flow) | `specs/quiz.md` | /quiz/ (+ /roles/{research,product-management,design}/quiz/ flow) |
| roi-calculator | `specs/roi-calculator.md` | /roi-calculator/ |
| template-landing | `specs/template-landing.md` | /ux-research-plan-template/, /user-persona-template/, /research-report-template/ |
| legal-index | `specs/legal-index.md` | /legal/ |
| legal-doc | `specs/legal-doc.md` | /legal/* (14), /privacy/* (5) |
| article | `specs/tools-article.md` (see `specs/guide-article.md`) | /research-maturity-assessment/ (+ /resources/dovetail-vs-* ×4) |
| 404 | `specs/not-found.md` | any unknown path |

Routes → template → data file: `specs/tools-routes.md`. Assets: `specs/tools-assets.md`.

---

## A. Breakpoints and grid used by every page in this group

These are the same media queries as §0.1: `max-width:1280px` (md) and `max-width:799px` (sm). **768 renders in the sm (mobile) tier.**

- **SliceGrid** (`section`, used for almost every slice): `display:grid; grid-template-columns:repeat(12,1fr); gap:32px; max-width:1512px; margin:auto; padding:0 124px; position:relative`.
  - ≤1280: `gap:24px; padding:0 64px`.
  - ≤799: `grid-template-columns:repeat(4,1fr); gap:24px; padding:0 16px`.
  - Column widths: 70px at 1440, 74px at 1280. At 768 and 390 there are 4 columns (166 / 71.5).
- **SliceContainer** (non-grid wrapper): `max-width:1512px; margin:0 auto; padding:0 124px; width:100%; position:relative` (≤1280 `0 64px`; ≤799 `0 16px`).
- **Column spans**: every "Column" collapses at ≤799 to `grid-column:1/-1`. Most also collapse at ≤1280 (each template lists its exceptions).
- **Spacer** (`div`, `width:100%`, empty) is the only vertical rhythm mechanism; there are no section paddings. Sizes are listed as `desktop / ≤1280 / ≤799`. The ones used in this group: 200/96/96, 160/96/96, 120/96/96 or 120/64/64, 96/96/96, 96/56/56 (top of page), 96/48/48, 88/88/88, 64/56/56, 64/32/32, 64/64/64, 56/56/56, 48, 40, 32, 24, 16, 8. Rule: a `200px` spacer that is the **last child of `<main>`** is `160px` at ≥1281.
- **Top-of-page offset**: the nav (88px) is in normal flow and the banner is 30px (38px at ≤799), so main content starts at y=118 (126 at ≤799).

## B. Buttons used in this group (base `Button`: `display:inline-flex; align-items:center; justify-content:center; border:1px solid transparent; border-radius:8px; padding:10px 16px; font:500 14px/18px Inter; letter-spacing:0; white-space:nowrap; transition:color 200ms, background 200ms, opacity 200ms`; ≤1280 line-height 16px, which gives a 38px height instead of 40)

| Variant | Default | Hover / focus-visible | Focus ring | Disabled |
|---|---|---|---|---|
| **White primary** (dark pages) | bg `#FFFFFF`, text `#0A0A0A` | bg `#CECECE` | `outline:1px solid #0A0A0A; outline-offset:1px` | `opacity:.6; pointer-events:none` |
| **Secondary/glass** (dark pages) | bg `rgba(255,255,255,.08)`, border `1px rgba(255,255,255,.24)`, text `#FFFFFF` | bg `rgba(255,255,255,.16)` | outline `#FFFFFF` 1px, offset 1 | same |
| **Black primary** (light pages) | bg `#0A0A0A`, text `#FAFAFA` | bg `#3B3B3B` | outline `#FAFAFA` | same |
| **Light secondary** (light pages) | bg `#F5F5F5`, border `1px #EBEBEB`, text `#0A0A0A` | bg `rgba(255,255,255,.08)` (sic: the live hover makes it nearly transparent over #FAFAFA) | outline `#0A0A0A` | same |
| **Form submit** (demo-form) | bg `#FFF`, text `#0A0A0A`, `font:500 16px/18px`, `min-width:146px; width:100%`, no border, height 38 | bg `#CECECE` (`transition: background 150ms, color 150ms`) | (browser default focus-visible ring: `outline: currentColor solid 2px; outline-offset:2px`) | `cursor:not-allowed; opacity:.7` |

`Button > span` (an optional trailing arrow) uses `margin-left:4px; transition: transform 150ms cubic-bezier(.2,.6,.6,1)`. No arrow spans are rendered in this group.

CTA rows: `display:flex; flex-wrap:wrap; gap:8px; margin-top:32px` (centred variant: `justify-content:center`).

## C. Text styles (computed; size/line-height weight letter-spacing; `>1280 | ≤1280 | ≤799`)

| Token | >1280 | ≤1280 | ≤799 |
|---|---|---|---|
| Eyebrow M14 (`JetBrains Mono` 400 uppercase, ls 1px, lh 140% = 19.6px, `#A7A7A7`, mb 32) | 14 | 14 | 14 |
| H72 (legal/article H1, w600) | 72/76 ls -2 | 56/60 ls -2 | 40/44 ls -1 |
| H64 (w600) | 64/68 ls -2 | 48/52 ls -1 | 32/36 ls -0.25 |
| H56 (w600) | 56/60 ls -2 | 40/44 ls -1 | 32/36 ls -0.25 |
| H48 (quiz, w500) | 48/56 ls -1 | 32/40 ls -0.25 | 24/32 ls -0.25 |
| H40 (w500) | 40/48 ls -1 | 32/40 ls -0.25 | 24/32 ls -0.25 |
| H32 (w500) | 32/40 ls -0.5 | 24/32 ls -0.25 | 24/32 ls -0.25 |
| H24 (w500) | 24/32 ls -0.5 | 20/28 ls -0.25 | 18/24 ls -0.25 |
| H20 (w500) | 20/28 ls -0.25 | 20/28 | 16/24 |
| P20 | 20/28 w400 | 16/24 | 16/24 |
| P18 | 18/24 w400 | 18/24 | 16/24 |
| P16 | 16/24 w400 | | |
| P14 | 14/22 w400 | | |
| P12 | 12/16 w400 | | |
| M12 | Mono 12/12 ls 1 uppercase | | |

Grey text on dark pages is **`#A7A7A7`** (rgb 167,167,167), not the homepage's `rgba(255,255,255,.64)`. Grey text on light pages is **`#626262`** (rgb 98,98,98).

Mono at weights 500/600 (the quiz eyebrows) is **synthesised bold** from `JetBrainsMono-Regular.woff2`. The live site loads only `inter-400`, `Inter-SemiBold` and `JetBrainsMono-Regular` on these pages. Inter 500 also resolves (`Inter-Medium.woff2` from §0.4). No new font files are needed.

## D. Logo marquee slice (`CompactLogoSlice`): demo-form, comparison, template-landing

- **Wrapper:** SliceContainer with `max-width:1328px` (so it computes to x=56..1384 at 1440 with margin 0 56px), flex column, centred.
- **Heading:** `<p>` M14 **`#FFFFFF`**, centred, `margin-bottom:64px; min-height:20px` (≤1280 `max-width:400px`, wraps to 2 lines = 39.2px).
  - demo-form uses "Connecting the world's greatest companies to their customers".
  - comparison and template-landing use "Connecting the world's leading teams to their customers".
- **Rows container:** `width:100%; overflow:hidden; position:relative; display:flex; flex-direction:column; gap:40px; min-height:168px` (single-row variant: `min-height:64px`). ≤1280: gap 20, min-height 148 (single-row 64).
- **Each row:** `height:64px; opacity:.32; display:flex; justify-content:center; align-items:center`.
- **Marquee track** (component `Marquee`): `display:flex; overflow:hidden; pointer-events:none`.
  - `::before` and `::after` are 200px-wide fades (≤799 32px): `linear-gradient(90deg, #0A0A0A 0%, rgba(247,247,248,0) 100%)` on the left and the mirror on the right, z-index 9999.
  - The inner strip is `display:flex; white-space:nowrap; will-change:transform`. It contains the item set rendered **twice** (the second copy has `aria-hidden` and `inert`).
  - Each `.marquee-item` has `padding:0 40px` (≤1280 `0 20px`), i.e. gap 80 (≤1280 40).
  - Logo box: `width:142px; height:64px; display:flex; align-items:center; justify-content:center`. The img is `max-width:100%; max-height:100%; object-fit:contain` (white-logo SVGs).
  - Extra edge fades sit on top of the rows container: `GradientBanner` 180px wide (≤1280 60px), `linear-gradient(270deg, rgba(0,0,0,0) 0%, #0A0A0A 100%)` on the left and `90deg` on the right.
- **Rows:**
  - Row 1 shows the first 6 logos, direction **ltr**.
  - Row 2 shows logos 7..13, direction **rtl**, with `left:120px` offset.
  - The single-row variant (comparison pages) shows 8 logos in one ltr row.
- **Motion (GSAP 3, source-verified):**
  ```js
  // w = width of ONE item set
  tl = gsap.timeline({repeat:-1});
  if (dir === 'ltr') tl.set(strip, {x: -w});
  tl.to(strip, {x: dir === 'rtl' ? `-=${w}` : `+=${w}`, duration: 60, ease: 'none', repeat: -1,
                modifiers: {x: gsap.utils.unitize(gsap.utils.wrap(-w, 0))}});
  // reduced motion: paused. focusin inside the strip -> pause; focusout -> play.
  ```
  Speed is therefore one set-width per 60s (about 22px/s for the 6-logo row: 1332px/60s). CSS equivalent: `@keyframes {from{transform:translateX(-50%)} to{transform:translateX(0)}}` 60s linear infinite for ltr, and the reverse for rtl, where 50% is one set.

## E. Awards marquee (`TestimonialMarquee`): comparison pages only

- SliceContainer containing a Marquee with **rtl** direction, gap 80 (≤1280 40), and the same 200px edge fades. Height is 72px.
- **Item:** `display:flex; gap:32px`.
  - Badge `<img height=72 width="100%" loading=lazy>`: the badge images are lazy and at 0 width until loaded, so let them size to their intrinsic aspect at 72px height.
  - Then a text column (flex column, gap 8, centred): title H24 `#FFFFFF` and source M14 `#A7A7A7`.
- **12 items, in order:**
  - Buyer's choice award / TRUST RADIUS, 2026
  - Category Leader / GETAPP'S CATEGORY LEADERS 2025
  - Top UX Research Product / PRODDY AWARDS BY PRODUCT SCHOOL
  - High Performer / G2, SUMMER 2026
  - Tech Cares / TRUST RADIUS, 2026
  - Tech Cares / TRUST RADIUS, 2025
  - Momentum Leader / G2, SUMMER 2026
  - Top Rated / TRUST RADIUS, 2026
  - Leader / G2, SUMMER 2026
  - Best Relationship / G2, SUMMER 2026
  - Best Estimated ROI / G2, SUMMER 2026
  - Fastest Implementation / G2, SUMMER 2026

  These are also in each comparison data file. The badge images are in `public/assets/tools/`.

## F. Featured testimonial slice (`Testimonial featured`): demo-form and comparison

- **Outer:** `div` (relative), then a SliceContainer, then `GridImageBackground`:
  - `position:relative; pointer-events:none; margin:0 auto; height:100%; overflow-x:clip`.
  - Background img `testimonial-grid-bg.png` (2520x1120, rendered **1260x560**), placed absolutely in a `100vw` wrapper centred with `left:50%; translateX(-50%)`. The img itself is `position:absolute; top:50%; left:50%; transform:translate(-50%,0); object-fit:cover`. In practice it covers the 560px-tall slice.
  - Content layer: `display:flex; align-items:center; height:560px; position:relative; z-index:1; pointer-events:auto` (≤799 `height:auto`).
- **Inner grid:** a 12-col grid with the same gaps as A. The testimonial column is `grid-column:3/12; margin:110px 0` (≤1280 `1/-1`; ≤799 margin 0). At 1440 it's 886px wide at x=328.
- **Card** (`<a href="/customers/{slug}/">`, a transparent button-link): flex column, start-aligned, **gap 64px**. Hover/focus: color stays `#FFF` and there's no underline.
  - Quote block: `position:relative; min-height:240px` (≤799 `min-height:auto; display:flex; flex-direction:column`).
    - Avatar img 80x80 (featured), `float:left; margin-right:16px; margin-top:8px; border-radius:8px; object-fit:cover`. At ≤799 it isn't floated and has `margin-bottom:32px`.
    - Blockquote H40: 40/48 w500 ls -1 (≤1280 32/40 ls -0.25; ≤799 24/32), `margin:0; text-align:left`. It starts with an opening `“` and ends with `”`. The text wraps around the floated avatar.
  - Bottom row: `display:flex; gap:32px; align-items:center; min-height:48px`.
    - Company logo: white-logo SVG, height 40, width fit-content (`trimmed`).
    - A 1px × 40px vertical line `rgba(255,255,255,.24)`.
    - Person name: M14 `#FFFFFF`. Job title: M14 `#A7A7A7`.
- **Cursor tooltip** while the card is hovered (`onMouseOver`/`onMouseLeave`):
  - Wrapper: `position:fixed; top:0; left:0; z-index:4; display:flex; opacity:0; pointer-events:none; transition:opacity 150ms` (hidden ≤799).
  - On every `mousemove` it sets `opacity:1` and `transform:translate3d(x+16px, y+16px, 0)`, flipping to `x-16-width` / `y-16-height` if it would overflow the viewport. This is the same logic as homepage component C, **but with a different look**:
    - Label: M14 `#FFFFFF`, bg `rgba(255,255,255,.08)`, `backdrop-filter:blur(8px)`, radius 8, `padding:8px 12px`, flex, gap 8.
    - It's preceded by an 8x8 square in `#0044FF`.
    - Text: "Read customer story".
    - There is no inner rise animation.
- **Measured:** the slice is 1440x560 at 1440 and 1280; 768x362 at 768; 390x501 at 390.

## G. FAQ slice (`FaqSlice`): comparison, template-landing

- **Grid:** SliceGrid.
  - Left column `span 3` (≤1280 `1/-1`): H56 "FAQs" (`overflow-wrap:anywhere; text-wrap:pretty`, `#FFF`).
  - Right column `4/-1` (≤1280 `1/-1`, sitting 24px below the heading): first an `<hr>` (`height:1px; background:rgba(255,255,255,.24); margin:0 0 32px`), then one item per question.
- **Item:**
  - Toggle `<button aria-expanded aria-controls>`: `display:inline-flex; justify-content:space-between; align-items:center; width:100%; background:none; border:0; padding:0; color:#FFF; text-align:left; z-index:2`. Hover/focus-visible color `#A7A7A7`; `:focus` stays `#FFF`.
    - Label span H20 (20/28 w500 ls -0.25; ≤799 16/24), `overflow-wrap:anywhere`.
    - Chevron box: 24x24, bg `#212121` (rgb 33,33,33), radius 4, `margin-left:8px`, flex-centred. It holds a 24px chevron SVG (`/assets/tools/svg/icon-chevron-down-24.svg`, stroke currentColor 2, square caps).
    - **Open:** the SVG has `transform:rotate(180deg)`, applied instantly (there is no CSS transition on it).
  - Answer: an inner 8-col grid (gap 32; ≤1280 12 cols gap 24; ≤799 4 cols) with the answer in `span 7`.
    - Answer wrapper: P16, `height:0; opacity:0; overflow:hidden; margin-top:8px`. The paragraph inside is `#A7A7A7` P16.
  - After each item: `<hr>` 1px `rgba(255,255,255,.24)`, `margin:32px 0`.
  - Closed item height: 28 (button) + 8 + 1 + 32×2 → measured pitch **101px** per item at 1440 (69px block + 32px).
- **Open/close (source):**
  - Open: `gsap.to(answer, {height:"unset", opacity:1, duration:.3})` (GSAP default ease `power1.out`).
  - Close: `gsap.set(answer, {height:0, opacity:0})` (instant).
  - **Flag:** in headless Chromium the open tween never wrote styles. The answer stayed at height 0 / opacity 0 while the chevron rotated, but close did set the inline `opacity:0; height:0`. The live open state therefore couldn't be measured visually. Build the intended behaviour: expand to the natural height and fade to 1 over 300ms `ease-out`, and collapse instantly.
- Multiple items can be open at once (each item has independent state).

## H. CTA footer slice ("Turn customer feedback into product innovation"): quiz hub, role quiz, roi-calculator, article

- Spacer 200 (≤1280 96).
- SliceGrid with the column `span 9` (≤799 `1/-1`):
  - H64 heading `max-width:712px` (`#FFF`, or `#0A0A0A` on the light article page).
  - CTA row (margin-top 32, gap 8).
- Spacer 120 (≤1280 96).
- CTAs per page:
  - quiz: "Start for free" → `/auth/signup/` (new tab) and "Book a demo" → `/request-a-demo/`.
  - roi / article: "Contact sales" → `/contact-sales/` and "Try Dovetail free" → `/auth/signup/` (new tab).
  - Dark pages use White primary + Secondary buttons. The light article uses Black primary + Light secondary.

## I. Light-theme chrome (legal index, legal docs, privacy docs, article)

The live site switches the chrome by setting `html[data-scroll-theme="light"]` and `html{background:#FAFAFA}`:
- Legal index and legal/privacy docs set `data-scroll-theme="light"`. It stays `light` for the whole scroll; I verified this every 500px.
- The article template sets **no** `data-scroll-theme`. Only `html` background is `#FAFAFA`, the nav is light, and the announcement banner keeps its **dark** styling (`rgba(255,255,255,.16)` bg, white text). That's effectively invisible on #FAFAFA, and it's faithful to the live site.

| Element | Dark (CLONE_SPEC) | Light |
|---|---|---|
| html/body bg | `#0A0A0A` | `#FAFAFA` |
| Body text | `#FFF` | `#0A0A0A` |
| Banner bg | `rgba(255,255,255,.16)` | `rgba(10,10,10,.08)` (legal pages only; it composites to about #E6E6E6) |
| Banner labels | `#FFF` (second label opacity .64) | `#0A0A0A` (second label opacity .64) |
| Banner dismiss / link hover | | color `#0A0A0A` (no change) |
| Nav logo svg / links / "Log in" | `#FFF` | `#0A0A0A` |
| Nav ghost hover bg | `rgba(255,255,255,.08)` | `#EBEBEB` (rgb 235) |
| Nav "Book a demo" | bg `#FFF`, text `#0A0A0A`, hover `#CECECE` | bg `#0A0A0A`, text `#FAFAFA`, hover `#3B3B3B`, focus outline `#FAFAFA` |
| Nav dropdown panel | `#1D1D1D`, border `rgba(255,255,255,.08)` | `#D8D8D8` (rgb 216), border `rgba(10,10,10,.04)` |
| Dropdown item | `#FFF`; hover bg `rgba(255,255,255,.08)` | `#0A0A0A`; hover bg `rgba(10,10,10,.04)` |
| Dropdown desc / badge | `rgba(255,255,255,.64)`; badge bg `rgba(255,255,255,.08)` | desc `#4F4F4F` (rgb 79); badge bg `rgba(10,10,10,.04)`, text `#4F4F4F` |
| Footer bg | `#0A0A0A` | `#FAFAFA` |
| Footer heading | `#A7A7A7` | `#626262` |
| Footer link + underline | `#FFF` | `#0A0A0A` (underline `#0A0A0A`) |
| Footer badge | bg `rgba(255,255,255,.08)`, `#A7A7A7` | bg `#EBEBEB`, `#626262` |
| Footer bottom bar text | `#A7A7A7`, hover `#FFF` | `#626262`, hover `#0A0A0A` |
| Footer social icons | svg `#FAFAFA` | the same SVG with fill `#FAFAFA` → `#0A0A0A` and stroke `#FAFAFA` → `#0A0A0A` (CSS `svg [fill="#FAFAFA"]{fill:#0A0A0A}`); hover color `#626262` |
| Footer ≤1280 CTA stack | | "Log in": bg `#F5F5F5`, border `1px #EBEBEB`, text `#0A0A0A`. "Book a demo": `#0044FF` (hover opacity .85) |
| Final CTA "The best never guess" | §10 | bg `#FAFAFA`; top gradient `linear-gradient(0deg, rgba(0,0,0,0), #FAFAFA)`; words `#0A0A0A`; ASCII canvas glyph rgb **"10, 10, 10"** (source: `rgb: theme.name==='light' ? "10, 10, 10" : undefined`); "Start free trial" glass: bg `rgba(10,10,10,.06)`, border `rgba(10,10,10,.24)`, `backdrop-filter:blur(16px)`, hover bg `rgba(10,10,10,.12)`; "Book a demo" stays `#0044FF` |

On **legal-doc and privacy-doc pages the nav has no "Log in" or "Book a demo"** (and no ≤1185 Menu pill change was tested). The right-hand group isn't rendered at all. The legal **index** does render them.

## J. Which pages show the shared final CTA ("The best never guess", CLONE_SPEC §10)

| Template | Final CTA | Footer theme |
|---|---|---|
| demo-form | yes (dark) | dark |
| comparison | **no** | dark |
| quiz hub | no | dark |
| role quiz pages | yes (dark) | dark |
| roi-calculator | no | dark |
| template-landing | no | dark |
| legal-index / legal-doc | yes (**light**) | light |
| article | no | light |
| 404 | yes (dark) | dark |

## K. Digital Twins modal

The timed modal from CLONE_SPEC §12 also fires on these pages (it opened over /legal/ and /privacy/privacy-policy/ during recon). The behaviour is identical.

## L. Things I could not measure

- FAQ open animation (see G).
- The nav ≤1185 behaviour on the light legal-doc nav, which has no right group. I assume it's the same as dark, with the Menu pill in light colours. That's unverified.
- The real network behaviour of forms (HubSpot/Segment) is intentionally not specced. All forms are static and non-submitting.
