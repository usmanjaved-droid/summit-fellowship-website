'use client';

import { useEffect, useRef, useState } from 'react';

// Path data extracted from mulagofoundation.org chart
const CURVE_D =
  'M8.5 670.5C146.208 670.5 397.776 685.302 531.506 635.625C651.687 590.982 707.351 578.39 798.442 491.67C881.756 412.356 916.061 340.646 986.567 228.93C1011.38 189.622 1046.58 136.732 1071.63 97.1019C1080.7 82.7539 1085.43 67.6497 1092 52.1621';

const CURVE_ARROW_D =
  'M1091.8 58.6237C1083.53 59.4376 1065.68 71.7048 1074.29 78.4873C1077.64 81.1224 1091.29 98.0827 1091.67 93.3251C1092.76 79.9952 1091.09 64.7964 1087.42 52.1621';

const DASHED_D =
  'M10.5312 657.491C42.2997 654.847 72.9218 637.17 103.124 628.123C126.925 620.993 153.208 617.715 176.11 607.321C184.752 603.398 197.27 603.941 206.611 601.746C219.981 598.605 233.223 595.914 245.963 590.189C270.187 579.305 297.666 574.408 322.897 565.852C358.169 553.891 393.907 547.528 430.196 539.475C445.399 536.102 462.097 532.439 476.493 526.559C486.498 522.472 497.05 519.762 507.675 517.993C515.279 516.728 521.373 511.878 529.053 510.651C563.268 505.185 598.593 494.157 631.995 484.819C664.506 475.729 698.585 471.61 731.669 464.696C774.658 455.712 819.071 446.61 860.891 433.561C897.865 422.024 935.409 419.072 972.684 409.767C1016.85 398.742 1063.26 396.844 1107.49 384.478C1170.3 366.917 1253 348 1299 344.5';

const DASHED_ARROW_D =
  'M1297.21 333.643C1293.83 334.987 1300.29 346.17 1301.17 348.881C1303.18 355.099 1308.3 343.879 1309.86 342.514C1313.84 339.042 1318.54 335.496 1310.09 337.691C1305.1 338.986 1303.42 335.618 1298.95 334.668';

const CURVE_COLOR = '#ED7933';

export default function ExponentialChart() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const curveRef = useRef<SVGPathElement | null>(null);
  const arrowRef = useRef<SVGPathElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Fade-in trigger for dashed line, labels, and arrows
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scroll-linked progress for the orange curve + its arrow.
  // Maps progress from 0 (chart top at viewport bottom) to 1 (chart top at 30% of viewport).
  // After 1, stays drawn even as the chart continues to scroll out.
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
      // 0% when chart top hits viewport bottom; 100% when chart top hits 30% of viewport.
      // This guarantees full completion while the chart is still clearly on screen.
      const start = vh;
      const end = vh * 0.3;
      const t = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, t));
      // Curve fills 0 → 0.85, arrow draws 0.85 → 1.0
      const curveT = Math.min(1, clamped / 0.85);
      const arrowT = Math.max(0, Math.min(1, (clamped - 0.85) / 0.15));
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
      <svg viewBox="0 0 1317 724" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Grey dashed line: idea → pretty good (linear-ish) */}
        <g opacity="0.5">
          <path
            className="exp-chart__dashed"
            d={DASHED_D}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 22"
            strokeLinecap="round"
          />
          <path
            className="exp-chart__dashed-arrow"
            d={DASHED_ARROW_D}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Orange exponential curve: scroll-linked */}
        <path
          ref={curveRef}
          className="exp-chart__curve"
          d={CURVE_D}
          fill="none"
          stroke={CURVE_COLOR}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          ref={arrowRef}
          className="exp-chart__arrow"
          d={CURVE_ARROW_D}
          fill="none"
          stroke={CURVE_COLOR}
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Labels (Caveat handwriting font) */}
        <text x="18" y="710" className="exp-chart__label exp-chart__label--ochre exp-chart__label--idea">
          idea
        </text>
        <text x="1300" y="335" textAnchor="end" className="exp-chart__label exp-chart__label--grey">
          pretty good
        </text>
        <text x="1180" y="38" textAnchor="end" className="exp-chart__label exp-chart__label--ochre exp-chart__label--awesome">
          awesome
        </text>
      </svg>
    </div>
  );
}
