import Link from 'next/link';

export const metadata = {
  title: 'Travel & Logistics — Summit Fellowship',
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
const RainIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 14a4 4 0 014-4 5 5 0 019.6 1.6A3.5 3.5 0 0119 18H7a4 4 0 01-1-4z M9 20l-1 2M13 20l-1 2M17 20l-1 2" />
  </svg>
);
const PartIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2" />
  </svg>
);

const WEATHER = [
  { date: 'Sun 07', icon: <SunIcon />, hi: '23°', lo: '11°' },
  { date: 'Mon 08', icon: <SunIcon />, hi: '24°', lo: '12°' },
  { date: 'Tue 09', icon: <CloudIcon />, hi: '21°', lo: '10°' },
  { date: 'Wed 10', icon: <CloudIcon />, hi: '22°', lo: '11°' },
  { date: 'Thu 11', icon: <PartIcon />, hi: '24°', lo: '12°' },
  { date: 'Fri 12', icon: <RainIcon />, hi: '19°', lo: '10°' },
  { date: 'Sat 13', icon: <PartIcon />, hi: '23°', lo: '11°' },
];

const FAQS = [
  { q: 'Do I need a visa to enter Pakistan?', a: <>Most international fellows and faculty are eligible for an e-visa. Please apply <strong>at least 4 weeks in advance</strong> via the Government of Pakistan&rsquo;s online portal. The fellowship team will provide a letter of invitation on request — email <a href="mailto:logistics@summitfellowship.pk" style={{ color: 'var(--clay)', textDecoration: 'underline' }}>logistics@summitfellowship.pk</a>.</> },
  { q: 'What if my Skardu flight is cancelled?', a: "It happens. We strongly recommend arriving in Islamabad at least 24 hours before your scheduled Skardu departure. The fellowship covers ground-route transfers in the event of cancellations — coordinate with the team immediately and we'll get you on the road or onto the next flight." },
  { q: 'Is altitude sickness a concern?', a: 'Skardu sits at ~2,228 m. Most people acclimatize within a day. Drink lots of water, take it easy on Day 0, and avoid alcohol the first night. If you have a history of altitude issues, consult your doctor about Diamox before travel.' },
  { q: 'Is wifi available at the venue?', a: "Yes, but it's patchy. Khoj has wifi in common areas; mobile signal is intermittent across the valley. Plan for offline time during sessions. This is a feature, not a bug." },
  { q: 'What about dietary restrictions?', a: "Khoj is well-equipped for vegetarian, halal, gluten-free, and most allergen-conscious diets. Please flag yours during onboarding and we'll handle it. Local Balti cuisine is excellent and largely accommodating." },
  { q: 'Can I bring a plus-one?', a: 'The fellowship itself is for fellows only — protected space for the cohort. We can occasionally accommodate a partner at the venue at additional cost; please reach out before booking flights.' },
  { q: 'Are costs covered?', a: 'For confirmed cohort members, the fellowship covers all programming, accommodation, meals at Khoj, and ground transfers within Skardu. Fellows arrange and cover their own travel to Islamabad / Skardu — partial travel stipends are available on a needs basis.' },
  { q: 'Can I extend my stay?', a: "Absolutely. Many fellows extend by a few days to explore the region — the Deosai Plateau, Shangrila Lake, or even a short trek toward K2 base camp. The team can recommend local operators. Note that Khoj's reserved room block ends Day 7." },
];

export default function TravelPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Travel Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Travel &amp; Logistics</span></div>
          <h1 className="page-hero__title">Getting to <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>Skardu.</em></h1>
          <p className="page-hero__subtitle">Two ways in, one preferred. Here&rsquo;s what you need to know about flights, transfers, packing, and the small things that catch first-time visitors out.</p>
          <div className="page-hero__meta">
            <div className="page-hero__meta-item"><span className="label">Airport</span><span className="value">SKZ · Skardu Intl.</span></div>
            <div className="page-hero__meta-item"><span className="label">From Islamabad</span><span className="value">~50 min flight</span></div>
            <div className="page-hero__meta-item"><span className="label">Airport → Khoj</span><span className="value">~30 min by road</span></div>
            <div className="page-hero__meta-item"><span className="label">Time zone</span><span className="value">UTC+5 (PKT)</span></div>
          </div>
        </div>
      </section>

      <section className="travel-section">
        <div className="container">
          <div className="section-title">
            <h2>How to <em>get there.</em></h2>
            <span className="eyebrow">01 · Routing</span>
          </div>
          <div className="routes">
            <article className="route-card">
              <div className="route-card__rank">★ Recommended</div>
              <h3 className="route-card__title">Fly via Islamabad (ISB → SKZ)</h3>
              <p className="route-card__desc">The straightforward option. PIA operates daily Islamabad ↔ Skardu flights subject to weather. We recommend arriving in Islamabad at least one day prior — Skardu flights are often delayed or cancelled in unfavourable conditions.</p>
              <div className="route-card__stops">
                {[
                  ['✈', 'Home airport → Islamabad (ISB)', 'Any major carrier; book well in advance', 'Day -1'],
                  ['🏨', 'Overnight in Islamabad', 'Recommended — gives buffer for weather', 'Day -1'],
                  ['✈', 'Islamabad → Skardu (SKZ)', 'PIA, ~50 min, weather dependent', 'Day 0 AM'],
                  ['🚐', 'Skardu Airport → Khoj Resort', '~30 min transfer arranged by team', 'Day 0'],
                ].map(([icon, where, sub, time]) => (
                  <div className="route-stop" key={where}>
                    <div className="route-stop__icon">{icon}</div>
                    <div className="route-stop__where">{where}<span className="sub">{sub}</span></div>
                    <span className="route-stop__time">{time}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="route-card">
              <div className="route-card__rank">Backup · Adventure</div>
              <h3 className="route-card__title">Drive from Islamabad (Karakoram Highway)</h3>
              <p className="route-card__desc">If flights cancel and you have the time, the overland route via the Karakoram Highway is one of the most scenic drives on earth — and a 20-hour commitment. Coordinate with the team; we can arrange transport.</p>
              <div className="route-card__stops">
                {[
                  ['🚗', 'Islamabad → Chilas', 'via Karakoram Highway (N-35)', '~10 hrs'],
                  ['🌙', 'Overnight in Chilas or Gilgit', 'Highly recommended; do not drive at night', 'Stop'],
                  ['🚗', 'Chilas → Skardu', 'via Skardu Road (S-1)', '~7 hrs'],
                  ['🚐', 'Skardu → Khoj Resort', 'Short final leg', '~30 min'],
                ].map(([icon, where, sub, time]) => (
                  <div className="route-stop" key={where}>
                    <div className="route-stop__icon">{icon}</div>
                    <div className="route-stop__where">{where}<span className="sub">{sub}</span></div>
                    <span className="route-stop__time">{time}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="travel-section travel-section--warm">
        <div className="container">
          <div className="section-title">
            <h2>What to <em>expect.</em></h2>
            <span className="eyebrow">02 · Weather</span>
          </div>
          <div className="weather">
            <div className="weather__copy">
              <h3>June weather<br />in <em>Skardu.</em></h3>
              <p>Dry, sunny days. Cool mornings and evenings. Occasional thunderstorms in the late afternoon — they pass quickly. The sun is intense at altitude; a hat and SPF are non-negotiable.</p>
              <p>Pack layers. The temperature swing between 6 AM and 2 PM can easily be 15°C. A light fleece or windbreaker covers most evenings.</p>
            </div>
            <div className="weather__chart">
              <div className="weather__grid">
                {WEATHER.map((w) => (
                  <div className="weather-day" key={w.date}>
                    <div className="date">{w.date}</div>
                    {w.icon}
                    <div className="temp">{w.hi}<span className="low">{w.lo}</span></div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-mute)', textTransform: 'uppercase' }}>
                Indicative forecast · highs &amp; lows in °C
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="travel-section travel-section--alpine">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-title">
            <h2>The <em>packing list.</em></h2>
            <span className="eyebrow eyebrow--on-dark">03 · Kit</span>
          </div>
          <div className="checklist-grid">
            <div className="check-col">
              <h3>Documents &amp; <em>essentials</em></h3>
              <ul>
                <li className="essential">Passport / CNIC + flight tickets</li>
                <li className="essential">A printed copy of your itinerary</li>
                <li className="essential">Insurance card / emergency contacts</li>
                <li className="essential">PKR + a backup payment method</li>
                <li className="essential">Phone charger + universal adapter</li>
                <li>Power bank (signal is patchy at altitude)</li>
                <li>Physical notebook + a pen you like</li>
              </ul>
            </div>
            <div className="check-col">
              <h3>Clothing &amp; <em>layers</em></h3>
              <ul>
                <li className="essential">Light fleece or windbreaker</li>
                <li className="essential">Comfortable walking shoes (closed-toe)</li>
                <li className="essential">Modest layers for cultural events</li>
                <li>One smart-casual outfit (Demo Day + closing dinner)</li>
                <li>Light sweater for evenings</li>
                <li>Sun hat or cap</li>
                <li>Sandals for the resort</li>
              </ul>
            </div>
            <div className="check-col">
              <h3>Health &amp; <em>altitude</em></h3>
              <ul>
                <li className="essential">SPF 50+ sunscreen</li>
                <li className="essential">Sunglasses with UV protection</li>
                <li className="essential">Reusable water bottle (1L+)</li>
                <li className="essential">Personal medications (named, in original packaging)</li>
                <li>Lip balm</li>
                <li>Diamox if prone to altitude sickness (consult your doctor)</li>
                <li>Hand sanitizer + basic first aid</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="travel-section">
        <div className="container">
          <div className="section-title">
            <h2>Frequently <em>asked.</em></h2>
            <span className="eyebrow">04 · FAQ</span>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details className="faq-item" key={i}>
                <summary className="faq-item__q">{f.q}<span className="toggle">+</span></summary>
                <div className="faq-item__a"><div className="faq-item__a-inner">{f.a}</div></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper-warm)', padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 56px)', color: 'var(--alpine-deep)', letterSpacing: '-0.02em', marginBottom: 24 }}>
            Anything else? <em style={{ color: 'var(--clay)', fontStyle: 'italic' }}>Just ask.</em>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-soft)', maxWidth: '50ch', margin: '0 auto 32px' }}>
            Logistics questions, dietary needs, visa letters — the team is responsive and on it.
          </p>
          <Link href="/contact" className="btn">Contact the team →</Link>
        </div>
      </section>
    </>
  );
}
