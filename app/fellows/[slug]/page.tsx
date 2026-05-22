import Link from 'next/link';
import { getFellow, getAllFellows } from '@/lib/fellows';
import { FellowHero } from './components/FellowHero';
import { IdeaBand } from './components/IdeaBand';
import { FellowSection } from './components/FellowSection';
import { FellowSidebar } from './components/FellowSidebar';
import { FellowNavigation } from './components/FellowNavigation';
import styles from './page.module.css';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const fellows = getAllFellows();
  return fellows.map((fellow) => ({
    slug: fellow.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(slug);
  if (!fellow) return { title: 'Fellow Not Found' };

  return {
    title: `${fellow.name} — Summit Fellowship 2026`,
    description: fellow.tagline,
  };
}

export default async function FellowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fellow = getFellow(slug);

  if (!fellow) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Fellow not found</h1>
        <p>
          <Link href="/fellows">Back to all fellows</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles['fellow-detail']}>
      <FellowNavigation />

      <FellowHero fellow={fellow} />
      <IdeaBand fellow={fellow} />

      <div className={styles['fellow-detail__body']}>
        <div className={styles['fellow-detail__content']}>
          <FellowSection title="The Mission" content={fellow.mission} />
          <FellowSection title="How It Works" content={fellow.how_it_works} />
        </div>
        <FellowSidebar fellow={fellow} />
      </div>
    </div>
  );
}
