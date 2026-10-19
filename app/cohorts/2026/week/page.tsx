import Link from 'next/link';
import ItineraryBits, { type Day } from '@/app/components/ItineraryBits';

export const metadata = {
  title: 'The Week — 2026 Cohort — Friends of Pakistan Fellowship',
};

const CUTOFF = { time: '23:00', title: 'Cut-off · 11 pm', cutoff: true };

const DAYS: Day[] = [
  {
    num: 'Day 00', shortTitle: 'Arrivals', date: 'Sun · 07 Jun',
    meta: 'Day 00 · Sunday, 07 June 2026',
    title: <>Arrivals<br />&amp; <em>welcome.</em></>,
    summary: 'Staggered arrivals into Skardu throughout the day. The team handles airport pickups and transfers; rooms are ready, tea is on. The day ends with a relaxed welcome dinner and an orientation that sets the norms for the week ahead.',
    pills: [{ label: 'Welcome dinner', cls: 'tag-meal' }, { label: 'Orientation', cls: 'tag-core' }],
    rows: [
      { time: '07:00', end: 'All day', title: 'Arrivals and check-in', tags: [{ label: 'Logistics', cls: 'tag-outdoor' }], desc: 'Staggered arrivals into Skardu. Airport pickups and transfers to venue.', bullets: ['Check-in and room settle-in', 'Welcome tea available', 'Free time / rest'] },
      { time: '18:30', end: '— 19:30', title: 'Welcome dinner', tags: [{ label: 'Meal', cls: 'tag-meal' }], desc: 'Relaxed seated dinner. Informal introductions as fellows arrive.' },
      { time: '19:30', end: '— 21:00', title: 'Orientation', tags: [{ label: 'Core', cls: 'tag-core' }], bullets: ['Introductions (fellows + faculty)', 'Welcome note from Mulago & Taleemabad', 'Norm setting — presence, feedback, ground rules', 'What to expect in the coming week'] },
      { time: '21:00', end: 'onwards', title: 'Free time', tags: [{ label: 'Evening', cls: 'tag-eve' }], desc: 'Open networking. Early night recommended.' },
      CUTOFF,
    ],
  },
  {
    num: 'Day 01', shortTitle: 'Mulago basics', date: 'Mon · 08 Jun',
    meta: 'Day 01 · Monday, 08 June 2026',
    title: <>Mulago<br /><em>basics.</em></>,
    summary: <>The foundational day. Mission, Big Idea, Theory, Model, Behaviours — and the two questions everyone leaves Skardu with answers to: who is your <em>doer</em> and who is your <em>payer</em> at scale?</>,
    pills: [{ label: 'Core curriculum', cls: 'tag-core' }, { label: 'Design for impact at scale', cls: 'tag-outdoor' }],
    rows: [
      { time: '07:30', end: '— 08:30', title: 'Welcome breakfast', tags: [{ label: 'Meal', cls: 'tag-meal' }], desc: 'Mulago-style icebreaker.' },
      { time: '08:30', end: '— 09:00', title: 'Set-up and buffer', tags: [{ label: 'Buffer', cls: 'tag-break' }] },
      { time: '09:00', end: '— 10:30', title: 'Design for impact at scale', tags: [{ label: 'Core block', cls: 'tag-core' }], bullets: ['Mission — 8-word, outcome-focused', 'Big Idea — single phrase, ≤6 words', 'Theory — idea → behaviour → outcome'] },
      { time: '10:30', end: '— 11:00', title: 'Tea, coffee and snacks', tags: [{ label: 'Break', cls: 'tag-break' }] },
      { time: '11:00', end: '— 13:00', title: 'Design for impact at scale, part 2', tags: [{ label: 'Core block', cls: 'tag-core' }], bullets: ['The Model — 4 to 6 core elements', 'Behaviour Map + Drivers'] },
      { time: '13:00', end: '— 14:00', title: 'Prayer and lunch', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '14:00', end: '— 17:30', title: 'Doer and payer at scale, and scalability', tags: [{ label: 'Core block', cls: 'tag-core' }], bullets: ['Ultimate doer-at-scale', 'Ultimate payer-at-scale', 'Four Enoughs — Good, Big, Simple, Cheap', 'Progression of Evidence'] },
      { time: '17:30', end: '— 18:00', title: 'Prayer, tea and snacks', tags: [{ label: 'Break', cls: 'tag-break' }] },
      { time: '18:00', end: '— 19:30', title: 'Integration and synthesis', tags: [{ label: 'Core', cls: 'tag-core' }], desc: 'Reflection, peer feedback pairs, open Q&A with faculty. One-pager draft due.' },
      { time: '19:30', end: '— 21:00', title: 'Seated dinner', tags: [{ label: 'Meal', cls: 'tag-meal' }], desc: 'Free time / open networking.' },
      CUTOFF,
    ],
  },
  {
    num: 'Day 02', shortTitle: 'Scale strategy', date: 'Tue · 09 Jun',
    meta: 'Day 02 · Tuesday, 09 June 2026',
    title: <>Scale<br /><em>strategy.</em></>,
    summary: 'The Scale Screen framework, applied to your org. Impact evidence design. Lightning talks delivered at Shigar Fort, followed by a fireside chat with Kevin Starr.',
    pills: [{ label: 'Scale Screen', cls: 'tag-core' }, { label: 'Shigar Fort', cls: 'tag-outdoor' }, { label: 'Fireside w/ KS', cls: 'tag-eve' }],
    rows: [
      { time: '07:00', end: '— 07:30', title: 'Yoga, walk or meditation', tags: [{ label: 'Optional', cls: 'tag-break' }] },
      { time: '07:30', end: '— 08:30', title: 'Breakfast', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '09:00', end: '— 10:30', title: 'Scale strategy, part 1', tags: [{ label: 'Core', cls: 'tag-core' }], desc: 'The Scale Screen Framework.' },
      { time: '10:30', end: '— 11:00', title: 'Tea, coffee and snacks', tags: [{ label: 'Break', cls: 'tag-break' }] },
      { time: '11:00', end: '— 13:00', title: 'Scale strategy, part 2', tags: [{ label: 'Core', cls: 'tag-core' }], desc: 'Applying the Scale Screen to your own organisation.' },
      { time: '13:00', end: '— 14:00', title: 'Prayer and lunch', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '14:00', end: '— 15:00', title: 'Impact evidence, part 1', tags: [{ label: 'Core', cls: 'tag-core' }], desc: 'Levels of evidence, metrics hierarchy.' },
      { time: '15:00', end: '— 16:30', title: 'Impact evidence, part 2', tags: [{ label: 'Core', cls: 'tag-core' }], desc: 'Designing your evidence plan.' },
      { time: '17:00', end: '— 17:30', title: 'Travel to Shigar Fort', tags: [{ label: 'Off-site', cls: 'tag-outdoor' }], desc: '~15 minute transfer.' },
      { time: '17:30', end: '— 19:30', title: 'Fellows’ lightning talks', tags: [{ label: 'Off-site', cls: 'tag-outdoor' }], desc: '5 × 8-min talks + Q&A at Shigar Fort.' },
      { time: '19:30', end: '— 20:30', title: 'Dinner', tags: [{ label: 'Meal', cls: 'tag-meal' }], desc: 'Open networking.' },
      { time: '20:30', end: '— 21:30', title: 'Fireside with Kevin Starr', tags: [{ label: 'Evening', cls: 'tag-eve' }], desc: "Kevin's story + Q&A. Unfiltered." },
      { time: '21:30', end: '— 22:00', title: 'Travel back to Khoj', tags: [{ label: 'Transit', cls: 'tag-outdoor' }] },
      CUTOFF,
    ],
  },
  {
    num: 'Day 03', shortTitle: '1-on-1 clinics', date: 'Wed · 10 Jun',
    meta: 'Day 03 · Wednesday, 10 June 2026',
    title: <>1-on-1<br /><em>clinics.</em></>,
    summary: "The week's connective tissue. The entire day moves outdoors: structured 45-minute rotations with Pakistani faculty, lunch under the sky, sightseeing in the Shigar valley, and dinner at a local family's home.",
    pills: [{ label: 'Outdoor', cls: 'tag-outdoor' }, { label: "Dinner at a local's home", cls: 'tag-meal' }, { label: 'Skardu Bazar', cls: 'tag-eve' }],
    rows: [
      { time: '07:30', end: '— 08:30', title: 'Breakfast', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '08:30', end: '— 10:00', title: 'Travel to the outdoor location', tags: [{ label: 'Transit', cls: 'tag-outdoor' }], desc: 'Including arrival & setup.' },
      { time: '10:30', end: '— 13:00', title: 'Structured 1-on-1s, block A', tags: [{ label: 'Outdoor', cls: 'tag-outdoor' }], desc: '45-min rotations with Pakistani faculty.', bullets: ['Scaling strategy', 'Impact measurement', 'Iterative improvement', 'Design for impact at scale'] },
      { time: '13:00', end: '— 14:00', title: 'Lunch and prayers (outdoors)', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '14:00', end: '— 16:00', title: 'Structured 1-on-1s, block B', tags: [{ label: 'Outdoor', cls: 'tag-outdoor' }], desc: 'Second rotation, second set of faculty.' },
      { time: '16:00', end: '— 18:00', title: 'Sightseeing and activities', tags: [{ label: 'Outdoor', cls: 'tag-outdoor' }] },
      { time: '18:30', end: '— 20:00', title: 'Dinner at a local family’s home', tags: [{ label: 'Cultural', cls: 'tag-meal' }], desc: "A favourite of every cohort. Home-cooked Balti food, with stories that don't show up on any deck." },
      { time: '20:00', end: '— 21:00', title: 'Stop at Skardu Bazaar', tags: [{ label: 'Cultural', cls: 'tag-eve' }] },
      { time: '21:00', end: '— 22:30', title: 'Travel back to Khoj', tags: [{ label: 'Transit', cls: 'tag-outdoor' }] },
      CUTOFF,
    ],
  },
  {
    num: 'Day 04', shortTitle: 'Iterative organisation', date: 'Thu · 11 Jun',
    meta: 'Day 04 · Thursday, 11 June 2026',
    title: <>The iterative<br /><em>organisation.</em></>,
    summary: 'Theory, methods, data flows, and culture. Parallel afternoon tracks bring fellows into conversation with TCF, ChildLife, and the funders directly. Evening fireside with Dr. Asyia.',
    pills: [{ label: 'Iterative Org', cls: 'tag-core' }, { label: 'Parallel funder track', cls: 'tag-outdoor' }, { label: 'Fireside w/ Dr. Asyia', cls: 'tag-eve' }],
    rows: [
      { time: '07:00', end: '— 07:30', title: 'Yoga, walk or meditation', tags: [{ label: 'Optional', cls: 'tag-break' }] },
      { time: '07:30', end: '— 08:30', title: 'Breakfast', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '09:00', end: '— 13:00', title: 'The Iterative Organization', tags: [{ label: 'Core block', cls: 'tag-core' }], desc: 'Theory + Methods & Data Flows.', bullets: ['What it means / why it matters', 'Iteration methods', 'Data flows', 'Running tea + snacks at 11:30 (no formal break)'] },
      { time: '13:00', end: '— 14:00', title: 'Prayer and lunch', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '14:00', end: '— 17:00', title: 'Iterative organisation workshop, and people and culture', tags: [{ label: 'Workshop', cls: 'tag-core' }], desc: 'Apply theory to your own org. Includes the People / Culture module.' },
      { time: '17:00', end: '— 19:00', title: 'Parallel tracks: TCF × CLF, and funders', tags: [{ label: 'Conversation', cls: 'tag-outdoor' }], bullets: ['TCF × CLF — moderator: Haroon', 'Parallel: Kevin / Nadir × Funders', 'Running tea + snacks throughout'] },
      { time: '19:00', end: '— 20:00', title: 'Dinner', tags: [{ label: 'Meal', cls: 'tag-meal' }], desc: 'Open networking.' },
      { time: '20:00', end: '— 21:00', title: 'Fireside with Dr. Asyia Kazmi', tags: [{ label: 'Evening', cls: 'tag-eve' }] },
      CUTOFF,
    ],
  },
  {
    num: 'Day 05', shortTitle: 'Comms and pitch', date: 'Fri · 12 Jun',
    meta: 'Day 05 · Friday, 12 June 2026',
    title: <>Comms +<br /><em>pitching.</em></>,
    summary: "Clear language, narrative structure, and a 10-minute pitch. CEO spotlights with Sara Saeed and Aleem Walji. The week's centerpiece social: Cultural Night with local musicians, live BBQ, and open networking under the stars.",
    pills: [{ label: 'Comms theory', cls: 'tag-core' }, { label: 'Pitch coaching', cls: 'tag-outdoor' }, { label: 'Cultural night', cls: 'tag-eve' }],
    rows: [
      { time: '07:00', end: '— 07:30', title: 'Mindfulness or walk', tags: [{ label: 'Optional', cls: 'tag-break' }] },
      { time: '07:30', end: '— 08:30', title: 'Breakfast', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '09:00', end: '— 13:00', title: 'Communications: theory', tags: [{ label: 'Core block', cls: 'tag-core' }], bullets: ['Clear language & banned words', 'Narrative structure', '10-minute pitch structure', '“The pitch is dead, long live the conversation”'] },
      { time: '13:00', end: '— 14:00', title: 'Prayer and lunch', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '14:00', end: '— 17:00', title: 'Capacity clinic: build your pitch', tags: [{ label: '1:1 coaching', cls: 'tag-core' }], desc: 'Small group, facilitator-led. Participants draft their Demo Day pitch.' },
      { time: '17:00', end: '— 17:30', title: 'Tea and prayer break', tags: [{ label: 'Break', cls: 'tag-break' }] },
      { time: '17:30', end: '— 18:30', title: 'CEO spotlight: Sara Saeed', tags: [{ label: 'Spotlight', cls: 'tag-core' }] },
      { time: '18:30', end: '— 19:30', title: 'CEO spotlight: Aleem Walji', tags: [{ label: 'Spotlight', cls: 'tag-core' }] },
      { time: '19:30', end: '— 21:30', title: 'Cultural night', tags: [{ label: 'Cultural', cls: 'tag-eve' }], desc: 'Local musicians + live BBQ + open networking.' },
      CUTOFF,
    ],
  },
  {
    num: 'Day 06', shortTitle: 'Demo Day', date: 'Sat · 13 Jun',
    meta: 'Day 06 · Saturday, 13 June 2026',
    title: <>Demo Day<br />+ <em>closing.</em></>,
    summary: 'The culmination. Two blocks of fellow presentations, an interactive session with funders, and a closing celebration dinner. By tonight, every founder leaves with a model, a pitch, and the warm intros to put both to work.',
    pills: [{ label: 'Demo Day', cls: 'tag-core' }, { label: 'Closing dinner', cls: 'tag-eve' }],
    rows: [
      { time: '07:30', end: '— 08:30', title: 'Breakfast', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '09:00', end: '— 10:30', title: 'Final prep and dress rehearsal', tags: [{ label: 'Prep', cls: 'tag-core' }] },
      { time: '10:30', end: '— 13:00', title: 'Demo Day, block 1', tags: [{ label: 'Presentations', cls: 'tag-core' }], desc: 'First half of participant presentations.' },
      { time: '13:00', end: '— 14:00', title: 'Lunch and prayers', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '14:00', end: '— 16:00', title: 'Demo Day, block 2', tags: [{ label: 'Presentations', cls: 'tag-core' }], desc: 'Remaining presentations.' },
      { time: '16:00', end: '— 17:00', title: 'Interactive session with the funders', tags: [{ label: 'Q&A', cls: 'tag-core' }] },
      { time: '17:00', end: '— 18:00', title: 'Wrap-up: what’s next?', tags: [{ label: 'Closing', cls: 'tag-core' }] },
      { time: '18:00', end: '— 19:00', title: 'Open networking', tags: [{ label: 'Social', cls: 'tag-eve' }] },
      { time: '19:00', end: '— 21:00', title: 'Closing celebration dinner', tags: [{ label: 'Cultural', cls: 'tag-meal' }, { label: 'Networking', cls: 'tag-eve' }] },
      CUTOFF,
    ],
  },
  {
    num: 'Day 07', shortTitle: 'Departures', date: 'Sun · 14 Jun',
    meta: 'Day 07 · Sunday, 14 June 2026',
    title: <>Karakoram<br /><em>departure.</em></>,
    summary: 'Staggered checkouts and transfers. No formal programming. An optional excursion further into the high mountains is offered for those staying an extra day.',
    pills: [{ label: 'Departures', cls: 'tag-outdoor' }, { label: 'Optional excursion', cls: 'tag-eve' }],
    rows: [
      { time: '07:00', end: '— 08:00', title: 'Breakfast', tags: [{ label: 'Meal', cls: 'tag-meal' }] },
      { time: '08:00', end: 'onwards', title: 'Departures', tags: [{ label: 'Logistics', cls: 'tag-outdoor' }], desc: 'Staggered checkouts and transfers. No programming scheduled.' },
    ],
  },
];

export default function ItineraryPage() {
  return (
    <>
      <section className="page-hero" data-theme="dark" data-screen-label="Itinerary Hero" style={{ padding: '100px 0 60px' }}>
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><Link href="/cohorts">Cohorts</Link><span>/</span><Link href="/cohorts/2026">2026</Link><span>/</span><span>The Week</span></div>
          <h1 className="page-hero__title" style={{ maxWidth: '22ch' }}>
            The seven-day <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>expedition.</em>
          </h1>
          <p className="page-hero__subtitle">Click any day to expand its full hour-by-hour schedule. Times are local (PKT, UTC+5) and approximate — faculty may adjust on the ground.</p>
        </div>
      </section>

      <ItineraryBits days={DAYS} />
    </>
  );
}
