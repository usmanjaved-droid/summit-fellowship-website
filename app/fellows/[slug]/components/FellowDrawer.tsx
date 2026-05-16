'use client';

import { useEffect } from 'react';
import { Fellow } from '@/lib/fellows';

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
    <div className="fellow-drawer">
      <div className="fellow-drawer__backdrop" onClick={onClose} aria-hidden="true"></div>
      <div className="fellow-drawer__panel">
        <div className="fellow-drawer__header">
          <button className="fellow-drawer__close" onClick={onClose} aria-label="Close drawer">
            ✕
          </button>
        </div>
        <div className="fellow-drawer__content">
          {/* Organization */}
          <div className="fellow-drawer__section">
            <span className="fellow-drawer__label">Organization</span>
            <p className="fellow-drawer__value">{fellow.org}</p>
          </div>

          {/* Geography */}
          <div className="fellow-drawer__section">
            <span className="fellow-drawer__label">Geography</span>
            <p className="fellow-drawer__value">{fellow.geography}</p>
          </div>

          {/* Sector */}
          <div className="fellow-drawer__section">
            <span className="fellow-drawer__label">Sector</span>
            <p className="fellow-drawer__value">{fellow.sector}</p>
          </div>

          {/* Structure */}
          <div className="fellow-drawer__section">
            <span className="fellow-drawer__label">Structure</span>
            <p className="fellow-drawer__value">{fellow.structure}</p>
          </div>

          {/* Contact & Links */}
          <div className="fellow-drawer__section">
            <span className="fellow-drawer__label">Contact &amp; Links</span>
            <div className="fellow-drawer__links">
              {fellow.fellow_linkedin && (
                <a
                  href={fellow.fellow_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fellow-drawer__link"
                >
                  LinkedIn
                </a>
              )}
              {fellow.org_url && (
                <a
                  href={fellow.org_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fellow-drawer__link"
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
