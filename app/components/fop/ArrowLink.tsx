import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow } from './Arrow';
import styles from './fop.module.css';

export function ArrowLink({
  href,
  size = 'md',
  download,
  external,
  children,
}: {
  href: string;
  size?: 'md' | 'lg';
  /** Render a plain anchor with the download attribute (for files in /public). */
  download?: boolean;
  /** Open in a new tab (links to other sites, such as Google Drive). */
  external?: boolean;
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
      <a
        href={href}
        className={cls}
        download={download || undefined}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
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
