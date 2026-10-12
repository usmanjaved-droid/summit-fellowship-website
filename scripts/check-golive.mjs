import { readFileSync } from 'node:fs';

const faq = JSON.parse(readFileSync(new URL('../data/faq.json', import.meta.url), 'utf8'));
const open = faq.flatMap((g) => g.items.filter((i) => i.a.includes('[TO CONFIRM')).map((i) => `${g.group} → ${i.q}`));

if (open.length) {
  console.log(`Not ready for go-live: ${open.length} FAQ answer(s) still contain [TO CONFIRM]:`);
  for (const line of open) console.log(`  - ${line}`);
  process.exit(1);
}
console.log('FAQ ready for go-live.');
