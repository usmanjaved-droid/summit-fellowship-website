import type { ReactNode } from 'react';
import styles from './fop.module.css';

/** A band heading with a short fact set beside it (e.g. "2026 Faculty"), under the yellow caption rule. */
export function HeadRow({ children, meta }: { children: ReactNode; meta: ReactNode }) {
  return (
    <div className={styles['fop-headrow']}>
      <div className={styles['fop-headrow__main']}>{children}</div>
      <p className={styles['fop-headrow__meta']}>{meta}</p>
    </div>
  );
}
