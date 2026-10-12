import { getCohorts } from './cohorts';

export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; links: NavLink[] };

export const PRIMARY_LINKS: NavLink[] = [
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function getNavGroups(): NavGroup[] {
  return [
    {
      label: 'About',
      links: [
        { href: '/curriculum', label: 'Curriculum' },
        { href: '/faculty', label: 'Faculty' },
      ],
    },
    {
      label: 'Cohorts',
      links: getCohorts().map((c) => ({ href: `/cohorts/${c.year}`, label: c.label })),
    },
  ];
}
