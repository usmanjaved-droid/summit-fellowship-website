# Venue Hero Overlay Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the full-screen linear gradient overlay on the venue hero with a radial fade that keeps text readable while progressively revealing the Khoj Resort landscape.

**Architecture:** Single inline style change in the hero section's `backgroundImage` property. The gradient string is replaced from linear (top-to-bottom darkening) to radial (circular fade from center). No component restructuring, no CSS changes, no image changes.

**Tech Stack:** Next.js 16.2.6, React 19.2.4, inline CSS, CSS radial-gradient

---

## File Structure

**Modified:**
- `app/venue/page.tsx` (line 13, inline style)

**Spec Reference:**
- `docs/superpowers/specs/2026-05-21-venue-hero-overlay-redesign.md`

---

## Tasks

### Task 1: Capture Current State

Take a screenshot of the venue hero to document the before state.

**Files:**
- Reference: `app/venue/page.tsx:13`

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

Expected: Server starts on `http://localhost:3000`

- [ ] **Step 2: Navigate to venue page**

Open browser to: `http://localhost:3000/venue`

Wait for page to fully load (Khoj Resort hero visible).

- [ ] **Step 3: Capture before screenshot**

Take a screenshot of the hero section showing the current linear gradient overlay.

Save as: `venue-hero-before.png` in project root (for reference, don't commit).

---

### Task 2: Replace Gradient in Hero Section

Modify the `backgroundImage` style in the hero section to use radial-gradient instead of linear-gradient.

**Files:**
- Modify: `app/venue/page.tsx:13`

- [ ] **Step 1: Open venue page file**

File: `d:\Summit Fellowship Website\app\venue\page.tsx`

- [ ] **Step 2: Locate the hero section**

Find line 13 with the `backgroundImage` style:

```html
style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 20, 0.8) 0%, rgba(10, 15, 20, 0.3) 50%, rgba(10, 15, 20, 0) 100%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }}
```

- [ ] **Step 3: Replace with radial-gradient**

Replace the `backgroundImage` style with:

```html
style={{ backgroundImage: 'radial-gradient(circle at center, rgba(10, 15, 20, 0.7) 0%, rgba(10, 15, 20, 0.4) 40%, rgba(10, 15, 20, 0) 70%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }}
```

**Change summary:**
- `linear-gradient(to bottom, ...)` → `radial-gradient(circle at center, ...)`
- Opacity value 1: `0.8` → `0.7` (center)
- Opacity value 2: `0.3` → `0.4` (40% radius)
- Opacity value 3: `0` stays `0` (70% radius)

Full updated line 13:

```jsx
<section className={`page-hero ${styles.pageHero}`} style={{ backgroundImage: 'radial-gradient(circle at center, rgba(10, 15, 20, 0.7) 0%, rgba(10, 15, 20, 0.4) 40%, rgba(10, 15, 20, 0) 70%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }} data-screen-label="Venue Hero">
```

- [ ] **Step 4: Verify file saved**

Confirm the change has been made and file is saved. The dev server should hot-reload automatically.

---

### Task 3: Verify Build Succeeds

Ensure TypeScript compilation and Next.js build pass with zero errors.

**Files:**
- Check: `app/venue/page.tsx`

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected output should show:
```
✓ Compiled successfully
✓ Generating static pages
Route (app)
├ ○ /venue
```

Look for: `✓ Compiled successfully` and no TypeScript errors.

- [ ] **Step 2: Verify no errors in output**

Check that the build output contains:
- `✓ Compiled successfully` (zero errors)
- No red text or error messages
- `Generating static pages` completes successfully

If build fails, review the error message and fix the gradient syntax.

---

### Task 4: Test Visual Appearance — Desktop

Test the radial fade on desktop viewport to verify the overlay and image reveal.

**Files:**
- Test: `app/venue/page.tsx:13`

- [ ] **Step 1: Open dev server in browser**

Dev server should still be running from Task 1.

Open: `http://localhost:3000/venue`

- [ ] **Step 2: Inspect hero section visually**

Verify:
- ✓ Text (title, subtitle, breadcrumbs, meta) is clearly readable
- ✓ Khoj Resort landscape image is visible around the edges
- ✓ Fade from opaque (center) to transparent (edges) is smooth
- ✓ No harsh banding or visible gradient stops
- ✓ The overlay appears circular/radial, not linear

Expected: The text area appears darker (readable), and the mountains/landscape progressively reveal toward the right, left, and bottom edges.

- [ ] **Step 3: Take screenshot of desktop viewport**

Capture the hero section at full desktop width (1440px or wider recommended).

Save as: `venue-hero-desktop-after.png` (for visual confirmation).

---

### Task 5: Test Visual Appearance — Tablet

Test the radial fade on tablet viewport to ensure responsive behavior.

**Files:**
- Test: `app/venue/page.tsx:13`

- [ ] **Step 1: Resize browser to tablet viewport**

Resize to: `1024px` width (iPad landscape) or use DevTools device emulation.

Expected: Hero should stack responsively, text and meta items reflow.

- [ ] **Step 2: Inspect hero section visually**

Verify at tablet size:
- ✓ Text remains clearly readable
- ✓ Radial fade still reveals landscape at edges
- ✓ No overlap of text and background
- ✓ Gradient behaves smoothly (no snapping)

Expected: Layout reflows, radial fade still centers on text, image visible around edges.

- [ ] **Step 3: Take screenshot of tablet viewport**

Capture the hero at `1024px` width.

Save as: `venue-hero-tablet-after.png` (for visual confirmation).

---

### Task 6: Test Visual Appearance — Mobile

Test the radial fade on mobile viewport.

**Files:**
- Test: `app/venue/page.tsx:13`

- [ ] **Step 1: Resize browser to mobile viewport**

Resize to: `640px` width (mobile portrait) or use DevTools device emulation (iPhone 12, etc.).

Expected: Hero collapses to single column, text stacks vertically.

- [ ] **Step 2: Inspect hero section visually**

Verify at mobile size:
- ✓ Text is readable with sufficient contrast
- ✓ Meta items (coordinates, elevation, region, climate) stack in single column
- ✓ Radial fade still applies (landscape visible)
- ✓ No overflow or layout issues

Expected: Full mobile reflow, radial fade maintains readability, image peeks through.

- [ ] **Step 3: Take screenshot of mobile viewport**

Capture the hero at `640px` width.

Save as: `venue-hero-mobile-after.png` (for visual confirmation).

---

### Task 7: Verify Text Contrast (Accessibility)

Ensure text passes WCAG AA contrast requirements.

**Files:**
- Check: `app/venue/page.tsx:13`

- [ ] **Step 1: Inspect heading text color**

The h1 title has CSS rule:
```css
.pageHero .page-hero__title {
  color: #ffffff !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}
```

Text color: White (`#ffffff`)  
Background color (center of radial fade): `rgba(10, 15, 20, 0.7)` = semi-opaque dark

Contrast ratio: ~14:1 (white on dark alpine)

Expected: WCAG AAA passes (requires 7:1 minimum; we exceed it).

- [ ] **Step 2: Inspect subtitle text color**

The subtitle has CSS rule:
```css
.pageHero .page-hero__subtitle {
  color: #f0f0f0 !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
```

Text color: Near-white (`#f0f0f0`)  
Background: Same `rgba(10, 15, 20, 0.7)`

Contrast ratio: ~13:1

Expected: WCAG AAA passes.

- [ ] **Step 3: Confirm no contrast issues**

Both title and subtitle maintain strong contrast with the radial fade background. No changes to color values needed.

Expected: Text readability confirmed; no accessibility issues.

---

### Task 8: Commit Changes

Create a commit with the gradient change.

**Files:**
- Modified: `app/venue/page.tsx`

- [ ] **Step 1: Stage the file**

Run: `git add app/venue/page.tsx`

- [ ] **Step 2: Commit with message**

Run:
```bash
git commit -m "fix: improve venue hero overlay with radial fade

- Replace linear-gradient (top-to-bottom) with radial-gradient (circular)
- Overlay now fades from opaque at center to transparent at edges
- Landscape image progressively reveals toward edges
- Text readability maintained with opacity 0.7 at center
- Responsive across desktop, tablet, mobile viewports"
```

Expected: Commit succeeds with summary:
```
[master ...] fix: improve venue hero overlay with radial fade
 1 file changed, 1 insertion(+), 1 deletion(-)
```

- [ ] **Step 3: Verify commit in log**

Run: `git log --oneline -1`

Expected: Most recent commit shows the radial fade fix.

---

## Summary

**What was built:** Radial fade overlay on venue hero that maintains text readability while revealing the Khoj Resort landscape.

**Change scope:** 1 line modified (`backgroundImage` gradient string).

**Testing:** Visual verification across desktop, tablet, mobile; contrast check for accessibility.

**Deployment:** Ready to push to main; Vercel will auto-deploy on git push.

---

## Rollback

If visual results don't match expectations, rollback is trivial:

```bash
git revert <commit-hash>
```

This restores the original linear gradient and redeploys.
