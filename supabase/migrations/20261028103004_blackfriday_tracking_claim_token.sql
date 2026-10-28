alter table public.blackfriday_leads
  add column if not exists tracking_claim_token uuid;


create index if not exists blackfriday_leads_tracking_claim_idx
  on public.blackfriday_leads (tracking_claimed_at)
  where tracking_status = 'processing' and tracking_claim_token is not null;
