# Venue Interactive Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an immersive scroll-driven journey section on the venue page that conveys remoteness, elevation, and arrival at Khoj Resort through animated landscape reveals and real-time elevation tracking.

**Architecture:** A client-side React component (`VenueJourney`) that listens to window scroll events, calculates scroll progress (0-1), binds that progress to SVG layer opacity and elevation numbers, and triggers secondary animations when scroll thresholds are reached. The component sits between the venue intro and the existing map section on `/app/venue/page.tsx`.

**Tech Stack:** React 19 (client component), vanilla JavaScript for scroll binding, SVG for landscape illustration, CSS animations for triggered reveals, requestAnimationFrame for smooth 60fps scroll performance.

---

## File Structure

**Files to create:**
- `app/components/VenueJourney.tsx` — Client component managing scroll state, elevation calculation, SVG rendering, and animation triggering
- SVG illustration (embedded inline in component) — Landscape with layered groups for progressive reveal

**Files to modify:**
- `app/venue/page.tsx` — Import and place `<VenueJourney />` component before the existing map section
- `app/venue/page.module.css` — Add `.venue-journey__*` classes for layout and styling

**No test files needed** (this is a UI component; verification via visual testing on dev server)

---

## Task Breakdown

### Task 1: Create VenueJourney Component Skeleton

**Files:**
- Create: `app/components/VenueJourney.tsx`

- [ ] **Step 1: Create base component file with scroll listener**

Create `app/components/VenueJourney.tsx`:

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/app/venue/page.module.css';

export function VenueJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress: 0 when section top hits viewport bottom, 1 when section top hits 30% of viewport
      const start = windowHeight;
      const end = windowHeight * 0.3;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, progress));

      setScrollProgress(clamped);
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className={styles['venue-journey']} ref={containerRef}>
      <div className={styles['venue-journey__inner']}>
        <div className={styles['venue-journey__content']}>
          {/* Elevation profile on left */}
          <div className={styles['venue-journey__elevation']}>
            <p>Elevation content here</p>
          </div>

          {/* Landscape SVG on right */}
          <div className={styles['venue-journey__landscape']}>
            <p>SVG landscape here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add basic CSS styling**

Add to `app/venue/page.module.css`:

```css
/* ===== Venue Journey Section ===== */
.venue-journey {
  background-color: var(--paper-warm);
  padding: 80px 32px;
  overflow: hidden;
}

.venue-journey__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.venue-journey__content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 48px;
  align-items: center;
  min-height: 600px;
}

.venue-journey__elevation {
  flex: 1;
}

.venue-journey__landscape {
  flex: 1;
}

/* Mobile: stack vertically */
@media (max-width: 640px) {
  .venue-journey {
    padding: 48px 16px;
  }

  .venue-journey__content {
    grid-template-columns: 1fr;
    gap: 24px;
    min-height: auto;
  }
}
```

- [ ] **Step 3: Test component renders without errors**

Run: `npm run dev`
Navigate to `/venue` in browser.
Expected: Page loads, no console errors. Section shows placeholder text.

- [ ] **Step 4: Commit**

```bash
git add app/components/VenueJourney.tsx app/venue/page.module.css
git commit -m "feat(venue): create VenueJourney component skeleton with scroll listener"
```

---

### Task 2: Implement Elevation Profile Display

**Files:**
- Modify: `app/components/VenueJourney.tsx`
- Modify: `app/venue/page.module.css`

- [ ] **Step 1: Calculate elevation from scroll progress**

Update `VenueJourney.tsx` to calculate current elevation:

```typescript
const MIN_ELEVATION = 1700;
const MAX_ELEVATION = 2228;
const currentElevation = Math.round(MIN_ELEVATION + scrollProgress * (MAX_ELEVATION - MIN_ELEVATION));
```

Add this after `setScrollProgress(clamped)` in the scroll handler.

Update the return JSX for the elevation section:

```typescript
<div className={styles['venue-journey__elevation']}>
  <div className={styles['venue-journey__elevation-scale']}>
    {/* Min altitude marker */}
    <div className={styles['venue-journey__altitude-marker']}>
      <span className={styles['venue-journey__altitude-label']}>Sea Level</span>
      <span className={styles['venue-journey__altitude-value']}>0 m</span>
    </div>

    {/* Vertical progress bar */}
    <div className={styles['venue-journey__progress-bar']}>
      <div
        className={styles['venue-journey__progress-fill']}
        style={{ height: `${scrollProgress * 100}%` }}
      />
    </div>

    {/* Airport marker */}
    <div className={styles['venue-journey__altitude-marker']}>
      <span className={styles['venue-journey__altitude-label']}>Skardu Airport</span>
      <span className={styles['venue-journey__altitude-value']}>1,700 m</span>
    </div>

    {/* Khoj marker */}
    <div className={styles['venue-journey__altitude-marker']}>
      <span className={styles['venue-journey__altitude-label']}>Khoj Resort</span>
      <span className={styles['venue-journey__altitude-value']}>2,228 m</span>
    </div>
  </div>

  {/* Current elevation display */}
  <div className={styles['venue-journey__current-elevation']}>
    <p className={styles['venue-journey__current-elevation-value']}>
      {currentElevation}
      <span className={styles['venue-journey__current-elevation-unit']}>m</span>
    </p>
  </div>
</div>
```

- [ ] **Step 2: Add CSS for elevation display**

Add to `app/venue/page.module.css`:

```css
.venue-journey__elevation-scale {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  height: 400px;
}

.venue-journey__altitude-marker {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.venue-journey__altitude-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--ochre);
}

.venue-journey__altitude-value {
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 400;
  color: var(--ink);
}

.venue-journey__progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: var(--line-soft);
  border-radius: 2px;
  overflow: hidden;
}

.venue-journey__progress-fill {
  width: 100%;
  background: linear-gradient(to top, var(--ochre), var(--clay));
  transition: height 0.05s linear;
}

.venue-journey__current-elevation {
  margin-top: 32px;
  padding: 24px;
  background-color: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  text-align: center;
}

.venue-journey__current-elevation-value {
  font-family: var(--font-serif);
  font-size: 48px;
  font-weight: 400;
  color: var(--alpine-deep);
  margin: 0;
}

.venue-journey__current-elevation-unit {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--ochre);
  margin-left: 8px;
}
```

- [ ] **Step 3: Test elevation display updates on scroll**

Run: `npm run dev`
Navigate to `/venue` and scroll slowly through the journey section.
Expected: Elevation number updates from 1,700m to 2,228m as you scroll. Progress bar fills from bottom to top.

- [ ] **Step 4: Commit**

```bash
git add app/components/VenueJourney.tsx app/venue/page.module.css
git commit -m "feat(venue): implement elevation profile display with real-time updates"
```

---

### Task 3: Create SVG Landscape Illustration

**Files:**
- Modify: `app/components/VenueJourney.tsx`

- [ ] **Step 1: Create SVG landscape with layered groups**

Replace the landscape placeholder in `VenueJourney.tsx`:

```typescript
<div className={styles['venue-journey__landscape']}>
  <svg
    viewBox="0 0 1000 600"
    xmlns="http://www.w3.org/2000/svg"
    className={styles['venue-journey__svg']}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a1820" />
        <stop offset="100%" stopColor="#142734" />
      </linearGradient>
      <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2a5a7f" />
        <stop offset="50%" stopColor="#1f4a6f" />
        <stop offset="100%" stopColor="#1a3d5a" />
      </linearGradient>
    </defs>

    {/* Sky background */}
    <rect width="1000" height="600" fill="url(#skyGradient)" />

    {/* Background: distant peaks (always visible) */}
    <g className={styles['journey__peaks-far']}>
      <polygon
        points="0,300 150,150 300,200 450,80 600,180 750,100 1000,250 1000,600 0,600"
        fill="#0f2835"
        opacity="0.3"
      />
      <polygon
        points="200,400 350,200 500,350 700,150 850,320 1000,250 1000,600 0,600"
        fill="#1a3d5a"
        opacity="0.2"
      />
    </g>

    {/* Mid-ground: foothills (fade in as you ascend) */}
    <g
      className={styles['journey__foothills']}
      style={{ opacity: Math.max(0, Math.min(1, scrollProgress * 1.5)) }}
    >
      <polygon
        points="50,350 200,250 350,320 500,200 650,300 800,220 950,350 1000,600 0,600"
        fill="#2a4d6a"
        opacity="0.5"
      />
      <polygon
        points="100,400 300,300 500,380 700,280 900,400 1000,600 0,600"
        fill="#1f3f52"
        opacity="0.4"
      />
    </g>

    {/* Shigar River (animated path, appears mid-journey) */}
    <path
      className={styles['journey__river']}
      d="M 0 500 Q 150 480 300 520 T 600 480 T 1000 550"
      fill="none"
      stroke="url(#riverGradient)"
      strokeWidth="12"
      strokeLinecap="round"
      style={{
        opacity: Math.max(0, scrollProgress - 0.3),
        strokeDasharray: 1000,
        strokeDashoffset: 1000 * (1 - Math.max(0, (scrollProgress - 0.3) / 0.4)),
      }}
    />

    {/* Valley floor: orchards (fade in as you approach) */}
    <g
      className={styles['journey__orchards']}
      style={{ opacity: Math.max(0, scrollProgress - 0.4) }}
    >
      {/* Simplified tree shapes */}
      <circle cx="150" cy="480" r="20" fill="#5a7a4a" opacity="0.6" />
      <circle cx="200" cy="500" r="22" fill="#5a7a4a" opacity="0.6" />
      <circle cx="250" cy="490" r="18" fill="#5a7a4a" opacity="0.6" />
      <circle cx="350" cy="510" r="24" fill="#5a7a4a" opacity="0.6" />
      <circle cx="450" cy="505" r="20" fill="#5a7a4a" opacity="0.6" />
      <circle cx="550" cy="515" r="22" fill="#5a7a4a" opacity="0.6" />
      <circle cx="650" cy="500" r="20" fill="#5a7a4a" opacity="0.6" />
      <circle cx="750" cy="520" r="24" fill="#5a7a4a" opacity="0.6" />
      <circle cx="850" cy="495" r="18" fill="#5a7a4a" opacity="0.6" />
    </g>

    {/* Khoj Resort (appears at end of journey) */}
    <g
      className={styles['journey__khoj']}
      style={{ opacity: Math.max(0, scrollProgress - 0.75) }}
    >
      {/* Building silhouette */}
      <rect x="450" y="380" width="100" height="80" fill="#8a4a3b" />
      {/* Roof */}
      <polygon points="450,380 500,340 550,380" fill="#6b3527" />
      {/* Windows */}
      <rect x="465" y="400" width="12" height="12" fill="#d4a574" />
      <rect x="490" y="400" width="12" height="12" fill="#d4a574" />
      <rect x="515" y="400" width="12" height="12" fill="#d4a574" />
      <rect x="465" y="425" width="12" height="12" fill="#d4a574" />
      <rect x="490" y="425" width="12" height="12" fill="#d4a574" />
      <rect x="515" y="425" width="12" height="12" fill="#d4a574" />
      {/* Label */}
      <text x="500" y="480" textAnchor="middle" fontSize="16" fill="#d4a574" fontFamily="Instrument Serif">
        Khoj
      </text>
    </g>
  </svg>
</div>
```

- [ ] **Step 2: Add SVG styling**

Add to `app/venue/page.module.css`:

```css
.venue-journey__svg {
  width: 100%;
  height: auto;
  max-height: 600px;
}

.journey__peaks-far {
  will-change: opacity;
}

.journey__foothills {
  will-change: opacity;
}

.journey__river {
  will-change: stroke-dashoffset, opacity;
}

.journey__orchards {
  will-change: opacity;
}

.journey__khoj {
  will-change: opacity;
}
```

- [ ] **Step 3: Test SVG layers reveal progressively on scroll**

Run: `npm run dev`
Navigate to `/venue` and scroll through the journey section.
Expected: 
- Sky and distant peaks visible immediately
- Foothills fade in as you scroll
- River animates in around mid-scroll
- Orchards fade in as you approach end
- Khoj Resort appears near the end

- [ ] **Step 4: Commit**

```bash
git add app/components/VenueJourney.tsx app/venue/page.module.css
git commit -m "feat(venue): create SVG landscape with layered progressive reveals"
```

---

### Task 4: Add Distance and Waypoint Markers

**Files:**
- Modify: `app/components/VenueJourney.tsx`
- Modify: `app/venue/page.module.css`

- [ ] **Step 1: Add waypoint text overlays**

Add this to the SVG (inside the landscape div, after the existing groups):

```typescript
{/* Distance and waypoint markers */}
<g className={styles['journey__waypoints']}>
  {/* Airport marker (0% - 30%) */}
  <g style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}>
    <text x="100" y="120" fontSize="12" fill="#d4a574" fontFamily="JetBrains Mono" fontWeight="600">
      SKARDU AIRPORT
    </text>
    <text x="100" y="140" fontSize="11" fill="#a39888" fontFamily="JetBrains Mono">
      1,700 m · Start
    </text>
  </g>

  {/* River crossing marker (30% - 60%) */}
  <g style={{ opacity: Math.max(0, Math.min(1, (scrollProgress - 0.3) / 0.3)) }}>
    <text x="450" y="450" fontSize="12" fill="#d4a574" fontFamily="JetBrains Mono" fontWeight="600">
      SHIGAR RIVER
    </text>
    <text x="450" y="470" fontSize="11" fill="#a39888" fontFamily="JetBrains Mono">
      30 min drive
    </text>
  </g>

  {/* Arrival marker (75% - 100%) */}
  <g style={{ opacity: Math.max(0, scrollProgress - 0.75) }}>
    <text x="500" y="320" fontSize="14" fill="#d4a574" fontFamily="Instrument Serif" fontWeight="400">
      You have arrived
    </text>
    <text x="500" y="345" fontSize="12" fill="#a39888" fontFamily="JetBrains Mono">
      KHOJ RESORT · 2,228 m
    </text>
  </g>
</g>
```

- [ ] **Step 2: Add CSS for waypoint text**

Add to `app/venue/page.module.css`:

```css
.journey__waypoints {
  will-change: opacity;
  pointer-events: none;
}
```

- [ ] **Step 3: Test waypoint markers appear and fade at correct scroll positions**

Run: `npm run dev`
Scroll through journey section.
Expected:
- Airport label visible at start, fades out by 30%
- River label appears at ~30%, visible until 60%
- Arrival label appears at ~75%, stays visible to end

- [ ] **Step 4: Commit**

```bash
git add app/components/VenueJourney.tsx app/venue/page.module.css
git commit -m "feat(venue): add waypoint markers with progressive opacity"
```

---

### Task 5: Integrate VenueJourney into Venue Page

**Files:**
- Modify: `app/venue/page.tsx`

- [ ] **Step 1: Import VenueJourney component**

At the top of `app/venue/page.tsx`, add:

```typescript
import { VenueJourney } from '@/app/components/VenueJourney';
```

- [ ] **Step 2: Place VenueJourney before the map section**

In the return JSX, find the line `<section className="map-section">` and insert the component right before it:

```typescript
      </section>

      {/* Interactive Journey Section */}
      <VenueJourney />

      {/* Existing Map Section */}
      <section className="map-section">
```

- [ ] **Step 3: Test full page integration**

Run: `npm run dev`
Navigate to `/venue`.
Expected:
- Venue hero displays normally
- Venue intro displays normally
- VenueJourney section appears between intro and map
- Scrolling through journey section works smoothly
- Map section appears below

- [ ] **Step 4: Commit**

```bash
git add app/venue/page.tsx
git commit -m "feat(venue): integrate VenueJourney component into venue page"
```

---

### Task 6: Optimize Performance and Add Accessibility

**Files:**
- Modify: `app/components/VenueJourney.tsx`
- Modify: `app/venue/page.module.css`

- [ ] **Step 1: Add prefers-reduced-motion support**

Update the scroll handler in `VenueJourney.tsx`:

```typescript
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

useEffect(() => {
  const handleScroll = () => {
    if (!containerRef.current) return;

    if (prefersReducedMotion) {
      setScrollProgress(1);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const start = windowHeight;
    const end = windowHeight * 0.3;
    const progress = (start - rect.top) / (start - end);
    const clamped = Math.max(0, Math.min(1, progress));
    setScrollProgress(clamped);
  };
  // ... rest of useEffect
}, [prefersReducedMotion]);
```

- [ ] **Step 2: Test with prefers-reduced-motion enabled**

Open DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion: reduce
Expected: Scroll no longer triggers animations. SVG should show final state immediately.

- [ ] **Step 3: Verify 60fps performance**

Open DevTools → Performance tab. Record a scroll through the journey section.
Expected: Frame rate stays above 60fps. No long tasks or layout thrashing.

- [ ] **Step 4: Add CSS will-change hints**

(Already added in previous task, verify it's there)

- [ ] **Step 5: Test on mobile devices**

Test on mobile viewport (320px, 375px widths).
Expected: Layout stacks vertically, SVG scales appropriately, scrolling is smooth.

- [ ] **Step 6: Commit**

```bash
git add app/components/VenueJourney.tsx
git commit -m "perf(venue): add prefers-reduced-motion support and optimize for 60fps"
```

---

### Task 7: Final Visual Polish and Responsive Testing

**Files:**
- Modify: `app/venue/page.module.css`

- [ ] **Step 1: Test responsive layout on tablet**

View at 768px width.
Expected: Elevation profile and SVG are still side-by-side but with adjusted proportions.

- [ ] **Step 2: Adjust grid proportions for tablet**

Add to `app/venue/page.module.css`:

```css
@media (max-width: 1023px) {
  .venue-journey__content {
    grid-template-columns: 1fr 2fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .venue-journey__content {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Test all viewport sizes**

Test at: 320px, 375px, 768px, 1024px, 1440px
Expected: Layout reflows appropriately, SVG scales without distortion, text remains readable.

- [ ] **Step 4: Visual comparison with design spec**

Compare journey section against spec screenshot/description.
Expected: Elevation profile shows 1700-2228m range, landscape layers reveal progressively, waypoint labels appear at correct moments.

- [ ] **Step 5: Cross-browser testing**

Test in: Chrome, Firefox, Safari (if available)
Expected: Animations smooth, no console errors, layout correct.

- [ ] **Step 6: Final commit**

```bash
git add app/venue/page.module.css
git commit -m "style(venue): polish responsive design for tablet and mobile"
```

---

### Task 8: Documentation and Deployment Readiness

**Files:**
- Modify: `CLAUDE.md` (optional, if updating docs)

- [ ] **Step 1: Verify no console errors or warnings**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors, no console warnings.

- [ ] **Step 2: Test on production build**

Run: `npm run start`
Navigate to `/venue`.
Expected: Journey section works identically to dev mode.

- [ ] **Step 3: Performance audit (Lighthouse)**

Run Lighthouse audit on `/venue` page.
Expected: Performance > 90, Accessibility > 90, Best Practices > 90.

- [ ] **Step 4: Final visual check**

Do a full scroll through `/venue` page from top to bottom.
Expected: Hero → Intro → Journey (with smooth scroll animations) → Map → Spaces all flow naturally and look cohesive.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "docs(venue): ready for deployment - interactive journey complete"
```

---

## Implementation Notes

- **SVG coordinates:** The current SVG viewBox is `0 0 1000 600`. Adjust proportions as needed for the actual landscape aesthetic.
- **Elevation calculations:** Hardcoded as 1700m (airport) to 2228m (Khoj). These are accurate based on spec.
- **Scroll binding:** Uses `scrollProgress = 0` at container top hitting viewport bottom, `1` at container top hitting 30% of viewport. Adjust thresholds if journey feels too fast/slow.
- **River animation:** Uses `stroke-dasharray` + `stroke-dashoffset` for smooth line drawing. Total path length must be calculated or set conservatively (~1000px).
- **Accessibility:** SVG is `aria-hidden="true"` since it's decorative. All text is in HTML overlays, so screen readers can access content.
- **Optimization:** `requestAnimationFrame` prevents jank. `will-change` hints on animated elements improve paint performance.

---

## Success Criteria

✅ Scroll-linked elevation profile climbs from 1,700m to 2,228m as user scrolls
✅ Landscape layers (foothills, river, orchards, Khoj) reveal progressively
✅ Waypoint markers appear and fade at correct scroll positions
✅ Smooth 60fps animation with no jank on scroll
✅ Respects `prefers-reduced-motion` (shows final state, no animations)
✅ Responsive design: works on mobile (320px), tablet (768px), desktop (1440px)
✅ Integrated into venue page, sits above existing map section
✅ No TypeScript errors, builds successfully, passes Lighthouse audit
✅ Visual style matches spec (illustrative, hand-drawn, warm palette)

---

## Testing Checklist

Before marking complete:
- [ ] Scrolled through journey on desktop (smooth, no jank)
- [ ] Scrolled through journey on mobile (layout stacks, still smooth)
- [ ] Elevation numbers update correctly (1700 → 2228)
- [ ] River animates in at ~30% scroll
- [ ] Orchards appear at ~40% scroll
- [ ] Khoj appears at ~75% scroll
- [ ] Waypoint text appears/disappears at right times
- [ ] prefers-reduced-motion works (no animations, final state shown)
- [ ] Build succeeds (`npm run build`)
- [ ] Production build works (`npm run start`)
- [ ] Lighthouse score > 90 on Performance
- [ ] Page flows naturally: Hero → Intro → Journey → Map → Spaces
- [ ] No console errors or warnings
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
