'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { isCurrentGroup, isCurrentPath, type NavGroup } from '@/lib/navigation';

// Read inside handlers only (never during render) so server and client markup match.
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function NavDropdown({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  // How the current open state was reached: a hover-open must not be toggled shut by the click that follows it.
  const openedBy = useRef<'hover' | 'click' | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownId = useId();

  const show = (via: 'hover' | 'click') => {
    openedBy.current = via;
    setOpen(true);
  };
  const hide = () => {
    openedBy.current = null;
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => {
      openedBy.current = null;
      setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onClick = () => {
    if (!canHover()) {
      if (open) hide();
      else show('click');
      return;
    }
    if (!open) show('click');
    else if (openedBy.current === 'click') hide();
    else openedBy.current = 'click'; // opened by hover: keep it open; a further click may close it
  };

  return (
    <div
      className={`site-nav__group${open ? ' is-open' : ''}`}
      ref={ref}
      onMouseEnter={() => {
        if (canHover() && !open) show('hover');
      }}
      onMouseLeave={() => {
        if (canHover()) hide();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`site-nav__link site-nav__group-trigger t-nav${isCurrentGroup(group, pathname) ? ' is-current' : ''}`}
        aria-expanded={open}
        aria-controls={dropdownId}
        onClick={onClick}
      >
        {group.label}
        <span className={`site-nav__caret${open ? ' is-open' : ''}`} aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3.5 5 6.5 8 3.5" />
          </svg>
        </span>
      </button>
      <div className="site-nav__dropdown" id={dropdownId}>
        {group.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="site-nav__dropdown-item t-menu-link"
            aria-current={isCurrentPath(l.href, pathname) ? 'page' : undefined}
            onClick={() => {
              hide();
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
