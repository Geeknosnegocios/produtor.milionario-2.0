-- Historical rows keep NULL: do not invent their consent timestamp.
alter table public.blackfriday_leads
  add column if not exists consented_at timestamptz;
alter table public.blackfriday_leads
  alter column consented_at set default now();
comment on column public.blackfriday_leads.consented_at is
  'Timestamp supplied when workshop communication consent is recorded; historical rows may be unknown.';
notify pgrst, 'reload schema';
