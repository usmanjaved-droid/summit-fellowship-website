# Design Spec: "Before You Arrive" Section Redesign

**Date:** 2026-05-22  
**Status:** Design approved  
**Scope:** Refactor the pre-arrival task sequence on the homepage to guide fellows through pre-work, curriculum review, venue logistics, and regional exploration.

---

## Overview

The "Before you arrive" section guides fellows through four sequential pre-arrival tasks, progressing from intellectual preparation (pre-work) through program understanding (curriculum & itinerary) to logistical readiness (venue) and regional context (Skardu exploration).

## Task Sequence

### Task 1: Submit your pre work
- **Number:** 01
- **Title:** Submit your pre work
- **Link:** https://skardu-taleemabad.vercel.app/skardu-prework.html (external)
- **Deadline:** Before 31 May 2026
- **Description:** Complete the pre-work assignments to prepare intellectually for the fellowship.
- **Purpose:** Engage fellows with foundational material before arrival

### Task 2: Review the curriculum & itinerary
- **Number:** 02
- **Title:** Review the curriculum & itinerary
- **Link:** /itinerary
- **Description:** Understand the week's rhythm, the Mulago design discipline you'll be working through, and what each day requires.
- **Purpose:** Intellectual preparation — know the structure and expectations of the seven-day intensive

### Task 3: Explore the venue
- **Number:** 03
- **Title:** Explore the venue
- **Link:** /venue
- **Description:** Learn about Khoj Resort, review the packing essentials list, and understand the logistics of arrival.
- **Purpose:** Logistical preparation — what to bring, how to prepare for the environment

### Task 4: Explore Skardu
- **Number:** 04
- **Title:** Explore Skardu
- **Link:** /explore-skardu
- **Description:** Get to know the region — the history, geography, culture, food, and activities around where you'll be.
- **Purpose:** Regional context — understand the landscape, culture, and surroundings

## Data Structure

Update the `ACTIONS` constant in `app/page.tsx`:

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

## Implementation Notes

1. **External link handling:** Task 1 uses an external URL. The Link component will automatically open it in the current window.
2. **Action items layout:** The existing action-item component and layout will render 4 items instead of 3 — verify responsive layout accommodates 4 items gracefully.
3. **Numbering:** Sequential numbering (01–04) maintains visual clarity.

## Success Criteria

- ✓ All four tasks display in the correct order
- ✓ Task 1 links to external pre-work site
- ✓ Tasks 2–4 link to correct internal pages
- ✓ Descriptions are clear and actionable
- ✓ Layout remains responsive on mobile (640px) and tablet (1024px)

---

**Last updated:** 2026-05-22
