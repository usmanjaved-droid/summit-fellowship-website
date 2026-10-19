import type { ReactNode } from 'react';
import styles from './fop.module.css';

export function Stat({ value, label }: { value: ReactNode; label: ReactNode }) {
  return (
    <p className={styles['fop-stat']}>
      <span className={styles['fop-stat__value']}>{value}</span>
      <span className={styles['fop-stat__label']}>{label}</span>
    </p>
  );
}
