# Application Form — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the 2027 application on `/apply/form`: a V-2 eligibility screener, the eight V-4 sections (A–H) in the site's design, browser autosave, a review step, submission into Supabase, and an offline PDF of the questions.

**Architecture:** Every V-4 question is defined once, in a typed schema (`lib/application/questions.ts`). The client form, the shared validator, the server handler and the PDF generator all read that schema. The browser posts to a Next.js route (`/api/apply`). The route re-validates, rate-limits and checks the honeypot, then calls a Postgres `SECURITY DEFINER` function `submit_application` through Supabase's REST API, using the project's publishable key (server-only env). The table has RLS with no policies, so nothing can read rows through the API. Non-production deployments always treat applications as open, so the team can test on staging. Production follows `data/site.json`.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript strict, CSS Modules + `app/globals.css` tokens, Vitest 3.2.4, Supabase (Postgres 17 + PostgREST), pdfkit (dev-only, PDF generation), Node 24.

**Spec:** `docs/superpowers/specs/2026-10-12-evergreen-site-and-application-design.md` (§6.1 "Before you start", §7, §8). Questions source: Drive *Program Design → Application Form 2027 → "Summit Fellowship – Sourcing Application for review.docx"* (V-4). Every V-4 value this plan needs is copied into Task 1 below.

## Already done by the controller (do not redo)

- Supabase projects created in org `uurslvzscxvgqwtuzsze` (free plan), region ap-south-1:
  - **staging** `wagaimviefobclwhaboa`: https://wagaimviefobclwhaboa.supabase.co
  - **production** `sfkmvxewojvstmincdzw`: https://sfkmvxewojvstmincdzw.supabase.co
- Migration `supabase/migrations/20261012000000_applications.sql` is applied to both. It creates table `public.applications` (RLS on, no policies, no anon/authenticated grants) and `public.submit_application(p_cohort_year int, p_applicant_name text, p_applicant_email text, p_org_name text, p_screener jsonb, p_answers jsonb, p_schema_version text) returns uuid`. Execute is granted to `anon` only. The function lowercases and trims the email, sets `is_latest=false` on earlier rows for the same cohort and email, inserts, and returns the id.
- Verified with the staging publishable key: RPC returns 200 with an id, a direct `select` returns 401, and a direct `insert` returns 401.
- Vercel env vars on project `summit-fellowship-website`: `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Preview and Development point to staging; Production points to production. Local `.env.local` (git-ignored) holds the staging values.

## Global Constraints

- Branch: all work on `staging`. Never commit to or push `master`. Never change Vercel or Supabase settings (the controller owns them).
- Name: "Summit Fellowship" everywhere. The words "Mulago Scale Screen" or "Scale Screen" never appear in the form, the PDF or the Apply page.
- Colours: CSS variables only. No hex in new CSS. CSS Modules with BEM-style class names for new UI.
- Character caps are stated once, in characters, with a live countdown. Pasted text over a cap is truncated (native `maxLength`), never rejected client-side. The server rejects over-cap values.
- Numeric fields accept digits only. A "We don't track this" checkbox is offered only where V-4 specifies it (A10 and the D2 count column).
- Secrets: `SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_URL` are read only in server code (`process.env`). Never use a `NEXT_PUBLIC_` prefix and never import the store into a client component.
- Accessibility: every input has a programmatic label. Errors are announced (`role="alert"`) and linked with `aria-describedby`. The form can be completed with the keyboard alone.
- Breakpoints `max-width: 640px` / `1024px`. Verify at 375 / 768 / 1440 px.
- Lint must exit 0 (`npm run lint`). `npm test` and `npm run build` pass. Smoke passes.
- Commit trailer: `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>` (a harness-enforced alternative is acceptable).

## Review Focus

1. **Submission fails** (Supabase down, network error, 5xx): the applicant must see a clear retry message, and their draft must **not** be cleared. Pinned in Task 4 (`submitApplication` returns `ok:false`; the form clears the draft only on `ok:true`) and Task 6 (manual check with a blocked request).
2. **Pasting a 2,000-character essay into a 200-character box**: the client truncates at the cap, and a tampered request with over-cap text is rejected by the server. Pinned in Task 2 (validator) and Task 3 (handler).
3. **Typing "~2,000+" into a number**: it becomes "2000" client-side, and the server rejects non-digits. Pinned in Task 2 (`digitsOnly`, validator).
4. **Production with applications closed, API called directly**: the server returns 403 even though the form is hidden. Pinned in Task 3 (`getCurrentCohort` production test + handler `live:false` test).
5. **A corrupted or old draft in localStorage**: invalid JSON, a draft from another cohort year, or one missing fields must not crash the form. It starts fresh. Pinned in Task 4 (`loadDraft` tests).

---

## File Structure

| Path | Responsibility |
|---|---|
| `lib/application/types.ts` | Question, Section and Answer types |
| `lib/application/questions.ts` | `SECTIONS` (A–H), `SCHEMA_VERSION`, `CONFIRMATION_TEXT`, `BEFORE_YOU_START`. Data only; imports types only |
| `lib/application/screener.ts` (+test) | Screener questions, `isScreenerComplete`, `isEligible` |
| `lib/application/answers.ts` (+test) | `emptyAnswer`, `emptyAnswers`, `emptyRow`, `pickKnownAnswers` |
| `lib/application/validate.ts` (+test) | `digitsOnly`, `formatMonthYear`, `validateQuestion`, `validateSection`, `validateAll` |
| `lib/application/questions.test.ts` | Schema invariants (unique ids, caps) |
| `lib/application/store.ts` (+test) | `createSupabaseStore`, the RPC call |
| `lib/application/rateLimit.ts` (+test) | In-memory sliding-window limiter |
| `lib/application/handle.ts` (+test) | `handleSubmission`, framework-free |
| `app/api/apply/route.ts` | POST route wiring env and handler |
| `lib/site.ts` (+test) | `FORM_ENABLED = true`, `getCurrentCohort(env)` |
| `lib/application/draft.ts` (+test) | `draftKey`, `loadDraft`, `saveDraft`, `clearDraft`, `safeStorage` |
| `lib/application/submit.ts` (+test) | `submitApplication(payload, fetchImpl)` |
| `app/apply/form/page.tsx` | Server page: closed state or form |
| `app/apply/form/FormLoader.tsx` | Client wrapper, `dynamic(..., { ssr: false })` |
| `app/apply/form/ApplicationForm.tsx` | Step machine, autosave, review, submit |
| `app/apply/form/fields/*.tsx` | Field components |
| `app/apply/form/form.module.css` | Form styles |
| `lib/application/schemaHash.ts` (+test) | sha256 of `SECTIONS` |
| `lib/application/pdf-manifest.json` | `{ schemaHash, generatedAt }` written by the PDF script |
| `scripts/build-application-pdf.ts` | Generates `public/application/summit-fellowship-application.pdf` |
| `app/apply/page.tsx` | "Before you start" + PDF link when live |

---

### Task 1: Question schema, screener, answer helpers

**Files:**
- Create: `lib/application/types.ts`, `lib/application/questions.ts`, `lib/application/screener.ts`, `lib/application/answers.ts`, `lib/application/questions.test.ts`, `lib/application/screener.test.ts`, `lib/application/answers.test.ts`

**Interfaces:**
- Produces: all types below, plus `SECTIONS: Section[]`, `SCHEMA_VERSION = 'v4'`, `ALL_QUESTIONS: Question[]` (flattened), `CONFIRMATION_TEXT`, `BEFORE_YOU_START: string[]`, `SCREENER_QUESTIONS`, `isScreenerComplete(s)`, `isEligible(s)`, `emptyAnswer(q)`, `emptyAnswers()`, `emptyRow(columns)`, `pickKnownAnswers(raw: unknown): Answers`.

- [ ] **Step 1: Create `lib/application/types.ts`**

```ts
export type Blank = { id: string; hint: string; maxChars: number; numeric?: boolean };

export type Column = {
  id: string;
  label: string;
  kind: 'text' | 'number' | 'monthYear' | 'url';
  maxChars?: number;
  allowUntracked?: boolean;
  acceptWords?: string[];
};

type Base = { id: string; label: string; help?: string; required: boolean };

export type Question =
  | (Base & { kind: 'text'; maxChars: number; multiline?: boolean; placeholder?: string })
  | (Base & { kind: 'email' })
  | (Base & { kind: 'phone' })
  | (Base & { kind: 'url'; acceptWords: string[] })
  | (Base & { kind: 'number'; allowUntracked?: boolean })
  | (Base & { kind: 'year' })
  | (Base & { kind: 'monthYear' })
  | (Base & { kind: 'radio'; options: string[]; numbered?: boolean })
  | (Base & { kind: 'select'; options: string[]; specify?: { options: string[]; maxChars: number } })
  | (Base & { kind: 'multiselect'; options: string[]; specify?: { options: string[]; maxChars: number } })
  | (Base & { kind: 'sentence'; parts: (string | Blank)[] })
  | (Base & { kind: 'table'; columns: Column[]; minRows: number; maxRows: number });

export type Section = { id: string; title: string; intro?: string; questions: Question[] };

export type NumberAnswer = { value: string; untracked: boolean };
export type ChoiceAnswer = { choice: string; specify: string };
export type MultiAnswer = { choices: string[]; specify: string };
export type SentenceAnswer = Record<string, string>;
export type Cell = string | NumberAnswer;
export type TableRow = Record<string, Cell>;
export type TableAnswer = TableRow[];
export type Answer = string | NumberAnswer | ChoiceAnswer | MultiAnswer | SentenceAnswer | TableAnswer;
export type Answers = Record<string, Answer>;

export type YesNo = 'yes' | 'no' | '';
export type ScreenerAnswers = Record<string, YesNo>;
```

- [ ] **Step 2: Write the failing tests**

`lib/application/questions.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ALL_QUESTIONS, SCHEMA_VERSION, SECTIONS } from './questions';

describe('question schema', () => {
  it('has sections A to H in order', () => {
    expect(SECTIONS.map((s) => s.id)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    expect(SCHEMA_VERSION).toBe('v4');
  });
  it('has unique question ids', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('never caps a free-text box above 1,100 characters', () => {
    const caps = ALL_QUESTIONS.flatMap((q) => (q.kind === 'text' ? [q.maxChars] : []));
    expect(Math.max(...caps)).toBe(1100);
  });
  it('has exactly four free-text boxes over 250 characters (D1, E1, F4, G3)', () => {
    const long = ALL_QUESTIONS.filter((q) => q.kind === 'text' && q.maxChars > 250).map((q) => q.id);
    expect(long.sort()).toEqual(['D1', 'E1', 'F4', 'G3']);
  });
  it('contains the identity fields the server needs', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(ids).toEqual(expect.arrayContaining(['A1', 'B1', 'B3']));
  });
  it('never names the Scale Screen', () => {
    expect(JSON.stringify(SECTIONS)).not.toMatch(/scale screen/i);
  });
  it('C1 has six stage rungs and F1 nine evidence rungs', () => {
    const c1 = ALL_QUESTIONS.find((q) => q.id === 'C1');
    const f1 = ALL_QUESTIONS.find((q) => q.id === 'F1');
    expect(c1?.kind === 'radio' && c1.options.length).toBe(6);
    expect(f1?.kind === 'radio' && f1.options.length).toBe(9);
  });
});
```

`lib/application/screener.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { SCREENER_QUESTIONS, isEligible, isScreenerComplete } from './screener';

const allYes = Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, 'yes' as const]));

describe('screener', () => {
  it('has the founder question plus six thresholds', () => {
    expect(SCREENER_QUESTIONS.filter((q) => q.threshold)).toHaveLength(6);
    expect(SCREENER_QUESTIONS.find((q) => q.id === 'founder')?.threshold).toBe(false);
  });
  it('is complete only when every question is answered', () => {
    expect(isScreenerComplete(allYes)).toBe(true);
    expect(isScreenerComplete({ ...allYes, budget: '' })).toBe(false);
  });
  it('is eligible when every threshold is yes, regardless of founder', () => {
    expect(isEligible({ ...allYes, founder: 'no' })).toBe(true);
    expect(isEligible({ ...allYes, english: 'no' })).toBe(false);
  });
});
```

`lib/application/answers.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { emptyAnswers, pickKnownAnswers } from './answers';
import { ALL_QUESTIONS } from './questions';

describe('answers', () => {
  it('creates an empty answer for every question', () => {
    const a = emptyAnswers();
    expect(Object.keys(a).sort()).toEqual(ALL_QUESTIONS.map((q) => q.id).sort());
    expect(a.A10).toEqual({ value: '', untracked: false });
    expect(a.A4).toEqual({ choice: '', specify: '' });
    expect(a.A7).toEqual({ choices: [], specify: '' });
    expect(Array.isArray(a.C4) && a.C4.length).toBe(1);
  });
  it('drops unknown keys and non-objects', () => {
    expect(pickKnownAnswers({ A1: 'Org', evil: 'x' })).toEqual({ A1: 'Org' });
    expect(pickKnownAnswers('nope')).toEqual({});
    expect(pickKnownAnswers(null)).toEqual({});
  });
});
```

- [ ] **Step 3: Run them and confirm they fail**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./questions"` (and `./screener`, `./answers`).

- [ ] **Step 4: Create `lib/application/questions.ts`**

```ts
import type { Question, Section } from './types';

export const SCHEMA_VERSION = 'v4';

export const BEFORE_YOU_START: string[] = [
  'Your active user count today, and your own definition of "active".',
  'The month and year the first person outside your organisation used what you built.',
  'Your three largest delivery sites or partners, with users today and start dates.',
  'Your primary outcome metric and how you measure it.',
  'Your single best outcome result: the number, the sample, who measured it and when.',
];

export const CONFIRMATION_TEXT =
  'Every number in this application is one I can show you the source for. I understand that shortlisted applicants have a 45-minute conversation with the Mulago and Taleemabad team, and that the conversation starts from these answers.';

const PROVINCES = ['Punjab', 'Sindh', 'KP', 'Balochistan', 'ICT', 'AJK', 'GB', 'Outside Pakistan'];

export const SECTIONS: Section[] = [
  {
    id: 'A',
    title: 'Organisation',
    questions: [
      { id: 'A1', kind: 'text', label: 'Organisation name', help: 'Legal registered name.', required: true, maxChars: 100 },
      { id: 'A2', kind: 'text', label: 'Name you operate under, if different', help: 'Leave blank if the same.', required: false, maxChars: 100 },
      { id: 'A3', kind: 'radio', label: 'Organisation type', required: true, options: ['For-profit', 'Non-profit', 'Hybrid (both entities)'] },
      {
        id: 'A4', kind: 'select', label: 'Legal registration', required: true,
        options: ['Pvt. Limited', 'Section 42', 'Trust', 'Society', 'SMC-Pvt Ltd', 'US 501(c)(3)', 'Other', 'Registration in progress'],
        specify: { options: ['Other'], maxChars: 60 },
      },
      { id: 'A5', kind: 'year', label: 'Year first registered', help: 'YYYY. The entity that runs the programme you are applying with.', required: true },
      { id: 'A6', kind: 'text', label: 'Headquarters city and country', required: true, maxChars: 60 },
      {
        id: 'A7', kind: 'multiselect', label: 'Where you currently operate',
        help: 'Only places where you have active users today. Not places you plan to enter.',
        required: true, options: PROVINCES, specify: { options: ['Outside Pakistan'], maxChars: 60 },
      },
      {
        id: 'A8', kind: 'select', label: 'Sector', help: 'Pick the one where your primary outcome sits.', required: true,
        options: ['Education & ECD', 'Health', 'Livelihoods & Employment', 'Financial Inclusion', 'Water & Sanitation', 'Agriculture & Food', 'Energy', 'Climate & Conservation', 'Other'],
      },
      { id: 'A9', kind: 'url', label: 'Website', help: 'Enter "none" if you do not have one.', required: true, acceptWords: ['none'] },
      { id: 'A10', kind: 'number', label: 'Total annual budget, most recent complete financial year, USD', help: 'Total expenditure, not income.', required: true, allowUntracked: true },
      { id: 'A11', kind: 'number', label: 'Full-time staff today', help: 'Full-time equivalents on your payroll. Exclude volunteers and government staff.', required: true },
      { id: 'A12', kind: 'number', label: 'Part-time, contract and field staff today', required: true },
    ],
  },
  {
    id: 'B',
    title: 'Applicant',
    questions: [
      { id: 'B1', kind: 'text', label: 'Full name', required: true, maxChars: 80 },
      { id: 'B2', kind: 'text', label: 'Role title', required: true, maxChars: 60 },
      { id: 'B3', kind: 'email', label: 'Email', required: true },
      { id: 'B4', kind: 'phone', label: 'Phone, with country code', required: true },
      { id: 'B5', kind: 'url', label: 'LinkedIn', help: 'Enter "none" if you do not have one.', required: true, acceptWords: ['none'] },
    ],
  },
  {
    id: 'C',
    title: 'Where you actually are today',
    questions: [
      {
        id: 'C1', kind: 'radio', label: 'Which single statement is true of your product or programme today?',
        help: 'Choose the highest statement that is fully true today, not the one you expect to be true in three months. If two feel true, choose the lower one.',
        required: true,
        options: [
          'We have designed it. Nothing has been built or delivered yet.',
          'We have built it. No one outside our own team has used it yet.',
          'It is in pilot: real users are using it, in a small number of sites, under our direct day-to-day supervision.',
          'It runs at steady state in one geography, without the founder involved day to day.',
          'It runs at steady state in more than one geography.',
          'Someone other than us — a government body or partner organisation — is delivering it using our tools or platform.',
        ],
      },
      {
        id: 'C2', kind: 'monthYear', label: 'The month and year the first person outside your organisation used what you built',
        help: 'Not the month you registered, not the month you started building. The first real user.', required: true,
      },
      {
        id: 'C3', kind: 'sentence', label: 'Complete this sentence',
        help: 'The number is people using it today — not a cumulative total and not a target. The user category is the person who touches it directly: if a teacher uses your tool and her students benefit, your category is teachers. Give the definition of "active" you really use, including the time window.',
        required: true,
        parts: [
          'As of today,',
          { id: 'count', hint: 'number', maxChars: 9, numeric: true },
          { id: 'category', hint: 'user category', maxChars: 25 },
          'are actively using',
          { id: 'what', hint: 'what they are using', maxChars: 60 },
          '. We count someone as active if',
          { id: 'definition', hint: 'your definition', maxChars: 150 },
          '.',
        ],
      },
      {
        id: 'C4', kind: 'table', label: 'Your three largest delivery sites or partners',
        help: 'Name them — "a government partner in Punjab" is not an answer we can use. Multiple countries: fill it country-wise. Pakistan only: site-wise.',
        required: true, minRows: 1, maxRows: 3,
        columns: [
          { id: 'name', label: 'Name of the site, district or partner', kind: 'text', maxChars: 80 },
          { id: 'users', label: 'Users there today', kind: 'number' },
          { id: 'since', label: 'Working with them since (MM/YYYY)', kind: 'monthYear' },
        ],
      },
      {
        id: 'C5', kind: 'multiselect', label: 'What does a user actually interact with?', required: true,
        options: ['A physical product', 'A mobile app', 'WhatsApp, SMS or voice', 'A web platform or dashboard', 'In-person training or a curriculum', 'A financial product', 'A service delivered face to face by a person', 'Other'],
        specify: { options: ['Other'], maxChars: 40 },
      },
    ],
  },
  {
    id: 'D',
    title: 'The problem',
    questions: [
      {
        id: 'D1', kind: 'text', multiline: true, label: 'Who are your users?',
        help: 'Demographics only — do not describe the problems they face here. Cover age range, gender split, income level, rural/peri-urban/urban, occupation, education, language.',
        placeholder: 'e.g. Government primary-school teachers, 70% women, aged 25–45, in peri-urban Rawalpindi; most hold a BA; Urdu-speaking; earn PKR 45,000–70,000 a month.',
        required: true, maxChars: 500,
      },
      {
        id: 'D2', kind: 'table', label: 'Name the problems you address',
        help: 'Only what you are addressing today. "Lack of empowerment" is not a problem a person experiences. "A mother walks 4km to the nearest clinic and is turned away twice out of three visits" is.',
        required: true, minRows: 1, maxRows: 3,
        columns: [
          { id: 'problem', label: 'The problem, as something a person experiences', kind: 'text', maxChars: 150 },
          { id: 'count', label: 'How many people in your country face it', kind: 'number', allowUntracked: true },
          { id: 'source', label: 'Where that number comes from', kind: 'text', maxChars: 80 },
        ],
      },
    ],
  },
  {
    id: 'E',
    title: 'The intervention and how it works',
    questions: [
      {
        id: 'E1', kind: 'text', multiline: true, label: 'Describe the intervention. What happens, in the order it happens.',
        help: 'Describe only what happens. If a sentence does not describe an action someone takes, delete it.',
        required: true, maxChars: 600,
      },
      { id: 'E2a', kind: 'text', multiline: true, label: 'Walk one user through it — first contact', help: 'How does a user find out about you and get started?', required: true, maxChars: 200 },
      { id: 'E2b', kind: 'text', multiline: true, label: 'Walk one user through it — the core interaction', help: 'What does the user do, how often, for how long each time?', required: true, maxChars: 200 },
      { id: 'E2c', kind: 'text', multiline: true, label: 'Walk one user through it — the end', help: 'What is different for that user when they are done?', required: true, maxChars: 200 },
      {
        id: 'E3', kind: 'sentence', label: 'Complete this chain',
        help: 'The last blank should name the same thing as your primary metric in Section F.', required: true,
        parts: [
          'We do', { id: 'action', hint: 'what you do', maxChars: 120 },
          '→ which causes', { id: 'user', hint: 'the user', maxChars: 120 },
          'to do', { id: 'behaviour', hint: 'what they do', maxChars: 120 },
          'differently → which produces', { id: 'outcome', hint: 'the outcome', maxChars: 120 },
          '→ which we measure as', { id: 'measure', hint: 'your measure', maxChars: 120 }, '.',
        ],
      },
    ],
  },
  {
    id: 'F',
    title: 'Evidence',
    questions: [
      {
        id: 'F1', kind: 'radio', numbered: true, label: 'Which statement describes your strongest evidence today?',
        help: 'A study in progress is not a study completed, and a study you are running yourself is not an independent one. We select organisations at every level on this list. What we cannot work with is a claim we cannot place on it.',
        required: true,
        options: [
          'User testimonials and anecdotes',
          'Usage or output data only — how much we delivered, and to whom',
          'Before-and-after outcome data on our own users, with no comparison group',
          'Outcome data with a non-randomised comparison group',
          'A randomised or quasi-experimental study we are running ourselves, in progress',
          'A randomised or quasi-experimental study we ran ourselves, completed, results in hand',
          'An independent third-party evaluation, completed — not an RCT',
          'An RCT by an independent third party, in progress',
          'An RCT by an independent third party, completed, results in hand',
        ],
      },
      {
        id: 'F2', kind: 'table', label: 'Your single best outcome result', help: 'One row. Every cell is required.',
        required: true, minRows: 1, maxRows: 1,
        columns: [
          { id: 'measured', label: 'What was measured', kind: 'text', maxChars: 120 },
          { id: 'result', label: 'The result (number and unit)', kind: 'text', maxChars: 60 },
          { id: 'sample', label: 'Sample size', kind: 'number' },
          { id: 'compared', label: 'What it was compared against', kind: 'text', maxChars: 120 },
          { id: 'who', label: 'Who measured it (organisation or person, by name)', kind: 'text', maxChars: 80 },
          { id: 'when', label: 'When (MM/YYYY)', kind: 'monthYear' },
          { id: 'link', label: 'Public link, or "not public"', kind: 'url', acceptWords: ['not public'] },
        ],
      },
      {
        id: 'F3', kind: 'text', label: 'What is your primary metric?',
        help: 'One number, not a list. An outcome, not an output — "teachers trained" is an output; "percentage of Grade 3 students reading at grade level" is an outcome. State the unit. If your primary metric is currently an output, say so plainly and give it anyway.',
        required: true, maxChars: 120,
      },
      {
        id: 'F4', kind: 'text', multiline: true, label: 'How do you measure it?',
        help: 'Instrument or method; frequency; who collects it, by name; the sample or population; whether you have a baseline.',
        placeholder: 'e.g. ASER-style one-to-one reading test, administered each March and October by our 6-person M&E team (led by Ayesha Khan) to a random 10% of Grade 3 students in every partner school; baseline taken March 2024.',
        required: true, maxChars: 500,
      },
    ],
  },
  {
    id: 'G',
    title: 'Scale: who does it, who pays for it',
    questions: [
      {
        id: 'G1', kind: 'sentence', label: 'Complete this sentence',
        help: 'The two blanks can be the same, and they can both be you — legitimate if you are a business. What they cannot be is "partners" or "the ecosystem".',
        required: true,
        parts: [
          'At scale,', { id: 'doer', hint: 'named entity or type of entity', maxChars: 80 },
          'delivers this, and', { id: 'payer', hint: 'named entity or type of entity', maxChars: 80 }, 'pays for it.',
        ],
      },
      {
        id: 'G2', kind: 'text', label: 'What will be your primary mechanism for reaching 1M+ users by 2030?',
        help: 'Examples: Digital Platform (App/SMS/Voice), Government Partnership/Adoption, Training of Trainers, Human Delivery, B2B Partnerships, Enterprise Sales.',
        required: true, maxChars: 40,
      },
      {
        id: 'G3', kind: 'text', multiline: true, label: 'Scale. What is your path or strategy to reach 1M users by 2030? Ideally, who would pay for user #1,000,001 — a government, a market, or a donor?',
        help: 'The longest answer we ask for anywhere. Spend it on specifics rather than ambition: the institutions you need by name and where each relationship actually stands today; what has to happen for the next one to say yes; the numbers you expect by 2027, 2028 and 2030; and who pays once donor money is out of the picture. "We will partner with government and scale nationally" tells us nothing.',
        required: true, maxChars: 1100,
      },
    ],
  },
  {
    id: 'H',
    title: 'How you found us',
    questions: [
      {
        id: 'H1', kind: 'select', label: 'How did you hear about the fellowship?', required: true,
        options: ['Website', 'Social media', 'Referred by another organisation', 'Email from Taleemabad', 'A funder', 'A previous fellow', 'Other'],
        specify: { options: ['Referred by another organisation', 'Other'], maxChars: 80 },
      },
      {
        id: 'H2', kind: 'text', multiline: true, label: 'Anything we should know that no question above let you tell us?',
        help: 'Optional. Not a place to restate your case; it is for context that has no home in the questions above.',
        required: false, maxChars: 400,
      },
    ],
  },
];

export const ALL_QUESTIONS: Question[] = SECTIONS.flatMap((s) => s.questions);
```

- [ ] **Step 5: Create `lib/application/screener.ts`**

```ts
import type { ScreenerAnswers } from './types';

export type ScreenerQuestion = { id: string; label: string; threshold: boolean };

export const SCREENER_QUESTIONS: ScreenerQuestion[] = [
  { id: 'leader', label: 'Are you the founder, or the senior-most leader with real decision-making power?', threshold: true },
  { id: 'founder', label: 'Are you the founder of the organisation?', threshold: false },
  { id: 'postPilot', label: 'Is your organisation past the pilot stage, with real delivery or reach numbers from the last 12 months?', threshold: true },
  { id: 'budget', label: 'Is your annual budget at least USD 100,000?', threshold: true },
  { id: 'finance', label: 'Do you have basic financial systems in place (audited statements or equivalent)?', threshold: true },
  { id: 'english', label: 'Are you fluent in English?', threshold: true },
  { id: 'presence', label: 'Can you spend seven consecutive days fully present — no email or calls during sessions?', threshold: true },
];

export function emptyScreener(): ScreenerAnswers {
  return Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, ''])) as ScreenerAnswers;
}

export function isScreenerComplete(s: ScreenerAnswers): boolean {
  return SCREENER_QUESTIONS.every((q) => s[q.id] === 'yes' || s[q.id] === 'no');
}

export function isEligible(s: ScreenerAnswers): boolean {
  return SCREENER_QUESTIONS.filter((q) => q.threshold).every((q) => s[q.id] === 'yes');
}
```

- [ ] **Step 6: Create `lib/application/answers.ts`**

```ts
import { ALL_QUESTIONS } from './questions';
import type { Answer, Answers, Column, Question, TableRow } from './types';

export function emptyRow(columns: Column[]): TableRow {
  return Object.fromEntries(
    columns.map((c) => [c.id, c.kind === 'number' ? { value: '', untracked: false } : '']),
  );
}

export function emptyAnswer(q: Question): Answer {
  switch (q.kind) {
    case 'number':
      return { value: '', untracked: false };
    case 'select':
      return { choice: '', specify: '' };
    case 'multiselect':
      return { choices: [], specify: '' };
    case 'sentence':
      return Object.fromEntries(q.parts.flatMap((p) => (typeof p === 'string' ? [] : [[p.id, '']])));
    case 'table':
      return Array.from({ length: Math.max(1, q.minRows) }, () => emptyRow(q.columns));
    default:
      return '';
  }
}

export function emptyAnswers(): Answers {
  return Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, emptyAnswer(q)]));
}

const KNOWN = new Set(ALL_QUESTIONS.map((q) => q.id));

/** Keeps only keys that are real question ids. Shapes are checked later by the validator. */
export function pickKnownAnswers(raw: unknown): Answers {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  return Object.fromEntries(Object.entries(raw as Record<string, Answer>).filter(([k]) => KNOWN.has(k)));
}
```

- [ ] **Step 7: Run the tests and confirm they pass**

Run: `npm test`
Expected: PASS (all old and new tests).

- [ ] **Step 8: Commit**

```bash
git add lib/application
git commit -m "feat: add V-4 application schema, screener and answer helpers"
```

---

### Task 2: Shared validator

**Files:**
- Create: `lib/application/validate.ts`, `lib/application/validate.test.ts`

**Interfaces:**
- Consumes: types, `SECTIONS`, `ALL_QUESTIONS` (Task 1).
- Produces: `MSG` (message strings), `digitsOnly(s)`, `formatMonthYear(raw)`, `validateQuestion(q, a): string | null`, `validateSection(section, answers): Record<string,string>`, `validateAll(answers): Record<string,string>`, `isBlankRow(row): boolean`.

- [ ] **Step 1: Write the failing test `lib/application/validate.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { emptyAnswer, emptyAnswers } from './answers';
import { ALL_QUESTIONS, SECTIONS } from './questions';
import type { Question } from './types';
import { MSG, digitsOnly, formatMonthYear, validateAll, validateQuestion, validateSection } from './validate';

const q = (id: string) => ALL_QUESTIONS.find((x) => x.id === id) as Question;

describe('helpers', () => {
  it('digitsOnly strips everything but digits', () => {
    expect(digitsOnly('~2,000+')).toBe('2000');
    expect(digitsOnly('abc')).toBe('');
  });
  it('formatMonthYear inserts the slash and caps length', () => {
    expect(formatMonthYear('0320')).toBe('03/20');
    expect(formatMonthYear('032022')).toBe('03/2022');
    expect(formatMonthYear('03/2022x')).toBe('03/2022');
    expect(formatMonthYear('1')).toBe('1');
  });
});

describe('validateQuestion', () => {
  it('requires required answers and skips optional empty ones', () => {
    expect(validateQuestion(q('A1'), '')).toBe(MSG.required);
    expect(validateQuestion(q('A2'), '')).toBeNull();
    expect(validateQuestion(q('H2'), '   ')).toBeNull();
  });
  it('rejects text over the cap (server-side tamper guard)', () => {
    expect(validateQuestion(q('A1'), 'x'.repeat(101))).toBe(MSG.tooLong(100));
    expect(validateQuestion(q('A1'), 'x'.repeat(100))).toBeNull();
  });
  it('validates email, phone, url', () => {
    expect(validateQuestion(q('B3'), 'nope')).toBe(MSG.email);
    expect(validateQuestion(q('B3'), 'a@b.co')).toBeNull();
    expect(validateQuestion(q('B4'), '12')).toBe(MSG.phone);
    expect(validateQuestion(q('B4'), '+92 300 1234567')).toBeNull();
    expect(validateQuestion(q('A9'), 'None')).toBeNull();
    expect(validateQuestion(q('A9'), 'example')).toBe(MSG.url('none'));
    expect(validateQuestion(q('A9'), 'https://example.org')).toBeNull();
  });
  it('numbers: digits only, untracked allowed only where offered', () => {
    expect(validateQuestion(q('A11'), { value: '12a', untracked: false })).toBe(MSG.digits);
    expect(validateQuestion(q('A11'), { value: '', untracked: false })).toBe(MSG.required);
    expect(validateQuestion(q('A10'), { value: '', untracked: true })).toBeNull();
    expect(validateQuestion(q('A11'), { value: '', untracked: true })).toBe(MSG.required);
  });
  it('year and month/year formats', () => {
    expect(validateQuestion(q('A5'), '19')).toBe(MSG.year);
    expect(validateQuestion(q('A5'), '2019')).toBeNull();
    expect(validateQuestion(q('C2'), '13/2020')).toBe(MSG.monthYear);
    expect(validateQuestion(q('C2'), '03/2020')).toBeNull();
  });
  it('radio and select options, with specify', () => {
    expect(validateQuestion(q('A3'), 'Charity')).toBe(MSG.choose);
    expect(validateQuestion(q('A3'), 'Non-profit')).toBeNull();
    expect(validateQuestion(q('A4'), { choice: 'Other', specify: '' })).toBe(MSG.specify);
    expect(validateQuestion(q('A4'), { choice: 'Other', specify: 'Cooperative' })).toBeNull();
    expect(validateQuestion(q('A4'), { choice: 'Trust', specify: '' })).toBeNull();
  });
  it('multiselect needs at least one valid choice', () => {
    expect(validateQuestion(q('A7'), { choices: [], specify: '' })).toBe(MSG.required);
    expect(validateQuestion(q('A7'), { choices: ['Mars'], specify: '' })).toBe(MSG.choose);
    expect(validateQuestion(q('A7'), { choices: ['Outside Pakistan'], specify: '' })).toBe(MSG.specify);
    expect(validateQuestion(q('A7'), { choices: ['Punjab', 'Sindh'], specify: '' })).toBeNull();
  });
  it('sentences need every blank, numeric blanks digits only', () => {
    const c3 = { count: '1200', category: 'teachers', what: 'our app', definition: 'opened it in the last 7 days' };
    expect(validateQuestion(q('C3'), c3)).toBeNull();
    expect(validateQuestion(q('C3'), { ...c3, count: '1,200' })).toBe(MSG.digits);
    expect(validateQuestion(q('C3'), { ...c3, what: '' })).toBe(MSG.blanks);
  });
  it('tables: started rows must be complete, at least one row', () => {
    const empty = emptyAnswer(q('C4'));
    expect(validateQuestion(q('C4'), empty)).toBe(MSG.atLeastOneRow);
    const partial = [{ name: 'Rawalpindi', users: { value: '', untracked: false }, since: '' }];
    expect(validateQuestion(q('C4'), partial)).toBe(MSG.rowIncomplete(1));
    const full = [{ name: 'Rawalpindi', users: { value: '900', untracked: false }, since: '01/2023' }];
    expect(validateQuestion(q('C4'), full)).toBeNull();
    expect(validateQuestion(q('C4'), [...full, ...full, ...full, ...full])).toBe(MSG.tooManyRows(3));
  });
  it('rejects wrong shapes instead of crashing', () => {
    expect(validateQuestion(q('A1'), { value: 'x', untracked: false })).toBe(MSG.invalid);
    expect(validateQuestion(q('C4'), 'not a table')).toBe(MSG.invalid);
  });
});

describe('validateSection / validateAll', () => {
  it('reports every required question of an empty application', () => {
    const errors = validateAll(emptyAnswers());
    const required = ALL_QUESTIONS.filter((x) => x.required).map((x) => x.id);
    expect(Object.keys(errors).sort()).toEqual(required.sort());
  });
  it('validateSection only reports its own questions', () => {
    const errors = validateSection(SECTIONS[1], emptyAnswers());
    expect(Object.keys(errors).every((k) => k.startsWith('B'))).toBe(true);
  });
  it('treats a missing answer like an empty one', () => {
    expect(validateAll({}).A1).toBe(MSG.required);
  });
});
```

- [ ] **Step 2: Run and confirm it fails**

Run: `npx vitest run lib/application/validate.test.ts`
Expected: FAIL, `Failed to resolve import "./validate"`.

- [ ] **Step 3: Create `lib/application/validate.ts`**

```ts
import { ALL_QUESTIONS } from './questions';
import type { Answer, Answers, Cell, Column, NumberAnswer, Question, Section, TableRow } from './types';

export const MSG = {
  required: 'This question is required.',
  invalid: 'This answer could not be read. Please re-enter it.',
  tooLong: (n: number) => `Keep this under ${n} characters.`,
  email: 'Enter a valid email address.',
  phone: 'Include the country code, e.g. +92 300 1234567.',
  url: (words: string) => `Enter a full link starting with https://, or type "${words}".`,
  digits: 'Use digits only.',
  year: 'Enter a four-digit year, e.g. 2019.',
  monthYear: 'Use MM/YYYY, e.g. 03/2022.',
  choose: 'Choose one of the options.',
  specify: 'Please specify.',
  blanks: 'Fill in every blank.',
  atLeastOneRow: 'Add at least one row.',
  tooManyRows: (n: number) => `Use at most ${n} rows.`,
  rowIncomplete: (n: number) => `Fill every cell in row ${n}, or clear the row.`,
};

export function digitsOnly(s: string): string {
  return s.replace(/\D+/g, '');
}

export function formatMonthYear(raw: string): string {
  const d = digitsOnly(raw).slice(0, 6);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

const isStr = (v: unknown): v is string => typeof v === 'string';
const isNum = (v: unknown): v is NumberAnswer =>
  !!v && typeof v === 'object' && !Array.isArray(v) && isStr((v as NumberAnswer).value) && typeof (v as NumberAnswer).untracked === 'boolean';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9][0-9 ()-]{6,19}$/;
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]+$/i;
const YEAR = /^(19|20)\d{2}$/;
const MONTH_YEAR = /^(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

function checkUrl(v: string, words: string[]): string | null {
  const t = v.trim();
  if (words.some((w) => w.toLowerCase() === t.toLowerCase())) return null;
  return URL_RE.test(t) ? null : MSG.url(words[0]);
}

function checkCell(col: Column, cell: Cell | undefined): boolean {
  if (col.kind === 'number') {
    if (!isNum(cell)) return false;
    if (cell.untracked) return !!col.allowUntracked;
    return /^\d+$/.test(cell.value);
  }
  if (!isStr(cell) || cell.trim() === '') return false;
  if (col.maxChars && cell.length > col.maxChars) return false;
  if (col.kind === 'monthYear') return MONTH_YEAR.test(cell);
  if (col.kind === 'url') return checkUrl(cell, col.acceptWords ?? []) === null;
  return true;
}

export function isBlankRow(row: TableRow): boolean {
  return Object.values(row).every((c) => (isNum(c) ? c.value === '' && !c.untracked : !isStr(c) || c.trim() === ''));
}

export function validateQuestion(q: Question, a: Answer | undefined): string | null {
  switch (q.kind) {
    case 'text':
    case 'email':
    case 'phone':
    case 'url':
    case 'year':
    case 'monthYear':
    case 'radio': {
      const v = a ?? '';
      if (!isStr(v)) return MSG.invalid;
      if (v.trim() === '') return q.required ? MSG.required : null;
      if (q.kind === 'text') return v.length > q.maxChars ? MSG.tooLong(q.maxChars) : null;
      if (q.kind === 'email') return EMAIL.test(v.trim()) && v.length <= 254 ? null : MSG.email;
      if (q.kind === 'phone') return PHONE.test(v.trim()) ? null : MSG.phone;
      if (q.kind === 'url') return v.length > 300 ? MSG.tooLong(300) : checkUrl(v, q.acceptWords);
      if (q.kind === 'year') return YEAR.test(v) ? null : MSG.year;
      if (q.kind === 'monthYear') return MONTH_YEAR.test(v) ? null : MSG.monthYear;
      return q.options.includes(v) ? null : MSG.choose;
    }
    case 'number': {
      const v = a ?? { value: '', untracked: false };
      if (!isNum(v)) return MSG.invalid;
      if (v.untracked) return q.allowUntracked ? null : MSG.required;
      if (v.value === '') return q.required ? MSG.required : null;
      return /^\d{1,15}$/.test(v.value) ? null : MSG.digits;
    }
    case 'select': {
      const v = a as { choice?: unknown; specify?: unknown } | undefined;
      if (v === undefined) return q.required ? MSG.required : null;
      if (!v || typeof v !== 'object' || !isStr(v.choice) || !isStr(v.specify)) return MSG.invalid;
      if (v.choice === '') return q.required ? MSG.required : null;
      if (!q.options.includes(v.choice)) return MSG.choose;
      if (q.specify?.options.includes(v.choice)) {
        if (v.specify.trim() === '') return MSG.specify;
        if (v.specify.length > q.specify.maxChars) return MSG.tooLong(q.specify.maxChars);
      }
      return null;
    }
    case 'multiselect': {
      const v = a as { choices?: unknown; specify?: unknown } | undefined;
      if (v === undefined) return q.required ? MSG.required : null;
      if (!v || typeof v !== 'object' || !Array.isArray(v.choices) || !isStr(v.specify)) return MSG.invalid;
      if (v.choices.length === 0) return q.required ? MSG.required : null;
      if (!v.choices.every((c) => isStr(c) && q.options.includes(c))) return MSG.choose;
      if (q.specify && v.choices.some((c) => q.specify!.options.includes(c as string))) {
        if (v.specify.trim() === '') return MSG.specify;
        if (v.specify.length > q.specify.maxChars) return MSG.tooLong(q.specify.maxChars);
      }
      return null;
    }
    case 'sentence': {
      const blanks = q.parts.filter((p) => typeof p !== 'string');
      const v = (a ?? {}) as Record<string, unknown>;
      if (typeof v !== 'object' || Array.isArray(v)) return MSG.invalid;
      const values = blanks.map((b) => v[b.id]);
      if (!values.every((x) => x === undefined || isStr(x))) return MSG.invalid;
      const filled = values.map((x) => ((x as string | undefined) ?? '').trim());
      if (filled.every((x) => x === '')) return q.required ? MSG.required : null;
      if (filled.some((x) => x === '')) return MSG.blanks;
      for (const [i, b] of blanks.entries()) {
        const x = values[i] as string;
        if (x.length > b.maxChars) return MSG.tooLong(b.maxChars);
        if (b.numeric && !/^\d+$/.test(x)) return MSG.digits;
      }
      return null;
    }
    case 'table': {
      if (a === undefined) return q.required ? MSG.atLeastOneRow : null;
      if (!Array.isArray(a)) return MSG.invalid;
      if (a.length > q.maxRows) return MSG.tooManyRows(q.maxRows);
      if (!a.every((r) => r && typeof r === 'object' && !Array.isArray(r))) return MSG.invalid;
      const rows = a as TableRow[];
      for (const [i, row] of rows.entries()) {
        if (isBlankRow(row)) continue;
        if (!q.columns.every((c) => checkCell(c, row[c.id]))) return MSG.rowIncomplete(i + 1);
      }
      const used = rows.filter((r) => !isBlankRow(r)).length;
      if (used < q.minRows && q.required) return MSG.atLeastOneRow;
      return null;
    }
  }
}

export function validateSection(section: Section, answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of section.questions) {
    const e = validateQuestion(q, answers[q.id]);
    if (e) errors[q.id] = e;
  }
  return errors;
}

export function validateAll(answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of ALL_QUESTIONS) {
    const e = validateQuestion(q, answers[q.id]);
    if (e) errors[q.id] = e;
  }
  return errors;
}
```

- [ ] **Step 4: Run and confirm it passes; then run the full suite**

Run: `npx vitest run lib/application/validate.test.ts` then `npm test`
Expected: PASS. If an expectation disagrees with the code, fix the **code** to meet the test, unless the test contradicts this plan's text (then report it).

- [ ] **Step 5: Commit**

```bash
git add lib/application/validate.ts lib/application/validate.test.ts
git commit -m "feat: add shared application validator"
```

---

### Task 3: Server submission path (site override, store, limiter, handler, route)

**Files:**
- Modify: `lib/site.ts`, `lib/site.test.ts`, `app/page.tsx`, `app/apply/page.tsx`, `app/components/DeadlineBand.tsx`
- Create: `lib/application/store.ts` (+test), `lib/application/rateLimit.ts` (+test), `lib/application/handle.ts` (+test), `app/api/apply/route.ts`

**Interfaces:**
- Consumes: Tasks 1–2; `isProductionDeploy(env)` from `lib/env.ts`.
- Produces:
  - `FORM_ENABLED = true`; `getCurrentCohort(env?: Record<string,string|undefined>): CohortSettings`
  - `type ApplicationRecord = { cohortYear: number; applicantName: string; applicantEmail: string; orgName: string; screener: ScreenerAnswers; answers: Answers; schemaVersion: string }`
  - `interface ApplicationStore { save(r: ApplicationRecord): Promise<string> }`, `class StoreConfigError extends Error`, `createSupabaseStore(env, fetchImpl?)`
  - `createRateLimiter({ limit, windowMs }): { allow(key: string, now: number): boolean }`
  - `HONEYPOT_FIELD = 'nickname'`, `type SubmissionPayload = { screener: ScreenerAnswers; answers: Answers; confirmed: boolean; nickname?: string }`
  - `handleSubmission(body: unknown, ctx: HandlerContext): Promise<{ status: number; body: SubmitResponse }>`, `type SubmitResponse = { ok: boolean; error?: string; fieldErrors?: Record<string, string> }`

- [ ] **Step 1: Write the failing tests**

Append to `lib/site.test.ts`:

```ts
import { getCurrentCohort } from './site';

describe('getCurrentCohort', () => {
  it('follows data/site.json in production', () => {
    expect(getCurrentCohort({ VERCEL_ENV: 'production' }).applicationsOpen).toBe(false);
  });
  it('is always open on staging and local so the team can test', () => {
    expect(getCurrentCohort({ VERCEL_ENV: 'preview' }).applicationsOpen).toBe(true);
    expect(getCurrentCohort({}).applicationsOpen).toBe(true);
  });
});
```

(Merge the import into the existing import line.)

`lib/application/rateLimit.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { createRateLimiter } from './rateLimit';

describe('rate limiter', () => {
  it('allows up to the limit per key within the window', () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(rl.allow('a', 0)).toBe(true);
    expect(rl.allow('a', 10)).toBe(true);
    expect(rl.allow('a', 20)).toBe(false);
    expect(rl.allow('b', 20)).toBe(true);
  });
  it('frees capacity after the window passes', () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(rl.allow('a', 0)).toBe(true);
    expect(rl.allow('a', 999)).toBe(false);
    expect(rl.allow('a', 1001)).toBe(true);
  });
});
```

`lib/application/store.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { StoreConfigError, createSupabaseStore, type ApplicationRecord } from './store';

const record: ApplicationRecord = {
  cohortYear: 2027, applicantName: 'A', applicantEmail: 'A@B.co', orgName: 'Org',
  screener: { leader: 'yes' }, answers: { A1: 'Org' }, schemaVersion: 'v4',
};
const env = { SUPABASE_URL: 'https://x.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' };

describe('supabase store', () => {
  it('throws a config error when env is missing', () => {
    expect(() => createSupabaseStore({})).toThrow(StoreConfigError);
  });
  it('calls the submit_application RPC with the publishable key', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const fake = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(JSON.stringify('uuid-1'), { status: 200 });
    }) as unknown as typeof fetch;
    const id = await createSupabaseStore(env, fake).save(record);
    expect(id).toBe('uuid-1');
    expect(calls[0].url).toBe('https://x.supabase.co/rest/v1/rpc/submit_application');
    const headers = calls[0].init.headers as Record<string, string>;
    expect(headers.apikey).toBe('sb_publishable_test');
    expect(JSON.parse(calls[0].init.body as string)).toEqual({
      p_cohort_year: 2027, p_applicant_name: 'A', p_applicant_email: 'a@b.co', p_org_name: 'Org',
      p_screener: { leader: 'yes' }, p_answers: { A1: 'Org' }, p_schema_version: 'v4',
    });
  });
  it('throws on a non-2xx response', async () => {
    const fake = (async () => new Response('{"message":"boom"}', { status: 500 })) as unknown as typeof fetch;
    await expect(createSupabaseStore(env, fake).save(record)).rejects.toThrow('Supabase responded 500');
  });
});
```

`lib/application/handle.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { emptyAnswers } from './answers';
import { handleSubmission, type HandlerContext } from './handle';
import { createRateLimiter } from './rateLimit';
import { SCREENER_QUESTIONS } from './screener';
import type { ApplicationRecord } from './store';
import type { Answers } from './types';

const screener = Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, 'yes']));

export function validAnswers(): Answers {
  const a = emptyAnswers();
  Object.assign(a, {
    A1: 'Org', A3: 'Non-profit', A4: { choice: 'Trust', specify: '' }, A5: '2019', A6: 'Lahore, Pakistan',
    A7: { choices: ['Punjab'], specify: '' }, A8: { choice: 'Health', specify: '' }, A9: 'none',
    A10: { value: '250000', untracked: false }, A11: { value: '12', untracked: false }, A12: { value: '3', untracked: false },
    B1: 'Ayesha Khan', B2: 'Founder', B3: 'Ayesha@Example.org', B4: '+92 300 1234567', B5: 'none',
    C1: 'It runs at steady state in one geography, without the founder involved day to day.', C2: '03/2020',
    C3: { count: '1200', category: 'teachers', what: 'our app', definition: 'used it in the last 7 days' },
    C4: [{ name: 'Rawalpindi', users: { value: '900', untracked: false }, since: '01/2023' }],
    C5: { choices: ['A mobile app'], specify: '' },
    D1: 'Teachers', D2: [{ problem: 'Teachers lack plans', count: { value: '', untracked: true }, source: 'n/a' }],
    E1: 'We train', E2a: 'Referral', E2b: 'Weekly use', E2c: 'Better lessons',
    E3: { action: 'train', user: 'teachers', behaviour: 'plan', outcome: 'learning', measure: 'scores' },
    F1: 'User testimonials and anecdotes',
    F2: [{ measured: 'Reading', result: '+12 pts', sample: { value: '300', untracked: false }, compared: 'Baseline', who: 'Us', when: '05/2024', link: 'not public' }],
    F3: '% reading at grade level', F4: 'ASER test twice a year',
    G1: { doer: 'Punjab SED', payer: 'Punjab SED' }, G2: 'Government Partnership', G3: 'Path to scale',
    H1: { choice: 'Website', specify: '' }, H2: '',
  });
  return a;
}

function ctx(over: Partial<HandlerContext> = {}) {
  const saved: ApplicationRecord[] = [];
  const base: HandlerContext = {
    ip: '1.1.1.1', now: 0, cohortYear: 2027, live: true,
    limiter: createRateLimiter({ limit: 5, windowMs: 60_000 }),
    store: { save: async (r) => { saved.push(r); return 'id-1'; } },
  };
  return { c: { ...base, ...over }, saved };
}

const body = (over: Record<string, unknown> = {}) => ({ screener, answers: validAnswers(), confirmed: true, nickname: '', ...over });

describe('handleSubmission', () => {
  it('saves a valid application and returns 201', async () => {
    const { c, saved } = ctx();
    const res = await handleSubmission(body(), c);
    expect(res.status).toBe(201);
    expect(saved[0]).toMatchObject({ cohortYear: 2027, applicantName: 'Ayesha Khan', applicantEmail: 'Ayesha@Example.org', orgName: 'Org', schemaVersion: 'v4' });
  });
  it('rejects when applications are closed (403), even if valid', async () => {
    const { c, saved } = ctx({ live: false });
    expect((await handleSubmission(body(), c)).status).toBe(403);
    expect(saved).toHaveLength(0);
  });
  it('silently accepts and drops honeypot submissions', async () => {
    const { c, saved } = ctx();
    const res = await handleSubmission(body({ nickname: 'bot' }), c);
    expect(res.status).toBe(200);
    expect(saved).toHaveLength(0);
  });
  it('rate-limits by ip (429)', async () => {
    const { c } = ctx({ limiter: createRateLimiter({ limit: 1, windowMs: 60_000 }) });
    await handleSubmission(body(), c);
    expect((await handleSubmission(body(), c)).status).toBe(429);
  });
  it('rejects malformed bodies, ineligible screeners and missing confirmation (400)', async () => {
    const { c } = ctx();
    expect((await handleSubmission(null, c)).status).toBe(400);
    expect((await handleSubmission(body({ screener: { ...screener, english: 'no' } }), c)).status).toBe(400);
    expect((await handleSubmission(body({ confirmed: false }), c)).status).toBe(400);
  });
  it('re-validates answers server-side and returns field errors', async () => {
    const { c } = ctx();
    const answers = { ...validAnswers(), A1: 'x'.repeat(500), A11: { value: '1,2', untracked: false } };
    const res = await handleSubmission(body({ answers }), c);
    expect(res.status).toBe(400);
    expect(Object.keys(res.body.fieldErrors ?? {})).toEqual(expect.arrayContaining(['A1', 'A11']));
  });
  it('returns 502 with a retry message when the store fails', async () => {
    const { c } = ctx({ store: { save: async () => { throw new Error('down'); } } });
    const res = await handleSubmission(body(), c);
    expect(res.status).toBe(502);
    expect(res.body.error).toMatch(/still saved in this browser/);
  });
});
```

- [ ] **Step 2: Run and confirm they fail**

Run: `npm test`
Expected: FAIL (missing `getCurrentCohort`, `./rateLimit`, `./store`, `./handle`).

- [ ] **Step 3: Update `lib/site.ts`**

Change `FORM_ENABLED` and its comment, and add `getCurrentCohort`:

```ts
import { isProductionDeploy } from './env';

/** The application form exists (Phase 2). */
export const FORM_ENABLED = true;

/**
 * The cohort settings pages and the API should use. Production follows data/site.json.
 * Every non-production deployment (staging previews, local) treats applications as open,
 * so the team can test the form end to end against the staging database.
 */
export function getCurrentCohort(env: Record<string, string | undefined> = process.env): CohortSettings {
  const c = getSiteSettings().currentCohort;
  return isProductionDeploy(env) ? c : { ...c, applicationsOpen: true };
}
```

In `app/page.tsx`, `app/apply/page.tsx` and `app/components/DeadlineBand.tsx`, replace `getSiteSettings().currentCohort` with `getCurrentCohort()` and fix the imports.

- [ ] **Step 4: Create `lib/application/rateLimit.ts`**

```ts
/** Per-instance sliding window. Serverless instances do not share it; the honeypot and Postgres limits back it up. */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();
  return {
    allow(key: string, now: number): boolean {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      return true;
    },
  };
}
```

- [ ] **Step 5: Create `lib/application/store.ts`**

```ts
import type { Answers, ScreenerAnswers } from './types';

export type ApplicationRecord = {
  cohortYear: number;
  applicantName: string;
  applicantEmail: string;
  orgName: string;
  screener: ScreenerAnswers;
  answers: Answers;
  schemaVersion: string;
};

export interface ApplicationStore {
  save(r: ApplicationRecord): Promise<string>;
}

export class StoreConfigError extends Error {}

type Env = Record<string, string | undefined>;

export function createSupabaseStore(env: Env, fetchImpl: typeof fetch = fetch): ApplicationStore {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new StoreConfigError('SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set');
  return {
    async save(r) {
      const res = await fetchImpl(`${url.replace(/\/$/, '')}/rest/v1/rpc/submit_application`, {
        method: 'POST',
        headers: { apikey: key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p_cohort_year: r.cohortYear,
          p_applicant_name: r.applicantName.trim(),
          p_applicant_email: r.applicantEmail.trim().toLowerCase(),
          p_org_name: r.orgName.trim(),
          p_screener: r.screener,
          p_answers: r.answers,
          p_schema_version: r.schemaVersion,
        }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
      return (await res.json()) as string;
    },
  };
}
```

- [ ] **Step 6: Create `lib/application/handle.ts`**

```ts
import { pickKnownAnswers } from './answers';
import { SCHEMA_VERSION } from './questions';
import { SCREENER_QUESTIONS, isEligible, isScreenerComplete } from './screener';
import type { ApplicationStore } from './store';
import type { Answers, ScreenerAnswers } from './types';
import { validateAll } from './validate';

export const HONEYPOT_FIELD = 'nickname';

export type SubmissionPayload = { screener: ScreenerAnswers; answers: Answers; confirmed: boolean; nickname?: string };
export type SubmitResponse = { ok: boolean; error?: string; fieldErrors?: Record<string, string> };
export type HandlerContext = {
  ip: string;
  now: number;
  cohortYear: number;
  live: boolean;
  store: ApplicationStore;
  limiter: { allow(key: string, now: number): boolean };
};

const reply = (status: number, body: SubmitResponse) => ({ status, body });

function cleanScreener(raw: unknown): ScreenerAnswers {
  const src = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  return Object.fromEntries(
    SCREENER_QUESTIONS.map((q) => [q.id, src[q.id] === 'yes' || src[q.id] === 'no' ? src[q.id] : '']),
  ) as ScreenerAnswers;
}

export async function handleSubmission(body: unknown, ctx: HandlerContext) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { ok: false, error: 'Malformed request.' });
  const b = body as Record<string, unknown>;

  if (typeof b[HONEYPOT_FIELD] === 'string' && (b[HONEYPOT_FIELD] as string).trim() !== '') return reply(200, { ok: true });
  if (!ctx.live) return reply(403, { ok: false, error: 'Applications are closed.' });
  if (!ctx.limiter.allow(ctx.ip, ctx.now)) {
    return reply(429, { ok: false, error: 'Too many submissions from this connection. Please wait a few minutes and try again.' });
  }

  const screener = cleanScreener(b.screener);
  if (!isScreenerComplete(screener) || !isEligible(screener)) {
    return reply(400, { ok: false, error: 'The eligibility answers are incomplete or do not meet the criteria.' });
  }
  if (b.confirmed !== true) {
    return reply(400, { ok: false, error: 'Please confirm the statement before submitting.', fieldErrors: { confirm: 'Please confirm.' } });
  }

  const answers = pickKnownAnswers(b.answers);
  const fieldErrors = validateAll(answers);
  if (Object.keys(fieldErrors).length > 0) return reply(400, { ok: false, error: 'Some answers need attention.', fieldErrors });

  try {
    await ctx.store.save({
      cohortYear: ctx.cohortYear,
      applicantName: answers.B1 as string,
      applicantEmail: answers.B3 as string,
      orgName: answers.A1 as string,
      screener,
      answers,
      schemaVersion: SCHEMA_VERSION,
    });
  } catch {
    return reply(502, {
      ok: false,
      error: 'We could not save your application. Your answers are still saved in this browser — please try again in a few minutes.',
    });
  }
  return reply(201, { ok: true });
}
```

- [ ] **Step 7: Create `app/api/apply/route.ts`**

```ts
import { NextResponse } from 'next/server';
import { handleSubmission } from '@/lib/application/handle';
import { createRateLimiter } from '@/lib/application/rateLimit';
import { StoreConfigError, createSupabaseStore } from '@/lib/application/store';
import { getCurrentCohort, isApplicationLive } from '@/lib/site';

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(req: Request) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  let store;
  try {
    store = createSupabaseStore(process.env);
  } catch (e) {
    if (e instanceof StoreConfigError) console.error('[apply] Supabase env missing');
    return NextResponse.json({ ok: false, error: 'Submissions are not configured. Please email us instead.' }, { status: 500 });
  }

  const cohort = getCurrentCohort();
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const result = await handleSubmission(body, {
    ip,
    now: Date.now(),
    cohortYear: cohort.year,
    live: isApplicationLive(cohort),
    store,
    limiter,
  });
  return NextResponse.json(result.body, { status: result.status });
}
```

- [ ] **Step 8: Run tests, lint, build**

Run: `npm test && npm run lint && npm run build`
Expected: all pass; the build lists `ƒ /api/apply`.

- [ ] **Step 9: Live check against the staging database (local `.env.local` holds the staging credentials)**

Start `npx next start -p 3100` in the background. Then POST a valid payload. Build it by running `node -e` that prints `JSON.stringify` of the handler test's `validAnswers()` shape, or hand-write a minimal JSON file under the plan workspace with all fields from the test, plus `screener` all `"yes"`, `confirmed: true`, `nickname: ""`, and `B3` set to `phase2-task3-check@example.org`:

```bash
curl -s -w ' [%{http_code}]' -X POST http://localhost:3100/api/apply -H 'Content-Type: application/json' --data @<payload.json>
```

Expected: `{"ok":true} [201]`. Then POST `{}`. Expected `[400]`. Stop the server. Report the two outputs. The controller verifies the row in the staging DB.

- [ ] **Step 10: Commit**

```bash
git add lib app
git commit -m "feat: add /api/apply with validation, rate limit, honeypot and Supabase store"
```

---

### Task 4: Client helpers (draft + submit)

**Files:**
- Create: `lib/application/draft.ts` (+test), `lib/application/submit.ts` (+test)

**Interfaces:**
- Consumes: types, `emptyAnswers`, `emptyScreener`.
- Produces:
  - `type Step = 'screener' | 'ineligible' | 'review' | number`
  - `type Draft = { version: 1; year: number; step: Step; screener: ScreenerAnswers; answers: Answers }`
  - `draftKey(year)`, `newDraft(year)`, `loadDraft(storage, year): Draft`, `saveDraft(storage, draft): boolean`, `clearDraft(storage, year): void`, `safeStorage(): Storage | null`
  - `type SubmitResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> }`, `submitApplication(payload: SubmissionPayload, fetchImpl?): Promise<SubmitResult>`

- [ ] **Step 1: Write the failing tests**

`lib/application/draft.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { clearDraft, draftKey, loadDraft, newDraft, saveDraft } from './draft';

function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v), removeItem: (k) => void m.delete(k),
    clear: () => m.clear(), key: (i) => [...m.keys()][i] ?? null, get length() { return m.size; },
  };
}

describe('draft', () => {
  it('keys drafts by cohort year', () => {
    expect(draftKey(2027)).toBe('summit-application-2027');
  });
  it('round-trips a draft', () => {
    const s = memoryStorage();
    const d = { ...newDraft(2027), step: 2 as const };
    d.answers.A1 = 'Org';
    expect(saveDraft(s, d)).toBe(true);
    const back = loadDraft(s, 2027);
    expect(back.step).toBe(2);
    expect(back.answers.A1).toBe('Org');
  });
  it('starts fresh on corrupt JSON, wrong year, or wrong shape', () => {
    const s = memoryStorage();
    s.setItem(draftKey(2027), '{not json');
    expect(loadDraft(s, 2027)).toEqual(newDraft(2027));
    s.setItem(draftKey(2027), JSON.stringify({ ...newDraft(2026), year: 2026 }));
    expect(loadDraft(s, 2027)).toEqual(newDraft(2027));
    s.setItem(draftKey(2027), JSON.stringify({ version: 1, year: 2027, step: 'x', screener: 1, answers: [] }));
    expect(loadDraft(s, 2027)).toEqual(newDraft(2027));
  });
  it('fills answers added to the schema after the draft was saved', () => {
    const s = memoryStorage();
    const d = newDraft(2027);
    delete (d.answers as Record<string, unknown>).H2;
    s.setItem(draftKey(2027), JSON.stringify(d));
    expect(loadDraft(s, 2027).answers.H2).toBe('');
  });
  it('tolerates missing or throwing storage', () => {
    expect(loadDraft(null, 2027)).toEqual(newDraft(2027));
    const throwing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } } as unknown as Storage;
    expect(loadDraft(throwing, 2027)).toEqual(newDraft(2027));
    expect(saveDraft(throwing, newDraft(2027))).toBe(false);
    expect(() => clearDraft(throwing, 2027)).not.toThrow();
  });
});
```

`lib/application/submit.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { submitApplication } from './submit';

const payload = { screener: {}, answers: {}, confirmed: true, nickname: '' };
const respond = (status: number, body: unknown) => (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

describe('submitApplication', () => {
  it('returns ok on 201', async () => {
    expect(await submitApplication(payload, respond(201, { ok: true }))).toEqual({ ok: true });
  });
  it('passes server errors and field errors through', async () => {
    const r = await submitApplication(payload, respond(400, { ok: false, error: 'Some answers need attention.', fieldErrors: { A1: 'x' } }));
    expect(r).toEqual({ ok: false, error: 'Some answers need attention.', fieldErrors: { A1: 'x' } });
  });
  it('returns a retry message on network failure or non-JSON', async () => {
    const down = (async () => { throw new TypeError('fetch failed'); }) as unknown as typeof fetch;
    const r1 = await submitApplication(payload, down);
    expect(r1.ok).toBe(false);
    const html = (async () => new Response('<html>', { status: 504 })) as unknown as typeof fetch;
    const r2 = await submitApplication(payload, html);
    expect(r2.ok).toBe(false);
    if (!r1.ok) expect(r1.error).toMatch(/still saved/);
  });
});
```

- [ ] **Step 2: Run and confirm they fail** — `npm test` → `Failed to resolve import "./draft"` / `"./submit"`.

- [ ] **Step 3: Create `lib/application/draft.ts`**

```ts
import { emptyAnswers } from './answers';
import { SECTIONS } from './questions';
import { emptyScreener } from './screener';
import type { Answers, ScreenerAnswers } from './types';

export type Step = 'screener' | 'ineligible' | 'review' | number;
export type Draft = { version: 1; year: number; step: Step; screener: ScreenerAnswers; answers: Answers };

export const draftKey = (year: number) => `summit-application-${year}`;

export function newDraft(year: number): Draft {
  return { version: 1, year, step: 'screener', screener: emptyScreener(), answers: emptyAnswers() };
}

export function safeStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

function isStep(s: unknown): s is Step {
  return s === 'screener' || s === 'ineligible' || s === 'review' || (Number.isInteger(s) && (s as number) >= 0 && (s as number) < SECTIONS.length);
}

const isPlainObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

export function loadDraft(storage: Storage | null, year: number): Draft {
  try {
    const raw = storage?.getItem(draftKey(year));
    if (!raw) return newDraft(year);
    const d = JSON.parse(raw) as Partial<Draft>;
    if (d.version !== 1 || d.year !== year || !isStep(d.step) || !isPlainObject(d.screener) || !isPlainObject(d.answers)) {
      return newDraft(year);
    }
    const fresh = newDraft(year);
    return {
      ...fresh,
      step: d.step,
      screener: { ...fresh.screener, ...(d.screener as ScreenerAnswers) },
      answers: { ...fresh.answers, ...(d.answers as Answers) },
    };
  } catch {
    return newDraft(year);
  }
}

export function saveDraft(storage: Storage | null, draft: Draft): boolean {
  try {
    if (!storage) return false;
    storage.setItem(draftKey(draft.year), JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(storage: Storage | null, year: number): void {
  try {
    storage?.removeItem(draftKey(year));
  } catch {
    /* storage blocked — nothing to clear */
  }
}
```

- [ ] **Step 4: Create `lib/application/submit.ts`**

```ts
import type { SubmissionPayload } from './handle';

export type SubmitResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };

const RETRY = 'We could not reach the server. Your answers are still saved in this browser — check your connection and try again.';

export async function submitApplication(payload: SubmissionPayload, fetchImpl: typeof fetch = fetch): Promise<SubmitResult> {
  try {
    const res = await fetchImpl('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data: { ok?: boolean; error?: string; fieldErrors?: Record<string, string> } = {};
    try {
      data = await res.json();
    } catch {
      return { ok: false, error: RETRY };
    }
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, error: data.error ?? RETRY, ...(data.fieldErrors ? { fieldErrors: data.fieldErrors } : {}) };
  } catch {
    return { ok: false, error: RETRY };
  }
}
```

Note: `submit.ts` imports only a **type** from `handle.ts`, so no server code reaches the client bundle.

- [ ] **Step 5: Run tests, confirm pass; commit**

```bash
npm test
git add lib/application/draft.ts lib/application/draft.test.ts lib/application/submit.ts lib/application/submit.test.ts
git commit -m "feat: add application draft storage and submit helpers"
```

---

### Task 5: Field components

**Files:**
- Create: `app/apply/form/fields/Field.tsx`, `app/apply/form/fields/SentenceField.tsx`, `app/apply/form/fields/TableField.tsx`, `app/apply/form/form.module.css`

**Interfaces:**
- Consumes: types; `digitsOnly`, `formatMonthYear`; `emptyRow`.
- Produces: `export function Field(props: { question: Question; value: Answer; onChange: (a: Answer) => void; error?: string }): JSX.Element` (named export). `form.module.css` classes listed below, also used by Task 6.

Shared ids: question input id = `q-${id}`, help id = `q-${id}-help`, error id = `q-${id}-error`, counter id = `q-${id}-count`.

- [ ] **Step 1: Create `app/apply/form/fields/Field.tsx`**

```tsx
'use client';

import type { Answer, ChoiceAnswer, MultiAnswer, NumberAnswer, Question } from '@/lib/application/types';
import { digitsOnly, formatMonthYear } from '@/lib/application/validate';
import styles from '../form.module.css';
import SentenceField from './SentenceField';
import TableField from './TableField';

type Props = { question: Question; value: Answer; onChange: (a: Answer) => void; error?: string };

export function describedBy(id: string, hasHelp: boolean, hasError: boolean, extra?: string) {
  return [hasHelp && `q-${id}-help`, extra, hasError && `q-${id}-error`].filter(Boolean).join(' ') || undefined;
}

function Counter({ id, value, max }: { id: string; value: string; max: number }) {
  const near = value.length >= max * 0.9;
  return (
    <span id={`q-${id}-count`} className={`${styles.form__counter}${near ? ` ${styles['form__counter--near']}` : ''}`}>
      {max - value.length} characters left (max {max})
    </span>
  );
}

export function Field({ question: q, value, onChange, error }: Props) {
  const id = `q-${q.id}`;
  const help = q.help ? <p id={`${id}-help`} className={styles.form__help}>{q.help}</p> : null;
  const err = error ? <p id={`${id}-error`} className={styles.form__error} role="alert">{error}</p> : null;
  const label = (
    <span className={styles.form__label}>
      {q.label}
      {!q.required && <span className={styles.form__optional}> (optional)</span>}
    </span>
  );

  if (q.kind === 'radio' || q.kind === 'multiselect' || q.kind === 'sentence' || q.kind === 'table') {
    let control: React.ReactNode;
    if (q.kind === 'radio') {
      const v = value as string;
      control = (
        <div className={styles.form__options}>
          {q.options.map((o, i) => (
            <label key={o} className={styles.form__option}>
              <input type="radio" name={id} value={o} checked={v === o} onChange={() => onChange(o)} />
              <span>{q.numbered ? `${i + 1}. ` : ''}{o}</span>
            </label>
          ))}
        </div>
      );
    } else if (q.kind === 'multiselect') {
      const v = value as MultiAnswer;
      const needsSpecify = q.specify && v.choices.some((c) => q.specify!.options.includes(c));
      control = (
        <div className={styles.form__options}>
          {q.options.map((o) => (
            <label key={o} className={styles.form__option}>
              <input
                type="checkbox"
                checked={v.choices.includes(o)}
                onChange={(e) =>
                  onChange({ ...v, choices: e.target.checked ? [...v.choices, o] : v.choices.filter((c) => c !== o) })
                }
              />
              <span>{o}</span>
            </label>
          ))}
          {needsSpecify && (
            <label className={styles.form__specify}>
              <span className={styles.form__sublabel}>Please specify</span>
              <input
                className={styles.form__input}
                maxLength={q.specify!.maxChars}
                value={v.specify}
                onChange={(e) => onChange({ ...v, specify: e.target.value })}
              />
            </label>
          )}
        </div>
      );
    } else if (q.kind === 'sentence') {
      control = <SentenceField question={q} value={value as Record<string, string>} onChange={onChange} />;
    } else {
      control = <TableField question={q} value={value as never} onChange={onChange} />;
    }
    return (
      <fieldset id={id} tabIndex={-1} className={styles.form__field} aria-describedby={describedBy(q.id, !!q.help, !!error)} aria-invalid={!!error}>
        <legend className={styles.form__legend}>{label}</legend>
        {help}
        {control}
        {err}
      </fieldset>
    );
  }

  let input: React.ReactNode;
  const common = {
    id,
    'aria-describedby': describedBy(q.id, !!q.help, !!error, q.kind === 'text' ? `${id}-count` : undefined),
    'aria-invalid': !!error,
    className: styles.form__input,
  };

  if (q.kind === 'text') {
    const v = value as string;
    input = (
      <>
        {q.multiline ? (
          <textarea {...common} rows={q.maxChars > 300 ? 8 : 4} maxLength={q.maxChars} placeholder={q.placeholder} value={v} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input {...common} type="text" maxLength={q.maxChars} placeholder={q.placeholder} value={v} onChange={(e) => onChange(e.target.value)} />
        )}
        <Counter id={q.id} value={v} max={q.maxChars} />
      </>
    );
  } else if (q.kind === 'email' || q.kind === 'phone' || q.kind === 'url') {
    const type = q.kind === 'email' ? 'email' : q.kind === 'phone' ? 'tel' : 'text';
    input = <input {...common} type={type} inputMode={q.kind === 'url' ? 'url' : undefined} maxLength={q.kind === 'url' ? 300 : 254} value={value as string} onChange={(e) => onChange(e.target.value)} />;
  } else if (q.kind === 'number') {
    const v = value as NumberAnswer;
    input = (
      <>
        <input {...common} type="text" inputMode="numeric" maxLength={15} disabled={v.untracked} value={v.value} onChange={(e) => onChange({ ...v, value: digitsOnly(e.target.value) })} />
        {q.allowUntracked && (
          <label className={styles.form__option}>
            <input type="checkbox" checked={v.untracked} onChange={(e) => onChange({ value: e.target.checked ? '' : v.value, untracked: e.target.checked })} />
            <span>We don&apos;t track this</span>
          </label>
        )}
      </>
    );
  } else if (q.kind === 'year') {
    input = <input {...common} type="text" inputMode="numeric" maxLength={4} placeholder="YYYY" value={value as string} onChange={(e) => onChange(digitsOnly(e.target.value))} />;
  } else if (q.kind === 'monthYear') {
    input = <input {...common} type="text" inputMode="numeric" maxLength={7} placeholder="MM/YYYY" value={value as string} onChange={(e) => onChange(formatMonthYear(e.target.value))} />;
  } else {
    const v = value as ChoiceAnswer;
    const needsSpecify = q.specify?.options.includes(v.choice);
    input = (
      <>
        <select {...common} value={v.choice} onChange={(e) => onChange({ ...v, choice: e.target.value })}>
          <option value="">Choose…</option>
          {q.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {needsSpecify && (
          <label className={styles.form__specify}>
            <span className={styles.form__sublabel}>Please specify</span>
            <input className={styles.form__input} maxLength={q.specify!.maxChars} value={v.specify} onChange={(e) => onChange({ ...v, specify: e.target.value })} />
          </label>
        )}
      </>
    );
  }

  return (
    <div className={styles.form__field}>
      <label htmlFor={id}>{label}</label>
      {help}
      {input}
      {err}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/apply/form/fields/SentenceField.tsx`**

```tsx
'use client';

import type { Answer, Question } from '@/lib/application/types';
import { digitsOnly } from '@/lib/application/validate';
import styles from '../form.module.css';

type SentenceQuestion = Extract<Question, { kind: 'sentence' }>;

export default function SentenceField({ question, value, onChange }: { question: SentenceQuestion; value: Record<string, string>; onChange: (a: Answer) => void }) {
  return (
    <p className={styles.form__sentence}>
      {question.parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}> {part} </span>
        ) : (
          <input
            key={part.id}
            className={styles.form__blank}
            aria-label={`${part.hint} (max ${part.maxChars} characters)`}
            placeholder={part.hint}
            inputMode={part.numeric ? 'numeric' : undefined}
            maxLength={part.maxChars}
            size={Math.min(Math.max(part.hint.length, 8), 40)}
            value={value[part.id] ?? ''}
            onChange={(e) => onChange({ ...value, [part.id]: part.numeric ? digitsOnly(e.target.value) : e.target.value })}
          />
        ),
      )}
    </p>
  );
}
```

- [ ] **Step 3: Create `app/apply/form/fields/TableField.tsx`**

```tsx
'use client';

import { emptyRow } from '@/lib/application/answers';
import type { Answer, NumberAnswer, Question, TableAnswer } from '@/lib/application/types';
import { digitsOnly, formatMonthYear } from '@/lib/application/validate';
import styles from '../form.module.css';

type TableQuestion = Extract<Question, { kind: 'table' }>;

export default function TableField({ question: q, value, onChange }: { question: TableQuestion; value: TableAnswer; onChange: (a: Answer) => void }) {
  const rows = value.length ? value : [emptyRow(q.columns)];
  const setCell = (r: number, col: string, cell: string | NumberAnswer) =>
    onChange(rows.map((row, i) => (i === r ? { ...row, [col]: cell } : row)));

  return (
    <div className={styles.form__table}>
      {rows.map((row, r) => (
        <div key={r} className={styles.form__row} role="group" aria-label={`Row ${r + 1}`}>
          {q.columns.map((c) => {
            const cellId = `q-${q.id}-${r}-${c.id}`;
            const cell = row[c.id];
            return (
              <div key={c.id} className={styles.form__cell}>
                <label htmlFor={cellId} className={styles.form__sublabel}>{c.label}</label>
                {c.kind === 'number' ? (
                  <>
                    <input
                      id={cellId}
                      className={styles.form__input}
                      inputMode="numeric"
                      maxLength={15}
                      disabled={(cell as NumberAnswer).untracked}
                      value={(cell as NumberAnswer).value}
                      onChange={(e) => setCell(r, c.id, { ...(cell as NumberAnswer), value: digitsOnly(e.target.value) })}
                    />
                    {c.allowUntracked && (
                      <label className={styles.form__option}>
                        <input
                          type="checkbox"
                          checked={(cell as NumberAnswer).untracked}
                          onChange={(e) => setCell(r, c.id, { value: '', untracked: e.target.checked })}
                        />
                        <span>We don&apos;t track this</span>
                      </label>
                    )}
                  </>
                ) : (
                  <input
                    id={cellId}
                    className={styles.form__input}
                    inputMode={c.kind === 'monthYear' ? 'numeric' : c.kind === 'url' ? 'url' : undefined}
                    placeholder={c.kind === 'monthYear' ? 'MM/YYYY' : undefined}
                    maxLength={c.kind === 'monthYear' ? 7 : c.kind === 'url' ? 300 : c.maxChars}
                    value={cell as string}
                    onChange={(e) => setCell(r, c.id, c.kind === 'monthYear' ? formatMonthYear(e.target.value) : e.target.value)}
                  />
                )}
              </div>
            );
          })}
          {rows.length > 1 && (
            <button type="button" className={styles.form__linkButton} onClick={() => onChange(rows.filter((_, i) => i !== r))}>
              Remove row {r + 1}
            </button>
          )}
        </div>
      ))}
      {rows.length < q.maxRows && (
        <button type="button" className="btn btn--ghost" onClick={() => onChange([...rows, emptyRow(q.columns)])}>
          Add a row
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create `app/apply/form/form.module.css`**

```css
.form { padding: 48px 0 96px; }
.form__progress { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--clay); margin-bottom: 8px; }
.form__bar { height: 4px; background: var(--line-soft); margin-bottom: 32px; }
.form__barFill { height: 100%; background: var(--ochre); transition: width .3s var(--ease-out); }
.form__title { font-size: clamp(30px, 4vw, 44px); color: var(--alpine-deep); margin-bottom: 8px; }
.form__intro { color: var(--ink-soft); margin-bottom: 32px; max-width: 65ch; }
.form__saved { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; color: var(--ink-mute); min-height: 16px; }
.form__summary { border: 1px solid var(--clay); background: var(--paper-cool); padding: 16px 20px; margin-bottom: 32px; }
.form__summary ul { margin: 8px 0 0; padding-left: 20px; }
.form__summary a { color: var(--clay); }
.form__field { border: 0; margin: 0 0 36px; padding: 0; min-width: 0; }
.form__legend, .form__label { display: block; font-family: var(--serif); font-size: 21px; line-height: 1.25; color: var(--ink); margin-bottom: 6px; padding: 0; }
.form__optional { font-family: var(--sans); font-size: 14px; color: var(--ink-mute); }
.form__help { font-size: 15px; color: var(--ink-mute); margin: 0 0 12px; max-width: 70ch; }
.form__input {
  width: 100%;
  font: inherit;
  font-size: 16px;
  color: var(--ink);
  background: var(--paper-cool);
  border: 1px solid var(--line);
  border-radius: 2px;
  padding: 12px 14px;
  min-height: 44px;
}
.form__input:focus-visible, .form__blank:focus-visible { outline: 2px solid var(--ochre); outline-offset: 1px; border-color: var(--ochre); }
.form__input[aria-invalid="true"] { border-color: var(--clay); }
.form__input:disabled { opacity: .5; }
textarea.form__input { resize: vertical; line-height: 1.5; }
.form__counter { display: block; margin-top: 6px; font-family: var(--mono); font-size: 11px; color: var(--ink-mute); }
.form__counter--near { color: var(--clay); }
.form__error { color: var(--clay-deep); font-size: 14px; margin: 8px 0 0; font-weight: 500; }
.form__options { display: grid; gap: 10px; }
.form__option { display: flex; gap: 12px; align-items: flex-start; font-size: 16px; cursor: pointer; min-height: 32px; }
.form__option input { margin-top: 4px; width: 18px; height: 18px; flex-shrink: 0; accent-color: var(--clay); }
.form__specify { display: block; margin-top: 12px; max-width: 420px; }
.form__sublabel { display: block; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 6px; }
.form__sentence { font-size: 18px; line-height: 2.4; color: var(--ink); }
.form__blank {
  font: inherit;
  font-size: 16px;
  border: 0;
  border-bottom: 2px solid var(--ochre);
  background: var(--paper-cool);
  padding: 4px 8px;
  margin: 0 4px;
  max-width: 100%;
  color: var(--ink);
}
.form__table { display: grid; gap: 20px; }
.form__row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px 16px; padding: 16px; border: 1px solid var(--line-soft); background: var(--paper-cool); }
.form__cell { min-width: 0; }
.form__linkButton { background: none; border: 0; color: var(--clay); font: inherit; font-size: 14px; text-decoration: underline; cursor: pointer; justify-self: start; min-height: 44px; }
.form__actions { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--line); }
.form__review { display: grid; gap: 32px; }
.form__reviewSection h3 { font-size: 24px; color: var(--alpine-deep); display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
.form__reviewSection dl { margin: 12px 0 0; display: grid; gap: 12px; }
.form__reviewSection dt { font-size: 14px; color: var(--ink-mute); }
.form__reviewSection dd { margin: 2px 0 0; white-space: pre-wrap; word-break: break-word; }
.form__honeypot { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
.form__notice { border-left: 3px solid var(--ochre); padding: 12px 16px; background: var(--paper-cool); margin-bottom: 24px; }
@media (max-width: 640px) {
  .form { padding: 32px 0 64px; }
  .form__sentence { line-height: 2.1; font-size: 17px; }
  .form__blank { display: inline-block; width: 100%; margin: 4px 0; }
  .form__row { grid-template-columns: 1fr; padding: 12px; }
  .form__actions .btn { flex: 1 1 100%; justify-content: center; }
}
```

- [ ] **Step 5: Type-check and lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add app/apply/form
git commit -m "feat: add application form field components"
```

---

### Task 6: Form flow, page, and end-to-end check

**Files:**
- Create: `app/apply/form/page.tsx`, `app/apply/form/FormLoader.tsx`, `app/apply/form/ApplicationForm.tsx`
- Modify: `scripts/smoke-routes.mjs`

**Interfaces:**
- Consumes: everything above. `Field` (Task 5), draft/submit helpers (Task 4), `SECTIONS`, `CONFIRMATION_TEXT`, `SCREENER_QUESTIONS`, `isEligible`, `isScreenerComplete`, `validateSection`, `validateAll`, `HONEYPOT_FIELD`, `getCurrentCohort`, `isApplicationLive`, `getSiteSettings`.

- [ ] **Step 1: Update smoke expectations (failing first)**

Local and staging builds are non-production, so applications count as open. In `scripts/smoke-routes.mjs`:
- `/` row: replace `'Applications opening soon'` with `'Apply for the 2027 cohort'`.
- `/apply` row: becomes `{ path: '/apply', status: 200, contains: ['Who should apply', 'USD 100,000', 'How selection works', 'Key dates', 'To be confirmed', 'Start your application'], absent: ['Scale Screen'] }`.
- `/apply/form` row: becomes `{ path: '/apply/form', status: 200, contains: ['Loading the application'], absent: ['Scale Screen'] }`.

Run smoke against a fresh build. Expected: `/apply/form` fails (404).

- [ ] **Step 2: Create `app/apply/form/page.tsx`**

```tsx
import Link from 'next/link';
import { getCurrentCohort, getSiteSettings, isApplicationLive } from '@/lib/site';
import FormLoader from './FormLoader';

export const metadata = {
  title: 'Application — Summit Fellowship',
  description: 'Apply to the Summit Fellowship.',
};

export default function ApplicationPage() {
  const cohort = getCurrentCohort();
  const live = isApplicationLive(cohort);
  return (
    <>
      <section className="page-hero" data-screen-label="Application Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><Link href="/apply">Apply</Link><span>/</span><span>Application</span></div>
          <h1 className="page-hero__title">The {cohort.year} application.</h1>
          {!live && <p className="page-hero__subtitle">Applications for the {cohort.year} cohort are closed. <Link href="/apply" style={{ color: 'var(--ochre)' }}>See how to apply</Link>.</p>}
        </div>
      </section>
      {live && <FormLoader year={cohort.year} contactEmail={getSiteSettings().contactEmail} />}
    </>
  );
}
```

- [ ] **Step 3: Create `app/apply/form/FormLoader.tsx`**

```tsx
'use client';

import dynamic from 'next/dynamic';

const ApplicationForm = dynamic(() => import('./ApplicationForm'), {
  ssr: false,
  loading: () => <p className="container" style={{ padding: '48px 0' }}>Loading the application…</p>,
});

export default function FormLoader(props: { year: number; contactEmail: string }) {
  return <ApplicationForm {...props} />;
}
```

- [ ] **Step 4: Create `app/apply/form/ApplicationForm.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { clearDraft, loadDraft, safeStorage, saveDraft, type Draft, type Step } from '@/lib/application/draft';
import { HONEYPOT_FIELD } from '@/lib/application/handle';
import { CONFIRMATION_TEXT, SECTIONS } from '@/lib/application/questions';
import { SCREENER_QUESTIONS, isEligible, isScreenerComplete } from '@/lib/application/screener';
import { submitApplication } from '@/lib/application/submit';
import type { Answer, Question } from '@/lib/application/types';
import { validateAll, validateSection } from '@/lib/application/validate';
import { Field } from './fields/Field';
import styles from './form.module.css';

type Props = { year: number; contactEmail: string };

function display(q: Question, a: Answer | undefined): string {
  if (a === undefined) return '—';
  if (typeof a === 'string') return a.trim() || '—';
  if (Array.isArray(a)) {
    if (q.kind !== 'table') return '—';
    const rows = a.map((row) => q.columns.map((c) => {
      const cell = row[c.id];
      const v = typeof cell === 'string' ? cell : cell?.untracked ? "don't track" : cell?.value;
      return `${c.label}: ${v || '—'}`;
    }).join('; '));
    return rows.join('\n') || '—';
  }
  if ('untracked' in a) return a.untracked ? "We don't track this" : a.value || '—';
  if ('choices' in a) return [a.choices.join(', '), a.specify].filter(Boolean).join(' — ') || '—';
  if ('choice' in a) return [a.choice, a.specify].filter(Boolean).join(' — ') || '—';
  if (q.kind === 'sentence') {
    return q.parts.map((p) => (typeof p === 'string' ? p : `[${(a as Record<string, string>)[p.id] || '…'}]`)).join(' ');
  }
  return '—';
}

export default function ApplicationForm({ year, contactEmail }: Props) {
  const [draft, setDraft] = useState<Draft>(() => loadDraft(safeStorage(), year));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      if (saveDraft(safeStorage(), draft)) setSavedAt(Date.now());
    }, 400);
    return () => clearTimeout(t);
  }, [draft, done]);

  const goTo = (step: Step) => {
    setErrors({});
    setSubmitError(null);
    setDraft((d) => ({ ...d, step }));
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setAnswer = (id: string, a: Answer) => setDraft((d) => ({ ...d, answers: { ...d.answers, [id]: a } }));

  if (done) {
    return (
      <section className={`container container--narrow ${styles.form}`} ref={topRef}>
        <h2 className={styles.form__title}>Thank you — your application is in.</h2>
        <p className={styles.form__intro}>Here is what happens next:</p>
        <ul>
          <li><strong>Next two weeks:</strong> we read every application.</li>
          <li><strong>If shortlisted:</strong> we write to schedule a 45-minute conversation, starting from your answers on where you are today, your evidence and your path to scale.</li>
          <li><strong>Decisions:</strong> about five weeks after the deadline.</li>
        </ul>
        <p>Questions? Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </section>
    );
  }

  const savedLine = <p className={styles.form__saved} aria-live="polite">{savedAt ? 'Saved in this browser' : ''}</p>;

  if (draft.step === 'screener' || draft.step === 'ineligible') {
    const s = draft.screener;
    const complete = isScreenerComplete(s);
    return (
      <section className={`container container--narrow ${styles.form}`} ref={topRef}>
        <p className={styles.form__progress}>Before you begin · Eligibility</p>
        {draft.step === 'ineligible' ? (
          <>
            <h2 className={styles.form__title}>This fellowship isn&apos;t the right fit this year.</h2>
            <p className={styles.form__intro}>
              The fellowship is built for founders or senior-most leaders of post-pilot organisations with an annual budget of at least
              USD 100,000, basic financial systems, fluent English and seven days of full presence. We would love to hear from you in a future year.
            </p>
            <div className={styles.form__actions}>
              <button type="button" className="btn btn--ghost" onClick={() => goTo('screener')}>Change my answers</button>
              <Link href="/faq" className="btn btn--ghost">Read the FAQ</Link>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.form__title}>Seven quick questions.</h2>
            <p className={styles.form__intro}>These confirm the fellowship fits where you are. Your answers save automatically in this browser.</p>
            {SCREENER_QUESTIONS.map((q) => (
              <fieldset key={q.id} className={styles.form__field}>
                <legend className={styles.form__legend}>{q.label}</legend>
                <div className={styles.form__options}>
                  {(['yes', 'no'] as const).map((v) => (
                    <label key={v} className={styles.form__option}>
                      <input
                        type="radio"
                        name={`s-${q.id}`}
                        checked={s[q.id] === v}
                        onChange={() => setDraft((d) => ({ ...d, screener: { ...d.screener, [q.id]: v } }))}
                      />
                      <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {errors.screener && <p className={styles.form__error} role="alert">{errors.screener}</p>}
            <div className={styles.form__actions}>
              <button
                type="button"
                className="btn btn--ochre"
                onClick={() => {
                  if (!complete) return setErrors({ screener: 'Please answer all seven questions.' });
                  goTo(isEligible(s) ? 0 : 'ineligible');
                }}
              >
                Continue <span className="arrow">→</span>
              </button>
              {savedLine}
            </div>
          </>
        )}
      </section>
    );
  }

  if (typeof draft.step === 'number') {
    const index = draft.step;
    const section = SECTIONS[index];
    const errorIds = Object.keys(errors);
    return (
      <section className={`container container--narrow ${styles.form}`} ref={topRef}>
        <p className={styles.form__progress}>Section {section.id} of H · {section.title}</p>
        <div className={styles.form__bar} aria-hidden="true">
          <div className={styles.form__barFill} style={{ width: `${((index + 1) / (SECTIONS.length + 1)) * 100}%` }} />
        </div>
        <h2 className={styles.form__title}>{section.title}</h2>
        {section.intro && <p className={styles.form__intro}>{section.intro}</p>}
        {errorIds.length > 0 && (
          <div className={styles.form__summary} role="alert">
            <strong>{errorIds.length === 1 ? 'One answer needs attention:' : `${errorIds.length} answers need attention:`}</strong>
            <ul>
              {errorIds.map((id) => {
                const q = section.questions.find((x) => x.id === id);
                return <li key={id}><a href={`#q-${id}`}>{q?.label ?? id}</a></li>;
              })}
            </ul>
          </div>
        )}
        {section.questions.map((q) => (
          <div key={q.id} id={`q-${q.id}-wrap`}>
            <Field question={q} value={draft.answers[q.id]} onChange={(a) => setAnswer(q.id, a)} error={errors[q.id]} />
          </div>
        ))}
        <div className={styles.form__actions}>
          <button type="button" className="btn btn--ghost" onClick={() => goTo(index === 0 ? 'screener' : index - 1)}>Back</button>
          <button
            type="button"
            className="btn btn--ochre"
            onClick={() => {
              const e = validateSection(section, draft.answers);
              if (Object.keys(e).length) {
                setErrors(e);
                topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
              }
              goTo(index === SECTIONS.length - 1 ? 'review' : index + 1);
            }}
          >
            {index === SECTIONS.length - 1 ? 'Review my answers' : 'Next section'} <span className="arrow">→</span>
          </button>
          {savedLine}
        </div>
      </section>
    );
  }

  const submit = async () => {
    const all = validateAll(draft.answers);
    if (Object.keys(all).length) {
      const first = SECTIONS.findIndex((s) => s.questions.some((q) => all[q.id]));
      setDraft((d) => ({ ...d, step: first }));
      setErrors(all);
      return;
    }
    if (!confirmed) return setSubmitError('Please tick the confirmation before submitting.');
    setSubmitting(true);
    setSubmitError(null);
    const result = await submitApplication({ screener: draft.screener, answers: draft.answers, confirmed, [HONEYPOT_FIELD]: honeypot });
    setSubmitting(false);
    if (result.ok) {
      clearDraft(safeStorage(), year);
      setDone(true);
      return;
    }
    setSubmitError(result.error);
    if (result.fieldErrors) {
      const first = SECTIONS.findIndex((s) => s.questions.some((q) => result.fieldErrors![q.id]));
      if (first >= 0) {
        setDraft((d) => ({ ...d, step: first }));
        setErrors(result.fieldErrors);
      }
    }
  };

  return (
    <section className={`container container--narrow ${styles.form}`} ref={topRef}>
      <p className={styles.form__progress}>Review · Last step</p>
      <div className={styles.form__bar} aria-hidden="true"><div className={styles.form__barFill} style={{ width: '100%' }} /></div>
      <h2 className={styles.form__title}>Check your answers.</h2>
      <p className={styles.form__intro}>Nothing has been sent yet. Edit any section, then confirm and submit.</p>
      <div className={styles.form__review}>
        {SECTIONS.map((s, i) => (
          <div key={s.id} className={styles.form__reviewSection}>
            <h3>
              <span>{s.id}. {s.title}</span>
              <button type="button" className={styles.form__linkButton} onClick={() => goTo(i)}>Edit</button>
            </h3>
            <dl>
              {s.questions.map((q) => (
                <div key={q.id}>
                  <dt>{q.label}</dt>
                  <dd>{display(q, draft.answers[q.id])}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <div className={styles.form__honeypot} aria-hidden="true">
        <label>Leave this empty <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
      </div>
      <label className={styles.form__option} style={{ marginTop: 32 }}>
        <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
        <span>{CONFIRMATION_TEXT}</span>
      </label>
      {submitError && <p className={styles.form__error} role="alert">{submitError}</p>}
      <div className={styles.form__actions}>
        <button type="button" className="btn btn--ghost" onClick={() => goTo(SECTIONS.length - 1)}>Back</button>
        <button type="button" className="btn btn--ochre" disabled={submitting} onClick={submit}>
          {submitting ? 'Submitting…' : 'Submit application'} <span className="arrow">→</span>
        </button>
        {savedLine}
      </div>
    </section>
  );
}
```

If `react-hooks` lint rules flag anything, fix it with the smallest behaviour-preserving change. The autosave `setSavedAt` runs inside a timeout callback, so it is not a synchronous setState-in-effect.

- [ ] **Step 5: Build, test, lint, smoke**

```bash
npm test && npm run lint && npm run build
npx next start -p 3100   # background
npm run smoke
```

Expected: all green, including `/apply/form` 200.

- [ ] **Step 6: End-to-end in a browser (Playwright MCP) against the local server, which uses the staging database via `.env.local`**

At 1440 and at 375:
1. Open `/apply/form`. The screener shows. Click Continue without answering and confirm the error. Answer "no" to English and confirm the "isn't the right fit" screen. Click "Change my answers", set all to yes, and continue.
2. Section A: click "Next section" empty and confirm the error summary lists the required questions, each linking to `#q-<id>`. Paste 300 characters into A1 and confirm the value is truncated to 100. Type `~2,000+` into A11 and confirm it shows `2000`.
3. Reload the page and confirm you return to the same section with your answers intact (autosave).
4. Fill A–H with valid data (use the `validAnswers()` values from `lib/application/handle.test.ts`). Set B3 to `phase2-e2e-<timestamp>@example.org`. Reach Review, confirm the summary, tick the confirmation and submit. Confirm the thank-you screen. Reload and confirm the form starts fresh (draft cleared).
5. Failure path: fill the screener and section A again, go to Review (or seed a valid draft through `localStorage` with `browser_evaluate`), block `**/api/apply` with a route that aborts, and submit. Confirm the retry message appears, the review is still shown, and a reload still restores the draft.
6. At 375: no horizontal scroll (`scrollWidth <= innerWidth`) on screener, a table section (C), a sentence section (E) and review. Touch targets are at least 44px.

Report the email used in step 4. The controller confirms the row in the staging database. Screenshots go only under the plan workspace `shots/` folder.

- [ ] **Step 7: Commit**

```bash
git add app/apply/form scripts/smoke-routes.mjs
git commit -m "feat: add the application form flow with screener, review and submit"
```

---

### Task 7: Offline PDF and Apply page "Before you start"

**Files:**
- Modify: `package.json` (devDependency + script), `tsconfig.json` (`allowImportingTsExtensions`), `app/apply/page.tsx`, `app/apply/apply.module.css`, `scripts/smoke-routes.mjs`
- Create: `lib/application/schemaHash.ts`, `lib/application/schemaHash.test.ts`, `scripts/build-application-pdf.ts`, `lib/application/pdf-manifest.json` (generated), `public/application/summit-fellowship-application.pdf` (generated)

**Interfaces:**
- Produces: `schemaHash(): string` (sha256 hex of `JSON.stringify({ SCHEMA_VERSION, SECTIONS, SCREENER_QUESTIONS, CONFIRMATION_TEXT })`), npm script `pdf:application`. The PDF lives at `/application/summit-fellowship-application.pdf`.

- [ ] **Step 1: Install pdfkit and enable `.ts` imports for the Node script**

```bash
npm install --save-dev pdfkit@0.15.0 @types/pdfkit@0.13.4
npm pkg set scripts.pdf:application="node scripts/build-application-pdf.ts"
```

In `tsconfig.json` `compilerOptions`, add `"allowImportingTsExtensions": true`. This is allowed because `noEmit` is true.

- [ ] **Step 2: Write the failing test `lib/application/schemaHash.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import manifest from './pdf-manifest.json';
import { schemaHash } from './schemaHash';

describe('application PDF', () => {
  it('was generated from the current question schema (run `npm run pdf:application` after editing questions)', () => {
    expect(manifest.schemaHash).toBe(schemaHash());
  });
});
```

Create `lib/application/pdf-manifest.json` as `{ "schemaHash": "", "generatedAt": "" }` so the import resolves. Run `npx vitest run lib/application/schemaHash.test.ts`. Expected: FAIL, the import `./schemaHash` does not exist.

- [ ] **Step 3: Create `lib/application/schemaHash.ts`**

```ts
import { createHash } from 'node:crypto';
import { CONFIRMATION_TEXT, SCHEMA_VERSION, SECTIONS } from './questions.ts';
import { SCREENER_QUESTIONS } from './screener.ts';

export function schemaHash(): string {
  return createHash('sha256')
    .update(JSON.stringify({ SCHEMA_VERSION, SECTIONS, SCREENER_QUESTIONS, CONFIRMATION_TEXT }))
    .digest('hex');
}
```

Note: if Node treats `scripts/build-application-pdf.ts` as CommonJS (no `"type": "module"`), rename it to `.mts` and update the npm script. `screener.ts` imports only types, and `questions.ts` imports only types, so Node's type stripping can load them directly. Do not add value imports between `lib/application/*` modules that the PDF script loads, unless they use explicit `.ts` extensions.

- [ ] **Step 4: Create `scripts/build-application-pdf.ts`**

```ts
import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import PDFDocument from 'pdfkit';
import { BEFORE_YOU_START, CONFIRMATION_TEXT, SECTIONS } from '../lib/application/questions.ts';
import { schemaHash } from '../lib/application/schemaHash.ts';
import { SCREENER_QUESTIONS } from '../lib/application/screener.ts';

const site = JSON.parse(readFileSync(new URL('../data/site.json', import.meta.url), 'utf8')) as { currentCohort: { year: number } };
const year = site.currentCohort.year;
const outDir = new URL('../public/application/', import.meta.url);
mkdirSync(outDir, { recursive: true });

const doc = new PDFDocument({ size: 'A4', margin: 56, info: { Title: `Summit Fellowship — ${year} application (offline copy)`, Subject: schemaHash() } });
doc.pipe(createWriteStream(new URL('summit-fellowship-application.pdf', outDir)));

const h1 = (t: string) => doc.font('Times-Roman').fontSize(24).fillColor('#142734').text(t).moveDown(0.4);
const h2 = (t: string) => doc.moveDown(0.8).font('Times-Roman').fontSize(18).fillColor('#142734').text(t).moveDown(0.3);
const body = (t: string, opts: PDFKit.Mixins.TextOptions = {}) => doc.font('Helvetica').fontSize(10).fillColor('#1a1410').text(t, opts);
const note = (t: string) => doc.font('Helvetica-Oblique').fontSize(9).fillColor('#6b625b').text(t);
const lines = (n: number) => {
  for (let i = 0; i < n; i++) {
    doc.moveDown(0.6);
    const y = doc.y;
    doc.moveTo(doc.page.margins.left, y).lineTo(doc.page.width - doc.page.margins.right, y).strokeColor('#d4cab5').stroke();
  }
  doc.moveDown(0.6);
};

h1(`Summit Fellowship — ${year} application`);
body('This is an offline copy of the online application, for drafting. Applications are only accepted through the online form at /apply/form — paste your answers in when you are ready. Character limits below are hard limits online.');
h2('Before you start, gather:');
BEFORE_YOU_START.forEach((b) => body(`•  ${b}`));
note('G3 (the path to 1M users) is the one long answer — plan five to eight minutes for it.');

h2('Eligibility (answer yes or no)');
SCREENER_QUESTIONS.forEach((q) => body(`☐ Yes  ☐ No   ${q.label}`).moveDown(0.2));

for (const section of SECTIONS) {
  doc.addPage();
  h1(`Section ${section.id} — ${section.title}`);
  for (const q of section.questions) {
    doc.moveDown(0.6);
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a1410').text(`${q.id}. ${q.label}${q.required ? '' : ' (optional)'}`);
    if (q.help) note(q.help);
    switch (q.kind) {
      case 'text':
        note(`Max ${q.maxChars} characters.`);
        lines(Math.min(12, Math.max(1, Math.ceil(q.maxChars / 90))));
        break;
      case 'radio':
        q.options.forEach((o, i) => body(`☐ ${q.numbered ? `${i + 1}. ` : ''}${o}`));
        note('Choose one.');
        break;
      case 'select':
      case 'multiselect':
        q.options.forEach((o) => body(`☐ ${o}`));
        note(q.kind === 'select' ? 'Choose one.' : 'Choose all that apply.');
        if (q.specify) note(`If ${q.specify.options.join(' / ')}: please specify (max ${q.specify.maxChars} characters).`);
        break;
      case 'sentence':
        body(q.parts.map((p) => (typeof p === 'string' ? p : `[${p.hint} — max ${p.maxChars}]`)).join(' '));
        lines(2);
        break;
      case 'table':
        note(`Up to ${q.maxRows} row${q.maxRows > 1 ? 's' : ''}. Columns: ${q.columns.map((c) => c.label).join(' | ')}${q.columns.some((c) => c.allowUntracked) ? ' ("we don\'t track this" allowed for counts)' : ''}.`);
        lines(q.maxRows * 2);
        break;
      case 'number':
        note(`Digits only.${q.allowUntracked ? ' Or tick: ☐ We don\'t track this.' : ''}`);
        lines(1);
        break;
      default:
        lines(1);
    }
  }
}

doc.addPage();
h1('Confirmation');
body(`☐ ${CONFIRMATION_TEXT}`);
doc.end();

writeFileSync(new URL('../lib/application/pdf-manifest.json', import.meta.url), `${JSON.stringify({ schemaHash: schemaHash(), generatedAt: new Date().toISOString() }, null, 2)}\n`);
console.log('Wrote public/application/summit-fellowship-application.pdf');
```

The PDF uses the brand's hex colours inside pdfkit calls. This is a print artefact, not site CSS, so the "no hex in CSS" rule does not apply. If pdfkit's built-in fonts cannot render `☐` or `—`, replace them with `[ ]` and `-` respectively.

- [ ] **Step 5: Generate, then run the test**

```bash
npm run pdf:application
npx vitest run lib/application/schemaHash.test.ts
```

Expected: the PDF is written, and the test passes. Open the PDF (Read tool or `pdf-viewer`) and check sections A–H, the screener, the caps, and that "Scale Screen" does not appear.

- [ ] **Step 6: Apply page "Before you start" + PDF link (shown only when live)**

In `app/apply/page.tsx`, import `BEFORE_YOU_START` from `@/lib/application/questions`. Inside the left column, after "How selection works", render when `live`:

```tsx
{live && (
  <>
    <h2 className={styles.apply__heading}>Before you start</h2>
    <p className={styles.apply__intro}>About 25 minutes of typing once you have gathered your numbers. Your answers save automatically in this browser. Have these ready:</p>
    <ul className={styles.apply__list}>
      {BEFORE_YOU_START.map((b) => <li key={b}>{b}</li>)}
    </ul>
    <p className={styles.apply__intro}>One answer — your path to a million users — is longer than the rest. Plan five to eight minutes for it.</p>
    <a className="btn btn--ghost" href="/application/summit-fellowship-application.pdf" download>
      Download the application (PDF)
    </a>
  </>
)}
```

Add to `app/apply/apply.module.css`: `.apply__intro { color: var(--ink-soft); margin: 0 0 16px; max-width: 65ch; }`.

Add smoke expectations: append `'Before you start', 'Download the application (PDF)'` to the `/apply` row's `contains`, and add the row `{ path: '/application/summit-fellowship-application.pdf', status: 200 }`.

- [ ] **Step 7: Test, lint, build, smoke; commit**

```bash
npm test && npm run lint && npm run build
npx next start -p 3100   # background
npm run smoke
git add package.json package-lock.json tsconfig.json lib/application scripts/build-application-pdf.ts public/application app/apply scripts/smoke-routes.mjs
git commit -m "feat: add offline application PDF and Before you start guidance"
```

---

### Task 8: Docs and FAQ alignment

**Files:**
- Modify: `CLAUDE.md`, `data/faq.json`

- [ ] **Step 1: FAQ**

In `data/faq.json`, the answer to "Can I save my answers and come back later?" carries a `[TO CONFIRM: Phase 2 only …]` marker. Those features now exist, so remove the marker. Keep the rest of the answer, and make sure it mentions the PDF download on the Apply page. `npm run check:golive` should then list 4 items.

- [ ] **Step 2: CLAUDE.md**

Add an **"Application form (Phase 2)"** section covering:
- the files (schema in `lib/application/questions.ts`, the single source for form, validator, server and PDF);
- that editing questions requires `npm run pdf:application` (the test enforces it);
- the `/api/apply` flow;
- the Supabase projects (staging `wagaimviefobclwhaboa`, production `sfkmvxewojvstmincdzw`, both ap-south-1, free plan), the migration file, the access model (RPC only, RLS with no policies), and that applications are read in the Supabase dashboard → Table editor → `applications` (export CSV);
- env vars `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` (server-only; Preview/Development → staging, Production → production);
- that non-production deployments always treat applications as open;
- the yearly step: set `applicationsOpen` / dates in `data/site.json` and bump the year;
- the free-plan caveat: Supabase pauses free projects after about 7 days without activity. Check that the production project is active before opening applications (dashboard → Restore if paused).

Update the Pages table: `/apply/form` (200), and `/api/apply` (POST).

- [ ] **Step 3: Commit**

```bash
npm test && npm run lint
git add CLAUDE.md data/faq.json
git commit -m "docs: document the application form, Supabase setup and yearly steps"
```
