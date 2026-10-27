Source: https://dovetail.com/ux-research-plan-template/

# Template: template-landing (`/ux-research-plan-template/`, `/user-persona-template/`, `/research-report-template/`)

All three share one component tree (labels `e1cm5kt*`); I confirmed this with a DOM signature for each route. Theme: **dark**. There's **no** shared final CTA: after the FAQ comes the footer. Data: `src/data/tools/{slug}.json`, with `sections[]` in render order. The section types are `hero`, `logoMarquee`, `centeredIntro`, `split` (with `imageSide`), `checklistGrid` and `faq`. All three pages have the same order: hero → logoMarquee → centeredIntro → split (image right) → split (image left) → split (image right) → checklistGrid → faq. They differ only in copy and images:
- ux-research-plan-template: `Projects.png`, then splits `create-and-share-insights-faster-with-insight-templates.png`, `ai-generated-recruit-plan.png`, `analyze-projects.webp`.
- user-persona-template: `Customer_interviews.png`, then splits `Magic_cluster__inline_.png`, `Channels-AI-generated_themes-product-image.png`, `Contextual_chat.png`.
- research-report-template: `Docs.png`, then splits `ai-generated-docs-labeled.png`, `citations-for-contextual-chat.png`, `instantly-generate-insight-reports-tailored-to-your-needs.png`.

## Geometry (ux-research-plan-template; top y / height)
| # | Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|---|
| 0 | Hero wrapper (grid bg, starts under the nav) | 30 / 1611 | 30 / 1508 | 38 / 1157 | 38 / 976 |
| 1 | spacer 120/64/64 | 1641 / 120 | 1538 / 64 | 1195 / 64 | 1014 / 64 |
| 2 | logoMarquee (2 rows) | 1761 / 252 | 1602 / 251 | 1259 / 251 | 1078 / 251 |
| 3 | spacer 56 | 2013 / 56 | 1853 / 56 | 1510 / 56 | 1329 / 56 |
| 4 | centeredIntro | 2069 / 420 | 1909 / 348 | 1566 / 340 | 1385 / 516 |
| 5 | split (text left, image right) | 2489 / 564 | 2257 / 926 | 1906 / 725 | 1901 / 671 |
| 6 | split (image left) | 3052 / 540 | 3183 / 894 | 2630 / 719 | 2572 / 676 |
| 7 | split (text left) | 3592 / 643 | 4077 / 1115 | 3349 / 836 | 3248 / 697 |
| 8 | spacer 96 | 4235 / 96 | 5192 / 96 | 4186 / 96 | 3945 / 96 |
| 9 | checklistGrid | 4331 / 348 | 5288 / 400 | 4282 / 424 | 4041 / 528 |
| 10 | spacer 96/48/48 | 4679 / 96 | 5688 / 48 | 4706 / 48 | 4569 / 48 |
| 11 | faq (5 items) | 4775 / 538 | 5736 / 606 | 4754 / 583 | 4617 / 607 |
| 12 | spacer 96/48/48 | 5313 / 96 | 6342 / 48 | 5337 / 48 | 5224 / 48 |
| | **Document height** | 6737 | 8352 | 7743 | 7666 |

## 1. Hero wrapper (`div`, a direct child of main)
- `position:relative; margin-top:-88px; padding-top:88px` (it slides under the transparent nav).
- **Grid background:** `background-image: linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px); background-size:48px 48px; background-position:0 0; background-repeat:repeat; transform:translateZ(0); backface-visibility:hidden`.
- **Fades:**
  - Top: absolute `inset:0`, height 143 (≤1280 100), `linear-gradient(0deg, rgba(0,0,0,0) 0%, #0A0A0A 100%)`. It's dark at the very top.
  - Bottom: absolute `inset:auto 0 0`, height 160 (≤1280 140), `linear-gradient(rgba(0,0,0,0), #0A0A0A)`.
- **Contents:**
  - Spacer 96 (≤1280 56).
  - SliceGrid with 2 columns:
    - **Heading column** `span 12`, centred:
      - Eyebrow M14 `#A7A7A7`, mb 32 (e.g. "UX research plan template").
      - H1 w600 `#FFF`, `margin:0 auto`:
        - 56/60 ls -2, `max-width:700px` (3 lines at 1440).
        - ≤1280 40/44 ls -1, `max-width:520px`.
        - ≤799 32/36 ls -0.25, no max-width.
      - P20 `#FFF` `max-width:640px; margin:32px auto` (≤1280 16/24). 4 lines at 1440; placeholder.
      - CTA row centred, mt 32:
        - White "Contact sales" → `/contact-sales/` (125x40).
        - Secondary "Try Dovetail free" → `/auth/signup/` (145x40).
    - **Image column** `2 / span 10` (≤1280 `span 12`): spacer 96 (≤1280 56), then `img` `width:100%; height:auto; display:block; border-radius:12px`.
      - ux plan: `Projects.png` 800x560 (it shows a "Discovery call" UI), 988x692 at 1440, 1152x806 at 1280, 736x515 at 768, 358x251 at 390.
  - Spacer 160 (≤1280 96), overlapped by the bottom fade.

## 2. Logo marquee
Shared D, two rows (6 + 4), heading "Connecting the world's leading teams to their customers".

## 3. Centered intro (section `display:grid` 12-col, `padding:80px 124px; align-items:center`; ≤1280 `padding:48px 64px`; ≤799 `48px 16px`)
- Column `span 12`. Inner box `max-width:724px; margin:0 auto; display:flex; flex-direction:column; align-items:center; text-align:center`.
- Eyebrow M14 `#A7A7A7`, mb 32: "The template".
- H2 H40 (40/48 w500 ls -1; ≤1280 32/40; ≤799 24/32) `#FFF`: e.g. "What a UX research plan covers".
- P16 `#A7A7A7`, `margin-top:16px`, 6 lines at 1440 (placeholder).

## 4. Split sections (same section style as 3: grid, padding 80/124, `align-items:center`)
- **Text left / image right:** text `grid-column:1/span 4`, image `6/span 7`.
- **Image left / text right:** image `1/span 7`, text `9/span 4`.
- At ≤1280 both are `span 12` (stacked). DOM order is preserved, so an image-left section shows the image first on mobile.
- **Text block** (flex column):
  - Eyebrow M14 `#A7A7A7` mb 32 ("Objectives", "Participants", "From plan to insights").
  - H2 H40 (2 lines at 1440).
  - P16 `#A7A7A7` `margin-top:16px` (10 lines at 1440; placeholder).
- **Image:** `width:100%; height:auto; display:block; border-radius:12px`, 682 wide at 1440.
  - ux plan sources: `create-and-share-insights-faster-with-insight-templates.png` (5888x3080), `ai-generated-recruit-plan.png` (2048x1056), `analyze-projects.webp` (1232x872).
- The text block is vertically centred against the image.

## 5. Checklist grid (SliceGrid)
- **Row 1** `span 7` (≤1280 `span 12`):
  - H2 H40 "Three things to nail before your first session" (2 lines at 1440).
  - P16 `#A7A7A7` `margin-top:16px` "Most studies that drift skipped one of these."
- **Row 2** `span 12`: spacer 96, then a grid `repeat(3,1fr); gap:48px` (≤1280 `repeat(2,1fr)` gap 32; ≤799 `1fr` gap 32).
  - Item: flex column, gap 8; H20 title (≤799 16/24) and P16 `#A7A7A7`. Items are one sentence each, verbatim in data.

## 6. FAQ
Shared G, with 5 questions on the ux plan page.

## Motion
None besides shared marquee/FAQ/button behaviour. There are no load or scroll animations (MutationObserver verified). The grid background is static.
