import Link from 'next/link';
import { getFellowCards } from '@/lib/fellows';
import FellowsBits from '../../components/FellowsBits';

export const metadata = {
  title: 'The 2026 Fellows — Summit Fellowship',
  description: 'The inaugural cohort: eleven Pakistani founders building solutions designed for scale.',
};

export default function Cohort2026FellowsPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="2026 Fellows Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs">
            <Link href="/">Home</Link><span>/</span><Link href="/cohorts">Cohorts</Link><span>/</span><span>2026</span>
          </div>
          <h1 className="page-hero__title">
            Eleven founders.<br />
            <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>One ascent.</em>
          </h1>
          <p className="page-hero__subtitle">
            The 2026 fellows span mental health to special education, AI-powered legal aid to
            gamified curriculum. Each leader passed a rigorous selection — then redesigned for
            millions.
          </p>
        </div>
      </section>
      <FellowsBits fellows={getFellowCards(2026)} basePath="/cohorts/2026/fellows" />
    </>
  );
}
