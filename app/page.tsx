import Link from 'next/link';
import EventDate from './components/EventDate';
import ExponentialChart from './components/ExponentialChart';

export const metadata = {
  title: 'Summit Fellowship 2026 - Design for Scale',
  description: 'A seven-day intensive for Pakistan\'s most promising social enterprises. Curating Pakistan\'s finest impact companies and matching them with strategy, mentoring, and capital to scale.',
};

interface Action {
  num: string;
  title: string;
  desc: string;
  href: string;
}

const ACTIONS: Action[] = [
  {
    num: '01',
    title: 'Submit your pre work',
    desc: 'Complete the pre-work assignments to prepare intellectually for the fellowship. Due before 31 May 2026.',
    href: 'https://skardu-taleemabad.vercel.app/skardu-prework.html',
  },
  {
    num: '02',
    title: 'Review the curriculum & itinerary',
    desc: "Understand the week's rhythm, the Mulago design discipline you'll be working through, and what each day requires.",
    href: '/itinerary',
  },
  {
    num: '03',
    title: 'Meet the people',
    desc: 'Get to know the fellows and the faculty and advisors and the organizing team who would be there with us during the fellowship.',
    href: '/fellows',
  },
  {
    num: '04',
    title: 'Explore the venue',
    desc: 'Learn about Khoj Resort, review the packing essentials list, and understand the logistics of arrival.',
    href: '/venue',
  },
  {
    num: '05',
    title: 'Explore Skardu',
    desc: "Get to know the region - the history, geography, culture, food, and activities around where you'll be.",
    href: '/explore-skardu',
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
              <div className="value">07 - 14 June 2026</div>
            </div>
            <div className="hero__meta-item">
              <span className="label">Venue</span>
              <div className="value">Khoj Resort, Skardu</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EVENT DATE ============ */}
      <EventDate />

      {/* ============ WHAT THIS IS ============ */}
      <section className="whatis section">
        <div className="topo-bg topo-bg--subtle" aria-hidden="true" />
        <div className="container">
          {/* Block 1 - Why this fellowship */}
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
                A generation of founders has decided not to wait - and they are building real solutions, with real
                evidence, at real cost. But few reach national scale. Most stay caught in project-driven survival -
                securing grants, reaching thousands, when their models could reach millions.{' '}
                <strong className="whatis__emphasis">We are changing that.</strong>
              </p>
            </div>
          </div>

          {/* Block 2 - The Fellowship */}
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
                design discipline alongside Pakistani faculty - Big Idea, doer and payer at scale, the Four Enoughs, the
                Scale Screen. Fellows leave with a sharper model, an honest evidence plan, and the start of a narrative
                funders trust.
              </p>
            </div>
          </div>

          {/* Block 3 - What we mean by scale (two-column with chart) */}
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
            </div>
            <div className="whatis-scale__chart">
              <ExponentialChart />
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
              <strong>Fellows</strong> - flights, accommodation, meals, ground transport, and airport transfers are all
              covered.
            </p>
            <p>
              <strong>Faculty</strong> - accommodation, meals, ground transport, and airport transfers covered; flights
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
        </div>
      </section>
    </>
  );
}
