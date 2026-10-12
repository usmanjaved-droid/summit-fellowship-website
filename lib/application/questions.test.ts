import { describe, expect, it } from 'vitest';
import { ALL_QUESTIONS, SCHEMA_VERSION, SECTIONS } from './questions';

describe('question schema', () => {
  it('has sections A to H in order', () => {
    expect(SECTIONS.map((s) => s.id)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    expect(SCHEMA_VERSION).toBe('v4');
  });
  it('has unique question ids', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('never caps a free-text box above 1,100 characters', () => {
    const caps = ALL_QUESTIONS.flatMap((q) => (q.kind === 'text' ? [q.maxChars] : []));
    expect(Math.max(...caps)).toBe(1100);
  });
  it('has exactly four required free-text boxes over 250 characters (D1, E1, F4, G3)', () => {
    const long = ALL_QUESTIONS.filter((q) => q.kind === 'text' && q.required && q.maxChars > 250).map((q) => q.id);
    expect(long.sort()).toEqual(['D1', 'E1', 'F4', 'G3']);
  });
  it('contains the identity fields the server needs', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(ids).toEqual(expect.arrayContaining(['A1', 'B1', 'B3']));
  });
  it('never names the Scale Screen', () => {
    expect(JSON.stringify(SECTIONS)).not.toMatch(/scale screen/i);
  });
  it('C1 has six stage rungs and F1 nine evidence rungs', () => {
    const c1 = ALL_QUESTIONS.find((q) => q.id === 'C1');
    const f1 = ALL_QUESTIONS.find((q) => q.id === 'F1');
    expect(c1?.kind === 'radio' && c1.options.length).toBe(6);
    expect(f1?.kind === 'radio' && f1.options.length).toBe(9);
  });
});
