# Fellow Detail Page Redesign — Full-Page Editorial Layout

**Date:** 2026-05-17  
**Status:** Design approved, ready for implementation planning  
**Scope:** Redesign fellow detail pages from modal to full-page layout matching cohort.html aesthetic

---

## Vision & Purpose

Transform fellow detail pages from a modal popup experience to a **full-page editorial layout** that showcases each founder's story with an expedition/mountain aesthetic. The redesign prioritizes narrative flow (Problem → Idea → Mission → How It Works → Dream) while keeping organizational context and contact information accessible via a sidebar (desktop) or drawer (mobile).

---

## Current State

**Existing Implementation:**
- Fellow detail pages at `app/fellows/[slug]/page.tsx`
- Modal-based layout (overlay popup)
- Sections: Sector, Model Overview, The Problem, How It Works, The Vision, Contact & Assets, Prev/Next nav
- Styling: Dark alpine header, white body, basic sections

**Data Structure:**
- Fellow type in `lib/fellows.ts` with fields: id, name, org, sector, tagline, idea_context, mission, how_it_works, the_dream, structure, org_url, fellow_linkedin, photo_url, photo_source, sources
- Data in `data/fellows-deep.json`

**Missing Field:**
- `geography` (regions/areas of operation) — currently not in data structure

---

## Design Direction

**Aesthetic:** Mountain/expedition editorial magazine  
**Color Palette:** Alpine deep (hero background), Ochre (accents), Clay (section headers), Parchment (light text)  
**Typography:** Instrument Serif (headlines), Geist (body), JetBrains Mono (labels)  
**Layout:** Full-page with two-column grid on desktop, responsive stack on mobile

---

## Page Structure

### Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────┐
│            FellowHero (Full-width)                  │
│  • Dark alpine background + topo texture overlay    │
│  • Left: Fellow name (large serif) +                │
│    problem statement (italic serif, ochre accent)   │
│  • Right: Fellow photo (or avatar if unavailable)   │
│  • Padding: 80px vertical, responsive horizontal    │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│         "The Idea" Band (Full-width)                │
│  • Clay background accent                           │
│  • Tagline in serif italic, centered                │
│  • Padding: 40px vertical, 32px horizontal          │
└─────────────────────────────────────────────────────┘
           ↓
┌──────────────────────────┬──────────────────────────┐
│                          │                          │
│  Narrative Content       │  FellowSidebar           │
│  (2/3 width)             │  (1/3 width, sticky)     │
│                          │                          │
│  • FellowSection:        │  • Organization name     │
│    "The Mission"         │  • Geography             │
│  • FellowSection:        │  • Sector                │
│    "How It Works"        │  • Structure             │
│  • FellowSection:        │  • Contact & Links       │
│    "The Dream"           │    (Email, LinkedIn,     │
│                          │     Website)             │
│  Gap: 64px               │                          │
│  Max-width: 75ch         │  Paper background        │
│                          │  Subtle border           │
└──────────────────────────┴──────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│        FellowNavigation (Prev/Next links)           │
│  • Left: ← Previous fellow                          │
│  • Center: Back to all fellows                      │
│  • Right: Next fellow →                             │
│  • Border-top separator                             │
└─────────────────────────────────────────────────────┘
```

### Mobile Layout (0–640px)

```
┌──────────────────────────┐
│   FellowHero (stacked)   │
│  • Photo/avatar on top   │
│  • Name + problem below  │
└──────────────────────────┘
         ↓
┌──────────────────────────┐
│  "The Idea" Band         │
│  (Full-width)            │
└──────────────────────────┘
         ↓
┌──────────────────────────┐
│ Narrative Sections       │
│ • The Mission            │
│ • How It Works           │
│ • The Dream              │
│ (Full-width)             │
└──────────────────────────┘
         ↓
┌──────────────────────────┐
│ "About Organization" btn │
│ (Opens drawer overlay)   │
└──────────────────────────┘
         ↓
┌──────────────────────────┐
│ FellowNavigation         │
│ (Stacked or full-width)  │
└──────────────────────────┘
```

---

## Components

### 1. FellowHero
**Responsibility:** Display the fellow's name, problem statement, and photo/avatar in an engaging hero section.

**Props:**
- `fellow: Fellow` — The fellow object
- `photo_url?: string` — Optional photo URL

**Layout:**
- Dark alpine background (`--alpine-deep`) with topo texture overlay (opacity 0.12)
- Two-column grid on desktop (text left, photo right), stack on mobile
- Name: Large serif (clamp 32px–56px), white text, letter-spacing -0.015em
- Problem statement: 18px body text, parchment color, max-width 60ch, line-height 1.6
- Photo: Responsive sizing, aspect ratio maintained, fallback to 80px avatar circle with initials
- Padding: 80px vertical (desktop), 48px vertical (mobile)

**Styling:**
- Use Tailwind for layout (grid, gaps, padding)
- Use CSS variables for colors (`--alpine-deep`, `--parchment`)
- Responsive via media queries or Tailwind breakpoints

---

### 2. FellowSection
**Responsibility:** Reusable section component for narrative content (Mission, How It Works, Dream).

**Props:**
- `title: string` — Section title (e.g., "The Mission")
- `content: string` — Rich text or paragraphs
- `children?: React.ReactNode` — Optional rich content (for future flexibility)

**Layout:**
- Title: Monospace uppercase (10px, letter-spacing 0.16em), clay color (`--clay`)
- Content: 16px body, line-height 1.6, color `--ink-soft`
- Max-width: 75ch for readability
- Margin-bottom: 48px between sections

**Styling:**
- Minimal component, mostly structural
- Uses Tailwind for spacing

---

### 3. FellowSidebar
**Responsibility:** Display organization metadata and contact information on desktop (hidden on mobile).

**Props:**
- `fellow: Fellow` — The fellow object

**Layout:**
- Width: 1/3 of container (CSS Grid)
- Position: Sticky (stays visible when scrolling)
- Background: Paper color with subtle 1px border
- Padding: 32px

**Sections:**
1. **Organization Info** (not a link, just text)
   - Label: "Organization" (monospace uppercase, clay)
   - Value: `fellow.org`

2. **Geography**
   - Label: "Geography" (monospace uppercase, clay)
   - Value: `fellow.geography` (e.g., "Punjab, Sindh, Balochistan")

3. **Sector**
   - Label: "Sector" (monospace uppercase, clay)
   - Value: `fellow.sector`

4. **Structure**
   - Label: "Structure" (monospace uppercase, clay)
   - Value: `fellow.structure` (Nonprofit / For-profit / Hybrid)

5. **Contact & Links**
   - Conditional rendering: only show if field exists
   - Email: `mailto:` link
   - LinkedIn: External link (target="_blank")
   - Website: External link (target="_blank")
   - Styling: 14px, blue (`--alpine-deep`), hover: underline + clay background

**Styling:**
- Use Tailwind for spacing, layout
- Use CSS variables for colors
- Media query to hide on mobile (display: none on screens < 1024px)

---

### 4. FellowDrawer
**Responsibility:** Mobile overlay drawer containing sidebar content, toggleable via button.

**Props:**
- `fellow: Fellow` — The fellow object
- `isOpen: boolean` — Drawer open/closed state
- `onClose: () => void` — Callback to close drawer

**Behavior:**
- Button trigger: "About Organization" in hero or sticky header
- Drawer slides in from right on mobile
- Backdrop: Semi-transparent dark overlay, clickable to close
- Content: Same as FellowSidebar (org metadata + contacts)
- Close on: Escape key, backdrop click, or navigation to next fellow

**Layout:**
- Full-width or ~90% with margin on mobile
- Positioned fixed, z-index 50+ to appear above content
- Animation: Slide-in from right (150–200ms, ease-out)

**Styling:**
- Use existing modal/drawer styles from `globals.css` as reference
- Tailwind for positioning, spacing
- CSS for animations

---

### 5. FellowNavigation
**Responsibility:** Display previous/next fellow links with navigation back to all fellows.

**Props:**
- `prevFellow?: Fellow` — Previous fellow in cohort (or null)
- `nextFellow?: Fellow` — Next fellow in cohort (or null)

**Layout:**
- Three-column grid: prev (left), back (center), next (right)
- Border-top separator
- Padding: 28px vertical, 32px horizontal
- Links: 14px, alpine-deep color, hover: clay background

**Mobile:**
- Stack vertically or use full-width buttons instead of grid

**Styling:**
- Tailwind for layout, spacing
- CSS variables for colors

---

## Data Structure Changes

### Fellow Type Update (`lib/fellows.ts`)

```typescript
export type Fellow = {
  id: string;
  name: string;
  org: string;
  sector: string;
  tagline: string;
  idea_context: string;     // Problem statement (shown in hero)
  mission: string;
  how_it_works: string;
  the_dream: string;
  structure: string;        // Nonprofit / For-profit / Hybrid
  geography: string;        // NEW: Regions of operation
  org_url: string;
  fellow_linkedin: string;
  photo_url: string | null;
  photo_source: string | null;
  sources: string[];
};
```

### Data Population (`data/fellows-deep.json`)

Add `geography` field to all 11 fellows. Examples:
- Rubeena (Taskeen): "Pakistan (national)"
- Azima (ConnectHear): "Punjab, Sindh"
- Habiba (Spiro): "Pakistan (Punjab focus)"
- Saad (Awaaz-e-Sehat): "Punjab"
- Lala Rukh (Science Fuse): "Sindh, Punjab, KP"
- Khushbakht (Mehfooz AI): "Pakistan (national)"
- Maira (Chiragh): "Sindh, Punjab, KP"
- Adnan (Teach the World): "Sindh, Punjab, Balochistan"
- Muhammad Waqas (WonderTree): "Sindh, Punjab, KP"
- Ali Siddiq (Amal Academy): "Sindh"
- Osama (Soby Trading): "Balochistan, KP"

---

## Page Implementation (`app/fellows/[slug]/page.tsx`)

**Structure:**
```typescript
export default async function FellowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(slug);
  if (!fellow) return <NotFoundPage />;

  const allFellows = getAllFellows();
  const currentIndex = allFellows.findIndex((f) => f.id === fellow.id);
  const prevFellow = currentIndex > 0 ? allFellows[currentIndex - 1] : null;
  const nextFellow = currentIndex < allFellows.length - 1 ? allFellows[currentIndex + 1] : null;

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
        <FellowSidebar fellow={fellow} />
      </div>
      <FellowDrawer fellow={fellow} /> {/* Mobile drawer */}
      <FellowNavigation prevFellow={prevFellow} nextFellow={nextFellow} />
    </div>
  );
}
```

---

## Styling Approach

**Tailwind + CSS Variables:**
- Use Tailwind classes for layout, spacing, typography, responsive breakpoints
- Use existing CSS variables from `app/globals.css` for colors:
  - `--alpine-deep` (hero background)
  - `--ochre` (accents)
  - `--clay` (section headers)
  - `--parchment` (light text on dark backgrounds)
  - `--paper` (sidebar background)
  - `--ink-soft` (body text)
  - `--line` (borders)

**New Styles:**
- Sticky sidebar positioning (CSS, not Tailwind)
- Drawer animation (slide-in, 150–200ms ease-out)
- Hero responsive text sizing (clamp for fluid typography)
- Topo texture overlay (reference existing `topo-bg` class)

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | 0–640px | Single column, drawer toggle, stacked hero |
| Tablet | 641–1023px | Two-column (narrower sidebar) or stack |
| Desktop | 1024px+ | Two-column grid, sticky sidebar |

**Key Changes by Breakpoint:**
- **Mobile:** Hero stacks (photo on top), sidebar hidden, drawer button visible, full-width sections
- **Tablet:** Two-column but sidebar narrower, or stack depending on width
- **Desktop:** Two-column (2/3 + 1/3), sticky sidebar, comfortable spacing

---

## Mobile Drawer Behavior

**Toggle:**
- Button in hero or sticky header: "About Organization"
- Click opens drawer overlay

**Drawer Content:**
- Same as sidebar (org metadata + contacts)

**Close Triggers:**
- Click backdrop (semi-transparent overlay)
- Press Escape key
- Click a link (navigation)

**Animation:**
- Slide in from right (150–200ms, ease-out)
- Backdrop fade in (same duration)

**Touch Targets:**
- Button: ≥44px tap target
- Links: ≥14px padding for comfortable touch

---

## Data Flow

1. **Server-side:** `getFellow(slug)` retrieves fellow from `fellows-deep.json`
2. **Page component:** Renders all 5 component pieces with fellow data
3. **Client-side (drawer only):** usestate for drawer open/closed toggle on mobile
4. **Navigation:** Links use Next.js `Link` component for client-side prefetch

---

## Error Handling

- **Fellow not found:** Return 404 page (keep existing logic)
- **Missing photo:** Fallback to 80px avatar with initials
- **Missing contact info:** Conditionally render link only if field exists (e.g., if `fellow.email`, show email link)
- **Missing geography:** Show empty or "Unknown" gracefully

---

## Testing Checklist

- [ ] Desktop layout: Hero, Idea band, narrative sections, sidebar, navigation all visible and properly spaced
- [ ] Mobile layout: Sections stack correctly, drawer opens/closes, button is tappable
- [ ] Photo fallback: Missing photo shows avatar with initials
- [ ] Contact links: Only render if data exists; links work (email, LinkedIn, website)
- [ ] Navigation: Prev/Next links work, boundary cases handled (first/last fellow)
- [ ] Responsive: Test at 320px, 640px, 1024px, 1440px
- [ ] Accessibility: Heading hierarchy, link text, alt text for images, keyboard navigation (Escape closes drawer)
- [ ] Performance: Static generation works, images lazy-load, drawer doesn't cause layout shift

---

## Success Criteria

✅ Fellow detail pages are **full-page editorial layouts** (not modal)  
✅ Desktop layout has **sidebar with org metadata** on the right  
✅ Mobile layout has **drawer toggle** for sidebar content  
✅ Page flow is **Problem → Idea → Mission → How It Works → Dream**  
✅ Styling matches **mountain/expedition aesthetic** (alpine deep, ochre, clay, serif typography)  
✅ All **5 components are reusable** and well-structured  
✅ Data includes `geography` field for all 11 fellows  
✅ **Responsive** across 320px–1440px+ viewports  
✅ **Navigation works** (Prev/Next between fellows)  

---

## Files to Create/Modify

**New Files:**
- `app/fellows/[slug]/components/FellowHero.tsx`
- `app/fellows/[slug]/components/FellowSection.tsx`
- `app/fellows/[slug]/components/FellowSidebar.tsx`
- `app/fellows/[slug]/components/FellowDrawer.tsx`
- `app/fellows/[slug]/components/FellowNavigation.tsx`

**Files to Modify:**
- `app/fellows/[slug]/page.tsx` (redesign layout, import components)
- `lib/fellows.ts` (add `geography` field to type)
- `data/fellows-deep.json` (populate `geography` for all fellows)

**Files to Keep Unchanged:**
- `app/globals.css` (reuse existing styles, variables, animations)
- `app/fellows/page.tsx` (grid view of all fellows — not affected)

---

## Open Questions / Assumptions

✅ **Full-page layout confirmed** (not modal)  
✅ **Sidebar on right** with metadata  
✅ **Mobile drawer** for sidebar content  
✅ **Section order** confirmed (Mission → How It Works → Dream)  
✅ **Photo handling:** Show if available, fallback to avatar  
✅ **No "Why We Picked Them" section** (removed per user request)  
✅ **Sidebar fields:** Organization, Geography, Sector, Structure, Contact & Links  

---

## Next Steps

1. ✅ Design approved
2. 📋 **Awaiting:** User review of this design doc
3. 🔨 Create implementation plan (writing-plans skill)
4. 💻 Implement components and page layout
5. 🧪 Test responsive behavior and component integration
6. 🚀 Deploy and verify
