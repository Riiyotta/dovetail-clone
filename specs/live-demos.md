Source: https://dovetail.com/live-demos/

# Template: live-demos (`/live-demos/`)

Data: `src/data/company/live-demos.json`. Shared components: `specs/company-shared.md`.

Page chrome: standard banner and nav. The footer is the final CTA (§10) followed by the footer.

`<main>` heights:

| Viewport | `<main>` height |
|---|---|
| 1440 | 1,588 |
| 1280 | 2,132 |
| 768 | 4,034 |
| 390 | 2,927 |

## 1. Hero
- **Outer:** `position:relative; overflow:visible`.
- **Background image** `media/Frame_1948763217.png` (3024x1026):
  - `position:absolute; top:0; left:0; right:0; z-index:0; pointer-events:none; display:block`, full width, natural height. That's 1440x488.6 at 1440 and 1280x434 at 1280.
  - **Hidden at ≤799.**
- **Top fade:** absolute, `inset:0 0 auto`, 143 tall, `linear-gradient(0deg, rgba(0,0,0,0) 0%, #0A0A0A 100%)`, z 1.
- **Bottom fade:** absolute, `left:0; right:0; bottom:-160px`, 238 tall, `linear-gradient(180deg, rgba(0,0,0,0), #0A0A0A)`.
- **Content** (`position:relative; z-index:1`):
  - HERO spacer (96 / 56 / 56).
  - SliceContainer:
    - Eyebrow "Live demos": M14 `#A7A7A7`.
    - `h1` "Dovetail in action": H80 with `margin:32px 0` (80/84 ls -2; ≤1280 64/68; ≤799 40/44 ls -1).
    - Intro `p`: P20 `#FFF`, `max-width:614px` (≤1280 16/24). Text (one sentence pair, kept verbatim in data): "Get more from your data. Learn the workflows, features, and tips that help teams move faster with customer insight."
  - Measured content block: 319.6 tall at 1440 and 255.6 at 1280.
- S96→32 spacer.

## 2. Demo grid
- SliceGrid with `gap:96px 32px` (≤1280 `64px 24px`; ≤799 4 columns, `64px 24px`).
- Cards are `span 4` (≤1280 `span 6`; ≤799 full width).
- Each card is an S5 video card (button):
  - Image box: `flex:0 1 544px; min-width:364px` (≤1280 unset), radius 8.
  - Image: border 1px `rgb(49,49,49)`, radius 4, 16:9 (800x450). Sizes: 376x212 at 1440, 564x318 at 1280, 736x415 at 768, 358x202 at 390.
  - 64px white play tile, centred.
  - Title `p`: H20 `#FFF`, margin-top 32, left-aligned (≤799 16/24). This is the demo description, a single sentence.
  - Date: M14 `#A7A7A7`, margin-top 24 (e.g. "July 14, 2026").
- Click opens the S5 YouTube modal with the demo's `youTubeId`.
- Hover: the card's `::after` darkens to `rgba(0,0,0,.2)` over 200ms ease-in-out.
- 6 demos (3 rows at 1440, 3 rows at 1280, 6 rows at ≤799).

## 3. Footer prompt (last grid row, column `1 / -1`)
- `h2` "Can't see the demo you're looking for?": H24 `#FFF` (24/32 w500 ls -0.5; ≤1280 20/28; ≤799 18/24).
- Link "Request a demo" → `/request-a-demo/`:
  - `margin-top:8px`, inline-flex.
  - Text 20/28 w500 ls -0.25 `#A7A7A7` (≤799 16/24), followed by a 24px arrow icon in `#A7A7A7`.
  - `text-decoration: underline 1px transparent` with an `::after` underline (1px `#FFF`, `scaleX(0)` → `scaleX(1)` on hover, `transform 200ms ease-out`, origin left).
- S200-fixed spacer (160 at ≥1281 as last child; 200 below).

## Motion
- Card hover darken (200ms).
- Modal (S5).
- Link underline (200ms).
- There are no load or scroll animations.

## Gaps
- The YouTube embeds are third-party. Build the modal with an iframe or with a poster only.
