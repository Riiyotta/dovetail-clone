Source: https://dovetail.com/resources/industry-reports/2025-forrester-TEI-of-Dovetail/

# Template: resources-report (`/resources/industry-reports/2025-forrester-TEI-of-Dovetail/`)

Data: `src/data/company/resources/industry-reports/2025-forrester-TEI-of-Dovetail.json`. Shared components: `specs/company-shared.md`.

Page chrome: standard banner and nav (no header spacer; main starts at y=118). The page has its own CTA (S6, single button), then the **footer only**.

`<main>` heights:

| Viewport | `<main>` height |
|---|---|
| 1440 | 1,860 |
| 1280 | 1,767 |
| 768 | 1,719 |
| 390 | 1,357 |

## 1. Hero + gated form (SliceGrid)
HERO spacer (96 / 56 / 56), then the grid.

**Copy column** (`span 5`, 478 at 1440; ≤1280 `span 8`; ≤799 full):
- Container: flex column, gap 48, `justify-content:center; margin:auto`. It is vertically centred against the form column (716 tall at 1440).
- `h1` "236% ROI unlocked with Dovetail": H64 (≤1280 48/52; ≤799 32/36).
- `p`: P20 `#FFF`, `margin-top:32px; max-width:800px`. Placeholder, 242 chars.
- `ul` (no margin or padding). Each `li` is flex (gap 24, margin-bottom 32):
  - A 12x12 white square (`margin-top:10px`).
  - A `p`: H20 `#FFF` (still 20/28 at 1280; 16/24 at ≤799).
  - 3 bullets, verbatim in the data.

**Form column** (`7 / -1`, 580 at 1440, x=736; ≤1280 full width, below the copy):
- Static non-submitting form, styled as the S13 "boxed" HubSpot variant. Measured 580x490 at 1440, 1152x562 at 1280 and 736x578 at 768.
- Fields:
  - Row 1 (fieldset, flex, gap 16; stacks at ≤1280):
    - "First name*": text, placeholder "Jane".
    - "Last name*": text, placeholder "Doe".
  - "Company email*": email, "jane@company.com".
  - "Job title*": text, "Product manager".
  - Legal consent rich text: 12/16, placeholder 252 chars.
  - Submit "Download now": full width, white.
- The required marker is a `*` span after the label (16/24).
- Wrapper: `position:relative; margin:0 !important` (≤1280 `margin:48px 0`).

## 2. Logo marquee strip
- **Section:** SliceContainer with `margin:0 56px; max-width:1328px`, flex column, centred (1328x252 at 1440).
- **Eyebrow** "Connecting the world's greatest companies to their customers": M14 `#FFF`, centred, `margin-bottom:64px; min-height:20px` (≤1280 `max-width:400px`, wraps to 2 lines).
- **Rows container:** `width:100%; overflow:hidden; position:relative; display:flex; flex-direction:column; gap:40px; min-height:168px` (≤1280 gap 20, min-height 148). Measured 1080 wide at 1440.
  - Edge fades:
    - Left: 180 wide (≤1280 60), `linear-gradient(270deg, transparent, #0A0A0A)`.
    - Right: mirrored.
- **Two rows,** each `height:64px; opacity:.32`. Each row is an S11 GSAP Marquee (gap 80 → item padding 40 / ≤1280 20; 60s per set) of 142x64 logo boxes (white logo SVGs, `object-fit:contain`):
  - Row 1: `direction:"ltr"`, 6 logos (Breville, Atlassian, Notion, Okta, AWS, Toyota).
  - Row 2: `direction:"rtl"`, track `left:120px`, 4 logos (Qantas, NCRVoyix, ASML, Zapier).

## 3. Page CTA
- S200 spacer (sibling), then the S6 section: `h2` "Turn customer feedback into product innovation" (H64, max 712) and **only** the primary "Contact sales" → `/contact-sales/`.
- S120 spacer (120 / 96 / 96).

## Motion
- Marquees (60s per set, linear, infinite; rows move in opposite directions).
- Inputs: 300ms bg/border on hover and focus.
- Submit hover `#CECECE` (150ms).

## Gaps
- At 390 the HubSpot form had not rendered (0 height) during measurement, so its mobile height is unmeasured. Use the ≤1280 stacked layout with `padding:32px 20px` (from CSS).
- HubSpot validation and submitted states come from CSS rules only (S13); I didn't trigger them.
