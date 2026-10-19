import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildTokensCss } from '../scripts/build-fop-tokens.mjs';

const tokens = JSON.parse(
  readFileSync(
    'docs/design-system/friends-of-pakistan/project/tokens.json',
    'utf8',
  ),
);
const css: string = buildTokensCss(tokens);

function block(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  expect(start).toBeGreaterThan(-1);
  return css.slice(start, css.indexOf('\n}', start));
}

describe('Friends of Pakistan tokens', () => {
  it('generated file is in sync', () => {
    // Git on Windows may check the file out with CRLF line endings; compare content, not line endings.
    expect(readFileSync('app/fop-tokens.css', 'utf8').replace(/\r\n/g, '\n')).toBe(css);
  });

  it('light values', () => {
    const root = block(':root');
    expect(root).toContain('--primary: #ffc700;');
    expect(root).toContain('--brand-green-deep: #003800;');
    expect(root).toContain('--surface: var(--off-white);');
  });

  it('dark theme flips', () => {
    const dark = block('[data-theme="dark"]');
    expect(dark).toContain('--surface: var(--brand-green-deep);');
    expect(dark).toContain('--ink: var(--white);');
    expect(dark).toContain('--field-border: var(--primary);');
  });

  it('type classes', () => {
    expect(block('.t-heading-4')).toContain('text-transform: uppercase');
    const button = block('.t-button');
    expect(button).toContain('font-weight: 600');
    expect(button).toContain('text-transform: uppercase');
    const h2 = block('.t-heading-2');
    expect(h2).toContain('font-family: var(--font-serif)');
    expect(h2).toContain('font-weight: 300');
  });
});
