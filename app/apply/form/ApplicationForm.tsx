'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { clearDraft, loadDraft, safeStorage, saveDraft, type Draft, type Step } from '@/lib/application/draft';
import { HONEYPOT_FIELD } from '@/lib/application/handle';
import { CONFIRMATION_TEXT, SECTIONS } from '@/lib/application/questions';
import { SCREENER_QUESTIONS, isEligible, isScreenerComplete } from '@/lib/application/screener';
import { submitApplication } from '@/lib/application/submit';
import type { Answer, Question } from '@/lib/application/types';
import { validateAll, validateSection } from '@/lib/application/validate';
import { Field } from './fields/Field';
import styles from './form.module.css';

type Props = { year: number; contactEmail: string };

function display(q: Question, a: Answer | undefined): string {
  if (a === undefined) return '—';
  if (typeof a === 'string') return a.trim() || '—';
  if (Array.isArray(a)) {
    if (q.kind !== 'table') return '—';
    const rows = a.map((row) => q.columns.map((c) => {
      const cell = row[c.id];
      const v = typeof cell === 'string' ? cell : cell?.untracked ? "don't track" : cell?.value;
      return `${c.label}: ${v || '—'}`;
    }).join('; '));
    return rows.join('\n') || '—';
  }
  if ('untracked' in a) return a.untracked ? "We don't track this" : a.value || '—';
  if ('choices' in a && Array.isArray(a.choices)) return [a.choices.join(', '), a.specify].filter(Boolean).join(' — ') || '—';
  if ('choice' in a) return [a.choice, a.specify].filter(Boolean).join(' — ') || '—';
  if (q.kind === 'sentence') {
    return q.parts.map((p) => (typeof p === 'string' ? p : `[${(a as Record<string, string>)[p.id] || '…'}]`)).join(' ');
  }
  return '—';
}

export default function ApplicationForm({ year, contactEmail }: Props) {
  const [draft, setDraft] = useState<Draft>(() => loadDraft(safeStorage(), year));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      if (saveDraft(safeStorage(), draft)) setSavedAt(Date.now());
    }, 400);
    return () => clearTimeout(t);
  }, [draft, done]);

  const goTo = (step: Step) => {
    setErrors({});
    setSubmitError(null);
    setDraft((d) => ({ ...d, step }));
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setAnswer = (id: string, a: Answer) => setDraft((d) => ({ ...d, answers: { ...d.answers, [id]: a } }));

  if (done) {
    return (
      <section className={`container container--narrow ${styles.form}`} ref={topRef}>
        <h2 className={styles.form__title}>Thank you — your application is in.</h2>
        <p className={styles.form__intro}>Here is what happens next:</p>
        <ul>
          <li><strong>Next two weeks:</strong> we read every application.</li>
          <li><strong>If shortlisted:</strong> we write to schedule a 45-minute conversation, starting from your answers on where you are today, your evidence and your path to scale.</li>
          <li><strong>Decisions:</strong> about five weeks after the deadline.</li>
        </ul>
        <p>Questions? Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </section>
    );
  }

  const savedLine = <p className={styles.form__saved} aria-live="polite">{savedAt ? 'Saved in this browser' : ''}</p>;

  if (draft.step === 'screener' || draft.step === 'ineligible') {
    const s = draft.screener;
    const complete = isScreenerComplete(s);
    return (
      <section className={`container container--narrow ${styles.form}`} ref={topRef}>
        <p className={styles.form__progress}>Before you begin · Eligibility</p>
        {draft.step === 'ineligible' ? (
          <>
            <h2 className={styles.form__title}>This fellowship isn&apos;t the right fit this year.</h2>
            <p className={styles.form__intro}>
              The fellowship is built for founders or senior-most leaders of post-pilot organisations with an annual budget of at least
              USD 100,000, basic financial systems, fluent English and seven days of full presence. We would love to hear from you in a future year.
            </p>
            <div className={styles.form__actions}>
              <button type="button" className="btn btn--ghost" onClick={() => goTo('screener')}>Change my answers</button>
              <Link href="/faq" className="btn btn--ghost">Read the FAQ</Link>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.form__title}>Seven quick questions.</h2>
            <p className={styles.form__intro}>These confirm the fellowship fits where you are. Your answers save automatically in this browser.</p>
            {SCREENER_QUESTIONS.map((q) => (
              <fieldset key={q.id} className={styles.form__field}>
                <legend className={styles.form__legend}>{q.label}</legend>
                <div className={styles.form__options}>
                  {(['yes', 'no'] as const).map((v) => (
                    <label key={v} className={styles.form__option}>
                      <input
                        type="radio"
                        name={`s-${q.id}`}
                        checked={s[q.id] === v}
                        onChange={() => setDraft((d) => ({ ...d, screener: { ...d.screener, [q.id]: v } }))}
                      />
                      <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {errors.screener && <p className={styles.form__error} role="alert">{errors.screener}</p>}
            <div className={styles.form__actions}>
              <button
                type="button"
                className="btn btn--ochre"
                onClick={() => {
                  if (!complete) return setErrors({ screener: 'Please answer all seven questions.' });
                  goTo(isEligible(s) ? 0 : 'ineligible');
                }}
              >
                Continue <span className="arrow">→</span>
              </button>
              {savedLine}
            </div>
          </>
        )}
      </section>
    );
  }

  if (typeof draft.step === 'number') {
    const index = draft.step;
    const section = SECTIONS[index];
    const errorIds = Object.keys(errors);
    return (
      <section className={`container container--narrow ${styles.form}`} ref={topRef}>
        <p className={styles.form__progress}>Section {section.id} of H · {section.title}</p>
        <div className={styles.form__bar} aria-hidden="true">
          <div className={styles.form__barFill} style={{ width: `${((index + 1) / (SECTIONS.length + 1)) * 100}%` }} />
        </div>
        <h2 className={styles.form__title}>{section.title}</h2>
        {section.intro && <p className={styles.form__intro}>{section.intro}</p>}
        {errorIds.length > 0 && (
          <div className={styles.form__summary} role="alert">
            <strong>{errorIds.length === 1 ? 'One answer needs attention:' : `${errorIds.length} answers need attention:`}</strong>
            <ul>
              {errorIds.map((id) => {
                const q = section.questions.find((x) => x.id === id);
                return <li key={id}><a href={`#q-${id}`}>{q?.label ?? id}</a></li>;
              })}
            </ul>
          </div>
        )}
        {section.questions.map((q) => (
          <div key={q.id} id={`q-${q.id}-wrap`}>
            <Field question={q} value={draft.answers[q.id]} onChange={(a) => setAnswer(q.id, a)} error={errors[q.id]} />
          </div>
        ))}
        <div className={styles.form__actions}>
          <button type="button" className="btn btn--ghost" onClick={() => goTo(index === 0 ? 'screener' : index - 1)}>Back</button>
          <button
            type="button"
            className="btn btn--ochre"
            onClick={() => {
              const e = validateSection(section, draft.answers);
              if (Object.keys(e).length) {
                setErrors(e);
                topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
              }
              goTo(index === SECTIONS.length - 1 ? 'review' : index + 1);
            }}
          >
            {index === SECTIONS.length - 1 ? 'Review my answers' : 'Next section'} <span className="arrow">→</span>
          </button>
          {savedLine}
        </div>
      </section>
    );
  }

  const submit = async () => {
    const all = validateAll(draft.answers);
    if (Object.keys(all).length) {
      const first = SECTIONS.findIndex((s) => s.questions.some((q) => all[q.id]));
      setDraft((d) => ({ ...d, step: first }));
      setErrors(all);
      return;
    }
    if (!confirmed) return setSubmitError('Please tick the confirmation before submitting.');
    setSubmitting(true);
    setSubmitError(null);
    const result = await submitApplication({ screener: draft.screener, answers: draft.answers, confirmed, [HONEYPOT_FIELD]: honeypot });
    setSubmitting(false);
    if (result.ok) {
      clearDraft(safeStorage(), year);
      setDone(true);
      return;
    }
    setSubmitError(result.error);
    if (result.fieldErrors) {
      const first = SECTIONS.findIndex((s) => s.questions.some((q) => result.fieldErrors![q.id]));
      if (first >= 0) {
        setDraft((d) => ({ ...d, step: first }));
        setErrors(result.fieldErrors);
      }
    }
  };

  return (
    <section className={`container container--narrow ${styles.form}`} ref={topRef}>
      <p className={styles.form__progress}>Review · Last step</p>
      <div className={styles.form__bar} aria-hidden="true"><div className={styles.form__barFill} style={{ width: '100%' }} /></div>
      <h2 className={styles.form__title}>Check your answers.</h2>
      <p className={styles.form__intro}>Nothing has been sent yet. Edit any section, then confirm and submit.</p>
      <div className={styles.form__review}>
        {SECTIONS.map((s, i) => (
          <div key={s.id} className={styles.form__reviewSection}>
            <h3>
              <span>{s.id}. {s.title}</span>
              <button type="button" className={styles.form__linkButton} onClick={() => goTo(i)}>Edit</button>
            </h3>
            <dl>
              {s.questions.map((q) => (
                <div key={q.id}>
                  <dt>{q.label}</dt>
                  <dd>{display(q, draft.answers[q.id])}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <div className={styles.form__honeypot} aria-hidden="true">
        <label>Leave this empty <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
      </div>
      <label className={styles.form__option} style={{ marginTop: 32 }}>
        <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
        <span>{CONFIRMATION_TEXT}</span>
      </label>
      {submitError && <p className={styles.form__error} role="alert">{submitError}</p>}
      <div className={styles.form__actions}>
        <button type="button" className="btn btn--ghost" onClick={() => goTo(SECTIONS.length - 1)}>Back</button>
        <button type="button" className="btn btn--ochre" disabled={submitting} onClick={submit}>
          {submitting ? 'Submitting…' : 'Submit application'} <span className="arrow">→</span>
        </button>
        {savedLine}
      </div>
    </section>
  );
}
