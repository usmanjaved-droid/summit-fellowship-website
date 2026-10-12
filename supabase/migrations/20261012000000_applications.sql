-- Summit Fellowship — applications store (Phase 2).
-- Applied to both Supabase projects: summit-fellowship-staging and summit-fellowship-production.
--
-- Access model: the table has RLS enabled and NO policies, and anon/authenticated have no
-- table privileges, so nothing can read or write rows through the public API. The website's
-- server route calls the SECURITY DEFINER function below with the project's publishable key
-- (kept server-only). The function can only insert; reading happens in the Supabase dashboard.

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  cohort_year int not null,
  submitted_at timestamptz not null default now(),
  applicant_name text not null,
  applicant_email text not null,
  org_name text not null,
  screener jsonb not null,
  answers jsonb not null,
  schema_version text not null,
  is_latest boolean not null default true
);

create index applications_cohort_email_idx on public.applications (cohort_year, applicant_email);

alter table public.applications enable row level security;
revoke all on public.applications from anon, authenticated;

create or replace function public.submit_application(
  p_cohort_year int,
  p_applicant_name text,
  p_applicant_email text,
  p_org_name text,
  p_screener jsonb,
  p_answers jsonb,
  p_schema_version text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_email text := lower(trim(coalesce(p_applicant_email, '')));
begin
  if p_cohort_year is null
     or v_email = ''
     or coalesce(trim(p_applicant_name), '') = ''
     or coalesce(trim(p_org_name), '') = ''
     or p_screener is null
     or p_answers is null
     or coalesce(p_schema_version, '') = '' then
    raise exception 'invalid application';
  end if;

  if length(p_answers::text) > 100000 or length(p_screener::text) > 5000 then
    raise exception 'application too large';
  end if;

  update public.applications
     set is_latest = false
   where cohort_year = p_cohort_year
     and applicant_email = v_email
     and is_latest;

  insert into public.applications
    (cohort_year, applicant_name, applicant_email, org_name, screener, answers, schema_version)
  values
    (p_cohort_year, trim(p_applicant_name), v_email, trim(p_org_name), p_screener, p_answers, p_schema_version)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_application(int, text, text, text, jsonb, jsonb, text) from public;
grant execute on function public.submit_application(int, text, text, text, jsonb, jsonb, text) to anon;
revoke execute on function public.submit_application(int, text, text, text, jsonb, jsonb, text) from authenticated;
