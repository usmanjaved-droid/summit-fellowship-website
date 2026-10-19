import { getCohorts } from './cohorts';

export type NavLink = { href: string; label: string };
/** `sections`: the path prefixes that count as "in" this group (marks the group as the current page). */
export type NavGroup = { label: string; links: NavLink[]; sections: string[] };

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
      sections: ['/curriculum', '/faculty'],
    },
    {
      label: 'Cohorts',
      links: getCohorts().map((c) => ({ href: `/cohorts/${c.year}`, label: c.label })),
      sections: ['/cohorts'],
    },
  ];
}

/** Whether `pathname` is the page `href` or inside it. Home ("/") only matches itself. */
export function isCurrentPath(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isCurrentGroup(group: NavGroup, pathname: string): boolean {
  return group.sections.some((s) => isCurrentPath(s, pathname));
}
