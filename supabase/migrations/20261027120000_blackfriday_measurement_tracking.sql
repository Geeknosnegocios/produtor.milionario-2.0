alter table public.blackfriday_leads
  add column if not exists measurement_consent boolean not null default false,
  add column if not exists measurement_consent_version text,
  add column if not exists measurement_consented_at timestamptz,
  add column if not exists attribution jsonb not null default '{}'::jsonb,
  add column if not exists tracking_status text not null default 'not_required',
  add column if not exists tracking_attempts integer not null default 0,
  add column if not exists tracking_claimed_at timestamptz,
  add column if not exists tracking_next_retry_at timestamptz,
  add column if not exists tracking_last_error text;

alter table public.blackfriday_leads
  drop constraint if exists blackfriday_leads_tracking_status_check;
alter table public.blackfriday_leads
  add constraint blackfriday_leads_tracking_status_check
  check (tracking_status in ('not_required', 'pending', 'processing', 'sent', 'dead'));
alter table public.blackfriday_leads
  add constraint blackfriday_leads_tracking_attempts_check check (tracking_attempts >= 0);

create index if not exists blackfriday_leads_tracking_retry_idx
  on public.blackfriday_leads (tracking_next_retry_at, created_at)
  where tracking_status = 'pending' and measurement_consent is true;

-- The public table remains inaccessible. Only the server's service role reads
-- the lead/outbox fields and updates delivery status; anon receives no grants.
revoke all on table public.blackfriday_leads from public, anon, authenticated;
grant insert, select, update on table public.blackfriday_leads to service_role;

comment on column public.blackfriday_leads.measurement_consent is
  'Optional, separate authorization for advertising measurement. Defaults false.';
comment on column public.blackfriday_leads.tracking_status is
  'Idempotent Metricageek delivery state for the lead event.';
