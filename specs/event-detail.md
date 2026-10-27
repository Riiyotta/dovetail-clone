Source: https://dovetail.com/events/config-watch-party-sydney/

# Template: event-detail (`/events/{slug}/`, 47 pages)

Data: `src/data/company/events/{slug}.json`. Shared components: `specs/company-shared.md`.

Representative pages measured:
- `config-watch-party-sydney` (in-person, image hero)
- `a-balancing-act-mastering-customer-feedback` (past, panel)
- `channels-by-dovetail-…` (recorded webinar: video hero)
- `how-cs-turns-customer-conversations-into-roadmap-decisions` (upcoming, `[REGISTER]` row, no "More events")
- `suns-out-digital-twins-deep-dive` (native Zoom registration form)
- `suns-out-product-deep-dive` (Q&A FAQ groups)
- `whats-new-in-dovetail-jan-2026` (Zoom online)

## Variants
| Flag in data | Pages | Effect |
|---|---|---|
| `hero.type:"video"` + `youtubeVideoId` | 16 recorded webinars | The hero image becomes an S5 video card (play tile); click opens the YouTube modal. |
| `sidebar` contains `[END]` | events with an end date | Extra sidebar row. |
| `sidebar` contains `[REGISTER]` | a-chat-with-jon-alferness, how-cs-turns-…, suns-out-product-deep-dive (`registrationUrl`) | Row value is the link "Register here" (`target=_blank`): mono 14, `#FFF`, `text-decoration:underline`; hover `#A7A7A7`. |
| `form` | suns-out-digital-twins-deep-dive (`zoomWebinarId`) | "Register to attend" + native form after the body (S13). |
| `qa` | suns-out-product-deep-dive | Q&A header + grouped FAQ slices after "More events". |
| `moreEvents: []` | how-cs-turns-… (it is the only upcoming event) | The "More events" block is omitted entirely. |

Page chrome: standard banner and nav. The footer is the final CTA (CLONE_SPEC §10) followed by the footer.

Measured `<main>` for config-watch-party: 3,433 at 1440, 3,079 at 1280, 3,061 at 768 and 3,560 at 390.

---

## Layout (single SliceGrid, 12 columns, gap 32 / 24; ≤799 4 columns)

### 1. Header: column `1 / -1`
- HERO spacer (96 / 56 / 56).
- **Back link** → `/events/`:
  - Inline-flex, colour `#FFF`. A 24px left-arrow svg (`svg/icon-back-arrow.svg`, stroke 2) followed by the label "Back" (H18: 18/24 w500 ls -0.25; ≤1280 16/24).
  - Size: 67.5x26 at 1440.
  - Hover/focus: `opacity:.9; text-decoration:underline`, and the label span moves `translate3d(4px,0,0)` (inherits the Button span transition, 150ms `cubic-bezier(.2,.6,.6,1)`).
- `h1`:
  - `margin-top:32px`. H72: 72/76 w600 ls -2 `#FFF` (≤1280 56/60; ≤799 40/44 ls -1).
  - Measured 76 tall for 1 line, 152 for 2 lines.
- S160-fixed spacer (160 at every width).

### 2. Sidebar: column `span 4` (376 at 1440; ≤1280 full width, stacked above the content)
- Container: flex column, gap 48, **`position:sticky; top:96px`**. It's sticky at every width, but only has an effect where the column is taller than the box (desktop).
- Detail list (flex column): `<hr>` (1px `rgba(255,255,255,.24)`), then each row followed by an `<hr>`.
- Row `p`:
  - M14 mono (14px / 140% ls 1 uppercase), `padding:16px 0; display:flex; gap:8px`.
  - Label span ("[WHO]", "[START]", "[END]", "[WHERE]", "[REGISTER]"): `#FFF`, `min-width:100px`.
  - Value span: `#A7A7A7`.
  - A 1-line row is 51.6 tall; a 2-line row is 71.2.
- Row order: WHO (host names joined by ", "), START, END (optional), WHERE (location or "Online"/"Zoom"; empty if none), REGISTER (optional).
- START and END are `{dd LLL yyyy} {h:mma} {zzz}` in the **viewer's timezone** (S14).

### 3. Content: column `6 / span 6` (580 at 1440, x=634; ≤1280 full width)
- **Hero media:**
  - Image (radius 8, 100% wide, natural aspect, usually 16:9): 580x326 at 1440, 1152x649 at 1280, 736x415 at 768, 358x202 at 390.
  - Or a video card (S5) with the same box, `border-radius:8px`.
- S48 spacer.
- **Body:** rich text (S0.6) with the story/event override, so `p`/`li` are 20/28 `#A7A7A7` and `h1`/`h2` are 32/40 w500 `#FFF` with `margin:48px 0 24px`.
  - Body `h1`s do occur (6 events use `#` headings); they get the same style as `h2`.
  - `ul` lists often have bold lead-ins (`strong`, `#FFF`, w500).
  - Links in the body are inline links (S0.6), e.g. "Register now", "Register", or LinkedIn profiles.
- **Registration form** (Zoom variant only):
  - S48 spacer.
  - `h3` "Register to attend" (H24).
  - S24 spacer.
  - The S13 form: 580 wide at 1440, 642 tall. Fields:
    - First name* (text, placeholder "Jane") and Last name* (text, placeholder "Doe") in one row (flex, gap 16; ≤1280 column).
    - Work email* (email, "pete@spotify.com").
    - Company* (text, "Acme Corp").
    - Job title* (text, "Product manager").
    - Questions & comments (textarea, no placeholder, min-height 96).
    - Submit "Register".

### 4. More events: column `1 / -1`, then a row of cards
- S200 spacer (200 / 96 / 96).
- `p` "More events": H48 (48/56 w500 ls -1; ≤1280 32/40; ≤799 24/32).
- S64 spacer.
- Cards: a new SliceGrid where each card column is `span 4` (376 at 1440; ≤1280 `span 4` of 12 = 368 at 1280; ≤799 full). Cards are S3 event cards (image 376x211.5).
- Lists the other **upcoming** events (currently at most 1; none on the upcoming event itself).

### 5. Q&A (suns-out-product-deep-dive only)
- S160 spacer (160 / 96 / 96).
- SliceGrid, column `span 8`:
  - `h2` "Q&A from the webinar": H64 (64/68; ≤1280 48/52; ≤799 32/36).
  - `p` "Questions asked live or submitted separately.": 18/24 `#A7A7A7`, margin-top 16 (≤1280 16/24).
- S64→48 spacer.
- One FaqSlice per group (S9, **compact** heading H32: 32/40 w500 ls -0.5, `overflow-wrap:anywhere`, `text-wrap:pretty`). Groups are separated by S64→48 spacers.
- Groups: "Agents and Digital Twins" (9 items), "Channels 2.0" (5), "Dovetail Ecosystem" (3), "Enterprise and governance" (4). Answers often end with a "More in {topic}" link (P16 `#A7A7A7`, margin-top 16, `href` to docs.dovetail.com, `target=_blank`).

### 6. Bottom
Spacing comes from the next section, then the footer stack.

---

## Responsive summary
| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| h1 | 72/76 | 56/60 | 40/44 | 40/44 |
| Layout | sidebar 4 cols + content 6 cols (gap col 5) | stacked: header, sidebar (211 tall), content | stacked | stacked |
| Body text | 20/28 | 16/24 | 16/24 | 16/24 |
| More events card | 376 | 368 | 736 | 358 |

## Motion
- Back link hover: underline plus a 4px label nudge.
- Video hero: S5 (overlay 200ms; modal).
- Event card hover: S3.
- FAQ: S9.
- Form fields: 300ms bg/border on hover and focus.
- There are no scroll or load animations.

## Gaps
- Times are timezone-dependent (S14). The data stores ISO strings and LA-rendered strings.
- Event descriptions are placeholder (char counts per block); host names, labels and links are verbatim.
