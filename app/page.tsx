import Link from 'next/link';
import Countdown from './components/Countdown';
import ExponentialChart from './components/ExponentialChart';

const PEOPLE_CARDS = [
  {
    eyebrow: 'The Fellows',
    title: 'Eleven founders',
    desc: 'Pakistani social enterprises across health, education, livelihoods, and beyond — each ready to redesign their model for scale.',
    href: '/fellows',
  },
  {
    eyebrow: 'The Faculty',
    title: 'Builders of scale',
    desc: "Kevin Starr and the Mulago team alongside Pakistani founders who've built at national scale — from Sehat Kahani to ChildLife to Taleemabad.",
    href: '/faculty',
  },
  {
    eyebrow: 'The Funders',
    title: 'Capital that backs scale',
    desc: 'Mulago, Acumen, and other patient-capital partners who fund the journey from working pilot to national reach.',
    href: '/funders',
  },
];

const ACTIONS = [
  {
    num: '01',
    title: 'Submit your one-pager',
    desc: 'A 1-page description of your organization, the problem you’re solving, and your current model. Due by 31 May 2026.',
    href: '/resources',
  },
  {
    num: '02',
    title: 'Review the schedule',
    desc: "Get familiar with the week's rhythm and what each day will require of you.",
    href: '/itinerary',
  },
  {
    num: '03',
    title: 'Pack for Skardu',
    desc: 'June is mild during the day, cold at night. The packing essentials list lives on the venue page.',
    href: '/venue',
  },
];

export default function HomePage() {
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
              <span className="stack">Fellowship 2026</span>
            </h1>
            <p className="hero__sub">
              Curating Pakistan&apos;s finest impact companies and matching them with strategy, mentoring, and capital to scale.
            </p>
            <div className="hero__cta-row">
              <Link className="btn btn--ochre" href="/fellows">
                Meet the Fellows <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__meta-strip">
          <div className="hero__meta-strip-inner">
            <div className="hero__meta-item">
              <span className="label">Dates</span>
              <div className="value">07 — 14 June 2026</div>
            </div>
            <div className="hero__meta-item">
              <span className="label">Venue</span>
              <div className="value">Khoj Resort, Skardu</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <Countdown />

      {/* ============ WHAT THIS IS ============ */}
      <section className="whatis section">
        <div className="topo-bg topo-bg--subtle" aria-hidden="true" />
        <div className="container">
          {/* Block 1 — Why this fellowship */}
          <div className="whatis-block whatis-block--split">
            <div className="whatis-block__kicker">
              <div className="eyebrow whatis__label">Why this fellowship</div>
              <h2 className="whatis-block__heading">
                Pakistan has extraordinary founders. Scale is the next frontier.
              </h2>
            </div>
            <div className="whatis-block__body">
              <p className="whatis__body">
                240 million people. A learning crisis. A hunger crisis. A mental health system that barely exists.
                A generation of founders has decided not to wait — and they are building real solutions, with real
                evidence, at real cost. But few reach national scale. Most stay caught in project-driven survival —
                securing grants, reaching thousands, when their models could reach millions.{' '}
                <strong className="whatis__emphasis">We are changing that.</strong>
              </p>
            </div>
          </div>

          {/* Block 2 — The Fellowship */}
          <div className="whatis-block whatis-block--split">
            <div className="whatis-block__kicker">
              <div className="eyebrow whatis__label">The Fellowship</div>
              <h2 className="whatis-block__heading">
                Seven days to redesign for scale.
              </h2>
            </div>
            <div className="whatis-block__body">
              <p className="whatis__body">
                Summit Fellowship is seven days at Khoj Resort, Skardu, where eleven Pakistani founders work the Mulago
                design discipline alongside Pakistani faculty — Big Idea, doer and payer at scale, the Four Enoughs, the
                Scale Screen. Fellows leave with a sharper model, an honest evidence plan, and the start of a narrative
                funders trust.
              </p>
            </div>
          </div>

          {/* Block 3 — What we mean by scale (two-column with chart) */}
          <div className="whatis-block whatis-scale">
            <div className="whatis-scale__copy">
              <div className="eyebrow whatis__label">What we mean by scale</div>
              <p className="whatis__pull">
                A big idea is one that can scale. Scale means exponential impact.
              </p>
              <div className="whatis__stack">
                <span>From one village to a country.</span>
                <span>From thousands to millions.</span>
                <span>From a working pilot to a model the country runs on.</span>
              </div>
              <Link className="btn btn--ochre whatis-scale__cta" href="/fellows">
                Meet the Fellows <span className="arrow">→</span>
              </Link>
            </div>
            <div className="whatis-scale__chart">
              <ExponentialChart />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEET THE PEOPLE ============ */}
      <section className="people section">
        <div className="container">
          <div className="people__head">
            <div className="eyebrow" style={{ marginBottom: 16 }}>Who&apos;s coming</div>
            <h2 className="people__title">Meet the people.</h2>
          </div>
          <div className="people-grid">
            {PEOPLE_CARDS.map((c) => (
              <Link key={c.eyebrow} href={c.href} className="people-card">
                <div className="people-card__top">
                  <div className="eyebrow people-card__eyebrow">{c.eyebrow}</div>
                  <h3 className="people-card__title">{c.title}</h3>
                  <p className="people-card__desc">{c.desc}</p>
                </div>
                <span className="people-card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VENUE (BRIEF) ============ */}
      <section className="venue">
        <div className="venue__split">
          <div className="venue__image" role="img" aria-label="Mountains around Skardu, Gilgit-Baltistan" />
          <div className="venue__copy">
            <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>The Venue</div>
            <h2>Khoj Resort, Skardu</h2>
            <p>
              Tucked into the Shigar valley with the Karakoram rising on every side. A deliberate retreat where the
              work happens.
            </p>
            <div className="venue__cta-row">
              <Link href="/venue" className="btn btn--ochre">
                Explore the venue <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BEFORE YOU ARRIVE ============ */}
      <section className="actions section">
        <div className="container container--narrow">
          <div className="actions__head">
            <div className="eyebrow" style={{ marginBottom: 16 }}>What to do</div>
            <h2 className="actions__title">Before you arrive.</h2>
          </div>

          <div className="covered-callout">
            <p>
              <strong>Fellows</strong> — flights, accommodation, meals, ground transport, and airport transfers are all
              covered.
            </p>
            <p>
              <strong>Faculty</strong> — accommodation, meals, ground transport, and airport transfers covered; flights
              coordinated separately.
            </p>
          </div>

          <ol className="actions__list">
            {ACTIONS.map((a) => (
              <li key={a.num} className="action-item">
                <Link href={a.href} className="action-item__link">
                  <span className="action-item__num">{a.num}</span>
                  <div className="action-item__body">
                    <h3 className="action-item__title">{a.title}</h3>
                    <p className="action-item__desc">{a.desc}</p>
                  </div>
                  <span className="action-item__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="actions__footer">
            <Link href="/resources" className="actions__footer-link">
              Full pre-arrival pack <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
