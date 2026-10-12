import { createHash } from 'node:crypto';
import { CONFIRMATION_TEXT, SCHEMA_VERSION, SECTIONS } from './questions.ts';
import { SCREENER_QUESTIONS } from './screener.ts';

export function schemaHash(): string {
  return createHash('sha256')
    .update(JSON.stringify({ SCHEMA_VERSION, SECTIONS, SCREENER_QUESTIONS, CONFIRMATION_TEXT }))
    .digest('hex');
}
