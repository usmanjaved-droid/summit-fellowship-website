# Before You Arrive Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the "Before you arrive" section on the homepage to guide fellows through a four-step pre-arrival sequence: pre-work submission, curriculum review, venue exploration, and Skardu region exploration.

**Architecture:** Update the `ACTIONS` constant in `app/page.tsx` to replace 3 items with 4 items. Each item links to a specific page or external resource. The action-item component will render all four items using existing layout logic.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules (existing)

---

## File Structure

**Files to modify:**
- `app/page.tsx` — Update `ACTIONS` constant with 4 new items, adjust descriptions

**Files to test (no changes):**
- `app/page.tsx` — Verify homepage renders correctly
- All linked pages: `/itinerary`, `/venue`, `/explore-skardu`, external pre-work URL

---

## Task 1: Update ACTIONS Constant with New Items

**Files:**
- Modify: `app/page.tsx:25-44`

- [ ] **Step 1: View the current ACTIONS constant**

Open `app/page.tsx` and locate the `ACTIONS` constant at lines 25-44. Verify it currently has 3 items with fields: `num`, `title`, `desc`, `href`.

- [ ] **Step 2: Replace ACTIONS constant with updated version**

Replace the entire `ACTIONS` constant (lines 25-44) with:

```typescript
const ACTIONS = [
  {
    num: '01',
    title: 'Submit your pre work',
    desc: 'Complete the pre-work assignments to prepare intellectually for the fellowship. Due before 31 May 2026.',
    href: 'https://skardu-taleemabad.vercel.app/skardu-prework.html',
  },
  {
    num: '02',
    title: 'Review the curriculum & itinerary',
    desc: "Understand the week's rhythm, the Mulago design discipline you'll be working through, and what each day requires.",
    href: '/itinerary',
  },
  {
    num: '03',
    title: 'Explore the venue',
    desc: 'Learn about Khoj Resort, review the packing essentials list, and understand the logistics of arrival.',
    href: '/venue',
  },
  {
    num: '04',
    title: 'Explore Skardu',
    desc: 'Get to know the region — the history, geography, culture, food, and activities around where you'll be.',
    href: '/explore-skardu',
  },
];
```

- [ ] **Step 3: Verify file saved and no syntax errors**

Check that the file saved and TypeScript compilation passes. The constant now has 4 items with proper numbering (01-04), updated titles, descriptions matching the spec, and correct hrefs (one external, three internal).

- [ ] **Step 4: Commit the changes**

```bash
cd "d:/Summit Fellowship Website"
git add app/page.tsx
git commit -m "feat: update before-you-arrive actions to 4-item sequence (pre-work, curriculum, venue, skardu)"
```

---

## Task 2: Test Homepage Rendering

**Files:**
- Test: `app/page.tsx` (visual verification)

- [ ] **Step 1: Start the dev server**

```bash
cd "d:/Summit Fellowship Website"
npm run dev
```

Wait for the server to start. You should see output indicating the server is running on `http://localhost:3000`.

- [ ] **Step 2: Navigate to the homepage**

Open a browser and go to `http://localhost:3000`. The page should load without errors. Scroll to the "Before you arrive" section (should be near the bottom of the page).

- [ ] **Step 3: Verify all 4 action items render**

Check the page visually:
- All 4 items should be visible with numbers 01, 02, 03, 04
- Titles should match: "Submit your pre work", "Review the curriculum & itinerary", "Explore the venue", "Explore Skardu"
- Descriptions should be visible and match the spec
- All items should have arrow icons (→) on the right

- [ ] **Step 4: Check browser console for errors**

Open browser DevTools (F12) and check the Console tab. There should be no errors or warnings related to the ACTIONS constant or homepage rendering.

---

## Task 3: Test All Links

**Files:**
- Test: Links in action items

- [ ] **Step 1: Test Task 1 link (external pre-work)**

Click on "Submit your pre work" item. It should navigate to `https://skardu-taleemabad.vercel.app/skardu-prework.html` in a new tab or current tab. Verify the URL in the browser address bar matches.

- [ ] **Step 2: Test Task 2 link (itinerary)**

Click on "Review the curriculum & itinerary" item. It should navigate to `/itinerary` on the current site. Verify the itinerary page loads with the weekly schedule visible.

- [ ] **Step 3: Test Task 3 link (venue)**

Click on "Explore the venue" item. It should navigate to `/venue`. Verify the venue page loads with Khoj Resort information and packing list visible.

- [ ] **Step 4: Test Task 4 link (explore skardu)**

Click on "Explore Skardu" item. It should navigate to `/explore-skardu`. Verify the Explore Skardu page loads with lakes, historic sites, hiking, and desert sections visible.

- [ ] **Step 5: Document link verification**

All 4 links should work correctly:
- External link opens pre-work site
- 3 internal links navigate to correct pages with content visible

---

## Task 4: Test Responsive Layout

**Files:**
- Test: `app/page.tsx` (visual/layout verification)

- [ ] **Step 1: Test desktop layout (1024px+)**

Keep the browser at full width (1024px or larger). The "Before you arrive" section should display all 4 action items. Verify:
- Items stack vertically with proper spacing
- Titles, descriptions, and arrows are aligned
- No text is cut off or overlapping

- [ ] **Step 2: Test tablet layout (640px - 1023px)**

Resize browser to tablet width (around 768px). The section should adapt gracefully:
- All 4 items should still be visible (may stack more tightly)
- Text should remain readable
- Arrows should be visible and clickable

- [ ] **Step 3: Test mobile layout (< 640px)**

Resize browser to mobile width (around 375px). The section should adapt for small screens:
- All 4 items should be visible and clickable
- Text should be readable without horizontal scrolling
- Items should have appropriate padding/margins for touch targets

- [ ] **Step 4: Document responsive verification**

Confirm that the 4-item action list displays correctly at all three breakpoints (mobile, tablet, desktop) with no layout issues.

---

## Task 5: Run Build and Type Check

**Files:**
- Verify: `app/page.tsx` builds without errors

- [ ] **Step 1: Run production build**

```bash
cd "d:/Summit Fellowship Website"
npm run build
```

Expected output: Build completes successfully with no TypeScript errors or warnings. You should see output like:
```
✓ Compiled successfully
Route (app)                 ...
○  (Static)
```

- [ ] **Step 2: Verify no type errors**

The build output should include successful TypeScript type checking. If there are any type errors in `app/page.tsx`, fix them before proceeding.

- [ ] **Step 3: Commit build verification**

The build passing confirms the changes are ready. No separate commit needed for build verification (already committed in Task 1).

---

## Self-Review Checklist

**Spec coverage:**
- ✓ Task 1 updates ACTIONS constant with 4 items in correct order
- ✓ Task 1 sets correct hrefs (external pre-work URL, internal routes)
- ✓ Task 1 updates numbering to 01-04
- ✓ Task 1 updates descriptions to match spec exactly
- ✓ Task 2-3 verify rendering and link functionality
- ✓ Task 4 verifies responsive layout on all screen sizes
- ✓ Task 5 confirms build passes

**Placeholder scan:**
- ✓ No "TBD", "TODO", or incomplete sections
- ✓ All code blocks contain complete, exact code
- ✓ All commands are exact and verifiable
- ✓ All descriptions match spec requirements

**Type consistency:**
- ✓ ACTIONS items use same field names (`num`, `title`, `desc`, `href`)
- ✓ All href values are strings (one external URL, three internal routes)
- ✓ All num values follow pattern '01', '02', '03', '04'

**Completeness:**
- ✓ All 4 items from spec are included
- ✓ Testing covers all aspects: rendering, links, responsiveness, build
- ✓ Clear, verifiable steps with expected outcomes

---

**Last updated:** 2026-05-22
