import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Khoj Resort, Skardu — Summit Fellowship',
};

const SunIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
  </svg>
);
const CloudIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 14a4 4 0 014-4 5 5 0 019.6 1.6A3.5 3.5 0 0119 18H7a4 4 0 01-1-4z" />
  </svg>
);
const PartIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2" />
  </svg>
);

const WEATHER = [
  { date: 'Typical day', icon: <SunIcon />, hi: '20°', lo: '7°' },
  { date: 'Warmest', icon: <PartIcon />, hi: '24°', lo: '' },
  { date: 'Coolest night', icon: <CloudIcon />, hi: '7°', lo: '' },
];

const FOOD_ITEMS = [
  { icon: '🥘', title: 'Balti Tandoori', desc: 'Grilled meats with regional spices and traditional firewood smoke — the soul of local cuisine.' },
  { icon: '🍖', title: 'BBQ & Grills', desc: 'Farm-to-table proteins prepared over open flame. Local specialties and international cuts.' },
  { icon: '🥗', title: 'Vegetarian & Halal', desc: 'Equally thoughtful preparation. Continental and local options available daily.' },
  { icon: '☕', title: 'Breakfast Buffet', desc: 'Continental, à la carte, and local options. Tea service all day. Fresh-baked bread.' },
];

const SPACES = [
  { num: '01', title: 'The Studio', desc: 'Workshop room with U-shaped seating for 12. Whiteboard walls. Where the Mulago core blocks happen, and the one-pagers get written.', img: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=900&q=80' },
  { num: '02', title: 'The Courtyard', desc: 'Stone courtyard with apricot trees. Where coffee breaks become 30 minutes longer than scheduled, and 1-on-1 clinics spill out when the weather allows.', img: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d1c1b7?auto=format&fit=crop&w=900&q=80' },
  { num: '03', title: 'The Dining Hall', desc: 'One long table. Locally-sourced food. By Day 3, everyone has a permanent seat. By Day 6, no one wants to leave it.', img: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80' },
  { num: '04', title: 'The Orchard', desc: "A short walk from the main building. The default outdoor classroom for 1-on-1 clinics. The cohort's photo gets taken here on Day 6.", img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80' },
];

export default function VenuePage() {
  return (
    <>
      <section className={`page-hero ${styles.pageHeroImage}`} style={{ minHeight: '600px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} data-screen-label="Venue Hero">
        <div className={styles.pageHeroOverlay} aria-hidden="true" />
        <div className={`container ${styles.pageHeroInnerWrapper}`}>
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Venue</span></div>
          <h1 className={`page-hero__title ${styles.pageHeroTitle}`}>Khoj Resort, <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>Skardu.</em></h1>
          <p className={`page-hero__subtitle ${styles.pageHeroSubtitle}`}>Tucked into the Shigar valley with the Karakoram rising on every side. A deliberate retreat from city noise, signal, and obligation.</p>
        </div>
      </section>

      <section className="venue-intro">
        <div className="container venue-intro__grid">
          <div className="venue-intro__copy">
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">The venue</span></div>
            <h2>Where the<br /><em>work happens.</em></h2>
            <p>Khoj is deliberately remote. The flight in lands at 2,228 m — 35.30°N · 75.62°E, with June temperatures running 7–20°C. The drive from the airstrip threads the Shigar river through poplar groves and apricot orchards. By the time you arrive, your phone is no longer the most interesting thing in the room.</p>
            <p>The resort is small by design — built for groups exactly this size. Workshop spaces flow onto a stone courtyard. Walk five minutes in any direction and you&rsquo;re in the orchards, on the river bank, or at the foot of a rock face that did not exist on yesterday&rsquo;s horizon.</p>
            <p>Days alternate between structured studio sessions, outdoor 1-on-1 clinics, and the kind of unstructured time that only happens when eleven founders find themselves in a valley together with nothing else to do.</p>
          </div>
          <div className="venue-intro__image" role="img" aria-label="Khoj Resort landscape and accommodations" />
        </div>
      </section>

      <section className="map-section">
        <div className="container map-section__inner">
          <div className="map-section__head">
            <div>
              <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>The terrain</div>
              <h2>You are <em>here.</em></h2>
            </div>
            <p>A schematic of the week&rsquo;s geography. Khoj is the basecamp; off-site days bring the cohort to Shigar Fort, the Skardu bazaar, and a local family&rsquo;s home for dinner.</p>
          </div>

          <div className="map-frame">
            <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a1820" />
                  <stop offset="100%" stopColor="#142734" />
                </linearGradient>
                <radialGradient id="khojGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d4a574" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1600" height="900" fill="url(#sky)" />

              <g fill="none" stroke="#2a4254" strokeWidth="0.8" opacity="0.7">
                <path d="M 100 200 C 300 140, 600 160, 900 100 C 1100 80, 1300 120, 1500 80" />
                <path d="M 100 240 C 300 180, 600 200, 900 140 C 1100 120, 1300 160, 1500 120" />
                <path d="M 50 320 C 250 260, 550 290, 850 230 C 1080 210, 1280 250, 1480 210" />
                <path d="M 30 400 C 220 350, 500 380, 800 320 C 1050 300, 1260 340, 1460 300" />
                <path d="M 1450 480 C 1300 500, 1150 460, 1000 490 C 850 510, 700 480, 550 510 C 400 540, 250 510, 80 540" />
                <path d="M 1450 540 C 1300 560, 1150 530, 1000 555 C 850 575, 700 550, 550 575 C 400 600, 250 575, 80 595" />
                <path d="M 1450 620 C 1300 640, 1150 610, 1000 635 C 850 655, 700 630, 550 655 C 400 680, 250 655, 80 675" />
                <path d="M 1450 720 C 1300 740, 1150 710, 1000 735 C 850 755, 700 730, 550 755 C 400 780, 250 755, 80 775" />
              </g>

              <g opacity="0.35">
                <polygon points="0,500 200,200 320,360 460,180 620,440 760,250 900,500" fill="#2a4254" />
                <polygon points="800,500 920,260 1020,400 1160,180 1320,340 1450,200 1600,500" fill="#1a2e3b" />
              </g>

              <path className="map-dash" d="M 0 580 C 200 560, 400 600, 600 580 C 800 560, 1000 600, 1200 580 C 1400 560, 1600 590, 1600 590" fill="none" stroke="#5b8baf" strokeWidth="3" strokeOpacity="0.6" />
              <text x="20" y="630" className="map-label" style={{ fontSize: 11 }}>Shigar River →</text>

              <path className="map-dash" d="M 750 580 Q 900 520, 1080 480" fill="none" stroke="#d4a574" strokeWidth="2" strokeOpacity="0.8" />
              <path className="map-dash" d="M 750 580 Q 600 620, 420 660" fill="none" stroke="#d4a574" strokeWidth="2" strokeOpacity="0.8" />

              <g transform="translate(750, 580)">
                <circle r="60" fill="url(#khojGlow)" />
                <circle className="map-pulse" r="6" fill="#d4a574" stroke="#d4a574" strokeWidth="2" />
                <circle r="8" fill="#d4a574" stroke="#0a1820" strokeWidth="2" />
                <text x="16" y="6" className="map-label--lg map-label">Khoj Resort</text>
                <text x="16" y="26" className="map-label">★ Basecamp · 2,228 m</text>
              </g>

              <g transform="translate(1080, 480)">
                <circle r="40" fill="url(#khojGlow)" opacity="0.5" />
                <circle r="6" fill="#142734" stroke="#d4a574" strokeWidth="2" />
                <text x="14" y="2" className="map-label map-label--ochre">Shigar Fort</text>
                <text x="14" y="20" className="map-label" style={{ opacity: 0.7 }}>Day 02 · Lightning Talks</text>
              </g>

              <g transform="translate(420, 660)">
                <circle r="40" fill="url(#khojGlow)" opacity="0.5" />
                <circle r="6" fill="#142734" stroke="#d4a574" strokeWidth="2" />
                <text x="-110" y="2" className="map-label map-label--ochre" textAnchor="start">Skardu Bazar</text>
                <text x="-200" y="20" className="map-label" style={{ opacity: 0.7 }}>Day 03 · Evening</text>
              </g>

              <g transform="translate(1300, 200)">
                <circle r="5" fill="#8a4a3b" />
                <text x="12" y="4" className="map-label" fill="#d4a574">K2 · ~150 km NE</text>
                <text x="12" y="22" className="map-label" style={{ opacity: 0.6 }}>Karakoram Range</text>
              </g>

              <g transform="translate(220, 540)">
                <circle r="5" fill="#8a4a3b" />
                <text x="-8" y="-12" className="map-label" fill="#d4a574" textAnchor="end">Skardu Intl. Airport</text>
                <text x="-8" y="6" className="map-label" style={{ opacity: 0.6 }} textAnchor="end">~30 min drive →</text>
              </g>

              <g transform="translate(900, 700)">
                <circle r="4" fill="#142734" stroke="#d4a574" strokeWidth="2" />
                <text x="12" y="4" className="map-label map-label--ochre">Local Family Home</text>
                <text x="12" y="22" className="map-label" style={{ opacity: 0.7 }}>Day 03 · Dinner</text>
              </g>

              <g transform="translate(1480, 80)" fill="#a39888">
                <line x1="0" y1="-30" x2="0" y2="30" stroke="#a39888" strokeWidth="0.6" />
                <line x1="-30" y1="0" x2="30" y2="0" stroke="#a39888" strokeWidth="0.6" />
                <text x="0" y="-36" textAnchor="middle" fontSize="11" fill="#d4a574">N</text>
                <text x="0" y="46" textAnchor="middle" fontSize="9">S</text>
                <text x="40" y="4" fontSize="9">E</text>
                <text x="-40" y="4" textAnchor="end" fontSize="9">W</text>
              </g>

              <g transform="translate(60, 820)">
                <line x1="0" y1="0" x2="120" y2="0" stroke="#a39888" strokeWidth="1.5" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#a39888" strokeWidth="1.5" />
                <line x1="60" y1="-4" x2="60" y2="4" stroke="#a39888" strokeWidth="1.5" />
                <line x1="120" y1="-4" x2="120" y2="4" stroke="#a39888" strokeWidth="1.5" />
                <text x="0" y="22" fontSize="9" fill="#a39888">0</text>
                <text x="60" y="22" fontSize="9" fill="#a39888" textAnchor="middle">2.5 km</text>
                <text x="120" y="22" fontSize="9" fill="#a39888" textAnchor="middle">5 km</text>
              </g>

              <g transform="translate(60, 60)">
                <text fontFamily="Instrument Serif" fontSize="32" fill="#f5efe3">Shigar Valley</text>
                <text y="24" fontFamily="JetBrains Mono" fontSize="10" fill="#d4a574" letterSpacing="2">SUMMIT FELLOWSHIP · 2026</text>
              </g>
            </svg>
          </div>

          <div className="map-legend">
            <div className="map-legend__item"><span className="legend-dot legend-dot--solid" /> Basecamp</div>
            <div className="map-legend__item"><span className="legend-dot" /> Off-site sessions</div>
            <div className="map-legend__item"><span className="legend-line" /> Travel routes</div>
            <div className="map-legend__item" style={{ marginLeft: 'auto', opacity: 0.6 }}>Schematic — not to scale</div>
          </div>
        </div>
      </section>

      <section className="spaces">
        <div className="container">
          <div className="spaces__head">
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">The spaces</span></div>
            <h2>Four rooms.<br /><em>One valley.</em></h2>
            <p>You&rsquo;ll move between these spaces over the week. Each was chosen for what it lets the group do, and for what it forbids — Khoj does not have a giant ballroom for a reason.</p>
          </div>
          <div className="space-grid">
            {SPACES.map((s) => (
              <article key={s.num} className="space-card">
                <div
                  className="space-card__image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(20,39,52,0.05), rgba(20,39,52,0.4)), url('${s.img}')` }}
                >
                  <span className="space-card__num">{s.num}</span>
                </div>
                <div className="space-card__body">
                  <h3 className="space-card__title">{s.title}</h3>
                  <p className="space-card__desc">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="travel-section travel-section--warm">
        <div className="container">
          <div className="section-title">
            <h2>What to <em>expect.</em></h2>
            <span className="eyebrow">Weather</span>
          </div>
          <div className="weather">
            <div className="weather__copy">
              <h3>June weather<br />in <em>Skardu.</em></h3>
              <p>Dry, sunny days with 9-10 hours of daily sunshine. Cool mornings (7°C) and comfortable afternoons (18-20°C). Occasional afternoon thunderstorms that pass quickly. The intense altitude sun requires SPF 50+.</p>
              <p>Pack layers. A light fleece or windbreaker is essential for mornings and evenings. June averages 37-65% humidity and only ~4 rainy days monthly.</p>
            </div>
            <div className="weather__chart">
              <div className="weather__grid">
                {WEATHER.map((w) => (
                  <div className="weather-day" key={w.date}>
                    <div className="date">{w.date}</div>
                    {w.icon}
                    <div className="temp">{w.hi}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-mute)', textTransform: 'uppercase' }}>
                Indicative June ranges · °C
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="food-section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Dining</span></div>
            <h2>Where every<br /><em>meal matters.</em></h2>
            <p>Khoj&rsquo;s restaurant, Raah, sources locally and cooks with intention. Balti Tandoori, grilled meats, continental breakfast, and options for vegetarian and halal diets. Food here is part of the experience, not an afterthought.</p>
          </div>
          <div className="food-grid">
            {FOOD_ITEMS.map((item) => (
              <article key={item.title} className="food-card">
                <div className="food-card__icon">{item.icon}</div>
                <h3 className="food-card__title">{item.title}</h3>
                <p className="food-card__desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
