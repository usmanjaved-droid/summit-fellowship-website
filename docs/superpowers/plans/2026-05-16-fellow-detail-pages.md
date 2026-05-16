# Fellow Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) to execute tasks in parallel. Tasks use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build individual fellow detail pages at `/fellows/[slug]` with rich narrative content, organization cards, and related fellows grid.

**Architecture:** Three independent workstreams executed in parallel:
1. **CSS Layer** — Add all `.fellow-*` component classes to globals.css (no dependencies)
2. **Data Layer** — Create utility function to fetch related fellows and prepare page data (no dependencies)
3. **Page Component** — Build the route handler and React component that renders all sections (depends on CSS and data utilities being defined)

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS (via @import), JSON data

---

## File Structure

**Create:**
- `app/fellows/[slug]/page.tsx` — Dynamic route and page component

**Modify:**
- `app/globals.css` — Add `.fellow-*` component styles
- `lib/fellows.ts` — Utility functions for data loading and related fellows logic

**No new test files** — This is frontend rendering; manual testing via browser.

---

## Task 1: CSS Styling & Design System (INDEPENDENT)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add fellow-hero styles to globals.css**

Append to the bottom of `app/globals.css` (before any component styles):

```css
/* Fellow Detail Page Styles */

.fellow-detail {
  /* Page wrapper — no specific styles needed, container handles layout */
}

.fellow-hero {
  background-color: var(--alpine-deep);
  color: var(--parchment);
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.fellow-hero img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
  border: 4px solid var(--ochre);
}

.fellow-hero__avatar {
  width: 300px;
  height: 300px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--clay-deep), var(--ochre-deep));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  font-weight: bold;
  color: var(--parchment);
  border: 4px solid var(--ochre);
}

.fellow-hero h1 {
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.fellow-hero__org {
  font-size: 1.25rem;
  color: var(--ochre);
  font-weight: 500;
  margin-bottom: 0;
}

.fellow-tagline {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--ochre);
  margin-bottom: 3rem;
  line-height: 1.4;
}
```

- [ ] **Step 2: Add fellow-section styles**

Append to globals.css:

```css
.fellow-section {
  background-color: var(--paper);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--line-soft);
}

.fellow-section h2 {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 1.5rem;
}

.fellow-section p {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--ink-soft);
}

.fellow-section--problem h2 {
  color: var(--clay);
}

.fellow-section--idea h2 {
  color: var(--ochre-deep);
}

.fellow-section--dream h2 {
  color: var(--ink);
}
```

- [ ] **Step 3: Add fellow-org-card styles**

Append to globals.css:

```css
.fellow-org-card {
  background-color: var(--alpine-soft);
  color: var(--parchment);
  padding: 2rem;
  margin-bottom: 3rem;
  border-left: 4px solid var(--ochre);
}

.fellow-org-card h3 {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--ochre);
  margin-bottom: 1rem;
}

.fellow-org-card__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.fellow-org-card__label {
  font-weight: 600;
  color: var(--line-soft);
}

.fellow-org-card__value {
  color: var(--parchment);
}

.fellow-org-card__links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.fellow-org-card a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--ochre);
  color: var(--night);
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.fellow-org-card a:hover {
  background-color: var(--ochre-pale);
}
```

- [ ] **Step 4: Add fellow-related styles (reuse fellow-card from /fellows)**

Append to globals.css:

```css
.fellow-related {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}

.fellow-related h2 {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 2rem;
}

.fellow-related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .fellow-related__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Add fellow-footer (back link)**

Append to globals.css:

```css
.fellow-footer {
  padding: 2rem 0;
  margin-top: 3rem;
  text-align: center;
}

.fellow-footer a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--alpine);
  color: var(--ochre);
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.fellow-footer a:hover {
  background-color: var(--alpine-soft);
}
```

- [ ] **Step 6: Add responsive adjustments for mobile**

Append to globals.css:

```css
@media (max-width: 640px) {
  .fellow-hero {
    padding: 2rem 1rem;
  }

  .fellow-hero h1 {
    font-size: 1.75rem;
  }

  .fellow-hero img,
  .fellow-hero__avatar {
    width: 200px;
    height: 200px;
  }

  .fellow-section {
    padding: 1.5rem;
  }

  .fellow-section h2 {
    font-size: 1.5rem;
  }

  .fellow-org-card__row {
    flex-direction: column;
    margin-bottom: 0.75rem;
  }

  .fellow-org-card__links {
    flex-direction: column;
  }

  .fellow-org-card a {
    width: 100%;
    text-align: center;
  }
}
```

- [ ] **Step 7: Commit CSS changes**

```bash
git add app/globals.css
git commit -m "style: add fellow detail page component styles"
```

---

## Task 2: Data Utilities & Related Fellows Logic (INDEPENDENT)

**Files:**
- Create: `lib/fellows.ts`

- [ ] **Step 1: Create lib/fellows.ts with data loading utility**

Create new file `lib/fellows.ts`:

```typescript
import fellowa from '@/data/fellows-deep.json';

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
  org_url: string;
  fellow_linkedin: string;
  photo_url: string | null;
  photo_source: string | null;
  sources: string[];
};

/**
 * Load a single fellow by slug (id).
 * Returns null if not found.
 */
export function getFellow(slug: string): Fellow | null {
  return (fellowa as Fellow[]).find((f) => f.id === slug) ?? null;
}

/**
 * Load all fellows.
 */
export function getAllFellows(): Fellow[] {
  return fellowa as Fellow[];
}

/**
 * Get related fellows: 4 fellows from different sectors, excluding current.
 * Prioritizes sectors furthest from current fellow's sector.
 */
export function getRelatedFellows(currentFellow: Fellow, count: number = 4): Fellow[] {
  const allFellows = getAllFellows();
  
  // Exclude current fellow
  const candidates = allFellows.filter((f) => f.id !== currentFellow.id);
  
  // Sort by sector diversity (randomize within this session to avoid same 4 every time)
  // For determinism, sort by sector name distance
  const sorted = candidates.sort((a, b) => {
    const aDistinct = a.sector !== currentFellow.sector ? 0 : 1;
    const bDistinct = b.sector !== currentFellow.sector ? 0 : 1;
    return aDistinct - bDistinct;
  });
  
  return sorted.slice(0, count);
}
```

- [ ] **Step 2: Test data loading in browser (manual)**

You'll verify this when building the page component. No unit tests needed.

- [ ] **Step 3: Commit utilities**

```bash
git add lib/fellows.ts
git commit -m "feat: add fellow data loading utilities"
```

---

## Task 3: Fellow Detail Page Component (DEPENDS ON TASKS 1 & 2)

**Files:**
- Create: `app/fellows/[slug]/page.tsx`

**Prerequisites:** Tasks 1 (CSS) and Task 2 (utilities) must be complete or at least committed so this file can import from them.

- [ ] **Step 1: Create app/fellows/[slug]/ directory**

```bash
mkdir -p "app/fellows/[slug]"
```

- [ ] **Step 2: Create page.tsx with metadata and page component**

Create file `app/fellows/[slug]/page.tsx`:

```typescript
import Link from 'next/link';
import { getFellow, getRelatedFellows, getAllFellows } from '@/lib/fellows';
import FellowsBits from '@/app/components/FellowsBits';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const fellows = getAllFellows();
  return fellows.map((fellow) => ({
    slug: fellow.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const fellow = getFellow(params.slug);
  if (!fellow) return { title: 'Fellow Not Found' };

  return {
    title: `${fellow.name} — Summit Fellowship 2026`,
    description: fellow.tagline,
  };
}

export default function FellowDetailPage({ params }: PageProps) {
  const fellow = getFellow(params.slug);

  if (!fellow) {
    return (
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Fellow not found</h1>
        <p>
          <Link href="/fellows">Back to all fellows</Link>
        </p>
      </div>
    );
  }

  const relatedFellows = getRelatedFellows(fellow, 4);

  return (
    <article className="fellow-detail">
      {/* Hero Section */}
      <section className="fellow-hero">
        {fellow.photo_url ? (
          <img src={fellow.photo_url} alt={fellow.name} />
        ) : (
          <div className="fellow-hero__avatar">
            {fellow.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
        )}
        <h1>{fellow.name}</h1>
        <p className="fellow-hero__org">{fellow.org}</p>
      </section>

      <div className="container">
        {/* Tagline */}
        <div className="fellow-tagline">{fellow.tagline}</div>

        {/* The Problem */}
        <section className="fellow-section fellow-section--problem">
          <h2>The Problem</h2>
          <p>{fellow.idea_context}</p>
        </section>

        {/* The Idea */}
        <section className="fellow-section fellow-section--idea">
          <h2>The Idea</h2>
          <p>{fellow.how_it_works}</p>
        </section>

        {/* The Dream */}
        <section className="fellow-section fellow-section--dream">
          <h2>The Dream</h2>
          <p>{fellow.the_dream}</p>
        </section>

        {/* Organization Card */}
        <section className="fellow-org-card">
          <h3>{fellow.org}</h3>
          <div className="fellow-org-card__row">
            <span className="fellow-org-card__label">Sector</span>
            <span className="fellow-org-card__value">{fellow.sector}</span>
          </div>
          <div className="fellow-org-card__row">
            <span className="fellow-org-card__label">Structure</span>
            <span className="fellow-org-card__value">{fellow.structure}</span>
          </div>
          <div className="fellow-org-card__links">
            {fellow.org_url && (
              <a href={fellow.org_url} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            )}
            {fellow.fellow_linkedin && (
              <a href={fellow.fellow_linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* Related Fellows */}
        <section className="fellow-related">
          <h2>Other Fellows</h2>
          <div className="fellow-related__grid">
            {relatedFellows.map((f) => (
              <Link
                key={f.id}
                href={`/fellows/${f.id}`}
                className="fellow-card fellow-card--link"
              >
                <div className="fellow-card__head">
                  <div className="fellow-card__avatar">
                    {f.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                </div>
                <h3 className="fellow-card__name">{f.name}</h3>
                <div className="fellow-card__org">
                  <strong>{f.org}</strong>
                </div>
                <div className="fellow-card__sector">{f.sector}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <footer className="fellow-footer">
          <Link href="/fellows">← Back to all fellows</Link>
        </footer>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Verify app/components/FellowsBits.tsx still exports Fellow type (it does)**

Check line 6 of FellowsBits.tsx — it exports the type. No changes needed.

- [ ] **Step 4: Manual browser test — Navigate to a fellow page**

```bash
npm run dev
# Visit http://localhost:3000/fellows/rubeena-kidwai
# Verify:
# - Hero section renders with initials (no photo_url in data yet)
# - Tagline displays
# - Problem, Idea, Dream sections all render with full text
# - Org card shows sector, structure, and links
# - Related fellows grid shows 4 other fellows
# - Back link works
```

- [ ] **Step 5: Test all 11 fellows**

Manually navigate to 2–3 other slugs:
- http://localhost:3000/fellows/azima-dhanjee
- http://localhost:3000/fellows/habiba-banu

Verify same layout renders correctly.

- [ ] **Step 6: Test 404 — Visit invalid slug**

```bash
# Visit http://localhost:3000/fellows/nonexistent-slug
# Verify: "Fellow not found" message and back link display
```

- [ ] **Step 7: Verify responsive design on mobile**

Use browser DevTools to simulate mobile (375px width). Check:
- Hero image/avatar sizes appropriately
- Text remains readable
- Org card links stack vertically
- Related fellows grid collapses to single column

- [ ] **Step 8: Commit page component**

```bash
git add app/fellows/[slug]/page.tsx
git commit -m "feat: add fellow detail pages with dynamic routing"
```

---

## Self-Review Against Spec

✅ **Hero Section** — Task 3 Step 2: Photo fallback to initials avatar, name, org name  
✅ **Tagline** — Task 3 Step 2: Renders `fellow.tagline`  
✅ **Problem Context** — Task 3 Step 2: "The Problem" section from `idea_context`  
✅ **The Idea** — Task 3 Step 2: "The Idea" section from `how_it_works`  
✅ **The Dream** — Task 3 Step 2: "The Dream" section from `the_dream`  
✅ **Organization Card** — Task 3 Step 2: Org name, sector, structure, links (website, LinkedIn)  
✅ **Related Fellows** — Task 3 Step 2: Grid of 4 related fellows from other sectors  
✅ **Back Link** — Task 3 Step 2: Footer with link to `/fellows`  
✅ **CSS Classes** — Task 1: All `.fellow-*` classes defined (hero, tagline, section, org-card, related, footer)  
✅ **Data Loading** — Task 2: `getFellow()` and `getRelatedFellows()` utilities  
✅ **Static Generation** — Task 3 Step 2: `generateStaticParams()` for all 11 fellows  
✅ **Responsive Design** — Task 1 Step 6: Mobile breakpoints for all sections  
✅ **Testing** — Task 3 Steps 4–7: Manual browser testing for rendering, 404, responsiveness  

**Gaps:** None identified. Spec is fully covered.

---

## Execution Options

**Plan complete and saved to `docs/superpowers/plans/2026-05-16-fellow-detail-pages.md`.**

Two execution options:

**1. Subagent-Driven (RECOMMENDED)** — I dispatch one agent per task (3 agents total). Task 1 and 2 run in parallel, Task 3 starts after both complete. Fast iteration with two-stage review per task.

**2. Inline Execution** — I execute all tasks in this session sequentially, with review checkpoints between them.

**Which approach do you prefer?**
