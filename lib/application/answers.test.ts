import { describe, expect, it } from 'vitest';
import { emptyAnswers, pickKnownAnswers } from './answers';
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
});
