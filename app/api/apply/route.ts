import { NextResponse } from 'next/server';
import { handleSubmission } from '@/lib/application/handle';
import { createRateLimiter } from '@/lib/application/rateLimit';
import { StoreConfigError, createSupabaseStore } from '@/lib/application/store';
import { getCurrentCohort, isApplicationLive } from '@/lib/site';

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(req: Request) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  let store;
  try {
    store = createSupabaseStore(process.env);
  } catch (e) {
    if (e instanceof StoreConfigError) console.error('[apply] Supabase env missing');
    return NextResponse.json({ ok: false, error: 'Submissions are not configured. Please email us instead.' }, { status: 500 });
  }

  const cohort = getCurrentCohort();
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const result = await handleSubmission(body, {
    ip,
    now: Date.now(),
    cohortYear: cohort.year,
    live: isApplicationLive(cohort),
    store,
    limiter,
  });
  return NextResponse.json(result.body, { status: result.status });
}
