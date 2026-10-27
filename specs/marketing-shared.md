Source: https://dovetail.com/

# Marketing pages: shared components and conventions

This file covers what the marketing templates (product, roles, solutions, quiz, enterprise, enterprise-article, pricing, deploy, the-best-never-guess, launch, menu) have in common. It records only what **differs from or adds to** `/CLONE_SPEC.md` (homepage). Nav dropdowns, the footer link grid, the homepage final CTA ("The best never guess", CLONE_SPEC §10), the ASCII field (component A), PixelDissolve (B) and Tooltip (C) are referenced by name and not re-specced here.

Recon was done on 2026-10-26 against the live site. I used an isolated Playwright Chromium (the shared MCP browser was being navigated by other agents) at 1440x900, 1280x800, 768x1024 and 390x844. At each width I recorded computed styles and rects for every element, plus the full Emotion stylesheet. I also downloaded the Next.js/Turbopack chunks; they're readable, and every styled component carries a stable `target` class (e.g. `e1r1adlk4`). All motion logic below was read from that source.

## 0. How to read the template specs

- **Stable class names.** Emotion emits a hashed class (`css-1nykit1`) plus a stable *target* class (`e1ql6xhm0`). The specs name elements by the stable class. A suffix `--v2` means the same styled component rendered with different props (a second variant).
- **CSS blocks** in the template specs were generated from the live stylesheet with the hash rewritten to the stable name. `$sans` = `Inter, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, "Segoe UI", Roboto, sans-serif`. `$mono` = `"JetBrains Mono", "SF Mono", Consolas, Roboto, sans-serif`. `$serif` = `"PP Mondwest", Georgia, serif`. When one `@media` block contains two declarations for the same selector, **the later one wins** (Emotion composition order). Translate these into Tailwind arbitrary values or a CSS module as you prefer.
- **Breakpoints** (from source `MQ`): `md` = `@media (max-width:1280px)`, `sm` = `@media (max-width:799px)`, `MQ_FROM_DESKTOP` = `(min-width:1281px)`, `contentMax` = `(max-width:1512px)`, `heroMd` = `(max-width:990px)`, `heroSm` = `(max-width:588px)`, nav collapse = `(max-width:1185px)`. Some slices also use `(min-width:800px) and (max-width:1280px)` (tablet only). The four measurement widths therefore map to: 1440 → desktop, 1280 → md, 768 → sm, 390 → sm.
- **Measured heights** per section and per width are in each page's data file (`measuredHeight`), so the builder can diff against them.

## 1. Data files: `src/data/marketing/<slug>.json`

`<slug>` is the path with slashes replaced by `__` (e.g. `/product/ai-agents/` → `product__ai-agents.json`, `/roles/design/quiz/` → `roles__design__quiz.json`). Schema:

```jsonc
{
  "url": "/product/ai-agents/",
  "template": "product",                 // spec file in /specs/<template>.md
  "title": "AI Agents | Dovetail",       // <title>
  "metaDescription": "…",
  "documentHeight": {"1440":13145,"1280":13561,"768":13789,"390":12522}, // whole page incl. banner/nav/footer
  "chrome": {"alertBar": true, "navBackground": "#5D00A1", "footer": "finalCta"},  // see §5/§6
  "sections": [                          // DOM order of <main> children (wrapper divs flattened)
    {"slice": "Spacer", "height": {"1440":200,"1280":200,"768":96,"390":96}},
    {
      "slice": "ProductHero",            // slice name used in the template spec
      "el": "e10k4luw0",                 // stable class of the section root
      "measuredHeight": {"1440":907.4,"1280":896.8,"768":1055.1,"390":749.1},
      "content": [                       // every visible content node, in DOM order
        {"role":"h1","text":"Punch above\nyour headcount","el":"e10k4luw13",
         "parts":[{"el":"e10k4luw9","text":"Punch above\nyour","font":"Inter"},{"el":"e10k4luw12","img":"/assets/marketing/ai-agents-hero-icon.png"},{"el":"e10k4luw10","text":"headcount","font":"PP Mondwest"}]},
        {"role":"text","placeholder":true,"chars":169,"el":"e10k4luw14"},   // long copy: write same-length placeholder
        {"role":"link","text":"Request a demo","href":"/contact-sales/","el":"a"},
        {"role":"img","src":"/assets/marketing/ai-agents-hero.png","alt":"","w":1192,"h":603.4,"el":"e10k4luw24"},
        {"role":"svg","src":"/assets/marketing/svg/amazon-918921.svg","ariaLabel":"Amazon","w":88.9,"h":40,"el":"svg"},
        {"role":"video","src":"/assets/marketing/x.mp4","poster":"/assets/marketing/x.jpg","el":"e182vtoz3"}
      ]
    }
  ]
}
```

- `role` is one of `h1`–`h6`, `text` (p/span/div text), `quote` (blockquote), `link`, `button`, `link-card` / `button-card` (a clickable card whose text is listed as separate child items), `img`, `svg`, `video`, `bg-image`.
- `text` is verbatim. `\n` marks a hard `<br>` in the original. Headings, labels, buttons, eyebrows, plan names, prices, list items and FAQ **questions** are always verbatim.
- `{"placeholder": true, "chars": N}` marks a paragraph longer than about one sentence, or **any FAQ answer** (closed accordions included). Write lorem-style copy of the same character count.
- `hiddenAt1440: true` marks an image that only shows at another breakpoint (e.g. the mobile hero `*-mobile-hero.png`).
- Text inside `aria-hidden` duplicates (marquee second copies) is de-duplicated.
- Asset paths are already rewritten to local `/assets/...` paths. The full remote→local list is in `specs/marketing-assets.json`.
- `chrome` = `{alertBar, navBackground, footer, footerCta?}` (see §5 and §6).
- Extra template-specific keys:
  - `promptModals` (product pages with prompt cards: card titles, prompt labels, prompt text lengths);
  - `quiz` (quiz pages: questions/options verbatim, tiers, scoring);
  - `plans` and `comparisonTable` (pricing: every row, tooltip, plan value; `"included"` = check icon);
  - `faqSubtitle` (pricing);
  - `form` (deploy: field definitions).
- Section `slice` names match the headings in the template specs. `PixelBand` entries are the 120px pixel-transition bands (shared §7.2) and `GradientBanner` entries are decorative fades.

## 2. Layout primitives (source module `BORDER_RADIUS_MD`, class prefix `etid8i6`)

| Primitive | Class | CSS |
|---|---|---|
| SliceContainer | `etid8i64` | `margin:0 auto; max-width:1512px; padding:0 124px; position:relative; width:100%; text-align:left` · md `padding:0 64px` · sm `padding:0 16px` (the bestNeverGuess theme uses 32 at sm). Optional `flexGap` → `display:flex; flex-direction:column; gap`. |
| BaseGrid | `etid8i65` | `display:grid; grid-template-columns:repeat(12,1fr); gap:32px; row-gap:32px` · md `gap:24; row-gap:24; repeat(tabletColumns)` · sm `repeat(4,1fr); gap:24` |
| SliceGrid | `etid8i66` | BaseGrid + SliceContainer padding (`0 124px` / md `0 64px` / sm `0 16px`), `max-width:1512px; margin:auto` |
| InnerGrid | `etid8i67` | `display:grid; grid-template-columns:repeat(columns=12,1fr); gap:32px` · md `gap:24` · sm `repeat(4,1fr)` |
| Column | `etid8i68` | `grid-column: gridColumn (default 1/-1)` · md `grid-column: tabletGridColumn (default 1/-1); display:block` · sm `grid-column: mobileGridColumn (default 1/-1)` |
| Spacer | `eq3qhm70` | `height:size; width:100%` · md `height:tabletSize (=mobileSize)` · sm `height:mobileSize`. Defaults: size 200 / mobile 96. **Rule:** a 200px spacer that is the last child of `#main-content` is 160px at ≥1281. Measured heights for every spacer are in the data files. |

At 1440 the 12-column grid inside a 1192px container has 70px columns with 32px gaps. Column N starts at `124 + (N-1)*102`.

## 3. Tokens

**Palette** (`DARK_COLORS`): white `#FFFFFF`; w80 `#CECECE`; w64 `#A7A7A7`; w48 `#808080`; w32 `#585858`; w24 `#454545`; w16 `#313131`; w08 `#1E1E1E`; w04 `#141414`; alpha whites `rgba(255,255,255,.80/.64/.48/.32/.24/.16/.08/.04)`; blue `#0044FF`, b80 `#0238CE`, b90 `#0029A6`, b100 `#001A75`; orange `#FF4400`; green `#009900`; black `#0A0A0A`, black80 `#121212`, black64 `#191919`, black48 `#212121`, black32 `#2C2C2C`, black24 `#3B3B3B`, black16 `#4F4F4F`, black08 `#626262`, black04 `#7C7C7C`.

**Product accents** (`PRODUCT_ACCENTS`): navBlue `#0029A6` (Chat, Projects), navOrange `#982500` (Channels), navGreen `#154C14` (Dashboards), navMagenta `#99004F` (Docs), navViolet `#5D00A1` (Agents), navPurple `#9601FF`, digitalTwinsHero `#7D00D6`, digitalTwinsFeatureNumber `#9C57EF`.

**Themes** (the parts these pages use):

| Token | dark (default) | light (enterprise articles) | bestNeverGuess (`/the-best-never-guess/`) |
|---|---|---|---|
| colors.background | `#0A0A0A` | `#FAFAFA` | `#0044FF` |
| colors.backgroundSecondary | `#212121` (FAQ chevron chip, etc.) | `#FAFAFA` | `#0A0A0A` |
| text.primary / secondary | `#FFFFFF` / `#A7A7A7` | `#0A0A0A` / `#626262` | `#FFF` / `#A7A7A7` |
| primaryButton | bg `#FFF`, color `#0A0A0A`, hover bg `#CECECE` | bg `#0A0A0A`, color `#FAFAFA`, hover `#3B3B3B` | bg `#0A0A0A`, color `#FFF`, hover `rgba(10,10,10,.8)` |
| secondaryButton | bg `rgba(255,255,255,.08)`, border `rgba(255,255,255,.24)`, color `#FFF`, hover bg `.16` | bg `#F5F5F5`, border `#EBEBEB`, color `#0A0A0A` | bg `#FFF`, color `#0A0A0A`, hover `#CECECE` |
| hr | `rgba(255,255,255,.24)` | `rgba(10,10,10,.24)` | |
| tag | bg `rgba(255,255,255,.08)`, accent `#0044FF` | | |
| progressBar | track `rgba(255,255,255,.08)`, fill `#FFF` | track `#C4C4C4`, fill `#0A0A0A` | |
| tabs | primary `#FFF`, disabled `#7C7C7C` | | |

The light palette's exact hex values are listed in `enterprise-article.md`.

**Typography presets** (source `FONTS`/`H*`/`P*`/`M*`; values are desktop · md · sm):

| Preset | Desktop | ≤1280 | ≤799 |
|---|---|---|---|
| H160 | 160/164 w600 ls -4 | – | 48/52 ls -1 |
| H96 | 96/100 w600 ls -2 | 72/76 | 48/52 ls -1 |
| H80 | 80/84 w600 ls -2 | 64/68 | 40/44 ls -1 |
| H72 | 72/76 w600 ls -2 | 56/60 | 40/44 ls -1 |
| H64 | 64/68 w600 ls -2 | 48/52 ls -1 | 32/36 ls -0.25 |
| H56 | 56/60 w600 ls -2 | 40/44 ls -1 | 32/36 ls -0.25 |
| H48 | 48/56 **w500** ls -1 | 32/40 ls -0.25 | 24/32 |
| H40 | 40/48 w500 ls -1 | 32/40 ls -0.25 | 24/32 ls -0.25 |
| H32 | 32/40 w500 ls -0.5 | 24/32 ls -0.25 | 24/32 |
| H24 | 24/32 w500 ls -0.5 | 20/28 ls -0.25 | 18/24 |
| H20 | 20/28 w500 ls -0.25 | 20/28 | 16/24 |
| H18 | 18/24 w500 ls -0.25 | 16/24 | 16/24 |
| H16 | 16/24 w500 ls 0 | | |
| H14 | 14/18 w600 | 14/16 | 14/16 |
| P24 | 24/32 w400 ls -0.5 | 16/24 ls normal | 16/24 |
| P20 | 20/28 w400 | 16/24 | 16/24 |
| P18 | 18/24 w400 | 16/24 | 16/24 |
| P16 | 16/24 w400 | | |
| P14 | 14/22 w400 | | |
| M14 | mono 14 / 140% ls 1 uppercase | | |
| M12 | mono 12/12 ls 1 uppercase | | |

`mondwestSize(n) = round(1.16 * n) px`. Serif accent words inside Inter headings use it (e.g. 72 → 84, 56 → 65, 64 → 74, 80 → 93, 40 → 46).

Inline heading icon wrapper (`inlineIconWrapperBase`): `display:inline-block; vertical-align:middle; height:0; line-height:0; font-size:0; position:relative; overflow:visible; z-index:1`. The image inside is absolutely centred (see the per-template values).

Transitions: `FAST_TRANSITION` 150ms, `MEDIUM_TRANSITION` 300ms. A transition with no easing means `ease`.

## 4. Buttons on these pages (component `Button`)

These are **not** the homepage section buttons (CLONE_SPEC §0.7 uses blue primaries). On marketing pages the dark theme gives:

```css
/* shared base for primary/secondary (preset H14 + base) */
.btn { display:inline-flex; align-items:center; justify-content:center; border:1px solid transparent; border-radius:8px;
  padding:10px 16px; font:500 14px/18px $sans; letter-spacing:0; white-space:nowrap; max-width:100%; text-align:center;
  transition: color 200ms, background 200ms, opacity 200ms; cursor:pointer }
@media (max-width:1280px){ .btn{ line-height:16px } }
.btn:focus-visible { outline:1px solid; outline-offset:1px }
.btn > span { margin-left:4px; transition: transform 150ms cubic-bezier(.2,.6,.6,1) }   /* arrow span, if any */
.btn--primary   { background:#FFFFFF; color:#0A0A0A }            .btn--primary:hover,  .btn--primary:focus-visible  { background:#CECECE }
.btn--secondary { background:rgba(255,255,255,.08); color:#FFFFFF; border-color:rgba(255,255,255,.24) }
                                                                  .btn--secondary:hover,.btn--secondary:focus-visible{ background:rgba(255,255,255,.16) }
```

Measured at 1440: "Request a demo" primary is 141.9x40, "Book a demo" 121.1x40, "Try Dovetail free" secondary 144.5x40 (the footer CTA band adds `backdrop-filter:blur(8px)` inline).

Other variants used:
- **link** (`styleType:"link"`): `text-decoration:underline; text-underline-offset:1.5px; text-decoration-thickness:1px; color:text.secondary; text-decoration-color:text.manifestoText (rgba(255,255,255,.48)); transition: color 200ms ease-out; ::after{content:""; position:absolute; bottom:2px; left:0; width:100%; height:1px; background:text.primary; transform:scaleX(0); transform-origin:left; transition:transform 200ms ease-out}`. On hover the color goes to primary and `::after` to `scaleX(1)`.
- **linkWithArrow**: `display:inline-flex; color:#FFF`; hover `opacity:.9; text-decoration:underline`; the trailing 24px arrow `> span` moves `translate3d(4px,0,0)`.
- Card-link "Learn more" in feature cards: 16/24 w500 white, link with an `::after` underline at `bottom:2px` (scaleX 0→1, 200ms ease-out) and a 24px arrow icon.
- `increasingBorderBottomOnHover`: same `::after` underline growth.

## 5. Page chrome (alert bar and nav) per page

Same components as the homepage (CLONE_SPEC §1 and §2). The differences:

| Pages | Alert bar | Nav | `<main>` top at 1440 |
|---|---|---|---|
| `/product/ai-*` (6 pages) | `background: linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16)), <accent>` (the white 16% veil over the accent colour) | `background:<accent>` (solid). Agents `#5D00A1`, Channels `#982500`, Chat `#0029A6`, Dashboards `#154C14`, Docs `#99004F`, Projects `#0029A6` | 118 (30 + 88) |
| `/product/digital-twins/` | **none** (hidden on this page) | `background:#7D00D6` | 88 |
| `/pricing/`, `/enterprise/`, `/deploy/`, quiz pages | default `rgba(255,255,255,.16)` | transparent | 118 |
| `/roles/*`, `/solutions/*` | default | transparent, and the hero slides **under** the nav: the hero's `margin-top:-88px` collapses through `<main>`, so main's top is y=30 | 30 |
| `/enterprise/*` articles | default | transparent; the page uses the **light** theme from the article hero down (see `enterprise-article.md`) | 206 (an extra 88px header spacer) |
| `/the-best-never-guess/`, `/launch/suns-out/` | none | campaign navs (own components, see their specs) | 0 |
| `/menu/` | default | none (the page *is* the menu) | 30 |

The alert bar is dismissible, and the dismissal persists in `localStorage['alert-bar-digital-twins-dismissed']='true'`. The nav `transition: all 300ms` and `z-index:Z_INDEX_HEADER`; it is `position:relative`, not sticky, on every page here.

Product pages also support a `?campaign=true` mode that swaps in a campaign nav and a demo form. It isn't needed for the clone and I didn't spec it.

## 6. Footer variants (component `Footer`, root `footer.e1gpmlco2`, `position:relative; z-index:0; background: theme.colors.background`)

Every variant ends with the homepage footer link grid and bottom bar (CLONE_SPEC §11, 768.6px tall at 1440). What sits above it varies:

| Variant | Pages | Above the link grid | Footer height @1440 |
|---|---|---|---|
| **A finalCta** | product ×7, pricing, enterprise, roles ×6, quiz ×3 | The homepage final CTA "The best never guess" (CLONE_SPEC §10, component `RunOnEvidenceCtaSlice`, 900px = 100vh), identical | 1668.6 |
| **B ctaBand** | solutions ×4 | CTA band, 560px (see CSS below) | 1328.6 |
| **C plain** | deploy, enterprise articles ×3 | nothing | 768.6 |
| **C-light** | enterprise articles | same as C, light theme: bg `#FAFAFA`, text `#0A0A0A`, meta `rgb(98,98,98)` | 768.6 |

Variant B CTA band:
```css
.e1gpmlco3 { position:relative; overflow:hidden; height:560px; display:flex; align-items:center;
  background-image:url("/assets/marketing/footer-bg.webp"); background-size:auto 100%; background-position:center; background-repeat:no-repeat }
@media (max-width:799px){ .e1gpmlco3 { height:auto; padding-top:64px; padding-bottom:64px } }
/* inside: SliceGrid > Column span 12 > .e1gpmlco4 {display:flex; flex-direction:column; align-items:center; text-align:center} */
/* heading = BaseHeading h2, preset H64, max-width:712px, white, centred (712x204 = 3 lines at 1440) */
.e1gpmlco5 { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:32px }   /* buttons: primary "Book a demo" → /request-a-demo/, secondary "Try Dovetail free" → /auth/signup/ (target _blank, backdrop-filter blur(8px)) */
```
The heading text differs per solutions page and is in each data file (`chrome.footerCta`).

## 7. Shared slices

### 7.1 FaqSlice (`ef2kgtv*`, `ea410al*`)
Layout: `SliceGrid`. Left column `span 3` holds the h2 "FAQs" (preset H56, `text-wrap:pretty`). Right column `4 / -1` has an `hr` (`.ef2kgtv3`, 1px `rgba(255,255,255,.24)`, margin-bottom 32), then one item per question:
```css
.ea410al0 /* question button */ { display:inline-flex; justify-content:space-between; align-items:center; width:100%; background:transparent; border:none; padding:0; color:#FFF; text-align:left; z-index:2; cursor:pointer }
.ea410al0:hover, .ea410al0:focus-visible { color:#A7A7A7 }
.ea410al1 /* question text */ { font:500 20px/28px $sans; letter-spacing:-0.25px }  @media (max-width:799px){ font-size:16px; line-height:24px }
.ea410al3 /* chevron chip */ { background:#212121; border-radius:4px; width:24px; height:24px; display:flex; align-items:center; justify-content:center; margin-left:8px }
          /* open: svg rotate(180deg), no transition */
/* answer sits in InnerGrid columns:8 > Column span 7 (771px wide at 1440) */
.ea410al2 /* answer wrapper */ { height:0; opacity:0; overflow:hidden; margin-top:8px; font:400 16px/24px $sans }
.ef2kgtv2 /* answer p */ { color:#A7A7A7; font:400 16px/24px $sans }
.ea410al4 /* divider after each item */ { height:1px; background:rgba(255,255,255,.24); margin:32px 0 }
```
- Chevron: `svg/` hash `ea410al3-082750.svg` (24x24).
- Each closed item is 69px tall at 1440 (28 + 8 + 1 + 32), and items are 101px apart.
- **Behaviour:** clicking toggles open. GSAP animates the open state `to(wrapper,{height:"unset", opacity:1, duration:.3})` (default ease `power1.out`). Closing is instant: `gsap.set(wrapper,{height:0, opacity:0})`. Multiple items can be open at once. The button has `aria-expanded`/`aria-controls`.

### 7.2 PixelTransitionSlice (`elyp12t*`, pixels `e70som0*`)
This wraps a section with rows of square "pixels" that dissolve on scroll. It's used on product pages around the carousel/findings block and the FAQ.
- Wrapper `.elyp12t1 { position:relative; z-index:3; pointer-events:none; margin-top:<marginTop if pixelateTop>; margin-bottom:<marginBottom if pixelateBottom> }`. md: margins 0. Inner `.elyp12t0 { background:#0A0A0A; pointer-events:auto }`.
- Pixel band `.e70som00 { display:flex; flex-direction:column; height:<sectionHeight>; width:100%; position:relative; z-index:2; pointer-events:none }`, **hidden at ≤1280** (`display:none`). Rows `.e70som01 { display:flex; height:<pixelSize> }`. Cells `.e70som02.pixel { width:<pixelSize>; height:100%; background-color: transparent→#0A0A0A }`.
- Product pages use `{pixelSize:48, sectionHeight:120, marginBottom:-120 (bottom band) or marginTop:-120 (top band)}`. That gives 3 rows of 48px (the third clipped to 24 inside 120) × `ceil(1440/48)=30` columns.
- **Motion (GSAP ScrollTrigger, scrub:true):** trigger is the band; `start:"top bottom+=" + 2*120` (= `top bottom+=240`), `end:"bottom top-=240"`. The timeline sets every cell's start colour at t=0, then for cell index r (row = floor(r/cols), col = (n-1-r) % cols) adds `to(cell,{duration:0, backgroundColor:end}, at = ((rows-1-row)*3 + .5*col)*.1 + shuffle[row*cols+col]*.01)`. Since `duration:0`, each cell snaps to its end colour when scrub progress passes its time. The "backwards" band (bottom of the wrapped section) goes `#0A0A0A → transparent`; the "forwards" band (top) goes `transparent → #0A0A0A`. The shuffle is a Fisher–Yates permutation of the cell indices, re-generated on resize (debounced 250ms). Only active at ≥1281px.
- Static fallback (before JS): a cell is coloured if `t(row,col) < ((rows-1)*.3 + (cols-1)*.05 + .09)/2`.

### 7.3 CustomerStoriesSlice (`elme6fd*`, `e1wn1hrv*`; data source `stories.home = ["breville","atlassian-design","itau-unibanco"]`)
```css
.elme6fd0 { background:#0044FF; height:910px; overflow-x:clip; position:relative }  @md{ height:700px }  @sm{ height:auto }
.elme6fd2 /* bg video */ { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.16; z-index:2; pointer-events:none }
.elme6fd1 { display:flex; flex-direction:column; justify-content:center; height:100%; position:relative; z-index:2 }  @sm{ height:unset; padding:64px 0 }
.e1wn1hrv0 /* SliceContainer */ { display:flex; flex-direction:column; align-items:center; padding:64px 124px }  @md{ padding:0 64px }  @sm{ padding:48px 16px }
.e1wn1hrv2 { display:flex; justify-content:center; position:relative; z-index:2 }       /* ProgressTabs 01 02 03, buttons #FAFAFA */
/* Spacer 40 (sm 32) */
.e1wn1hrv3 { max-width:812px; width:100%; text-align:center }
.e1wn1hrv4 { display:none; flex-direction:column; align-items:center }  /* active story: display:flex */
.e1wn1hrv5 /* h3 */ { H56; color:#FAFAFA; text-align:center }
.e1wn1hrv9 /* inline logo "[ logo ]" after the company name */ { display:inline-flex; align-items:center; gap:8px; vertical-align:middle }
.e1wn1hrv11 /* inline svg logo */ { height:56px; width:auto }  @md{ 44px }  @sm{ 32px }
/* Spacer 24 (sm 16) */
.e1wn1hrv6 /* p */ { P20; color:#FAFAFA; text-align:center; max-width:680px }
/* Spacer 32 (sm 24) */
.e1wn1hrv7 { display:flex; flex-wrap:wrap; justify-content:center; gap:8px }   /* "Read the story" (primary) + "All customer stories" */
.e1wn1hrv8 /* secondary */ { background:rgba(250,250,250,.08); color:#FAFAFA; border:1px solid rgba(250,250,250,.2) }  :hover{ background:rgba(250,250,250,.16) }
```
- Stories, in order:
  1. Breville: "How customer insights drive and inspire Breville’s product innovation", `/customers/breville/`, bg video `CustomerStoryBrevilleLoop.mp4`.
  2. Atlassian: "How Atlassian turns customer signals into confident product decisions", `/customers/atlassian-design/`.
  3. Itaú: "How Itaú Unibanco delivers better banking experiences with Dovetail", `/customers/itau-unibanco/`.

  The paragraph is placeholder (207/192/215 chars). The inline logos are the bracketed `[ svg ]` after the company name: `svg/e1wn1hrv9-593209.svg` (Breville, 56x56), `-661009` and `-365555` (Atlassian circle mark, Itaú).
- The video is lazily attached (after window `load` **and** an IntersectionObserver with `rootMargin 200px, threshold .1`): `autoplay loop muted playsInline preload="none"`, poster = story image.
- **Auto-advance:** `useTabGroup(0, 110)`. Progress increments by 1 every 110ms, so each story lasts 11s. It starts the first time the slice enters the viewport (GSAP ScrollTrigger `onToggle`) and wraps around. Clicking a tab number selects that story, resets progress to 0 and **stops auto-advance for good**. Reduced motion: no auto-advance.
- **ProgressTabs** (`e5b4pau*`): row gap 16. Each tab is a number button (M14, `padding:8px; margin:-8px; transition: color 300ms`; inactive `#7C7C7C`, active/hover `#FFF`; inside CustomerStories always `#FAFAFA`) followed, for the active tab only, by a 96px progress track (`.e13fzi540`: 1px `rgba(255,255,255,.08)`) with a fill (`.e13fzi541`: 1px `#FFF`, `width:<progress>%`, `transition: all 100ms`). The fill's `::after` is an 8x8 white square at the leading edge (`right:0; top:-3px`).

### 7.4 TestimonialSlice (`eqa8jb9*`, card `e1i468kp*`)
Used on roles, solutions and enterprise.
```css
.eqa8jb90 { position:relative; min-height:514px }  @sm{ min-height:unset }
/* SliceContainer > GridImageBackground(testimonial-grid-bg.png.png 1260x560, centred, 100vw) > BaseGrid */
.eqa8jb91 /* Column 3/12 */ { grid-column:3 / 12; margin:110px 0; position:relative; z-index:2 }  @md{ grid-column:1/-1 }  @sm{ margin:0 }
.eqa8jb92 /* tabs */ { position:absolute; bottom:0; right:0; padding-left:300px; padding-top:60px; z-index:1 }  @md{ position:relative; padding-top:24px; padding-left:0 }
```
- **Testimonial card** (featured): a link to the customer story (`e1i468kp0`: flex column, gap 64, `text-align:left`). It contains an optional 80x80 photo (radius 8, float left, margin `8px 16px 0 0`; sm margin-bottom 32). The quote `blockquote.e1i468kp5` is preset **H40** (40/48 w500 ls -1; md 32/40; sm 24/32) and is wrapped in curly quotes. The footer row (`e1i468kp3`: flex, gap 32, centred, min-height 48) holds the company white logo (height 40, trimmed), a 1px×40 vertical line `rgba(255,255,255,.24)`, then name (M14 `#FFF`) over title (M14 `#A7A7A7`).
- On hover the card shows the **Tooltip** (CLONE_SPEC component C behaviour, but this skin): a pill `.e1i468kp8` (M14, bg `rgba(255,255,255,.08)`, `backdrop-filter:blur(8px)`, radius 8, pad 8px 12px, gap 8) with an 8x8 `#0044FF` square before the label "Read customer story". It follows the cursor at +16px and flips at the viewport edges. The wrapper is `.e41snxo0 { position:fixed; top:0; left:0; z-index:4; opacity:0; transition: opacity 150ms }`, hidden at sm.
- With more than one testimonial, `useTabGroup(0,100)` is used: 10s per quote, same ProgressTabs.
- Background image: `/assets/marketing/testimonial-grid-bg.png.png`, `position:absolute; left:50%; top:50%; transform:translate(-50%,0)` inside a 100vw box. At sm the first grid layer (the image) is hidden on product quotes.

### 7.5 CompactLogoSlice (`e1a4s9wi*`) and Marquee (`e1u7fodh*`)
Used on pricing, enterprise, deploy and solutions (section height 252 at 1440).
```css
.e1a4s9wi0 /* heading */ { M14; color:#FFF; margin-bottom:64px; text-align:center; min-height:20px }  @md{ max-width:400px }
.e1a4s9wi1 { width:100%; overflow:hidden; position:relative; display:flex; flex-direction:column; gap:40px; min-height:168px }  @md{ gap:20px; min-height:148px }
.e1a4s9wi2 /* row */ { display:flex; justify-content:center; align-items:center; opacity:.32; height:64px }
/* both edges: GradientBanner 180px wide (sm 60px), linear-gradient(270deg | 90deg, transparent 0%, #0A0A0A 100%), full height */
```
- Heading: "Connecting the world's greatest companies to their customers" (straight apostrophe here).
- Two rows of customer white logos (`ThemedImg` 142x64 box). Row 1 has the first 6 and scrolls **left-to-right**; row 2 has the next 7, scrolls **right-to-left**, with `left:120px` offset. Item padding 40px each side (gap 80; md 20 each side).
- **Marquee motion** (GSAP): the content is duplicated (the second copy is `aria-hidden` and `inert`). `x` tweens by one copy-width over **60s**, `ease:"none"`, repeat −1, wrapped with `gsap.utils.wrap(-w,0)`. For `ltr` it starts at `x:-w` and moves `+=w`. It pauses on `focusin` and resumes on `focusout`. Reduced motion: paused. The Marquee's own edge fades (`::before`/`::after` 200px, sm 32px, gradient from theme bg) are present unless `removeShadow`.

### 7.6 ProductQuoteSlice (`e1cnxsk6*`)
Product pages only; specced in `product.md`.

### 7.7 GridImageBackground (`e1ms7w8v*`)
```css
.e1ms7w8v2 { position:relative; pointer-events:none; margin:0 auto; height:100%; overflow-x:clip }
.e1ms7w8v1 { position:absolute; top:0; left:50%; transform:translateX(-50%); width:100vw; height:auto }
.e1ms7w8v3 /* img */ { position:absolute; top:50%; left:50%; transform:translate(-50%,0%); object-fit:cover; object-position:center }   /* sic: Y is 0%, so the image hangs from the vertical centre */
.e1ms7w8v0 /* content */ { display:flex; align-items:center; position:relative; height:<image height>; z-index:1; pointer-events:auto }  @sm{ height:auto }
```
Measured: the testimonial bg image renders 1260x560 at x=90 (centred) at 1440.

## 8. Motion summary for shared parts

| Thing | Trigger | Detail |
|---|---|---|
| FAQ open | click | GSAP height unset + opacity 1, 0.3s; close is instant |
| Pixel bands | scroll (scrub) | per-cell colour snap, ≥1281 only |
| Customer stories | in view, then interval | 110ms/step → 11s per story; click stops |
| Testimonial slice | in view, then interval | 100ms/step → 10s per quote |
| Product quote | in view, then interval | 60ms/step → 6s; quote and author fade in via `@keyframes {from{opacity:0} to{opacity:1}}` 400ms ease (keyed by index) |
| Logo marquees | always | GSAP 60s linear loop; CSS marquee on product pages is 60s `translateX(0→-50%)` |
| Buttons | hover | bg 200ms (primary → #CECECE, secondary → .16) |
| Tooltip | hover over testimonial | follows cursor ±16px, opacity 150ms |

`prefers-reduced-motion` disables marquee, auto-advance, the scroll-video scale and the keyframe fades.

## 9. Things not measured / caveats
- I didn't open the light-theme dropdown/menu states visually. Values come from source.
- `?campaign=true` variants of the product pages aren't specced.
- The cookie-consent bar and Intercom are third-party and out of scope.
