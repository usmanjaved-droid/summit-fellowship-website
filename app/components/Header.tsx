'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { PRIMARY_LINKS, getNavGroups, isCurrentPath } from '@/lib/navigation';
import NavDropdown from './NavDropdown';
import { Button } from './fop';

const GROUPS = getNavGroups();
/** Scrolled this far, the header slims down. */
const SLIM_AFTER = 24;
/** Below this, scrolling down slides the header away (scrolling up always brings it back). */
const HIDE_AFTER = 240;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [slim, setSlim] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

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

  // Slim once scrolled; hide while scrolling down, show again on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const menuOpen = document.body.classList.contains('menu-open');
      const dropdownOpen = !!headerRef.current?.querySelector('.site-nav__group.is-open');
      setSlim(y > SLIM_AFTER);
      if (menuOpen || dropdownOpen || y < HIDE_AFTER) setHidden(false);
      else if (Math.abs(y - lastY) > 4) setHidden(y > lastY);
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sticky bars further down the page (fellows filter, Week day tabs) sit just below the header while it shows.
  // Uses the target heights from CSS rather than measuring, so the bars do not lag the header's height transition.
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const h = hidden ? '0px' : root.getPropertyValue(slim ? '--header-h-slim' : '--nav-height').trim();
    document.documentElement.style.setProperty('--header-offset', h);
  }, [hidden, slim]);

  return (
    <header
      ref={headerRef}
      className={`site-header${slim ? ' is-slim' : ''}${hidden ? ' is-hidden' : ''}`}
      data-theme="dark"
      onFocusCapture={() => setHidden(false)}
    >
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/" aria-label="Friends of Pakistan Fellowship home">
          <span className="wordmark">
            <span className="wordmark__name">Friends of Pakistan</span>
            <span className="wordmark__sub">Fellowship</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link
            className="site-nav__link site-nav__link--icon"
            href="/"
            aria-label="Home"
            aria-current={isCurrentPath('/', pathname) ? 'page' : undefined}
            onClick={closeAllMenus}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v10h14V10" />
            </svg>
          </Link>
          {GROUPS.map((g) => (
            <NavDropdown key={g.label} group={g} pathname={pathname} onNavigate={closeAllMenus} />
          ))}
          {PRIMARY_LINKS.map((l) => (
            <Link
              key={l.href}
              className="site-nav__link t-nav"
              href={l.href}
              aria-current={isCurrentPath(l.href, pathname) ? 'page' : undefined}
              onClick={closeAllMenus}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__cta">
          <Button href="/apply" size="md" onClick={closeAllMenus}>
            Apply <span className="nudge-arrow" aria-hidden="true">→</span>
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
