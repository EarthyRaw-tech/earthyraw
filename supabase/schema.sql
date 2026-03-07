-- Earthy Raw site data schema
-- Run this in Supabase SQL editor before enabling production writes.

create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id text primary key default 'default',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings_history (
  id bigint generated always as identity primary key,
  settings_id text not null references public.site_settings(id) on delete cascade,
  data jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lead_submissions (
  id uuid primary key default gen_random_uuid(),
  name_role text not null default '',
  company text not null default '',
  phone text not null default '',
  email text not null default '',
  users_pcs text not null default '',
  has_server text not null default '',
  issues text[] not null default '{}',
  message text not null default '',
  language text not null default 'en',
  destination_email text not null default '',
  submitted_at timestamptz not null default timezone('utc', now()),
  ip text not null default '',
  user_agent text not null default '',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_lead_submissions_submitted_at
  on public.lead_submissions (submitted_at desc);

create index if not exists idx_lead_submissions_email
  on public.lead_submissions (email);

create unique index if not exists idx_lead_submissions_email_submitted_at
  on public.lead_submissions (email, submitted_at);

create table if not exists public.contact_rate_limits (
  key text primary key,
  count integer not null default 0,
  window_start timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_contact_rate_limits_updated_at
  on public.contact_rate_limits (updated_at desc);

create or replace function public.increment_contact_rate_limit(
  p_key text,
  p_window_seconds integer,
  p_limit integer
)
returns table(
  allowed boolean,
  current_count integer,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := timezone('utc', now());
  v_count integer;
  v_window_start timestamptz;
  v_window_end timestamptz;
begin
  insert into public.contact_rate_limits as rl (key, count, window_start, updated_at)
  values (p_key, 1, v_now, v_now)
  on conflict (key)
  do update
  set
    count = case
      when rl.window_start <= v_now - make_interval(secs => p_window_seconds) then 1
      else rl.count + 1
    end,
    window_start = case
      when rl.window_start <= v_now - make_interval(secs => p_window_seconds) then v_now
      else rl.window_start
    end,
    updated_at = v_now
  returning contact_rate_limits.count, contact_rate_limits.window_start
  into v_count, v_window_start;

  current_count := v_count;
  allowed := v_count <= p_limit;

  if allowed then
    retry_after_seconds := 0;
  else
    v_window_end := v_window_start + make_interval(secs => p_window_seconds);
    retry_after_seconds := greatest(1, ceil(extract(epoch from (v_window_end - v_now)))::integer);
  end if;

  return next;
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.site_settings_history enable row level security;
alter table public.lead_submissions enable row level security;
alter table public.contact_rate_limits enable row level security;
