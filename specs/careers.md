Source: https://dovetail.com/careers/

# Template: careers (`/careers/`)

Data: `src/data/company/careers.json`. Shared components: `specs/company-shared.md`.

Page chrome: standard banner and nav (the hero pulls up via the hero spacer). The footer is the careers pre-footer CTA (560) followed by the footer (769).

`<main>` heights:

| Viewport | `<main>` height |
|---|---|
| 1440 | 12,173 |
| 1280 | 11,952 |
| 768 | 17,354 |
| 390 | 15,037 |

The job list comes from Ashby (`allAshbyJobPosting`) at build time. The data file holds titles, locations, teams and links only.

Section order:
1. Collage hero
2. Sticky-globe story (3 panels)
3. S200 spacer
4. Open positions (filters + list) and "Can't see the role…"
5. S200 spacer
6. "Meet some of the humans" accordion
7. S200 spacer
8. "The full package" benefits
9. S200 spacer
10. Video gallery
11. S200 spacer
12. "Driven by values" poster carousel
13. S200 spacer
14. "How we hire"
15. S200 spacer
16. FAQs
17. Pre-footer CTA
18. Footer

---

## 1. Hero (GridBackground)
- **Outer:** GridBackground (S12, 48px grid lines `rgba(255,255,255,.08)`), `position:relative`. Measured 819.8 tall at 1440, 667 at 1280 and 474 at ≤799.
- **Top fade:** GradientBanner, 147 tall (≤799 140), 0deg.
- HERO spacer.

**Desktop collage** (`display:none` ≤799): a flex column, centred. Contents, top to bottom:
- Eyebrow "Careers at Dovetail": M14 `#A7A7A7`.
- S32 spacer.
- A visually-hidden `h1` "Help build the future of customer intelligence".
- An `aria-hidden` stack of four lines. Each line is styled 112px w600 ls -2, **lh 1.1**, centred, `width:fit-content`. At ≤1512 the font size is `7.2vw` (103.68px at 1440, 92.16px at 1280).
  - Lines with offsets:
    - "Help build"
    - "the future of" with `margin:-16px 22px 0 0`
    - "customer" with `margin-top:-24px`
    - "intelligence" with `margin-top:-16px`
  - Lines 1 and 4 are wrapped in a relative flex row so images can hang off them.
  - Every image is in a box with radius 8, `overflow:hidden`, `position:absolute; top:50%; transform:translateY(-50%)`:

    | Image | Anchor | Width | Measured at 1440 |
    |---|---|---|---|
    | `media/hand_group.png` | left of "Help build": `right:100%; margin-right:16px` | `clamp(97px,12vw,226px)` | 172.8 |
    | `media/Group_1699555905.png` | right of "Help build": `left:92%; margin-left:24px`, `transform: translateY(-47%) rotate(-4.032deg)` | `clamp(120px,15vw,278px)` | 234.5 incl. rotation |
    | `media/Group_1699555903.png` | left of "intelligence": `right:89%` | `clamp(146px,18vw,340px)` | 259.2 |
    | `media/Group_1699555898.png` | right of "intelligence": `left:93%; margin-left:24px; z-index:+1` | `clamp(94px,12vw,219px)` | 172.8 |

**Mobile hero** (≤799 only; SliceContainer with `overflow-x:clip`):
- A relative flex row holding `h1` "Help build the future of customer intelligence": width 326, w600, 48/52 ls -1 (112/116 ls -3 base; 72/76 at ≤1280).
- Image `Group_1699555905.png` sits absolutely to its right: `top:143px; right:-50px; width:clamp(175px,15vw,278px)`, rotated -4.032deg. That's 189x220 at 390.

**Button row** (flex, centred, z 3, `margin-top:32px`; ≤799 left-aligned with `padding-left:16px`):
- Primary `<button>` "See open roles" (133.6x40).
- On click it smooth-scrolls to `#open-roles`: `window.scrollTo({top: el.getBoundingClientRect().top + scrollY - 120, behavior:'smooth'})`.

**Bottom:** an S200 spacer (≤1280 140; ≤799 140), then a bottom GradientBanner (200 tall, ≤799 140, 180deg).

**Motion:** none. The collage is static.

## 2. Sticky globe story (`CareersGlobeSlice`)
- **Outer:** `display:flex; align-items:flex-start; background:#0A0A0A` (≤799 column).
- **Left (globe)**, desktop and tablet only:
  - Box: `position:sticky; top:0; height:100vh; width:50%; display:flex; align-items:center; justify-content:flex-start; overflow:visible` (≤1400 `overflow:hidden`; ≤799 `display:none`).
  - Left fade: 300 wide, `linear-gradient(to right, #0A0A0A, transparent)`, z 1.
  - Right fade: 120 wide, `linear-gradient(to left, #0A0A0A, transparent)`, shown only ≤1400.
  - Globe box: 1050x1050, `margin-left:-250px` (≤1400 -350). At ≤1280 `transform:scale(.82)` with `margin-left:-358px`; at ≤1050 `scale(.65)`.
  - Inside:
    - A centred wireframe SVG `svg/careers-globe-wireframe.svg` (viewBox 518, colour `#3B3B3B`) at `width/height: 70.4%` (= `.35/(257.5/518)`), measured 739x739.
    - A full-size `<canvas>` above it.
- **Canvas algorithm** (source `GlobeAnimationV2`; reproduce exactly):
  ```js
  // setup (on resize): canvas = box * devicePixelRatio; R = 0.35*min(w,h)
  makePoint(R): theta=acos(-1+2*rand), phi=rand*2π, r=R*(1+0.05*rand)
    tx=r cosφ sinθ, ty=r sinφ sinθ, tz=r cosθ ; x,y,z = t ; ditherThreshold=0.4*rand-0.2 ;
    isPermanentShadow = rand<0.02 ; visible=true ; phase=rand*2π
  points = 2000 × makePoint(R), sorted by z desc
  draw(): clear; fillStyle '#0044ff'; c=t (seconds-ish, += .016 per rAF)
    for p of points if visible: s=1200/(1200+p.z); jx=.8 sin(3c+phase); jy=.8 cos(2.1c+1.4phase)
      X=p.x*s+w/2+jx; Y=p.y*s+h/2+jy; alpha=max(.3, 1-.2|sin(3c+phase)|); size=4s
      globalAlpha=alpha; fillRect(X-size/2, Y-size/2, size, size)
  rAF loop runs only while IntersectionObserver says the box is visible and the tab is visible.
  onScrollUpdate (ScrollTrigger: trigger = whole slice, start "top bottom", end "bottom top", onUpdate):
    state.time++ ; if time>200 && points<5000: push 40 new makePoint(R)
    if time>180: rotSpeed *= .9 (→0 below 1e-5)   // initial rotSpeed .005
    light dir: a=.01*time+π; L=(sin a, .2, cos a)/|…|
    for p: x+=(tx-x)*.02 (same y,z); if rotSpeed>0: rotate (tx,tz) by rotSpeed about Y
      visible = dot(normalize(t), L) > ditherThreshold || isPermanentShadow
    sort by z desc; draw()
  ```
  So the globe is a dithered blue point sphere: it jitters constantly, and its lit hemisphere sweeps and its density grows as you scroll.
- **Right (panels):** `width:616px` (≤1280 `50%; padding:0 64px`; ≤799 `100%; padding:0`). Three panels, each `min-height:100vh; display:flex; align-items:center` (≤799 `min-height:auto; padding:48px 24px`, first with no top padding, last with no bottom padding).
  - `h2`: H56 `#FFF`, margin-bottom 24.
    - Mondwest words are `font-family:PP Mondwest; w400; font-size:mondwestSize(56)` → 65px (≤1280 46; ≤799 37).
    - Inline icons: same inline-icon wrapper as the customers hero (§S0.4 note in the customers spec):
      - star `media/icon-star.png` (wrapper 66 / 50 / 33)
      - working `media/working-icon.svg` (59 / 44 / 30)
      - understand `media/understand-icon.svg` (72 / 54 / 36)
      - The img is `height:64px` (≤1280 48), `translate(-50%, calc(-50% - 4px))`.
  - Panel 1 heading: "Dovetail is building the Customer " + *Intelligence* (Mondwest) + " Platform used by the world’s " + `[` + logo rotator + `]` + " best orgs". The rotator is identical to S7 (80px slot; 64 at ≤1280; 48 at ≤799), with the same 16-slot `rotator-8 16s ease-in-out infinite` and the same 8 logos.
  - Panel 2 heading: "AI " + star icon + " has been at our core " + *loooong* + " before it was mainstream".
  - Panel 3 heading: "Together, we’re all working " + working icon + " to solve the same " + *problem...*
  - Body:
    - Panels 1 and 2: P20 `rgba(255,255,255,.64)` (placeholders).
    - Panel 3 uses large body text (H56 white): "Helping companies better " + understand icon + " " + *understand* + " their customers."
- **Vertical fade overlay** (≥800): `position:sticky; top:0; height:100vh; width:616px; margin-left:-616px` (≤1280 `50% / -50%`), `pointer-events:none; z 2`, background `linear-gradient(#0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)`.
- Measured height: 2,700 at 1440 (3 × 900), 2,400 at 1280, 700 at 768 (globe hidden) and 1,084 at 390.

## 3. Open positions (SliceGrid, `id="open-roles"`, mobile row gap 64)
- **Heading block** (column `1 / -1`):
  - `h2` "Open positions": H64.
  - `p`: P20 `rgba(255,255,255,.64)`, `margin-top:32px; max-width:800px`. Placeholder, 464 chars.
  - S64→0 spacer (64 / 0 / 0).
- **Filters column** (`span 3`, 274 at 1440):
  - `position:sticky; top:120px; height:fit-content; align-self:flex-start; display:flex; flex-direction:column; gap:20px; z-index:1` (≤1280 `position:static`, full width).
  - Contents: a 1px rule (`rgba(255,255,255,.24)`), the team fieldset, a rule, then the location fieldset.
  - Each fieldset has no border and a visually-hidden legend ("Filter by team" / "Filter by location"). It holds radio labels:
    - Label: M14, flex row, gap 2, `padding:4px 0` (the base is `12px 0; min-height:44px`, overridden in this column), `cursor:pointer`.
    - An 8x8 square indicator: `background:#FFF` when checked, none when unchecked. There's no border, so unchecked shows nothing.
    - The visible text sits in a span with `margin-left:8px`.
    - The native `input[type=radio]` comes after the text with `margin:0` (left visible at 0 size by the site; hide it visually).
    - Hover/focus label colour: `#A7A7A7` (unchecked) or `#FFF` (checked).
  - Options:
    - Team: "all teams", "Sales & Customer Success", "Marketing", "Engineering", "Design & Research".
    - Location: "all locations", "US Remote", "Sydney".
    - The site renames "New York, United States (remote)" to "New York, USA (remote)" if present.
- **Jobs column** (`span 9`, x=430, 886 wide; ≤1280 full):
  - Flex column, gap 32. One group per team:
    - `p` team name: H24, margin-bottom 24.
    - S4 row list (hr above each row).
    - Row small text = location; row title = job title; href = Ashby URL, opened in the same tab.
  - Filtering is client-side: a row shows if `(team == selected || all) && (location == selected || all)`. Empty groups are hidden.
  - If there are no jobs at all: "There are currently no open roles." (H32 `#A7A7A7`, `margin:32px 0`).
- **"Can't see the role you’re looking for?"** (SliceContainer, after a HERO spacer):
  - `p`: H24, margin-bottom 8.
  - `p`: P16 `rgba(255,255,255,.64)`, `margin:16px 0; max-width:630px`. Placeholder, 171 chars.
  - Link "Join our talent community" → Ashby form (`target=_blank`): H18 `#FFF` with the S0.5 underline-scale hover.

## 4. "Meet some of the humans behind the product" (team accordion)
- **Outer:** `background:#0A0A0A`.
- **`h2`:** H80 centred, `margin-bottom:96px` (≤799 `text-align:left; margin-bottom:64px`).
  - Text: "Meet some of the humans" + `<br>` (hidden ≤799) + inline image `media/meet-careers.png` + " behind the product".
  - Inline image wrapper: 80x80 (≤1280 48; ≤799 32), `margin:0 4px`. The img is 80 tall (48 / 32), `translate(-50%, calc(-50% - 4px))`.
- **List:**
  - Children have `transition: opacity 250ms ease`. On list `:hover`, every child goes to `opacity:.4` except the hovered child (opacity 1).
- **Item** (flex row, start-aligned):
  - `padding-top:32px; padding-bottom: open ? 96px : 32px; transition: padding-bottom 400ms ease` (≤799 `24px` / `64px` open, gap 16).
  - **Photo column** 278 wide (hidden ≤799): img `width/height: open ? 216 : 140`, `object-fit:cover; object-position:center top; border-radius:8px; transition: width 400ms ease, height 400ms ease`.
  - **Content** (`flex:1; min-width:0`):
    - Toggle `<button aria-expanded>`: unstyled, full width.
      - Name: 48/60 w600 ls -2 (≤1280 40/44 ls -1; ≤799 32/36 ls -0.25).
      - A row (flex, space-between, centred) with the role in **PP Mondwest** 56/56 ls -2 (≤1280 46/48; ≤799 37/40) and the pixel arrow (`svg/careers-pixel-arrow.svg`, 38.4x32, 9 `#0044FF` 6.4px rects). The arrow's transform is `rotate(180deg)` closed and `rotate(270deg)` open, with `transition: transform 300ms ease; margin-left:16px`.
    - Body: `overflow:hidden; margin-top:32px; display:flex; flex-direction:column; gap:16px; max-width:720px`. Initial inline style `height:0; opacity:0`. Paragraphs are P20 `rgba(255,255,255,.64)`; the first starts with “ and the last ends with ”.
- **Motion (GSAP):**
  - Open: `to(body,{height:'auto', opacity:1, duration:.4, ease:'power2.out'})`.
  - Close: `to(body,{height:0, opacity:0, duration:.3, ease:'power2.in'})`.
  - Only one item is open at a time. Item 0 (Anahita) is open on load (set without animation). Clicking the open item closes it.
- Members: Anahita (User Experience Manager), Ben (Software Engineer), Tia (Senior Creative Director), Seb (see data).
- Measured: open item 588 tall at 1440, closed item 212.

## 5. "The full package" (benefits)
- SliceGrid with `gap:96px 32px` (≤1280 24; ≤799 `48px 24px`).
- **Heading** (column `1 / -1`, ≤799 padding-bottom 16):
  - `h2` H64, `max-width:610px`.
  - `p` P20 `rgba(255,255,255,.64)`, `margin-top:32px; max-width:610px`. Placeholder, 165 chars.
- **8 benefits**, each `span 3` (4 per row at 1440; full width at ≤1280). Flex column, gap 32:
  - Index "[01]"…"[08]": M14 `#6798FF`.
  - Text (flex column, gap 8, `max-width:272px`):
    - Title: H18.
    - Body: P16 `rgba(255,255,255,.64)` (placeholder).

## 6. Video gallery
- **Grid:** `grid-template-columns:repeat(12,1fr); grid-template-rows:repeat(17,1fr); gap:0; max-width:1312px; margin:0 auto; padding:0 24px` (≤799 1 column, auto rows). Measured 1312x941.5 at 1440.
- **Items** (S5 video cards: border image, play tile, title H20 margin-top 32, hover darken 200ms):

  | # | Placement (inline style) | Height | Measured | Poster | Title | YouTube |
  |---|---|---|---|---|---|---|
  | 1 | `grid-column: span 4; grid-row: 2 / span 16` | 670 | 421x670 | `media/tommy-careers.png` (798x1340) | "Join Tommy, as he takes you on a grand tour of Dovetail’s headquarters in Sydney." | `DzEbrR2WyHg` |
  | 2 | `grid-column: 8 / span 4; grid-row: 1 / span 6` | — | — | `media/Screenshot_2026-01-14_at_13.55.55_1.png` | "A look back on Dovetail in 2025." | `xSG0Ogvn4iM` |
  | 3 | `grid-column: 7 / span 6; grid-row: 10 / span 8` | — | — | `media/makeit.png` | "A snapshot from Make It week, one of our favorite rituals." | `KAgOFWktDKc` |

- At ≤799 each item is `grid-area: auto / 1 !important; margin-bottom:64px` (last 0), with auto height.
- Followed by an S200 spacer.

## 7. "Driven by values"
- **Heading** (SliceContainer):
  - `h2` H64, `max-width:614px`.
  - `p` P20 `rgba(255,255,255,.64)`, `margin-top:32px; max-width:722px`. Placeholder, 311 chars.
  - S96→64 spacer.
- **Desktop/tablet:** S8 Carousel (`cardsPerViewMobile:1.1; maxCardWidth:400; scrollbarPadding`).
  - Track: `grid-template-columns: repeat(5, 400px); gap:32px; width: calc(1496px + 50vw); margin: 0 calc(50% - 632px)` (≤1512 `margin:0 124px`). The scroller has `padding-right:900px` at 1440.
  - Right fade: 122px. Progress bar: S8.
- **Card:**
  - Poster img: 400 wide, aspect 800/1132 (400x566), radius 8, `overflow:hidden`.
  - `h3`: H18, margin-top 32.
  - `p`: P16 `rgba(255,255,255,.64)`, margin-top 8.
- **Posters:**
  - "Put the customer first": `poster_put_the_customer_first.png`
  - "Stay humble": `poster_stay_humble.png`
  - "Do the thing": `poster_do_the_thing.png`
  - "If we do it, we nail it": `poster_we_nail_it.png`
  - "Open by default": `poster_open_by_default.png` (400x567 source)
- **≤799:** the carousel is hidden and the same cards stack vertically, full width (736 at 768, 358 at 390).

## 8. "How we hire"
- **Heading:** BaseHeading, `h2` H64 + `p` P20 `.64`, `max-width:616px`.
- S96→48 spacer.
- **Grid:** `repeat(4, 1fr)`, gap 32 (≤1280 2 columns, gap `32px 24px`; ≤799 1 column, gap `48px 24px`).
- **Step** (flex column, gap 32):
  - Icon img: height 64, width auto, `object-position:left center`.
  - Text (flex column, gap 8, `max-width:272px`):
    - Title: P20 w500 `#FFF` (≤1280 16/24).
    - Body: P16 `.64`. Each body is one or two short sentences; placeholders are in the data.
- **Steps:**
  - Video intro (`careers-video-screener.png`)
  - Technical interview (`careers-technical-interview.png`)
  - Values interview (`careers-values-interview.png`)
  - Final interview (`careers-final-interview.png`)

## 9. FAQs
S9 FaqSlice with heading "FAQs" and 10 items (questions verbatim in the data). Measured 1,043 tall at 1440 with all items closed.

## 10. Pre-footer CTA (first child of `<footer>`)
- **Outer:** `height:560px; display:flex; align-items:center; position:relative; overflow:hidden` (≤799 `height:auto; padding:64px 0`).
  - Background image: `background:url(/assets/company/media/footer-bg.webp) center / auto 100% no-repeat`.
- **SliceGrid → full column:** flex column, centred, `text-align:center`.
  - `h2` "Help build the platform trusted by the best": H64 `#FFF`, `max-width:712px` (≤1280 48/52; ≤799 32/36).
  - Button row: `margin-top:32px`, flex, wrap, gap 8, centred.
    - Primary `<button>` "See open roles": same scroll-to-`#open-roles` behaviour as the hero.
- Then the standard footer.

## Motion summary
| Thing | Trigger | Details |
|---|---|---|
| Globe points | rAF while visible, plus scroll updates | see §2 |
| Logo rotator | always | 16s CSS keyframes |
| Team list | hover / click | sibling dim 250ms; GSAP height .4s/.3s; photo size and padding 400ms; arrow 300ms |
| Filters | click | instant list filter |
| Video cards | hover / click | 200ms darken; modal |
| Values carousel | scroll / drag | S8 progress |
| FAQ | click | S9 |
