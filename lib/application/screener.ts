import type { ScreenerAnswers } from './types';

export type ScreenerQuestion = { id: string; label: string; threshold: boolean };

export const SCREENER_QUESTIONS: ScreenerQuestion[] = [
  { id: 'leader', label: 'Are you the founder, or the senior-most leader with real decision-making power?', threshold: true },
  { id: 'founder', label: 'Are you the founder of the organisation?', threshold: false },
  { id: 'postPilot', label: 'Is your organisation past the pilot stage, with real delivery or reach numbers from the last 12 months?', threshold: true },
  { id: 'budget', label: 'Is your annual budget at least USD 100,000?', threshold: true },
  { id: 'finance', label: 'Do you have basic financial systems in place (audited statements or equivalent)?', threshold: true },
  { id: 'english', label: 'Are you fluent in English?', threshold: true },
  { id: 'presence', label: 'Can you spend seven consecutive days fully present — no email or calls during sessions?', threshold: true },
];

export function emptyScreener(): ScreenerAnswers {
  return Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, ''])) as ScreenerAnswers;
}

export function isScreenerComplete(s: ScreenerAnswers): boolean {
  return SCREENER_QUESTIONS.every((q) => s[q.id] === 'yes' || s[q.id] === 'no');
}

export function isEligible(s: ScreenerAnswers): boolean {
  return SCREENER_QUESTIONS.filter((q) => q.threshold).every((q) => s[q.id] === 'yes');
}
