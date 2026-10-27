Source: https://dovetail.com/

# Template: `deploy` (1 page): `/deploy/`

A one-off page component (`e13mcwun*`, `PageLayout hideFooterCtaSlice hideHeaderSpacing`). The wrapper `.e13mcwun0 {display:contents}` sets `text-wrap:balance` on all h1–h3. Chrome: default alert bar and transparent nav (`main` y=118). **Footer variant C (plain)**, because the page ends with its own CtaFooterSlice. Data: `src/data/marketing/deploy.json` (plus `form` field definitions). Read `marketing-shared.md` and `enterprise.md` (shared hero pattern and Security slice).

## 0. Order (Spacer default 200 / 96)
1. Spacer hero 96 → **DeployHero** (same pattern as EnterpriseHero: BaseHeading in Column span 8 + image column with `top:-200px; margin-bottom:-200px`)
2. Spacer → **CompactLogoSlice**
3. Spacer → **Intro paragraph** `.e13mcwun2` (P20 white, centred, max-width 880; placeholder 389 chars)
4. Spacer → **Problems heading** `.e13mcwun3` (max-width 880): eyebrow "The problems we solve", H64 "Three problems. One delivery team." (max 780), P20 (max 620, margin-top 32; placeholder)
5. 3 × [Spacer INNER_SECTION (96 / 56) → **ProblemSection**]
6. Spacer → **FeatureGridSlice** "Why Deploy" (`ec4h65o*`)
7. Spacer → **SecurityAndCompliance** (same as `enterprise.md` §5, without the pixel wrapper; bg `Frame_1948762767.png`)
8. Spacer → **Scoping call** SliceGrid `#book-a-call`: sticky heading + SalesforceForm
9. Spacer → **FAQ** (8 questions)
10. **CtaFooterSlice** "Deployed by the team that builds it." with a single primary "Book a scoping call"

Measured at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `e13mcwun1` | 1192x853.4 @x124 | 1152x824.8 @x64 | 736x527 @x16 | 358x256.3 @x16 |
| `e13mcwun2` | 880x140 @x280 20px/28px | 880x96 @x200 16px/24px | 736x120 @x16 16px/24px | 358x240 @x16 16px/24px |
| `e13mcwun5` | 478x663.6 @x124 | 540x583.6 @x64 | 540x583.6 @x16 | 358x759.6 @x16 |
| `e13mcwun6` | 580x565.8 @x736 | 1152x1118.8 @x64 | 736x716.6 @x16 | 358x351.1 @x16 |
| `ec4h65o1` | 376x28 @x124 20px/28px | 564x28 @x64 20px/28px | 736x24 @x16 16px/24px | 358x24 @x16 16px/24px |
| `e10uz04f0` | 1192x987 @x124 | 1152x1289 @x64 | 736x2579 @x16 | 358x2867 @x16 |
| `e13mcwun11` | 478x427.6 @x124 | 1152x283.6 @x64 | 736x215.6 @x16 | 358x275.6 @x16 |
| `exedsyc0` | 682x816 @x634 | 1152x888 @x64 | 736x904 @x16 | 358x936 @x16 |

Page height 10086 at 1440.

## 1. DeployHero
- Eyebrow "Dovetail Deploy".
- `h1` **H80** (max 774): "Deployed by the team that builds it."
- P20 subheading (max 508; placeholder).
- **One** primary `<button>` "Book a scoping call". **Behaviour:** smooth-scroll to `#book-a-call` with a 120px offset (`window.scrollTo({top: el.top + scrollY - 120, behavior:"smooth"})`). The footer CTA button does the same.
- Image `continuous_AI_analysis__9_.png` (same as `/enterprise/`).

## 2. ProblemSection ×3
SliceGrid. Columns alternate:
- even (0, 2): text `1 / span 5` (order 1), image `7 / span 6` (order 2);
- odd (1): text `8 / span 5` (order 2), image `1 / span 6` (order 1);
- ≤1280: both full width, text first.

Text column `.e13mcwun5` (flex column, gap 24, max-width 540):
- head (gap 12): Eyebrow (M14 `#A7A7A7`: "Migrate", "Restructure", "Embed") and h3 **H32** white (mb 8);
- three blocks (gap 8 each): a label P16 **w600, letter-spacing .04em, uppercase, white** ("The problem", "How we solve it", "The outcome"), then P16 `#A7A7A7` (placeholders).

Images: `centralize-workflow.png` (1448x1400), `DV12__1_.png` (1232x920), `automate-workflow.png` (1448x1400), width 100%.

## 3. FeatureGridSlice "Why Deploy" (`ec4h65o*`)
- SliceGrid > Column span 9: BaseHeading with eyebrow "Why Deploy" and H64 "Why enterprises choose Deploy". Spacer INNER_SECTION.
- SliceGrid of **3 items**, Column `span 4` (tablet 6), 376 wide at 1440: "Configured deeper than the docs go", "The same team that builds the product", "Built for the whole organization, not just one team" (check the data file for exact text). Each item:
  - a 64x64 pictogram SVG (mb 16; files `svg/etid8i68-*.svg`);
  - h3 **H20** (mb 16);
  - P16 `#A7A7A7` (max-width 456).

## 4. Scoping call (`#book-a-call`)
- Column `span 5` (tablet full) holds `.e13mcwun11` **sticky** (`position:sticky; top:120px`; md static) with a BaseHeading: eyebrow "Book a scoping call", H64 "Tell us what you’re trying to do." (max 520), P20 (max 480; placeholder).
- Column `span 7` holds **SalesforceForm (minimal)** `.exedsyc0`:
  - `<form>`: flex column, gap 24, pad 32, bg `#1E1E1E`, border 1px `rgba(255,255,255,.08)`, radius 8.
  - Fields (labels 16/24 white with a red-less `*` span, margin-left 2, `aria-hidden`; label mb 8):
    - Email (`type=email`, placeholder "jane@acmeinc.com");
    - row (flex, gap 16): First name ("Jane"), Last name ("Doe"), each 221px wide at 1440;
    - Company name ("Acme Inc.");
    - Company size (select: "Please Select", "1-25", "26-200", "201-500", "501-1000", "1001-5000", "5000+");
    - "What are you trying to do?" (textarea, 200px tall).
  - Inputs: height 40, pad `10px 16px`, bg `rgba(255,255,255,.04)`, border 1px `rgba(255,255,255,.48)`, radius 8, `transition: all .3s`. Focus is bg `.08`, border `.64` (theme `form.inputFocus*`).
  - Consent copy (12/16 white) with "Terms of Service" and "Privacy Policy" links (new tab). It's long, so it's a placeholder.
  - Submit button: full width, 38 tall, bg white, `#0A0A0A` 16/18 w500, radius 8, `transition: background .15s, color .15s`.
  - Behaviour (don't wire up a backend): validation messages "Please complete this required field." and a business-email check. On success it shows "Thanks for reaching out!" / "Our team will be in touch with you shortly." and scrolls the form into view. Submission goes to a Netlify function, which is out of scope.

## 5. CSS (generated)
```css
/* e13mcwun0 = div 0x0 */
.e13mcwun0 { display: contents }
.e13mcwun0 h1, .e13mcwun0 h2, .e13mcwun0 h3 { text-wrap: balance }
/* e13mcwun1 = div 1192x853 */
.e13mcwun1 { grid-column: 1 / -1; order: unset; max-width: unset; min-width: unset; position: relative; top: -200px; margin-bottom: -200px; z-index: 1 }
@media (max-width: 1280px) { .e13mcwun1 { grid-column: 1 / -1; display: block } .e13mcwun1 { top: 0px; margin-bottom: 0px } }
@media (max-width: 799px) { .e13mcwun1 { grid-column: 1 / -1; display: block; min-width: unset } }
/* e13mcwun2 = p «Dovetail Deploy is the enterprise deploy» 880x140 */
.e13mcwun2 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin: 0px auto; max-width: 880px; text-align: center }
@media (max-width: 1280px) { .e13mcwun2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e13mcwun2 { font-size: 16px; line-height: 24px } }
/* e13mcwun3 = div 880x303 */
.e13mcwun3 { max-width: 880px }
/* e13mcwun5 = div 478x663 */
.e13mcwun5 { display: flex; flex-direction: column; gap: 24px; max-width: 540px }
/* e13mcwun4 = div 478x159 */
.e13mcwun4 { display: flex; flex-direction: column; gap: 12px }
/* e13mcwun7 = h3 «Getting Dovetail live with your existing» 478x120 */
.e13mcwun7 { font-family: $sans; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 40px; color: rgb(255, 255, 255); margin-bottom: 8px }
@media (max-width: 1280px) { .e13mcwun7 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .e13mcwun7 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* e13mcwun8 = div 478x152 */
.e13mcwun8 { display: flex; flex-direction: column; gap: 8px }
/* e13mcwun9 = p «The problem» 478x24 */
.e13mcwun9 { font-family: $sans; font-size: 16px; line-height: 24px; color: rgb(255, 255, 255); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase }
@media (max-width: 1280px) { .e13mcwun9 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e13mcwun9 { font-size: 16px; line-height: 24px } }
/* e13mcwun10 = p «Enterprise customer-intelligence history» 478x120 */
.e13mcwun10 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167) }
@media (max-width: 1280px) { .e13mcwun10 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e13mcwun10 { font-size: 16px; line-height: 24px } }
/* e13mcwun6 = div 580x565 */
.e13mcwun6 { width: 100% }
/* ec4h65o0 = svg 64x64 */
.ec4h65o0 { margin-bottom: 16px }
/* ec4h65o1 = h3 «Configured deeper than the docs go» 376x28 */
.ec4h65o1 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; margin-bottom: 16px }
@media (max-width: 1280px) { .ec4h65o1 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .ec4h65o1 { font-size: 16px; line-height: 24px } }
/* ec4h65o2 = p «The team in the room helped design Dovet» 376x168 */
.ec4h65o2 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); max-width: 456px }
@media (max-width: 1280px) { .ec4h65o2 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .ec4h65o2 { font-size: 16px; line-height: 24px } }
/* e13mcwun11 = div 478x427 */
.e13mcwun11 { position: sticky; top: 120px }
@media (max-width: 1280px) { .e13mcwun11 { position: static; top: unset } }
```

Form:
```css
/* exedsyc0 = div 682x816 */
.exedsyc0 { position: relative }
.exedsyc0 form { background-color: rgb(30, 30, 30); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; display: flex; flex-direction: column; gap: 24px; padding: 32px }
.exedsyc0 label { display: flex; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 24px; margin: 0px 0px 8px }
.exedsyc0 input, .exedsyc0 select, .exedsyc0 textarea { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.48); border-radius: 8px; box-sizing: border-box; color: rgb(255, 255, 255); font-family: Inter; font-size: 16px; font-weight: 400; height: 40px; letter-spacing: -0.5px; line-height: 28px; padding: 10px 16px; text-overflow: ellipsis; transition: 300ms; appearance: none; width: 100% }
.exedsyc0 input:hover, .exedsyc0 select:hover, .exedsyc0 textarea:hover, .exedsyc0 input:focus, .exedsyc0 select:focus, .exedsyc0 textarea:focus { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.64) }
.exedsyc0 input::placeholder, .exedsyc0 select::placeholder, .exedsyc0 textarea::placeholder { color: rgb(167, 167, 167) }
.exedsyc0 select { color: rgb(255, 255, 255); cursor: pointer; font-weight: 500; line-height: 24px; padding: 8px 16px }
.exedsyc0 select option { background: rgb(30, 30, 30); font-family: Inter }
.exedsyc0 textarea { height: 200px; resize: vertical }
.exedsyc0 a { text-decoration: underline }
@media (max-width: 1280px) { .exedsyc0 form { padding: 32px 20px } .exedsyc0 { margin: 48px 0px } }
/* exedsyc1 = div 616x72 */
.exedsyc1 { display: flex; flex-direction: column }
/* exedsyc3 = span «*» 8x24 */
.exedsyc3 { margin-left: 2px }
/* exedsyc2 = div 616x72 */
.exedsyc2 { display: flex; gap: 16px }
@media (max-width: 1280px) { .exedsyc2 { flex-direction: column } }
/* exedsyc5 = div 616x48 */
.exedsyc5 p { font-size: 12px; font-weight: 400; line-height: 16px }
/* exedsyc7 = button «Submit» 616x38 */
.exedsyc7 { background-color: rgb(255, 255, 255); border: 0px; border-radius: 8px; color: rgb(10, 10, 10); cursor: pointer; font-family: Inter; font-size: 16px; font-weight: 500; letter-spacing: 0px; line-height: 18px; min-width: 146px; padding: 10px 16px; transition: background 150ms, color 150ms; width: 100% }
.exedsyc7:hover, .exedsyc7:focus-visible { background-color: rgb(206, 206, 206) }
.exedsyc7:disabled { cursor: not-allowed; opacity: 0.7 }
```

## 6. Motion
- CTA buttons smooth-scroll to the form.
- The scoping heading is sticky (top 120) beside the form.
- Shared: logo marquee, FAQ, buttons.
- No entrance animations.

## 7. Gaps
- I didn't trigger the form's error or success states. The copy comes from source.
