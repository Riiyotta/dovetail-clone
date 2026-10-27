Source: https://dovetail.com/quiz/

# Template: quiz (hub `/quiz/` + role-quiz flow)

`/quiz/` is a **hub**: three cards that link to the actual quizzes at `/roles/product-management/quiz/`, `/roles/research/quiz/` and `/roles/design/quiz/`. Those three routes aren't in this group's route list, but they *are* the quiz step flow, so the flow is fully specced here and its data (all 30 questions, 120 answer options and 15 result tiers) is in `src/data/tools/quiz.json` under `roleQuizzes.{product,research,design}`. If another agent owns `/roles/*/quiz/`, it should reuse this. Theme: **dark**.

- **Hub page:** no shared final CTA. It has the CTA footer slice (shared H) and then the footer.
- **Role-quiz pages:** CTA footer slice + shared final CTA "The best never guess" + footer.

## A. Hub `/quiz/`

### Geometry (top y / height)
| Block | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| spacer 88 (all tiers) | 118 / 88 | 118 / 88 | 126 / 88 | 126 / 88 |
| Hub section | 206 / 689 | 206 / 983 | 214 / 1035 | 214 / 1163 |
| CTA footer slice (shared H) | 895 / 596 | 1189 / 366 | 1249 / 334 | 1377 / 370 |
| **Document height** | 2260 | 2958 | 3707 | 3871 |

### Hub section
- **Container:** SliceContainer, flex column, `align-items:center`. Inner wrapper `width:100%; max-width:900px` (x=270 at 1440; 190 at 1280).
- **Content, in order:**
  - Eyebrow `span`: JetBrains Mono **500** 14/22, `letter-spacing:.08em` (1.12px), uppercase, **`#6798FF`** (rgb 103,152,255; theme "accentTertiary"), `display:inline-block`. Text "2-minute quiz".
  - Spacer 24.
  - H1 H48: 48/56 w500 ls -1 `#FFF` (≤1280 32/40 ls -0.25; ≤799 24/32). "How customer-driven is your team?" is 1 line at 1440.
  - Spacer 16.
  - P18 `#A7A7A7` `max-width:560px` (≤799 16/24): "Pick your role to get a score, a benchmark, and a clear picture of what the next level looks like for you."
  - Spacer 56 (≤1280 40).
  - Card grid: `display:grid; grid-template-columns:repeat(3,1fr); gap:16px` (≤1280 `1fr`). Cards are 289x368 at 1440 and 900x234 at 1280 (stacked).
- **Card:**
  - Box: `background:#121212; border:1px solid #454545` (rgb 69); `border-radius:12px; padding:32px 28px; display:flex; flex-direction:column`.
  - Eyebrow: Mono **600** 14/22 ls .08em uppercase `#6798FF` ("Product", "Research", "Design").
  - Spacer 16.
  - H2 H24: 24/32 w500 ls -0.5 `#FFF` (≤1280 20/28; ≤799 18/24).
  - Spacer 8.
  - P16 `#A7A7A7` with `flex-grow:1`, which pushes the button to the bottom.
  - Spacer 32.
  - Secondary button "Take the quiz" at full card width (231 wide at 1440). It links to the role quiz.
  - Card texts are verbatim in data.
  - Hover: only the button hover (bg .08 → .16, 200ms).
- **Spacer 96** (≤799 56) before the CTA footer slice.
- **CTA footer slice:** heading "Turn customer feedback into product innovation", "Start for free" (white, `/auth/signup/`, new tab) and "Book a demo" (secondary, `/request-a-demo/`).

## B. Role quiz flow (`/roles/{role}/quiz/`), a 3-state client component

**Container:** SliceContainer centred (flex column, `align-items:center`). The inner wrapper has `width:100%` with a per-state `max-width` and `min-height`. The section starts at y=206 (spacer 88 above). There's a bottom spacer of 96 (≤799 56) after every state.

### State 1: Intro (`max-width:640px`)
- Eyebrow (as on the hub) "2-minute quiz".
- Spacer 24.
- H1 H48: e.g. "How impactful is your UX research practice?" (2 lines at 1440, 112 tall; 24/32 at ≤799).
- Spacer 24.
- P18 `#A7A7A7` `max-width:560px` (intro subtitle; placeholder in data).
- Spacer 40.
- White primary button "Start the quiz" (124x40).
- Measured at 1440: wrapper x=400, 640 wide.

### State 2: Question (`max-width:740px; min-height:560px`)
- **Counter row:** `display:flex; justify-content:flex-end`. Text `"{n} / {total}"` P14 `#A7A7A7` with `font-variant-numeric:tabular-nums`.
- Spacer 16.
- **Progress bar** (`role=progressbar`, aria-valuenow n): track `width:100%; height:3px; border-radius:2px; background:rgba(255,255,255,.08); overflow:hidden`.
  - Fill: `height:100%; border-radius:2px; background:#6798FF; width:{(n-1)/total*100}%; transition: width 300ms ease`.
  - The fill is **0% on question 1** (it shows answered progress, not the current question). Question 2 is 10% (74px at 1440).
- Spacer 40.
- Question H2 H32: 32/40 w500 ls -0.5 `#FFF` (≤1280 24/32; ≤799 **18/24** per the mobile H24 rule). It has `tabIndex=-1` and receives focus on every question change.
- Spacer 32.
- **Options grid:** `display:grid; grid-template-columns:1fr 1fr; gap:12px` (≤1280 `1fr`). Option buttons are 364x93 at 1440.
- **Option** (`<button aria-label="Option {A-D}: {text}">`):
  - Box: `display:flex; align-items:flex-start; gap:16px; padding:20px 24px; border-radius:8px; text-align:left; cursor:pointer`.
  - Colours: `background:#121212` (elevation0); `border:1px solid #454545`.
  - `transition: background 150ms ease, border-color 150ms ease`.
  - Key badge: 28x28, `border-radius:4px; background:#212121; color:#A7A7A7; font:600 13px/1 Inter` (at ≤799 the badge measured 16px), flex-centred, letters A–D.
  - Text: P16 `#FFF`, `line-height:24px; padding-top:3px`.
- **Option states:**

| State | Box bg | Border | Key badge |
|---|---|---|---|
| default | `#121212` | `1px #454545` | bg `#212121`, text `#A7A7A7` |
| hover (`:hover:not(:disabled)`) | `#191919` (elevation1) | `#A7A7A7` | bg `#2C2C2C`, text `#FFFFFF` |
| selected | `#6798FF` (accentTertiary; it transitions there over 150ms, and mid-transition reads as rgb 83,119,195) | transparent | unchanged (`#212121` / `#A7A7A7`) |
| disabled (all options while a selection is pending) | unchanged | | `cursor:default`, no hover |

- **Flow logic (source):**
  ```js
  onClick(i): if (selected !== null) return;
    setSelected(i);                      // all options disabled
    setTimeout(() => {
      answers.push(i + 1);               // A=1, B=2, C=3, D=4
      setSelected(null);
      if (q + 1 < questions.length) setQ(q + 1);   // no transition between questions; content swaps
      else setState('result');
    }, 280);
  ```
  There's no back button and no keyboard shortcut beyond normal button focus. Each quiz has 10 questions × 4 options (verbatim in data).

### State 3: Result (`max-width:640px`)
- **Tier bar:** `display:flex; gap:8px`, with 5 segments of `32x4px; border-radius:2px`. Active segments (`level <= result`) are `#6798FF`, the rest `#2C2C2C`. `transition: background 150ms ease`. It has `role=img aria-label="Level {n} of 5"`.
- Spacer 24.
- Eyebrow "Level {n} of 5" (Mono 500 14/22, `#6798FF`).
- Spacer 16.
- H1 H48: the tier name (e.g. "The Intelligence Engine"); `tabIndex=-1`, and it gets focus.
- Spacer 16.
- Tagline `p` H24: 24/32 w500 ls -0.5 **`#A7A7A7`** (≤799 18/24).
- Spacer 24.
- Description P18 `#A7A7A7` (placeholder).
- If `cost` isn't empty:
  - Spacer 32.
  - Block with `border-left:3px solid #6798FF; padding-left:20px`, containing:
    - Heading `p` P14 w600 ls .08em uppercase `#6798FF`, mb 8: "What this costs you".
    - P16 `#A7A7A7`.
- If `nextLevel` isn't null: spacer 24, then P16 `#A7A7A7` *italic*.
- Spacer 40.
- **"How Dovetail helps" card:** `background:#191919; border-radius:8px; padding:20px 24px` (640x176 at 1440).
  - Label Mono 500 14/22 ls .08em uppercase `#6798FF`, mb 10.
  - Body P16 `#A7A7A7` `line-height:26px`.
- Spacer 16.
- "Your score: {sum} / {4*count}" P14 `#A7A7A7`.
- Spacer 40.
- **Button row:** `display:flex; flex-wrap:wrap; gap:12px` (≤799 `flex-direction:column`, full-width buttons 358x38).
  - Primary (white) label and target by level:
    - level ≤2: "Start for free" → `/auth/signup/`.
    - level ≤4: "Book a demo" → `/request-a-demo/`.
    - level 5: "Talk to us" → `/request-a-demo/`.
  - Secondary "Retake quiz" resets to the intro state.
- **Scoring (source, exact):**
  ```js
  avg = sum(answers) / (4 * answers.length);
  tier = avg <= .4 ? T1 : avg <= .575 ? T2 : avg <= .75 ? T3 : avg <= .9 ? T4 : T5;
  ```
  Answering all D gives 40/40, which is level 5. Level 5 has an empty `cost` and `nextLevel` null, so those blocks are hidden.
- After the result section: CTA footer slice (heading "Turn customer feedback into product innovation"; "Start for free" + "Book a demo"), then the dark final CTA, then the footer. This is also in data under `roleQuizzes.*.ctaFooter`.

### Measured result layout (all-D run, research quiz)
- 1440: wrapper x=400, w640; H1 at y=275 (56 tall); "How Dovetail helps" card 640x176; buttons "Talk to us" 98x40 and "Retake quiz" 112x40. Document height 3194.
- 390: H1 24/32; tagline 18/24; card 358x240; buttons stacked full width. Document height 3972.

## Motion summary
| Thing | Spec |
|---|---|
| Option hover / select | bg + border 150ms ease |
| Advance to next question | 280ms after click (selection visible), then instant swap |
| Progress fill | width 300ms ease |
| Tier segments | bg 150ms ease (no stagger) |
| Focus management | question H2 / result H1 focused on each state change |
| Analytics | quiz_started / quiz_completed / cta events (don't replicate) |
