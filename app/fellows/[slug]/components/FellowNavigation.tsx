import Link from 'next/link';
import styles from '../page.module.css';

export function FellowNavigation() {
  return (
    <div className={styles['fellow-navigation']}>
      <Link href="/fellows" className={styles['fellow-navigation__close']}>
        <span aria-label="Back to all fellows">×</span>
      </Link>
    </div>
  );
}
