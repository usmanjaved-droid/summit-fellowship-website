import { describe, expect, it } from 'vitest';
import { emptyAnswer, emptyAnswers } from './answers';
import { ALL_QUESTIONS, SECTIONS } from './questions';
import type { Question } from './types';
import { MSG, digitsOnly, formatMonthYear, validateAll, validateQuestion, validateSection } from './validate';

const q = (id: string) => ALL_QUESTIONS.find((x) => x.id === id) as Question;

describe('helpers', () => {
  it('digitsOnly strips everything but digits', () => {
    expect(digitsOnly('~2,000+')).toBe('2000');
    expect(digitsOnly('abc')).toBe('');
  });
  it('formatMonthYear inserts the slash and caps length', () => {
    expect(formatMonthYear('0320')).toBe('03/20');
    expect(formatMonthYear('032022')).toBe('03/2022');
    expect(formatMonthYear('03/2022x')).toBe('03/2022');
    expect(formatMonthYear('1')).toBe('1');
  });
});

describe('validateQuestion', () => {
  it('requires required answers and skips optional empty ones', () => {
    expect(validateQuestion(q('A1'), '')).toBe(MSG.required);
    expect(validateQuestion(q('A2'), '')).toBeNull();
    expect(validateQuestion(q('H2'), '   ')).toBeNull();
  });
  it('rejects text over the cap (server-side tamper guard)', () => {
    expect(validateQuestion(q('A1'), 'x'.repeat(101))).toBe(MSG.tooLong(100));
    expect(validateQuestion(q('A1'), 'x'.repeat(100))).toBeNull();
  });
  it('validates email, phone, url', () => {
    expect(validateQuestion(q('B3'), 'nope')).toBe(MSG.email);
    expect(validateQuestion(q('B3'), 'a@b.co')).toBeNull();
    expect(validateQuestion(q('B4'), '12')).toBe(MSG.phone);
    expect(validateQuestion(q('B4'), '+92 300 1234567')).toBeNull();
    expect(validateQuestion(q('A9'), 'None')).toBeNull();
    expect(validateQuestion(q('A9'), 'example')).toBe(MSG.url('none'));
    expect(validateQuestion(q('A9'), 'https://example.org')).toBeNull();
  });
  it('numbers: digits only, untracked allowed only where offered', () => {
    expect(validateQuestion(q('A11'), { value: '12a', untracked: false })).toBe(MSG.digits);
    expect(validateQuestion(q('A11'), { value: '', untracked: false })).toBe(MSG.required);
    expect(validateQuestion(q('A10'), { value: '', untracked: true })).toBeNull();
    expect(validateQuestion(q('A11'), { value: '', untracked: true })).toBe(MSG.required);
  });
  it('year and month/year formats', () => {
    expect(validateQuestion(q('A5'), '19')).toBe(MSG.year);
    expect(validateQuestion(q('A5'), '2019')).toBeNull();
    expect(validateQuestion(q('C2'), '13/2020')).toBe(MSG.monthYear);
    expect(validateQuestion(q('C2'), '03/2020')).toBeNull();
  });
  it('radio and select options, with specify', () => {
    expect(validateQuestion(q('A3'), 'Charity')).toBe(MSG.choose);
    expect(validateQuestion(q('A3'), 'Non-profit')).toBeNull();
    expect(validateQuestion(q('A4'), { choice: 'Other', specify: '' })).toBe(MSG.specify);
    expect(validateQuestion(q('A4'), { choice: 'Other', specify: 'Cooperative' })).toBeNull();
    expect(validateQuestion(q('A4'), { choice: 'Trust', specify: '' })).toBeNull();
  });
  it('multiselect needs at least one valid choice', () => {
    expect(validateQuestion(q('A7'), { choices: [], specify: '' })).toBe(MSG.required);
    expect(validateQuestion(q('A7'), { choices: ['Mars'], specify: '' })).toBe(MSG.choose);
    expect(validateQuestion(q('A7'), { choices: ['Outside Pakistan'], specify: '' })).toBe(MSG.specify);
    expect(validateQuestion(q('A7'), { choices: ['Punjab', 'Sindh'], specify: '' })).toBeNull();
  });
  it('sentences need every blank, numeric blanks digits only', () => {
    const c3 = { count: '1200', category: 'teachers', what: 'our app', definition: 'opened it in the last 7 days' };
    expect(validateQuestion(q('C3'), c3)).toBeNull();
    expect(validateQuestion(q('C3'), { ...c3, count: '1,200' })).toBe(MSG.digits);
    expect(validateQuestion(q('C3'), { ...c3, what: '' })).toBe(MSG.blanks);
  });
  it('tables: started rows must be complete, at least one row', () => {
    const empty = emptyAnswer(q('C4'));
    expect(validateQuestion(q('C4'), empty)).toBe(MSG.atLeastOneRow);
    const partial = [{ name: 'Rawalpindi', users: { value: '', untracked: false }, since: '' }];
    expect(validateQuestion(q('C4'), partial)).toBe(MSG.rowIncomplete(1));
    const full = [{ name: 'Rawalpindi', users: { value: '900', untracked: false }, since: '01/2023' }];
    expect(validateQuestion(q('C4'), full)).toBeNull();
    expect(validateQuestion(q('C4'), [...full, ...full, ...full, ...full])).toBe(MSG.tooManyRows(3));
  });
  it('rejects wrong shapes instead of crashing', () => {
    expect(validateQuestion(q('A1'), { value: 'x', untracked: false })).toBe(MSG.invalid);
    expect(validateQuestion(q('C4'), 'not a table')).toBe(MSG.invalid);
  });
});

describe('validateSection / validateAll', () => {
  it('reports every required question of an empty application', () => {
    const errors = validateAll(emptyAnswers());
    const required = ALL_QUESTIONS.filter((x) => x.required).map((x) => x.id);
    expect(Object.keys(errors).sort()).toEqual(required.sort());
  });
  it('validateSection only reports its own questions', () => {
    const errors = validateSection(SECTIONS[1], emptyAnswers());
    expect(Object.keys(errors).every((k) => k.startsWith('B'))).toBe(true);
  });
  it('treats a missing answer like an empty one', () => {
    expect(validateAll({}).A1).toBe(MSG.required);
  });
});
