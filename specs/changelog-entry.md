Source: https://dovetail.com/changelog/channels-2-generally-available/

# Template: changelog-entry

**Routes:** `/changelog/<slug>/`, 349 entries. Everything under `/changelog/` except `/changelog/` and `/changelog/category/*`. Slugs can start with a date, e.g. `2024-08-14-automatically-apply-tags-to-magic-highlights`.

**Data:** `src/data/content/changelog.json → entries[]` by `path`. Fields: `title`, `date`, `time`, `hero` (absolute URL or null), `cta` ({href,text} or null), `prevNext`, `bodyShape`, `bodyOrder`.

Theme is dark. The header has the 88px spacer (`main` y 206; 214 at ≤799). The footer variant is final-CTA + footer.

## Layout (1440; grid 12 × 70, gap 32, pad 124)

One `section.css-1y9l2ec` with two cells:

1. **Back cell** `grid-column:span 2` (x 124, w 172; ≤1280 full width):
   - `a` "Back" → `/changelog/`. Inline-flex: a 24x24 left-arrow SVG (stroke currentColor, 2px, square caps) followed by the text.
   - Inter 16/24 w500 #FFF, `margin-bottom:64px` (≤799: 32). 64x26.
   - Hover: `opacity:.9`, underline, and the `> span` shifts `translate3d(4px,0,0)` (`transition: transform 150ms cubic-bezier(.2,.6,.6,1)` from the base button).
2. **Content cell** `grid-column:span 8` (x 328, w 784; ≤1280 full width). Contents in order:
   - **Date line** (`display:flex; gap:16px; align-items:center; margin-bottom:32px; color:#A7A7A7`):
     - `span` date "21 Oct 2026" (mono 14 / 140% / ls 1 / uppercase).
     - A **4x4 square** `#A7A7A7`.
     - `span` time "16:00".
     - The line is 20 tall at y 206.
   - **H1** (`css-o8zqx6`): Inter **40/48 w500 ls −1**, #FFF, `margin-bottom:48px` (≤1280 32/40 ls −0.25; ≤799 24/32 ls −0.25).
   - **Hero image** (205/349 entries): `img` with `margin-bottom:48px; border-radius:8px; width:100%`. 784x392 at 1440 for a 2:1 source (736x368 @768, 358x179 @390). No border.
   - **Rich text** (dark, `content-shared.md` §4.1). Entries mostly use `p`, `ul`, and h3 for sub-sections.
   - **Action row** (`display:flex; flex-wrap:wrap; gap:16px; align-items:center; margin-top:32px`):
     - Optional **CTA button** (211 entries; text "Learn more" ×172, otherwise custom, e.g. "Explore Chat"). Glass style: pad 10px 16px, 14/18 w500 (≤1280 lh 16), bg rgba(255,255,255,.08), border rgba(255,255,255,.24), radius 8, #FFF, hover bg .16. Usually links to docs.dovetail.com with `target=_blank`. 110x40 for "Learn more".
     - **Share group:** `span` "SHARE" (mono 14 uppercase #A7A7A7), gap 16, then 4 icon buttons (32x32, border #454545, radius 8, mr 8: Copy link, Facebook, LinkedIn, X).
   - **Divider** `hr`: 1px rgba(255,255,255,.24), `margin:96px 0 64px`.
   - **Prev/Next grid** (12 cols, gap 32; ≤799 4 cols, row-gap 64): two cells `span 6` (≤799 full width).
     - Each is a link (flex column, align-start, #FFF, hover #A7A7A7, instant) containing three parts.
     - Direction label `h6`: mono **12/12** ls 1 uppercase, `opacity:.6`, flex gap 4, with a 12x12 arrow SVG. "← Previous" in the left cell (older entry); "Next →" in the right cell (newer entry). The arrow comes before or after the text accordingly.
     - Title `h4`: Inter 20/28 w500 ls −0.25, `margin:32px 0 24px` (≤799 16/24).
     - Date/time `h6`: mono 14 / 140% uppercase, `opacity:.6`, format "21 Oct 2026 11:00".
     - The newest entry has an empty right cell; the oldest has an empty left cell.
   - **Bottom spacer:** 160 (≤1280: 96).

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| Back | 124,206 | 64,206 | 16,214 | 16,214 |
| content x / w | 328 / 784 | 64 / 1152 | 16 / 736 | 16 / 358 |
| date line y | 206 | 296 | 296 | 296 |
| H1 | 40/48 | 32/40 | 24/32 | 24/32 |
| hero | 784x392 | – | 736x368 | 358x179 |
| doc height (sample) | 5002 | 5296 | 6016 | 6945 |

At ≤1280 the Back cell is a full-width row above the content (58 tall including its 32 margin at ≤799).

## Representative body (all 349 entries)

- Characters: p10 154 · **median 361** · p75 706 · p90 1,055 · max 3,585.
- Paragraphs: median 2 (p90 4).
- ul in 60 entries (typically 3–5 items). h2/h3 are rare (6 entries). `<hr>` in 19 entries.
- About 40% of entries have no hero image.

Placeholder: 1–3 short paragraphs (~120–250 chars each), with an occasional 3–5 item bullet list.

## Motion

- None on load. Link hover colour changes are instant.
- Back-arrow nudge is 150ms. Rich-text link underline grows over 200ms.
