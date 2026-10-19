import { afterEach, describe, expect, it, vi } from 'vitest';
import { SUBMIT_TIMEOUT_MS, submitApplication } from './submit';

const payload = { screener: {}, answers: {}, confirmed: true, nickname: '' };
const respond = (status: number, body: unknown) => (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

describe('submitApplication', () => {
  it('returns ok on 201', async () => {
    expect(await submitApplication(payload, respond(201, { ok: true }))).toEqual({ ok: true });
  });
  it('passes server errors and field errors through', async () => {
    const r = await submitApplication(payload, respond(400, { ok: false, error: 'Some answers need attention.', fieldErrors: { A1: 'x' } }));
    expect(r).toEqual({ ok: false, error: 'Some answers need attention.', fieldErrors: { A1: 'x' } });
  });
  it('returns a retry message on network failure or non-JSON', async () => {
    const down = (async () => { throw new TypeError('fetch failed'); }) as unknown as typeof fetch;
    const r1 = await submitApplication(payload, down);
    expect(r1.ok).toBe(false);
    const html = (async () => new Response('<html>', { status: 504 })) as unknown as typeof fetch;
    const r2 = await submitApplication(payload, html);
    expect(r2.ok).toBe(false);
    if (!r2.ok) expect(r2.error).toMatch(/still saved/);
    if (!r1.ok) expect(r1.error).toMatch(/still saved/);
  });
  describe('timeout', () => {
    afterEach(() => vi.useRealTimers());
    // A fetch that only settles when its signal aborts, like a stalled connection.
    const hang = ((_url: unknown, init?: RequestInit) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
      })) as unknown as typeof fetch;

    it('aborts after 40 seconds by default and returns the retry message', async () => {
      vi.useFakeTimers();
      expect(SUBMIT_TIMEOUT_MS).toBe(40_000);
      let settled = false;
      const p = submitApplication(payload, hang).then((r) => { settled = true; return r; });
      await vi.advanceTimersByTimeAsync(39_999);
      expect(settled).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      const r = await p;
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toMatch(/still saved/);
    });
    it('honours an injected timeout', async () => {
      const r = await submitApplication(payload, hang, 10);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toMatch(/still saved/);
    });
  });
});
