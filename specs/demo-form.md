Source: https://dovetail.com/contact-sales/

# Template: demo-form (`/contact-sales/`, `/request-a-demo/`)

The two routes are structurally identical: same DOM signature, same 166 CSS rules, same form. Only the copy differs (eyebrow/H1 are the same; intro, bullets and meta description differ). Data lives in `src/data/tools/contact-sales.json` and `src/data/tools/request-a-demo.json`. Theme: **dark**. The page ends with the shared final CTA (dark) and the footer. Shared pieces (buttons, logo marquee, testimonial, spacers) are in `specs/tools-shared.md`.

## Page order and geometry (top y / height in px)

| # | Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|---|
| 0 | spacer (96/56/56) | 118 / 96 | 118 / 56 | 126 / 56 | 126 / 56 |
| 1 | Hero + form grid | 214 / 1392 | 174 / 2248 | 182 / 2232 | 182 / 2516 |
| 2 | spacer 200/96/96 | 1606 / 200 | 2422 / 96 | 2414 / 96 | 2698 / 96 |
| 3 | Logo marquee (2 rows) | 1806 / 252 | 2518 / 251 | 2510 / 251 | 2794 / 251 |
| 4 | spacer | 2058 / 200 | 2769 / 96 | 2761 / 96 | 3045 / 96 |
| 5 | Forrester TEI stats + image | 2258 / 615 | 2865 / 1573 | 2857 / 1279 | 3141 / 942 |
| 6 | spacer | 2873 / 200 | 4438 / 96 | 4136 / 96 | 4082 / 96 |
| 7 | "See the platform in action" heading | 3073 / 164 | 4534 / 108 | 4232 / 92 | 4178 / 128 |
| 8 | Feature grid (5 items) | 3237 / 458 | 4642 / 627 | 4324 / 1033 | 4306 / 1105 |
| 9 | spacer | 3695 / 200 | 5269 / 96 | 5357 / 96 | 5411 / 96 |
| 10 | Featured testimonial (Mariana Bartholomeu) | 3895 / 560 | 5365 / 560 | 5453 / 362 | 5507 / 501 |
| 11 | spacer (last child: 160 ≥1281, else 200) | 4455 / 160 | 5925 / 200 | 5815 / 200 | 6008 / 200 |
| | Final CTA + footer (shared) | | | | |
| | **Document height** | 6284 | 8427 | 8574 | 8737 |

## 1. Hero + form (SliceGrid, `position:relative`)

**Left column** (`grid-column: span 5`; ≤1280 `span 8`; ≤799 `1/-1`). At 1440 it's 478 wide at x=124.

The column holds a block wrapper: `display:flex; flex-direction:column; gap:48px; justify-content:center; margin:auto`.
- **Head block** (plain div):
  - Eyebrow M14 `#A7A7A7`, `margin-bottom:32px`: "Talk to Sales" (rendered uppercase).
  - H1: 64/68 w600 ls -2 `#FFF` (≤1280 **48/52 ls -1**; ≤799 **32/36 ls -0.25**). 2 lines at 1440 (136 tall).
  - Intro P20 `#FFF` (≤1280 16/24), `margin:32px 0 0; max-width:800px`. It's 6 lines at 1440. Placeholder: 250 chars on contact-sales, 231 on request-a-demo.
- **Bullet list** `ul` (no margin or padding). Each `li` is `display:flex; gap:24px; margin-bottom:32px`:
  - Marker: a 12x12 square, `background:#FFF; margin-top:10px; min-width:12px`.
  - Text div:
    - Title P20 w500 ls -0.25 `#FFF` (≤1280 stays 20/28; ≤799 16/24).
    - Description P16 `#A7A7A7`, `max-width:506px`.
  - Measured `li` heights at 1440: 76 / 76 / 52 / 76 (two-line descriptions are 48 tall).

**Right column** (`grid-column: 7/-1`; ≤1280 `1/-1`). It's 580 wide at x=736. Wrapper `position:relative` (≤1280 `margin:48px 0`).

### Form `<form id="mql-on-submission" novalidate>`
- Box: `background:#1E1E1E` (rgb 30,30,30), `border:1px solid rgba(255,255,255,.08); border-radius:8px; display:flex; flex-direction:column; gap:24px; padding:32px` (≤1280 `padding:32px 20px`).
- **Field block:** `display:flex; flex-direction:column`.
  - Label: `display:flex; font:400 16px/24px Inter; letter-spacing:0; margin:0 0 8px; color:#FFF`. A required `*` follows in `<span aria-hidden>` with `margin-left:2px`.
- **Name row:** `display:flex; gap:16px` (≤1280 `flex-direction:column`). It holds First name + Last name, each 221 wide at 1440.
- **Controls** (`input`, `select`, `textarea`, all `appearance:none`):
  - `width:100%; height:40px; box-sizing:border-box; padding:10px 16px`.
  - `background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.48); border-radius:8px`.
  - `color:#FFF; font:400 16px/28px Inter; letter-spacing:-0.5px; text-overflow:ellipsis; transition:300ms` (all properties, ease).
  - Placeholder `#A7A7A7`.
  - `select`: `padding:8px 16px; font-weight:500; line-height:24px; cursor:pointer`. Options have `background:#1E1E1E`. No custom chevron is drawn: the live select has `appearance:none` and **no arrow** (see the screenshot: plain box with "Please Select").
  - `textarea`: `height:200px; resize:vertical`.
- **States:**
  - **Default:** as above.
  - **Hover and focus:** `background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.64)` (300ms).
  - **Focus-visible:** the global rule `outline: currentColor solid 2px; outline-offset:2px` applies, so you get a white 2px ring 2px outside. On mouse focus Chromium reported `outline: 3px solid #FFF; offset 0`. Use the global focus-visible rule.
  - **Error** (after submit, with `novalidate`, so JS validation): the control gets `aria-invalid="true"` and `aria-describedby="sf-{name}-error"`. **The border/background do not change.** A message `div#sf-{name}-error` appears under the control: `color:#FF4400` (rgb 255,68,0), `font:500 14px/20px Inter; margin-top:4px`.
    - Text "Please complete this required field." for every empty required field (all fields except phone and message).
    - For email with a malformed value: "Please enter a valid email address."
    - Errors render on all invalid fields at once, and the form height grows by 24px per message.
    - **Not measured:** when errors clear (on change or on next submit).
  - **Disabled:** no field is ever disabled on the live page. If needed, use the submit's `:disabled` rule (`opacity:.7; cursor:not-allowed`).
- **Consent block:** `p` P12 (12/16 w400 `#FFF`), 3 lines at 1440. Placeholder is 222 chars; it ends with links "Terms of Service" → `https://dovetail.com/legal/user-terms-of-service/` and "Privacy Policy" → `https://dovetail.com/privacy/privacy-policy/` (both `target=_blank`, `text-decoration:underline`).
- **Submit:** "Submit". Form submit button style is in shared B: full width, 38 tall, white, hover `#CECECE` 150ms.
- **Fields** (labels, names, ids, placeholders, options and autocomplete are in the data file):
  - email: type email, inputmode email, placeholder "jane@acmeinc.com"
  - firstname / lastname (one row)
  - company, jobtitle
  - selects: company_size, bant1, bant2, bant3, bant4
  - phone: tel, optional
  - message: textarea, optional
- **Build note:** keep the form static and non-submitting. On submit, run the same client validation and show the error states; don't post anywhere. Don't load HubSpot/GTM scripts.

## 2. Logo marquee
Shared D (two rows): 6 + 4 logos, heading "Connecting the world's greatest companies to their customers". Rows container min-height 168 (≤1280 148).

## 3. Forrester TEI (SliceGrid)
- **Left** (`span 5`; ≤1280 `span 10`; ≤799 `1/-1`):
  - H2 with the hero H1 style (64/68 w600 ls -2; ≤1280 48/52; ≤799 32/36): "Forrester’s Total Economic Impact™". 3 lines at 1440.
  - P20 `#FFF` (`margin-top:32px; max-width:800px`).
  - Spacer 64 (≤1280 32).
  - Stat grid: `display:grid; grid-template-columns:repeat(4,1fr); gap:32px` (≤1280 gap 24). Each stat is `span 2` (≤799 `1/-1`), so it's 2×2 on desktop and tablet and stacked on mobile.
    - Value: Inter 500 40/48 ls -1 `#FFF`, `margin-bottom:8px` (≤1280 32/40 ls -0.25; ≤799 24/32).
    - Label: P16 `#A7A7A7`.
    - Values / labels: "236%" ROI in just six months · "66%" faster shipping · "30%" increase in team capacity · "30 hours" saved per user, per week.
- **Right** (`7 / span 6`; ≤1280 `1/-1`): img `Contact_sales_slice__3_.png` (1232x1296), rendered 580x610 at 1440, 736x774 at 768, 358x377 at 390. `object-fit:contain`, no radius.

## 4. "See the platform in action" (SliceGrid, column `span 9`)
H2 with the hero H1 style ("See the platform in action", 1 line at 1440), then a spacer 96 (≤1280 56).

## 5. Feature grid (SliceGrid, row gap 32 / column gap 32)
- Each item is `span 4` (≤1280 `span 6`; ≤799 `1/-1`). 5 items → 3 + 2 at 1440 and 2+2+1 at 1280.
- Icon SVG 64x64 (`margin-bottom:16px`), white strokes. Files: `/assets/tools/svg/contact-feature-{1..5}.svg`.
- H3: 20/28 w500 ls -0.25 `#FFF`, `margin-bottom:16px` (≤799 16/24).
- P16 `#A7A7A7`, `max-width:456px`.
- Titles: Effortless, end-to-end intelligence / From signals to strategy / From insight to action / Built for every team / Proven business impact. Descriptions are 1 sentence each (verbatim in data).

## 6. Featured testimonial
Shared F, linking to `/customers/itau-unibanco/`. It's Mariana Bartholomeu, "Senior Designer, Research Ops", with avatar `Frame_1948762769.png` (80x80) and the Itaú Unibanco white logo. The quote is 221 chars including curly quotes (placeholder in data) and runs 5 lines (240px) at 1440.

## Motion and interaction summary
| Thing | Trigger | Spec |
|---|---|---|
| Field bg/border | hover/focus | 300ms ease, all properties |
| Submit | hover | bg #FFF→#CECECE 150ms |
| Error message | submit | appears instantly (no animation) |
| Logo marquee | always | GSAP 60s per set, ltr/rtl rows |
| Testimonial | hover | cursor tooltip, 150ms opacity |
| Page | load | no entrance animations, no scroll reveals |
