# Evergreen Site — Phase 1 (Site Structure) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the 2026-only site into a permanent Summit Fellowship site. It gets a cohort archive, a homepage that doesn't depend on the year, an Apply page and an FAQ, all on a protected staging deployment. The application form itself comes in Phase 2.

**Architecture:** Year-dependent values live in `data/site.json`. Cohorts are listed in `data/cohorts/index.json`, with per-cohort fellows at `data/cohorts/<year>/fellows.json`. Small typed modules in `lib/` (`site`, `env`, `cohorts`, `fellows`, `navigation`) are the only things pages read from, and they are unit-tested with Vitest. The 2026 hub is a static route folder `app/cohorts/2026/` whose layout adds a cohort bar with tabs. The bespoke 2026 pages (week, venue, explore) move there unchanged apart from breadcrumbs and metadata. A route smoke script checks real HTTP responses from `next start`.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript strict, CSS Modules + `app/globals.css` tokens, Vitest (new, dev-only), Vercel.

**Spec:** `docs/superpowers/specs/2026-10-12-evergreen-site-and-application-design.md`

## Global Constraints

- Branch: all work on `staging`. Never commit to or push `master` in this plan.
- Name: "Summit Fellowship" everywhere. Never "Skardu Scale-Up Fellowship" in new copy.
- Colours: CSS variables only (`var(--ochre)` and so on). No hex values in new CSS.
- Styling: CSS Modules with BEM class names for new components. Existing global classes (`page-hero`, `btn`, `container`, `section`, `eyebrow`) may be reused.
- Links: `next/link` for internal links.
- Breakpoints: `max-width: 640px` (mobile), `max-width: 1024px` (tablet). Verify at 375 / 768 / 1440 px.
- No redirects from old URLs. Removed routes must return 404.
- Values that aren't set render as exactly `To be confirmed`.
- FAQ content the documents don't settle contains the literal marker `[TO CONFIRM]`.
- Fellows' `email` and `phone` are kept in `data/cohorts/<year>/fellows.json` (owner decision) but are never rendered on any page.
- Metadata titles follow `<Page> — Summit Fellowship`.
- Commit messages: conventional commits, ending with `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.

## Review Focus

1. **Applications switched on before the form exists:** if someone sets `applicationsOpen: true` during Phase 1, every call to action must still say "Applications opening soon" rather than link to a missing `/apply/form`. Pinned in Task 1 (`isApplicationLive`).
2. **Open with no deadline set:** the deadline band and hero strip must show "To be confirmed" or hide, never "Applications close " followed by nothing. Pinned in Task 1 (`getDeadlineText`).
3. **Unknown fellow or cohort URLs** (`/cohorts/2026/fellows/nobody`, `/cohorts/1999`) must return a real 404 status, not a 200 "not found" page. Pinned in Tasks 4 and 5 (smoke).
4. **Staging signals leaking into production, or missing from staging:** the banner and noindex must appear only when `VERCEL_ENV !== 'production'`. Pinned in Task 2 (`isProductionDeploy`, `buildRobots`).
5. **Mobile menu at 375 px:** both dropdowns must open inside the hamburger menu, and tapping a link must close the menu. Pinned in Task 6 (manual check step).

---

## File Structure

| Path | Responsibility |
|---|---|
| `vitest.config.mts` | Unit test config (`@` alias) |
| `scripts/smoke.mjs` | Fetches every route in `scripts/smoke-routes.mjs` and asserts status and text |
| `scripts/smoke-routes.mjs` | The route expectations list (tasks append to it) |
| `scripts/check-golive.mjs` | Fails if any `[TO CONFIRM]` remains in `data/faq.json` |
| `data/site.json` | Current-cohort settings |
| `data/cohorts/index.json` | Cohort registry |
| `data/cohorts/2026/fellows.json` | 2026 fellows (moved from `data/fellows-deep.json`, plus `card_summary`) |
| `data/faq.json` | FAQ groups and questions |
| `lib/site.ts` (+ test) | Settings accessors, "To be confirmed" display, call-to-action and deadline logic |
| `lib/env.ts` (+ test) | Production detection, robots rules |
| `lib/cohorts.ts` (+ test) | Registry accessors and hub tab model |
| `lib/fellows.ts` (+ test) | Cohort-aware fellow lookups and card mapping |
| `lib/navigation.ts` (+ test) | Header and footer link model |
| `app/robots.ts` | robots.txt from `buildRobots` |
| `app/components/StagingBanner.tsx` | Non-production banner |
| `app/components/DeadlineBand.tsx` | Replaces `EventDate.tsx` |
| `app/components/Header.tsx`, `Footer.tsx` | Rebuilt from `lib/navigation` |
| `app/components/NavDropdown.tsx` | One reusable header dropdown |
| `app/cohorts/page.tsx` | Cohort index |
| `app/cohorts/_components/CohortBar.tsx` (+ `.module.css`), `CohortTabs.tsx` | Hub bar and tabs |
| `app/cohorts/_components/fellow/*` | Fellow detail components (moved) |
| `app/cohorts/2026/layout.tsx` | Adds CohortBar to every 2026 page |
| `app/cohorts/2026/page.tsx` | Fellows tab |
| `app/cohorts/2026/fellows/[slug]/page.tsx` | Fellow profile (moved) |
| `app/cohorts/2026/week/page.tsx` | Moved from `app/itinerary` |
| `app/cohorts/2026/venue/*` | Moved from `app/venue` |
| `app/cohorts/2026/explore/*` | Moved from `app/explore-skardu` |
| `app/faculty/people.tsx` | FACULTY, ADVISORS and ORGANIZERS arrays extracted from the page |
| `app/page.tsx` + `app/home.module.css` | New homepage |
| `app/apply/page.tsx` + `apply.module.css` | Apply page |
| `app/faq/page.tsx` + `faq.module.css` | FAQ page |
| `app/not-found.tsx` | Helpful 404 |

---

### Task 1: Test tooling and site settings

**Files:**
- Create: `vitest.config.mts`, `data/site.json`, `lib/site.ts`, `lib/site.test.ts`
- Modify: `package.json` (scripts, devDependency)

**Interfaces:**
- Produces:
  - `type CohortSettings = { year: number; retreatDates: string | null; location: string | null; applicationDeadline: string | null; applicationsOpen: boolean }`
  - `type SiteSettings = { currentCohort: CohortSettings; contactEmail: string }`
  - `const TBC = 'To be confirmed'`
  - `const FORM_ENABLED: boolean` (`false` in Phase 1)
  - `getSiteSettings(): SiteSettings`
  - `displayValue(v: string | null | undefined): string`
  - `isApplicationLive(c: CohortSettings, formEnabled?: boolean): boolean`
  - `getApplyCta(c: CohortSettings, formEnabled?: boolean): { label: string; href: string }`
  - `getDeadlineText(c: CohortSettings, formEnabled?: boolean): string | null`

- [ ] **Step 1: Install Vitest and add scripts**

```bash
npm install --save-dev vitest@3.2.4
npm pkg set scripts.test="vitest run"
npm pkg set scripts.smoke="node scripts/smoke.mjs"
npm pkg set scripts.check:golive="node scripts/check-golive.mjs"
```

- [ ] **Step 2: Create `vitest.config.mts`**

```ts
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  test: {
    include: ['lib/**/*.test.ts'],
  },
});
```

- [ ] **Step 3: Write the failing test `lib/site.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import {
  TBC,
  displayValue,
  getApplyCta,
  getDeadlineText,
  getSiteSettings,
  isApplicationLive,
  type CohortSettings,
} from './site';

const base: CohortSettings = {
  year: 2027,
  retreatDates: null,
  location: null,
  applicationDeadline: null,
  applicationsOpen: false,
};

describe('displayValue', () => {
  it('returns TBC for null, undefined, empty and whitespace', () => {
    expect(displayValue(null)).toBe(TBC);
    expect(displayValue(undefined)).toBe(TBC);
    expect(displayValue('')).toBe(TBC);
    expect(displayValue('   ')).toBe(TBC);
  });
  it('returns trimmed value otherwise', () => {
    expect(displayValue(' June 2027 ')).toBe('June 2027');
  });
});

describe('isApplicationLive', () => {
  it('is false when applications are closed', () => {
    expect(isApplicationLive(base, true)).toBe(false);
  });
  it('is false when open but the form is not enabled (Phase 1 guard)', () => {
    expect(isApplicationLive({ ...base, applicationsOpen: true }, false)).toBe(false);
  });
  it('is true only when open and the form is enabled', () => {
    expect(isApplicationLive({ ...base, applicationsOpen: true }, true)).toBe(true);
  });
});

describe('getApplyCta', () => {
  it('always links to /apply', () => {
    expect(getApplyCta(base).href).toBe('/apply');
    expect(getApplyCta({ ...base, applicationsOpen: true }, true).href).toBe('/apply');
  });
  it('says opening soon unless live', () => {
    expect(getApplyCta({ ...base, applicationsOpen: true }, false).label).toBe('Applications opening soon');
    expect(getApplyCta({ ...base, applicationsOpen: true }, true).label).toBe('Apply for the 2027 cohort');
  });
});

describe('getDeadlineText', () => {
  it('is null when not live', () => {
    expect(getDeadlineText({ ...base, applicationDeadline: '15 January 2027' }, false)).toBeNull();
  });
  it('is TBC when live without a deadline', () => {
    expect(getDeadlineText({ ...base, applicationsOpen: true }, true)).toBe(TBC);
  });
  it('is the deadline when live with one', () => {
    expect(
      getDeadlineText({ ...base, applicationsOpen: true, applicationDeadline: '15 January 2027' }, true),
    ).toBe('15 January 2027');
  });
});

describe('getSiteSettings', () => {
  it('loads the 2027 cohort with applications closed in Phase 1', () => {
    const s = getSiteSettings();
    expect(s.currentCohort.year).toBe(2027);
    expect(s.currentCohort.applicationsOpen).toBe(false);
    expect(s.contactEmail).toBe('usman.javed@taleemabad.com');
  });
});
```

- [ ] **Step 4: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./site"`.

- [ ] **Step 5: Create `data/site.json`**

```json
{
  "currentCohort": {
    "year": 2027,
    "retreatDates": null,
    "location": null,
    "applicationDeadline": null,
    "applicationsOpen": false
  },
  "contactEmail": "usman.javed@taleemabad.com"
}
```

- [ ] **Step 6: Create `lib/site.ts`**

```ts
import siteData from '@/data/site.json';

export type CohortSettings = {
  year: number;
  retreatDates: string | null;
  location: string | null;
  applicationDeadline: string | null;
  applicationsOpen: boolean;
};

export type SiteSettings = {
  currentCohort: CohortSettings;
  contactEmail: string;
};

export const TBC = 'To be confirmed';

/** Flipped to true in Phase 2, when /apply/form exists. */
export const FORM_ENABLED = false;

export function getSiteSettings(): SiteSettings {
  return siteData as SiteSettings;
}

export function displayValue(v: string | null | undefined): string {
  const trimmed = (v ?? '').trim();
  return trimmed === '' ? TBC : trimmed;
}

export function isApplicationLive(c: CohortSettings, formEnabled: boolean = FORM_ENABLED): boolean {
  return c.applicationsOpen && formEnabled;
}

export function getApplyCta(c: CohortSettings, formEnabled: boolean = FORM_ENABLED) {
  return {
    label: isApplicationLive(c, formEnabled) ? `Apply for the ${c.year} cohort` : 'Applications opening soon',
    href: '/apply',
  };
}

export function getDeadlineText(c: CohortSettings, formEnabled: boolean = FORM_ENABLED): string | null {
  if (!isApplicationLive(c, formEnabled)) return null;
  return displayValue(c.applicationDeadline);
}
```

- [ ] **Step 7: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS, all `lib/site.test.ts` tests green.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.mts data/site.json lib/site.ts lib/site.test.ts
git commit -m "feat: add site settings module and vitest

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Staging signals (banner, noindex, robots) and smoke harness

**Files:**
- Create: `lib/env.ts`, `lib/env.test.ts`, `app/robots.ts`, `app/components/StagingBanner.tsx`, `scripts/smoke.mjs`, `scripts/smoke-routes.mjs`
- Modify: `app/layout.tsx`, `next.config.ts`, `app/globals.css` (append)

**Interfaces:**
- Produces:
  - `isProductionDeploy(env?: Record<string, string | undefined>): boolean`
  - `buildRobots(env?: Record<string, string | undefined>): MetadataRoute.Robots`
  - `scripts/smoke-routes.mjs` exports `ROUTES: { path: string; status: number; contains?: string[] }[]`

- [ ] **Step 1: Write the failing test `lib/env.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { buildRobots, isProductionDeploy } from './env';

describe('isProductionDeploy', () => {
  it('is true only for VERCEL_ENV=production', () => {
    expect(isProductionDeploy({ VERCEL_ENV: 'production' })).toBe(true);
    expect(isProductionDeploy({ VERCEL_ENV: 'preview' })).toBe(false);
    expect(isProductionDeploy({ VERCEL_ENV: 'development' })).toBe(false);
    expect(isProductionDeploy({})).toBe(false);
  });
});

describe('buildRobots', () => {
  it('allows crawling in production', () => {
    expect(buildRobots({ VERCEL_ENV: 'production' })).toEqual({ rules: { userAgent: '*', allow: '/' } });
  });
  it('disallows everything elsewhere', () => {
    expect(buildRobots({ VERCEL_ENV: 'preview' })).toEqual({ rules: { userAgent: '*', disallow: '/' } });
  });
});
```

- [ ] **Step 2: Run and confirm it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./env"`.

- [ ] **Step 3: Create `lib/env.ts`**

```ts
import type { MetadataRoute } from 'next';

type Env = Record<string, string | undefined>;

export function isProductionDeploy(env: Env = process.env): boolean {
  return env.VERCEL_ENV === 'production';
}

export function buildRobots(env: Env = process.env): MetadataRoute.Robots {
  return isProductionDeploy(env)
    ? { rules: { userAgent: '*', allow: '/' } }
    : { rules: { userAgent: '*', disallow: '/' } };
}
```

- [ ] **Step 4: Run and confirm it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';
import { buildRobots } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  return buildRobots();
}
```

- [ ] **Step 6: Create `app/components/StagingBanner.tsx`**

```tsx
import { isProductionDeploy } from '@/lib/env';

export default function StagingBanner() {
  if (isProductionDeploy()) return null;
  return (
    <div className="staging-banner" role="note">
      Staging — not the live site
    </div>
  );
}
```

- [ ] **Step 7: Append the banner style to `app/globals.css`**

```css
/* Staging banner (non-production deploys only) */
.staging-banner {
  background: var(--clay);
  color: var(--paper);
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: center;
  padding: 8px 16px;
}
```

- [ ] **Step 8: Update `app/layout.tsx` metadata and body**

Replace the `metadata` export and the `<body>` contents:

```tsx
import StagingBanner from './components/StagingBanner';
import { isProductionDeploy } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Summit Fellowship — Designed for Scale',
  description:
    "A seven-day intensive for Pakistan's most promising social enterprises, matching founders with strategy, mentoring and capital to scale.",
  robots: isProductionDeploy() ? undefined : { index: false, follow: false },
};
```

```tsx
      <body>
        <StagingBanner />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
```

- [ ] **Step 9: Add the non-production `X-Robots-Tag` header in `next.config.ts`**

Add inside `nextConfig`, next to `images`:

```ts
  async headers() {
    if (process.env.VERCEL_ENV === 'production') return [];
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
```

- [ ] **Step 10: Create `scripts/smoke-routes.mjs`**

```js
/** Route expectations checked by scripts/smoke.mjs. Tasks append entries. */
export const ROUTES = [
  { path: '/', status: 200, contains: ['Staging — not the live site'] },
  { path: '/robots.txt', status: 200, contains: ['Disallow: /'] },
];
```

- [ ] **Step 11: Create `scripts/smoke.mjs`**

```js
import { ROUTES } from './smoke-routes.mjs';

const base = process.argv[2] ?? 'http://localhost:3100';
let failures = 0;

for (const r of ROUTES) {
  const res = await fetch(base + r.path, { redirect: 'manual' });
  const body = await res.text();
  const problems = [];
  if (res.status !== r.status) problems.push(`status ${res.status} ≠ ${r.status}`);
  for (const text of r.contains ?? []) {
    if (!body.includes(text)) problems.push(`missing "${text}"`);
  }
  if (problems.length) {
    failures++;
    console.log(`FAIL ${r.path}: ${problems.join('; ')}`);
  } else {
    console.log(`ok   ${r.path}`);
  }
}

console.log(failures ? `\n${failures} route(s) failed` : '\nall routes ok');
process.exit(failures ? 1 : 0);
```

- [ ] **Step 12: Build, start, smoke**

```bash
npm run build
npx next start -p 3100   # leave running in a second terminal / background
npm run smoke
```

Expected: `ok /` and `ok /robots.txt`. (Locally `VERCEL_ENV` is unset, so it counts as non-production and the banner shows.) Stop the server afterwards.

- [ ] **Step 13: Commit**

```bash
git add lib/env.ts lib/env.test.ts app/robots.ts app/components/StagingBanner.tsx app/globals.css app/layout.tsx next.config.ts scripts/smoke.mjs scripts/smoke-routes.mjs
git commit -m "feat: add staging banner, noindex and route smoke harness

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Cohort registry and cohort-aware fellows data

**Files:**
- Create: `data/cohorts/index.json`, `lib/cohorts.ts`, `lib/cohorts.test.ts`, `lib/fellows.test.ts`
- Move: `data/fellows-deep.json` → `data/cohorts/2026/fellows.json` (add `card_summary`)
- Modify: `lib/fellows.ts`
- Delete: `data/schedule.json`, `data/logistics.json`, `data/resources.json`, `lib/types.ts`, `lib/utils.ts` (each only after the grep in Step 1 shows no importers)

**Interfaces:**
- Produces:
  - `type Cohort = { year: number; label: string; dates: string; venue: string; location: string; summary: string }`
  - `getCohorts(): Cohort[]` (newest first), `getCohort(year: number): Cohort | null`, `getLatestCohort(): Cohort`
  - `type CohortTab = { href: string; label: string }`, `getCohortTabs(year: number): CohortTab[]`, `isTabActive(tab: CohortTab, pathname: string, year: number): boolean`
  - `Fellow` (existing fields + `card_summary: string`, `email: string`, `phone: string`)
  - `getAllFellows(year: number): Fellow[]`, `getFellow(year: number, slug: string): Fellow | null`, `getFellowNumber(year: number, slug: string): number` (1-based, 0 if missing)
  - `type FellowCard = { slug: string; init: string; name: string; org: string; sector: string; summary: string; photo_url?: string }`, `getFellowCards(year: number): FellowCard[]`, `initials(name: string): string`

- [ ] **Step 1: Confirm the dead files really are unused**

Run: `grep -rnE "schedule\.json|logistics\.json|resources\.json|lib/types|lib/utils|getRelatedFellows" app lib`
Expected: only the definition of `getRelatedFellows` in `lib/fellows.ts`, and no importers of the others. If anything else appears, keep that file and note it in the commit message.

- [ ] **Step 2: Write the failing tests**

`lib/cohorts.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getCohort, getCohortTabs, getCohorts, getLatestCohort, isTabActive } from './cohorts';
import { getAllFellows } from './fellows';

describe('cohort registry', () => {
  it('lists 2026', () => {
    expect(getCohorts().map((c) => c.year)).toContain(2026);
    expect(getCohort(2026)?.label).toBe('2026 · Skardu');
  });
  it('returns null for unknown years', () => {
    expect(getCohort(1999)).toBeNull();
  });
  it('sorts newest first and exposes the latest', () => {
    const years = getCohorts().map((c) => c.year);
    expect([...years].sort((a, b) => b - a)).toEqual(years);
    expect(getLatestCohort().year).toBe(years[0]);
  });
  it('every registered cohort has fellows data', () => {
    for (const c of getCohorts()) expect(getAllFellows(c.year).length).toBeGreaterThan(0);
  });
});

describe('cohort tabs', () => {
  const tabs = getCohortTabs(2026);
  it('has four tabs in order', () => {
    expect(tabs.map((t) => t.label)).toEqual(['Fellows', 'The Week', 'Venue', 'Explore Skardu']);
    expect(tabs.map((t) => t.href)).toEqual([
      '/cohorts/2026',
      '/cohorts/2026/week',
      '/cohorts/2026/venue',
      '/cohorts/2026/explore',
    ]);
  });
  it('marks Fellows active on the hub and on profile pages', () => {
    expect(isTabActive(tabs[0], '/cohorts/2026', 2026)).toBe(true);
    expect(isTabActive(tabs[0], '/cohorts/2026/fellows/habiba-banu', 2026)).toBe(true);
    expect(isTabActive(tabs[0], '/cohorts/2026/week', 2026)).toBe(false);
  });
  it('marks other tabs active by prefix', () => {
    expect(isTabActive(tabs[1], '/cohorts/2026/week', 2026)).toBe(true);
    expect(isTabActive(tabs[2], '/cohorts/2026/week', 2026)).toBe(false);
  });
});
```

`lib/fellows.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getAllFellows, getFellow, getFellowCards, getFellowNumber, initials } from './fellows';

describe('fellows', () => {
  it('has 11 fellows in 2026', () => {
    expect(getAllFellows(2026)).toHaveLength(11);
  });
  it('returns [] for an unknown cohort', () => {
    expect(getAllFellows(1999)).toEqual([]);
  });
  it('finds by year and slug', () => {
    expect(getFellow(2026, 'habiba-banu')?.name).toBe('Habiba Banu');
    expect(getFellow(2026, 'nobody')).toBeNull();
    expect(getFellow(1999, 'habiba-banu')).toBeNull();
  });
  it('numbers fellows 1-based', () => {
    expect(getFellowNumber(2026, getAllFellows(2026)[0].id)).toBe(1);
    expect(getFellowNumber(2026, 'nobody')).toBe(0);
  });
  it('every fellow has a card summary', () => {
    for (const f of getAllFellows(2026)) expect(f.card_summary.trim().length).toBeGreaterThan(20);
  });
  it('stores contact details but keeps them out of cards', () => {
    expect(getFellow(2026, 'habiba-banu')?.email).toBe('habiba.banu@spiro.ngo');
    const card = getFellowCards(2026)[0];
    expect(Object.keys(card).sort()).toEqual(['init', 'name', 'org', 'photo_url', 'sector', 'slug', 'summary'].sort());
  });
});

describe('initials', () => {
  it('takes the first two initials, uppercased', () => {
    expect(initials('Habiba Banu')).toBe('HB');
    expect(initials('Dr. Rubeena Kidwai')).toBe('DR');
  });
});
```

- [ ] **Step 3: Run and confirm they fail**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./cohorts"`, plus `getFellowCards` / `getFellowNumber` / `initials` not exported.

- [ ] **Step 4: Move the fellows data and add `card_summary`**

```bash
mkdir -p data/cohorts/2026
git mv data/fellows-deep.json data/cohorts/2026/fellows.json
```

Add `card_summary`, `email` and `phone` fields to each record in `data/cohorts/2026/fellows.json`, copied verbatim from `model`, `email` and `phone` in `app/fellows/page.tsx` (`FELLOWS_DATA`), keyed by `id`. The `card_summary` values are:

| id | card_summary |
|---|---|
| rubeena-kidwai | Provides mental health support through helplines and counseling services to reduce stigma and increase awareness in Pakistan. Played a key role in decriminalizing suicide. |
| azima-dhanjee | Makes hearing aids affordable and accessible to low-income hearing-impaired people through innovative design and financing options. |
| habiba-banu | Provides affordable respiratory care and asthma management tools for low-income patients, addressing the gap in diagnostic capabilities in Pakistan's healthcare system. |
| saad-hussain | Uses AI-powered voice-activated technology in Urdu to help health workers detect maternal health risks early. Improved risk detection from 7% to 40% in pilot testing. |
| lala-rukh | Brings STEM education to underserved students through hands-on activities and shows. Impacted 45,000 children and trained 650 teachers across 250 schools in Pakistan. |
| khushbakht-shah | Uses AI to support domestic violence survivors in Pakistan by analyzing evidence, detecting bias, and generating legal briefs to help accelerate protection orders. |
| maira-siddiqui | Turns Pakistan's school curriculum into gamified cartoons in local languages (Urdu, Punjabi, Pashto). Makes learning accessible via smartphone for grades nursery to 5. |
| adnan-qureshi | Brings digital learning to underserved communities through MicroSchools and smartphone apps. Currently serves 14,317 students across 141 schools with plans to expand significantly. |
| muhammad-waqas | Creates augmented reality games to help children with special needs (autism, cerebral palsy, ADHD) develop physical, cognitive, and social skills. Operating in 45 Pakistani schools. |
| ali-siddiq | Bridges the gap between university education and the job market through a 3-month fellowship teaching critical thinking and professional skills. 81% of graduates are employed within 3 months. |
| osama-shahid | Empowers marginalized communities through fair trade practices and direct market linkages, ensuring farmers and artisans receive fair prices for their products. |

Copy `email` and `phone` exactly as they appear in `FELLOWS_DATA` (e.g. `habiba-banu` → `habiba.banu@spiro.ngo`, `+44 7703 563 810`). They are stored, never rendered.

- [ ] **Step 5: Create `data/cohorts/index.json`**

```json
[
  {
    "year": 2026,
    "label": "2026 · Skardu",
    "dates": "7–14 June 2026",
    "venue": "Khoj Resort",
    "location": "Skardu, Gilgit-Baltistan",
    "summary": "The inaugural cohort: eleven Pakistani founders, seven days in the Shigar valley, one question — how does this reach millions?"
  }
]
```

- [ ] **Step 6: Create `lib/cohorts.ts`**

```ts
import cohortsData from '@/data/cohorts/index.json';

export type Cohort = {
  year: number;
  label: string;
  dates: string;
  venue: string;
  location: string;
  summary: string;
};

export type CohortTab = { href: string; label: string };

export function getCohorts(): Cohort[] {
  return [...(cohortsData as Cohort[])].sort((a, b) => b.year - a.year);
}

export function getCohort(year: number): Cohort | null {
  return getCohorts().find((c) => c.year === year) ?? null;
}

export function getLatestCohort(): Cohort {
  return getCohorts()[0];
}

export function getCohortTabs(year: number): CohortTab[] {
  const root = `/cohorts/${year}`;
  return [
    { href: root, label: 'Fellows' },
    { href: `${root}/week`, label: 'The Week' },
    { href: `${root}/venue`, label: 'Venue' },
    { href: `${root}/explore`, label: 'Explore Skardu' },
  ];
}

export function isTabActive(tab: CohortTab, pathname: string, year: number): boolean {
  const root = `/cohorts/${year}`;
  if (tab.href === root) return pathname === root || pathname.startsWith(`${root}/fellows`);
  return pathname === tab.href || pathname.startsWith(`${tab.href}/`);
}
```

- [ ] **Step 7: Replace `lib/fellows.ts`**

```ts
import fellows2026 from '@/data/cohorts/2026/fellows.json';

export type Fellow = {
  id: string;
  name: string;
  org: string;
  sector: string;
  tagline: string;
  idea_context: string;
  mission: string;
  how_it_works: string;
  the_dream: string;
  structure: string;
  geography: string;
  org_url: string;
  fellow_linkedin: string;
  photo_url: string | null;
  photo_source: string | null;
  sources: string[];
  card_summary: string;
  email: string;
  phone: string;
};

export type FellowCard = {
  slug: string;
  init: string;
  name: string;
  org: string;
  sector: string;
  summary: string;
  photo_url?: string;
};

/** Add one line per cohort year. Static imports keep pages statically generated. */
const FELLOWS_BY_YEAR: Record<number, Fellow[]> = {
  2026: fellows2026 as Fellow[],
};

export function getAllFellows(year: number): Fellow[] {
  return FELLOWS_BY_YEAR[year] ?? [];
}

export function getFellow(year: number, slug: string): Fellow | null {
  return getAllFellows(year).find((f) => f.id === slug) ?? null;
}

export function getFellowNumber(year: number, slug: string): number {
  return getAllFellows(year).findIndex((f) => f.id === slug) + 1;
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getFellowCards(year: number): FellowCard[] {
  return getAllFellows(year).map((f) => ({
    slug: f.id,
    init: initials(f.name),
    name: f.name,
    org: f.org,
    sector: f.sector,
    summary: f.card_summary,
    photo_url: f.photo_url ?? undefined,
  }));
}
```

- [ ] **Step 8: Delete the unused files (only those confirmed in Step 1)**

```bash
git rm data/schedule.json data/logistics.json data/resources.json lib/types.ts lib/utils.ts
```

- [ ] **Step 9: Run tests and confirm they pass**

Run: `npm test`
Expected: PASS. (`npm run build` will fail until Tasks 4–5 update the old importers of `getFellow(slug)`. That's expected; don't build yet.)

- [ ] **Step 10: Commit**

```bash
git add -A data lib
git commit -m "feat: add cohort registry and cohort-aware fellows data

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Cohort index, 2026 hub, fellows tab and fellow profiles

**Files:**
- Create: `app/cohorts/page.tsx`, `app/cohorts/cohorts.module.css`, `app/cohorts/_components/CohortBar.tsx`, `app/cohorts/_components/CohortBar.module.css`, `app/cohorts/_components/CohortTabs.tsx`, `app/cohorts/2026/layout.tsx`, `app/cohorts/2026/page.tsx`
- Move: `app/fellows/[slug]/components/*` → `app/cohorts/_components/fellow/`; `app/fellows/[slug]/page.module.css` → `app/cohorts/_components/fellow/fellow-detail.module.css`; `app/fellows/[slug]/page.tsx` → `app/cohorts/2026/fellows/[slug]/page.tsx`
- Modify: `app/components/FellowsBits.tsx`, `app/cohorts/_components/fellow/FellowHero.tsx`
- Delete: `app/fellows/page.tsx`
- Test: `scripts/smoke-routes.mjs`

**Interfaces:**
- Consumes: `getCohort`, `getCohorts`, `getCohortTabs`, `isTabActive`, `getAllFellows`, `getFellow`, `getFellowNumber`, `getFellowCards`, `FellowCard` from Task 3.
- Produces: `FellowsBits` props `{ fellows: FellowCard[]; basePath: string }`; `FellowHero` props `{ fellow: Fellow; number: number; total: number }`.

- [ ] **Step 1: Add failing smoke expectations** (append to `ROUTES`)

```js
  { path: '/cohorts', status: 200, contains: ['2026 · Skardu'] },
  { path: '/cohorts/2026', status: 200, contains: ['Eleven founders', 'The Week', 'Habiba Banu'] },
  { path: '/cohorts/2026/fellows/habiba-banu', status: 200, contains: ['Habiba Banu', 'The Mission'] },
  { path: '/cohorts/2026/fellows/nobody', status: 404 },
  { path: '/cohorts/1999', status: 404 },
  { path: '/fellows', status: 404 },
  { path: '/fellows/habiba-banu', status: 404 },
```

- [ ] **Step 2: Move the fellow detail files**

```bash
mkdir -p app/cohorts/_components "app/cohorts/2026/fellows/[slug]"
git mv "app/fellows/[slug]/components" app/cohorts/_components/fellow
git mv "app/fellows/[slug]/page.module.css" app/cohorts/_components/fellow/fellow-detail.module.css
git mv "app/fellows/[slug]/page.tsx" "app/cohorts/2026/fellows/[slug]/page.tsx"
git rm app/fellows/page.tsx
sed -i "s#from '../page.module.css'#from './fellow-detail.module.css'#" app/cohorts/_components/fellow/*.tsx
grep -n "module.css" app/cohorts/_components/fellow/*.tsx
```

Expected grep: all five components import `./fellow-detail.module.css`.

- [ ] **Step 3: Make `FellowHero` take its number from props**

In `app/cohorts/_components/fellow/FellowHero.tsx`, change the import to `import { Fellow, initials } from '@/lib/fellows';`. Change the props type to `{ fellow: Fellow; number: number; total: number }` and the signature to `export function FellowHero({ fellow, number, total }: FellowHeroProps)`. Replace the initials calculation and the `allFellows` lines with:

```tsx
  const fellowInitials = initials(fellow.name);
```

In the JSX, replace every use of the old `initials` variable with `fellowInitials`. Change the meta line to:

```tsx
            FELLOW NO. {number.toString().padStart(2, '0')} / {total} / {fellow.sector.toUpperCase()}
```

- [ ] **Step 4: Rewrite `app/cohorts/2026/fellows/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { getAllFellows, getFellow, getFellowNumber } from '@/lib/fellows';
import { FellowHero } from '../../../_components/fellow/FellowHero';
import { IdeaBand } from '../../../_components/fellow/IdeaBand';
import { FellowSection } from '../../../_components/fellow/FellowSection';
import { FellowSidebar } from '../../../_components/fellow/FellowSidebar';
import { FellowNavigation } from '../../../_components/fellow/FellowNavigation';
import styles from '../../../_components/fellow/fellow-detail.module.css';

const YEAR = 2026;

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFellows(YEAR).map((f) => ({ slug: f.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(YEAR, slug);
  if (!fellow) return {};
  return {
    title: `${fellow.name} — ${YEAR} Cohort — Summit Fellowship`,
    description: fellow.tagline,
  };
}

export default async function FellowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(YEAR, slug);
  if (!fellow) notFound();

  return (
    <div className={styles['fellow-detail']}>
      <FellowNavigation />
      <FellowHero fellow={fellow} number={getFellowNumber(YEAR, slug)} total={getAllFellows(YEAR).length} />
      <IdeaBand fellow={fellow} />
      <div className={styles['fellow-detail__body']}>
        <div className={styles['fellow-detail__content']}>
          <FellowSection title="The Mission" content={fellow.mission} />
          <FellowSection title="How It Works" content={fellow.how_it_works} />
        </div>
        <FellowSidebar fellow={fellow} />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Update `app/components/FellowsBits.tsx` to use `FellowCard` and `basePath`**

Delete the local `Fellow` type. Add `import type { FellowCard } from '@/lib/fellows';`. Change the signature to:

```tsx
export default function FellowsBits({ fellows, basePath }: { fellows: FellowCard[]; basePath: string }) {
```

In the card markup: `key={f.slug}`, `href={`${basePath}/${f.slug}`}`, and replace `f.model` with `f.summary` (both occurrences).

- [ ] **Step 6: Create `app/cohorts/_components/CohortTabs.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCohortTabs, isTabActive } from '@/lib/cohorts';
import styles from './CohortBar.module.css';

export default function CohortTabs({ year }: { year: number }) {
  const pathname = usePathname();
  return (
    <nav className={styles['cohort-bar__tabs']} aria-label={`${year} cohort sections`}>
      {getCohortTabs(year).map((tab) => {
        const active = isTabActive(tab, pathname, year);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles['cohort-bar__tab']}${active ? ` ${styles['cohort-bar__tab--active']}` : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 7: Create `app/cohorts/_components/CohortBar.tsx`**

```tsx
import Link from 'next/link';
import type { Cohort } from '@/lib/cohorts';
import CohortTabs from './CohortTabs';
import styles from './CohortBar.module.css';

export default function CohortBar({ cohort }: { cohort: Cohort }) {
  return (
    <div className={styles['cohort-bar']}>
      <div className={`container ${styles['cohort-bar__inner']}`}>
        <p className={styles['cohort-bar__label']}>
          <Link href="/cohorts">Cohorts</Link>
          <span aria-hidden="true">/</span>
          <span>
            {cohort.year} · {cohort.venue}, {cohort.location} · {cohort.dates}
          </span>
        </p>
        <CohortTabs year={cohort.year} />
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Create `app/cohorts/_components/CohortBar.module.css`**

```css
.cohort-bar {
  background: var(--alpine);
  color: var(--parchment);
  border-bottom: 1px solid var(--alpine-soft);
}
.cohort-bar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  flex-wrap: wrap;
}
.cohort-bar__label {
  display: flex;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ochre-pale);
  margin: 0;
}
.cohort-bar__label a { color: var(--ochre); }
.cohort-bar__tabs { display: flex; gap: 4px; overflow-x: auto; }
.cohort-bar__tab {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--parchment);
  padding: 10px 14px;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}
.cohort-bar__tab:hover { color: var(--ochre-pale); }
.cohort-bar__tab--active { color: var(--ochre); border-bottom-color: var(--ochre); }
@media (max-width: 640px) {
  .cohort-bar__inner { flex-direction: column; align-items: flex-start; gap: 8px; }
  .cohort-bar__label { font-size: 10px; flex-wrap: wrap; }
  .cohort-bar__tabs { width: 100%; }
  .cohort-bar__tab { padding: 10px 10px; }
}
```

- [ ] **Step 9: Create `app/cohorts/2026/layout.tsx`**

```tsx
import { getCohort } from '@/lib/cohorts';
import CohortBar from '../_components/CohortBar';

export default function Cohort2026Layout({ children }: { children: React.ReactNode }) {
  const cohort = getCohort(2026);
  if (!cohort) throw new Error('Cohort 2026 missing from data/cohorts/index.json');
  return (
    <>
      <CohortBar cohort={cohort} />
      {children}
    </>
  );
}
```

- [ ] **Step 10: Create `app/cohorts/2026/page.tsx` (the Fellows tab)**

```tsx
import Link from 'next/link';
import { getFellowCards } from '@/lib/fellows';
import FellowsBits from '../../components/FellowsBits';

export const metadata = {
  title: 'The 2026 Fellows — Summit Fellowship',
  description: 'The inaugural cohort: eleven Pakistani founders building solutions designed for scale.',
};

export default function Cohort2026FellowsPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="2026 Fellows Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs">
            <Link href="/">Home</Link><span>/</span><Link href="/cohorts">Cohorts</Link><span>/</span><span>2026</span>
          </div>
          <h1 className="page-hero__title">
            Eleven founders.<br />
            <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>One ascent.</em>
          </h1>
          <p className="page-hero__subtitle">
            The 2026 fellows span mental health to special education, AI-powered legal aid to
            gamified curriculum. Each leader passed a rigorous selection — then redesigned for
            millions.
          </p>
        </div>
      </section>
      <FellowsBits fellows={getFellowCards(2026)} basePath="/cohorts/2026/fellows" />
    </>
  );
}
```

- [ ] **Step 11: Create `app/cohorts/page.tsx` and `app/cohorts/cohorts.module.css`**

```tsx
import Link from 'next/link';
import { getCohorts } from '@/lib/cohorts';
import { getAllFellows } from '@/lib/fellows';
import styles from './cohorts.module.css';

export const metadata = {
  title: 'Cohorts — Summit Fellowship',
  description: 'Every Summit Fellowship cohort: the founders, the week, and where it happened.',
};

export default function CohortsPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Cohorts Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Cohorts</span></div>
          <h1 className="page-hero__title">Every <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>cohort.</em></h1>
          <p className="page-hero__subtitle">The founders who have done the work, the week they spent, and where they spent it.</p>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.cohorts__list}`}>
          {getCohorts().map((c) => (
            <Link key={c.year} href={`/cohorts/${c.year}`} className={styles.cohorts__card}>
              <span className="eyebrow">{c.dates}</span>
              <h2 className={styles.cohorts__title}>{c.label}</h2>
              <p className={styles.cohorts__meta}>
                {c.venue}, {c.location} · {getAllFellows(c.year).length} fellows
              </p>
              <p className={styles.cohorts__summary}>{c.summary}</p>
              <span className={styles.cohorts__more}>Explore the cohort →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
```

```css
.cohorts__list { display: grid; gap: 24px; }
.cohorts__card {
  display: block;
  background: var(--paper-cool);
  border: 1px solid var(--line);
  padding: 32px;
  color: var(--ink);
  transition: border-color .2s var(--ease-out);
}
.cohorts__card:hover { border-color: var(--ochre); }
.cohorts__title { font-size: clamp(32px, 4vw, 48px); color: var(--alpine-deep); margin: 8px 0; }
.cohorts__meta { font-family: var(--mono); font-size: 12px; color: var(--ink-mute); text-transform: uppercase; letter-spacing: 0.08em; }
.cohorts__summary { margin: 16px 0; color: var(--ink-soft); max-width: 60ch; }
.cohorts__more { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--clay); }
@media (max-width: 640px) { .cohorts__card { padding: 24px; } }
```

- [ ] **Step 12: Build, start, smoke, test**

```bash
npm test && npm run build
npx next start -p 3100   # background
npm run smoke
```

Expected: every route ok, including the 404s. If `/cohorts/1999` returns 200, it means the build failed to treat it as unknown. It must be a 404 because no `app/cohorts/[year]` route exists.

Note: the build will still fail while `app/itinerary`, `app/venue` and `app/explore-skardu` reference removed things. If it does, do Task 5 Steps 2–4 first and run this step at the end of Task 5 instead.

- [ ] **Step 13: Commit**

```bash
git add -A app scripts/smoke-routes.mjs
git commit -m "feat: add cohort index and 2026 hub with fellows tab

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Move The Week, Venue and Explore into the 2026 hub; drop old routes

**Files:**
- Move: `app/itinerary/page.tsx` → `app/cohorts/2026/week/page.tsx`; `app/venue/` → `app/cohorts/2026/venue/`; `app/explore-skardu/` → `app/cohorts/2026/explore/`
- Delete: `app/resources/`, `app/travel/` (empty), `app/components/EventDate.tsx` is **not** deleted here (Task 7 replaces it)
- Test: `scripts/smoke-routes.mjs`

- [ ] **Step 1: Add failing smoke expectations**

```js
  { path: '/cohorts/2026/week', status: 200, contains: ['Arrivals', 'Mulago'] },
  { path: '/cohorts/2026/venue', status: 200, contains: ['Khoj Resort'] },
  { path: '/cohorts/2026/explore', status: 200, contains: ['Baltistan'] },
  { path: '/itinerary', status: 404 },
  { path: '/venue', status: 404 },
  { path: '/explore-skardu', status: 404 },
  { path: '/resources', status: 404 },
  { path: '/travel', status: 404 },
```

- [ ] **Step 2: Move and delete**

```bash
mkdir -p app/cohorts/2026/week
git mv app/itinerary/page.tsx app/cohorts/2026/week/page.tsx
git mv app/venue app/cohorts/2026/venue
git mv app/explore-skardu app/cohorts/2026/explore
git rm -r app/resources
rmdir app/travel app/itinerary app/fellows/[slug] app/fellows 2>/dev/null; ls app
```

Expected `ls app`: no `itinerary`, `venue`, `explore-skardu`, `resources`, `travel` or `fellows`.

- [ ] **Step 3: Fix imports, breadcrumbs and metadata in the moved pages**

`app/cohorts/2026/week/page.tsx`:
- `import ItineraryBits, { type Day } from '../components/ItineraryBits';` becomes `import ItineraryBits, { type Day } from '@/app/components/ItineraryBits';`
- `title: 'Itinerary — Summit Fellowship 2026'` becomes `title: 'The Week — 2026 Cohort — Summit Fellowship'`
- Any breadcrumb `<Link href="/">Home</Link><span>/</span><span>Itinerary</span>` becomes `<Link href="/">Home</Link><span>/</span><Link href="/cohorts/2026">2026 Cohort</Link><span>/</span><span>The Week</span>` (find it with `grep -n "crumbs" app/cohorts/2026/week/page.tsx`)

`app/cohorts/2026/venue/page.tsx`:
- `title: 'Khoj Resort, Skardu — Summit Fellowship'` becomes `title: 'Venue — 2026 Cohort — Summit Fellowship'`
- Crumbs `<span>Venue</span>` becomes `<Link href="/cohorts/2026">2026 Cohort</Link>` + `<span>/</span>` + `<span>Venue</span>`

`app/cohorts/2026/explore/page.tsx`:
- `title: 'Explore Skardu — Summit Fellowship 2026'` becomes `title: 'Explore Skardu — 2026 Cohort — Summit Fellowship'`
- Crumbs `<span>Explore Skardu</span>` becomes `<Link href="/cohorts/2026">2026 Cohort</Link>` + `<span>/</span>` + `<span>Explore Skardu</span>`

- [ ] **Step 4: Check that no links to removed routes remain**

Run: `grep -rnE "href=[\"'{\`]+/(fellows|itinerary|venue|explore-skardu|travel|resources)" app`
Expected: matches only in `app/components/Header.tsx`, `app/components/Footer.tsx` and `app/page.tsx` (all rewritten in Tasks 6–7). Any other match: point it at the new `/cohorts/2026/...` path.

- [ ] **Step 5: Build, start, smoke**

```bash
npm test && npm run build && npx next start -p 3100   # background
npm run smoke
```

Expected: all Task 4 and Task 5 routes ok.

- [ ] **Step 6: Visual check of the hub at 1440 / 768 / 375**

Open `/cohorts/2026`, `/cohorts/2026/week`, `/cohorts/2026/venue`, `/cohorts/2026/explore` and one fellow profile at each width. Check that the cohort bar sits under the header, the active tab is underlined in ochre, tabs scroll sideways at 375 without the page scrolling sideways, and the fellow profile's fixed close button (top: 80px) doesn't cover the cohort tabs. If it does, change `.fellow-navigation { top: 80px; }` in `fellow-detail.module.css` to `top: 140px`, then recheck at 375.

- [ ] **Step 7: Commit**

```bash
git add -A app scripts/smoke-routes.mjs
git commit -m "feat: move week, venue and explore into the 2026 cohort hub

Removes /itinerary, /venue, /explore-skardu, /fellows, /resources.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Navigation model, header and footer

**Files:**
- Create: `lib/navigation.ts`, `lib/navigation.test.ts`, `app/components/NavDropdown.tsx`
- Modify: `app/components/Header.tsx` (rewrite), `app/components/Footer.tsx` (rewrite), `app/globals.css` (replace the people/logistics/program dropdown rules)
- Test: `scripts/smoke-routes.mjs`

**Interfaces:**
- Consumes: `getCohorts` (Task 3), `getSiteSettings`, `getApplyCta` (Task 1)
- Produces: `type NavLink = { href: string; label: string }`, `type NavGroup = { label: string; links: NavLink[] }`, `getNavGroups(): NavGroup[]`, `PRIMARY_LINKS: NavLink[]`

- [ ] **Step 1: Write the failing test `lib/navigation.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { PRIMARY_LINKS, getNavGroups } from './navigation';

describe('navigation', () => {
  it('has About and Cohorts groups', () => {
    const groups = getNavGroups();
    expect(groups.map((g) => g.label)).toEqual(['About', 'Cohorts']);
    expect(groups[0].links.map((l) => l.href)).toEqual(['/curriculum', '/faculty']);
  });
  it('lists every cohort year under Cohorts', () => {
    const cohorts = getNavGroups()[1].links;
    expect(cohorts[0]).toEqual({ href: '/cohorts/2026', label: '2026 · Skardu' });
  });
  it('has FAQ and Contact as primary links', () => {
    expect(PRIMARY_LINKS).toEqual([
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ]);
  });
});
```

- [ ] **Step 2: Run and confirm it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./navigation"`.

- [ ] **Step 3: Create `lib/navigation.ts`**

```ts
import { getCohorts } from './cohorts';

export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; links: NavLink[] };

export const PRIMARY_LINKS: NavLink[] = [
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function getNavGroups(): NavGroup[] {
  return [
    {
      label: 'About',
      links: [
        { href: '/curriculum', label: 'Curriculum' },
        { href: '/faculty', label: 'Faculty' },
      ],
    },
    {
      label: 'Cohorts',
      links: getCohorts().map((c) => ({ href: `/cohorts/${c.year}`, label: c.label })),
    },
  ];
}
```

- [ ] **Step 4: Run and confirm it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Replace the three dropdown blocks in `app/globals.css`**

Delete the rules for `.site-nav__people`, `.site-nav__people-trigger`, `.site-nav__people-trigger:hover`, `.site-nav__logistics`, `.site-nav__logistics-trigger`, `.site-nav__logistics-trigger:hover`, `.site-nav__program`, `.site-nav__program-trigger`, `.site-nav__program-trigger:hover` (the "People dropdown", "Logistics dropdown" and "Program dropdown" comment blocks). Also delete the three `.is-open .site-nav__dropdown` lines and the six `body.menu-open .site-nav__{people,program,logistics}…` lines. Insert in their place:

```css
/* Header dropdown group */
.site-nav__group { position: relative; display: inline-flex; }
.site-nav__group-trigger {
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--ink-soft);
  line-height: 1;
}
.site-nav__group-trigger:hover { color: var(--alpine-deep); background: var(--paper-warm); }
.site-nav__group.is-open .site-nav__dropdown { opacity: 1; visibility: visible; transform: translateY(0); }
```

Inside the existing mobile media block (where the `body.menu-open .site-nav__people` lines were), add:

```css
  body.menu-open .site-nav__group { display: block; width: 100%; }
  body.menu-open .site-nav__group-trigger { width: 100%; justify-content: flex-start; padding: 12px 0; font-size: 13px; }
```

Then run `grep -n "site-nav__\(people\|program\|logistics\)" app/globals.css`. Expected: no output.

- [ ] **Step 6: Create `app/components/NavDropdown.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { NavGroup } from '@/lib/navigation';

export default function NavDropdown({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      className={`site-nav__group${open ? ' is-open' : ''}`}
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="site-nav__link site-nav__group-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {group.label}
        <span className={`site-nav__caret${open ? ' is-open' : ''}`} aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3.5 5 6.5 8 3.5" />
          </svg>
        </span>
      </button>
      <div className="site-nav__dropdown" role="menu">
        {group.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="site-nav__dropdown-item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onNavigate();
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Rewrite `app/components/Header.tsx`**

Keep the existing logo `<Link>` / SVG / wordmark markup and the existing hamburger `<button className="menu-toggle">…</button>` markup verbatim. Replace everything else so the file is:

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRIMARY_LINKS, getNavGroups } from '@/lib/navigation';
import NavDropdown from './NavDropdown';

const GROUPS = getNavGroups();

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeAllMenus = () => {
    setOpen(false);
    document.body.classList.remove('menu-open');
  };

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle('menu-open', next);
      return next;
    });
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* existing logo <Link className="site-header__logo" …> block, unchanged */}
        <nav className="site-nav" aria-label="Primary">
          {GROUPS.map((g) => (
            <NavDropdown key={g.label} group={g} onNavigate={closeAllMenus} />
          ))}
          {PRIMARY_LINKS.map((l) => (
            <Link key={l.href} className="site-nav__link" href={l.href} onClick={closeAllMenus}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link className="site-header__cta" href="/apply" onClick={closeAllMenus}>
          Apply →
        </Link>
        {/* existing <button className="menu-toggle" …> block, unchanged */}
      </div>
    </header>
  );
}
```

(The old home-icon link is dropped; the logo already links home.)

- [ ] **Step 8: Rewrite `app/components/Footer.tsx`**

```tsx
import Link from 'next/link';
import { PRIMARY_LINKS, getNavGroups } from '@/lib/navigation';

const COLUMNS = [
  ...getNavGroups(),
  { label: 'Apply', links: [{ href: '/apply', label: 'How to apply' }, ...PRIMARY_LINKS] },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="topo-bg" aria-hidden="true" />
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <h3>
              Summit
              <br />
              Fellowship
            </h3>
            <p>
              A seven-day intensive for Pakistan&apos;s most promising social enterprises, co-hosted by
              Taleemabad &amp; Mulago Foundation.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.label} className="site-footer__col">
              <h4>{col.label}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} · Summit Fellowship</span>
          <span>Taleemabad · Mulago Foundation · Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 9: Add smoke expectations**

```js
  { path: '/curriculum', status: 200, contains: ['Apply →', 'Cohorts', '2026 · Skardu', 'FAQ'] },
```

- [ ] **Step 10: Build, smoke, lint**

```bash
npm test && npm run build && npx next start -p 3100   # background
npm run smoke && npm run lint
```

Expected: all ok, and lint exits 0.

- [ ] **Step 11: Manual menu check (Review Focus #5)**

At 1440: hover About, then Cohorts. Each opens, and Escape closes it. At 375: open the hamburger, tap About (it expands inside the menu), tap Curriculum. The page navigates **and** the hamburger menu closes. Repeat with Cohorts → 2026 · Skardu. Then open the menu and tap Apply: it navigates and the menu closes.

- [ ] **Step 12: Commit**

```bash
git add -A lib app scripts/smoke-routes.mjs
git commit -m "feat: rebuild header and footer around About, Cohorts, FAQ and Apply

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Homepage and deadline band

**Files:**
- Create: `app/components/DeadlineBand.tsx`, `app/home.module.css`, `app/faculty/people.tsx`
- Modify: `app/page.tsx` (rewrite), `app/faculty/page.tsx` (import people), `app/globals.css` (remove `.actions*`, `.action-item*` and `.covered-callout*` rules only after the grep in Step 8)
- Delete: `app/components/EventDate.tsx`
- Test: `scripts/smoke-routes.mjs`

**Interfaces:**
- Consumes: `getSiteSettings`, `getApplyCta`, `getDeadlineText`, `isApplicationLive`, `displayValue` (Task 1); `getFellowCards`, `getLatestCohort` (Task 3)
- Produces: `app/faculty/people.tsx` exports `type Person`, `FACULTY`, `ADVISORS`, `ORGANIZERS` (unchanged shapes)

- [ ] **Step 1: Add failing smoke expectations** (replace the Task 2 `/` entry)

```js
  { path: '/', status: 200, contains: ['Staging — not the live site', 'Applications opening soon', 'What you get', 'How it works', 'Meet the 2026 fellows', 'Ready to design for scale?'] },
```

Also add a negative check: extend `scripts/smoke.mjs` to support `absent`. After the `contains` loop, add:

```js
  for (const text of r.absent ?? []) {
    if (body.includes(text)) problems.push(`unexpected "${text}"`);
  }
```

and add `absent: ['Before you arrive', 'Fellowship 2026']` to the `/` entry.

- [ ] **Step 2: Run smoke and confirm `/` fails**

Expected: `FAIL /: missing "What you get"…; unexpected "Before you arrive"`.

- [ ] **Step 3: Extract faculty data to `app/faculty/people.tsx`**

Move the `Person` type and the `FACULTY`, `ADVISORS` and `ORGANIZERS` arrays verbatim from `app/faculty/page.tsx` into `app/faculty/people.tsx`, adding `export` to each. In `app/faculty/page.tsx`, add `import { ADVISORS, FACULTY, ORGANIZERS, type Person } from './people';`. Run `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 4: Create `app/components/DeadlineBand.tsx` and delete `EventDate.tsx`**

```tsx
import { getDeadlineText, getSiteSettings } from '@/lib/site';

/** Application-deadline band. Renders nothing while applications are not live. */
export default function DeadlineBand() {
  const deadline = getDeadlineText(getSiteSettings().currentCohort);
  if (!deadline) return null;
  return (
    <section className="event-date" aria-label="Application deadline">
      <div className="event-date__bg" aria-hidden="true" />
      <div className="event-date__inner">
        <span className="event-date__label">Applications close</span>
        <p className="event-date__value">{deadline}</p>
      </div>
    </section>
  );
}
```

```bash
git rm app/components/EventDate.tsx
```

- [ ] **Step 5: Rewrite `app/page.tsx`**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import DeadlineBand from './components/DeadlineBand';
import ExponentialChart from './components/ExponentialChart';
import { FACULTY } from './faculty/people';
import { getLatestCohort } from '@/lib/cohorts';
import { getFellowCards } from '@/lib/fellows';
import { displayValue, getApplyCta, getDeadlineText, getSiteSettings } from '@/lib/site';
import styles from './home.module.css';

export const metadata = {
  title: 'Summit Fellowship — Designed for Scale',
  description:
    "Curating Pakistan's finest impact organisations and matching them with strategy, mentoring, and capital to scale.",
};

const OFFER = [
  { title: 'Seven days, fully present', desc: 'An immersive residential retreat in Northern Pakistan. No email, no calls during sessions — just the work.' },
  { title: 'The Mulago scale framework', desc: 'Mission, Big Idea, doer and payer at scale, and the tests every scalable solution has to pass.' },
  { title: 'Mentoring from people who have scaled', desc: 'Venture diagnostics and strategy clinics with Mulago Foundation and Pakistani faculty.' },
  { title: 'Demo Day', desc: 'Present your scale blueprint to funders actively investing in Pakistan.' },
];

const STEPS = [
  { num: '01', title: 'Apply', desc: 'A focused written application: numbers, names, dates — about 25 minutes once you have gathered them.' },
  { num: '02', title: 'Conversation', desc: 'Shortlisted founders have one 45-minute conversation with the Mulago and Taleemabad team.' },
  { num: '03', title: 'Selection', desc: 'Twelve organisations are selected, plus a small number of alternates.' },
  { num: '04', title: 'The retreat', desc: 'Seven days redesigning your model for scale, ending with Demo Day.' },
  { num: '05', title: 'After', desc: 'Ongoing mentorship and a peer network of Pakistan’s most ambitious founders.' },
];

export default function HomePage() {
  const cohort = getSiteSettings().currentCohort;
  const cta = getApplyCta(cohort);
  const deadline = getDeadlineText(cohort);
  const latest = getLatestCohort();
  const fellows = getFellowCards(latest.year);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" data-screen-label="Home Hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="topo-bg" aria-hidden="true" />
        <div className="hero__body">
          <div className="hero__lockup">
            <div className="hero__eyebrow">
              <span className="line" />
              <span>For Pakistani social innovators designing for scale</span>
            </div>
            <h1 className="hero__title">
              <span className="stack">Summit</span>
              <span className="stack">Fellowship</span>
            </h1>
            <p className="hero__sub">
              Curating Pakistan&apos;s finest impact companies and matching them with strategy, mentoring, and capital to scale.
            </p>
            <div className="hero__cta-row">
              <Link className="btn btn--ochre" href={cta.href}>
                {cta.label} <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero__meta-strip">
          <div className="hero__meta-strip-inner">
            {deadline && (
              <div className="hero__meta-item">
                <span className="label">Applications close</span>
                <div className="value">{deadline}</div>
              </div>
            )}
            <div className="hero__meta-item">
              <span className="label">Next cohort</span>
              <div className="value">{displayValue(cohort.retreatDates)}</div>
            </div>
            <div className="hero__meta-item">
              <span className="label">Location</span>
              <div className="value">{displayValue(cohort.location)}</div>
            </div>
          </div>
        </div>
      </section>

      <DeadlineBand />

      {/* ============ WHY ============ */}
      <section className="whatis section">
        <div className="topo-bg topo-bg--subtle" aria-hidden="true" />
        <div className="container">
          <div className="whatis-block whatis-block--split">
            <div className="whatis-block__kicker">
              <div className="eyebrow whatis__label">Why this fellowship</div>
              <h2 className="whatis-block__heading">Pakistan has extraordinary founders. Scale is the next frontier.</h2>
            </div>
            <div className="whatis-block__body">
              <p className="whatis__body">
                240 million people. A learning crisis. A hunger crisis. A mental health system that barely exists.
                A generation of founders has decided not to wait - and they are building real solutions, with real
                evidence, at real cost. But few reach national scale. Most stay caught in project-driven survival -
                securing grants, reaching thousands, when their models could reach millions.{' '}
                <strong className="whatis__emphasis">We are changing that.</strong>
              </p>
            </div>
          </div>
          <div className="whatis-block whatis-block--split">
            <div className="whatis-block__kicker">
              <div className="eyebrow whatis__label">The Fellowship</div>
              <h2 className="whatis-block__heading">Seven days to redesign for scale.</h2>
            </div>
            <div className="whatis-block__body">
              <p className="whatis__body">
                Each year, a small cohort of Pakistani founders spends seven days in Northern Pakistan working the
                Mulago design discipline alongside Pakistani faculty - Big Idea, doer and payer at scale, the Four
                Enoughs, the Scale Screen. Fellows leave with a sharper model, an honest evidence plan, and the start
                of a narrative funders trust.
              </p>
            </div>
          </div>
          <div className="whatis-block whatis-scale">
            <div className="whatis-scale__copy">
              <div className="eyebrow whatis__label">What we mean by scale</div>
              <p className="whatis__pull">A big idea is one that can scale. Scale means exponential impact.</p>
              <div className="whatis__stack">
                <span>From one village to a country.</span>
                <span>From thousands to millions.</span>
                <span>From a working pilot to a model the country runs on.</span>
              </div>
            </div>
            <div className="whatis-scale__chart">
              <ExponentialChart />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className={`section ${styles.offer}`}>
        <div className="container">
          <div className="eyebrow">What you get</div>
          <h2 className={styles.home__heading}>A week that changes how you build.</h2>
          <div className={styles.offer__grid}>
            {OFFER.map((o) => (
              <div key={o.title} className={styles.offer__tile}>
                <h3 className={styles.offer__title}>{o.title}</h3>
                <p className={styles.offer__desc}>{o.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.offer__note}>Fully funded: accommodation, meals and domestic travel are covered.</p>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className={`section section--paper-warm ${styles.steps}`}>
        <div className="container">
          <div className="eyebrow">How it works</div>
          <h2 className={styles.home__heading}>From application to Demo Day.</h2>
          <ol className={styles.steps__list}>
            {STEPS.map((s) => (
              <li key={s.num} className={styles.steps__item}>
                <span className={styles.steps__num}>{s.num}</span>
                <h3 className={styles.steps__title}>{s.title}</h3>
                <p className={styles.steps__desc}>{s.desc}</p>
              </li>
            ))}
          </ol>
          <Link href="/apply" className="btn btn--ghost">Eligibility and timeline <span className="arrow">→</span></Link>
        </div>
      </section>

      {/* ============ PAST FELLOWS ============ */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Meet the {latest.year} fellows</div>
          <h2 className={styles.home__heading}>{fellows.length} founders who have done the work.</h2>
          <ul className={styles.people__grid}>
            {fellows.map((f) => (
              <li key={f.slug}>
                <Link href={`/cohorts/${latest.year}/fellows/${f.slug}`} className={styles.people__item}>
                  <span className={styles.people__avatar}>
                    {f.photo_url ? <Image src={f.photo_url} alt="" width={64} height={64} /> : f.init}
                  </span>
                  <span className={styles.people__name}>{f.name}</span>
                  <span className={styles.people__org}>{f.org}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/cohorts/${latest.year}`} className="btn btn--ghost">The {latest.year} cohort <span className="arrow">→</span></Link>
        </div>
      </section>

      {/* ============ FACULTY ============ */}
      <section className="section section--paper-warm">
        <div className="container">
          <div className="eyebrow">Faculty</div>
          <h2 className={styles.home__heading}>Taught by people who have scaled.</h2>
          <ul className={styles.people__grid}>
            {FACULTY.map((p) => (
              <li key={p.num} className={styles.people__item}>
                <span className={styles.people__avatar}>
                  {p.photo_url ? <Image src={p.photo_url} alt="" width={64} height={64} /> : p.init}
                </span>
                <span className={styles.people__name}>{p.name}</span>
                <span className={styles.people__org}>{p.role}</span>
              </li>
            ))}
          </ul>
          <Link href="/faculty" className="btn btn--ghost">Faculty &amp; team <span className="arrow">→</span></Link>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className={`section section--alpine ${styles.closing}`}>
        <div className="container container--narrow">
          <h2 className={styles.closing__title}>Ready to design for scale?</h2>
          <div className={styles.closing__actions}>
            <Link className="btn btn--ochre" href={cta.href}>{cta.label} <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost-light" href="/faq">Read the FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 6: Create `app/home.module.css`**

```css
.home__heading { font-size: clamp(32px, 4vw, 52px); color: var(--alpine-deep); margin: 12px 0 40px; max-width: 20ch; }

.offer__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.offer__tile { border-top: 2px solid var(--ochre); padding-top: 20px; }
.offer__title { font-size: 24px; color: var(--alpine-deep); margin-bottom: 12px; }
.offer__desc { font-size: 15px; color: var(--ink-soft); }
.offer__note { margin-top: 40px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--clay); }

.steps__list { list-style: none; padding: 0; margin: 0 0 40px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; }
.steps__item { border-left: 1px solid var(--line); padding-left: 16px; }
.steps__num { font-family: var(--mono); font-size: 11px; color: var(--clay); letter-spacing: 0.12em; }
.steps__title { font-size: 24px; color: var(--alpine-deep); margin: 8px 0; }
.steps__desc { font-size: 15px; color: var(--ink-soft); }

.people__grid { list-style: none; padding: 0; margin: 0 0 40px; display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 24px; }
.people__item { display: flex; flex-direction: column; gap: 6px; color: var(--ink); }
.people__avatar {
  width: 64px; height: 64px; border-radius: 50%; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background: var(--clay); color: var(--paper); font-family: var(--serif); font-size: 22px;
}
.people__avatar img { width: 100%; height: 100%; object-fit: cover; }
.people__name { font-family: var(--serif); font-size: 19px; color: var(--alpine-deep); line-height: 1.15; }
.people__org { font-size: 13px; color: var(--ink-mute); }

.closing { text-align: center; }
.closing__title { font-size: clamp(36px, 5vw, 64px); color: var(--parchment); margin-bottom: 32px; }
.closing__actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

@media (max-width: 1024px) {
  .offer__grid { grid-template-columns: repeat(2, 1fr); }
  .steps__list { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .offer__grid, .steps__list { grid-template-columns: 1fr; }
  .people__grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 7: Build, smoke**

```bash
npm test && npm run build && npx next start -p 3100   # background
npm run smoke
```

Expected: `/` ok, with no "Before you arrive" and no "Fellowship 2026".

- [ ] **Step 8: Remove orphaned homepage CSS**

Run: `grep -rnE "actions__|action-item|covered-callout" app --include=*.tsx`
Expected: no output. Then delete the `.actions…`, `.action-item…` and `.covered-callout…` rules from `app/globals.css`, and rerun `npm run build`.

- [ ] **Step 9: Visual check at 1440 / 768 / 375**

The hero strip shows "Next cohort: To be confirmed · Location: To be confirmed", with no "Applications close" item. The offer tiles reflow 4 → 2 → 1, and the steps 5 → 2 → 1. Fellow and faculty avatars are round, with initials for fellows without photos. There is no sideways page scroll at 375.

- [ ] **Step 10: Commit**

```bash
git add -A app scripts
git commit -m "feat: rebuild homepage for the permanent site

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Apply page (Phase 1 version)

**Files:**
- Create: `app/apply/page.tsx`, `app/apply/apply.module.css`
- Test: `scripts/smoke-routes.mjs`

**Interfaces:**
- Consumes: `getSiteSettings`, `displayValue`, `getApplyCta`, `isApplicationLive` (Task 1)

- [ ] **Step 1: Add the failing smoke expectation**

```js
  { path: '/apply', status: 200, contains: ['Who should apply', 'USD 100,000', 'How selection works', 'Key dates', 'To be confirmed', 'Applications opening soon'], absent: ['Scale Screen', '/apply/form'] },
  { path: '/apply/form', status: 404 },
```

- [ ] **Step 2: Run smoke and confirm `/apply` fails with 404**

- [ ] **Step 3: Create `app/apply/page.tsx`**

```tsx
import Link from 'next/link';
import { displayValue, getApplyCta, getSiteSettings, isApplicationLive } from '@/lib/site';
import styles from './apply.module.css';

export const metadata = {
  title: 'Apply — Summit Fellowship',
  description: 'Who should apply to the Summit Fellowship, what it covers, and how selection works.',
};

const CRITERIA = [
  'You are the founder, or the senior-most leader with real decision-making power. Founders are strongly preferred.',
  'Your organisation is past the pilot stage, with strong delivery or reach numbers in the last 12 months.',
  'Your annual budget is at least USD 100,000, with basic financial systems in place (audited statements or equivalent).',
  'Your work improves the lives of the poor or meets their basic needs — health, education, livelihoods and beyond.',
  'You are fluent in English.',
  'You can spend seven consecutive days fully present: no email or calls during sessions.',
];

const COVERS = [
  'Accommodation, meals and domestic travel — fully funded',
  'Twelve organisations, one leader each',
  'Conducted in English',
];

const STAGES = [
  { title: 'Written application', time: 'About 2 weeks', desc: 'We read every application.' },
  { title: 'A 45-minute conversation', time: 'About 2 weeks', desc: 'Shortlisted founders talk with the Mulago and Taleemabad team, starting from your answers.' },
  { title: 'Final selection', time: 'About 1 week', desc: 'Twelve organisations are selected, plus three to four alternates.' },
];

export default function ApplyPage() {
  const cohort = getSiteSettings().currentCohort;
  const live = isApplicationLive(cohort);
  const cta = getApplyCta(cohort);

  return (
    <>
      <section className="page-hero" data-screen-label="Apply Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Apply</span></div>
          <h1 className="page-hero__title">Apply for the {cohort.year} <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>cohort.</em></h1>
          <p className="page-hero__subtitle">A fully funded, seven-day fellowship for Pakistani founders whose solutions are ready to reach millions.</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.apply__grid}`}>
          <div>
            <h2 className={styles.apply__heading}>Who should apply</h2>
            <ul className={styles.apply__list}>
              {CRITERIA.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <h2 className={styles.apply__heading}>How selection works</h2>
            <ol className={styles.apply__stages}>
              {STAGES.map((s) => (
                <li key={s.title}>
                  <h3 className={styles.apply__stageTitle}>{s.title}</h3>
                  <span className={styles.apply__stageTime}>{s.time}</span>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className={styles.apply__aside}>
            <h2 className={styles.apply__asideHeading}>Key dates</h2>
            <dl className={styles.apply__dates}>
              <dt>Applications close</dt><dd>{displayValue(cohort.applicationDeadline)}</dd>
              <dt>Retreat</dt><dd>{displayValue(cohort.retreatDates)}</dd>
              <dt>Location</dt><dd>{displayValue(cohort.location)}</dd>
            </dl>

            <h2 className={styles.apply__asideHeading}>What the fellowship covers</h2>
            <ul className={styles.apply__list}>
              {COVERS.map((c) => <li key={c}>{c}</li>)}
            </ul>

            {live ? (
              <Link className="btn btn--ochre" href="/apply/form">Start your application <span className="arrow">→</span></Link>
            ) : (
              <p className={styles.apply__closed}>{cta.label}. Questions? <Link href="/faq">Read the FAQ</Link>.</p>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Create `app/apply/apply.module.css`**

```css
.apply__grid { display: grid; grid-template-columns: 2fr 1fr; gap: 64px; align-items: start; }
.apply__heading { font-size: clamp(28px, 3vw, 40px); color: var(--alpine-deep); margin: 0 0 24px; }
.apply__heading:not(:first-child) { margin-top: 56px; }
.apply__list { padding-left: 20px; display: grid; gap: 12px; color: var(--ink-soft); }
.apply__stages { list-style: none; padding: 0; display: grid; gap: 24px; counter-reset: stage; }
.apply__stages li { border-left: 2px solid var(--ochre); padding-left: 20px; }
.apply__stageTitle { font-size: 24px; color: var(--alpine-deep); }
.apply__stageTime { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--clay); }
.apply__aside { background: var(--paper-cool); border: 1px solid var(--line); padding: 32px; position: sticky; top: 96px; display: grid; gap: 20px; }
.apply__asideHeading { font-size: 22px; color: var(--alpine-deep); }
.apply__dates { display: grid; grid-template-columns: auto 1fr; gap: 8px 16px; margin: 0; }
.apply__dates dt { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); }
.apply__dates dd { margin: 0; color: var(--ink); }
.apply__closed { font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; color: var(--clay); }
@media (max-width: 1024px) {
  .apply__grid { grid-template-columns: 1fr; gap: 40px; }
  .apply__aside { position: static; }
}
@media (max-width: 640px) { .apply__aside { padding: 24px; } }
```

- [ ] **Step 5: Build, smoke, visual check at 1440 / 768 / 375, commit**

```bash
npm run build && npx next start -p 3100   # background
npm run smoke
git add -A app/apply scripts/smoke-routes.mjs
git commit -m "feat: add Apply page with eligibility, selection and key dates

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Expected smoke: `/apply` ok (no "Scale Screen", no link to `/apply/form`), and `/apply/form` 404.

---

### Task 9: FAQ page and go-live check

**Files:**
- Create: `data/faq.json`, `app/faq/page.tsx`, `app/faq/faq.module.css`, `scripts/check-golive.mjs`
- Test: `scripts/smoke-routes.mjs`

- [ ] **Step 1: Add the failing smoke expectation**

```js
  { path: '/faq', status: 200, contains: ['Eligibility', 'The application', 'The retreat', 'After the fellowship', 'USD 100,000'] },
```

- [ ] **Step 2: Create `data/faq.json`**

```json
[
  {
    "group": "Eligibility",
    "items": [
      { "q": "Who is the fellowship for?", "a": "Founders, or the senior-most leader with real decision-making power, of early- to mid-stage organisations that improve the lives of the poor or meet their basic needs — in health, education, livelihoods and beyond. Your organisation should be past the pilot stage, with real users today." },
      { "q": "Is there a minimum budget?", "a": "Yes. Your annual budget for the most recent complete financial year should be at least USD 100,000, and you should have basic financial systems in place (audited statements or equivalent)." },
      { "q": "We are still designing or piloting. Should we apply?", "a": "The fellowship is built for organisations past the pilot stage, with steady delivery and reach numbers from the last 12 months. If you are earlier than that, we would love to hear from you in a future year." },
      { "q": "Does my organisation have to be registered in Pakistan?", "a": "Organisations registered in Pakistan or abroad (for example, a US 501(c)(3)) can apply. [TO CONFIRM: whether your programme must be delivered in Pakistan to be eligible.]" },
      { "q": "Can someone other than the founder attend?", "a": "One leader attends per organisation, and it must be the person with real decision-making power. Founders are strongly preferred. [TO CONFIRM: whether a co-founder may attend in place of the CEO.]" },
      { "q": "Does the fellowship run in English?", "a": "Yes. The frameworks use terms that do not translate easily, so you need to be fluent in English to take full part." }
    ]
  },
  {
    "group": "The application",
    "items": [
      { "q": "How long does the application take?", "a": "About 25 minutes of typing once you have gathered your numbers. Before you start, have ready: your active user count and how you define \"active\", the month your first outside user started, your three largest sites with users and start dates, your primary metric and how you measure it, and your single best outcome result." },
      { "q": "Can I save my answers and come back later?", "a": "Yes. Your answers are saved automatically in your browser as you type, so you can close the page and return on the same device and browser. To draft on paper or across devices, download the PDF version of the application and paste your answers in when you are ready." },
      { "q": "What happens after I apply?", "a": "We read every application over about two weeks. Shortlisted founders are invited to a single 45-minute conversation with the Mulago and Taleemabad team, which starts from your answers. Final selection of twelve organisations follows." },
      { "q": "When will I hear back?", "a": "Final decisions are made about four weeks after the application deadline. We write to every applicant by email." },
      { "q": "Is there an application fee?", "a": "No. Applying is free." }
    ]
  },
  {
    "group": "The retreat",
    "items": [
      { "q": "What does it cost?", "a": "The fellowship is fully funded: accommodation, meals and domestic travel are covered. [TO CONFIRM: whether international flights are covered for founders based outside Pakistan.]" },
      { "q": "When and where is it?", "a": "Seven days in Northern Pakistan. Dates and venue for the current cohort are listed under Key dates on the Apply page." },
      { "q": "Can I keep working during the week?", "a": "Not during sessions. The week only works if you are fully present, so we ask fellows not to check email or take calls during sessions, and to set an out-of-office. Plan for seven days, plus travel." }
    ]
  },
  {
    "group": "After the fellowship",
    "items": [
      { "q": "What happens after the week?", "a": "Fellows leave with a scale blueprint, connections to funders from Demo Day, and a peer network of Pakistan's most ambitious founders, with access to ongoing Mulago mentorship. [TO CONFIRM: the structured follow-up support offered to this cohort.]" }
    ]
  }
]
```

- [ ] **Step 3: Create `app/faq/page.tsx`**

```tsx
import Link from 'next/link';
import faq from '@/data/faq.json';
import styles from './faq.module.css';

export const metadata = {
  title: 'FAQ — Summit Fellowship',
  description: 'Eligibility, the application, the retreat, and what happens afterwards.',
};

type FaqGroup = { group: string; items: { q: string; a: string }[] };

export default function FaqPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="FAQ Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>FAQ</span></div>
          <h1 className="page-hero__title">Questions, <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>answered.</em></h1>
          <p className="page-hero__subtitle">Still unsure? <Link href="/contact" style={{ color: 'var(--ochre)' }}>Get in touch</Link>.</p>
        </div>
      </section>
      <section className="section">
        <div className="container container--narrow">
          {(faq as FaqGroup[]).map((g) => (
            <div key={g.group} className={styles.faq__group}>
              <h2 className={styles.faq__heading}>{g.group}</h2>
              {g.items.map((item) => (
                <details key={item.q} className={styles.faq__item}>
                  <summary className={styles.faq__question}>{item.q}</summary>
                  <p className={styles.faq__answer}>{item.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Create `app/faq/faq.module.css`**

```css
.faq__group { margin-bottom: 56px; }
.faq__heading { font-size: clamp(28px, 3vw, 40px); color: var(--alpine-deep); margin-bottom: 16px; }
.faq__item { border-bottom: 1px solid var(--line); }
.faq__question {
  cursor: pointer;
  list-style: none;
  padding: 20px 32px 20px 0;
  position: relative;
  font-family: var(--serif);
  font-size: 22px;
  color: var(--ink);
}
.faq__question::-webkit-details-marker { display: none; }
.faq__question::after { content: '+'; position: absolute; right: 0; top: 18px; font-family: var(--mono); color: var(--clay); }
.faq__item[open] .faq__question::after { content: '−'; }
.faq__question:focus-visible { outline: 2px solid var(--ochre); outline-offset: 4px; }
.faq__answer { padding: 0 0 24px; color: var(--ink-soft); max-width: 65ch; }
@media (max-width: 640px) { .faq__question { font-size: 19px; } }
```

- [ ] **Step 5: Create `scripts/check-golive.mjs`**

```js
import { readFileSync } from 'node:fs';

const faq = JSON.parse(readFileSync(new URL('../data/faq.json', import.meta.url), 'utf8'));
const open = faq.flatMap((g) => g.items.filter((i) => i.a.includes('[TO CONFIRM')).map((i) => `${g.group} → ${i.q}`));

if (open.length) {
  console.log(`Not ready for go-live: ${open.length} FAQ answer(s) still contain [TO CONFIRM]:`);
  for (const line of open) console.log(`  - ${line}`);
  process.exit(1);
}
console.log('FAQ ready for go-live.');
```

- [ ] **Step 6: Build, smoke, run the go-live check**

```bash
npm run build && npx next start -p 3100   # background
npm run smoke
npm run check:golive
```

Expected: smoke all ok. `check:golive` exits 1 and lists 4 open items. That's correct for staging, and the owner resolves them before go-live.

- [ ] **Step 7: Commit**

```bash
git add -A data/faq.json app/faq scripts
git commit -m "feat: add FAQ page with draft answers and go-live check

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Remaining pages (curriculum, contact, faculty), 404 page

**Files:**
- Create: `app/not-found.tsx`
- Modify: `app/contact/page.tsx`, `app/curriculum/page.tsx`, `app/faculty/page.tsx`
- Test: `scripts/smoke-routes.mjs`

- [ ] **Step 1: Add failing smoke expectations**

```js
  { path: '/contact', status: 200, contains: ['usman.javed@taleemabad.com'], absent: ['ascenderadventures', 'Flights, visas'] },
  { path: '/faculty', status: 200, contains: ['Kevin Starr'] },
  { path: '/this-page-does-not-exist', status: 404, contains: ['Page not found', 'href="/apply"', 'href="/cohorts/2026"'] },
```

- [ ] **Step 2: Create `app/not-found.tsx`**

```tsx
import Link from 'next/link';
import { getLatestCohort } from '@/lib/cohorts';

export default function NotFound() {
  const latest = getLatestCohort();
  return (
    <section className="page-hero" style={{ minHeight: '60vh' }}>
      <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
      <div className="container page-hero__inner">
        <h1 className="page-hero__title">Page not found.</h1>
        <p className="page-hero__subtitle">
          The site has been reorganised, so older links may no longer work. Try one of these:
        </p>
        <div className="hero__cta-row" style={{ marginTop: 32 }}>
          <Link className="btn btn--ochre" href="/">Home</Link>
          <Link className="btn btn--ghost-light" href="/apply">Apply</Link>
          <Link className="btn btn--ghost-light" href={`/cohorts/${latest.year}`}>The {latest.year} cohort</Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `app/contact/page.tsx`**

Delete the second `CHANNELS` entry (the "Logistics & travel" item with `umair@ascenderadventures.com`). In the first entry, change `detail` to:

```ts
    detail: 'Eligibility, the application, the curriculum, faculty, and anything else about the fellowship.',
```

Run `grep -nE "2026|arrival|Skardu" app/contact/page.tsx`. For each match, rewrite it in year-neutral wording. If there are no matches, move on.

- [ ] **Step 4: Check curriculum and faculty for year-specific copy**

Run: `grep -nE "2026|Khoj|eleven|Eleven|June|this year" app/curriculum/page.tsx app/faculty/page.tsx app/faculty/people.tsx`
For each match in **curriculum**, rewrite it year-neutrally (for example "the week" instead of "June 2026"). **Faculty** bios are kept as written. Change only page-level copy (hero or headings) that names a year.

- [ ] **Step 5: Build, smoke, lint, commit**

```bash
npm test && npm run build && npx next start -p 3100   # background
npm run smoke && npm run lint
git add -A app scripts/smoke-routes.mjs
git commit -m "feat: add helpful 404 and make contact and curriculum year-neutral

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Docs, publish staging, verify sharing, full QA

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update `CLAUDE.md`**

- Pages Overview table: replace the rows for `/fellows`, `/fellows/[slug]`, `/itinerary`, `/venue`, `/travel`, `/resources` and `/explore-skardu` with `/apply`, `/faq`, `/cohorts`, `/cohorts/2026` (+ `/week`, `/venue`, `/explore`) and `/cohorts/2026/fellows/[slug]`.
- Fellow Detail Pages: file paths become `app/cohorts/2026/fellows/[slug]/page.tsx` and `app/cohorts/_components/fellow/*`. The data file becomes `data/cohorts/2026/fellows.json`, and the schema gets the `card_summary` field.
- Add a section **"Yearly update"**: edit `data/site.json`. To add a cohort: add an entry to `data/cohorts/index.json`, add `data/cohorts/<year>/fellows.json`, add one line to `FELLOWS_BY_YEAR` in `lib/fellows.ts`, and create `app/cohorts/<year>/` (copy the 2026 folder's layout and page, and adapt week/venue/explore).
- Add a section **"Production vs staging"**: production is `master` (summit-fellowship-website.vercel.app). Staging is the `staging` branch preview, with the banner and noindex.
- Commands: add `npm test`, `npm run smoke [baseUrl]`, `npm run check:golive`.
- Remove the "Refactor fellows data" item from Future Improvements (done).

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for the permanent site structure

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 2: Final local verification**

```bash
npm test && npm run lint && npm run build
npx next start -p 3100   # background
npm run smoke
```

Expected: every test passes, lint exits 0, the build succeeds, and smoke reports `all routes ok`.

- [ ] **Step 3: Push the staging branch**

```bash
git push -u origin staging
```

Vercel builds a Preview deployment for the `summit-fellowship-website` project. Note: the `summit-fellowship-2026` project is connected to the same repository and will build a preview too. It isn't shared and isn't production, so ignore it.

- [ ] **Step 4: Verify the staging deployment**

Using the Vercel MCP (`list_deployments` for project `prj_lc2W4lRgzSGCZeiE6lJx4rPmce06`, team `team_uFNqBRKTl5FMMUeIgSV47RbO`), wait for the `staging` deployment to reach `READY`. The stable branch URL is `summit-fellowship-website-git-staging-usmanjaved-6797s-projects.vercel.app`. Run the smoke script against it through an authenticated fetch (`web_fetch_vercel_url` for `/`, `/robots.txt` and `/apply`). Confirm the banner text, `Disallow: /`, and the `X-Robots-Tag: noindex` header (check the headers with `vercel curl -I` if the CLI is available).

- [ ] **Step 5: Shareable link (create, then verify)**

Create a non-expiring shareable link for the staging branch alias with the Vercel MCP tool `patch_url_protection_bypass` (alias = the branch URL from Step 4, team `team_uFNqBRKTl5FMMUeIgSV47RbO`, no `ttl`). The free plan allows one shareable link per account, so create it only once. If the MCP call fails, fall back to asking the owner to use dashboard → deployment → **Share** → **Anyone with the link**. Open the resulting link with a plain, unauthenticated `curl`. Expected: the site loads with the staging banner and no Vercel login. Then make a trivial commit to `staging` (for example a whitespace-only change to `README.md`) and push. Once it's `READY`, open the **same** shared link again.
- If it still loads the new deployment without login, the shareable link survives deployments. Record this in `CLAUDE.md` under "Production vs staging".
- If it asks for login or shows the old deployment, report back to the owner and propose the spec's fallback (a public preview at an unguessable URL with noindex). Do not change protection settings without approval.

- [ ] **Step 6: Full QA pass on staging at 375 / 768 / 1440**

Pages: `/`, `/apply`, `/faq`, `/curriculum`, `/faculty`, `/contact`, `/cohorts`, `/cohorts/2026`, one fellow profile, `/cohorts/2026/week`, `/cohorts/2026/venue`, `/cohorts/2026/explore`, and an unknown URL. At each width, check: no horizontal page scroll; header dropdowns and the mobile menu work (Task 6 Step 11); images load at the right aspect ratio; tap targets are at least 44 px on mobile; the staging banner is visible.

- [ ] **Step 7: Report to the owner**

Report: the staging link, the result of the shareable-link check, the remaining `[TO CONFIRM]` FAQ items that need answers, and that production is untouched. Phase 1 goes live only when the owner approves merging `staging` → `master` **and** `npm run check:golive` passes.
