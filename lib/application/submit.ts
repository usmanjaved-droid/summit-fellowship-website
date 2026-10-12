import type { SubmissionPayload } from './handle';

export type SubmitResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };

const RETRY = 'We could not reach the server. Your answers are still saved in this browser — check your connection and try again.';

export async function submitApplication(payload: SubmissionPayload, fetchImpl: typeof fetch = fetch): Promise<SubmitResult> {
  try {
    const res = await fetchImpl('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
  }
}
