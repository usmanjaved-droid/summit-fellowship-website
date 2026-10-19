import { describe, expect, it } from 'vitest';
import { createRateLimiter } from './application/rateLimit';
import { createNotifyStore, handleNotify, isValidEmail, type NotifyContext } from './notify';

function ctx(over: Partial<NotifyContext> = {}) {
  const saved: [number, string][] = [];
  const base: NotifyContext = {
    ip: '1.1.1.1', now: 0, cohortYear: 2027,
    limiter: createRateLimiter({ limit: 3, windowMs: 60_000 }),
    store: { save: async (y, e) => { saved.push([y, e]); } },
  };
  return { c: { ...base, ...over }, saved };
}

describe('isValidEmail', () => {
  it('accepts ordinary addresses and rejects junk', () => {
    expect(isValidEmail('ayesha@example.org')).toBe(true);
    expect(isValidEmail(' ayesha@example.org ')).toBe(true);
    expect(isValidEmail('ayesha@example')).toBe(false);
    expect(isValidEmail('not an email')).toBe(false);
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(`${'a'.repeat(250)}@x.org`)).toBe(false);
  });
});

describe('handleNotify', () => {
  it('saves a lower-cased, trimmed email for the current cohort', async () => {
    const { c, saved } = ctx();
    const r = await handleNotify({ email: '  Ayesha@Example.ORG ' }, c);
    expect(r).toEqual({ status: 200, body: { ok: true } });
    expect(saved).toEqual([[2027, 'ayesha@example.org']]);
  });
  it('rejects a bad email without saving', async () => {
    const { c, saved } = ctx();
    expect((await handleNotify({ email: 'nope' }, c)).status).toBe(400);
    expect(saved).toEqual([]);
  });
  it('rejects malformed bodies', async () => {
    const { c } = ctx();
    expect((await handleNotify(null, c)).status).toBe(400);
    expect((await handleNotify([], c)).status).toBe(400);
  });
  it('pretends to succeed for bots that fill the honeypot', async () => {
    const { c, saved } = ctx();
    expect(await handleNotify({ email: 'a@b.co', nickname: 'bot' }, c)).toEqual({ status: 200, body: { ok: true } });
    expect(saved).toEqual([]);
  });
  it('rate-limits by connection', async () => {
    const { c } = ctx();
    for (let i = 0; i < 3; i++) expect((await handleNotify({ email: `a${i}@b.co` }, c)).status).toBe(200);
    expect((await handleNotify({ email: 'a9@b.co' }, c)).status).toBe(429);
  });
  it('reports a store failure as 502', async () => {
    const { c } = ctx({ store: { save: async () => { throw new Error('down'); } } });
    expect((await handleNotify({ email: 'a@b.co' }, c)).status).toBe(502);
  });
});

describe('createNotifyStore', () => {
  it('needs the Supabase env vars', () => {
    expect(() => createNotifyStore({})).toThrow();
  });
  it('calls the submit_notify_signup function with the publishable key', async () => {
    const calls: [string, RequestInit][] = [];
    const fake = (async (url: string, init: RequestInit) => {
      calls.push([url, init]);
      return new Response(null, { status: 204 });
    }) as unknown as typeof fetch;
    await createNotifyStore({ SUPABASE_URL: 'https://x.supabase.co/', SUPABASE_PUBLISHABLE_KEY: 'k' }, fake).save(2027, 'a@b.co');
    expect(calls[0][0]).toBe('https://x.supabase.co/rest/v1/rpc/submit_notify_signup');
    expect(JSON.parse(calls[0][1].body as string)).toEqual({ p_cohort_year: 2027, p_email: 'a@b.co' });
    expect((calls[0][1].headers as Record<string, string>).apikey).toBe('k');
  });
});
