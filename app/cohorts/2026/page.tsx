import { getFellowCards } from '@/lib/fellows';
import FellowsBits from '../../components/FellowsBits';
import PageHero from '../../components/PageHero';
import ClosingBand from '../../components/ClosingBand';

export const metadata = {
  title: 'The Inaugural Cohort (2026) — Friends of Pakistan Fellowship',
  description: 'The inaugural cohort: ten Pakistani founders building solutions designed for scale.',
};

export default function Cohort2026FellowsPage() {
  return (
    <>
      <PageHero
        title={<>Ten founders.<br /><em>The inaugural cohort.</em></>}
        subtitle="The inaugural Friends of Pakistan cohort spans mental health to special education, AI-powered legal aid to gamified curriculum. Each leader passed a rigorous selection — then redesigned for millions."
      />
      <h2 className="sr-only">The fellows</h2>
      <FellowsBits fellows={getFellowCards(2026)} basePath="/cohorts/2026/fellows" />
      <ClosingBand />
    </>
  );
}
