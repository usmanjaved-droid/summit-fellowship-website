import Link from 'next/link';
import styles from './page.module.css';
import { Sun, Home, Wifi, Heart, Backpack, Plane, Moon } from 'lucide-react';

export const metadata = {
  title: 'Khoj Resort, Skardu — Summit Fellowship',
};

const WEATHER_PERIODS = [
  { period: 'DAYTIME', icon: Sun, temp: '20–30°C', desc: 'Strong sun. Open areas feel hotter — sun protection essential.' },
  { period: 'EVENING & EARLY MORNING', icon: Moon, temp: '10–15°C', desc: 'Bring at least one warm layer. Pleasant after sunset.' },
];

export default function VenuePage() {
  return (
    <>
      <section className={`page-hero ${styles.pageHeroImage}`} style={{ minHeight: '600px', position: 'relative' }} data-screen-label="Venue Hero">
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
          <div className={`venue-intro__image ${styles.venueIntroImage}`} role="img" aria-label="Khoj Resort landscape and accommodations" />
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

      {/* Weather + Room Allocation Side by Side */}
      <section className={styles.logisticsSection}>
        <div className="container">
          <div className={styles.twoColumnSection}>
            {/* Weather Column */}
            <div className={styles.weatherColumn}>
              <div className={styles.weatherHead}>
                <div className={styles.weatherEyebrow}>
                  <span className={styles.weatherNumber}>NO. 07</span>
                  <span>WEATHER IN JUNE</span>
                </div>
                <h2 className={styles.weatherTitle}>Warm sun, cool nights, clear sky.</h2>
                <p className={styles.weatherIntro}>June is one of the most favourable months for Shigar. Days are dry and bright with strong mountain sun. Mornings and evenings cool down sharply. Karakoram visibility is typically excellent.</p>
              </div>

              <div className={styles.weatherCards}>
                {WEATHER_PERIODS.map((w) => {
                  const Icon = w.icon;
                  return (
                    <article key={w.period} className={styles.weatherCard}>
                      <div className={styles.weatherCardIcon}>
                        <Icon className={styles.weatherCardIconSvg} aria-hidden="true" />
                      </div>
                      <div className={styles.weatherCardLabel}>{w.period}</div>
                      <div className={styles.weatherCardTemp}>{w.temp}</div>
                      <p className={styles.weatherCardDesc}>{w.desc}</p>
                    </article>
                  );
                })}
              </div>

              <div className={styles.temperatureSlider}>
                <div className={styles.sliderTrack}>
                  <div className={styles.sliderMarker} style={{ left: '25%' }} />
                  <div className={styles.sliderFill} style={{ left: '25%', right: '17%' }} />
                  <div className={styles.sliderMarker} style={{ right: '17%' }} />
                </div>
                <div className={styles.sliderLabels}>
                  <span>0°C</span>
                  <span>10°C</span>
                  <span>20°C</span>
                  <span>30°C</span>
                  <span>40°C</span>
                </div>
              </div>
            </div>

            {/* Room Allocation Column */}
            <article className={styles.cardItem}>
            <div className={styles.cardEyebrow}>
              <span className={styles.cardNumber}>NO. 08</span>
              <span>ROOM ALLOCATION</span>
            </div>
            <h2 className={styles.cardTitle}>Loft villa, triple sharing.</h2>
            <p className={styles.cardIntro}>Fellows are accommodated in Khoj's River-View Loft Villas. Each room sleeps three of the same gender — one bed on the ground floor, two beds on the loft. Sort the bunk politics among yourselves.</p>
            <div className={styles.cardVisual}>
              <svg viewBox="0 0 400 200" className={styles.roomDiagram} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="30" width="320" height="140" fill="none" stroke="var(--alpine-deep)" strokeWidth="2" rx="8"/>
                <text x="200" y="55" textAnchor="middle" fontFamily="var(--mono)" fontSize="12" fill="var(--alpine-deep)" letterSpacing="0.1em">LOFT 1 LOFT 2</text>
                <line x1="200" y1="30" x2="200" y2="170" stroke="var(--alpine-deep)" strokeWidth="1" strokeDasharray="4" />
                <rect x="50" y="90" width="60" height="40" fill="var(--clay)" stroke="var(--alpine-deep)" strokeWidth="1.5"/>
                <text x="80" y="116" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill="white" fontWeight="500">GROUND</text>
                <rect x="130" y="75" width="35" height="25" fill="none" stroke="var(--alpine-deep)" strokeWidth="1.5"/>
                <rect x="180" y="75" width="35" height="25" fill="none" stroke="var(--alpine-deep)" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className={styles.cardDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Beds per room</span>
                <span className={styles.detailValue}>3</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Sharing</span>
                <span className={styles.detailValue}>Same gender</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Layout</span>
                <span className={styles.detailValue}>1 ground + 2 loft</span>
              </div>
            </div>
            <a href="#" className={styles.cardLink}>SEE VILLA DETAILS →</a>
            </article>
          </div>
        </div>
      </section>

      {/* Remaining Logistics Cards */}
      <section className={styles.logisticsSection}>
        <div className="container">
          {/* Connectivity Card */}
          <article className={styles.cardItem}>
            <div className={styles.cardEyebrow}>
              <span className={styles.cardNumber}>NO. 11</span>
              <span>CONNECTIVITY</span>
            </div>
            <h2 className={styles.cardTitle}>Wi-Fi yes, fast no.</h2>
            <p className={styles.cardIntro}>Khoj has Wi-Fi, but connectivity in this part of Pakistan isn&rsquo;t always reliable or high-speed. Cellular signals from major telecom networks are generally available, and 3G/4G internet services also work in the area, though connectivity may vary depending on weather and network conditions.</p>
            <div className={styles.colorSwatches}>
              <div className={styles.swatch} style={{ backgroundColor: 'var(--alpine-deep)' }} aria-label="Alpine Deep"></div>
              <div className={styles.swatch} style={{ backgroundColor: 'var(--alpine-soft)' }} aria-label="Alpine Soft"></div>
              <div className={styles.swatch} style={{ backgroundColor: 'var(--clay)' }} aria-label="Clay"></div>
              <div className={styles.swatch} style={{ backgroundColor: 'var(--ochre)' }} aria-label="Ochre"></div>
              <div className={styles.swatch} style={{ backgroundColor: 'var(--parchment)' }} aria-label="Parchment"></div>
            </div>
            <div className={styles.cardDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>RESORT WI-FI</span>
                <span className={styles.detailValue}>Available</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>MOBILE DATA</span>
                <span className={styles.detailValue}>3G/4G works</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>PLAN TO BE</span>
                <span className={styles.detailValue}>Offline-ish</span>
              </div>
            </div>
          </article>

          {/* Medical Card */}
          <article className={styles.cardItem}>
            <div className={styles.cardEyebrow}>
              <span className={styles.cardNumber}>NO. 10</span>
              <span>MEDICAL</span>
            </div>
            <h2 className={styles.cardTitle}>Covered.</h2>
            <div className={styles.medicalIcon}>
              <Heart className={styles.medicalIconSvg} aria-hidden="true" />
            </div>
            <p className={styles.cardIntro}>A first-aid kit travels with the team across all sessions and outdoor excursions. Basic medical facilities are available in Shigar, located around a 45-minute drive away, has larger healthcare facilities and hospitals as well.</p>
            <div className={styles.cardDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>ON-SITE KIT</span>
                <span className={styles.detailValue}>Basic care</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>SHIGAR FACILITY</span>
                <span className={styles.detailValue}>5–10 min</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>SKARDU HOSPITAL</span>
                <span className={styles.detailValue}>~45 min</span>
              </div>
            </div>
          </article>

          {/* Travel Arrangements Card */}
          <article className={styles.cardItem}>
            <div className={styles.cardEyebrow}>
              <span className={styles.cardNumber}>NO. 09</span>
              <span>TRAVEL ARRANGEMENTS</span>
            </div>
            <h2 className={styles.cardTitle}>Four steps to Khoj.</h2>
            <p className={styles.cardIntro}>Your journey has four distinct stages. You handle the first; we handle the rest. Flight bookings have already been sent to your inbox.</p>

            <div className={styles.stepFlow}>
              <div className={styles.stepBox}>
                <div className={styles.stepNumber}>STEP 01</div>
                <div className={styles.stepLabel}>YOU</div>
                <p className={styles.stepDesc}>Your home city → Get to your departure airport on your own</p>
              </div>
              <div className={styles.stepArrow} aria-hidden="true">→</div>

              <div className={styles.stepBox}>
                <div className={styles.stepNumber}>STEP 02</div>
                <div className={styles.stepLabel}>WE&rsquo;VE BOOKED</div>
                <p className={styles.stepDesc}>Flight to Skardu → Domestic flight, ticket already in your inbox</p>
              </div>
              <div className={styles.stepArrow} aria-hidden="true">→</div>

              <div className={styles.stepBox}>
                <div className={styles.stepNumber}>STEP 03</div>
                <div className={styles.stepLabel}>WE PICK UP</div>
                <p className={styles.stepDesc}>Skardu Airport → Ascender Adventures team meets the cohort</p>
              </div>
              <div className={styles.stepArrow} aria-hidden="true">→</div>

              <div className={styles.stepBox}>
                <div className={styles.stepNumber}>STEP 04</div>
                <div className={styles.stepLabel}>WE DRIVE</div>
                <p className={styles.stepDesc}>Khoj, Shigar → ~45-min transfer through the valley</p>
              </div>
            </div>

            <a href="/travel" className={styles.cardLink}>FULL TRAVEL PAGE →</a>
          </article>

          {/* Packing List Card */}
          <article className={styles.cardItem}>
            <div className={styles.cardEyebrow}>
              <span className={styles.cardNumber}>NO. 12</span>
              <span>PACKING LIST</span>
            </div>
            <h2 className={styles.cardTitle}>What to throw in <em>the bag.</em></h2>
            <p className={styles.cardIntro}>Pack for variable mountain weather. Warm sun by day, chilly mornings and evenings. Layers are essential. You&rsquo;ll have laundry service, so one week of clothing is overkill.</p>

            <div className={styles.checklistGrid}>
              <div className={styles.checklistColumn}>
                <h3 className={styles.checklistColumnHeader}>CLOTHING</h3>
                <div className={styles.checklistItem}>Hiking boots (closed-toe)</div>
                <div className={styles.checklistItem}>Casual shoes or sandals</div>
                <div className={styles.checklistItem}>3–4 days mixed clothing</div>
                <div className={styles.checklistItem}>Merino wool base layers</div>
                <div className={styles.checklistItem}>Fleece or wool jumper</div>
                <div className={styles.checklistItem}>Windbreaker or rain jacket</div>
              </div>

              <div className={styles.checklistColumn}>
                <h3 className={styles.checklistColumnHeader}>SUN & WEATHER</h3>
                <div className={styles.checklistItem}>SPF 50+ sunscreen</div>
                <div className={styles.checklistItem}>Sun hat with wide brim</div>
                <div className={styles.checklistItem}>Sunglasses (UVA/UVB)</div>
                <div className={styles.checklistItem}>Reusable water bottle</div>
              </div>

              <div className={styles.checklistColumn}>
                <h3 className={styles.checklistColumnHeader}>PERSONAL</h3>
                <div className={styles.checklistItem}>Toiletries & deodorant</div>
                <div className={styles.checklistItem}>Medications (bring extra)</div>
                <div className={styles.checklistItem}>Phone & chargers</div>
                <div className={styles.checklistItem}>Comfortable sleep clothes</div>
              </div>

              <div className={styles.checklistColumn}>
                <h3 className={styles.checklistColumnHeader}>WORK & BRING</h3>
                <div className={styles.checklistItem}>Laptop & power adapter</div>
                <div className={styles.checklistItem}>Notebook & pen</div>
                <div className={styles.checklistItem}>Headphones</div>
                <div className={styles.checklistItem}>Camera (optional)</div>
              </div>
            </div>

            <div className={styles.packingNote}>
              <strong>A note from the team:</strong> Don&rsquo;t overpack. The valley does not judge wardrobe rotation. The thing you&rsquo;ll wish you&rsquo;d brought is the warm layer at 9pm on the courtyard—everything else, we can sort.
            </div>
          </article>

        </div>
      </section>

    </>
  );
}
