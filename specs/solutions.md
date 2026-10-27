Source: https://dovetail.com/

# Template: `solutions` (4 pages)

Covers `/solutions/healthcare/`, `/solutions/product-research/`, `/solutions/research-repository/` and `/solutions/voice-of-customer/`.

All four render one page component (export `default` in the solutions chunk, classes `eccoft*`) fed by a CMS `page` object. The DOM sequence is identical apart from:
- the number of alternating sections (4 / 4 / 7 / 6);
- an optional **features grid** (voice-of-customer only);
- an optional **testimonial** (absent on healthcare).

Chrome: default alert bar, transparent nav, hero pulled under the nav (`margin-top:-88px; padding-top:88px`). Footer is **variant B (ctaBand)** (marketing-shared §6). Its heading is `page.ctaSlice.heading`, or the default "Turn [lottie] *feedback* into <br>product innovation" (see §7). Data: `src/data/marketing/solutions__<name>.json` (`chrome.footerCta` holds the band heading and buttons).

## 0. Section order (spacers: desktop / ≤1280 / ≤799)
1. **SolutionHero** (GridBackground)
2. Spacer 120 / 64 / 64
3. **CompactLogoSlice** (shared §7.5), heading "Connecting the world's leading teams to their customers", `maxWidth:1328px; margin:0 56px`
4. Spacer 56
5. **SolutionSection** × N (alternating image/text; a section without an image renders centred)
6. (VoC only) Spacer 96 → **SolutionFeatures**
7. (if testimonial) Spacer 200 / 96 → **TestimonialSlice** (shared §7.4)
8. Spacer 200 / 96 → `div#trial-cta` > **SolutionTrial**
9. Spacer 200 / 96, then Spacer type SECTION (200 / 96) → **FAQ** (shared §7.1; answers may contain `|||` paragraph breaks rendered as block spans with 16px between) → Spacer SECTION (200, last child → 160 at ≥1281)

Measured (voice-of-customer) at 1440 / 1280 / 768 / 390:

| el | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `eccoft00` | 1440x845.6 @x0 | 1280x651.6 @x0 | 768x591.6 @x0 | 390x733.6 @x0 |
| `e18o1u1v3` | 700x180 @x370 56px/60px | 520x132 @x380 40px/44px | 736x72 @x16 32px/36px | 358x144 @x16 32px/36px |
| `eccoft02` | 1440x819.4 @x0 | 1280x1483.4 @x0 | 768x1121.2 @x0 | 390x907.7 @x0 |
| `eccoft06` | 376x192 @x124 40px/48px | 1152x40 @x64 32px/40px | 736x32 @x16 24px/32px | 358x64 @x16 24px/32px |
| `eccoft010` | 682x659.4 @x634 | 1152x1113.8 @x64 | 736x711.6 @x16 | 358x346.1 @x16 |
| `eccoft04` | 724x280 @x358 | 724x262 @x278 | 724x246 @x22 | 358x374 @x16 |
| `eccoft014` | 1192x168 @x124 | 1152x244 @x64 | 736x496 @x16 | 358x496 @x16 |
| `e1a8inxt0` | 1440x840 @x0 | 1280x702 @x0 | 768x700 @x0 | 390x700 @x0 |
| `e1a8inxt2` | 827x204 @x307 64px/68px | 827x104 @x227 48px/52px | 736x72 @x16 32px/36px | 358x108 @x16 32px/36px |
| `e1a4s9wi1` | 1080x168 @x180 | 1152x148 @x64 | 736x148 @x16 | 358x148 @x16 |

## 1. SolutionHero (`eccoft00` + GridBackground `e1ujd0230`)
- Background is a 48px **grid of 1px lines**: `background-image: linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px); background-size:48px 48px; transform:translateZ(0)`.
- Top fade: GradientBanner, 143px tall (sm 100), `linear-gradient(0deg, transparent, #0A0A0A)` at the top.
- Bottom fade: 160px (sm 140), `linear-gradient(180deg, transparent, #0A0A0A)` at the bottom.
- Content, top to bottom:
  1. Spacer hero (96 / sm 56).
  2. SliceGrid > Column span 12 > **BaseHeading, centred, hero**:
     - eyebrow = page title (M14 `#A7A7A7`, margin-bottom 32), e.g. "Healthcare";
     - `h1` **H56** with max-width **700** (md 520, sm none), centred. The live md override shows the h1 at 40/44, which is the H56 md step;
     - subheading P20 **white** (max-width 640, margin `32px auto`);
     - buttons (centred, gap 8): **"Start a 60-day free trial"** (primary). Its click calls `preventDefault` and smooth-scrolls to `#trial-cta`; the link is `#trial-cta`. Then **"Contact sales"** (secondary → `/contact-sales/`).
  3. Note `p.eccoft01`: "No credit card required. Bring your existing data. Free migration included." (P14, `rgba(255,255,255,.6)`, margin-top 32, centred).
  4. Spacer 160 (sm 96).

## 2. SolutionSection (`eccoft02`, SliceGrid with `align-items:center; padding:80px 124px`; md `48px 64px`)
- **With image.** The text column `.eccoft03` and the image column alternate:
  - for even-indexed image sections, text is `1 / span 4` and image `6 / span 7`;
  - for odd ones, image is `1 / span 7` and text `9 / span 4`;
  - at ≤1280 both are `span 12`, stacked in DOM order.
- Text column contents: eyebrow (M14 `#A7A7A7`, mb 32); `h2` **H40** white (40/48 w500 ls -1; md 32/40; sm 24/32); P16 `#A7A7A7` (margin-top 16); buttons (margin-top 32, gap 8): "Start a 60-day free trial" + "Contact sales".
- Image: `width:100%; border-radius:12px` (natural sizes in the data file, e.g. `automatic-redaction.png` 2048x1056).
- **Without image.** A centred column `.eccoft04` (max-width 724, `align-items:center; text-align:center`) with the same parts. VoC's quoted pain-point sections ("“I know what customers are say…”") use this.

## 3. SolutionFeatures (VoC)
SliceGrid:
- Column `span 7`: `h2` H40, P16 secondary (mt 16), buttons;
- Column span 12: Spacer 96, then grid `.eccoft014` (`repeat(3,1fr)`, gap 48; md 2 columns, gap 32; sm 1). Each item has `h3` H20 white and P16 `#A7A7A7`, gap 8.

## 4. SolutionTrial (`e1a8inxt*`)
- Root: bg `#0044FF` with `background-image:url(/assets/marketing/solution-trial-grid-bg.svg)` (cover, centred), `min-height:700px`, flex column centred, overflow hidden.
- Four blue GradientBanners fade the edges: top and bottom 180px (sm 120) `#04F → transparent`; left and right 108px wide.
- SliceGrid (padding `164px 124px`; sm `80px 16px`) > Column `2 / span 10` (md 12) > centred column:
  - `h2` **H64** white (max-width 827, margin-bottom 32, `display:flex; flex-wrap:wrap; justify-content:center; column-gap:16px`): "Bring customer evidence into your next roadmap decision";
  - P20 white (max-width 860, mb 32);
  - buttons (gap 8, mb 64): "Start a 60-day free trial" primary → `https://dovetail.com/auth/signup?promo=ENTERPRISE_SOLUTIONS_2026_D60`, "Book a demo" secondary → `/contact-sales/`;
  - bullets `<ul>` (flex wrap, centred, `column-gap:16px; row-gap:8px`, max-width 851): each is a check icon (white, margin-right 4) + H14 white text. Bullets: "60 days full access, no feature limits", "Onboarding support from a research specialist", "Free migration from your current tool", "Full export if you decide not to continue".

## 5. CSS (generated, voice-of-customer)
```css
/* e1ujd0230 = div 1440x845 */
.e1ujd0230 { position: relative; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 48px 48px; background-repeat: repeat; background-position: 0px 0px; will-change: auto; backface-visibility: hidden; transform: translateZ(0px); margin-top: -88px; padding-top: 88px }
/* e18o1u1v3 = h1 «Your customers talk to you across ten ch» 700x180 */
.e18o1u1v3 { display: block; color: rgb(255, 255, 255); margin-left: auto; margin-right: auto; font-family: $sans; font-weight: 600; letter-spacing: -2px; font-size: 56px; line-height: 60px; max-width: 700px }
@media (max-width: 1280px) { .e18o1u1v3 { font-size: 64px; line-height: 68px; letter-spacing: -2px } .e18o1u1v3 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3 { max-width: 520px } }
@media (max-width: 799px) { .e18o1u1v3 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } .e18o1u1v3 { max-width: unset } }
/* e18o1u1v4 = p «Dovetail connects every feedback channel» 640x112 */
.e18o1u1v4 { margin: 32px auto; max-width: 640px; display: block; color: rgb(255, 255, 255); font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px }
@media (max-width: 1280px) { .e18o1u1v4 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e18o1u1v4 { font-size: 16px; line-height: 24px } }
/* e18o1u1v5 = div 1192x40 */
.e18o1u1v5 { margin-top: 32px; display: flex; flex-flow: wrap; gap: 8px; justify-content: center }
/* eccoft01 = p «No credit card required. Bring your exis» 1192x22 */
.eccoft01 { font-family: $sans; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 22px; color: rgba(255, 255, 255, 0.6); margin: 32px 0px 0px; text-align: center }
@media (max-width: 1280px) { .eccoft01 { font-size: 14px; line-height: 22px } }
@media (max-width: 799px) { .eccoft01 { font-size: 14px; line-height: 22px } }
/* eccoft02 = section 1440x819 */
.eccoft02 { display: grid; gap: 32px; grid-template-columns: repeat(12, 1fr); margin: auto; position: relative; width: 100%; padding: 80px 124px; max-width: 1512px; align-items: center }
@media (max-width: 1280px) { .eccoft02 { gap: 24px; grid-template-columns: repeat(12, 1fr) } .eccoft02 { padding: 0px 64px } .eccoft02 { padding-top: 48px; padding-bottom: 48px } }
@media (max-width: 799px) { .eccoft02 { gap: 24px; grid-template-columns: repeat(4, 1fr) } .eccoft02 { padding: 0px 16px } }
/* eccoft03 = div 376x571 */
.eccoft03 { display: flex; flex-direction: column }
/* eccoft06 = h2 «Ask about your customers. Get cited answ» 376x192 */
.eccoft06 { font-family: $sans; font-size: 40px; font-weight: 500; letter-spacing: -1px; line-height: 48px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .eccoft06 { font-size: 32px; line-height: 40px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .eccoft06 { font-size: 24px; line-height: 32px; letter-spacing: -0.25px } }
/* eccoft07 = p «Type a question in plain language. Dovet» 376x240 */
.eccoft07 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); margin-top: 16px; margin-bottom: 0px }
@media (max-width: 1280px) { .eccoft07 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eccoft07 { font-size: 16px; line-height: 24px } }
/* eccoft08 = div 376x40 */
.eccoft08 { display: flex; flex-flow: wrap; gap: 8px; margin-top: 32px }
/* eccoft010 = img 682x659 */
.eccoft010 { width: 100%; height: auto; display: block; border-radius: 12px }
/* eccoft04 = div 724x280 */
.eccoft04 { display: flex; flex-direction: column; align-items: center; margin-left: auto; margin-right: auto; max-width: 724px; text-align: center }
/* eccoft09 = div 323x40 */
.eccoft09 { display: flex; flex-flow: wrap; gap: 8px; margin-top: 32px; justify-content: center }
/* eccoft014 = div 1192x168 */
.eccoft014 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px }
@media (max-width: 1280px) { .eccoft014 { gap: 32px; grid-template-columns: repeat(2, 1fr) } }
@media (max-width: 799px) { .eccoft014 { grid-template-columns: 1fr } }
/* eccoft015 = div 365x60 */
.eccoft015 { display: flex; flex-direction: column; gap: 8px }
/* eccoft016 = h3 «Support» 365x28 */
.eccoft016 { font-family: $sans; font-size: 20px; line-height: 28px; font-weight: 500; letter-spacing: -0.25px; color: rgb(255, 255, 255); margin: 0px }
@media (max-width: 1280px) { .eccoft016 { font-size: 20px; line-height: 28px; letter-spacing: -0.25px } }
@media (max-width: 799px) { .eccoft016 { font-size: 16px; line-height: 24px } }
/* eccoft017 = p «Zendesk, Intercom, Freshdesk» 365x24 */
.eccoft017 { font-family: $sans; font-size: 16px; font-weight: 400; line-height: 24px; color: rgb(167, 167, 167); margin: 0px }
@media (max-width: 1280px) { .eccoft017 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .eccoft017 { font-size: 16px; line-height: 24px } }
/* e1a8inxt0 = div 1440x840 */
.e1a8inxt0 { position: relative; background-color: rgb(0, 68, 255); background-image: url("/media/solution-trial-grid-bg.svg"); background-size: cover; background-position: center center; overflow: hidden; min-height: 700px; display: flex; flex-direction: column; justify-content: center }
/* e1a8inxt1 = div 988x512 */
.e1a8inxt1 { display: flex; flex-direction: column; align-items: center; text-align: center }
/* e1a8inxt2 = h2 «Bring customer evidence into your next r» 827x204 */
.e1a8inxt2 { font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px; color: rgb(255, 255, 255); margin: 0px 0px 32px; max-width: 827px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0px 16px }
@media (max-width: 1280px) { .e1a8inxt2 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e1a8inxt2 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
/* e1a8inxt3 = p «Switch without starting from scratch in » 860x84 */
.e1a8inxt3 { font-family: $sans; font-size: 20px; font-weight: 400; line-height: 28px; color: rgb(255, 255, 255); margin: 0px 0px 32px; max-width: 860px }
@media (max-width: 1280px) { .e1a8inxt3 { font-size: 16px; line-height: 24px } }
@media (max-width: 799px) { .e1a8inxt3 { font-size: 16px; line-height: 24px } }
/* e1a8inxt4 = div 319x40 */
.e1a8inxt4 { display: flex; flex-flow: wrap; gap: 8px; justify-content: center; margin-bottom: 64px }
/* e1a8inxt5 = ul 851x56 */
.e1a8inxt5 { display: flex; flex-flow: wrap; justify-content: center; gap: 8px 16px; list-style: none; margin: 0px; max-width: 851px; padding: 0px }
/* e1a8inxt6 = li 275x24 */
.e1a8inxt6 { display: flex; align-items: center; text-align: left }
/* e1a8inxt7 = svg 24x24 */
.e1a8inxt7 { color: rgb(255, 255, 255); flex-shrink: 0; margin-right: 4px }
/* e1a8inxt8 = span «60 days full access, no feature limits» 247x18 */
.e1a8inxt8 { font-family: $sans; font-size: 14px; font-weight: 600; line-height: 18px; letter-spacing: 0px; color: rgb(255, 255, 255) }
@media (max-width: 1280px) { .e1a8inxt8 { font-size: 14px; line-height: 16px } }
@media (max-width: 799px) { .e1a8inxt8 { font-size: 14px; line-height: 16px } }
/* e18o1u1v3--v2 = h2 «Turn customer feedback into product inno» 712x204 */
.e18o1u1v3--v2 { display: block; color: rgb(255, 255, 255); max-width: 712px; font-family: $sans; font-size: 64px; font-weight: 600; line-height: 68px; letter-spacing: -2px }
@media (max-width: 1280px) { .e18o1u1v3--v2 { font-size: 64px; line-height: 68px; letter-spacing: -2px } .e18o1u1v3--v2 { font-size: 48px; line-height: 52px; letter-spacing: -1px } }
@media (max-width: 799px) { .e18o1u1v3--v2 { font-size: 40px; line-height: 44px; letter-spacing: -1px } .e18o1u1v3--v2 { font-size: 32px; line-height: 36px; letter-spacing: -0.25px } }
```

## 6. Motion
- No scroll-driven or entrance motion of its own.
- Hero CTAs smooth-scroll to `#trial-cta`.
- Shared motion: CompactLogo marquee (GSAP 60s), testimonial tooltip, FAQ, buttons.

## 7. Footer CTA band default heading
Used on product-research, research-repository and VoC.
- `h2` H64 (max-width 712): "Turn " + an inline 80px Lottie (wrapper width 80 / md 48 / sm 32; the player is absolutely centred, `translate(-50%, calc(-50% - 8px))`, 80x80 / md 56 / sm 40, autoplay, loop, lazy, file `/assets/marketing/lottie/cta-feedback.json`) + " " + "feedback" (PP Mondwest) + " into " + `<br>` (only shown at ≤799) + "product innovation".
- Healthcare overrides the heading with "See what Dovetail can do for your healthcare organization".
- Buttons: "Book a demo" (primary → `/request-a-demo/`) and "Try Dovetail free" (secondary, `backdrop-filter:blur(8px)` → `/auth/signup/`).

## 8. Gaps
- I didn't measure the Lottie's frame-level animation; it plays from the JSON.
- The serif "feedback" span (`e1gpmlco10`) is PP Mondwest 400, 74px ls -2 (md 56px ls -1; sm 37px ls -0.25), from source. I didn't see it rendered, because healthcare (the only page I measured the band on) uses a custom heading.
