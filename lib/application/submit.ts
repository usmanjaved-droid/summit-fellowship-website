import type { SubmissionPayload } from './handle';

export type SubmitResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };

const RETRY = 'We could not reach the server. Your answers are still saved in this browser — check your connection and try again.';

/** Gives up after this long so a stalled connection never leaves the applicant waiting forever. */
export const SUBMIT_TIMEOUT_MS = 40_000;

export async function submitApplication(
  payload: SubmissionPayload,
  fetchImpl: typeof fetch = fetch,
  timeoutMs: number = SUBMIT_TIMEOUT_MS,
): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    let data: { ok?: boolean; error?: string; fieldErrors?: Record<string, string> } = {};
    try {
      data = await res.json();
    } catch {
      return { ok: false, error: RETRY };
    }
    if (res.ok && data.ok) return { ok: true };
    const fe = data.fieldErrors;
    const fieldErrors =
      fe && typeof fe === 'object' && !Array.isArray(fe) && Object.values(fe).every((v) => typeof v === 'string')
        ? fe
        : undefined;
    return { ok: false, error: typeof data.error === 'string' ? data.error : RETRY, ...(fieldErrors ? { fieldErrors } : {}) };
  } catch {
    return { ok: false, error: RETRY };
  } finally {
    clearTimeout(timer);
  }
}
