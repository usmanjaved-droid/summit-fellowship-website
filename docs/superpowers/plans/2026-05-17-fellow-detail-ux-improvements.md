# Fellow Detail Page UX Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three UX issues on fellow detail pages: move navigation to top, improve link hover states for better contrast, and fix idea band text readability.

**Architecture:** Three CSS updates to fix styling (text colors, hover states, remove underlines) and one structural change to reorder components in the page layout. All changes are isolated to styling and component composition — no new functionality added.

**Tech Stack:** Next.js, React, CSS Modules (BEM convention), TypeScript

---

## File Structure

**Files to modify:**
- `app/fellows/[slug]/page.module.css` — Update 4 CSS rule sets for colors and hover states
- `app/fellows/[slug]/page.tsx` — Reorder components (move FellowNavigation to top)

**Files unchanged:**
- `app/fellows/[slug]/components/IdeaBand.tsx` — Component structure stays the same
- `app/fellows/[slug]/components/FellowSidebar.tsx` — Component structure stays the same
- `app/fellows/[slug]/components/FellowNavigation.tsx` — Component structure stays the same

---

## Tasks

### Task 1: Fix Idea Band Text Color for Better Readability

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:121-131`

**Background:** The idea band currently uses `color: var(--ink-soft)` (dark text) on a `background-color: var(--clay)` (rust/terracotta) background, creating poor contrast. The text is hard to read.

- [ ] **Step 1: Update idea band tagline text color in CSS**

In `app/fellows/[slug]/page.module.css`, find the `.idea-band__tagline` rule (around line 121) and change the color from `var(--ink-soft)` to `var(--parchment)` for better contrast on the clay background.

```css
.idea-band__tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  line-height: 1.6;
  color: var(--parchment);
  margin: 0;
  max-width: 80ch;
  margin-left: auto;
  margin-right: auto;
}
```

- [ ] **Step 2: Build the project**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Navigate to any fellow detail page (e.g., `http://localhost:3000/fellows/rubeena-kidwai`). Look at the orange/rust-colored "The Big Idea" band. The text should now be noticeably lighter (cream/parchment colored) and easier to read against the rust background.

- [ ] **Step 4: Commit**

```bash
git add app/fellows/[slug]/page.module.css
git commit -m "fix: improve idea band text contrast with parchment color"
```

---

### Task 2: Fix Sidebar Link Hover States (Remove Underline, Improve Text Color Contrast)

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:230-244`

**Background:** The sidebar links (LinkedIn, Website in the "Contact & Links" section) currently show an underline and use dark text on a rust background when hovered, creating poor contrast and a strange visual effect.

- [ ] **Step 1: Update sidebar link hover state styling**

In `app/fellows/[slug]/page.module.css`, find the `.fellow-sidebar__link:hover` rule (around line 241) and:
- Remove the `text-decoration: underline;` line
- Add `color: white;` to make the text white on the rust background

```css
.fellow-sidebar__link:hover {
  background-color: var(--clay);
  color: white;
}
```

- [ ] **Step 2: Build the project**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Navigate to a fellow detail page. Scroll to the sidebar on the right (desktop only, or open the drawer on mobile). Hover over the LinkedIn and Website links. You should see:
- **Before:** Underline appears, text stays dark (hard to read on rust)
- **After:** No underline, text turns white (good contrast on rust background)

- [ ] **Step 4: Commit**

```bash
git add app/fellows/[slug]/page.module.css
git commit -m "fix: remove underline and improve text color contrast in sidebar link hover state"
```

---

### Task 3: Fix Navigation Link Hover States (Remove Underline, Improve Text Color Contrast)

**Files:**
- Modify: `app/fellows/[slug]/page.module.css:415-428`

**Background:** The navigation links at the bottom ("Back to all fellows", "← Previous", "Next →") have the same issue as sidebar links: underlines appear and text stays dark on rust background when hovered.

- [ ] **Step 1: Update navigation link hover state styling**

In `app/fellows/[slug]/page.module.css`, find the `.fellow-navigation__link:hover` rule (around line 425) and:
- Remove the `text-decoration: underline;` line
- Add `color: white;` to make the text white on the rust background

```css
.fellow-navigation__link:hover {
  background-color: var(--clay);
  color: white;
}
```

- [ ] **Step 2: Build the project**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Navigate to a fellow detail page and scroll to the bottom. Hover over the "Back to all fellows", previous fellow, and next fellow links. You should see:
- **Before:** Underline appears, text stays dark (poor contrast)
- **After:** No underline, text turns white (good contrast on rust background)

- [ ] **Step 4: Commit**

```bash
git add app/fellows/[slug]/page.module.css
git commit -m "fix: remove underline and improve text color contrast in navigation link hover state"
```

---

### Task 4: Move FellowNavigation Component to Top of Page

**Files:**
- Modify: `app/fellows/[slug]/page.tsx:32-69`

**Background:** FellowNavigation is currently rendered at the bottom of the page (after all content). It needs to move to the top, right after the FellowHero section. This requires reordering the component render order in the JSX.

- [ ] **Step 1: Restructure page.tsx to move FellowNavigation to top**

In `app/fellows/[slug]/page.tsx`, update the return JSX. Move the `<FellowNavigation />` component from line 66 (after `<FellowSidebar />`) to a new position after `<IdeaBand />` (after line 55). 

Replace the entire return block (lines 52-69) with:

```typescript
return (
  <div className={styles['fellow-detail']}>
    <FellowHero fellow={fellow} />
    <IdeaBand fellow={fellow} />

    <FellowNavigation prevFellow={prevFellow || undefined} nextFellow={nextFellow || undefined} />

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

Note: The `<FellowNavigation />` is now between `<IdeaBand />` and `<fellow-detail__body>`, instead of at the very end.

- [ ] **Step 2: Build the project**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Navigate to a fellow detail page. Verify:
- The navigation bar (with "Back to all fellows" in center, previous/next on sides) now appears **near the top of the page**, right after the idea band and before the main content sections
- The navigation is still functional: all links work
- On mobile (resize to < 640px), the navigation stacks vertically as expected
- All responsive behavior is intact

- [ ] **Step 4: Commit**

```bash
git add app/fellows/[slug]/page.tsx
git commit -m "feat: move FellowNavigation to top of page after idea band"
```

---

## Testing Checklist

After all tasks are complete, verify end-to-end on both desktop and mobile:

**Desktop (1024px+):**
- [ ] Idea band text is light and readable against rust background
- [ ] Hover over sidebar links → white text, no underline
- [ ] Hover over navigation links → white text, no underline
- [ ] Navigation appears at top (after idea band)
- [ ] Navigation is a 3-column layout (back left, all fellows center, next right)

**Mobile (< 640px):**
- [ ] Idea band text is light and readable
- [ ] Sidebar links are in drawer (open drawer, hover to test)
- [ ] Navigation stacks vertically at top
- [ ] All links remain functional

**Final commit after verification (if needed):**

If you made any additional fixes during testing:

```bash
git add -A
git commit -m "test: verify UX improvements across desktop and mobile"
```

---

## Summary of Changes

| Issue | Solution | File(s) |
|-------|----------|---------|
| Idea band poor text readability | Change text color from `ink-soft` to `parchment` | `page.module.css` |
| Sidebar link hover underline + contrast | Remove underline, change text to white | `page.module.css` |
| Navigation link hover underline + contrast | Remove underline, change text to white | `page.module.css` |
| Navigation at bottom of page | Move `<FellowNavigation />` to top, after idea band | `page.tsx` |
