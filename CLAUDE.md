# Claude.md — Summit Fellowship Website

## Project Overview

**Summit Fellowship** is a week-long intensive retreat for Pakistan's most promising social enterprises. The website showcases the program, cohorts, fellows, faculty, curriculum, and everything participants need.

**Status:** The site is being converted from a 2026-only event site into a permanent, multi-year site. Phase 1 was built on the `staging` branch and reaches production only when the owner approves go-live. Production serves whatever is on `master`.  
**Audience:** Fellows, faculty, funders, potential applicants  
**Latest cohort:** 2026 — June 7–14, 2026 at Khoj Resort, Skardu  
**Organization:** Mulago Foundation + Taleemabad

---

## Technology Stack

- **Framework:** Next.js 16.2.6 (App Router, React 19.2.4)
- **Language:** TypeScript 5+ (strict mode)
- **Styling:** Tailwind CSS 4 with custom CSS variables
- **Icons:** Lucide React 1.16.0 (`import { ChevronRight } from 'lucide-react'`)
- **Fonts:** Google Fonts (Instrument Serif, Geist, JetBrains Mono, Caveat)
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
│   ├── globals.css                # Global design system
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
│       ├── DeadlineBand.tsx       # Replaced EventDate.tsx
│       ├── FellowsBits.tsx        # Fellows grid with filtering
│       ├── ContactForm.tsx
│       └── (other components)
│
├── lib/
│   ├── cohorts.ts                 # Cohort registry helpers
│   ├── fellows.ts                 # getAllFellows(year), getFellow(year, slug), getFellowCards(year)
│   ├── site.ts                    # Site settings, FORM_ENABLED (false until Phase 2)
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
│       └── 2026/fellows.json      # All 11 fellows (authoritative source)
│
├── scripts/                       # smoke.mjs, check-golive.mjs
├── next.config.ts                 # Image domain + noindex header configuration
├── package.json
├── tsconfig.json
└── CLAUDE.md                      # This file
```

---

## Global Design System (app/globals.css)

### Color Palette

All colors are CSS variables (never hardcode hex values):

**Alpine (Dark Blues)**
- `--alpine-deep: #142734` — Primary dark background
- `--alpine: #1a2e3b` 
- `--alpine-soft: #2a4254`
- `--night: #0c1a22`

**Ochre (Golden Accent)**
- `--ochre: #d4a574` — Primary accent (buttons, highlights)
- `--ochre-deep: #b8895a`
- `--ochre-pale: #e8c89a`

**Clay (Rust/Terracotta)**
- `--clay: #8a4a3b` — Section labels, secondary accents
- `--clay-deep: #6b3527`

**Parchment/Paper (Light)**
- `--parchment: #e8e2d5` — Light text on dark
- `--paper: #f5efe3` — Primary light background
- `--paper-warm: #ede4d1`
- `--paper-cool: #fbf8f1`

**Ink (Text)**
- `--ink: #1a1410` — Primary text
- `--ink-soft: #3d3530`
- `--ink-mute: #6b625b`
- `--ink-faint: #a39888`

**Lines (Borders)**
- `--line: #d4cab5` — Primary border
- `--line-soft: #e6dec9` — Softer border

### Typography

**Font Families** (Google Fonts via Next.js):
- `--font-serif` (Instrument Serif) — Headlines
- `--font-sans` (Geist) — Body text
- `--font-mono` (JetBrains Mono) — Labels, code
- `--font-handwriting` (Caveat) — Decorative

**Text Hierarchy:**
- h1–h5: Serif, weight 400, line-height 1.05, letter-spacing -0.01em
- p: Sans, 17px, line-height 1.55
- .eyebrow: Mono, 11px, weight 500, letter-spacing +0.16em

### Spacing Scale

- `--space-1: 4px` through `--space-11: 160px`

### Container Widths

- `--container: 1320px` (standard)
- `--container-narrow: 920px` (narrow)
- `--container-wide: 1560px` (wide)

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
| `/contact` | `app/contact/page.tsx` | Contact page (form disabled until Phase 2) |
| `/cohorts` | `app/cohorts/page.tsx` | List of cohorts |
| `/cohorts/2026` | `app/cohorts/2026/page.tsx` | 2026 cohort, Fellows tab (grid with sector filter) |
| `/cohorts/2026/week` | `app/cohorts/2026/week/page.tsx` | Week-by-week schedule |
| `/cohorts/2026/venue` | `app/cohorts/2026/venue/page.tsx` | Khoj Resort details |
| `/cohorts/2026/explore` | `app/cohorts/2026/explore/page.tsx` | Field guide to Baltistan |
| `/cohorts/2026/fellows/[slug]` | `app/cohorts/2026/fellows/[slug]/page.tsx` | Full-page editorial detail for each fellow |

**Removed routes** (they now 404, no redirects): `/fellows`, `/fellows/[slug]`, `/itinerary`, `/venue`, `/explore-skardu`, `/travel`, `/resources`. `app/not-found.tsx` is a helpful 404 that points visitors to the right place.

---

## Fellow Detail Pages (Critical Feature)

**Recent Redesign:** 2026-05-17 — Full-page editorial layout (not modal)

### Page Structure (`/cohorts/2026/fellows/[slug]`)

Page: `app/cohorts/2026/fellows/[slug]/page.tsx`. Components and CSS: `app/cohorts/_components/fellow/*` (`fellow-detail.module.css`).

1. **FellowHero** — Alpine background, name, problem statement, photo/avatar
2. **IdeaBand** — Clay background tagline section
3. **Two-column body** (desktop) / single column (mobile):
   - Left: Three narrative sections (Mission, How It Works, Dream)
   - Right: Sticky sidebar with org metadata
4. **FellowNavigation** — Prev/Next fellow links

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

**Critical:** This is the SINGLE source of truth for fellow data. All 11 fellows have complete records. `email` and `phone` are kept in the data on purpose but must never appear on any page.

### Static Generation

`generateStaticParams()` pre-renders all 11 fellow pages at build time (zero runtime overhead).

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

If `photo_url` is null, renders an 80px avatar circle with 2-letter initials (clay background, white serif text).

---

## Styling Approach

### CSS Modules + CSS Variables

1. **Globals** — `app/globals.css` (colors, spacing, typography, resets)
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
background: var(--alpine-deep);
border: 1px solid var(--line);
```

Never hardcode hex values.

---

## Components Pattern

### Server Components (Default)

- FellowHero, IdeaBand, FellowSection, FellowSidebar, FellowNavigation
- Footer, DeadlineBand, StagingBanner, etc.

**Benefits:** No JavaScript, fast, can access databases/env vars

### Client Components ("use client")

- Header, NavDropdown (menu state)
- FellowsBits (sector filter with useState)
- ContactForm (opens the visitor's email app via mailto:)
- BeforeAfterSlider (interactive)

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
  title: 'Page Title — Summit Fellowship 2026',
  description: 'Page description.',
};
```

Or dynamic for detail pages:

```typescript
export async function generateMetadata({ params }) {
  const fellow = getFellow(2026, slug);
  return {
    title: `${fellow.name} — Summit Fellowship 2026`,
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
   - Sidebar hidden below 1024px
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

Edit `app/globals.css` `:root` CSS variables. All components inherit changes.

### Test Responsive Layout

Test at 375px (mobile), 768px (tablet), and 1440px (desktop). Verify:
- Mobile stacking works (below 640px)
- Sidebar hidden below 1024px
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

All 11 fellows have `geography` populated. Displayed in sidebar.

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

- **Phase 2 — contact/application form:** flip `FORM_ENABLED` in `lib/site.ts` once the backend exists
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
2. Read `app/globals.css` (design system)
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

**Last Updated:** 2026-10-12  
**Status:** Phase 1 of the permanent multi-year site built on `staging`; production serves whatever is on `master` (staging merges only with go-live approval)
