Source: https://dovetail.com/b2bsaasy/

# Template: podcast (`/b2bsaasy/`)

Data: `src/data/company/b2bsaasy.json`. Shared components: `specs/company-shared.md`.

Page chrome: standard banner and nav. The page has its own CTA (S6, b2bsaasy variant), then the **footer only**.

`<main>` heights:

| Viewport | `<main>` height |
|---|---|
| 1440 | 2,621 |
| 1280 | 2,554 |
| 768 | 3,757 |
| 390 | 3,135 |

## 1. Hero + episodes (one GridBackground block)
- **Outer:** GridBackground (S12, 48px lines), `position:relative`. Measured 1,454 tall at 1440.
- **Top fade:** 147 tall, `inset:0 0 auto`, `linear-gradient(0deg, transparent, #0A0A0A)`.
- **Bottom fade:** 120 tall at `bottom:0`, `linear-gradient(180deg, transparent, #0A0A0A)`.
- HERO spacer (96 / 56 / 56).
- **SliceGrid** with `gap:96px 32px` (≤1280 `64px 24px`; ≤799 4 columns, `64px 24px`):
  - **Intro** (column `1 / -1`):
    - Eyebrow "Podcast": M14 `#A7A7A7`.
    - `h1` "B2B SaaSy": H80 with `margin:32px 0` (≤1280 64/68; ≤799 40/44).
    - `p`: P20 `#FFF`, `max-width:614px` (≤1280 16/24). Placeholder, 137 chars.
  - **4 episode cards,** each `span 4` (≤1280 `span 6`; ≤799 full). Each card is an `<a>` (block, no underline, `target=_blank`) to its Spotify episode:
    - Image box: `aspect-ratio:16/9; border:1px solid rgb(49,49,49); border-radius:4px; overflow:hidden`. Sizes: 376x211.5 at 1440, 564x317 at 1280, 736x414 at 768, 358x201 at 390.
    - Title `p`: H20 `#FFF`, `margin:32px 0 24px`, `overflow-wrap:anywhere` (≤799 16/24). Episode titles are verbatim (single sentences).
    - Date: M14 `#A7A7A7` (e.g. "June 17, 2026").
    - Wrapper `.css-1c6z32u`: `::after` overlay that darkens to `rgba(0,0,0,.2)` on hover over 200ms ease-in-out (same as S5). There is no play tile.
- S200-fixed spacer (200 at every width; it's inside the grid block).

## 2. FAQs
S9 FaqSlice with heading "FAQs" and 6 items. Measured 639 tall at 1440 with all items closed.

## 3. Page CTA
S6 variant:
- `h2` "Unlock customer intelligence for your organization": H64, `max-width:924px`, 2 lines at 1440.
- Primary "Contact sales" → `/contact-sales/`.
- Secondary "Try Dovetail free" → `/auth/signup/`.
- Measured 886x528 at 1440.

## Motion
- Card hover darken (200ms).
- FAQ (S9).
- No load or scroll animation.
