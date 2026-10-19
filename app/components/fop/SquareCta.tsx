import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow } from './Arrow';
import styles from './fop.module.css';

export function SquareCta({
  href,
  size = 'lg',
  children,
}: {
  href: string;
  size?: 'md' | 'lg';
  children: ReactNode;
}) {
  const cls = [
    styles['fop-square'],
    styles['fop-nudge'],
    size === 'md' && styles['fop-square--md'],
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      <Arrow length={45} />
    </Link>
  );
}
