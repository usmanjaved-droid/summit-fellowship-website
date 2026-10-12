/** Route expectations checked by scripts/smoke.mjs. Tasks append entries. */
export const ROUTES = [
  { path: '/', status: 200, contains: ['Staging — not the live site'] },
  { path: '/robots.txt', status: 200, contains: ['Disallow: /'] },
];
