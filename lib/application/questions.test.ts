import { describe, expect, it } from 'vitest';
import { ALL_QUESTIONS, SCHEMA_VERSION, SECTIONS } from './questions';

describe('question schema', () => {
  it('has sections A to H in order', () => {
    expect(SECTIONS.map((s) => s.id)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    expect(SCHEMA_VERSION).toBe('v5');
  });
  it('has unique question ids', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('gives the written answers word limits, longest G3 at 250 words', () => {
    const limits = Object.fromEntries(ALL_QUESTIONS.flatMap((q) => (q.kind === 'text' && q.maxWords ? [[q.id, q.maxWords]] : [])));
    expect(limits).toEqual({ D1: 120, E2a: 120, E2b: 120, E2c: 120, F4: 150, G3: 250, H2: 200 });
  });
  it('keeps every safety cap roomy enough for the word limit', () => {
    for (const q of ALL_QUESTIONS) if (q.kind === 'text' && q.maxWords) expect(q.maxChars).toBeGreaterThanOrEqual(q.maxWords * 10);
  });
  it('contains the identity fields the server needs', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(ids).toEqual(expect.arrayContaining(['A1', 'B1', 'B3']));
  });
  it('never names the Scale Screen', () => {
    expect(JSON.stringify(SECTIONS)).not.toMatch(/scale screen/i);
  });
  it('C1 has four stage rungs (post-pilot only) and F1 nine evidence rungs', () => {
    const c1 = ALL_QUESTIONS.find((q) => q.id === 'C1');
    const f1 = ALL_QUESTIONS.find((q) => q.id === 'F1');
    expect(c1?.kind === 'radio' && c1.options.length).toBe(4);
    expect(f1?.kind === 'radio' && f1.options.length).toBe(9);
  });
});
