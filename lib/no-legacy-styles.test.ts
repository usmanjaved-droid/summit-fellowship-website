import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Guards the Friends of Pakistan restyle: the old Alpine/Ochre/Clay palette
 * must not come back, and colours only enter through app/fop-tokens.css.
 */

const TOKEN_FILE = join('app', 'fop-tokens.css');

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(css|tsx|ts)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const files = walk('app').filter((f) => f !== TOKEN_FILE);
const read = (f: string) => readFileSync(f, 'utf8');

const LEGACY_VAR =
  /var\(--(alpine|alpine-deep|alpine-soft|ochre|ochre-deep|ochre-pale|clay|clay-deep|parchment|paper|paper-warm|paper-cool|night|ink-mute|ink-faint|line-soft|mono|font-mono|font-handwriting)\)/g;
const HEX = /#[0-9a-fA-F]{3,8}\b/g;
/** Hex inside an SVG data URI is allowed: CSS variables cannot reach into one. */
const DATA_URI = /url\(\s*(["'])data:[\s\S]*?\1\s*\)/g;

function hits(pattern: RegExp, scope: string[], strip?: RegExp): string[] {
  const found: string[] = [];
  for (const f of scope) {
    const text = strip ? read(f).replace(strip, '') : read(f);
    for (const m of text.matchAll(pattern)) found.push(`${f}: ${m[0]}`);
  }
  return found;
}

describe('no legacy styles', () => {
  it('no legacy palette variables', () => {
    expect(hits(LEGACY_VAR, files)).toEqual([]);
    expect(files.filter((f) => read(f).includes('BRIDGE'))).toEqual([]);
  });

  it('no hex colours outside the token file', () => {
    const scope = files.filter(
      (f) => f.endsWith('.module.css') || f.endsWith('globals.css') || f.endsWith('.tsx'),
    );
    expect(hits(HEX, scope, DATA_URI)).toEqual([]);
  });

  it('every CSS variable used is defined', () => {
    const all = [TOKEN_FILE, ...files].map(read).join('\n');
    const defined = new Set<string>(
      [...all.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]),
    );
    // next/font injects these through the `variable` option in app/layout.tsx.
    defined.add('--font-serif');
    defined.add('--font-sans');
    // Handwriting font for the homepage chart labels, injected in app/components/ExponentialChart.tsx.
    defined.add('--font-chart-hand');
    for (const m of all.matchAll(/['"](--[\w-]+)['"]\s*:/g)) defined.add(m[1]);
    const used = new Set<string>([...all.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]));
    expect([...used].filter((v) => !defined.has(v)).sort()).toEqual([]);
  });
});
