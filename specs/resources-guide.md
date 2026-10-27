Source: https://dovetail.com/resources/dovetail-vs-marvin/

# Template: resources-guide (`/resources/{slug}/` comparison guides, 6 pages, LIGHT theme)

Pages:
- `dovetail-review`
- `dovetail-vs-aurelius`
- `dovetail-vs-enterpret`
- `dovetail-vs-marvin`
- `dovetail-vs-qualtrics`
- `insight7-alternatives`

Data: `src/data/company/resources/{slug}.json`. Shared components: `specs/company-shared.md`. This is a guide/article template (it is probably shared with `/guides/*` pages covered by another group).

Page chrome:
- `html { background:#FAFAFA }`.
- Banner: same markup but nearly invisible, white text on light grey (S1).
- Nav: light theme (S1).
- An 88px header spacer, so main starts at y=206.
- The page CTA uses light buttons, then the **footer only**.

`<main>` heights for vs-marvin:

| Viewport | `<main>` height |
|---|---|
| 1440 | 13,663 |
| 1280 | 10,753 |
| 768 | 12,602 |
| 390 | 20,336 |

## 1. Header block
- **Outer:** `border-radius:8px; padding:80px 0 160px` (≤1280 `radius 0; padding:40px 0 0`). Transparent over the `#FAFAFA` page.
- **SliceContainer** contents:
  - **Breadcrumb** (flex, `align-items:center; gap:4px; wrap`):
    - Link "Guides" → `/guides/`: M14 `#0A0A0A`, opacity .6.
    - A 24px slash svg (`svg/icon-breadcrumb-slash.svg`, opacity .6, stroke 2).
    - The current page as a `<button>`: Inter **14/22 w400 uppercase**, `padding:1px 6px`, opacity 1, `#0A0A0A`.
    - Hover/focus on either: `text-decoration:underline`.
  - S32 spacer.
  - `h1`: H72 `#0A0A0A` (72/76 ls -2; ≤1280 56/60, margin-bottom 24; ≤799 40/44 ls -1), `margin-bottom:32px`. Some titles are long questions (2 lines).

## 2. Article grid (`background:#FAFAFA`; SliceGrid)

### Aside: column `span 4` (376 at 1440; ≤1280 full width, above the body)
- **Meta block** (flex column, `max-width:600px`):
  - `<hr>` (1px `rgba(10,10,10,.24)`).
  - A row (flex, `padding:16px 0`) with two `p`s, each M14 `#626262`, `width:150px`: "Last updated" and "28 September 2026".
  - `<hr>`.
- **Actions** (flex, wrap, `gap:48px; margin-top:48px`; ≤1280 `margin-bottom:48px`). Two groups, each a flex column with gap 16:
  - Group heading `h2`: 14/18 w600 `#0A0A0A` (≤1280 14/16), `margin-right:16px`.
  - "Share": four 32x32 icon buttons:
    - Base: transparent, border 1px `#C4C4C4`, radius 8, `margin-right:8px`, 14px icons in `currentColor` `#0A0A0A`.
    - Copy link (`button`; copies the URL).
    - Facebook: `https://www.facebook.com/sharer/sharer.php?u={url}`.
    - LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url={url}`.
    - X: `https://twitter.com/intent/tweet?url={url}`.
    - Icons: `svg/share-copy-link.svg`, `share-facebook.svg`, `share-linkedin.svg`, `share-x.svg`.
  - "Summarize with AI": four 32x32 links (same style) to ChatGPT, Claude, Perplexity and Grok, each with a prefilled "Summarize this article: {url}" query. Icons: `svg/ai-chatgpt.svg`, `ai-claude.svg`, `ai-perplexity.svg`, `ai-grok.svg`. The exact hrefs are in the data.
- S48 spacer.
- **Desktop-only sticky panel** (`display:none` ≤1280). Measured 376x1179 at 1440; it is *not* sticky, it just sits in the tall aside column:
  - S40 spacer.
  - `h2` "Get started today": H18 `#0A0A0A`.
  - `p` "Go from raw data to valuable insights with a flexible research platform": P14 `#0A0A0A`, `margin:8px 0 16px`.
  - Primary (light) button "Contact sales" → `/contact-sales/`, **full width** (376x40), bg `#0A0A0A`.
  - S40 spacer, `<hr>`, S40 spacer.
  - `h3` "Contents": H18, margin-bottom 16.
  - **TOC** `ul` (flex column, gap 16, `margin:8px 0 16px`, no bullets). Each item is a `button`:
    - P14 (14/22 w400) `#0A0A0A`, left-aligned, inline, `overflow-wrap:anywhere`.
    - Hover: colour `#626262` and underline.
    - Click: `document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'})`, so the heading lands at viewport top 0 (no offset).
    - The component supports an "active" colour `#0044FF`, but I didn't see it set live, so there's no scroll-spy.

### Body: column `6 / -1` (682 at 1440, x=634; ≤1280 full width)
- Starts with an `<hr>` (`rgba(10,10,10,.24)`), then an S40 spacer.
- **Rich text, light** (S0.6 light): base 18/24 `#626262`; `p` 18/28 margin-bottom 24; `h2` 32/40 w500 `#0A0A0A` with `margin:48px 0 24px`; `h3` 24/32 with `margin:40px 0 24px`; `strong` `#0A0A0A` w500. Inline links are `#0A0A0A` with a `#C4C4C4` 1px underline and the `::after` hover line.
  - **Tables** (comparison grids):
    - Width 100%, `margin:48px 0` (≤799 32), 16px.
    - `th`: `#0A0A0A` w600, pad 12px 16px, bottom 2px `#D8D8D8`.
    - `td`: `#626262`, pad 10px 16px, bottom 1px `#D8D8D8`, top-aligned.
    - 3 columns ("If you need…", "Dovetail", "{Competitor}"). At 390 the table overflows to 385.5 wide, so allow `overflow-x:auto`.
  - Body text and ul/ol items are placeholder (char counts in data). `strong` lead-ins and headings are verbatim.
- **FAQs** (static, not an accordion):
  - `h2` "FAQs": H20 (20/28 w500; ≤799 16/24), `margin:16px 0`, `text-wrap:pretty`.
  - For each question: `h3` (24/32 w500 ls -0.5; ≤1280 20/28; ≤799 18/24), `margin:16px 0 8px`, followed by a rich-text answer (18/28 `#626262`).
- S80 spacer.
- **Related topics** (flex column, gap 40):
  - `h2` "Related topics": M14 `#626262`, margin-bottom 16, followed by an `<hr>`.
  - A wrap of links, each M14 `#626262` with `margin:0 8px 8px 0`, text in brackets (e.g. "[Customer research]"). Hover: `#0A0A0A` + underline.
  - 12 topics.

### Mobile TOC drawer (≤1280 only; `display:none` above)
- **Panel:**
  - `position:fixed; inset: calc(100% - 64px) 0 0; z-index:7; max-height:520px`.
  - `background:#FAFAFA; border-top:1px solid #C4C4C4`.
  - When closed, only a 64px bar shows at the bottom of the viewport.
- **Toggle button** "Contents": 18/24 w500 `#0A0A0A` (≤1280 16/24), border-bottom 1px `#C4C4C4`, with a chevron icon (down when closed, up when open). Hover `#626262`.
- **List:** `padding:16px 32px 40px`. A `ul` (gap 16) of the same TOC buttons, starting at opacity 0.
- **Open/close motion** (source):
  - The GSAP timeline tweens the panel `top` to `"auto"` (open) or `"calc(100% - 64px)"` (closed) over 0.5s with a CustomEase `"guide-nav-ease"` = cubic-bezier **(0.5, 0, 0, 1)**.
  - At "-=0.2" it tweens the list children's opacity 0→1 (or 1→0) over 0.4s.
  - The overlay (`position:fixed; inset:0; background:rgba(10,10,10,.8); backdrop-filter:blur(4px); z-index:1`) fades from opacity 0 / visibility hidden to 1 with `transition: opacity .2s`.
  - Panel `overflow` is `auto` while open.
  - Clicking a TOC item closes the drawer, then scrolls.

## 3. Related articles (SliceContainer)
- S160→64 spacer (160 / 64 / 64).
- `h2` "Related articles↘": 24/32 w500 ls -0.5 `#0A0A0A` (≤1280 20/28; ≤799 18/24), margin-bottom 48 (≤1280 32).
- S40 spacer.
- **Carousel** (S8, light colours):
  - Track grid `repeat(5, 320px)` (or one column per item), gap 32.
  - Width: `calc(1096px + 50vw)` (≤1280 `calc(-256px + min(250%, 800px))`; ≤799 `repeat(5,1fr)`, gap 16, `width: calc(-192px + min(500%, 1600px))`).
  - Right fade: 122px, `linear-gradient(90deg, rgba(0,0,0,0), #FAFAFA)`.
  - **Item:**
    - Title link: 20/28 w500 ls -0.25, `color:inherit` (`#0A0A0A`), margin-bottom 32 (≤799 16/24). Hover/active: `#626262` + underline.
    - Date: M14 `#626262` (e.g. "20 October 2026").
  - Progress bar: S8 with the light track `rgba(10,10,10,.24)` and a `#0A0A0A` handle.
- 5 articles (9 on dovetail-review and insight7-alternatives).

## 4. Page CTA (light)
S6 with `h2` colour `#0A0A0A`:
- Primary "Contact sales": bg `#0A0A0A`, text `#FAFAFA`.
- Secondary "Try Dovetail free": bg `#F5F5F5`, border `#EBEBEB`, text `#0A0A0A`.

## 5. Light footer (measured)
Same layout as CLONE_SPEC §11 (768.6 tall at 1440), with light colours:

| Element | Colour |
|---|---|
| Background | `#FAFAFA` |
| Links, link underline `::after`, social icons | `#0A0A0A` |
| Column headings, © line | `#626262` |
| Badges ("new" / "beta") | text `#626262` on bg `#EBEBEB` |
| Bottom-bar buttons (Cookie preferences, Legal) | `#0A0A0A` |

## Responsive
| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| h1 | 72/76 | 56/60 | 40/44 | 40/44 |
| Header block pad | 80 / 160 | 40 / 0 | 40 / 0 | 40 / 0 |
| Layout | aside 4 cols + body cols 6–12 | stacked (aside 281 tall: meta + share) | stacked | stacked |
| Desktop TOC/CTA | shown | hidden → bottom drawer | drawer | drawer |
| Body text | 18/28 (p) | 16/24 | 16/24 | 16/24 |

## Gaps
- The active-TOC (scroll-spy) colour exists in code (`#0044FF`) but I didn't observe it.
