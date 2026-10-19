# Summit Fellowship: Friends of Pakistan Restyle

**Date:** 2026-10-19
**Status:** Draft for owner review
**Owner:** Usman Javed

## 1. Intent

The owner wants the Summit Fellowship website to adopt the visual language of the **Friends of Pakistan design system**, so that it looks like a sister site of friendsofpakistan.org. The design system lives in Claude Design: artifact `https://claude.ai/artifact/Taxz7Hjf6iveKX4UhrfaTP`, title "Friends of Pakistan". This restyle comes first. Decisions about the logo, the fellowship's name and the wording come later, as separate steps.

The owner chose the "sister-page" approach: take the system's whole visual language, including its band layout, not just its colours. Colours alone on the current layouts would look like neither brand, and yellow on the current pale grounds would be unreadable.

## 2. Goals

- Every page on `staging` uses the Friends of Pakistan colours, fonts, shapes, button and link styles, form-control styles and full-width band rhythm.
- Every existing page, section, feature and piece of text stays. The application form, its autosave, validation and submission keep working exactly as now.
- Accessibility holds: the system's contrast rules (§5.1), keyboard use, the 44px touch targets on mobile, and no horizontal scroll at 375px.

## 3. Non-goals (later, separate decisions)

- The logo. The current Summit mark and "Summit · Fellowship" wordmark stay; only their colour adapts to the new grounds.
- The fellowship's name and any copy edits. Text is unchanged. The only typographic exception is that buttons, nav and labels render uppercase through CSS (`text-transform`), as the system specifies; the strings in code stay in sentence case.
- Page structure, routes, data and features: nothing is added or removed.
- The offline application PDF. It keeps its current print styling.
- The live site. All work is on `staging`, and go-live stays a separate owner decision under the existing runbook in CLAUDE.md.

## 4. Anti-goals (would count as failure even if it "works")

- Yellow text on off-white or white grounds (1.4:1, unreadable).
- Loading the design system's React 18 `bundle.js` into the site, or depending on `window.FriendsOfPakistan`. The site is Next.js 16 / React 19 and is server-rendered.
- A half-migration in which old tokens (`--alpine-*`, `--ochre-*`, `--clay-*`, `--parchment`, `--paper*`) linger beside the new ones and pages mix both looks.
- Breaking the application form, or losing any accessibility behaviour added in Phase 2 (error summaries, focus management, 44px targets).

## 5. The design system, as it applies here

Source of truth: the design system's files, already copied into the repo at **`docs/design-system/friends-of-pakistan/project/`**. They are `README.md`, `tokens.json` (every colour, type style, space, radius and breakpoint value, including the danger reds), `components/bundle.css` (the reference CSS for every component and state), `components/index.d.ts` (props) and one `components/<Name>/README.md` per component (sizes, spacing, states, do's and don'ts). They are reference only and are not served. If the artifact and the live friendsofpakistan.org disagree (for example the live site uses pill buttons), **the artifact wins**. The icon SVGs are not in the copy; draw the arrow and caret as inline SVG components (`currentColor`) from the dimensions in `assets/Icons/README.md`.

### 5.1 Rules carried over verbatim

- **Colours.**
  - Yellow `primary` `#ffc700` (hover `primary-dark` `#e6b400`).
  - `brand-green` `#006600`: headlines, links and field borders on light grounds.
  - `brand-green-deep` `#003800`: the ground of the dark bands.
  - `off-white` `#f4f4f3`: the default page ground.
  - `white`, `charcoal` `#383838` (secondary text), `black` (body text).
  - Greys for functional states only. The danger reds come from tokens.json.
- **Themes.** Green bands set `data-theme="dark"`. Inside them the semantic tokens flip (`surface`, `ink`, `ink-brand`, `ink-soft`, `line`, `line-strong`, `field-border`, `link`, `focus`). Yellow bands use the light tokens on a `primary` fill.
- **Contrast.**
  - Yellow appears as text only on deep green or black.
  - Text on yellow is black.
  - Green headlines on yellow must be 24px or larger.
  - `line` hairlines are decorative only.
  - Danger text sits on white.
- **Type.**
  - `Crimson Pro` (300) for display: `heading-xl`, `heading-1`, `heading-2` and `stat`. These are always sentence case, line-height 1.25 (1 on small screens), in `ink-brand`.
  - `Source Sans 3` for everything else. Headings are Semibold 600 (`heading-3` 32px, `heading-4` 24px uppercase, `heading-5` 18px). Body is 18px/25px at weight 350; small text is 14px; eyebrow and status text is 12px. Interface labels (buttons, nav, badges, arrow links, stat captions) are Semibold and uppercase.
  - Sizes and breakpoint steps come from tokens.json.
- **Shape and elevation.** `radius-none` everywhere except radios and timeline dots. One shadow, `shadow-3xl`. Borders are 1px for controls, 2px for checkboxes and radios, and 4px for the yellow caption rule.
- **Icon.** One long arrow (32/45/55px long, 16px tall, `currentColor`) that follows a text label and nudges 8px on hover. Selects use a triangle caret: green on light grounds, yellow on green.
- **Motion.** 150ms `cubic-bezier(.4,0,.2,1)` colour transitions. Respect `prefers-reduced-motion`; the site already does this.
- **Page rhythm.** Alternating full-width bands inside a 1440px container with 32px side padding. Off-white, white and yellow bands pad 64px (32px under 1024px). Green bands pad 144px (96px under 1024px). Two yellow bands are never adjacent.

### 5.2 How the system enters the codebase (decided)

- **Tokens.** Generate a CSS token layer from `tokens.json` (light values on `:root`, dark values under `[data-theme="dark"]`) and make it the only colour, space, type and radius vocabulary in `app/globals.css`. Delete the old palette variables. Update the "Global Design System" section of CLAUDE.md to describe the new tokens.
- **Fonts.** Load Crimson Pro (300, 400) and Source Sans 3 (300, 350, 400, 500, 600, 700) through `next/font/google`, replacing Instrument Serif, Geist, JetBrains Mono and Caveat. The licensed Freight fonts are not used.
- **Primitives.** Re-implement the system's components the project actually needs as the site's own React 19 server components plus CSS Modules (BEM), following each component README for sizes, spacing and states. The class prefix is the builder's choice; `fop-` is suggested. The minimum set is:
  - Layout and actions: `Section` (band), `Button`, `ArrowLink`, `Arrow`, `SquareCta`, `Stat`, `Badge`.
  - Cards and progress: `SolverCard` (photo tile), `ImpactTile`, `Timeline`.
  - Text: `Prose`.
  - Form controls: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`.
  - Page chrome: the header and footer patterns.

  `ChallengeCard`, `MegaMenu`, `CarouselButton` and `ButtonGroup` are optional; use them only where a page genuinely calls for them.
- **The 2026 archive pages** (`/cohorts/2026/week`, `/venue`, `/explore`) have large bespoke CSS (1,100–1,250 lines each). They get a **mechanical remap**, not a redesign. Each section keeps its layout and order. Grounds and colours map to the nearest token under the §5.1 contrast rules: dark sections → deep green with the dark theme, light sections → off-white or white, accents → yellow fills or green text. Fonts, corners and buttons follow the system. Small visual differences from the original are acceptable as long as contrast holds and no old variable or hex value remains. *(Builder's call, made by Claude.)*
- **Uppercase scope.** `text-transform: uppercase` applies **only** to interface labels: buttons, nav and dropdown links, badges, arrow links, cohort tabs, sector-filter chips, `heading-4` section titles, stat captions and eyebrows. It **never** applies to body text, headlines other than `heading-4`, people's names or organisations, FAQ questions, timeline step text, or any application-form label, help text or answer. *(Claude's call.)*
- **Header behaviour.** The header is a **solid deep-green bar in normal flow** on every page, not floating. Pages with a green hero therefore read as one continuous green block, and no per-route mechanism is needed. *(Claude's call.)*
- **Form controls.** The application and contact forms keep their **existing client components, markup, ARIA and behaviour**. They are restyled through CSS only: custom checkbox and radio rendering via `appearance: none` plus pseudo-elements, and carets via inline SVG backgrounds. All Phase 2 accessibility behaviour and the 44px targets must survive. *(Claude's call.)*
- **Growth chart and imagery.** Yellow is used only for fills, bars and marks. Chart labels, axes and annotations are black or green on light grounds, or white on green. Photos that carry text over them sit under `scrim-band` or `scrim-image`. *(Claude's call.)*

## 6. Page-by-page mapping

The builder may adjust band order where content requires, keeping the §5.1 rules.

| Page | Bands (top → bottom) |
|---|---|
| **Header (all pages)** | SiteHeader pattern: 64px, white uppercase nav, a solid deep-green bar in normal flow (§5.2). Logo and wordmark on the left in white. About and Cohorts dropdowns become small white panels with uppercase links (no image mega-menu). The Apply button is the yellow `primary` Button. Under 1024px, a yellow "Menu" button opens the existing mobile menu, restyled. |
| **Home** | 1. Green hero: name, lead line, yellow Apply/"opening soon" CTA, and the meta strip as white uppercase captions. 2. Deadline (when live): green Stat-style band, or merge it into the hero. 3. Off-white "Why this fellowship" with a `SquareCta` (Apply) beside the copy; the growth chart is restyled to green and yellow. 4. White "What you get" tiles. 5. Green "How it works", with the five steps as a `Timeline` plus text. 6. Yellow "Meet the 2026 fellows" as `SolverCard` tiles (photo, name, organisation). 7. White faculty row. 8. Yellow closing band with `ArrowLink`s (Apply, FAQ); if it would sit next to band 6, make it green instead. 9. Footer. |
| **Footer (all pages)** | SiteFooter pattern: deep green, yellow column heads, white links. The callout box is "Applications" with an arrow link to `/apply`. A bottom rule with © and the partners line. |
| **Apply** | Green page hero → off-white body: criteria and stages in `Prose`. The key-dates aside is a white panel. "Before you start" and the PDF link use `ArrowLink`, and the start button is the yellow `Button`. |
| **Application form** (`/apply/form`) | Off-white ground. Every field is restyled to the system's controls: green 1px borders, square corners, yellow checked fills with black marks, green or yellow carets. Keep all Phase 2 behaviour, ARIA, focus handling and 44px targets. The progress bar is yellow on a `line` rail. The error summary has a `danger-400` border and its text on white. |
| **FAQ** | Green hero → off-white list of questions with uppercase group headings (`heading-4`). Open/close markers use the arrow or caret, not +/−. |
| **Curriculum, Faculty, Contact, Cohorts index** | Green hero → alternating off-white and white bands. Faculty people become square photo tiles in the SolverCard style. The contact form uses the system's controls. |
| **Cohort hub** (`/cohorts/2026` + tabs) | The CohortBar becomes an off-white bar with uppercase tab links. The active tab has a 4px black underline plus `aria-current` (not yellow, since it sits on a light ground). The fellows grid uses `SolverCard`-style square tiles. Fellows without photos show a deep-green tile with white initials. The sector filter uses square chips (yellow when selected, with black text). |
| **Fellow profile** | Green hero (name, problem statement, photo). The IdeaBand becomes a yellow band. The body is off-white `Prose` with a white sidebar panel. The back link uses `ArrowLink` styling. |
| **2026 week / venue / explore** | Per §5.2: tokens, fonts, corners, buttons and band grounds; existing layouts kept. |
| **404, staging banner** | 404: green band with the existing links as `Button`/`ArrowLink`. Staging banner: charcoal bar with white uppercase text. |

## 7. Constraints

- Next.js 16.2.6 App Router, React 19, TypeScript strict; CSS Modules plus `globals.css`; no new runtime UI libraries.
- All work on `staging`. Lint exits 0; `npm test`, `npm run build` and `npm run smoke` pass. Smoke `contains` strings must be updated wherever the uppercase transform does **not** change the HTML text (it doesn't; `text-transform` is CSS-only, so existing strings still match).
- Colours only through tokens. No hex in component CSS.
- External fonts only through `next/font`.

## 8. Verification

- Before-and-after screenshots of every route at 375, 768 and 1440px, stored under the plan workspace (not the repo). The owner gets a short visual tour from staging.
- Contrast spot-checks for every text/ground pair the restyle introduces, against §5.1.
- Keyboard pass through the header, menus, the full application form (screener → review) and the FAQ.
- A grep shows no remaining old palette variables and no hex in `.module.css` files.

## 9. Left to the builder

- Exact component file layout and class prefix.
- Exact hero heights, image treatments and which photos sit under a `scrim-band`.
- Whether the homepage deadline band stays separate or merges into the hero.
- The order in which pages are migrated, as long as no page ships in a mixed state at the end.
