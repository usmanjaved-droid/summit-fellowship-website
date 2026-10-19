'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRIMARY_LINKS, getNavGroups } from '@/lib/navigation';
import NavDropdown from './NavDropdown';
import { Button } from './fop';

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
    <header className="site-header" data-theme="dark">
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/" aria-label="Friends of Pakistan Fellowship home">
          <span className="wordmark">
            <span className="wordmark__name">Friends of Pakistan</span>
            <span className="wordmark__sub">Fellowship</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link className="site-nav__link site-nav__link--icon" href="/" aria-label="Home" onClick={closeAllMenus}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v10h14V10" />
            </svg>
          </Link>
          {GROUPS.map((g) => (
            <NavDropdown key={g.label} group={g} onNavigate={closeAllMenus} />
          ))}
          {PRIMARY_LINKS.map((l) => (
            <Link key={l.href} className="site-nav__link t-nav" href={l.href} onClick={closeAllMenus}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__cta">
          <Button href="/apply" size="md" onClick={closeAllMenus}>
            Apply →
          </Button>
        </div>
        <button
          className="menu-toggle t-button"
          aria-expanded={open}
          onClick={toggle}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
}
