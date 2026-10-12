import { emptyAnswers } from './answers';
import { SECTIONS } from './questions';
import { emptyScreener } from './screener';
import type { Answers, ScreenerAnswers } from './types';

export type Step = 'screener' | 'ineligible' | 'review' | number;
export type Draft = { version: 1; year: number; step: Step; screener: ScreenerAnswers; answers: Answers };

export const draftKey = (year: number) => `summit-application-${year}`;

export function newDraft(year: number): Draft {
  return { version: 1, year, step: 'screener', screener: emptyScreener(), answers: emptyAnswers() };
}

export function safeStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

function isStep(s: unknown): s is Step {
  return s === 'screener' || s === 'ineligible' || s === 'review' || (Number.isInteger(s) && (s as number) >= 0 && (s as number) < SECTIONS.length);
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

export function loadDraft(storage: Storage | null, year: number): Draft {
  try {
    const raw = storage?.getItem(draftKey(year));
    if (!raw) return newDraft(year);
    const d = JSON.parse(raw) as Partial<Draft>;
    if (d.version !== 1 || d.year !== year || !isStep(d.step) || !isPlainObject(d.screener) || !isPlainObject(d.answers)) {
      return newDraft(year);
    }
    const fresh = newDraft(year);
    const screener = Object.fromEntries(
      Object.keys(fresh.screener).map((k) => {
        const v = (d.screener as Record<string, unknown>)[k];
        return [k, v === 'yes' || v === 'no' ? v : ''];
      }),
    ) as ScreenerAnswers;
    return {
      ...fresh,
      step: d.step,
      screener,
      answers: conform(d.answers, fresh.answers),
    };
  } catch {
    return newDraft(year);
  }
}

export function saveDraft(storage: Storage | null, draft: Draft): boolean {
  try {
    if (!storage) return false;
    storage.setItem(draftKey(draft.year), JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(storage: Storage | null, year: number): void {
  try {
    storage?.removeItem(draftKey(year));
  } catch {
    /* storage blocked — nothing to clear */
  }
}
