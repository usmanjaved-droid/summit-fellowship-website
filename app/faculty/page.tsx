import Link from 'next/link';
import Image from 'next/image';
import { ADVISORS, FACULTY, ORGANIZERS, type Person } from './people';

export const metadata = {
  title: 'Faculty & Organizers — Summit Fellowship',
};

function PersonCard({ p }: { p: Person }) {
  return (
    <article className="person">
      <div className="person__photo-col">
        {p.photo_url ? (
          <Image
            src={p.photo_url}
            alt={p.name}
            width={200}
            height={280}
            className="person__photo"
          />
        ) : (
          <div className="person__avatar-large">{p.init}</div>
        )}
      </div>
      <div className="person__middle-col">
        <div className="person__header">
          <h3 className="person__name">{p.name}</h3>
          <div className="person__role">{p.role}</div>
        </div>
        <div className="person__story">
          <h4>Their Story</h4>
          <p>{p.org}</p>
        </div>
      </div>
      <div className="person__right-col">
        <h4>Talk to them about</h4>
        <p>{p.relevance}</p>
        <div className="person__links">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function FacultyPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Faculty Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Faculty &amp; Organizers</span></div>
          <h1 className="page-hero__title">An ecosystem of <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>support.</em></h1>
          <p className="page-hero__subtitle">A curated group of founders, funders, and system-level operators bringing scale frameworks, patient capital, and the operational scars to make it real.</p>
        </div>
      </section>

      <section className="faculty-section" id="faculty">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 40 }}>Faculty</h2>
          <div className="faculty-grid">
            {FACULTY.map((p) => <PersonCard key={p.num} p={p} />)}
          </div>
        </div>
      </section>

      <section className="faculty-section faculty-section--alt" id="advisors">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 40 }}>Advisors</h2>
          <div className="faculty-grid">
            {ADVISORS.map((p) => <PersonCard key={p.num} p={p} />)}
          </div>
        </div>
      </section>

      <section className="faculty-section" id="organizers">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 40 }}>Organizers</h2>
          <div className="faculty-grid">
            {ORGANIZERS.map((p) => <PersonCard key={p.num} p={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
