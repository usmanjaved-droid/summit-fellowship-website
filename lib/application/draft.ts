import { conform, emptyAnswers } from './answers';
import { SECTIONS } from './questions';
import { emptyScreener } from './screener';
import type { Answers, ScreenerAnswers } from './types';

export type Step = 'screener' | 'ineligible' | 'review' | number;
export type Draft = { version: 1; year: number; step: Step; screener: ScreenerAnswers; answers: Answers };

export const draftKey = (year: number) => `fop-fellowship-application-${year}`;

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
