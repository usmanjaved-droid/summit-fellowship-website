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
            <div className="page-hero__meta-item"><span className="label">Edition</span><span className="value">Vol. 01 — 2026</span></div>
            <div className="page-hero__meta-item"><span className="label">Dates</span><span className="value">07 — 14 June</span></div>
            <div className="page-hero__meta-item"><span className="label">Format</span><span className="value">Residential intensive</span></div>
            <div className="page-hero__meta-item"><span className="label">Co-hosts</span><span className="value">Taleemabad × Mulago</span></div>
          </div>
        </div>
      </section>

      <section className="about-philosophy">
        <div className="topo-bg" aria-hidden="true" />
        <div className="about-philosophy__inner">
          <blockquote className="about-philosophy__pull">
            Transform organizations from project-driven survival mode to scale-ready impact
            machines through intensive design work, peer learning, and strategic preparation for
            funding conversations.
          </blockquote>
          <div className="about-philosophy__attr">The Core Philosophy</div>
        </div>
      </section>

      <section className="challenge">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container challenge__inner">
          <div className="challenge-grid">
            <div>
              <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>The challenge</div>
              <h2>The scale<br />question.</h2>
            </div>
            <div className="body">
              <p>
                Pakistan is home to dozens of promising social enterprises, but few achieve true
                national scale. Most remain trapped in{' '}
                <strong>&ldquo;project-driven survival mode&rdquo;</strong> — securing incremental
                grants and reaching thousands when their models possess the potential to reach
                millions.
              </p>
              <p>
                The barrier is rarely a lack of commitment or competence. It is a lack of a
                definitive scale strategy. Over seven days, this curated cohort steps away from
                daily operations to answer the defining strategic questions of scale:
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 26, fontStyle: 'italic', color: 'var(--ochre)', borderLeft: '2px solid var(--ochre)', paddingLeft: 24, margin: '32px 0' }}>
                Who is your ultimate <em>doer</em> at scale — the entity that implements at scale?
                Who is your ultimate <em>payer</em> — who funds it?
              </p>
              <p>
                These are not abstract questions. By Day 6, every founder leaves with the answers
                in hand, and a one-pager that&rsquo;s ready for the funder conversations that come
                next.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="enoughs">
        <div className="container">
          <div className="enoughs__head">
            <div>
              <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">The Mulago Scale Screen</span></div>
              <h2>The four<br /><em>enoughs.</em></h2>
            </div>
            <p>The Scale Screen is the rigorous framework at the heart of the week. By the end, every cohort model must earn a credible yes on all four questions.</p>
          </div>
          <div className="enough-grid">
            {[
              ['01', 'Good enough.', 'Does the solution actually work, with credible evidence? Outcomes you can defend, not just outputs you can count.'],
              ['02', 'Big enough.', 'Is the problem large enough to matter at scale? Will solving it move the needle on a population-level outcome?'],
              ['03', 'Simple enough.', 'Can others replicate it without the founder? Strip the model to the smallest set of elements that still produce the outcome.'],
              ['04', 'Cheap enough.', 'Can the ultimate payer afford to reach everyone who needs it? Unit economics that work at population scale, not just pilot scale.'],
            ].map(([n, t, d]) => (
              <div className="enough-card" key={n}>
                <div className="enough-card__num">{n}</div>
                <h3 className="enough-card__title">{t}</h3>
                <p className="enough-card__desc">{d}</p>
              </div>
            ))}
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
              ['∞', 'After', 'Lifelong cohort. Annual reunions. Warm intros into patient capital.'],
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
              ['01', 'Framework instruction', 'The Mulago Scale Screen. Doer & Payer at Scale. The Iterative Organization. Clear-language pitching. Delivered by the framework architects themselves.'],
              ['02', '1-on-1 capacity clinics', 'Structured 45-minute rotations with Pakistani faculty who have already navigated the exact scale, funding, and operational walls each fellow now faces.'],
              ['03', 'Peer learning', "Lightning talks, feedback pairs, and demo-day-style rehearsals. Eleven founders, eleven mirrors. By Day 3, the cohort knows each other's models cold."],
              ['04', 'Funder access', 'Curated funder sessions and a Demo Day designed for real, post-fellowship conversations — not a one-shot pitch contest.'],
              ['05', 'Cultural immersion', 'Dinner at a local home, sightseeing in the Shigar valley, a cultural night with regional musicians. The week is shaped by where it happens.'],
            ].map(([n, h, p]) => (
              <div className="pillars__item" key={n}>
                <div className="num">{n}</div>
                <div><h4>{h}</h4><p>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--alpine-deep)', color: 'var(--parchment)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 64px)', color: 'var(--paper)', lineHeight: 1, letterSpacing: '-0.02em' }}>Continue the expedition.</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifySelf: 'end' }}>
            <Link href="/curriculum" className="btn btn--ochre">The Curriculum →</Link>
            <Link href="/cohort" className="btn btn--ghost-light">Meet the Cohort</Link>
          </div>
        </div>
      </section>
    </>
  );
}
