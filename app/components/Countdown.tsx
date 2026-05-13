'use client';

import { useEffect, useState } from 'react';

const TARGET = new Date('2026-06-07T07:00:00+05:00').getTime();

type Parts = { days: string; hours: string; mins: string; secs: string };

const INITIAL: Parts = { days: '000', hours: '00', mins: '00', secs: '00' };

function compute(now: number): Parts {
  let diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000); diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);
  return {
    days: String(days).padStart(3, '0'),
    hours: String(hours).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
  };
}

export default function Countdown() {
  const [parts, setParts] = useState<Parts>(INITIAL);

  useEffect(() => {
    setParts(compute(Date.now()));
    const id = setInterval(() => setParts(compute(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown" aria-label="Countdown to fellowship">
      <div className="countdown__bg" aria-hidden="true" />
      <div className="countdown__inner">
        <div className="countdown__label">
          <span>The expedition begins in</span>
          <span className="heading">June 7, 2026 · 07:00 PKT</span>
        </div>
        <div className="countdown__grid">
          <div className="countdown__cell">
            <div className="num">{parts.days}</div>
            <span className="unit">Days</span>
          </div>
          <div className="countdown__cell">
            <div className="num">{parts.hours}</div>
            <span className="unit">Hours</span>
          </div>
          <div className="countdown__cell">
            <div className="num">{parts.mins}</div>
            <span className="unit">Min</span>
          </div>
          <div className="countdown__cell">
            <div className="num">{parts.secs}</div>
            <span className="unit">Sec</span>
          </div>
        </div>
      </div>
    </section>
  );
}
