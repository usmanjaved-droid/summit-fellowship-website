import { describe, expect, it } from 'vitest';
import { emptyAnswers, normalizeAnswers, pickKnownAnswers } from './answers';
import { ALL_QUESTIONS } from './questions';

describe('answers', () => {
  it('creates an empty answer for every question', () => {
    const a = emptyAnswers();
    expect(Object.keys(a).sort()).toEqual(ALL_QUESTIONS.map((q) => q.id).sort());
    expect(a.A10).toEqual({ value: '', untracked: false });
    expect(a.A4).toEqual({ choice: '', specify: '' });
    expect(a.A7).toEqual({ choices: [], specify: '' });
    expect(Array.isArray(a.C4) && a.C4.length).toBe(1);
  });
  it('drops unknown keys and non-objects', () => {
    expect(pickKnownAnswers({ A1: 'Org', evil: 'x' })).toEqual({ A1: 'Org' });
    expect(pickKnownAnswers('nope')).toEqual({});
    expect(pickKnownAnswers(null)).toEqual({});
  });
  it('normalizeAnswers drops nested junk keys from sentence answers and table rows', () => {
    const n = normalizeAnswers({
      C3: { count: '1200', category: 'teachers', what: 'app', definition: 'weekly', evil: 'x'.repeat(10_000) },
      C4: [{ name: 'Rawalpindi', users: { value: '900', untracked: false, junk: 1 }, since: '01/2023', extra: 'x' }],
      zzz: 'extra',
    });
    expect(n.C3).toEqual({ count: '1200', category: 'teachers', what: 'app', definition: 'weekly' });
    expect(n.C4).toEqual([{ name: 'Rawalpindi', users: { value: '900', untracked: false }, since: '01/2023' }]);
    expect('zzz' in n).toBe(false);
    expect(Object.keys(n).sort()).toEqual(ALL_QUESTIONS.map((q) => q.id).sort());
  });
  it("normalizeAnswers clears values hidden behind \"We don't track this\"", () => {
    const n = normalizeAnswers({
      A10: { value: '9'.repeat(5000), untracked: true },
      D2: [{ problem: 'p', count: { value: 'junk', untracked: true }, source: 's' }],
    });
    expect(n.A10).toEqual({ value: '', untracked: true });
    expect(n.D2).toEqual([{ problem: 'p', count: { value: '', untracked: true }, source: 's' }]);
  });
  it('normalizeAnswers clears "Please specify" text that no longer applies', () => {
    const a4 = ALL_QUESTIONS.find((q) => q.id === 'A4');
    const a7 = ALL_QUESTIONS.find((q) => q.id === 'A7');
    if (a4?.kind !== 'select' || a7?.kind !== 'multiselect') throw new Error('schema changed');
    const plain4 = a4.options.find((o) => !a4.specify?.options.includes(o))!;
    const plain7 = a7.options.find((o) => !a7.specify?.options.includes(o))!;
    const n = normalizeAnswers({ A4: { choice: plain4, specify: 'stale' }, A7: { choices: [plain7], specify: 'stale' } });
    expect(n.A4).toEqual({ choice: plain4, specify: '' });
    expect(n.A7).toEqual({ choices: [plain7], specify: '' });
    if (a4.specify) {
      const other = a4.specify.options[0];
      expect(normalizeAnswers({ A4: { choice: other, specify: 'kept' } }).A4).toEqual({ choice: other, specify: 'kept' });
    }
  });
  it('normalizeAnswers drops fully blank table rows', () => {
    const blank = { name: '', users: { value: '', untracked: false }, since: '' };
    const used = { name: 'Lahore', users: { value: '5', untracked: false }, since: '01/2020' };
    expect(normalizeAnswers({ C4: [used, blank, blank] }).C4).toEqual([used]);
  });
});
