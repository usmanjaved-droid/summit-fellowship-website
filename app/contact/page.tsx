import Link from 'next/link';
import ContactForm from '../components/ContactForm';

export const metadata = {
  title: 'Contact — Summit Fellowship',
};

const CHANNELS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l2-2h14l2 2" />
      </svg>
    ),
    title: 'General enquiries',
    detail: "Anything that doesn't fit the categories below. Real human answers within one working day.",
    email: 'hello@summitfellowship.pk',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="9" r="3" />
        <path d="M12 2a7 7 0 017 7c0 4-7 13-7 13S5 13 5 9a7 7 0 017-7z" />
      </svg>
    ),
    title: 'Logistics & travel',
    detail: 'Flights, visas, transfers, dietary needs, room requests, anything that lands at the airport.',
    email: 'logistics@summitfellowship.pk',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h6l3-9 4 18 3-9h2" />
      </svg>
    ),
    title: 'Curriculum & faculty',
    detail: 'Programme, pre-reads, faculty mentor matching, capacity clinic scheduling.',
    email: 'program@summitfellowship.pk',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Press & partnerships',
    detail: 'Media enquiries, partnership conversations, future cohort sponsorship.',
    email: 'partners@summitfellowship.pk',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />
      </svg>
    ),
    title: 'Apply — Vol. 02 (2027)',
    detail: 'Applications for the next cohort open in October 2026. Drop a note to be notified first.',
    email: 'apply@summitfellowship.pk',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Contact Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
          <h1 className="page-hero__title">Get in <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>touch.</em></h1>
          <p className="page-hero__subtitle">For fellows, faculty, partners, and the curious. The team replies within one working day — Pakistan Standard Time.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">By channel</span></div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--alpine-deep)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Pick a <em style={{ color: 'var(--clay)', fontStyle: 'italic' }}>door.</em>
            </h2>
            <div className="channels">
              {CHANNELS.map((c) => (
                <div key={c.email} className="channel">
                  <div className="channel__icon">{c.icon}</div>
                  <div>
                    <h3 className="channel__title">{c.title}</h3>
                    <p className="channel__detail">{c.detail}</p>
                    <div className="channel__action"><a href={`mailto:${c.email}`}>{c.email} →</a></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form">
            <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
            <div className="contact-form__inner">
              <h3>Or send a <em>note.</em></h3>
              <p>Tell us a little about you and what you&rsquo;re after. The form lands in the right inbox automatically.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="hosts-section">
        <div className="container">
          <div className="eyebrow-line"><span className="eyebrow-line__line" /><span className="eyebrow">The co-hosts</span></div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--alpine-deep)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 48 }}>
            Two organizations. <em style={{ color: 'var(--clay)', fontStyle: 'italic' }}>One week.</em>
          </h2>
          <div className="hosts-grid">
            <article className="host-card">
              <h3 className="host-card__name">Taleemabad</h3>
              <div className="host-card__role">Co-host · Organizer · Karachi, Pakistan</div>
              <p className="host-card__desc">Pakistan&rsquo;s largest ed-tech organization. Transforms learning for millions of children through digital platforms, public school integrations, and engaging multimodal content in Urdu, Punjabi, and Pashto.</p>
              <div className="host-card__links">
                <a href="https://taleemabad.com/" target="_blank" rel="noopener noreferrer">taleemabad.com →</a>
                <a href="mailto:hello@taleemabad.com">Email →</a>
              </div>
            </article>
            <article className="host-card">
              <h3 className="host-card__name">Mulago Foundation</h3>
              <div className="host-card__role">Co-host · Framework · San Francisco, CA</div>
              <p className="host-card__desc">A foundation that operates like a venture capital firm for impact — providing unrestricted funding and support to social entrepreneurs whose solutions are designed for massive scale.</p>
              <div className="host-card__links">
                <a href="https://www.mulagofoundation.org/" target="_blank" rel="noopener noreferrer">mulagofoundation.org →</a>
                <a href="mailto:info@mulagofoundation.org">Email →</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
