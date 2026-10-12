import { describe, expect, it } from 'vitest';
import manifest from './pdf-manifest.json';
import { schemaHash } from './schemaHash';

describe('application PDF', () => {
  it('was generated from the current question schema (run `npm run pdf:application` after editing questions)', () => {
    expect(manifest.schemaHash).toBe(schemaHash());
  });
});
