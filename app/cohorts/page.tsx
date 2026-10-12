import Link from 'next/link';
import { getCohorts } from '@/lib/cohorts';
import { getAllFellows } from '@/lib/fellows';
import styles from './cohorts.module.css';

export const metadata = {
  title: 'Cohorts — Summit Fellowship',
  description: 'Every Summit Fellowship cohort: the founders, the week, and where it happened.',
};

export default function CohortsPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Cohorts Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Cohorts</span></div>
          <h1 className="page-hero__title">Every <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>cohort.</em></h1>
          <p className="page-hero__subtitle">The founders who have done the work, the week they spent, and where they spent it.</p>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.cohorts__list}`}>
          {getCohorts().map((c) => (
            <Link key={c.year} href={`/cohorts/${c.year}`} className={styles.cohorts__card}>
              <span className="eyebrow">{c.dates}</span>
              <h2 className={styles.cohorts__title}>{c.label}</h2>
              <p className={styles.cohorts__meta}>
                {c.venue}, {c.location} · {getAllFellows(c.year).length} fellows
              </p>
              <p className={styles.cohorts__summary}>{c.summary}</p>
              <span className={styles.cohorts__more}>Explore the cohort →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
