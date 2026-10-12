'use client';

import type { Answer, ChoiceAnswer, MultiAnswer, NumberAnswer, Question } from '@/lib/application/types';
import { digitsOnly, formatMonthYear } from '@/lib/application/validate';
import styles from '../form.module.css';
import SentenceField from './SentenceField';
import TableField from './TableField';

type Props = { question: Question; value: Answer; onChange: (a: Answer) => void; error?: string };

export function describedBy(id: string, hasHelp: boolean, hasError: boolean, extra?: string) {
  return [hasHelp && `q-${id}-help`, extra, hasError && `q-${id}-error`].filter(Boolean).join(' ') || undefined;
}

function Counter({ id, value, max }: { id: string; value: string; max: number }) {
  const near = value.length >= max * 0.9;
  return (
    <span id={`q-${id}-count`} className={`${styles.form__counter}${near ? ` ${styles['form__counter--near']}` : ''}`}>
      {max - value.length} characters left (max {max})
    </span>
  );
}

export function Field({ question: q, value, onChange, error }: Props) {
  const id = `q-${q.id}`;
  const help = q.help ? <p id={`${id}-help`} className={styles.form__help}>{q.help}</p> : null;
  const err = error ? <p id={`${id}-error`} className={styles.form__error} role="alert">{error}</p> : null;
  const label = (
    <span className={styles.form__label}>
      {q.label}
      {!q.required && <span className={styles.form__optional}> (optional)</span>}
    </span>
  );

  if (q.kind === 'radio' || q.kind === 'multiselect' || q.kind === 'sentence' || q.kind === 'table') {
    let control: React.ReactNode;
    if (q.kind === 'radio') {
      const v = value as string;
      control = (
        <div className={styles.form__options}>
          {q.options.map((o, i) => (
            <label key={o} className={styles.form__option}>
              <input type="radio" name={id} value={o} checked={v === o} onChange={() => onChange(o)} />
              <span>{q.numbered ? `${i + 1}. ` : ''}{o}</span>
            </label>
          ))}
        </div>
      );
    } else if (q.kind === 'multiselect') {
      const v = value as MultiAnswer;
      const needsSpecify = q.specify && v.choices.some((c) => q.specify!.options.includes(c));
      control = (
        <div className={styles.form__options}>
          {q.options.map((o) => (
            <label key={o} className={styles.form__option}>
              <input
                type="checkbox"
                checked={v.choices.includes(o)}
                onChange={(e) =>
                  onChange({ ...v, choices: e.target.checked ? [...v.choices, o] : v.choices.filter((c) => c !== o) })
                }
              />
              <span>{o}</span>
            </label>
          ))}
          {needsSpecify && (
            <label className={styles.form__specify}>
              <span className={styles.form__sublabel}>Please specify</span>
              <input
                className={styles.form__input}
                aria-describedby={error ? `${id}-error` : undefined}
                maxLength={q.specify!.maxChars}
                value={v.specify}
                onChange={(e) => onChange({ ...v, specify: e.target.value })}
              />
            </label>
          )}
        </div>
      );
    } else if (q.kind === 'sentence') {
      control = <SentenceField question={q} value={value as Record<string, string>} onChange={onChange} />;
    } else {
      control = <TableField question={q} value={value as never} onChange={onChange} />;
    }
    return (
      <fieldset id={id} tabIndex={-1} className={styles.form__field} aria-describedby={describedBy(q.id, !!q.help, !!error)} aria-invalid={!!error}>
        <legend className={styles.form__legend}>{label}</legend>
        {help}
        {control}
        {err}
      </fieldset>
    );
  }

  let input: React.ReactNode;
  const common = {
    id,
    'aria-describedby': describedBy(q.id, !!q.help, !!error, q.kind === 'text' ? `${id}-count` : undefined),
    'aria-invalid': !!error,
    className: styles.form__input,
  };

  if (q.kind === 'text') {
    const v = value as string;
    input = (
      <>
        {q.multiline ? (
          <textarea {...common} rows={q.maxChars > 300 ? 8 : 4} maxLength={q.maxChars} placeholder={q.placeholder} value={v} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input {...common} type="text" maxLength={q.maxChars} placeholder={q.placeholder} value={v} onChange={(e) => onChange(e.target.value)} />
        )}
        <Counter id={q.id} value={v} max={q.maxChars} />
      </>
    );
  } else if (q.kind === 'email' || q.kind === 'phone' || q.kind === 'url') {
    const type = q.kind === 'email' ? 'email' : q.kind === 'phone' ? 'tel' : 'text';
    input = <input {...common} type={type} inputMode={q.kind === 'url' ? 'url' : undefined} maxLength={q.kind === 'url' ? 300 : 254} value={value as string} onChange={(e) => onChange(e.target.value)} />;
  } else if (q.kind === 'number') {
    const v = value as NumberAnswer;
    input = (
      <>
        <input {...common} type="text" inputMode="numeric" maxLength={15} disabled={v.untracked} value={v.value} onChange={(e) => onChange({ ...v, value: digitsOnly(e.target.value) })} />
        {q.allowUntracked && (
          <label className={styles.form__option}>
            <input type="checkbox" checked={v.untracked} onChange={(e) => onChange({ value: e.target.checked ? '' : v.value, untracked: e.target.checked })} />
            <span>We don&apos;t track this</span>
          </label>
        )}
      </>
    );
  } else if (q.kind === 'year') {
    input = <input {...common} type="text" inputMode="numeric" maxLength={4} placeholder="YYYY" value={value as string} onChange={(e) => onChange(digitsOnly(e.target.value))} />;
  } else if (q.kind === 'monthYear') {
    input = <input {...common} type="text" inputMode="numeric" maxLength={7} placeholder="MM/YYYY" value={value as string} onChange={(e) => onChange(formatMonthYear(e.target.value))} />;
  } else {
    const v = value as ChoiceAnswer;
    const needsSpecify = q.specify?.options.includes(v.choice);
    input = (
      <>
        <select {...common} value={v.choice} onChange={(e) => onChange({ ...v, choice: e.target.value })}>
          <option value="">Choose…</option>
          {q.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {needsSpecify && (
          <label className={styles.form__specify}>
            <span className={styles.form__sublabel}>Please specify</span>
            <input className={styles.form__input} aria-describedby={error ? `${id}-error` : undefined}
                maxLength={q.specify!.maxChars} value={v.specify} onChange={(e) => onChange({ ...v, specify: e.target.value })} />
          </label>
        )}
      </>
    );
  }

  return (
    <div className={styles.form__field}>
      <label htmlFor={id}>{label}</label>
      {help}
      {input}
      {err}
    </div>
  );
}
