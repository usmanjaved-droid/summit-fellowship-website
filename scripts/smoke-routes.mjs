/** Route expectations checked by scripts/smoke.mjs. Tasks append entries. */
export const ROUTES = [
  { path: '/', status: 200, contains: ['Staging — not the live site'] },
  { path: '/robots.txt', status: 200, contains: ['Disallow: /'] },
  { path: '/cohorts', status: 200, contains: ['2026 · Skardu'] },
  { path: '/cohorts/2026', status: 200, contains: ['Eleven founders', 'The Week', 'Habiba Banu'] },
  { path: '/cohorts/2026/fellows/habiba-banu', status: 200, contains: ['Habiba Banu', 'The Mission'] },
  { path: '/cohorts/2026/fellows/nobody', status: 404 },
  { path: '/cohorts/1999', status: 404 },
  { path: '/fellows', status: 404 },
  { path: '/fellows/habiba-banu', status: 404 },
];
