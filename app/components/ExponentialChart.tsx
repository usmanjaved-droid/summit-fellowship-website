'use client';

import { useEffect, useRef, useState } from 'react';

export default function ExponentialChart() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`exp-chart${visible ? ' is-visible' : ''}`}>
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
        {/* Grey arrowhead at end of dashed */}
        <path
          className="exp-chart__dashed-arrow"
          d="M 590 116 L 605 128 L 587 138"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orange exponential curve: flat, then steep rise to top-right */}
        <path
          className="exp-chart__curve"
          d="M 60 410 C 200 405, 340 395, 430 360 S 540 220, 560 60"
          fill="none"
          stroke="var(--ochre)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Orange arrowhead at top of curve */}
        <path
          className="exp-chart__arrow"
          d="M 545 75 L 562 56 L 578 80"
          fill="none"
          stroke="var(--ochre)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Labels */}
        <text x="48" y="448" className="exp-chart__label exp-chart__label--ochre">
          idea
        </text>
        <text x="525" y="115" className="exp-chart__label exp-chart__label--grey">
          pretty good
        </text>
        <text x="520" y="40" className="exp-chart__label exp-chart__label--ochre">
          awesome
        </text>
      </svg>
    </div>
  );
}
