import Link from 'next/link';
import type { ReactNode } from 'react';
import { Section } from './fop';
import styles from './PageHero.module.css';

/** Green page hero shared by the content pages: breadcrumb, title, subtitle and optional actions. */
export default function PageHero({
  crumb,
  title,
  subtitle,
  children,
}: {
  /** Current page name; renders "Home / <crumb>". Omit for no breadcrumb. */
  crumb?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Section tone="green">
      <div className={styles.hero}>
        {crumb && (
          <nav aria-label="Breadcrumb" className={`t-eyebrow ${styles.crumbs}`}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{crumb}</span>
          </nav>
        )}
        <h1 className={`t-heading-1 ${styles.title}`}>{title}</h1>
        {subtitle && <p className={`t-body-light ${styles.subtitle}`}>{subtitle}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </Section>
  );
}
