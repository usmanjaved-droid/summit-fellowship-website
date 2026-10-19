'use client';

import { useState } from 'react';
import type { FellowCard } from '@/lib/fellows';
import { SolverCard } from './fop';
import styles from './FellowsBits.module.css';

const SECTORS = ['all', 'Health', 'Mental Health', 'Education', 'Special Ed', 'Disability', 'Legal', 'Livelihoods', 'Agriculture'];

export default function FellowsBits({ fellows, basePath }: { fellows: FellowCard[]; basePath: string }) {
  const [filter, setFilter] = useState<string>('all');

  const visible = fellows.filter((f) => filter === 'all' || f.sector === filter);

  return (
    <>
      <div className={styles['filter-bar']}>
        <div className={styles['filter-bar__inner']} role="group" aria-labelledby="fellows-filter-label">
          <span id="fellows-filter-label" className={`t-eyebrow ${styles['filter-bar__label']}`}>Filter by sector</span>
          {SECTORS.map((s) => (
            <button
              key={s}
              type="button"
              className={styles['filter-chip']}
              aria-pressed={filter === s}
              onClick={() => setFilter(s)}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      <section className={styles['fellows-section']}>
        <div className="container">
          <ul className={styles['fellows-grid']}>
            {visible.map((f) => (
              <li key={f.slug} className={styles['fellow-card']}>
                <SolverCard
                  name={f.name}
                  eyebrow={f.sector}
                  description={f.org}
                  image={f.photo_url}
                  href={`${basePath}/${f.slug}`}
                  fallback={f.init}
                />
                <p className={`t-card-body ${styles['fellow-card__summary']}`}>
                  {f.summary.length > 140 ? f.summary.slice(0, 140) + '…' : f.summary}
                </p>
              </li>
            ))}
          </ul>
          {visible.length === 0 && <p className={styles['empty-state']}>No fellows match this filter.</p>}
        </div>
      </section>
    </>
  );
}
