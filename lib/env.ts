import type { MetadataRoute } from 'next';

type Env = Record<string, string | undefined>;

export function isProductionDeploy(env: Env = process.env): boolean {
  return env.VERCEL_ENV === 'production';
}

export function buildRobots(env: Env = process.env): MetadataRoute.Robots {
  return isProductionDeploy(env)
    ? { rules: { userAgent: '*', allow: '/' } }
    : { rules: { userAgent: '*', disallow: '/' } };
}
