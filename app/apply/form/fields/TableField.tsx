'use client';

import { emptyRow } from '@/lib/application/answers';
import type { Answer, NumberAnswer, Question, TableAnswer } from '@/lib/application/types';
import { digitsOnly, formatMonthYear } from '@/lib/application/validate';
import styles from '../form.module.css';

type TableQuestion = Extract<Question, { kind: 'table' }>;

export default function TableField({ question: q, value, onChange }: { question: TableQuestion; value: TableAnswer; onChange: (a: Answer) => void }) {
  const rows = value.length ? value : [emptyRow(q.columns)];
  const setCell = (r: number, col: string, cell: string | NumberAnswer) =>
    onChange(rows.map((row, i) => (i === r ? { ...row, [col]: cell } : row)));

  return (
    <div className={styles.form__table}>
      {rows.map((row, r) => (
        <div key={r} className={styles.form__row} role="group" aria-label={`Row ${r + 1}`}>
          {q.columns.map((c) => {
            const cellId = `q-${q.id}-${r}-${c.id}`;
            const cell = row[c.id];
            return (
              <div key={c.id} className={styles.form__cell}>
                <label htmlFor={cellId} className={styles.form__sublabel}>{c.label}</label>
                {c.kind === 'number' ? (
                  <>
                    <input
                      id={cellId}
                      className={styles.form__input}
                      inputMode="numeric"
                      maxLength={15}
                      disabled={(cell as NumberAnswer).untracked}
                      value={(cell as NumberAnswer).value}
                      onChange={(e) => setCell(r, c.id, { ...(cell as NumberAnswer), value: digitsOnly(e.target.value) })}
                    />
                    {c.allowUntracked && (
                      <label className={styles.form__option}>
                        <input
                          type="checkbox"
                          checked={(cell as NumberAnswer).untracked}
                          onChange={(e) => setCell(r, c.id, { value: '', untracked: e.target.checked })}
                        />
                        <span>We don&apos;t track this</span>
                      </label>
                    )}
                  </>
                ) : (
                  <input
                    id={cellId}
                    className={styles.form__input}
                    inputMode={c.kind === 'monthYear' ? 'numeric' : c.kind === 'url' ? 'url' : undefined}
                    placeholder={c.kind === 'monthYear' ? 'MM/YYYY' : undefined}
                    maxLength={c.kind === 'monthYear' ? 7 : c.kind === 'url' ? 300 : c.maxChars}
                    value={cell as string}
                    onChange={(e) => setCell(r, c.id, c.kind === 'monthYear' ? formatMonthYear(e.target.value) : e.target.value)}
                  />
                )}
              </div>
            );
          })}
          {rows.length > 1 && (
            <button type="button" className={styles.form__linkButton} onClick={() => onChange(rows.filter((_, i) => i !== r))}>
              Remove row {r + 1}
            </button>
          )}
        </div>
      ))}
      {rows.length < q.maxRows && (
        <button type="button" className="btn btn--ghost" onClick={() => onChange([...rows, emptyRow(q.columns)])}>
          Add a row
        </button>
      )}
    </div>
  );
}
