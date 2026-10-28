alter table public.blackfriday_leads
  add column if not exists browser_token_hash text;

create unique index if not exists blackfriday_leads_browser_token_hash_uidx
  on public.blackfriday_leads (browser_token_hash)
  where browser_token_hash is not null;
