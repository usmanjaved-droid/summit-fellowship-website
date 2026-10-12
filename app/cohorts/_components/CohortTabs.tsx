'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCohortTabs, isTabActive } from '@/lib/cohorts';
import styles from './CohortBar.module.css';

export default function CohortTabs({ year }: { year: number }) {
  const pathname = usePathname();
  return (
    <nav className={styles['cohort-bar__tabs']} aria-label={`${year} cohort sections`}>
      {getCohortTabs(year).map((tab) => {
        const active = isTabActive(tab, pathname, year);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles['cohort-bar__tab']}${active ? ` ${styles['cohort-bar__tab--active']}` : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
