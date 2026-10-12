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
