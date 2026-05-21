# Venue Hero Overlay Redesign

**Date:** 2026-05-21  
**Status:** Design Approved  
**Author:** Claude Code  

---

## Problem Statement

The venue page hero section currently uses a full-screen linear gradient overlay (top-to-bottom, darkening at top) that blankets the entire background image. This obscures the beautiful Khoj Resort landscape photography and reduces visual impact.

**Current overlay:** `linear-gradient(to bottom, rgba(10, 15, 20, 0.8) 0%, rgba(10, 15, 20, 0.3) 50%, rgba(10, 15, 20, 0) 100%)`

**User goal:** Overlay should only cover the text area and fade outward, revealing more of the landscape while maintaining text readability.

---

## Design Direction

### Radial Fade Overlay

Replace the linear gradient with a **radial gradient** that emanates from the text block center, creating a circular fade from opaque (behind text) → transparent (at edges).

### Visual Behavior

- **Center (text area):** Opaque `rgba(10, 15, 20, 0.7)` — ensures readable contrast
- **Mid-fade (40% radius):** `rgba(10, 15, 20, 0.4)` — gradual transparency
- **Outer edge (70% radius):** Fully transparent — landscape fully visible

The radial gradient is anchored to the center of the hero section, creating an elegant "cone of focus" that highlights the text while progressively revealing the background image.

### Implementation Details

**File:** `app/venue/page.tsx`

**Current code (lines 13):**
```html
<section className={`page-hero ${styles.pageHero}`} style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 20, 0.8) 0%, rgba(10, 15, 20, 0.3) 50%, rgba(10, 15, 20, 0) 100%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }} ...>
```

**New code:**
```html
<section className={`page-hero ${styles.pageHero}`} style={{ backgroundImage: 'radial-gradient(circle at center, rgba(10, 15, 20, 0.7) 0%, rgba(10, 15, 20, 0.4) 40%, rgba(10, 15, 20, 0) 70%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }} ...>
```

**Changes:**
- Replace `linear-gradient(to bottom, ...)` with `radial-gradient(circle at center, ...)`
- Adjust opacity stops: `0.7` (center) → `0.4` (40%) → `0` (70%)
- Keep image URL and layering intact
- No CSS changes required

### Responsive Behavior

The radial gradient is viewport-agnostic — it will work smoothly across all screen sizes:
- **Desktop:** Large hero, radial fade reveals full landscape on edges
- **Tablet:** Moderate hero, fade still maintains text focus
- **Mobile:** Smaller viewport, fade cone remains centered, text readable

---

## Technical Scope

**File changed:** `app/venue/page.tsx` (line 13 inline style)

**Lines of code:** 1 line (gradient string replacement)

**No CSS changes needed** — radial gradients are natively supported in all modern browsers

**No component changes** — pure styling update

**No image changes** — background image URL stays the same

---

## Success Criteria

✓ Text remains fully readable (sufficient contrast maintained)  
✓ Landscape image progressively reveals toward edges  
✓ No harsh gradient banding or visible stops  
✓ Works smoothly across desktop, tablet, mobile viewports  
✓ Build passes with 0 errors  

---

## Rollback Plan

If the radial fade doesn't achieve desired visual results, revert to the original linear gradient (single line change).

---

## Next Steps

1. Implement gradient change in `app/venue/page.tsx`
2. Verify build succeeds
3. Test visual appearance on desktop, tablet, mobile
4. Check text contrast accessibility (WCAG AA minimum)
5. Commit with conventional message: `fix: improve venue hero overlay with radial fade`
