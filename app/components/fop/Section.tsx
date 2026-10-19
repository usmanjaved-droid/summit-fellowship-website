import type { ReactNode } from 'react';
import styles from './fop.module.css';

export type SectionTone = 'offwhite' | 'white' | 'yellow' | 'green';

export function Section({
  tone = 'offwhite',
  title,
  intro,
  tight,
  id,
  children,
}: {
  tone?: SectionTone;
  title?: ReactNode;
  intro?: ReactNode;
  tight?: boolean;
  id?: string;
  children?: ReactNode;
}) {
  const cls = [
    styles['fop-section'],
    styles[`fop-section--${tone}`],
    tight && styles['fop-section--tight'],
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <section id={id} className={cls} data-theme={tone === 'green' ? 'dark' : undefined}>
      <div className={styles['fop-container']}>
        {(title || intro) && (
          <header className={styles['fop-section__head']}>
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
