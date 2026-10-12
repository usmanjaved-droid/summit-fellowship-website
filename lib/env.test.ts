import { describe, expect, it } from 'vitest';
import { buildRobots, isProductionDeploy } from './env';

describe('isProductionDeploy', () => {
  it('is true only for VERCEL_ENV=production', () => {
    expect(isProductionDeploy({ VERCEL_ENV: 'production' })).toBe(true);
    expect(isProductionDeploy({ VERCEL_ENV: 'preview' })).toBe(false);
    expect(isProductionDeploy({ VERCEL_ENV: 'development' })).toBe(false);
    expect(isProductionDeploy({})).toBe(false);
  });
});

describe('buildRobots', () => {
  it('allows crawling in production', () => {
    expect(buildRobots({ VERCEL_ENV: 'production' })).toEqual({ rules: { userAgent: '*', allow: '/' } });
  });
  it('disallows everything elsewhere', () => {
    expect(buildRobots({ VERCEL_ENV: 'preview' })).toEqual({ rules: { userAgent: '*', disallow: '/' } });
  });
});
