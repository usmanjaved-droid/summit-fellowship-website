import siteData from '@/data/site.json';
import { isProductionDeploy } from './env';

export type CohortSettings = {
  year: number;
  retreatDates: string | null;
  location: string | null;
  /** Deadline as shown to visitors, e.g. "11 December 2026, 11:59 pm PKT". */
  applicationDeadline: string | null;
  /** Master switch. With it on, the form is live between applicationsOpenAt and applicationsCloseAt. */
  applicationsOpen: boolean;
  /** ISO time the form opens (e.g. "2026-11-06T00:00:00+05:00"); null = open as soon as the switch is on. */
  applicationsOpenAt?: string | null;
  /** ISO time the form closes (e.g. "2026-12-11T23:59:59+05:00"); null = no automatic close. */
  applicationsCloseAt?: string | null;
};

/** Where applications stand: switched off (no date yet), scheduled to open, open, or past the deadline. */
export type ApplicationPhase = 'unscheduled' | 'upcoming' | 'live' | 'closed';

export type SiteSettings = {
  currentCohort: CohortSettings;
  contactEmail: string;
};

export const TBC = 'To be confirmed';

/** The application form exists (Phase 2). */
export const FORM_ENABLED = true;

export function getSiteSettings(): SiteSettings {
  return siteData as SiteSettings;
}

/**
 * The cohort settings pages and the API should use. Production follows data/site.json.
 * Every non-production deployment (staging previews, local) treats applications as open,
 * so the team can test the form end to end against the staging database.
 */
export function getCurrentCohort(env: Record<string, string | undefined> = process.env): CohortSettings {
  const c = getSiteSettings().currentCohort;
  // Outside production the form is always open, ignoring the dates, so it can be tested at any time.
  return isProductionDeploy(env)
    ? c
    : { ...c, applicationsOpen: true, applicationsOpenAt: null, applicationsCloseAt: null };
}

const time = (iso: string | null | undefined) => (iso ? Date.parse(iso) : NaN);

export function getApplicationPhase(
  c: CohortSettings,
  formEnabled: boolean = FORM_ENABLED,
  now: number = Date.now(),
): ApplicationPhase {
  if (!c.applicationsOpen || !formEnabled) return 'unscheduled';
  if (now < time(c.applicationsOpenAt)) return 'upcoming';
  if (now > time(c.applicationsCloseAt)) return 'closed';
  return 'live';
}

/** The day applications open, in Pakistan time, e.g. "6 November 2026"; null when no date is set. */
export function formatOpeningDay(c: CohortSettings): string | null {
  const t = time(c.applicationsOpenAt);
  if (Number.isNaN(t)) return null;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' }).format(t);
}

export function displayValue(v: string | null | undefined): string {
  const trimmed = (v ?? '').trim();
  return trimmed === '' ? TBC : trimmed;
}

export function isApplicationLive(c: CohortSettings, formEnabled: boolean = FORM_ENABLED, now: number = Date.now()): boolean {
  return getApplicationPhase(c, formEnabled, now) === 'live';
}

export function getApplyCta(c: CohortSettings, formEnabled: boolean = FORM_ENABLED, now: number = Date.now()) {
  return {
    label: isApplicationLive(c, formEnabled, now) ? `Apply for the ${c.year} cohort` : 'How to apply',
    href: '/apply',
  };
}

/** One line on where applications stand: the deadline while live, the opening day before, closed after. */
export function getApplicationStatus(c: CohortSettings, formEnabled: boolean = FORM_ENABLED, now: number = Date.now()): string {
  switch (getApplicationPhase(c, formEnabled, now)) {
    case 'live':
      return `Applications close: ${displayValue(c.applicationDeadline)}`;
    case 'upcoming':
      return `Applications for the ${c.year} cohort open on ${formatOpeningDay(c)}.`;
    case 'closed':
      return `Applications for the ${c.year} cohort are now closed.`;
    default:
      return `Applications for the ${c.year} cohort open soon.`;
  }
}

