'use client';

import { useRef, useState, useEffect } from 'react';
import { useCountUp } from './hooks/useCountUp';

type Stat = { label: string; value: number; suffix?: string; caption: string };

const stats: Stat[] = [
  { label: 'Duration',     value: 7,  caption: 'Days of intensive learning' },
  { label: 'Participants', value: 11, caption: 'Social entrepreneurs selected' },
  { label: 'Faculty',      value: 5,  suffix: '+', caption: 'Mentors and expert guides' },
];

export default function StatRow() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setStarted(true); return; }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[color:var(--color-border)]"
    >
      {stats.map((s) => (
        <StatColumn key={s.label} stat={s} start={started} />
      ))}
    </div>
  );
}

function StatColumn({ stat, start }: { stat: Stat; start: boolean }) {
  const n = useCountUp(stat.value, start);
  return (
    <div className="px-6 py-10 text-center md:text-left">
      <p className="eyebrow mb-4">{stat.label}</p>
      <p className="font-serif font-semibold text-[color:var(--color-ink)]
                    text-[clamp(4rem,9vw,6.5rem)] leading-none"
         style={{ fontVariationSettings: '"opsz" 144' }}>
        {n}{stat.suffix ?? ''}
      </p>
      <p className="mt-4 text-slate-warm">{stat.caption}</p>
    </div>
  );
}
