# Dovetail clone: information architecture

Source: Dovetail clone (/Users/riyaghosh/V3/dovetail): src/routes.jsx, src/pages/**, src/components/**, src/chrome.jsx, src/data/routes.txt, CLONE_SPEC.md, specs/*.md
Status: **measured-from-code-and-running-clone** · production approved: **false**
1899 routes · 41 templates · 158 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Guide article, Changelog entry, Blog post) account for 1678 of 1899 routes (88%). The remaining 221 routes span 38 templates.

| template | routes | share |
|---|---:|---:|
| Guide article | 1126 | 59% |
| Changelog entry | 349 | 18% |
| Blog post | 203 | 11% |
| Event detail | 48 | 3% |
| Customer story | 39 | 2% |
| Contributor profile | 20 | 1% |
| Legal document | 19 | 1% |
| Comparison page | 16 | 1% |
| Guide hub | 10 | 1% |
| Product page | 7 | 0% |
| Changelog index | 7 | 0% |
| Role page | 6 | 0% |
| Blog index | 6 | 0% |
| Tools article | 5 | 0% |
| Solution page | 4 | 0% |
| Enterprise article | 3 | 0% |
| Role quiz | 3 | 0% |
| Template landing | 3 | 0% |
| Demo form | 2 | 0% |
| Events / webinars index | 2 | 0% |
| Resources guide | 2 | 0% |
| Home | 1 | 0% |
| Pricing | 1 | 0% |
| Enterprise | 1 | 0% |
| Deploy | 1 | 0% |
| Menu | 1 | 0% |
| Launch microsite | 1 | 0% |
| Best-never-guess campaign | 1 | 0% |
| AWS Summit campaign | 1 | 0% |
| Guides index | 1 | 0% |
| Contributors index | 1 | 0% |
| Quiz hub | 1 | 0% |
| ROI calculator | 1 | 0% |
| Legal index | 1 | 0% |
| Customers index | 1 | 0% |
| Live demos | 1 | 0% |
| Resource centre | 1 | 0% |
| Industry report | 1 | 0% |
| Careers | 1 | 0% |
| Podcast | 1 | 0% |
| Not found (404) | 0 | 0% |

## Page chrome

**616 routes carry chrome = `dark · final-cta`** — Home, Pricing, Enterprise, Blog index, Blog post, Changelog entry, Guides index, Demo form, Not found (404), Customers index, Events / webinars index, Event detail, Live demos.

**46 routes carry chrome = `accent-nav · final-cta`** — Product page, Customer story.

**5 routes carry chrome = `light · footer-only`** — Enterprise article, Resources guide.

**34 routes carry chrome = `dark · footer-only`** — Deploy, Role page, Role quiz, Comparison page, Quiz hub, ROI calculator, Template landing, Resource centre, Industry report, Podcast.

**5 routes carry chrome = `dark · cta-band`** — Solution page, Careers.

**1 routes carry chrome = `menu · no nav · footer-only`** — Menu.

**1 routes carry chrome = `launch · nav, no banner, own footer`** — Launch microsite.

**2 routes carry chrome = `campaign · own nav + footer`** — Best-never-guess campaign, AWS Summit campaign.

**7 routes carry chrome = `dark · inline-cta`** — Changelog index.

**1141 routes carry chrome = `light · inline-cta`** — Guide article, Guide hub, Tools article.

**21 routes carry chrome = `light · final-cta`** — Contributors index, Contributor profile.

**20 routes carry chrome = `light-legal · final-cta`** — Legal index, Legal document.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.banner` | CHROME | 38 | 1896 | `components/Banner.jsx` | 1896 routes across home, product page, pricing, enterprise, enterprise article, deploy, solution page, role page, role quiz, menu, blog index, blog post, changelog index, changelog entry, guide article, guide hub, guides index, contributors index, contributor profile, demo form, comparison page, quiz hub, roi calculator, template landing, tools article, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos, resource centre, resources guide, industry report, careers, podcast. Hidden on the launch and campaign pages and on the Digital Twins product page (alert bar off in its data file). |
| `chrome.navbar` | CHROME | 38 | 1896 | `components/Navbar.jsx` | 1896 routes across home, product page, pricing, enterprise, enterprise article, deploy, solution page, role page, role quiz, launch microsite, blog index, blog post, changelog index, changelog entry, guide article, guide hub, guides index, contributors index, contributor profile, demo form, comparison page, quiz hub, roi calculator, template landing, tools article, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos, resource centre, resources guide, industry report, careers, podcast. Not rendered on the menu route or the two blue campaign pages, which draw their own header. |
| `chrome.footer` | CHROME | 38 | 1896 | `components/Footer.jsx` | 1896 routes across home, product page, pricing, enterprise, enterprise article, deploy, solution page, role page, role quiz, menu, blog index, blog post, changelog index, changelog entry, guide article, guide hub, guides index, contributors index, contributor profile, demo form, comparison page, quiz hub, roi calculator, template landing, tools article, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos, resource centre, resources guide, industry report, careers, podcast. Footer variants are recorded on each template as `chrome`. |
| `cta.feedback-cta` | CTA | 14 | 1164 | `components/InlineCta.jsx | pages/changelog/InlineCta.jsx | components/company/PageCta.jsx | components/tools/CtaFooter.jsx | pages/corporate/Deploy.jsx > CtaBand | pages/roles/QuizPage.jsx (inline result CTA)` | 1164 routes across enterprise article, deploy, role quiz, changelog index, guide article, guide hub, quiz hub, roi calculator, tools article, events / webinars index, resource centre, resources guide, industry report, podcast. One original slice with six separate implementations (enterprise articles reuse components/InlineCta.jsx). The changelog index renders two copies at once. |
| `content.article-title` | CONTENT | 5 | 1146 | `pages/guides/components.jsx > Breadcrumb (in GuideArticle, EnterpriseArticle, ToolsArticle) | pages/company/ResourcesGuide.jsx > Breadcrumb` | 1146 routes across enterprise article, guide article, guide hub, tools article, resources guide. Shared by the article family; the resources guides re-implement the breadcrumb locally. |
| `content.article-body` | CONTENT | 5 | 1146 | `pages/guides/components.jsx > MetaTable, ShareAi, TocList, RichText, TagCloud | pages/company/ResourcesGuide.jsx > Body, ShareGroups, Toc | components/legal/Prose.jsx (ToolsArticle)` | 1146 routes across enterprise article, guide article, guide hub, tools article, resources guide. Guide articles, enterprise articles and tools articles share the guides components; the resources guides have their own body, share and TOC copies. Hub pages show no promo or TOC. |
| `overlay.contents-sheet` | OVERLAY | 5 | 1146 | `pages/guides/components.jsx > ContentsSheet | pages/company/ResourcesGuide.jsx > ContentsDrawer` | 1146 routes across enterprise article, guide article, guide hub, tools article, resources guide. The resources guides re-implement the sheet locally. |
| `content.article-carousels` | CONTENT | 3 | 1139 | `pages/guides/components.jsx > TextCarousel` | 1139 routes across enterprise article, guide article, guide hub. |
| `cta.final-cta` | CTA | 19 | 703 | `components/FinalCta.jsx` | 703 routes across home, product page, pricing, enterprise, blog index, blog post, changelog entry, guides index, contributors index, contributor profile, demo form, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos. Real reuse: one component, rendered by each page at the end of its main. |
| `content.changelog-entry` | CONTENT | 1 | 349 | `pages/changelog/ChangelogEntry.jsx` | 349 routes, changelog entry only. |
| `hero.blog-post` | HERO | 1 | 203 | `pages/blog/BlogPost.jsx (first section.blog-grid)` | 203 routes, blog post only. |
| `content.blog-post-body` | CONTENT | 1 | 203 | `pages/blog/BlogPost.jsx (second section.blog-grid)` | 203 routes, blog post only. |
| `help.faq` | HELP | 11 | 127 | `components/marketing/FaqSlice.jsx | components/company/Faq.jsx | components/tools/Faq.jsx | components/legal/Faq.jsx` | 127 routes across product page, pricing, deploy, solution page, role page, comparison page, template landing, customer story, event detail, careers, podcast. One original slice, four implementations. |
| `decor.pixel-band` | DECOR | 5 | 49 | `components/marketing/PixelTransitionSlice.jsx (components/company/PixelBand.jsx is a thin wrapper)` | 49 routes across product page, enterprise, aws summit campaign, customers index, customer story. Real reuse: the company PixelBand delegates to the marketing slice rather than copying it. |
| `content.event-detail` | CONTENT | 1 | 48 | `pages/events/EventDetail.jsx (RichBody.jsx, RegistrationForm.jsx, components/company/VideoCard.jsx)` | 48 routes, event detail only. |
| `listing.more-events` | LISTING | 1 | 48 | `pages/events/EventDetail.jsx (components/company/EventCard.jsx)` | 48 routes, event detail only. |
| `hero.customer-story` | HERO | 1 | 39 | `pages/customers/CustomerStory.jsx > StoryHero` | 39 routes, customer story only. |
| `content.customer-story-body` | CONTENT | 1 | 39 | `pages/customers/CustomerStory.jsx > StoryBody (components/company/RichText.jsx)` | 39 routes, customer story only. |
| `cta.story-best-never-guess` | CTA | 1 | 39 | `components/company/BestNeverGuess.jsx (StoryCard.jsx, Carousel.jsx)` | 39 routes, customer story only. |
| `proof.logo-strip` | PROOF | 8 | 29 | `components/marketing/CompactLogoSlice.jsx | components/tools/LogoMarquee.jsx | components/legal/Marquee.jsx > LogoMarquee | pages/company/ResourcesReport.jsx > LogoStrip` | 29 routes across pricing, enterprise, deploy, solution page, demo form, comparison page, template landing, industry report. One original slice, four implementations, each on its own Marquee primitive. |
| `proof.testimonial` | PROOF | 5 | 29 | `components/marketing/TestimonialSlice.jsx | components/tools/Testimonial.jsx | components/legal/FeaturedTestimonial.jsx` | 29 routes across enterprise, solution page, role page, demo form, comparison page. One original slice, three implementations. |
| `content.editorial-process` | CONTENT | 2 | 21 | `pages/guides/components.jsx > EditorialBox` | 21 routes across contributors index, contributor profile. |
| `conversion.trial-offer` | CONVERSION | 2 | 20 | `pages/roles/SolutionPage.jsx > SolutionTrial | components/legal/ComparisonSlices.jsx > TrialCta` | 20 routes across solution page, comparison page. One original slice, two implementations. |
| `hero.contributor-profile` | HERO | 1 | 20 | `pages/guides/Contributors.jsx > ContributorProfile (div.ctitle)` | 20 routes, contributor profile only. |
| `content.contributor-skills` | CONTENT | 1 | 20 | `pages/guides/components.jsx > TagCloud (in ContributorProfile)` | 20 routes, contributor profile only. |
| `listing.contributor-articles` | LISTING | 1 | 20 | `pages/guides/Contributors.jsx > ContributorProfile` | 20 routes, contributor profile only. |
| `content.legal-title` | CONTENT | 1 | 19 | `pages/legal/LegalDoc.jsx (div.ltitle)` | 19 routes, legal document only. |
| `content.legal-doc-body` | CONTENT | 1 | 19 | `pages/legal/LegalDoc.jsx > SideNav + components/legal/Prose.jsx` | 19 routes, legal document only. |
| `hero.comparison` | HERO | 1 | 16 | `components/legal/ComparisonSlices.jsx > Hero` | 16 routes, comparison page only. |
| `hero.comparison-image` | HERO | 1 | 16 | `components/legal/ComparisonSlices.jsx > HeroImage` | 16 routes, comparison page only. |
| `proof.comparison-tei-card` | PROOF | 1 | 16 | `components/legal/ComparisonSlices.jsx > TeiCard` | 16 routes, comparison page only. |
| `proof.awards-marquee` | PROOF | 1 | 16 | `components/legal/Marquee.jsx > AwardsMarquee` | 16 routes, comparison page only. |
| `proof.comparison-customer-story` | PROOF | 1 | 16 | `components/legal/ComparisonSlices.jsx > CustomerStory` | 16 routes, comparison page only. |
| `feature.comparison-choose-grid` | FEATURE | 1 | 16 | `components/legal/ComparisonSlices.jsx > ChooseGrid` | 16 routes, comparison page only. |
| `content.comparison-intro` | CONTENT | 1 | 16 | `components/legal/ComparisonSlices.jsx > Intro` | 16 routes, comparison page only. |
| `content.comparison-table` | CONTENT | 1 | 16 | `components/legal/ComparisonSlices.jsx > CompareIntro + ComparisonTable` | 16 routes, comparison page only. |
| `conversion.comparison-migrate` | CONVERSION | 1 | 16 | `components/legal/ComparisonSlices.jsx > Migrate` | 16 routes, comparison page only. |
| `listing.hub-article-index` | LISTING | 1 | 10 | `pages/guides/GuideArticle.jsx > AfterFooter` | 10 routes, guide hub only. |
| `proof.customer-stories-slice` | PROOF | 2 | 8 | `components/marketing/CustomerStoriesSlice.jsx` | 8 routes across product page, enterprise. |
| `hero.product` | HERO | 1 | 7 | `pages/product/ProductHero.jsx` | 7 routes, product page only. |
| `hero.changelog-index` | HERO | 1 | 7 | `pages/changelog/ChangelogIndex.jsx (div.cl-hero)` | 7 routes, changelog index only. |
| `proof.product-quote` | PROOF | 1 | 7 | `components/marketing/ProductQuoteSlice.jsx` | 7 routes, product page only. |
| `proof.product-logo-marquee` | PROOF | 1 | 7 | `pages/product/LogoMarqueeWrap.jsx` | 7 routes, product page only. |
| `feature.product-statement` | FEATURE | 1 | 7 | `pages/product/ProductStatement.jsx` | 7 routes, product page only. |
| `feature.product-scroll-video` | FEATURE | 1 | 7 | `pages/product/ProductScrollVideo.jsx` | 7 routes, product page only. |
| `feature.product-features` | FEATURE | 1 | 7 | `pages/product/ProductFeatures.jsx` | 7 routes, product page only. |
| `feature.product-for` | FEATURE | 1 | 7 | `pages/product/ProductFor.jsx` | 7 routes, product page only. |
| `feature.product-voice-mode` | FEATURE | 1 | 7 | `pages/product/VoiceMode.jsx` | 7 routes, product page only. |
| `feature.product-prompt-cards` | FEATURE | 1 | 7 | `pages/product/ProductPromptCards.jsx (+ PromptModal.jsx)` | 7 routes, product page only. |
| `feature.product-carousel` | FEATURE | 1 | 7 | `pages/product/ProductCarousel.jsx` | 7 routes, product page only. |
| `feature.product-findings` | FEATURE | 1 | 7 | `pages/product/Findings.jsx` | 7 routes, product page only. |
| `listing.changelog-rows` | LISTING | 1 | 7 | `pages/changelog/ChangelogIndex.jsx > Row + usePreview` | 7 routes, changelog index only. |
| `hero.role` | HERO | 1 | 6 | `pages/roles/RoleSections.jsx > RoleHero` | 6 routes, role page only. |
| `proof.role-story-cards` | PROOF | 1 | 6 | `pages/roles/RoleSections.jsx > StoryCards` | 6 routes, role page only. |
| `feature.role-challenge` | FEATURE | 1 | 6 | `pages/roles/RoleSections.jsx > Challenge` | 6 routes, role page only. |
| `feature.role-helps` | FEATURE | 1 | 6 | `pages/roles/RoleSections.jsx > HelpsHeader + HelpsCards` | 6 routes, role page only. |
| `feature.role-prioritization` | FEATURE | 1 | 6 | `pages/roles/RoleSections.jsx > Prioritization` | 6 routes, role page only. |
| `feature.role-integrations` | FEATURE | 1 | 6 | `pages/roles/RoleSections.jsx > Integrations` | 6 routes, role page only. |
| `feature.role-use-case-tabs` | FEATURE | 1 | 6 | `pages/roles/RoleSections.jsx > UseCaseTabs (local useTabGroup copy)` | 6 routes, role page only. |
| `listing.blog-featured-header` | LISTING | 1 | 6 | `pages/blog/BlogIndex.jsx (first section.blog-grid) + BlogCard.jsx` | 6 routes, blog index only. |
| `listing.blog-card-grid` | LISTING | 1 | 6 | `pages/blog/BlogIndex.jsx (div.blog-index__grid-wrap) + BlogCard.jsx` | 6 routes, blog index only. |
| `conversion.role-quiz-promo` | CONVERSION | 1 | 6 | `pages/roles/RoleSections.jsx > QuizPromo` | 6 routes, role page only. |
| `chrome.footer-cta-band` | CHROME | 2 | 5 | `components/Footer.jsx (footer: "cta-band") | pages/company/Careers.jsx > PreFooter` | 5 routes across solution page, careers. Same original block implemented twice: Footer.jsx draws it for the solutions pages, Careers.jsx re-implements it as a local PreFooter. |
| `hero.solution` | HERO | 1 | 4 | `pages/roles/SolutionPage.jsx > SolutionHero` | 4 routes, solution page only. |
| `feature.solution-section` | FEATURE | 1 | 4 | `pages/roles/SolutionPage.jsx > SolutionSection` | 4 routes, solution page only. |
| `feature.solution-features` | FEATURE | 1 | 4 | `pages/roles/SolutionPage.jsx > SolutionFeatures` | 4 routes, solution page only. |
| `hero.template-landing` | HERO | 1 | 3 | `pages/tools/TemplateLanding.jsx > Hero` | 3 routes, template landing only. |
| `feature.template-split` | FEATURE | 1 | 3 | `pages/tools/TemplateLanding.jsx > Split` | 3 routes, template landing only. |
| `feature.template-checklist` | FEATURE | 1 | 3 | `pages/tools/TemplateLanding.jsx > Checklist` | 3 routes, template landing only. |
| `content.template-intro` | CONTENT | 1 | 3 | `pages/tools/TemplateLanding.jsx > CenteredIntro` | 3 routes, template landing only. |
| `tool.role-quiz` | TOOL | 1 | 3 | `pages/roles/QuizPage.jsx` | 3 routes, role quiz only. |
| `chrome.campaign-nav` | CHROME | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > CampaignNav | pages/company/AwsSummit.jsx > CampaignNav` | 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. |
| `chrome.campaign-footer` | CHROME | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > BngFooter | pages/company/AwsSummit.jsx > Careers (footer.aw-footer)` | 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations; on AWS it sits inside the black careers block. |
| `hero.campaign` | HERO | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > Hero | pages/company/AwsSummit.jsx > Hero` | 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. |
| `proof.tei-card` | PROOF | 2 | 2 | `pages/guides/GuidesIndex.jsx (section.gi-tei) | pages/company/ResourcesIndex.jsx > TeiCard` | 2 routes across guides index, resource centre. Same card on two pages, implemented twice. |
| `feature.security-compliance` | FEATURE | 2 | 2 | `pages/corporate/common.jsx > SecurityGrid` | 2 routes across enterprise, deploy. Real reuse: one component serves both pages. |
| `conversion.campaign-trial-form` | CONVERSION | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > FormSlice | pages/company/AwsSummit.jsx > TrialForm` | 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. |
| `campaign.text-slice` | CAMPAIGN | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > TextSlice | pages/company/AwsSummit.jsx > TextSlice` | 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. |
| `campaign.testimonial` | CAMPAIGN | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > Testimonial | pages/company/AwsSummit.jsx > Testimonial` | 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. |
| `campaign.story-grid` | CAMPAIGN | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > Stories + local StoryCard | pages/company/AwsSummit.jsx > Stories (components/company/StoryCard.jsx)` | 2 routes across best-never-guess campaign, aws summit campaign. The best-never-guess page carries its own StoryCard copy; AWS uses the shared one. |
| `campaign.team-switch` | CAMPAIGN | 2 | 2 | `pages/campaigns/bng/BestNeverGuessPage.jsx > TeamSwitch | pages/company/AwsSummit.jsx > TeamSwitch` | 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. |
| `hero.events-index` | HERO | 1 | 2 | `pages/events/EventsIndex.jsx (div.ev-hero)` | 2 routes, events / webinars index only. |
| `hero.demo-form` | HERO | 1 | 2 | `pages/tools/DemoForm.jsx > HeroForm` | 2 routes, demo form only. |
| `proof.forrester-tei-stats` | PROOF | 1 | 2 | `pages/tools/DemoForm.jsx > Tei` | 2 routes, demo form only. |
| `feature.demo-features` | FEATURE | 1 | 2 | `pages/tools/DemoForm.jsx > Features` | 2 routes, demo form only. |
| `content.related-articles-carousel` | CONTENT | 1 | 2 | `pages/company/ResourcesGuide.jsx > RelatedCarousel (components/company/Carousel.jsx)` | 2 routes, resources guide only. Same horizontal-carousel-with-progress pattern as the guides TextCarousel, separate implementation. |
| `listing.upcoming-events` | LISTING | 1 | 2 | `pages/events/EventsIndex.jsx (components/company/EventCard.jsx)` | 2 routes, events / webinars index only. |
| `listing.past-events` | LISTING | 1 | 2 | `pages/events/EventsIndex.jsx (components/company/RowList.jsx)` | 2 routes, events / webinars index only. |
| `chrome.launch-footer` | CHROME | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Footer` | 1 routes, launch microsite only. |
| `chrome.launch-section-nav` | CHROME | 1 | 1 | `pages/campaigns/launch/SectionNav.jsx` | 1 routes, launch microsite only. |
| `chrome.menu-header` | CHROME | 1 | 1 | `pages/corporate/Menu.jsx` | 1 routes, menu only. |
| `hero.home` | HERO | 1 | 1 | `components/Hero.jsx` | 1 routes, home only. |
| `hero.pricing` | HERO | 1 | 1 | `pages/corporate/Pricing.jsx > PricingHero` | 1 routes, pricing only. |
| `hero.enterprise` | HERO | 1 | 1 | `pages/corporate/Enterprise.jsx > EnterpriseHero` | 1 routes, enterprise only. |
| `hero.deploy` | HERO | 1 | 1 | `pages/corporate/Deploy.jsx > DeployHero` | 1 routes, deploy only. |
| `hero.guides-index` | HERO | 1 | 1 | `pages/guides/GuidesIndex.jsx (first section.container)` | 1 routes, guides index only. |
| `hero.contributors-index` | HERO | 1 | 1 | `pages/guides/Contributors.jsx > ContributorsIndex (div.ctitle)` | 1 routes, contributors index only. |
| `hero.customers-index` | HERO | 1 | 1 | `pages/customers/TypewriterHero.jsx` | 1 routes, customers index only. |
| `hero.live-demos` | HERO | 1 | 1 | `pages/events/LiveDemos.jsx (div.ld-hero)` | 1 routes, live demos only. |
| `hero.resources-index` | HERO | 1 | 1 | `pages/company/ResourcesIndex.jsx (section.ri-hero)` | 1 routes, resource centre only. |
| `hero.report-download` | HERO | 1 | 1 | `pages/company/ResourcesReport.jsx (section.rr-hero) + ReportForm` | 1 routes, industry report only. |
| `hero.careers` | HERO | 1 | 1 | `pages/company/Careers.jsx > Hero` | 1 routes, careers only. |
| `hero.podcast` | HERO | 1 | 1 | `pages/company/Podcast.jsx (div.pc-hero)` | 1 routes, podcast only. |
| `hero.quiz-hub` | HERO | 1 | 1 | `pages/tools/QuizHub.jsx (section.qh)` | 1 routes, quiz hub only. |
| `hero.roi-calculator` | HERO | 1 | 1 | `pages/tools/RoiCalculator.jsx (first section.t-container)` | 1 routes, roi calculator only. |
| `hero.launch` | HERO | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Hero` | 1 routes, launch microsite only. |
| `proof.stories-marquee` | PROOF | 1 | 1 | `components/Stories.jsx` | 1 routes, home only. |
| `proof.logo-wall` | PROOF | 1 | 1 | `pages/customers/CustomersIndex.jsx > LogoWall` | 1 routes, customers index only. |
| `proof.customer-story-carousel` | PROOF | 1 | 1 | `pages/customers/CustomersIndex.jsx > StoryCarousel (ProgressTabs, useTabGroup)` | 1 routes, customers index only. |
| `proof.ratings-awards` | PROOF | 1 | 1 | `pages/customers/CustomersIndex.jsx > Ratings (components/company/Marquee.jsx)` | 1 routes, customers index only. |
| `proof.testimonial-wall` | PROOF | 1 | 1 | `pages/customers/CustomersIndex.jsx > TestimonialWall` | 1 routes, customers index only. |
| `feature.context-layer` | FEATURE | 1 | 1 | `components/ContextLayer.jsx` | 1 routes, home only. |
| `feature.raw-data` | FEATURE | 1 | 1 | `components/RawData.jsx` | 1 routes, home only. |
| `feature.prompt-topics` | FEATURE | 1 | 1 | `components/Prompt.jsx` | 1 routes, home only. |
| `feature.self-improving-loop` | FEATURE | 1 | 1 | `components/SelfImproving.jsx (components/loop/LoopGlobe.jsx)` | 1 routes, home only. |
| `feature.govern` | FEATURE | 1 | 1 | `components/Govern.jsx` | 1 routes, home only. |
| `feature.enterprise-vertical-tabs` | FEATURE | 1 | 1 | `pages/corporate/Enterprise.jsx > VerticalTabs` | 1 routes, enterprise only. |
| `feature.enterprise-roi-map` | FEATURE | 1 | 1 | `pages/corporate/Enterprise.jsx > RoiMap` | 1 routes, enterprise only. |
| `feature.enterprise-integrations` | FEATURE | 1 | 1 | `pages/corporate/Enterprise.jsx > Integrations` | 1 routes, enterprise only. |
| `feature.deploy-problems` | FEATURE | 1 | 1 | `pages/corporate/Deploy.jsx > ProblemsHeading + Problem` | 1 routes, deploy only. |
| `feature.deploy-why` | FEATURE | 1 | 1 | `pages/corporate/Deploy.jsx > WhyHeading + WhyGrid` | 1 routes, deploy only. |
| `feature.careers-globe` | FEATURE | 1 | 1 | `pages/company/Careers.jsx > GlobeSlice (CareersGlobe.jsx)` | 1 routes, careers only. |
| `feature.careers-benefits` | FEATURE | 1 | 1 | `pages/company/Careers.jsx > Benefits` | 1 routes, careers only. |
| `content.deploy-intro` | CONTENT | 1 | 1 | `pages/corporate/Deploy.jsx > Intro` | 1 routes, deploy only. |
| `content.careers-people` | CONTENT | 1 | 1 | `pages/company/Careers.jsx > People` | 1 routes, careers only. |
| `content.careers-gallery` | CONTENT | 1 | 1 | `pages/company/Careers.jsx > Gallery (components/company/VideoCard.jsx)` | 1 routes, careers only. |
| `content.careers-values` | CONTENT | 1 | 1 | `pages/company/Careers.jsx > Values (components/company/Carousel.jsx)` | 1 routes, careers only. |
| `content.careers-hiring` | CONTENT | 1 | 1 | `pages/company/Careers.jsx > Hiring` | 1 routes, careers only. |
| `listing.guides-topics` | LISTING | 1 | 1 | `pages/guides/GuidesIndex.jsx (div.gi-topics)` | 1 routes, guides index only. |
| `listing.contributors-groups` | LISTING | 1 | 1 | `pages/guides/Contributors.jsx > ContributorsIndex` | 1 routes, contributors index only. |
| `listing.customer-story-grid` | LISTING | 1 | 1 | `pages/customers/CustomersIndex.jsx > StoryGrid (components/company/StoryCard.jsx)` | 1 routes, customers index only. |
| `listing.demo-video-grid` | LISTING | 1 | 1 | `pages/events/LiveDemos.jsx (components/company/VideoCard.jsx)` | 1 routes, live demos only. |
| `listing.resource-link-list` | LISTING | 1 | 1 | `pages/company/ResourcesIndex.jsx > LinkList` | 1 routes, resource centre only. |
| `listing.resources-blog-row` | LISTING | 1 | 1 | `pages/company/ResourcesIndex.jsx > HeadingRow + Blog` | 1 routes, resource centre only. |
| `listing.resources-demo-row` | LISTING | 1 | 1 | `pages/company/ResourcesIndex.jsx > HeadingRow + VideoCard` | 1 routes, resource centre only. |
| `listing.open-positions` | LISTING | 1 | 1 | `pages/company/Careers.jsx > OpenPositions (pages/company/Parts.jsx > RowList)` | 1 routes, careers only. Uses a local RowList copy because job rows open in the same tab; the shared components/company/RowList.jsx opens them in a new tab. |
| `listing.legal-index` | LISTING | 1 | 1 | `pages/legal/LegalIndex.jsx (section.lgi)` | 1 routes, legal index only. |
| `listing.enterprise-resources` | LISTING | 1 | 1 | `pages/corporate/Enterprise.jsx > Resources` | 1 routes, enterprise only. |
| `conversion.plan-cards` | CONVERSION | 1 | 1 | `pages/corporate/Pricing.jsx > PlanCards` | 1 routes, pricing only. |
| `conversion.pricing-comparison-table` | CONVERSION | 1 | 1 | `pages/corporate/Pricing.jsx > ComparisonTable + StickyHeader (Tooltip.jsx)` | 1 routes, pricing only. |
| `conversion.deploy-scoping-form` | CONVERSION | 1 | 1 | `pages/corporate/Deploy.jsx > Scoping (DeployForm.jsx)` | 1 routes, deploy only. |
| `conversion.roi-card` | CONVERSION | 1 | 1 | `pages/company/ResourcesIndex.jsx > RoiCard` | 1 routes, resource centre only. |
| `conversion.roi-report-download` | CONVERSION | 1 | 1 | `pages/tools/RoiCalculator.jsx > Download` | 1 routes, roi calculator only. |
| `tool.roi-calculator` | TOOL | 1 | 1 | `pages/tools/RoiCalculator.jsx (Slider, ResultCard, compute)` | 1 routes, roi calculator only. |
| `campaign.careers-band` | CAMPAIGN | 1 | 1 | `pages/company/AwsSummit.jsx > Careers (components/company/RowList.jsx)` | 1 routes, aws summit campaign only. |
| `launch.shipped` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Shipped` | 1 routes, launch microsite only. |
| `launch.agents` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Agents` | 1 routes, launch microsite only. |
| `launch.digital-twins` | LAUNCH | 1 | 1 | `pages/campaigns/launch/DigitalTwins.jsx` | 1 routes, launch microsite only. |
| `launch.multiplayer` | LAUNCH | 1 | 1 | `pages/campaigns/launch/Multiplayer.jsx` | 1 routes, launch microsite only. |
| `launch.channels` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Channels` | 1 routes, launch microsite only. |
| `launch.trends` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > ChannelsFeatures` | 1 routes, launch microsite only. |
| `launch.ecosystem` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Ecosystem` | 1 routes, launch microsite only. |
| `launch.enterprise` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Enterprise (EnterpriseStack.jsx)` | 1 routes, launch microsite only. |
| `launch.one-way` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > OneWay` | 1 routes, launch microsite only. |
| `launch.protected` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Protected` | 1 routes, launch microsite only. |
| `launch.closing-cta` | LAUNCH | 1 | 1 | `pages/campaigns/launch/LaunchPage.jsx > Cta` | 1 routes, launch microsite only. |
| `overlay.twins-modal` | OVERLAY | 1 | 1 | `components/TwinsModal.jsx` | 1 routes, home only. |
| `hero.not-found` | HERO | 1 | 0 | `pages/tools/NotFound.jsx (div.nf)` | 0 routes, not found only. |

**27 shared sections** appear in more than one template and belong in a component library.

**131 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home — `template.home`

1 route · `/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.home` | page-local |
| 4 | FEATURE | `feature.context-layer` | page-local |
| 5 | FEATURE | `feature.raw-data` | page-local |
| 6 | FEATURE | `feature.prompt-topics` | page-local |
| 7 | FEATURE | `feature.self-improving-loop` | page-local |
| 8 | FEATURE | `feature.govern` | page-local |
| 9 | PROOF | `proof.stories-marquee` | page-local |
| 10 | CTA | `cta.final-cta` | shared ×19 |
| 11 | CHROME | `chrome.footer` | shared ×38 |
| 12 | OVERLAY | `overlay.twins-modal` | page-local |

### Product page — `template.product`

7 routes · `/product/ai-agents/`, `/product/ai-channels/`, `/product/ai-chat/`, `/product/ai-dashboards/`, `/product/ai-docs/`, `/product/ai-projects/`, `/product/digital-twins/` · chrome: **accent-nav · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.product` | page-local |
| 4 | PROOF | `proof.product-logo-marquee` | page-local |
| 5 | FEATURE | `feature.product-statement` | page-local |
| 6 | FEATURE | `feature.product-scroll-video` | page-local |
| 7 | FEATURE | `feature.product-features` | page-local |
| 8 | FEATURE | `feature.product-for` | page-local |
| 9 | FEATURE | `feature.product-voice-mode` | page-local |
| 10 | FEATURE | `feature.product-prompt-cards` | page-local |
| 11 | PROOF | `proof.product-quote` | page-local |
| 12 | FEATURE | `feature.product-carousel` | page-local |
| 13 | DECOR | `decor.pixel-band` | shared ×5 |
| 14 | FEATURE | `feature.product-findings` | page-local |
| 15 | PROOF | `proof.customer-stories-slice` | shared ×2 |
| 16 | HELP | `help.faq` | shared ×11 |
| 17 | CTA | `cta.final-cta` | shared ×19 |
| 18 | CHROME | `chrome.footer` | shared ×38 |

### Pricing — `template.pricing`

1 route · `/pricing/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.pricing` | page-local |
| 4 | CONVERSION | `conversion.plan-cards` | page-local |
| 5 | PROOF | `proof.logo-strip` | shared ×8 |
| 6 | CONVERSION | `conversion.pricing-comparison-table` | page-local |
| 7 | HELP | `help.faq` | shared ×11 |
| 8 | CTA | `cta.final-cta` | shared ×19 |
| 9 | CHROME | `chrome.footer` | shared ×38 |

### Enterprise — `template.enterprise`

1 route · `/enterprise/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.enterprise` | page-local |
| 4 | PROOF | `proof.logo-strip` | shared ×8 |
| 5 | FEATURE | `feature.enterprise-vertical-tabs` | page-local |
| 6 | FEATURE | `feature.enterprise-roi-map` | page-local |
| 7 | FEATURE | `feature.enterprise-integrations` | page-local |
| 8 | PROOF | `proof.testimonial` | shared ×5 |
| 9 | DECOR | `decor.pixel-band` | shared ×5 |
| 10 | FEATURE | `feature.security-compliance` | shared ×2 |
| 11 | PROOF | `proof.customer-stories-slice` | shared ×2 |
| 12 | LISTING | `listing.enterprise-resources` | page-local |
| 13 | CTA | `cta.final-cta` | shared ×19 |
| 14 | CHROME | `chrome.footer` | shared ×38 |

### Enterprise article — `template.enterprise-article`

3 routes · `/enterprise/how-leading-organizations-use-dovetail/`, `/enterprise/research-tool-stack-integration/`, `/enterprise/why-leading-teams-choose-dovetail/` · chrome: **light · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.article-title` | shared ×5 |
| 4 | CONTENT | `content.article-body` | shared ×5 |
| 5 | CONTENT | `content.article-carousels` | shared ×3 |
| 6 | OVERLAY | `overlay.contents-sheet` | shared ×5 |
| 7 | CTA | `cta.feedback-cta` | shared ×14 |
| 8 | CHROME | `chrome.footer` | shared ×38 |

### Deploy — `template.deploy`

1 route · `/deploy/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.deploy` | page-local |
| 4 | PROOF | `proof.logo-strip` | shared ×8 |
| 5 | CONTENT | `content.deploy-intro` | page-local |
| 6 | FEATURE | `feature.deploy-problems` | page-local |
| 7 | FEATURE | `feature.deploy-why` | page-local |
| 8 | FEATURE | `feature.security-compliance` | shared ×2 |
| 9 | CONVERSION | `conversion.deploy-scoping-form` | page-local |
| 10 | HELP | `help.faq` | shared ×11 |
| 11 | CTA | `cta.feedback-cta` | shared ×14 |
| 12 | CHROME | `chrome.footer` | shared ×38 |

### Solution page — `template.solutions`

4 routes · `/solutions/healthcare/`, `/solutions/product-research/`, `/solutions/research-repository/`, `/solutions/voice-of-customer/` · chrome: **dark · cta-band**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.solution` | page-local |
| 4 | PROOF | `proof.logo-strip` | shared ×8 |
| 5 | FEATURE | `feature.solution-section` | page-local |
| 6 | FEATURE | `feature.solution-features` | page-local |
| 7 | PROOF | `proof.testimonial` | shared ×5 |
| 8 | CONVERSION | `conversion.trial-offer` | shared ×2 |
| 9 | HELP | `help.faq` | shared ×11 |
| 10 | CHROME | `chrome.footer-cta-band` | shared ×2 |
| 11 | CHROME | `chrome.footer` | shared ×38 |

### Role page — `template.roles`

6 routes · `/roles/customer-experience/`, `/roles/design/`, `/roles/marketing/`, `/roles/product-management/`, `/roles/research/`, `/roles/sales-and-cs/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.role` | page-local |
| 4 | FEATURE | `feature.role-challenge` | page-local |
| 5 | FEATURE | `feature.role-helps` | page-local |
| 6 | FEATURE | `feature.role-prioritization` | page-local |
| 7 | FEATURE | `feature.role-integrations` | page-local |
| 8 | FEATURE | `feature.role-use-case-tabs` | page-local |
| 9 | PROOF | `proof.testimonial` | shared ×5 |
| 10 | PROOF | `proof.role-story-cards` | page-local |
| 11 | CONVERSION | `conversion.role-quiz-promo` | page-local |
| 12 | HELP | `help.faq` | shared ×11 |
| 13 | CHROME | `chrome.footer` | shared ×38 |

### Role quiz — `template.role-quiz`

3 routes · `/roles/research/quiz/`, `/roles/product-management/quiz/`, `/roles/design/quiz/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | TOOL | `tool.role-quiz` | page-local |
| 4 | CTA | `cta.feedback-cta` | shared ×14 |
| 5 | CHROME | `chrome.footer` | shared ×38 |

### Menu — `template.menu`

1 route · `/menu/` · chrome: **menu · no nav · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.menu-header` | page-local |
| 3 | CHROME | `chrome.footer` | shared ×38 |

### Launch microsite — `template.launch`

1 route · `/launch/suns-out/` · chrome: **launch · nav, no banner, own footer**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×38 |
| 2 | CHROME | `chrome.launch-section-nav` | page-local |
| 3 | HERO | `hero.launch` | page-local |
| 4 | LAUNCH | `launch.shipped` | page-local |
| 5 | LAUNCH | `launch.agents` | page-local |
| 6 | LAUNCH | `launch.digital-twins` | page-local |
| 7 | LAUNCH | `launch.multiplayer` | page-local |
| 8 | LAUNCH | `launch.channels` | page-local |
| 9 | LAUNCH | `launch.trends` | page-local |
| 10 | LAUNCH | `launch.ecosystem` | page-local |
| 11 | LAUNCH | `launch.enterprise` | page-local |
| 12 | LAUNCH | `launch.one-way` | page-local |
| 13 | LAUNCH | `launch.protected` | page-local |
| 14 | LAUNCH | `launch.closing-cta` | page-local |
| 15 | CHROME | `chrome.launch-footer` | page-local |

### Best-never-guess campaign — `template.best-never-guess`

1 route · `/the-best-never-guess/` · chrome: **campaign · own nav + footer**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.campaign-nav` | shared ×2 |
| 2 | HERO | `hero.campaign` | shared ×2 |
| 3 | CAMPAIGN | `campaign.text-slice` | shared ×2 |
| 4 | CAMPAIGN | `campaign.testimonial` | shared ×2 |
| 5 | CAMPAIGN | `campaign.story-grid` | shared ×2 |
| 6 | CAMPAIGN | `campaign.team-switch` | shared ×2 |
| 7 | CONVERSION | `conversion.campaign-trial-form` | shared ×2 |
| 8 | CHROME | `chrome.campaign-footer` | shared ×2 |

### AWS Summit campaign — `template.aws-summit`

1 route · `/aws-summit-sydney-2026/` · chrome: **campaign · own nav + footer**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.campaign-nav` | shared ×2 |
| 2 | HERO | `hero.campaign` | shared ×2 |
| 3 | CAMPAIGN | `campaign.text-slice` | shared ×2 |
| 4 | CAMPAIGN | `campaign.testimonial` | shared ×2 |
| 5 | CAMPAIGN | `campaign.story-grid` | shared ×2 |
| 6 | CAMPAIGN | `campaign.team-switch` | shared ×2 |
| 7 | CONVERSION | `conversion.campaign-trial-form` | shared ×2 |
| 8 | DECOR | `decor.pixel-band` | shared ×5 |
| 9 | CAMPAIGN | `campaign.careers-band` | page-local |
| 10 | CHROME | `chrome.campaign-footer` | shared ×2 |

### Blog index — `template.blog-index`

6 routes · `/blog/`, `/blog/ai/`, `/blog/dovetail-team/`, `/blog/engineering/`, `/blog/product/`, `/blog/ideas/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | LISTING | `listing.blog-featured-header` | page-local |
| 4 | LISTING | `listing.blog-card-grid` | page-local |
| 5 | CTA | `cta.final-cta` | shared ×19 |
| 6 | CHROME | `chrome.footer` | shared ×38 |

### Blog post — `template.blog-post`

203 routes · `/blog/{slug}/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.blog-post` | page-local |
| 4 | CONTENT | `content.blog-post-body` | page-local |
| 5 | CTA | `cta.final-cta` | shared ×19 |
| 6 | CHROME | `chrome.footer` | shared ×38 |

### Changelog index — `template.changelog-index`

7 routes · `/changelog/`, `/changelog/category/ai/`, `/changelog/category/agents/`, `/changelog/category/channels/`, `/changelog/category/projects/`, `/changelog/category/integrations/`, `/changelog/category/admin-and-security/` · chrome: **dark · inline-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.changelog-index` | page-local |
| 4 | LISTING | `listing.changelog-rows` | page-local |
| 5 | CTA | `cta.feedback-cta` | shared ×14 |
| 6 | CHROME | `chrome.footer` | shared ×38 |

### Changelog entry — `template.changelog-entry`

349 routes · `/changelog/{slug}/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.changelog-entry` | page-local |
| 4 | CTA | `cta.final-cta` | shared ×19 |
| 5 | CHROME | `chrome.footer` | shared ×38 |

### Guide article — `template.guide-article`

1126 routes · `/{hub}/{slug}/ and /guides/{slug}/` · chrome: **light · inline-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.article-title` | shared ×5 |
| 4 | CONTENT | `content.article-body` | shared ×5 |
| 5 | CONTENT | `content.article-carousels` | shared ×3 |
| 6 | OVERLAY | `overlay.contents-sheet` | shared ×5 |
| 7 | CTA | `cta.feedback-cta` | shared ×14 |
| 8 | CHROME | `chrome.footer` | shared ×38 |

### Guide hub — `template.guide-hub`

10 routes · `/customer-research/`, `/design-thinking/`, `/employee-experience/`, `/market-research/`, `/patient-experience/`, `/product-development/`, `/product-management/`, `/research/`, `/surveys/`, `/ux/` · chrome: **light · inline-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.article-title` | shared ×5 |
| 4 | CONTENT | `content.article-body` | shared ×5 |
| 5 | CONTENT | `content.article-carousels` | shared ×3 |
| 6 | OVERLAY | `overlay.contents-sheet` | shared ×5 |
| 7 | CTA | `cta.feedback-cta` | shared ×14 |
| 8 | CHROME | `chrome.footer` | shared ×38 |
| 9 | LISTING | `listing.hub-article-index` | page-local |

### Guides index — `template.guides-index`

1 route · `/guides/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.guides-index` | page-local |
| 4 | PROOF | `proof.tei-card` | shared ×2 |
| 5 | LISTING | `listing.guides-topics` | page-local |
| 6 | CTA | `cta.final-cta` | shared ×19 |
| 7 | CHROME | `chrome.footer` | shared ×38 |

### Contributors index — `template.contributors-index`

1 route · `/contributors/` · chrome: **light · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.contributors-index` | page-local |
| 4 | LISTING | `listing.contributors-groups` | page-local |
| 5 | CONTENT | `content.editorial-process` | shared ×2 |
| 6 | CTA | `cta.final-cta` | shared ×19 |
| 7 | CHROME | `chrome.footer` | shared ×38 |

### Contributor profile — `template.contributor-profile`

20 routes · `/contributors/{slug}/` · chrome: **light · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.contributor-profile` | page-local |
| 4 | CONTENT | `content.contributor-skills` | page-local |
| 5 | CONTENT | `content.editorial-process` | shared ×2 |
| 6 | LISTING | `listing.contributor-articles` | page-local |
| 7 | CTA | `cta.final-cta` | shared ×19 |
| 8 | CHROME | `chrome.footer` | shared ×38 |

### Demo form — `template.demo-form`

2 routes · `/contact-sales/`, `/request-a-demo/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.demo-form` | page-local |
| 4 | PROOF | `proof.logo-strip` | shared ×8 |
| 5 | PROOF | `proof.forrester-tei-stats` | page-local |
| 6 | FEATURE | `feature.demo-features` | page-local |
| 7 | PROOF | `proof.testimonial` | shared ×5 |
| 8 | CTA | `cta.final-cta` | shared ×19 |
| 9 | CHROME | `chrome.footer` | shared ×38 |

### Comparison page — `template.comparison`

16 routes · `/dovetail-vs-{competitor}/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.comparison` | page-local |
| 4 | HERO | `hero.comparison-image` | page-local |
| 5 | PROOF | `proof.logo-strip` | shared ×8 |
| 6 | CONTENT | `content.comparison-intro` | page-local |
| 7 | PROOF | `proof.comparison-tei-card` | page-local |
| 8 | PROOF | `proof.testimonial` | shared ×5 |
| 9 | FEATURE | `feature.comparison-choose-grid` | page-local |
| 10 | CONTENT | `content.comparison-table` | page-local |
| 11 | PROOF | `proof.awards-marquee` | page-local |
| 12 | PROOF | `proof.comparison-customer-story` | page-local |
| 13 | CONVERSION | `conversion.comparison-migrate` | page-local |
| 14 | CONVERSION | `conversion.trial-offer` | shared ×2 |
| 15 | HELP | `help.faq` | shared ×11 |
| 16 | CHROME | `chrome.footer` | shared ×38 |

### Quiz hub — `template.quiz-hub`

1 route · `/quiz/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.quiz-hub` | page-local |
| 4 | CTA | `cta.feedback-cta` | shared ×14 |
| 5 | CHROME | `chrome.footer` | shared ×38 |

### ROI calculator — `template.roi-calculator`

1 route · `/roi-calculator/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.roi-calculator` | page-local |
| 4 | TOOL | `tool.roi-calculator` | page-local |
| 5 | CONVERSION | `conversion.roi-report-download` | page-local |
| 6 | CTA | `cta.feedback-cta` | shared ×14 |
| 7 | CHROME | `chrome.footer` | shared ×38 |

### Template landing — `template.template-landing`

3 routes · `/research-report-template/`, `/user-persona-template/`, `/ux-research-plan-template/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.template-landing` | page-local |
| 4 | PROOF | `proof.logo-strip` | shared ×8 |
| 5 | CONTENT | `content.template-intro` | page-local |
| 6 | FEATURE | `feature.template-split` | page-local |
| 7 | FEATURE | `feature.template-checklist` | page-local |
| 8 | HELP | `help.faq` | shared ×11 |
| 9 | CHROME | `chrome.footer` | shared ×38 |

### Tools article — `template.tools-article`

5 routes · `/resources/dovetail-vs-aurelius/`, `/resources/dovetail-vs-enterpret/`, `/resources/dovetail-vs-marvin/`, `/resources/dovetail-vs-qualtrics/`, `/research-maturity-assessment/` · chrome: **light · inline-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.article-title` | shared ×5 |
| 4 | CONTENT | `content.article-body` | shared ×5 |
| 5 | OVERLAY | `overlay.contents-sheet` | shared ×5 |
| 6 | CTA | `cta.feedback-cta` | shared ×14 |
| 7 | CHROME | `chrome.footer` | shared ×38 |

### Legal index — `template.legal-index`

1 route · `/legal/` · chrome: **light-legal · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | LISTING | `listing.legal-index` | page-local |
| 4 | CTA | `cta.final-cta` | shared ×19 |
| 5 | CHROME | `chrome.footer` | shared ×38 |

### Legal document — `template.legal-doc`

19 routes · `/legal/{doc}/ and /privacy/{doc}/` · chrome: **light-legal · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.legal-title` | page-local |
| 4 | CONTENT | `content.legal-doc-body` | page-local |
| 5 | CTA | `cta.final-cta` | shared ×19 |
| 6 | CHROME | `chrome.footer` | shared ×38 |

### Not found (404) — `template.not-found`

0 route · `*` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.not-found` | page-local |
| 4 | CTA | `cta.final-cta` | shared ×19 |
| 5 | CHROME | `chrome.footer` | shared ×38 |

### Customers index — `template.customers-index`

1 route · `/customers/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.customers-index` | page-local |
| 4 | LISTING | `listing.customer-story-grid` | page-local |
| 5 | PROOF | `proof.logo-wall` | page-local |
| 6 | DECOR | `decor.pixel-band` | shared ×5 |
| 7 | PROOF | `proof.customer-story-carousel` | page-local |
| 8 | PROOF | `proof.ratings-awards` | page-local |
| 9 | PROOF | `proof.testimonial-wall` | page-local |
| 10 | CTA | `cta.final-cta` | shared ×19 |
| 11 | CHROME | `chrome.footer` | shared ×38 |

### Customer story — `template.customer-story`

39 routes · `/customers/{slug}/` · chrome: **accent-nav · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.customer-story` | page-local |
| 4 | DECOR | `decor.pixel-band` | shared ×5 |
| 5 | CONTENT | `content.customer-story-body` | page-local |
| 6 | CTA | `cta.story-best-never-guess` | page-local |
| 7 | HELP | `help.faq` | shared ×11 |
| 8 | CTA | `cta.final-cta` | shared ×19 |
| 9 | CHROME | `chrome.footer` | shared ×38 |

### Events / webinars index — `template.events-index`

2 routes · `/events/`, `/webinars/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.events-index` | page-local |
| 4 | LISTING | `listing.upcoming-events` | page-local |
| 5 | LISTING | `listing.past-events` | page-local |
| 6 | CTA | `cta.feedback-cta` | shared ×14 |
| 7 | CTA | `cta.final-cta` | shared ×19 |
| 8 | CHROME | `chrome.footer` | shared ×38 |

### Event detail — `template.event-detail`

48 routes · `/events/{slug}/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.event-detail` | page-local |
| 4 | LISTING | `listing.more-events` | page-local |
| 5 | HELP | `help.faq` | shared ×11 |
| 6 | CTA | `cta.final-cta` | shared ×19 |
| 7 | CHROME | `chrome.footer` | shared ×38 |

### Live demos — `template.live-demos`

1 route · `/live-demos/` · chrome: **dark · final-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.live-demos` | page-local |
| 4 | LISTING | `listing.demo-video-grid` | page-local |
| 5 | CTA | `cta.final-cta` | shared ×19 |
| 6 | CHROME | `chrome.footer` | shared ×38 |

### Resource centre — `template.resources-index`

1 route · `/resources/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.resources-index` | page-local |
| 4 | LISTING | `listing.resource-link-list` | page-local |
| 5 | PROOF | `proof.tei-card` | shared ×2 |
| 6 | CONVERSION | `conversion.roi-card` | page-local |
| 7 | LISTING | `listing.resources-blog-row` | page-local |
| 8 | LISTING | `listing.resources-demo-row` | page-local |
| 9 | CTA | `cta.feedback-cta` | shared ×14 |
| 10 | CHROME | `chrome.footer` | shared ×38 |

### Resources guide — `template.resources-guide`

2 routes · `/resources/dovetail-review/`, `/resources/insight7-alternatives/` · chrome: **light · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | CONTENT | `content.article-title` | shared ×5 |
| 4 | CONTENT | `content.article-body` | shared ×5 |
| 5 | CONTENT | `content.related-articles-carousel` | page-local |
| 6 | CTA | `cta.feedback-cta` | shared ×14 |
| 7 | OVERLAY | `overlay.contents-sheet` | shared ×5 |
| 8 | CHROME | `chrome.footer` | shared ×38 |

### Industry report — `template.resources-report`

1 route · `/resources/industry-reports/2025-forrester-TEI-of-Dovetail/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.report-download` | page-local |
| 4 | PROOF | `proof.logo-strip` | shared ×8 |
| 5 | CTA | `cta.feedback-cta` | shared ×14 |
| 6 | CHROME | `chrome.footer` | shared ×38 |

### Careers — `template.careers`

1 route · `/careers/` · chrome: **dark · cta-band**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.careers` | page-local |
| 4 | FEATURE | `feature.careers-globe` | page-local |
| 5 | LISTING | `listing.open-positions` | page-local |
| 6 | CONTENT | `content.careers-people` | page-local |
| 7 | FEATURE | `feature.careers-benefits` | page-local |
| 8 | CONTENT | `content.careers-gallery` | page-local |
| 9 | CONTENT | `content.careers-values` | page-local |
| 10 | CONTENT | `content.careers-hiring` | page-local |
| 11 | HELP | `help.faq` | shared ×11 |
| 12 | CHROME | `chrome.footer-cta-band` | shared ×2 |
| 13 | CHROME | `chrome.footer` | shared ×38 |

### Podcast — `template.podcast`

1 route · `/b2bsaasy/` · chrome: **dark · footer-only**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.banner` | shared ×38 |
| 2 | CHROME | `chrome.navbar` | shared ×38 |
| 3 | HERO | `hero.podcast` | page-local |
| 4 | HELP | `help.faq` | shared ×11 |
| 5 | CTA | `cta.feedback-cta` | shared ×14 |
| 6 | CHROME | `chrome.footer` | shared ×38 |

## Section reference

### CHROME

_Site chrome: the banner, navbars and footers, whether App.jsx renders them or a campaign page renders its own inside <main>._

**`chrome.banner`** — One-line announcement strip above the nav ("Ask. Never guess. Introducing Digital Twins →"). Not sticky. Palette follows the page: default dark, light veil on light pages, `accent` tint over the product/story colour, `legal` palette on legal pages.

· 1896 routes across home, product page, pricing, enterprise, enterprise article, deploy, solution page, role page, role quiz, menu, blog index, blog post, changelog index, changelog entry, guide article, guide hub, guides index, contributors index, contributor profile, demo form, comparison page, quiz hub, roi calculator, template landing, tools article, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos, resource centre, resources guide, industry report, careers, podcast. Hidden on the launch and campaign pages and on the Digital Twins product page (alert bar off in its data file). · appears on 1896 routes · implemented by `components/Banner.jsx`

**`chrome.navbar`** — Main site navigation: logo, Product/Platform/Resources dropdowns, Log in and Book a demo, and the ≤1185px "Menu" pill that links to /menu/. Relative, not sticky. Variants via chrome: light ink, solid `navBg` colour (product accent, story blue), `navButtons:false` on legal docs.

· 1896 routes across home, product page, pricing, enterprise, enterprise article, deploy, solution page, role page, role quiz, launch microsite, blog index, blog post, changelog index, changelog entry, guide article, guide hub, guides index, contributors index, contributor profile, demo form, comparison page, quiz hub, roi calculator, template landing, tools article, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos, resource centre, resources guide, industry report, careers, podcast. Not rendered on the menu route or the two blue campaign pages, which draw their own header. · appears on 1896 routes · implemented by `components/Navbar.jsx`

**`chrome.footer`** — Site footer: six link columns with new/beta badges, the Log in / Book a demo stack (≤1280), and the bottom bar (copyright, cookie preferences, Legal & Privacy, socials). Dark or light by page theme.

· 1896 routes across home, product page, pricing, enterprise, enterprise article, deploy, solution page, role page, role quiz, menu, blog index, blog post, changelog index, changelog entry, guide article, guide hub, guides index, contributors index, contributor profile, demo form, comparison page, quiz hub, roi calculator, template landing, tools article, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos, resource centre, resources guide, industry report, careers, podcast. Footer variants are recorded on each template as `chrome`. · appears on 1896 routes · implemented by `components/Footer.jsx`

**`chrome.footer-cta-band`** — The 560px image band (footer-bg.webp) that sits directly above the footer link grid: centred H64 heading and Book a demo + secondary button. The original renders it as the first child of <footer>.

· 5 routes across solution page, careers. Same original block implemented twice: Footer.jsx draws it for the solutions pages, Careers.jsx re-implements it as a local PreFooter. · appears on 5 routes · implemented by `components/Footer.jsx (footer: "cta-band") | pages/company/Careers.jsx > PreFooter`

**`chrome.campaign-nav`** — Campaign-page header inside <main>: wordmark logo, then black "Get 60 days full access" (and on AWS a white "Join the team") anchor buttons; ≤799 becomes a fixed bottom CTA bar.

· 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > CampaignNav | pages/company/AwsSummit.jsx > CampaignNav`

**`chrome.campaign-footer`** — Minimal campaign footer: Cookie preferences, Trust center and Legal and privacy links plus the copyright line, in place of the site footer.

· 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations; on AWS it sits inside the black careers block. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > BngFooter | pages/company/AwsSummit.jsx > Careers (footer.aw-footer)`

**`chrome.launch-footer`** — Single-row launch microsite footer (copyright, cookie preferences, legal links) on the blue page.

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Footer`

**`chrome.launch-section-nav`** — Fixed in-page section nav for the launch microsite (AI Agents in GA, Channels 2.0, Dovetail ecosystem, Enterprise) that highlights the section in view.

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/SectionNav.jsx`

**`chrome.menu-header`** — Header of the /menu/ route: logo plus a Close button that goes back in history (or home on a direct landing). The route has no site nav; the footer link grid underneath is the menu.

· 1 routes, menu only. · appears on 1 routes · implemented by `pages/corporate/Menu.jsx`

### HERO

_The page-opening block that holds the H1._

**`hero.home`** — Homepage hero "Feed the facts machine": full-viewport ASCII-field canvas pulled under the nav, rotating word, and primary CTAs.

· 1 routes, home only. · appears on 1 routes · implemented by `components/Hero.jsx`

**`hero.pricing`** — Pricing hero "Start free / Upgrade to scale" over a gradient banner.

· 1 routes, pricing only. · appears on 1 routes · implemented by `pages/corporate/Pricing.jsx > PricingHero`

**`hero.enterprise`** — Enterprise hero "Turn feedback into foresight—at scale": split heading, sub-copy, CTAs and product image on the slice grid.

· 1 routes, enterprise only. · appears on 1 routes · implemented by `pages/corporate/Enterprise.jsx > EnterpriseHero`

**`hero.deploy`** — Deploy hero "Deployed by the team that builds it." with a "Book a scoping call" button that smooth-scrolls to the form.

· 1 routes, deploy only. · appears on 1 routes · implemented by `pages/corporate/Deploy.jsx > DeployHero`

**`hero.product`** — Product hero: accent-coloured page top with eyebrow, two-part H1, intro, CTAs and product visual; Channels adds a video card.

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/ProductHero.jsx`

**`hero.role`** — Role hero pulled under the nav: H1, sub-copy, CTAs and a four-slot customer-logo swapper.

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > RoleHero`

**`hero.solution`** — Solution hero pulled under the nav: H1, intro, "Start a 60-day free trial" (scrolls to the trial offer) and Contact sales.

· 4 routes, solution page only. · appears on 4 routes · implemented by `pages/roles/SolutionPage.jsx > SolutionHero`

**`hero.blog-post`** — Blog post header: Blog breadcrumb, H1, meta table (date, author, read time), share buttons and the hero image or video.

· 203 routes, blog post only. · appears on 203 routes · implemented by `pages/blog/BlogPost.jsx (first section.blog-grid)`

**`hero.changelog-index`** — Changelog header pulled under the nav: H1 "Changelog", category pill nav (All plus six categories, active pill per route) and the client-side year dropdown.

· 7 routes, changelog index only. · appears on 7 routes · implemented by `pages/changelog/ChangelogIndex.jsx (div.cl-hero)`

**`hero.guides-index`** — Guides index intro: H1 "Guides", intro paragraph, Contact sales and Try Dovetail free.

· 1 routes, guides index only. · appears on 1 routes · implemented by `pages/guides/GuidesIndex.jsx (first section.container)`

**`hero.contributors-index`** — Contributors title block on the light theme: H1 "Contributors" and intro paragraph.

· 1 routes, contributors index only. · appears on 1 routes · implemented by `pages/guides/Contributors.jsx > ContributorsIndex (div.ctitle)`

**`hero.contributor-profile`** — Contributor profile title block: Contributors breadcrumb, the person's name as H1 and their role line.

· 20 routes, contributor profile only. · appears on 20 routes · implemented by `pages/guides/Contributors.jsx > ContributorProfile (div.ctitle)`

**`hero.customers-index`** — Customers hero: a typewriter that types and deletes customer quotes ("I will cry if you take this tool away from me.").

· 1 routes, customers index only. · appears on 1 routes · implemented by `pages/customers/TypewriterHero.jsx`

**`hero.customer-story`** — Blue customer-story hero: eyebrow, H1, intro, hero image or YouTube video card with caption, stats column and a CTA card. Anonymous stories drop the caption; some stories have no stats.

· 39 routes, customer story only. · appears on 39 routes · implemented by `pages/customers/CustomerStory.jsx > StoryHero`

**`hero.events-index`** — Events / Webinars hero on a dotted background: intro line and a 160px H1.

· 2 routes, events / webinars index only. · appears on 2 routes · implemented by `pages/events/EventsIndex.jsx (div.ev-hero)`

**`hero.live-demos`** — Live demos hero "Dovetail in action" over a faded background image.

· 1 routes, live demos only. · appears on 1 routes · implemented by `pages/events/LiveDemos.jsx (div.ld-hero)`

**`hero.resources-index`** — Resource centre hero: eyebrow, H1, intro and two buttons.

· 1 routes, resource centre only. · appears on 1 routes · implemented by `pages/company/ResourcesIndex.jsx (section.ri-hero)`

**`hero.report-download`** — Forrester report hero: H1 "236% ROI unlocked with Dovetail", intro, square-bullet list and the (non-submitting) download form card.

· 1 routes, industry report only. · appears on 1 routes · implemented by `pages/company/ResourcesReport.jsx (section.rr-hero) + ReportForm`

**`hero.careers`** — Careers hero "Help build the future of customer intelligence" on the grid background with a rotating 8-logo column.

· 1 routes, careers only. · appears on 1 routes · implemented by `pages/company/Careers.jsx > Hero`

**`hero.podcast`** — B2B SaaSy podcast hero: eyebrow, H1 and intro, with the episode cards (external links) in the same grid section.

· 1 routes, podcast only. · appears on 1 routes · implemented by `pages/company/Podcast.jsx (div.pc-hero)`

**`hero.demo-form`** — Demo / contact-sales hero: heading and copy beside the validated (non-submitting) demo request form with consent text.

· 2 routes, demo form only. · appears on 2 routes · implemented by `pages/tools/DemoForm.jsx > HeroForm`

**`hero.quiz-hub`** — Quiz hub "How customer-driven is your team?": eyebrow, H1, intro and three role-quiz cards linking to /roles/*/quiz/.

· 1 routes, quiz hub only. · appears on 1 routes · implemented by `pages/tools/QuizHub.jsx (section.qh)`

**`hero.roi-calculator`** — ROI calculator intro: eyebrow, H1 "Measure the revenue impact of Dovetail", intro and CTAs.

· 1 routes, roi calculator only. · appears on 1 routes · implemented by `pages/tools/RoiCalculator.jsx (first section.t-container)`

**`hero.template-landing`** — Template landing hero ("Write research reports stakeholders actually read" etc.): heading, copy, CTAs and template image.

· 3 routes, template landing only. · appears on 3 routes · implemented by `pages/tools/TemplateLanding.jsx > Hero`

**`hero.comparison`** — Comparison page heading block ("From tagged research projects to always-on customer intelligence"): H1, copy and trial / demo buttons.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > Hero`

**`hero.comparison-image`** — Full-width product screenshot directly under the comparison heading.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > HeroImage`

**`hero.not-found`** — 404 hero: large "404" H1 over a background image, subtitle, body and two buttons.

· 0 routes, not found only. · appears on 0 routes · implemented by `pages/tools/NotFound.jsx (div.nf)`

**`hero.campaign`** — Blue campaign hero: the "The best never guess" word block on #0044FF with corner SVG decorations and logo rotators, full viewport height.

· 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > Hero | pages/company/AwsSummit.jsx > Hero`

**`hero.launch`** — Launch microsite hero "Dovetail Launch ’26: Sun’s Out" (tall blue hero pulled under the nav, video modal trigger).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Hero`

### PROOF

_Customer evidence: logo strips, testimonials, story cards and carousels, ratings and analyst (Forrester TEI) cards._

**`proof.logo-strip`** — "Connecting the world's greatest companies to their customers" strip: centred M14 heading over one or two rows of white customer logos scrolling in opposite directions with edge fades (CompactLogoSlice).

· 29 routes across pricing, enterprise, deploy, solution page, demo form, comparison page, template landing, industry report. One original slice, four implementations, each on its own Marquee primitive. · appears on 29 routes · implemented by `components/marketing/CompactLogoSlice.jsx | components/tools/LogoMarquee.jsx | components/legal/Marquee.jsx > LogoMarquee | pages/company/ResourcesReport.jsx > LogoStrip`

**`proof.testimonial`** — Featured testimonial: one large quote with attribution on the grid-image background, 560px tall, with cursor tooltip on the card.

· 29 routes across enterprise, solution page, role page, demo form, comparison page. One original slice, three implementations. · appears on 29 routes · implemented by `components/marketing/TestimonialSlice.jsx | components/tools/Testimonial.jsx | components/legal/FeaturedTestimonial.jsx`

**`proof.product-quote`** — Product quote slice: placeholder customer quote on the grid background, product pages only (a separate original component from the featured testimonial).

· 7 routes, product page only. · appears on 7 routes · implemented by `components/marketing/ProductQuoteSlice.jsx`

**`proof.customer-stories-slice`** — Customer stories band: tabbed story cards (Breville, Atlassian Design, Itaú) with progress tabs and a looping background video.

· 8 routes across product page, enterprise. · appears on 8 routes · implemented by `components/marketing/CustomerStoriesSlice.jsx`

**`proof.stories-marquee`** — Homepage "In their words, not ours": story-quote marquee with pixel-dissolve images and a "Read customer story" cursor tooltip.

· 1 routes, home only. · appears on 1 routes · implemented by `components/Stories.jsx`

**`proof.product-logo-marquee`** — Product page logo marquee wrapper ("Connecting the world’s greatest companies…"); the Digital Twins page adds a G2 / Capterra / TrustRadius ratings row above it.

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/LogoMarqueeWrap.jsx`

**`proof.role-story-cards`** — Two customer story cards with pixel thumbnails on role pages (e.g. SafetyCulture, Achievers).

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > StoryCards`

**`proof.tei-card`** — "The Total Economic Impact™ of Dovetail" card: heading and copy beside the Forrester TEI image.

· 2 routes across guides index, resource centre. Same card on two pages, implemented twice. · appears on 2 routes · implemented by `pages/guides/GuidesIndex.jsx (section.gi-tei) | pages/company/ResourcesIndex.jsx > TeiCard`

**`proof.forrester-tei-stats`** — Demo-form "Forrester’s Total Economic Impact™" block: heading, stat figures and study link.

· 2 routes, demo form only. · appears on 2 routes · implemented by `pages/tools/DemoForm.jsx > Tei`

**`proof.comparison-tei-card`** — Comparison "Proven business impact" card: copy, Forrester link and the TEI module image, full-width.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > TeiCard`

**`proof.awards-marquee`** — Comparison awards marquee: a single strip of award badges (Buyer's choice award, Category leader…) scrolling under the comparison table.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/Marquee.jsx > AwardsMarquee`

**`proof.comparison-customer-story`** — Comparison customer story row: a named customer story card with heading and link, on some comparison pages.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > CustomerStory`

**`proof.logo-wall`** — Customers index logo wall: grid of boxed customer logos.

· 1 routes, customers index only. · appears on 1 routes · implemented by `pages/customers/CustomersIndex.jsx > LogoWall`

**`proof.customer-story-carousel`** — Customers index blue story carousel: one story slide at a time with the company logo inline in the heading and progress tabs.

· 1 routes, customers index only. · appears on 1 routes · implemented by `pages/customers/CustomersIndex.jsx > StoryCarousel (ProgressTabs, useTabGroup)`

**`proof.ratings-awards`** — Customers index ratings block: G2 / Capterra / TrustRadius star ratings, the "Trusted and loved by users" headline and an awards marquee on a dotted tile.

· 1 routes, customers index only. · appears on 1 routes · implemented by `pages/customers/CustomersIndex.jsx > Ratings (components/company/Marquee.jsx)`

**`proof.testimonial-wall`** — Customers index wall of short testimonial cards in a masonry-like column layout.

· 1 routes, customers index only. · appears on 1 routes · implemented by `pages/customers/CustomersIndex.jsx > TestimonialWall`

### FEATURE

_Product and capability explanation: feature rows, tabbed or sticky showcases, integration and security grids._

**`feature.context-layer`** — Homepage "Build your customer context layer": topic tabs with quote and stat cards.

· 1 routes, home only. · appears on 1 routes · implemented by `components/ContextLayer.jsx`

**`feature.raw-data`** — Homepage "Turn raw data into rich context": multimodal input diagram.

· 1 routes, home only. · appears on 1 routes · implemented by `components/RawData.jsx`

**`feature.prompt-topics`** — Homepage "Put the customer in every prompt": prompt topic tabs.

· 1 routes, home only. · appears on 1 routes · implemented by `components/Prompt.jsx`

**`feature.self-improving-loop`** — Homepage "Make your software self improving": sticky globe with step loop.

· 1 routes, home only. · appears on 1 routes · implemented by `components/SelfImproving.jsx (components/loop/LoopGlobe.jsx)`

**`feature.govern`** — Homepage "Govern customer context at scale": governance card grid.

· 1 routes, home only. · appears on 1 routes · implemented by `components/Govern.jsx`

**`feature.security-compliance`** — Security and compliance grid ("Data residency & retention", SOC 2, SSO…) on a section background image.

· 2 routes across enterprise, deploy. Real reuse: one component serves both pages. · appears on 2 routes · implemented by `pages/corporate/common.jsx > SecurityGrid`

**`feature.enterprise-vertical-tabs`** — Enterprise "Intelligent decisions, made faster": auto-advancing vertical tabs with a preview panel.

· 1 routes, enterprise only. · appears on 1 routes · implemented by `pages/corporate/Enterprise.jsx > VerticalTabs`

**`feature.enterprise-roi-map`** — Enterprise "Save time, reduce risk, and build what moves the needle": ROI stat cards over a dashed hotspot grid.

· 1 routes, enterprise only. · appears on 1 routes · implemented by `pages/corporate/Enterprise.jsx > RoiMap`

**`feature.enterprise-integrations`** — Enterprise "Connected to your enterprise stack": feature card grid on a section background.

· 1 routes, enterprise only. · appears on 1 routes · implemented by `pages/corporate/Enterprise.jsx > Integrations`

**`feature.deploy-problems`** — Deploy "Three problems. One delivery team.": heading then alternating problem rows.

· 1 routes, deploy only. · appears on 1 routes · implemented by `pages/corporate/Deploy.jsx > ProblemsHeading + Problem`

**`feature.deploy-why`** — Deploy "Why enterprises choose Deploy": heading and a feature grid.

· 1 routes, deploy only. · appears on 1 routes · implemented by `pages/corporate/Deploy.jsx > WhyHeading + WhyGrid`

**`feature.product-statement`** — Product statement slice: one centred H2 statement with sub-copy (agents, Digital Twins).

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/ProductStatement.jsx`

**`feature.product-scroll-video`** — Product scroll video: a YouTube card that scales up as the page scrolls (agents, Digital Twins).

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/ProductScrollVideo.jsx`

**`feature.product-features`** — Product features: sticky multi-step feature engine (text left, swapping visuals right).

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/ProductFeatures.jsx`

**`feature.product-for`** — Product "… for" slice: list of team use cases (channels, dashboards, docs, projects).

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/ProductFor.jsx`

**`feature.product-voice-mode`** — Digital Twins "Ask out loud, with voice mode" slice.

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/VoiceMode.jsx`

**`feature.product-prompt-cards`** — Product prompt cards ("Put AI Agents to work"): clickable prompt cards that open a prompt modal.

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/ProductPromptCards.jsx (+ PromptModal.jsx)`

**`feature.product-carousel`** — Product carousel: heading plus a horizontally scrolling set of feature cards.

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/ProductCarousel.jsx`

**`feature.product-findings`** — Product findings block ("Get more from your findings"): heading and feature card grid.

· 7 routes, product page only. · appears on 7 routes · implemented by `pages/product/Findings.jsx`

**`feature.role-challenge`** — Role "The challenge" card on the grid-image background.

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > Challenge`

**`feature.role-helps`** — Role "How Dovetail helps": H2 header row followed by a grid of capability cards.

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > HelpsHeader + HelpsCards`

**`feature.role-prioritization`** — Product-management "Using Dovetail to prioritize what to build" block.

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > Prioritization`

**`feature.role-integrations`** — Role "Connect to the tools you use": integration logo grid.

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > Integrations`

**`feature.role-use-case-tabs`** — Role "Practical ways … teams use Dovetail": auto-advancing use-case tabs.

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > UseCaseTabs (local useTabGroup copy)`

**`feature.solution-section`** — Solution feature row: eyebrow, H2, copy and buttons beside an image, alternating sides.

· 4 routes, solution page only. · appears on 4 routes · implemented by `pages/roles/SolutionPage.jsx > SolutionSection`

**`feature.solution-features`** — Solution feature list block (voice-of-customer only).

· 4 routes, solution page only. · appears on 4 routes · implemented by `pages/roles/SolutionPage.jsx > SolutionFeatures`

**`feature.demo-features`** — Demo form "See the platform in action": heading row and "Effortless, end-to-end intelligence" feature grid.

· 2 routes, demo form only. · appears on 2 routes · implemented by `pages/tools/DemoForm.jsx > Features`

**`feature.template-split`** — Template landing split row: H2 and copy beside an image, alternating sides.

· 3 routes, template landing only. · appears on 3 routes · implemented by `pages/tools/TemplateLanding.jsx > Split`

**`feature.template-checklist`** — Template landing checklist grid ("What separates reports that get read").

· 3 routes, template landing only. · appears on 3 routes · implemented by `pages/tools/TemplateLanding.jsx > Checklist`

**`feature.comparison-choose-grid`** — Comparison "Choose Dovetail when…" reasons grid.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > ChooseGrid`

**`feature.careers-globe`** — Careers globe slice: mission copy beside an animated globe.

· 1 routes, careers only. · appears on 1 routes · implemented by `pages/company/Careers.jsx > GlobeSlice (CareersGlobe.jsx)`

**`feature.careers-benefits`** — Careers "The full package": benefits grid.

· 1 routes, careers only. · appears on 1 routes · implemented by `pages/company/Careers.jsx > Benefits`

### CONTENT

_Long-form reading and editorial blocks: article titles and bodies, rich text, story and event bodies, prose._

**`content.article-title`** — Light article title block (.ctitle): breadcrumb trail and the H1.

· 1146 routes across enterprise article, guide article, guide hub, tools article, resources guide. Shared by the article family; the resources guides re-implement the breadcrumb locally. · appears on 1146 routes · implemented by `pages/guides/components.jsx > Breadcrumb (in GuideArticle, EnterpriseArticle, ToolsArticle) | pages/company/ResourcesGuide.jsx > Breadcrumb`

**`content.article-body`** — Light article body grid: left aside (meta table, share / Summarize-with-AI, optional sidebar promo card, desktop table of contents) and the rich-text column ending in the Related topics tag cloud.

· 1146 routes across enterprise article, guide article, guide hub, tools article, resources guide. Guide articles, enterprise articles and tools articles share the guides components; the resources guides have their own body, share and TOC copies. Hub pages show no promo or TOC. · appears on 1146 routes · implemented by `pages/guides/components.jsx > MetaTable, ShareAi, TocList, RichText, TagCloud | pages/company/ResourcesGuide.jsx > Body, ShareGroups, Toc | components/legal/Prose.jsx (ToolsArticle)`

**`content.article-carousels`** — "Editor's picks↘" and "Latest articles↘" text carousels with a draggable progress bar.

· 1139 routes across enterprise article, guide article, guide hub. · appears on 1139 routes · implemented by `pages/guides/components.jsx > TextCarousel`

**`content.related-articles-carousel`** — "Related articles↘" carousel on the resources guides, built on the company Carousel.

· 2 routes, resources guide only. Same horizontal-carousel-with-progress pattern as the guides TextCarousel, separate implementation. · appears on 2 routes · implemented by `pages/company/ResourcesGuide.jsx > RelatedCarousel (components/company/Carousel.jsx)`

**`content.blog-post-body`** — Blog post body: lede paragraph, rich text, sticky sidebar post cards and the Related Articles grid.

· 203 routes, blog post only. · appears on 203 routes · implemented by `pages/blog/BlogPost.jsx (second section.blog-grid)`

**`content.changelog-entry`** — Changelog entry cell: Back link, date and time, H1, hero image, rich text, docs CTA and share, then Previous / Next entry links.

· 349 routes, changelog entry only. · appears on 349 routes · implemented by `pages/changelog/ChangelogEntry.jsx`

**`content.editorial-process`** — "About our editorial process" box on the light contributor pages.

· 21 routes across contributors index, contributor profile. · appears on 21 routes · implemented by `pages/guides/components.jsx > EditorialBox`

**`content.contributor-skills`** — Contributor "Skills" tag cloud.

· 20 routes, contributor profile only. · appears on 20 routes · implemented by `pages/guides/components.jsx > TagCloud (in ContributorProfile)`

**`content.customer-story-body`** — Customer story body: headed sections of rich text with rules, pull quotes and inline images.

· 39 routes, customer story only. · appears on 39 routes · implemented by `pages/customers/CustomerStory.jsx > StoryBody (components/company/RichText.jsx)`

**`content.event-detail`** — Event detail grid: back link and H1, sidebar of detail rows (start / end in the viewer's timezone, location, register link), hero image or recording video, rich body and, on some events, a registration form.

· 48 routes, event detail only. · appears on 48 routes · implemented by `pages/events/EventDetail.jsx (RichBody.jsx, RegistrationForm.jsx, components/company/VideoCard.jsx)`

**`content.legal-title`** — Legal document title block: breadcrumb and H1.

· 19 routes, legal document only. · appears on 19 routes · implemented by `pages/legal/LegalDoc.jsx (div.ltitle)`

**`content.legal-doc-body`** — Legal document body: legal / privacy side nav, prose with last-updated footer, and a right-hand table of contents.

· 19 routes, legal document only. · appears on 19 routes · implemented by `pages/legal/LegalDoc.jsx > SideNav + components/legal/Prose.jsx`

**`content.deploy-intro`** — Deploy intro paragraph under the logo strip.

· 1 routes, deploy only. · appears on 1 routes · implemented by `pages/corporate/Deploy.jsx > Intro`

**`content.template-intro`** — Template landing centred intro ("What a research report covers").

· 3 routes, template landing only. · appears on 3 routes · implemented by `pages/tools/TemplateLanding.jsx > CenteredIntro`

**`content.comparison-intro`** — Comparison intro split: H2 and paragraphs beside a visual.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > Intro`

**`content.comparison-table`** — "How Dovetail compares to …" heading and the Dovetail-vs-competitor feature table.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > CompareIntro + ComparisonTable`

**`content.careers-people`** — Careers "Meet some of the humans behind the product": expandable people rows.

· 1 routes, careers only. · appears on 1 routes · implemented by `pages/company/Careers.jsx > People`

**`content.careers-gallery`** — Careers office tour gallery with a video card ("Join Tommy…").

· 1 routes, careers only. · appears on 1 routes · implemented by `pages/company/Careers.jsx > Gallery (components/company/VideoCard.jsx)`

**`content.careers-values`** — Careers "Driven by values": heading and a draggable values carousel.

· 1 routes, careers only. · appears on 1 routes · implemented by `pages/company/Careers.jsx > Values (components/company/Carousel.jsx)`

**`content.careers-hiring`** — Careers "How we hire" steps.

· 1 routes, careers only. · appears on 1 routes · implemented by `pages/company/Careers.jsx > Hiring`

### LISTING

_Indexes and collections: card grids, row lists, filter pills, A-Z lists and directory groupings._

**`listing.blog-featured-header`** — Blog index top: two featured post cards, the H1 "Blog" and tag pills (All, AI, Dovetail team, Engineering, Product, Ideas).

· 6 routes, blog index only. · appears on 6 routes · implemented by `pages/blog/BlogIndex.jsx (first section.blog-grid) + BlogCard.jsx`

**`listing.blog-card-grid`** — Blog card grid with client-side "Load more".

· 6 routes, blog index only. · appears on 6 routes · implemented by `pages/blog/BlogIndex.jsx (div.blog-index__grid-wrap) + BlogCard.jsx`

**`listing.changelog-rows`** — Changelog list: one row per entry (date, time, title) with a hover image preview, filtered by category route and year.

· 7 routes, changelog index only. · appears on 7 routes · implemented by `pages/changelog/ChangelogIndex.jsx > Row + usePreview`

**`listing.hub-article-index`** — "All … articles" A-Z link list rendered after the footer (portalled into #after-footer-slot).

· 10 routes, guide hub only. · appears on 10 routes · implemented by `pages/guides/GuideArticle.jsx > AfterFooter`

**`listing.guides-topics`** — Guides index "Topics" list: one entry per hub with title and description.

· 1 routes, guides index only. · appears on 1 routes · implemented by `pages/guides/GuidesIndex.jsx (div.gi-topics)`

**`listing.contributors-groups`** — Contributors grouped rows (Authors, Reviewers…): name with arrow and role, between rules.

· 1 routes, contributors index only. · appears on 1 routes · implemented by `pages/guides/Contributors.jsx > ContributorsIndex`

**`listing.contributor-articles`** — Contributor article lists ("Articles reviewed by …"): title and date in a three-column grid.

· 20 routes, contributor profile only. · appears on 20 routes · implemented by `pages/guides/Contributors.jsx > ContributorProfile`

**`listing.customer-story-grid`** — Customers index industry filter chips and the customer story card grid.

· 1 routes, customers index only. · appears on 1 routes · implemented by `pages/customers/CustomersIndex.jsx > StoryGrid (components/company/StoryCard.jsx)`

**`listing.upcoming-events`** — Upcoming event card grid (computed at runtime from start dates; online-only on /webinars/).

· 2 routes, events / webinars index only. · appears on 2 routes · implemented by `pages/events/EventsIndex.jsx (components/company/EventCard.jsx)`

**`listing.past-events`** — "Past events" heading and row list (date, title).

· 2 routes, events / webinars index only. · appears on 2 routes · implemented by `pages/events/EventsIndex.jsx (components/company/RowList.jsx)`

**`listing.more-events`** — "More events" heading and event cards under an event; omitted when there are none.

· 48 routes, event detail only. · appears on 48 routes · implemented by `pages/events/EventDetail.jsx (components/company/EventCard.jsx)`

**`listing.demo-video-grid`** — Live demos video card grid, ending in a "footer prompt" heading and link.

· 1 routes, live demos only. · appears on 1 routes · implemented by `pages/events/LiveDemos.jsx (components/company/VideoCard.jsx)`

**`listing.resource-link-list`** — Resource centre link list section ("Explore by topic", "Compare Dovetail", "Customer stories"): heading beside a ruled list of links.

· 1 routes, resource centre only. · appears on 1 routes · implemented by `pages/company/ResourcesIndex.jsx > LinkList`

**`listing.resources-blog-row`** — Resource centre "From the blog": heading row with link, then three blog cards.

· 1 routes, resource centre only. · appears on 1 routes · implemented by `pages/company/ResourcesIndex.jsx > HeadingRow + Blog`

**`listing.resources-demo-row`** — Resource centre "Live demos": heading row with link, then a row of video cards.

· 1 routes, resource centre only. · appears on 1 routes · implemented by `pages/company/ResourcesIndex.jsx > HeadingRow + VideoCard`

**`listing.open-positions`** — Careers "Open positions" (#open-roles): team and location radio filters, job rows grouped by team, then the "Can’t see the role you’re looking for?" note.

· 1 routes, careers only. Uses a local RowList copy because job rows open in the same tab; the shared components/company/RowList.jsx opens them in a new tab. · appears on 1 routes · implemented by `pages/company/Careers.jsx > OpenPositions (pages/company/Parts.jsx > RowList)`

**`listing.legal-index`** — Legal and Privacy index: H1 then grouped document links with last-updated dates.

· 1 routes, legal index only. · appears on 1 routes · implemented by `pages/legal/LegalIndex.jsx (section.lgi)`

**`listing.enterprise-resources`** — Enterprise "Resources for enterprise": resource cards.

· 1 routes, enterprise only. · appears on 1 routes · implemented by `pages/corporate/Enterprise.jsx > Resources`

### CONVERSION

_Offers and forms: pricing plans, trial offers, sign-up and download forms, quiz promos._

**`conversion.plan-cards`** — Pricing plan cards (Free and Enterprise) with feature lists and plan buttons.

· 1 routes, pricing only. · appears on 1 routes · implemented by `pages/corporate/Pricing.jsx > PlanCards`

**`conversion.pricing-comparison-table`** — Pricing "Centralize your user feedback" comparison table with grouped rows, tooltips and a sticky plan header.

· 1 routes, pricing only. · appears on 1 routes · implemented by `pages/corporate/Pricing.jsx > ComparisonTable + StickyHeader (Tooltip.jsx)`

**`conversion.deploy-scoping-form`** — Deploy scoping-call form (#book-a-call), "Tell us what you’re trying to do."

· 1 routes, deploy only. · appears on 1 routes · implemented by `pages/corporate/Deploy.jsx > Scoping (DeployForm.jsx)`

**`conversion.trial-offer`** — Blue 60-day trial offer (#trial-cta) on the trial grid background: heading, copy, check list and "Start a 60-day free trial".

· 20 routes across solution page, comparison page. One original slice, two implementations. · appears on 20 routes · implemented by `pages/roles/SolutionPage.jsx > SolutionTrial | components/legal/ComparisonSlices.jsx > TrialCta`

**`conversion.role-quiz-promo`** — Role page quiz promo box ("Are you a data-driven product manager?") linking to that role's quiz.

· 6 routes, role page only. · appears on 6 routes · implemented by `pages/roles/RoleSections.jsx > QuizPromo`

**`conversion.comparison-migrate`** — Comparison "Migrate your customer evidence to Dovetail" block.

· 16 routes, comparison page only. · appears on 16 routes · implemented by `components/legal/ComparisonSlices.jsx > Migrate`

**`conversion.campaign-trial-form`** — Campaign "Join the world's leading teams. Sign up for Enterprise…" trial form slice (#60-day-trial-offer), non-submitting.

· 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > FormSlice | pages/company/AwsSummit.jsx > TrialForm`

**`conversion.roi-card`** — Resource centre "Measure the revenue impact of Dovetail" card linking to the ROI calculator.

· 1 routes, resource centre only. · appears on 1 routes · implemented by `pages/company/ResourcesIndex.jsx > RoiCard`

**`conversion.roi-report-download`** — ROI calculator "Download your ROI report" card.

· 1 routes, roi calculator only. · appears on 1 routes · implemented by `pages/tools/RoiCalculator.jsx > Download`

### CTA

_Closing call-to-action bands that end a page._

**`cta.final-cta`** — "The best never guess" final CTA: 900px ASCII-field canvas with the word block, Start free trial and Book a demo. Dark, or light on light pages.

· 703 routes across home, product page, pricing, enterprise, blog index, blog post, changelog entry, guides index, contributors index, contributor profile, demo form, legal index, legal document, not found, customers index, customer story, events / webinars index, event detail, live demos. Real reuse: one component, rendered by each page at the end of its main. · appears on 703 routes · implemented by `components/FinalCta.jsx`

**`cta.feedback-cta`** — "Turn customer feedback into product innovation" CTA footer slice: spacer, H64 heading (per-page override on the podcast and deploy pages) and Contact sales / Try Dovetail free (one button on the report page).

· 1164 routes across enterprise article, deploy, role quiz, changelog index, guide article, guide hub, quiz hub, roi calculator, tools article, events / webinars index, resource centre, resources guide, industry report, podcast. One original slice with six separate implementations (enterprise articles reuse components/InlineCta.jsx). The changelog index renders two copies at once. · appears on 1164 routes · implemented by `components/InlineCta.jsx | pages/changelog/InlineCta.jsx | components/company/PageCta.jsx | components/tools/CtaFooter.jsx | pages/corporate/Deploy.jsx > CtaBand | pages/roles/QuizPage.jsx (inline result CTA)`

**`cta.story-best-never-guess`** — Customer-story "The best never guess" block: logo rotator, body, buttons and three related story cards (carousel ≤799).

· 39 routes, customer story only. · appears on 39 routes · implemented by `components/company/BestNeverGuess.jsx (StoryCard.jsx, Carousel.jsx)`

### HELP

_FAQ and Q&A accordions._

**`help.faq`** — FAQ accordion: "FAQs" H56 left (compact H32 variant for grouped event Q&A), questions with a rule and expand icon right.

· 127 routes across product page, pricing, deploy, solution page, role page, comparison page, template landing, customer story, event detail, careers, podcast. One original slice, four implementations. · appears on 127 routes · implemented by `components/marketing/FaqSlice.jsx | components/company/Faq.jsx | components/tools/Faq.jsx | components/legal/Faq.jsx`

### TOOL

_Interactive, stateful tools: the ROI calculator and the role quizzes._

**`tool.roi-calculator`** — ROI calculator: input sliders and advanced inputs (left) driving live result cards (right).

· 1 routes, roi calculator only. · appears on 1 routes · implemented by `pages/tools/RoiCalculator.jsx (Slider, ResultCard, compute)`

**`tool.role-quiz`** — Role quiz flow: intro with Start, ten questions, then a scored result with CTA and retake.

· 3 routes, role quiz only. · appears on 3 routes · implemented by `pages/roles/QuizPage.jsx`

### CAMPAIGN

_Blocks of the blue standalone campaign pages (/the-best-never-guess/ and the AWS Summit page)._

**`campaign.text-slice`** — Campaign text slice: large centred paragraph with inline logo badges.

· 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > TextSlice | pages/company/AwsSummit.jsx > TextSlice`

**`campaign.testimonial`** — Blue campaign testimonial (Breville quote) with attribution.

· 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > Testimonial | pages/company/AwsSummit.jsx > Testimonial`

**`campaign.story-grid`** — Campaign customer story grid (carousel ≤799).

· 2 routes across best-never-guess campaign, aws summit campaign. The best-never-guess page carries its own StoryCard copy; AWS uses the shared one. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > Stories + local StoryCard | pages/company/AwsSummit.jsx > Stories (components/company/StoryCard.jsx)`

**`campaign.team-switch`** — "Trusted by the best. Built by us." team-switch slice.

· 2 routes across best-never-guess campaign, aws summit campaign. One original block, two separate implementations. · appears on 2 routes · implemented by `pages/campaigns/bng/BestNeverGuessPage.jsx > TeamSwitch | pages/company/AwsSummit.jsx > TeamSwitch`

**`campaign.careers-band`** — AWS Summit careers block (#careers-slice, black): "Build with the best in Sydney…" with open-role rows, entered through a pixel band.

· 1 routes, aws summit campaign only. · appears on 1 routes · implemented by `pages/company/AwsSummit.jsx > Careers (components/company/RowList.jsx)`

### LAUNCH

_Blocks unique to the Launch microsite (/launch/suns-out/)._

**`launch.shipped`** — "A lot shipped / Here’s what’s new" index of launch items.

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Shipped`

**`launch.agents`** — "AI Agents — now available in GA" section (#launch-agents).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Agents`

**`launch.digital-twins`** — "Build a digital twin of your customer" persona section (#launch-digital-twins).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/DigitalTwins.jsx`

**`launch.multiplayer`** — "Multiplayer AI for human-agent collaboration" with agent modal (#launch-multiplayer).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/Multiplayer.jsx`

**`launch.channels`** — "Channels 2.0" section (#launch-channels).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Channels`

**`launch.trends`** — "Spot trends before problems arise" feature section (#launch-trends).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > ChannelsFeatures`

**`launch.ecosystem`** — "Ecosystem: customer intelligence, everywhere you work" (#launch-ecosystem).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Ecosystem`

**`launch.enterprise`** — "Enterprise: built for the complexity of large organizations" with the stacked enterprise cards (#launch-enterprise).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Enterprise (EnterpriseStack.jsx)`

**`launch.one-way`** — "One way to work, across every team" (#launch-one-way).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > OneWay`

**`launch.protected`** — "Protected by default" (#launch-protected).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Protected`

**`launch.closing-cta`** — Launch closing "The best never guess" block on blue (page-local, not FinalCta).

· 1 routes, launch microsite only. · appears on 1 routes · implemented by `pages/campaigns/launch/LaunchPage.jsx > Cta`

### DECOR

_Decorative transitions with no content of their own._

**`decor.pixel-band`** — Pixel transition band: three rows of 48px squares that scrub between #0A0A0A and the next block on scroll (≥1281 only), wrapping the block above or below it.

· 49 routes across product page, enterprise, aws summit campaign, customers index, customer story. Real reuse: the company PixelBand delegates to the marketing slice rather than copying it. · appears on 49 routes · implemented by `components/marketing/PixelTransitionSlice.jsx (components/company/PixelBand.jsx is a thin wrapper)`

### OVERLAY

_Fixed or modal UI that is not part of the page flow (timed promos, mobile drawers)._

**`overlay.twins-modal`** — Timed Digital Twins promo modal on the homepage.

· 1 routes, home only. · appears on 1 routes · implemented by `components/TwinsModal.jsx`

**`overlay.contents-sheet`** — Mobile "Contents" bottom sheet for the article table of contents (hidden on desktop).

· 1146 routes across enterprise article, guide article, guide hub, tools article, resources guide. The resources guides re-implement the sheet locally. · appears on 1146 routes · implemented by `pages/guides/components.jsx > ContentsSheet | pages/company/ResourcesGuide.jsx > ContentsDrawer`
