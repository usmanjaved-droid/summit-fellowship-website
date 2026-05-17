# Venue Page Interactive Journey Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this design task-by-task. Use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an immersive scroll-driven journey that conveys the remoteness, elevation, and natural beauty of Khoj Resort, Skardu—making visitors feel the ascent from the city to a high-altitude mountain valley.

**Architecture:** A scroll-linked interactive section placed *before* the existing map section on `/app/venue/page.tsx`. As users scroll, an elevation profile climbs (1,700m → 2,228m) while an illustrative landscape progressively reveals: foothills → river gorge → valley → orchards → Khoj Resort. Triggered animations layer details (river winding, orchards blooming, peaks emerging) as waypoints pass.

**Tech Stack:** React Client Component ("use client"), SVG for landscape illustration, scroll event listeners with requestAnimationFrame for smooth performance, CSS animations for triggered reveals.

---

## Design Overview

### Purpose & Emotional Goal

The venue page currently explains *where* Khoj Resort is and *what spaces* exist there. This interactive journey adds *how it feels to arrive*—the sense of leaving civilization, ascending into mountains, and reaching a deliberately remote retreat. It establishes the emotional stakes before the practical details below.

### User Experience Flow

1. **Entry (viewport top):** User scrolls to the journey section. They see a landscape starting to reveal and an elevation marker at ~1,600m.
2. **Ascent (middle):** As they scroll down, the elevation climbs in real-time (scroll-linked). They see:
   - Foothills rising (triggered reveal)
   - City noise fading → natural sound (text hints)
   - Shigar River appearing and winding through a gorge (triggered animation)
   - Distance marker: "30 min from airport"
3. **Transition (lower-middle):** Valley widens, orchards appear (triggered bloom animation).
4. **Arrival (near bottom):** Elevation reaches 2,228m. Khoj Resort comes into view. "You have arrived" moment.
5. **Exit (bottom):** User reaches the end of the section. Existing map below shows the week's geography.

### Visual Design

#### Landscape Illustration Style
- **Aesthetic:** Illustrative, hand-drawn feeling, warm palette
- **Color palette:** Ochre (#d4a574), Alpine Deep (#142734), Clay (#8a4a3b), Parchment (#e8e2d5), foliage greens
- **Fidelity:** Simplified but characterful. Not photorealistic, not stark schematic. Similar warmth to the current map section.
- **Key elements:**
  - City skyline (distant, minimal)
  - Foothills with sparse vegetation
  - Shigar River (blue-grey, winding)
  - Mountain peaks (layered, receding into distance)
  - Apricot orchards (suggested with simplified tree shapes)
  - Khoj Resort (building silhouette on hillside)
  - Sky gradient (alpine dusk tones)

#### Layout Structure
- **Left side (20-25% width):** Elevation profile showing:
  - Vertical axis: 0m (sea level) to 2,500m (reference peak)
  - Khoj marked at 2,228m
  - Skardu airport marked at 1,700m
  - Current user position marked with animated dot/needle
  - Altitude numbers update as user scrolls: "1,700m" → "1,800m" → "2,000m" → "2,228m"
  
- **Right/Center (75-80% width):** Illustrative landscape SVG
  - Multiple layers (background peaks, mid-ground foothills, foreground river/orchards)
  - Each layer reveals progressively as elevation climbs
  - Organized as SVG `<g>` groups for independent animation control

#### Text Elements
- **Distance markers:** "30 min from airport" (appears around 1,700m), "Shigar River crossing" (around 1,900m), "Arrival at Khoj Resort" (at 2,228m)
- **Mood hints (optional):** "City noise fades", "Signal disappears", "Silence arrives"
- **Font:** JetBrains Mono for labels (consistent with map), Instrument Serif for waypoint names

### Interaction Model

#### Scroll-Linked Animation (Primary)
- **Elevation profile:** Climbs proportionally with scroll position
  - User scrolls 0% → elevation at 1,700m (airport)
  - User scrolls 50% → elevation at ~1,950m (mid-ascent)
  - User scrolls 100% → elevation at 2,228m (Khoj)
- **Landscape progress:** Landscape layers and details reveal in sync with elevation
- **Mechanism:** JavaScript scroll listener → calculate scroll progress (0-1) → set elevation/SVG opacity values

#### Triggered Animations (Secondary)
Triggered animations fire as the user scrolls past specific waypoints (using Intersection Observer or scroll position thresholds). These layer detail and create surprise moments:

- **~1,700m (airport):** City skyline fades in, then fades out
- **~1,800m (foothills):** Mountains in background fade in
- **~1,900m (river crossing):** Shigar River animates in (SVG stroke-dasharray animation)
- **~2,000m (valley widening):** Foreground orchards fade in with a subtle "bloom" animation
- **~2,200m (arrival):** Khoj Resort building fades in, scale grows slightly

#### Performance Considerations
- Use `requestAnimationFrame` to avoid jank during scroll
- Debounce scroll events with a flag to prevent excessive re-renders
- SVG strokes use `stroke-dasharray` + `stroke-dashoffset` for efficient line drawing (no re-rendering)
- CSS animations for triggered elements (no JavaScript on each trigger)

---

## Technical Specification

### Component Structure

**New component:** `VenueJourney.tsx` (client component)
- Props: None (uses scroll position from window)
- State: 
  - `scrollProgress` (0-1)
  - `currentElevation` (1700-2228)
  - Visibility flags for triggered animations

**File locations:**
- Component: `app/fellows/[slug]/components/VenueJourney.tsx` (or `app/components/VenueJourney.tsx` if reusable)
- Styles: `app/venue/page.module.css` (add `.venue-journey__*` classes)
- SVG illustration: Inline in component or separate file

### SVG Structure

The landscape SVG should be organized in layers (back to front):
```
<svg viewBox="0 0 1200 600">
  <defs> <!-- gradients, patterns --> </defs>
  
  <!-- Background: sky + distant peaks -->
  <g class="journey__sky"> ... </g>
  <g class="journey__peaks-far"> ... </g>
  
  <!-- Mid-ground: foothills -->
  <g class="journey__foothills" opacity={Math.min(1, scrollProgress * 2)}> ... </g>
  
  <!-- River gorge -->
  <path class="journey__river" d="..." strokeDasharray={riverLength} strokeDashoffset={riverOffset} />
  
  <!-- Valley floor -->
  <g class="journey__orchards" opacity={Math.max(0, scrollProgress - 0.4)}> ... </g>
  
  <!-- Khoj Resort -->
  <g class="journey__khoj" opacity={Math.max(0, scrollProgress - 0.8)}> ... </g>
</svg>
```

### Scroll Binding Logic

```typescript
useEffect(() => {
  const container = ref.current; // VenueJourney container element
  const handleScroll = () => {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollProgress = 1 - (rect.top / window.innerHeight); // Normalized 0-1
    const clamped = Math.max(0, Math.min(1, scrollProgress));
    setScrollProgress(clamped);
    setCurrentElevation(1700 + clamped * 528); // 1700 + (528m climb)
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Integration with Existing Page

**Current venue page structure:**
1. Page Hero (title, dates)
2. Venue Intro (description + image)
3. **[NEW] VenueJourney section** ← Insert here
4. Map Section (current schematic map with basecamp + off-sites)
5. Spaces (4 room cards)

**Styling:** 
- VenueJourney section: Full-width, generous padding (64px top/bottom), light background (--paper or --paper-warm)
- Container inside: max-width: var(--container), centered
- SVG takes up 75% of width on desktop, 100% on mobile (landscape fills viewport)

---

## Visual Hierarchy & Emphasis

1. **Primary:** Elevation profile + landscape svg (main visual focus)
2. **Secondary:** Waypoint text labels + distance markers
3. **Tertiary:** Mood hints (optional, low opacity)

Text should not overwhelm the illustration. Use opacity (0.6-0.8) for supporting text so the landscape is the star.

---

## Responsive Design

**Desktop (1024px+):** 
- Elevation profile on left (20%), landscape on right (80%)
- Horizontal layout

**Tablet (640-1023px):**
- Stack vertically: elevation profile above, landscape below
- Or: elevation profile on left (smaller), landscape flowing right
- Both elements scale down proportionally

**Mobile (< 640px):**
- Single column
- Elevation profile stacked above landscape
- SVG viewport scales to device width
- Text labels remain readable (font-size increases relative to svg)

---

## Success Criteria

✅ User feels they are ascending as they scroll (scroll-linked elevation creates this)
✅ Landscape reveals progressively, creating a sense of arrival
✅ Elevation numbers update in real-time, showing altitude gain
✅ Triggered animations (river, orchards, peaks) surprise and delight without disrupting scroll flow
✅ Design style matches existing venue page (warm, illustrative, editorial)
✅ Performance is smooth (60fps, no jank during scroll)
✅ Responsive: works on mobile, tablet, desktop
✅ Accessible: animations respect `prefers-reduced-motion`, alt text for SVG

---

## Dependencies & Assumptions

- **No external libraries:** Use vanilla React hooks + CSS for animations
- **Browser support:** Modern browsers with IntersectionObserver + requestAnimationFrame (IE 11 not required per CLAUDE.md)
- **Scroll trigger library (optional):** Could use a library like Framer Motion or GSAP for complex animations, but vanilla JS should suffice
- **SVG file format:** SVG embedded inline in component (not external file) for simplicity and control

---

## Out of Scope

- Animated birds or clouds (nice-to-have but not required)
- Interactive elements beyond scroll (click to jump to elevation, etc.)
- Sound/music
- Mobile-specific interactions (swipe, tap-to-animate)
- Integration with real GPS data or altitude APIs

---

## Estimated Visual Weight

This section should occupy roughly **500-800px of vertical scrolling space** on desktop. The user scrolls through it naturally while reading the page, and by the time they reach the map section below, they've emotionally "arrived" at Khoj.

---

## Next Steps

1. Create SVG illustration in Figma or inline (hand-draw or trace existing Skardu images)
2. Build React component with scroll binding logic
3. Implement triggered animations (CSS + scroll thresholds)
4. Test on mobile, tablet, desktop
5. Refine opacity/animation timing for smoothness
6. Merge into venue page
