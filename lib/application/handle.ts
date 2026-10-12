import { pickKnownAnswers } from './answers';
import { SCHEMA_VERSION } from './questions';
import { SCREENER_QUESTIONS, isEligible, isScreenerComplete } from './screener';
import type { ApplicationStore } from './store';
import type { Answers, ScreenerAnswers } from './types';
import { validateAll } from './validate';

export const HONEYPOT_FIELD = 'nickname';

export type SubmissionPayload = { screener: ScreenerAnswers; answers: Answers; confirmed: boolean; nickname?: string };
export type SubmitResponse = { ok: boolean; error?: string; fieldErrors?: Record<string, string> };
export type HandlerContext = {
  ip: string;
  now: number;
  cohortYear: number;
  live: boolean;
  store: ApplicationStore;
  limiter: { allow(key: string, now: number): boolean };
};

const reply = (status: number, body: SubmitResponse) => ({ status, body });

function cleanScreener(raw: unknown): ScreenerAnswers {
  const src = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  return Object.fromEntries(
    SCREENER_QUESTIONS.map((q) => [q.id, src[q.id] === 'yes' || src[q.id] === 'no' ? src[q.id] : '']),
  ) as ScreenerAnswers;
}

export async function handleSubmission(body: unknown, ctx: HandlerContext) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { ok: false, error: 'Malformed request.' });
  const b = body as Record<string, unknown>;

  if (typeof b[HONEYPOT_FIELD] === 'string' && (b[HONEYPOT_FIELD] as string).trim() !== '') return reply(200, { ok: true });
  if (!ctx.live) return reply(403, { ok: false, error: 'Applications are closed.' });
  if (!ctx.limiter.allow(ctx.ip, ctx.now)) {
    return reply(429, { ok: false, error: 'Too many submissions from this connection. Please wait a few minutes and try again.' });
  }

  const screener = cleanScreener(b.screener);
  if (!isScreenerComplete(screener) || !isEligible(screener)) {
    return reply(400, { ok: false, error: 'The eligibility answers are incomplete or do not meet the criteria.' });
  }
  if (b.confirmed !== true) {
    return reply(400, { ok: false, error: 'Please confirm the statement before submitting.', fieldErrors: { confirm: 'Please confirm.' } });
  }

  const answers = pickKnownAnswers(b.answers);
  const fieldErrors = validateAll(answers);
  if (Object.keys(fieldErrors).length > 0) return reply(400, { ok: false, error: 'Some answers need attention.', fieldErrors });

  try {
    await ctx.store.save({
      cohortYear: ctx.cohortYear,
      applicantName: answers.B1 as string,
      applicantEmail: answers.B3 as string,
      orgName: answers.A1 as string,
      screener,
      answers,
      schemaVersion: SCHEMA_VERSION,
    });
  } catch {
    return reply(502, {
      ok: false,
      error: 'We could not save your application. Your answers are still saved in this browser — please try again in a few minutes.',
    });
  }
  return reply(201, { ok: true });
}
