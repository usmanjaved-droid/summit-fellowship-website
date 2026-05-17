# Fellow Detail Page Design Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the fellow detail pages with the site-wide design language by fixing 12 design inconsistencies and reorganizing navigation to appear at the top of the page, while preserving the editorial aesthetic.

**Architecture:** Implement changes in two phases: (1) Structural/component reorganization (navigation positioning, component layout), and (2) CSS updates (typography, colors, spacing, borders, shadows, animations, hover states). Each phase will be broken into focused tasks that address related design deviations. Changes prioritize using global design tokens (CSS variables, spacing scale, color palette) instead of custom values, simplifying responsive patterns, and adding visual hierarchy through color and motion.

**Tech Stack:** Next.js 16.2.6, React 19.2.4, TypeScript 5+, CSS Modules (BEM convention), CSS variables from `app/globals.css`

---

## File Structure

**Files to modify:**
- `app/fellows/[slug]/page.tsx` — Reorder components, update FellowNavigation positioning
- `app/fellows/[slug]/page.module.css` — Comprehensive CSS updates (typography, colors, spacing, shadows, animations, responsive behavior)

**Files to delete:**
- `app/fellows/[slug]/components/FellowDrawer.tsx` — Mobile drawer component will be eliminated; sidebar will reflow responsively instead

**Files to simplify (may require minor updates):**
- `app/fellows/[slug]/components/FellowNavigation.tsx` — Update CSS class usage (no major logic changes needed)
- `app/fellows/[slug]/components/FellowSidebar.tsx` — Update to remove sticky positioning, simplify styling

---

## Phase 1: Structural Reorganization

### Task 1: Move FellowNavigation to Top of Page (Above Hero Section)

**Files:**
- Modify: `app/fellows/[slug]/page.tsx:52-69`

**Background:** Currently, FellowNavigation appears after IdeaBand (line 57), below two major visual sections. This is inconsistent with standard web patterns where navigation appears at the top. The navigation should appear before the hero section, allowing users to see navigation options immediately upon page load.

- [ ] **Step 1: Update JSX structure to move FellowNavigation above FellowHero**

In `app/fellows/[slug]/page.tsx`, replace the entire return block (lines 52–69) with:

```typescript
return (
  <div className={styles['fellow-detail']}>
    <FellowNavigation prevFellow={prevFellow || undefined} nextFellow={nextFellow || undefined} />

    <FellowHero fellow={fellow} />
    <IdeaBand fellow={fellow} />

    <div className={styles['fellow-detail__body']}>
      <div className={styles['fellow-detail__content']}>
        <FellowSection title="The Mission" content={fellow.mission} />
        <FellowSection title="How It Works" content={fellow.how_it_works} />
        <FellowSection title="The Dream" content={fellow.the_dream} />
      </div>
      <FellowSidebar fellow={fellow} />
    </div>
  </div>
);
```

The FellowNavigation now renders first, before FellowHero.

- [ ] **Step 2: Build the project**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 3: Start dev server and verify navigation position**

```bash
npm run dev
```

Navigate to any fellow detail page (e.g., `http://localhost:3000/fellows/rubeena-kidwai`). Verify:
- Navigation bar appears **at the very top**, before the alpine hero section
- Navigation links (← Previous, Back to all fellows, Next →) are visible and functional
- No layout shifts or visual glitches

- [ ] **Step 4: Commit**

```bash
git add app/fellows/\[slug\]/page.tsx
git commit -m "refactor: move FellowNavigation to top of page above hero section"
```

---

### Task 2: Remove FellowDrawer Component and Simplify Sidebar Rendering

**Files:**
- Delete: `app/fellows/[slug]/components/FellowDrawer.tsx`
- Modify: `app/fellows/[slug]/page.tsx` — Remove FellowDrawer import/usage if present (verify line 1-8)
- Modify: `app/fellows/[slug]/page.module.css` — Remove all `.fellow-drawer-*` CSS (lines 260–381)

**Background:** The custom drawer modal for mobile is a non-standard pattern. Instead, the sidebar will use responsive CSS Grid to reflow into a full-width section on mobile, matching standard responsive design patterns used elsewhere on the site.

- [ ] **Step 1: Delete the FellowDrawer component file**

```bash
rm app/fellows/\[slug\]/components/FellowDrawer.tsx
```

- [ ] **Step 2: Verify FellowDrawer is not imported in page.tsx**

Read `app/fellows/[slug]/page.tsx` lines 1–8 to check if FellowDrawer is imported. If found, remove the import line.

- [ ] **Step 3: Remove FellowDrawer CSS from page.module.css**

In `app/fellows/[slug]/page.module.css`, delete all CSS rules from line 260 (`.fellow-drawer {`) through line 381 (end of drawer styles including the `slideInRight` keyframe animation). This removes approximately 122 lines of drawer-specific styling.

After deletion, the file should jump from line 259 (end of sidebar styles) directly to line 382 (start of `.fellow-navigation` styles).

- [ ] **Step 4: Build and verify no errors**

```bash
npm run build
```

Expected: Build completes without errors (no unused imports).

- [ ] **Step 5: Commit**

```bash
git add app/fellows/\[slug\]/components/ app/fellows/\[slug\]/page.module.css
git commit -m "refactor: remove FellowDrawer component; sidebar will reflow responsively on mobile"
```

---

## Phase 2: CSS Modernization and Unification

### Task 3: Standardize Hero Section Typography and Spacing

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:4-107`

**Background:** The hero section uses custom font sizing (`clamp(32px, 7vw, 56px)`) and large padding (80px). This task standardizes these to use the global design system more consistently while maintaining the visual scale.

- [ ] **Step 1: Update hero section padding and font sizing**

In `app/fellows/[slug]/page.module.css`, replace the `.fellow-hero` rule (lines 4–10) with:

```css
.fellow-hero {
  position: relative;
  background-color: var(--alpine-deep);
  color: var(--parchment);
  overflow: hidden;
  padding: 64px 32px;
}
```

Change from `80px 32px` to `64px 32px` (reduce vertical padding to match spacing scale).

- [ ] **Step 2: Update hero name font sizing to be more predictable**

Find `.fellow-hero__name` (around line 38–46) and replace with:

```css
.fellow-hero__name {
  font-family: var(--serif);
  font-size: 52px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 0 0 24px 0;
  color: white;
}
```

Changes:
- `clamp(32px, 7vw, 56px)` → `52px` (fixed, matches global typography scale better)
- `letter-spacing: -0.015em` → `-0.01em` (use global standard)
- `line-height: 1.2` → `1.15` (tighter, more editorial)
- `margin: 0 0 32px 0` → `0 0 24px 0` (use spacing scale: 24px = space-6)

- [ ] **Step 3: Update mobile hero padding**

Find the mobile hero rule `@media (max-width: 640px)` (around line 86–107) and update `.fellow-hero` within it:

```css
@media (max-width: 640px) {
  .fellow-hero {
    padding: 40px 16px;
  }
  
  /* ... rest of mobile styles ... */
}
```

Change from `48px 16px` to `40px 16px` (align with reduced desktop padding).

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Start dev server and visually verify**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- Hero name appears at 52px (noticeably smaller than before, still prominent)
- Padding around hero section feels less excessive
- Letter-spacing on name looks tighter but still elegant
- Text remains readable and well-proportioned

- [ ] **Step 6: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: standardize hero typography and reduce padding to match global spacing scale"
```

---

### Task 4: Standardize Body Section Spacing and Container Width

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:466-488`

**Background:** The body section uses custom `max-width: 1400px` instead of the global `--container: 1320px`, and padding of `80px 32px`. This task aligns body spacing with the global system.

- [ ] **Step 1: Update body section container width and padding**

Find `.fellow-detail__body` (around line 466–474) and replace with:

```css
.fellow-detail__body {
  max-width: var(--container);
  margin: 0 auto;
  width: 100%;
  padding: 64px 32px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
}
```

Changes:
- `max-width: 1400px` → `max-width: var(--container)` (use global, which is 1320px)
- `padding: 80px 32px` → `padding: 64px 32px` (reduce to match hero)
- `gap: 64px` → `gap: 48px` (use spacing scale: space-12)

- [ ] **Step 2: Update tablet breakpoint spacing**

Find the tablet media query `@media (max-width: 1023px)` (around line 482–488) and update:

```css
@media (max-width: 1023px) {
  .fellow-detail__body {
    grid-template-columns: 1fr;
    padding: 48px 24px;
    gap: 32px;
  }
}
```

Changes:
- `padding: 48px 24px` → `48px 24px` (reduce from previous 48px 24px; stays consistent)
- `gap: 32px` → `32px` (use spacing scale: space-8)

- [ ] **Step 3: Update mobile breakpoint spacing**

Find the mobile media query `@media (max-width: 640px)` (around line 491–500) and update:

```css
@media (max-width: 640px) {
  .fellow-detail__body {
    padding: 32px 16px;
    gap: 24px;
  }

  .fellow-detail__content {
    max-width: none;
  }
}
```

Changes:
- `padding: 32px 16px` → `32px 16px` (align with hero mobile padding)
- `gap: 24px` → `24px` (use spacing scale: space-6)

- [ ] **Step 4: Update content max-width to use character-based constraint more conservatively**

Find `.fellow-detail__content` (around line 476–479) and update:

```css
.fellow-detail__content {
  flex: 1;
  max-width: 70ch;
}
```

Change from `75ch` to `70ch` (slightly narrower for better readability with serif font, more conservative).

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 6: Visual verification on dev server**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- Body content aligns to global `--container` width (1320px max)
- Padding feels more consistent across page (64px top/bottom sections)
- Gap between content and sidebar is 48px (reasonable spacing)
- Responsive breakpoints work: tablet stacks to single column, mobile padding reduces appropriately
- Content remains readable at 70ch width

- [ ] **Step 7: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: align body spacing and container width with global design system"
```

---

### Task 5: Rewrite Section Title and Label Styling to Use Global Eyebrow Class

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:143-183` (section titles)
- Modify: `app/fellows/[slug]/page.module.css:197-215` (sidebar labels)

**Background:** Both `.fellow-section__title` and `.fellow-sidebar__label` duplicate the global `.eyebrow` class styling. This task removes the duplication by standardizing all labels to reference global styles while allowing component-specific overrides if needed.

- [ ] **Step 1: Refactor section title styling**

In `app/fellows/[slug]/page.module.css`, replace `.fellow-section__title` (lines 148–157) with:

```css
.fellow-section__title {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--ochre);
  margin: 0 0 20px 0;
}
```

Changes:
- Remove `word-spacing: 0.2em;` (non-standard, not used in global system)
- Change color from `var(--clay)` to `var(--ochre)` (primary accent, matches site-wide pattern for emphasized labels)
- Change margin from `0 0 24px 0` to `0 0 20px 0` (tighter, matches spacing scale space-5)

- [ ] **Step 2: Update section title styling for mobile**

In the mobile media query (around line 175–182), ensure the title styling remains:

```css
@media (max-width: 640px) {
  .fellow-section {
    margin-bottom: 32px;
  }

  .fellow-section__content {
    font-size: 15px;
  }
}
```

The title styling doesn't need media-specific changes.

- [ ] **Step 3: Refactor sidebar label styling**

Find `.fellow-sidebar__label` (around line 205–215) and replace with:

```css
.fellow-sidebar__label {
  display: block;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--ochre);
  margin-bottom: 8px;
}
```

Changes:
- Remove `word-spacing: 0.2em;`
- Change color from `var(--clay)` to `var(--ochre)`

- [ ] **Step 4: Verify no other places use word-spacing**

Search for `word-spacing` in the file:

```bash
grep "word-spacing" app/fellows/\[slug\]/page.module.css
```

Expected: No results (all `word-spacing` removed).

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 6: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- Section titles ("The Mission", "How It Works", "The Dream") are now **ochre/golden** (primary accent color)
- Sidebar labels (Organization, Geography, Sector, etc.) are also **ochre**
- Text appears crisp without word-spacing
- Labels have proper hierarchy (match site-wide pattern)

- [ ] **Step 7: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: standardize section and sidebar labels to use ochre accent color, remove non-standard word-spacing"
```

---

### Task 6: Update Idea Band Styling for Better Hierarchy and Typography

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:109-141`

**Background:** The idea band currently uses plain serif italic text. This task improves visual hierarchy by adding an accent color indicator and adjusting sizing to feel more intentional.

- [ ] **Step 1: Update idea band inner container and tagline**

Find `.idea-band` (lines 110–114) and replace with:

```css
.idea-band {
  background-color: var(--clay);
  padding: 48px 32px;
  text-align: center;
  border-left: 4px solid var(--ochre);
}
```

Changes:
- Add `border-left: 4px solid var(--ochre);` (left accent line, visual hierarchy cue)
- `padding: 40px 32px` → `48px 32px` (more breathing room, matches spacing scale)

- [ ] **Step 2: Update tagline typography**

Find `.idea-band__tagline` (lines 121–131) and replace with:

```css
.idea-band__tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: 18px;
  line-height: 1.7;
  color: var(--parchment);
  margin: 0 auto;
  max-width: 80ch;
}
```

Changes:
- `font-size: 20px` → `18px` (slightly smaller, more refined)
- `line-height: 1.6` → `1.7` (more generous line spacing for serif italic)
- Remove explicit `margin-left: auto; margin-right: auto;` (replace with `margin: 0 auto`)

- [ ] **Step 3: Update mobile idea band styling**

Find the mobile media query for idea-band (around line 133–140) and replace with:

```css
@media (max-width: 640px) {
  .idea-band {
    padding: 32px 16px;
  }

  .idea-band__tagline {
    font-size: 16px;
  }
}
```

Changes:
- `padding: 32px 16px` → `32px 16px` (consistent mobile padding, down from 40px 32px)
- `font-size: 16px` (matches body text size for mobile)

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- Idea band has a **golden/ochre left border** (4px accent line)
- Text is parchment color (already fixed in earlier tasks)
- Tagline at 18px feels more refined
- Padding at 48px feels spacious but not excessive
- Mobile version drops to 32px padding and 16px font size

- [ ] **Step 6: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: enhance idea band with ochre left accent border and refined typography sizing"
```

---

### Task 7: Standardize Navigation Link Styling and Add Hover States with Transitions

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:383-457`

**Background:** Navigation links currently use plain text with `--clay` background hover states. This task adds proper transitions, uses `--ochre` for accent hover effects, and adds focus states for accessibility.

- [ ] **Step 1: Update navigation link base styling**

Find `.fellow-navigation__link` (around line 415–423) and replace with:

```css
.fellow-navigation__link {
  font-size: 14px;
  color: var(--alpine-deep);
  text-decoration: none;
  transition: all 200ms ease-out;
  padding: 12px 12px;
  display: inline-block;
  border-radius: 4px;
  background-color: transparent;
  position: relative;
}
```

Changes:
- `transition: all 150ms ease-out` → `all 200ms ease-out` (slightly longer, smoother)
- `margin: -8px` removed (use padding-based spacing instead)
- Add `background-color: transparent;` (explicit, for smooth transition)
- Add `position: relative;` (for potential underline effects)

- [ ] **Step 2: Update navigation link hover state**

Find `.fellow-navigation__link:hover` (around line 425–428) and replace with:

```css
.fellow-navigation__link:hover {
  background-color: var(--ochre);
  color: white;
  transform: translateY(-2px);
}
```

Changes:
- `background-color: var(--clay)` → `var(--ochre)` (primary accent color, matches site-wide patterns)
- Add `transform: translateY(-2px);` (subtle lift effect on hover, adds motion)

- [ ] **Step 3: Add focus state for keyboard navigation (accessibility)**

After the `.fellow-navigation__link:hover` rule, add:

```css
.fellow-navigation__link:focus-visible {
  outline: 2px solid var(--ochre);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Update mobile navigation stacking**

Find the mobile media query for navigation (around line 431–457) and ensure it's:

```css
@media (max-width: 640px) {
  .fellow-navigation {
    padding: 20px 16px;
    margin-top: 24px;
  }

  .fellow-navigation__grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .fellow-navigation__col {
    width: 100%;
  }

  .fellow-navigation__col--left,
  .fellow-navigation__col--center,
  .fellow-navigation__col--right {
    justify-content: center;
  }

  .fellow-navigation__link {
    display: block;
    text-align: center;
    width: 100%;
  }
}
```

Changes:
- `gap: 16px` → `gap: 12px` (tighter stack on mobile)
- `margin-top: 32px` → `margin-top: 24px` (less space before navigation on mobile)

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 6: Visual verification on dev server**

```bash
npm run dev
```

Navigate to a fellow detail page. Test:
- Hover over navigation links → background turns **ochre**, text turns white, link lifts slightly (translateY -2px)
- Transition is smooth (200ms)
- Press Tab to navigate to links → **ochre outline** appears around link (focus state)
- Mobile: links stack vertically, hover effect still works

- [ ] **Step 7: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: enhance navigation links with ochre hover state, smooth transitions, and keyboard focus indicators"
```

---

### Task 8: Standardize Sidebar Link Styling (Matching Navigation)

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:224-244`

**Background:** Sidebar links (LinkedIn, Website) currently have the same hover issues as navigation. This task aligns sidebar link styling with the newly updated navigation links.

- [ ] **Step 1: Update sidebar link base styling**

Find `.fellow-sidebar__link` (around line 230–239) and replace with:

```css
.fellow-sidebar__link {
  font-size: 14px;
  color: var(--alpine-deep);
  text-decoration: none;
  transition: all 200ms ease-out;
  padding: 10px 10px;
  display: inline-block;
  border-radius: 4px;
  background-color: transparent;
  position: relative;
}
```

Changes:
- `transition: all 150ms ease-out` → `all 200ms ease-out` (match navigation)
- `margin: -8px` removed (use padding instead)
- Add `background-color: transparent;` and `position: relative;`

- [ ] **Step 2: Update sidebar link hover state**

Find `.fellow-sidebar__link:hover` (around line 241–244) and replace with:

```css
.fellow-sidebar__link:hover {
  background-color: var(--ochre);
  color: white;
  transform: translateX(2px);
}
```

Changes:
- `background-color: var(--clay)` → `var(--ochre)` (primary accent)
- Remove `text-decoration: underline;` (already removed in prior tasks)
- `transform: translateY(-2px)` → `translateX(2px)` (subtle rightward shift instead of lift, suits sidebar context)

- [ ] **Step 3: Add focus state for keyboard navigation**

After `.fellow-sidebar__link:hover`, add:

```css
.fellow-sidebar__link:focus-visible {
  outline: 2px solid var(--ochre);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page (desktop). Verify:
- Hover over sidebar links (LinkedIn, Website) → **ochre background**, white text, subtle rightward shift
- Transition is smooth
- Tab to focus → **ochre outline**

- [ ] **Step 6: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: align sidebar link styling with navigation; add ochre hover state and transitions"
```

---

### Task 9: Update Sidebar Styling to Remove Sticky Positioning and Simplify Responsive Behavior

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:185-258`

**Background:** The sidebar currently uses `position: sticky; top: 80px;` (custom pattern) and hides at 1023px. This task removes sticky positioning and simplifies responsive behavior to match standard responsive patterns.

- [ ] **Step 1: Remove sticky positioning from sidebar**

Find `.fellow-sidebar` (around line 186–195) and replace with:

```css
.fellow-sidebar {
  background-color: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 32px;
  height: fit-content;
  max-width: 100%;
}
```

Changes:
- Remove `position: sticky;`
- Remove `top: 80px;`
- Keep `height: fit-content;` (content-based height)

- [ ] **Step 2: Ensure responsive hiding is correct**

Find the tablet media query `@media (max-width: 1023px)` within sidebar (around line 247–251) and verify:

```css
@media (max-width: 1023px) {
  .fellow-sidebar {
    display: none;
  }
}
```

This remains unchanged (sidebar still hidden on tablet/mobile for now).

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 4: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page (desktop). Verify:
- Sidebar no longer sticks to viewport
- Scrolling through content causes sidebar to scroll naturally with page
- Sidebar appears next to content on desktop
- On tablet/mobile, sidebar is hidden

- [ ] **Step 5: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: remove sticky positioning from sidebar; simplify to standard responsive reflow"
```

---

### Task 10: Add Motion and Transitions — Page Load Animations

**Files:**
- Modify: `app/fellows/[slug]/page.module.css` (add new keyframes and animations)

**Background:** The fellow detail pages lack motion design. This task adds subtle page load animations (staggered reveals of sections) that match modern web design patterns and provide visual delight without being distracting.

- [ ] **Step 1: Add fade-in keyframe animation**

At the end of `app/fellows/[slug]/page.module.css` (before final closing braces), add:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

- [ ] **Step 2: Apply animation to FellowHero**

Update `.fellow-hero` to add animation:

```css
.fellow-hero {
  /* ... existing styles ... */
  animation: fadeIn 600ms ease-out;
}
```

- [ ] **Step 3: Apply staggered animation to IdeaBand**

Update `.idea-band` to add animation:

```css
.idea-band {
  /* ... existing styles ... */
  animation: fadeInUp 600ms ease-out 150ms both;
}
```

The `150ms` delay creates a stagger effect.

- [ ] **Step 4: Apply staggered animation to navigation**

Update `.fellow-navigation` to add animation:

```css
.fellow-navigation {
  /* ... existing styles ... */
  animation: fadeInUp 600ms ease-out 300ms both;
}
```

- [ ] **Step 5: Apply staggered animation to body content**

Update `.fellow-detail__body` to add animation:

```css
.fellow-detail__body {
  /* ... existing styles ... */
  animation: fadeInUp 600ms ease-out 450ms both;
}
```

This creates a cascading reveal: Hero → IdeaBand → Navigation → Content (with 150ms stagger between each).

- [ ] **Step 6: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 7: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- Hero fades in smoothly
- IdeaBand fades in and slides up (staggered 150ms after hero)
- Navigation fades in and slides up (staggered 150ms after idea band)
- Content fades in and slides up (staggered 150ms after navigation)
- Total page load animation: ~600ms hero, ending with content at 1050ms
- Animation feels polished and not jarring

- [ ] **Step 8: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "feat: add staggered page load animations (fadeIn, fadeInUp) for enhanced visual polish"
```

---

### Task 11: Enhance Section Content Typography and Add Visual Separation

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:143-183`

**Background:** Content sections (Mission, How It Works, Dream) currently have minimal visual separation. This task adds subtle background alternation and improves typography for better readability and visual hierarchy.

- [ ] **Step 1: Update section spacing and add background alternation**

Find `.fellow-section` (around line 144–146) and replace with:

```css
.fellow-section {
  margin-bottom: 56px;
  padding: 0;
}

.fellow-section:nth-child(odd) {
  background-color: transparent;
}

.fellow-section:nth-child(even) {
  background-color: var(--paper-warm);
  padding: 32px;
  border-radius: 4px;
  margin-left: -32px;
  margin-right: -32px;
  padding-left: 64px;
  margin-bottom: 56px;
}
```

Changes:
- Add `margin-bottom: 56px;` (space-14, more generous spacing between sections)
- Add alternating background pattern (even sections get subtle warm background)
- Even sections get padding and rounded corners (subtle card effect)

- [ ] **Step 2: Update content paragraph spacing**

Find `.fellow-section__content p` (around line 167–173) and replace with:

```css
.fellow-section__content p {
  margin: 0 0 20px 0;
}

.fellow-section__content p:last-child {
  margin-bottom: 0;
}
```

Changes:
- `margin: 0 0 16px 0` → `0 0 20px 0` (more breathing room between paragraphs, use space-5)

- [ ] **Step 3: Adjust mobile section styling**

In the mobile media query, update:

```css
@media (max-width: 640px) {
  .fellow-section {
    margin-bottom: 40px;
  }

  .fellow-section:nth-child(even) {
    margin-left: 0;
    margin-right: 0;
    padding-left: 32px;
    padding-right: 32px;
  }

  .fellow-section__content {
    font-size: 15px;
  }
}
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- Sections have clear 56px spacing between them
- Odd sections (1st: "The Mission", 3rd: "The Dream") have transparent background
- Even sections (2nd: "How It Works") have subtle warm background with padding and rounded corners
- Paragraphs have 20px spacing
- Mobile view: sections stack with no left/right margin, background still visible
- Alternating pattern creates visual rhythm

- [ ] **Step 6: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: add alternating background pattern to sections and increase paragraph spacing for better rhythm"
```

---

### Task 12: Add Subtle Border and Shadow Details for Depth

**Files:**
- Modify: `app/fellows/[slug]/page.module.css` (add/update border and shadow rules)

**Background:** The current design is flat with minimal shadows. This task adds subtle shadows to cards and borders to key sections to create visual depth and hierarchy, matching patterns used on other pages.

- [ ] **Step 1: Add subtle shadow to sidebar**

Find `.fellow-sidebar` (around line 186–195) and add shadow:

```css
.fellow-sidebar {
  background-color: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 32px;
  height: fit-content;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

Add: `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);` (subtle, soft shadow)

- [ ] **Step 2: Add border to navigation section**

Verify `.fellow-navigation` has:

```css
.fellow-navigation {
  border-top: 1px solid var(--line);
  padding: 28px 32px;
  margin-top: 48px;
}
```

This is already present; no changes needed.

- [ ] **Step 3: Add subtle borders to section alternation**

Find `.fellow-section:nth-child(even)` (from previous task) and add border:

```css
.fellow-section:nth-child(even) {
  background-color: var(--paper-warm);
  padding: 32px;
  border-radius: 4px;
  border: 1px solid var(--line-soft);
  margin-left: -32px;
  margin-right: -32px;
  padding-left: 64px;
  margin-bottom: 56px;
}
```

Add: `border: 1px solid var(--line-soft);` (very subtle border)

- [ ] **Step 4: Add shadow to idea band**

Find `.idea-band` (around line 110–114) and add shadow:

```css
.idea-band {
  background-color: var(--clay);
  padding: 48px 32px;
  text-align: center;
  border-left: 4px solid var(--ochre);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
```

Add: `box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);` (very subtle, barely visible)

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 6: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- Sidebar has subtle shadow (barely noticeable, adds depth)
- Idea band has minimal shadow (creates separation from hero)
- Even-numbered sections have subtle borders around them
- Overall page has subtle depth without looking heavy

- [ ] **Step 7: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: add subtle shadows and borders to create visual depth and hierarchy"
```

---

### Task 13: Rebalance Typography — Reduce Serif Emphasis, Balance Sans-Serif

**Files:**
- Modify: `app/fellows/[slug]/page.module.css` (typography-related rules)

**Background:** Currently, serif font is over-emphasized (hero name, idea band tagline, problem statement all serif italic). This task reduces serif usage to headlines only, matching the site-wide pattern of serif for h1-h5, sans-serif for body.

- [ ] **Step 1: Update problem statement to use sans-serif instead of serif**

Find `.fellow-hero__problem` (around line 48–54) and replace with:

```css
.fellow-hero__problem {
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.6;
  color: var(--parchment);
  margin: 0;
  font-style: normal;
  font-weight: 400;
}
```

Changes:
- `font-family: var(--serif)` → `var(--sans)` (use Geist, not Instrument Serif)
- Remove `font-style: italic;` (problem statement is now normal, not italic)
- `font-size: 18px` → `17px` (match global body size)

- [ ] **Step 2: Keep idea band tagline as serif italic but optimize spacing**

Verify `.idea-band__tagline` remains:

```css
.idea-band__tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: 18px;
  line-height: 1.7;
  color: var(--parchment);
  margin: 0 auto;
  max-width: 80ch;
}
```

This is already serif italic (intentional for editorial aesthetic of the band).

- [ ] **Step 3: Update section content to use proper sans-serif sizing**

Find `.fellow-section__content` (around line 159–165) and ensure:

```css
.fellow-section__content {
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0;
  max-width: 70ch;
}
```

Changes:
- Add `font-family: var(--sans);` (explicit, not inherited)
- `font-size: 16px` → `17px` (match global body size)

- [ ] **Step 4: Verify hero name stays serif**

Confirm `.fellow-hero__name` is serif:

```css
.fellow-hero__name {
  font-family: var(--serif);
  font-size: 52px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 0 0 24px 0;
  color: white;
}
```

This is correct (serif for headline).

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 6: Visual verification**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- **Hero name** is still serif (large, prominent)
- **Problem statement** is now **sans-serif, normal weight** (not italic) — looks more integrated with body
- **Idea band tagline** stays serif italic (editorial accent band)
- **Section titles** are monospace labels
- **Body content** is all sans-serif
- Overall typography feels more balanced (serif used sparingly for headlines and accents)

- [ ] **Step 7: Commit**

```bash
git add app/fellows/\[slug\]/page.module.css
git commit -m "style: rebalance typography; change problem statement to sans-serif to reduce serif over-emphasis"
```

---

## Testing Checklist

After all 13 tasks are complete, run comprehensive visual and functional testing:

**Desktop (1024px+):**
- [ ] Navigation appears at top, above hero
- [ ] Hero padding is 64px (less generous than before)
- [ ] Idea band has ochre left border and parchment text
- [ ] Sidebar is no longer sticky (scrolls naturally)
- [ ] Sidebar has subtle shadow
- [ ] Links hover with ochre background, white text, smooth transition
- [ ] Focus states visible on keyboard Tab
- [ ] Sections alternate background (odd transparent, even warm with border)
- [ ] Body max-width is 1320px (global container)
- [ ] Gap between content and sidebar is 48px

**Tablet (640px–1023px):**
- [ ] Navigation stacks vertically at top
- [ ] Body content goes to single column
- [ ] Sidebar is hidden
- [ ] Sections still have alternating backgrounds
- [ ] Padding is 48px (desktop) or 32px (mobile)

**Mobile (< 640px):**
- [ ] Navigation stacks vertically
- [ ] Hero padding is 40px 16px
- [ ] Idea band padding is 32px 16px
- [ ] Body padding is 32px 16px
- [ ] Content is full-width
- [ ] Sections have alternating backgrounds
- [ ] All links remain clickable and hover effects work

**Page Load:**
- [ ] Hero fades in (0ms–600ms)
- [ ] Idea band fades in and slides up (150ms–750ms)
- [ ] Navigation fades in and slides up (300ms–900ms)
- [ ] Content fades in and slides up (450ms–1050ms)

**Color & Contrast:**
- [ ] All text meets WCAG AA contrast standards
- [ ] Problem statement is now sans-serif and readable
- [ ] Section titles are ochre (accent color)
- [ ] Navigation/sidebar links are blue (alpine-deep) with ochre hover
- [ ] Focus states are visible (ochre outline)

---

## Summary of Changes

| Issue | Solution | Task |
|-------|----------|------|
| Navigation below hero | Move to top of page | Task 1 |
| Custom drawer modal | Remove component, use responsive reflow | Task 2 |
| 80px hero padding | Reduce to 64px (spacing scale) | Task 3 |
| Custom `clamp()` font sizing | Use fixed 52px (global scale) | Task 3 |
| Custom 1400px container | Use global `--container` (1320px) | Task 4 |
| Section titles use `--clay` | Change to `--ochre` (accent color) | Task 5 |
| Word-spacing non-standard | Remove entirely | Task 5 |
| Idea band plain text | Add ochre left border, increase padding | Task 6 |
| Navigation/sidebar hover `--clay` | Change to `--ochre` with animations | Tasks 7–8 |
| Missing transitions | Add 200ms ease-out on all interactive elements | Tasks 7–8 |
| Sidebar sticky positioning | Remove sticky, use standard scroll | Task 9 |
| No page load motion | Add staggered fadeIn/fadeInUp animations | Task 10 |
| Flat visual hierarchy | Add alternating backgrounds, shadows, borders | Tasks 11–12 |
| Over-emphasis on serif | Change problem statement to sans-serif, serif for headlines only | Task 13 |
