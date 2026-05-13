# Homepage Editorial Redesign — Design Spec

**Date:** 2026-05-13
**Scope:** Homepage (`app/page.tsx`) + shared foundation (typography, color tokens, header/footer chrome inherited by all pages)
**Status:** Awaiting user review

---

## 1. Intent

Bring the homepage in line with the Fitzroy / luxury-editorial travel aesthetic that the current CSS already aspires to (and the comments explicitly name) but does not deliver. The current build looks like a generic Tailwind template with brand colors layered on top: generic Unsplash mountain, orange-500 button overriding the brand terra-red, emoji icons, uniformly oversized body type, monotone card grid, broken Tailwind v4 utilities.

The redesign is editorial: real Skardu photography given deliberate art direction, a display-serif type system, asymmetric hero composition, substantive curriculum content, and a coherent four-card duotone navigation set. Foundation issues (Tailwind v4 config mismatch, oversized body type, missing serif, fixed-attachment hero) are repaired in the same pass.

**Explicitly out of scope:** other pages (they will inherit the new tokens but are not individually redesigned this pass), CMS, animation libraries, image CDN beyond `next/image`, real fellow/faculty photography.

---

## 2. Page structure

The homepage becomes the following six sections, replacing the current four:

1. **Hero** — full-bleed Lower Kachura Lake, asymmetric headline pinned bottom-left, single terra-red CTA. The current right-side "Program Highlights" glass card is removed.
2. **Intro / positioning** — warm off-white background, large serif pull-statement and 2–3 lines of context.
3. **Stats** — three editorial numbers separated by hairlines, not card boxes. Subtle Katpana texture wash behind.
4. **Curriculum pillars** — replaces the removed Before/After slider. Four blocks for the fellowship's themes: *Design · Scale strategy · Evidence & iteration · Communications & demo day*. Two-column layout, serif headers, one paragraph each.
5. **Explore the Program** — 2×2 grid of four nav cards (Fellows, Schedule, Logistics, Resources), each carrying a duotone Skardu image, an eyebrow label, a serif title, a one-line description, and a hover state where the image animates from duotone to full color.
6. **Footer band** — quiet closing moment: faculty/partner monochrome lockups, one credit line, contact link.

The Before/After transformation slider is removed entirely.

---

## 3. Typography system

- **Display serif:** **Fraunces** (variable, optical sizing), loaded from Google Fonts. Used for H1–H3, pull-statements, stat numerals, card titles.
- **Body sans:** **Roboto Flex** (already loaded), used for body, eyebrows, labels, UI.
- **Eyebrow / uppercase meta:** Roboto Flex 600, 12px, letter-spacing +0.18em, color `--color-terra-red`.
- **Body size** drops from the current `1.7rem` (~27px) to `1.0625rem` (17px) with `line-height: 1.65`. The current body-level forcing of 1.7rem on `<p>` is removed.
- **Fluid scale (rem, all via `clamp`):**
  - H1: `clamp(2.75rem, 6vw, 5.5rem)`
  - H2: `clamp(2rem, 3.5vw, 3rem)`
  - H3: `1.5rem`
  - Body: `1.0625rem`
  - Small / caption: `0.875rem`
- The unused `--font-serif: Merriweather` token is deleted (Fraunces replaces it).

---

## 4. Color system

Palette is preserved; application is corrected.

- Hero CTA uses **`--color-terra-red`**, not generic `orange-500`. The orange/terra-red inconsistency is the single most visible brand break and is the first thing fixed.
- The `bg-skardu-horizon` gradient stripe (red → slate → blue) is removed. It is jarring and not horizon-like.
- New tokens introduced:
  - `--color-ink: #1A1A1A` — near-black for headlines (replaces the muddy `#363839` on white).
  - `--color-paper: #FAF7F2` — warm off-white surface used for alternating sections (intro, curriculum) to break flat-white monotony.
- Duotone treatment for the four nav-card images uses `--color-lake-dark` (shadows) and `--color-cloud-white` (highlights) via a CSS filter stack.

---

## 5. Imagery — sourcing and treatment

All images downloaded into `/public/images/skardu/` as optimized originals, served via `next/image` with `sizes` and blur placeholders. No hotlinking. No `background-attachment: fixed`.

| Slot | Image | Source |
|---|---|---|
| Hero | Lower Kachura Lake (Shangrila), by Visit in Pakistan Treks | Unsplash `JmNNhtFF2nA` |
| Curriculum-section ambient (optional, low-opacity) | Skardu → Shigar Valley road | Unsplash `gDkwAuHzS4Q` |
| Stats-section ambient texture | Katpana cold desert, by Umar Farooq | Unsplash `KfCItH9U4G8` |
| Schedule nav card | Deosai National Park, by Umar Farooq | Unsplash `d7ZSwzISVm0` |
| Logistics nav card | Shangrila Resort wooden building, by Waqas Akhtar | Unsplash `_a4cjhECb-A` |
| Fellows nav card | Deliberate placeholder slot — typographic card, no stock people |  |
| Resources nav card | Tight crop of the peaks panorama (Rizwan Saeed) in duotone | Unsplash `00R3NNegG8w` |

**Treatment per slot:**

- **Hero:** full-bleed, no fixed attachment. Color grade: warm shadows pulled toward terra-red, highlights toward lake-dark. No flat overlay; instead a localized linear gradient in the lower-left third where the headline sits, fading to transparent. Subtle 8-second ken-burns zoom (within `prefers-reduced-motion: no-preference`).
- **Ambient images (Katpana, road):** rendered behind content at 4–8% opacity as a section texture wash. Never a literal background with text on top.
- **Nav-card images:** rendered with CSS duotone (lake-dark + cloud-white). On hover, a 400ms crossfade brings the image to full color while the eyebrow / arrow shift slightly. This is the design's primary moment of delight.

---

## 6. Section detail

### 6.1 Hero
- Asymmetric grid: text column on the left, image right-shifted within the frame so the lake reflection sits on the right two-thirds, leaving negative space for the headline on the lower-left.
- Eyebrow: `Summit Fellowship · Skardu · June 2026`.
- H1 (Fraunces, fluid clamp): a serif headline (final copy to be approved by user; working draft: *"A 7-day retreat for Pakistan's scale-ready impact builders."*).
- Sub: one line of supporting copy.
- CTA: single terra-red button → `/about`. No secondary CTA in hero.
- Soft 80px gradient fade at the bottom edge into the off-white intro section, not a hard cut.

### 6.2 Intro / positioning
- Background: `--color-paper`.
- Centered content column, `max-width: 65ch`.
- Pull-statement in Fraunces (~H2 scale): *"From project-driven survival to scale-ready impact."*
- Two to three lines of context in body sans.

### 6.3 Stats
- White background with a 4–6% opacity Katpana texture wash.
- Three columns separated by vertical hairlines (`1px` solid `var(--color-border)`), no card chrome.
- Each column: eyebrow label (e.g. `DURATION`), then the numeral in Fraunces at ~96px, then one line of context in body sans.
- On scroll into viewport, numerals count up from 0 over 300ms (skipped under `prefers-reduced-motion: reduce`).

### 6.4 Curriculum pillars (replaces transformation slider)
- Background: `--color-paper`.
- Section heading in Fraunces with a small eyebrow above ("THE CURRICULUM").
- Four pillars in a two-column grid (single column on mobile):
  1. **Design** — human-centered framing, problem definition.
  2. **Scale strategy** — pathways from pilot to scale-ready.
  3. **Evidence & iteration** — measurement, learning loops.
  4. **Communications & demo day** — narrative, pitch, public-facing voice.
- Each pillar: small numeral (`01`–`04`) in eyebrow style, serif title, one short paragraph (~40–60 words) of body sans. Final pillar copy to be approved by user; placeholders supplied in implementation.

### 6.5 Explore the Program (nav cards)
- 2×2 grid (single column on mobile).
- Each card: duotone image at the top (3:2 aspect), then below the image: eyebrow label, serif H3 title, one-line description, thin-stroke right-arrow.
- Hover (and keyboard focus): image crossfades duotone → full color (400ms), arrow slides 4px right, card border subtly shifts to terra-red.
- Emoji icons are removed. SVG icons from Lucide replace them only where needed (logistics, schedule), inlined.
- The Fellows card uses no image — a typographic-only card with a pattern of fellow names as light text, since real fellow photography is out of scope.

### 6.6 Footer band
- Quiet closing strip on `--color-paper`.
- Faculty / partner organization names in a single monochrome row (placeholders if no logo assets exist).
- One-line credit ("Summit Fellowship · Khoj Resort · Skardu, Gilgit-Baltistan").
- Contact link.

---

## 7. Motion

- **Scroll-reveal:** each section fades in and rises 16px on entering the viewport, once, via `IntersectionObserver`. No animation library.
- **Stat numerals:** count up from 0 when their section enters view.
- **Hero:** subtle 8-second ken-burns zoom on the background image.
- **Nav-card hover:** 400ms duotone → full color crossfade, 200ms arrow slide.
- **CTA hover:** 2px upward translate, shadow deepens.
- **All animations** wrapped in `@media (prefers-reduced-motion: no-preference)`. The reduced-motion fallback renders the final state without transition.

---

## 8. Tailwind v4 cleanup (foundation fix bundled)

The current Tailwind v4 / v3-config mismatch is the root cause of the two recent "replace undefined Tailwind utility" commits. This redesign fixes it:

- Move color, radius, and shadow tokens from `tailwind.config.js` into a `@theme` block inside `globals.css` (the v4-native way).
- Delete `tailwind.config.js` once the theme block replaces it (verify no other files depend on it first).
- Remove the body-level `@apply antialiased` and `@apply font-bold tracking-tight` on headings; replace with direct CSS where v4 deprecates `@apply` for utilities that map to theme values.
- Verify after migration that `bg-lake-dark`, `text-terra-red`, `bg-cloud-white`, `border-slate-warm`, `text-forest-dark` all resolve, on both the homepage and any pages that consume them.

---

## 9. Accessibility

- All text on imagery meets WCAG AA contrast against the localized gradient under it (verified per-section, not globally).
- All interactive cards have visible `:focus-visible` rings using `--color-terra-red` at 2px offset.
- The duotone treatment never carries information; full-color image is decorative augmentation only.
- Reduced-motion media query is honored for every animation.
- Each `next/image` has a meaningful `alt` (or `alt=""` when purely decorative ambient).

---

## 10. Implementation surface

Files expected to change:

- `app/globals.css` — major rewrite (theme tokens, type scale, removed deprecated utilities, new section-level styles where needed).
- `app/page.tsx` — full replacement.
- `app/components/Header.tsx`, `app/components/Footer.tsx` — light touch-ups so they read with the new type/color system.
- `app/components/BeforeAfterSlider.tsx` — no longer used on the homepage. Left in place for now in case other pages will use it; removal deferred to a later cleanup pass.
- `tailwind.config.js` — deleted after theme migration verified.
- `public/images/skardu/` — new directory with downloaded source images.

Files **not** expected to change in this pass:

- Other page routes (`about`, `fellows`, `faculty`, `schedule`, `logistics`, `resources`) beyond whatever inherits naturally from the new tokens.
- `next.config.ts`, `tsconfig.json`, `package.json` (no new dependencies beyond optional Lucide; Lucide is small and tree-shakes — acceptable).

---

## 11. Acceptance criteria

The redesign is done when:

1. The homepage renders the six sections above, in order, on desktop and mobile, with no broken Tailwind utilities and no `bg-attachment: fixed`.
2. The hero CTA uses brand terra-red, not orange.
3. No emoji icons appear on the homepage.
4. Lower Kachura is the hero background, served via `next/image` from `/public/images/skardu/`.
5. Body text on the homepage is ~17px, not ~27px.
6. Fraunces loads and is used for all H1–H3 and stat numerals.
7. The four nav cards render in duotone and animate to full color on hover and keyboard focus.
8. Stat numerals count up on scroll into view, and the animation is suppressed under `prefers-reduced-motion: reduce`.
9. The `tailwind.config.js` is either deleted (theme moved into `@theme` in CSS) or empty of redundant tokens, and `bg-lake-dark` / `text-terra-red` etc. resolve.
10. Lighthouse mobile performance score ≥ 85 (the heavy hero image is the main risk; mitigated by `next/image` with proper sizes).

---

## 12. Risks and open questions

- **Final hero copy** is not yet locked. Working draft is supplied; user to approve before implementation.
- **Curriculum pillar paragraphs** are placeholder. User to approve final copy before implementation; placeholders will ship if no copy is provided.
- **Faculty / partner logos** for the footer band may not exist as assets. If absent, footer band falls back to a typographic single-line credit.
- **Lower Kachura as the sole hero shot** does make the site lean visually on one famous photograph. Mitigation: the same image is not reused elsewhere on the homepage; the four nav cards use distinct shots so the homepage as a whole shows visual range.
