Source: https://dovetail.com/aws-summit-sydney-2026/

# Template: campaign-aws-summit (`/aws-summit-sydney-2026/`): standalone campaign landing

Data: `src/data/company/aws-summit-sydney-2026.json`. Shared components: `specs/company-shared.md`. Decorative SVGs are in `/assets/company/svg/aws-*.svg` and `/assets/company/media/bng/*.svg`.

**Page chrome is unique:**
- **No banner, no site nav, no site footer.**
- `html { background:#0044FF }`. The whole page is blue, except the careers block near the bottom, which is `#0A0A0A`.
- `<main>` starts at y=0 and holds its own nav and footer.
- A skip link "Skip to content" → `#main-content` sits off-screen at `translateY(-80px)`.
- Measured page height: 7,819 at 1440.

## 0. Campaign nav (`nav`, inside `<main>`)
- **Box:** `height:88px; display:flex; justify-content:space-between; align-items:center; padding:24px; position:relative; z-index:5; margin:auto` (≤799 centred, `padding:0 32px`).
- **Logo link** → `/`: 196x53 hit area holding a 172x31 wordmark SVG `svg/aws-nav-wordmark.svg` (fill `#FAFAFA`, `display:block`). Hover colour `rgba(255,255,255,.8)`; focus outline 1px white.
- **Right buttons** (flex, gap 8; hidden ≤799). Both are **18/24 w500, padding 10px 16px, 46 tall** (≤1280 16/24):
  - "Join the team" → `#careers-slice`: bg `#FFF`, border 1px `#FFF`, text `#0A0A0A`; hover `#CECECE`. 147 wide.
  - "Get 60 days full access" → `#60-day-trial-offer`: bg `#0A0A0A`, text `#FFF`; hover `rgba(10,10,10,.8)`. 229 wide.
- **Mobile sticky CTA bar** (≤799 only):
  - `position:fixed; bottom:0; left:0; right:0; z-index:5`, `transition: opacity .3s, transform .3s, visibility .3s` (visible state: opacity 1, `translateY(0)`).
  - A 204-tall gradient behind it: `linear-gradient(0deg, #0044FF 70.33%, transparent 100%)`.
  - Buttons: flex column, gap 8, `padding:0 32px 32px`, the same two buttons at full width.

## 1. Hero: "The best never guess" (blue)
- **Section:** flex column, `min-height:100vh; position:relative` (≤799 auto, `overflow-x:clip`). It sets `--hero-text-size: min(9.26vw, 170px, calc((100vh - …)/3.9))` at ≥1281 (`fitViewport`).
- **Top banner:** `linear-gradient(0deg, transparent, #0044FF)`, `height:14vh`, `inset:-88px 0 0`, z 1.
- **Decorations** (absolute, `pointer-events:none`; SVG paths have `opacity:.95`, every `path:nth-of-type(5n+2)` has `opacity:.3`; all start at `opacity:0`):
  - Desktop (hidden ≤1280):

    | SVG | Size | Position |
    |---|---|---|
    | `aws-deco-hero-top-left.svg` | 641x478 | `left:0; top:-88px` |
    | `aws-deco-hero-top-right.svg` | 620x376 | `right:0; top:-88px` |
    | `aws-deco-hero-bottom-left.svg` | 588x726 | `left:0; bottom:-220px` |
    | `aws-deco-hero-bottom-right.svg` | 302x526 | `right:0; bottom:-120px` |

  - ≤1280: `aws-deco-hero-mobile-1..4.svg` at `left:0; top:-128px`, `right:0; top:-128px`, `left:0; bottom:16%` and `right:0; bottom:15%`.
- **Words block:** absolute, `left:0; right:0; top: calc(50vh - 88px); transform: translateY(-50%)`, flex column, centred (≤799 relative, `padding-top:36px`).
  - Inner wrapper: `margin-bottom:-12vh`.
  - Contents: a visually-hidden `h1` "The best never guess", then the 4-row word stack with logo tiles.
  - **This is CLONE_SPEC §10 (homepage final CTA) with the same words, tile SVGs** (`/assets/svg/cta-logo-*.svg`, reused byte-identical) **and tile mechanics.** Differences:
    - Text colour `#FFF` on blue.
    - Tile positions use this page's table:

      | Row / tile | Position | ≤799 |
      |---|---|---|
      | The → salesforce | `left:108%; top:-8%` | top 0% |
      | best → aws | `left:-92%; top:-50%` | top -45% |
      | best → canva | `left:-56%; top:16%` | left -58%, top 18% |
      | best → airwallex | `right:-60%; top:-8%` | top 0% |
      | never → notion | `left:70%; top:-22%` | left 72%, top -18% |
      | never → zapier | `right:-54%; top:-48%` | top -42% |
      | guess → wise | `right:86%; top:-30%` | top -28% |
      | guess → breville | `right:115%; top:-78%` | top -75% |

    - Row transforms: The `translateX(-50%)`; best `translate(1%,-15%)`; never `translate(-35%,-42%)`; guess `translate(17%,-70%)`.
  - Word font: 170px, ls -6.8 on the stack; each word is `var(--hero-text-size)` w600 ls -4. At ≤1512 `9.26vw` with ls -0.01736vw → 133.344px at 1440. At ≤1280 `clamp(80px,10vw,170px)`, lh .9. At ≤799 80px in the stack (words 56/64 ls -2), wrapper `scale(.82)` (≤588 `.72`).
  - Measured at 1440: "The" 247.8x133.3, "best" 281.4, tiles 150x150 (Salesforce 214x150).
- **Motion (observed live, mount, after hydration):**
  - Rows fade 0→1, then the tiles go from opacity 0 / scale ≈.98 → 1 (the same GSAP `power2.out` timeline as CLONE_SPEC §10).
  - Then the 4 desktop decorations fade from opacity 0 to 1, top-left first, then top-right, then the bottom pair (sampled: TL .36 / TR .06 while the bottoms were still 0; all 1 about 0.7s later).
  - **The decoration tween source sits in a lazy chunk I couldn't de-minify.** Use roughly a 0.6s fade each with about 0.1s stagger, after the tile stagger.

## 2. Text slice (blue)
- Wrapper relative, with a decoration img `media/bng/text-slice-bottom-right-decoration.svg` (371x418) at the bottom right.
- **SliceContainer** (padding 124 / 64 / **32**), centred column `max-width:783px; margin:0 204.5px` (783 wide at 1440).
  - `h2`: 40/48 w500 ls -1 `#FFF` (≤1280 32/40; ≤799 24/32), margin-bottom 32. About 300 chars, placeholder. It contains an inline `[ ]` **logo rotator**:
    - Window: inline-block, 34 tall (≤799 32), `overflow:hidden; vertical-align:middle`.
    - Column of 10 slots (5 logos × 2), each 120x34 (≤799 112x32), contain-fit SVGs `svg/aws-text-rotator-{airwallex,lovable,qantas,shopify,wise}.svg`.
    - Animation `rotator-5 6s ease-in-out infinite`:
      ```css
      @keyframes rotator-5{0%,10%{transform:translateY(0)}13%,30%{transform:translateY(-10%)}33%,50%{transform:translateY(-20%)}53%,70%{transform:translateY(-30%)}73%,90%{transform:translateY(-40%)}93%,100%{transform:translateY(-50%)}}
      ```
  - Button row (flex, gap 8, wrap): "Get 60 days full access" (black, 46 tall) → `#60-day-trial-offer`.
- Spacer 224 (≤1280 96).

## 3. Testimonial (blue)
- SliceGrid (padding 124 / 64 / 32).
- **Quote column** (`span 9`; ≤799 order 1):
  - `blockquote`: H64 (64/68 ls -2; ≤1280 48/52; ≤799 32/36), `margin:0 0 24px; max-width:860px`. The quote is one sentence: "“Dovetail enables us to access all of Breville’s customer data gathered from around the globe—all in one place.“"
  - Attribution `p` "Constance Docos, Senior UX Designer at Breville": H24, margin-top 64 (≤1280 0).
- **Images column** (`10 / span 3`, flex, `align-items:flex-end`; ≤799 order 0). Two 160x160 tiles (≤1280 80x80):
  - `media/breville-girl.webp` (cover), `translateX(12px)`.
  - `media/breville.png` (contain), z 1; ≤1280 `translateX(-24px)`.
- Mobile decoration `media/bng/mobile-testimonial-top-right-decoration.svg` (149x173) at `top:-25%; right:0` (≤1280 only).
- Spacer 96 (≤1280 40).

## 4. Customer stories (blue)
- **Desktop/tablet** (hidden ≤799): a 6-card grid of S2 CustomerStoryCards (`span 4`, gap `64px 32px`) with **hover pixels `#0A0A0A`**. Stories: Itaú, Atlassian Design, Canva AI, Breville, CNH, SmartRecruiters (see data `sections`).
- **≤799:** an S8 Carousel with 6 cards (track `repeat(6, 1fr)`, gap 16, `margin:0 32px`, `width: calc(-240px + min(545.455%, 1745.45px))`). Right fade `linear-gradient(90deg, transparent, #0044FF)`. Progress bar padding `48px 32px 0`.
- Spacer 246 (≤1280 96).

## 5. "Why teams like [] are innovating with ↳ Dovetail" (blue)
- Decorations:
  - `media/bng/team-switch-left-center-decoration.svg` (201x730): left, vertically centred.
  - `team-switch-right-top-decoration.svg` (234x442): `right:0; top:-14%`.
  - `team-switch-right-bottom-decoration.svg`: `right:0; bottom:-16%`.
  - Mobile variants at `left:0; bottom:-6%` and `right:0; top:55%` (≤1280).
- SliceGrid (`gap:0 32px`; ≤799 `16px 24px`; padding 124 / 64 / 32):
  - `h2` "Trusted by the best. Built by us.": 28px w500 ls -0.22, centred, full width (hidden ≤799).
  - Four big lines: 124px w600, **lh 1.15**, ls -3, colour inherit (≤1280 72px ls -2, centred flex, lh 1.3 for 800–1280; ≤799 40px ls -1):

    | Line | Grid column | Transform (≤799 adds) |
    |---|---|---|
    | "Why teams" | `3 / -1` | ≤799 `translateX(-16px)` |
    | "like [rotator] are" | `4 / -1` | `translateY(-16px)` (≤799 `translateX(16px)`) |
    | "innovating with" | `3 / -1` | `translateY(-32px)` (≤799 `translateX(-16px)`) |
    | "↳ Dovetail" | `5 / -1` | `translateY(-48px)` (≤799 `translateX(16px)`) |

    - Rotator window: 124x124 (≤1280 72; ≤799 48), `overflow:hidden; margin:0 .15em; vertical-align:middle`. 8 slots (4 logos × 2: Notion, Canva, Itaú, Zapier; `svg/aws-team-rotator-*.svg`).
    - Animation `rotator-4b 6s ease-in-out infinite`:
      ```css
      @keyframes rotator-4b{0%,10%{transform:translateY(0)}13%,30%{transform:translateY(-12.5%)}33%,50%{transform:translateY(-25%)}53%,70%{transform:translateY(-37.5%)}73%,90%{transform:translateY(-50%)}93%,100%{transform:translateY(-50%)}}
      ```
  - `h2` (full width): 40/48 w500 ls -1, `max-width:832px; margin:96px auto` (≤1280 `48px 0`; ≤799 0). About 195 chars, placeholder.
  - Stats eyebrow (column `3 / -1`): "Forrester’s The Total Economic Impact™ of Dovetail" in M14 `#FFF`, margin-bottom 32.
  - **Three stats** at columns `3 / span 3`, `span 3`, `span 3` (≤1280 full width; ≤799 `span 3` / `2 / span 3` / `3 / span 3`, a staggered layout):
    - Value: H80 (80/84 ls -2; ≤1280 64/68; ≤799 64px), margin-bottom 4 (≤799 8).
    - Label: H20 (≤799 14/21, margin-bottom 32).
    - Stats: "2.3x" "Return on investment"; "30%" "Increased team capacity"; "66%" "Faster shipping".
- Spacer 246 (≤1280 64).

## 6. 60-day trial form (`id="60-day-trial-offer"`, blue)
- Decorations: `media/bng/form-bottom-left-decoration.svg` and `form-bottom-right-decoration.svg` at the bottom corners.
- SliceGrid (`gap:96px 32px`; ≤799 `32px 24px`):
  - `h2` (`span 11`): H64. Text: "Join the world's leading teams." + `<br>` + "Sign up for Enterprise and get your first 60 days on us."
  - Form column (`3 / span 7`, 682 wide at 1440):
    - `h3`: 32/40 w500 ls -0.5, margin-bottom 64. About 209 chars, placeholder.
    - **Underline form** (static, non-submitting):
      - Form box: transparent, no border or padding, gap 16. Fieldsets are single-column.
      - Labels are visually hidden; placeholders carry the labels.
      - Inputs: `background:transparent !important; border:none; border-bottom:1px solid #FFF; border-radius:0`, 20/28 (≤1280 16/24), `padding:10px 40px 16px 0`, `color:#FFF`. Placeholder colour `rgba(255,255,255,.64)`. Hover/focus keeps the same 1px white underline.
      - Fields (all required):
        - "First name*" (text, `firstname`)
        - "Last name*" (text, `lastname`)
        - "Company email*" (email)
        - "Company name*" (text)
        - "Job title*" (text)
        - "Phone number*" (tel)
      - Consent text (12/16, `margin:24px 0`): placeholder 252 chars. It contains links "Terms of Service" and "Privacy Policy".
      - Submit "Register now": bg `#0A0A0A`, text `#FFF`, 18/24, pad 10px 16px, height 46, `width:fit-content` (146 wide). Hover `rgba(10,10,10,.8)`.
- Spacer 246 (≤1280 96), then another 246.

## 7. Careers block (`id="careers-slice"`, black), entered through a blue→black pixel band
- **Pixel band:** S10 with `margin-top:-320px`, sectionHeight 320, **pixelSize 100**: 4 rows of 15 squares at 1440, each 100x80.
  - Background is `#0044FF` (`backgroundColor` override), so the squares flip from transparent to blue as you scroll, revealing black below.
  - Its child is a `#0A0A0A` block.
  - **`animateInMobile` is false**, so it's hidden ≤1280.
- **Content** (`bg #0A0A0A`): spacer 160 (≤1280 64), then the section:
  - Decoration `media/bng/careers-right-center-decoration.svg` (231x939), right, vertically centred. A mobile variant sits at `bottom:-23%`.
  - SliceGrid with `gap:96px 32px` (≤799 `64px 24px`, padding 32).
  - **Left column** (`span 8`):
    - `h2` "Build with the best in Sydney for the best globally.": H64, margin-bottom 32. It holds an inline photo rotator:
      - Window: 80 tall (≤1280 72; ≤799 48), `overflow:hidden`.
      - 12 slots (6 photos × 2), `media/image-ale.png`, `image-3.png`, … (176x176 sources), each 80x80 with `margin:0 8px`.
      - Animation `rotator-6 8s ease-in-out infinite`:
        ```css
        @keyframes rotator-6{0%,13%{transform:translateY(0)}16%,29%{transform:translateY(-8.33%)}32%,45%{transform:translateY(-16.67%)}48%,61%{transform:translateY(-25%)}64%,77%{transform:translateY(-33.33%)}80%,93%{transform:translateY(-41.67%)}96%,100%{transform:translateY(-50%)}}
        ```
    - `p`: 24/32 w400 ls -0.5 (≤1280 16/24). About 120 chars, placeholder.
  - **Roles column** (`span 9`):
    - `h3` "Engineering roles": 32/40 w500 (≤1280 24/32), margin-bottom 32.
    - S4 row list: "Sydney" / "Security Engineering Lead" → Ashby.
  - **Referral block** (`span 8`):
    - `p`: 32/40 w500, margin-bottom 32. About 94 chars, placeholder (mentions a referral reward).
    - Button "Refer a mate": white, 46 tall (139 wide) → `https://jobs.ashbyhq.com/dovetail/form/tbng-refer-a-mate`.

## 8. Campaign footer (`<footer>`, inside the black area)
- `position:relative; z-index:1`, SliceContainer (padding 124 / 64 / 32). 228 tall.
- Row: M14-style 14px uppercase ls 1, `display:flex; flex-direction:row-reverse; justify-content:space-between; align-items:center; padding:64px 0` (≤799 column, start-aligned, `padding:96px 0 32px`).
- Links (flex, wrap, gap 32; ≤799 column, gap 16): "Cookie preferences" (button), "Trust center" → `https://trust.dovetail.com/`, "Legal and privacy" → `/legal/`. All `#FFF`, hover `#A7A7A7`.
- Copyright "©2026 Dovetail": `#FFF`, `margin:32px 0 48px`.

## Motion summary
| Thing | Trigger | Details |
|---|---|---|
| Hero words/tiles | mount | CLONE_SPEC §10 GSAP timeline |
| Hero decorations | mount, after tiles | opacity 0→1, staggered (observed; source not recovered) |
| Text / team / careers rotators | always | CSS keyframes 6s / 6s / 8s ease-in-out infinite |
| Story cards | hover ≥1281 | S2 with `#0A0A0A` pixels |
| Blue→black pixel band | scroll scrub | S10, pixelSize 100, rows 4 |
| Mobile CTA bar | — | fixed. The opacity/transform transitions .3s exist, but I didn't observe a hide trigger |

## Gaps
- The decoration fade timing is observed, not from source.
- The mobile sticky-bar hide/show trigger wasn't observed (it may hide near the form).
