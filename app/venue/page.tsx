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

      <section className={styles.weatherSection}>
        <div className="container">
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
      </section>

      {/* Logistics Sections */}
      <section className={styles.logisticsSection}>
        <div className="container">
          <div className={styles.logisticsHead}>
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Practical Details</span></div>
            <h2>Everything you<br /><em>need to know.</em></h2>
          </div>

          {/* Room Allocation Section */}
          <article className={styles.logisticsCard}>
            <div className={styles.logisticsCardInner}>
              <div className={styles.logisticsCardLeft}>
                <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Accommodations</span></div>
                <h3><Home className="w-5 h-5 inline mr-2" aria-hidden="true" />Room Allocation</h3>
                <p>All fellows are accommodated in triple-sharing rooms with two other fellows of the same gender. This intentional proximity builds cohort connection and reflects the retreat&rsquo;s collaborative ethos.</p>
                <p><strong>Room structure:</strong> Each room features one bed on the ground floor and two beds in a loft area above. This setup creates a living space with natural height variation, offering both comfort and an interesting spatial dynamic.</p>
                <p><strong>Bed selection:</strong> You and your roommates can mutually decide who sleeps where. Ground floor offers easier access; the loft provides separation and a more private nook. There&rsquo;s no wrong choice—discuss it on arrival and settle what works best for everyone.</p>
                <p><strong>Shared space etiquette:</strong> You&rsquo;ll have an ensuite bathroom. Agree on morning/evening routines with your roommates to avoid conflicts. Respect quiet hours after 10 PM. Bring earplugs if you&rsquo;re a light sleeper—mountain air and fellow snorers are real.</p>
              </div>
              <div className={styles.logisticsCardRight}>
                <div className={styles.highlightBox}>
                  <strong>Triple Sharing</strong><br />1 Ground Floor Bed + 2 Loft Beds
                </div>
                <div className={styles.factsList}>
                  <div className={styles.factsItem}>👥 Roommates: 2 others (same gender)</div>
                  <div className={styles.factsItem}>🚿 Ensuite bathroom</div>
                  <div className={styles.factsItem}>💨 Hot water available</div>
                  <div className={styles.factsItem}>📶 Wi-Fi coverage</div>
                </div>
                <div className={styles.checklistSection}>
                  <strong style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ochre)', marginBottom: 12, display: 'block' }}>Bring for comfort</strong>
                  <div className={styles.checklistItem}>✓ Earplugs (optional)</div>
                  <div className={styles.checklistItem}>✓ Toiletries</div>
                  <div className={styles.checklistItem}>✓ Medications (if needed)</div>
                  <div className={styles.checklistItem}>✓ Change of clothes (3–4 days)</div>
                </div>
              </div>
            </div>
          </article>

          {/* Internet & Phone Section */}
          <article className={styles.logisticsCard}>
            <div className={styles.logisticsCardInner}>
              <div className={styles.logisticsCardLeft}>
                <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Connectivity</span></div>
                <h3><Wifi className="w-5 h-5 inline mr-2" aria-hidden="true" />Internet & Phone Coverage</h3>
                <p>Khoj Resort has Wi-Fi available in the main building and common areas. However, internet connectivity in this region is not guaranteed to be fast or continuous—think of it as a bonus, not a lifeline. Embrace the slowness; it&rsquo;s part of the retreat experience.</p>
                <p><strong>Mobile networks:</strong> Cellular signals from major telecom providers (Zong, PTCL, Jazz) are generally available, with 3G/4G service in and around the resort. Signal strength varies by location and weather. You may have dead zones near certain areas or during storms.</p>
                <p><strong>Offline mindset:</strong> Download important documents, maps, and content before you arrive. Save offline versions of flights, accommodation details, and emergency contact info. If you need reliable connectivity for work, consider rescheduling—this is a retreat, and disconnection is intentional.</p>
                <p><strong>Best signal spots:</strong> The main building and courtyard typically have the strongest Wi-Fi and mobile coverage. Rooms may have weaker signals, especially the lofts. Plan accordingly if you need to take a call or send urgent emails.</p>
              </div>
              <div className={styles.logisticsCardRight}>
                <div className={styles.highlightBox}>
                  <strong>Expect Slow Internet</strong><br />Not city-speed connectivity
                </div>
                <div className={styles.factsList}>
                  <div className={styles.factsItem}>📶 Wi-Fi: Available (variable speeds)</div>
                  <div className={styles.factsItem}>📱 3G/4G: Generally available</div>
                  <div className={styles.factsItem}>🌐 Providers: Zong, PTCL, Jazz</div>
                  <div className={styles.factsItem}>⚠️ Signal varies by location & weather</div>
                </div>
                <div className={styles.checklistSection}>
                  <strong style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ochre)', marginBottom: 12, display: 'block' }}>Download before arrival</strong>
                  <div className={styles.checklistItem}>✓ Flight confirmations</div>
                  <div className={styles.checklistItem}>✓ Offline maps</div>
                  <div className={styles.checklistItem}>✓ Important documents</div>
                  <div className={styles.checklistItem}>✓ Emergency contacts</div>
                </div>
              </div>
            </div>
          </article>

          {/* Medical Assistance Section */}
          <article className={styles.logisticsCard}>
            <div className={styles.logisticsCardInner}>
              <div className={styles.logisticsCardLeft}>
                <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Medical Care</span></div>
                <h3><Heart className="w-5 h-5 inline mr-2" aria-hidden="true" />Medical Assistance</h3>
                <p>A comprehensive first-aid kit will be available throughout the duration of the program, including during outdoor excursions and activities. Our team is trained to handle minor injuries, altitude-related discomfort, and basic medical issues.</p>
                <p><strong>Altitude considerations:</strong> At 2,228 m, some fellows may experience mild altitude effects: headaches, slight fatigue, or difficulty sleeping the first night. These typically resolve within 24–48 hours. Drink plenty of water, avoid alcohol on arrival day, and pace yourself during hiking.</p>
                <p><strong>Nearby facilities:</strong> Basic medical facilities are available in Shigar, a short 5–10 minute drive from Khoj. For more serious concerns, Skardu (45 minutes away) has larger healthcare facilities and hospitals with better equipment and specialist doctors.</p>
                <p><strong>Medications:</strong> Bring any personal medications in their original bottles. Inform our team of allergies or chronic conditions on arrival. Common medications (pain relievers, antihistamines, digestive aids) are available through the first-aid kit.</p>
              </div>
              <div className={styles.logisticsCardRight}>
                <div className={styles.highlightBox}>
                  <strong>First-Aid Kit On-Site</strong><br />Throughout the program
                </div>
                <div className={styles.factsList}>
                  <div className={styles.factsItem}>📍 Shigar clinic: 5–10 min drive</div>
                  <div className={styles.factsItem}>🏥 Skardu hospital: 45 min drive</div>
                  <div className={styles.factsItem}>⛰️ Altitude: 2,228 m</div>
                  <div className={styles.factsItem}>💧 Hydration: Critical at altitude</div>
                </div>
                <div className={styles.checklistSection}>
                  <strong style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ochre)', marginBottom: 12, display: 'block' }}>Bring medications</strong>
                  <div className={styles.checklistItem}>✓ Personal prescriptions</div>
                  <div className={styles.checklistItem}>✓ Pain relievers</div>
                  <div className={styles.checklistItem}>✓ Allergy meds (if needed)</div>
                  <div className={styles.checklistItem}>✓ Digestive aids</div>
                </div>
              </div>
            </div>
          </article>

          {/* Packing List Section */}
          <article className={styles.logisticsCard}>
            <div className={styles.logisticsCardInner}>
              <div className={styles.logisticsCardLeft}>
                <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">What to Bring</span></div>
                <h3><Backpack className="w-5 h-5 inline mr-2" aria-hidden="true" />Packing List</h3>
                <p>Pack for variable mountain weather: warm days, cold mornings/evenings, and the occasional thunderstorm. The list below covers essentials. You&rsquo;ll be comfortable and prepared.</p>
                <p><strong>Footwear:</strong> Closed-toe hiking boots are essential if you plan to trek (which you should—some of the best moments happen on the trail). Bring extra socks; blisters are your enemy at altitude. Casual walking shoes or sandals for resort areas and evening activities.</p>
                <p><strong>Clothing:</strong> 3–4 days&rsquo; worth of mixed clothing (tops, bottoms, undergarments). You&rsquo;ll have laundry service, so you don&rsquo;t need a week&rsquo;s wardrobe. Layers are key: merino wool or synthetic (not cotton) base layers, a fleece mid-layer, and a windproof outer shell.</p>
                <p><strong>Sun & altitude protection:</strong> SPF 50+ sunscreen (reapply often). Sun hat with wide brim. Sunglasses that block UVA/UVB. The high altitude amplifies sun exposure; don&rsquo;t underestimate it.</p>
              </div>
              <div className={styles.logisticsCardRight}>
                <div className={styles.checklistSection}>
                  <strong style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ochre)', marginBottom: 12, display: 'block' }}>Essentials</strong>
                  <div className={styles.checklistItem}>✓ Hiking boots (closed-toe)</div>
                  <div className={styles.checklistItem}>✓ Casual shoes/sandals</div>
                  <div className={styles.checklistItem}>✓ 3–4 days clothing</div>
                  <div className={styles.checklistItem}>✓ Merino/synthetic base layers</div>
                  <div className={styles.checklistItem}>✓ Fleece or wool jumper</div>
                  <div className={styles.checklistItem}>✓ Windbreaker/rain jacket</div>
                </div>
                <div className={styles.checklistSection} style={{ marginTop: 20 }}>
                  <strong style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ochre)', marginBottom: 12, display: 'block' }}>Sun & altitude</strong>
                  <div className={styles.checklistItem}>✓ SPF 50+ sunscreen</div>
                  <div className={styles.checklistItem}>✓ Sun hat & sunglasses</div>
                  <div className={styles.checklistItem}>✓ Water bottle (refillable)</div>
                  <div className={styles.checklistItem}>✓ Toiletries & medications</div>
                </div>
              </div>
            </div>
          </article>

          {/* Travel Arrangements Section */}
          <article className={styles.logisticsCard}>
            <div className={styles.logisticsCardInner}>
              <div className={styles.logisticsCardLeft}>
                <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">Getting There</span></div>
                <h3><Plane className="w-5 h-5 inline mr-2" aria-hidden="true" />Travel Arrangements</h3>
                <p>All flight bookings have been arranged and provided to you. You are responsible for getting to your designated departure airport on time. Once you land in Skardu, our logistics team takes over.</p>
                <p><strong>Arrival process:</strong> Upon landing at Skardu International Airport, our team will greet you with a sign bearing the Summit Fellowship logo. They&rsquo;ll handle luggage and coordinate transport to Khoj Resort, about 30 minutes away. The drive threads through the Shigar valley—watch for the apricot orchards and the river.</p>
                <p><strong>Luggage & belongings:</strong> Pack one main piece of luggage plus a carry-on. Khoj has storage for bags during the week. Excess luggage can be left at the airport or in Skardu; coordinate with our logistics team if needed.</p>
                <p><strong>Return journey:</strong> On departure day, we&rsquo;ll coordinate your drive back to Skardu Airport and ensure you make your flight. Flights are typically in the afternoon; plan for a 6–7 AM departure from Khoj.</p>
              </div>
              <div className={styles.logisticsCardRight}>
                <div className={styles.highlightBox}>
                  <strong>Flight Bookings</strong><br />Already provided to you
                </div>
                <div className={styles.factsList}>
                  <div className={styles.factsItem}>📍 Skardu Airport → Khoj: 30 min</div>
                  <div className={styles.factsItem}>🚗 Airport pickup: Logistics team waits</div>
                  <div className={styles.factsItem}>🧳 Luggage: 1 main + 1 carry-on</div>
                  <div className={styles.factsItem}>📞 Emergency contacts on arrival</div>
                </div>
                <div className={styles.checklistSection}>
                  <strong style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ochre)', marginBottom: 12, display: 'block' }}>On departure day</strong>
                  <div className={styles.checklistItem}>✓ Check-out: 6–7 AM</div>
                  <div className={styles.checklistItem}>✓ Airport: ~30 min drive</div>
                  <div className={styles.checklistItem}>✓ Flight: Afternoon departure</div>
                  <div className={styles.checklistItem}>✓ Confirm flight time before</div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </section>

    </>
  );
}
