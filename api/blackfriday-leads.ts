type LeadPayload = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  consent?: unknown;
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

  try {
    const saved = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?on_conflict=email,campaign`, {
      method: "POST",
      headers: {
        apikey: supabaseSecret,
        Authorization: `Bearer ${supabaseSecret}`,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=minimal",
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
        utm,
        source: "produtor-geekacademy-site",
      }),
    });
    if (!saved.ok) {
      console.error("[blackfriday-leads] Supabase insert failed", saved.status);
      return respond(res, 503, { ok: false, error: "registration_unavailable" });
    }
    return respond(res, 200, { ok: true, next: NEXT_PATH });
  } catch {
    return respond(res, 503, { ok: false, error: "registration_unavailable" });
  }
}
