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
    relevance: <>How to use the <strong>Scale Screen</strong> and <strong>Doer &amp; Payer</strong> frameworks to redesign your model. The four Es: <strong>Good Enough, Big Enough, Simple Enough, and Cheap Enough.</strong></>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/kevin-starr' }, { label: 'Mulago Foundation →', href: 'https://www.mulagofoundation.org/' }],
  },
  {
    init: 'AR', num: 'F.02', name: 'Dr. Ahson Rabbani', role: 'CEO, ChildLife Foundation',
    org: <>ChildLife Foundation provides <strong>high-quality, free-of-cost emergency healthcare services</strong>, managing pediatric emergency rooms and telemedicine centers across Pakistan&rsquo;s public hospitals.</>,
    relevance: <>How ChildLife scaled from a few hospitals to a <strong>nationwide footprint.</strong> Securing government partnerships for healthcare delivery. Building a real-world, localized blueprint for scaling life-saving operations.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/ahson-rabbani/' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'SK', num: 'F.03', name: 'Dr. Sara Saeed Khurram', role: 'Co-Founder & CEO, Sehat Kahani',
    org: <>Sehat Kahani democratizes healthcare access through an <strong>all-female doctor provider network</strong> delivering affordable telemedicine to low-income communities and clinics.</>,
    relevance: <>How to apply design-for-scale frameworks in practice. Scaling from theory to <strong>millions of consultations.</strong> Practical realities of scaling digital health and building all-female provider networks in Pakistan.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/dr-sara-saeed-khurram/' }, { label: 'Sehat Kahani →', href: 'https://sehatkahani.com/' }],
  },
  {
    init: 'SF', num: 'F.04', name: 'Sarah Farooq', role: 'Associate Director, Fellowship at Acumen',
    org: <>Acumen is a global nonprofit changing the way the world tackles poverty by <strong>investing patient capital</strong> in social enterprises and developing leaders building a more inclusive world.</>,
    relevance: <>What funders look for: investability and scale strategy. How to build <strong>operational readiness.</strong> Designing and running impactful fellowship programs. From her background as <strong>COO at Taleemabad.</strong></>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sarah-farooq/' }, { label: 'Acumen →', href: 'https://acumen.org/' }],
  },
  {
    init: 'NS', num: 'F.05', name: 'Nadir Shams', role: 'Founder, Friends of Pakistan Society & Fund',
    org: <>The Friends of Pakistan Society &amp; Fund catalyzes transformational social change and <strong>supports social entrepreneurs driving systems-level improvements</strong> across the country.</>,
    relevance: <>What global and diaspora capital requires from social enterprises. How to position your work for systemic-level funding. <strong>Portfolio strategy and ecosystem building</strong> from his perspective as a funder. From his background in impact evaluation, leadership at One Acre Fund and Skoll Foundation, and ecosystem-level work.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/nadirshams/' }, { label: 'Friends of Pakistan →', href: 'https://fopk.org/' }],
  },
  {
    init: 'RK', num: 'F.06', name: 'Riaz Ahmed Kamlani', role: 'Chief Operating Officer, The Citizens Foundation',
    org: <>The Citizens Foundation is <strong>Pakistan&rsquo;s largest community-based education organization</strong>, operating thousands of schools across Pakistan and providing free quality education to hundreds of thousands of underserved children through decentralized, community-managed school units.</>,
    relevance: <>Building <strong>sustainable, self-managed operational models.</strong> Managing critical operations while maintaining impact in resource-constrained environments. Scaling education at massive scale across decentralized, community-managed units. From 17 years as COO at TCF and prior experience at Shell International.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/riaz-ahmed-kamlani-38b1a04/' }, { label: 'The Citizens Foundation →', href: 'https://www.tcf.org.pk/' }],
  },
];

const ORGANIZERS: Person[] = [
  {
    init: 'HY', num: 'O.01', name: 'Haroon Yasin', role: 'Founder & CEO, Taleemabad',
    org: <><strong>Taleemabad is Pakistan&rsquo;s largest ed-tech organization</strong>, transforming learning for millions of children through digital platforms, public school integrations, and engaging multimodal content.</>,
    relevance: <>Co-host. How Taleemabad evolved <strong>from an evening school in the slums to a national enterprise.</strong> Building government partnerships. Scaling ed-tech at national scale.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/haroon-yasin/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'SA', num: 'O.02', name: 'Sabeena Abbasi', role: 'Chief Sustainability & Impact Officer, Taleemabad',
    org: <>Taleemabad ensures equitable, high-quality digital learning by delivering standardized curriculum through engaging content, directly targeting <strong>massive gaps in foundational literacy.</strong></>,
    relevance: <>Designing programmatic models with <strong>measurable impact.</strong> Building long-term sustainability and inclusive learning design. Community-of-practice strategies for scale.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sabeena-abbasi/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'AH', num: 'O.03', name: 'Abida Hassan', role: 'Sr. General Manager - Operations, ChildLife Foundation',
    org: <>ChildLife Foundation modernizes public sector hospitals by running <strong>high-tech, free-of-cost pediatric emergency rooms</strong> across Sindh, Balochistan, and Punjab.</>,
    relevance: <><strong>On-the-ground operational execution</strong> at scale. Logistics, team management, and operational resilience. How to sustain growth while scaling rapidly.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/abida-hassan-clf/' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'MJ', num: 'O.04', name: 'Muhammad Usman Javed', role: 'Head of Business Strategy & Fundraising, Taleemabad',
    org: <>Taleemabad is a pioneering social enterprise leveraging <strong>AI and digital content</strong> to replace outdated educational models in Pakistan with highly scalable, adaptive learning solutions.</>,
    relevance: <>Strategic planning and goal-setting for scale. Building <strong>high-leverage frameworks</strong> for founders. Orchestrating strategic partnerships at ecosystem level. (Organizing the retreat itself!)</>,
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
