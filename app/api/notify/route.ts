import { NextResponse } from 'next/server';
import { createRateLimiter } from '@/lib/application/rateLimit';
import { NotifyConfigError, createNotifyStore, handleNotify } from '@/lib/notify';
import { getCurrentCohort } from '@/lib/site';

const limiter = createRateLimiter({ limit: 10, windowMs: 10 * 60 * 1000 });

export async function POST(req: Request) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  let store;
  try {
    store = createNotifyStore(process.env);
  } catch (e) {
    if (e instanceof NotifyConfigError) console.error('[notify] Supabase env missing');
    return NextResponse.json({ ok: false, error: 'Sign-ups are not configured. Please email us instead.' }, { status: 500 });
  }

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const result = await handleNotify(body, { ip, now: Date.now(), cohortYear: getCurrentCohort().year, store, limiter });
  return NextResponse.json(result.body, { status: result.status });
}
