import Link from 'next/link';
import { getLatestCohort } from '@/lib/cohorts';

export default function NotFound() {
  const latest = getLatestCohort();
  return (
    <section className="page-hero" style={{ minHeight: '60vh' }}>
      <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
      <div className="container page-hero__inner">
        <h1 className="page-hero__title">Page not found.</h1>
        <p className="page-hero__subtitle">
          The site has been reorganised, so older links may no longer work. Try one of these:
        </p>
        <div className="hero__cta-row" style={{ marginTop: 32 }}>
          <Link className="btn btn--ochre" href="/">Home</Link>
          <Link className="btn btn--ghost-light" href="/apply">Apply</Link>
          <Link className="btn btn--ghost-light" href={`/cohorts/${latest.year}`}>The {latest.year} cohort</Link>
        </div>
      </div>
    </section>
  );
}
