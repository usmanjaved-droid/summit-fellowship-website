import { describe, expect, it } from 'vitest';
import {
  TBC,
  displayValue,
  getApplyCta,
  getApplicationPhase,
  getApplicationStatus,
  formatOpeningDay,
  getCurrentCohort,
  getSiteSettings,
  isApplicationLive,
  type CohortSettings,
} from './site';

const base: CohortSettings = {
  year: 2027,
  retreatDates: null,
  location: null,
  applicationDeadline: null,
  applicationsOpen: false,
};

describe('displayValue', () => {
  it('returns TBC for null, undefined, empty and whitespace', () => {
    expect(displayValue(null)).toBe(TBC);
    expect(displayValue(undefined)).toBe(TBC);
    expect(displayValue('')).toBe(TBC);
    expect(displayValue('   ')).toBe(TBC);
  });
  it('returns trimmed value otherwise', () => {
    expect(displayValue(' June 2027 ')).toBe('June 2027');
  });
});

describe('isApplicationLive', () => {
  it('is false when applications are closed', () => {
    expect(isApplicationLive(base, true)).toBe(false);
  });
  it('is false when open but the form is not enabled (Phase 1 guard)', () => {
    expect(isApplicationLive({ ...base, applicationsOpen: true }, false)).toBe(false);
  });
  it('is true only when open and the form is enabled', () => {
    expect(isApplicationLive({ ...base, applicationsOpen: true }, true)).toBe(true);
  });
});

describe('getApplyCta', () => {
  it('always links to /apply', () => {
    expect(getApplyCta(base).href).toBe('/apply');
    expect(getApplyCta({ ...base, applicationsOpen: true }, true).href).toBe('/apply');
  });
  it('says how to apply unless live', () => {
    expect(getApplyCta({ ...base, applicationsOpen: true }, false).label).toBe('How to apply');
    expect(getApplyCta({ ...base, applicationsOpen: true }, true).label).toBe('Apply for the 2027 cohort');
  });
});

describe('getApplicationStatus', () => {
  it('says applications open soon when not live', () => {
    expect(getApplicationStatus({ ...base, applicationDeadline: '15 January 2027' }, false)).toBe(
      'Applications for the 2027 cohort open soon.',
    );
  });
  it('gives TBC when live without a deadline', () => {
    expect(getApplicationStatus({ ...base, applicationsOpen: true }, true)).toBe(`Applications close: ${TBC}`);
  });
  it('gives the deadline when live with one', () => {
    expect(
      getApplicationStatus({ ...base, applicationsOpen: true, applicationDeadline: '15 January 2027' }, true),
    ).toBe('Applications close: 15 January 2027');
  });
});

describe('getCurrentCohort', () => {
  it('follows data/site.json in production, dates included', () => {
    const c = getCurrentCohort({ VERCEL_ENV: 'production' });
    expect(c).toEqual(getSiteSettings().currentCohort);
  });
  it('is always open on staging and local so the team can test', () => {
    expect(getCurrentCohort({ VERCEL_ENV: 'preview' }).applicationsOpen).toBe(true);
    expect(getCurrentCohort({}).applicationsOpen).toBe(true);
  });
});

describe('getSiteSettings', () => {
  it('loads the 2027 cohort: open 5 Nov 2026 00:00 PKT to 11 Dec 2026 11:59 pm PKT', () => {
    const s = getSiteSettings();
    expect(s.currentCohort.year).toBe(2027);
    expect(s.currentCohort.applicationsOpen).toBe(true);
    expect(Date.parse(s.currentCohort.applicationsOpenAt!)).toBe(Date.parse('2026-11-04T19:00:00Z'));
    expect(Date.parse(s.currentCohort.applicationsCloseAt!)).toBe(Date.parse('2026-12-11T18:59:59Z'));
    expect(s.contactEmail).toBe('usman.javed@taleemabad.com');
  });
});

describe('application window (dates in Pakistan time)', () => {
  const scheduled: CohortSettings = {
    ...base,
    applicationsOpen: true,
    applicationDeadline: '11 December 2026, 11:59 pm PKT',
    applicationsOpenAt: '2026-11-06T00:00:00+05:00',
    applicationsCloseAt: '2026-12-11T23:59:59+05:00',
  };
  const at = (iso: string) => Date.parse(iso);

  it('is upcoming before the opening time, then live, then closed after the deadline', () => {
    expect(getApplicationPhase(scheduled, true, at('2026-11-05T23:59:59+05:00'))).toBe('upcoming');
    expect(getApplicationPhase(scheduled, true, at('2026-11-06T00:00:00+05:00'))).toBe('live');
    expect(getApplicationPhase(scheduled, true, at('2026-12-11T23:59:59+05:00'))).toBe('live');
    expect(getApplicationPhase(scheduled, true, at('2026-12-12T00:00:00+05:00'))).toBe('closed');
  });
  it('stays unscheduled while the master switch is off, whatever the dates', () => {
    expect(getApplicationPhase({ ...scheduled, applicationsOpen: false }, true, at('2026-11-20T12:00:00+05:00'))).toBe('unscheduled');
  });
  it('without dates, the switch alone decides', () => {
    expect(getApplicationPhase({ ...base, applicationsOpen: true }, true, at('2030-01-01T00:00:00Z'))).toBe('live');
  });
  it('says the opening day in Pakistan time, then the deadline, then closed', () => {
    expect(formatOpeningDay(scheduled)).toBe('6 November 2026');
    expect(getApplicationStatus(scheduled, true, at('2026-11-04T10:00:00+05:00'))).toBe('Applications for the 2027 cohort open on 6 November 2026.');
    expect(getApplicationStatus(scheduled, true, at('2026-11-20T10:00:00+05:00'))).toBe('Applications close: 11 December 2026, 11:59 pm PKT');
    expect(getApplicationStatus(scheduled, true, at('2026-12-15T10:00:00+05:00'))).toBe('Applications for the 2027 cohort are now closed.');
  });
  it('the CTA only says Apply while live', () => {
    expect(getApplyCta(scheduled, true, at('2026-11-04T10:00:00+05:00')).label).toBe('How to apply');
    expect(getApplyCta(scheduled, true, at('2026-11-20T10:00:00+05:00')).label).toBe('Apply for the 2027 cohort');
  });
  it('outside production the form is open now, ignoring the dates', () => {
    const c = getCurrentCohort({ VERCEL_ENV: 'preview' });
    expect(c.applicationsOpenAt).toBeNull();
    expect(isApplicationLive(c, true)).toBe(true);
  });
});
