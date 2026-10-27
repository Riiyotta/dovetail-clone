Source: https://dovetail.com/legal/

# Template: legal-index (`/legal/`)

Theme: **light** (`html[data-scroll-theme="light"]`, html bg `#FAFAFA`). Light chrome is in `specs/tools-shared.md §I`. The nav **does** show "Log in" and "Book a demo" (black). The page ends with the **light** final CTA "The best never guess" and the light footer. Data: `src/data/tools/legal.json` has `h1` and `groups[] { heading, items[] { title, href, lastUpdated } }`: 14 Legal items and 5 Privacy items, verbatim.

## Geometry (top y / height)
| Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| spacer 96/56/56 | 118 / 96 | 118 / 56 | 126 / 56 | 126 / 56 |
| SliceGrid (all content) | 214 / 2943 | 174 / 3031 | 182 / 2939 | 182 / 2939 |
| spacer (last child 160 ≥1281 / 200) | | | | |
| Light final CTA + light footer | | | | |
| **Document height** | 4826 | 5508 | 5680 | 5650 |

## Layout (one SliceGrid, `#0A0A0A` text)
- **Row 1** `grid-column:1/-1`:
  - H1 H64 (64/68 w600 ls -2; ≤1280 48/52 ls -1; ≤799 32/36 ls -0.25): "Legal and Privacy".
  - Spacer 200 (200 at every tier). The row is 268 tall at 1440.
- **For each group** (Legal, then Privacy):
  - **Left** `span 4` (≤1280 `1/-1`): `<h2>` with **no class styling**, i.e. browser defaults: Inter **700 30px / normal** (36px box), `#0A0A0A`, no margin (global reset). The text is "Legal" / "Privacy". This is how the live site renders it.
  - **Right** `span 8` (≤1280 `1/-1`, sitting 24 below the h2): a list column (`display:flex; flex-direction:column`). Items are separated by `<hr>` (`height:1px; background:rgba(10,10,10,.24); margin:0`), with one more hr after the last item. Each item is a flex column (gap 16) containing:
    - Title link: button-link style, Inter **500 20/28 ls -0.25** `#0A0A0A`, `text-align:left; overflow-wrap:anywhere`, with a 1px transparent border (so the box is 30 tall). Hover/focus-visible color `#626262`; `:hover`/`:active` `text-decoration:underline`.
    - Date `span`: M14 (JetBrains Mono 14 / 19.6, ls 1px, uppercase) `#626262`, e.g. "Last updated: 16 July 2025".
  - **Measured vertical rhythm at 1440:** hr → +16 → link (30) → +16 → date (19.6) → +16 → hr. That's a 114.6px pitch per item. The Legal list is 1821 tall (14 items) and the Privacy list 790 (5 items). The right column is 784 wide at x=532.
  - Between groups there's a 32px grid row gap.
- At 390 the h2 stacks above its list. Titles wrap where needed.

## Motion
None (link color/underline on hover only, no transition declared on the link besides the base `Button` reset).
