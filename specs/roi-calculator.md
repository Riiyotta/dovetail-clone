Source: https://dovetail.com/roi-calculator/

# Template: roi-calculator (`/roi-calculator/`)

Theme: **dark**. Page layout options: `hideFooterCtaSlice` (so **no** "The best never guess" final CTA), `hideHeaderSpacing`, `hideIntercom`. Data: `src/data/tools/roi-calculator.json` holds every label, the input ranges and defaults, the output formats, the formula and the download-card copy. Shared buttons and spacers are in `specs/tools-shared.md`.

## Geometry (top y / height)
| Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| spacer 200/96/96 | 118 / 200 | 118 / 96 | 126 / 96 | 126 / 96 |
| Hero (SliceContainer) incl. spacer 96 below | 318 / 416 | 214 / 378 | 222 / 310 | 222 / 370 |
| Calculator (SliceGrid) | 734 / 556 | 592 / 1134 | 532 / 1118 | 592 / 1230 |
| spacer 64 | 1290 / 64 | 1726 / 64 | 1650 / 64 | 1822 / 64 |
| Download card (SliceGrid) | 1354 / 393 | 1790 / 367 | 1714 / 664 | 1886 / 496 |
| spacer 88 | 1747 / 88 | 2157 / 88 | 2378 / 88 | 2382 / 88 |
| CTA footer slice (shared H) | 1835 / 596 | 2245 / 366 | 2466 / 334 | 2470 / 370 |
| **Document height** | 3199 | 4013 | 4924 | 4964 |

## 1. Hero (SliceContainer; left-aligned `BaseHeading`)
- Eyebrow M14 `#A7A7A7`, mb 32: "Roi Calculator". The source string is "Roi Calculator", rendered uppercase.
- H1 H64 (64/68 w600 ls -2; ≤1280 48/52 ls -1; ≤799 32/36), `#FFF`, `max-width:800px`: "Measure the revenue impact of Dovetail" (2 lines at 1440).
- P20 `#FFF` `max-width:615px; margin:32px 0` (≤1280 16/24): "Estimate the ROI of faster decisions and less wrong turns."
- CTA row (gap 8):
  - White "Contact sales" → `/contact-sales/`, 125x40.
  - Secondary "Try Dovetail free" → `/auth/signup/` (new tab), 145x40.
- Spacer 96 below the hero.

## 2. Calculator (SliceGrid)

### Left column (`span 7`; ≤1280 `1/-1`): 682 wide at 1440
There are four slider blocks (`margin-bottom:32px` each, 98 tall). Each has:
- **Header row:** `display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px`.
  - Left `span`:
    - Label `p` H20 (20/28 w500 ls -0.25 `#FFF`; ≤799 16/24).
    - Description `p` P14 `#A7A7A7`, `margin-top:8px`.
  - Right value group: `display:flex; align-items:center; gap:4px`.
    - Value: H20 `#FFF` (e.g. "10", "$120,000", "10 hrs", "$60,000").
    - Unit: M14 uppercase `#FFF` ("/people", "/year", "/week", "/year").
- **Range input** (`type=range`, `aria-labelledby`, `aria-describedby`, `aria-valuetext`):
  - `width:100%; margin:0; padding:0; background:unset; cursor:pointer; appearance:none` (height 12px).
  - Track (`::-webkit-slider-runnable-track` / `::-moz-range-track`): `height:12px; border-radius:0; background:#212121` (rgb 33).
  - Thumb: `12x12; border-radius:0; border:none; background:#FFFFFF; appearance:none`.
  - **No filled-progress colour** on the track. Firefox `::-moz-range-progress` has height 12 / radius 0 and no colour set.
  - There are no custom hover or focus styles (browser default focus ring).

| id | Label | min | max | step | default | Display |
|---|---|---|---|---|---|---|
| teamSize | Total team size | 1 | 1000 | 1 | 10 | `10` + "/people" |
| avgAnnualSalary | Average annual salary | 40000 | 500000 | 5000 | 120000 | `$120,000` + "/year" |
| hoursPerWeek | Hours/week on customer understanding (per person) | 0 | 40 | 0.5 | 10 | `10 hrs` + "/week" |
| dovetailAnnualCost | Dovetail estimated annual cost | 10000 | 200000 | 5000 | 60000 | `$60,000` + "/year" |

**Advanced assumptions toggle** (wrapper `margin-top:4px`):
- `<button aria-expanded>`, transparent, `padding:0`, P14 `#FFF` (hover/focus-visible stays `#FFF !important`), `display:flex; align-items:center`.
- Label "Advanced assumptions " followed by a 24px chevron SVG (`icon-chevron-down-plain-24.svg`).
  - Closed: svg `transform:rotate(180deg)`, so it points **up**.
  - Open: `transform:unset`. The label becomes "Hide advanced assumptions".
  - There's no animation; content mounts and unmounts instantly.
- **Open content:**
  - Row: `display:flex; gap:12px; margin-top:16px`, with two labels. Each label is P14 `#FFF`, `display:flex; flex-direction:column; gap:8px`, and holds a number input:
    - "Time savings rate": `type=number`, max 1, step .05, default 0.3.
    - "R&D payback ratio": max 10, step .5, default 3.
  - Inputs: `padding:10px 16px; border-radius:8px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16); color:#FFF; width:100%; margin-top:8px`. Font is **not set**, so it falls back to the browser's 13.333px default. Measured 117x37 and 122x37 at 1440 (they size to content).
  - Note `p` P14 `#A7A7A7` `margin-top:16px`: "Current assumptions: {round(rate*100)}% reduction in customer research time. {ratio}x revenue impact per R&D dollar reinvested. Hourly rate assumes a 40-hour week."

### Right column (`span 5`; ≤1280 `1/-1` with `margin-top:32px`): 478 wide at 1440
- Results stack: `display:flex; flex-direction:column; gap:16px`.
- **Result card:** `background:#2C2C2C` (rgb 44; "elevation3"), `border:1px solid #454545; border-radius:8px; padding:32px; color:#FFF`. 126 tall at 1440, 118 at ≤1280.
  - Label `p` M12 (Mono 12/12 ls 1 uppercase) at `opacity:.6`, `margin-bottom:8px`.
  - Row: `display:flex; justify-content:space-between`.
  - Value: H32 (32/40 w500 ls -0.5; ≤1280 24/32 ls -0.25), `display:flex; align-items:center`.
- **Highlighted (4th) card:** `background:#191919` ("elevation1"); everything else is the same.
  - Its row also has a right-hand column (`display:flex; flex-direction:column; align-items:flex-end; justify-content:flex-end`) with two `p`s: P14 `#A7A7A7`, `max-width:152px; text-align:right`, and the value inside a `<span>` coloured `#FFF`.
  - Contents: "Total value: $360,000" and "Cost: $60,000".

| Card | Label | Default value |
|---|---|---|
| 1 | Total annual time savings | 1,560 hrs |
| 2 | Value of R&D budget unlocked | $90,000 |
| 3 | Return on R&D investment | $270,000 |
| 4 (highlight) | Total estimated annual ROI | $300,000 (aside: Total value: $360,000 · Cost: $60,000) |

### Formula (read from the page chunk, exact)
```js
const hourlyRate   = avgAnnualSalary / 52 / 40;
const annualHours  = teamSize * hoursPerWeek * 52;
const timeSavingsH = annualHours * savingsRate;            // savingsRate default 0.3   -> card 1
const totalValue   = timeSavingsH * hourlyRate;            //                            -> card 2
const rdImpact     = totalValue * rdPaybackRatio;          // rdPaybackRatio default 3   -> card 3
const totalImpact  = totalValue + rdImpact;                //                            -> "Total value:"
const netAnnualRoi = totalImpact - dovetailAnnualCost;     // card 4 shows Math.max(0, netAnnualRoi)
const roiPercent   = dovetailAnnualCost > 0 ? netAnnualRoi / dovetailAnnualCost : 0;   // computed, never displayed
currency = v => v.toLocaleString('en-AU', {style:'currency', currency:'AUD', maximumFractionDigits:0});  // "$120,000"
hours    = v => v.toLocaleString('en-AU', {maximumFractionDigits:0}) + ' hrs';
// slider onChange: state[key] = Number(value) if finite, else keep previous
```
Verified live: teamSize=250 (other values default) gives 39,000 hrs / $2,250,000 / $6,750,000 / $8,940,000 (Total value $9,000,000; Cost $60,000).

Values update **synchronously on input** with no tweening or count-up animation.

## 3. Download card (SliceGrid → `span 12`)
- **Card:** an inner 12-col grid (`gap:32px`; ≤1280 24; ≤799 4 cols) with `background:#141414; border:1px solid #454545; border-radius:8px; overflow:hidden`. It's 1192x393 at 1440.
- **Left** (`span 4`; ≤1280 `span 6`; ≤799 `1/-1`), `padding:64px 0 64px 64px` (≤799 `32px 32px 0`):
  - H2 H20 `#FFF`: "Download your ROI report".
  - P16 `#A7A7A7` `margin:8px 0 32px`.
  - Field group (`display:flex; flex-direction:column; align-items:flex-start; gap:8px`):
    - Label P14 `#FFF` "Company name*", `for=roi-company-name`.
    - Input `#roi-company-name` (`name=company`, `required`, `autocomplete=organization`, placeholder "Spotify"):
      - Same styling as the advanced inputs: `padding:10px 16px; radius 8; bg rgba(255,255,255,.08); border 1px rgba(255,255,255,.16); color #FFF; width:100%; margin-bottom:8px`.
      - 311x37 at 1440. The font is the browser default 13.333px. The placeholder is the browser default grey (rgb 117,117,117).
      - Focus: only the global focus ring (`outline:2px solid #FFF`, offset 2). There's no bg or border change.
    - Button: White primary "Download PDF", 132x40.
      - **Disabled while the trimmed input is empty**: `opacity:.6; pointer-events:none`.
      - It becomes opacity 1 (200ms transition) when the input has text.
      - While generating the label reads "Generating…".
    - Error line (only when a request fails): `p role=alert` P14 `#A7A7A7`.
- **Right** (`6 / span 7`; ≤1280 `span 6`; ≤799 `1/-1`; `display:flex !important`): `<img src="/media/pdf-gen.png" alt="ROI report preview" style="width:100%;height:auto;border-radius:8px">`, rendered 681x391 at 1440. It's a single raster (`/assets/tools/pdf-gen.png`).
- **Build:** keep it static and non-submitting. The live site POSTs `/api/website/generate-business-case-pdf` and downloads `Dovetail-ROI.pdf`. Don't replicate that; the button can no-op.

## 4. CTA footer slice
Shared H: "Turn customer feedback into product innovation", "Contact sales" + "Try Dovetail free". The spacer above it here is 88 (from the calculator), followed by the slice's own 200/96 spacer.

## Motion
None beyond button transitions (200ms) and the instant recalculation. There are no load or scroll animations (verified with a MutationObserver over a full scroll).
