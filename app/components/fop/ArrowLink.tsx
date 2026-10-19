import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow } from './Arrow';
import styles from './fop.module.css';

export function ArrowLink({
  href,
  size = 'md',
  children,
}: {
  href: string;
  size?: 'md' | 'lg';
  children: ReactNode;
}) {
  const cls = [
    styles['fop-arrow-link'],
    styles['fop-nudge'],
    size === 'lg' && styles['fop-arrow-link--lg'],
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Link href={href} className={cls}>
      {children}
      <Arrow length={size === 'lg' ? 55 : 32} />
    </Link>
  );
}
