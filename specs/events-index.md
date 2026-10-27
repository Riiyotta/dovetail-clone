Source: https://dovetail.com/events/

# Template: events-index (`/events/`, `/webinars/`)

Data:
- `src/data/company/events.json`
- `src/data/company/webinars.json`

Shared components: `specs/company-shared.md`.

| | `/events/` | `/webinars/` |
|---|---|---|
| Hero intro (M14, `max-width:350px`) | "Polish your craft, learn about our product, and meet others in our community with live events, webinars, and more." (3 lines, 78.4 tall) | "Polish your craft, learn about our product, and watch helpful videos." (2 lines, 39.2 tall) |
| h1 | "Events" | "Webinars" |
| Upcoming cards | all upcoming events (currently 1) | upcoming **online** events (currently the same 1) |
| Past list | 46 rows (all events with start date in the past, `hideFromIndexPage:false`, newest first) | 20 rows (past **online/virtual** events only) |
| After list | S200-fixed spacer (160 at ≥1281 as last child) | Page CTA (S6) |
| Footer | Final CTA (§10) + footer | footer only |
| `<main>` 1440 / 1280 / 768 / 390 | 4,228 / 4,248 / 5,182 / 5,551 | 3,091 / 2,841 / 3,129 / 3,415 |

Upcoming vs past is computed on the client by comparing `startDate` to now. The data files store the ISO dates, so the build can recompute this at runtime. The snapshot on 2026-10-26 had exactly one upcoming event: "How CS turns customer conversations into roadmap decisions" (19 Nov 2026).

---

## 1. Hero (DotBackground)
- Outer: DotBackground (S12, 16px dot grid `rgba(255,255,255,.08)`), `position:relative`. Measured 648.4 tall at ≥800 and 536.4 at ≤799.
- SliceContainer, top to bottom:
  - S80 spacer.
  - Intro `p`: M14 `#A7A7A7`, `max-width:350px`.
  - S246 spacer.
  - `h1`: H160 (160/164 w600 ls -4; ≤799 48/52 ls -1). It stays 160px at 1280 and 1024, because there is no md rule.
- Then a full-width S80 spacer, still inside the dotted area.

## 2. Upcoming events
- SliceGrid, with the column `span 8` (784 at 1440; ≤1280 full width).
- Card grid: `display:grid; grid-template-columns:1fr 1fr; gap:64px 32px` (≤1280 `1fr`, gap 24).
- Cards are S3 event cards: 376 wide at 1440, `max-width:512px` at ≤1280, 358 at 390.
- Image sizes: 374x210 at 1440, 510x287 at 1280/768, 356x200 at 390.
- No section heading: the cards sit directly under the hero.

## 3. Past events
- S200 spacer (200 / 96 / 96).
- SliceContainer:
  - `p` "Past events": H48 (48/56 w500 ls -1; ≤1280 32/40; ≤799 24/32).
  - S64 spacer.
  - List: flex column. It starts with an `<hr>`, then each row (S4) is followed by an `<hr>`.
    - Rows are 58 tall at ≥800 and 81.6 at ≤799, where the date sits on its own line above the title (`gap:4px 24px`).
    - Row small text = `dd LLL yyyy` in the **viewer's timezone** (S14). Row title = event title. Row href = `/events/{slug}/`.
- Measured list heights: 2,739 at 1440 and 4,280 at 390 (46 rows).

## 4. Webinars only: page CTA
S6 with heading "Turn customer feedback into product innovation", primary "Contact sales" → `/contact-sales/` and secondary "Try Dovetail free" → `/auth/signup/`.

Measured block heights: 886x596 at 1440, 858x366 at 1280, 736x334 at 768, 358x370 at 390.

## Motion / interaction
- Event card hover: `::after` overlay `rgba(0,0,0,.2)` and text colour `#A7A7A7`. Both are instant, with no transition (S3).
- Row hover: white background with black text, and the arrow appears (200ms colour/background transition) (S4).
- There are no load or scroll animations.

## Gaps
- Dates and times depend on the visitor's timezone (S14). The values in the data were captured in America/Los_Angeles, the same zone the SSR uses.
