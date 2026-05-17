import Link from 'next/link';

export const metadata = {
  title: 'Resources & Downloads — Summit Fellowship',
};

type Res = { kind: 'pdf' | 'md' | 'xlsx' | 'zip'; title: string; desc: string; tags: string[]; action: string; href: string };

const FILES: Res[] = [
  { kind: 'md', title: 'Master Itinerary 2026', desc: 'Day-by-day program, with time blocks and faculty assignments.', tags: ['v3.2', 'All fellows'], action: 'Open →', href: '#' },
  { kind: 'md', title: 'Cohort Brief — Participants', desc: 'Confirmed cohort list with models, sectors, and contacts.', tags: ['Final', 'Internal'], action: 'Open →', href: '#' },
  { kind: 'md', title: 'Faculty & Organizers Brief', desc: 'Profiles of faculty, guest mentors, and the organizing team.', tags: ['v2.1', 'All'], action: 'Open →', href: '#' },
  { kind: 'pdf', title: 'Pre-arrival packing & logistics', desc: 'What to bring, how to dress for Skardu, and what NOT to pack.', tags: ['12 pages', 'May 2026'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Visa letter — template', desc: 'Letter of invitation template for visa applications. Request a personalised version from the team.', tags: ['Template'], action: 'Request →', href: '#' },
  { kind: 'xlsx', title: 'Travel manifest', desc: 'Flight + transfer details for all fellows and faculty. Internal use only.', tags: ['Restricted'], action: 'Request →', href: '#' },
  { kind: 'pdf', title: 'One-pager template', desc: 'Mission · Big Idea · Theory · Model · Doer · Payer. The canonical one-pager every fellow leaves with.', tags: ['Day 01'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Scale Screen worksheet', desc: 'Self-assessment against the four enoughs. Fill in before you arrive — defend it on Day 02.', tags: ['Day 02'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Evidence plan canvas', desc: 'Map your outputs / outcomes / impact. Identify the most expensive evidence gap and design a 12-month plan to close it.', tags: ['Day 02'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: '10-min pitch outline', desc: 'The four-beat narrative skeleton. Bring 3 draft slides per beat to Day 05 capacity clinics.', tags: ['Day 05'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Banned words list', desc: 'The complete list. Print, post above your desk, and refer to during pitch revisions.', tags: ['Reference'], action: 'Download →', href: '#' },
  { kind: 'zip', title: 'Demo Day slide template', desc: 'Branded pitch deck template (Keynote + Google Slides). Mandatory for Demo Day.', tags: ['Day 06'], action: 'Download →', href: '#' },
];

const BRAND = [
  { title: 'Logo & wordmark pack', href: '#' },
  { title: 'Social media guidelines', href: '#' },
  { title: 'Photo / video consent form', href: '#' },
  { title: 'Press kit · Vol. 01', href: '#' },
];

function ResourceCard({ r }: { r: Res }) {
  const labelMap = { pdf: 'PDF', md: 'MD', xlsx: 'XLSX', zip: 'ZIP' } as const;
  return (
    <a className="resource" href={r.href}>
      <div className={`resource__icon resource__icon--${r.kind}`}><span>{labelMap[r.kind]}</span></div>
      <div className="resource__meta">
        <div className="resource__title">{r.title}</div>
        <div className="resource__desc">{r.desc}</div>
        <div className="resource__tags">{r.tags.map((t) => <span key={t} className="resource__tag">{t}</span>)}</div>
      </div>
      <span className="resource__action">{r.action}</span>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Resources Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Resources</span></div>
          <h1 className="page-hero__title">Resources &amp; <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>downloads.</em></h1>
          <p className="page-hero__subtitle">Pre-reads, frameworks, the full itinerary as a PDF, and links to everything the cohort needs before, during, and after the week.</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="group-head">
            <div>
              <div className="group-head__num">Files</div>
              <h2>Programme docs &amp; <em>worksheets.</em></h2>
            </div>
            <p>The canonical references and the canvases used during the week. Bookmark or download — what&rsquo;s posted here is the source of truth.</p>
          </div>
          <div className="resource-grid">
            {FILES.map((r) => <ResourceCard key={r.title} r={r} />)}
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container">
          <div className="group-head">
            <div>
              <div className="group-head__num">Pre-reads</div>
              <h2>Reading <em>before you arrive.</em></h2>
            </div>
            <p>Three short reads we ask everyone to do before Day 0. None are long. All are foundational to the conversations on Day 1.</p>
          </div>
          <div className="reading-list">
            {[
              { type: 'Essay · 15 min', title: 'Eight Words You Must Get Right', author: 'Kevin Starr · Stanford Social Innovation Review', why: 'The single best primer on the Mulago Mission framework. If you read one thing before arriving, read this. It frames Day 1 entirely.', link: 'Read on SSIR →' },
              { type: 'Essay · 10 min', title: 'The Trouble with Impact Investing', author: 'Kevin Starr · SSIR', why: "Frames the funder/operator conversation that runs all week. Useful context for Day 4's parallel funder track.", link: 'Read on SSIR →' },
              { type: 'Article · 12 min', title: 'Doer and Payer at Scale', author: 'Mulago Foundation · Working Paper', why: 'The framework everything else hangs on. Read this twice. The second time, with your own model in front of you.', link: 'Read PDF →' },
              { type: 'Optional · 20 min', title: 'Scaling: The Surprising Mathematics of Life and Death', author: 'Geoffrey West · TED Talk', why: 'A wild card. Why scale obeys mathematical laws across biology, cities, and corporations — and what it means for designing organizations.', link: 'Watch on TED →' },
            ].map((r) => (
              <article className="reading-item" key={r.title}>
                <div className="reading-item__type">{r.type}</div>
                <h3 className="reading-item__title">{r.title}</h3>
                <div className="reading-item__author">{r.author}</div>
                <p className="reading-item__why">{r.why}</p>
                <a href="#" className="reading-item__link" target="_blank" rel="noopener noreferrer">{r.link}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', padding: '40px 0', borderTop: '1px solid rgba(20,39,52,0.08)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Brand &amp; media</span>
          {BRAND.map((b) => (
            <a
              key={b.title}
              href={b.href}
              style={{ fontSize: 14, color: 'var(--alpine-deep)', textDecoration: 'underline', textDecorationColor: 'rgba(20,39,52,0.25)', textUnderlineOffset: 4 }}
            >
              {b.title} →
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
