# Venue Hero Overlay Redesign (Revised)

**Date:** 2026-05-21  
**Status:** Design Approved (Revised from Radial to Horizontal)  
**Author:** Claude Code  

---

## Problem Statement

The venue page hero section currently uses a full-screen linear gradient overlay that blankets the entire background image. This obscures the beautiful Khoj Resort landscape photography and reduces visual impact.

**User goal:** Overlay should fade horizontally (left to right), keeping the text area readable while progressively revealing the landscape to the right.

---

## Design Direction

### Horizontal Fade Overlay (Left to Right)

Replace the current overlay with a **linear gradient that fades horizontally from left to right**, creating a fade from opaque (on the left where text sits) → transparent (on the right, revealing full image).

### Visual Behavior

- **Left side (text area):** Opaque `rgba(10, 15, 20, 0.7)` — ensures readable contrast behind text
- **Middle (50%):** `rgba(10, 15, 20, 0.4)` — gradual transparency
- **Right side (100%):** Fully transparent — landscape fully visible on right

The linear gradient flows left-to-right, creating a "vignette" effect that emphasizes text on the left while revealing the scenic landscape on the right.

### Implementation Details

**File:** `app/venue/page.tsx`

**Current code (line 13):**
```html
style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 20, 0.8) 0%, rgba(10, 15, 20, 0.3) 50%, rgba(10, 15, 20, 0) 100%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }}
```

**New code:**
```html
style={{ backgroundImage: 'linear-gradient(to right, rgba(10, 15, 20, 0.7) 0%, rgba(10, 15, 20, 0.4) 50%, rgba(10, 15, 20, 0) 100%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }}
```

**Changes:**
- `linear-gradient(to bottom, ...)` → `linear-gradient(to right, ...)`
- Direction: Top-to-bottom → Left-to-right
- Opacity value 1: `0.8` → `0.7` (left/text area)
- Opacity value 2: `0.3` → `0.4` (middle/50%)
- Opacity value 3: `0` stays `0` (right/landscape)

---

## Technical Scope

**File changed:** `app/venue/page.tsx` (line 13 inline style)

**Lines of code:** 1 line (gradient string replacement)

**No CSS changes needed** — linear gradients are natively supported

**No component changes** — pure styling update

**No image changes** — background image URL stays the same

---

## Success Criteria

✓ Text remains fully readable (sufficient contrast maintained)  
✓ Landscape image progressively reveals toward the right  
✓ No harsh gradient banding or visible stops  
✓ Works smoothly across desktop, tablet, mobile viewports  
✓ Build passes with 0 errors  

---

## Rollback Plan

If the horizontal fade doesn't achieve desired results, revert to the original linear gradient (single line change).

---

## Next Steps

1. Implement gradient change in `app/venue/page.tsx`
2. Verify build succeeds
3. Test visual appearance on desktop, tablet, mobile
4. Check text contrast accessibility (WCAG AA minimum)
5. Commit with conventional message
