# Homepage Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic homepage with the editorial redesign defined in `docs/superpowers/specs/2026-05-13-homepage-editorial-redesign-design.md` — Skardu photography with duotone treatment, Fraunces display serif, asymmetric hero, curriculum-pillar content section, and a bundled Tailwind v4 foundation repair.

**Architecture:** Next.js 16 App Router with Tailwind CSS v4. Theme tokens move from `tailwind.config.js` into a `@theme` block inside `globals.css` (v4-native). Images are downloaded into `/public/images/skardu/` and served via `next/image`. New sections are inline JSX in `app/page.tsx`; only shared primitives (Duotone image wrapper, scroll-reveal hook, count-up hook, reduced-motion hook) are extracted into `app/components/`. No new runtime dependencies — Fraunces loads via Google Fonts CSS import.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19, Tailwind CSS v4, TypeScript 5, `next/image`, Google Fonts (Fraunces + Roboto Flex), Lucide React (icons — new dependency, optional).

**Verification approach:** This is a visual redesign of a static page. Conventional unit tests would be busywork. Verification at each task uses (a) `npm run build` for type/lint correctness, (b) `npm run dev` followed by visual confirmation against the spec's acceptance criteria, and (c) a final Lighthouse pass. The implementer SHOULD report visual checks honestly — if you cannot actually view the page in a browser, say so rather than claim success (per the system rule on UI testing).

**Reference reading before starting:**
- `docs/superpowers/specs/2026-05-13-homepage-editorial-redesign-design.md` — the design spec; this plan implements it.
- `node_modules/next/dist/docs/01-app/01-getting-started/03-images-and-fonts.md` (or nearest equivalent) for Next.js 16's current `next/image` and font-loading APIs.
- Tailwind v4 `@theme` docs — fetch via context7 `resolve-library-id` → `query-docs` for `tailwindcss` if unfamiliar. Do not assume v3 syntax.

---

## File structure

**Files created:**
- `app/components/hooks/useReducedMotion.ts` — single hook reading `prefers-reduced-motion`.
- `app/components/hooks/useInViewReveal.ts` — single IntersectionObserver-based reveal hook.
- `app/components/hooks/useCountUp.ts` — number animation hook for stat numerals.
- `app/components/DuotoneImage.tsx` — wraps `next/image` with CSS duotone filter and a hover-to-color crossfade.
- `app/components/icons.tsx` — small library of inline SVG icons (Lucide stroke style) used by nav cards. No `lucide-react` dependency; six hand-inlined paths.
- `public/images/skardu/hero-kachura.jpg` — Lower Kachura Lake (hero).
- `public/images/skardu/peaks-panorama.jpg` — peaks panorama (Resources card crop).
- `public/images/skardu/shigar-road.jpg` — road into Shigar Valley (curriculum ambient).
- `public/images/skardu/katpana-desert.jpg` — Katpana cold desert (stats ambient).
- `public/images/skardu/deosai.jpg` — Deosai (Schedule card).
- `public/images/skardu/shangrila-resort.jpg` — Shangrila Resort building (Logistics card).

**Files modified:**
- `app/globals.css` — major rewrite (Tailwind v4 `@theme`, type scale, removed broken `@apply`, new section utilities, Fraunces import).
- `app/page.tsx` — full replacement.
- `app/components/Header.tsx` — brand-color refresh; remove emoji; Fraunces wordmark.
- `app/components/Footer.tsx` — typographic refresh; add monochrome partner-band row.

**Files deleted:**
- `tailwind.config.js` — replaced by `@theme` block in `globals.css`.

**Files explicitly NOT touched:**
- `app/components/BeforeAfterSlider.tsx` — no longer referenced by the homepage; left in place (it may be wanted later on another page). Deferred cleanup.
- All other page routes (`about`, `fellows`, `faculty`, `schedule`, `logistics`, `resources`).
- `next.config.ts`, `tsconfig.json`, `package.json` (no new runtime deps).

---

## Task 1: Foundation — Tailwind v4 migration, type system, color tokens

**Files:**
- Modify: `app/globals.css` (full rewrite)
- Delete: `tailwind.config.js`

**Why first:** Every subsequent task depends on `bg-lake-dark` / `text-terra-red` / `font-serif` resolving correctly. Two recent commits in `git log` were band-aid fixes for v4/v3 mismatch. This task fixes the root cause.

- [ ] **Step 1: Verify Tailwind v4 theme syntax**

Before editing, fetch the Tailwind v4 `@theme` reference to confirm syntax. From the project root:

```powershell
# Read the local Tailwind PostCSS plugin's README if present
Get-ChildItem -Recurse "node_modules/@tailwindcss" -Filter "README*" | Select-Object FullName
```

If unsure of v4 `@theme` block syntax, query context7:
- `resolve-library-id` with query `"tailwindcss"`
- `query-docs` with the resolved id and topic `"theme configuration v4"`

Expected: confirm that `@theme { --color-foo: #hex; }` declarations inside the CSS file generate the corresponding `bg-foo` / `text-foo` / `border-foo` utilities. If the docs show a different incantation, follow the docs, not this plan.

- [ ] **Step 2: Replace `app/globals.css` in full**

Replace the entire file contents with:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Roboto+Flex:wght@400;500;600;700&display=swap');

/* ---------- Theme tokens (Tailwind v4 @theme generates utilities from these) ---------- */
@theme {
  /* Brand colors */
  --color-lake-dark: #005C8A;
  --color-forest-dark: #2D4F1E;
  --color-terra-red: #D62828;
  --color-slate-warm: #8C847C;
  --color-cloud-white: #F4F7F6;
  --color-moss-light: #7BA428;

  /* Editorial neutrals */
  --color-ink: #1A1A1A;
  --color-paper: #FAF7F2;

  /* Typography */
  --font-sans: 'Roboto Flex', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-serif: 'Fraunces', Georgia, serif;

  /* Radii */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

/* ---------- Non-theme custom properties ---------- */
:root {
  --color-border: rgba(140, 132, 124, 0.18);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.04);
}

/* ---------- Base typography ---------- */
html { color-scheme: light; }

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 1.0625rem;
  line-height: 1.65;
  font-variation-settings: "opsz" 16;
}

::selection {
  background-color: var(--color-terra-red);
  color: var(--color-cloud-white);
}

h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--color-ink);
  line-height: 1.1;
}

h1 { font-size: clamp(2.75rem, 6vw, 5.5rem); }
h2 { font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.15; }
h3 { font-size: 1.5rem; line-height: 1.25; }
h4 { font-size: 1.125rem; line-height: 1.3; }

p {
  line-height: 1.65;
  max-width: 75ch;
  color: var(--color-ink);
}

a {
  color: var(--color-lake-dark);
  text-decoration: none;
  transition: color 200ms ease-out;
}
a:hover { color: var(--color-terra-red); }

/* ---------- Section utilities ---------- */
.container-max { max-width: 80rem; margin-inline: auto; }

.section { padding-block: clamp(4rem, 8vw, 7rem); padding-inline: 1rem; }
@media (min-width: 640px) { .section { padding-inline: 1.5rem; } }
@media (min-width: 1024px) { .section { padding-inline: 2rem; } }

.surface-paper { background-color: var(--color-paper); }

.eyebrow {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-terra-red);
}

/* ---------- Buttons ---------- */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.9375rem;
  letter-spacing: 0.04em;
  background-color: var(--color-terra-red);
  color: var(--color-cloud-white);
  box-shadow: 0 2px 8px rgba(214, 40, 40, 0.18);
  transition: transform 200ms ease-out, box-shadow 200ms ease-out, background-color 200ms ease-out;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: #b82020;
  box-shadow: 0 6px 16px rgba(214, 40, 40, 0.28);
  transform: translateY(-2px);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-terra-red);
  outline-offset: 3px;
}

/* ---------- Reveal animation (scroll-into-view) ---------- */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 700ms ease-out, transform 700ms ease-out;
  will-change: opacity, transform;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ---------- Ken-burns hero zoom ---------- */
@keyframes kenBurns {
  from { transform: scale(1.0); }
  to   { transform: scale(1.08); }
}
.ken-burns { animation: kenBurns 18s ease-out forwards; }

/* ---------- Reduced motion: kill all of the above ---------- */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .ken-burns { animation: none; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 3: Delete the obsolete v3 config**

```powershell
Remove-Item "tailwind.config.js"
```

- [ ] **Step 4: Verify the build succeeds and utilities resolve**

```powershell
npm run build
```

Expected: `✓ Compiled successfully`. No "Unknown utility class" errors. If any page in the build output errors on a class like `bg-lake-dark` or `text-terra-red`, the `@theme` migration is wrong — re-check Step 1 and Step 2 before continuing.

- [ ] **Step 5: Smoke-test in the dev server**

```powershell
npm run dev
```

Open http://localhost:3000. The homepage will still look broken visually (subsequent tasks rewrite it), but it must render without console errors. Body text on every page should now read at ~17px (much smaller than before). Header should still render.

- [ ] **Step 6: Commit**

```powershell
git add app/globals.css tailwind.config.js
git commit -m "refactor(styles): migrate to Tailwind v4 @theme, add Fraunces, fix type scale"
```

---

## Task 2: Download Skardu source imagery to /public/

**Files:**
- Create: `public/images/skardu/hero-kachura.jpg`
- Create: `public/images/skardu/peaks-panorama.jpg`
- Create: `public/images/skardu/shigar-road.jpg`
- Create: `public/images/skardu/katpana-desert.jpg`
- Create: `public/images/skardu/deosai.jpg`
- Create: `public/images/skardu/shangrila-resort.jpg`

- [ ] **Step 1: Create the directory**

```powershell
New-Item -ItemType Directory -Force "public/images/skardu" | Out-Null
```

- [ ] **Step 2: Download all six images**

Unsplash exposes a `/download?force=true&w=2400` endpoint per photo that 302-redirects to the CDN-hosted image. Use `Invoke-WebRequest` with `-MaximumRedirection 5`. Run each command and verify the resulting file is at least 200 KB (small file = redirect or HTML error page got saved instead).

```powershell
$images = @(
  @{ id = 'JmNNhtFF2nA'; name = 'hero-kachura.jpg' },
  @{ id = '00R3NNegG8w'; name = 'peaks-panorama.jpg' },
  @{ id = 'gDkwAuHzS4Q'; name = 'shigar-road.jpg' },
  @{ id = 'KfCItH9U4G8'; name = 'katpana-desert.jpg' },
  @{ id = 'd7ZSwzISVm0'; name = 'deosai.jpg' },
  @{ id = '_a4cjhECb-A'; name = 'shangrila-resort.jpg' }
)
foreach ($img in $images) {
  $url  = "https://unsplash.com/photos/$($img.id)/download?force=true&w=2400"
  $dest = "public/images/skardu/$($img.name)"
  Invoke-WebRequest -Uri $url -OutFile $dest -MaximumRedirection 5
  $size = (Get-Item $dest).Length
  "{0,-26} {1,8:N0} bytes" -f $img.name, $size
}
```

Expected: each line prints a size of at least 200,000 bytes (typically 500 KB – 2 MB). If any file is under 100 KB, it likely saved an HTML redirect page — investigate and re-download that one. If the `/download` endpoint changes or rate-limits, manually open the Unsplash page in a browser and use the download button, saving with the exact filename above.

- [ ] **Step 3: Commit the assets**

```powershell
git add public/images/skardu
git commit -m "feat(assets): add Skardu source imagery for homepage redesign"
```

---

## Task 3: Shared motion hooks

**Files:**
- Create: `app/components/hooks/useReducedMotion.ts`
- Create: `app/components/hooks/useInViewReveal.ts`
- Create: `app/components/hooks/useCountUp.ts`

- [ ] **Step 1: Create `useReducedMotion.ts`**

```typescript
'use client';
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return prefersReduced;
}
```

- [ ] **Step 2: Create `useInViewReveal.ts`**

Returns a ref to attach to the element you want to fade-in-on-scroll. The element should start with the `reveal` class from globals.css; the hook adds `is-visible` once it enters the viewport.

```typescript
'use client';
import { useEffect, useRef } from 'react';

export function useInViewReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return ref;
}
```

- [ ] **Step 3: Create `useCountUp.ts`**

Animates from 0 to `target` over `durationMs` once `start` becomes true. Returns the current integer value. Skips animation when the user prefers reduced motion.

```typescript
'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useCountUp(target: number, start: boolean, durationMs = 1100): number {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduced) { setValue(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs, reduced]);

  return value;
}
```

- [ ] **Step 4: Build and verify**

```powershell
npm run build
```

Expected: build succeeds. No new files are imported yet (so unused module warnings on these hooks are OK if any).

- [ ] **Step 5: Commit**

```powershell
git add app/components/hooks
git commit -m "feat(hooks): add reduced-motion, in-view reveal, and count-up hooks"
```

---

## Task 4: DuotoneImage component

**Files:**
- Create: `app/components/DuotoneImage.tsx`

The duotone effect is achieved with a stacked-layer approach: render `next/image` with a CSS filter (grayscale + contrast), then overlay a `mix-blend-mode: color` layer in `--color-lake-dark`. On hover, fade both effects to zero so the photograph returns to full color.

- [ ] **Step 1: Create `DuotoneImage.tsx`**

```typescript
'use client';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  /** Tone color applied via mix-blend-mode: color. Defaults to brand lake-dark. */
  toneColor?: string;
  className?: string;
  /** Aspect ratio used by the wrapping box. Default 3:2. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
};

export default function DuotoneImage({
  src,
  alt,
  toneColor = 'var(--color-lake-dark)',
  className = '',
  aspect = '3 / 2',
  priority,
  sizes = '(min-width: 1024px) 40vw, 100vw',
}: Props) {
  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      style={{ aspectRatio: aspect, backgroundColor: 'var(--color-cloud-white)' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-[filter] duration-500 ease-out
                   [filter:grayscale(1)_contrast(1.05)_brightness(0.95)]
                   group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)]
                   group-focus-within:[filter:grayscale(0)_contrast(1)_brightness(1)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-500 ease-out
                   opacity-80 group-hover:opacity-0 group-focus-within:opacity-0"
        style={{ backgroundColor: toneColor, mixBlendMode: 'color' }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Build to verify TypeScript**

```powershell
npm run build
```

Expected: build succeeds; no TS errors. (Component is not yet imported anywhere.)

- [ ] **Step 3: Commit**

```powershell
git add app/components/DuotoneImage.tsx
git commit -m "feat(components): add DuotoneImage with hover-to-color crossfade"
```

---

## Task 5: Inline icon library

**Files:**
- Create: `app/components/icons.tsx`

The spec specifies SVG icons (Lucide stroke style) in place of emoji. Rather than add the `lucide-react` dependency for four icons, inline them.

- [ ] **Step 1: Create `icons.tsx`**

```typescript
import type { SVGProps } from 'react';

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconUsers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function IconPlane(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

export function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
```

- [ ] **Step 2: Build**

```powershell
npm run build
```

Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add app/components/icons.tsx
git commit -m "feat(components): add inline SVG icon set"
```

---

## Task 6: Header chrome refresh

**Files:**
- Modify: `app/components/Header.tsx`

Replace blue/orange relics with brand colors; use Fraunces for the wordmark; drop the phone-call emoji.

- [ ] **Step 1: Replace `Header.tsx` in full**

```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Fellows', href: '/fellows' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Logistics', href: '/logistics' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[color:var(--color-border)]">
      <nav className="container-max flex items-center justify-between py-5 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex-shrink-0 focus:outline-none focus-visible:ring-2
                     focus-visible:ring-terra-red focus-visible:ring-offset-2 rounded-md"
        >
          <span className="block eyebrow leading-none">Summit</span>
          <span className="block font-serif text-2xl font-semibold text-[color:var(--color-ink)] leading-none mt-1">
            Fellowship
          </span>
        </Link>

        <div className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.18em] font-semibold
                         text-[color:var(--color-ink)] hover:text-terra-red
                         transition-colors duration-200 ease-out
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                         focus-visible:ring-offset-2 rounded-md px-1 py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" className="btn-primary text-xs">
            Contact
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center
                     rounded-md hover:bg-slate-warm/10 transition-colors duration-150
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                     focus-visible:ring-offset-2"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-px w-full bg-[color:var(--color-ink)] transition-all duration-300 ${
              isMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`} />
            <span className={`h-px w-full bg-[color:var(--color-ink)] transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`h-px w-full bg-[color:var(--color-ink)] transition-all duration-300 ${
              isMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`} />
          </span>
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[color:var(--color-border)]
                          md:hidden shadow-lg">
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-[color:var(--color-ink)] hover:bg-slate-warm/10
                             hover:text-terra-red rounded-md transition-colors duration-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify visually**

```powershell
npm run dev
```

Open http://localhost:3000 on desktop and at mobile width (devtools responsive). Wordmark is Fraunces serif. Nav links are uppercase ink color with terra-red hover. Contact button is terra-red. No phone-emoji visible.

- [ ] **Step 3: Commit**

```powershell
git add app/components/Header.tsx
git commit -m "refactor(header): apply brand palette, Fraunces wordmark, drop emoji"
```

---

## Task 7: Footer refresh with partner band

**Files:**
- Modify: `app/components/Footer.tsx`

Move from a dark green block to a quiet paper-toned closing strip with a typographic partner row and a thin credit line. This matches spec §6.6.

- [ ] **Step 1: Replace `Footer.tsx` in full**

```typescript
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="surface-paper border-t border-[color:var(--color-border)]">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 grid gap-8
                      md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow mb-4">In partnership with</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[color:var(--color-ink)]
                          font-serif text-xl leading-tight">
            <span>Taleemabad</span>
            <span className="text-slate-warm">·</span>
            <span>Mulago Foundation</span>
            <span className="text-slate-warm">·</span>
            <span>Khoj Resort</span>
          </div>
        </div>

        <div className="text-sm text-slate-warm md:text-right">
          <p>Summit Fellowship · Skardu, Gilgit-Baltistan · June 2026</p>
          <p className="mt-1">
            <a href="mailto:info@summitweb.com" className="hover:text-terra-red transition-colors">
              info@summitweb.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)]">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row
                        justify-between gap-2 text-xs text-slate-warm">
          <p>© 2026 Summit Fellowship. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-terra-red transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-terra-red transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify visually**

Reload http://localhost:3000 (dev server should still be running). Scroll to the footer. It is now paper-colored, with serif partner names and a thin credit row. No dark-green block.

- [ ] **Step 3: Commit**

```powershell
git add app/components/Footer.tsx
git commit -m "refactor(footer): paper-toned partner band, typographic close"
```

---

## Task 8: Hero section in `page.tsx`

**Files:**
- Modify: `app/page.tsx` (Tasks 8–12 progressively replace this file; this task writes the first section and a stub shell for the rest)

- [ ] **Step 1: Replace `app/page.tsx` with the hero-only scaffold**

```typescript
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative h-[88vh] min-h-[640px] max-h-[920px] overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <Image
            src="/images/skardu/hero-kachura.jpg"
            alt="Lower Kachura Lake, Skardu, at the foot of the Karakoram"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Localized gradient under the headline (lower-left) only */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 70%)',
          }}
        />

        <div className="container-max relative z-10 h-full px-4 sm:px-6 lg:px-8
                        flex items-end pb-20 md:pb-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-cloud-white/85 mb-5">
              Summit Fellowship · Skardu · June 2026
            </p>
            <h1 className="font-serif text-cloud-white mb-6"
                style={{ fontVariationSettings: '"opsz" 96' }}>
              A 7-day retreat for Pakistan's scale-ready impact builders.
            </h1>
            <p className="text-cloud-white/90 text-lg leading-relaxed mb-9 max-w-xl">
              Eleven social enterprises. One week at Khoj Resort. Mulago frameworks,
              Pakistani faculty, and the work of turning a project into something that scales.
            </p>
            <Link href="/about" className="btn-primary">
              Read the program brief
            </Link>
          </div>
        </div>

        {/* Soft fade into the next section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--color-paper) 100%)',
          }}
        />
      </section>

      {/* Subsequent sections are added in tasks 9-12 */}
    </>
  );
}
```

- [ ] **Step 2: Verify the hero visually**

Reload http://localhost:3000. Confirm:
- Lower Kachura image fills the viewport, no `background-attachment: fixed`, no broken white space.
- Slight zoom over time (ken-burns).
- Headline pinned lower-left, in Fraunces serif, white.
- CTA is terra-red, says "Read the program brief".
- The right-side glass "Program Highlights" card from the old hero is gone.
- Bottom of the section fades to paper color.

If `next/image` complains about the local image path, the file was likely not downloaded correctly in Task 2 — re-verify.

- [ ] **Step 3: Commit**

```powershell
git add app/page.tsx
git commit -m "feat(home): editorial hero with Kachura image and asymmetric headline"
```

---

## Task 9: Intro/positioning + Stats sections

**Files:**
- Modify: `app/page.tsx`

Add the paper-toned intro pull-statement and the editorial stats row with vertical hairlines and count-up numerals. Stats requires a small client component because of the count-up hook.

- [ ] **Step 1: Create `app/components/StatRow.tsx`**

```typescript
'use client';

import { useRef, useState, useEffect } from 'react';
import { useCountUp } from './hooks/useCountUp';

type Stat = { label: string; value: number; suffix?: string; caption: string };

const stats: Stat[] = [
  { label: 'Duration',     value: 7,  caption: 'Days of intensive learning' },
  { label: 'Participants', value: 11, caption: 'Social entrepreneurs selected' },
  { label: 'Faculty',      value: 5,  suffix: '+', caption: 'Mentors and expert guides' },
];

export default function StatRow() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setStarted(true); return; }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[color:var(--color-border)]"
    >
      {stats.map((s) => (
        <StatColumn key={s.label} stat={s} start={started} />
      ))}
    </div>
  );
}

function StatColumn({ stat, start }: { stat: Stat; start: boolean }) {
  const n = useCountUp(stat.value, start);
  return (
    <div className="px-6 py-10 text-center md:text-left">
      <p className="eyebrow mb-4">{stat.label}</p>
      <p className="font-serif font-semibold text-[color:var(--color-ink)]
                    text-[clamp(4rem,9vw,6.5rem)] leading-none"
         style={{ fontVariationSettings: '"opsz" 144' }}>
        {n}{stat.suffix ?? ''}
      </p>
      <p className="mt-4 text-slate-warm">{stat.caption}</p>
    </div>
  );
}
```

- [ ] **Step 2: Append the intro and stats sections to `page.tsx`**

Replace the trailing comment `{/* Subsequent sections are added in tasks 9-12 */}` and the closing `</>` with:

```tsx
      {/* ============ INTRO / POSITIONING ============ */}
      <section className="surface-paper section">
        <div className="container-max">
          <p className="eyebrow mb-5">The Fellowship</p>
          <p className="font-serif text-[color:var(--color-ink)] font-semibold
                        text-[clamp(1.75rem,3.2vw,2.5rem)] leading-snug max-w-[28ch]"
             style={{ fontVariationSettings: '"opsz" 72' }}>
            From project-driven survival to scale-ready impact.
          </p>
          <p className="mt-6 max-w-[60ch] text-[color:var(--color-ink)]/90">
            Eleven social enterprises spend seven days at Khoj Resort in Skardu working
            through Mulago's design discipline alongside Pakistani faculty. The week is
            built to leave each fellow with a sharper mission, a clearer scale strategy,
            and a narrative that survives a real funder conversation.
          </p>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative section">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url("/images/skardu/katpana-desert.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.06,
          }}
        />
        <div className="container-max relative">
          <StatRow />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Add the StatRow import at the top of `page.tsx`**

Just below `import Link from 'next/link';`, add:

```tsx
import StatRow from './components/StatRow';
```

- [ ] **Step 4: Verify visually**

Reload http://localhost:3000. Scroll past the hero:
- Paper-colored band with the serif pull-statement.
- Stats row: three numbers (7, 11, 5+) in serif, very large, separated by vertical hairlines on desktop. Numbers count up from 0 once they scroll into view (test by reloading at the top, then scrolling).
- Faint Katpana texture is visible (4–8% opacity).

If you have devtools open, toggle "Emulate CSS prefers-reduced-motion: reduce" — numerals should now render at their final values immediately, no animation.

- [ ] **Step 5: Commit**

```powershell
git add app/page.tsx app/components/StatRow.tsx
git commit -m "feat(home): paper-toned intro and editorial stats row with count-up"
```

---

## Task 10: Curriculum pillars section

**Files:**
- Modify: `app/page.tsx`

Add the four-pillar section that replaces the removed before/after slider. Uses the locked copy from spec §6.4. Each pillar fades in on scroll.

- [ ] **Step 1: Add a client wrapper for the reveal effect**

Create `app/components/Reveal.tsx`:

```typescript
'use client';
import { useInViewReveal } from './hooks/useInViewReveal';
import type { ReactNode } from 'react';

export default function Reveal({
  as: As = 'div',
  className = '',
  children,
}: {
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
  children: ReactNode;
}) {
  const ref = useInViewReveal<HTMLElement>();
  return (
    <As ref={ref as React.Ref<HTMLElement>} className={`reveal ${className}`}>
      {children}
    </As>
  );
}
```

- [ ] **Step 2: Append the curriculum section to `page.tsx`**

Before the final `</>` (after the Stats section), add:

```tsx
      {/* ============ CURRICULUM PILLARS ============ */}
      <section className="surface-paper section">
        <div className="container-max">
          <p className="eyebrow mb-5">The Curriculum</p>
          <h2 className="font-serif font-semibold max-w-[20ch] mb-16">
            Four pillars across seven days.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {[
              {
                num: '01',
                title: 'Design for Impact at Scale',
                day: 'Day 1',
                body: `The week opens by redrawing the foundations. Fellows work through Mulago's design discipline: an eight-word mission, a Big Idea in six words or fewer, the theory linking idea to behavior to outcome, and the Doer and Payer who carry the model at scale. By the end of the day, every fellow has a one-pager that says what their organization is for, and who it is for, without hedging.`,
              },
              {
                num: '02',
                title: 'Scale Strategy and Evidence',
                day: 'Day 2',
                body: `With foundations in place, the work turns to scale itself. Fellows apply the Scale Screen framework to their own organization, stress test the assumptions that survive only in pilot conditions, and design an evidence plan that matches their level of certainty. The deliverable is not a polished deck. It is an honest map of what is known, what is assumed, and what to prove next.`,
              },
              {
                num: '03',
                title: 'The Iterative Organization',
                day: 'Day 4',
                body: `Most social enterprises ship answers. Scale-ready organizations ship better questions. This block covers the theory of iteration, the methods and data flows that make learning routine rather than heroic, and the people and culture decisions that decide whether iteration actually sticks. Fellows leave with a concrete next iteration for their own work, not a generic improvement plan.`,
              },
              {
                num: '04',
                title: 'Communications and Demo Day',
                day: 'Days 5 to 6',
                body: `The week closes with the conversation, not the pitch. Fellows learn to strip the jargon that funders quietly mistrust, build a narrative that survives a ten-minute conversation rather than a forty-slide deck, and rehearse with peers and faculty until the language feels true. Demo Day is the showcase, but the real outcome is fluency for every funder conversation that follows.`,
              },
            ].map((p) => (
              <Reveal key={p.num} as="article">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-serif font-semibold text-terra-red text-2xl leading-none">
                    {p.num}
                  </span>
                  <span className="eyebrow">{p.day}</span>
                </div>
                <h3 className="font-serif font-semibold mb-3">{p.title}</h3>
                <p className="text-[color:var(--color-ink)]/85">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Add the Reveal import to `page.tsx`**

Just below `import StatRow from './components/StatRow';`, add:

```tsx
import Reveal from './components/Reveal';
```

- [ ] **Step 4: Verify visually**

Reload. Scroll to the curriculum section. Confirm:
- Paper background, "THE CURRICULUM" eyebrow, serif H2.
- Four blocks in a 2-column grid (desktop) / 1-column (mobile).
- Each block: `01 / Day 1` row, then serif title, then paragraph. Numerals are terra-red.
- As you scroll, each block fades and rises 16px once it enters view.
- No em dashes appear in the body text (use Ctrl+F on the rendered page for `—`; should find none).

- [ ] **Step 5: Commit**

```powershell
git add app/page.tsx app/components/Reveal.tsx
git commit -m "feat(home): curriculum-pillars section replaces transformation slider"
```

---

## Task 11: "Explore the Program" nav cards with duotone

**Files:**
- Modify: `app/page.tsx`

Four nav cards in a 2x2 grid, each with a duotone image, eyebrow, serif title, one-line description, and arrow. Hover/focus crossfades image to full color. Fellows card uses no image — typographic only — since real fellow photography is out of scope.

- [ ] **Step 1: Add the import block to `page.tsx`**

Add at the top of the imports:

```tsx
import DuotoneImage from './components/DuotoneImage';
import { IconArrowRight } from './components/icons';
```

- [ ] **Step 2: Append the nav-cards section to `page.tsx`**

Before the final `</>`, add:

```tsx
      {/* ============ EXPLORE THE PROGRAM ============ */}
      <section className="section">
        <div className="container-max">
          <p className="eyebrow mb-5">Explore</p>
          <h2 className="font-serif font-semibold max-w-[18ch] mb-14">
            The week, the people, the place.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 — Fellows (typographic, no image) */}
            <Link
              href="/fellows"
              className="group block border border-[color:var(--color-border)]
                         surface-paper p-8 md:p-10 transition-all duration-300
                         hover:border-terra-red focus-visible:border-terra-red
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                         focus-visible:ring-offset-2"
            >
              <div className="aspect-[3/2] flex items-center justify-center
                              bg-white/40 mb-6 px-6 text-center">
                <p className="font-serif text-2xl text-[color:var(--color-ink)]/30 leading-snug">
                  Eleven fellows.<br/>Eleven organizations.<br/>One cohort.
                </p>
              </div>
              <p className="eyebrow mb-2">The Fellows</p>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif font-semibold group-hover:text-terra-red transition-colors">
                  Meet the Fellows
                </h3>
                <IconArrowRight className="mt-2 text-[color:var(--color-ink)] transition-transform
                                           duration-200 group-hover:translate-x-1" />
              </div>
              <p className="mt-3 text-slate-warm">
                Eleven social entrepreneurs working on scale across Pakistan.
              </p>
            </Link>

            {/* Card 2 — Schedule */}
            <NavCard
              href="/schedule"
              eyebrow="The Week"
              title="The 7-Day Schedule"
              desc="Design, scale strategy, evidence, iteration, communications, and demo day."
              image="/images/skardu/deosai.jpg"
              imageAlt="Deosai National Park, the high plateau above Skardu"
            />

            {/* Card 3 — Logistics */}
            <NavCard
              href="/logistics"
              eyebrow="Getting There"
              title="Logistics and Travel"
              desc="Getting to Skardu, the venue at Khoj Resort, and what to bring."
              image="/images/skardu/shangrila-resort.jpg"
              imageAlt="Wooden lodge at Shangrila Resort, near the program venue"
            />

            {/* Card 4 — Resources */}
            <NavCard
              href="/resources"
              eyebrow="The Toolkit"
              title="Frameworks and Resources"
              desc="The Mulago frameworks, reading lists, and post-fellowship resources."
              image="/images/skardu/peaks-panorama.jpg"
              imageAlt="Karakoram peaks above Skardu"
            />
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Add the `NavCard` helper at the bottom of `page.tsx`**

After the `export default function HomePage()` block, append:

```tsx
function NavCard({
  href, eyebrow, title, desc, image, imageAlt,
}: {
  href: string; eyebrow: string; title: string; desc: string;
  image: string; imageAlt: string;
}) {
  return (
    <Link
      href={href}
      className="group block border border-[color:var(--color-border)]
                 surface-paper transition-all duration-300
                 hover:border-terra-red focus-visible:border-terra-red
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                 focus-visible:ring-offset-2"
    >
      <DuotoneImage src={image} alt={imageAlt} />
      <div className="p-8 md:p-10">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif font-semibold group-hover:text-terra-red transition-colors">
            {title}
          </h3>
          <IconArrowRight className="mt-2 text-[color:var(--color-ink)] transition-transform
                                     duration-200 group-hover:translate-x-1" />
        </div>
        <p className="mt-3 text-slate-warm">{desc}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Verify visually**

Reload. Scroll to "Explore" section. Confirm:
- 2x2 grid. Three image cards (Schedule, Logistics, Resources) plus the typographic Fellows card.
- Image cards render in duotone (blue-tinted black-and-white) by default.
- Hovering or keyboard-focusing a card: image animates to full color over 400-500ms; arrow slides right ~4px; card border becomes terra-red.
- All four cards keyboard-navigable via Tab; focus ring visible.
- No emoji icons anywhere on the page.

- [ ] **Step 5: Commit**

```powershell
git add app/page.tsx
git commit -m "feat(home): nav cards with duotone Skardu imagery and hover crossfade"
```

---

## Task 12: Final verification and cleanup

- [ ] **Step 1: Run a clean production build**

```powershell
npm run build
```

Expected: build succeeds with no errors and no new warnings (warnings preexisting from other pages are acceptable; new ones introduced by this redesign are not).

- [ ] **Step 2: Run the production server and do a full pass against acceptance criteria**

```powershell
npm run start
```

Open http://localhost:3000. Walk through every acceptance criterion in spec §11 in order. Note any failures explicitly; do not claim "all green" without checking each one. The 10 criteria are:

1. Six sections render in order, on desktop and mobile, no broken Tailwind utilities, no `bg-attachment: fixed`.
2. Hero CTA uses brand terra-red, not orange.
3. No emoji icons appear on the homepage.
4. Lower Kachura is the hero, served via `next/image` from `/public/images/skardu/`.
5. Body text on the homepage is ~17px, not ~27px.
6. Fraunces loads and is used for H1–H3 and stat numerals.
7. Four nav cards render in duotone and animate to full color on hover and keyboard focus.
8. Stat numerals count up on scroll-into-view; animation is suppressed under `prefers-reduced-motion: reduce`.
9. `tailwind.config.js` is deleted (or empty); `bg-lake-dark` / `text-terra-red` etc. all resolve.
10. Lighthouse mobile performance ≥ 85.

For criterion 10, run Lighthouse in Chrome devtools (Performance category, Mobile preset, no throttling overrides). Record the actual score. If it is under 85, the most likely cause is the hero image being too large; downsize `hero-kachura.jpg` to 2000px wide and re-test.

- [ ] **Step 3: Cross-page sanity check**

Click through to /about, /fellows, /faculty, /schedule, /logistics, /resources. They will not have been redesigned, but they MUST not have regressed: header and footer should render with the new chrome; body text should be ~17px; no console errors; no "Unknown utility class" errors.

If any other page breaks because of the Tailwind v4 migration in Task 1 (a legitimate risk — some inherited utility classes may have been removed), open an issue note in the final commit message and either fix the breakage inline (if quick) or document the regression for follow-up.

- [ ] **Step 4: Reduced-motion check**

In Chrome devtools, open the Rendering panel and set "Emulate CSS prefers-reduced-motion: reduce". Reload the homepage. Confirm:
- Hero image does not ken-burns.
- Stat numerals appear at their final values immediately.
- Pillar reveals appear instantly, no fade/translate.
- Card hovers still work but without transition timing.

- [ ] **Step 5: Final commit**

If any small fixups were needed, commit them. Otherwise:

```powershell
git status
# if anything outstanding:
git add -A
git commit -m "chore(home): final verification pass for editorial redesign"
```

- [ ] **Step 6: Report**

Report back to the user:
- Whether all 10 acceptance criteria passed (explicitly, one by one — do not summarize as "everything works").
- The actual Lighthouse score.
- Any other-page regressions discovered in Step 3, and whether they were fixed or deferred.
- Whether the implementer was able to actually view the page in a browser, or only verified via `npm run build` and code inspection.
