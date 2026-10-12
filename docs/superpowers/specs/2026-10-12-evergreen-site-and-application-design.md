# Summit Fellowship — Evergreen Site & Application Form

**Date:** 2026-10-12
**Status:** Design approved in conversation; awaiting written-spec review
**Owner:** Usman Javed

---

## 1. Purpose

The site was built for the inaugural 2026 cohort, for people who had already been accepted. It becomes the **permanent site for the Summit Fellowship**. Its main audience is **prospective applicants**. Funders and partners are a secondary audience. Each year the site opens applications through a form on the site itself, and the previous cohort moves into an archive.

**Success looks like:**
- No page assumes a particular year, except pages inside the cohort archive.
- Opening applications for a new year means editing one settings file.
- An applicant can check eligibility, read what the fellowship offers, prepare offline with a PDF, and submit the 2027 application (V-4) on the site. Their answers are saved in Supabase.
- All work is reviewed on a staging site before anything reaches production.

## 2. Decisions made

| Topic | Decision |
|---|---|
| Name | **Summit Fellowship** everywhere (not "Skardu Scale-Up Fellowship") |
| 2026 content | Kept as an archive: **Cohorts → 2026**, one hub page with tabs |
| Old URLs | **No redirects.** New, clean URLs. Old links reach a helpful 404 page |
| Production | `summit-fellowship-website.vercel.app` (Vercel project `summit-fellowship-website`), deployed from `master` |
| Other Vercel projects | `summit-fellowship` paused 2026-10-12. `summit-fellowship-2026` left untouched; the owner will decide later |
| Staging | `staging` branch with a stable preview URL, a staging banner, `noindex`, shared through a Vercel shareable link (secret-URL fallback) |
| Application form | Custom form in the site's design system. Questions come from **V-4** ("Summit Fellowship – Sourcing Application for review", Sept 2026). The prototype's visual design is **not** reused |
| Eligibility screener | The V-2 threshold checks |
| Save & return | Browser-only autosave, plus a downloadable PDF for offline drafting. No email service in this scope |
| Storage | Supabase, with separate staging and production databases |
| Reviewer page | **Out of scope.** The data shape must support building one later |
| Delivery | Two phases, both on staging. The owner decides when each goes live |

## 3. Information architecture

| Page | URL | Phase | Notes |
|---|---|---|---|
| Home | `/` | 1 | Rewritten so it doesn't depend on the year (§5) |
| Curriculum | `/curriculum` | 1 | Year references removed |
| Faculty & Team | `/faculty` | 1 | Kept |
| Apply | `/apply` | 1 | New (§6) |
| Application form | `/apply/form` | 2 | New (§7). In Phase 1 it shows "Applications opening soon" |
| FAQ | `/faq` | 1 | New (§6.3) |
| Contact | `/contact` | 1 | Kept |
| Cohorts index | `/cohorts` | 1 | New. A list of cohorts |
| 2026 cohort hub | `/cohorts/2026` | 1 | New. Tabs: Fellows · The Week · Venue · Explore Skardu |
| 2026 fellow | `/cohorts/2026/fellows/[slug]` | 1 | The existing full-page editorial profile, moved |
| Not found | (any unknown URL) | 1 | Links to Home, Apply, and the latest cohort |

**Removed:** `/fellows`, `/fellows/[slug]`, `/itinerary`, `/venue`, `/explore-skardu`, `/travel`, `/resources`. The content of the first five moves under `/cohorts/2026`. Travel and Resources were pre-arrival logistics for accepted fellows and are dropped from public view.

**Hub tabs** are implemented as sub-routes (`/cohorts/2026/fellows`, `/cohorts/2026/week`, `/cohorts/2026/venue`, `/cohorts/2026/explore`), so each tab has its own shareable URL and the pages stay statically generated. `/cohorts/2026` shows the Fellows tab.

### Main menu

`Summit Fellowship` (logo → Home) · **About ▾** (Curriculum, Faculty) · **Cohorts ▾** (2026 · Skardu) · FAQ · Contact · **[Apply]** (button)

The Cohorts dropdown lists only years. A new year adds one entry. The footer mirrors these groups.

## 4. Content model

### 4.1 Site settings (one file)

`data/site.json` holds everything that changes once a year:

```json
{
  "currentCohort": {
    "year": 2027,
    "retreatDates": "To be confirmed",
    "location": "To be confirmed",
    "applicationDeadline": null,
    "applicationsOpen": false
  },
  "contactEmail": "usman.javed@taleemabad.com"
}
```

The homepage hero, the date band, the Apply page, the header button and `/apply/form` all read from this file. A `null` or "To be confirmed" value renders as "To be confirmed" and never as an empty gap.

### 4.2 Cohort archive data

Each cohort has its own folder: `data/cohorts/2026/` containing `cohort.json` (year, dates, venue name, location, one-line summary), `fellows.json` (moved from `data/fellows-deep.json`), `schedule.json`, and the venue and explore content used by the hub tabs. `lib/fellows.ts` becomes cohort-aware (`getFellow(year, slug)`, `getAllFellows(year)`). A registry (`data/cohorts/index.json`, or a directory read at build time) lists the available cohorts for the menu and `/cohorts`.

Adding a future cohort means adding a folder and one registry entry. No page code changes.

`faculty.json` stays at the top level, because faculty are a property of the fellowship rather than of one cohort.

## 5. Homepage

1. **Hero:** "Summit Fellowship" with the existing lead line. The call to action depends on `applicationsOpen`:
   - open: **"Apply for the {year} cohort →"** (to `/apply`), plus a strip reading *Applications close {deadline} · Retreat {retreatDates} · {location}*
   - closed: **"Applications opening soon"**, plus a strip reading *Next cohort: {retreatDates}*
2. **Date band** (the existing `EventDate` component): shows the application deadline when applications are open; hidden otherwise.
3. **Why this fellowship:** the existing section and growth chart, with year references removed.
4. **What you get** (new): four tiles: a 7-day immersive retreat · the Mulago scale framework · one-to-one mentoring with Mulago experts · Demo Day in front of funders investing in Pakistan. Footnote: *Fully funded: accommodation, meals and domestic travel.*
5. **How it works** (replaces "Before you arrive"): Apply → Shortlist & 45-minute conversation → Final selection of 12 → The retreat week → Ongoing support & peer network.
6. **Meet the 2026 fellows** (new): a strip of photos and organisations, linking to `/cohorts/2026`.
7. **Faculty** (new): a row of faces, linking to `/faculty`.
8. **Closing call to action:** "Ready to design for scale?" with Apply and FAQ.

Copy sources: the "Application form" section of the Fellows Selection Process doc (What You'll Experience, Expected Outcomes, Fellowship Details) and the Mulago Fellowship Brief.

## 6. Apply page and FAQ

### 6.1 `/apply`

- **Who should apply:** the V-2 thresholds in plain language. A founder or senior-most leader with real decision-making power (founder strongly preferred). Past the pilot stage, with strong delivery or reach numbers in the last 12 months. Annual budget of at least USD 100,000. Basic financial systems (audited statements or equivalent). Improves the lives of, or meets the basic needs of, the poor. Fluent in English. Able to spend 7 consecutive days fully present (no email or calls during sessions).
- **What the fellowship covers:** fully funded accommodation, meals and domestic travel. 12 organisations, one leader each. Conducted in English.
- **How selection works:** Stage 1, written application review (~2 weeks). Stage 2, a 45-minute conversation with the Mulago and Taleemabad team for shortlisted applicants (~2 weeks). Stage 3, final selection of 12 plus 3–4 alternates (~1 week).
- **Key dates:** from `site.json`.
- **Before you start** *(Phase 2)*: about 25 minutes of typing once the numbers are gathered. What to gather (from V-4's standing page): active user count and your internal definition of "active", the month of your first outside user, your three largest sites with users and start dates, your primary metric and how it is measured, your single best outcome result. A note that G3 is the one long answer. A **Download the application (PDF)** button.
- **Call to action:** "Start your application" goes to `/apply/form` when applications are open. Otherwise it reads "Applications opening soon".

### 6.2 Selection-process wording

The Apply page describes the process. It does not publish the internal evaluation rubric or the Scale Screen mapping. V-4: "No applicant is told which test they are being put through."

### 6.3 `/faq`

12–15 questions grouped under *Eligibility · The application · The retreat · After the fellowship*, drafted from the Drive documents. Anything the documents don't settle (for example international travel costs, or whether a co-founder may attend instead) is left as a visible `[TO CONFIRM]` placeholder for the owner and **must be resolved before go-live**. FAQ content lives in `data/faq.json`.

## 7. Application form (Phase 2)

### 7.1 Flow

1. **Eligibility screener** (first screen of `/apply/form`): six yes/no questions. Founder or senior-most decision-maker · post-pilot · annual budget ≥ USD 100,000 · basic financial systems · fluent in English · can commit to 7 days with full presence. The screener also asks *Are you the founder?* and *Your role* so they can be passed through to the application, as V-4 requires. Any "no" on a threshold shows a respectful "not the right fit this year" screen, and the form is not shown.
2. **Sections A–H,** one section per screen, with a progress indicator ("Section C of H · Where you are today"). Applicants can move back and forth freely.
3. **Review screen:** the whole application read-only, the V-4 confirmation checkbox, then Submit.
4. **Confirmation screen:** the V-4 confirmation text, with the contact email taken from `site.json`.

### 7.2 Question definitions

All V-4 questions (A1–A12, B1–B5, C1–C5, D1–D2, E1–E3, F1–F4, G1–G3, H1–H2) are defined **once**, in a typed schema (`lib/application/questions.ts`). The schema records each question's id, label, help text, type, character cap, required flag, options, and any "we don't track this" flag. The form UI, server-side validation and the PDF are all generated from this schema.

### 7.3 V-4 rules enforced

- Hard character caps, stated once in characters, with a live countdown. Pasted text over the cap is truncated, not rejected.
- Numeric fields accept digits only. A "we don't track this" checkbox appears where V-4 specifies one (A10, D2 count).
- Sentence completions (C3, E3, G1) are rendered as sentences with inline blanks.
- Decomposed sub-fields (E2's three boxes, every table cell) are answered separately.
- Tables (C4, D2, F2): up to 3 rows, or exactly 1 for F2. Every cell is required in any row that has been started.
- Ladders (C1, F1): single choice, required, no "other". F1 shows the rung numbers.
- C3 and C4 are reconciled for the reviewer, not enforced.
- The phrase "Mulago Scale Screen" never appears in the form.

### 7.4 Autosave

Answers are saved to `localStorage` (keyed by cohort year) on every change, debounced, with a visible "Saved" indicator. Reopening `/apply/form` on the same browser restores the draft. All storage access is wrapped so that if storage is blocked the form still works, just without saving. The draft is cleared after a successful submission.

### 7.5 PDF

Generated from the question schema, so it always matches the form. It contains every question in order with its caps and help text, plus space to write. Served as a static file built from the schema (generation script under `scripts/`), linked from `/apply`.

### 7.6 Closed state

When `applicationsOpen` is false, `/apply/form` shows "Applications for the {year} cohort are closed", and the server rejects any submission.

### 7.7 Design and accessibility

Built with the site's tokens and CSS Modules (BEM): parchment backgrounds, serif headings, ochre primary buttons. Mobile-first at 375px. Every input has a label. Errors are announced to screen readers and linked to their field. Keyboard-only completion works.

## 8. Data and security (Supabase)

- **Two Supabase projects:** staging and production. The Vercel Preview environment points to staging and the Production environment points to production.
- **Table `applications`:** `id` (uuid), `cohort_year` (int), `submitted_at` (timestamptz), `applicant_name`, `applicant_email`, `org_name`, `screener` (jsonb), `answers` (jsonb, keyed by question id), `schema_version` (text, e.g. `v4`), `is_latest` (bool).
- **Duplicates:** the same email and cohort submitted again inserts a new row. Earlier rows for that pair get `is_latest = false`. Nothing is overwritten.
- **Write path:** a Next.js server route (`app/api/apply/route.ts`) re-validates the payload against the question schema, checks that applications are open, applies anti-spam checks, then inserts using the service-role key. That key is a server-only environment variable and is never exposed to the browser.
- **Row-level security:** enabled with **no** anon or public policies. No one can read or write through the public API. Only the server route (service role) and the Supabase dashboard can access rows.
- **Anti-spam:** a hidden honeypot field and per-IP rate limiting on the route.
- **Reading applications:** the Supabase dashboard (table view and CSV export) until a reviewer page is built in a later project.

## 9. Staging environment

- A long-lived `staging` branch. Vercel gives it a stable branch URL on the `summit-fellowship-website` project.
- A **"STAGING – not the live site"** banner, rendered only when `VERCEL_ENV !== 'production'`.
- `noindex`: a `robots` metadata and `X-Robots-Tag` header on non-production deployments.
- Access: Vercel Authentication is already on for previews. A Vercel **shareable link** (free plan: one per account) is created on the staging URL. On the first staging deploy, check whether the link survives later deployments. If it doesn't, fall back to a public preview at an unguessable URL with `noindex`.
- **Go-live:** merge `staging` into `master`, after explicit owner approval per phase.

## 10. Delivery phases

**Phase 1, site structure:** staging setup (§9) · `site.json` · cohort data move · `/cohorts`, `/cohorts/2026/*` · new menu and footer · homepage (§5) · `/apply` without the form · `/faq` · curriculum cleanup · removed routes · 404 page · `CLAUDE.md` update.

**Phase 2, application form:** question schema · screener · sections A–H · review and confirmation · autosave · PDF · Supabase projects, table and RLS · `/api/apply` · anti-spam · `/apply` "Before you start" and the live CTA.

## 11. Testing

- `npm run build` and `npm run lint` pass with no errors.
- Every page checked at 375, 768 and 1440 px.
- Phase 2: a full test submission lands in the **staging** database; the screener "no" path; caps and paste truncation; digits-only fields; table row completeness; reopening the page restores the draft; submitting clears it; a closed state rejects submissions server-side; a payload that bypasses the client is rejected by the server.

## 12. Out of scope

Reviewer page · email (resume links, confirmation emails, team notifications) · the `summit-fellowship-2026` Vercel project · custom domain · analytics · any change to the 2026 fellow profile layout beyond moving it.

## 13. Sources

Google Drive folder "Summit Fellowship" (owner usman.javed@taleemabad.com):
- *Program Design → Application Form 2027 → Summit Fellowship – Sourcing Application for review.docx* (V-4)
- *Program Design → Fellows Selection Process* (V-2 thresholds, selection stages, applicant-facing copy)
- *Skardu_Mulago – Fellowship Brief.docx* (mission, Scale Screen)
