Source: https://dovetail.com/customers/okta/

# Template: customers-story (`/customers/{slug}/`, 39 pages)

Data: `src/data/company/customers/{slug}.json` (one file per story). Shared components: `specs/company-shared.md`.

Representative pages measured:
- `/customers/okta/` (named, stats, image hero)
- `/customers/breville/` (video hero)
- `/customers/canva-ai/` (pull quotes)
- `/customers/itau-unibanco/` (embedded YouTube in body)
- `/customers/pvcase/` (two-person caption, blockquote + attribution)
- `/customers/global-saas-leader/` (anonymous + FAQ)

## Variants (confirmed by DOM; flags are in each data file)
| Flag | Pages | Effect |
|---|---|---|
| `hero.type: "video"` | atlassian, atlassian-design, breville, canva, canva-ai, safetyculture, smartrecruiters | The hero image becomes a video card (S5) with a play tile. Click opens the YouTube modal with `heroVideoId`. |
| `stats: []` | achievers, careship, eucalyptus, harvard-business-publishing, petal-health, safetyculture | The right column shows only the CTA card. |
| `isAnonymous: true` (+ `faq`) | the 18 "global-…/iconic-…/leading-…/major-…/modern-…/flagship-…/fleet-…" stories | Eyebrow "CUSTOMER / A GLOBAL SAAS LEADER". No logo. Hero image is often an Unsplash photo. **FAQ slice (S9) after the related section.** No hero caption. |
| `sections[].testimonial` | 14 stories (20 pull quotes) | Pull-quote block after that section's body. |
| body `iframe` blocks | itau-unibanco (3), petal-health (1), smartrecruiters (3) | Inline 16:9 YouTube (S0.6). |
| body `blockquote` + "— Name, Role" paragraph | pvcase, bower, … | Rich-text blockquote (S0.6). |
| `heroCaption` with 2 names | breville, canva, canva-ai, pvcase, safetyculture | The second name is preceded by a "/" span (opacity .4, `margin:0 4px`). |

Page chrome: **blue nav** and blue-tinted banner (S1). The footer is the final CTA (CLONE_SPEC §10) followed by the footer.

Measured `<main>` heights for Okta: 7,628 at 1440, 7,880 at 1280, 6,068 at 768 and 7,083 at 390.

Section order:
1. Blue hero
2. Pixel band
3. Body (sections + sticky sidebar CTA)
4. "The best never guess" + related (S7)
5. *(anonymous only)* S160, FAQ, S160
6. Footer stack

---

## 1. Blue hero

**Outer:** `background:#0044FF; color:#FAFAFA`. It contains a SliceGrid (12 columns). At 1440 it spans y 118→1430.

**Column `1 / -1`:**
- HERO spacer (96 / 56 / 56).
- Eyebrow `p`: "CUSTOMER / {COMPANY}" in M14 `#FAFAFA`. The data `eyebrow` holds the exact uppercase text.
- S32→24 spacer.
- `h1`: H64 `#FAFAFA`, full width (64/68 ls -2; ≤1280 48/52 ls -1; **≤799 40/48 ls -0.25**). Measured 1192x204 (3 lines) at 1440, 1152x104 at 1280, 736x144 at 768 and 358x288 at 390.
- S64→48 spacer.

**Column `1 / span 7`** (682 wide at 1440; ≤1280 `1 / -1`):
- Container: flex column, gap 64 (≤799 32).
- Intro `p`: P20 `#FAFAFA` (≤1280 16/24). Placeholder; the length is in the data.
- Media (flex column, gap 16):
  - Image box: radius 8, `overflow:hidden`. Image `width:100%`, natural aspect, radius 8. Sizes: 682x439.6 at 1440, 1152x742.5 at 1280, 736x474 at 768, 358x231 at 390.
  - Video variant: the same box holds the S5 video card. The poster is `hero.image`, and the play tile (64x64) is centred.
  - Caption `p` (if present): M14 `#FAFAFA`. Names are separated by `<span>/</span>` (opacity .4, margin 0 4px). It wraps on mobile (2 lines at 390).

**Column `10 / -1`** (274 wide at 1440; ≤1280 `1 / -1`, so it stacks below the media):
- Container: flex column, gap 48 (≤1280 32).
- **Stats** (only if present). The outer container is a flex column with gap 32; the list inside it is a flex column with gap 24. Each stat is a flex column with gap 4:
  - Rule: 1px `rgba(255,255,255,.24)`, margin-bottom 24.
  - Value: H40 `#FAFAFA` (40/48 w500 ls -1; ≤1280 32/40 ls -0.25; ≤799 24/32).
  - Label: P16 `#FAFAFA`.
  - Measured stat block heights: 129 (2-line label) or 105 at 1440.
- **CTA card:**
  - Box: flex column, gap 8, padding 24, border 1px `rgba(255,255,255,.24)`, radius 8, bg `rgba(255,255,255,.08)`, `backdrop-filter:blur(8px)`.
  - Text group (flex column, gap 8, margin-bottom 8):
    - "The best never guess" in H20 (≤799 16/24).
    - "Discover how Dovetail can help your team turn customer feedback into decisions." in P16 `#FAFAFA`.
  - Primary button "Talk to sales" → `/contact-sales/` (116.8x40).
  - Measured 274x214 at 1440, full width x164 at 1280.

**Bottom spacers** (grid children in the same row): S96 (96 / 64 / 64) and S160→0 (160 / 0 / 0).

## 2. Pixel band (S10, `pixelateTop`)
- Wrapper `margin-top:-120px; z-index:3` (≤1280 margin 0, pixels hidden).
- Pixel field: 3 rows of 48x40 squares, going from transparent to `#0A0A0A` as you scroll. It sits over the bottom 120px of the blue hero.
- Child: a `#0A0A0A` block 160 tall (≤799 96).
- At ≤1280 only the 160 / 96 black block remains.

## 3. Body

**Outer:** `position:relative; background:#0A0A0A`. It contains section blocks and the sticky CTA rail.

**Section block** (`bg #0A0A0A`), a SliceContainer + 12-column grid (gap 32 / 24):
- Heading column `1 / span 8` (784 at 1440; ≤1280 full):
  - `p` (not `h2`): H56 `#FFF` (56/60 ls -2; ≤1280 40/44 ls -1; ≤799 32/36 ls -0.25).
  - S32→8 spacer.
- Body column `2 / span 7` (682 at 1440; ≤1280 `2 / span 7` = 662 at 1280; ≤799 full):
  - Rich text (S0.6, dark) with the `&&` override, so `p` and `li` are **20/28 `#A7A7A7`** (≤1280 16/24).
  - Images inside are 100% wide, radius 8, `margin:64px 0`.
  - The block's bottom padding comes from the last `p`'s 24px margin.
- The first section's heading sits in its own block; the body follows in the next block.

**Between sections:**
- A 100px `#0A0A0A` spacer (≤799 64).
- Then a block with column `1 / span 8` holding a 1px rule `rgba(255,255,255,.08)` with `margin-bottom:100px` (≤799 64).

**Pull-quote** (when the section has a testimonial; after that section's body):
- Column `2 / span 7` with `padding-top:32px`.
- The whole quote is an `<a>` to the story itself (`href=/customers/{slug}/`, hover keeps `#FFF`, no underline). It's a flex column, gap 24, start-aligned:
  - Quote wrapper: `position:relative` (≤799 flex column).
  - `blockquote`: 32/40 w500 ls -0.5 `#FFF` (≤1280 and ≤799 **24/32** ls -0.25; the later media rule wins), wrapped in curly quotes. Measured 680x160 at 1440 (4 lines).
  - Person row (flex, centred, gap 16, `min-height:48px`):
    - Avatar: 40x40, radius 8, cover.
    - Name: M14 `#FFF`.
    - Role: M14 `#A7A7A7`.
- The next section wrapper then has `padding-top:48px`.

**Sticky CTA rail** (≥1281 only; `display:none` below):
- Rail: `position:absolute; top:0; bottom:0; left:min(-38px + 75vw, 340px + 50vw); width:232px; pointer-events:none`. At 1440 that's x=1042; at 1512+ it's 340 + 50vw.
- Inner: `position:sticky; top:96px; display:flex; flex-direction:column; gap:8px; pointer-events:auto`.
  - `img` `media/sales-cta-img.png`: height 48 (88.3 wide), `align-self:flex-start`.
  - `p`: P16 `#FAFAFA`, margin-bottom 8. Text: "Discover how Dovetail can help your team turn customer feedback into decisions."
  - Primary button "Talk to sales" → `/contact-sales/`.
- The rail is as tall as the whole body (4,599 at 1440), so the card stays pinned 96px from the top while the body scrolls.

Measured body height for Okta: 4,599 at 1440, 3,779 at 1280, 3,396 at 768 and 4,251 at 390.

## 4. "The best never guess" + related
S7 exactly. Related cards are the first 3 of `relatedArticleSlugs` (listed in the data as `related`). It's preceded by a `#0A0A0A` S120→64 spacer and followed by S0→96.

Measured block heights: 1,312 at 1440, 2,047 at 1280 (2-up grid, 2 rows), 918 at 768 (mobile carousel) and 990 at 390.

## 5. FAQ (anonymous stories only)
- S160 (160 / 96 / 96), then FaqSlice (S9, heading "FAQs", H56), then S160.
- Typically 5 items (see data). Measured 594 tall at 1440 with all items closed.

---

## Responsive summary
| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| Hero | 7 + 3 column split | single column, media 1152 | single, 736 | single, 358 |
| Body text | 20/28 | 16/24 | 16/24 | 16/24 |
| Body column | x=226, w=682 | x=162, w=662 | full 736 | full 358 |
| Sticky rail | yes | hidden | hidden | hidden |
| Pixel band | yes | hidden | hidden | hidden |
| Related | 3-up grid | 2-up grid | carousel 248 cards | carousel 248 cards |

## Motion
- Pixel band: scroll scrub (S10).
- Video hero: hover overlay 200ms; click opens the modal (S5).
- Pull-quote link: no hover effect beyond the cursor.
- Related cards: S2 pixel hover (≥1281 only).
- Rotator: S7 keyframes, 16s.
- Inline links: underline 200ms (S0.6).
- There are no scroll reveals on story pages.

## Gaps
- Story body copy is placeholder by instruction; the data records the char count per paragraph and list item, plus any inline `strong` and link labels.
- Section testimonial avatars come from the live DOM. Some stories show the customer thumbnail as the avatar (e.g. Canva AI uses `Customer_Canva_AI.png`), and I kept that as-is.
