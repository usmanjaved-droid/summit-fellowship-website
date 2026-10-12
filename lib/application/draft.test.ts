import { describe, expect, it } from 'vitest';
import { clearDraft, draftKey, loadDraft, newDraft, saveDraft } from './draft';

function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v), removeItem: (k) => void m.delete(k),
    clear: () => m.clear(), key: (i) => [...m.keys()][i] ?? null, get length() { return m.size; },
  };
}

describe('draft', () => {
  it('keys drafts by cohort year', () => {
    expect(draftKey(2027)).toBe('summit-application-2027');
  });
  it('round-trips a draft', () => {
    const s = memoryStorage();
    const d = { ...newDraft(2027), step: 2 as const };
    d.answers.A1 = 'Org';
    expect(saveDraft(s, d)).toBe(true);
    const back = loadDraft(s, 2027);
    expect(back.step).toBe(2);
    expect(back.answers.A1).toBe('Org');
  });
  it('starts fresh on corrupt JSON, wrong year, or wrong shape', () => {
    const s = memoryStorage();
    s.setItem(draftKey(2027), '{not json');
    expect(loadDraft(s, 2027)).toEqual(newDraft(2027));
    s.setItem(draftKey(2027), JSON.stringify({ ...newDraft(2026), year: 2026 }));
    expect(loadDraft(s, 2027)).toEqual(newDraft(2027));
    s.setItem(draftKey(2027), JSON.stringify({ version: 1, year: 2027, step: 'x', screener: 1, answers: [] }));
    expect(loadDraft(s, 2027)).toEqual(newDraft(2027));
  });
  it('fills answers added to the schema after the draft was saved', () => {
    const s = memoryStorage();
    const d = newDraft(2027);
    delete (d.answers as Record<string, unknown>).H2;
    s.setItem(draftKey(2027), JSON.stringify(d));
    expect(loadDraft(s, 2027).answers.H2).toBe('');
  });
  it('tolerates missing or throwing storage', () => {
    expect(loadDraft(null, 2027)).toEqual(newDraft(2027));
    const throwing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } } as unknown as Storage;
    expect(loadDraft(throwing, 2027)).toEqual(newDraft(2027));
    expect(saveDraft(throwing, newDraft(2027))).toBe(false);
    expect(() => clearDraft(throwing, 2027)).not.toThrow();
  });
});
