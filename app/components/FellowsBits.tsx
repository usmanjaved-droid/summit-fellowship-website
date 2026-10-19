'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { FellowCard } from '@/lib/fellows';
import styles from './FellowsBits.module.css';

const SECTORS = ['all', 'Health', 'Mental Health', 'Education', 'Special Ed', 'Disability', 'Legal', 'Livelihoods', 'Agriculture'];

/** Card blurb: whole text if short, otherwise cut at the last full word before `max`. */
function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.—-]+$/, '') + '…';
}

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
            {visible.map((f, i) => (
              <li key={f.slug} className={styles['fellows-grid__item']}>
                <Link href={`${basePath}/${f.slug}`} className={styles['fellow-card']}>
                  <span className={styles['fellow-card__head']}>
                    <span className={styles['fellow-card__avatar']}>
                      {f.photo_url ? (
                        <Image
                          src={f.photo_url}
                          alt={f.name}
                          width={80}
                          height={80}
                          className={styles['fellow-card__avatar-image']}
                        />
                      ) : (
                        f.init
                      )}
                    </span>
                    <span className={styles['fellow-card__num']}>{`No. ${String(i + 1).padStart(2, '0')} / ${fellows.length}`}</span>
                  </span>
                  <h3 className={styles['fellow-card__name']}>{f.name}</h3>
                  <span className={styles['fellow-card__org']}>{f.org}</span>
                  <span className={`t-eyebrow ${styles['fellow-card__sector']}`}>{f.sector}</span>
                  <span className={`t-card-body ${styles['fellow-card__model']}`}>
                    {shorten(f.summary, 140)}
                  </span>
                  <span className={`t-eyebrow ${styles['fellow-card__expand']}`}>Read full profile →</span>
                </Link>
              </li>
            ))}
          </ul>
          {visible.length === 0 && <p className={styles['empty-state']}>No fellows match this filter.</p>}
        </div>
      </section>
    </>
  );
}
