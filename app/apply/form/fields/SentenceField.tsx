'use client';

import type { Answer, Question } from '@/lib/application/types';
import { digitsOnly } from '@/lib/application/validate';
import styles from '../form.module.css';

type SentenceQuestion = Extract<Question, { kind: 'sentence' }>;

export default function SentenceField({ question, value, onChange }: { question: SentenceQuestion; value: Record<string, string>; onChange: (a: Answer) => void }) {
  return (
    <p className={styles.form__sentence}>
      {question.parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}> {part} </span>
        ) : (
          <input
            key={part.id}
            className={styles.form__blank}
            aria-label={`${part.hint} (max ${part.maxChars} characters)`}
            placeholder={part.hint}
            inputMode={part.numeric ? 'numeric' : undefined}
            maxLength={part.maxChars}
            size={Math.min(Math.max(part.hint.length, 8), 40)}
            value={value[part.id] ?? ''}
            onChange={(e) => onChange({ ...value, [part.id]: part.numeric ? digitsOnly(e.target.value) : e.target.value })}
          />
        ),
      )}
    </p>
  );
}
