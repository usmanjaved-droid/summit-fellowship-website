import { ROUTES } from './smoke-routes.mjs';

const base = process.argv[2] ?? 'http://localhost:3100';
let failures = 0;

for (const r of ROUTES) {
  const res = await fetch(base + r.path, { redirect: 'manual' });
  const body = await res.text();
  const problems = [];
  if (res.status !== r.status) problems.push(`status ${res.status} ≠ ${r.status}`);
  for (const text of r.contains ?? []) {
    if (!body.includes(text)) problems.push(`missing "${text}"`);
  }
  for (const text of r.absent ?? []) {
    if (body.includes(text)) problems.push(`unexpected "${text}"`);
  }
  if (problems.length) {
    failures++;
    console.log(`FAIL ${r.path}: ${problems.join('; ')}`);
  } else {
    console.log(`ok   ${r.path}`);
  }
}

console.log(failures ? `\n${failures} route(s) failed` : '\nall routes ok');
process.exit(failures ? 1 : 0);
