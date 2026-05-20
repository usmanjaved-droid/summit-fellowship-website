import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'Khoj Resort, Skardu — Summit Fellowship',
};

const SPACES = [
  { num: '01', title: 'The Studio', desc: 'Workshop room with U-shaped seating for 12. Whiteboard walls. Where the Mulago core blocks happen, and the one-pagers get written.' },
  { num: '02', title: 'The Courtyard', desc: 'Stone courtyard with apricot trees. Where coffee breaks become 30 minutes longer than scheduled, and 1-on-1 clinics spill out when the weather allows.' },
  { num: '03', title: 'The Dining Hall', desc: 'One long table. Locally-sourced food. By Day 3, everyone has a permanent seat. By Day 6, no one wants to leave it.' },
  { num: '04', title: 'The Orchard', desc: "A short walk from the main building. The default outdoor classroom for 1-on-1 clinics. The cohort's photo gets taken here on Day 6." },
];

export default function VenuePage() {
  return (
    <>
      {/* Hero */}
      <section className={`page-hero ${styles.pageHero}`} style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 20, 0.8) 0%, rgba(10, 15, 20, 0.3) 50%, rgba(10, 15, 20, 0) 100%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }} data-screen-label="Venue Hero">
        <div className={`topo-bg topo-bg--on-dark ${styles.topoBg}`} aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero__crumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Venue</span>
          </div>
          <h1 className="page-hero__title">Khoj Resort, <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>Skardu.</em></h1>
          <p className="page-hero__subtitle">Tucked into the Shigar valley with the Karakoram rising on every side. Deliberate retreat from city noise, signal, and obligation.</p>
          <div className={styles.pageHeroMeta}>
            <div className={styles.pageHeroMetaItem}><span className={styles.label}>Coordinates</span><span className={styles.value}>35.30°N · 75.62°E</span></div>
            <div className={styles.pageHeroMetaItem}><span className={styles.label}>Elevation</span><span className={styles.value}>~2,228 m</span></div>
            <div className={styles.pageHeroMetaItem}><span className={styles.label}>Region</span><span className={styles.value}>Gilgit-Baltistan</span></div>
            <div className={styles.pageHeroMetaItem}><span className={styles.label}>June climate</span><span className={styles.value}>10 – 30°C</span></div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.venueIntro}>
        <div className="container">
          <div className={styles.venueIntroGrid}>
            <div className={styles.venueIntroCopy}>
              <div className="eyebrow-line"><span className="eyebrow-line__line"></span><span className="eyebrow">The venue</span></div>
              <h2>Where the<br /><em>work happens.</em></h2>
              <p>Khoj is deliberately remote. The flight in lands at 2,228 m. The drive from the airstrip threads the Shigar river through poplar groves and apricot orchards. By the time you arrive, your phone is no longer the most interesting thing in the room.</p>
              <p>The resort is small by design — built for groups exactly this size. Workshop spaces flow onto a stone courtyard. Walk five minutes in any direction and you're in the orchards, on the river bank, or at the foot of a rock face that did not exist on yesterday's horizon.</p>
              <p>Days alternate between structured studio sessions, outdoor 1-on-1 clinics, and the kind of unstructured time that only happens when eleven founders find themselves in a valley together with nothing else to do.</p>
            </div>
            <figure className={styles.venueIntroImageSlot}>
              <Image
                src="/images/venue/Khoj resort venue.jpg"
                alt="Khoj Resort venue"
                fill
                className={styles.venueIntroImage}
                sizes="(max-width: 1023px) 100vw, 40vw"
                priority
              />
              <figcaption>Khoj Resort · Shigar Valley</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <div className={`topo-bg topo-bg--on-dark ${styles.topoBg}`} aria-hidden="true"></div>
        <div className="container">
          <div className={styles.mapSectionHead}>
            <div>
              <div className="eyebrow eyebrow--on-dark" style={{ marginBottom: 16 }}>The terrain</div>
              <h2>You are <em>here.</em></h2>
            </div>
            <p>A schematic of the week's geography. Khoj is the basecamp; off-site days bring the cohort to Shigar Fort, the Skardu bazaar, and a local family's home for dinner.</p>
          </div>

          <div className={styles.mapFrame}>
            <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a1820"/>
                  <stop offset="100%" stopColor="#142734"/>
                </linearGradient>
                <radialGradient id="khojGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d4a574" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#d4a574" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="1600" height="900" fill="url(#sky)"/>

              <g fill="none" stroke="#2a4254" strokeWidth="0.8" opacity="0.7">
                <path d="M 100 200 C 300 140, 600 160, 900 100 C 1100 80, 1300 120, 1500 80"/>
                <path d="M 100 240 C 300 180, 600 200, 900 140 C 1100 120, 1300 160, 1500 120"/>
                <path d="M 50 320 C 250 260, 550 290, 850 230 C 1080 210, 1280 250, 1480 210"/>
                <path d="M 30 400 C 220 350, 500 380, 800 320 C 1050 300, 1260 340, 1460 300"/>
                <path d="M 1450 480 C 1300 500, 1150 460, 1000 490 C 850 510, 700 480, 550 510 C 400 540, 250 510, 80 540"/>
                <path d="M 1450 540 C 1300 560, 1150 530, 1000 555 C 850 575, 700 550, 550 575 C 400 600, 250 575, 80 595"/>
                <path d="M 1450 620 C 1300 640, 1150 610, 1000 635 C 850 655, 700 630, 550 655 C 400 680, 250 655, 80 675"/>
                <path d="M 1450 720 C 1300 740, 1150 710, 1000 735 C 850 755, 700 730, 550 755 C 400 780, 250 755, 80 775"/>
              </g>

              <g opacity="0.35">
                <polygon points="0,500 200,200 320,360 460,180 620,440 760,250 900,500" fill="#2a4254"/>
                <polygon points="800,500 920,260 1020,400 1160,180 1320,340 1450,200 1600,500" fill="#1a2e3b"/>
              </g>

              <path className={styles.mapDash} d="M 0 580 C 200 560, 400 600, 600 580 C 800 560, 1000 600, 1200 580 C 1400 560, 1600 590, 1600 590" fill="none" stroke="#5b8baf" strokeWidth="3" strokeOpacity="0.6"/>
              <text x="20" y="630" className={styles.mapLabel} style={{ fontSize: 11 }}>Shigar River →</text>

              <path className={styles.mapDash} d="M 750 580 Q 900 520, 1080 480" fill="none" stroke="#d4a574" strokeWidth="2" strokeOpacity="0.8"/>
              <path className={styles.mapDash} d="M 750 580 Q 600 620, 420 660" fill="none" stroke="#d4a574" strokeWidth="2" strokeOpacity="0.8"/>

              <g transform="translate(750, 580)">
                <circle r="60" fill="url(#khojGlow)"/>
                <circle className={styles.mapPulse} r="6" fill="#d4a574" stroke="#d4a574" strokeWidth="2"/>
                <circle r="8" fill="#d4a574" stroke="#0a1820" strokeWidth="2"/>
                <text x="16" y="6" className={`${styles.mapLabel} ${styles.mapLabelLg}`}>Khoj Resort</text>
                <text x="16" y="26" className={styles.mapLabel}>★ Basecamp · 2,228 m</text>
              </g>

              <g transform="translate(1080, 480)">
                <circle r="40" fill="url(#khojGlow)" opacity="0.5"/>
                <circle r="6" fill="#142734" stroke="#d4a574" strokeWidth="2"/>
                <text x="14" y="2" className={`${styles.mapLabel} ${styles.mapLabelOchre}`}>Shigar Fort</text>
                <text x="14" y="20" className={styles.mapLabel} style={{ opacity: 0.7 }}>Day 02 · Lightning Talks</text>
              </g>

              <g transform="translate(420, 660)">
                <circle r="40" fill="url(#khojGlow)" opacity="0.5"/>
                <circle r="6" fill="#142734" stroke="#d4a574" strokeWidth="2"/>
                <text x="-110" y="2" className={`${styles.mapLabel} ${styles.mapLabelOchre}`} textAnchor="start">Skardu Bazar</text>
                <text x="-200" y="20" className={styles.mapLabel} style={{ opacity: 0.7 }}>Day 03 · Evening</text>
              </g>

              <g transform="translate(1300, 200)">
                <circle r="5" fill="#8a4a3b"/>
                <text x="12" y="4" className={styles.mapLabel} fill="#d4a574">K2 · ~150 km NE</text>
                <text x="12" y="22" className={styles.mapLabel} style={{ opacity: 0.6 }}>Karakoram Range</text>
              </g>

              <g transform="translate(220, 540)">
                <circle r="5" fill="#8a4a3b"/>
                <text x="-8" y="-12" className={styles.mapLabel} fill="#d4a574" textAnchor="end">Skardu Intl. Airport</text>
                <text x="-8" y="6" className={styles.mapLabel} style={{ opacity: 0.6 }} textAnchor="end">~30 min drive →</text>
              </g>

              <g transform="translate(900, 700)">
                <circle r="4" fill="#142734" stroke="#d4a574" strokeWidth="2"/>
                <text x="12" y="4" className={`${styles.mapLabel} ${styles.mapLabelOchre}`}>Local Family Home</text>
                <text x="12" y="22" className={styles.mapLabel} style={{ opacity: 0.7 }}>Day 03 · Dinner</text>
              </g>

              <g transform="translate(1480, 80)" fill="#a39888">
                <line x1="0" y1="-30" x2="0" y2="30" stroke="#a39888" strokeWidth="0.6"/>
                <line x1="-30" y1="0" x2="30" y2="0" stroke="#a39888" strokeWidth="0.6"/>
                <text x="0" y="-36" textAnchor="middle" fontSize="11" fill="#d4a574">N</text>
                <text x="0" y="46" textAnchor="middle" fontSize="9">S</text>
                <text x="40" y="4" fontSize="9">E</text>
                <text x="-40" y="4" textAnchor="end" fontSize="9">W</text>
              </g>

              <g transform="translate(60, 820)">
                <line x1="0" y1="0" x2="120" y2="0" stroke="#a39888" strokeWidth="1.5"/>
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#a39888" strokeWidth="1.5"/>
                <line x1="60" y1="-4" x2="60" y2="4" stroke="#a39888" strokeWidth="1.5"/>
                <line x1="120" y1="-4" x2="120" y2="4" stroke="#a39888" strokeWidth="1.5"/>
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

          <div className={styles.mapLegend}>
            <div className={styles.mapLegendItem}><span className={`${styles.legendDot} ${styles.legendDotSolid}`}></span> Basecamp</div>
            <div className={styles.mapLegendItem}><span className={styles.legendDot}></span> Off-site sessions</div>
            <div className={styles.mapLegendItem}><span className={styles.legendLine}></span> Travel routes</div>
            <div className={styles.mapLegendItem} style={{ marginLeft: 'auto', opacity: 0.6 }}>Schematic — not to scale</div>
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className={styles.spacesSection}>
        <div className="container">
          <div className={styles.spacesHead}>
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">The spaces</span></div>
            <h2>Four rooms.<br /><em>One valley.</em></h2>
            <p>You'll move between these spaces over the week. Each was chosen for what it lets the group do, and for what it forbids — Khoj does not have a giant ballroom for a reason.</p>
          </div>
          <div className={styles.spaceGrid}>
            {SPACES.map((s) => (
              <article key={s.num} className={styles.spaceCard}>
                <div className={styles.spaceCardImage}>
                  <span className={styles.spaceCardNum}>{s.num}</span>
                </div>
                <div className={styles.spaceCardBody}>
                  <h3 className={styles.spaceCardTitle}>{s.title}</h3>
                  <p className={styles.spaceCardDesc}>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Field Guide */}
      <section className={styles.fieldGuideSection}>
        <div className="container">
          <div className={styles.fieldGuideHead}>
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Practical Details</span></div>
            <h2>Everything you<br /><em>need to know.</em></h2>
          </div>

          <div className={styles.fieldGuideGrid}>
            {/* Weather */}
            <article className={styles.fieldGuideCard}>
              <div className={styles.fieldGuideNum}>01</div>
              <h3 className={styles.fieldGuideTitle}>Weather in June</h3>
              <p>Dry, sunny days with 9–10 hours of daily sunshine. Daytime temperatures range from 20–30°C. Mornings and evenings are noticeably cooler (10–15°C), so layering is essential.</p>
              <div className={styles.fieldGuideFacts}>
                <div className={styles.factRow}><span>Daytime</span><strong>20–30°C</strong></div>
                <div className={styles.factRow}><span>Evenings</span><strong>10–15°C</strong></div>
                <div className={styles.factRow}><span>Sunshine</span><strong>9–10 hrs/day</strong></div>
                <div className={styles.factRow}><span>Rainy days</span><strong>~4/month</strong></div>
              </div>
            </article>

            {/* Rooms */}
            <article className={styles.fieldGuideCard}>
              <div className={styles.fieldGuideNum}>02</div>
              <h3 className={styles.fieldGuideTitle}>Room Allocation</h3>
              <p>All fellows are accommodated in triple-sharing rooms with two other fellows of the same gender. Each room has one bed on the ground floor and two beds in a loft area above.</p>
              <div className={styles.fieldGuideFacts}>
                <div className={styles.factRow}><span>Configuration</span><strong>3 per room</strong></div>
                <div className={styles.factRow}><span>Beds</span><strong>1 ground + 2 loft</strong></div>
                <div className={styles.factRow}><span>Bathroom</span><strong>Ensuite</strong></div>
                <div className={styles.factRow}><span>Wi-Fi</span><strong>Available</strong></div>
              </div>
            </article>

            {/* Medical */}
            <article className={styles.fieldGuideCard}>
              <div className={styles.fieldGuideNum}>03</div>
              <h3 className={styles.fieldGuideTitle}>Medical Assistance</h3>
              <p>A first-aid kit travels with the team across all sessions. Basic medical facilities are in Shigar (~5–10 min away). Skardu has larger hospitals (~45 min away) for emergencies.</p>
              <div className={styles.fieldGuideFacts}>
                <div className={styles.factRow}><span>On-site</span><strong>First-aid kit</strong></div>
                <div className={styles.factRow}><span>Shigar clinic</span><strong>5–10 min</strong></div>
                <div className={styles.factRow}><span>Skardu hospital</span><strong>~45 min</strong></div>
                <div className={styles.factRow}><span>Coverage</span><strong>Basic care</strong></div>
              </div>
            </article>

            {/* Connectivity */}
            <article className={styles.fieldGuideCard}>
              <div className={styles.fieldGuideNum}>04</div>
              <h3 className={styles.fieldGuideTitle}>Internet & Phone</h3>
              <p>Khoj has Wi-Fi available but connectivity is not guaranteed to be fast or continuous. Cellular signals from major providers are generally available. Download important documents before arrival.</p>
              <div className={styles.fieldGuideFacts}>
                <div className={styles.factRow}><span>Wi-Fi</span><strong>Variable speed</strong></div>
                <div className={styles.factRow}><span>Mobile signal</span><strong>3G/4G available</strong></div>
                <div className={styles.factRow}><span>Best spots</span><strong>Main building</strong></div>
                <div className={styles.factRow}><span>Mindset</span><strong>Embrace offline</strong></div>
              </div>
            </article>

            {/* Travel */}
            <article className={styles.fieldGuideCard}>
              <div className={styles.fieldGuideNum}>05</div>
              <h3 className={styles.fieldGuideTitle}>Travel Arrangements</h3>
              <p>Your journey has four stages: get to your departure airport, fly to Skardu (ticket in your inbox), airport pickup by Ascender Adventures, and ~45-min drive to Khoj through the valley.</p>
              <div className={styles.fieldGuideFacts}>
                <div className={styles.factRow}><span>Step 1</span><strong>You get to airport</strong></div>
                <div className={styles.factRow}><span>Step 2</span><strong>Flight to Skardu</strong></div>
                <div className={styles.factRow}><span>Step 3</span><strong>Airport pickup</strong></div>
                <div className={styles.factRow}><span>Step 4</span><strong>Drive to Khoj</strong></div>
              </div>
            </article>

            {/* Packing */}
            <article className={styles.fieldGuideCard}>
              <div className={styles.fieldGuideNum}>06</div>
              <h3 className={styles.fieldGuideTitle}>Packing List</h3>
              <p>Pack for variable mountain weather. Warm sun by day, chilly mornings and evenings. Layers are essential. You'll have laundry service, so one week of clothing is overkill.</p>
              <div className={styles.fieldGuideFacts}>
                <div className={styles.factRow}><span>Essentials</span><strong>Layers, sun protection</strong></div>
                <div className={styles.factRow}><span>Footwear</span><strong>Hiking boots, sandals</strong></div>
                <div className={styles.factRow}><span>Clothing</span><strong>3–4 days worth</strong></div>
                <div className={styles.factRow}><span>Tech</span><strong>Chargers, laptop</strong></div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
