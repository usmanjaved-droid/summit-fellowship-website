import { describe, expect, it } from 'vitest';
import { emptyAnswers } from './answers';
import { handleSubmission, type HandlerContext } from './handle';
import { createRateLimiter } from './rateLimit';
import { SCREENER_QUESTIONS } from './screener';
import type { ApplicationRecord } from './store';
import type { Answers } from './types';

const screener = Object.fromEntries(SCREENER_QUESTIONS.map((q) => [q.id, 'yes']));

export function validAnswers(): Answers {
  const a = emptyAnswers();
  Object.assign(a, {
    A1: 'Org', A3: 'Non-profit', A4: { choice: 'Trust', specify: '' }, A5: '2019', A6: 'Lahore, Pakistan',
    A7: { choices: ['Punjab'], specify: '' }, A8: { choice: 'Health', specify: '' }, A9: 'none',
    A10: { value: '250000', untracked: false }, A11: { value: '12', untracked: false }, A12: { value: '3', untracked: false },
    B1: 'Ayesha Khan', B2: 'Founder', B3: 'Ayesha@Example.org', B4: '+92 300 1234567', B5: 'none',
    C1: 'It runs at steady state in one geography, without the founder involved day to day.', C2: '03/2020',
    C3: { count: '1200', category: 'teachers', what: 'our app', definition: 'used it in the last 7 days' },
    C4: [{ name: 'Rawalpindi', users: { value: '900', untracked: false }, since: '01/2023' }],
    C5: { choices: ['A mobile app'], specify: '' },
    D1: 'Teachers', D2: [{ problem: 'Teachers lack plans', count: { value: '', untracked: true }, source: 'n/a' }],
    E1: 'We train', E2a: 'Referral', E2b: 'Weekly use', E2c: 'Better lessons',
    E3: { action: 'train', user: 'teachers', behaviour: 'plan', outcome: 'learning', measure: 'scores' },
    F1: 'User testimonials and anecdotes',
    F2: [{ measured: 'Reading', result: '+12 pts', sample: { value: '300', untracked: false }, compared: 'Baseline', who: 'Us', when: '05/2024', link: 'not public' }],
    F3: '% reading at grade level', F4: 'ASER test twice a year',
    G1: { doer: 'Punjab SED', payer: 'Punjab SED' }, G2: 'Government Partnership', G3: 'Path to scale',
    H1: { choice: 'Website', specify: '' }, H2: '',
  });
  return a;
}

function ctx(over: Partial<HandlerContext> = {}) {
  const saved: ApplicationRecord[] = [];
  const base: HandlerContext = {
    ip: '1.1.1.1', now: 0, cohortYear: 2027, live: true,
    limiter: createRateLimiter({ limit: 5, windowMs: 60_000 }),
    store: { save: async (r) => { saved.push(r); return 'id-1'; } },
  };
  return { c: { ...base, ...over }, saved };
}

const body = (over: Record<string, unknown> = {}) => ({ screener, answers: validAnswers(), confirmed: true, nickname: '', ...over });

describe('handleSubmission', () => {
  it('saves a valid application and returns 201', async () => {
    const { c, saved } = ctx();
    const res = await handleSubmission(body(), c);
    expect(res.status).toBe(201);
    expect(saved[0]).toMatchObject({ cohortYear: 2027, applicantName: 'Ayesha Khan', applicantEmail: 'Ayesha@Example.org', orgName: 'Org', schemaVersion: 'v4' });
  });
  it('rejects when applications are closed (403), even if valid', async () => {
    const { c, saved } = ctx({ live: false });
    expect((await handleSubmission(body(), c)).status).toBe(403);
    expect(saved).toHaveLength(0);
  });
  it('silently accepts and drops honeypot submissions', async () => {
    const { c, saved } = ctx();
    const res = await handleSubmission(body({ nickname: 'bot' }), c);
    expect(res.status).toBe(200);
    expect(saved).toHaveLength(0);
  });
  it('rate-limits by ip (429)', async () => {
    const { c } = ctx({ limiter: createRateLimiter({ limit: 1, windowMs: 60_000 }) });
    await handleSubmission(body(), c);
    expect((await handleSubmission(body(), c)).status).toBe(429);
  });
  it('rejects malformed bodies, ineligible screeners and missing confirmation (400)', async () => {
    const { c } = ctx();
    expect((await handleSubmission(null, c)).status).toBe(400);
    expect((await handleSubmission(body({ screener: { ...screener, english: 'no' } }), c)).status).toBe(400);
    expect((await handleSubmission(body({ confirmed: false }), c)).status).toBe(400);
  });
  it('re-validates answers server-side and returns field errors', async () => {
    const { c } = ctx();
    const answers = { ...validAnswers(), A1: 'x'.repeat(500), A11: { value: '1,2', untracked: false } };
    const res = await handleSubmission(body({ answers }), c);
    expect(res.status).toBe(400);
    expect(Object.keys(res.body.fieldErrors ?? {})).toEqual(expect.arrayContaining(['A1', 'A11']));
  });
  it('returns 502 with a retry message when the store fails', async () => {
    const { c } = ctx({ store: { save: async () => { throw new Error('down'); } } });
    const res = await handleSubmission(body(), c);
    expect(res.status).toBe(502);
    expect(res.body.error).toMatch(/still saved in this browser/);
  });
});
