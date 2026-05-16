# Fellow Detail Pages Design Spec

**Date:** 2026-05-16  
**Status:** Design Phase  
**Reference:** Mulago Foundation fellow pages (simplified, no geography or selection rationale)

---

## Overview

Individual fellow pages at `/fellows/[slug]` will display rich narrative content about each of the 11 Summit Fellowship 2026 founders. The design mirrors the Mulago Foundation structure: problem context → idea → dream, with an organization card and related fellows grid.

---

## Page Structure

### 1. Hero Section
- Fellow's photo (centered, constrained height ~400px)
- Fellow's name (large serif heading)
- Organization name (subheading, ochre color)
- CSS class: `.fellow-hero`

**Content from:** `fellows-deep.json` (name, org, photo_url)

### 2. Tagline
- Single-line mission statement
- Typography: smaller serif, ochre accent
- CSS class: `.fellow-tagline`

**Content from:** `fellows-deep.json` (tagline field)

### 3. Problem Context Section
- Heading: "The Problem"
- Full paragraph explaining the gap, unmet need, or systemic challenge
- Typography: body serif, ~18px line-height
- CSS class: `.fellow-section fellow-section--problem`

**Content from:** `fellows-deep.json` (idea_context)

### 4. The Idea Section
- Heading: "The Idea"
- Full paragraph describing the approach, how it works, and core mechanisms
- Typography: body serif, ~18px line-height
- CSS class: `.fellow-section fellow-section--idea`

**Content from:** `fellows-deep.json` (how_it_works)

### 5. The Dream Section
- Heading: "The Dream"
- Full paragraph describing the vision for scale, systemic change, or impact at scale
- Typography: body serif, ~18px line-height
- CSS class: `.fellow-section fellow-section--dream`

**Content from:** `fellows-deep.json` (the_dream)

### 6. Organization Card
- Layout: Vertical card with alternating background (alpine-soft or paper-warm)
- Fields displayed:
  - Organization name (heading, ochre)
  - Sector (label + value)
  - Structure (nonprofit / for-profit)
  - Website link (button/link style)
  - LinkedIn link (button/link style)
  - Contact email link
- CSS class: `.fellow-org-card`

**Content from:** `fellows-deep.json` (org_url, fellow_linkedin, email, sector, structure)

### 7. Related Fellows Section
- Heading: "Other Fellows"
- Grid of 3–4 other fellows from different sectors
- Uses same card component as `/fellows` listing page
- Excludes the current fellow
- CSS class: `.fellow-related`

### 8. Footer Section
- "Back to all Fellows" link
- CSS class: `.fellow-footer`

---

## Data & Routing

**Route:** `/fellows/[slug]`  
**Data Source:** `data/fellows-deep.json`  
**Fallback:** If a fellow's photo_url is null, display a large circular avatar with the fellow's initials centered on a sector-based background color (reuse the same styling from FellowsBits cards)  
**Slug Mapping:** Use the `id` field from `fellows-deep.json` as the slug (e.g., `rubeena-kidwai`)

---

## CSS Class Naming & Styling

All classes use the Alpine/Expedition design system from `globals.css`:

| Class | Purpose | Colors |
|-------|---------|--------|
| `.fellow-detail` | Page wrapper | — |
| `.fellow-hero` | Image + name section | alpine-deep background |
| `.fellow-tagline` | Mission statement | ochre text |
| `.fellow-section` | Problem/idea/dream blocks | paper background, ink text |
| `.fellow-section--problem` | Problem block | — |
| `.fellow-section--idea` | Idea block | — |
| `.fellow-section--dream` | Dream block | — |
| `.fellow-org-card` | Organization details | alpine-soft background, ochre headings |
| `.fellow-related` | Related fellows grid | — |
| `.fellow-footer` | Back link section | — |

---

## Component Dependencies

- **FellowCard** (reused from `/fellows` for related fellows grid)
- **Design System** (globals.css with Alpine/Expedition colors and typography)
- **Image Handling** — Fallback avatar for null photo_url

---

## Implementation Tasks (Parallel)

### Task 1: Fellow Detail Page & Component
- Create `app/fellows/[slug]/page.tsx`
- Load fellow data from `fellows-deep.json` via slug
- Render all sections (hero, tagline, problem, idea, dream, org card, related, footer)
- Handle missing photo_url with avatar fallback

### Task 2: CSS Styling & Design System Completion
- Ensure all classes in globals.css are defined (colors, typography, spacing)
- Add `.fellow-*` component styles for hero, sections, org-card, related grid
- Ensure responsive behavior (mobile-first)
- Verify color contrast and readability

### Task 3: Image Organization
- Organize fellow images in `public/images/fellows/`
- Use consistent naming (e.g., `rubeena-kidwai.jpg`)
- Update `fellows-deep.json` photo_url references if needed

---

## Success Criteria

- [ ] Fellow detail page loads correctly at `/fellows/[slug]`
- [ ] All data from `fellows-deep.json` renders without errors
- [ ] Missing images fallback to avatar badge gracefully
- [ ] Related fellows grid displays 3–4 fellows from other sectors
- [ ] Page is fully responsive (mobile, tablet, desktop)
- [ ] Color contrast meets WCAG AA standards
- [ ] Links to LinkedIn, website, and email work correctly
- [ ] Back link returns to `/fellows` listing
- [ ] All 11 fellows are accessible via their slug
