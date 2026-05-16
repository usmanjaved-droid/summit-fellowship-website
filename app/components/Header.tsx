'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/cohort', label: 'Cohort' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/itinerary', label: 'Itinerary' },
  { href: '/venue', label: 'Venue' },
  { href: '/travel', label: 'Travel' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('menu-open', next);
      }
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
          <Link className="site-nav__link site-nav__link--icon" href="/" aria-label="Home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v10h14V10" />
            </svg>
          </Link>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} className="site-nav__link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link className="site-header__cta" href="/itinerary">
          June 7–14, 2026 →
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-label="Menu"
          onClick={toggle}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
