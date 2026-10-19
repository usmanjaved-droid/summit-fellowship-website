import { describe, expect, it } from 'vitest';
import { getAdjacentFellows, getAllFellows, getFellow, getFellowCards, getFellowNumber, initials } from './fellows';

describe('fellows', () => {
  it('has 10 fellows in 2026', () => {
    expect(getAllFellows(2026)).toHaveLength(10);
  });
  it('returns [] for an unknown cohort', () => {
    expect(getAllFellows(1999)).toEqual([]);
  });
  it('finds by year and slug', () => {
    expect(getFellow(2026, 'habiba-banu')?.name).toBe('Habiba Banu');
    expect(getFellow(2026, 'nobody')).toBeNull();
    expect(getFellow(1999, 'habiba-banu')).toBeNull();
  });
  it('numbers fellows 1-based', () => {
    expect(getFellowNumber(2026, getAllFellows(2026)[0].id)).toBe(1);
    expect(getFellowNumber(2026, 'nobody')).toBe(0);
  });
  it('every fellow has a card summary', () => {
    for (const f of getAllFellows(2026)) expect(f.card_summary.trim().length).toBeGreaterThan(20);
  });
  it('stores contact details but keeps them out of cards', () => {
    expect(getFellow(2026, 'habiba-banu')?.email).toBe('habiba.banu@spiro.ngo');
    const card = getFellowCards(2026)[0];
    expect(Object.keys(card).sort()).toEqual(['init', 'name', 'org', 'photo_url', 'sector', 'slug', 'summary'].sort());
  });
});

describe('getAdjacentFellows', () => {
  it('links neighbours in cohort order, with nothing past either end', () => {
    const all = getAllFellows(2026);
    expect(getAdjacentFellows(2026, all[0].id)).toEqual({ prev: null, next: all[1] });
    expect(getAdjacentFellows(2026, all[4].id)).toEqual({ prev: all[3], next: all[5] });
    expect(getAdjacentFellows(2026, all[9].id)).toEqual({ prev: all[8], next: null });
  });
  it('returns nothing for an unknown slug', () => {
    expect(getAdjacentFellows(2026, 'nobody')).toEqual({ prev: null, next: null });
  });
});

describe('initials', () => {
  it('takes the first two initials, uppercased', () => {
    expect(initials('Habiba Banu')).toBe('HB');
    expect(initials('Dr. Rubeena Kidwai')).toBe('DR');
  });
});
