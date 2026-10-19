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
