import Link from 'next/link';
import { getCurrentCohort, getSiteSettings, isApplicationLive } from '@/lib/site';
import FormLoader from './FormLoader';

export const metadata = {
  title: 'Application — Summit Fellowship',
  description: 'Apply to the Summit Fellowship.',
};

export default function ApplicationPage() {
  const cohort = getCurrentCohort();
  const live = isApplicationLive(cohort);
  return (
    <>
      <section className="page-hero" data-screen-label="Application Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><Link href="/apply">Apply</Link><span>/</span><span>Application</span></div>
          <h1 className="page-hero__title">The {cohort.year} application.</h1>
          {!live && <p className="page-hero__subtitle">Applications for the {cohort.year} cohort are closed. <Link href="/apply" style={{ color: 'var(--ochre)' }}>See how to apply</Link>.</p>}
        </div>
      </section>
      {live && <FormLoader year={cohort.year} contactEmail={getSiteSettings().contactEmail} />}
    </>
  );
}
