'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Gentle movement as you scroll: section headings (main h2) and anything marked data-reveal
 * rise slightly and fade in when they first come into view; data-reveal="line" draws a timeline line.
 * Content is only hidden once this script runs (html.reveal-on), so it is always visible without
 * JavaScript, and nothing moves for visitors who ask for reduced motion. Only elements found off-screen
 * at scan time are hidden (class reveal-pending); anything rendered later (the application form's
 * steps, a day panel) is never hidden.
 */
const TARGETS = 'main h2:not(.sr-only), main [data-reveal]';
const STAGGER_MS = 70;
const MAX_STAGGER = 5;

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.classList.contains('is-revealed'),
    );

    // Anything already on screen shows at once (no flash on load); the rest waits for the scroll.
    const viewH = window.innerHeight;
    const pending: HTMLElement[] = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < viewH && r.bottom > 0) el.classList.add('is-revealed');
      else pending.push(el);
    }

    // Cards in the same row or list come in one after another.
    for (const el of pending) {
      el.classList.add('reveal-pending');
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = Math.min(siblings.indexOf(el), MAX_STAGGER);
      if (el.hasAttribute('data-reveal') && i > 0) el.style.setProperty('--reveal-delay', `${i * STAGGER_MS}ms`);
    }

    document.documentElement.classList.add('reveal-on');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
