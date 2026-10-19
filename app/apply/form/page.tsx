import Link from 'next/link';
import { getApplicationStatus, getCurrentCohort, getSiteSettings, isApplicationLive } from '@/lib/site';
import { ArrowLink, Section } from '../../components/fop';
import PageHero from '../../components/PageHero';
import NotifyForm from '../../components/NotifyForm';
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
      <PageHero
        crumb={
          <>
            <Link href="/apply">Apply</Link>
            <span aria-hidden="true"> / </span>
            Application
          </>
        }
        title={<>The {cohort.year} application.</>}
      />
      {live ? (
        <FormLoader year={cohort.year} contactEmail={getSiteSettings().contactEmail} />
      ) : (
        // Closed: a light band between the green hero and the green footer, so the page does not read as one block.
        <Section tone="offwhite">
          <p className="t-body">{getApplicationStatus(cohort)} The form opens here on the day applications do.</p>
          <div className="closed-notify">
            <NotifyForm year={cohort.year} />
          </div>
          <div className="closed-actions">
            <ArrowLink href="/apply">How to apply</ArrowLink>
            <ArrowLink href="/faq">Read the FAQ</ArrowLink>
          </div>
        </Section>
      )}
    </>
  );
}
