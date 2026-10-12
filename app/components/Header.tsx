'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRIMARY_LINKS, getNavGroups } from '@/lib/navigation';
import NavDropdown from './NavDropdown';

const GROUPS = getNavGroups();

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeAllMenus = () => {
    setOpen(false);
    document.body.classList.remove('menu-open');
  };

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle('menu-open', next);
      return next;
    });
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/" aria-label="Summit Fellowship home">
          <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true" style={{ color: 'var(--clay)' }}>
            <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="M 6 30 L 16 12 L 23 22" />
              <path d="M 14 30 L 24 16 L 34 30 L 4 30 Z" fill="currentColor" fillOpacity="0.12" />
              <circle cx="29" cy="11" r="2.4" fill="currentColor" stroke="none" opacity="0.5" />
            </g>
          </svg>
          <span className="site-header__wordmark">
            Summit<span className="ws">·</span>Fellowship
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {GROUPS.map((g) => (
            <NavDropdown key={g.label} group={g} onNavigate={closeAllMenus} />
          ))}
          {PRIMARY_LINKS.map((l) => (
            <Link key={l.href} className="site-nav__link" href={l.href} onClick={closeAllMenus}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link className="site-header__cta" href="/apply" onClick={closeAllMenus}>
          Apply →
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-label="Menu"
          onClick={toggle}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`hamburger-icon${open ? ' is-open' : ''}`}
          >
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              className="hamburger-top"
              style={{
                transformOrigin: '12px 6px',
                transition: 'all 0.2s var(--ease-out)',
              }}
            />
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              className="hamburger-middle"
              style={{
                transition: 'opacity 0.2s var(--ease-out)',
              }}
            />
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              className="hamburger-bottom"
              style={{
                transformOrigin: '12px 18px',
                transition: 'all 0.2s var(--ease-out)',
              }}
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
