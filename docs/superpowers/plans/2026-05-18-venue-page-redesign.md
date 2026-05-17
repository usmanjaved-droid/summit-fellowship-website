# Venue Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the venue page to showcase Khoj Resort's beauty through a modern, image-driven layout with accurate information about weather, food, and facilities.

**Architecture:** Replace the current multi-section layout with a hero-driven experience: full-bleed hero image with text overlay, modernized intro with side-by-side image, accurate weather data, new food/dining section, and removal of "The Spaces" component. All content served from real resort images and researched data.

**Tech Stack:** Next.js Image component, CSS Modules (BEM), CSS variables for theming, React components

**Assets:**
- `public/images/venue/Khoj Resort main page.jpg` — Hero image
- `public/images/venue/Khoj 1.jpeg`, `Khoj 2.jpeg`, `Khoj 3.jpeg` — Supporting images

---

## Task 1: Update WEATHER Data with Accurate June Skardu Climate

**Files:**
- Modify: `app/venue/page.tsx:25-29`

- [ ] **Step 1: Replace WEATHER constant with accurate June data**

Based on research from [climate data](https://en.climate-data.org/asia/pakistan/gilgit-baltistan/skardu-28472/t/june-6/), update the weather array:

```typescript
const WEATHER = [
  { date: 'Typical day', icon: <SunIcon />, hi: '20°', lo: '7°' },
  { date: 'Warmest', icon: <PartIcon />, hi: '24°', lo: '' },
  { date: 'Coolest night', icon: <CloudIcon />, hi: '7°', lo: '' },
];
```

- [ ] **Step 2: Update weather section copy with accurate information**

Replace the weather copy section (around line 116-118) with:

```typescript
<p>Dry, sunny days with 9-10 hours of daily sunshine. Cool mornings (7°C) and comfortable afternoons (18-20°C). Occasional afternoon thunderstorms that pass quickly. The intense altitude sun requires SPF 50+.</p>
<p>Pack layers. A light fleece or windbreaker is essential for mornings and evenings. June averages 37-65% humidity and only ~4 rainy days monthly.</p>
```

- [ ] **Step 3: Commit**

```bash
git add app/venue/page.tsx
git commit -m "refactor: update weather data with accurate June Skardu climate"
```

---

## Task 2: Add Food/Dining Section with Khoj Restaurant Information

**Files:**
- Modify: `app/venue/page.tsx` (add new data constants and section)

- [ ] **Step 1: Add FOOD_ITEMS constant before the component**

Insert after WEATHER (around line 30):

```typescript
const FOOD_ITEMS = [
  { icon: '🥘', title: 'Balti Tandoori', desc: 'Grilled meats with regional spices and traditional firewood smoke — the soul of local cuisine.' },
  { icon: '🍖', title: 'BBQ & Grills', desc: 'Farm-to-table proteins prepared over open flame. Local specialties and international cuts.' },
  { icon: '🥗', title: 'Vegetarian & Halal', desc: 'Equally thoughtful preparation. Continental and local options available daily.' },
  { icon: '☕', title: 'Breakfast Buffet', desc: 'Continental, à la carte, and local options. Tea service all day. Fresh-baked bread.' },
];
```

- [ ] **Step 2: Add food section JSX before closing fragment**

Insert before the closing `</>` (before line 191):

```typescript
<section className="food-section">
  <div className="container">
    <div className="section-head">
      <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Dining</span></div>
      <h2>Where every<br /><em>meal matters.</em></h2>
      <p>Khoj's restaurant, Raah, sources locally and cooks with intention. Balti Tandoori, grilled meats, continental breakfast, and options for vegetarian and halal diets. Food here is part of the experience, not an afterthought.</p>
    </div>
    <div className="food-grid">
      {FOOD_ITEMS.map((item) => (
        <article key={item.title} className="food-card">
          <div className="food-card__icon">{item.icon}</div>
          <h3 className="food-card__title">{item.title}</h3>
          <p className="food-card__desc">{item.desc}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add app/venue/page.tsx
git commit -m "feat: add food and dining section with Khoj restaurant information"
```

---

## Task 3: Refactor Hero Section with Full-Bleed Image and Text Overlay

**Files:**
- Modify: `app/venue/page.tsx:14-28` (hero section)

- [ ] **Step 1: Replace hero section with image-backed design**

Replace the entire `<section className="page-hero">` block (lines 17-28) with:

```typescript
<section className="page-hero page-hero--with-image" style={{ backgroundImage: 'url(/images/venue/Khoj%20Resort%20main%20page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '600px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,39,52,0.3) 0%, rgba(20,39,52,0.5) 100%)' }} aria-hidden="true" />
  <div className="container page-hero__inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
    <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Venue</span></div>
    <h1 className="page-hero__title" style={{ fontSize: 'clamp(48px, 8vw, 90px)', color: 'var(--paper)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Khoj Resort, <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>Skardu.</em></h1>
    <p className="page-hero__subtitle" style={{ color: 'var(--parchment)', fontSize: 'clamp(16px, 2vw, 20px)' }}>Tucked into the Shigar valley with the Karakoram rising on every side. A deliberate retreat from city noise, signal, and obligation.</p>
  </div>
</section>
```

- [ ] **Step 2: Remove topo-bg div reference**

The old topo-bg div is no longer used (removed in refactor above).

- [ ] **Step 3: Commit**

```bash
git add app/venue/page.tsx
git commit -m "refactor: implement full-bleed hero image with text overlay"
```

---

## Task 4: Modernize Intro Section with Right-Side Image

**Files:**
- Modify: `app/venue/page.tsx:30-41` (venue-intro section)

- [ ] **Step 1: Update intro section to add real image on right**

Replace the `<section className="venue-intro">` block (lines 30-41) with:

```typescript
<section className="venue-intro">
  <div className="container venue-intro__grid">
    <div className="venue-intro__copy">
      <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">The venue</span></div>
      <h2>Where the<br /><em>work happens.</em></h2>
      <p>Khoj is deliberately remote. The flight in lands at 2,228 m — 35.30°N · 75.62°E, with June temperatures running 7–20°C. The drive from the airstrip threads the Shigar river through poplar groves and apricot orchards. By the time you arrive, your phone is no longer the most interesting thing in the room.</p>
      <p>The resort is small by design — built for groups exactly this size. Workshop spaces flow onto a stone courtyard. Walk five minutes in any direction and you&rsquo;re in the orchards, on the river bank, or at the foot of a rock face that did not exist on yesterday&rsquo;s horizon.</p>
      <p>Days alternate between structured studio sessions, outdoor 1-on-1 clinics, and the kind of unstructured time that only happens when eleven founders find themselves in a valley together with nothing else to do.</p>
    </div>
    <div className="venue-intro__image" style={{ backgroundImage: 'url(/images/venue/Khoj%201.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', minHeight: '500px' }} role="img" aria-label="Khoj Resort landscape and accommodations" />
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add app/venue/page.tsx
git commit -m "refactor: add real image to intro section right side"
```

---

## Task 5: Remove "The Spaces" Section

**Files:**
- Modify: `app/venue/page.tsx:164-188`

- [ ] **Step 1: Delete the entire spaces section**

Remove lines 164-188 (the `<section className="spaces">` block entirely):

```typescript
// DELETE THIS ENTIRE SECTION:
      <section className="spaces">
        <div className="container">
          <div className="spaces__head">
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">The spaces</span></div>
            <h2>Four rooms.<br /><em>One valley.</em></h2>
            <p>You&rsquo;ll move between these spaces over the week. Each was chosen for what it lets the group do, and for what it forbids — Khoj does not have a giant ballroom for a reason.</p>
          </div>
          <div className="space-grid">
            {SPACES.map((s) => (
              <article key={s.num} className="space-card">
                <div
                  className="space-card__image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(20,39,52,0.05), rgba(20,39,52,0.4)), url('${s.img}')` }}
                >
                  <span className="space-card__num">{s.num}</span>
                </div>
                <div className="space-card__body">
                  <h3 className="space-card__title">{s.title}</h3>
                  <p className="space-card__desc">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Remove SPACES data constant (top of file)**

Delete the SPACES constant (lines 7-12).

- [ ] **Step 3: Commit**

```bash
git add app/venue/page.tsx
git commit -m "refactor: remove 'the spaces' section"
```

---

## Task 6: Update CSS for Modern Layout (page.module.css)

**Files:**
- Modify: `app/venue/page.module.css`

- [ ] **Step 1: Add food-section styles**

Append to the end of page.module.css:

```css
/* Food Section */
.food-section {
  background: var(--paper);
  padding: 80px 0;
  margin-top: 60px;
}

.section-head {
  margin-bottom: 60px;
  text-align: center;
}

.section-head h2 {
  font-family: var(--serif);
  font-size: clamp(36px, 4vw, 56px);
  color: var(--alpine-deep);
  letter-spacing: -0.02em;
  margin: 20px 0;
  line-height: 1.1;
}

.section-head em {
  font-style: italic;
  color: var(--ochre);
}

.section-head p {
  font-size: 18px;
  color: var(--ink);
  max-width: 800px;
  margin: 20px auto 0;
  line-height: 1.6;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 40px;
}

.food-card {
  padding: 40px 30px;
  background: var(--paper-cool);
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.food-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(20, 39, 52, 0.1);
}

.food-card__icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.food-card__title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  color: var(--alpine-deep);
  margin-bottom: 12px;
}

.food-card__desc {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 0;
}

/* Hero with Image */
.page-hero--with-image {
  background-attachment: fixed;
}

@media (max-width: 1023px) {
  .food-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .food-card {
    padding: 32px 24px;
  }

  .page-hero--with-image {
    background-attachment: scroll;
    min-height: 500px;
  }
}
```

- [ ] **Step 2: Update venue-intro__image to be a styled div**

Add/update this in page.module.css:

```css
.venue-intro__image {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(20, 39, 52, 0.15);
  min-height: 500px;
}

@media (max-width: 1023px) {
  .venue-intro__image {
    min-height: 400px;
    margin-top: 32px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/venue/page.module.css
git commit -m "style: add modern layout styles for food section and hero image"
```

---

## Task 7: Test the Page in Browser

**Files:**
- None (testing only)

- [ ] **Step 1: Start development server**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000

- [ ] **Step 2: Navigate to venue page**

Open http://localhost:3000/venue

- [ ] **Step 3: Verify visual elements**

- [ ] Hero image displays full-bleed with readable text overlay
- [ ] Intro section shows real image on right side (Khoj 1.jpeg)
- [ ] Weather section shows accurate data (20°C high, 7°C low)
- [ ] Food section displays 4 cards with icons and descriptions
- [ ] "The Spaces" section is completely removed
- [ ] Layout is modern and clean on desktop
- [ ] Responsive layout works on tablet (1023px) and mobile (640px)
- [ ] No console errors or warnings

- [ ] **Step 4: Test responsive behavior**

Resize to 640px and 1024px breakpoints. Verify:
- Hero image scales smoothly
- Intro section stacks vertically on mobile
- Food grid becomes single column on mobile
- All text remains readable

---

## Task 8: Final Commit and Summary

**Files:**
- All modified files

- [ ] **Step 1: Verify all changes are committed**

```bash
git status
```

Expected: Working tree clean

- [ ] **Step 2: View recent commits**

```bash
git log --oneline -5
```

Expected: See 4-5 recent commits from this redesign

- [ ] **Step 3: Done**

Venue page redesign complete with:
- ✅ Full-bleed hero image (Khoj Resort main page.jpg)
- ✅ Modernized intro with side image (Khoj 1.jpeg)
- ✅ Accurate weather data (20°C high, 7°C low, 9-10 hrs sunshine)
- ✅ New food/dining section (Balti, BBQ, vegetarian, breakfast)
- ✅ Removed "The Spaces" section
- ✅ Modern, clean CSS layout

---

## Self-Review

**Spec Coverage:**
- ✅ Hero image with full-bleed background (Task 3)
- ✅ Real picture on right side of intro (Task 4)
- ✅ Accurate weather research & implementation (Task 1)
- ✅ Food section with research (Task 2)
- ✅ Remove "The Spaces" section (Task 5)
- ✅ Modern layout (Task 6)

**Placeholder Scan:** None found. All code blocks include complete implementation.

**Type Consistency:** All data constants (WEATHER, FOOD_ITEMS) and JSX match styling.

---

## Sources

- [Skardu Climate Data - June Weather](https://en.climate-data.org/asia/pakistan/gilgit-baltistan/skardu-28472/t/june-6/)
- [Khoj Resort Menu](https://www.khojresorts.com/khoj-resort-menu)
- [Khoj Resorts Shigar](https://www.khojresorts.com/shigar)
