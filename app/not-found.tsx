import { getLatestCohort } from '@/lib/cohorts';
import PageHero from './components/PageHero';
import { ArrowLink, Button, Section } from './components/fop';
import styles from './not-found.module.css';

export default function NotFound() {
  const latest = getLatestCohort();
  return (
    <>
      <PageHero title="Page not found." />
      <Section tone="offwhite">
        <p className={`t-body-light ${styles.lead}`}>
          The site has been reorganised, so older links may no longer work. Try one of these:
        </p>
        <div className={styles.actions}>
          <Button href="/" size="lg">Home</Button>
          <ArrowLink href="/apply">Apply</ArrowLink>
          <ArrowLink href={`/cohorts/${latest.year}`}>The {latest.year} cohort</ArrowLink>
        </div>
      </Section>
    </>
  );
}
