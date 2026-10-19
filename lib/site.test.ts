import { describe, expect, it } from 'vitest';
import {
  TBC,
  displayValue,
  getApplyCta,
  getApplicationStatus,
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
  it('follows data/site.json in production', () => {
    expect(getCurrentCohort({ VERCEL_ENV: 'production' }).applicationsOpen).toBe(false);
  });
  it('is always open on staging and local so the team can test', () => {
    expect(getCurrentCohort({ VERCEL_ENV: 'preview' }).applicationsOpen).toBe(true);
    expect(getCurrentCohort({}).applicationsOpen).toBe(true);
  });
});

describe('getSiteSettings', () => {
  it('loads the 2027 cohort with applications closed in Phase 1', () => {
    const s = getSiteSettings();
    expect(s.currentCohort.year).toBe(2027);
    expect(s.currentCohort.applicationsOpen).toBe(false);
    expect(s.contactEmail).toBe('usman.javed@taleemabad.com');
  });
});
