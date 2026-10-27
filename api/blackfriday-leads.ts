import { deliverBlackFridayLead, nextTrackingRetry } from '../src/lib/blackfriday-metricageek';

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  consent?: unknown;
  measurementConsent?: unknown;
  attribution?: { fbp?: unknown; fbc?: unknown };
  requestId?: unknown;
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
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function respond(res: ApiResponse, status: number, body: Record<string, unknown>) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.status(status).json(body);
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
  const measurementConsent = payload.measurementConsent === true;
  const elapsed = Date.now() - Number(payload.startedAt || 0);

  if (name.length < 2 || name.length > 100) return respond(res, 400, { ok: false, error: "invalid_name" });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond(res, 400, { ok: false, error: "invalid_email" });
  if (!/^[1-9][0-9]9[0-9]{8}$/.test(whatsapp)) return respond(res, 400, { ok: false, error: "invalid_whatsapp" });
  if (payload.consent !== true) return respond(res, 400, { ok: false, error: "consent_required" });
  if (!UUID_PATTERN.test(requestId)) return respond(res, 400, { ok: false, error: "invalid_request" });
  if (!Number.isFinite(elapsed) || elapsed < 1800) return respond(res, 400, { ok: false, error: "request_too_fast" });

  const supabaseUrl = process.env.BLACKFRIDAY_SUPABASE_URL?.replace(/\/+$/, "");
  const supabaseSecret = process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseSecret) return respond(res, 503, { ok: false, error: "registration_unavailable" });

  const utm = Object.fromEntries(UTM_KEYS.flatMap((key) => {
    const value = payload.utm?.[key];
    return typeof value === "string" && value.length ? [[key, value.slice(0, 250)]] : [];
  }));
  const validFbCookie = (value: unknown) => typeof value === 'string' && value.length <= 600 && /^fb\.1\.\d{10,13}\.[A-Za-z0-9_.-]{1,512}$/.test(value) ? value : null;

  try {
    const saved = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?on_conflict=email,campaign&select=id,request_id,created_at,full_name,email,whatsapp,consent,measurement_consent,attribution,tracking_status,tracking_attempts`, {
      method: "POST",
      headers: {
        apikey: supabaseSecret,
        Authorization: `Bearer ${supabaseSecret}`,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=representation",
      },
      body: JSON.stringify({
        request_id: requestId,
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
        attribution: {
          fbp: measurementConsent ? validFbCookie(payload.attribution?.fbp) : null,
          fbc: measurementConsent ? validFbCookie(payload.attribution?.fbc) : null,
        },
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
        select: 'id,request_id,created_at,full_name,email,whatsapp,consent,measurement_consent,attribution,tracking_status,tracking_attempts',
        limit: '1',
      });
      const existing = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?${query}`, {
        headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}` },
      });
      if (!existing.ok) return respond(res, 503, { ok: false, error: 'registration_unavailable' });
      try { lead = (await existing.json())[0]; } catch { /* The registration itself remains saved. */ }
    }

    if (lead?.measurement_consent === true && lead.tracking_status === 'pending') {
      const attempts = Number(lead.tracking_attempts || 0) + 1;
      const claim = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?id=eq.${encodeURIComponent(String(lead.id))}&tracking_status=eq.pending`, {
        method: 'PATCH',
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ tracking_status: 'processing', tracking_attempts: attempts, tracking_claimed_at: new Date().toISOString() }),
      });
      let claimed: Record<string, unknown>[] = [];
      if (claim.ok) { try { claimed = await claim.json(); } catch { /* A concurrent request owns this delivery. */ } }
      if (claimed[0]) {
        const delivery = await deliverBlackFridayLead(claimed[0] as unknown as Parameters<typeof deliverBlackFridayLead>[0], attempts);
        const status = delivery.ok ? 'sent' : attempts >= 8 ? 'dead' : 'pending';
        await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?id=eq.${encodeURIComponent(String(lead.id))}&tracking_status=eq.processing`, {
          method: 'PATCH',
          headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({
            tracking_status: status,
            tracking_claimed_at: null,
            tracking_next_retry_at: status === 'pending' ? nextTrackingRetry(attempts) : null,
            tracking_last_error: delivery.ok ? null : delivery.code,
          }),
        }).catch(() => undefined);
      }
    }
    return respond(res, 200, {
      ok: true,
      next: NEXT_PATH,
      lead_created: leadCreated,
      measurement_consent: lead?.measurement_consent === true,
      event_id: lead?.measurement_consent === true ? lead.request_id : undefined,
    });
  } catch {
    return respond(res, 503, { ok: false, error: "registration_unavailable" });
  }
}
