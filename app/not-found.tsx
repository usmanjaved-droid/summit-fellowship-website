import { getLatestCohort } from '@/lib/cohorts';
import PageHero from './components/PageHero';
import { ArrowLink, Button } from './components/fop';

export default function NotFound() {
  const latest = getLatestCohort();
  return (
    <PageHero
      title="Page not found."
      subtitle="The site has been reorganised, so older links may no longer work. Try one of these:"
    >
      <Button href="/" size="lg">Home</Button>
      <ArrowLink href="/apply">Apply</ArrowLink>
      <ArrowLink href={`/cohorts/${latest.year}`}>The {latest.year} cohort</ArrowLink>
    </PageHero>
  );
}
