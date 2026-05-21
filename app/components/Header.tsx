'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '/resources', label: 'Resources' },
];

const LOGISTICS_LINKS = [
  { href: '/venue', label: 'Venue' },
  { href: '/explore-skardu', label: 'Explore Skardu' },
  { href: '/travel', label: 'Travel' },
];

const PROGRAM_LINKS = [
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/itinerary', label: 'Itinerary' },
];

const PEOPLE_LINKS = [
  { href: '/fellows', label: 'Fellows' },
  { href: '/faculty', label: 'Faculty' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [logisticsOpen, setLogisticsOpen] = useState(false);
  const peopleRef = useRef<HTMLDivElement | null>(null);
  const programRef = useRef<HTMLDivElement | null>(null);
  const logisticsRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('menu-open', next);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!peopleOpen) return;
    const onDown = (e: MouseEvent) => {
      if (peopleRef.current && !peopleRef.current.contains(e.target as Node)) {
        setPeopleOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [peopleOpen]);

  useEffect(() => {
    if (!programOpen) return;
    const onDown = (e: MouseEvent) => {
      if (programRef.current && !programRef.current.contains(e.target as Node)) {
        setProgramOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [programOpen]);

  useEffect(() => {
    if (!logisticsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (logisticsRef.current && !logisticsRef.current.contains(e.target as Node)) {
        setLogisticsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [logisticsOpen]);

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
          <div
            className={`site-nav__program${programOpen ? ' is-open' : ''}`}
            ref={programRef}
          >
            <button
              type="button"
              className="site-nav__link site-nav__program-trigger"
              aria-expanded={programOpen}
              aria-haspopup="menu"
              onClick={() => setProgramOpen((v) => !v)}
            >
              Program
              <span className={`site-nav__caret${programOpen ? ' is-open' : ''}`} aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3.5 5 6.5 8 3.5" />
                </svg>
              </span>
            </button>
            <div className="site-nav__dropdown" role="menu">
              {PROGRAM_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="site-nav__dropdown-item"
                  role="menuitem"
                  onClick={() => setProgramOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`site-nav__people${peopleOpen ? ' is-open' : ''}`}
            ref={peopleRef}
          >
            <button
              type="button"
              className="site-nav__link site-nav__people-trigger"
              aria-expanded={peopleOpen}
              aria-haspopup="menu"
              onClick={() => setPeopleOpen((v) => !v)}
            >
              People
              <span className={`site-nav__caret${peopleOpen ? ' is-open' : ''}`} aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3.5 5 6.5 8 3.5" />
                </svg>
              </span>
            </button>
            <div className="site-nav__dropdown" role="menu">
              {PEOPLE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="site-nav__dropdown-item"
                  role="menuitem"
                  onClick={() => setPeopleOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`site-nav__logistics${logisticsOpen ? ' is-open' : ''}`}
            ref={logisticsRef}
          >
            <button
              type="button"
              className="site-nav__link site-nav__logistics-trigger"
              aria-expanded={logisticsOpen}
              aria-haspopup="menu"
              onClick={() => setLogisticsOpen((v) => !v)}
            >
              Logistics
              <span className={`site-nav__caret${logisticsOpen ? ' is-open' : ''}`} aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3.5 5 6.5 8 3.5" />
                </svg>
              </span>
            </button>
            <div className="site-nav__dropdown" role="menu">
              {LOGISTICS_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="site-nav__dropdown-item"
                  role="menuitem"
                  onClick={() => setLogisticsOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} className="site-nav__link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link className="site-header__cta" href="/contact">
          Contact →
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
