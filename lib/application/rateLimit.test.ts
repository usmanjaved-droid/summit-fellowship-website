import { describe, expect, it } from 'vitest';
import { createRateLimiter } from './rateLimit';

describe('rate limiter', () => {
  it('allows up to the limit per key within the window', () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(rl.allow('a', 0)).toBe(true);
    expect(rl.allow('a', 10)).toBe(true);
    expect(rl.allow('a', 20)).toBe(false);
    expect(rl.allow('b', 20)).toBe(true);
  });
  it('frees capacity after the window passes', () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(rl.allow('a', 0)).toBe(true);
    expect(rl.allow('a', 999)).toBe(false);
    expect(rl.allow('a', 1001)).toBe(true);
  });
});
