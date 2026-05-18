import Link from 'next/link';

export const metadata = {
  title: 'Faculty & Organizers — Summit Fellowship',
};

type Person = {
  init: string;
  num: string;
  name: string;
  role: string;
  org: React.ReactNode;
  relevance: React.ReactNode;
  links: { label: string; href: string }[];
};

const FACULTY: Person[] = [
  {
    init: 'KS', num: 'F.01', name: 'Kevin Starr', role: 'CEO, Mulago Foundation',
    org: <>The Mulago Foundation operates like a venture capital firm for impact, providing unrestricted funding and support to social entrepreneurs who have solutions to poverty and climate change <strong>designed for massive scale.</strong></>,
    relevance: <>Your big questions about the <strong>design and strategy</strong> to get your solution to scale. Who's the doer? Who's the payer? The questions that separate thinking-at-scale from thinking-at-startup.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/kevin-starr' }, { label: 'Mulago Foundation →', href: 'https://www.mulagofoundation.org/' }],
  },
  {
    init: 'AR', num: 'F.02', name: 'Dr. Ahson Rabbani', role: 'CEO, ChildLife Foundation',
    org: <>ChildLife Foundation provides <strong>high-quality, free-of-cost emergency healthcare services</strong>, managing pediatric emergency rooms and telemedicine centers across Pakistan&rsquo;s public hospitals.</>,
    relevance: <>Building government partnerships that actually stick. Scaling emergency care across public hospitals. <strong>Making life-saving operations profitable</strong> without compromising quality or access.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/ahson-rabbani/' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'SK', num: 'F.03', name: 'Dr. Sara Saeed Khurram', role: 'Co-Founder & CEO, Sehat Kahani',
    org: <>Sehat Kahani democratizes healthcare access through an <strong>all-female doctor provider network</strong> delivering affordable telemedicine to low-income communities and clinics.</>,
    relevance: <>Telemedicine that works at scale. Building <strong>all-female provider networks</strong> in conservative markets. Navigating Pakistan&rsquo;s healthcare regulatory landscape and the financials that make it sustainable.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/dr-sara-saeed-khurram/' }, { label: 'Sehat Kahani →', href: 'https://sehatkahani.com/' }],
  },
  {
    init: 'SF', num: 'F.04', name: 'Sarah Farooq', role: 'Associate Director, Fellowship at Acumen',
    org: <>Acumen is a global nonprofit changing the way the world tackles poverty by <strong>investing patient capital</strong> in social enterprises and developing leaders building a more inclusive world.</>,
    relevance: <>Scaling from startup founder to funder mindset. <strong>Franchise + partnership models</strong> that multiply impact without capital. Unit economics that prove your model works before the 100x push.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sarah-farooq/' }, { label: 'Acumen →', href: 'https://acumen.org/' }],
  },
  {
    init: 'NS', num: 'F.05', name: 'Nadir Shams', role: 'Founder, Friends of Pakistan Society & Fund',
    org: <>The Friends of Pakistan Society &amp; Fund catalyzes transformational social change and <strong>supports social entrepreneurs driving systems-level improvements</strong> across the country.</>,
    relevance: <>What <strong>diaspora and global capital</strong> actually fund and why. Positioning your work for ecosystem-level impact, not just returns. Portfolio strategy from a funder who builds to scale systems, not just companies.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/nadirshams/' }, { label: 'Friends of Pakistan →', href: 'https://fopk.org/' }],
  },
  {
    init: 'RK', num: 'F.06', name: 'Riaz Ahmed Kamlani', role: 'Chief Operating Officer, The Citizens Foundation',
    org: <>The Citizens Foundation is <strong>Pakistan&rsquo;s largest community-based education organization</strong>, operating thousands of schools across Pakistan and providing free quality education to hundreds of thousands of underserved children through decentralized, community-managed school units.</>,
    relevance: <>Decentralized operations at massive scale. <strong>Building sustainable models in resource-constrained environments</strong> where communities own and manage the outcomes. Turning cost into competitive advantage.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/riaz-ahmed-kamlani-38b1a04/' }, { label: 'The Citizens Foundation →', href: 'https://www.tcf.org.pk/' }],
  },
];

const ORGANIZERS: Person[] = [
  {
    init: 'HY', num: 'O.01', name: 'Haroon Yasin', role: 'Founder & CEO, Taleemabad',
    org: <><strong>Taleemabad is Pakistan&rsquo;s largest ed-tech organization</strong>, transforming learning for millions of children through digital platforms, public school integrations, and engaging multimodal content.</>,
    relevance: <>From evening classes in the slums to <strong>millions of learners nationwide.</strong> Government partnerships that create defensible scale. Building the infrastructure of public education 2.0. (Also co-hosting this retreat!)</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/haroon-yasin/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'SA', num: 'O.02', name: 'Sabeena Abbasi', role: 'Chief Sustainability & Impact Officer, Taleemabad',
    org: <>Taleemabad ensures equitable, high-quality digital learning by delivering standardized curriculum through engaging content, directly targeting <strong>massive gaps in foundational literacy.</strong></>,
    relevance: <>Impact measurement that drives decisions. <strong>Inclusive learning design</strong> that doesn&rsquo;t sacrifice quality. Building sustainable models through community learning networks, not top-down lectures.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sabeena-abbasi/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'AH', num: 'O.03', name: 'Abida Hassan', role: 'Sr. General Manager - Operations, ChildLife Foundation',
    org: <>ChildLife Foundation modernizes public sector hospitals by running <strong>high-tech, free-of-cost pediatric emergency rooms</strong> across Sindh, Balochistan, and Punjab.</>,
    relevance: <>Operational excellence under real constraints. <strong>Scaling across geographies</strong> while maintaining quality. Building resilient logistics and teams that sustain growth in the chaos of public-sector healthcare.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/abida-hassan-clf/' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'MJ', num: 'O.04', name: 'Muhammad Usman Javed', role: 'Head of Business Strategy & Fundraising, Taleemabad',
    org: <>Taleemabad is a pioneering social enterprise leveraging <strong>AI and digital content</strong> to replace outdated educational models in Pakistan with highly scalable, adaptive learning solutions.</>,
    relevance: <>Strategic frameworks that founders actually use. <strong>Fundraising at scale</strong> (local + diaspora + international). Orchestrating partnerships that multiply your reach. (Also organizing this whole retreat!)</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/usman-javed/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
];

function PersonCard({ p }: { p: Person }) {
  return (
    <article className="person">
      <div className="person__id">
        <div className="person__avatar">{p.init}</div>
        <div className="person__id-text">
          <div className="person__num">{p.num}</div>
          <h3 className="person__name">{p.name}</h3>
          <div className="person__role">{p.role}</div>
        </div>
      </div>
      <div className="person__col">
        <h4>About the Organization</h4>
        <p>{p.org}</p>
      </div>
      <div className="person__col">
        <h4>Talk to them about</h4>
        <p>{p.relevance}</p>
        <div className="person__links">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function FacultyPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Faculty Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Faculty &amp; Organizers</span></div>
          <h1 className="page-hero__title">An ecosystem of <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>support.</em></h1>
          <p className="page-hero__subtitle">A curated group of founders, funders, and system-level operators bringing scale frameworks, patient capital, and the operational scars to make it real.</p>
        </div>
      </section>

      <section className="faculty-section" id="faculty">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 40 }}>Faculty</h2>
          <div className="faculty-grid">
            {FACULTY.map((p) => <PersonCard key={p.num} p={p} />)}
          </div>
        </div>
      </section>

      <section className="faculty-section faculty-section--alt" id="organizers">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 40 }}>Organizers</h2>
          <div className="faculty-grid">
            {ORGANIZERS.map((p) => <PersonCard key={p.num} p={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
