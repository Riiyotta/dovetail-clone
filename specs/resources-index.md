Source: https://dovetail.com/resources/

# Template: resources-index (`/resources/`)

Data: `src/data/company/resources.json`. Shared components: `specs/company-shared.md`.

Page chrome: standard banner and nav, **plus an 88px header spacer** (main starts at y=206 at 1440 and y=214 at ≤799). The page has its own CTA (S6), then the **footer only** (no final CTA).

`<main>` heights:

| Viewport | `<main>` height |
|---|---|
| 1440 | 13,693 |
| 1280 | 13,242 |
| 768 | 15,521 |
| 390 | 18,453 |

Section order:
1. Hero
2. "Explore by topic" list
3. TEI card
4. ROI card
5. "Compare Dovetail" list
6. "Customer stories" list
7. "From the blog"
8. "Live demos"
9. Page CTA

Each section is separated by an S200 spacer (200 / 96 / 96).

## 1. Hero (SliceContainer, no spacer above beyond the header spacer)
- Eyebrow "Resources": M14 `#A7A7A7`, margin-bottom 32.
- `h1` "Resource centre": H80 (80/84 ls -2; ≤1280 64/68; ≤799 40/44 ls -1).
- `p`: P20 `#FFF`, `margin:32px 0; max-width:800px` (≤1280 16/24). Text: "Guides, research, demos, and tools to help your team make better decisions with customer intelligence."
- Button row (`margin-top:32px`, flex, wrap, gap 8):
  - Primary "Contact sales" → `/contact-sales/`.
  - Secondary "Try Dovetail free" → `/auth/signup/`.

## 2, 5, 6. Link lists (shared layout; one SliceGrid each)
- **Left column** (`span 4`, 376 at 1440; ≤1280 full):
  - `h2`: H64 (64/68 ls -2; ≤1280 48/52 ls -1; ≤799 32/36 ls -0.25). It wraps to 2 lines at 1440 in a 376 column.
  - `p`: P20 `#FFF`, `margin-top:32px; max-width:800px` (≤1280 16/24).
  - Text:
    - "Explore by topic": 238-char placeholder.
    - "Compare Dovetail": "See how Dovetail compares to other tools in the market."
    - "Customer stories": "See how teams at leading organizations use Dovetail to turn customer feedback into decisions."
- **Right column** (`6 / span 7`, 682 at 1440 starting x=634; ≤1280 full). At ≤799 the grid row gap is 64.
- **Item:**
  - Box: `border-top:1px solid rgb(69,69,69); padding:40px 0`. The last item also has `border-bottom:1px solid rgb(69,69,69)`.
  - Link `<a>` (flex, start-aligned, colour `#FFF`; hover/focus colour `#A7A7A7`, instant) wrapping an `h3`:
    - H20 (20/28 w500 ls -0.25; ≤799 16/24), `display:flex; gap:8px; margin-bottom:8px`.
    - The text ends with " ↗" (a literal character).
  - Description `p`: P16 `#A7A7A7` (placeholder; lengths in data).
  - Measured item heights: 167 (2-line description) at 1440 and 211 at 390.
- Item counts: topics 8 (links to `/customer-research/`, `/product-development/`, …), compare 16 (`/dovetail-vs-…/`), customer stories 18 (the anonymous stories, `/customers/{slug}/`).

## 3. TEI card (SliceContainer → card grid)
- **Card:** 12-column grid (gap 32 / 24 / 24; ≤799 4 columns), `background:#191919; border-radius:8px; overflow:hidden`.
- **Copy column** (`span 6`; ≤1280 full): flex column, `padding:64px`. The inner block has `margin:auto 0` (vertically centred).
  - `h2` "The Total Economic Impact™ of Dovetail": 48/56 w500 ls -1 `#FFF` (≤1280 32/40 ls -0.25; ≤799 24/32).
  - `p`: P16 `#FFF`, `margin:32px 0; max-width:800px`. Text: "Discover how orgs using Dovetail achieved 236% ROI. A Forrester Total Economic Impact™ Study Commissioned By Dovetail, April 2025".
  - Button row (margin-top 32): Primary "Read the report" → `/resources/industry-reports/2025-forrester-TEI-of-Dovetail/`.
- **Image column** (`span 6`; ≤1280 full, below the copy): `media/Contact_sales_slice__3_.png` (1232x1296), 100% width, natural height (580x610 at 1440).
- Measured card size: 1192x615 at 1440, 1152x1559 at 1280, 736x1113 at 768, 358x820 at 390.

## 4. ROI card (SliceContainer)
- **Card:** `border-radius:16px; background:#191919; padding:56px 64px; display:flex; align-items:flex-start; gap:48px` (≤1280 `padding:40px; flex-direction:column; gap:32px`).
- **Icon tile:** 56x56, radius 12, bg `#212121`, `margin-top:4px`, flex centred. It holds a 24px bar-chart svg (`svg/icon-roi-bars.svg`, stroke 2, `#FFF`).
- **Text** (`flex:1`):
  - Eyebrow "236% ROI": Inter 12px/24 w400, `letter-spacing:.08em` (0.96px), uppercase, `#A7A7A7`, margin-bottom 8 (≤1280 **16px**/24, ls 1.28px).
  - `h2` "Measure the revenue impact of Dovetail": H40 (40/48 w500 ls -1; ≤1280 32/40; ≤799 24/32), margin-bottom 8.
  - `p` "Estimate the ROI of faster decisions and fewer wrong turns.": P20 `#A7A7A7`, margin-bottom 32 (≤1280 16/24).
  - Link "Try the ROI calculator" → `/roi-calculator/`: S0.5 text link with arrow, 16/24 w500, 191x26.
- Measured card size: 1192x286 at 1440 and 1152x334 at 1280.

## 7. "From the blog"
- **Heading row** (SliceContainer): flex, `align-items:baseline; justify-content:space-between; gap:16px; wrap`.
  - `h2`: H40 (40/48 w500 ls -1; ≤1280 32/40; ≤799 24/32).
  - Link "View all articles" → `/blog/` (S0.5 arrow link).
- S48→32 spacer.
- **Cards:** SliceGrid, each card `span 4` (≤1280 `span 6`; ≤799 full). Cards: 376 at 1440, 564 at 1280, 736 at 768, 358 at 390.
  - **Image box:** `aspect-ratio:3/2; overflow:hidden; width:100%`. It holds `<a>` (block, radius 8). The `img` is radius 8, `object-fit:cover`, height 100%.
    - The `<a>`'s `::after` draws an inset ring: `box-shadow: inset 0 0 0 1px rgba(255,255,255,.16); border-radius:8px; inset:0`, with `transition: background-color 200ms ease-in-out` (no hover colour is defined).
  - **Text link** (flex column, start-aligned; hover colour `#A7A7A7`):
    - Title wrapper `margin:32px 0` (≤1280 `24px 0 16px`), containing the title H20 (20/28 w500; ≤799 16/24, `overflow-wrap:anywhere`).
    - Tags line: M14 `#A7A7A7`, e.g. "[Ideas]" or "[AI] [Customer intelligence] [Digital Twins]".
  - 3 cards (data `blog`).

## 8. "Live demos"
- Heading row identical to §7: "Live demos" with link "View all demos" → `/live-demos/`.
- S48→32 spacer.
- Grid: `display:grid; grid-template-columns:repeat(3,1fr); gap:32px` (≤1280 2 columns; ≤799 1 column).
- Cards are S5 video cards (same as `/live-demos/`): image 376x212, title H20 margin-top 32, date M14 margin-top 24. They open the YouTube modal with `youTubeId`.
- 3 most recent demos.

## 9. Page CTA
S6, with "Contact sales" and "Try Dovetail free".

## Motion
- List link hover: colour change, instant.
- Arrow links: underline scale 200ms.
- Video cards: S5.
- Blog title hover: colour, instant.
- There are no scroll or load animations.
