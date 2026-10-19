import type { ReactNode } from 'react';
import styles from './fop.module.css';

export function Prose({ size = 'md', children }: { size?: 'md' | 'sm'; children: ReactNode }) {
  return (
    <div className={`${styles['fop-prose']}${size === 'sm' ? ` ${styles['fop-prose--sm']}` : ''}`}>
      {children}
    </div>
  );
}
