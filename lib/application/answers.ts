import { ALL_QUESTIONS } from './questions';
import type { Answer, Answers, Cell, ChoiceAnswer, Column, MultiAnswer, NumberAnswer, Question, TableRow } from './types';
import { isBlankRow } from './validate';

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

const isPlainObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

/**
 * Returns `stored` if it has the same shape as `fallback`, otherwise a value
 * conformed to that shape. Unknown object keys are dropped, wrong-typed leaves
 * fall back to the fallback's value, so the result is always safe to render.
 */
export function conform<T>(stored: unknown, fallback: T): T {
  if (typeof fallback === 'string' || typeof fallback === 'boolean') {
    return (typeof stored === typeof fallback ? stored : fallback) as T;
  }
  if (Array.isArray(fallback)) {
    if (!Array.isArray(stored)) return fallback;
    if (fallback.length === 0) return stored.filter((v) => typeof v === 'string') as T;
    const template: unknown = fallback[0];
    return stored.filter(isPlainObject).map((el) => conform(el, template)) as T;
  }
  if (isPlainObject(fallback)) {
    if (!isPlainObject(stored)) return fallback;
    const keys = Object.keys(fallback);
    if (keys.length === 0) {
      return Object.fromEntries(Object.entries(stored).filter(([, v]) => typeof v === 'string')) as T;
    }
    return Object.fromEntries(
      keys.map((k) => [k, conform(stored[k], (fallback as Record<string, unknown>)[k])]),
    ) as T;
  }
  return fallback;
}

const isNumberCell = (c: Cell): c is NumberAnswer => typeof c === 'object' && c !== null;
const clearUntracked = (n: NumberAnswer): NumberAnswer => (n.untracked ? { value: '', untracked: true } : n);

function cleanAnswer(q: Question, a: Answer): Answer {
  switch (q.kind) {
    case 'number':
      return clearUntracked(a as NumberAnswer);
    case 'select': {
      const v = a as ChoiceAnswer;
      return q.specify?.options.includes(v.choice) ? v : { ...v, specify: '' };
    }
    case 'multiselect': {
      const v = a as MultiAnswer;
      return q.specify && v.choices.some((c) => q.specify!.options.includes(c)) ? v : { ...v, specify: '' };
    }
    case 'table':
      return (a as TableRow[])
        .map((row) => Object.fromEntries(Object.entries(row).map(([k, c]) => [k, isNumberCell(c) ? clearUntracked(c) : c])))
        .filter((row) => !isBlankRow(row));
    default:
      return a;
  }
}

/**
 * Server-side normalisation of submitted answers: unknown question ids and
 * nested keys are dropped, every answer is coerced to its schema shape, values
 * behind "We don't track this" are cleared, "Please specify" text that no
 * longer applies is cleared, and completely blank table rows are removed.
 */
export function normalizeAnswers(raw: unknown): Answers {
  const shaped = conform(pickKnownAnswers(raw), emptyAnswers());
  return Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, cleanAnswer(q, shaped[q.id])]));
}
