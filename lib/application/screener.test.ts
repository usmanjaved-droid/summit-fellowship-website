import { describe, expect, it } from 'vitest';
import { SCREENER_QUESTIONS, isEligible, isScreenerComplete } from './screener';

const allYes = Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, 'yes' as const]));

describe('screener', () => {
  it('has the founder question plus six thresholds', () => {
    expect(SCREENER_QUESTIONS.filter((q) => q.threshold)).toHaveLength(6);
    expect(SCREENER_QUESTIONS.find((q) => q.id === 'founder')?.threshold).toBe(false);
  });
  it('is complete only when every question is answered', () => {
    expect(isScreenerComplete(allYes)).toBe(true);
    expect(isScreenerComplete({ ...allYes, budget: '' })).toBe(false);
  });
  it('is eligible when every threshold is yes, regardless of founder', () => {
    expect(isEligible({ ...allYes, founder: 'no' })).toBe(true);
    expect(isEligible({ ...allYes, english: 'no' })).toBe(false);
  });
});
