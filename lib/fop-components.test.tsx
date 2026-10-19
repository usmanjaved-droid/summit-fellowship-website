import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Arrow,
  ArrowLink,
  Button,
  Section,
  SolverCard,
  Timeline,
} from '../app/components/fop';

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

describe('fop primitives', () => {
  it('Button renders a link for href and a button otherwise', () => {
    expect(html(<Button href="/apply">Apply</Button>)).toMatch(/<a [^>]*href="\/apply"/);
    expect(html(<Button>Go</Button>)).toMatch(/<button [^>]*type="button"/);
  });

  it('Section sets dark theme only for green', () => {
    expect(html(<Section tone="green">x</Section>)).toContain('data-theme="dark"');
    expect(html(<Section tone="yellow">x</Section>)).not.toContain('data-theme="dark"');
  });

  it('Arrow is decorative and uses currentColor', () => {
    const out = html(<Arrow />);
    expect(out).toContain('aria-hidden="true"');
    expect(out).toContain('stroke="currentColor"');
  });

  it('ArrowLink lg draws the 55px arrow', () => {
    expect(html(<ArrowLink href="/x" size="lg">More</ArrowLink>)).toContain('width="55"');
  });

  it('SolverCard falls back to initials without an image', () => {
    const out = html(<SolverCard name="Hope Bridge" fallback="HB" />);
    expect(out).toContain('HB');
    expect(out).not.toContain('<img');
  });

  it('Timeline marks reached stages, names stages in sr-only text and labels the list Progress', () => {
    const out = html(<Timeline stages={['a', 'b', 'c']} current={1} />);
    expect(out.match(/--reached/g)).toHaveLength(2);
    expect(out).toContain('aria-label="Progress"');
    for (const s of ['a', 'b', 'c']) expect(out).toContain(`>${s}</span>`);
  });

  it('respects reduced motion for the arrow nudge', () => {
    const css = readFileSync(
      join(__dirname, '..', 'app', 'components', 'fop', 'fop.module.css'),
      'utf8',
    );
    const idx = css.indexOf('prefers-reduced-motion: reduce');
    expect(idx).toBeGreaterThan(-1);
    const block = css.slice(idx);
    expect(block).toMatch(/translate:\s*none/);
  });
});
