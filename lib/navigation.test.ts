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
