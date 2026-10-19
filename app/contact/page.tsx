import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import { Arrow, Section } from '../components/fop';
import { getSiteSettings } from '@/lib/site';
import styles from './contact.module.css';

export const metadata = {
  title: 'Contact — Summit Fellowship',
};

const CHANNELS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
        <path d="M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l2-2h14l2 2" />
      </svg>
    ),
    title: 'General queries',
    detail: 'Eligibility, the application, the curriculum, faculty, and anything else about the fellowship.',
    email: 'usman.javed@taleemabad.com',
  },
];

const HOSTS = [
  {
    name: 'Taleemabad',
    role: 'Co-host · Organizer · Karachi, Pakistan',
    desc: <>Pakistan&rsquo;s largest ed-tech organization. Transforms learning for millions of children through digital platforms, public school integrations, and engaging multimodal content in Urdu, Punjabi, and Pashto.</>,
    links: [
      { label: 'taleemabad.com', href: 'https://taleemabad.com/', external: true },
      { label: 'Email', href: 'mailto:hello@taleemabad.com' },
    ],
  },
  {
    name: 'Mulago Foundation',
    role: 'Co-host · Framework · San Francisco, CA',
    desc: <>A foundation that operates like a venture capital firm for impact — providing unrestricted funding and support to social entrepreneurs whose solutions are designed for massive scale.</>,
    links: [
      { label: 'mulagofoundation.org', href: 'https://www.mulagofoundation.org/', external: true },
      { label: 'Email', href: 'mailto:info@mulagofoundation.org' },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title={<>Get in <em>touch.</em></>}
        subtitle="For fellows, faculty, partners, and the curious. The team replies within one working day — Pakistan Standard Time."
      />

      <Section tone="offwhite">
        <div className={styles.grid}>
          <div>
            <p className={`t-eyebrow ${styles.eyebrow}`}>By channel</p>
            <h2 className={`t-heading-2 ${styles.heading}`}>
              Pick a <em>door.</em>
            </h2>
            <div className={styles.channels}>
              {CHANNELS.map((c) => (
                <div key={c.email} className={styles.channel}>
                  <div className={styles.icon}>{c.icon}</div>
                  <div>
                    <h3 className={`t-heading-5 ${styles.channelTitle}`}>{c.title}</h3>
                    <p className={`t-body-sm ${styles.detail}`}>{c.detail}</p>
                    <a className={styles.action} href={`mailto:${c.email}`}>
                      {c.email} <Arrow length={32} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form panel: the controls are restyled in Task 7. */}
          <div className="contact-form" data-theme="dark">
            <div className="contact-form__inner">
              <h3>Or send a <em>note.</em></h3>
              <p>Tell us a little about you and what you&rsquo;re after. Sending opens your email app with the note ready to go.</p>
              <ContactForm contactEmail={getSiteSettings().contactEmail} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <p className={`t-eyebrow ${styles.eyebrow}`}>The co-hosts</p>
        <h2 className={`t-heading-2 ${styles.heading}`}>
          Two organizations. <em>One week.</em>
        </h2>
        <div className={styles.hosts}>
          {HOSTS.map((h) => (
            <article key={h.name} className={styles.host}>
              <h3 className={`t-heading-3 ${styles.hostName}`}>{h.name}</h3>
              <p className={`t-eyebrow ${styles.hostRole}`}>{h.role}</p>
              <p className={`t-body ${styles.hostDesc}`}>{h.desc}</p>
              <div className={styles.hostLinks}>
                {h.links.map((l) => (
                  <a
                    key={l.href}
                    className={styles.action}
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {l.label} <Arrow length={32} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
