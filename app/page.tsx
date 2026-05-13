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

const COHORT = [
  { initials: 'RK', name: ['Rubeena', 'Kidwai'], org: 'Taskeen Health Initiative', sector: 'Mental Health' },
  { initials: 'AD', name: ['Azima', 'Dhanjee'], org: 'ConnectHear', sector: 'Disability' },
  { initials: 'HB', name: ['Habiba', 'Banu'], org: 'Spiro', sector: 'Health' },
  { initials: 'SH', name: ['Saad', 'Hussain'], org: 'Awaaz-e-Sehat', sector: 'Health · AI' },
  { initials: 'LR', name: ['Lala Rukh', 'Fazal-Ur-Rahman'], org: 'Science Fuse', sector: 'STEM Education' },
  { initials: 'KJ', name: ['Khushbakht', 'Shah Jillani'], org: 'Mehfooz AI', sector: 'Legal · AI' },
  { initials: 'MS', name: ['Maira', 'Siddiqui'], org: 'Chiragh Tech', sector: 'EdTech' },
  { initials: 'AQ', name: ['Adnan', 'Qureshi'], org: 'Teach the World', sector: 'OOSC' },
  { initials: 'MW', name: ['Muhammad', 'Waqas'], org: 'WonderTree', sector: 'Special Ed' },
  { initials: 'AS', name: ['Ali', 'Siddiq'], org: 'Amal Academy', sector: 'Livelihoods' },
  { initials: 'OS', name: ['Osama', 'Shahid'], org: 'Soby Trading Co', sector: 'Agriculture' },
];

const FACULTY = [
  { initials: 'KS', name: 'Kevin Starr', role: 'CEO, Mulago Foundation', bio: 'Architect of the Scale Screen and Doer & Payer frameworks. Decades of helping founders reconstruct their models for national impact.' },
  { initials: 'AR', name: 'Dr. Ahson Rabbani', role: 'CEO, ChildLife Foundation', bio: 'Scaled emergency pediatric care from a few hospitals to a nationwide footprint. A real-world blueprint for life-saving operations.' },
  { initials: 'SK', name: 'Dr. Sara Saeed Khurram', role: 'Co-Founder & CEO, Sehat Kahani', bio: 'A Mulago Rainer Arnhold Fellow who scaled an all-female telemedicine network to millions of consultations across Pakistan.' },
  { initials: 'SF', name: 'Sarah Farooq', role: 'Director, Acumen Fund', bio: 'Patient-capital insider with operational background as COO at Taleemabad. Deep insight into how funders evaluate investability.' },
  { initials: 'NS', name: 'Nadir Shams', role: 'Founder, Friends of Pakistan', bio: 'Formerly Managing Director at the Skoll Foundation. Guides fellows on what global and diaspora capital requires for systems change.' },
  { initials: 'HY', name: 'Haroon Yasin', role: 'Founder & CEO, Taleemabad', bio: "Co-host. Evolved Taleemabad from an evening school in the slums to Pakistan's largest ed-tech organization." },
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
            <div className="hero__meta-item">
              <span className="label">Cohort</span>
              <div className="value">11 founders</div>
              <div className="sub">Across health, education, livelihoods</div>
            </div>
            <div className="hero__meta-item">
              <span className="label">Co-hosts</span>
              <div className="value">
                Taleemabad <span style={{ opacity: 0.5 }}>×</span> Mulago
              </div>
              <div className="sub">Patient capital meets ed-tech at scale</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <Countdown />

      {/* ============ INTRO ============ */}
      <section className="intro">
        <div className="topo-bg" aria-hidden="true" />
        <div className="container intro__inner">
          <div className="intro__label">
            <div className="eyebrow-line">
              <span className="eyebrow-line__line" />
              <span className="eyebrow">01 — The Mission</span>
            </div>
            <h2>
              From project
              <br />
              to <em>scale-ready</em>
              <br />
              impact machine.
            </h2>
          </div>
          <div className="intro__body">
            <p className="lead">
              Pakistan is home to dozens of promising social enterprises, but few achieve true national scale. Most remain trapped in project-driven survival mode — securing incremental grants and reaching thousands when their models possess the potential to reach millions.
            </p>
            <p>
              The barrier is rarely a lack of commitment or competence; it is a lack of a definitive scale strategy. Over seven days at the edge of the Karakoram, this curated cohort of founders will step away from daily operations to answer the defining strategic questions of scale.
            </p>
            <p className="rhetoric">
              <em>Who is your ultimate doer at scale? Who is your ultimate payer?</em>
            </p>
            <Link href="/about" className="btn btn--ghost" style={{ marginTop: 32 }}>
              The Full Brief <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ ARC OF THE WEEK ============ */}
      <section className="arc">
        <div className="topo-bg" aria-hidden="true" />
        <div className="container arc__inner">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>
                02 — Seven Days
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

      {/* ============ COHORT STRIP ============ */}
      <section className="cohort-strip">
        <div className="container">
          <div className="cohort-strip__head">
            <h2>
              Eleven founders.
              <br />
              <em>One ascent.</em>
            </h2>
            <p>
              The cohort spans mental health to special education, AI-powered legal aid to gamified curriculum. Each leader has already proven their model — now we redesign it for millions.
            </p>
          </div>

          <div className="cohort-marquee">
            {COHORT.map((c) => (
              <div key={c.initials} className="cohort-cell">
                <div className="cohort-cell__avatar">{c.initials}</div>
                <div className="cohort-cell__name">
                  {c.name[0]}
                  <br />
                  {c.name[1]}
                </div>
                <div className="cohort-cell__org">{c.org}</div>
                <div className="cohort-cell__sector">{c.sector}</div>
              </div>
            ))}
          </div>

          <div className="cohort-strip__cta">
            <Link href="/cohort" className="btn btn--ghost">
              Meet the Cohort <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FACULTY ============ */}
      <section className="faculty">
        <div className="container">
          <div className="faculty__head">
            <h2>
              An ecosystem of
              <br />
              <em>support.</em>
            </h2>
            <Link href="/faculty" className="btn btn--ghost">
              All Faculty &amp; Organizers <span className="arrow">→</span>
            </Link>
          </div>

          <div className="faculty-grid">
            {FACULTY.map((f) => (
              <article key={f.initials} className="faculty-card">
                <div className="faculty-card__head">
                  <div className="faculty-card__avatar">{f.initials}</div>
                  <div>
                    <div className="faculty-card__name">{f.name}</div>
                    <div className="faculty-card__role">{f.role}</div>
                  </div>
                </div>
                <p className="faculty-card__bio">{f.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VENUE ============ */}
      <section className="venue">
        <div className="venue__split">
          <div className="venue__image" role="img" aria-label="Mountains around Skardu, Gilgit-Baltistan" />
          <div className="venue__copy">
            <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>
              04 — The Venue
            </div>
            <h2>
              Khoj Resort.
              <br />
              <em>Where the work happens.</em>
            </h2>
            <p>
              Tucked into the Shigar valley with the Karakoram rising on every side, Khoj is a deliberate retreat from city noise. Days alternate between studio sessions, outdoor 1-on-1 clinics, and quiet walks along the river.
            </p>
            <div className="venue__coords">
              <div className="venue__coords-item">
                <span className="label">Coordinates</span>
                <span className="value">35.30°N · 75.62°E</span>
              </div>
              <div className="venue__coords-item">
                <span className="label">Elevation</span>
                <span className="value">~2,228 m</span>
              </div>
              <div className="venue__coords-item">
                <span className="label">Climate</span>
                <span className="value">12 – 24°C in June</span>
              </div>
            </div>
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

      {/* ============ HOSTS ============ */}
      <section className="hosts">
        <div className="container hosts__inner">
          <div className="hosts__label">Co-hosted by</div>
          <div className="hosts__logos">
            <div className="host-mark">
              Taleemabad
              <span className="org-sub">Pakistan&apos;s largest ed-tech</span>
              <span className="role">Co-host · Organizer</span>
            </div>
            <div className="host-mark">
              Mulago Foundation
              <span className="org-sub">Venture-style impact funding</span>
              <span className="role">Co-host · Framework</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="close-cta">
        <div className="topo-bg" aria-hidden="true" />
        <div className="container close-cta__inner">
          <h2>
            Good enough.
            <br />
            Big enough.
            <br />
            <em>Simple enough.</em>
            <br />
            Cheap enough.
          </h2>
          <p>The four enoughs of scale. By Day 6, every founder leaves with a model that earns its place on all four.</p>
          <Link href="/curriculum" className="btn">
            Read the Curriculum <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
