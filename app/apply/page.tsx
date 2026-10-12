import Link from 'next/link';
import { displayValue, getApplyCta, getSiteSettings, isApplicationLive } from '@/lib/site';
import styles from './apply.module.css';

export const metadata = {
  title: 'Apply — Summit Fellowship',
  description: 'Who should apply to the Summit Fellowship, what it covers, and how selection works.',
};

const CRITERIA = [
  'You are the founder, or the senior-most leader with real decision-making power. Founders are strongly preferred.',
  'Your organisation is past the pilot stage, with strong delivery or reach numbers in the last 12 months.',
  'Your annual budget is at least USD 100,000, with basic financial systems in place (audited statements or equivalent).',
  'Your work improves the lives of the poor or meets their basic needs — health, education, livelihoods and beyond.',
  'You are fluent in English.',
  'You can spend seven consecutive days fully present: no email or calls during sessions.',
];

const COVERS = [
  'Accommodation, meals and domestic travel — fully funded',
  'Twelve organisations, one leader each',
  'Conducted in English',
];

const STAGES = [
  { title: 'Written application', time: 'About 2 weeks', desc: 'We read every application.' },
  { title: 'A 45-minute conversation', time: 'About 2 weeks', desc: 'Shortlisted founders talk with the Mulago and Taleemabad team, starting from your answers.' },
  { title: 'Final selection', time: 'About 1 week', desc: 'Twelve organisations are selected, plus three to four alternates.' },
];

export default function ApplyPage() {
  const cohort = getSiteSettings().currentCohort;
  const live = isApplicationLive(cohort);
  const cta = getApplyCta(cohort);

  return (
    <>
      <section className="page-hero" data-screen-label="Apply Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Apply</span></div>
          <h1 className="page-hero__title">Apply for the {cohort.year} <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>cohort.</em></h1>
          <p className="page-hero__subtitle">A fully funded, seven-day fellowship for Pakistani founders whose solutions are ready to reach millions.</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.apply__grid}`}>
          <div>
            <h2 className={styles.apply__heading}>Who should apply</h2>
            <ul className={styles.apply__list}>
              {CRITERIA.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <h2 className={styles.apply__heading}>How selection works</h2>
            <ol className={styles.apply__stages}>
              {STAGES.map((s) => (
                <li key={s.title}>
                  <h3 className={styles.apply__stageTitle}>{s.title}</h3>
                  <span className={styles.apply__stageTime}>{s.time}</span>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className={styles.apply__aside}>
            <h2 className={styles.apply__asideHeading}>Key dates</h2>
            <dl className={styles.apply__dates}>
              <dt>Applications close</dt><dd>{displayValue(cohort.applicationDeadline)}</dd>
              <dt>Retreat</dt><dd>{displayValue(cohort.retreatDates)}</dd>
              <dt>Location</dt><dd>{displayValue(cohort.location)}</dd>
            </dl>

            <h2 className={styles.apply__asideHeading}>What the fellowship covers</h2>
            <ul className={styles.apply__list}>
              {COVERS.map((c) => <li key={c}>{c}</li>)}
            </ul>

            {live ? (
              <Link className="btn btn--ochre" href="/apply/form">Start your application <span className="arrow">→</span></Link>
            ) : (
              <p className={styles.apply__closed}>{cta.label}. Questions? <Link href="/faq">Read the FAQ</Link>.</p>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
