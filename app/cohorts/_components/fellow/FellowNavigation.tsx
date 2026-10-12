import Link from 'next/link';
import styles from './fellow-detail.module.css';

type FellowNavigationProps = {
  backHref: string;
  year: number;
};

export function FellowNavigation({ backHref, year }: FellowNavigationProps) {
  return (
    <div className={styles['fellow-navigation']}>
      <Link href={backHref} className={styles['fellow-navigation__close']} aria-label={`Back to all ${year} fellows`}>
        <span aria-hidden="true">×</span>
      </Link>
    </div>
  );
}
