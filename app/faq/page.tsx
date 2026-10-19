import Link from 'next/link';
import faq from '@/data/faq.json';
import PageHero from '../components/PageHero';
import { Section } from '../components/fop';
import styles from './faq.module.css';

export const metadata = {
  title: 'FAQ — Summit Fellowship',
  description: 'Eligibility, the application, the retreat, and what happens afterwards.',
};

type FaqGroup = { group: string; items: { q: string; a: string }[] };

function Caret() {
  return (
    <svg className={styles.caret} width="12" height="9" viewBox="0 0 12 9" aria-hidden="true" focusable="false">
      <path d="M0 0h12L6 9z" fill="currentColor" />
    </svg>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        title={<>Questions, <em>answered.</em></>}
        subtitle={<>Still unsure? <Link href="/contact">Get in touch</Link>.</>}
      />
      <Section tone="offwhite">
        <div className={styles.faq}>
          {(faq as FaqGroup[]).map((g) => (
            <div key={g.group} className={styles.group}>
              <h2 className={`t-heading-4 ${styles.heading}`}>{g.group}</h2>
              {g.items.map((item) => (
                <details key={item.q} className={styles.item}>
                  <summary className={`t-heading-5 ${styles.question}`}>
                    <span>{item.q}</span>
                    <Caret />
                  </summary>
                  <p className={`t-body ${styles.answer}`}>{item.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
