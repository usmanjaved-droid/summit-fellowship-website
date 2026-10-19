import siteData from '@/data/site.json';
import { isProductionDeploy } from './env';

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
  return isProductionDeploy(env) ? c : { ...c, applicationsOpen: true };
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
    label: isApplicationLive(c, formEnabled) ? `Apply for the ${c.year} cohort` : 'How to apply',
    href: '/apply',
  };
}

/** One line on where applications stand: the deadline while live, otherwise that they open soon. */
export function getApplicationStatus(c: CohortSettings, formEnabled: boolean = FORM_ENABLED): string {
  return isApplicationLive(c, formEnabled)
    ? `Applications close: ${displayValue(c.applicationDeadline)}`
    : `Applications for the ${c.year} cohort open soon.`;
}

