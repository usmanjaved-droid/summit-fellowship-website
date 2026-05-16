import Link from 'next/link';
import Countdown from './components/Countdown';

const ARC_DAYS = [
  { num: 'Day 01', date: 'Mon · Jun 08', title: ['Mulago', 'Basics'], desc: 'Mission, Big Idea, Theory, Model, Behaviors, Doer & Payer at Scale.' },
  { num: 'Day 02', date: 'Tue · Jun 09', title: ['Scale', 'Strategy'], desc: 'The Scale Screen framework + impact evidence + lightning talks at Shigar Fort.' },
  { num: 'Day 03', date: 'Wed · Jun 10', title: ['1-on-1', 'Clinics'], desc: "Outdoor capacity sessions with Pakistani faculty + a dinner at a local's home." },
  { num: 'Day 04', date: 'Thu · Jun 11', title: ['Iterative', 'Organization'], desc: 'Theory, methods, data flows, and culture. Plus a fireside chat with Dr. Asyia.' },
  { num: 'Day 05', date: 'Fri · Jun 12', title: ['Comms +', 'Pitching'], desc: 'Clear narrative, 10-min pitching, CEO spotlights, and cultural night with live music.' },
  { num: 'Day 06', date: 'Sat · Jun 13', title: ['Demo Day', '+ Closing'], desc: 'Participant presentations, funder Q&A, and closing celebration dinner.' },
  { num: 'Day 07', date: 'Sun · Jun 14', title: ['Karakoram', 'Departure'], desc: 'Staggered checkouts. Optional excursion into the high mountains.' },
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
              <span>Vol. 01 — Skardu, Pakistan — 2026</span>
            </div>
            <h1 className="hero__title">
              <span className="stack">Designed</span>
              <span className="stack">
                for <em>scale.</em>
              </span>
            </h1>
            <p className="hero__sub">
              A seven-day intensive retreat in the Karakoram for eleven Pakistani founders building solutions that could reach millions.
            </p>
            <div className="hero__cta-row">
              <Link className="btn btn--ochre" href="/about">
                Read the Brief <span className="arrow">→</span>
              </Link>
              <Link className="btn btn--ghost-light" href="/cohort">
                Meet the Cohort
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__meta-strip">
          <div className="hero__meta-strip-inner">
            <div className="hero__meta-item">
              <span className="label">Dates</span>
              <div className="value">07 — 14 June 2026</div>
              <div className="sub">Day 0 arrivals to Day 7 departures</div>
            </div>
            <div className="hero__meta-item">
              <span className="label">Venue</span>
              <div className="value">Khoj Resort, Skardu</div>
              <div className="sub">Gilgit-Baltistan, Pakistan · 2,228 m</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <Countdown />

      {/* ============ ARC OF THE WEEK ============ */}
      <section className="arc">
        <div className="container arc__inner">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>
                Seven Days
              </div>
              <h2 className="section-heading__title">The arc of the week.</h2>
            </div>
            <div className="section-heading__meta">Sun → Sun · 07 — 14 June</div>
          </div>

          <div className="arc-grid">
            {ARC_DAYS.map((d) => (
              <div key={d.num} className="arc-day">
                <div className="arc-day__num">{d.num}</div>
                <div className="arc-day__date">{d.date}</div>
                <div className="arc-day__title">
                  {d.title[0]}
                  <br />
                  {d.title[1]}
                </div>
                <p className="arc-day__desc">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="arc__cta">
            <Link href="/itinerary" className="btn btn--ochre">
              Explore the Full Itinerary <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ THE PEOPLE ============ */}
      <section className="cohort-strip">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 48,
              alignItems: 'start',
            }}
          >
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>
                Eleven founders across health, education, and livelihoods.
              </h2>
              <Link href="/cohort" className="btn btn--ghost">
                Meet the Cohort <span className="arrow">→</span>
              </Link>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>
                Faculty and organizers from Mulago, Acumen, Sehat Kahani, and beyond.
              </h2>
              <Link href="/faculty" className="btn btn--ghost">
                All Faculty &amp; Organizers <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VENUE ============ */}
      <section className="venue">
        <div className="venue__split">
          <div className="venue__image" role="img" aria-label="Mountains around Skardu, Gilgit-Baltistan" />
          <div className="venue__copy">
            <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>
              The Venue
            </div>
            <h2>
              Khoj Resort.
              <br />
              <em>Where the work happens.</em>
            </h2>
            <p>
              Tucked into the Shigar valley with the Karakoram rising on every side, Khoj is a deliberate retreat from city noise. Days alternate between studio sessions, outdoor 1-on-1 clinics, and quiet walks along the river.
            </p>
            <div className="venue__cta-row">
              <Link href="/venue" className="btn btn--ochre">
                Explore the Venue <span className="arrow">→</span>
              </Link>
              <Link href="/travel" className="btn btn--ghost-light">
                Travel &amp; Logistics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
