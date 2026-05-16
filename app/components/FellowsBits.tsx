'use client';

import { useState } from 'react';

export type Fellow = {
  id: number;
  init: string;
  name: string;
  org: string;
  sector: string;
  model: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
};

const SECTORS = ['all', 'Health', 'Mental Health', 'Education', 'Special Ed', 'Disability', 'Legal', 'Livelihoods', 'Agriculture'];

export default function FellowsBits({ fellows }: { fellows: Fellow[] }) {
  const [filter, setFilter] = useState<string>('all');
  const [open, setOpen] = useState<Fellow | null>(null);

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
          <span className="filter-bar__count">Showing {visible.length} of {fellows.length}</span>
        </div>
      </div>

      <section className="fellows-section">
        <div className="container">
          <div className="fellows-grid">
            {visible.map((f, i) => (
              <article key={f.id} className="fellow-card" onClick={() => setOpen(f)}>
                <div className="fellow-card__head">
                  <div className="fellow-card__avatar">{f.init}</div>
                  <div className="fellow-card__num">No. {String(i + 1).padStart(2, '0')} / {fellows.length}</div>
                </div>
                <h3 className="fellow-card__name">{f.name}</h3>
                <div className="fellow-card__org"><strong>{f.org}</strong></div>
                <div className="fellow-card__sector">{f.sector}</div>
                <p className="fellow-card__model">{f.model.length > 140 ? f.model.slice(0, 140) + '…' : f.model}</p>
                <div className="fellow-card__expand">Read full profile</div>
              </article>
            ))}
          </div>
          {visible.length === 0 && <div className="empty-state is-visible">No fellows match this filter.</div>}
        </div>
      </section>

      <div
        className={`modal-backdrop${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
      >
        {open && (
          <div className="modal">
            <button className="modal__close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
            <div className="modal__head">
              <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
              <div className="modal__head-inner">
                <div className="modal__avatar">{open.init}</div>
                <div>
                  <h2 className="modal__name">{open.name}</h2>
                  <div className="modal__org">{open.org}</div>
                </div>
              </div>
            </div>
            <div className="modal__body">
              <div className="modal__section"><h4>Sector</h4><p>{open.sector}</p></div>
              <div className="modal__section"><h4>Model Overview</h4><p>{open.model}</p></div>
              <div className="modal__section">
                <h4>Contact &amp; Assets</h4>
                <div className="modal__contact-grid">
                  <a href={`mailto:${open.email}`}><span className="l">Email</span>{open.email}</a>
                  <a href={`tel:${open.phone.replace(/\s/g, '')}`}><span className="l">Phone</span>{open.phone}</a>
                  <a href={open.linkedin} target="_blank" rel="noopener noreferrer"><span className="l">LinkedIn</span>Profile →</a>
                  <a href={open.website} target="_blank" rel="noopener noreferrer"><span className="l">Website</span>Visit →</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
