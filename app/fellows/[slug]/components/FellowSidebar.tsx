import { Fellow } from '@/lib/fellows';
import styles from '../page.module.css';

type FellowSidebarProps = {
  fellow: Fellow;
};

export function FellowSidebar({ fellow }: FellowSidebarProps) {
  return (
    <aside className={styles['fellow-sidebar']}>
      <div className={styles['fellow-sidebar__section']}>
        <span className={styles['fellow-sidebar__label']}>Organization</span>
        <p className={styles['fellow-sidebar__value']}>{fellow.org}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={styles['fellow-sidebar__label']}>Geography</span>
        <p className={styles['fellow-sidebar__value']}>{fellow.geography}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={styles['fellow-sidebar__label']}>Sector</span>
        <p className={styles['fellow-sidebar__value']}>{fellow.sector}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={styles['fellow-sidebar__label']}>Structure</span>
        <p className={styles['fellow-sidebar__value']}>{fellow.structure}</p>
      </div>

      <div className={styles['fellow-sidebar__section']}>
        <span className={styles['fellow-sidebar__label']}>Contact &amp; Links</span>
        <div className={styles['fellow-sidebar__links']}>
          {fellow.fellow_linkedin && (
            <a href={fellow.fellow_linkedin} target="_blank" rel="noopener noreferrer" className={styles['fellow-sidebar__link']}>
              LinkedIn
            </a>
          )}
          {fellow.org_url && (
            <a href={fellow.org_url} target="_blank" rel="noopener noreferrer" className={styles['fellow-sidebar__link']}>
              Website
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
