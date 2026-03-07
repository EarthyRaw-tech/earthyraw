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
