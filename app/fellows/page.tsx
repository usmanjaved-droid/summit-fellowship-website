import Link from 'next/link';
import { getAllFellows } from '@/lib/fellows';
import FellowsBits, { type Fellow } from '../components/FellowsBits';

export const metadata = {
  title: 'The Fellows — Summit Fellowship 2026',
  description: 'The 2026 fellows: eleven Pakistani founders building solutions designed for scale.',
};

const FELLOWS_DATA: { [key: string]: any } = {
  'rubeena-kidwai': { email: 'rubeena@taskeen.org', phone: '+92 300 2126284', model: 'Provides mental health support through helplines and counseling services to reduce stigma and increase awareness in Pakistan. Played a key role in decriminalizing suicide.' },
  'azima-dhanjee': { email: 'azima@connecthear.org', phone: '+92 331 2610146', model: 'Makes hearing aids affordable and accessible to low-income hearing-impaired people through innovative design and financing options.' },
  'habiba-banu': { email: 'habiba.banu@spiro.ngo', phone: '+44 7703 563 810', model: "Provides affordable respiratory care and asthma management tools for low-income patients, addressing the gap in diagnostic capabilities in Pakistan's healthcare system." },
  'saad-hussain': { email: 'saad.hussain@awaazesehat.com', phone: '+92 333 4217251', model: 'Uses AI-powered voice-activated technology in Urdu to help health workers detect maternal health risks early. Improved risk detection from 7% to 40% in pilot testing.' },
  'lala-rukh': { email: 'lalah_rukh@hotmail.com', phone: '+92 321 1288701', model: 'Brings STEM education to underserved students through hands-on activities and shows. Impacted 45,000 children and trained 650 teachers across 250 schools in Pakistan.' },
  'khushbakht-shah': { email: 'khushbakhtlaw@gmail.com', phone: '+92 335 2350668', model: 'Uses AI to support domestic violence survivors in Pakistan by analyzing evidence, detecting bias, and generating legal briefs to help accelerate protection orders.' },
  'maira-siddiqui': { email: 'maira@chiraghtech.com', phone: '+92 345 3083194', model: "Turns Pakistan's school curriculum into gamified cartoons in local languages (Urdu, Punjabi, Pashto). Makes learning accessible via smartphone for grades nursery to 5." },
  'adnan-qureshi': { email: 'adnan.ahmed@teachtheworld.org', phone: '+92 340 0853633', model: 'Brings digital learning to underserved communities through MicroSchools and smartphone apps. Currently serves 14,317 students across 141 schools with plans to expand significantly.' },
  'muhammad-waqas': { email: 'mwaqas@wondertree.co', phone: '+92 333 3228386', model: 'Creates augmented reality games to help children with special needs (autism, cerebral palsy, ADHD) develop physical, cognitive, and social skills. Operating in 45 Pakistani schools.' },
  'ali-siddiq': { email: 'ali@amalacademy.org', phone: '+92 300 8443979', model: 'Bridges the gap between university education and the job market through a 3-month fellowship teaching critical thinking and professional skills. 81% of graduates are employed within 3 months.' },
  'osama-shahid': { email: 'sobyagengineers@gmail.com', phone: '+92 321 8626068', model: 'Empowers marginalized communities through fair trade practices and direct market linkages, ensuring farmers and artisans receive fair prices for their products.' },
};

const deepFellows = getAllFellows();
const FELLOWS: Fellow[] = deepFellows.map((fellow, index) => {
  const extraData = FELLOWS_DATA[fellow.id] || {};
  const initials = fellow.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return {
    id: index + 1,
    slug: fellow.id,
    init: initials,
    name: fellow.name,
    org: fellow.org,
    sector: fellow.sector,
    model: extraData.model || '',
    email: extraData.email || '',
    phone: extraData.phone || '',
    linkedin: fellow.fellow_linkedin,
    website: fellow.org_url,
    photo_url: fellow.photo_url || undefined,
  };
});

export default function FellowsPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Fellows Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs">
            <Link href="/">Home</Link><span>/</span><span>Fellows</span>
          </div>
          <h1 className="page-hero__title">
            Eleven founders.<br />
            <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>One ascent.</em>
          </h1>
          <p className="page-hero__subtitle">
            The 2026 fellows span mental health to special education, AI-powered legal aid to
            gamified curriculum. Each leader passed a rigorous selection — now they redesign for
            millions.
          </p>
        </div>
      </section>

      <FellowsBits fellows={FELLOWS} />
    </>
  );
}
