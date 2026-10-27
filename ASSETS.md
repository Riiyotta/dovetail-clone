Source: https://dovetail.com/

# Asset manifest — dovetail.com homepage

Everything is served by Vite from `public/`, so `public/assets/x.png` is referenced as `/assets/x.png`.
"Live URL" is the original path on dovetail.com (handy for cross-checking). Pixel sizes are intrinsic; "Rendered @1440" is the measured CSS box at a 1440x900 viewport.

## Fonts (`public/assets/fonts/`): downloaded during recon

The two files called `KE1Vtd1F-*` in `public/assets/` are **not fonts**. They're Google Tag Manager JS (ASCII text, start with `// Copyright 2012 Google Inc.`), so ignore or delete them. I downloaded the real webfonts from the live `@font-face` rules:

| Local file | Live URL | Family / weight | Notes |
|---|---|---|---|
| fonts/inter-400.woff2 | /fonts/inter-400.woff2 | Inter 400 | preloaded on live site |
| fonts/Inter-Medium.woff2 | /fonts/Inter-Medium.woff2 | Inter 500 | |
| fonts/Inter-SemiBold.woff2 | /fonts/Inter-SemiBold.woff2 | Inter 600 | preloaded on live site |
| fonts/JetBrainsMono-Regular.woff2 | /fonts/JetBrainsMono-Regular.woff2 | "JetBrains Mono" 400 | all mono/uppercase labels |
| fonts/PPMondwest-Regular.woff2 | /fonts/PPMondwest-Regular.woff2 | "PP Mondwest" 400 | pixel-serif accent words |

The live site also lists `/fonts/PPMondwest-Regular.otf` as a fallback src. I didn't download it because the woff2 is enough.
Every Inter and JetBrains face uses `font-display: swap` and `unicode-range: U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`. PP Mondwest has no unicode-range.

## Raster / SVG images (`public/assets/`)

| Local file | Live URL | Intrinsic | Used in | Rendered @1440 |
|---|---|---|---|---|
| 3d-icon-digital-twin.png | /media/3d-icon-digital-twin.png | 96x96 png | Top announcement banner, icon on both sides of the text | 20x20 |
| nav-digital-twins.webp | /media/nav-digital-twins.webp | 588x704 webp | Product dropdown promo card ("Introducing: Digital Twins") | 292x350, object-fit cover, object-position center bottom |
| hero-image-bg.png | /media/hero-image-bg.png (srcset, live requests ?w=1440) | 2528x1140 png | Hero product screenshot (desktop/tablet) | 1192x538 |
| hero-image-bg-mobile.png | /media/hero-image-bg-mobile.png | 1176x1140 png | Hero product screenshot `<source media="(max-width: 799px)">` | 358x347 @390 |
| home-hero-fax.png | /media/home-hero-fax.png | 564x600 png | Hero H1, fax-machine "face" between "Feed" and "the" (has 2 CSS eyeballs over it) | 188x200 |
| home-context-magnifier.png | /media/home-context-magnifier.png | 456x310 png | "Build your customer context layer" H2, inline image between "context" and "layer" | 188x128 |
| home-context-integrations.png | /media/home-context-integrations.png | 1232x800 png | Context-layer topic tab 1 visual | 542x352 |
| home-context-ai.png | /media/home-context-ai.png | 1232x800 png | Context-layer topic tab 2 visual | 542x352 |
| home-context-mcp.png | /media/home-context-mcp.png | 1232x800 png | Context-layer topic tab 3 visual | 542x352 |
| home-context-api.png | /media/home-context-api.png | 1232x800 png | Context-layer topic tab 4 visual | 542x352 |
| home-punch-avatar-renato.png | /media/home-punch-avatar-renato.png | 80x80 png | Itaú quote card avatar | 40x40, radius 4 |
| home-diagram-raw-data.png | /media/home-diagram-raw-data.png | 256x204 png | "Turn raw [img] data into" H2 inline image | height 120 |
| home-diagram-glow.svg | /media/home-diagram-glow.svg | svg | Multimodal diagram centre glow (also mobile) | 417.94x389.15 (diagram units) |
| home-diagram-database.png | /media/home-diagram-database.png | 480x480 png | Multimodal diagram centre database icon | 240x240 (diagram units) |
| home-prompt-ship-it.png | /media/home-prompt-ship-it.png | 230x292 png | "Put the customer in [img] every prompt" H2 inline image | height 156 |
| home-prompt-twins.png | /media/home-prompt-twins.png | 1232x800 png | Prompt topic tab 1 visual | 542x352 |
| home-prompt-channels.png | /media/home-prompt-channels.png | 1232x800 png | Prompt topic tab 2 visual | 542x352 |
| home-prompt-chat.png | /media/home-prompt-chat.png | 1232x800 png | Prompt topic tab 3 visual | 542x352 |
| home-prompt-agents.png | /media/home-prompt-agents.png | 1232x800 png | Prompt topic tab 4 visual | 542x352 |
| home-loop-atom.svg | /media/home-loop-atom.svg | svg | "self [img] improving" H2 inline image | height 120 |
| home-loop-step-1.png … home-loop-step-5.png | /media/home-loop-step-N.png | 1016x680 png each | Sticky loop panel visuals (steps 01–05) | 508x340 |
| home-govern-icon.png | /media/home-govern-icon.png | 635x442 png | "Govern [img] customer" H2 inline image | height 147 |
| home-govern-multiplayer.png | /media/home-govern-multiplayer.png | 804x464 png | Govern card 1 | 376x217 |
| home-govern-privacy.png | /media/home-govern-privacy.png | 804x464 png | Govern card 2 | 376x217 |
| home-govern-standards.png | /media/home-govern-standards.png | 804x464 png | Govern card 3 | 376x217 |
| home-govern-tokens.png | /media/home-govern-tokens.png | 804x464 png | Govern card 4 | 376x217 |
| home-govern-permissions.png | /media/home-govern-permissions.png | 804x464 png | Govern card 5 | 376x217 |
| home-govern-security.png | /media/home-govern-security.png | 804x464 png | Govern card 6 | 376x217 |
| Customer_Itau.png | /media/Customer_Itau.png | 272x300 png (live is also 272x300) | Story marquee card 1 thumbnail | 400x438 cover |
| Customer_Atlassian.png | /media/Customer_Atlassian.png | 272x300 png | Story card 2 thumbnail | 400x438 cover |
| Customer_Canva_AI.png | /media/Customer_Canva_AI.png | 800x880 png | Story card 3 thumbnail | 400x438 cover |
| Customer_Breville.png | /media/Customer_Breville.png | 272x300 png | Story card 4 thumbnail | 400x438 cover |
| Customer_CNHIndustrial.png | /media/Customer_CNHIndustrial.png | 800x880 png | Story card 5 thumbnail | 400x438 cover |
| Customer_SmartRecruiter.png | /media/Customer_SmartRecruiter.png | 800x880 png | Story card 6 thumbnail | 400x438 cover |
| home-story-itau-mark.svg | /media/home-story-itau-mark.svg | svg | Story card 1 logo (centred over thumbnail) | 200x88 contain |
| home-story-atlassian-mark.svg | /media/home-story-atlassian-mark.svg | svg | Story card 2 logo | 200x88 contain |
| white-logo.svg | /customers/itau-unibanco/white-logo.svg | svg | Itaú logo (Context-layer quote card, cropped box 40x40, img 106.67x48 at top -3.99px left 0) | 40x40 crop |
| white-logo(1).svg | /customers/okta/white-logo.svg | svg | Okta logo (Prompt quote card, box 85x28, img 97.08x43.68 at top -8.04px left -6.07px) | 85x28 crop |
| white-logo(2).svg | /customers/canva/white-logo.svg | svg | Story card 3 logo | 200x88 contain |
| white-logo(3).svg | /customers/breville/white-logo.svg | svg | Story card 4 logo | 200x88 contain |
| white-logo(4).svg | /customers/cnh/white-logo.svg | svg | Story card 5 logo | 200x88 contain |
| white-logo(5).svg | /customers/smartrecruiters/white-logo.svg | svg | Story card 6 logo | 200x88 contain |
| digital-twins-popup.png | /media/digital-twins-popup.png | 800x688 png | **Downloaded.** "Introducing Digital Twins" modal image | width 400 |
| favicon.svg | /favicon.svg | svg | **Downloaded.** Site favicon | n/a |

The live page loads no `<video>`, Lottie or WebGL. All 18 `<canvas>` elements are 2D and drawn procedurally (see CLONE_SPEC.md, "ASCII field" and "PixelDissolve"). They have no asset files.

## Inline SVGs harvested from the live DOM (`public/assets/svg/`)

On the live site these are inline React SVG components, not files. I serialised them from the rendered DOM (class attributes stripped). Icons that use `currentColor` take the parent's text colour.

| File | What it is |
|---|---|
| svg/nav-dovetail-logo.svg | Dovetail mark, 18x20 viewBox, rendered 22x24, `currentColor` (white) |
| svg/banner-dismiss-x.svg | Banner close "x", rendered 16x16 |
| svg/rating-star-full.svg, svg/rating-star-half.svg | Rating stars (24 viewBox, rendered 18x18). Every platform renders 4 full + 1 half. The half star's second half is #3B3B3B |
| svg/hero-logo-*.svg (17 files) | Hero customer logo cycler: amazon, toyota, canva, ford, notion, salesforce, dyson, milwaukee, shopify, wise, mercedes-benz, volvo, kpmg, mckinsey-company, walgreens, aws, qantas. viewBox 72x32 (amazon and dyson: 160x72), rendered height 40 (28 at ≤799) |
| svg/cta-logo-theright-salesforce.svg | Final CTA logo next to "The" (viewBox 243x170) |
| svg/cta-logo-bestfarleft-aws.svg, cta-logo-bestleft-canva.svg, cta-logo-bestright-airwallex.svg | Final CTA logos around "best" (170x170) |
| svg/cta-logo-neverright-notion.svg, cta-logo-neverfarright-zapier.svg | Final CTA logos around "never" |
| svg/cta-logo-guessleft-wise.svg, cta-logo-guessfarleft-breville.svg | Final CTA logos around "guess" |
| svg/forrester-mark.svg | Blue (#04F) Forrester-style mark beside the stat numbers ("30hrs" / "66%"), 32x39 |
| svg/icon-download.svg | Download icon on stat-card hover, 32x32 |
| svg/icon-plus-small.svg | 10x10 "+" in the diagram step pills (rotates 45° on hover) |
| svg/chat-twin-icon.svg | Twin face icon in the hero chat window header (#A65CFF) |
| svg/chat-header-menu.svg, chat-header-history.svg, chat-header-close.svg | Hero chat window header buttons (#F4F4F4) |
| svg/chat-tool-plus.svg, chat-tool-sliders.svg, chat-tool-agent-active.svg, chat-tool-square-chip.svg, chat-tool-sparkle.svg, chat-stop-square.svg | Hero chat composer toolbar icons (16 viewBox) |
| svg/chat-glow.svg | Purple (#9601FF) blurred "voice" blob behind the chat composer (451x212.861) |
| svg/nav-icon-*.svg | Product dropdown item icons: digital-twins, agents, channels, docs, chat, projects, dashboards |
| svg/social-linkedin.svg, social-x.svg, social-instagram.svg, social-youtube.svg | Footer social icons, 32x32 |
| svg/loop-globe-snapshot.svg | **Reference only.** Frozen frame of the animated loop globe (generate it live, see spec) |
| svg/diagram-orbits-snapshot.svg | **Reference only.** Frozen frame of the multimodal orbit diagram (generate it live, see spec) |

## Not downloaded / not applicable

- Lottie `/lottie/cta-feedback.json` appears in the JS bundle but isn't rendered on the homepage, so I didn't download it.
- The Atlassian story uses `home-story-atlassian-mark.svg`. No separate Atlassian white-logo is used on this page.
- Analytics/tracker scripts in the `_files` folder are irrelevant.
