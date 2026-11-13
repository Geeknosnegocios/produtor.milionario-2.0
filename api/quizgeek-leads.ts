import { createHmac, timingSafeEqual } from 'node:crypto';

// Recebe o webhook assinado do Quiz Geek e grava os leads do quiz da aula de Black Friday
// na mesma base do formulário (`blackfriday_leads`).
//
// Respostas pensadas para o retry do Quiz Geek: 2xx encerra (gravado, duplicado ou quiz
// ignorado), 4xx encerra como falha (assinatura ou dado inválido), 5xx tenta de novo.

type ApiRequest = AsyncIterable<Buffer | string> & {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): void;
};

type QuizGeekPayload = {
  event?: unknown;
  event_id?: unknown;
  occurred_at?: unknown;
  contacts?: Record<string, unknown>;
  quiz?: { slug?: unknown; title?: unknown } | null;
  utm?: Record<string, unknown>;
};

export const config = { api: { bodyParser: false } };

const QUIZ_SLUG = 'black-friday-fpm-2-0-diagnostico-da-aula-64745e7d';
const CAMPAIGN = 'blackfriday-2026';
const CONSENT_VERSION = 'quizgeek-2026-11-13-v1';
const TOLERANCE_SECONDS = 300;
const MAX_BODY_BYTES = 64 * 1024;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function respond(res: ApiResponse, status: number, body: Record<string, unknown>) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(status).json(body);
}

function header(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

// Mesmo esquema de `verifyWebhookSignature` do Quiz Geek:
// `v1=` + base64url(HMAC-SHA256(secret, `${timestamp}.${body}`)), tolerância de 300 s.
export function verifyQuizGeekSignature(
  body: string, timestampRaw: string | undefined, signatureRaw: string | undefined, secret: string, now: number,
): boolean {
  if (typeof timestampRaw !== 'string' || !/^\d{1,12}$/.test(timestampRaw) || typeof signatureRaw !== 'string') return false;
  const timestamp = Number(timestampRaw);
  if (Math.abs(now - timestamp) > TOLERANCE_SECONDS) return false;
  const match = signatureRaw.match(/^v1=([A-Za-z0-9_-]+)$/);
  if (!match) return false;
  const provided = Buffer.from(match[1]!, 'base64url');
  const expected = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest();
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

// Quiz Geek guarda o telefone em E.164 (+5511987654321); a base espera DDD + 9 + 8 dígitos.
export function normalizeWhatsapp(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  let digits = value.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('55')) digits = digits.slice(2);
  return /^[1-9][0-9]9[0-9]{8}$/.test(digits) ? digits : null;
}

async function readBody(req: ApiRequest): Promise<string | null> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
    size += buffer.length;
    if (size > MAX_BODY_BYTES) return null;
    chunks.push(buffer);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return respond(res, 405, { ok: false, error: 'method_not_allowed' });

  const secret = process.env.QUIZGEEK_WEBHOOK_SECRET;
  const supabaseUrl = process.env.BLACKFRIDAY_SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseSecret = process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY;
  if (!secret || secret.length < 32 || !supabaseUrl || !supabaseSecret) {
    return respond(res, 503, { ok: false, error: 'receiver_unavailable' });
  }

  let body: string | null;
  try { body = await readBody(req); } catch { return respond(res, 400, { ok: false, error: 'invalid_body' }); }
  if (body === null) return respond(res, 413, { ok: false, error: 'body_too_large' });

  const valid = verifyQuizGeekSignature(
    body, header(req.headers['x-quizgeek-timestamp']), header(req.headers['x-quizgeek-signature']),
    secret, Math.floor(Date.now() / 1000),
  );
  if (!valid) return respond(res, 401, { ok: false, error: 'invalid_signature' });

  let payload: QuizGeekPayload;
  try { payload = JSON.parse(body); } catch { return respond(res, 400, { ok: false, error: 'invalid_json' }); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return respond(res, 400, { ok: false, error: 'invalid_json' });

  if (payload.event !== 'lead_submitted') return respond(res, 202, { ok: true, ignored: true, reason: 'event' });
  if (payload.quiz?.slug !== QUIZ_SLUG) return respond(res, 202, { ok: true, ignored: true, reason: 'quiz' });

  const contacts = payload.contacts && typeof payload.contacts === 'object' ? payload.contacts : {};
  const name = String(contacts.name ?? '').trim().replace(/\s+/g, ' ').slice(0, 100).trim();
  const email = String(contacts.email ?? '').trim().toLowerCase();
  const whatsapp = normalizeWhatsapp(contacts.whatsapp) ?? normalizeWhatsapp(contacts.phone);
  const eventId = String(payload.event_id ?? '');
  const occurredAt = typeof payload.occurred_at === 'string' && !Number.isNaN(Date.parse(payload.occurred_at))
    ? new Date(payload.occurred_at).toISOString() : new Date().toISOString();

  if (!UUID_PATTERN.test(eventId)) return respond(res, 422, { ok: false, error: 'invalid_event_id' });
  if (name.length < 2) return respond(res, 422, { ok: false, error: 'invalid_name' });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond(res, 422, { ok: false, error: 'invalid_email' });
  if (!whatsapp) return respond(res, 422, { ok: false, error: 'invalid_whatsapp' });

  const utm = Object.fromEntries(UTM_KEYS.flatMap((key) => {
    const value = payload.utm?.[key];
    return typeof value === 'string' && value.length ? [[key, value.slice(0, 250)]] : [];
  }));

  try {
    // O Quiz Geek só envia leads com consentimento de contato (consents.contact = true).
    const saved = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?on_conflict=email,campaign&select=id`, {
      method: 'POST',
      headers: {
        apikey: supabaseSecret,
        Authorization: `Bearer ${supabaseSecret}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=ignore-duplicates,return=representation',
      },
      body: JSON.stringify({
        request_id: eventId,
        campaign: CAMPAIGN,
        full_name: name,
        email,
        whatsapp,
        consent: true,
        consent_version: CONSENT_VERSION,
        consented_at: occurredAt,
        utm,
        source: 'quizgeek',
      }),
    });
    if (!saved.ok) {
      console.error('[quizgeek-leads] Supabase insert failed', saved.status);
      return respond(res, 503, { ok: false, error: 'registration_unavailable' });
    }
    let inserted: unknown[] = [];
    try { inserted = await saved.json(); } catch { /* Sem representação: tratado como duplicado. */ }
    return respond(res, 200, { ok: true, lead_created: Array.isArray(inserted) && inserted.length > 0 });
  } catch {
    return respond(res, 503, { ok: false, error: 'registration_unavailable' });
  }
}
