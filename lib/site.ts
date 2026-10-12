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
