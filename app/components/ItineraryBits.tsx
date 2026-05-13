'use client';

import { useState, useEffect, type ReactNode } from 'react';

export type TimelineRow = {
  time: string;
  end?: string;
  title: string;
  tags?: { label: string; cls: string }[];
  desc?: string;
  bullets?: string[];
  cutoff?: boolean;
};

export type Day = {
  num: string;
  shortTitle: string;
  date: string;
  meta: string;
  title: ReactNode;
  summary: ReactNode;
  pills: { label: string; cls: string }[];
  rows: TimelineRow[];
};

export default function ItineraryBits({ days }: { days: Day[] }) {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const m = location.hash.match(/^#day-(\d)$/);
    if (m) setActive(Number(m[1]));
  }, []);

  useEffect(() => {
    history.replaceState(null, '', `#day-${active}`);
  }, [active]);

  return (
    <>
      <div className="week-ribbon">
        <div className="container week-ribbon__inner">
          <span className="week-ribbon__label">Week of</span>
          <span className="week-ribbon__title">Sun 07 — Sun 14 June 2026</span>
          <div className="week-ribbon__progress">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className={i <= active ? 'active' : ''} />
            ))}
          </div>
          <span className="week-ribbon__label">Skardu · Pakistan</span>
        </div>
      </div>

      <nav className="day-selector" aria-label="Day selector">
        <div className="day-selector__inner">
          {days.map((d, i) => (
            <button
              key={i}
              className={`day-btn${active === i ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="day-btn__num">{d.num}</span>
              <span className="day-btn__title">{d.shortTitle}</span>
              <span className="day-btn__date">{d.date}</span>
            </button>
          ))}
        </div>
      </nav>

      {days.map((d, i) => (
        <section key={i} className={`day-panel${active === i ? ' is-active' : ''}`}>
          <div className="topo-bg" aria-hidden="true" />
          <div className="container">
            <div className="day-head">
              <div className="day-head__left">
                <div className="meta">{d.meta}</div>
                <h2>{d.title}</h2>
              </div>
              <div className="day-head__right">
                <p>{d.summary}</p>
                <div className="day-head__pill-row">
                  {d.pills.map((p, j) => (
                    <span key={j} className={`tag ${p.cls}`}>{p.label}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="timeline">
              {d.rows.map((r, j) => (
                <div key={j} className={`tl-row${r.cutoff ? ' tl-row--cutoff' : ''}`}>
                  <div className="tl-time">
                    {r.time}
                    {r.end && <span className="end">{r.end}</span>}
                  </div>
                  <div className="tl-rail">
                    <span className="tl-dot" />
                    {!r.cutoff && <span className="tl-line" />}
                  </div>
                  <div className="tl-card">
                    {r.cutoff ? (
                      <h3 className="tl-card__title">{r.title}</h3>
                    ) : (
                      <>
                        <div className="tl-card__head">
                          <h3 className="tl-card__title">{r.title}</h3>
                          {r.tags && (
                            <div className="tl-card__tags">
                              {r.tags.map((t, k) => (
                                <span key={k} className={`tag ${t.cls}`}>{t.label}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {r.desc && <p className="tl-card__desc">{r.desc}</p>}
                        {r.bullets && (
                          <ul className="tl-card__bullets">
                            {r.bullets.map((b, k) => <li key={k}>{b}</li>)}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
