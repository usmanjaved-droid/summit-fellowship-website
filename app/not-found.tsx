import Image from 'next/image';
import { getLatestCohort } from '@/lib/cohorts';
import { ArrowLink, Button, Section } from './components/fop';
import styles from './not-found.module.css';

export default function NotFound() {
  const latest = getLatestCohort();
  return (
    <>
      <Section tone="green">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={`t-eyebrow ${styles.eyebrow}`}>Page not found</p>
            <h1 className={`t-heading-1 ${styles.title}`}>
              You&rsquo;ve wandered off <em>the trail.</em>
            </h1>
            <p className={`t-body-light ${styles.lead}`}>
              The page you were looking for isn&rsquo;t here, but the mountains are. The site has been
              reorganised, so older links may no longer work. Pick a path back:
            </p>
            <div className={styles.actions}>
              <Button href="/" size="lg" icon>Back to the start</Button>
              <ArrowLink href={`/cohorts/${latest.year}`}>The {latest.year} cohort</ArrowLink>
              <ArrowLink href="/apply">How to apply</ArrowLink>
              <ArrowLink href="/faq">FAQ</ArrowLink>
            </div>
          </div>
          <div className={styles.photo}>
            <Image
              src="/images/skardu/Hero Home.jpg"
              alt="A hiker on a rock ledge high above the Skardu valley"
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
