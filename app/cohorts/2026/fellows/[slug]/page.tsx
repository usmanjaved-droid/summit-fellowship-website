import { notFound } from 'next/navigation';
import { getAdjacentFellows, getAllFellows, getFellow, getFellowNumber } from '@/lib/fellows';
import { FellowHero } from '../../../_components/fellow/FellowHero';
import { FellowPager } from '../../../_components/fellow/FellowPager';
import { IdeaBand } from '../../../_components/fellow/IdeaBand';
import { FellowSection } from '../../../_components/fellow/FellowSection';
import { FellowSidebar } from '../../../_components/fellow/FellowSidebar';
import styles from '../../../_components/fellow/fellow-detail.module.css';

const YEAR = 2026;

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFellows(YEAR).map((f) => ({ slug: f.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(YEAR, slug);
  if (!fellow) return {};
  return {
    title: `${fellow.name} — ${YEAR} Cohort — Friends of Pakistan Fellowship`,
    description: fellow.tagline,
  };
}

export default async function FellowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(YEAR, slug);
  if (!fellow) notFound();

  return (
    <div className={styles['fellow-detail']}>
      <FellowHero
        fellow={fellow}
        number={getFellowNumber(YEAR, slug)}
        total={getAllFellows(YEAR).length}
        backHref={`/cohorts/${YEAR}`}
        year={YEAR}
      />
      <IdeaBand fellow={fellow} />
      <div className={styles['fellow-detail__body']}>
        <div className={styles['fellow-detail__content']}>
          <FellowSection title="The mission" content={fellow.mission} />
          <FellowSection title="How it works" content={fellow.how_it_works} />
        </div>
        <FellowSidebar fellow={fellow} />
      </div>
      <FellowPager {...getAdjacentFellows(YEAR, slug)} basePath={`/cohorts/${YEAR}/fellows`} />
    </div>
  );
}
