import Link from 'next/link';
import { getCurrentCohort, getSiteSettings, isApplicationLive } from '@/lib/site';
import FormLoader from './FormLoader';

export const metadata = {
  title: 'Application — Friends of Pakistan Fellowship',
  description: 'Apply to the Friends of Pakistan Fellowship.',
};

export default function ApplicationPage() {
  const cohort = getCurrentCohort();
  const live = isApplicationLive(cohort);
  return (
    <>
      <section className="page-hero" data-screen-label="Application Hero">
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><Link href="/apply">Apply</Link><span>/</span><span>Application</span></div>
          <h1 className="page-hero__title">The {cohort.year} application.</h1>
          {!live && <p className="page-hero__subtitle">Applications for the {cohort.year} cohort are closed. <Link href="/apply" className="page-hero__link">See how to apply</Link>.</p>}
        </div>
      </section>
      {live && <FormLoader year={cohort.year} contactEmail={getSiteSettings().contactEmail} />}
    </>
  );
}
