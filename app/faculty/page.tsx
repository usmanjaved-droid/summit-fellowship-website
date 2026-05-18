import Link from 'next/link';
import Image from 'next/image';

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
  photo_url?: string | null;
  links: { label: string; href: string }[];
};

const FACULTY: Person[] = [
  {
    init: 'KS', num: 'F.01', name: 'Kevin Starr', role: 'CEO, Mulago Foundation',
    photo_url: '/images/faculty/Kevin Starr.jpeg',
    org: <>Doctor-turned-funder who built Mulago Foundation into a catalyst for scalable solutions to poverty. Created frameworks that hundreds of social entrepreneurs use to design for massive scale. Early funder of Digital Green, One Acre Fund, Living Goods, and other <strong>billion-impact organizations.</strong></>,
    relevance: <>Your big questions about the <strong>design and strategy</strong> to get your solution to scale. Who's the doer? Who's the payer? The questions that separate thinking-at-scale from thinking-at-startup.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/kevin-starr-mulago/' }, { label: 'Mulago Foundation →', href: 'https://www.mulagofoundation.org/' }],
  },
  {
    init: 'AR', num: 'F.02', name: 'Dr. Ahson Rabbani', role: 'CEO, ChildLife Foundation',
    photo_url: '/images/faculty/Dr.-Ahson-Rabbani.jpg',
    org: <>From multinational leadership (GE, ExxonMobil) to founding ChildLife Foundation. Manages pediatric emergency rooms across Pakistan&rsquo;s public hospitals, <strong>reduced child mortality tenfold</strong> in facilities under ChildLife management, treats 2M+ children annually through telemedicine reaching 90% of Pakistan&rsquo;s population.</>,
    relevance: <>Building government partnerships that become permanent fixtures. Scaling emergency pediatric care across public hospitals. <strong>Proving impact with rigor</strong>—the data and methods to measure whether you&rsquo;re actually reducing child mortality. Governance structures that ensure organizational integrity as you grow.</>,
    links: [{ label: 'LinkedIn →', href: 'https://pk.linkedin.com/in/dr-ahson-rabbani-694b4517' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'SK', num: 'F.03', name: 'Dr. Sara Saeed Khurram', role: 'Co-Founder & CEO, Sehat Kahani',
    photo_url: '/images/faculty/Sara Saeed.jpg',
    org: <>Co-founder of Sehat Kahani. Solved the <strong>&quot;Doctor Bride&quot; problem</strong> by activating 8,000+ female doctors into meaningful work. Delivered 3.1M telemedicine consultations across rural Pakistan, serving <strong>10M+ lives.</strong></>,
    relevance: <>Inclusive healthcare systems through telemedicine in culturally complex markets. <strong>Activating female doctors</strong> into meaningful work—solving barriers when culture and infrastructure both matter. Building trust and behavior change. Government partnerships (PPP) as your scaling engine. The discipline of <strong>&quot;cheap enough&quot;</strong>: how rigorous cost modeling separates scaling dreams from reality.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/dr-sara-saeed-khurram-9a8873aa/' }, { label: 'Sehat Kahani →', href: 'https://sehatkahani.com/' }],
  },
  {
    init: 'SF', num: 'F.04', name: 'Sarah Farooq', role: 'Associate Director, Fellowship at Acumen',
    photo_url: '/images/faculty/Sarah-Farooq.jpg',
    org: <>Built and scaled 3 social enterprises addressing poverty. <strong>Scaled Amal Academy and served as COO at Taleemabad during explosive growth.</strong> Now leads Acumen&rsquo;s global fellowship program developing the next generation of founders.</>,
    relevance: <>Scaling from startup founder to funder mindset. <strong>Franchise + partnership models</strong> that multiply impact without capital. Unit economics that prove your model works before the 100x push.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sarahfarooq/' }, { label: 'Acumen →', href: 'https://acumen.org/' }],
  },
  {
    init: 'NS', num: 'F.05', name: 'Nadir Shams', role: 'Founder, Friends of Pakistan Society & Fund',
    photo_url: '/images/faculty/Nadir Shams.png',
    org: <>Built impact evaluation systems and led strategy at One Acre Fund and Skoll Foundation. Founded Friends of Pakistan, a <strong>$100M+ intermediary</strong> deploying patient capital to Pakistani social enterprises and building ecosystems for systems-level change.</>,
    relevance: <>What <strong>diaspora and global capital</strong> actually fund and why. How narratives around Pakistan shape entrepreneurship, philanthropy, and investment flows. <strong>Ecosystem building and systems change</strong> — positioning your work for long-term structural impact.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/nadirshams/' }, { label: 'Friends of Pakistan →', href: 'https://fopk.org/' }],
  },
  {
    init: 'RK', num: 'F.06', name: 'Riaz Ahmed Kamlani', role: 'Chief Operating Officer, The Citizens Foundation',
    photo_url: '/images/faculty/Riaz Kamlani.png',
    org: <>Scaled from Shell International operations to build Citizens Foundation into <strong>Pakistan&rsquo;s largest community-based education organization.</strong> Manages 2,800+ decentralized schools serving 400,000+ children, pioneered teacher training systems that improve learning outcomes in resource-constrained settings.</>,
    relevance: <>Decentralized operations at massive scale. <strong>Building sustainable models in resource-constrained environments</strong> where communities own and manage the outcomes. Turning cost into competitive advantage.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/riaz-ahmed-kamlani-38b1a04/' }, { label: 'The Citizens Foundation →', href: 'https://www.tcf.org.pk/' }],
  },
];

const ADVISORS: Person[] = [
  {
    init: 'AK', num: 'A.01', name: 'Dr. Asyia Kazmi', role: 'CEO, WISE (World Innovation Summit for Education)',
    photo_url: '/images/faculty/dr.-asyia-kazmi.jpg',
    org: <>Over 30 years transforming education globally. At the Gates Foundation, improved literacy outcomes by <strong>16% for 8 million children</strong> in Uttar Pradesh and established an EdTech and AI portfolio reaching 2.5 million learners. Led PwC's Girls' Education Challenge, a <strong>$1 billion fund supporting 1.5 million girls</strong> across 17 countries. OBE recipient for services to education. PhD in Education from UCL, Master's in Applied Mathematics from Imperial College.</>,
    relevance: <>Education policy and innovation at scale. <strong>EdTech and AI integration</strong> that improves learning outcomes. Building government partnerships for systemic education reform. How to design and test interventions before scaling to millions. The evidence and rigor needed to prove what works.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/dr-asyia-k-08495055' }, { label: 'WISE →', href: 'https://www.wise-qatar.org/' }],
  },
  {
    init: 'MI', num: 'A.02', name: 'Mubarik Imam', role: 'Former Head of Growth, Analytics & Strategy, WhatsApp',
    photo_url: '/images/faculty/Mubarik Imam.jpeg',
    org: <>Pakistan-born, first 25 employees at WhatsApp. Built and led product, growth, integrity, analytics, and strategy teams scaling WhatsApp from <strong>200M to 1.9B+ users</strong> over seven years. Founder of the Association for the Development of Pakistan. Granddaughter of the founder of LUMS. MIT (Electrical Engineering), Harvard Kennedy School (MPA/ID), Stanford GSB (MBA).</>,
    relevance: <>Scaling globally without losing focus. <strong>Product discipline and strategic focus</strong>—how to say no to 99 good ideas to execute one great idea. Building platforms that reach billions. Pakistani diaspora networks and home-country connections. How founders think at billion-user scale.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/mubarik-imam-a914842' }],
  },
  {
    init: 'AW', num: 'A.03', name: 'Aleem Walji', role: 'Founder & CEO, 5in5 Impact Alliance',
    photo_url: '/images/faculty/Aleem Walji.jpg',
    org: <>Former Chief Innovation Advisor at the World Bank Group, CEO of Aga Khan Foundation in Syria, and Head of Global Development Initiatives at Google.org. Leading 5in5 Impact Alliance to improve <strong>literacy and numeracy for 5 million children in 5 years</strong>. Focuses on identifying and scaling proven, cost-effective education solutions through government partnerships.</>,
    relevance: <>Innovation in last-mile delivery and government scaling. How to identify and test solutions before taking them to scale. <strong>Working with governments as the primary customer</strong> for scaling education. Measuring cost-effectiveness and impact rigor. Surfacing and scaling innovations that actually move the needle on learning outcomes.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/aleem-walji-73403b7/' }, { label: '5in5 →', href: 'https://5in5.education/' }],
  },
  {
    init: 'SG', num: 'A.04', name: 'Shikha Goyal', role: 'CEO, Vitol Foundation',
    photo_url: '/images/faculty/Shikha Goyal.jpeg',
    org: <>Over 18 years working across development and private sectors. At CIFF (Children's Investment Fund Foundation), managed a portfolio of <strong>over $60 million</strong> improving literacy and numeracy for children in India and Sub-Saharan Africa. Invested in Educate Girls India (world's first education development impact bond), Tayari (serving 1,500+ schools in Kenya), and Early Learning Partnership with the World Bank. Venture Partner at Imaginable Futures leading strategy and investments across Africa. Kauffman Fellow and board member of Innovation Edge and SPARK Schools.</>,
    relevance: <>Venture capital and impact investing in education. Building <strong>development impact bonds</strong> that align financial returns with social outcomes. Identifying and scaling education innovations across Africa. How to structure investments that blend commercial and development thinking. Board governance and scaling impact through venture models.</>,
    links: [{ label: 'LinkedIn →', href: 'https://uk.linkedin.com/in/shikhagoyal29' }, { label: 'Vitol Foundation →', href: 'https://vitol-foundation.com/' }],
  },
];

const ORGANIZERS: Person[] = [
  {
    init: 'HY', num: 'O.01', name: 'Haroon Yasin', role: 'Founder & CEO, Taleemabad',
    photo_url: '/images/faculty/haroon-yasin.jpg',
    org: <>Dropped out at 18 to teach in Islamabad slums. Founded Taleemabad in 2015 to reach <strong>10M+ children</strong> through multimodal ed-tech when traditional schooling couldn&rsquo;t scale fast enough.</>,
    relevance: <>From evening classes in the slums to <strong>millions of learners nationwide.</strong> Government partnerships that create defensible scale. Building the infrastructure of public education 2.0. (Also co-hosting this retreat!)</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/haroon-yasin-632b54158/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'SA', num: 'O.02', name: 'Sabeena Abbasi', role: 'Chief Sustainability & Impact Officer, Taleemabad',
    photo_url: '/images/faculty/Sabeena Abbasi.jpg',
    org: <>Pioneered learning design systems at scale. Developed Pakistan&rsquo;s first digital teacher training program, created animated curriculum <strong>adding 1.5 years of learning gains.</strong> Empowered marginalized women through market access and skills training.</>,
    relevance: <>Impact measurement that drives decisions. <strong>Inclusive learning design</strong> that doesn&rsquo;t sacrifice quality. Building sustainable models through community learning networks, not top-down lectures.</>,
    links: [{ label: 'LinkedIn →', href: 'https://pk.linkedin.com/in/sabeena-abbasi-7aa64239' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
  {
    init: 'AH', num: 'O.03', name: 'Abida Hassan', role: 'Sr. General Manager - Operations, ChildLife Foundation',
    photo_url: '/images/faculty/Ms-Abida-Hassan.jpg',
    org: <>Led hospital operations across Pakistan&rsquo;s most demanding healthcare settings. Manages operations <strong>scaling ChildLife&rsquo;s pediatric emergency care</strong> across multiple provinces, implementing quality systems in public-sector hospitals with limited resources.</>,
    relevance: <>Operational excellence under real constraints. <strong>Scaling across geographies</strong> while maintaining quality. Building resilient logistics and teams that sustain growth in the chaos of public-sector healthcare.</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/abida-hassan/' }, { label: 'ChildLife Foundation →', href: 'https://childlifefoundation.org/' }],
  },
  {
    init: 'MJ', num: 'O.04', name: 'Muhammad Usman Javed', role: 'Head of Business Strategy & Fundraising, Taleemabad',
    photo_url: '/images/faculty/Usman Javed.jpeg',
    org: <>Leads strategic partnerships at Taleemabad, <strong>orchestrating ecosystem collaborations</strong> and exploring AI-powered content creation to scale teaching capacity across Pakistan.</>,
    relevance: <>Strategic frameworks that founders actually use. <strong>Fundraising at scale</strong> (local + diaspora + international). Orchestrating partnerships that multiply your reach. (Also organizing this whole retreat!)</>,
    links: [{ label: 'LinkedIn →', href: 'https://www.linkedin.com/in/itsusmanhere/' }, { label: 'Taleemabad →', href: 'https://taleemabad.com/' }],
  },
];

function PersonCard({ p }: { p: Person }) {
  return (
    <article className="person">
      <div className="person__photo-col">
        {p.photo_url ? (
          <Image
            src={p.photo_url}
            alt={p.name}
            width={200}
            height={280}
            className="person__photo"
          />
        ) : (
          <div className="person__avatar-large">{p.init}</div>
        )}
      </div>
      <div className="person__middle-col">
        <div className="person__header">
          <h3 className="person__name">{p.name}</h3>
          <div className="person__role">{p.role}</div>
        </div>
        <div className="person__story">
          <h4>Their Story</h4>
          <p>{p.org}</p>
        </div>
      </div>
      <div className="person__right-col">
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

      <section className="faculty-section faculty-section--alt" id="advisors">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 40 }}>Advisors</h2>
          <div className="faculty-grid">
            {ADVISORS.map((p) => <PersonCard key={p.num} p={p} />)}
          </div>
        </div>
      </section>

      <section className="faculty-section" id="organizers">
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
