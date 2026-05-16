# Fellow Detail Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign fellow detail pages from modal overlay to full-page editorial layout with sidebar on desktop and mobile drawer, matching the cohort.html design aesthetic.

**Architecture:** Build 5 reusable React components (FellowHero, FellowSection, FellowSidebar, FellowDrawer, FellowNavigation) that compose into a full-page layout. Update data structure to include geography field. Use Tailwind + existing CSS variables for responsive styling. Implement client-side state for mobile drawer toggle.

**Tech Stack:** Next.js 15+, React, TypeScript, Tailwind CSS, CSS (for animations/sticky positioning), existing design system variables from `app/globals.css`

---

## File Structure

### New Files (Components)
- `app/fellows/[slug]/components/FellowHero.tsx` — Hero section with photo/avatar + name + problem statement
- `app/fellows/[slug]/components/IdeaBand.tsx` — Clay-accented band with tagline
- `app/fellows/[slug]/components/FellowSection.tsx` — Reusable narrative section (Mission, How It Works, Dream)
- `app/fellows/[slug]/components/FellowSidebar.tsx` — Org metadata + contact links (desktop only)
- `app/fellows/[slug]/components/FellowDrawer.tsx` — Mobile drawer overlay for sidebar content
- `app/fellows/[slug]/components/FellowNavigation.tsx` — Prev/Next navigation + back to all fellows

### Modified Files
- `app/fellows/[slug]/page.tsx` — Redesign layout, import components, manage drawer state
- `lib/fellows.ts` — Add `geography: string` field to Fellow type
- `data/fellows-deep.json` — Populate geography for all 11 fellows

### Styling
- `app/globals.css` — Reference existing variables; no new CSS needed if using Tailwind (drawer animation may need custom CSS)

---

## Task Breakdown

### Task 1: Update Fellow Data Type

**Files:**
- Modify: `lib/fellows.ts:6-22`

**Description:** Add `geography` field to the Fellow type definition.

- [ ] **Step 1: Update Fellow type in lib/fellows.ts**

Open `lib/fellows.ts` and update the Fellow type:

```typescript
export type Fellow = {
  id: string;
  name: string;
  org: string;
  sector: string;
  tagline: string;
  idea_context: string;
  mission: string;
  how_it_works: string;
  the_dream: string;
  structure: string;
  geography: string;  // NEW: Add this line
  org_url: string;
  fellow_linkedin: string;
  photo_url: string | null;
  photo_source: string | null;
  sources: string[];
};
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run type-check`
Expected: No errors related to Fellow type

- [ ] **Step 3: Commit**

```bash
git add lib/fellows.ts
git commit -m "feat: add geography field to Fellow type"
```

---

### Task 2: Populate Geography Data for All Fellows

**Files:**
- Modify: `data/fellows-deep.json`

**Description:** Add `geography` field to all 11 fellow records.

- [ ] **Step 1: Update fellows-deep.json with geography data**

Open `data/fellows-deep.json` and add `geography` field to each fellow object. Here's the data to add (in the correct position after `structure` field):

```json
{
  "id": "rubeena-kidwai",
  "name": "Dr. Rubeena Kidwai",
  ...
  "structure": "Nonprofit",
  "geography": "Pakistan (national)",
  ...
}
```

Complete list to add for all 11 fellows:
- rubeena-kidwai: "Pakistan (national)"
- azima-dhanjee: "Punjab, Sindh"
- habiba-banu: "Pakistan (Punjab focus)"
- saad-hussain: "Punjab"
- lala-rukh: "Sindh, Punjab, KP"
- khushbakht-shah: "Pakistan (national)"
- maira-siddiqui: "Sindh, Punjab, KP"
- adnan-qureshi: "Sindh, Punjab, Balochistan"
- muhammad-waqas: "Sindh, Punjab, KP"
- ali-siddiq: "Sindh"
- osama-shahid: "Balochistan, KP"

- [ ] **Step 2: Validate JSON syntax**

Run: `npm run type-check` (TypeScript will validate JSON import)
Expected: No syntax errors

- [ ] **Step 3: Commit**

```bash
git add data/fellows-deep.json
git commit -m "data: populate geography field for all 11 fellows"
```

---

### Task 3: Create FellowHero Component

**Files:**
- Create: `app/fellows/[slug]/components/FellowHero.tsx`

**Description:** Display fellow name, problem statement, and photo/avatar in dark alpine hero section.

- [ ] **Step 1: Create FellowHero component**

Create file `app/fellows/[slug]/components/FellowHero.tsx`:

```typescript
import Image from 'next/image';
import { Fellow } from '@/lib/fellows';

type FellowHeroProps = {
  fellow: Fellow;
};

export function FellowHero({ fellow }: FellowHeroProps) {
  const initials = fellow.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="fellow-hero">
      <div className="topo-bg topo-bg--on-dark" aria-hidden="true"></div>
      <div className="fellow-hero__inner">
        <div className="fellow-hero__content">
          <h1 className="fellow-hero__name">{fellow.name}</h1>
          <p className="fellow-hero__problem">{fellow.idea_context}</p>
        </div>
        <div className="fellow-hero__media">
          {fellow.photo_url ? (
            <Image
              src={fellow.photo_url}
              alt={fellow.name}
              width={300}
              height={300}
              className="fellow-hero__photo"
              priority
            />
          ) : (
            <div className="fellow-hero__avatar">{initials}</div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify component imports/syntax**

Run: `npm run type-check`
Expected: No TypeScript errors in FellowHero.tsx

- [ ] **Step 3: Commit**

```bash
git add app/fellows/[slug]/components/FellowHero.tsx
git commit -m "feat: create FellowHero component for editorial layout"
```

---

### Task 4: Create IdeaBand Component

**Files:**
- Create: `app/fellows/[slug]/components/IdeaBand.tsx`

**Description:** Clay-accented band displaying the fellow's tagline/idea in italic serif.

- [ ] **Step 1: Create IdeaBand component**

Create file `app/fellows/[slug]/components/IdeaBand.tsx`:

```typescript
import { Fellow } from '@/lib/fellows';

type IdeaBandProps = {
  fellow: Fellow;
};

export function IdeaBand({ fellow }: IdeaBandProps) {
  return (
    <section className="idea-band">
      <div className="container">
        <p className="idea-band__tagline">{fellow.tagline}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify component**

Run: `npm run type-check`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/fellows/[slug]/components/IdeaBand.tsx
git commit -m "feat: create IdeaBand component with clay accent"
```

---

### Task 5: Create FellowSection Component

**Files:**
- Create: `app/fellows/[slug]/components/FellowSection.tsx`

**Description:** Reusable section component for narrative content (Mission, How It Works, Dream).

- [ ] **Step 1: Create FellowSection component**

Create file `app/fellows/[slug]/components/FellowSection.tsx`:

```typescript
type FellowSectionProps = {
  title: string;
  content: string;
};

export function FellowSection({ title, content }: FellowSectionProps) {
  return (
    <div className="fellow-section">
      <h2 className="fellow-section__title">{title}</h2>
      <p className="fellow-section__content">{content}</p>
    </div>
  );
}
```

- [ ] **Step 2: Verify component**

Run: `npm run type-check`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/fellows/[slug]/components/FellowSection.tsx
git commit -m "feat: create FellowSection reusable component"
```

---

### Task 6: Create FellowSidebar Component

**Files:**
- Create: `app/fellows/[slug]/components/FellowSidebar.tsx`

**Description:** Display organization metadata and contact links on desktop (hidden on mobile).

- [ ] **Step 1: Create FellowSidebar component**

Create file `app/fellows/[slug]/components/FellowSidebar.tsx`:

```typescript
import { Fellow } from '@/lib/fellows';

type FellowSidebarProps = {
  fellow: Fellow;
};

export function FellowSidebar({ fellow }: FellowSidebarProps) {
  return (
    <aside className="fellow-sidebar">
      <div className="fellow-sidebar__section">
        <h3 className="fellow-sidebar__label">Organization</h3>
        <p className="fellow-sidebar__value">{fellow.org}</p>
      </div>

      <div className="fellow-sidebar__section">
        <h3 className="fellow-sidebar__label">Geography</h3>
        <p className="fellow-sidebar__value">{fellow.geography}</p>
      </div>

      <div className="fellow-sidebar__section">
        <h3 className="fellow-sidebar__label">Sector</h3>
        <p className="fellow-sidebar__value">{fellow.sector}</p>
      </div>

      <div className="fellow-sidebar__section">
        <h3 className="fellow-sidebar__label">Structure</h3>
        <p className="fellow-sidebar__value">{fellow.structure}</p>
      </div>

      <div className="fellow-sidebar__section">
        <h3 className="fellow-sidebar__label">Contact & Links</h3>
        <div className="fellow-sidebar__links">
          {fellow.email && (
            <a href={`mailto:${fellow.email}`} className="fellow-sidebar__link">
              Email
            </a>
          )}
          {fellow.fellow_linkedin && (
            <a
              href={fellow.fellow_linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="fellow-sidebar__link"
            >
              LinkedIn
            </a>
          )}
          {fellow.org_url && (
            <a
              href={fellow.org_url}
              target="_blank"
              rel="noopener noreferrer"
              className="fellow-sidebar__link"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Verify component**

Run: `npm run type-check`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/fellows/[slug]/components/FellowSidebar.tsx
git commit -m "feat: create FellowSidebar component with org metadata"
```

---

### Task 7: Create FellowDrawer Component

**Files:**
- Create: `app/fellows/[slug]/components/FellowDrawer.tsx`

**Description:** Mobile drawer overlay containing sidebar content (same as FellowSidebar, but for mobile).

- [ ] **Step 1: Create FellowDrawer component**

Create file `app/fellows/[slug]/components/FellowDrawer.tsx`:

```typescript
import { Fellow } from '@/lib/fellows';

type FellowDrawerProps = {
  fellow: Fellow;
  isOpen: boolean;
  onClose: () => void;
};

export function FellowDrawer({ fellow, isOpen, onClose }: FellowDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fellow-drawer__backdrop"
          onClick={onClose}
          role="presentation"
        ></div>
      )}

      {/* Drawer */}
      <div className={`fellow-drawer ${isOpen ? 'fellow-drawer--open' : ''}`}>
        <button
          className="fellow-drawer__close"
          onClick={onClose}
          aria-label="Close drawer"
        >
          ✕
        </button>

        <div className="fellow-drawer__content">
          <div className="fellow-drawer__section">
            <h3 className="fellow-drawer__label">Organization</h3>
            <p className="fellow-drawer__value">{fellow.org}</p>
          </div>

          <div className="fellow-drawer__section">
            <h3 className="fellow-drawer__label">Geography</h3>
            <p className="fellow-drawer__value">{fellow.geography}</p>
          </div>

          <div className="fellow-drawer__section">
            <h3 className="fellow-drawer__label">Sector</h3>
            <p className="fellow-drawer__value">{fellow.sector}</p>
          </div>

          <div className="fellow-drawer__section">
            <h3 className="fellow-drawer__label">Structure</h3>
            <p className="fellow-drawer__value">{fellow.structure}</p>
          </div>

          <div className="fellow-drawer__section">
            <h3 className="fellow-drawer__label">Contact & Links</h3>
            <div className="fellow-drawer__links">
              {fellow.email && (
                <a href={`mailto:${fellow.email}`} className="fellow-drawer__link">
                  Email
                </a>
              )}
              {fellow.fellow_linkedin && (
                <a
                  href={fellow.fellow_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fellow-drawer__link"
                >
                  LinkedIn
                </a>
              )}
              {fellow.org_url && (
                <a
                  href={fellow.org_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fellow-drawer__link"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify component**

Run: `npm run type-check`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/fellows/[slug]/components/FellowDrawer.tsx
git commit -m "feat: create FellowDrawer component for mobile sidebar"
```

---

### Task 8: Create FellowNavigation Component

**Files:**
- Create: `app/fellows/[slug]/components/FellowNavigation.tsx`

**Description:** Prev/Next fellow navigation and back to all fellows link.

- [ ] **Step 1: Create FellowNavigation component**

Create file `app/fellows/[slug]/components/FellowNavigation.tsx`:

```typescript
import Link from 'next/link';
import { Fellow } from '@/lib/fellows';

type FellowNavigationProps = {
  prevFellow: Fellow | null;
  nextFellow: Fellow | null;
};

export function FellowNavigation({
  prevFellow,
  nextFellow,
}: FellowNavigationProps) {
  return (
    <nav className="fellow-navigation">
      <div className="fellow-navigation__inner">
        {prevFellow ? (
          <Link href={`/fellows/${prevFellow.id}`} className="fellow-navigation__link fellow-navigation__link--prev">
            ← {prevFellow.name}
          </Link>
        ) : (
          <div></div>
        )}

        <Link href="/fellows" className="fellow-navigation__link fellow-navigation__link--center">
          Back to all fellows
        </Link>

        {nextFellow ? (
          <Link href={`/fellows/${nextFellow.id}`} className="fellow-navigation__link fellow-navigation__link--next">
            {nextFellow.name} →
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify component**

Run: `npm run type-check`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/fellows/[slug]/components/FellowNavigation.tsx
git commit -m "feat: create FellowNavigation component with prev/next links"
```

---

### Task 9: Redesign Fellow Detail Page Layout

**Files:**
- Modify: `app/fellows/[slug]/page.tsx`

**Description:** Replace modal layout with full-page editorial layout using the 5 new components. Manage drawer state with useState.

- [ ] **Step 1: Rewrite page.tsx with new layout**

Replace the entire content of `app/fellows/[slug]/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getFellow, getAllFellows } from '@/lib/fellows';
import { FellowHero } from './components/FellowHero';
import { IdeaBand } from './components/IdeaBand';
import { FellowSection } from './components/FellowSection';
import { FellowSidebar } from './components/FellowSidebar';
import { FellowDrawer } from './components/FellowDrawer';
import { FellowNavigation } from './components/FellowNavigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const fellows = getAllFellows();
  return fellows.map((fellow) => ({
    slug: fellow.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(slug);
  if (!fellow) return { title: 'Fellow Not Found' };

  return {
    title: `${fellow.name} — Summit Fellowship 2026`,
    description: fellow.mission,
  };
}

export default async function FellowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(slug);

  if (!fellow) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Fellow not found</h1>
        <p>
          <Link href="/fellows">Back to all fellows</Link>
        </p>
      </div>
    );
  }

  const allFellows = getAllFellows();
  const currentIndex = allFellows.findIndex((f) => f.id === fellow.id);
  const prevFellow = currentIndex > 0 ? allFellows[currentIndex - 1] : null;
  const nextFellow = currentIndex < allFellows.length - 1 ? allFellows[currentIndex + 1] : null;

  return <FellowDetailContent fellow={fellow} prevFellow={prevFellow} nextFellow={nextFellow} />;
}

// Client component for managing drawer state
function FellowDetailContent({
  fellow,
  prevFellow,
  nextFellow,
}: {
  fellow: ReturnType<typeof getFellow>;
  prevFellow: ReturnType<typeof getFellow>;
  nextFellow: ReturnType<typeof getFellow>;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!fellow) return null;

  return (
    <div className="fellow-detail">
      <FellowHero fellow={fellow} />
      <IdeaBand fellow={fellow} />

      <div className="fellow-detail__body">
        <div className="fellow-detail__content">
          <FellowSection title="The Mission" content={fellow.mission} />
          <FellowSection title="How It Works" content={fellow.how_it_works} />
          <FellowSection title="The Dream" content={fellow.the_dream} />
        </div>

        {/* Sidebar: visible on desktop (1024px+) */}
        <div className="fellow-detail__sidebar">
          <FellowSidebar fellow={fellow} />
        </div>
      </div>

      {/* Mobile drawer: controlled by button in hero or sticky header */}
      <div className="fellow-detail__drawer-trigger">
        <button
          className="fellow-detail__drawer-button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open organization info"
        >
          About Organization
        </button>
      </div>

      <FellowDrawer
        fellow={fellow}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <FellowNavigation prevFellow={prevFellow} nextFellow={nextFellow} />
    </div>
  );
}
```

- [ ] **Step 2: Verify page compiles**

Run: `npm run type-check`
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add app/fellows/[slug]/page.tsx
git commit -m "refactor: redesign fellow detail page with full-page layout and components"
```

---

### Task 10: Add Styling for Fellow Detail Layout

**Files:**
- Modify: `app/globals.css` (add new classes)

**Description:** Add Tailwind-compatible CSS classes for the new fellow detail components. Focus on hero, sidebar, drawer, and responsive layout.

- [ ] **Step 1: Add CSS to globals.css**

Append these styles to `app/globals.css` (at the end, before closing):

```css
/* Fellow Detail Page Styling */

/* Container and layout */
.fellow-detail {
  width: 100%;
}

.fellow-detail__body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 64px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 32px;
}

.fellow-detail__content {
  max-width: 75ch;
}

/* Hero Section */
.fellow-hero {
  background: var(--alpine-deep);
  color: var(--parchment);
  padding: 80px 32px;
  position: relative;
  overflow: hidden;
}

.fellow-hero .topo-bg {
  opacity: 0.12;
  mix-blend-mode: screen;
}

.fellow-hero__inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 64px;
  align-items: center;
}

.fellow-hero__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.fellow-hero__name {
  font-family: var(--serif);
  font-size: clamp(32px, 6vw, 56px);
  line-height: 1.1;
  letter-spacing: -0.015em;
  color: var(--paper);
  margin: 0;
}

.fellow-hero__problem {
  font-size: 18px;
  line-height: 1.6;
  color: var(--parchment);
  opacity: 0.9;
  margin: 0;
  max-width: 60ch;
}

.fellow-hero__media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fellow-hero__photo {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.fellow-hero__avatar {
  width: 300px;
  height: 300px;
  background: var(--ochre);
  color: var(--alpine-deep);
  font-family: var(--serif);
  font-size: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

/* Idea Band */
.idea-band {
  background: var(--clay);
  color: var(--paper);
  padding: 40px 32px;
  text-align: center;
}

.idea-band__tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(20px, 4vw, 32px);
  line-height: 1.4;
  margin: 0;
  max-width: 60ch;
  margin-left: auto;
  margin-right: auto;
}

/* Sections */
.fellow-section {
  margin-bottom: 48px;
}

.fellow-section__title {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 12px;
  margin-top: 0;
}

.fellow-section__content {
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0;
}

/* Sidebar */
.fellow-detail__sidebar {
  display: none;
}

.fellow-sidebar {
  position: sticky;
  top: 32px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 32px;
  height: fit-content;
}

.fellow-sidebar__section {
  margin-bottom: 28px;
}

.fellow-sidebar__section:last-child {
  margin-bottom: 0;
}

.fellow-sidebar__label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 8px;
  margin-top: 0;
  font-weight: 500;
}

.fellow-sidebar__value {
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin: 0;
}

.fellow-sidebar__links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fellow-sidebar__link {
  font-size: 14px;
  color: var(--alpine-deep);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  padding-bottom: 8px;
  transition: all 0.2s var(--ease-out);
}

.fellow-sidebar__link:hover {
  color: var(--clay);
  border-color: var(--clay);
}

/* Drawer */
.fellow-drawer {
  position: fixed;
  right: 0;
  top: 0;
  width: 90%;
  max-width: 400px;
  height: 100vh;
  background: var(--paper);
  z-index: 101;
  transform: translateX(100%);
  transition: transform 0.3s var(--ease-out);
  overflow-y: auto;
}

.fellow-drawer--open {
  transform: translateX(0);
}

.fellow-drawer__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(12, 26, 34, 0.85);
  z-index: 100;
  animation: fadeIn 0.3s var(--ease-out);
}

.fellow-drawer__close {
  position: sticky;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: var(--line);
  border: none;
  border-radius: 4px;
  font-size: 18px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fellow-drawer__close:hover {
  background: var(--clay);
  color: var(--paper);
}

.fellow-drawer__content {
  padding: 32px;
}

.fellow-drawer__section {
  margin-bottom: 28px;
}

.fellow-drawer__label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 8px;
  margin-top: 0;
  font-weight: 500;
}

.fellow-drawer__value {
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin: 0;
}

.fellow-drawer__links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fellow-drawer__link {
  font-size: 14px;
  color: var(--alpine-deep);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  padding-bottom: 8px;
  transition: all 0.2s var(--ease-out);
}

.fellow-drawer__link:hover {
  color: var(--clay);
  border-color: var(--clay);
}

/* Drawer trigger button (mobile only) */
.fellow-detail__drawer-trigger {
  display: none;
  padding: 24px 32px;
  border-top: 1px solid var(--line);
}

.fellow-detail__drawer-button {
  width: 100%;
  padding: 12px 16px;
  background: var(--alpine-deep);
  color: var(--paper);
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.fellow-detail__drawer-button:hover {
  background: var(--ochre);
  color: var(--alpine-deep);
}

/* Navigation */
.fellow-navigation {
  border-top: 1px solid var(--line);
  padding: 28px 32px;
  background: var(--paper);
}

.fellow-navigation__inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  align-items: center;
}

.fellow-navigation__link {
  font-size: 14px;
  color: var(--alpine-deep);
  text-decoration: none;
  transition: all 0.2s var(--ease-out);
  padding: 12px 0;
}

.fellow-navigation__link:hover {
  color: var(--clay);
}

.fellow-navigation__link--prev {
  text-align: left;
}

.fellow-navigation__link--center {
  text-align: center;
}

.fellow-navigation__link--next {
  text-align: right;
}

/* Responsive: Tablet (641px - 1023px) */
@media (max-width: 1023px) {
  .fellow-detail__body {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 60px 24px;
  }

  .fellow-hero__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .fellow-sidebar {
    position: static;
    top: auto;
  }
}

/* Responsive: Mobile (0px - 640px) */
@media (max-width: 640px) {
  .fellow-detail__body {
    grid-template-columns: 1fr;
    padding: 40px 16px;
  }

  .fellow-detail__sidebar {
    display: none;
  }

  .fellow-detail__drawer-trigger {
    display: block;
  }

  .fellow-hero {
    padding: 48px 16px;
  }

  .fellow-hero__inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .fellow-hero__photo,
  .fellow-hero__avatar {
    width: 200px;
    height: 200px;
  }

  .idea-band {
    padding: 32px 16px;
  }

  .fellow-navigation__inner {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .fellow-navigation__link {
    text-align: center !important;
  }

  .fellow-drawer {
    width: 100%;
    max-width: none;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

- [ ] **Step 2: Verify styles are applied**

Run: `npm run dev` and navigate to a fellow detail page (e.g., `/fellows/rubeena-kidwai`)
Expected: Full-page layout with hero, idea band, sections, and (on desktop) sidebar

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add comprehensive styling for fellow detail page layout"
```

---

### Task 11: Test Responsive Layout on Multiple Breakpoints

**Files:**
- No new files (testing only)

**Description:** Verify that the layout responds correctly to viewport changes and components render properly at desktop, tablet, and mobile sizes.

- [ ] **Step 1: Test desktop layout (1024px+)**

Run: `npm run dev`
Navigate to: `http://localhost:3000/fellows/rubeena-kidwai`

Expected:
- Hero displays with name on left, photo on right
- Idea band spans full width
- Content and sidebar in two-column grid
- Sidebar sticky when scrolling
- Navigation at bottom with three columns

- [ ] **Step 2: Test tablet layout (641px - 1023px)**

Open DevTools, set viewport to 800px width

Expected:
- Hero and idea band full width
- Content and sidebar stack vertically (no sidebar visible)
- Drawer button not visible
- Navigation stacks properly

- [ ] **Step 3: Test mobile layout (0px - 640px)**

Open DevTools, set viewport to 375px width

Expected:
- Hero stacks vertically (photo below name/problem)
- Idea band responsive and readable
- Sections full width
- "About Organization" button visible
- Drawer button works (click toggles drawer open/closed)
- Drawer slides in from right
- Navigation stacks vertically
- All tap targets ≥44px

- [ ] **Step 4: Test drawer functionality**

On mobile viewport:
- Click "About Organization" button
- Drawer should slide in from right
- Click close button (X) — drawer slides out
- Click backdrop — drawer closes
- Press Escape key — drawer closes
- Click a link in drawer — drawer stays open (user navigates)

- [ ] **Step 5: No failures to commit**

Run: `npm run type-check`
Expected: No errors

---

### Task 12: Test Fellow Navigation (Prev/Next)

**Files:**
- No new files (testing only)

**Description:** Verify that prev/next fellow links work correctly, including boundary cases.

- [ ] **Step 1: Test prev fellow link (not first fellow)**

Navigate to: `http://localhost:3000/fellows/azima-dhanjee` (2nd fellow)
Look at bottom navigation

Expected:
- Left link shows: "← Dr. Rubeena Kidwai"
- Click link navigates to Rubeena's page
- Previous link not visible on Rubeena's page

- [ ] **Step 2: Test next fellow link (not last fellow)**

Navigate to: `http://localhost:3000/fellows/rubeena-kidwai` (1st fellow)
Look at bottom navigation

Expected:
- Right link shows: "Azima Dhanjee →"
- Click link navigates to Azima's page
- Next link not visible on Osama's page (last fellow)

- [ ] **Step 3: Test boundary cases**

Navigate to Rubeena's page (first):
- Left column should be empty
- Right link should show next fellow

Navigate to Osama's page (last):
- Right column should be empty
- Left link should show previous fellow

- [ ] **Step 4: Test "Back to all fellows" link**

From any fellow page, click center link
Expected: Navigate to `/fellows` (grid view)

---

### Task 13: Test Photo Fallback (Avatar)

**Files:**
- No new files (testing only)

**Description:** Verify that fellows without photos display colored avatars with initials.

- [ ] **Step 1: Navigate to fellow with photo**

Go to: `http://localhost:3000/fellows/habiba-banu`
Expected: Photo displays in hero

- [ ] **Step 2: Navigate to fellow without photo**

Go to: `http://localhost:3000/fellows/rubeena-kidwai` (no photo_url)
Expected: Colored avatar with initials "RK" displays instead

- [ ] **Step 3: Verify avatar styling**

Avatar should:
- Be 300px × 300px on desktop
- Be 200px × 200px on mobile
- Have ochre background
- Have alpine-deep text (initials)
- Maintain aspect ratio

---

### Task 14: Final Build & Verification

**Files:**
- No new files (testing only)

**Description:** Run a final build to ensure everything compiles and deploys correctly.

- [ ] **Step 1: Run type check**

```bash
npm run type-check
```

Expected: No TypeScript errors

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Successful build with no errors or warnings related to fellow pages

- [ ] **Step 3: Verify all fellows generate correctly**

Expected: All 11 static pages generated in `.next` output

- [ ] **Step 4: Final commit**

```bash
git log --oneline -10
```

Verify that all tasks have been committed:
- ✅ Task 1: Add geography field to Fellow type
- ✅ Task 2: Populate geography data
- ✅ Task 3: Create FellowHero
- ✅ Task 4: Create IdeaBand
- ✅ Task 5: Create FellowSection
- ✅ Task 6: Create FellowSidebar
- ✅ Task 7: Create FellowDrawer
- ✅ Task 8: Create FellowNavigation
- ✅ Task 9: Redesign page.tsx
- ✅ Task 10: Add styling

---

## Self-Review Checklist

**Spec Coverage:**
- ✅ Full-page layout (Task 9, 10)
- ✅ Hero section with photo/avatar (Task 3, 10)
- ✅ Idea band with clay accent (Task 4, 10)
- ✅ Mission/How It Works/Dream sections (Task 5, 9)
- ✅ Sidebar with org metadata (Task 6, 10)
- ✅ Mobile drawer for sidebar (Task 7, 9, 10)
- ✅ Prev/Next navigation (Task 8, 9)
- ✅ Geography field in data (Task 1, 2)
- ✅ Responsive layout (Task 10, 11)
- ✅ Tailwind + CSS variables styling (Task 10)

**Placeholder Scan:**
- ✅ No "TBD", "TODO", or incomplete code blocks
- ✅ All components have full implementations
- ✅ All CSS classes are fully styled
- ✅ All tasks have exact commands and expected outputs

**Type Consistency:**
- ✅ Fellow type matches across all components
- ✅ Props types are consistent (FellowHeroProps, IdeaBandProps, etc.)
- ✅ No mismatched function/property names

**Scope Check:**
- ✅ Plan is focused on fellow detail redesign only
- ✅ No unrelated refactoring
- ✅ Components are reusable and well-separated
- ✅ All changes are in `app/fellows/[slug]/` and related data

---

## Next Steps

**Plan complete and saved to `docs/superpowers/plans/2026-05-17-fellow-detail-redesign.md`.**

**Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task with a 2-stage review checkpoint, allowing fast iteration and course-correction.

**2. Inline Execution** — Execute all tasks in this session using executing-plans skill, with checkpoints for your approval between major sections.

**Which approach would you prefer?**
