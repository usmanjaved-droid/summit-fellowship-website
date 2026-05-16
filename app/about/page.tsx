import Link from 'next/link';

export const metadata = {
  title: 'About — Summit Fellowship',
  description:
    "The Skardu Scale-Up Fellowship is a 7-day intensive retreat for Pakistan's most promising social enterprises.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="About Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </div>
          <h1 className="page-hero__title">
            A 7-day expedition to{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--ochre)' }}>redesign for scale.</em>
          </h1>
          <p className="page-hero__subtitle">
            Pakistan has dozens of promising social enterprises. The Summit Fellowship exists to
            graduate them from project-driven survival mode into scale-ready impact machines.
          </p>
          <div className="page-hero__meta">
            <div className="page-hero__meta-item"><span className="label">Dates</span><span className="value">07 — 14 June 2026</span></div>
            <div className="page-hero__meta-item"><span className="label">Venue</span><span className="value">Khoj Resort, Skardu</span></div>
          </div>
        </div>
      </section>

      <section className="about-philosophy">
        <div className="about-philosophy__inner">
          <blockquote className="about-philosophy__pull">
            Transform organizations from project-driven survival mode to scale-ready impact
            machines through intensive design work, peer learning, and strategic preparation for
            funding conversations.
          </blockquote>
          <div className="about-philosophy__attr">The Core Philosophy</div>
          <div style={{ marginTop: 48, maxWidth: '64ch', fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
            <p>
              Pakistan is home to dozens of promising social enterprises, but few achieve true
              national scale. Most remain trapped in <strong>&ldquo;project-driven survival
              mode&rdquo;</strong> — securing incremental grants and reaching thousands when their
              models possess the potential to reach millions. The barrier is rarely a lack of
              commitment or competence; it is a lack of a definitive scale strategy.
            </p>
            <p style={{ marginTop: 20 }}>
              Over seven days, this curated cohort steps away from daily operations to answer the
              defining strategic questions of scale — who is your ultimate <em>doer</em> at scale,
              and who is your ultimate <em>payer</em>? By Day 6, every founder leaves with the
              answers in hand, and a one-pager that&rsquo;s ready for the funder conversations that
              come next.
            </p>
          </div>
        </div>
      </section>

      <section className="numbers">
        <div className="container">
          <div className="numbers__grid">
            {[
              ['11', 'Fellows', 'Hand-picked Pakistani founders across health, education, livelihoods, and beyond.'],
              ['7', 'Days', 'Residential intensive at the foot of the Karakoram, away from daily operations.'],
              ['9', 'Faculty', "Global frameworks and Pakistani operators who've already scaled."],
            ].map(([n, l, d]) => (
              <div className="numbers__cell" key={l}>
                <div className="num">{n}</div>
                <div className="label">{l}</div>
                <div className="desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="container pillars__inner">
          <div className="pillars__copy">
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Methodology</span></div>
            <h2>How the week<br /><em>actually works.</em></h2>
            <p>The arc balances rigorous framework instruction with intimate 1-on-1 clinics, peer learning, and the kind of unstructured time that only happens when you take eleven founders to a valley with patchy signal.</p>
            <p>It is intentionally residential. The most consequential conversations happen on walks between sessions, over dinner at a local&rsquo;s home, and in the late-night fireside chats — not in the workshop room.</p>
          </div>
          <div className="pillars__list">
            {[
              ['01', '1-on-1 capacity clinics', 'Structured 45-minute rotations with Pakistani faculty who have already navigated the exact scale, funding, and operational walls each fellow now faces.'],
              ['02', 'Peer learning', "Lightning talks, feedback pairs, and demo-day-style rehearsals. Eleven founders, eleven mirrors. By Day 3, the cohort knows each other's models cold."],
              ['03', 'Cultural immersion', 'Dinner at a local home, sightseeing in the Shigar valley, a cultural night with regional musicians. The week is shaped by where it happens.'],
            ].map(([n, h, p]) => (
              <div className="pillars__item" key={n}>
                <div className="num">{n}</div>
                <div><h4>{h}</h4><p>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
