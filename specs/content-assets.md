Source: https://dovetail.com/

# Content asset manifest (blog / changelog / guides / contributors)

Downloaded to `public/assets/content/` and served as `/assets/content/<file>`. All are images; no scripts.

Index pages reference **412 images** in total: 203 blog covers, 208 changelog hover previews (the other 143 entries have none) and 1 TEI card. That's over the ~400 budget, so I downloaded **only the first page of each index**:
- the 26 blog cards rendered on `/blog/` at load (2 featured + 24 grid);
- the first 26 changelog rows' hover previews;
- the guides TEI image.

That's **52 files**. Everything else is recorded as an absolute remote URL in the JSON:
- `blog.json → posts[].thumbnailRemote`: 177 posts without a local thumbnail.
- `changelog.json → entries[].previewImageRemote`: 182 entries without a local preview.
- Blog post heroes (`posts[].hero`; 202 posts; `.mp4` + `.poster.jpg` for videos) and changelog entry heroes (`entries[].hero`; 205 entries) are **remote only**. They aren't index thumbnails.
- In-body images and videos aren't recorded (bodies are placeholders).

Blog card rule: if the cover URL ends in `.gif`, the card shows `<name>-poster.png` instead (verified on all 8 GIF covers on page 1). Covers are rendered at 3:2 with `object-fit:cover`.

No new fonts are needed. These pages load the same `/fonts/inter-400.woff2`, `Inter-Medium.woff2`, `Inter-SemiBold.woff2`, `JetBrainsMono-Regular.woff2` and `PPMondwest-Regular.woff2` already in `public/assets/fonts/`.

Icons (share, AI-summarize, arrows, breadcrumb slash, chevrons) are inline SVGs in the markup. Rebuild them as inline SVG; they aren't downloaded. The paths that matter:
- back arrow: `M8 12h9` + `m12 17-5-5 5-5`
- next arrow: `M6 12h10z` + `m12 7 5 5-5 5`
- contents chevron: `m16 10-4 4-4-4`

All use stroke 2, square caps, `currentColor`, 24x24 viewBox.

| File | Format | Natural size | Bytes | Used by |
|---|---|---|---|---|
| `/assets/content/05_Query_736x492.png` | png | 1472x984 | 255 KB | blog card /blog/your-research-is-good-so-why-isnt-it-changing-anything/ |
| `/assets/content/9-digital-twins-you-can-build-today.jpg` | jpeg | 1467x984 | 121 KB | blog card /blog/9-digital-twins-you-can-build-today/ |
| `/assets/content/Contact_sales_slice__3_.png` | png | 1232x1296 | 130 KB | guides TEI card |
| `/assets/content/activity-log-in-channels.png` | png | 1664x832 | 142 KB | changelog preview /changelog/activity-log-in-channels/ |
| `/assets/content/agent-starter-prompts.png` | png | 1664x832 | 138 KB | changelog preview /changelog/agent-starter-prompts/ |
| `/assets/content/brand-trackers-arent-dead-hero-poster.png` | png | 1200x676 | 711 KB | blog card /blog/brand-trackers-arent-dead/ |
| `/assets/content/bulk-select-evidence-in-channels.png` | png | 1664x832 | 172 KB | changelog preview /changelog/bulk-select-evidence-in-channels/ |
| `/assets/content/chaka-you-cant-build-trustworthy-ai.jpg` | jpeg | 1467x984 | 31 KB | blog card /blog/you-cant-build-trustworthy-ai-on-untrustworthy-data/ |
| `/assets/content/channels-2-generally-available.png` | png | 1664x832 | 196 KB | changelog preview /changelog/channels-2-generally-available/ |
| `/assets/content/channels-2-open-beta.png` | png | 1664x832 | 175 KB | changelog preview /changelog/channels-2-open-beta/ |
| `/assets/content/chat-thinking-tips.png` | png | 1664x832 | 120 KB | changelog preview /changelog/chat-thinking-tips/ |
| `/assets/content/chat-with-a-saved-view-in-channels.png` | png | 1664x832 | 128 KB | changelog preview /changelog/chat-with-a-saved-view-in-channels/ |
| `/assets/content/contact-syncing-and-filtering-in-channels.png` | png | 1664x832 | 119 KB | changelog preview /changelog/contact-syncing-and-filtering-in-channels/ |
| `/assets/content/create-agents-with-chat.png` | png | 1664x832 | 122 KB | changelog preview /changelog/create-agents-with-chat/ |
| `/assets/content/customer-understanding-ai-bottleneck-digital-twins.jpg` | jpeg | 1467x984 | 121 KB | blog card /blog/customer-understanding-ai-bottleneck-digital-twins/ |
| `/assets/content/default-contact-fields-v2.png` | png | 1664x832 | 169 KB | changelog preview /changelog/default-contact-fields/ |
| `/assets/content/doc-comments-api-mcp.png` | png | 1664x832 | 241 KB | changelog preview /changelog/project-and-workspace-context-api-mcp/; changelog preview /changelog/read-and-reply-to-doc- |
| `/assets/content/editor-tables-uplift.png` | png | 1664x832 | 122 KB | changelog preview /changelog/editor-tables-uplift/ |
| `/assets/content/engineers-youre-not-the-first-to-panic-about-democratization.png` | png | 1472x984 | 868 KB | blog card /blog/engineers-youre-not-the-first-to-panic-about-democratization/ |
| `/assets/content/fetch-once-use-everywhere-rebuilding-data-ingestion.jpg` | jpeg | 1472x984 | 114 KB | blog card /blog/fetch-once-use-everywhere-rebuilding-data-ingestion/ |
| `/assets/content/if-you-dont-go-on-call-you-dont-own-it.png` | png | 1472x984 | 1242 KB | blog card /blog/if-you-dont-go-on-call-you-dont-own-it/ |
| `/assets/content/image-5-.png` | png | 1472x984 | 2966 KB | blog card /blog/voc-program-fragmentation-problem/ |
| `/assets/content/innovation-paradox-hero-poster.png` | png | 1200x676 | 270 KB | blog card /blog/the-innovation-paradox/ |
| `/assets/content/mcp-tools-projects-and-tags.png` | png | 1664x832 | 170 KB | changelog preview /changelog/mcp-tools-projects-and-tags/ |
| `/assets/content/moral-crumple-zone-hero-poster.png` | png | 1200x676 | 725 KB | blog card /blog/avoiding-the-moral-crumple-zone/ |
| `/assets/content/multi-column-csv-analysis.png` | png | 1664x832 | 135 KB | changelog preview /changelog/multi-column-csv-analysis/ |
| `/assets/content/new-cover-images.png` | png | 1664x832 | 355 KB | changelog preview /changelog/new-cover-images/ |
| `/assets/content/pixel-fing-the-new-chat-library.jpg` | jpeg | 1472x984 | 92 KB | blog card /blog/pixel-fing-the-new-chat-library/ |
| `/assets/content/project-table-column-improvements.png` | png | 1664x832 | 129 KB | changelog preview /changelog/project-table-column-improvements/ |
| `/assets/content/public-chat-link.png` | png | 1664x832 | 96 KB | changelog preview /changelog/public-chat-link/ |
| `/assets/content/scoped-personal-api-keys.png` | png | 1664x832 | 91 KB | changelog preview /changelog/scoped-personal-api-keys/ |
| `/assets/content/should-you-build-or-buy-your-next-piece-of-software.jpg` | jpeg | 1472x984 | 125 KB | blog card /blog/should-you-build-or-buy-your-next-piece-of-software/ |
| `/assets/content/side-by-side-chat.png` | png | 1664x832 | 104 KB | changelog preview /changelog/side-by-side-chat/ |
| `/assets/content/snapshot-summary-in-channels.png` | png | 1664x832 | 100 KB | changelog preview /changelog/snapshot-summary-in-channels/ |
| `/assets/content/sources-beta.png` | png | 1664x832 | 84 KB | changelog preview /changelog/sources-beta/ |
| `/assets/content/stakeholder-trust-design-decisions-hero-poster.png` | png | 1200x676 | 522 KB | blog card /blog/stakeholder-trust-design-decisions/ |
| `/assets/content/suns-out-2026-press-release.png` | png | 1472x984 | 1537 KB | blog card /blog/suns-out-summer-launch-26/ |
| `/assets/content/suns-out-ai-agents.png` | png | 1467x984 | 462 KB | blog card /blog/suns-out-ai-agents/ |
| `/assets/content/suns-out-channels.png` | png | 1467x984 | 431 KB | blog card /blog/suns-out-channels/ |
| `/assets/content/suns-out-ecosystem.png` | png | 1467x984 | 931 KB | blog card /blog/suns-out-ecosystem/ |
| `/assets/content/suns-out-enterprise-thumbnail.png` | png | 1467x984 | 474 KB | blog card /blog/suns-out-enterprise/ |
| `/assets/content/suns-out-summer-launch-26.png` | png | 1280x800 | 939 KB | blog card /blog/suns-out-2026-launch/ |
| `/assets/content/table-of-contents-improvements.png` | png | 1664x832 | 287 KB | changelog preview /changelog/table-of-contents-improvements/ |
| `/assets/content/tags-in-channels.png` | png | 1664x832 | 187 KB | changelog preview /changelog/tags-in-channels/ |
| `/assets/content/the-work-you-dont-see-hero.png` | png | 1472x984 | 317 KB | blog card /blog/the-work-you-dont-see/ |
| `/assets/content/unlocking-the-product-brain-with-ordermentums-cpo-hero-poster.png` | png | 1200x676 | 627 KB | blog card /blog/unlocking-the-product-brain-with-ordermentums-cpo/ |
| `/assets/content/unreasonable-experiences-why-great-products-are-no-longer-enough.png` | png | 1472x984 | 113 KB | blog card /blog/unreasonable-experiences-why-great-products-are-no-longer-enough/ |
| `/assets/content/uxr-quiet-transition-builders-era-poster.png` | png | 1200x676 | 23 KB | blog card /blog/uxr-quiet-transition-builders-era/ |
| `/assets/content/version-history-for-docs.png` | png | 1664x832 | 160 KB | changelog preview /changelog/version-history-for-data/ |
| `/assets/content/vertical-integration-enterprise-ai-advantage.jpg` | jpeg | 1467x984 | 234 KB | blog card /blog/vertical-integration-enterprise-ai-advantage/ |
| `/assets/content/voice-mode.png` | png | 1664x832 | 162 KB | changelog preview /changelog/voice-mode/ |
| `/assets/content/what-if-the-organization-was-your-research-subject-poster.png` | png | 1200x676 | 175 KB | blog card /blog/what-if-the-organization-was-your-research-subject/ |
