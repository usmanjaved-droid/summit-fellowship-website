import Link from 'next/link';
import type { Cohort } from '@/lib/cohorts';
import CohortTabs from './CohortTabs';
import styles from './CohortBar.module.css';

export default function CohortBar({ cohort }: { cohort: Cohort }) {
  return (
    <div className={styles['cohort-bar']}>
      <div className={`container ${styles['cohort-bar__inner']}`}>
        <p className={`t-eyebrow ${styles['cohort-bar__label']}`}>
          <Link href="/cohorts">Cohorts</Link>
          <span aria-hidden="true">/</span>
          <span>
            {cohort.year}
            <span className={styles['cohort-bar__details']}>
              {' '}· {cohort.venue}, {cohort.location} · {cohort.dates}
            </span>
          </span>
        </p>
        <CohortTabs year={cohort.year} />
      </div>
    </div>
  );
}
