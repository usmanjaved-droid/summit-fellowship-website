import Image from 'next/image';
import PageHero from '../components/PageHero';
import { Section, type SectionTone } from '../components/fop';
import { ADVISORS, FACULTY, ORGANIZERS, type Person } from './people';
import styles from './faculty.module.css';

export const metadata = {
  title: 'Faculty & Organisers — Friends of Pakistan Fellowship',
};

function PersonCard({ p }: { p: Person }) {
  return (
    <article className={styles.person}>
      <div className={styles.person__photoCol}>
        {p.photo_url ? (
          <Image
            src={p.photo_url}
            alt={p.name}
            width={200}
            height={280}
            className={styles.person__photo}
          />
        ) : (
          <div className={styles.person__avatarLarge} aria-hidden="true">{p.init}</div>
        )}
      </div>
      <div className={styles.person__middleCol}>
        <div className={styles.person__header}>
          <h3 className={styles.person__name}>{p.name}</h3>
          <p className={`t-body-sm ${styles.person__role}`}>{p.role}</p>
        </div>
        <div className={styles.person__story}>
          <h4 className={`t-eyebrow ${styles.person__label}`}>Their Story</h4>
          <p className={`t-body-sm ${styles.person__text}`}>{p.org}</p>
        </div>
      </div>
      <div className={styles.person__rightCol}>
        <h4 className={`t-eyebrow ${styles.person__label}`}>Talk to them about</h4>
        <p className={`t-body-sm ${styles.person__text}`}>{p.relevance}</p>
        <div className={styles.person__links}>
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="t-eyebrow">{l.label}</a>
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
        crumb="Faculty & Organisers"
        title={<>An ecosystem of <em>support.</em></>}
        subtitle="A curated group of founders, funders, and system-level operators bringing scale frameworks, patient capital, and the operational scars to make it real."
      />
      <PeopleBand id="faculty" tone="offwhite" title="Faculty" people={FACULTY} />
      <PeopleBand id="advisors" tone="white" title="Advisors" people={ADVISORS} />
      <PeopleBand id="organizers" tone="offwhite" title="Organisers" people={ORGANIZERS} />
    </>
  );
}
