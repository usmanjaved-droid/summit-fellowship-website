import type { ReactNode } from 'react';
import styles from './fop.module.css';

export function Badge({
  tone = 'primary',
  children,
}: {
  tone?: 'primary' | 'outline';
  children: ReactNode;
}) {
  return (
    <span className={`${styles['fop-badge']} ${styles[`fop-badge--${tone}`]}`}>{children}</span>
  );
}
