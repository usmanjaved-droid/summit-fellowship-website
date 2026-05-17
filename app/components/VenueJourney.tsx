'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/app/venue/page.module.css';

export function VenueJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [currentElevation, setCurrentElevation] = useState(1700);
  const [fillPercent, setFillPercent] = useState(0);

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

      progressRef.current = clamped;

      // Update elevation based on progress
      const minElevation = 1700;
      const maxElevation = 2228;
      const elevation = Math.round(minElevation + clamped * (maxElevation - minElevation));
      setCurrentElevation(elevation);
      setFillPercent((elevation - minElevation) / (maxElevation - minElevation) * 100);
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
            <div className={styles['venue-journey__profile']}>
              <div className={styles['venue-journey__axis']}>
                <div className={styles['venue-journey__gridline']} style={{ top: '0%' }}>
                  <span className={styles['venue-journey__gridline-label']}>2,500m</span>
                </div>
                <div className={styles['venue-journey__gridline']} style={{ top: '20%' }}>
                  <span className={styles['venue-journey__gridline-label']}>2,000m</span>
                </div>
                <div className={styles['venue-journey__gridline']} style={{ top: '40%' }}>
                  <span className={styles['venue-journey__gridline-label']}>1,500m</span>
                </div>
                <div className={styles['venue-journey__gridline']} style={{ top: '60%' }}>
                  <span className={styles['venue-journey__gridline-label']}>1,000m</span>
                </div>
                <div className={styles['venue-journey__gridline']} style={{ top: '80%' }}>
                  <span className={styles['venue-journey__gridline-label']}>500m</span>
                </div>
                <div className={styles['venue-journey__gridline']} style={{ top: '100%' }}>
                  <span className={styles['venue-journey__gridline-label']}>0m</span>
                </div>
              </div>

              <div className={styles['venue-journey__bar-container']}>
                <div
                  className={styles['venue-journey__progress-bar']}
                  style={{ height: `${fillPercent}%` }}
                />
                <div className={styles['venue-journey__needle']} style={{ bottom: `${fillPercent}%` }} />
              </div>

              <div className={styles['venue-journey__markers']}>
                <div
                  className={styles['venue-journey__marker']}
                  style={{ top: '0%' }}
                >
                  <span className={styles['venue-journey__marker-label']}>Khoj</span>
                  <span className={styles['venue-journey__marker-elevation']}>2,228m</span>
                </div>
                <div
                  className={styles['venue-journey__marker']}
                  style={{ top: '100%' }}
                >
                  <span className={styles['venue-journey__marker-label']}>Airport</span>
                  <span className={styles['venue-journey__marker-elevation']}>1,700m</span>
                </div>
              </div>
            </div>

            <div className={styles['venue-journey__elevation-display']}>
              <div className={styles['venue-journey__elevation-label']}>Elevation</div>
              <div className={styles['venue-journey__elevation-value']}>
                {currentElevation.toLocaleString()}m
              </div>
            </div>
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
