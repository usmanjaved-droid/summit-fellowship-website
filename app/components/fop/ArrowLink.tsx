import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow } from './Arrow';
import styles from './fop.module.css';

export function ArrowLink({
  href,
  size = 'md',
  download,
  children,
}: {
  href: string;
  size?: 'md' | 'lg';
  /** Render a plain anchor with the download attribute (for files in /public). */
  download?: boolean;
  children: ReactNode;
}) {
  const cls = [
    styles['fop-arrow-link'],
    styles['fop-nudge'],
    size === 'lg' && styles['fop-arrow-link--lg'],
  ]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {children}
      <Arrow length={size === 'lg' ? 55 : 32} />
    </>
  );
  if (download || !href.startsWith('/') || href.startsWith('//')) {
    return (
      <a href={href} className={cls} download={download || undefined}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
