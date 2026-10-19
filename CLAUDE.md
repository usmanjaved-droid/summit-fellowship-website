# Claude.md — Friends of Pakistan Fellowship Website

## Project Overview

**Friends of Pakistan Fellowship** (formerly Summit Fellowship; rebranded 2026-10-19) is a week-long intensive retreat for Pakistan's most promising social enterprises. The website showcases the program, cohorts, fellows, faculty, curriculum, and everything participants need. It is a programme of Friends of Pakistan (the society and fund founded by Nadir Shams, https://www.friendsofpakistan.org/), run in partnership with Mulago Foundation and Taleemabad. The 2026 cohort is the inaugural cohort. Use the full name "Friends of Pakistan Fellowship" in titles, the wordmark and formal copy, "the Fellowship" in running text, and "Friends of Pakistan Fellows" for alumni; do not reintroduce "Summit". Internal names (repo folder, Vercel projects, Supabase projects, URLs) still say summit and are not visitor-facing.

**Status:** The site is being converted from a 2026-only event site into a permanent, multi-year site. Phase 1 (permanent multi-year site), Phase 2 (application form) and the Friends of Pakistan restyle (2026-10-19) are built on the `staging` branch and reach production only when the owner approves go-live (see "Go-live runbook" below). Production serves whatever is on `master`.  
**Audience:** Fellows, faculty, funders, potential applicants  
**Latest cohort:** 2026 — June 7–14, 2026 at Khoj Resort, Skardu  
**Organization:** Friends of Pakistan (host), with Mulago Foundation + Taleemabad (partners)

---

## Technology Stack

- **Framework:** Next.js 16.2.6 (App Router, React 19.2.4)
- **Language:** TypeScript 5+ (strict mode)
- **Styling:** Tailwind CSS 4 with custom CSS variables
- **Icons:** Lucide React 1.16.0 (`import { ChevronRight } from 'lucide-react'`)
- **Fonts:** Google Fonts via `next/font` (Crimson Pro, Source Sans 3 (variable)), per the Friends of Pakistan design system
- **Images:** Next.js Image component with remote pattern validation
- **Data:** JSON files in `data/` directory (no database)
- **Linting:** ESLint 9 with Next.js Core Web Vitals + TypeScript configs
- **Hosting:** Vercel (production deploys from `master`, preview deploys from `staging`)
- **Version Control:** Git with conventional commits

---

## Project Structure

```
Summit Fellowship Website/
├── app/
│   ├── layout.tsx                 # Root layout (StagingBanner, Header, Footer, fonts)
│   ├── page.tsx                   # Homepage
│   ├── not-found.tsx              # Helpful 404
│   ├── robots.ts                  # Disallow: / on non-production
│   ├── globals.css                # Global styles (imports fop-tokens.css)
│   ├── fop-tokens.css             # Generated design tokens (npm run tokens:fop)
│   ├── apply/  faq/  curriculum/  contact/
│   ├── faculty/
│   │   ├── page.tsx
│   │   └── people.tsx             # Faculty data
│   │
│   ├── cohorts/
│   │   ├── page.tsx               # Cohorts index
│   │   ├── _components/           # CohortBar, CohortTabs
│   │   │   └── fellow/            # Fellow detail components + fellow-detail.module.css
│   │   └── 2026/
│   │       ├── page.tsx           # Fellows tab (grid + sector filter)
│   │       ├── fellows/page.tsx   # Same Fellows tab at /cohorts/2026/fellows (re-export)
│   │       ├── week/  venue/  explore/
│   │       └── fellows/[slug]/page.tsx   # Fellow detail page
│   │
│   └── components/                # Shared components
│       ├── Header.tsx  NavDropdown.tsx   # Client: menus
│       ├── Footer.tsx  StagingBanner.tsx
│       ├── PageHero.tsx           # Shared green page hero
│       ├── fop/                   # Friends of Pakistan primitives (Section, Button, ArrowLink, SolverCard, ...)
│       ├── FellowsBits.tsx        # Fellows grid with filtering
│       ├── ContactForm.tsx
│       └── (other components)
│
├── lib/
│   ├── cohorts.ts                 # Cohort registry helpers
│   ├── fellows.ts                 # getAllFellows(year), getFellow(year, slug), getFellowCards(year)
│   ├── site.ts                    # Site settings, FORM_ENABLED (true since Phase 2)
│   ├── env.ts                     # Production vs staging detection
│   ├── navigation.ts              # Nav structure
│   └── *.test.ts                  # Vitest tests
│
├── data/
│   ├── site.json                  # Site-wide settings (edit yearly)
│   ├── faq.json                   # FAQ answers ([TO CONFIRM] blocks go-live)
│   ├── faculty.json
│   └── cohorts/
│       ├── index.json             # Cohort registry
│       └── 2026/fellows.json      # All 10 fellows (authoritative source)
│
├── scripts/                       # smoke.mjs, check-golive.mjs, build-fop-tokens.mjs
├── next.config.ts                 # Image domain + noindex header configuration
├── package.json
├── tsconfig.json
└── CLAUDE.md                      # This file
```

---

## Global Design System — Friends of Pakistan

The site uses the **Friends of Pakistan design system** (restyle of 2026-10-19, on `staging`). Spec: `docs/superpowers/specs/2026-10-19-friends-of-pakistan-restyle-design.md`. The system's reference files (README, `tokens.json`, `components/bundle.css`, one README per component) are copied, reference only, into `docs/design-system/friends-of-pakistan/project/`.

### Tokens

- **Source:** `docs/design-system/friends-of-pakistan/project/tokens.json`.
- **Generated layer:** `app/fop-tokens.css`, built by `npm run tokens:fop` (`scripts/build-fop-tokens.mjs`). Never edit it by hand; `lib/fop-tokens.test.ts` fails if it drifts from `tokens.json`.
- `app/globals.css` imports it and adds only the `--serif`/`--sans` font stacks, `--container-narrow` (920px) and `--ease` (`cubic-bezier(.4,0,.2,1)`).
- **No hex colours** anywhere except `app/fop-tokens.css` (one exception: hex inside SVG `data:` URIs for the select carets, which CSS variables cannot reach). `lib/no-legacy-styles.test.ts` enforces this, bans the old Alpine/Ochre/Clay/Paper variables, and fails on any `var(--x)` that is not defined.

### Colour roles

- **Brand:** `--primary` yellow `#ffc700` (hover `--primary-dark`), `--brand-green` `#006600` (headlines, links, field borders on light grounds), `--brand-green-deep` `#003800` (ground of the green bands), `--off-white` (default page ground), `--white`, `--charcoal` (secondary text), `--black` (body text). Greys (`--gray-*`) are for functional states only; danger reds are `--danger*`.
- **Semantic (use these in components):** `--surface`, `--ink`, `--ink-brand`, `--ink-soft`, `--line` (decorative hairline), `--line-strong`, `--field-border`, `--link`, `--accent`, `--on-accent`, `--focus`, and the scrims `--scrim-image`, `--scrim-header`, `--scrim-band`, `--scrim-card`.
- **Dark-theme flip:** any element with `data-theme="dark"` (green bands, header, footer, `Section tone="green"`) flips the semantic tokens: `--surface` becomes deep green, `--ink`/`--ink-brand` white, `--ink-soft` light grey, `--field-border`/`--link` yellow, `--focus` white. Yellow bands keep the light tokens on a `--primary` fill.

### Contrast rules (from the system)

- Yellow is text only on deep green or black, never on off-white or white.
- Text on yellow is black. Green headlines on yellow must be 24px or larger.
- `--line` hairlines are decorative only. Danger text sits on white.
- Text over photos sits on `--scrim-image` (or `--scrim-band`).

### Typography

- **Fonts** (`next/font/google` in `app/layout.tsx`): **Crimson Pro** (300, 400) as `--font-serif` for display; **Source Sans 3** (variable, so weight 350 renders) as `--font-sans` for everything else.
- **Type classes** (generated in `fop-tokens.css`): `.t-heading-xl`, `.t-heading-1`, `.t-heading-2`, `.t-stat` (Crimson Pro 300, sentence case, `--ink-brand`); `.t-heading-3/4/5` (Source Sans 600; `.t-heading-4` is uppercase); `.t-body` (18/25, weight 350), `.t-body-light`, `.t-body-sm`, `.t-card-body`, `.t-legal`, `.t-status`; interface labels `.t-eyebrow`, `.t-badge`, `.t-button`, `.t-nav`, `.t-menu-link`, `.t-link-arrow(-lg)`, `.t-cta-square`, `.t-stat-caption`.
- **Base elements:** `h1`–`h3` are Crimson Pro 300 in `--ink-brand`; `h4`/`h5` are Source Sans 600 in `--ink`; body is Source Sans 18/25 at 350.
- **Uppercase** only on interface labels (buttons, nav, badges, arrow links, tabs, filter chips, `heading-4` titles, stat captions, eyebrows), never on body text, names, FAQ questions or form labels. Copy stays sentence case in code; CSS applies the transform.

### Shape, motion, rhythm

- Square corners everywhere (`--radius-none`) except radios and timeline dots. One shadow, `--shadow-3xl`. Borders: 1px controls, 2px checkboxes and radios, 4px yellow caption rule.
- Colour transitions are 150ms `var(--ease)`; `prefers-reduced-motion` is respected.
- **Bands:** full-width alternating bands in a 1440px container (`--container-max`) with 32px side padding (`--container-pad`). Off-white, white and yellow bands pad 64px (32px under 1024px); green bands pad 144px (96px under 1024px). Two yellow bands are never adjacent.
- **Spacing:** `--space-1` (4px) to `--space-36` (144px). Only the steps in `tokens.json` exist (there is no `--space-7`, `--space-11` or `--space-12`).

### Primitives (`app/components/fop/`, CSS in `fop.module.css`, prefix `fop-`)

`Section` (band; `tone` offwhite | white | yellow | green, where green sets `data-theme="dark"`), `Button`, `ArrowLink`, `Arrow`, `SquareCta`, `Stat`, `Badge`, `SolverCard` (square photo tile with scrim), `Timeline`, `Prose`. Import from `@/app/components/fop`. `app/components/PageHero.tsx` is the shared green page hero. The header and footer use the global `.site-header` / `.site-footer` rules in `globals.css`. Form controls are styled in `app/apply/form/form.module.css` and by the `.form-group` rules in `globals.css`.

### Container widths

- `.container` uses `--container-max` (1440px) with `--container-pad`; `.container--narrow` is 920px.

### Responsive Breakpoints

**CSS breakpoints** (where layout changes):
```css
@media (max-width: 640px)    { /* Mobile */ }
@media (max-width: 1024px)   { /* Tablet */ }
@media (min-width: 1024px)   { /* Desktop */ }
```

**Testing viewports** — Test at representative widths: 375px (mobile minimum), 768px (tablet), 1440px (wide desktop). These cover the full range even though CSS breakpoints are at 640px and 1024px.

---

## Pages Overview

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Homepage for the permanent site |
| `/apply` | `app/apply/page.tsx` | Eligibility, selection and key dates |
| `/faq` | `app/faq/page.tsx` | FAQ (answers in `data/faq.json`) |
| `/curriculum` | `app/curriculum/page.tsx` | Mulago design discipline |
| `/faculty` | `app/faculty/page.tsx` | Faculty + Organizers |
| `/contact` | `app/contact/page.tsx` | Contact page; the form opens the visitor's email app with a pre-filled message (mailto, no backend) |
| `/apply/form` | `app/apply/form/page.tsx` | The application form (screener, sections A–H, review, submit) |
| `/api/apply` (POST) | `app/api/apply/route.ts` | Receives a submitted application and stores it in Supabase |
| `/cohorts` | `app/cohorts/page.tsx` | List of cohorts |
| `/cohorts/2026` | `app/cohorts/2026/page.tsx` | 2026 cohort, Fellows tab (grid with sector filter) |
| `/cohorts/2026/week` | `app/cohorts/2026/week/page.tsx` | Week-by-week schedule |
| `/cohorts/2026/venue` | `app/cohorts/2026/venue/page.tsx` | Khoj Resort details |
| `/cohorts/2026/explore` | `app/cohorts/2026/explore/page.tsx` | Field guide to Baltistan |
| `/cohorts/2026/fellows/[slug]` | `app/cohorts/2026/fellows/[slug]/page.tsx` | Full-page editorial detail for each fellow |

**Removed routes** (they now 404, no redirects): `/fellows`, `/fellows/[slug]`, `/itinerary`, `/venue`, `/explore-skardu`, `/travel`, `/resources`. `app/not-found.tsx` is a helpful 404 that points visitors to the right place.

---

## Application form (Phase 2)

- **Form:** `/apply/form` is a client form (loaded with `ssr:false`): screener, sections A–H, review, submit. Draft autosave lives in the visitor's browser (localStorage key `fop-fellowship-application-<year>`, `lib/application/draft.ts`).
- **Schema:** `lib/application/questions.ts` is the single source for the form, the validator (`lib/application/validate.ts`), the server (`lib/application/handle.ts`) and the offline PDF (`scripts/build-application-pdf.ts`). After editing questions run `npm run pdf:application`; the test `lib/application/schemaHash.test.ts` fails until you do.
- **Server normalisation:** `normalizeAnswers` (`lib/application/answers.ts`) coerces submitted answers to the schema shape before validation and storage (junk keys dropped, untracked numbers and stale "Please specify" text cleared, blank table rows removed). The browser gives up on a submit after 40 seconds and shows the retry message.
- **Submit flow:** `POST /api/apply` (`app/api/apply/route.ts`) calls `handleSubmission`: honeypot field `nickname`, 403 when applications are not live, rate limit of 15 per 10 minutes per IP (per server instance), screener and full validation re-checked, then the Supabase RPC `public.submit_application`.
- **Supabase** (org free plan, region ap-south-1): staging `summit-fellowship-staging` (ref `wagaimviefobclwhaboa`), production `summit-fellowship-production` (ref `sfkmvxewojvstmincdzw`). Migration: `supabase/migrations/20261012000000_applications.sql`, applied to both. Table `public.applications` has RLS on with no policies and no anon/authenticated grants; only the SECURITY DEFINER function (EXECUTE for anon only) can insert. Read applications in the Supabase dashboard → Table editor → `applications` (filter `is_latest = true`; Export CSV). The old paused project "Summit Fellowship App reviewer" is unrelated (last year's reviewer page). The staging database holds test rows (e.g. smoke@example.com); that is expected.
- **Env vars (server-only, never `NEXT_PUBLIC_`):** `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. In Vercel, Preview and Development use staging values; Production uses production values. Local `.env.local` (git-ignored) holds staging values.
- **Open/closed:** non-production deployments always treat applications as open (`getCurrentCohort` in `lib/site.ts`); production follows `data/site.json`.
- **Each year:** in `data/site.json` set `currentCohort.year`, dates, deadline and `applicationsOpen`, then run `npm run pdf:application` (the year is printed in the PDF).
- **Free-plan caveat:** Supabase pauses free projects after about 7 days without activity. Check the production project is active before opening applications and during the window (dashboard → Restore if paused).

### Go-live runbook

1. Confirm the production Supabase project (`summit-fellowship-production`) is active, not paused.
2. In `data/site.json` set the cohort dates, the deadline and `applicationsOpen: true` (then `npm run pdf:application` if the year changed).
3. Merge `staging` → `master` so Vercel makes a fresh production build.
4. Make one test submission on the production site, then delete that row in the Supabase dashboard (Table editor → `applications`).
5. On deadline day set `applicationsOpen: false` in `data/site.json` and deploy — this is what closes the API (`/api/apply` returns 403).

---

## Fellow Detail Pages (Critical Feature)

**Recent Redesign:** 2026-05-17 — Full-page editorial layout (not modal)

### Page Structure (`/cohorts/2026/fellows/[slug]`)

Page: `app/cohorts/2026/fellows/[slug]/page.tsx`. Components and CSS: `app/cohorts/_components/fellow/*` (`fellow-detail.module.css`).

1. **FellowHero** — Deep-green band, name, problem statement, photo/avatar
2. **IdeaBand** — Yellow band with the tagline
3. **Two-column body** (desktop) / single column (mobile):
   - Left: Three narrative sections (Mission, How It Works, Dream)
   - Right: Sticky sidebar with org metadata
4. **FellowNavigation** — back control: a square white button with a left arrow at the top right of the hero content, linking to the cohort fellows grid (aria-label "Back to all <year> fellows")

### Data Schema (`data/cohorts/2026/fellows.json`)

```typescript
{
  id: string;              // URL slug
  name: string;
  org: string;
  sector: string;
  tagline: string;         // Short idea (idea band)
  card_summary: string;    // Short blurb shown on the fellows grid card
  idea_context: string;    // Problem statement (hero)
  mission: string;         // Narrative section
  how_it_works: string;    // Narrative section
  the_dream: string;       // Narrative section
  structure: string;       // Nonprofit / For-profit / Hybrid
  geography: string;       // Regions (e.g., "Punjab, Sindh")
  org_url: string;
  fellow_linkedin: string;
  photo_url: string | null;  // External HTTPS URL, local path, or null
  photo_source: string | null;
  sources: string[];
  email: string;           // Stored by owner decision; never rendered
  phone: string;           // Stored by owner decision; never rendered
}
```

**Critical:** This is the SINGLE source of truth for fellow data. All 10 fellows have complete records. `email` and `phone` are kept in the data on purpose but must never appear on any page.

### Static Generation

`generateStaticParams()` pre-renders all 10 fellow pages at build time (zero runtime overhead).

### Photo URLs

Photos can be:
- **Local paths:** `/images/fellows/name.jpg` (served from `/public`)
- **External HTTPS URLs:** Must be whitelisted in `next.config.ts` remotePatterns:
  ```typescript
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "falling-walls.com" },
    ],
  }
  ```

### Photo Fallback

If `photo_url` is null, the hero and the fellows-grid tile show a deep-green square with white initials.

---

## Styling Approach

### CSS Modules + CSS Variables

1. **Tokens + globals** — `app/fop-tokens.css` (generated colours, spacing, type classes) and `app/globals.css` (resets, header, footer, shared classes)
2. **Components** — `*.module.css` files (BEM naming)

### BEM Convention

```css
.fellow-detail { }           /* Block */
.fellow-detail__body { }     /* Element */
.fellow-detail__body--wide { } /* Modifier */
```

### Tailwind Integration

Tailwind 4 is available but **not the primary layout tool**. Prefer CSS Modules for centralized styling. Use Tailwind utilities for edge cases.

### Color Usage

Always use CSS variables:

```css
color: var(--ink);
background: var(--brand-green-deep);
border: 1px solid var(--line);
```

Never hardcode hex values.

---

## Components Pattern

### Server Components (Default)

- FellowHero, IdeaBand, FellowSection, FellowSidebar, FellowNavigation
- Footer, PageHero, StagingBanner, the `fop/` primitives, etc.

**Benefits:** No JavaScript, fast, can access databases/env vars

### Client Components ("use client")

- Header, NavDropdown (menu state)
- FellowsBits (sector filter with useState)
- ContactForm (opens the visitor's email app via mailto:)

**Use only for:** State, event listeners, hooks, real-time updates

---

## Data Files

**Single source of truth for fellows:** `data/cohorts/2026/fellows.json` (one file per cohort year)

Other data files:
- `site.json` — Site-wide settings
- `cohorts/index.json` — Cohort registry
- `faq.json` — FAQ answers
- `faculty.json` — Faculty + Organizers (people rendered via `app/faculty/people.tsx`)

---

## Development Patterns

### Metadata

```typescript
export const metadata = {
  title: 'Page Title — Friends of Pakistan Fellowship',
  description: 'Page description.',
};
```

Or dynamic for detail pages:

```typescript
export async function generateMetadata({ params }) {
  const fellow = getFellow(2026, slug);
  return {
    title: `${fellow.name} — Friends of Pakistan Fellowship`,
    description: fellow.tagline,
  };
}
```

### Links

Always use Next.js Link (auto-prefetch):

```typescript
<Link href="/cohorts/2026">All fellows</Link>
```

### Conditional Rendering

```typescript
{fellow.fellow_linkedin && (
  <a href={fellow.fellow_linkedin} target="_blank">LinkedIn</a>
)}
```

---

## Development & Deployment

### Commands

```bash
npm run dev              # Start dev server (http://localhost:3000, hot reload)
npm run build            # Production build + type check (runs tsc, catches errors)
npm run start            # Start production server
npm test                 # Vitest unit tests (lib/**/*.test.ts)
npm run smoke [baseUrl]  # Check every route responds (default http://localhost:3100; run against `npx next start -p 3100`)
npm run pdf:application  # Rebuild the offline application PDF (required after editing questions or the year)
npm run tokens:fop       # Regenerate app/fop-tokens.css from the design-system tokens.json
npm run check:golive     # Fails while data/faq.json still has [TO CONFIRM] answers
npm run lint             # Run ESLint on all files (checks Next.js Core Web Vitals + TypeScript)
npx eslint --fix        # Auto-fix linting errors (eslint.config.mjs config)
```

**Note:** ESLint 9 uses `eslint.config.mjs` (ESM format, not `.js`).

### Local Development

```bash
npm run dev
```

Hot reload on file changes. Dev server at http://localhost:3000. Type checking happens at build time.

### Pre-Deployment Checklist

Before pushing to `staging` (and before any merge to `master`):

1. **Run `npm test`** — All unit tests must pass.
2. **Run `npm run build`** — Builds production bundle and validates all TypeScript. If it passes, the site will deploy successfully.
3. **Run `npx eslint --fix`** — Fix any linting errors. Then commit changes or run `npm run lint` to verify no violations remain.
4. **Test responsive layout** — Resize browser to test viewports: 375px (mobile), 768px (tablet), 1440px (desktop). Verify:
   - Mobile stacking works (below 640px)
   - Sidebar stacks below the content under 1024px
   - Images load and maintain aspect ratio
   - Text scales smoothly across all widths
5. **Verify fellow photos** — If adding/updating fellows with external photo URLs, ensure domains are whitelisted in `next.config.ts` remotePatterns.
6. **Manual QA** (optionally `npm run smoke` against a local `next start`) — Test all updated pages in browser. Check all links work.

### Production Build & Deployment

```bash
npm run build
npm run start
```

See **Production vs staging** below for how branches map to deployments.

### Production vs staging

- **Production** is the `master` branch → Vercel project `summit-fellowship-website` → https://summit-fellowship-website.vercel.app. (The older `summit-fellowship.vercel.app` project is paused; do not use it as the live site.)
- **Staging** is the `staging` branch, deployed as a Vercel preview. Whenever `VERCEL_ENV !== 'production'` the site shows a STAGING banner and is hidden from search engines (`robots.txt` Disallow, `X-Robots-Tag` header, meta robots noindex).
- **Staging URL:** https://summit-fellowship-website-git-staging-usmanjaved-6797s-projects.vercel.app — protected by Vercel Authentication. Share with the team via the shareable link (append `?_vercel_share=<secret>`; the secret is listed in Vercel → Project → Settings → Deployment Protection → Shareable Links). The link is attached to the branch alias and keeps working across new staging deployments (verified 2026-10-12). Hobby plan: one shareable link per account.
- **Auto-deploys:** GitHub → Vercel auto-deploys work again as of 2026-10-12 (verified on `staging` pushes). Both the `summit-fellowship-website` and `summit-fellowship-2026` Vercel projects build every push. The 2026-10-12 cleanup commit on `master` (6354918) was not auto-deployed, but it only removed unused files, so production output is unaffected. If a push ever fails to build, deploy manually from the branch ref (Vercel MCP `create_deployment` with `gitSource`, or `vercel deploy`).
- **Pre-rebrand snapshot:** the production site as it stood before the Friends of Pakistan rebrand is tagged `summit-2026-final` (commit 6354918) with a GitHub Release "Summit Fellowship 2026 (before rebrand)". Compare or restore from that tag.
- Never use Vercel 'Promote to Production' on a staging preview — staging flags are baked in at build time; production must be a fresh build from master.
- **Go-live rule:** merge `staging` → `master` only with the owner's approval **and** `npm run check:golive` passing (it fails while any FAQ answer in `data/faq.json` is still marked [TO CONFIRM]).

### Yearly update

- Site-wide changes (dates, deadlines, settings): edit `data/site.json`.
- To add a cohort:
  1. Add an entry to `data/cohorts/index.json`.
  2. Add `data/cohorts/<year>/fellows.json`.
  3. Add one line to `FELLOWS_BY_YEAR` in `lib/fellows.ts`.
  4. Create `app/cohorts/<year>/` — copy the 2026 folder's layout and page, then adapt week, venue and explore.

---

## Git Workflow

### Conventional Commits

```
feat: add new feature
fix: bug fix
docs: documentation
refactor: code refactoring
style: styling changes
chore: maintenance
```

### Branching

```bash
git checkout -b feature/new-feature
git checkout -b fix/bug-name
```

Work on `staging`; production (`master`) changes only through an approved staging → master merge.

---

## Common Tasks

### Add a New Fellow

1. Edit `data/cohorts/<year>/fellows.json` — add record with all fields (including `card_summary`)
2. Ensure `id` matches URL slug (lowercase, no spaces)
3. Populate `geography`
4. `npm test && npm run build` → push to `staging`
5. Page auto-renders at `/cohorts/<year>/fellows/<id>`

### Add a New Page

1. Create `app/new-page/page.tsx`
2. Add metadata object
3. Add link to Header/Footer nav
4. Deploy

### Update Global Colors

Colours come from the design system: update `docs/design-system/friends-of-pakistan/project/tokens.json`, then run `npm run tokens:fop` to regenerate `app/fop-tokens.css`. All components inherit the change.

### Test Responsive Layout

Test at 375px (mobile), 768px (tablet), and 1440px (desktop). Verify:
- Mobile stacking works (below 640px)
- Sidebar stacks below the content under 1024px
- Images load and maintain aspect ratio
- Text scales smoothly and stays readable
- Touch targets (buttons, links) are adequately sized on mobile

---

## Critical Knowledge

### NOT Modal-Based

Fellow detail pages are FULL-PAGE editorial layouts. Not modal popups. This is intentional.

### No Database

All data is static JSON. No runtime queries, zero latency, perfect for static generation.

### Geography Field Required

All 10 fellows have `geography` populated. Displayed in sidebar.

### CSS Modules Over Tailwind for Layout

Page structure uses CSS Modules (BEM). Tailwind for utilities only.

### Photo Domains Whitelisted

External photo domains must be in `next.config.ts` image.remotePatterns array.

---

## Architecture Decisions

**Why server-first?** Maximize static generation. Client components only for interactivity.

**Why CSS Variables + Modules?** Semantic color names + scoped styling without utility overhead.

**Why JSON data?** Version control, no database complexity, deploys with code.

**Why Tailwind 4 but not for layout?** Utility-first adds overhead. CSS Modules more maintainable for structure.

---

## Future Improvements

- **Contact form backend:** Wire to Vercel Functions or SendGrid
- **Mobile drawer:** Implement FellowDrawer.tsx if needed
- **URL-based filtering:** Add `?sector=health` params for persistent filter state
- **Analytics:** Add Vercel Analytics or Google Analytics
- **Accessibility audit:** Lighthouse gaps fix

---

## Resources

- **Design Spec:** `docs/superpowers/specs/2026-05-17-fellow-detail-redesign.md`
- **Implementation Plan:** `docs/superpowers/plans/2026-05-17-fellow-detail-redesign.md`
- **Next.js:** https://nextjs.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **Vercel:** https://vercel.com/docs

---

## Quick Start for New Developers

1. `git clone <repo>` → `npm install` → `npm run dev`
2. Read the "Global Design System" section above, then `app/fop-tokens.css` and `app/globals.css`
3. Check `app/page.tsx` (homepage structure)
4. Review `app/cohorts/2026/fellows/[slug]/page.tsx` (dynamic page)
5. Look at `app/components/Header.tsx` (client component)
6. Study `lib/fellows.ts` (data access)

### Debugging

- **TypeScript errors:** `npm run build` includes full type checking. For quick check without build: `tsc --noEmit`
- **Linting issues:** `npm run lint` shows all ESLint violations. `npx eslint --fix` auto-fixes many.
- **Images not loading:** Verify domain is in `next.config.ts` remotePatterns. Check Next.js Image domains list.
- **CSS not applying:** Verify `.module.css` file path matches component import. Check BEM class names match.
- **Build fails:** Run `npm run build` locally to catch errors before push. Check for missing imports, type mismatches, or broken image domains.

---

**Last Updated:** 2026-10-19 (Friends of Pakistan restyle)  
**Status:** Phase 1 (permanent multi-year site), Phase 2 (application form) and the Friends of Pakistan restyle built on `staging`; production serves whatever is on `master` (staging merges only with go-live approval)
