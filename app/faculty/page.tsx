import Image from 'next/image';
import PageHero from '../components/PageHero';
import { Section, type SectionTone } from '../components/fop';
import { ADVISORS, FACULTY, ORGANIZERS, type Person } from './people';
import styles from './faculty.module.css';

export const metadata = {
  title: 'Faculty & Organizers — Summit Fellowship',
};

function PersonCard({ p }: { p: Person }) {
  return (
    <article className={styles.person}>
      <div className={styles.photo}>
        {p.photo_url ? (
          <Image
            src={p.photo_url}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 440px"
          />
        ) : (
          <div className={styles.fallback} aria-hidden="true">{p.init}</div>
        )}
      </div>
      <h3 className={`t-heading-5 ${styles.name}`}>{p.name}</h3>
      <p className={`t-body-sm ${styles.role}`}>{p.role}</p>
      <div className={styles.more}>
        <h4 className={`t-eyebrow ${styles.label}`}>Their Story</h4>
        <p className="t-body-sm">{p.org}</p>
        <h4 className={`t-eyebrow ${styles.label}`}>Talk to them about</h4>
        <p className="t-body-sm">{p.relevance}</p>
        <div className={styles.links}>
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="t-body-sm">{l.label}</a>
          ))}
        </div>
      </div>
    </article>
  );
}

function PeopleBand({ id, tone, title, people }: { id: string; tone: SectionTone; title: string; people: Person[] }) {
  return (
    <Section tone={tone} id={id}>
      <h2 className={`t-heading-2 ${styles.heading}`}>{title}</h2>
      <div className={styles.grid}>
        {people.map((p) => <PersonCard key={p.num} p={p} />)}
      </div>
    </Section>
  );
}

export default function FacultyPage() {
  return (
    <>
      <PageHero
        crumb="Faculty & Organizers"
        title={<>An ecosystem of <em>support.</em></>}
        subtitle="A curated group of founders, funders, and system-level operators bringing scale frameworks, patient capital, and the operational scars to make it real."
      />
      <PeopleBand id="faculty" tone="offwhite" title="Faculty" people={FACULTY} />
      <PeopleBand id="advisors" tone="white" title="Advisors" people={ADVISORS} />
      <PeopleBand id="organizers" tone="offwhite" title="Organizers" people={ORGANIZERS} />
    </>
  );
}
