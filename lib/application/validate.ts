import { ALL_QUESTIONS } from './questions';
import type { Answer, Answers, Cell, Column, NumberAnswer, Question, Section, TableRow } from './types';

export const MSG = {
  required: 'This question is required.',
  invalid: 'This answer could not be read. Please re-enter it.',
  tooLong: (n: number) => `Keep this under ${n} characters.`,
  email: 'Enter a valid email address.',
  phone: 'Include the country code, e.g. +92 300 1234567.',
  url: (words: string) => `Enter a full link starting with https://, or type "${words}".`,
  digits: 'Use digits only.',
  year: 'Enter a four-digit year, e.g. 2019.',
  monthYear: 'Use MM/YYYY, e.g. 03/2022.',
  choose: 'Choose one of the options.',
  specify: 'Please specify.',
  blanks: 'Fill in every blank.',
  atLeastOneRow: 'Add at least one row.',
  tooManyRows: (n: number) => `Use at most ${n} rows.`,
  rowIncomplete: (n: number) => `Fill every cell in row ${n}, or clear the row.`,
};

export function digitsOnly(s: string): string {
  return s.replace(/\D+/g, '');
}

export function formatMonthYear(raw: string): string {
  const d = digitsOnly(raw).slice(0, 6);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

const isStr = (v: unknown): v is string => typeof v === 'string';
const isNum = (v: unknown): v is NumberAnswer =>
  !!v && typeof v === 'object' && !Array.isArray(v) && isStr((v as NumberAnswer).value) && typeof (v as NumberAnswer).untracked === 'boolean';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9][0-9 ()-]{6,19}$/;
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]+$/i;
const YEAR = /^(19|20)\d{2}$/;
const MONTH_YEAR = /^(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

function checkUrl(v: string, words: string[]): string | null {
  const t = v.trim();
  if (words.some((w) => w.toLowerCase() === t.toLowerCase())) return null;
  return URL_RE.test(t) ? null : MSG.url(words[0]);
}

function checkCell(col: Column, cell: Cell | undefined): boolean {
  if (col.kind === 'number') {
    if (!isNum(cell)) return false;
    if (cell.untracked) return !!col.allowUntracked;
    return /^\d+$/.test(cell.value);
  }
  if (!isStr(cell) || cell.trim() === '') return false;
  if (col.maxChars && cell.length > col.maxChars) return false;
  if (col.kind === 'monthYear') return MONTH_YEAR.test(cell);
  if (col.kind === 'url') return checkUrl(cell, col.acceptWords ?? []) === null;
  return true;
}

export function isBlankRow(row: TableRow): boolean {
  return Object.values(row).every((c) => (isNum(c) ? c.value === '' && !c.untracked : !isStr(c) || c.trim() === ''));
}

export function validateQuestion(q: Question, a: Answer | undefined): string | null {
  switch (q.kind) {
    case 'text':
    case 'email':
    case 'phone':
    case 'url':
    case 'year':
    case 'monthYear':
    case 'radio': {
      const v = a ?? '';
      if (!isStr(v)) return MSG.invalid;
      if (v.trim() === '') return q.required ? MSG.required : null;
      if (q.kind === 'text') return v.length > q.maxChars ? MSG.tooLong(q.maxChars) : null;
      if (q.kind === 'email') return EMAIL.test(v.trim()) && v.length <= 254 ? null : MSG.email;
      if (q.kind === 'phone') return PHONE.test(v.trim()) ? null : MSG.phone;
      if (q.kind === 'url') return v.length > 300 ? MSG.tooLong(300) : checkUrl(v, q.acceptWords);
      if (q.kind === 'year') return YEAR.test(v) ? null : MSG.year;
      if (q.kind === 'monthYear') return MONTH_YEAR.test(v) ? null : MSG.monthYear;
      return q.options.includes(v) ? null : MSG.choose;
    }
    case 'number': {
      const v = a ?? { value: '', untracked: false };
      if (!isNum(v)) return MSG.invalid;
      if (v.untracked) return q.allowUntracked ? null : MSG.required;
      if (v.value === '') return q.required ? MSG.required : null;
      return /^\d{1,15}$/.test(v.value) ? null : MSG.digits;
    }
    case 'select': {
      const v = a as { choice?: unknown; specify?: unknown } | undefined;
      if (v === undefined) return q.required ? MSG.required : null;
      if (!v || typeof v !== 'object' || !isStr(v.choice) || !isStr(v.specify)) return MSG.invalid;
      if (v.choice === '') return q.required ? MSG.required : null;
      if (!q.options.includes(v.choice)) return MSG.choose;
      if (q.specify?.options.includes(v.choice)) {
        if (v.specify.trim() === '') return MSG.specify;
        if (v.specify.length > q.specify.maxChars) return MSG.tooLong(q.specify.maxChars);
      }
      return null;
    }
    case 'multiselect': {
      const v = a as { choices?: unknown; specify?: unknown } | undefined;
      if (v === undefined) return q.required ? MSG.required : null;
      if (!v || typeof v !== 'object' || !Array.isArray(v.choices) || !isStr(v.specify)) return MSG.invalid;
      if (v.choices.length === 0) return q.required ? MSG.required : null;
      if (!v.choices.every((c) => isStr(c) && q.options.includes(c))) return MSG.choose;
      if (q.specify && v.choices.some((c) => q.specify!.options.includes(c as string))) {
        if (v.specify.trim() === '') return MSG.specify;
        if (v.specify.length > q.specify.maxChars) return MSG.tooLong(q.specify.maxChars);
      }
      return null;
    }
    case 'sentence': {
      const blanks = q.parts.filter((p) => typeof p !== 'string');
      const v = (a ?? {}) as Record<string, unknown>;
      if (typeof v !== 'object' || Array.isArray(v)) return MSG.invalid;
      const values = blanks.map((b) => v[b.id]);
      if (!values.every((x) => x === undefined || isStr(x))) return MSG.invalid;
      const filled = values.map((x) => ((x as string | undefined) ?? '').trim());
      if (filled.every((x) => x === '')) return q.required ? MSG.required : null;
      if (filled.some((x) => x === '')) return MSG.blanks;
      for (const [i, b] of blanks.entries()) {
        const x = values[i] as string;
        if (x.length > b.maxChars) return MSG.tooLong(b.maxChars);
        if (b.numeric && !/^\d+$/.test(x)) return MSG.digits;
      }
      return null;
    }
    case 'table': {
      if (a === undefined) return q.required ? MSG.atLeastOneRow : null;
      if (!Array.isArray(a)) return MSG.invalid;
      if (a.length > q.maxRows) return MSG.tooManyRows(q.maxRows);
      if (!a.every((r) => r && typeof r === 'object' && !Array.isArray(r))) return MSG.invalid;
      const rows = a as TableRow[];
      for (const [i, row] of rows.entries()) {
        if (isBlankRow(row)) continue;
        if (!q.columns.every((c) => checkCell(c, row[c.id]))) return MSG.rowIncomplete(i + 1);
      }
      const used = rows.filter((r) => !isBlankRow(r)).length;
      if (used < q.minRows && q.required) return MSG.atLeastOneRow;
      return null;
    }
  }
}

export function validateSection(section: Section, answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of section.questions) {
    const e = validateQuestion(q, answers[q.id]);
    if (e) errors[q.id] = e;
  }
  return errors;
}

export function validateAll(answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of ALL_QUESTIONS) {
    const e = validateQuestion(q, answers[q.id]);
    if (e) errors[q.id] = e;
  }
  return errors;
}
