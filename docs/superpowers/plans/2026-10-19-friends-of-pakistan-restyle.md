# Friends of Pakistan Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle every page on `staging` to the Friends of Pakistan design system: its tokens, fonts, square shapes and band rhythm. Logo, name, copy, routes, data and features stay unchanged.

**Architecture:**
- A generator turns the design system's `tokens.json` into `app/fop-tokens.css`: light values on `:root`, dark values under `[data-theme="dark"]`.
- In Task 1, a temporary **bridge** in `globals.css` maps every old palette variable onto the new tokens, so the whole site re-colours at once and never breaks.
- Small server-component primitives (`app/components/fop/`) implement the system's components from their READMEs and `bundle.css`.
- Each page task then rebuilds its pages as bands from those primitives and replaces old variable names with the new ones.
- The final task deletes the bridge, and a test proves no old variable or stray hex value remains.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript strict, CSS Modules (BEM), `next/font/google`, Vitest 3.2.4 (`react-dom/server` `renderToStaticMarkup` for markup tests).

**Spec:** `docs/superpowers/specs/2026-10-19-friends-of-pakistan-restyle-design.md`
**Design-system reference (read for every visual detail):** `docs/design-system/friends-of-pakistan/project/` (`README.md`, `tokens.json`, `components/bundle.css`, `components/<Name>/README.md`, `assets/Icons/README.md`).

## Global Constraints

- Work on branch `staging` only; never commit to or push `master`. `npm test`, `npm run lint` (exit 0), `npm run build` and `npm run smoke` all pass at the end of every task.
- No copy, route, data or feature changes. The logo SVG and the "Summit · Fellowship" wordmark stay; only their colour changes.
- `text-transform: uppercase` applies only to interface labels: buttons, nav and dropdown links, badges, arrow links, cohort tabs, sector-filter chips, `heading-4` section titles, stat captions and eyebrows. It never applies to body text, other headlines, names, organisations, FAQ questions, timeline step text, or any application-form label, help text or answer.
- Contrast:
  - Yellow (`--primary`) text appears only on `--brand-green-deep` or black.
  - Text on yellow is black.
  - Green headlines on yellow are 24px or larger.
  - `--line` hairlines are decorative only.
  - Danger text sits on white.
- Corners are 0 everywhere except radios and timeline dots. One shadow (`--shadow-3xl`). Colours come only from tokens; no hex in `.module.css` or `.tsx`.
- Green bands carry `data-theme="dark"`.
- Band padding: off-white, white and yellow bands use 64px (32px under 1024px); green bands use 144px (96px under 1024px). The container is 1440px max with 32px sides. Two yellow bands are never adjacent.
- Fonts: Crimson Pro (300, 400) and Source Sans 3 (300, 350, 400, 500, 600, 700) via `next/font/google`. Instrument Serif, Geist, JetBrains Mono and Caveat are removed.
- The header is a solid deep-green bar in normal flow on every page.
- The application and contact forms keep their existing components, markup, ARIA, focus behaviour and 44px targets; they are restyled with CSS only.
- Do not load the design system's `bundle.js` and do not use `window.FriendsOfPakistan`.
- Motion is 150ms `cubic-bezier(.4,0,.2,1)`. All motion is disabled under `prefers-reduced-motion: reduce`.
- Screenshots go only under `.superpowers/` (git-ignored), never in the repo root.

## Review Focus

1. **Yellow or low-contrast text on a light ground**, e.g. a link or label inheriting `--primary` on off-white. Expected: every text node meets 4.5:1 (3:1 for 24px+ or 18.66px bold). Pinned in Task 9 by the contrast audit.
2. **The application form after restyling**, using only the keyboard at 375px. Expected: same flow and error summary as Phase 2, custom checkboxes and radios still toggle with Space and arrow keys, visible focus, 44px targets. Pinned in Task 7.
3. **Horizontal scroll at 375px** on any route (wide nav labels, stat numbers, tables). Expected: none. Pinned in Task 9 by the width audit across all routes.
4. **Long uppercase nav and dropdown labels at 768–1024px** wrapping or overflowing the header. Expected: the nav fits or collapses to the Menu button. Pinned in Task 3.
5. **Reduced-motion users.** Expected: no arrow nudge or transitions. Pinned in Task 2 by a CSS test.

---

## File Structure

| Path | Responsibility |
|---|---|
| `scripts/build-fop-tokens.mjs` | Generates `app/fop-tokens.css` from `tokens.json`; also exports `buildTokensCss(tokens): string` |
| `app/fop-tokens.css` | Generated token layer (committed) |
| `lib/fop-tokens.test.ts` | Generated file is in sync; theme flip present |
| `app/globals.css` | Imports tokens; base elements; temporary bridge (Task 1, deleted in Task 9); shared global classes rewritten |
| `app/components/fop/*.tsx` + `fop.module.css` | Primitives: Arrow, Button, ArrowLink, Section, SquareCta, Stat, Badge, SolverCard, Timeline, Prose |
| `lib/fop-components.test.tsx` | Markup tests for the primitives |
| `lib/no-legacy-styles.test.ts` | Task 9 gate: no old variables, no hex in module CSS or TSX |

---

### Task 1: Token layer, fonts, base styles and bridge

**Files:**
- Create: `scripts/build-fop-tokens.mjs`, `app/fop-tokens.css`, `lib/fop-tokens.test.ts`
- Modify: `app/layout.tsx` (fonts), `app/globals.css` (palette, fonts, base element rules), `package.json` (script `tokens:fop`), `vitest.config.mts` (include `lib/**/*.test.tsx` too)

**Interfaces:**
- Produces:
  - CSS custom properties named exactly as in `tokens.json`: `--primary`, `--primary-dark`, `--brand-green`, `--brand-green-deep`, `--off-white`, `--charcoal`, `--white`, `--black`, `--gray-*`, `--danger*`, `--surface`, `--ink`, `--ink-brand`, `--ink-soft`, `--line`, `--line-strong`, `--field-border`, `--link`, `--focus`, `--on-accent`, `--scrim-*`, `--space-*`, `--radius-*`, `--shadow-3xl`, `--border-*`, `--opacity-*`, `--z-*`, `--nav-height`, `--container-max`, `--container-pad`, `--menu-width`, `--square-cta`.
  - Font variables `--font-serif` (Crimson Pro) and `--font-sans` (Source Sans 3).
  - Type utility classes `.t-<style>` for every style in `tokens.json` `type.groups`.
  - `buildTokensCss(tokens: object): string`.

- [ ] **Step 1: Failing test `lib/fop-tokens.test.ts`**
  - `generated file is in sync`: `buildTokensCss(require tokens.json)` must equal the contents of `app/fop-tokens.css`.
  - `light values`: the output contains `--primary: #ffc700;`, `--brand-green-deep: #003800;` and `--surface: var(--off-white);` in the `:root` block.
  - `dark theme flips`: the `[data-theme="dark"]` block contains `--surface: var(--brand-green-deep);`, `--ink: var(--white);` and `--field-border: var(--primary);`.
  - `type classes`: `.t-heading-4` has `text-transform: uppercase`; `.t-button` has `font-weight: 600` and `text-transform: uppercase`; `.t-heading-2` has `font-family: var(--font-serif)` and `font-weight: 300`.
- [ ] **Step 2: Run it and confirm it fails.** `npx vitest run lib/fop-tokens.test.ts` → FAIL (module missing).
- [ ] **Step 3: Implement `scripts/build-fop-tokens.mjs`.** Export `buildTokensCss`; when run directly, write `app/fop-tokens.css`.
  - A colour value `"{name}"` becomes `var(--name)`.
  - Object values `{light, dark}` emit `light` into `:root` and `dark` into `[data-theme="dark"]`.
  - `spacing`, `radius`, `shadow`, `borderWidth`, `opacity`, `zIndex` and `layout` tokens go into `:root` as `--<name>: <value>;`.
  - Each type style becomes `.t-<name> { font-family; font-size; line-height; font-weight }`. Family is `var(--font-serif)` for group `Display` and `var(--font-sans)` otherwise.
  - Add `text-transform: uppercase` for every style in group `Labels` and for `heading-4`.
  - Add `npm pkg set scripts.tokens:fop="node scripts/build-fop-tokens.mjs"`, then run it.
- [ ] **Step 4: Fonts in `app/layout.tsx`.** Replace the four fonts with `Crimson_Pro({ weight: ['300','400'], variable: '--font-serif' })` and `Source_Sans_3({ weight: ['300','400','500','600','700'], variable: '--font-sans' })`, both `subsets: ['latin'], display: 'swap'`. Weight 350 is rendered via `font-weight: 350` on the variable font; if `next/font` rejects listing 350, omit it.
- [ ] **Step 5: `app/globals.css`.**
  - `@import './fop-tokens.css';` at the top.
  - Delete the old palette, font and container definitions.
  - Set `--serif: var(--font-serif)` and `--sans: var(--font-sans)`. Map `--mono` and `--font-mono` to `var(--font-sans)`, and delete `--font-handwriting` usage.
  - Base rules from the design-system README:
    - `body`: `background: var(--surface)`, `color: var(--ink)`, sans 18px/25px weight 350.
    - `h1`–`h3`: serif, weight 300, `--ink-brand`, sentence case.
    - `a`: `color: var(--ink)` with a `--link` underline at 2px offset.
    - `:focus-visible`: `2px solid var(--focus)` with a 2px offset.
    - `*`: `border-radius: 0` unless overridden.
    - A `@media (prefers-reduced-motion: reduce)` block that kills transitions and transforms.
  - Add the **bridge** block, marked `/* BRIDGE — removed in Task 9 */`:

```css
--alpine-deep: var(--brand-green-deep); --alpine: var(--brand-green-deep); --night: var(--brand-green-deep);
--alpine-soft: var(--brand-green);
--ochre: var(--primary); --ochre-deep: var(--primary-dark); --ochre-pale: var(--primary);
--clay: var(--brand-green); --clay-deep: var(--brand-green);
--parchment: var(--white); --paper: var(--off-white); --paper-warm: var(--white); --paper-cool: var(--white);
--ink-mute: var(--charcoal); --ink-faint: var(--gray-500); --line-soft: var(--line);
--container: var(--container-max); --container-narrow: 920px; --container-wide: var(--container-max);
--ease-out: cubic-bezier(.4,0,.2,1); --ease-in-out: cubic-bezier(.4,0,.2,1);
```

  `--ink`, `--ink-soft` and `--line` now come from the token layer, with the same names. Replace the 42 raw hex values in `globals.css` with the nearest token.
- [ ] **Step 6: Verify.** Run `npx vitest run lib/fop-tokens.test.ts` (PASS), then `npm test && npm run lint && npm run build`. Start `npx next start -p 3100` in the background and run `npm run smoke` (all ok). Take 1440px and 375px screenshots of `/` and `/apply/form` under `.superpowers/restyle/shots/t1-*`; the pages should be re-coloured and readable, not yet re-laid-out.
- [ ] **Step 7: Commit** `feat: add Friends of Pakistan token layer, fonts and colour bridge`.

---

### Task 2: Primitives

**Files:**
- Create: `app/components/fop/{Arrow,Button,ArrowLink,Section,SquareCta,Stat,Badge,SolverCard,Timeline,Prose}.tsx`, `app/components/fop/fop.module.css`, `app/components/fop/index.ts`, `lib/fop-components.test.tsx`

**Interfaces** (server components; class names prefixed `fop-` in BEM form inside the module; visual values from each component's README and `bundle.css`):
- `Arrow({ length?: 32|45|55 = 45, direction?: 'right'|'left' })`: inline SVG, 16px tall, `currentColor`, `aria-hidden="true"`.
- `Button({ variant?: 'primary'|'white'|'hollow'|'danger'|'cancel' = 'primary', size?: 'sm'|'md'|'lg'|'xl'|'2xl' = 'md', block?: boolean, icon?: boolean, href?: string, ...button/anchor props })`: renders next/link `<Link>` when `href` starts with `/`, `<a>` for other `href` values, otherwise `<button type="button">`.
- `ArrowLink({ href, size?: 'md'|'lg' = 'md', children })`: next/link plus `<Arrow length={size==='lg'?55:32}/>`.
- `Section({ tone?: 'offwhite'|'white'|'yellow'|'green' = 'offwhite', title?, intro?, tight?: boolean, id?, children })`: renders `<section>` and sets `data-theme="dark"` only when `tone==='green'`.
- `SquareCta({ href, size?: 'md'|'lg' = 'lg', children })`, `Stat({ value, label })`, `Badge({ tone?: 'primary'|'outline' = 'primary', children })`.
- `SolverCard({ name, description?, image?, href?, fallback?: string })`: renders `fallback` (initials) on a deep-green square when there is no image.
- `Timeline({ stages: string[], current?: number = -1, label? })`.
- `Prose({ size?: 'md'|'sm' = 'md', children })`.
- `index.ts` re-exports all of them.

- [ ] **Step 1: Failing test `lib/fop-components.test.tsx`** (`renderToStaticMarkup`):
  - `Button` with `href="/apply"` renders `<a href="/apply"`; without `href` it renders `<button type="button"`.
  - `Section tone="green"` contains `data-theme="dark"`; `tone="yellow"` does not.
  - `Arrow` contains `aria-hidden="true"` and `stroke="currentColor"`.
  - `ArrowLink size="lg"` contains an SVG of width 55.
  - `SolverCard` without an image and with `fallback="HB"` contains `HB` and no `<img`.
  - `Timeline stages={['a','b','c']} current={1}` has exactly 2 reached markers (the class containing `--reached`) and an accessible label listing all stages.
  - **Reduced motion:** the text of `fop.module.css` contains `prefers-reduced-motion: reduce` and the arrow-nudge transform is set to `none` inside it.
- [ ] **Step 2: Run, confirm FAIL.** `npx vitest run lib/fop-components.test.tsx`
- [ ] **Step 3: Implement the primitives.** Read each component's README and the matching rules in `bundle.css` (prefix `ss-`) for sizes, spacing, states and responsive steps. Translate those into `fop.module.css` with tokens.
- [ ] **Step 4: Verify.** Run the tests (PASS), then `npm test && npm run lint && npm run build`.
- [ ] **Step 5: Commit** `feat: add Friends of Pakistan primitives`.

---

### Task 3: Header, footer, staging banner

**Files:** Modify `app/components/{Header,NavDropdown,Footer,StagingBanner}.tsx` and the header, footer, nav and banner rules in `app/globals.css`.
**Interfaces:** Consumes `Button` and `ArrowLink` (Task 2). Keeps `lib/navigation.ts` unchanged.

- [ ] **Step 1: Header.**
  - 64px (`--nav-height`) bar with a `--brand-green-deep` background and `data-theme="dark"`, in normal flow.
  - Existing logo SVG and wordmark in white.
  - Nav items in `.t-nav` style, white.
  - The dropdown panels are white with `--shadow-3xl`, `.t-menu-link` uppercase black links and hover `--opacity-hover-menu`.
  - The Apply CTA is `<Button href="/apply" size="md">Apply</Button>`; keep the current label text.
  - Under 1024px a yellow "Menu" button (existing toggle, restyled) opens the existing mobile menu, which becomes a deep-green panel.
  - All existing NavDropdown behaviour (hover detection, Escape, focus return, `aria-expanded`) stays.
- [ ] **Step 2: Footer.** SiteFooter pattern per its README:
  - Deep green, yellow `.t-heading-5` column heads, white links.
  - A callout box with a 1px `--primary` border, title "Applications", the existing short line, and an `ArrowLink size="lg"` to `/apply` with label "Apply".
  - A bottom rule, then the existing © and partners text.
- [ ] **Step 3: Staging banner.** `--charcoal` background, white `.t-eyebrow` text.
- [ ] **Step 4: Verify** with Playwright MCP at 1440, 1024, 768 and 375 (Review Focus 4):
  - The nav does not wrap or overflow at 1024 and 768; it collapses to Menu at ≤1024.
  - Dropdowns open by hover, by click and by keyboard, and close with Escape.
  - The mobile menu opens, and a link tap closes it.
  - `scrollWidth <= innerWidth` at 375.
  - Then run test, lint, build and smoke.
- [ ] **Step 5: Commit** `feat: restyle header, footer and staging banner`.

---

### Task 4: Homepage

**Files:** Modify `app/page.tsx`, `app/home.module.css`, `app/components/DeadlineBand.tsx`, `app/components/ExponentialChart.tsx`, plus the homepage-only global classes (`.hero*`, `.whatis*`, `.event-date*`).
**Interfaces:** Consumes the Task 2 primitives. Copy and data calls are unchanged.

- [ ] **Step 1: Rebuild the bands in this order (spec §6):**
  1. **Green hero:** the name in `.t-heading-xl`, white; lead line; yellow `Button size="xl"` CTA; meta strip as white `.t-stat-caption` captions.
  2. **DeadlineBand,** when live: a green band using `Stat` (`value` = deadline, `label` "Applications close").
  3. **Off-white "Why this fellowship"** with `SquareCta href="/apply"` (its label is the existing CTA label) beside the copy. The chart sits in the same band.
  4. **White "What you get"** tiles with `.t-heading-3` titles.
  5. **Green "How it works":** `Timeline` of the five step titles (`current={-1}`) above the five step descriptions.
  6. **Yellow "Meet the 2026 fellows":** a grid of `SolverCard`s (name = fellow name, description = org, `fallback` = initials, `href` = profile).
  7. **White faculty row:** square photo tiles with name and role in black.
  8. **Green closing band** (green, because it follows the white faculty band and must not repeat yellow): `ArrowLink size="lg"` to Apply and FAQ.
- [ ] **Step 2: `ExponentialChart`.** Curve and fills in `--primary`/`--brand-green`; axis labels and annotations in `--ink` or `--ink-brand`; never yellow text on a light ground.
- [ ] **Step 3: Verify.**
  - Smoke still green (homepage `contains` strings unchanged).
  - Screenshots at 1440 and 375.
  - No horizontal scroll at 375.
  - Test, lint and build.
- [ ] **Step 4: Commit** `feat: rebuild homepage in Friends of Pakistan bands`.

---

### Task 5: Content pages (Apply, FAQ, Curriculum, Faculty, Contact page shell, Cohorts index, 404)

**Files:**
- Modify: `app/apply/page.tsx` + `apply.module.css`, `app/faq/page.tsx` + `faq.module.css`, `app/curriculum/page.tsx`, `app/faculty/page.tsx`, `app/contact/page.tsx` (shell only; form controls are Task 7), `app/cohorts/page.tsx` + `cohorts.module.css`, `app/not-found.tsx`.
- Rewrite: the shared `.page-hero*`, `.btn*`, `.section*`, `.eyebrow*` and `.module*` global classes, or replace their uses with the primitives.

- [ ] **Step 1: Shared page hero.** A green `Section` with the breadcrumb in `.t-eyebrow` white, the title in `.t-heading-1` white and the subtitle in `.t-body-light`. Remove inline `style={{ color: 'var(--ochre)' }}` emphasis; render `<em>` in `--primary` (allowed on green).
- [ ] **Step 2: Apply.**
  - Off-white body with criteria and stages in `Prose`.
  - The key-dates aside is a white panel.
  - "Before you start" uses `.t-heading-4`.
  - The PDF link is an `ArrowLink`; Start is a `Button size="lg"`.
- [ ] **Step 3: FAQ.**
  - Group headings in `.t-heading-4`.
  - `<details>` markers become a rotating caret (green inline SVG) instead of +/−.
  - Questions in `.t-heading-5`, sentence case (no uppercase).
- [ ] **Step 4: Curriculum, Faculty, Cohorts index, 404.**
  - Bands alternate off-white and white after the green hero.
  - Faculty and organiser people become square photo tiles: photo, name in `.t-heading-5`, role in `.t-body-sm`.
  - Cohort cards are white panels with an `ArrowLink`.
  - The 404 is a green band with the existing links as `Button` and `ArrowLink`.
- [ ] **Step 5: Verify.** Screenshots at 1440 and 375 for each page; no horizontal scroll; test, lint, build and smoke.
- [ ] **Step 6: Commit** `feat: restyle content pages`.

---

### Task 6: Cohort hub and fellow profiles

**Files:** Modify `app/cohorts/_components/{CohortBar.module.css,CohortTabs.tsx}`, `app/components/FellowsBits.tsx` (+ its global classes), `app/cohorts/2026/page.tsx`, `app/cohorts/_components/fellow/*` (+ `fellow-detail.module.css`).

- [ ] **Step 1: Cohort bar.**
  - Off-white bar, uppercase `.t-nav` tab links in black.
  - The active tab has a 4px `--black` bottom border plus `aria-current="page"`.
  - Keep `:focus-visible` and the 44px tap targets.
- [ ] **Step 2: Fellows grid.**
  - `SolverCard`-style square tiles with photo, name, org and sector.
  - Fellows without photos get a deep-green tile with white initials.
  - Sector filter chips are square: off-white with a 1px `--line-strong` border; selected chips are `--primary` with black text and `aria-pressed`.
- [ ] **Step 3: Fellow profile.**
  - **Hero:** green, with the name in `.t-heading-1` white and the problem statement in `.t-body-light` white.
  - **Photo:** square, no radius. The initials avatar becomes a square green tile.
  - **IdeaBand:** a yellow band with black text; any green headline on it is at least 24px.
  - **Body:** `Prose` on off-white.
  - **Sidebar:** a white panel.
  - **Back link:** keeps its in-hero position, restyled as a square white `Button size="sm"`, at least 44px.
- [ ] **Step 4: Verify** `/cohorts/2026`, `/cohorts/2026/fellows/habiba-banu` and one fellow without a photo at 1440 and 375: no horizontal scroll, and the filter works with mouse and keyboard. Run test, lint, build and smoke.
- [ ] **Step 5: Commit** `feat: restyle cohort hub and fellow profiles`.

---

### Task 7: Application form and contact form controls

**Files:** Modify `app/apply/form/form.module.css` (and only class names in `fields/*.tsx` or `ApplicationForm.tsx` if a hook is missing), `app/components/ContactForm.tsx` styles (in `globals.css` or a new `ContactForm.module.css`).

- [ ] **Step 1: Controls per the Input, Textarea, Select, Checkbox and Radio READMEs.**
  - Text controls: 1px `--field-border`, square, transparent fill, 18px text, 44px min height.
  - Select: inline-SVG triangle caret (green; yellow inside dark themes).
  - Checkbox: 20px square with a 2px border, using `appearance: none`; checked = `--primary` fill with a black check drawn by a pseudo-element.
  - Radio: same, but round, with a black dot when checked.
  - Focus: 1px field ring plus the `--focus` outline.
  - Invalid: `--danger-400` border, with the message in `--danger-600` on white.
- [ ] **Step 2: Form chrome.**
  - Progress text in `.t-eyebrow`; progress bar in `--primary` on a `--line` rail.
  - The error summary is a white panel with a `--danger-400` border.
  - Section titles in `.t-heading-2` green.
  - Review `dl` in `Prose` style.
  - Buttons become the system button styles.
  - The sentence-blank underline is `--field-border`.
  - The countdown text is `--ink-soft`.
- [ ] **Step 3: Verify (Review Focus 2),** with Playwright MCP at 375 and 1440, keyboard only:
  - Tab through the screener and toggle radios with arrow keys.
  - Section A: check boxes with Space and choose a select option.
  - Trigger the error summary and follow its links.
  - Reach Review.
  - Measure that every control is at least 44px tall at 375 and that there is no horizontal scroll.
  - Do **not** submit. `.env.local` points at the staging database.
  - Then run test, lint, build and smoke.
- [ ] **Step 4: Commit** `feat: restyle application and contact form controls`.

---

### Task 8: 2026 archive pages (mechanical remap)

**Files:** Modify `app/cohorts/2026/venue/page.module.css` (143 old-variable uses, 9 hex), `app/cohorts/2026/explore/page.module.css` (124 uses), `app/cohorts/2026/week/page.tsx` and `app/components/ItineraryBits.tsx` (+ their global classes), and the inline styles in `app/cohorts/2026/{venue,explore,week}/page.tsx`.

- [ ] **Step 1: Remap each section.** Keep its layout and order. Dark sections → `--brand-green-deep` with `data-theme="dark"` on the section element. Light sections → `--off-white` or `--white`. Accents → `--primary` fills or `--brand-green` text, following the contrast rules. Use only the new token names (no bridge names). Corners become 0. Buttons and links use the system styles. Photo overlays use `--scrim-*`.
- [ ] **Step 2: Verify.**
  - The three pages at 1440 and 375 have no horizontal scroll and readable text over photos.
  - `grep -nE "var\(--(alpine|ochre|clay|parchment|paper|night|ink-mute|ink-faint|line-soft)" app/cohorts/2026` returns nothing.
  - No hex remains in these files.
  - Test, lint, build and smoke pass.
- [ ] **Step 3: Commit** `feat: remap 2026 archive pages to Friends of Pakistan tokens`.

---

### Task 9: Remove the bridge, audits, docs

**Files:** Create `lib/no-legacy-styles.test.ts`. Modify `app/globals.css` (delete the bridge and any now-unused global classes), any file still using old names, and `CLAUDE.md` ("Global Design System" section, Typography, Components, Last Updated).

- [ ] **Step 1: Failing test `lib/no-legacy-styles.test.ts`.** It globs `app/**/*.{css,tsx,ts}`, excluding `app/fop-tokens.css`.
  - `no legacy palette variables`: no match for `/var\(--(alpine|alpine-deep|alpine-soft|ochre|ochre-deep|ochre-pale|clay|clay-deep|parchment|paper|paper-warm|paper-cool|night|ink-mute|ink-faint|line-soft|mono|font-mono|font-handwriting)\)/` and no `BRIDGE` marker.
  - `no hex colours outside the token file`: no match for `/#[0-9a-fA-F]{3,8}\b/` in `.module.css`, `globals.css` or `.tsx` files. SVG `fill`/`stroke` values must use `currentColor` or tokens.
- [ ] **Step 2: Run it.** It fails, listing the remaining uses. Fix every listed use with the correct token, then delete the bridge block. Run it until PASS.
- [ ] **Step 3: Audits on a fresh `next start`** (Playwright MCP, at 375 and 1440), over every route in `scripts/smoke-routes.mjs` that returns 200:
  - **Width (Review Focus 3):** `document.documentElement.scrollWidth <= innerWidth`.
  - **Contrast (Review Focus 1):** `browser_evaluate` a script that, for every visible element with direct text, computes WCAG contrast between its computed `color` and the first opaque ancestor `background-color` (`rgba` alpha < 1 blends upward). Report failures below 4.5 (or below 3 when font-size ≥ 24px, or ≥ 18.66px at weight ≥ 600). Fix every failure, or record why it is a false positive (for example text over a photo with a scrim).
  - Save the report and screenshots under `.superpowers/restyle/`.
- [ ] **Step 4: Docs.** Rewrite CLAUDE.md's "Global Design System" section to describe the Friends of Pakistan tokens: source path, `npm run tokens:fop`, the colour roles, the dark-theme flip, fonts, type classes, the band rules, the primitives in `app/components/fop/`, and the contrast rules. Remove the old palette description.
- [ ] **Step 5: Verify and commit.** Run `npm test && npm run lint && npm run build` and smoke. Commit `refactor: remove legacy palette bridge; docs for Friends of Pakistan system`.
