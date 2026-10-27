Source: https://dovetail.com/

# Content templates: shared chrome, themes and components

Recon date: 2026-10-26. I used a private headless Chromium (Playwright 1.x) at 1440x900, 1280x800, 768x1024 and 390x844, plus the SSR HTML and Emotion `<style>` rules of every sampled page. The shared MCP browser was being driven by other agents at the same time, so it wasn't usable. A metadata crawl covered all 1,722 routes in this group (blog, changelog, the 10 guide hubs, /guides, /contributors).

Read `CLONE_SPEC.md` §0 first. Everything here is a delta from it: breakpoints (≤1280 = md, ≤1185 = nav collapse, ≤799 = sm), the `.container` (max 1512, pad 124 / 64 / 16), the fonts, the buttons, the nav (§2), the banner (§1), the footer (§11), the final CTA (§10) and the modal (§12).

The templates in this group are:

| Template | Spec | Theme |
|---|---|---|
| blog-index | `blog-index.md` | dark |
| blog-post | `blog-post.md` | dark |
| changelog-index | `changelog-index.md` | dark |
| changelog-entry | `changelog-entry.md` | dark |
| guide-article (+ `hub` variant) | `guide-article.md` | **light** |
| guides-index | `guides-index.md` | dark |
| contributors-index | `contributors-index.md` | **light** |
| contributor-profile | `contributor-profile.md` | **light** |

---

## 1. Page chrome per template (measured at 1440)

| Template | `html` bg | Header spacer after nav (`height:88`) | `main` top y @1440 | Footer variant | Doc height @1440 / 1280 / 768 / 390 |
|---|---|---|---|---|---|
| blog-index | #0A0A0A | yes | 206 | final-CTA + footer (1669) | 7432 / 26658 / 20767 / 14890 (24 cards loaded) |
| blog-post | #0A0A0A | **no** (main starts 118) | 118 | final-CTA + footer | 11232 / 13472 / 12546 / 14421 (sample `/blog/stakeholder-trust-design-decisions/`) |
| changelog-index | #0A0A0A | **no**; hero pulls up with `margin-top:-88px` | 30 | plain footer (769) | 22765 / 38470 / 39104 / 40692 |
| changelog-entry | #0A0A0A | yes | 206 | final-CTA + footer | 5002 / 5296 / 6016 / 6945 (sample `channels-2-generally-available`) |
| guide-article | **#FAFAFA** | yes | 206 | **plain light footer (769)** | 7744 / 7070 / 8316 / 11118 (sample `/research/action-research/`) |
| guide hub (`/research/` etc.) | #FAFAFA | yes | 206 | plain light footer, then the "All … articles" nav | 14244 / 13212 / 17476 / 27490 (`/research/`) |
| guides-index | #0A0A0A | yes | 206 | final-CTA + footer | 4360 / 5594 / 5604 / 5689 |
| contributors-index | #FAFAFA | yes | 206 | **light** final-CTA + light footer (1669) | 5910 / 5816 / 6184 / 6538 |
| contributor-profile | #FAFAFA | yes | 206 | light final-CTA + light footer | 9997 / 7983 / 14128 / 15827 (`/contributors/hugh-good/`) |

- The header block is `div[data-page-chrome=header]`: banner (30px desktop, 38px ≤799) + nav (88) + optional spacer `div{height:88px}` (88 at every width). So `main` starts at 206 at desktop and 214 at ≤799 when the spacer is present, and 118 / 126 when it isn't.
- **The nav is never sticky.** It's `position:relative` on every template, as on the homepage, and I verified it scrolls away (nav y = −1470 after `scrollTo(0,1500)`).
- **Footer variants**
  - "final-CTA + footer": `div[data-page-chrome=footer]` contains the §10 "The best never guess" CTA section followed by the §11 footer. Measured 1669px at 1440x900.
  - "plain": the §11 footer only, measured **769px** at 1440. The homepage measured 782; I didn't investigate the 13px difference.
  - Templates with a plain footer render their own in-`main` CTA instead (see the "Inline CTA" component below).
- `html[data-scroll-theme]` selectors exist in the CSS, but the attribute was **never set** on any page I loaded, so only the base (non-attribute) rules apply.

## 2. Light theme (guide-article, hub, contributors, profile)

The whole page sits on `#FAFAFA`: the html background and `div.css-1vctnxa{background:#fafafa}` wrapping the article grid.

| Token | Value | Use |
|---|---|---|
| ink | `#0A0A0A` | body `color`, headings, nav links, footer links, rich-text headings/links/strong |
| ink-muted | `#626262` | rich-text paragraphs, meta labels, dates, footer headings, footer meta, breadcrumb link base |
| line | `rgba(10,10,10,0.24)` | hr / meta-table rules / carousel track |
| border-soft | `#C4C4C4` | share/AI icon buttons border, link underline colour, mobile TOC sheet border |
| table-line | `#D8D8D8` | rich-text table borders |
| surface-btn | `#F5F5F5` bg + `#EBEBEB` border | "Try Dovetail free" (secondary) button |
| badge | bg `#EBEBEB`, text `#626262` | footer "new/beta" badges |

**Light nav** (`nav.css-1ld03cg`): the same box as homepage §2, with `color:#0A0A0A`.
- Links and dropdown triggers are #0A0A0A. Hover bg is `rgba(255,255,255,.08)`, which is effectively invisible on light; this is a faithful quirk.
- "Log in" is #0A0A0A text.
- "Book a demo" and the ≤1185 "Menu" pill are `background:#0A0A0A; color:#FAFAFA`, hover `#3B3B3B`, `transition: all 300ms`.
- The logo SVG uses `currentColor`, so it renders #0A0A0A.
- Dropdown panel: `background:#F5F5F5; border-color:rgba(10,10,10,.04)`. Item titles are #0A0A0A with hover bg `#EBEBEB`.
- The descriptions are still `rgba(255,255,255,.64)`, i.e. near-invisible. This is a live-site bug; reproduce it or not at your discretion.

**Banner on light pages:** it's identical to the dark one (`rgba(255,255,255,.16)` over #FAFAFA). The white text is therefore almost invisible, and only the two 3D icons and the ✕ show. That's faithful; the screenshots confirm it.

**Light footer** (`footer.css-s2ifa3{background:#fafafa}`): same layout as §11.
- Headings #626262. Links #0A0A0A, with the underline `::after` in #0A0A0A.
- Badges: bg #EBEBEB, colour #626262, pad 2px 4px, radius 4.
- Bottom-bar text #626262. COOKIE PREFERENCES and Legal are #0A0A0A, hover #626262.
- Social icons: `svg [fill='#FAFAFA']` and `[stroke='#FAFAFA']` are recoloured to #0A0A0A, hover colour #626262.

**Light final CTA** (contributors and profile only):
- Wrapper `background:#fafafa`. The top fade is `linear-gradient(0deg, rgba(0,0,0,0) 0%, #FAFAFA 100%)`.
- Words are #0A0A0A (133.344px @1440x900, ls −0.25px).
- The ASCII canvas uses the same algorithm with dark glyphs. Pixel sampling found rgb ≈ (10,10,10) with max alpha 61/255 ≈ 0.24, so use `rgb:"10, 10, 10"`.
- Buttons: "Book a demo" blue #0044FF / #FAFAFA, 158x56. "Start free trial" `background:rgba(10,10,10,.06); color:#0A0A0A; border:1px solid rgba(10,10,10,.24)`, 164x56.
- `.css-1eaa4l7 section svg{scale:.9}`. ≤799: `padding-bottom:64px`.

## 3. Grid primitives (Emotion classes, reused by all templates)

- **Page grid section** (`css-1y9l2ec`):
  - `display:grid; grid-template-columns:repeat(12,1fr); column-gap:32px; row-gap:32px; padding:0 124px; max-width:1512px; margin:auto`.
  - ≤1280: gap 24 / 24, pad `0 64px`. ≤799: `repeat(4,1fr)`, gap 24, pad `0 16px`.
  - Column widths: 70px @1440, 74 @1280, 166 @768, 71.5 @390.
- **Variants:**
  - `css-1sf5qe9` (blog index): row-gap 64 (24 ≤1280, 64 ≤799).
  - `css-kpwz4p` (profile lists): row-gap 64 (24 ≤1280).
  - `css-1wnk2sd`: row-gap 32 (64 ≤799).
- **Plain section** (`css-1aby5n6`): `max-width:1512px; margin:0 auto; padding:0 124px` (64 / 16).
- **Inner grid without padding** (`css-bt1zir`, `css-18dywm4`, `css-m0cm8y`): 12 col gap 32 (24 ≤1280; 4 col ≤799).
- **Grid cells:**
  - At ≤1280, every cell `span N` becomes `grid-column:1/-1` unless noted otherwise.
  - `css-992hdi` = span 4.
  - `css-19cjqfz` = 1/-1.
- **Spacers:** fixed-height `div`s (`height` attribute plus class). Values are given per template.

## 4. Shared components

### 4.1 Rich text (`.e8fk9sg2` container). Dark = `css-1frkj0g` (blog, changelog); light = `css-1ng524k` (guides)

| Element | Dark | Light | ≤1280 | ≤799 |
|---|---|---|---|---|
| container | Inter 18/24 #A7A7A7 | Inter 18/24 #626262 | 16/24 | 16/24 |
| `p` | 18px / 28px w400, `margin:0 0 24px`, `text-wrap:pretty` | same | (same, 18/28; the container font only affects li markers) | same |
| `h1`, `h2` | 32/40 w500 ls −0.5, #FFF, `margin:48px 0 24px` | #0A0A0A | 24/32 ls −0.25 | 24/32 ls −0.25 |
| `h3` | 24/32 w500 ls −0.5, #FFF, `margin:40px 0 24px` | #0A0A0A | 20/28 ls −0.25 | 18/24 ls −0.25 |
| `h4–h6` | 24/32 w500 ls −0.5, #FFF, `margin:16px 0 8px` | #0A0A0A | 20/28 | 18/24 |
| `ul` | `font-size:18px; padding-left:24px; margin-bottom:24px`, disc | same | | |
| `ol` | `font-size:18px; padding-left:24px; list-style-position:outside`, **no bottom margin** | same | | |
| `li` | lh 28, `margin-bottom:8px`; `li p` mb 8 | same | | |
| `blockquote` | `border-left:2px solid #A7A7A7; padding-left:16px`, colour #A7A7A7, no margin; inner `p` keeps mb 24 | border/colour #626262 | | |
| `a` (`css-5wc63` / `css-1xo1e7`) | #FFF, `text-decoration:underline`, decoration colour **#808080**, offset 1.5px, thickness 1px, `position:relative`, `transition:color 200ms ease-out`; `::after` 1px #FFF bar at bottom 2px, `scaleX(0)` → hover `scaleX(1)` `transform 200ms ease-out`, origin left | #0A0A0A, decoration colour #C4C4C4, bar #0A0A0A | | |
| inline "glossary" `button` (light) | same style as `a` (`css-1xo1e7`, `e8fk9sg0`), rendered as `<button>` | | | |
| `strong`, `b` | #FFF w500 | #0A0A0A w500 | | |
| `em` | italic, inherits colour | | | |
| `img` | `display:block; width:100%; height:auto; border-radius:8px; margin:64px 0` | same | | margin 32px 0 |
| `figure` (`css-iufrnb`) | `margin:64px 0`; img radius 8, margin 0 | same | | 32px 0 |
| `figcaption` | 14/20 #A7A7A7, `margin-top:8px` | #626262 | | |
| 2-up figure row (`css-1iaa25u`) | `display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:64px 0` | | | 1 column, gap 32, margin 32 0 |
| `video` (`css-wmtq8o`) | `border-radius:8px; width:100%; margin:64px 0`; `loop muted playsInline preload=none`, with a poster. **Plays when ≥ some threshold is in view, pauses out of view** (IntersectionObserver; verified paused→playing on scroll) | | | 32px 0 |
| YouTube embed (`css-1d1bmh6` > `iframe.css-1cik13d`) | wrapper `margin:64px 0`; iframe `aspect-ratio:16/9; border-radius:8px; width:100%` | | | 32px 0 |
| `table` | `border-collapse:collapse; width:100%; margin:48px 0; font-size:16px` (lh 24) | | | margin 32px 0 |
| `th` | #FFF w600 left, `padding:12px 16px`, `border-bottom:2px solid #313131`, bg `#141414` | #0A0A0A, border #D8D8D8, bg rgba(255,255,255,.04) | | |
| `td` | #A7A7A7, `padding:10px 16px`, `border-bottom:1px solid #313131`, top-aligned; the last row has no border | #626262, #D8D8D8 | | |
| `hr` | browser default: 2px tall, colour rgb(128,128,128), computed margin 9px 0 32px | | | |
| `code` | `font-family:monospace` (system), inherits size | | | |
| `pre` | `overflow-x:auto` | | | |

Rich text never animates.

### 4.2 Image card (blog index, blog related, blog sidebar) `.e1toa26h0` + `.eq9n4cu*`

- **Structure:** `div.css-1ofqig9` (flex column) contains:
  - `div.css-17y22m5{width:100%; aspect-ratio:3/2; overflow:hidden}`, holding `a.css-r3myp7` > `img` (`object-fit:cover; height:100%; border-radius:8px`).
  - `a` (text block) holding:
    - `div.css-fnp9xz{display:flex; flex-direction:column; gap:16px; margin:32px 0}` (≤1280: `margin:24px 0 16px`), which contains the title `p` and the date `p`.
    - The tag line.
- **Image link** (`css-r3myp7`):
  - `display:block; line-height:0; position:relative; border:1px solid transparent`.
  - `::after{inset:0; border-radius:8px; box-shadow:inset 0 0 0 1px rgba(255,255,255,.16); background:transparent; transition:background-color 200ms ease-in-out}`.
  - **On hover** the measured `::after` background is `rgba(0,0,0,0.2)`, which darkens the image.
  - The image itself never scales. The `.gif` covers are **not** swapped in on hover; cards always show the `-poster.png`.
- **Text link:** colour #FFF, hover/focus colour `#A7A7A7` (no transition declared, so the change is instant).
- **Title sizes:**
  - Grid card title (`css-1pe7ypw`): Inter 20/28 w500 ls −0.25 (≤799: 16/24).
  - Featured title (`css-mi0yhz`): 24/32 w500 ls −0.5 (≤1280: 20/28 ls −0.25; ≤799: 18/24).
  - Sidebar/related title (`css-hlew8i`): 20/28 w500 ls −0.25 (≤799: 16/24).
- **Date** (`css-75j0z0`): Inter 16/24 w400 #FFF. Format "7 September 2026" (day without padding, full month).
- **Tags** (`css-t1uolz`): JetBrains Mono 14px, lh 140%, ls 1px, uppercase, #A7A7A7. Text is `[Ideas] [AI] …`, each wrapped in brackets and separated by a space.

### 4.3 Meta table (blog-post: dark `css-h4bxus`; guide/profile: light `e19x9lsh*`)

Each row is an `hr` followed by a flex row with `padding:16px 0`, align centre. There's a final `hr` after the last row.
- `hr`: 1px, `rgba(255,255,255,.24)` (dark) or `rgba(10,10,10,.24)` (light), margin 0.
- Label: JetBrains Mono 14 / 140% / ls 1 / uppercase.
  - Dark: #A7A7A7, `min-width:135px`.
  - Light: #626262, `width:150px`.
- Value:
  - Dark: same mono style, #A7A7A7.
  - Light: links are mono #626262 with underline on hover. Plain text values use the label style.
- Row height is 52–53px.

### 4.4 Share / "Summarize with AI" (blog-post, guide-article)

- Layout:
  - `div.css-114z8go{display:flex; gap:48px; flex-wrap:wrap; margin-top:48px}`; ≤1280 also `margin-bottom:48px`.
  - Each group is a flex column with gap 16.
  - Heading `h2`: Inter 14/18 w600 (≤1280 lh 16), `margin-right:16px`, colour = page ink.
- Icon buttons:
  - 32x32, `border:1px solid #454545` (dark) or `#C4C4C4` (light), radius 8, `margin-right:8px`.
  - Icon 14x14 in `currentColor`: #FFF (dark) or #0A0A0A (light).
  - **No hover style.**
- Share buttons: Copy link (`button`, aria-live "visually-hidden" span), Facebook, LinkedIn, X (`href="#"` in SSR, wired in JS).
- AI buttons: ChatGPT, Claude, Perplexity, Grok (`target=_blank`).
- At 390 the two groups wrap into 2 rows (176px tall block).

### 4.5 Breadcrumb (`css-edv3tw` light; `css-1f85ewe` dark blog)

- Light: `display:flex; flex-wrap:wrap; gap:4px; align-items:center`. Row height 26.
  - First crumb ("Guides" / "Contributors", a link): **JetBrains Mono** 14 / 140% / ls 1px / uppercase, #0A0A0A, `opacity:.6`. Hover: underline.
  - Separator: an inline 24x24 SVG "/" glyph (path 8x14), colour #0A0A0A at about .6.
  - Middle crumb (hub name, e.g. "Research methods" → `/research/`, a link): **Inter** 14/22 w400, **uppercase**, ls normal, #0A0A0A, `opacity:.6`. Hover: underline.
  - Current page: a `<button>` with the same Inter 14/22 uppercase style at `opacity:1`, `padding:1px 6px`. It does nothing visible.
  - At 1440 for an article: "GUIDES" x124 w58; "/" x186; "RESEARCH METHODS" x214 w149; "/"; current x396. On a hub page the crumbs are "Guides / <Hub name>" (current = hub).
  - Wraps at 390 (54 tall).
- Dark blog: a single "Blog" link → `/blog/`. JetBrains Mono 14 / 140% / ls 1 / uppercase #A7A7A7, hover #FFF + underline. Container is Inter 14/22 w600, gap 4.

### 4.6 Inline CTA "Turn customer feedback into product innovation" (templates with plain footer: guide-article, hub, changelog-index)

- Placement: a `section.css-1y9l2ec` containing a cell `grid-column:span 9` (≤799 1/-1). Inside, in order:
  - Top spacer: 200px (≤1280: 96).
  - `h2` (`max-width:712px`): 64/68 w600 ls −2 (≤1280: 48/52 ls −1; ≤799: 32/36 ls −0.25).
    - Text: "Turn customer feedback into product innovation" (non-breaking space before "innovation").
    - Colour #0A0A0A (light) or #FFF (dark).
  - Buttons row: `margin-top:32px; display:flex; gap:8px; flex-wrap:wrap`.
  - Bottom spacer: 120px (≤1280: 96).
- Buttons are `pad 10px 16px`, 14/18 w500 (≤1280 lh 16), radius 8, `transition: color 200ms, background 200ms, opacity 200ms`.
  - Light: "Contact sales" `/contact-sales/` (bg #0A0A0A, #FAFAFA, hover #3B3B3B) and "Try Dovetail free" `/auth/signup/` target _blank (bg #F5F5F5, #0A0A0A, border #EBEBEB; hover bg rgba(255,255,255,.08)).
  - Dark: "Contact sales" (bg #FFF, #0A0A0A, hover #CECECE) and "Try Dovetail free" (bg rgba(255,255,255,.08), #FFF, border rgba(255,255,255,.24), hover bg .16).
  - Measured 125x40 and 145x40 (38 tall ≤1280).

### 4.7 Text carousel ("Editor's picks↘" / "Latest articles↘"): guide-article and hub

- Section: `css-1aby5n6`. Contents in order:
  - Spacer: 160 (≤1280: 64).
  - `h2.css-nfvsjr`: 24/32 w500 ls −0.5, `margin-bottom:48px` (≤1280: 20/28 ls −0.25, mb 32; ≤799: 18/24). The text ends with the literal "↘".
  - Spacer: 40.
  - Carousel block (`position:relative`).
  - After the second carousel, a 64px spacer.
- **Right fade** (`css-1m8yat`): `position:absolute; right:0; top:0; height:100%; width:122px; z-index:1; pointer-events:none; background:linear-gradient(90deg, rgba(0,0,0,0) 0%, #fafafa 100%)`.
- **Scroller** (`css-14hqo3z`): `overflow-x:scroll; overflow-y:hidden; scrollbar-width:none` (webkit scrollbar hidden).
- **Track** (inline `padding-right:272px` wrapper):
  - Grid `grid-template-columns:repeat(N,320px); gap:32px`, N = 4 for picks and 8 for latest.
  - Width `calc(816px + 560px + ((100vw - 1264px)/2))` (picks) or `calc(2224px + 560px + ((100vw - 1264px)/2))` (latest).
  - ≤1280: width `calc(min(200%,640px) - 224px)` / `calc(min(400%,1280px) - 352px)`.
  - ≤799: `repeat(N,1fr)`, gap 16, width `calc(min(400%,1280px) - 144px)` / `calc(min(800%,2560px) - 336px)` (measured columns 272px at 390).
- **Item:**
  - Title link `css-tay58o`: Inter 20/28 w500 ls −0.25 (≤799 16/24), #0A0A0A, `margin-bottom:32px`, hover colour #626262 + underline.
  - Then the date `span.css-j54wk4`: mono 14 / 140% / ls 1 / uppercase, #626262. Format "20 May 2026".
- **Progress bar** (`css-160yjmg{padding:64px 0 0}`; ≤1280 48):
  - Track `css-fjemjz`: 1px tall, `rgba(10,10,10,.24)`, full width.
  - Fill `css-13oh35l > span`: 1px #0A0A0A, `width` = scroll progress %.
  - Square handle `css-h13aiw`: 12x12 #0A0A0A, `top:-6px`, `transform: translate3d(progress × (trackWidth − 16px), 0, 0)`.
    - Measured at scrollLeft 200 / max 272 = 73.53%: x = 864.47 on a 1192 track.
  - The handle is draggable: `cursor:grab; touch-action:pan-y; user-select:none` inline (GSAP Draggable-style inline props). Dragging the handle scrolls the track.
  - Updates are immediate (no easing) on the scroller's `scroll` event.

### 4.8 Related-topics tag cloud (guide-article, hub; profile "Skills" uses the same parts)

- Block `css-1f2qzn3{display:flex; flex-direction:column; gap:40px}`, preceded by two 80px spacers.
- Heading `h2.css-1x46hia`: "Related topics" (profile: "Skills" as a `p`), mono 14 / 140% / uppercase #626262, `margin-bottom:16px`. Then an `hr` (rgba(10,10,10,.24)).
- Links (`css-1rijhl5`): mono 14 / 140% / uppercase #626262, inline style `margin:0 8px 8px 0`. Text is `[Customer research]`. Hover #0A0A0A + underline.
- Full list (12 items, in this order): Customer research `/customer-research/`, Design thinking `/design-thinking/`, Employee experience `/employee-experience/`, Enterprise `/enterprise/`, Market research `/market-research/`, Patient experience `/patient-experience/`, Product development `/product-development/`, Product management `/product-management/`, Research maturity assessment `/research-maturity-assessment/`, Research methods `/research/`, Surveys `/surveys/`, User experience (UX) `/ux/`.
  - **Article pages** (including `/guides/*`) show all 12.
  - **Hub pages** omit their own hub, so they show 11. For example, `/research/` drops "Research methods" and `/design-thinking/` drops "Design thinking". I verified this across all 1,136 guide pages.

## 5. Motion summary (all content templates)

| Thing | Trigger | Detail |
|---|---|---|
| Card image dim | hover | `::after` bg transparent → rgba(0,0,0,.2), 200ms ease-in-out |
| Card / row text colour | hover | instant (no transition) |
| Rich-text / footer link underline | hover | `::after` scaleX 0→1, 200ms ease-out, origin left; colour 200ms ease-out |
| Filter pills (blog) | hover | bg .08→.16, colour #A7A7A7→#FFF, `transition: background 150ms, color 150ms` |
| Changelog row | hover | instant invert: bg #FFF, text #0A0A0A, arrow icon shown; cursor-follow preview image (GSAP-set transform, see changelog-index) |
| Year dropdown chevron | open | `transform rotate(180deg)` 150ms ease |
| Guide TOC click | click | JS smooth scroll to heading, about 500ms, heading lands at viewport top 0 (no offset) |
| Mobile "Contents" sheet | click | JS tween of `top` from `calc(100% - 64px)` to `100vh − 520px` over ≈500ms with ease-in-out; list opacity 0→1 over ≈350ms starting ≈350ms; backdrop opacity 200ms |
| Text carousel | scroll/drag | progress fill + handle follow scroll directly |
| Body videos | in view | IntersectionObserver play/pause (hero video is `autoplay loop muted playsInline`) |
| Sticky sidebar cards (blog-post) | scroll | CSS `position:sticky; top:112px` |
| Footer final CTA | as homepage §10 | GSAP on mount |

There are **no** keyframe animations, load fades or scroll-reveal effects in any content `main`. I checked `getAnimations()` and every computed `animation-name` on 8 templates and found none. Each page creates 1–8 IntersectionObservers: footer ASCII canvases, video play/pause, and Next.js link prefetch.

## 6. Couldn't measure / caveats

- The mobile `/menu/` route is out of scope, as on the homepage.
- Dates and times on the changelog are rendered server-side in a fixed zone. The strings in `changelog.json` are as served on 2026-10-26.
- The cursor-follow preview easing on the changelog: the inline styles are GSAP's (`translate:none; rotate:none; scale:none`), but `getAnimations()` is empty and the position was already final 16ms after the mouse move. It's either `gsap.set` or a very short `quickTo`. I couldn't de-minify which one.
- The mobile Contents sheet tween curve is sampled, not read from source (samples: 0ms 780 → 140ms 764 → 190ms 700 → 240ms 514 → 290ms 425 → 340ms 380 → 390ms 353 → 440ms 338 → 540ms 325 → 590ms 324).
- `Inter-Medium.woff2` (w500) didn't appear in the network log on these pages, even though `@font-face` declares it with `src: local("Inter-Medium"), url(/fonts/Inter-Medium.woff2)`. The headless machine may have a local Inter. Keep the 500 face as declared in CLONE_SPEC §0.4.
