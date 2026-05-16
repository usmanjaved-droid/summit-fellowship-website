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
    description: fellow.tagline,
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

  const relatedFellows = getRelatedFellows(fellow, 4);

  return (
    <article className="fellow-detail">
      {/* Hero Section */}
      <section className="fellow-hero">
        {fellow.photo_url ? (
          <img src={fellow.photo_url} alt={fellow.name} />
        ) : (
          <div className="fellow-hero__avatar">
            {fellow.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
        )}
        <h1>{fellow.name}</h1>
        <p className="fellow-hero__org">{fellow.org}</p>
      </section>

      <div className="container">
        {/* Tagline */}
        <div className="fellow-tagline">{fellow.tagline}</div>

        {/* The Problem */}
        <section className="fellow-section fellow-section--problem">
          <h2>The Problem</h2>
          <p>{fellow.idea_context}</p>
        </section>

        {/* The Idea */}
        <section className="fellow-section fellow-section--idea">
          <h2>The Idea</h2>
          <p>{fellow.how_it_works}</p>
        </section>

        {/* The Dream */}
        <section className="fellow-section fellow-section--dream">
          <h2>The Dream</h2>
          <p>{fellow.the_dream}</p>
        </section>

        {/* Organization Card */}
        <section className="fellow-org-card">
          <h3>{fellow.org}</h3>
          <div className="fellow-org-card__row">
            <span className="fellow-org-card__label">Sector</span>
            <span className="fellow-org-card__value">{fellow.sector}</span>
          </div>
          <div className="fellow-org-card__row">
            <span className="fellow-org-card__label">Structure</span>
            <span className="fellow-org-card__value">{fellow.structure}</span>
          </div>
          <div className="fellow-org-card__links">
            {fellow.org_url && (
              <a href={fellow.org_url} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            )}
            {fellow.fellow_linkedin && (
              <a href={fellow.fellow_linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* Related Fellows */}
        <section className="fellow-related">
          <h2>Other Fellows</h2>
          <div className="fellow-related__grid">
            {relatedFellows.map((f) => (
              <Link
                key={f.id}
                href={`/fellows/${f.id}`}
                className="fellow-card fellow-card--link"
              >
                <div className="fellow-card__head">
                  <div className="fellow-card__avatar">
                    {f.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                </div>
                <h3 className="fellow-card__name">{f.name}</h3>
                <div className="fellow-card__org">
                  <strong>{f.org}</strong>
                </div>
                <div className="fellow-card__sector">{f.sector}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <footer className="fellow-footer">
          <Link href="/fellows">← Back to all fellows</Link>
        </footer>
      </div>
    </article>
  );
}
