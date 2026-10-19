import Image from 'next/image';
import Link from 'next/link';
import ClosingBand from './components/ClosingBand';
import ExponentialChart from './components/ExponentialChart';
import { ArrowLink, Button, Section, SquareCta, Timeline } from './components/fop';
import { FACULTY, ORGANIZERS } from './faculty/people';
import { getLatestCohort } from '@/lib/cohorts';
import { getFellowCards } from '@/lib/fellows';
import { getApplicationStatus, getApplyCta, getCurrentCohort, isApplicationLive } from '@/lib/site';
import styles from './home.module.css';

export const metadata = {
  title: 'Friends of Pakistan Fellowship — Designed for Scale',
  description:
    "Curating Pakistan's finest impact organisations and matching them with strategy, mentoring, and capital to scale.",
};

const OFFER = [
  { title: 'Seven days, fully present', desc: 'An immersive residential retreat in Northern Pakistan. No email, no calls during sessions — just the work.' },
  { title: 'The Mulago scale framework', desc: 'Mission, Big Idea, doer and payer at scale, and the tests every scalable solution has to pass.' },
  { title: 'Mentoring from people who have scaled', desc: 'Venture diagnostics and strategy clinics with Mulago Foundation and Pakistani faculty.' },
  { title: 'Demo Day', desc: 'Present your scale blueprint to funders actively investing in Pakistan.' },
];

// Homepage faculty row: the faculty plus three organisers the owner asked to feature.
const HOME_PEOPLE = [
  ...FACULTY,
  ...ORGANIZERS.filter((p) => ['O.01', 'O.02', 'O.04'].includes(p.num)),
];

const STEPS = [
  { num: '01', title: 'Apply', desc: 'A focused written application: numbers, names, dates — about 25 minutes once you have gathered them.' },
  { num: '02', title: 'Conversation', desc: 'Shortlisted founders have one 45-minute conversation with the Friends of Pakistan Fellowship team.' },
  { num: '03', title: 'Selection', desc: 'Twelve organisations are selected, plus a small number of alternates.' },
  { num: '04', title: 'The retreat', desc: 'Seven days redesigning your model for scale, ending with Demo Day.' },
  { num: '05', title: 'After', desc: 'Ongoing mentorship and a peer network of Pakistan’s most ambitious founders.' },
];

export default function HomePage() {
  const cohort = getCurrentCohort();
  const cta = getApplyCta(cohort);
  // Under the hero CTA: the deadline while applications are live, otherwise that they open soon.
  const status = getApplicationStatus(cohort);
  const latest = getLatestCohort();
  const fellows = getFellowCards(latest.year);

  return (
    <>
      {/* ============ HERO (green) ============ */}
      <section className={styles.hero} data-theme="dark" data-screen-label="Home Hero">
        <div className={styles.hero__inner}>
          <div className={styles.hero__copy}>
            <p className={`t-eyebrow ${styles.hero__eyebrow}`}>For Pakistani social innovators designing for scale</p>
            <h1 className={`t-heading-xl ${styles.hero__title}`}>
              Friends of Pakistan <span>Fellowship</span>
            </h1>
            <p className={`t-body-light ${styles.hero__lead}`}>
              Curating Pakistan&apos;s finest impact companies and matching them with strategy, mentoring, and capital to scale.
            </p>
            <Button href={cta.href} size="xl" icon>
              {cta.label}
            </Button>
            <p className={styles.hero__deadline}>
              {status}
              {!isApplicationLive(cohort) && (
                <>
                  {' '}<Link href="/apply#notify" className={styles.hero__notify}>Get notified</Link>
                </>
              )}
            </p>
          </div>
          <div className={styles.hero__media}>
            <Image
              src="/images/skardu/Hero Home.jpg"
              alt="Mountains above the Skardu valley"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* ============ WHY (off-white) ============ */}
      <Section tone="offwhite">
        <div className={styles.split}>
          <div className={styles.split__kicker}>
            <p className={`t-eyebrow ${styles.eyebrow}`}>Why this fellowship</p>
            <h2 className={`t-heading-2 ${styles.heading}`}>Pakistan has extraordinary founders. Scale is the next frontier.</h2>
          </div>
          <div className={styles.split__body}>
            <p className={`t-body ${styles.why__body}`}>
              240 million people. A learning crisis. A hunger crisis. A mental health system that barely exists.
              A generation of founders has decided not to wait — and they are building real solutions, with real
              evidence, at real cost. But few reach national scale. Most stay caught in project-driven survival —
              securing grants, reaching thousands, when their models could reach millions.{' '}
              <strong className={styles.why__emphasis}>We are changing that.</strong>
            </p>
          </div>
        </div>

        <div className={styles.scale}>
          <div className={styles.scale__copy}>
            <p className={`t-eyebrow ${styles.eyebrow}`}>What we mean by scale</p>
            <p className={styles.scale__pull}>A big idea is one that can scale. Scale means exponential impact.</p>
            <div className={styles.scale__stack}>
              <span className="t-body-light">From one village to a country.</span>
              <span className="t-body-light">From thousands to millions.</span>
              <span className="t-body-light">From a working pilot to a model the country runs on.</span>
            </div>
          </div>
          <div className={styles.scale__chart}>
            <ExponentialChart />
          </div>
        </div>

        <div className={`${styles.why} ${styles.fellowship}`}>
          <div className={`${styles.why__block} ${styles['why__block--second']}`}>
            <p className={`t-eyebrow ${styles.eyebrow}`}>The Fellowship</p>
            <h2 className={`t-heading-2 ${styles.heading}`}>Seven days to redesign for scale.</h2>
            <p className={`t-body ${styles.why__body}`}>
              Each year, a small cohort of Pakistani founders spends seven days in Northern Pakistan rebuilding their
              model for scale. They leave with a sharper model, an honest evidence plan, and a story funders trust.
              Fellows join the <strong className={styles.why__emphasis}>Friends of Pakistan</strong> network of
              investors and philanthropists.
            </p>
            <p className={`t-body-sm ${styles.fellowship__about}`}>
              A Friends of Pakistan programme, with Mulago Foundation and Taleemabad.
            </p>
            <div className={styles.fellowship__link}>
              <ArrowLink href="https://www.friendsofpakistan.org/">About Friends of Pakistan</ArrowLink>
            </div>
          </div>
          <div className={styles.why__cta}>
            <SquareCta href={cta.href}>{cta.label}</SquareCta>
          </div>
        </div>
      </Section>

      {/* ============ WHAT YOU GET (white) ============ */}
      <Section tone="white">
        <p className={`t-eyebrow ${styles.eyebrow}`}>What you get</p>
        <h2 className={`t-heading-2 ${styles.heading}`}>A week that changes how you build.</h2>
        <div className={styles.offer__grid}>
          {OFFER.map((o) => (
            <div key={o.title} className={styles.offer__tile} data-reveal>
              <h3 className={`t-heading-3 ${styles.offer__title}`}>{o.title}</h3>
              <p className={`t-body ${styles.offer__desc}`}>{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ HOW IT WORKS (green) ============ */}
      <Section tone="green">
        <p className={`t-eyebrow ${styles.eyebrow}`}>How it works</p>
        <h2 className={`t-heading-2 ${styles.heading}`}>From application to Demo Day.</h2>
        <div className={styles.steps__rail} data-reveal="line">
          <Timeline stages={STEPS.map((s) => s.title)} current={-1} label="How it works" />
        </div>
        <ol className={styles.steps__list}>
          {STEPS.map((s) => (
            <li key={s.num} className={styles.steps__item} data-reveal>
              <span className={`t-eyebrow ${styles.steps__num}`}>{s.num}</span>
              <h3 className={`t-heading-5 ${styles.steps__title}`}>{s.title}</h3>
              <p className={`t-body-light ${styles.steps__desc}`}>{s.desc}</p>
            </li>
          ))}
        </ol>
        <ArrowLink href="/apply">Eligibility and timeline</ArrowLink>
      </Section>

      {/* ============ PAST FELLOWS (yellow) ============ */}
      <Section tone="yellow">
        <p className={`t-eyebrow ${styles.eyebrow}`}>{`Meet the ${latest.year} fellows`}</p>
        <h2 className={`t-heading-2 ${styles.heading}`}>{fellows.length} founders who have done the work.</h2>
        <ul className={styles.people__grid}>
          {fellows.map((f) => (
            <li key={f.slug} data-reveal>
              <div className={styles.people__item}>
                <span className={styles.people__avatar}>
                  {f.photo_url ? <Image src={f.photo_url} alt="" width={116} height={116} /> : f.init}
                </span>
                <span className={styles.people__name}>{f.name}</span>
                <span className={`t-body-sm ${styles.people__org}`}>{f.org}</span>
              </div>
            </li>
          ))}
        </ul>
        <ArrowLink href={`/cohorts/${latest.year}`}>The {latest.year} cohort</ArrowLink>
      </Section>

      {/* ============ FACULTY (white) ============ */}
      <Section tone="white">
        <p className={`t-eyebrow ${styles.eyebrow}`}>People</p>
        <h2 className={`t-heading-2 ${styles.heading}`}>Organised and taught by people who have scaled.</h2>
        <ul className={styles.faculty__grid}>
          {HOME_PEOPLE.map((p) => (
            <li key={p.num} className={styles.faculty__item} data-reveal>
              <span className={styles.faculty__photo}>
                {p.photo_url ? (
                  <Image src={p.photo_url} alt="" fill sizes="(max-width: 639px) 50vw, 240px" />
                ) : (
                  <span className={styles.faculty__fallback} aria-hidden="true">{p.init}</span>
                )}
              </span>
              <span className={styles.faculty__name}>{p.name}</span>
              <span className={`t-body-sm ${styles.faculty__role}`}>{p.role}</span>
            </li>
          ))}
        </ul>
        <ArrowLink href="/faculty">Faculty &amp; team</ArrowLink>
      </Section>

      {/* ============ CLOSING CTA (yellow) ============ */}
      <ClosingBand />
    </>
  );
}
