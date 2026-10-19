import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import tokens from '@/docs/design-system/friends-of-pakistan/project/tokens.json';

/**
 * Shared pieces for the link-preview images (app/opengraph-image.tsx and the fellow pages'
 * opengraph-image.tsx): size, brand colours from the design-system tokens, fonts and photos.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = 'Friends of Pakistan Fellowship';

type ColorToken = { name: string; value: string };
const colorTokens = (tokens as { color: { tokens: ColorToken[] } }).color.tokens;

function color(name: string): string {
  const t = colorTokens.find((c) => c.name === name);
  if (!t) throw new Error(`Unknown colour token: ${name}`);
  return t.value;
}

export const OG_COLORS = {
  green: color('brand-green-deep'),
  yellow: color('primary'),
  white: color('white'),
  black: color('black'),
};

/** Crimson Pro (headlines) and Source Sans 3 semibold (labels), bundled in app/_og (OFL). */
export async function ogFonts() {
  const [serif, sans] = await Promise.all([
    readFile(join(process.cwd(), 'app/_og/CrimsonPro-400.woff')),
    readFile(join(process.cwd(), 'app/_og/SourceSans3-600.woff')),
  ]);
  return [
    { name: 'Crimson Pro', data: serif, weight: 400 as const, style: 'normal' as const },
    { name: 'Source Sans 3', data: sans, weight: 600 as const, style: 'normal' as const },
  ];
}

/** A photo the image renderer can load: remote URLs as they are, files under /public as a data URL. */
export async function ogImageSrc(path: string): Promise<string> {
  if (/^https?:\/\//.test(path)) return path;
  const data = await readFile(join(process.cwd(), 'public', decodeURI(path)));
  const ext = path.split('.').pop()?.toLowerCase();
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  return `data:${mime};base64,${data.toString('base64')}`;
}
