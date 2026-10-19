import { Fellow } from '@/lib/fellows';
import styles from './fellow-detail.module.css';

type FellowSidebarProps = {
  fellow: Fellow;
};

export function FellowSidebar({ fellow }: FellowSidebarProps) {
  return (
    <aside className={styles['fellow-sidebar']}>
      <div className={styles['fellow-sidebar__section']}>
        <span className={`t-eyebrow ${styles['fellow-sidebar__label']}`}>Organisation</span>
        <p className={`t-body-sm ${styles['fellow-sidebar__value']}`}>{fellow.org}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={`t-eyebrow ${styles['fellow-sidebar__label']}`}>Geography</span>
        <p className={`t-body-sm ${styles['fellow-sidebar__value']}`}>{fellow.geography}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={`t-eyebrow ${styles['fellow-sidebar__label']}`}>Sector</span>
        <p className={`t-body-sm ${styles['fellow-sidebar__value']}`}>{fellow.sector}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={`t-eyebrow ${styles['fellow-sidebar__label']}`}>Structure</span>
        <p className={`t-body-sm ${styles['fellow-sidebar__value']}`}>{fellow.structure}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={`t-eyebrow ${styles['fellow-sidebar__label']}`}>Contact &amp; Links</span>
        <div className={styles['fellow-sidebar__links']}>
          {fellow.fellow_linkedin && (
            <a href={fellow.fellow_linkedin} target="_blank" rel="noopener noreferrer" className={`t-link-arrow ${styles['fellow-sidebar__link']}`}>
              LinkedIn
            </a>
          )}
          {fellow.org_url && (
            <a href={fellow.org_url} target="_blank" rel="noopener noreferrer" className={`t-link-arrow ${styles['fellow-sidebar__link']}`}>
              Website
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
