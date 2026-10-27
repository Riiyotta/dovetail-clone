Source: https://dovetail.com/

# Company group: shared components and tokens

This file covers the customers, events, resources and careers templates. It only records what **differs from or adds to** `CLONE_SPEC.md` (§0 tokens, §1 banner, §2 nav, §10 final CTA, §11 footer). Every template spec in this group (`specs/customers-*.md`, `specs/events-*.md`, `specs/resources-*.md`, `specs/careers.md`, `specs/podcast.md`, `specs/campaign-aws-summit.md`) refers back here.

**How these values were gathered (2026-10-26):** Playwright at 1440x900, 1280x800, 768x1024 and 390x844, using computed styles and rects. I also dumped every matched CSS rule per element (base, `@media`, `:hover` and pseudo-elements) and read the de-minified Turbopack JS chunks for the JS-driven motion. The site is Next.js with Emotion; GSAP 3.11.3 (with ScrollTrigger, Draggable, Observer and ScrollTo) is used by several of these components.

**Asset paths used in these specs:**
- `svg/<name>.svg` means `/assets/company/svg/<name>.svg`. The exceptions are SVGs that were byte-identical to homepage files; those resolve to `/assets/svg/...` (`carousel-logo-breville.svg` and the AWS hero tiles, which are the `cta-logo-*.svg` files).
- `media/<file>` means `/assets/company/media/<file>`.
- Logos live at `/assets/company/customers/<slug>/white-logo.svg`.
- External photos are in `/assets/company/external/`.
- The full original→local map, including 73 images reused from existing `public/assets` folders, is in `specs/company-assets.json`. The data files already use local paths.

---

## S0. Tokens that add to CLONE_SPEC §0

### S0.1 Palette (from the site's `DARK_COLORS` theme object, verbatim)
| Name | Value | Used for here |
|---|---|---|
| white | `#FFFFFF` | headings on story/event pages, primary button bg |
| w80 | `#CECECE` | primary button hover |
| w64 | `#A7A7A7` | secondary text (`text.secondary`), mono meta, rich-text body |
| w48 | `#808080` | inline-link underline colour (dark) |
| w16 | `#313131` | typewriter highlight rect |
| w08 | `#1E1E1E` | form card background (`rgb(30,30,30)`), testimonial card border |
| black80 | `#121212` | testimonial card background |
| black48 | `#212121` | story-card hover pixels, FAQ chevron tile, video-modal frame bg |
| black24 | `#3B3B3B` | careers globe wireframe stroke, half-star fill |
| `rgb(49,49,49)` | — | video-card image border, rich-text table borders (dark) |
| `rgb(69,69,69)` | — | resources list top border, video modal frame border |
| blue | `#0044FF` | customer-story hero + nav, carousel band, careers globe dots, AWS page bg |
| productBlue | `#6798FF` (`rgb(103,152,255)`) | careers benefit index `[01]` |
| orange | `#FF4400` | form error text |
| alpha whites | `rgba(255,255,255,.04/.08/.16/.24/.48/.64/.8)` | inputs, borders, chips, dividers |
| overlay | `rgba(10,10,10,.8)` + `backdrop-filter: blur(4px)` | video modal backdrop |

Light theme (comparison guides only):
- Background `#FAFAFA`.
- Text `#0A0A0A`; body `#626262` (`rgb(98,98,98)`).
- Dividers `rgba(10,10,10,.24)`; table borders `#D8D8D8`; icon-button borders `#C4C4C4`.
- Buttons: secondary bg `#F5F5F5` with border `#EBEBEB`; dropdown panel `#F5F5F5`.

### S0.2 Layout primitives (identical on every template)
- **SliceContainer** (`section`): `max-width:1512px; margin:0 auto; width:100%; padding:0 124px` (≤1280 `0 64px`; ≤799 `0 16px`). This is the same as CLONE_SPEC `.container`.
- **SliceGrid**: SliceContainer plus `display:grid; grid-template-columns:repeat(12,1fr); gap:32px` (≤1280 `gap:24px`, still 12 columns; ≤799 `repeat(4,1fr)`, gap 24).
  - Measured column widths: 70px at 1440, 74px at 1280, 166px at 768 (4 columns), 71.5px at 390.
- **InnerGrid**: a grid without padding, same gaps.
- **Column**: `grid-column` per breakpoint. The default is `1 / -1`. Unless a template says otherwise, every column collapses to `1 / -1` at ≤1280.
- Breakpoints used: `≤1280` (md), `≤799` (sm), `≤600` (customers hero), `≥1281` (desktop-only hover effects), `≤1400` and `≤1050` (careers globe), and `≤1512` (story related carousel).

### S0.3 Spacer scale (`div` with `height`, `width:100%`). Columns are >1280 / ≤1280 / ≤799
| Name | Heights | Where |
|---|---|---|
| HERO | 96 / 56 / 56 | top of hero sections (below nav) |
| S200 (default) | 200 / 96 / 96 (160 when it is the last child of `#main-content` at ≥1281) | between sections |
| S200-fixed | 200 / 200 / 200 (160 when last child) | events/webinars bottom |
| S160 | 160 / 96 / 96 | before FAQ slices |
| S160→0 | 160 / 0 / 0 | story hero bottom right |
| S120 | 120 / 96 / 96 | after page CTA |
| S120→64 | 120 / 64 / 64 | before story "best never guess" |
| S96 | 96 / 64 / 64 | |
| S96→32 | 96 / 32 / 32 | live demos hero→grid |
| S80 | 80 / 80 / 80 | events hero |
| S64 | 64 / 64 / 64 | |
| S64→48 | 64 / 48 / 48 | |
| S48 | 48 / 48 / 48 | |
| S48→32 | 48 / 32 / 32 | resources heading→grid |
| S40 | 40 / 40 / 40 | |
| S40→32 | 40 / 32 / 32 | |
| S32 | 32 / 32 / 32 | |
| S32→24 | 32 / 24 / 24 | |
| S32→8 | 32 / 8 / 8 | story section heading→body |
| S24→16 | 24 / 16 / 16 | |
| S246 | 246 / 246 / 246 | events hero gap |
| HEADER | 88 / 88 / 88 | inserted after the nav on `/resources/` and `/resources/*` guides, so main starts at y=206 at 1440 |

### S0.4 Type scale (computed; Inter unless noted). Columns are >1280 / ≤1280 / ≤799
| Token | >1280 | ≤1280 | ≤799 |
|---|---|---|---|
| H160 (events/webinars h1) | 160/164 w600 ls -4 | 160/164 | 48/52 ls -1 |
| H112 (customers "Trusted and loved by") | 112/96 w600 ls -4 | 72/64 ls -2 | 56/52 ls -1.5 |
| H112 careers hero line | 112px, lh 1.1, w600, ls -2. Above 1512 (contentMax) it becomes `7.2vw` → 103.68px at 1440 | — | (hero hidden ≤799) |
| H96 (customers h1) | 96/100 w600 ls -2 | 72/76 ls -2 | 48/52 ls -1 |
| H80 (live demos / resources / podcast h1, careers "Meet…") | 80/84 w600 ls -2 | 64/68 ls -2 | 40/44 ls -1 |
| H72 (event h1, guide h1) | 72/76 w600 ls -2 | 56/60 ls -2 | 40/44 ls -1 |
| H64 (story h1, page CTA h2, section h2) | 64/68 w600 ls -2 | 48/52 ls -1 | 32/36 ls -0.25. **Story h1 at ≤799 is 40/48 ls -0.25** |
| H56 (story section heading, carousel h3, FAQ heading, careers globe h2) | 56/60 w600 ls -2 | 40/44 ls -1 | 32/36 ls -0.25 |
| H48 w500 ("Past events", "More events", resources TEI h2) | 48/56 ls -1 | 32/40 ls -0.25 | 24/32 ls -0.25 |
| H40 w500 (story stat value, resources "From the blog") | 40/48 ls -1 | 32/40 ls -0.25 | 24/32 ls -0.25 |
| H32 w500 (customers tagline, rich-text h1/h2, Q&A group heading) | 32/40 ls -0.5 | 24/32 ls -0.25 | 24/32 ls -0.25 |
| H24 w500 (awards title, "Can't see…", careers team heading) | 24/32 ls -0.5 | 20/28 ls -0.25 | 18/24 ls -0.25 |
| H20 w500 (card titles, FAQ question, CTA card title) | 20/28 ls -0.25 | 20/28 | 16/24 |
| H18 w500 (row title, Back label, sidebar CTA h2) | 18/24 ls -0.25 | 16/24 | 16/24 |
| H16 w500 (names) | 16/24 | 16/24 | 16/24 |
| P20 (intros, body) | 20/28 w400 | 16/24 | 16/24 |
| P16 | 16/24 w400 | | |
| P14 | 14/22 w400 | | |
| M14 (JetBrains Mono, eyebrows, meta, labels) | 14px, lh 140% (19.6px), w400, ls 1px, uppercase | same | same |
| M12 (ratings labels) | 12/12 ls 1 uppercase | | |
| Mondwest accent | `font-size = mondwestSize(n)`, which is 130px for n=112, 84 for 72, 65 for 56 (≈1.16×) | | |

### S0.5 Buttons used in this group (all `display:inline-flex; align-items:center; justify-content:center; border-radius:8px; padding:10px 16px; font:14px/18px Inter w500 (≤1280 14/16); transition: color 200ms, background 200ms, opacity 200ms; white-space:nowrap`)
| Variant | Style | Hover / focus-visible |
|---|---|---|
| Primary (dark theme) | bg `#FFFFFF`, color `#0A0A0A`, border 1px transparent → 40 tall | bg `#CECECE`; focus outline 1px `#0A0A0A`, offset 1 |
| Secondary (dark) | bg `rgba(255,255,255,.08)`, border 1px `rgba(255,255,255,.24)`, color `#FFF` | bg `rgba(255,255,255,.16)` |
| Secondary on blue band | bg `rgba(250,250,250,.08)`, border 1px `rgba(250,250,250,.2)` | bg `rgba(250,250,250,.16)` |
| Primary (light theme) | bg `#0A0A0A`, color `#FAFAFA` | — |
| Secondary (light) | bg `#F5F5F5`, border 1px `#EBEBEB`, color `#0A0A0A` | — |
| Text link with arrow ("View all articles", "View all demos", "Try the ROI calculator", "Request a demo") | 16/24 w500 `#FFF` (live demos: 20/28 `#A7A7A7`), inline-flex, 24px arrow svg after the text; `text-decoration: underline 1px transparent; text-underline-offset:1.5px`; `::after` 1px `#FFF` line at bottom 2px, `scaleX(0)` | `::after` → `scaleX(1)`, `transform 200ms ease-out`, origin left |
| Back link (event pages) | inline-flex, 24px back-arrow + label H18 `#FFF` | `opacity:.9; text-decoration:underline`; label span `translate3d(4px,0,0)` (150ms `cubic-bezier(.2,.6,.6,1)`) |
| Underline link (careers "Join our talent community") | 18/24 w500, `::after` 1px currentColor at bottom 2, `scaleX(0)` → `scaleX(1)` on hover, `transform 200ms ease-out`, origin left | |

Every `Button` has `& > span { margin-left:4px; transition: transform 150ms cubic-bezier(.2,.6,.6,1) }` and `:disabled { opacity:.6; pointer-events:none }`.

### S0.6 Rich text (Markdown body). Used by story sections, event descriptions and guides
Container (`.e8fk9sg2`), dark:
- Base: `font:18px/24px Inter 400; color:#A7A7A7` (≤1280 16/24).
- `p`: 18/28, `margin:0 0 24px`, `text-wrap:pretty`.
- `ul` / `ol`: 18px, `padding-left:24px`, `margin-bottom:24px`; `li`: lh 28, `margin-bottom:8px`.
- `h1`, `h2`: 32/40 w500 ls -0.5 `#FFF`, `margin:48px 0 24px` (≤1280 24/32 ls -0.25).
- `h3`–`h6`: 24/32 w500 ls -0.5 (≤1280 20/28; ≤799 18/24). `h3` margin `40px 0 24px`; `h4`–`h6` margin `16px 0 8px`.
- `strong`, `b`, `a`: `#FFF` (strong is w500).
- `blockquote`: color `#A7A7A7`, `border-left:2px solid #A7A7A7`, `padding-left:16px`.
- `img`: block, 100% wide, radius 8, `margin:64px 0` (≤799 `32px 0`).
- `table`: collapse, width 100%, `margin:48px 0` (≤799 32), 16px. `th`: `#FFF` w600, pad 12px 16px, bottom 2px `#313131`, bg `#141414`. `td`: `#A7A7A7`, pad 10px 16px, bottom 1px `#313131`, top-aligned; the last row has no border.
- **Override inside story and event bodies** (`.ez7pmu80` wrapper, using `&&` specificity): `p` and `li` are **20/28** (≤1280 16/24). So story and event body copy renders at 20/28 `#A7A7A7`.

Inline link (`a.e8fk9sg0`):
- `color:#FFF`.
- `text-decoration: underline 1px #808080; text-underline-offset:1.5px`.
- `position:relative`, with a `::after` underline (bottom 2px, 1px `#FFF`, `scaleX(0)` → hover `scaleX(1)`, `transform 200ms ease-out`, origin left).
- `transition: color 200ms ease-out`.
- Light theme: color `#0A0A0A`, decoration `#C4C4C4`, `::after` `#0A0A0A`.

Light (guides): identical metrics, but body `#626262` and headings/strong/a `#0A0A0A`. Tables use `th` bg `rgba(255,255,255,.04)` with bottom 2px `#D8D8D8`, and `td` bottom 1px `#D8D8D8`.

Embedded YouTube inside rich text (Itaú, Petal Health, SmartRecruiters stories): wrapper `margin:64px 0`, then `iframe` width 100%, `aspect-ratio:16/9`, radius 8, `src=https://www.youtube.com/embed/{id}?rel=0&autoplay=0&modestbranding=1`. Measured 682x383.6 at 1440. Build it as a static poster plus play button, or as a lazy iframe.

---

## S1. Page chrome variants (banner, nav, footer)

| Template | Banner | Nav | Header spacer | Bottom of page |
|---|---|---|---|---|
| customers index, events index, event detail, live demos, careers, b2bsaasy, Forrester report, webinars | CLONE_SPEC §1 | CLONE_SPEC §2 (transparent, relative) | none; main starts y=118 (126 at ≤799) | see below |
| **customer story** | bg `linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16)), #0044FF` (blue-tinted) | **bg `#0044FF`** (otherwise identical) | none | Final CTA + footer |
| resources index | §1 | §2 | **88px spacer** (main at y=206) | footer only |
| comparison guides (light) | same markup, bg `rgba(255,255,255,.16)` over the `#FAFAFA` html bg. **The banner text stays `#FFF`, so it is nearly invisible** (confirmed by screenshot; this is a live-site quirk, so reproduce it or flag it) | nav text, logo and links `#0A0A0A`; "Book a demo" bg `#0A0A0A`, text white; ghost hover bg `#EBEBEB`; dropdown panel `#F5F5F5`, border `rgba(10,10,10,.04)`, item hover `rgba(10,10,10,.04)`, badge bg `#EBEBEB` | 88px spacer | footer only, light variant (bg `#FAFAFA`, links `#0A0A0A`, headings `#626262`; see `resources-guide.md` §5) |
| AWS Summit | **no banner** | own nav inside `<main>` at y=0 over a `#0044FF` page (see campaign spec) | — | custom footer |

**Footer composition** (measured `<footer>` heights at 1440):
- **Final CTA + footer = 1669** (the 900px CLONE_SPEC §10 "The best never guess" ASCII/GSAP block, then the 769px footer): customers index, customer story, events index, event detail, live demos.
- **Footer only = 769**: webinars, resources index, Forrester report, b2bsaasy, comparison guides. These pages have an in-page CTA section instead (S6).
- **Careers = 1329**: a 560px image CTA (careers spec), then the 769 footer.
- The footer inner is identical to CLONE_SPEC §11. It measured 769 here vs 782 on the homepage; I didn't track down the 13px difference.

---

## S2. Customer story card (`CustomerStoryCard`). Used on the customers index, story "related", and AWS Summit

**Structure:** a flex column (`gap:32px`, ≤799 16, `align-items:flex-start`), containing:
1. **Thumb link** (`<a>`, 100% wide, radius 8, `overflow:hidden; position:relative`).
   - **Image box:** `aspect-ratio:398/438`, img `object-fit:cover` absolutely filling it. Measured 376x413.8 at 1440, 564x620.7 at 1280, 736x810 at 768, 358x394 at 390.
   - **Logo** (only when the customer is named): absolute `left:16px; bottom:16px; z-index:2`, in a 142x64 box (flex centre), `<img>` `max-width:100%`, `object-fit:contain` (e.g. `/customers/{slug}/white-logo.svg`).
   - **Anonymous stories:** no logo. Instead an overlay title `<p>` (`#FFF`, 48px w600, lh 1.1, centred, `position:absolute; top:50%; left:50%; translate(-50%,-50%); width:100%; padding:0 24px; z-index:2`), e.g. "Modern banking platform". The text is the story's `gridTitle`.
   - **Hover overlay** (desktop ≥1281 only; `display:none` ≤1280): `position:absolute; inset:0; padding:32px; z-index:3; opacity:0` → `1` while hovering, `transition: opacity 80ms ease-out`, bg transparent, text `#FFF`. It's a flex column, `justify-content:space-between`, gap 16:
     - Quote (24/32 w500 ls -0.5; ≤1280 20/28; `-webkit-line-clamp:10`) wrapped in curly quotes.
     - Name (16/24 w500 `#FFF`) above the job title (M14 `#A7A7A7`), gap 4.
   - **Pixel layer** (`position:absolute; inset:0; z-index:2; pointer-events:none`), see motion below.
2. **Title link**: 20/28 w500 ls -0.25 `#FFF` (≤799 16/24), `max-width:430px`, `overflow-wrap:anywhere`, followed by ` ↘`. Hover/focus colour is `#A7A7A7`.

Card hover colour (`color` on the wrapper, which the pixels use via `currentColor`): `#212121` on customers and stories; `#0A0A0A` on AWS Summit.

**Motion (source, `e17v5ad*` component):**
- On mount it builds **7×7 = 49 absolutely positioned divs**. For each div:
  - `width/height: calc(14.857142857142858% + 1px)`
  - `left: -2 + 14.857142857142858*col %`, `top: -2 + 14.857142857142858*row %`
  - `background: currentColor; display:none`
- Only when `matchMedia('(min-width:1281px)')` matches, and only for cards that have a highlighted testimonial:
  - **mouseenter**: `gsap.set(all,{display:'none'})`, then `gsap.to(all,{display:'block', duration:0, stagger:{each: 0.3/49, from:'random'}})`. That's about 6.1ms per square, so a random dissolve-in totalling ~300ms. At the same time the overlay goes to opacity 1 (80ms).
  - **mouseleave**: kill the tweens, then `gsap.to(all,{display:'none', duration:0, stagger:{each:0.3/49, from:'random'}})`, and the overlay goes to opacity 0.
- Focus/blur on the link mirrors hover for the overlay.
- The title link changes colour on hover (`#A7A7A7`). There is no transition on it.

## S3. Event card (`e1u0doxh*`). Used on the events/webinars upcoming grid and "More events"
- `<a>` relative, color `#FFF`, hover colour `#A7A7A7`. On hover, `::after { content:''; inset:0; background:rgba(0,0,0,.2) }` darkens the whole card (no transition). ≤1280 `max-width:512px`.
- Image: radius 8, 16:9 (1920x1080 covers). 376 wide in a 2-column grid at 1440 (rendered 374x210.4 because the link has a 1px transparent border).
- Title: H20 `margin:32px 0 16px`.
- Meta: two M14 lines, `[When] 19 Nov 2026` and `[Where] Online`. The date uses `dd LLL yyyy` in the **viewer's timezone** (see S9).

## S4. Row list item (`RowButton`, `a.css-2dpfoy`). Used for past events and careers job rows
- `<a>` padding `16px 0`, color inherit, radius 0, 58px tall. `transition: color 200ms, background 200ms, opacity 200ms`.
- Inner grid: 9 columns at 1440 (gap 32; ≤1280 9 columns, gap 24; ≤799 4 columns, `gap:4px 24px`).
  - Small text: M14 `#A7A7A7`, `grid-column:1 / span 2`.
  - Title: H18 (≤1280 16/24) `#FFF`, `grid-column: span 7` (≤1280 `4 / span 7`; ≤799 `1 / span 4`, so it wraps under the small text).
- **Hover/focus:** `background:#FFF; color:#0A0A0A`, and the small text also turns `#0A0A0A`. A hidden 24px arrow svg (`svg/icon-row-arrow.svg`, `margin:-2px 16px 0`) becomes `display:inline-block` before the small text. The 200ms background/colour transition applies.
- Rows are separated by `<hr>` (1px `rgba(255,255,255,.24)`, margin 0), with an `<hr>` before the first row and after every row.

## S5. Video card and video modal (`VideoPlayer`, `eltehgh*`). Used on live demos, story hero, event hero (recordings), careers gallery and resources
**Card** (`button`, radius 8; wrapper `.css-1c6z32u` is a relative flex column):
- `::after` overlay `inset:0; background:transparent; transition: background-color 200ms ease-in-out` → `rgba(0,0,0,.2)` on hover.
- Image: `img` 100% wide, auto height, `border:1px solid rgb(49,49,49)`, radius 4 (live demos, careers). Story and event heroes use radius 8 and no visible border.
- Play tile: 64x64 white (`#FFF`), radius 8, padding 8, centred (`left/top:50%; translate(-50%,-50%)`), `filter: drop-shadow(rgba(0,0,0,.64) 0 24px 64px)`. It holds a 40x40 `svg/icon-play.svg` in `#0A0A0A`.
- Title (live demos, careers): H20 `#FFF`, margin-top 32, `overflow-wrap:anywhere`. Date: M14 `#A7A7A7`, margin-top 24.

**Modal** (on click; `role=dialog aria-modal`):
- Root: `position:fixed; inset:0; z-index:6; flex centre`.
- Backdrop: `rgba(10,10,10,.8)`, `backdrop-filter:blur(4px)`, `transition: opacity .2s`.
- Close button: 40x40 at `top:16px; right:16px`, bg `rgba(255,255,255,.16)` (hover `.24`), radius 4, 20px ✕ stroke 2.
- Frame: `position:fixed`, centred with `translate(-50%,-50%)`, `width:1120px` (≤1280 `calc(100% - 32px)`), `max-height:90vh`, `aspect-ratio:16/9`, bg `#212121`, border 1px `#454545`, radius 8. Measured 1120x630 at 1440.
- Content: `iframe src="https://www.youtube.com/embed/{id}?rel=0&autoplay=1&modestbranding=1"` at 100%.
- Escape and backdrop click close it.
- **Build note:** a static rebuild can open the same modal with an iframe, or with the poster image only. Third-party embeds are your call.

## S6. Page CTA section ("Turn customer feedback into product innovation"). Used on webinars, resources index, Forrester report, b2bsaasy and guides
- SliceGrid; the column is `span 8` → 886 wide at 1440.
- Content, top to bottom:
  - S200 spacer.
  - h2 (H64, `max-width:712px`, 3 lines = 204 tall at 1440). On b2bsaasy the text is "Unlock customer intelligence for your organization" with `max-width:924px` (2 lines).
  - Button row: `margin-top:32px; display:flex; gap:8px; flex-wrap:wrap`.
    - Primary "Contact sales" → `/contact-sales/` (125.3x40).
    - Secondary "Try Dovetail free" → `/auth/signup/` (144.5x40). The Forrester report shows only the primary button.
  - S120 spacer (120 / 96 / 96).
- Measured block height at 1440 is 596. On Forrester the S200 spacer is a sibling before the section, so the section itself is 276 tall followed by the 120 spacer.
- Guides use light theme buttons (S0.5).

## S7. Story "The best never guess" CTA + related stories (`BestNeverGuessCustomerStoriesSlice`). Used on customer story pages
- **Outer:** `background:#0A0A0A`, `padding:120px 0 260px` (≤1280 `80 0 80`; ≤799 `64 0 64`). Inner SliceContainer is a flex column, gap 96 (≤1280 64; ≤799 48).
- **Intro** (flex column, start-aligned, gap 24, max-width 900):
  - h2 (H64, flex, wrap, `align-items:center`, gap 12): "The best never guess" plus an inline logo rotator after "best".
  - Rotator:
    - Outer `span`: inline-block, width 96 (64 / 48), height 0, relative.
    - Window: absolute, centred with `translate(-50%,-50%)`, 96x80 (64x64 / 48x48), `overflow:hidden`, `mask-image: linear-gradient(transparent, black 8%, black 92%, transparent)`.
    - Inside: a column of **16 slots** (8 logos × 2, order Salesforce, AWS, Canva, Airwallex, Zapier, Notion, Itaú, Wise), each 80px tall (64 / 48) with padding 8px 0, SVG `max-width/height:100%`.
    - Animation: `rotator-8 16s ease-in-out infinite`:
      ```css
      @keyframes rotator-8 {0%,11%{transform:translateY(0)}16%,23%{transform:translateY(-6.25%)}28%,35%{transform:translateY(-12.5%)}40%,47%{transform:translateY(-18.75%)}52%,59%{transform:translateY(-25%)}64%,71%{transform:translateY(-31.25%)}76%,83%{transform:translateY(-37.5%)}88%,95%{transform:translateY(-43.75%)}100%{transform:translateY(-50%)}}
      ```
    - SVGs: `svg/rotator-logo-{salesforce,aws,canva,airwallex,zapier,notion,itau,wise}.svg` (all `currentColor` = `#FAFAFA`).
  - p: P20 `rgba(255,255,255,.64)`, "Discover how Dovetail can help your team turn customer feedback into decisions."
  - Buttons (flex, gap 8): Primary "Talk to sales" → `/contact-sales/`, Secondary "Customer stories" → `/customers/`.
- **Related (≥800):** a 12-column grid with `gap:0 32px` (≤1280 gap 24) holding 3 `CustomerStoryCard`s (`span 4`; ≤1280 `span 6`, so 2 per row). Measured 1192x531.8 at 1440.
- **Related (≤799):** the desktop grid is `display:none`, and the **Carousel** (S8) shows the same 3 cards:
  - Track `grid-template-columns: repeat(3, 1fr)`, gap 16, `margin:0 16px`, `width: calc(-96px + min(272.727%, 872.727px))`, which gives cards of 248.2 wide at 390.
  - A right fade (122px, `linear-gradient(90deg, transparent, #0A0A0A)`) sits above it.
- Then an S0→96 spacer (0 / 96 / 96).

## S8. Horizontal carousel with progress handle (`Carousel`). Used on story related (mobile), careers values and guide related articles
- Wrapper relative. A right gradient banner (122px wide, `linear-gradient(90deg, rgba(0,0,0,0), {bg})`, z 1) sits over the right edge.
- Scroller: `overflow: scroll hidden; scrollbar-width:none` (webkit scrollbar hidden). At ≥1281, GSAP `Draggable.create(scroller,{type:'scroll', inertia:true})` also enables drag-to-scroll.
- Progress bar: `padding:64px 124px 0` (≤1280 `48px 64px 0`; ≤799 `48px 16px 0`), max-width 1512, centred.
  - Track: 1px `rgba(255,255,255,.24)` (light: `rgba(10,10,10,.24)`).
  - Fill: absolute, `width:{p*100}%`, 1px white.
  - Handle: 12x12 square, white (light: `#0A0A0A`), `top:-6px`.
- On scroll: `p = scrollLeft/(scrollWidth-clientWidth)`; set the fill width to `p*100%` and the handle to `x = p*trackWidth - 12` (`gsap.set`, so there is no easing).
- The handle is draggable along the track (`Draggable type:'x', bounds: track, inertia`) and scrolls the content to match. `scrollToItem` tweens `scrollTo.x` over 0.3s `power1.out`.

## S9. FAQ accordion (`FaqSlice`). Used on anonymous stories, event Q&A, careers and b2bsaasy
**Layout:** SliceGrid.
- Left column `span 3` (`min-width:0`): h2 H56 "FAQs" (compact variant H32 for grouped Q&A), with an optional subtitle P16 `#A7A7A7` margin-top 16.
- Right column `4 / -1` (886 wide at 1440):
  - Starts with `<hr>` (1px `rgba(255,255,255,.24)`, margin-bottom 32).
  - Then the items. Each item is followed by an `<hr>` with `margin:32px 0`.

**Item:**
- `<button>` (full width, inline-flex, `justify-content:space-between`, `align-items:center`, padding 0, z 2, `aria-expanded`). It holds:
  - The question: H20 left-aligned.
  - A 24x24 tile (bg `#212121`, radius 4, margin-left 8) containing a 24px chevron (`svg/icon-chevron-down.svg`, stroke 2, `#FFF`).
- Answer region: an 8-column inner grid (gap 32; ≤1280 12 columns, gap 24; ≤799 4 columns) with the answer in `span 7` (771 wide at 1440). Answer box styles: P16 `#A7A7A7`, `height:0; opacity:0; overflow:hidden; margin-top:8px`. An optional "More in …" link sits in the answer (P16 `#A7A7A7`, margin-top 16, `target=_blank`).

**Motion (source):**
- Open: `gsap.to(answer,{height:'unset', opacity:1, duration:.3})` (default ease `power1.out`).
- Close: instant `gsap.set(answer,{height:0, opacity:0})`.
- The chevron gets `transform: rotate(180deg)` while open, with no transition.
- Items toggle independently (several can be open at once).
- Measured: closed item 69px (28 question + 8 + 33 rule spacing); the first open answer goes 0 → 120px.

## S10. Pixel transition band (`PixelTransitionSlice`). Used on the customers index and story pages
- **Desktop only.** `display:none` at ≤1280 (`animateInMobile:false`). At ≤1280 the wrapper margins also reset to 0.
- Wrapper: `position:relative; z-index:3; pointer-events:none`. It has `margin-top:-120px` (pixelate-top variant) or `margin-bottom:-120px` (pixelate-bottom variant), so it overlaps the neighbouring section.
- Pixel field: height 120 (`sectionHeight`), `pixelSize:48` (40 on mobile, unused). That gives `rows = ceil(120/48) = 3` rows of `ceil(innerWidth/48)` squares (30 at 1440), each 48 wide and 48 tall in the CSS rule (rows render 40px tall because the row div is `height:48` but its parent column is 120 tall; measured 48x40 squares). The row is a flex row; the squares have `background-color` only.
- Child content block: bg `#0A0A0A` (here an empty spacer: 160 / 96 on stories).
- **Animation:** GSAP timeline with ScrollTrigger `scrub:true`, `start: "top bottom+=240"`, `end: "bottom top-=240"` (2 × the 120 height).
  - `forwards` direction (above the content): every square starts at `background: transparent` (t=0) and is set to the theme background `#0A0A0A` at timeline position `m(rowIndex, (count-1-i) % cols)`.
  - `backwards` direction (below the content): from `#0A0A0A` to transparent.
  - Formula:
    ```js
    m(r, c, rows, cols, order) = ((rows-1-r)*3 + 0.5*c)*0.1 + (order[r*cols+c] ?? 1)*0.01
    // order = Fisher–Yates shuffle (Math.random) of [0..rows*cols-1]
    ```
  - Each tween has `duration:0`, so squares flip instantly at their scrubbed time. The result is a staircase dissolve that flips bottom rows first, left to right, with ±random jitter.
  - SSR fallback (before JS): squares where `m(...) < ((rows-1)*0.3 + (cols-1)*0.05 + 0.09)/2` are pre-filled.
- On the customers index the band sits between the logo wall and the blue story carousel (bottom), and between the carousel and the ratings (top). On stories it sits between the blue hero and the black body.

## S11. GSAP marquee (`Marquee`). Used on the customers awards strip and the Forrester logo rows
- Container: `display:flex; overflow:hidden; pointer-events:none; position:relative`.
- Edge fades: `::before` / `::after` are 200 wide (≤799 32), `linear-gradient(90deg, {bg} 0%, rgba(247,247,248,0) 100%)` on the left and mirrored on the right, z 9999.
- Track: two copies of the item list (the second has `aria-hidden`, `inert`), `white-space:nowrap; will-change:transform`.
- Items: `.marquee-item { display:inline-block; padding: 0 gap/2 }`, where gap is 80 (≤1280 `gapMobile` 40). So padding is 40 / 20.
- **Animation:** `gsap.to(track,{x: '-=' + setWidth, duration: 60, ease:'none', repeat:-1, modifiers:{x: wrap(-setWidth, 0)}})`. That's 60s per full set width (`rtl` direction = moving left; `ltr` starts at `-setWidth` and moves right).
- Pause and resume tween `timeScale` 1→0 over 1s `power2.out` and 0→1 over 0.5s `power2.in`.
- Focus inside pauses it. Reduced motion pauses it.

## S12. Background patterns
- **DotBackground** (events and webinars hero): `background-image: radial-gradient(circle at center, rgba(255,255,255,.08) 1px, transparent 1px); background-size:16px 16px; transform:translateZ(0)`. Static.
- **GridBackground** (careers and b2bsaasy hero): `background-image: linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px); background-size:48px 48px`. Static.
- **Dot tile** (customers ratings band): `::after` `background:url(/assets/company/dottile.png) repeat; background-size:10px 10px; opacity:.08; inset:0`.
- **GradientBanner:** absolute, `pointer-events:none`, `linear-gradient({deg}, rgba(0,0,0,0) 0%, #0A0A0A 100%)`. 0deg is a top fade and 180deg a bottom fade; 270/90deg are left/right.

## S13. Forms (all non-submitting in the rebuild)

**Event registration** (native React form; only on `/events/suns-out-digital-twins-deep-dive/`):
- h3 "Register to attend" (H24), S24 spacer, then the form.
- Form box: bg `#1E1E1E`, border 1px `rgba(255,255,255,.08)`, radius 8, `padding:32px` (≤1280 `32px 20px`), flex column, gap 24.
- Label: flex column, gap 8; text 16/24 w400. A required `*` sits 2px after the label text.
- Input / textarea:
  - bg `rgba(255,255,255,.04)`, border 1px `rgba(255,255,255,.48)`, radius 8, colour `#FFF`.
  - 16px / 28px, ls -0.5, padding 10px 16px.
  - Input height 40; textarea `min-height:96px; resize:vertical`.
  - `transition:300ms`.
  - **Hover and focus:** bg `rgba(255,255,255,.08)`, border `rgba(255,255,255,.64)`.
  - Placeholder `#A7A7A7`.
- First and last name sit in a row (flex, gap 16; ≤1280 column).
- Submit: primary white button, full width (514 wide at 1440), label "Register" (while submitting it reads "Registering…" and is disabled).
- **Error state** (from source):
  - The input gets `aria-invalid="true"`.
  - A `<p>` below it (M14 mono 14 / 140% / ls 1 uppercase, `color:#FF4400`, `margin:4px 0 0`) with the message "This field is required." or "Please enter a valid email address." / "Please use your work email" (personal domains).
  - Focus moves to the first invalid field.
- Success replaces the form with an M14 `#A7A7A7` line, "You're registered! Check your email for the calendar invite and join link."
- A server error shows the M14 `#FF4400` line "Something went wrong. Please try again."
- Fields: see `src/data/company/events/suns-out-digital-twins-deep-dive.json`.

**HubSpot-styled forms** (Forrester report, AWS Summit). The original embeds a HubSpot script; **build a static form with these styles instead**:
- Boxed variant (Forrester):
  - Form: bg `#1E1E1E`, border 1px `rgba(255,255,255,.08)`, radius 8, pad 32 (≤1280 `32px 20px`), gap 24.
  - Fieldsets: flex, gap 16 (≤1280 column).
  - Labels 16/24 w400, margin-bottom 8.
  - Inputs: height 40, pad `10px 40px 10px 16px`, 16/28 ls -0.5, bg `rgba(255,255,255,.04)`, border `rgba(255,255,255,.48)`, radius 8. Hover/focus: border `.64`, bg `.08`. Placeholder `#A7A7A7`.
  - Submit (`.actions input`): full width, bg `#FFF`, colour `#0A0A0A`, 16px w500 lh 18, pad 10px 16px, radius 8, `min-width:146px`, `transition: background 150ms, color 150ms`. Hover `#CECECE`.
  - Errors: `.hs-error-msgs label`, w500 `#FF4400`, margin-top 8. A domain error is 14px w500 `#FF4400`.
  - Legal consent text: 12/16 (252 chars, placeholder).
  - Submitted message: pad `128px 32px`, bg black, border `#454545`, h2 24/32 w800, p 18/30 w500 `#A7A7A7`. Not shown in the static build.
- Underline variant (AWS): see the campaign spec.

## S14. Timezone-dependent dates (events)
Event start/end times come from ISO strings (`2026-06-25T17:00+10:00`). The site formats them with date-fns-tz:
- `date = format(d,'dd LLL yyyy')`, `time = format(d,'h:mma')`, `tz = format(d,'zzz')`.
- SSR uses `America/Los_Angeles` ("25 Jun 2026 12:00AM PDT"). The client re-renders in the **visitor's** timezone (e.g. "GMT+5:30").
- Sidebar values:
  - `[START]` = `{date} {time} {tz}`.
  - `[END]` = the same format, rendered only when an end date exists.
- List/card dates are `{date}` only.
- The data files store the ISO strings plus the LA-formatted strings captured with `timezoneId: America/Los_Angeles`. Format at runtime with `Intl.DateTimeFormat` to match the client behaviour.

## S15. Reduced motion
`prefers-reduced-motion: reduce` affects these components:
- Customers hero: renders the full quote with no caret, and auto-advances every 5s instead.
- Marquee: paused.
- Tab autoplay: not started.
- CSS rotators: keep running. They are plain CSS with no reduced-motion rule on the live site.
