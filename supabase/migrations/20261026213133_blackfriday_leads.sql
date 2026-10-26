create table if not exists public.blackfriday_leads (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  campaign text not null default 'blackfriday-2026',
  full_name text not null check (char_length(btrim(full_name)) between 2 and 100),
  email text not null check (email = lower(email) and char_length(email) <= 254),
  whatsapp text not null check (whatsapp ~ '^[1-9][0-9]9[0-9]{8}$'),
  consent boolean not null check (consent is true),
  consent_version text not null,
  consented_at timestamptz not null default now(),
  utm jsonb not null default '{}'::jsonb,
  source text not null default 'produtor-geekacademy-site',
  created_at timestamptz not null default now(),
  unique (email, campaign)
);

create index if not exists blackfriday_leads_created_at_idx
  on public.blackfriday_leads (created_at desc);

alter table public.blackfriday_leads enable row level security;
revoke all on table public.blackfriday_leads from public, anon, authenticated, service_role;
grant insert on table public.blackfriday_leads to service_role;

comment on table public.blackfriday_leads is
  'Consent-based registrations for the 2026 FPM 2.0 Black Friday workshop.';
