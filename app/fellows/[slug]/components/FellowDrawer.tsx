'use client';

import { useEffect } from 'react';
import { Fellow } from '@/lib/fellows';
import styles from '../page.module.css';

type FellowDrawerProps = {
  fellow: Fellow;
  isOpen: boolean;
  onClose: () => void;
};

export function FellowDrawer({ fellow, isOpen, onClose }: FellowDrawerProps) {
  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className={styles['fellow-drawer']}>
      <div className={styles['fellow-drawer__backdrop']} onClick={onClose} aria-hidden="true"></div>
      <div className={styles['fellow-drawer__panel']}>
        <div className={styles['fellow-drawer__header']}>
          <button className={styles['fellow-drawer__close']} onClick={onClose} aria-label="Close drawer">
            ✕
          </button>
        </div>
        <div className={styles['fellow-drawer__content']}>
          {/* Organization */}
          <div className={styles['fellow-drawer__section']}>
            <span className={styles['fellow-drawer__label']}>Organization</span>
            <p className={styles['fellow-drawer__value']}>{fellow.org}</p>
          </div>

          {/* Geography */}
          <div className={styles['fellow-drawer__section']}>
            <span className={styles['fellow-drawer__label']}>Geography</span>
            <p className={styles['fellow-drawer__value']}>{fellow.geography}</p>
          </div>

          {/* Sector */}
          <div className={styles['fellow-drawer__section']}>
            <span className={styles['fellow-drawer__label']}>Sector</span>
            <p className={styles['fellow-drawer__value']}>{fellow.sector}</p>
          </div>

          {/* Structure */}
          <div className={styles['fellow-drawer__section']}>
            <span className={styles['fellow-drawer__label']}>Structure</span>
            <p className={styles['fellow-drawer__value']}>{fellow.structure}</p>
          </div>

          {/* Contact & Links */}
          <div className={styles['fellow-drawer__section']}>
            <span className={styles['fellow-drawer__label']}>Contact &amp; Links</span>
            <div className={styles['fellow-drawer__links']}>
              {fellow.fellow_linkedin && (
                <a
                  href={fellow.fellow_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['fellow-drawer__link']}
                >
                  LinkedIn
                </a>
              )}
              {fellow.org_url && (
                <a
                  href={fellow.org_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['fellow-drawer__link']}
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
