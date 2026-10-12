import Link from 'next/link';
import faq from '@/data/faq.json';
import styles from './faq.module.css';

export const metadata = {
  title: 'FAQ — Summit Fellowship',
  description: 'Eligibility, the application, the retreat, and what happens afterwards.',
};

type FaqGroup = { group: string; items: { q: string; a: string }[] };

export default function FaqPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="FAQ Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>FAQ</span></div>
          <h1 className="page-hero__title">Questions, <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>answered.</em></h1>
          <p className="page-hero__subtitle">Still unsure? <Link href="/contact" style={{ color: 'var(--ochre)' }}>Get in touch</Link>.</p>
        </div>
      </section>
      <section className="section">
        <div className="container container--narrow">
          {(faq as FaqGroup[]).map((g) => (
            <div key={g.group} className={styles.faq__group}>
              <h2 className={styles.faq__heading}>{g.group}</h2>
              {g.items.map((item) => (
                <details key={item.q} className={styles.faq__item}>
                  <summary className={styles.faq__question}>{item.q}</summary>
                  <p className={styles.faq__answer}>{item.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
