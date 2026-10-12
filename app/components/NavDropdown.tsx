'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { NavGroup } from '@/lib/navigation';

// Hover-to-open is desktop only; in the stacked mobile menu a tap must toggle.
const isStacked = () => window.matchMedia('(max-width: 1024px)').matches;

export default function NavDropdown({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      className={`site-nav__group${open ? ' is-open' : ''}`}
      ref={ref}
      onMouseEnter={() => !isStacked() && setOpen(true)}
      onMouseLeave={() => !isStacked() && setOpen(false)}
    >
      <button
        type="button"
        className="site-nav__link site-nav__group-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {group.label}
        <span className={`site-nav__caret${open ? ' is-open' : ''}`} aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3.5 5 6.5 8 3.5" />
          </svg>
        </span>
      </button>
      <div className="site-nav__dropdown" role="menu">
        {group.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="site-nav__dropdown-item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onNavigate();
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
