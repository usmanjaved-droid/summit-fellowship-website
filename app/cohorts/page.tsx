import { getCohorts } from '@/lib/cohorts';
import { getAllFellows } from '@/lib/fellows';
import PageHero from '../components/PageHero';
import { ArrowLink, Section } from '../components/fop';
import styles from './cohorts.module.css';

export const metadata = {
  title: 'Cohorts — Friends of Pakistan Fellowship',
  description: 'Every Friends of Pakistan Fellowship cohort: the founders, the week, and where it happened.',
};

export default function CohortsPage() {
  return (
    <>
      <PageHero
        crumb="Cohorts"
        title={<>Every <em>cohort.</em></>}
        subtitle="The founders who have done the work, the week they spent, and where they spent it."
      />
      <Section tone="offwhite">
        <div className={styles.list}>
          {getCohorts().map((c) => (
            <article key={c.year} className={styles.card}>
              <p className={`t-eyebrow ${styles.dates}`}>{c.dates}</p>
              <h2 className={`t-heading-2 ${styles.title}`}>{c.label}</h2>
              <p className={`t-body-sm ${styles.meta}`}>
                {c.venue}, {c.location} · {getAllFellows(c.year).length} fellows
              </p>
              <p className={`t-body ${styles.summary}`}>{c.summary}</p>
              <ArrowLink href={`/cohorts/${c.year}`}>Explore the cohort</ArrowLink>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
