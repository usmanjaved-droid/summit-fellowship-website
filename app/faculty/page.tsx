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
    org: <>Doctor-turned-funder who built Mulago Foundation into a catalyst for scalable solutions to poverty. Created frameworks that hundreds of social entrepreneurs use to design for massive scale. Early funder of Digital Green, One Acre Fund, Living Goods, and other <strong>billion-impact organizations.</strong></>,
    relevance: <>Your big questions about the <strong>design and strategy</strong> to get your solution to scale. Who's the doer? Who's the payer? The questions that separate thinking-at-scale from thinking-at-startup.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/kevin-starr' }, { label: 'Mulago Foundation →', href: 'https://www.mulagofoundation.org/' }],
  },
  {
    init: 'AR', num: 'F.02', name: 'Dr. Ahson Rabbani', role: 'CEO, ChildLife Foundation',
    org: <>From multinational leadership (GE, ExxonMobil) to founding ChildLife Foundation. Manages pediatric emergency rooms across Pakistan&rsquo;s public hospitals, <strong>reduced child mortality tenfold</strong> in facilities under ChildLife management, treats 2M+ children annually through telemedicine reaching 90% of Pakistan&rsquo;s population.</>,
    relevance: <>Building government partnerships that become permanent fixtures. Scaling emergency pediatric care across public hospitals. <strong>Proving impact with rigor</strong>—the data and methods to measure whether you&rsquo;re actually reducing child mortality. Governance structures that ensure organizational integrity as you grow.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/ahson-rabbani/' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'SK', num: 'F.03', name: 'Dr. Sara Saeed Khurram', role: 'Co-Founder & CEO, Sehat Kahani',
    org: <>Co-founder of Sehat Kahani. Solved the <strong>&quot;Doctor Bride&quot; problem</strong> by activating 8,000+ female doctors into meaningful work. Delivered 3.1M telemedicine consultations across rural Pakistan, serving <strong>10M+ lives.</strong></>,
    relevance: <>Inclusive healthcare systems through telemedicine in culturally complex markets. <strong>Activating female doctors</strong> into meaningful work—solving barriers when culture and infrastructure both matter. Building trust and behavior change. Government partnerships (PPP) as your scaling engine. The discipline of <strong>&quot;cheap enough&quot;</strong>: how rigorous cost modeling separates scaling dreams from reality.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/dr-sara-saeed-khurram/' }, { label: 'Sehat Kahani →', href: 'https://sehatkahani.com/' }],
  },
  {
    init: 'SF', num: 'F.04', name: 'Sarah Farooq', role: 'Associate Director, Fellowship at Acumen',
    org: <>Built and scaled 3 social enterprises addressing poverty. <strong>Scaled Amal Academy and served as COO at Taleemabad during explosive growth.</strong> Now leads Acumen&rsquo;s global fellowship program developing the next generation of founders.</>,
    relevance: <>Scaling from startup founder to funder mindset. <strong>Franchise + partnership models</strong> that multiply impact without capital. Unit economics that prove your model works before the 100x push.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sarah-farooq/' }, { label: 'Acumen →', href: 'https://acumen.org/' }],
  },
  {
    init: 'NS', num: 'F.05', name: 'Nadir Shams', role: 'Founder, Friends of Pakistan Society & Fund',
    org: <>Built impact evaluation systems and led strategy at One Acre Fund and Skoll Foundation. Founded Friends of Pakistan, a <strong>$100M+ intermediary</strong> deploying patient capital to Pakistani social enterprises and building ecosystems for systems-level change.</>,
    relevance: <>What <strong>diaspora and global capital</strong> actually fund and why. How narratives around Pakistan shape entrepreneurship, philanthropy, and investment flows. <strong>Ecosystem building and systems change</strong> — positioning your work for long-term structural impact.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/nadirshams/' }, { label: 'Friends of Pakistan →', href: 'https://fopk.org/' }],
  },
  {
    init: 'RK', num: 'F.06', name: 'Riaz Ahmed Kamlani', role: 'Chief Operating Officer, The Citizens Foundation',
    org: <>Scaled from Shell International operations to build Citizens Foundation into <strong>Pakistan&rsquo;s largest community-based education organization.</strong> Manages 2,800+ decentralized schools serving 400,000+ children, pioneered teacher training systems that improve learning outcomes in resource-constrained settings.</>,
    relevance: <>Decentralized operations at massive scale. <strong>Building sustainable models in resource-constrained environments</strong> where communities own and manage the outcomes. Turning cost into competitive advantage.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/riaz-ahmed-kamlani-38b1a04/' }, { label: 'The Citizens Foundation →', href: 'https://www.tcf.org.pk/' }],
  },
];

const ORGANIZERS: Person[] = [
  {
    init: 'HY', num: 'O.01', name: 'Haroon Yasin', role: 'Founder & CEO, Taleemabad',
    org: <>Dropped out at 18 to teach in Islamabad slums. Founded Taleemabad in 2015 to reach <strong>10M+ children</strong> through multimodal ed-tech when traditional schooling couldn&rsquo;t scale fast enough.</>,
    relevance: <>From evening classes in the slums to <strong>millions of learners nationwide.</strong> Government partnerships that create defensible scale. Building the infrastructure of public education 2.0. (Also co-hosting this retreat!)</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/haroon-yasin/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'SA', num: 'O.02', name: 'Sabeena Abbasi', role: 'Chief Sustainability & Impact Officer, Taleemabad',
    org: <>Pioneered learning design systems at scale. Developed Pakistan&rsquo;s first digital teacher training program, created animated curriculum <strong>adding 1.5 years of learning gains.</strong> Empowered marginalized women through market access and skills training.</>,
    relevance: <>Impact measurement that drives decisions. <strong>Inclusive learning design</strong> that doesn&rsquo;t sacrifice quality. Building sustainable models through community learning networks, not top-down lectures.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sabeena-abbasi/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'AH', num: 'O.03', name: 'Abida Hassan', role: 'Sr. General Manager - Operations, ChildLife Foundation',
    org: <>Led hospital operations across Pakistan&rsquo;s most demanding healthcare settings. Manages operations <strong>scaling ChildLife&rsquo;s pediatric emergency care</strong> across multiple provinces, implementing quality systems in public-sector hospitals with limited resources.</>,
    relevance: <>Operational excellence under real constraints. <strong>Scaling across geographies</strong> while maintaining quality. Building resilient logistics and teams that sustain growth in the chaos of public-sector healthcare.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/abida-hassan-clf/' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'MJ', num: 'O.04', name: 'Muhammad Usman Javed', role: 'Head of Business Strategy & Fundraising, Taleemabad',
    org: <>Leads strategic partnerships at Taleemabad, <strong>orchestrating ecosystem collaborations</strong> and exploring AI-powered content creation to scale teaching capacity across Pakistan.</>,
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
