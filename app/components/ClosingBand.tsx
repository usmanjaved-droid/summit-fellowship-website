import { getApplyCta, getCurrentCohort } from '@/lib/site';
import { ArrowLink, Section } from './fop';
import styles from './ClosingBand.module.css';

/** Yellow closing band before the footer: one question and the next steps (apply / how to apply, and the FAQ). */
export default function ClosingBand({ title = 'Ready to design for scale?' }: { title?: string }) {
  const cta = getApplyCta(getCurrentCohort());
  return (
    <Section tone="yellow">
      <div className={styles.closing}>
        <h2 className={`t-heading-1 ${styles.closing__title}`}>{title}</h2>
        <div className={styles.closing__actions}>
          <ArrowLink href={cta.href} size="lg">{cta.label}</ArrowLink>
          <ArrowLink href="/faq" size="lg">Read the FAQ</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
