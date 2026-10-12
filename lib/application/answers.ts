import { ALL_QUESTIONS } from './questions';
import type { Answer, Answers, Column, Question, TableRow } from './types';

export function emptyRow(columns: Column[]): TableRow {
  return Object.fromEntries(
    columns.map((c) => [c.id, c.kind === 'number' ? { value: '', untracked: false } : '']),
  );
}

export function emptyAnswer(q: Question): Answer {
  switch (q.kind) {
    case 'number':
      return { value: '', untracked: false };
    case 'select':
      return { choice: '', specify: '' };
    case 'multiselect':
      return { choices: [], specify: '' };
    case 'sentence':
      return Object.fromEntries(q.parts.flatMap((p) => (typeof p === 'string' ? [] : [[p.id, '']])));
    case 'table':
      return Array.from({ length: Math.max(1, q.minRows) }, () => emptyRow(q.columns));
    default:
      return '';
  }
}

export function emptyAnswers(): Answers {
  return Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, emptyAnswer(q)]));
}

const KNOWN = new Set(ALL_QUESTIONS.map((q) => q.id));

/** Keeps only keys that are real question ids. Shapes are checked later by the validator. */
export function pickKnownAnswers(raw: unknown): Answers {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  return Object.fromEntries(Object.entries(raw as Record<string, Answer>).filter(([k]) => KNOWN.has(k)));
}
