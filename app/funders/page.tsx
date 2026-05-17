import Link from 'next/link';

export const metadata = {
  title: 'Funders — Summit Fellowship',
};

type Funder = {
  init: string;
  num: string;
  name: string;
  tagline: string;
  bio: React.ReactNode;
};

const FUNDERS: Funder[] = [
  {
    init: 'MF', num: 'P.01', name: 'Mulago Foundation',
    tagline: 'Patient capital, exponential impact',
    bio: <>Architects of the <strong>Scale Screen</strong>, <strong>Doer &amp; Payer</strong>, and <strong>Four Enoughs</strong> frameworks. Co-host of the fellowship. Funds the journey from working pilot to national scale.</>,
  },
  {
    init: 'AP', num: 'P.02', name: 'Acumen Pakistan',
    tagline: 'Long-term investment, real-world depth',
    bio: <>A leading patient-capital investor in Pakistan&rsquo;s social enterprise space, with operational depth across health, education, and agriculture. Brings the funder&rsquo;s lens to the conversation.</>,
  },
  {
    init: 'SF', num: 'P.03', name: 'Skoll Foundation',
    tagline: 'Systems-change capital',
    bio: <>Backing social entrepreneurs whose work moves the needle on global problems. Represents the diaspora-capital perspective on Pakistani scale.</>,
  },
];

function FunderCard({ f }: { f: Funder }) {
  return (
    <article className="person">
      <div className="person__id">
        <div className="person__avatar">{f.init}</div>
        <div className="person__id-text">
          <div className="person__num">{f.num}</div>
          <h3 className="person__name">{f.name}</h3>
          <div className="person__role">{f.tagline}</div>
        </div>
      </div>
      <div className="person__col" style={{ gridColumn: 'span 2' }}>
        <h4>About the Funder</h4>
        <p>{f.bio}</p>
      </div>
    </article>
  );
}

export default function FundersPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Funders Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>The Funders</span></div>
          <div className="page-hero__eyebrow" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: 16 }}>The Funders</div>
          <h1 className="page-hero__title">Capital that backs <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>scale.</em></h1>
          <p className="page-hero__subtitle">The patient-capital partners who fund the journey from working pilot to national reach.</p>
        </div>
      </section>

      <section className="faculty-section" id="funders">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 40 }}>Funders</h2>
          <div className="faculty-grid">
            {FUNDERS.map((f) => <FunderCard key={f.num} f={f} />)}
          </div>
        </div>
      </section>
    </>
  );
}
