import type { ScreenerAnswers } from './types';

/** Every eligibility question is a requirement: a "no" to any one ends the application. */
export type ScreenerQuestion = {
  id: string;
  label: string;
  /** Shown on the "not the right fit" screen when this question is answered "no". */
  notFit: string;
};

export const SCREENER_QUESTIONS: ScreenerQuestion[] = [
  {
    id: 'leader',
    label: 'Are you the founder, a co-founder, or the senior-most leader with real decision-making power?',
    notFit: 'The fellowship is for founders, co-founders, or the senior-most leader of an organisation: the person who can make decisions about its model.',
  },
  {
    id: 'postPilot',
    label: 'Is your organisation past the pilot stage, with real delivery or reach numbers from the last 12 months?',
    notFit: 'The fellowship is for organisations past the pilot stage, with real delivery or reach numbers from the last 12 months.',
  },
  {
    id: 'pakistan',
    label: 'Does your work serve people in Pakistan?',
    notFit: 'The fellowship is for organisations already working with people in Pakistan.',
  },
  {
    id: 'finance',
    label: 'Do you keep basic financial records, such as annual accounts?',
    notFit: 'The fellowship asks that organisations keep basic financial records, such as annual accounts.',
  },
  {
    id: 'english',
    label: 'Are you fluent in English?',
    notFit: 'The fellowship runs in English, so fluency is needed to take part fully.',
  },
  {
    id: 'presence',
    label: 'Can you spend seven consecutive days fully present — no email or calls during sessions?',
    notFit: 'The week only works if every fellow is fully present for all seven days.',
  },
];

export function emptyScreener(): ScreenerAnswers {
  return Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, ''])) as ScreenerAnswers;
}

export function isScreenerComplete(s: ScreenerAnswers): boolean {
  return SCREENER_QUESTIONS.every((q) => s[q.id] === 'yes' || s[q.id] === 'no');
}

export function isEligible(s: ScreenerAnswers): boolean {
  return SCREENER_QUESTIONS.every((q) => s[q.id] === 'yes');
}

/** The requirements answered "no", in question order (what the "not the right fit" screen explains). */
export function unmetRequirements(s: ScreenerAnswers): ScreenerQuestion[] {
  return SCREENER_QUESTIONS.filter((q) => s[q.id] === 'no');
}
