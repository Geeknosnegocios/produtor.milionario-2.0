-- Contador anonimo de visitas da captura Black Friday.
-- Guarda so o instante e os parametros de campanha (UTM). Sem cookie, sem IP, sem navegador, sem identificador.
create table if not exists public.blackfriday_page_views (
  id uuid primary key default gen_random_uuid(),
  viewed_at timestamptz not null default now(),
  campaign text not null default 'blackfriday-2026',
  utm_source text check (char_length(utm_source) <= 100),
  utm_medium text check (char_length(utm_medium) <= 100),
  utm_campaign text check (char_length(utm_campaign) <= 100),
  utm_content text check (char_length(utm_content) <= 100),
  utm_term text check (char_length(utm_term) <= 100)
);

create index if not exists blackfriday_page_views_viewed_at_idx
  on public.blackfriday_page_views (viewed_at desc);
create index if not exists blackfriday_page_views_content_idx
  on public.blackfriday_page_views (utm_content, viewed_at desc);

alter table public.blackfriday_page_views enable row level security;
revoke all on table public.blackfriday_page_views from public, anon, authenticated, service_role;
grant insert on table public.blackfriday_page_views to service_role;

comment on table public.blackfriday_page_views is
  'Contagem anonima de visitas da captura Black Friday 2026 por UTM. Sem dados pessoais.';
