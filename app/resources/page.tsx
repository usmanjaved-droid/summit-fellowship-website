import Link from 'next/link';

export const metadata = {
  title: 'Resources & Downloads — Summit Fellowship',
};

type Res = { kind: 'pdf' | 'md' | 'xlsx' | 'zip'; title: string; desc: string; tags: string[]; action: string; href: string };

const DOCS: Res[] = [
  { kind: 'md', title: 'Master Itinerary 2026', desc: 'Day-by-day program, with time blocks and faculty assignments.', tags: ['v3.2', 'All fellows'], action: 'Open →', href: '#' },
  { kind: 'md', title: 'Cohort Brief — Participants', desc: 'Confirmed cohort list with models, sectors, and contacts.', tags: ['Final', 'Internal'], action: 'Open →', href: '#' },
  { kind: 'md', title: 'Faculty & Organizers Brief', desc: 'Profiles of faculty, guest mentors, and the organizing team.', tags: ['v2.1', 'All'], action: 'Open →', href: '#' },
  { kind: 'pdf', title: 'Pre-arrival packing & logistics', desc: 'What to bring, how to dress for Skardu, and what NOT to pack.', tags: ['12 pages', 'May 2026'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Visa letter — template', desc: 'Letter of invitation template for visa applications. Request a personalised version from the team.', tags: ['Template'], action: 'Request →', href: '#' },
  { kind: 'xlsx', title: 'Travel manifest', desc: 'Flight + transfer details for all fellows and faculty. Internal use only.', tags: ['Restricted'], action: 'Request →', href: '#' },
];

const WORK: Res[] = [
  { kind: 'pdf', title: 'One-pager template', desc: 'Mission · Big Idea · Theory · Model · Doer · Payer. The canonical one-pager every fellow leaves with.', tags: ['Day 01'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Scale Screen worksheet', desc: 'Self-assessment against the four enoughs. Fill in before you arrive — defend it on Day 02.', tags: ['Day 02'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Evidence plan canvas', desc: 'Map your outputs / outcomes / impact. Identify the most expensive evidence gap and design a 12-month plan to close it.', tags: ['Day 02'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: '10-min pitch outline', desc: 'The four-beat narrative skeleton. Bring 3 draft slides per beat to Day 05 capacity clinics.', tags: ['Day 05'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Banned words list', desc: 'The complete list. Print, post above your desk, and refer to during pitch revisions.', tags: ['Reference'], action: 'Download →', href: '#' },
  { kind: 'zip', title: 'Demo Day slide template', desc: 'Branded pitch deck template (Keynote + Google Slides). Mandatory for Demo Day.', tags: ['Day 06'], action: 'Download →', href: '#' },
];

const BRAND: Res[] = [
  { kind: 'zip', title: 'Logo & wordmark pack', desc: 'SVG, PNG, on light + dark. Use the wordmark, not the icon, in third-party communications.', tags: ['v1.0'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Social media guidelines', desc: 'Hashtags, mentions, and the photo / video releases everyone signs on arrival.', tags: ['2 pages'], action: 'Download →', href: '#' },
  { kind: 'pdf', title: 'Photo / video consent form', desc: 'Mandatory. Signed on Day 0. Opt-out is fine — just tell us before arriving.', tags: ['Required'], action: 'Download →', href: '#' },
  { kind: 'zip', title: 'Press kit · Vol. 01', desc: 'Founder bios, programme overview, hi-res photography. For media use only.', tags: ['Press'], action: 'Download →', href: '#' },
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
              <div className="group-head__num">01 · Programme docs</div>
              <h2>Official <em>documents.</em></h2>
            </div>
            <p>The canonical references the team will keep updated. Bookmark or download — what&rsquo;s posted here is the source of truth.</p>
          </div>
          <div className="resource-grid">
            {DOCS.map((r) => <ResourceCard key={r.title} r={r} />)}
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container">
          <div className="group-head">
            <div>
              <div className="group-head__num">02 · Worksheets</div>
              <h2>Frameworks &amp; <em>worksheets.</em></h2>
            </div>
            <p>The canvases and templates we use during the week. Print before you arrive — the Studio is whiteboard-and-paper first; laptops are encouraged off, not on.</p>
          </div>
          <div className="resource-grid">
            {WORK.map((r) => <ResourceCard key={r.title} r={r} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="group-head">
            <div>
              <div className="group-head__num">03 · Pre-reads</div>
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

      <section className="section section--warm">
        <div className="container">
          <div className="group-head">
            <div>
              <div className="group-head__num">04 · Brand &amp; comms</div>
              <h2>Brand &amp; <em>media.</em></h2>
            </div>
            <p>If you&rsquo;re posting about the fellowship — please do — these are the assets and the small ground rules.</p>
          </div>
          <div className="resource-grid">
            {BRAND.map((r) => <ResourceCard key={r.title} r={r} />)}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--alpine-deep)', color: 'var(--parchment)', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 12 }}>A note on access</div>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, lineHeight: 1.4, color: 'var(--paper)' }}>
            Some items above are reserved for confirmed fellows, faculty, and the organizing team. If a link asks you to request access, email the team — we&rsquo;ll respond within 24 hours.
          </p>
          <Link href="/contact" className="btn btn--ochre" style={{ marginTop: 24 }}>Request access →</Link>
        </div>
      </section>
    </>
  );
}
