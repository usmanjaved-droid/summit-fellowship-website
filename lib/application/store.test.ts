import { describe, expect, it } from 'vitest';
import { StoreConfigError, createSupabaseStore, type ApplicationRecord } from './store';

const record: ApplicationRecord = {
  cohortYear: 2027, applicantName: 'A', applicantEmail: 'A@B.co', orgName: 'Org',
  screener: { leader: 'yes' }, answers: { A1: 'Org' }, schemaVersion: 'v4',
};
const env = { SUPABASE_URL: 'https://x.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' };

describe('supabase store', () => {
  it('throws a config error when env is missing', () => {
    expect(() => createSupabaseStore({})).toThrow(StoreConfigError);
  });
  it('calls the submit_application RPC with the publishable key', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const fake = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(JSON.stringify('uuid-1'), { status: 200 });
    }) as unknown as typeof fetch;
    const id = await createSupabaseStore(env, fake).save(record);
    expect(id).toBe('uuid-1');
    expect(calls[0].url).toBe('https://x.supabase.co/rest/v1/rpc/submit_application');
    const headers = calls[0].init.headers as Record<string, string>;
    expect(headers.apikey).toBe('sb_publishable_test');
    expect(JSON.parse(calls[0].init.body as string)).toEqual({
      p_cohort_year: 2027, p_applicant_name: 'A', p_applicant_email: 'a@b.co', p_org_name: 'Org',
      p_screener: { leader: 'yes' }, p_answers: { A1: 'Org' }, p_schema_version: 'v4',
    });
  });
  it('throws on a non-2xx response', async () => {
    const fake = (async () => new Response('{"message":"boom"}', { status: 500 })) as unknown as typeof fetch;
    await expect(createSupabaseStore(env, fake).save(record)).rejects.toThrow('Supabase responded 500');
  });
});
