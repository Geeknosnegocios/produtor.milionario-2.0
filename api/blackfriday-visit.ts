// Contador anonimo de visitas: grava so o instante e os UTM. Nao le nem guarda IP, navegador ou cookie.
type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): void;
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const BOT_PATTERN = /bot|crawl|spider|slurp|facebookexternalhit|meta-externalagent|preview|headless|lighthouse|pingdom|uptime/i;
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g;

function respond(res: ApiResponse, status: number, body: Record<string, unknown>) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(status).json(body);
}

const readHeader = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] || '' : value || '';

function cleanUtm(input: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return out;
  for (const key of UTM_KEYS) {
    const value = (input as Record<string, unknown>)[key];
    if (typeof value !== 'string') continue;
    const clean = value.replace(CONTROL_CHARS, '').trim().slice(0, 100);
    if (clean) out[key] = clean;
  }
  return out;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return respond(res, 405, { ok: false, error: 'method_not_allowed' });

  const host = readHeader(req.headers['x-forwarded-host'] || req.headers.host).split(',')[0].trim().toLowerCase();
  let originHost = '';
  try { originHost = new URL(readHeader(req.headers.origin)).host.toLowerCase(); } catch { /* invalid or absent origin */ }
  if (!host || !originHost || host !== originHost) return respond(res, 403, { ok: false, error: 'origin_not_allowed' });

  // O navegador so e olhado aqui para descartar robos; nada disso e guardado.
  if (BOT_PATTERN.test(readHeader(req.headers['user-agent']))) return respond(res, 202, { ok: true });

  let payload: unknown;
  try { payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return respond(res, 400, { ok: false, error: 'invalid_json' }); }
  const utm = cleanUtm((payload as { utm?: unknown } | null)?.utm);

  const supabaseUrl = process.env.BLACKFRIDAY_SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseSecret = process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseSecret) return respond(res, 503, { ok: false, error: 'counter_unavailable' });

  try {
    const saved = await fetch(`${supabaseUrl}/rest/v1/blackfriday_page_views`, {
      method: 'POST',
      headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(utm),
      signal: AbortSignal.timeout(4000),
    });
    if (!saved.ok) return respond(res, 502, { ok: false, error: 'counter_failed' });
  } catch {
    return respond(res, 502, { ok: false, error: 'counter_failed' });
  }
  return respond(res, 202, { ok: true });
}
