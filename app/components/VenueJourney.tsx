'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/app/venue/page.module.css';

export function VenueJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress: 0 when section top hits viewport bottom, 1 when section top hits 30% of viewport
      const start = windowHeight;
      const end = windowHeight * 0.3;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, progress));

      setScrollProgress(clamped);
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className={styles['venue-journey']} ref={containerRef}>
      <div className={styles['venue-journey__inner']}>
        <div className={styles['venue-journey__content']}>
          {/* Elevation profile on left */}
          <div className={styles['venue-journey__elevation']}>
            <p>Elevation content here</p>
          </div>

          {/* Landscape SVG on right */}
          <div className={styles['venue-journey__landscape']}>
            <p>SVG landscape here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
