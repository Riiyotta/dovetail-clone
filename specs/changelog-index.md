Source: https://dovetail.com/changelog/

# Template: changelog-index

**Routes:** `/changelog/` and the 6 category routes `/changelog/category/{ai,agents,channels,projects,integrations,admin-and-security}/`.

**Data:** `src/data/content/changelog.json`. `entries[]` (351, newest first) carries `title`, `date`, `time`, `postedDateIso`, `categories`, `previewImage` / `previewImageRemote`. `categories[]` and `years[]` are also there.

Theme is dark. There's **no 88px header spacer**: the hero pulls up under the nav (`main` y = 30). The footer variant is **plain** (769), preceded by the dark inline CTA (`content-shared.md` §4.6).

Category pages use the identical template: H1 is still "Changelog", the matching pill is active, and only the entries of that category are listed. Document title is "<Label> | Dovetail changelog". Row counts: AI 77, Agents 9, Channels 33, Projects 189, Integrations 78, Admin & security 35. The "All" list has 351.

## Layout

1. **Hero** (`css-1ahmhsx`):
   - Box: `position:relative; z-index:2; margin-top:-88px; padding-top:248px; transform:translateZ(0); backface-visibility:hidden`.
   - **Grid paper background:** `background-image: linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px); background-size:48px 48px; background-position:0 0`. It spans from the nav top (y 30) to y 538 at 1440, so the grid shows behind the nav.
   - **Bottom fade** (`css-z0rfhi`): `position:absolute; left:0; right:0; bottom:0; height:238px; background:linear-gradient(180deg, rgba(0,0,0,0) 0%, #0A0A0A 100%); pointer-events:none`.
   - Inner `.container` section, which contains in order:
     - **H1 "Changelog"** (`css-1sj9w1m`): Inter 600 **160/164 ls −4px**, #FFF, `position:relative; z-index:2`.
       - 1440: x 124, y 278, h 164. Stays 160px at 1280 (no ≤1280 rule). ≤799: **48/52 ls −1** (y 286 at 390).
     - Spacer: 64.
     - **Filter row** (`display:flex; flex-wrap:wrap; gap:16px; justify-content:space-between; align-items:flex-start; position:relative; z-index:2`), which contains:
       - `nav` (`flex:1 1 0; min-width:0`; ≤799 `flex-basis:100%`) > `ul{display:flex; flex-wrap:wrap; gap:8px; list-style:none}` > `li > a`. **These are real links** to `/changelog/` and `/changelog/category/<slug>/`.
         - Pill: Inter 14/16 w500, `padding:8px 12px`, radius 8, `backdrop-filter:blur(8px)`, bg `rgba(255,255,255,.08)`, colour `color-mix(in srgb,#fff 80%,transparent)` = rgba(255,255,255,.8). Hover/focus: bg .16, #FFF.
         - **Active (`aria-current=page`): bg #FFF, colour #0A0A0A.**
         - Widths at 32px tall: All 41, AI 38, Agents 71, Channels 87, Projects 79, Integrations 104, Admin & security 138. At 390 they wrap to 2 rows (72 tall).
       - **Year dropdown** (`flex-shrink:0; position:relative`). Button: Inter 14/16 w500, `padding:8px 10px 8px 12px`, gap 8, same bg/colour as the pills, hover or `aria-expanded=true`: bg .16 #FFF.
         - 76x32 at 1440 (x 1240). At ≤799 it wraps below the pills (x 16).
         - Label "Year", or the chosen year after selection.
         - Chevron: 16x16 SVG, #FFF, `transition:transform 150ms ease`, `rotate(180deg)` when open.
         - **Listbox** (`role=listbox`): `position:absolute; top:calc(100% + 8px); right:0` (≤799: `left:0; right:auto`); `min-width:160px; max-height:320px; overflow-y:auto; padding:4px; background:#1D1D1D; backdrop-filter:blur(32px); border:1px solid rgba(255,255,255,.08); border-radius:8px; z-index:3`.
         - Options: Inter 14/16 w500, `padding:8px 12px`, radius 4, colour rgba(255,255,255,.8). Active/hovered (`data-active`): bg rgba(255,255,255,.08), #FFF. Selected: #FFF.
         - Options are: All years, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017.
         - **Filtering is client-side.** The URL doesn't change. Choosing 2023 left 40 rows.
2. **Spacer:** 32.
3. **List section** (`css-1y9l2ec` > cell `1/-1`):
   - A `div.css-1vsceyk` first. This is the **cursor preview** (see Motion).
   - The list: a top `hr`, then each row as `div` > `a` + `hr`. The `hr` is 1px `rgba(255,255,255,.24)`, margin 0.
   - **Row link** (`css-2air5k`): `display:block; width:100%; padding:16px 0; color:#FFF; border-radius:0`. It contains an inner 12-col grid (gap 32; ≤1280 24; ≤799 4 cols) with two cells:
     - **Date cell** `span 3` (≤1280 full width): `p` mono 14 / 140% / ls 1 / uppercase, flex row, align centre. It holds:
       - A hidden 24x24 arrow SVG (↘-style), `display:none; margin:-2px 16px 0; opacity:.6; path fill #0A0A0A`. ≤799 margin `-2px 8px 0 -4px`.
       - `span{display:flex; gap:32px}` containing the date (e.g. "21 Oct 2026", #FFF) and the time (e.g. "16:00", #A7A7A7).
     - **Title cell** `span 9` (≤1280 full): `h2` Inter **18/24 w500 ls −0.25** (≤1280 16/24), flex, align centre, wraps.
   - **Row heights:** 58px at 1440 (date and title on one line; title x 431). **103px at ≤1280** (date line, 24 gap, title line).
   - First row y 571 at 1440; the list ends at y 21280 (351 rows).
   - Trailing spacer: 120.
4. **Inline CTA** (dark variant, `content-shared.md` §4.6). Then the plain footer.

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| H1 | 160/164 | 160/164 | 48/52 | 48/52 |
| filters y | 506 | 506 | – | 402 (2 rows) + Year at 490 |
| row height | 58 | 103 | ~103 | ~103 |
| doc height | 22765 | 38470 | 39104 | 40692 |

## Motion and interaction

- **Row hover/focus:** instant (no transition). Row bg becomes **#FFF**; date, time and title turn **#0A0A0A**; the arrow SVG shows (`display:inline-block`, opacity .6). The row has no horizontal padding, so the white block spans the full 1192 column.
- **Cursor-follow preview (desktop >1280 only):**
  - `div.css-1vsceyk{position:fixed; top:0; left:0; z-index:1; pointer-events:none; opacity:0; visibility:hidden}`.
  - On row hover, JS (GSAP-style inline styles) sets `opacity:1; visibility:inherit; transform:translate(clientX − 20px, clientY − 80px)` on every mousemove. Measured: mouse (900,700) → translate(880px, 620px). It renders the hovered entry's `previewImage`.
  - The image wrapper (`css-csiz1m`) is `display:block; width:400px; height:280px; max-height:280px; overflow:hidden`. `img` is `object-fit:cover; width/height:100%`. The live box measured **560x280** because the inline `width:100%` on the img wins. The image only becomes visible once it loads (lazy).
  - The preview is `display:none` at ≤1280.
  - On leaving a row the image unmounts. I couldn't determine an opacity-out tween.
- **Year chevron:** rotate over 150ms ease.
- **Pills:** no transition declared (instant).
- No entrance animations.

## Notes

- `date`/`time` strings in the JSON are as served. `postedDateIso` is UTC.
- 35 entries have no category, 215 have 1, 97 have 2, and 4 have 3.
