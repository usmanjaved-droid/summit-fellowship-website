import { HONEYPOT_FIELD } from './application/handle';

/** "Get notified when applications open": validation, the handler behind POST /api/notify, and its Supabase store. */

export type NotifyResponse = { ok: boolean; error?: string };

export interface NotifyStore {
  save(cohortYear: number, email: string): Promise<void>;
}

export type NotifyContext = {
  ip: string;
  now: number;
  cohortYear: number;
  store: NotifyStore;
  limiter: { allow(key: string, now: number): boolean };
};

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isValidEmail(raw: string): boolean {
  const email = raw.trim();
  return email.length <= 254 && EMAIL.test(email);
}

const reply = (status: number, body: NotifyResponse) => ({ status, body });

export async function handleNotify(body: unknown, ctx: NotifyContext) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { ok: false, error: 'Malformed request.' });
  const b = body as Record<string, unknown>;

  if (typeof b[HONEYPOT_FIELD] === 'string' && (b[HONEYPOT_FIELD] as string).trim() !== '') return reply(200, { ok: true });
  if (!ctx.limiter.allow(ctx.ip, ctx.now)) {
    return reply(429, { ok: false, error: 'Too many requests from this connection. Please try again in a few minutes.' });
  }

  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  if (!isValidEmail(email)) return reply(400, { ok: false, error: 'Please enter a valid email address.' });

  try {
    await ctx.store.save(ctx.cohortYear, email);
  } catch (e) {
    console.error('[notify] store failed', e);
    return reply(502, { ok: false, error: 'We could not save your email just now. Please try again in a moment.' });
  }
  return reply(200, { ok: true });
}

export class NotifyConfigError extends Error {}

export function createNotifyStore(env: Record<string, string | undefined>, fetchImpl: typeof fetch = fetch): NotifyStore {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new NotifyConfigError('SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set');
  return {
    async save(cohortYear, email) {
      const res = await fetchImpl(`${url.replace(/\/$/, '')}/rest/v1/rpc/submit_notify_signup`, {
        method: 'POST',
        headers: { apikey: key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_cohort_year: cohortYear, p_email: email }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
    },
  };
}
