Source: https://dovetail.com/legal/insurance/

# Template: legal-doc (`/legal/*` ×14, `/privacy/*` ×5)

All 19 routes share one DOM (labels `e1i8w341*`, `e78wk2r*`, `e1cwp7qs*`, `eevuv28*`, `e1noy6on*`, `e8fk9sg*`), confirmed by signature. Theme: **light** (`html[data-scroll-theme="light"]`; see `specs/tools-shared.md §I`).
- **The nav renders no "Log in" / "Book a demo" group on these pages.**
- The page ends with the light final CTA + light footer.

Data: `src/data/tools/legal--{slug}.json` / `privacy--{slug}.json`:
- `breadcrumb`, `h1`
- `sideNav.groups` (Legal 14 links / Privacy 5 links), `sideNav.expandedGroup`, `sideNav.current`
- `toc[]` (heading texts, verbatim)
- `body[]`: block outline. Headings are verbatim; every paragraph and list item is `{placeholder, chars}` with link and bold markers.
- `lastUpdated`

**Legal document bodies are not transcribed.**

## Geometry (top y / height)
| Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| spacer 88 | 118 / 88 | 118 / 88 | 126 / 88 | 126 / 88 |
| Title block | 206 / 404 | 206 / 156 | 214 / 140 | 214 / 140 |
| Doc layout (insurance) | 610 / 1022 | 386 / 1054 | 378 / 1054 | 378 / 1269 |
| spacer 160/96/96 | | | | |
| Light final CTA + footer | | | | |
| Doc height: insurance | 3460 | 3838 | 4087 | 4272 |
| Doc height: privacy-policy | 14774 | 14992 | | |

## 1. Title block (`div`, `padding:80px 0 160px; border-radius:8px`; ≤1280 `padding:40px 0 0; border-radius:0; margin:0`)
- SliceContainer:
  - **Breadcrumb** (`display:flex; flex-wrap:wrap; align-items:center; gap:4px`):
    - "Home" → `/`: M14 (JetBrains Mono 14/19.6, ls 1, uppercase) `#0A0A0A` at `opacity:.6`. Hover/focus: `text-decoration:underline`.
    - Slash: SVG 24x24 `breadcrumb-slash-24.svg` (stroke currentColor 2, `opacity:.6`).
    - Current crumb "Legal" → `/legal/`. This is also used on `/privacy/*` pages, so both say "LEGAL". It renders as **Inter 400 14/22, ls 0, uppercase**, `#0A0A0A`, opacity 1; hover underline.
  - Spacer 32.
  - H1 H72: 72/76 w600 ls -2 `#0A0A0A`, `margin-bottom:32px` (≤1280 56/60 ls -2, mb 24; ≤799 40/44 ls -1).

## 2. Doc layout (`div`: `display:flex; gap:32px; padding:0 32px`; ≤1280 `flex-direction:column-reverse; padding:0`)
Three children:

### 2a. Left side nav (`width:292px; position:sticky; top:96px; max-height:calc(100vh - 104px); overflow-y:auto`; hidden ≤1280)
- `aside`: `background:#FAFAFA; color:#0A0A0A; display:flex; flex-direction:column; justify-content:space-between; margin-top:8px`.
- Groups wrapper: `display:flex; flex-direction:column; gap:16px`.
- **Group header** (`display:flex; align-items:center; gap:8px; margin:0 0 8px`):
  - Chevron toggle button: 24x24, transparent, `color:#0A0A0A`, hover `#626262`. Its SVG is `legal-nav-chevron-right.svg`, which points right; it's rotated `rotate(90deg)` (pointing down) when the group is expanded and `rotate(0)` when collapsed, applied as an inline style with no transition.
  - Group label button "Legal" / "Privacy": Inter 600 14/18 `#0A0A0A`; hover `#626262` + underline.
  - Clicking either toggles the group.
- **Initial state:** the group containing the current page is expanded and the other is collapsed. Legal pages expand Legal; privacy pages expand Privacy.
- **Expanded group:** the links follow the header, indented (at 1440 the chevrons are at x≈36–52, labels at x=71 and links at x=64).
  - Each link: Inter 400 14/22 `#626262`, `margin:0 0 8px`; hover/focus/active `#0A0A0A` + underline.
  - **Current page link:** `#0A0A0A` with `text-decoration:underline`.
  - Links may wrap ("Anti-Bribery and Anti-Corruption Statement" takes 2 lines at 292px).
  - A spacer 8 after the list.
- **Collapsed:** the links aren't rendered. No height animation was observed.

### 2b. Center document column (`flex:1 1 0`)
- **Inner:** `max-width:856px; width:100%; margin:0 auto` (≤1280 `padding:0 64px`; ≤799 `0 16px`). It's 728 wide at 1440 (x=356–1084) because both sidebars are 292 wide.
  - At 1280 the side columns collapse, so the column is centred: 856 max, x=212 with 64 padding.
  - Starts at y=658 at 1440: there's a 48px gap above the first block, which is the first child's top margin when it's a heading, or `margin-top` from the layout.
- **Prose styles** (`.e8fk9sg2`; base `font:400 18px/24px Inter; color:#626262`):
  - `p`: 18/28, `margin:0 0 24px; text-wrap:pretty`.
  - `h1`, `h2`: 32/40 w500 ls -0.5 `#0A0A0A`, `margin:48px 0 24px` (≤1280 24/32 ls -0.25). `scroll-margin-top:32px`.
    - On privacy-policy the h2 text sits in a `<strong>`, which gives the same look.
  - `h3`: 24/32 w500 ls -0.5 `#0A0A0A`, `margin:40px 0 24px` (≤1280 20/28; ≤799 18/24).
  - `h4–h6`: same size as h3, `margin:16px 0 8px`.
  - `ul`: `font-size:18px; padding-left:24px; margin-bottom:24px`. `li` has lh 28 and `margin-bottom:8px` (nested `li p` mb 8). Disc bullets.
  - `ol`: same, `list-style-position:outside`, decimal.
  - `strong`, `b`: `#0A0A0A` (w500 measured).
  - `a` (inline link): `#0A0A0A`, `text-decoration: underline 1px #C4C4C4; text-underline-offset:1.5px`.
    - An `::after` 1px `#0A0A0A` line at `bottom:2px` goes `scaleX(0)` → `scaleX(1)` on hover/focus-visible (`transform 200ms ease-out`, origin left), with `transition: color 200ms ease-out`.
  - `blockquote`: `color:#626262; border-left:2px solid #626262; padding-left:16px`.
  - `table`: `border-collapse:collapse; width:100%; margin:48px 0; font-size:16px` (≤799 margin 32).
    - `th`: `#0A0A0A` w600 left, `padding:12px 16px; border-bottom:2px solid #D8D8D8; background:rgba(255,255,255,.04)`.
    - `td`: `#626262; padding:10px 16px; border-bottom:1px solid #D8D8D8; vertical-align:top`. The last row has no border.
    - No legal doc in this group contains a table.
  - `img`: `width:100%; height:auto; border-radius:8px; margin:64px 0` (≤799 32). Only press-kit uses images: `dovetail_logo_white.png`, `dovetail_logo_black.png`, `dovetail_badge_black.png` (in `/assets/tools/`).
  - `hr` inside the body (privacy-policy): measured 2px tall, `#808080`, `margin:9px 0 32px` (8px at ≤1280).
- **After the body:**
  - Spacer 64.
  - `hr` 1px `rgba(10,10,10,.24)`.
  - Row `display:flex; padding:16px 0` with two cells. Each is M14 `#626262`, `width:150px`: "Last updated" | "{date}" (e.g. "01 July 2025"). At 390 the date wraps to 2 lines (71px row).
  - `hr`.

### 2c. Right "On this page" TOC (`width:292px; position:sticky; top:96px; max-height:calc(100vh - 104px); overflow-y:auto`; hidden ≤1280)
- `ul`: `display:flex; flex-direction:column; gap:16px; list-style:none; margin:8px 0 16px; padding:0; opacity:1`.
- One `button` per body h2/h3, in order, with no h2/h3 indentation difference. Button style: Inter 400 14/22 `#0A0A0A`, `display:inline; text-align:left; white-space:normal; overflow-wrap:anywhere; width:100%; padding:0`. Hover `#626262` + underline (also on `:active`).
- Click scrolls to the heading. The heading has `scroll-margin-top:32px`; the scroll behaviour (smooth or instant) wasn't measured.
- **No scroll-spy:** no active-state change occurs while scrolling (MutationObserver verified on privacy-policy).
- Pages without h2/h3 have an empty right column. It still takes 292px, so the body stays at x=356.
- **TOC entry counts:** MSA 26 · User ToS 12 · privacy-policy 24 · DSAR 13 · press-kit 6 · accessibility 4 · community code 4 · modern slavery 2 · open source 2 · the rest 0.

## 3. Mobile (≤1280)
- The side nav and TOC are hidden, and there's **no replacement drawer** on legal pages (unlike the article template).
- The column is centred with padding 64 (≤799 16).
- The title block is `padding-top:40px` with no bottom padding, so the body starts right after the H1's 24px margin.

## Motion
- Link underline: 200ms ease-out.
- Group toggle: instant.
- No scroll or load animations.
