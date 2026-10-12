import Image from 'next/image';
import Link from 'next/link';
import DeadlineBand from './components/DeadlineBand';
import ExponentialChart from './components/ExponentialChart';
import { FACULTY } from './faculty/people';
import { getLatestCohort } from '@/lib/cohorts';
import { getFellowCards } from '@/lib/fellows';
import { displayValue, getApplyCta, getDeadlineText, getSiteSettings } from '@/lib/site';
import styles from './home.module.css';

export const metadata = {
  title: 'Summit Fellowship — Designed for Scale',
  description:
    "Curating Pakistan's finest impact organisations and matching them with strategy, mentoring, and capital to scale.",
};

const OFFER = [
  { title: 'Seven days, fully present', desc: 'An immersive residential retreat in Northern Pakistan. No email, no calls during sessions — just the work.' },
  { title: 'The Mulago scale framework', desc: 'Mission, Big Idea, doer and payer at scale, and the tests every scalable solution has to pass.' },
  { title: 'Mentoring from people who have scaled', desc: 'Venture diagnostics and strategy clinics with Mulago Foundation and Pakistani faculty.' },
  { title: 'Demo Day', desc: 'Present your scale blueprint to funders actively investing in Pakistan.' },
];

const STEPS = [
  { num: '01', title: 'Apply', desc: 'A focused written application: numbers, names, dates — about 25 minutes once you have gathered them.' },
  { num: '02', title: 'Conversation', desc: 'Shortlisted founders have one 45-minute conversation with the Mulago and Taleemabad team.' },
  { num: '03', title: 'Selection', desc: 'Twelve organisations are selected, plus a small number of alternates.' },
  { num: '04', title: 'The retreat', desc: 'Seven days redesigning your model for scale, ending with Demo Day.' },
  { num: '05', title: 'After', desc: 'Ongoing mentorship and a peer network of Pakistan’s most ambitious founders.' },
];

export default function HomePage() {
  const cohort = getSiteSettings().currentCohort;
  const cta = getApplyCta(cohort);
  const deadline = getDeadlineText(cohort);
  const latest = getLatestCohort();
  const fellows = getFellowCards(latest.year);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" data-screen-label="Home Hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="topo-bg" aria-hidden="true" />
        <div className="hero__body">
          <div className="hero__lockup">
            <div className="hero__eyebrow">
              <span className="line" />
              <span>For Pakistani social innovators designing for scale</span>
            </div>
            <h1 className="hero__title">
              <span className="stack">Summit</span>
              <span className="stack">Fellowship</span>
            </h1>
            <p className="hero__sub">
              Curating Pakistan&apos;s finest impact companies and matching them with strategy, mentoring, and capital to scale.
            </p>
            <div className="hero__cta-row">
              <Link className="btn btn--ochre" href={cta.href}>
                {cta.label} <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero__meta-strip">
          <div className="hero__meta-strip-inner">
            {deadline && (
              <div className="hero__meta-item">
                <span className="label">Applications close</span>
                <div className="value">{deadline}</div>
              </div>
            )}
            <div className="hero__meta-item">
              <span className="label">Next cohort</span>
              <div className="value">{displayValue(cohort.retreatDates)}</div>
            </div>
            <div className="hero__meta-item">
              <span className="label">Location</span>
              <div className="value">{displayValue(cohort.location)}</div>
            </div>
          </div>
        </div>
      </section>

      <DeadlineBand />

      {/* ============ WHY ============ */}
      <section className="whatis section">
        <div className="topo-bg topo-bg--subtle" aria-hidden="true" />
        <div className="container">
          <div className="whatis-block whatis-block--split">
            <div className="whatis-block__kicker">
              <div className="eyebrow whatis__label">Why this fellowship</div>
              <h2 className="whatis-block__heading">Pakistan has extraordinary founders. Scale is the next frontier.</h2>
            </div>
            <div className="whatis-block__body">
              <p className="whatis__body">
                240 million people. A learning crisis. A hunger crisis. A mental health system that barely exists.
                A generation of founders has decided not to wait - and they are building real solutions, with real
                evidence, at real cost. But few reach national scale. Most stay caught in project-driven survival -
                securing grants, reaching thousands, when their models could reach millions.{' '}
                <strong className="whatis__emphasis">We are changing that.</strong>
              </p>
            </div>
          </div>
          <div className="whatis-block whatis-block--split">
            <div className="whatis-block__kicker">
              <div className="eyebrow whatis__label">The Fellowship</div>
              <h2 className="whatis-block__heading">Seven days to redesign for scale.</h2>
            </div>
            <div className="whatis-block__body">
              <p className="whatis__body">
                Each year, a small cohort of Pakistani founders spends seven days in Northern Pakistan working the
                Mulago design discipline alongside Pakistani faculty - Big Idea, doer and payer at scale, the Four
                Enoughs, the Scale Screen. Fellows leave with a sharper model, an honest evidence plan, and the start
                of a narrative funders trust.
              </p>
            </div>
          </div>
          <div className="whatis-block whatis-scale">
            <div className="whatis-scale__copy">
              <div className="eyebrow whatis__label">What we mean by scale</div>
              <p className="whatis__pull">A big idea is one that can scale. Scale means exponential impact.</p>
              <div className="whatis__stack">
                <span>From one village to a country.</span>
                <span>From thousands to millions.</span>
                <span>From a working pilot to a model the country runs on.</span>
              </div>
            </div>
            <div className="whatis-scale__chart">
              <ExponentialChart />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">What you get</div>
          <h2 className={styles.home__heading}>A week that changes how you build.</h2>
          <div className={styles.offer__grid}>
            {OFFER.map((o) => (
              <div key={o.title} className={styles.offer__tile}>
                <h3 className={styles.offer__title}>{o.title}</h3>
                <p className={styles.offer__desc}>{o.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.offer__note}>Fully funded: accommodation, meals and domestic travel are covered.</p>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section section--paper-warm">
        <div className="container">
          <div className="eyebrow">How it works</div>
          <h2 className={styles.home__heading}>From application to Demo Day.</h2>
          <ol className={styles.steps__list}>
            {STEPS.map((s) => (
              <li key={s.num} className={styles.steps__item}>
                <span className={styles.steps__num}>{s.num}</span>
                <h3 className={styles.steps__title}>{s.title}</h3>
                <p className={styles.steps__desc}>{s.desc}</p>
              </li>
            ))}
          </ol>
          <Link href="/apply" className="btn btn--ghost">Eligibility and timeline <span className="arrow">→</span></Link>
        </div>
      </section>

      {/* ============ PAST FELLOWS ============ */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">{`Meet the ${latest.year} fellows`}</div>
          <h2 className={styles.home__heading}>{fellows.length} founders who have done the work.</h2>
          <ul className={styles.people__grid}>
            {fellows.map((f) => (
              <li key={f.slug}>
                <Link href={`/cohorts/${latest.year}/fellows/${f.slug}`} className={styles.people__item}>
                  <span className={styles.people__avatar}>
                    {f.photo_url ? <Image src={f.photo_url} alt="" width={64} height={64} /> : f.init}
                  </span>
                  <span className={styles.people__name}>{f.name}</span>
                  <span className={styles.people__org}>{f.org}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/cohorts/${latest.year}`} className="btn btn--ghost">The {latest.year} cohort <span className="arrow">→</span></Link>
        </div>
      </section>

      {/* ============ FACULTY ============ */}
      <section className="section section--paper-warm">
        <div className="container">
          <div className="eyebrow">Faculty</div>
          <h2 className={styles.home__heading}>Taught by people who have scaled.</h2>
          <ul className={styles.people__grid}>
            {FACULTY.map((p) => (
              <li key={p.num} className={styles.people__item}>
                <span className={styles.people__avatar}>
                  {p.photo_url ? <Image src={p.photo_url} alt="" width={64} height={64} /> : p.init}
                </span>
                <span className={styles.people__name}>{p.name}</span>
                <span className={styles.people__org}>{p.role}</span>
              </li>
            ))}
          </ul>
          <Link href="/faculty" className="btn btn--ghost">Faculty &amp; team <span className="arrow">→</span></Link>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className={`section section--alpine ${styles.closing}`}>
        <div className="container container--narrow">
          <h2 className={styles.closing__title}>Ready to design for scale?</h2>
          <div className={styles.closing__actions}>
            <Link className="btn btn--ochre" href={cta.href}>{cta.label} <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost-light" href="/faq">Read the FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
