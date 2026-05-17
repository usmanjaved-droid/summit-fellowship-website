# Claude.md — Summit Fellowship Website

## Project Overview

**Summit Fellowship 2026** is a week-long intensive retreat for Pakistan's most promising social enterprises. The website showcases the program, fellows, faculty, curriculum, logistics, and all necessary information for participants.

**Status:** Full site implemented and live on Vercel (2026-05-17)  
**Audience:** Fellows, faculty, funders, potential participants  
**Event:** June 7–14, 2026 at Khoj Resort, Skardu  
**Organization:** Mulago Foundation + Taleemabad

---

## Technology Stack

- **Framework:** Next.js 16.2.6 (App Router, React 19.2.4)
- **Language:** TypeScript 5+ (strict mode)
- **Styling:** Tailwind CSS 4 with custom CSS variables
- **Fonts:** Google Fonts (Instrument Serif, Geist, JetBrains Mono, Caveat)
- **Images:** Next.js Image component with remote pattern validation
- **Data:** JSON files in `data/` directory (no database)
- **Hosting:** Vercel (automatic deploys on git push to main)
- **Version Control:** Git with conventional commits

---

## Project Structure

```
Summit Fellowship Website/
├── app/
│   ├── layout.tsx                 # Root layout (Header, Footer, fonts)
│   ├── page.tsx                   # Homepage
│   ├── globals.css                # Global design system
│   │
│   ├── fellows/
│   │   ├── page.tsx               # Fellows grid/listing page
│   │   └── [slug]/
│   │       ├── page.tsx           # Individual fellow detail page
│   │       ├── page.module.css    # Fellow detail styling (BEM)
│   │       └── components/        # Fellow page components
│   │           ├── FellowHero.tsx
│   │           ├── IdeaBand.tsx
│   │           ├── FellowSection.tsx
│   │           ├── FellowSidebar.tsx
│   │           ├── FellowNavigation.tsx
│   │           └── FellowDrawer.tsx
│   │
│   ├── faculty/page.tsx           # Faculty + Organizers
│   ├── funders/page.tsx           # Funding partners
│   ├── curriculum/page.tsx        # Program curriculum
│   ├── itinerary/page.tsx         # Weekly schedule
│   ├── venue/page.tsx             # Khoj Resort details
│   ├── travel/page.tsx            # Transportation logistics
│   ├── resources/page.tsx         # Pre-arrival documents
│   ├── contact/page.tsx           # Contact form
│   │
│   └── components/                # Shared components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── FellowsBits.tsx        # Fellows grid with filtering
│       ├── Countdown.tsx
│       ├── ExponentialChart.tsx
│       ├── ContactForm.tsx
│       └── (13 other components)
│
├── lib/
│   └── fellows.ts                 # Fellow data helpers
│
├── data/
│   ├── fellows-deep.json          # All 11 fellows (authoritative source)
│   ├── faculty.json
│   ├── schedule.json
│   ├── logistics.json
│   └── resources.json
│
├── next.config.ts                 # Image domain configuration
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

```css
@media (max-width: 640px)    { /* Mobile */ }
@media (max-width: 1023px)   { /* Tablet */ }
@media (min-width: 1024px)   { /* Desktop */ }
```

---

## Pages Overview

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Homepage hero + program overview |
| `/fellows` | `app/fellows/page.tsx` | Grid of 11 fellow cards with sector filter |
| `/fellows/[slug]` | `app/fellows/[slug]/page.tsx` | Full-page editorial detail for each fellow |
| `/faculty` | `app/faculty/page.tsx` | Faculty + Organizers |
| `/funders` | `app/funders/page.tsx` | Funding partners |
| `/curriculum` | `app/curriculum/page.tsx` | Mulago design discipline |
| `/itinerary` | `app/itinerary/page.tsx` | Week-by-week schedule |
| `/venue` | `app/venue/page.tsx` | Khoj Resort details |
| `/travel` | `app/travel/page.tsx` | Transportation + logistics |
| `/resources` | `app/resources/page.tsx` | Pre-arrival docs + checklist |
| `/contact` | `app/contact/page.tsx` | Contact form |

---

## Fellow Detail Pages (Critical Feature)

**Recent Redesign:** 2026-05-17 — Full-page editorial layout (not modal)

### Page Structure (`/fellows/[slug]`)

1. **FellowHero** — Alpine background, name, problem statement, photo/avatar
2. **IdeaBand** — Clay background tagline section
3. **Two-column body** (desktop) / single column (mobile):
   - Left: Three narrative sections (Mission, How It Works, Dream)
   - Right: Sticky sidebar with org metadata
4. **FellowNavigation** — Prev/Next fellow links

### Data Schema (`data/fellows-deep.json`)

```typescript
{
  id: string;              // URL slug
  name: string;
  org: string;
  sector: string;
  tagline: string;         // Short idea (idea band)
  idea_context: string;    // Problem statement (hero)
  mission: string;         // Narrative section
  how_it_works: string;    // Narrative section
  the_dream: string;       // Narrative section
  structure: string;       // Nonprofit / For-profit / Hybrid
  geography: string;       // Regions (e.g., "Punjab, Sindh")
  org_url: string;
  fellow_linkedin: string;
  photo_url: string | null;  // External URL or null
  photo_source: string | null;
  sources: string[];
}
```

**Critical:** This is the SINGLE source of truth for fellow data. All 11 fellows have complete records.

### Static Generation

`generateStaticParams()` pre-renders all 11 fellow pages at build time (zero runtime overhead).

### Image Domains

External photo URLs must be whitelisted in `next.config.ts`:

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
- Footer, HeroSection, ScheduleDay, etc.

**Benefits:** No JavaScript, fast, can access databases/env vars

### Client Components ("use client")

- Header (mobile menu state)
- FellowsBits (sector filter with useState)
- Countdown (real-time timer)
- ContactForm (form submission)
- BeforeAfterSlider (interactive)

**Use only for:** State, event listeners, hooks, real-time updates

---

## Data Files

**Single source of truth:** `data/fellows-deep.json`

Other data files:
- `faculty.json` — Faculty + Organizers
- `schedule.json` — Week-by-week itinerary
- `logistics.json` — Venue, travel, packing
- `resources.json` — Pre-arrival documents

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
  const fellow = getFellow(slug);
  return {
    title: `${fellow.name} — Summit Fellowship 2026`,
    description: fellow.tagline,
  };
}
```

### Links

Always use Next.js Link (auto-prefetch):

```typescript
<Link href="/fellows">All fellows</Link>
```

### Conditional Rendering

```typescript
{fellow.fellow_linkedin && (
  <a href={fellow.fellow_linkedin} target="_blank">LinkedIn</a>
)}
```

---

## Build & Deployment

### Local Development

```bash
npm run dev
```

Hot reload on file changes. Dev server at http://localhost:3000

### Production Build

```bash
npm run build
npm run start
```

### Vercel Deployment

Auto-deploy on push to `main` branch:
1. Commit + push
2. Vercel builds automatically
3. Deploy to edge network
4. Live on https://summit-fellowship.vercel.app

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

Push to GitHub, create PR, merge to `main`.

---

## Common Tasks

### Add a New Fellow

1. Edit `data/fellows-deep.json` — add record with all 17 fields
2. Ensure `id` matches URL slug (lowercase, no spaces)
3. Populate `geography`
4. `npm run build` → `git push origin main`
5. Page auto-renders at `/fellows/<id>`

### Add a New Page

1. Create `app/new-page/page.tsx`
2. Add metadata object
3. Add link to Header/Footer nav
4. Deploy

### Update Global Colors

Edit `app/globals.css` `:root` CSS variables. All components inherit changes.

### Test Responsive Layout

Resize to 640px and 1024px. Verify:
- Sidebar hidden below 1024px
- Mobile stacking works
- Text scales smoothly
- Images maintain aspect ratio

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

- **Refactor fellows data:** Consolidate hardcoded FELLOWS array in `fellows/page.tsx` to use `data/fellows-deep.json`
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
4. Review `app/fellows/[slug]/page.tsx` (dynamic page)
5. Look at `app/components/Header.tsx` (client component)
6. Study `lib/fellows.ts` (data access)

### Debugging

- TypeScript: `tsc --noEmit`
- Build: `npm run build`
- Images: Check `next.config.ts` remotePatterns
- CSS: Verify module path and class names

---

**Last Updated:** 2026-05-17  
**Status:** All features implemented, deployed, live on Vercel
