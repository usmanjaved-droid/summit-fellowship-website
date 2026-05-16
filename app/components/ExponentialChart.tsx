'use client';

import { useEffect, useRef, useState } from 'react';

export default function ExponentialChart() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const curveRef = useRef<SVGPathElement | null>(null);
  const arrowRef = useRef<SVGPathElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Reveal trigger for the dashed line, labels, and arrows (non-curve elements)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scroll-linked progress for the orange curve + its arrow
  useEffect(() => {
    const wrap = wrapRef.current;
    const curve = curveRef.current;
    const arrow = arrowRef.current;
    if (!wrap || !curve || !arrow) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const curveLen = curve.getTotalLength();
    const arrowLen = arrow.getTotalLength();
    curve.style.strokeDasharray = `${curveLen}`;
    arrow.style.strokeDasharray = `${arrowLen}`;

    if (reduced) {
      curve.style.strokeDashoffset = '0';
      arrow.style.strokeDashoffset = '0';
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when the chart's top hits 80% of viewport; 1 when the chart's bottom hits 20% of viewport
      const start = vh * 0.8;
      const end = vh * 0.2;
      const top = rect.top;
      const bottom = rect.bottom;
      // Use chart center as the reference so it feels symmetric
      const center = (top + bottom) / 2;
      const span = start - end;
      const raw = (start - center) / span;
      const t = Math.max(0, Math.min(1, raw));
      // Curve fills first (0 → 0.85), then arrow draws (0.85 → 1.0)
      const curveT = Math.min(1, t / 0.85);
      const arrowT = Math.max(0, Math.min(1, (t - 0.85) / 0.15));
      curve.style.strokeDashoffset = `${curveLen * (1 - curveT)}`;
      arrow.style.strokeDashoffset = `${arrowLen * (1 - arrowT)}`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`exp-chart${visible ? ' is-visible' : ''}`}>
      <svg viewBox="0 0 640 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Grey dashed line: idea → pretty good (linear-ish) */}
        <path
          className="exp-chart__dashed"
          d="M 60 410 L 600 130"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
        <path
          className="exp-chart__dashed-arrow"
          d="M 590 116 L 605 128 L 587 138"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orange exponential curve: scroll-linked */}
        <path
          ref={curveRef}
          className="exp-chart__curve"
          d="M 60 410 C 200 405, 340 395, 430 360 S 540 220, 560 60"
          fill="none"
          stroke="var(--ochre)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          ref={arrowRef}
          className="exp-chart__arrow"
          d="M 545 75 L 562 56 L 578 80"
          fill="none"
          stroke="var(--ochre)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Labels */}
        <text x="48" y="448" className="exp-chart__label exp-chart__label--ochre exp-chart__label--idea">
          idea
        </text>
        <text x="515" y="120" className="exp-chart__label exp-chart__label--grey">
          pretty good
        </text>
        <text x="510" y="40" className="exp-chart__label exp-chart__label--ochre exp-chart__label--awesome">
          awesome
        </text>
      </svg>
    </div>
  );
}
