'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type Fellow = {
  id: number;
  slug?: string;
  init: string;
  name: string;
  org: string;
  sector: string;
  model: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  photo_url?: string;
};

const SECTORS = ['all', 'Health', 'Mental Health', 'Education', 'Special Ed', 'Disability', 'Legal', 'Livelihoods', 'Agriculture'];

export default function FellowsBits({ fellows }: { fellows: Fellow[] }) {
  const [filter, setFilter] = useState<string>('all');

  const visible = fellows.filter((f) => filter === 'all' || f.sector === filter);

  return (
    <>
      <div className="filter-bar">
        <div className="container filter-bar__inner">
          <span className="filter-bar__label">Filter by sector</span>
          {SECTORS.map((s) => (
            <button
              key={s}
              className={`filter-chip${filter === s ? ' is-active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      <section className="fellows-section">
        <div className="container">
          <div className="fellows-grid">
            {visible.map((f, i) => (
              <Link
                key={f.id}
                href={`/fellows/${f.slug ?? ''}`}
                className="fellow-card fellow-card--link"
              >
                <div className="fellow-card__head">
                  <div className="fellow-card__avatar">
                    {f.photo_url ? (
                      <Image
                        src={f.photo_url}
                        alt={f.name}
                        width={80}
                        height={80}
                        className="fellow-card__avatar-image"
                      />
                    ) : (
                      f.init
                    )}
                  </div>
                  <div className="fellow-card__num">No. {String(i + 1).padStart(2, '0')} / {fellows.length}</div>
                </div>
                <h3 className="fellow-card__name">{f.name}</h3>
                <div className="fellow-card__org"><strong>{f.org}</strong></div>
                <div className="fellow-card__sector">{f.sector}</div>
                <p className="fellow-card__model">{f.model.length > 140 ? f.model.slice(0, 140) + '…' : f.model}</p>
                <div className="fellow-card__expand">Read full profile →</div>
              </Link>
            ))}
          </div>
          {visible.length === 0 && <div className="empty-state is-visible">No fellows match this filter.</div>}
        </div>
      </section>
    </>
  );
}
