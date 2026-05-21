import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'Khoj Resort, Skardu — Summit Fellowship',
};

export default function VenuePage() {
  return (
    <>
      {/* Hero */}
      <section className={`page-hero ${styles.pageHero}`} style={{ backgroundImage: 'linear-gradient(to right, rgba(10, 15, 20, 0.7) 0%, rgba(10, 15, 20, 0.4) 50%, rgba(10, 15, 20, 0) 100%), url(/images/venue/Khoj%20Resort%20main%20page.jpg)' }} data-screen-label="Venue Hero">
        <div className={`topo-bg topo-bg--on-dark ${styles.topoBg}`} aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero__crumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Venue</span>
          </div>
          <h1 className="page-hero__title">Khoj Resort, <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>Skardu.</em></h1>
          <p className="page-hero__subtitle">Tucked into the Shigar valley with the Karakoram rising on every side. Deliberate retreat from city noise, signal, and obligation.</p>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.venueIntro}>
        <div className="container">
          <div className={styles.venueIntroGrid}>
            <div className={styles.venueIntroCopy}>
              <div className="eyebrow-line"><span className="eyebrow-line__line"></span><span className="eyebrow">The venue</span></div>
              <h2>Where the<br /><em>work happens.</em></h2>
              <p>Khoj sits on the Shigar River in a valley that feels deliberately removed from the world. The journey in unfolds in two chapters: a flight to Skardu at 2,228 m elevation, then a 45-minute drive that threads through poplar groves and apricot orchards until you reach the resort. By the time you arrive, you've crossed into a different geography—mountains rising on every side, the river below, and your attention finally free to settle.</p>
              <p>The resort is built as a collection of private villas overlooking the river and valley. On the grounds: hammock forests of poplar trees, walking trails across seven acres, an organic farm that feeds the restaurant, firepits for evening gathering. The setting is small and contained, naturally suited to groups this size. There's signal here, but also silence when you want it.</p>
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

      {/* Gallery */}
      <section className={styles.gallery} data-screen-label="Venue Gallery">
        <div className="container">
          <div className={styles.galleryHead}>
            <div className="eyebrow-line"><span className="eyebrow-line__line"></span><span className="eyebrow">Look around</span></div>
            <h2>Khoj,<br /><em>in pictures.</em></h2>
          </div>

          <div className={styles.galGrid}>
            <figure className={`${styles.galCell} ${styles.galHero}`}>
              <div className={styles.galPlaceholder} style={{ backgroundImage: 'url(/images/venue/gallery/khoj%20venue%2013.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <figcaption><span className={styles.n}>01</span>The valley unfolds</figcaption>
            </figure>
            <figure className={`${styles.galCell} ${styles.galTall}`}>
              <div className={styles.galPlaceholder} style={{ backgroundImage: 'url(/images/venue/gallery/khoj%20venue%2014.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <figcaption><span className={styles.n}>02</span>Light on stone</figcaption>
            </figure>
            <figure className={`${styles.galCell} ${styles.galSq}`}>
              <div className={styles.galPlaceholder} style={{ backgroundImage: 'url(/images/venue/gallery/khoj%20venue%2012.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <figcaption><span className={styles.n}>03</span>River valley</figcaption>
            </figure>
            <figure className={`${styles.galCell} ${styles.galSq}`}>
              <div className={styles.galPlaceholder} style={{ backgroundImage: 'url(/images/venue/gallery/khoj%20venue%2011.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <figcaption><span className={styles.n}>04</span>Stone courtyard</figcaption>
            </figure>
            <figure className={`${styles.galCell} ${styles.galSq}`}>
              <div className={styles.galPlaceholder} style={{ backgroundImage: 'url(/images/venue/gallery/khoj%20venue%2010.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <figcaption><span className={styles.n}>05</span>Architecture and sky</figcaption>
            </figure>
            <figure className={`${styles.galCell} ${styles.galPano}`}>
              <div className={styles.galPlaceholder} style={{ backgroundImage: 'url(/images/venue/gallery/khoj%20venue%209.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <figcaption><span className={styles.n}>06</span>Panoramic valley view</figcaption>
            </figure>
            <figure className={`${styles.galCell} ${styles.galSq}`}>
              <div className={styles.galPlaceholder} style={{ backgroundImage: 'url(/images/venue/gallery/khoj%20venue%208.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <figcaption><span className={styles.n}>07</span>Evening light</figcaption>
            </figure>
          </div>

          <div className={styles.galleryCredit}>
            <span>Photography · drop your own or pull from <a href="https://www.khojresorts.com" target="_blank" rel="noopener noreferrer">khojresorts.com</a></span>
            <span>The valley speaks for itself</span>
          </div>
        </div>
      </section>

      {/* Field Guide */}
      <section className={styles.fieldGuide} data-screen-label="Venue Field Guide">
        <div className="container">
          <div className={styles.fieldGuideHead}>
            <div>
              <div className="eyebrow-line"><span className="eyebrow-line__line"></span><span className="eyebrow">The field guide</span></div>
              <h2>What you need<br />to know <em>on the ground.</em></h2>
            </div>
            <div className={styles.fieldGuideHeadMeta}>
              <span>Vol. 01 · Section 02</span>
              <span className={styles.v}>Updated May 2026</span>
            </div>
          </div>

          <nav className={styles.fgNav} aria-label="Field guide sections">
            <a href="#fg-weather"><span className={styles.n}>07</span>Weather</a>
            <a href="#fg-rooms"><span className={styles.n}>08</span>Rooms</a>
            <a href="#fg-travel"><span className={styles.n}>09</span>Travel</a>
            <a href="#fg-medical"><span className={styles.n}>10</span>Medical</a>
            <a href="#fg-signal"><span className={styles.n}>11</span>Connectivity</a>
            <a href="#fg-packing"><span className={styles.n}>12</span>Packing</a>
          </nav>

          <div className={styles.fgGrid}>
            {/* 07 · Weather (featured) */}
            <article className={`${styles.fgCard} ${styles.fgCardFeature}`} id="fg-weather">
              <div className="topo-bg topo-bg--on-dark" aria-hidden="true"></div>
              <div className={styles.fgCardNum}>No. 07 · Weather in June</div>
              <h3 className={styles.fgCardTitle}>Warm sun, cool nights, clear sky.</h3>
              <div className={styles.fgCardBody}>
                <p>June is one of the most favourable months for Shigar. Days are dry and bright with strong mountain sun. Mornings and evenings cool down sharply. Karakoram visibility is typically excellent.</p>
              </div>

              <div className={styles.weatherViz}>
                <div className={styles.weatherCell}>
                  <div className={styles.weatherCellHead}>
                    <svg className={styles.weatherIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                    </svg>
                    Daytime
                  </div>
                  <div className={styles.weatherCellTemp}>20–30<span className={styles.unit}>°C</span></div>
                  <div className={styles.weatherCellNote}>Strong sun. Open areas feel hotter — sun protection essential.</div>
                </div>
                <div className={styles.weatherCell}>
                  <div className={styles.weatherCellHead}>
                    <svg className={styles.weatherIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    Evening &amp; early morning
                  </div>
                  <div className={styles.weatherCellTemp}>10–15<span className={styles.unit}>°C</span></div>
                  <div className={styles.weatherCellNote}>Bring at least one warm layer. Pleasant after sunset.</div>
                </div>
              </div>

              <div className={styles.weatherBar} aria-hidden="true">
                <div className={styles.weatherBarTrack}>
                  <div className={styles.weatherBarRange}></div>
                </div>
                <div className={styles.weatherBarTick} style={{ left: '25%' }}></div>
                <div className={styles.weatherBarTick} style={{ left: '75%' }}></div>
                <div className={styles.weatherBarLabel} style={{ left: '25%' }}>10°</div>
                <div className={styles.weatherBarLabel} style={{ left: '75%' }}>30°</div>
              </div>
              <div className={styles.weatherScale}>
                <span>0°C</span><span>10°C</span><span>20°C</span><span>30°C</span><span>40°C</span>
              </div>
            </article>

            {/* 08 · Rooms */}
            <article className={`${styles.fgCard} ${styles.fgCardRooms}`} id="fg-rooms">
              <div className={styles.fgCardNum}>No. 08 · Room allocation</div>
              <h3 className={styles.fgCardTitle}>Loft villa, triple sharing.</h3>
              <div className={styles.fgCardBody}>
                <p>Fellows are accommodated in Khoj's River-View Loft Villas. Each room sleeps three of the same gender — one bed on the ground floor, two on the loft. Sort the bunk politics among yourselves.</p>
              </div>

              <div className={styles.roomsDiagram} aria-hidden="true">
                <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 20 60 L 100 15 L 180 60 L 180 145 L 20 145 Z" fill="none" stroke="#142734" strokeWidth="1.5"/>
                  <line x1="20" y1="85" x2="180" y2="85" stroke="#142734" strokeWidth="1" strokeDasharray="3 3"/>
                  <rect x="38" y="68" width="46" height="14" fill="#d4a574" opacity="0.85"/>
                  <rect x="116" y="68" width="46" height="14" fill="#d4a574" opacity="0.85"/>
                  <text x="61" y="63" fontFamily="JetBrains Mono" fontSize="6" fill="#142734" textAnchor="middle" letterSpacing="1">LOFT 1</text>
                  <text x="139" y="63" fontFamily="JetBrains Mono" fontSize="6" fill="#142734" textAnchor="middle" letterSpacing="1">LOFT 2</text>
                  <line x1="100" y1="85" x2="100" y2="130" stroke="#8a4a3b" strokeWidth="1"/>
                  <line x1="96" y1="92" x2="104" y2="92" stroke="#8a4a3b" strokeWidth="1"/>
                  <line x1="96" y1="104" x2="104" y2="104" stroke="#8a4a3b" strokeWidth="1"/>
                  <line x1="96" y1="116" x2="104" y2="116" stroke="#8a4a3b" strokeWidth="1"/>
                  <rect x="35" y="120" width="55" height="16" fill="#8a4a3b" opacity="0.9"/>
                  <text x="62" y="116" fontFamily="JetBrains Mono" fontSize="6" fill="#142734" textAnchor="middle" letterSpacing="1">GROUND</text>
                  <rect x="140" y="118" width="20" height="27" fill="none" stroke="#142734" strokeWidth="1"/>
                  <circle cx="156" cy="132" r="0.8" fill="#142734"/>
                  <rect x="120" y="95" width="14" height="14" fill="none" stroke="#142734" strokeWidth="0.8"/>
                  <line x1="127" y1="95" x2="127" y2="109" stroke="#142734" strokeWidth="0.5"/>
                  <line x1="120" y1="102" x2="134" y2="102" stroke="#142734" strokeWidth="0.5"/>
                </svg>
              </div>

              <div className={styles.roomsList}>
                <div className={styles.roomsListRow}><span>Beds per room</span><span className={styles.v}>3</span></div>
                <div className={styles.roomsListRow}><span>Sharing</span><span className={styles.v}>Same gender</span></div>
                <div className={styles.roomsListRow}><span>Layout</span><span className={styles.v}>1 ground + 2 loft</span></div>
              </div>

              <a className={styles.fgCardLink} href="https://www.khojresorts.com/river-view-loft-villa" target="_blank" rel="noopener noreferrer">See villa details</a>
            </article>

            {/* 09 · Travel arrangements */}
            <article className={`${styles.fgCard} ${styles.fgCardTravel}`} id="fg-travel">
              <div className={styles.fgCardNum}>No. 09 · Travel arrangements</div>
              <h3 className={styles.fgCardTitle}>We fly you to Skardu. You handle the airport.</h3>
              <div className={styles.fgCardBody}>
                <p>All fellows have flight bookings from their respective cities. You're responsible for getting to your <strong>departure airport</strong> in your home city; our logistics team — coordinated with Ascender Adventures — picks you up at <strong>Skardu airport</strong> and drives the group to Shigar. Return is mirrored.</p>
              </div>

              <div className={styles.travelFlow}>
                <div className={styles.travelFlowStep}>
                  <div className={styles.n}>Step 01 · You</div>
                  <div className={styles.t}>Your home city</div>
                  <div className={styles.s}>Get to your departure airport on your own.</div>
                </div>
                <div className={styles.travelFlowStep}>
                  <div className={styles.n}>Step 02 · We've booked</div>
                  <div className={styles.t}>Flight to Skardu</div>
                  <div className={styles.s}>Domestic flight, ticket already in your inbox.</div>
                </div>
                <div className={styles.travelFlowStep}>
                  <div className={styles.n}>Step 03 · We pick up</div>
                  <div className={styles.t}>Skardu Airport</div>
                  <div className={styles.s}>Ascender Adventures team meets the cohort.</div>
                </div>
                <div className={styles.travelFlowStep}>
                  <div className={styles.n}>Step 04 · We drive</div>
                  <div className={styles.t}>Khoj, Shigar</div>
                  <div className={styles.s}>~45-min transfer through the valley.</div>
                </div>
              </div>

              <a className={styles.fgCardLink} href="/travel">Full travel page</a>
            </article>

            {/* 10 · Medical */}
            <article className={`${styles.fgCard} ${styles.fgCardMedical}`} id="fg-medical">
              <div className={styles.fgCardNum}>No. 10 · Medical</div>
              <h3 className={styles.fgCardTitle}>Covered.</h3>
              <svg className={styles.medCross} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4">
                <rect x="18" y="6" width="12" height="36" rx="1.5"/>
                <rect x="6" y="18" width="36" height="12" rx="1.5"/>
              </svg>
              <div className={styles.fgCardBody} style={{ marginTop: 12 }}>
                <p>A first-aid kit travels with the team across all sessions and outdoor excursions.</p>
              </div>
              <ul className={styles.fgCardSublist}>
                <li><span>On-site kit</span><span className={styles.v}>Always</span></li>
                <li><span>Shigar facility</span><span className={styles.v}>Basic care</span></li>
                <li><span>Skardu hospital</span><span className={styles.v}>~45 min</span></li>
              </ul>
            </article>

            {/* 11 · Connectivity */}
            <article className={`${styles.fgCard} ${styles.fgCardSignal}`} id="fg-signal">
              <div className={styles.fgCardNum}>No. 11 · Connectivity</div>
              <h3 className={styles.fgCardTitle}>Wi-Fi yes, fast no.</h3>
              <div className={styles.signalViz} aria-hidden="true" title="Reliability: variable">
                <div className={styles.bar + ' ' + styles.barOn}></div>
                <div className={styles.bar + ' ' + styles.barOn}></div>
                <div className={`${styles.bar} ${styles.barOn} ${styles.barMid}`}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
              <div className={styles.fgCardBody}>
                <p>Khoj has Wi-Fi, but connectivity in this part of Pakistan isn't always reliable or fast. Cellular coverage from major networks is generally available; 3G/4G works but varies with weather.</p>
              </div>
              <ul className={styles.fgCardSublist}>
                <li><span>Resort Wi-Fi</span><span className={styles.v}>Available</span></li>
                <li><span>Mobile data</span><span className={styles.v}>3G / 4G</span></li>
                <li><span>Plan to be</span><span className={styles.v}>Offline-ish</span></li>
              </ul>
            </article>

            {/* 12 · Packing */}
            <article className={`${styles.fgCard} ${styles.fgCardPacking}`} id="fg-packing">
              <div className={styles.fgCardNum}>No. 12 · Packing list</div>
              <h3 className={styles.fgCardTitle}>What to throw in <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>the bag.</em></h3>
              <div className={styles.fgCardBody} style={{ maxWidth: '60ch' }}>
                <p>Pack for the weather in <a href="#fg-weather" style={{ color: 'var(--clay)', textDecoration: 'underline', textDecorationThickness: 1, textUnderlineOffset: 3 }}>Section 07</a>. Days are warm, evenings get chilly — at least one warm layer is non-negotiable. Sun protection during the day is the other non-negotiable.</p>
              </div>

              <div className={styles.packingGrid}>
                <div className={styles.packingCol}>
                  <h4><span>Clothing</span><span className={styles.ct}>5</span></h4>
                  <ul>
                    <li className={styles.essential}>One warm layer (fleece / light jacket)</li>
                    <li>Light, breathable daywear</li>
                    <li>Comfortable walking shoes</li>
                    <li>Modest casual wear for village visits</li>
                    <li>Traditional attire for Cultural Night</li>
                  </ul>
                </div>

                <div className={styles.packingCol}>
                  <h4><span>Sun &amp; weather</span><span className={styles.ct}>4</span></h4>
                  <ul>
                    <li className={styles.essential}>Sun hat with brim</li>
                    <li className={styles.essential}>Sunglasses (UV)</li>
                    <li className={styles.essential}>SPF 30+ sunscreen</li>
                    <li>Lip balm with SPF</li>
                  </ul>
                </div>

                <div className={styles.packingCol}>
                  <h4><span>Personal</span><span className={styles.ct}>5</span></h4>
                  <ul>
                    <li>Refillable water bottle</li>
                    <li>Personal medication (full course)</li>
                    <li>Toiletries</li>
                    <li>Power bank</li>
                    <li>Universal adapter (Pakistan: Type C/D)</li>
                  </ul>
                </div>

                <div className={styles.packingCol}>
                  <h4><span>Work &amp; bring</span><span className={styles.ct}>4</span></h4>
                  <ul>
                    <li>Laptop &amp; charger</li>
                    <li>Notebook + pen</li>
                    <li>Headphones</li>
                    <li>A snack or delicacy from your region (Cultural Night)</li>
                  </ul>
                </div>
              </div>

              <div className={styles.packingNote}>
                <span className={styles.l}>A note from the team</span>
                Don't overpack. The valley does not judge wardrobe rotation. The thing you'll wish you'd brought is the warm layer at 9pm on the courtyard — everything else, we can sort.
              </div>
            </article>

          </div>
        </div>
      </section>
    </>
  );
}
