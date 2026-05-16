import Link from 'next/link';
import { getFellow, getRelatedFellows, getAllFellows } from '@/lib/fellows';

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
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
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
    <article className="fellow-detail">
      {/* Modal-style Head Section */}
      <section className="fellow-detail__head">
        <div className="fellow-detail__head-inner">
          <div className="fellow-detail__avatar">
            {fellow.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div>
            <h1 className="fellow-detail__name">{fellow.name}</h1>
            <p className="fellow-detail__org">{fellow.org}</p>
          </div>
        </div>
      </section>

      {/* Modal-style Body Section */}
      <div className="fellow-detail__body">
        {/* Sector Section */}
        <section className="fellow-detail__section">
          <h3>Sector</h3>
          <p>{fellow.sector}</p>
        </section>

        {/* Model Overview Section */}
        <section className="fellow-detail__section">
          <h3>Model Overview</h3>
          <p>{fellow.model}</p>
        </section>

        {/* Additional Details if available */}
        {fellow.idea_context && (
          <section className="fellow-detail__section">
            <h3>The Problem</h3>
            <p>{fellow.idea_context}</p>
          </section>
        )}

        {fellow.how_it_works && (
          <section className="fellow-detail__section">
            <h3>How It Works</h3>
            <p>{fellow.how_it_works}</p>
          </section>
        )}

        {fellow.the_dream && (
          <section className="fellow-detail__section">
            <h3>The Vision</h3>
            <p>{fellow.the_dream}</p>
          </section>
        )}

        {/* Contact & Assets Section */}
        <section className="fellow-detail__section">
          <h3>Contact &amp; Assets</h3>
          <div className="fellow-detail__contact-grid">
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
        </section>
      </div>

      {/* Navigation Footer */}
      <footer className="fellow-detail__nav">
        <div className="fellow-detail__nav-inner">
          {prevFellow ? (
            <Link href={`/fellows/${prevFellow.id}`} className="fellow-detail__nav-link">
              ← {prevFellow.name}
            </Link>
          ) : (
            <span></span>
          )}
          <Link href="/fellows" className="fellow-detail__nav-center">
            Back to all fellows
          </Link>
          {nextFellow ? (
            <Link href={`/fellows/${nextFellow.id}`} className="fellow-detail__nav-link">
              {nextFellow.name} →
            </Link>
          ) : (
            <span></span>
          )}
        </div>
      </footer>
    </article>
  );
}
