Source: https://dovetail.com/customers/

# Template: customers-index (`/customers/`)

Data: `src/data/company/customers.json`. Shared components are in `specs/company-shared.md` (abbreviated S1–S15 below). Global tokens, nav, banner, final CTA and footer are in `CLONE_SPEC.md`.

Page chrome: standard banner and nav (S1). The footer is the final CTA (CLONE_SPEC §10) followed by the footer (§11).

`<main>` heights:

| Viewport | `<main>` height |
|---|---|
| 1440 | 42,003 |
| 1280 | 51,927 |
| 768 | 108,563 |
| 390 | 106,101 |

The page is very long because of the 368-logo wall and the 185-card testimonial wall.

Section order:
1. Typewriter hero
2. Industry filter + story grid (39 cards)
3. S200 spacer
4. Logo wall (368)
5. Pixel band (bottom)
6. Blue story carousel
7. Pixel band (top)
8. Ratings + "Trusted and loved by users" + awards marquee
9. Testimonial wall (185, clipped)
10. S200 spacer
11. Footer stack

---

## 1. Typewriter hero

**Outer:**
- `background:#0A0A0A; display:flex; flex-direction:column; padding-bottom:96px` (≤600 64).
- JS sets inline `min-height: calc(100vh - {headerHeight}px)`, where the header is the banner + nav wrapper (118px at 1440, so 782px at 1440x900).
- Children: a HERO spacer (96 / 56 / 56), then a SliceContainer with `flex:1; display:flex; flex-direction:column; justify-content:space-between`. This pins the tagline row to the bottom of the first viewport.

**Top block:**
- Eyebrow: "Customer stories" (M14 `#A7A7A7`, margin-bottom 24).
- `h1`:
  - H96 `#FAFAFA` (96/100 ls -2; ≤1280 72/76; ≤799 48/52 ls -1).
  - `max-width:1150px; position:relative; min-height:200px` (≤1280 152; ≤799 104).
  - Measured 1150x200 at 1440, 1150x228 at 1280 (3 lines), 736x104 at 768, 358x104 at 390.
  - Contents:
    - A visually-hidden span with the full quote text (for screen readers).
    - A highlight layer (`position:absolute; inset:0; z-index:0`) holding one absolutely positioned rect per text line, bg `#313131`. These only appear in the "highlighting" phase.
    - The visible typed text (`position:relative; z-index:1; aria-hidden`), made of characters plus inline icon images.
    - A caret span after the typed text.
  - **Caret:** `display:inline-block; width:.06em; height:.82em; margin-left:.04em; vertical-align:baseline; background:#FAFAFA; animation: caret 1s steps(1,end) infinite` where `@keyframes caret {0%,50%{opacity:1} 50.01%,100%{opacity:0}}`. Shown only in the typing and holding phases.
  - **Inline icons:** wrapper `display:inline-block; vertical-align:middle; height:0; line-height:0; font-size:0; position:relative; overflow:visible; z-index:1`, with a per-icon width. The `<img>` is `position:absolute; top:50%; left:50%; width:auto; height:96px` (≤1280 72; ≤799 48), `object-fit:contain`, `transform: translate(-50%, calc(-50% - 8px))` (≤1280 -6px; ≤799 -4px).

    | icon key | file | wrapper width >1280 / ≤1280 / ≤799 |
    |---|---|---|
    | eyes | `/assets/company/media/icon-googly-eyes.png` | 181 / 136 / 90 |
    | clock | `/assets/company/media/icon-clock.png` | 94 / 70 / 47 |
    | computer | `/assets/company/media/icon-old-computer.png` | 100 / 75 / 50 |
    | bulb | `/assets/company/media/icon-bulb.png` | 64 / 48 / 32 |
    | nose | `/assets/company/media/icon-nose.png` | 86 / 64 / 43 |

  - The quotes are listed verbatim in the data file (`hero.quotes`, each one sentence with an icon token).

**Bottom row:**
- Container: flex, `justify-content:space-between; align-items:center; gap:24px` (≤600 column, start-aligned, gap 24).
- Tagline `p`:
  - H32 `#FAFAFA`, `max-width:648px`. Text: "Our customers words, " + `<span>not ours.</span>`. At ≤600 the span becomes `display:block`.
  - Measured 467.8x40 at 1440 and 354.6x32 at 1280/768.
- Arrow buttons: flex, gap 16, `flex-shrink:0` (94x32 total). Two `<button>`s, each holding the 39x32 pixel-arrow SVG (`svg/arrow-pixel-39x32.svg`, `fill:currentColor`).
  - "Previous quote": `transform:rotate(180deg); color:rgba(255,255,255,.64); opacity:.4`.
  - "Next quote": `color:#FAFAFA; opacity:1`.
  - Both: `transition: color 300ms ease-out, opacity 300ms ease-out`. Hover/focus: `#FAFAFA`, opacity 1.

**Typewriter motion (source, exact):**
```
phases: typing → holding → highlighting → blank → (next quote) typing
tokens = quote split into chars, with each {icon} as one token
typing:      every token appears after setTimeout(42ms) (char) or 260ms (icon); when all are shown → holding
holding:     1800ms (caret blinking) → highlighting
highlighting: per-line rects (Range.getClientRects merged by line, relative to the h1) get bg #313131; caret hidden; 450ms → blank
blank:       typed text cleared (index 0); 260ms → index = (index+1) % 5, typing
prev/next:   index ±1 (wrap), reset to typing from token 0
reduced motion: full quote shown immediately, no caret, index advances every 5000ms
```
All icon images are preloaded on mount. The first quote is index 0 ("cry").

## 2. Industry filter + story grid

SliceContainer, containing:

**Filter row:** `display:flex; flex-wrap:wrap; gap:8px; margin-bottom:64px; align-items:center`. It wraps to 2 rows at 1440 (72 tall), 3 rows at 768 (112), and 7 rows at 390 (232).
- Chip (`<button aria-pressed>`):
  - Inter 14/16 w500, pad 8px 12px, radius 8, no border, `backdrop-filter:blur(8px)`, `white-space:nowrap`.
  - `transition: background-color 300ms ease-out, color 300ms ease-out`.
  - Inactive: bg `rgba(255,255,255,.08)`, colour `rgba(255,255,255,.8)`.
  - Active (and hover/focus): bg `rgba(255,255,255,.16)`, colour `#FAFAFA`.
  - The "All" chip is 41x32.
- Chips, in order: All, then the industries (data `filters`).
- Behaviour: click sets the active filter. Cards are filtered client-side (`card.industry.includes(filter)`) and sorted by `order` ascending (missing order last). There is no transition: cards simply re-render.

**Grid:**
- 12-col SliceGrid inner (`gap:64px 32px`; ≤1280 `24px`; ≤799 4 columns, gap 24).
- Each card column is `span 4` (≤1280 `span 6`; ≤799 full width).
- Cards are S2 `CustomerStoryCard` with hover pixels in `#212121`.
- 39 cards = 13 rows at 1440. Row height is 531.8 for 2-line titles and 559.8–587.8 for 3–4-line titles, because rows stretch to the tallest card.
- Measured grid height: 7,821 at 1440, 15,117 at 1280, 35,147 at 768, 19,307 at 390.

## 3. Logo wall

- SliceGrid with `padding:0 128px` (≤1280 64; ≤799 16), gap 32 (≤1280 24), 12 columns (≤799 4).
- 368 cells, each `grid-column: span 2` (6 per row ≥800; 2 per row ≤799), `display:flex; justify-content:center` (block at ≤1280).
- Each cell holds a 142x64 flex-centred box with `<img>` `max-width:100%`, `object-fit:contain` (white logo SVG; 3 of the 368 are PNG). Cells are 170.7 wide at 1440, 172 at 1280, 356 at 768 and 167 at 390. Row pitch is 96 (64 + 32 gap).
- Measured wall height: 5,920 at 1440, 5,432 at 1280, 16,168 at 768/390.
- No animation and no hover.

## 4. Pixel band + blue story carousel + pixel band

- **Pixel band A** (S10, `pixelateBottom`): wrapper `margin-bottom:-120px`. Child: a `#0A0A0A` block holding an S200 spacer, then the 120px pixel field (squares go from `#0A0A0A` to transparent, revealing the blue below). Hidden ≤1280.
- **Carousel band** (`CustomerStoriesSlice`):
  - Outer: `background:#0044FF; height:910px` (≤1280 700; ≤799 auto); `overflow-x:clip; position:relative`.
  - **Background video:** `<video autoplay muted loop playsinline preload="none" disableRemotePlayback aria-hidden role=presentation>`, `position:absolute; inset:0; margin:auto; width/height:100%; object-fit:cover; opacity:.16; pointer-events:none; z-index:2`. Sources are `video/mp4` and `video/webm`. It renders only after `window.load` **and** after an IntersectionObserver (`rootMargin:200px; threshold:.1`) fires.
    - The source is keyed to the active story's `fullWidthVideoUrl` (Breville → `/media/CustomerStoryBrevilleLoop.mp4`, Atlassian Design → `/media/AtlassianStoryLoop.mp4`, Itaú → `/media/Itau_Trimmed.mov.webm`). The poster is `fullWidthImageUrl`.
    - **Videos were not downloaded (images only).** Use the poster stills `media/CustomerStoryBrevilleLoop_copy.png`, `media/Frame_1948762765.png` and `media/Itau_Trimmed.mov.webp` at opacity .16, or hotlink the mp4s.
  - **Content:** flex column centred vertically (≤799 `padding:64px 0`), z 3. SliceContainer with `padding:64px 124px` (≤1280 `0 64px`; ≤799 `48px 16px`), flex column, `align-items:center`.
    - **ProgressTabs:** flex, gap 16, centred. Each tab is a flex row (gap 16) containing:
      - A `<button aria-label="{Company} customer story">` with label "01"/"02"/"03": M14 `#FAFAFA`, `padding:8px; margin:-8px`, `transition: 300ms color`.
      - For the **active** tab only, a 96px progress track: 1px `rgba(255,255,255,.08)` holding a fill (1px `#FFF`, `width:{progress}%`, `transition:all 100ms`) with a white 8x8 square `::after` at its right end (`top:-3px`).
    - 40 spacer (32 at ≤1280).
    - Slide wrapper: `max-width:812px; width:100%; text-align:center`. Only the active slide is `display:flex` (column, centred); the others are `display:none`, with no transition.
      - `h3`: H56 `#FAFAFA` centred. The company name in the heading is followed by `[` + logo + `]` in an inline-flex span (gap 8, `vertical-align:middle`). The logo is an inline SVG 56 tall (≤1280 44; ≤799 32): `svg/carousel-logo-breville.svg`, `svg/carousel-logo-atlassian.svg` (64x64 circle mark), `svg/carousel-logo-itau.svg`.
      - 24 spacer (16).
      - `p`: P20 `#FAFAFA` centred, `max-width:680px` (placeholder copy, length in data).
      - 32 spacer (24).
      - Buttons (flex, wrap, centred, gap 8): primary "Read the story" → `/customers/{slug}/`. The secondary "All customer stories" is **omitted on this page**.
  - **Autoplay (source `useTabGroup(0, 110)`):**
    - `progress` increments by 1 every **110ms**. At 100 it resets to 0 and advances (wrapping), so each slide lasts about 11.1s.
    - It starts when a ScrollTrigger on the band first toggles (enters the viewport).
    - Clicking a tab sets it active, resets progress to 0, and **stops autoplay permanently**.
    - Reduced motion: no autoplay.
    - Measured content block: 812x364.7 at 1440 (h3 3 lines = 184.7).
- **Pixel band B** (S10, `pixelateTop`, `margin-top:-120px`): squares go from transparent to `#0A0A0A` over the bottom of the blue. Its child is an S0 spacer.

## 5. Ratings + headline + awards marquee

Wrapper `position:relative`, with the dot tile `::after` (S12, opacity .08). Four GradientBanners fade it to black on every edge:
- top: 200 tall, 0deg
- bottom: 200 tall, 180deg
- left: 200 wide, 270deg
- right: 200 wide, 90deg

Contents:
- S200 spacer.
- **Ratings row:** flex, centred, gap 32 (≤799 column, gap 16). Three links (`target=_blank`) to the G2, Capterra and TrustRadius URLs (same as the homepage).
  - Each link is a flex row (gap 8): five 16px stars (gap 3; 4× `svg/rating-star-full-16.svg` + 1× `svg/rating-star-half-16.svg`, because `floor(rating)` gives full stars and any fraction adds a half star; ratings are 4.5, 4.6, 4.3), then the label "G2" / "Capterra" / "TrustRadius".
  - Label: M12, `rgba(255,255,255,.64)`; hover `#FAFAFA` (`transition: color 150ms`).
  - Link boxes: 118.4 / 167.6 / ~190 x 18.
- S32 spacer.
- **Headline `p`:** `color:#FAFAFA; font-weight:600; 112px/96px; ls -4px; centred` (≤1280 72/64 ls -2; ≤799 56/52 ls -1.5). Two flex lines (centred, gap 24; ≤799 12):
  - Line 1: "Trusted" + 3D flag image + "and". The image `media/3d-flag.png` is 120x120 (≤1280 88; ≤799 60), `object-fit:contain`, `filter: drop-shadow(rgba(0,0,0,.6) 0 -4px 16px)`, in an inline-flex wrapper with `top:-6px` (≤799 -2).
  - Line 2: "loved by" + "users" in PP Mondwest 130px (≤1280 84; ≤799 65), w400.
  - Measured 1192x216 at 1440.
- S200 spacer.
- **Awards marquee** (S11, `direction:'rtl'`, gap 80 → item padding 40 / ≤1280 20). Each item is a flex row (gap 32):
  - Badge `<img height=72>` (width auto). The source sets `width="100%"`, so render it at height 72 with auto width.
  - A text column (flex column, gap 8, centred): title H24 (24/32 w500 ls -0.5; ≤1280 20/28; ≤799 18/24) above the name (M14 `#A7A7A7`).
  - 12 items, listed in the data.
- HERO spacer (96 / 56 / 56).

## 6. Testimonial wall

- Outer: `position:relative; margin-bottom:-1000px` (≤1280 -500).
- SliceGrid: `overflow:hidden; clip-path: inset(0 0 1000px 0)` (≤1280 500px). It contains one full-width column.
- Masonry: `column-count:3; column-gap:32px` (≤1280 2 columns, gap 24; ≤799 1 column).
- **Ordering:** cards are interleaved so that reading down the columns gives the original order. The array is reordered as `[items i%3==0, then i%3==1, then i%3==2]` before render, then flowed into the CSS columns.
- Item: `break-inside:avoid; padding-bottom:32px`.
- **Card:**
  - Box: bg `#121212`, border 1px `#1E1E1E`, radius 8, padding 32, `height:100%`, flex column, gap 96.
  - Quote: P20 `#FFF` (≤1280 16/24), wrapped in curly quotes.
  - Person row (flex, centred, gap 16):
    - Optional 40x40 avatar (radius 4, cover).
    - A text stack: name (16/24 w500 `#FFF`) above the company (14/22 `#A7A7A7`).
  - Card height is driven by the text (e.g. 376 at 1440 for 169 chars).
- **Bottom fade:** absolute, `height:500px; bottom:1000px` (≤1280 500), `linear-gradient(180deg, rgba(0,0,0,0) 35%, #0A0A0A 100%)`.
- The net visible wall is the masonry height minus 1000px, faded out. There is no "show more" control: the bottom simply fades. 185 cards; measured wall element height 26,040 at 1440 (about 25,040 visible).

---

## Motion summary
| Thing | Trigger | Details |
|---|---|---|
| Hero typewriter | mount | 42ms/char, 260ms/icon, hold 1800, highlight 450, blank 260 |
| Caret | typing/holding | 1s steps(1) blink |
| Filter chips | hover/click | bg/colour 300ms ease-out |
| Story card | hover ≥1281 | 49-square random dissolve (~300ms total) + overlay opacity 80ms ease-out |
| Pixel bands | scroll (scrub) | S10 |
| Carousel | in view | +1% / 110ms; slides swap instantly; video opacity .16 |
| Awards marquee | always | 60s per set, linear |
| Rating labels | hover | colour 150ms |

## Responsive notes
- **≤1280:** story overlay and pixel effects are off. The grid is 2-up. The carousel is 700 tall and the pixel bands are hidden.
- **≤799:** 1-up cards. The hero tagline row stacks at ≤600. The ratings stack vertically and the carousel height is auto.

## Gaps
- Background videos (mp4/webm) were not downloaded (images only); posters were.
- Hover overlay and pixel timing come from source. Pixel stagger order is random per hover, so it can't be pixel-matched.
