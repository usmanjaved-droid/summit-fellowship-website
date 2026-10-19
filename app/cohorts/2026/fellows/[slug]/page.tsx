import { notFound } from 'next/navigation';
import { getAdjacentFellows, getAllFellows, getFellow, getFellowNumber } from '@/lib/fellows';
import { FellowHero } from '../../../_components/fellow/FellowHero';
import { FellowPager } from '../../../_components/fellow/FellowPager';
import { FellowPitch } from '../../../_components/fellow/FellowPitch';
import { IdeaBand } from '../../../_components/fellow/IdeaBand';
import { FellowSection } from '../../../_components/fellow/FellowSection';
import { FellowSidebar } from '../../../_components/fellow/FellowSidebar';
import styles from '../../../_components/fellow/fellow-detail.module.css';

const YEAR = 2026;

/** The four Mulago "enough" questions, in the memos' order. */
const SCALE_QUESTIONS = [
  { key: 'good', title: 'Good enough', lead: 'impact and evidence' },
  { key: 'big', title: 'Big enough', lead: 'addressable market' },
  { key: 'simple', title: 'Simple enough', lead: 'to deliver at big scale' },
  { key: 'cheap', title: 'Cheap enough', lead: 'for payers at scale' },
] as const;

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
    openGraph: {
      siteName: 'Friends of Pakistan Fellowship',
      type: 'profile',
      locale: 'en_GB',
      title: `${fellow.name} — Friends of Pakistan Fellow`,
      description: `${fellow.tagline}. ${fellow.org}.`,
    },
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
          <FellowPitch fellow={fellow} />
          <FellowSection title="The mission" content={fellow.mission} />
          <FellowSection title="How it works" content={fellow.how_it_works} />
          <FellowSection title="The dream" content={fellow.the_dream} />
          <FellowSection title="Potential for impact at scale">
            <p className={styles['fellow-scale__intro']}>
              Read against four questions, in the context of the organisation&rsquo;s stage: is the impact good enough,
              is the problem big enough, is the model simple enough to deliver at scale, and is it cheap enough for
              whoever pays at scale.
            </p>
            <ul className={styles['fellow-scale__list']}>
              {SCALE_QUESTIONS.map((q) => (
                <li key={q.key} className={styles['fellow-scale__item']}>
                  <h3 className={styles['fellow-scale__title']}>
                    {q.title} <span className={styles['fellow-scale__lead']}>· {q.lead}</span>
                  </h3>
                  <p>{fellow.scale[q.key]}</p>
                </li>
              ))}
            </ul>
          </FellowSection>
          <FellowSection title="So far">
            <ul>
              {fellow.so_far.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FellowSection>
        </div>
        <FellowSidebar fellow={fellow} />
      </div>
      <FellowPager {...getAdjacentFellows(YEAR, slug)} basePath={`/cohorts/${YEAR}/fellows`} />
    </div>
  );
}
