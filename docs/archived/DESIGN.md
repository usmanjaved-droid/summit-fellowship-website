# Summit Fellowship Website — Design System

## Color Palette

### Primary
- **Blue-600:** `#2563eb` — Primary actions, links, accents (main call-to-action)
- **Blue-50:** `#eff6ff` — Light backgrounds for sections
- **Blue-100:** `#dbeafe` — Hover states, badges

### Accent
- **Orange-600:** `#ea580c` — Secondary emphasis, highlights
- **Orange-50:** `#fff7ed` — Light accent backgrounds

### Neutrals (Tinted toward primary)
- **Gray-900:** `#111827` — Text, dark elements
- **Gray-700:** `#374151` — Secondary text
- **Gray-600:** `#4b5563` — Tertiary text
- **Gray-200:** `#e5e7eb` — Borders, dividers
- **Gray-50:** `#f9fafb` — Light backgrounds
- **White:** `#ffffff` — Card backgrounds, primary surfaces

### Status/Semantic
- **Green-600:** `#16a34a` — Success, positive
- **Purple-600:** `#7c3aed` — Faculty/special roles
- **Red-600:** `#dc2626` — Error, destructive

## Typography

### Font Family
- **Primary:** System stack (Inter, -apple-system, Segoe UI, Roboto)
- **Fallback:** -apple-system, BlinkMacSystemFont, sans-serif

### Sizes & Weights
- **H1:** 48–56px, weight 700, line-height 1.2
- **H2:** 36px, weight 700, line-height 1.25
- **H3:** 28px, weight 700, line-height 1.3
- **H4:** 20px, weight 600, line-height 1.4
- **Body:** 16px, weight 400, line-height 1.6 (max 75ch for readability)
- **Small:** 14px, weight 400, line-height 1.5
- **Tiny:** 12px, weight 500, line-height 1.4

### Hierarchy Principle
Scale ratio: 1.25× between steps. Weight shifts from 400 → 600 → 700 for emphasis.

## Spacing & Layout

### Grid & Spacing Scale
- **Base unit:** 4px
- **Common intervals:** 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Container
- **Max-width:** 1280px (7xl in Tailwind)
- **Horizontal padding:** 16px mobile, 24px tablet, 32px desktop
- **Section padding:** 64px vertical (section padding), 32px on mobile

### Card & Component Spacing
- **Card padding:** 24px
- **Card gap:** 16px
- **List item gap:** 12px

## Components & Patterns

### Cards
- **Background:** White (#ffffff)
- **Border:** 1px solid #e5e7eb
- **Border-radius:** 8px
- **Shadow:** 0 1px 3px rgba(0,0,0,0.1) (hover: 0 4px 6px)
- **Padding:** 24px

### Buttons
- **Primary Button:** Blue-600 bg, white text, 8px radius, 12px/16px padding
- **Secondary Button:** Gray-200 bg, gray-900 text
- **Hover:** Darken by ~10%, slight shadow increase
- **Disabled:** 50% opacity
- **No rounded pills:** Rectangular with rounded corners (8px)

### Inputs & Filters
- **Background:** White
- **Border:** 1px solid #e5e7eb
- **Padding:** 8px 12px
- **Border-radius:** 6px
- **Focus ring:** 2px solid #2563eb (blue-600)
- **Label:** 14px, weight 500, gray-700

### Badges & Tags
- **Padding:** 4px 8px
- **Border-radius:** 4px
- **Font size:** 12px
- **Weight:** 500
- **Sector badge:** Blue-100 bg, Blue-700 text
- **Category badge:** Gray-100 bg, Gray-700 text

### Dividers & Borders
- **Color:** #e5e7eb (gray-200)
- **Thickness:** 1px
- **No thick borders** (2px+ borders are rarely needed)

## Elevation

### Shadow System
- **Subtle:** `0 1px 2px rgba(0,0,0,0.05)`
- **Small:** `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- **Medium:** `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)`
- **Large:** `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)`
- **None on page backgrounds** (avoid excessive layering)

## Motion & Animation

### Principles
- **Duration:** 150–200ms for small interactions, 300ms for larger transitions
- **Easing:** ease-out (cubic-bezier(0.4, 0, 0.2, 1))
- **No layout animations** (avoid animating width/height)
- **Hover/focus:** color, shadow, opacity only

### Common Animations
- **Button hover:** Color + shadow 150ms
- **Link hover:** Color 100ms
- **Card hover:** Shadow 200ms
- **Transitions:** opacity, transform (scale, translateY)

## Responsive Breakpoints
- **Mobile:** 0–640px
- **Tablet:** 641–1024px
- **Desktop:** 1025px+
- **Large Desktop:** 1440px+

## Accessibility
- **Contrast:** WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- **Focus indicators:** Blue ring, 2px, visible on all interactive elements
- **Link text:** Never "click here"; descriptive always
- **Form labels:** Always present, not just placeholders
- **Alt text:** Descriptive for all images
- **Keyboard:** Full keyboard navigation support
- **Screen readers:** Semantic HTML, ARIA labels where needed

## Anti-Patterns (Absolute Bans for This Project)
- ❌ Gradient text (background-clip)
- ❌ Side-stripe borders on cards (use full borders or nothing)
- ❌ Glassmorphism or heavy blurs
- ❌ Hero metric template (big number + small label repeated)
- ❌ Identical card grids with no variation
- ❌ Modals as first solution (use inline expansion)
- ❌ Em dashes or `--` (use commas, colons, periods)
- ❌ Decorative animations (only purposeful motion)
- ❌ Stock photography (use avatars, icons, or none)

## Component Examples

### Fellow/Faculty Card
- **Layout:** Vertical card with avatar, name, org, bio, links
- **Avatar:** 64px circle, initials background (blue-100)
- **Name:** 18px, weight 700
- **Org/Title:** 14px, weight 600, gray-700
- **Bio:** 14px, line-clamp-3, gray-700
- **Links:** Small text links at bottom, blue-600

### Schedule Day Block
- **Header:** Blue-50 background, clickable, shows day + theme
- **Sessions:** Expandable, time in left column, details in right
- **Topics:** Tiny badges, blue-100
- **Location:** Small text with pin emoji

### Navigation
- **Desktop:** Horizontal top nav, sticky, clean spacing
- **Mobile:** Hamburger menu, overlay nav, no transition chaos
- **Active state:** Blue-600 text or underline, no background color

---

## Implementation Notes
- **Framework:** Tailwind CSS 3.4+
- **Icons:** Emoji or simple SVG icons (no heavy icon library)
- **Images:** Lazy load, responsive sizes
- **No dark mode by default** (light mode only for MVP; can add dark mode toggle later)
