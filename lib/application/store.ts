import type { Answers, ScreenerAnswers } from './types';

export type ApplicationRecord = {
  cohortYear: number;
  applicantName: string;
  applicantEmail: string;
  orgName: string;
  screener: ScreenerAnswers;
  answers: Answers;
  schemaVersion: string;
};

export interface ApplicationStore {
  save(r: ApplicationRecord): Promise<string>;
}

export class StoreConfigError extends Error {}

type Env = Record<string, string | undefined>;

export function createSupabaseStore(env: Env, fetchImpl: typeof fetch = fetch): ApplicationStore {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new StoreConfigError('SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set');
  return {
    async save(r) {
      const res = await fetchImpl(`${url.replace(/\/$/, '')}/rest/v1/rpc/submit_application`, {
        method: 'POST',
        headers: { apikey: key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p_cohort_year: r.cohortYear,
          p_applicant_name: r.applicantName.trim(),
          p_applicant_email: r.applicantEmail.trim().toLowerCase(),
          p_org_name: r.orgName.trim(),
          p_screener: r.screener,
          p_answers: r.answers,
          p_schema_version: r.schemaVersion,
        }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
      return (await res.json()) as string;
    },
  };
}
