import { describe, expect, it } from 'vitest';
import { PRIMARY_LINKS, getNavGroups, isCurrentGroup, isCurrentPath } from './navigation';

describe('navigation', () => {
  it('has About and Cohorts groups', () => {
    const groups = getNavGroups();
    expect(groups.map((g) => g.label)).toEqual(['About', 'Cohorts']);
    expect(groups[0].links.map((l) => l.href)).toEqual(['/curriculum', '/faculty']);
  });
  it('lists every cohort year under Cohorts', () => {
    const cohorts = getNavGroups()[1].links;
    expect(cohorts[0]).toEqual({ href: '/cohorts/2026', label: '2026 · Inaugural cohort' });
  });
  it('has FAQ and Contact as primary links', () => {
    expect(PRIMARY_LINKS).toEqual([
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ]);
  });
});

describe('current page', () => {
  it('matches a page and the pages inside it; home only matches itself', () => {
    expect(isCurrentPath('/faq', '/faq')).toBe(true);
    expect(isCurrentPath('/apply', '/apply/form')).toBe(true);
    expect(isCurrentPath('/faq', '/faqs')).toBe(false);
    expect(isCurrentPath('/', '/')).toBe(true);
    expect(isCurrentPath('/', '/faq')).toBe(false);
  });
  it('marks About on curriculum and faculty, Cohorts anywhere under /cohorts', () => {
    const [about, cohorts] = getNavGroups();
    expect(isCurrentGroup(about, '/faculty')).toBe(true);
    expect(isCurrentGroup(about, '/faq')).toBe(false);
    expect(isCurrentGroup(cohorts, '/cohorts')).toBe(true);
    expect(isCurrentGroup(cohorts, '/cohorts/2026/fellows/habiba-banu')).toBe(true);
  });
});
