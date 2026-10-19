import { describe, expect, it } from 'vitest';
import { buildRobots, isProductionDeploy, siteUrl } from './env';

describe('isProductionDeploy', () => {
  it('is true only for VERCEL_ENV=production', () => {
    expect(isProductionDeploy({ VERCEL_ENV: 'production' })).toBe(true);
    expect(isProductionDeploy({ VERCEL_ENV: 'preview' })).toBe(false);
    expect(isProductionDeploy({ VERCEL_ENV: 'development' })).toBe(false);
    expect(isProductionDeploy({})).toBe(false);
  });
});

describe('siteUrl', () => {
  it('uses the production domain in production, the deployment URL elsewhere, localhost locally', () => {
    expect(siteUrl({ VERCEL_ENV: 'production', VERCEL_PROJECT_PRODUCTION_URL: 'site.example', VERCEL_URL: 'x.vercel.app' })).toBe('https://site.example');
    expect(siteUrl({ VERCEL_ENV: 'preview', VERCEL_URL: 'x.vercel.app' })).toBe('https://x.vercel.app');
    expect(siteUrl({})).toBe('http://localhost:3000');
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
