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

/** The fellows before and after this one in the cohort's order (null at either end). */
export function getAdjacentFellows(year: number, slug: string): { prev: Fellow | null; next: Fellow | null } {
  const all = getAllFellows(year);
  const i = all.findIndex((f) => f.id === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: all[i - 1] ?? null, next: all[i + 1] ?? null };
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
