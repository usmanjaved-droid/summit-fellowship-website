import Link from 'next/link';
import { Arrow, nudgeClass } from '@/app/components/fop';
import type { Fellow } from '@/lib/fellows';
import styles from './fellow-detail.module.css';

type FellowPagerProps = {
  prev: Fellow | null;
  next: Fellow | null;
  basePath: string;
};

/** Previous / next fellow at the foot of a fellow page, so visitors can read the cohort in order. */
export function FellowPager({ prev, next, basePath }: FellowPagerProps) {
  return (
    <nav className={styles['fellow-pager']} aria-label="More fellows">
      <div className={styles['fellow-pager__inner']}>
        {prev ? (
          <Link className={`${styles['fellow-pager__link']} ${nudgeClass}`} href={`${basePath}/${prev.id}`}>
            <span className={`t-eyebrow ${styles['fellow-pager__label']}`}>
              <Arrow length={32} direction="left" /> Previous fellow
            </span>
            <span className={styles['fellow-pager__name']}>{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            className={`${styles['fellow-pager__link']} ${styles['fellow-pager__link--next']} ${nudgeClass}`}
            href={`${basePath}/${next.id}`}
          >
            <span className={`t-eyebrow ${styles['fellow-pager__label']}`}>
              Next fellow <Arrow length={32} />
            </span>
            <span className={styles['fellow-pager__name']}>{next.name}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
