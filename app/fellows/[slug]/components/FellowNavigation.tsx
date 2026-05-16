import Link from 'next/link';
import { Fellow } from '@/lib/fellows';
import styles from '../page.module.css';

type FellowNavigationProps = {
  prevFellow?: Fellow;
  nextFellow?: Fellow;
};

export function FellowNavigation({ prevFellow, nextFellow }: FellowNavigationProps) {
  return (
    <nav className={styles['fellow-navigation']}>
      <div className={styles['fellow-navigation__grid']}>
        <div className={`${styles['fellow-navigation__col']} ${styles['fellow-navigation__col--left']}`}>
          {prevFellow ? (
            <Link href={`/fellows/${prevFellow.id}`} className={styles['fellow-navigation__link']}>
              ← {prevFellow.name}
            </Link>
          ) : (
            <span></span>
          )}
        </div>

        <div className={`${styles['fellow-navigation__col']} ${styles['fellow-navigation__col--center']}`}>
          <Link href="/fellows" className={styles['fellow-navigation__link']}>
            Back to all fellows
          </Link>
        </div>

        <div className={`${styles['fellow-navigation__col']} ${styles['fellow-navigation__col--right']}`}>
          {nextFellow ? (
            <Link href={`/fellows/${nextFellow.id}`} className={styles['fellow-navigation__link']}>
              {nextFellow.name} →
            </Link>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </nav>
  );
}
