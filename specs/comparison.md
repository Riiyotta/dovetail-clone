Source: https://dovetail.com/dovetail-vs-marvin/

# Template: comparison (`/dovetail-vs-{competitor}/`, 16 routes)

All 16 top-level comparison pages share one component tree. The emotion labels `e1e0z2gl*` are identical on every page, and I confirmed this with a DOM signature for each page. They differ only in copy, images and **which optional slices are present** (see the variant table). Theme: **dark**. There's **no** shared "The best never guess" final CTA on these pages: the last slice is the FAQ, followed directly by the footer. Data: `src/data/tools/dovetail-vs-{competitor}.json`. Each file has a `sections[]` array in render order with a `type` per slice, and the builder should render exactly that order.

The "17th" comparison is under `/resources/dovetail-vs-*` (aurelius, enterpret, marvin, qualtrics). Those four use the **article** template (`specs/article.md`), not this one.

## Variants

| Slice order (type) | Present on |
|---|---|
| hero → heroImage → logoMarquee (1 row, 8 logos) → intro → teiCard | all 16 |
| testimonial #1 | all except chattermill, enterpret, qualtrics, thematic |
| chooseGrid → compareIntro → comparisonTable → awardsMarquee | all 16 |
| testimonial #2 (Breville) | marvin only |
| customerStory (SmartRecruiters) | condens, looppanel, maze, notably |
| migrate → trialCta → faq | all 16 |

The structural differences are handled by the `sections[]` order in each data file.

## Geometry (dovetail-vs-marvin; top y / height)

| # | Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|---|
| 0 | spacer 96/56/56 | 118 / 96 | 118 / 56 | 126 / 56 | 126 / 56 |
| 1 | hero | 214 / 496 | 174 / 446 | 182 / 430 | 182 / 656 |
| 2 | spacer 96/48/48 | 710 / 96 | 620 / 48 | 612 / 48 | 838 / 48 |
| 3 | heroImage (full-bleed) | 806 / 571 | 668 / 508 | 660 / 305 | 886 / 155 |
| 4 | spacer 160/96/96 | 1377 / 160 | 1176 / 96 | 964 / 96 | 1040 / 96 |
| 5 | logoMarquee | 1537 / 148 | 1272 / 167 | 1060 / 167 | 1136 / 167 |
| 6 | spacer 160/96 | 1685 / 160 | 1439 / 96 | 1228 / 96 | 1304 / 96 |
| 7 | intro (split) | 1845 / 659 | 1535 / 1803 | 1324 / 1306 | 1400 / 995 |
| 8 | spacer 160/96 | 2504 | 3338 | 2630 | 2394 |
| 9 | teiCard | 2664 / 311 | 3434 / 915 | 2726 / 678 | 2490 / 504 |
| 10 | spacer 160/96 | | | | |
| 11 | testimonial | 3135 / 560 | 4444 / 560 | 3500 / 362 | 3091 / 533 |
| 12 | spacer 160/96 | | | | |
| 13 | chooseGrid | 3855 / 1160 | 5100 / 1860 | 3958 / 4133 | 3719 / 2365 |
| 14 | spacer 160/96 | | | | |
| 15 | compareIntro | 5174 / 160 | 7056 / 152 | 8187 / 144 | 6180 / 272 |
| 16 | spacer 64/56/56 | | | | |
| 17 | comparisonTable | 5398 / 930 | 7264 / 954 | 8387 / 998 | 6508 / 1546 |
| 18 | spacer 96 | | | | |
| 19 | awardsMarquee | 6424 / 72 | 8314 / 72 | 9481 / 72 | 8150 / 72 |
| 20 | spacer 160/96 | | | | |
| 21 | testimonial #2 | 6656 / 560 | 8482 / 560 | 9649 / 362 | 8318 / 501 |
| 22 | spacer 160/96 | | | | |
| 23 | migrate | 7376 / 508 | 9138 / 526 | 10107 / 758 | 8915 / 980 |
| 24 | spacer 200/96 | | | | |
| 25 | trialCta (blue) | 8084 / 812 | 9760 / 702 | 10961 / 700 | 9991 / 700 |
| 26 | spacer 160/96 | | | | |
| 27 | faq | 9056 / 639 | 10558 / 707 | 11757 / 681 | 10787 / 801 |
| 28 | spacer 160/96 (last child) | | | | |
| | **document height** | 10624 | 12764 | 14658 | 13808 |

## 1. Hero (SliceGrid, one column `span 12`, text-align centre)
- Eyebrow M14 `#A7A7A7`, `margin-bottom:32px`, centred: "{Competitor} Alternative".
- H1 w600, `max-width:885px; margin:0 auto`, centred, `#FFF`:
  - **56/60 ls -2** at 1440 (2 lines, 120 tall).
  - ≤1280 **40/44 ls -1**.
  - ≤799 **32/36 ls -0.25** (3 lines at 390).
- Intro P20 `#FFF` (≤1280 16/24), `max-width:925px; margin:32px auto`, centred. 4 lines at 1440; placeholder in data (about 330–370 chars).
- CTA row (centred, gap 8, margin-top 32):
  - White primary "Start a 60-day free trial" → `#trial-cta`. The live link has `target=_blank`, so it opens the page in a new tab on its anchor; reproduce the anchor and drop the new-tab behaviour if you prefer, and flag it.
  - Secondary "Get a migration plan" → `/contact-sales/migration-plan/`.
  - Measured 190x40 and 168x40 (38 tall at ≤1280). At 390 they wrap onto 2 lines, centred.
- Note block (`margin-top:64px`, `#FFF`, centred):
  - Title Inter 500 16/24, `margin-bottom:4px`: "Moving from {Competitor}? We'll help you map the fastest path to Dovetail."
  - Sub `p` 13px/normal w400: "No credit card required. Free migration included."

## 2. Hero image (full-bleed `<img>`, a direct child of main)
- `display:block; width:1512px; max-width:100%; margin:0 auto` (≤799 `width:100%`).
- Rendered 1440x571 at 1440 (source 3024x1200, e.g. `Centralize_fragmented_data.png`), 1280x508, 768x305, 390x155.
- The image already contains the faded grid, floating app icons and app chrome. It's a single raster with no layered parts.

## 3. Logo marquee (single row)
Shared D with the `singleRow` variant: 8 logos, `min-height:64px`, heading "Connecting the world's leading teams to their customers" (≤1280 wraps to 2 lines, max-width 400).

## 4. Intro split (SliceGrid with `align-items:center`)
- **Left** `grid-column:1/span 5` (≤1280 `span 12`):
  - H2 H40 (40/48 w500 ls -1; ≤1280 32/40; ≤799 24/32), `#FFF`, `max-width:488px`.
  - Spacer 32.
  - P16 `#A7A7A7`, `max-width:498px`, then another spacer 32 and a second P16. There are 2 paragraphs on marvin; it varies by page.
  - CTA row (margin-top 32).
  - At 1440 the left block is vertically centred against the image (starts at y=1903 within a 1845..2504 row).
- **Right** `7/span 6` (≤1280 `span 12`): img `width:100%; display:block`, no radius (e.g. `continuous_AI_analysis-4.png`, 1232x1400 → 580x659).

## 5. TEI card (SliceGrid, column `span 12`)
- **Card:** `background:#141414; border:1px solid rgba(250,250,250,.08); border-radius:16px; overflow:hidden`.
- **Inner:** `display:flex; align-items:center; gap:32px` (≤1280 `flex-direction:column`).
- **Text side** `flex:7 1 0`, `padding:64px 32px 64px 64px` (≤1280 `48px 48px 0 64px`; ≤799 `32px 32px 0`):
  - Eyebrow M14 `#A7A7A7`, mb 24: "Proven business impact".
  - Text H24-ish: Inter 500 24/32 ls -0.5 `#FFF`, `max-width:640px; margin:0 0 16px` (≤1280 20/28 ls -0.25; ≤799 18/24).
  - Link "Download the Forrester Total Economic Impact™ Study →" → `/resources/industry-reports/2025-forrester-TEI-of-Dovetail/`:
    - Text 16/24 w500 `#A7A7A7`, `text-decoration: underline 1px transparent; text-underline-offset:1.5px`.
    - `::after` underline: `bottom:2px`, 1px, `#A7A7A7`, `scaleX(0)`, origin left.
    - Hover/focus: color `#FFF`, `::after` scaleX(1). `transition: color 200ms ease-out` and `transform 200ms ease-out`.
- **Image side** `flex:5 1 0; align-self:flex-end; min-width:0`: `forrester-tei-module.png` (1016x664) at width 100%, rendered 442x289 at 1440 and flush to the card's bottom-right.
- **Card heights:** 311 at 1440; 915 at 1280 (stacked); 678 at 768; 504 at 390.

## 6. Testimonial(s)
Shared F. Data gives href, avatar, logo, name and role. The quote is a placeholder with its char count.

## 7. Choose grid (SliceGrid, column `span 12`)
- Header:
  - H2 H40, `max-width:640px; margin:0 0 16px`.
  - P16 `#A7A7A7` `max-width:640px`.
  - CTA row (mt 32).
  - Spacer 64 (≤1280 56).
- **Grid:** `display:grid; grid-template-columns:repeat(3,1fr); gap:48px 32px` (≤1280 `repeat(2,1fr)`, gap 32; ≤799 `1fr`, gap 32).
- **Card:** `display:flex; flex-direction:column; gap:24px`.
  - Image frame: `background:rgba(250,250,250,.04); border:1px solid rgba(250,250,250,.08); border-radius:12px; overflow:hidden`. Inside it the img is `display:block; width:100%; border-radius:8px` (800x560 sources → 374x262 at 1440).
  - Text: flex column, gap 8.
    - Title H20 (20/28 w500 ls -0.25; ≤799 16/24).
    - Text P16 `#A7A7A7`. These are single sentences, verbatim in data; longer ones are placeholders.
- The cards have no hover state.

## 8. Compare intro (SliceGrid, `span 12`)
- H2 H40 "How Dovetail compares to {Competitor}", `margin:0 0 16px`.
- P16 `#A7A7A7` `max-width:820px` (4 lines at 1440; placeholder).

## 9. Comparison table (`div` grid; not a `<table>`)
- **Header row:** `display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(250,250,250,.08); border-bottom:1px solid rgba(250,250,250,.08)`.
  - The 2nd child (the Dovetail column) gets `background-color:rgba(250,250,250,.06)`.
  - The first header cell is empty.
  - Header cells: `display:flex; align-items:center; justify-content:center; padding:24px 16px; text-align:center; font:500 20px/28px Inter; letter-spacing:-0.25px; color:#FFF` (≤799 `font-size:14px; padding:16px 8px`). Labels: "Dovetail", "{Competitor}". Header height is 76 (60 at ≤799).
- **Body rows:** the same 3-col grid with `border-bottom:1px solid rgba(250,250,250,.08)`. The 2nd child also has bg `rgba(250,250,250,.06)`, so the Dovetail column is a continuous lighter band.
  - Label cell: `display:flex; align-items:center; padding:20px 24px; font:500 16px/24px Inter; color:#FFF` (≤799 `font-size:14px; padding:16px 12px`). Labels can wrap to 2 lines.
  - Value cell: `display:flex; align-items:center; justify-content:center; padding:20px 16px`.
    - **Tick:** 20x20 SVG (`/assets/tools/svg/icon-check-24.svg`, viewBox 24, stroke currentColor 2, square caps, path `m17 9-7 7-3-3`), color `#FFF`.
    - **Text value:** Inter 500 16/24 `#FFF` centred (≤799 14px).
  - Row height: 65 for one-line rows (20+24+20+1), 89 for two-line rows, at 1440.
- **No cross icons exist** on any of the 16 pages. The Dovetail column is always a tick (248 ticks total). The competitor column is a tick or a short text value; all values are in data `rows[].cells[]`.
- No hover, no sticky header, no horizontal scroll. At 390 the three columns stay 1/3 each, and long text wraps to 3 lines.

## 10. Awards marquee
Shared E (rtl), 72px tall.

## 11. Customer story (condens, looppanel, maze, notably only)
- SliceGrid with `align-items:center`.
- **Left** `1/span 5`:
  - H2 H40 `max-width:488px`, e.g. "SmartRecruiters uses Dovetail to make research easier to find, share, and build on".
  - Stat list `ul`: `display:flex; flex-direction:column; gap:16px; list-style:none; margin:32px 0 0; padding:0`. Each `li` has `border-left:2px solid rgba(250,250,250,.2); padding-left:16px`, with the stat text in H20 `#FFF`.
  - Quote `p` P16 `#FFF` at `opacity:.64` (placeholder).
  - Attribution `p` P16 `#FFF` ("Danielle Reid, Senior Designer Manager" + "SmartRecruiters, an SAP company").
  - CTA row: "Start a 60-day free trial" and "Book a demo" → `/contact-sales/`.
- **Right** `7/span 6`: image (e.g. `Condens_smart_recruiters_section.png`). It wasn't measured separately; the layout is the same as the intro split.

## 12. Migrate (SliceGrid)
- **Row 1** column `span 7` (≤1280 `span 12`):
  - H2 H40 (2 lines at 1440).
  - Spacer 32.
  - P16 `#A7A7A7` (3 lines).
  - CTA row (mt 32).
- **Row 2** column `span 12`: spacer 64 (≤1280 56), then a grid `repeat(4,1fr); gap:48px 32px` (≤1280 2 cols; ≤799 1 col, gap 32).
  - Each feature: flex column, gap 8.
    - Icon 24x24 `#FFF`: `/assets/tools/svg/migrate-*.svg`.
    - Title H20.
    - Text P16 `#A7A7A7`.
  - Features: Guided setup / Searchable history / Unlimited viewers / Connected workflows.

## 13. Trial CTA (`id` target `#trial-cta`; blue)
- **Outer:** `position:relative; background:#0044FF url(/assets/marketing/solution-trial-grid-bg.svg) center/cover; overflow:hidden; min-height:700px; display:flex; flex-direction:column; justify-content:center`. It's 812 tall at 1440 and 700–702 elsewhere.
- **Four edge fades** (absolute, `pointer-events:none`):
  - top: `linear-gradient(#0044FF, rgba(0,68,255,0))`, height 180 (≤1280 120).
  - bottom: `linear-gradient(0deg, #0044FF, rgba(0,68,255,0))`, height 180 (≤1280 120).
  - left: `90deg`, width 108.
  - right: `270deg`, width 108.
- **SliceGrid** with `padding:164px 124px` (stays 164/124 at ≤1280; ≤799 `80px 16px`). Column `2/span 10` (≤1280 `span 12`), flex column, centred, text-align centre:
  - H2 H64-ish: 64/68 w600 ls -2 `#FFF`, `max-width:827px; margin:0 0 32px; display:flex; flex-wrap:wrap; justify-content:center; gap:0 16px` (≤1280 48/52 ls -1; ≤799 32/36). 3 lines at 1440.
  - P20 `#FFF` `max-width:860px; margin:0 0 32px` (≤1280 16/24).
  - CTA row centred, gap 8, `margin-bottom:64px`:
    - White "Start a 60-day free trial" → `/auth/signup?promo=ENTERPRISE_SOLUTIONS_2026_D60` (new tab).
    - Secondary "Get a migration plan". Its bg is `rgba(255,255,255,.08)` over blue.
  - Checklist `ul`: `display:flex; flex-wrap:wrap; justify-content:center; gap:8px 16px; max-width:851px; list-style:none`. Each `li` is `display:flex; align-items:center`, with:
    - A 24px check SVG (`icon-check-trial-24.svg`) `#FFF` with `margin-right:4px`.
    - Text 14/18 w600 `#FFF` (≤1280 14/16).
    - Items: "60 days full access, no feature limits" · "Onboarding support from a research specialist" · "Free migration from your current tool" · "Full export if you decide not to continue". That's 2 rows at 1440.

## 14. FAQ
Shared G. There are 6 questions per page (verbatim in data); answers are placeholders.

## Motion
| Thing | Spec |
|---|---|
| Logo marquee / awards marquee | GSAP linear, 60s per item set, ltr (logos) / rtl (awards); pauses on focus-in |
| Testimonial hover | cursor tooltip (shared F) |
| TEI link hover | color + underline scaleX 200ms ease-out |
| Buttons | 200ms color/bg |
| FAQ | chevron rotate instant; answer expand 300ms (see shared G flag) |
| Load / scroll | **none**. No entrance animations, scroll reveals or parallax (no IntersectionObserver-driven classes observed). |
