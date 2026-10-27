Source: https://dovetail.com/contributors/

# Template: contributors-index

**Route:** `/contributors/`.

**Data:** `src/data/content/contributors.json` (`groups.Authors`, `groups.Reviewers`: `{href, name, role}`; plus `introChars`/`introFirstSentence` and the `editorialProcess` paragraph lengths).

Theme is **LIGHT** (`content-shared.md` §2). The header has the 88px spacer. The footer variant is the **light final CTA + light footer**.

## Layout (1440)

1. **Spacer:** 112 (all widths).
2. **Title block** `div{padding:80px 0 160px; border-radius:8px}` (≤1280 `padding:40px 0 0; border-radius:0`) > `.container` section, containing:
   - **H1 "Contributors"**: Inter 600 **72/76 ls −2** #0A0A0A, `margin-bottom:32px` (≤1280 56/60, mb 24; ≤799 40/44 ls −1). y 398 at 1440.
   - Intro: a 12-col inner grid with a `span 9` cell (w 886) holding `p` Inter **16/24 #0A0A0A**, 218 chars (2 lines at 1440, 5 lines at 390). The first sentence is in the JSON.
3. **Spacer:** 64 (≤1280: 40).
4. **List section** (`.container`). Two groups, **Authors** (6) and **Reviewers** (17), in sequence. Each group is:
   - `h2`: Inter **32/40 w500 ls −0.5** #0A0A0A, `margin-bottom:40px` (≤1280 24/32 ls −0.25, mb 24).
   - `hr` (1px rgba(10,10,10,.24)), then one row per person, each followed by an `hr`. The second group's `h2` follows the first group's last `hr` directly; at 1440 the "Reviewers" heading sits 80px below it.
   - **Row** `div{padding:24px 0}` containing:
     - **Name link** → `/contributors/<slug>/`: inline-flex, Inter **18/24 w500 ls −0.25** #0A0A0A (≤1280 16/24), followed by a **24x24 right-arrow SVG** (stroke 2px currentColor, square caps; same icon as the changelog "Next").
       - Hover/focus: `opacity:.9`, underline, and the arrow (`> span`/svg) shifts `translate3d(4px,0,0)` with `transform 150ms cubic-bezier(.2,.6,.6,1)`.
     - **Role** `p` (unclassed, so it gets the global `p` style): Inter **20px / normal** w400 #0A0A0A, `margin-top:8px`. Omitted when `role` is null ("Dovetail Editorial Team").
   - Row height: 106 with a role, 54 without (1440). At 390: 130 (role wraps to 2 lines).
   - Authors list starts at y 858. The section ends at y 3577.
5. **Spacer:** 200 (≤1280: 96).
6. **Editorial process box** `div{background:#FAFAFA; border-radius:8px; padding:108px 0; margin:0 32px}` (≤1280: `border-radius:0; margin:0; padding:48px 0`). At 1440 it's x 32, w 1376 (464 tall). Inside is a `css-1y9l2ec` grid with a `span 8` cell (x 156, w 741) containing:
   - `h3` "About our editorial process": Inter **24/32 w500 ls −0.5** (≤1280 20/28; ≤799 18/24), `margin:0 0 24px`.
   - `p` Inter **16/24** #0A0A0A, `max-width:730px`. Two paragraphs separated by `<br/><br/>` inside one `p` (343 + 241 chars). The text is fixed boilerplate (see the live page); use same-length placeholders.
   - The box's bg equals the page bg, so it's visually invisible. The only visible effect is the indentation.
7. Light final CTA + light footer.

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| H1 y | 398 | – | – | 366 |
| list x / w | 124 / 1192 | 64 / 1152 | 16 / 736 | 16 / 358 |
| Authors h2 y | 778 | – | – | 594 |
| editorial box | 32,3777 1376x464 | full width, pad 48 | full width | 0,3505 390x504 |
| doc height | 5910 | 5816 | 6184 | 6538 |

## Motion

- Name link hover: arrow nudge 150ms; opacity and underline are instant.
- Nothing else.
- There are **no avatars or photos** anywhere.
