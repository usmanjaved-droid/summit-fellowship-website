import type { MetadataRoute } from 'next';

type Env = Record<string, string | undefined>;

export function isProductionDeploy(env: Env = process.env): boolean {
  return env.VERCEL_ENV === 'production';
}

/** The live site's address. The old summit-fellowship-website.vercel.app redirects here (next.config.ts). */
export const PRODUCTION_HOST = 'friendsofpakistan-fellowship.vercel.app';
export const OLD_PRODUCTION_HOST = 'summit-fellowship-website.vercel.app';

/** The site's own address, so shared links can point at absolute preview-image URLs. */
export function siteUrl(env: Env = process.env): string {
  if (isProductionDeploy(env)) return `https://${PRODUCTION_HOST}`;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function buildRobots(env: Env = process.env): MetadataRoute.Robots {
  return isProductionDeploy(env)
    ? { rules: { userAgent: '*', allow: '/' } }
    : { rules: { userAgent: '*', disallow: '/' } };
}
