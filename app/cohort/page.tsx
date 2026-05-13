import Link from 'next/link';
import CohortBits, { type Fellow } from '../components/CohortBits';

export const metadata = {
  title: 'The Cohort — Summit Fellowship 2026',
  description: 'The 2026 cohort: eleven Pakistani founders building solutions designed for scale.',
};

const FELLOWS: Fellow[] = [
  { id: 1, init: 'RK', name: 'Dr. Rubeena Kidwai', org: 'Taskeen Health Initiative', sector: 'Mental Health', model: 'Provides mental health support through helplines and counseling services to reduce stigma and increase awareness in Pakistan. Played a key role in decriminalizing suicide.', email: 'rubeena@taskeen.org', phone: '+92 300 2126284', linkedin: 'https://pk.linkedin.com/in/rubeena-kidwai-63768634', website: 'https://taskeen.org/' },
  { id: 2, init: 'AD', name: 'Azima Dhanjee', org: 'ConnectHear', sector: 'Disability', model: 'Makes hearing aids affordable and accessible to low-income hearing-impaired people through innovative design and financing options.', email: 'azima@connecthear.org', phone: '+92 331 2610146', linkedin: 'https://www.linkedin.com/in/azimadhanjee', website: 'https://www.connecthear.org/' },
  { id: 3, init: 'HB', name: 'Habiba Banu', org: 'Spiro', sector: 'Health', model: "Provides affordable respiratory care and asthma management tools for low-income patients, addressing the gap in diagnostic capabilities in Pakistan's healthcare system.", email: 'habiba.banu@spiro.ngo', phone: '+44 7703 563 810', linkedin: 'https://uk.linkedin.com/in/habiba-banu', website: 'https://www.spiro.ngo/' },
  { id: 4, init: 'SH', name: 'Saad Hussain', org: 'Awaaz-e-Sehat Foundation', sector: 'Health', model: 'Uses AI-powered voice-activated technology in Urdu to help health workers detect maternal health risks early. Improved risk detection from 7% to 40% in pilot testing.', email: 'saad.hussain@awaazesehat.com', phone: '+92 333 4217251', linkedin: 'https://www.linkedin.com/in/saad-h', website: 'https://www.awaazesehat.com/' },
  { id: 5, init: 'LR', name: 'Lala Rukh Fazal-Ur-Rahman', org: 'Science Fuse', sector: 'Education', model: 'Brings STEM education to underserved students through hands-on activities and shows. Impacted 45,000 children and trained 650 teachers across 250 schools in Pakistan.', email: 'lalah_rukh@hotmail.com', phone: '+92 321 1288701', linkedin: 'https://pk.linkedin.com/in/lala-rukh-fazal-ur-rahman-73735a95', website: 'https://sciencefuse.com/' },
  { id: 6, init: 'KJ', name: 'Khushbakht Shah Jillani', org: 'Mehfooz AI', sector: 'Legal', model: 'Uses AI to support domestic violence survivors in Pakistan by analyzing evidence, detecting bias, and generating legal briefs to help accelerate protection orders.', email: 'khushbakhtlaw@gmail.com', phone: '+92 335 2350668', linkedin: 'https://www.linkedin.com/in/khushbakhtshahjillani/', website: 'https://mehfooz.ai/' },
  { id: 7, init: 'MS', name: 'Maira Siddiqui', org: 'Chiragh Education Technologies', sector: 'Education', model: "Turns Pakistan's school curriculum into gamified cartoons in local languages (Urdu, Punjabi, Pashto). Makes learning accessible via smartphone for grades nursery to 5.", email: 'maira@chiraghtech.com', phone: '+92 345 3083194', linkedin: 'https://www.linkedin.com/in/maira-siddiqui-chiragh-edtech', website: 'https://chiraghtech.com/' },
  { id: 8, init: 'AQ', name: 'Adnan Qureshi', org: 'Teach the World Foundation', sector: 'Education', model: 'Brings digital learning to underserved communities through MicroSchools and smartphone apps. Currently serves 14,317 students across 141 schools with plans to expand significantly.', email: 'adnan.ahmed@teachtheworld.org', phone: '+92 340 0853633', linkedin: 'https://www.linkedin.com/in/adnanahmedqureshi/', website: 'https://www.teachtheworldfoundation.com/' },
  { id: 9, init: 'MW', name: 'Muhammad Waqas', org: 'WonderTree', sector: 'Special Ed', model: 'Creates augmented reality games to help children with special needs (autism, cerebral palsy, ADHD) develop physical, cognitive, and social skills. Operating in 45 Pakistani schools.', email: 'mwaqas@wondertree.co', phone: '+92 333 3228386', linkedin: 'https://www.linkedin.com/in/mwwaqas/', website: 'https://wondertree.co/' },
  { id: 10, init: 'AS', name: 'Ali Siddiq', org: 'Amal Academy', sector: 'Livelihoods', model: 'Bridges the gap between university education and the job market through a 3-month fellowship teaching critical thinking and professional skills. 81% of graduates are employed within 3 months.', email: 'ali@amalacademy.org', phone: '+92 300 8443979', linkedin: 'https://www.linkedin.com/in/alisiddiq/', website: 'https://www.amalacademy.org/' },
  { id: 11, init: 'OS', name: 'Osama Shahid', org: 'Soby Trading Co', sector: 'Agriculture', model: 'Empowers marginalized communities through fair trade practices and direct market linkages, ensuring farmers and artisans receive fair prices for their products.', email: 'sobyagengineers@gmail.com', phone: '+92 321 8626068', linkedin: 'https://www.linkedin.com/in/osama-shahid-059b381a5/', website: 'https://www.sobyagro.co/' },
];

export default function CohortPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Cohort Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs">
            <Link href="/">Home</Link><span>/</span><span>Cohort</span>
          </div>
          <h1 className="page-hero__title">
            Eleven founders.<br />
            <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>One ascent.</em>
          </h1>
          <p className="page-hero__subtitle">
            The 2026 cohort spans mental health to special education, AI-powered legal aid to
            gamified curriculum. Each leader passed a rigorous selection — now they redesign for
            millions.
          </p>
          <div className="page-hero__meta">
            <div className="page-hero__meta-item"><span className="label">Cohort</span><span className="value">11 founders</span></div>
            <div className="page-hero__meta-item"><span className="label">Sectors</span><span className="value">9 distinct</span></div>
            <div className="page-hero__meta-item"><span className="label">Combined reach</span><span className="value">~70,000+ today</span></div>
            <div className="page-hero__meta-item"><span className="label">Goal</span><span className="value">Millions, by 2030</span></div>
          </div>
        </div>
      </section>

      <CohortBits fellows={FELLOWS} />
    </>
  );
}
