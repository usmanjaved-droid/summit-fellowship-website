import Link from 'next/link';
import { getFellowCards } from '@/lib/fellows';
import FellowsBits from '../../components/FellowsBits';
import PageHero from '../../components/PageHero';

export const metadata = {
  title: 'The 2026 Fellows — Summit Fellowship',
  description: 'The inaugural cohort: ten Pakistani founders building solutions designed for scale.',
};

export default function Cohort2026FellowsPage() {
  return (
    <>
      <PageHero
        crumb={
          <>
            <Link href="/cohorts">Cohorts</Link>
            <span aria-hidden="true"> / </span>
            2026
          </>
        }
        title={<>Ten founders.<br /><em>One ascent.</em></>}
        subtitle="The 2026 fellows span mental health to special education, AI-powered legal aid to gamified curriculum. Each leader passed a rigorous selection — then redesigned for millions."
      />
      <h2 className="sr-only">The fellows</h2>
      <FellowsBits fellows={getFellowCards(2026)} basePath="/cohorts/2026/fellows" />
    </>
  );
}
