import { describe, expect, it } from 'vitest';
import { SCREENER_QUESTIONS, isEligible, isScreenerComplete, unmetRequirements } from './screener';

const allYes = Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, 'yes' as const]));

describe('screener', () => {
  it('has six requirements, each with its own not-the-right-fit line', () => {
    expect(SCREENER_QUESTIONS.map((q) => q.id)).toEqual(['leader', 'postPilot', 'pakistan', 'finance', 'english', 'presence']);
    expect(SCREENER_QUESTIONS.every((q) => q.notFit.length > 0)).toBe(true);
  });
  it('no longer asks about budget or founder status', () => {
    const ids = SCREENER_QUESTIONS.map((q) => q.id);
    expect(ids).not.toContain('budget');
    expect(ids).not.toContain('founder');
  });
  it('is complete only when every question is answered', () => {
    expect(isScreenerComplete(allYes)).toBe(true);
    expect(isScreenerComplete({ ...allYes, pakistan: '' })).toBe(false);
  });
  it('is eligible only when every answer is yes', () => {
    expect(isEligible(allYes)).toBe(true);
    expect(isEligible({ ...allYes, pakistan: 'no' })).toBe(false);
  });
  it('lists exactly the requirements answered no, in order', () => {
    expect(unmetRequirements(allYes)).toEqual([]);
    expect(unmetRequirements({ ...allYes, english: 'no', leader: 'no' }).map((q) => q.id)).toEqual(['leader', 'english']);
  });
});
