-- Friends of Pakistan Fellowship — "Get notified when applications open" sign-ups.
-- Applied to both Supabase projects: summit-fellowship-staging and summit-fellowship-production.
--
-- Same access model as public.applications: RLS on with NO policies and no anon/authenticated
-- table privileges. The website's server route calls the SECURITY DEFINER function below with the
-- project's publishable key (server-only). The function can only insert; read sign-ups in the
-- Supabase dashboard (Table editor → notify_signups, filter by cohort_year, Export CSV).

create table public.notify_signups (
  id uuid primary key default gen_random_uuid(),
  cohort_year int not null,
  email text not null,
  created_at timestamptz not null default now(),
  unique (cohort_year, email)
);

alter table public.notify_signups enable row level security;
revoke all on public.notify_signups from anon, authenticated;

create or replace function public.submit_notify_signup(p_cohort_year int, p_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  if p_cohort_year is null
     or length(v_email) > 254
     or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid sign-up';
  end if;

  -- Signing up twice is not an error: the visitor is already on the list.
  insert into public.notify_signups (cohort_year, email)
  values (p_cohort_year, v_email)
  on conflict (cohort_year, email) do nothing;
end;
$$;

revoke all on function public.submit_notify_signup(int, text) from public;
grant execute on function public.submit_notify_signup(int, text) to anon;
revoke execute on function public.submit_notify_signup(int, text) from authenticated;
