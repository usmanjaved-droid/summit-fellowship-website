import Link from 'next/link';
import { BEFORE_YOU_START } from '@/lib/application/questions';
import { displayValue, getApplicationStatus, getCurrentCohort, isApplicationLive } from '@/lib/site';
import PageHero from '../components/PageHero';
import { ArrowLink, Button, Prose, Section } from '../components/fop';
import styles from './apply.module.css';

export const metadata = {
  title: 'Apply — Friends of Pakistan Fellowship',
  description: 'Who should apply to the Friends of Pakistan Fellowship, what it covers, and how selection works.',
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
  { title: 'A 45-minute conversation', time: 'About 2 weeks', desc: 'Shortlisted founders talk with the Friends of Pakistan Fellowship team, starting from your answers.' },
  { title: 'Final selection', time: 'About 1 week', desc: 'Twelve organisations are selected, plus three to four alternates.' },
];

export default function ApplyPage() {
  const cohort = getCurrentCohort();
  const live = isApplicationLive(cohort);

  return (
    <>
      <PageHero
        crumb="Apply"
        title={live ? <>Apply for the {cohort.year} <em>cohort.</em></> : <>Applications open <em>soon.</em></>}
        subtitle={`${live ? 'A' : `The ${cohort.year} cohort: a`} fully funded, seven-day fellowship for Pakistani founders whose solutions are ready to reach millions.`}
      />

      <Section tone="offwhite">
        <div className={styles.grid}>
          <div className={styles.main}>
            <Prose>
              <h2>Who should apply</h2>
              <ul>
                {CRITERIA.map((c) => <li key={c}>{c}</li>)}
              </ul>

              <h2>How selection works</h2>
              <ol className={styles.stages}>
                {STAGES.map((s) => (
                  <li key={s.title}>
                    <h3 className="t-heading-5">{s.title}</h3>
                    <span className={`t-eyebrow ${styles.stageTime}`}>{s.time}</span>
                    <p>{s.desc}</p>
                  </li>
                ))}
              </ol>
            </Prose>

            {live && (
              <div className={styles.before}>
                <h2 className={`t-heading-4 ${styles.beforeHeading}`}>Before you start</h2>
                <Prose>
                  <p>About 25 minutes of typing once you have gathered your numbers. Your answers save automatically in this browser. Have these ready:</p>
                  <ul>
                    {BEFORE_YOU_START.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <p>One answer — your path to a million users — is longer than the rest. Plan five to eight minutes for it.</p>
                </Prose>
                <div className={styles.pdf}>
                  <ArrowLink href="/application/friends-of-pakistan-fellowship-application.pdf" download>
                    Download the application (PDF)
                  </ArrowLink>
                </div>
              </div>
            )}
          </div>

          <aside className={styles.aside}>
            <h2 className={`t-heading-4 ${styles.asideHeading}`}>Key dates</h2>
            <dl className={styles.dates}>
              <dt className="t-eyebrow">Applications close</dt><dd>{displayValue(cohort.applicationDeadline)}</dd>
              <dt className="t-eyebrow">Retreat</dt><dd>{displayValue(cohort.retreatDates)}</dd>
              <dt className="t-eyebrow">Location</dt><dd>{displayValue(cohort.location)}</dd>
            </dl>

            <h2 className={`t-heading-4 ${styles.asideHeading}`}>What the fellowship covers</h2>
            <Prose size="sm">
              <ul>
                {COVERS.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </Prose>

            {live ? (
              <Button href="/apply/form" size="lg" icon block className={styles.start}>Start your application</Button>
            ) : (
              <p className={`t-body-sm ${styles.closed}`}>{getApplicationStatus(cohort)} Questions? <Link href="/faq">Read the FAQ</Link>.</p>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
