import Link from 'next/link';
import { getFellow, getAllFellows } from '@/lib/fellows';

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
    description: fellow.model,
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

  const allFellows = getAllFellows();
  const currentIndex = allFellows.findIndex((f) => f.id === fellow.id);
  const prevFellow = currentIndex > 0 ? allFellows[currentIndex - 1] : null;
  const nextFellow = currentIndex < allFellows.length - 1 ? allFellows[currentIndex + 1] : null;

  return (
    <div className="modal">
      <div className="modal__head">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true"></div>
        <div className="modal__head-inner">
          <div className="modal__avatar">
            {fellow.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div>
            <h1 className="modal__name">{fellow.name}</h1>
            <div className="modal__org">{fellow.org}</div>
          </div>
        </div>
      </div>
      <div className="modal__body">
        <div className="modal__section">
          <h4>Sector</h4>
          <p>{fellow.sector}</p>
        </div>
        <div className="modal__section">
          <h4>Model Overview</h4>
          <p>{fellow.model}</p>
        </div>
        {fellow.idea_context && (
          <div className="modal__section">
            <h4>The Problem</h4>
            <p>{fellow.idea_context}</p>
          </div>
        )}
        {fellow.how_it_works && (
          <div className="modal__section">
            <h4>How It Works</h4>
            <p>{fellow.how_it_works}</p>
          </div>
        )}
        {fellow.the_dream && (
          <div className="modal__section">
            <h4>The Vision</h4>
            <p>{fellow.the_dream}</p>
          </div>
        )}
        <div className="modal__section">
          <h4>Contact &amp; Assets</h4>
          <div className="modal__contact-grid">
            {fellow.email && (
              <a href={`mailto:${fellow.email}`}>
                <span className="l">Email</span>
                {fellow.email}
              </a>
            )}
            {fellow.phone && (
              <a href={`tel:${fellow.phone.replace(/\s/g, '')}`}>
                <span className="l">Phone</span>
                {fellow.phone}
              </a>
            )}
            {fellow.fellow_linkedin && (
              <a href={fellow.fellow_linkedin} target="_blank" rel="noopener noreferrer">
                <span className="l">LinkedIn</span>
                Profile →
              </a>
            )}
            {fellow.org_url && (
              <a href={fellow.org_url} target="_blank" rel="noopener noreferrer">
                <span className="l">Website</span>
                Visit →
              </a>
            )}
          </div>
        </div>
        <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
            {prevFellow ? (
              <Link href={`/fellows/${prevFellow.id}`} style={{ flex: 1, textAlign: 'left', padding: '12px 0', color: 'var(--alpine-deep)', textDecoration: 'none', fontSize: '14px' }}>
                ← {prevFellow.name}
              </Link>
            ) : (
              <div style={{ flex: 1 }}></div>
            )}
            <Link href="/fellows" style={{ flex: 1, textAlign: 'center', padding: '12px 0', color: 'var(--alpine-deep)', textDecoration: 'none', fontSize: '14px' }}>
              Back to all fellows
            </Link>
            {nextFellow ? (
              <Link href={`/fellows/${nextFellow.id}`} style={{ flex: 1, textAlign: 'right', padding: '12px 0', color: 'var(--alpine-deep)', textDecoration: 'none', fontSize: '14px' }}>
                {nextFellow.name} →
              </Link>
            ) : (
              <div style={{ flex: 1 }}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
