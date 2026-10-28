import { buildBlackFridayIdentity, captureTrackingContext, deliverBlackFridayLead, nextTrackingRetry } from '../src/lib/blackfriday-metricageek.ts';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { buildBlackFridayClaimFilter } from '../src/lib/blackfriday-tracking-claim.ts';

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  consent?: unknown;
  measurementConsent?: unknown;
  attribution?: { fbp?: unknown; fbc?: unknown; sid?: unknown };
  requestId?: unknown;
  accessToken?: unknown;
  startedAt?: unknown;
  website?: unknown;
  utm?: Record<string, unknown>;
};

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

const NEXT_PATH = "/blackfriday/obrigado/";
const ACCESS_COOKIE = 'bf_lead_access';
const ACCESS_TOKEN_PATTERN = /^[a-f0-9]{64}$/i;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function respond(res: ApiResponse, status: number, body: Record<string, unknown>) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.status(status).json(body);
}

function getAccessToken(req: ApiRequest): string {
  const cookieHeader = Array.isArray(req.headers.cookie) ? req.headers.cookie[0] || '' : req.headers.cookie || '';
  const prefix = `${ACCESS_COOKIE}=`;
  const entry = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(prefix));
  return entry?.slice(prefix.length) || '';
}

function hashAccessToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function ownsLead(token: string, storedHash: unknown): boolean {
  if (!ACCESS_TOKEN_PATTERN.test(token) || typeof storedHash !== 'string' || !/^[a-f0-9]{64}$/i.test(storedHash)) return false;
  return timingSafeEqual(Buffer.from(hashAccessToken(token), 'hex'), Buffer.from(storedHash, 'hex'));
}

function setAccessCookie(res: ApiResponse, token: string) {
  res.setHeader('Set-Cookie', `${ACCESS_COOKIE}=${token}; Path=/api/blackfriday-leads; HttpOnly; Secure; SameSite=Lax`);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return respond(res, 405, { ok: false, error: "method_not_allowed" });

  const readHeader = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] || "" : value || "";
  const host = readHeader(req.headers["x-forwarded-host"] || req.headers.host).split(",")[0].trim().toLowerCase();
  let originHost = "";
  try { originHost = new URL(readHeader(req.headers.origin)).host.toLowerCase(); } catch { /* invalid or absent origin */ }
  if (!host || !originHost || host !== originHost) return respond(res, 403, { ok: false, error: "origin_not_allowed" });

  let rawPayload: unknown;
  try { rawPayload = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {}); }
  catch { return respond(res, 400, { ok: false, error: "invalid_json" }); }
  if (!rawPayload || typeof rawPayload !== "object" || Array.isArray(rawPayload)) {
    return respond(res, 400, { ok: false, error: "invalid_json" });
  }
  const payload = rawPayload as LeadPayload;

  // Honeypot: silently discard automated submissions without confirming field detection.
  if (typeof payload.website === "string" && payload.website.trim()) return respond(res, 200, { ok: true, next: NEXT_PATH });

  const name = String(payload.name || "").trim().replace(/\s+/g, " ");
  const email = String(payload.email || "").trim().toLowerCase();
  const whatsapp = String(payload.whatsapp || "").replace(/\D/g, "");
  const requestId = String(payload.requestId || "");
  const accessToken = String(payload.accessToken || '');
  const measurementConsent = payload.measurementConsent === true;

  if (name.length < 2 || name.length > 100) return respond(res, 400, { ok: false, error: "invalid_name" });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond(res, 400, { ok: false, error: "invalid_email" });
  if (!/^[1-9][0-9]9[0-9]{8}$/.test(whatsapp)) return respond(res, 400, { ok: false, error: "invalid_whatsapp" });
  if (payload.consent !== true) return respond(res, 400, { ok: false, error: "consent_required" });
  if (!UUID_PATTERN.test(requestId)) return respond(res, 400, { ok: false, error: "invalid_request" });
  if (!ACCESS_TOKEN_PATTERN.test(accessToken)) return respond(res, 400, { ok: false, error: 'invalid_request' });
  // Client wall clocks and autofill speed cannot establish whether a signup is legitimate.
  // Keep the same-origin, honeypot, field, consent and request-token checks above.

  const supabaseUrl = process.env.BLACKFRIDAY_SUPABASE_URL?.replace(/\/+$/, "");
  const supabaseSecret = process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseSecret) return respond(res, 503, { ok: false, error: "registration_unavailable" });

  const utm = Object.fromEntries(UTM_KEYS.flatMap((key) => {
    const value = payload.utm?.[key];
    return typeof value === "string" && value.length ? [[key, value.slice(0, 250)]] : [];
  }));

  try {
    const saved = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?on_conflict=email,campaign&select=id,request_id,created_at,full_name,email,whatsapp,consent,measurement_consent,attribution,tracking_status,tracking_attempts,browser_token_hash`, {
      method: "POST",
      headers: {
        apikey: supabaseSecret,
        Authorization: `Bearer ${supabaseSecret}`,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=representation",
      },
      body: JSON.stringify({
        request_id: requestId,
        browser_token_hash: hashAccessToken(accessToken),
        campaign: "blackfriday-2026",
        full_name: name,
        email,
        whatsapp,
        consent: true,
        consent_version: "blackfriday-2026-10-26-v1",
        consented_at: new Date().toISOString(),
        measurement_consent: measurementConsent,
        measurement_consent_version: measurementConsent ? "blackfriday-measurement-2026-10-27-v1" : null,
        measurement_consented_at: measurementConsent ? new Date().toISOString() : null,
        attribution: measurementConsent ? captureTrackingContext(req.headers, payload.attribution) : { fbp: null, fbc: null },
        tracking_status: measurementConsent ? "pending" : "not_required",
        tracking_next_retry_at: measurementConsent ? new Date().toISOString() : null,
        utm,
        source: "produtor-geekacademy-site",
      }),
    });
    if (!saved.ok) {
      console.error("[blackfriday-leads] Supabase insert failed", saved.status);
      return respond(res, 503, { ok: false, error: "registration_unavailable" });
    }

    let inserted: Record<string, unknown>[] = [];
    try { inserted = await saved.json(); } catch { /* A missing representation is handled as a duplicate lookup. */ }
    const leadCreated = !!inserted[0];
    let lead = inserted[0] as Record<string, unknown> | undefined;
    if (!lead) {
      const query = new URLSearchParams({
        email: `eq.${email}`,
        campaign: 'eq.blackfriday-2026',
        select: 'id,request_id,created_at,full_name,email,whatsapp,consent,measurement_consent,attribution,tracking_status,tracking_attempts,browser_token_hash',
        limit: '1',
      });
      const existing = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?${query}`, {
        headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}` },
      });
      if (!existing.ok) return respond(res, 503, { ok: false, error: 'registration_unavailable' });
      try { lead = (await existing.json())[0]; } catch { /* The registration itself remains saved. */ }
    }

    if (leadCreated) setAccessCookie(res, accessToken);
    else if (lead && lead.measurement_consent !== measurementConsent && !ownsLead(getAccessToken(req), lead.browser_token_hash)) {
      return respond(res, 409, { ok: false, error: 'consent_change_requires_original_browser' });
    } else if (lead && ownsLead(getAccessToken(req), lead.browser_token_hash) && lead.measurement_consent !== measurementConsent) {
      const wasConsented = lead.measurement_consent === true;
      const nextStatus = measurementConsent
        ? wasConsented && lead.tracking_status === 'sent' ? 'sent' : 'pending'
        : lead.tracking_status === 'sent' ? 'sent' : 'not_required';
      const query = new URLSearchParams({
        id: `eq.${String(lead.id)}`,
        browser_token_hash: `eq.${String(lead.browser_token_hash)}`,
        select: 'id,request_id,created_at,full_name,email,whatsapp,consent,measurement_consent,attribution,tracking_status,tracking_attempts,browser_token_hash',
      });
      const updated = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?${query}`, {
        method: 'PATCH',
        headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
        body: JSON.stringify({
          measurement_consent: measurementConsent,
          measurement_consent_version: measurementConsent ? 'blackfriday-measurement-2026-10-27-v1' : null,
          measurement_consented_at: measurementConsent ? new Date().toISOString() : null,
          attribution: measurementConsent ? captureTrackingContext(req.headers, payload.attribution) : { fbp: null, fbc: null },
          tracking_status: nextStatus,
          tracking_attempts: measurementConsent && !wasConsented ? 0 : lead.tracking_attempts,
          tracking_claimed_at: null,
          tracking_claim_token: null,
          tracking_next_retry_at: measurementConsent && nextStatus === 'pending' ? new Date().toISOString() : null,
          tracking_last_error: null,
        }),
      });
      if (!updated.ok) return respond(res, 503, { ok: false, error: 'consent_update_unavailable' });
      try { lead = (await updated.json())[0] || lead; } catch { return respond(res, 503, { ok: false, error: 'consent_update_unavailable' }); }
    }

    if (lead?.measurement_consent === true && lead.tracking_status === 'pending') {
      const attempts = Number(lead.tracking_attempts || 0) + 1;
      const claimToken = randomUUID();
      const claim = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?id=eq.${encodeURIComponent(String(lead.id))}&tracking_status=eq.pending&measurement_consent=is.true`, {
        method: 'PATCH',
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ tracking_status: 'processing', tracking_attempts: attempts, tracking_claimed_at: new Date().toISOString(), tracking_claim_token: claimToken }),
      });
      let claimed: Record<string, unknown>[] = [];
      if (claim.ok) { try { claimed = await claim.json(); } catch { /* A concurrent request owns this delivery. */ } }
      if (claimed[0]) {
        const delivery = await deliverBlackFridayLead(claimed[0] as unknown as Parameters<typeof deliverBlackFridayLead>[0], attempts);
        const status = delivery.ok ? 'sent' : attempts >= 8 ? 'dead' : 'pending';
        await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?${buildBlackFridayClaimFilter(String(lead.id), claimToken)}`, {
          method: 'PATCH',
          headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({
            tracking_status: status,
            tracking_claimed_at: null,
            tracking_claim_token: null,
            tracking_next_retry_at: status === 'pending' ? nextTrackingRetry(attempts) : null,
            tracking_last_error: delivery.ok ? null : delivery.code,
          }),
        }).catch(() => undefined);
      }
    }
    const mayIdentify = !!lead && (leadCreated || ownsLead(getAccessToken(req), lead.browser_token_hash)) && lead.measurement_consent === true && measurementConsent;
    const browserIdentity: Record<string, string[]> = {};
    if (mayIdentify) {
      const hashes = buildBlackFridayIdentity(lead as unknown as Parameters<typeof buildBlackFridayIdentity>[0]);
      for (const key of ['em', 'ph', 'fn', 'ln'] as const) if (hashes[`${key}_hash`]) browserIdentity[key] = [hashes[`${key}_hash`]];
    }
    return respond(res, 200, {
      ok: true,
      next: NEXT_PATH,
      lead_created: leadCreated,
      measurement_consent: lead?.measurement_consent === true,
      event_id: mayIdentify ? lead!.request_id : undefined,
      event_time: mayIdentify ? Math.floor(new Date(String(lead!.created_at)).getTime() / 1000) : undefined,
      identity: mayIdentify ? browserIdentity : undefined,
    });
  } catch {
    return respond(res, 503, { ok: false, error: "registration_unavailable" });
  }
}
