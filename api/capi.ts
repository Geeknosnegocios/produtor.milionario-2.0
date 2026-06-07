// Meta Conversions API (CAPI) — server-side event relay
// Pixel/Dataset: 2072830730255789 (FPM2.0)
// Env (Vercel): FB_CAPI_TOKEN (obrigatório, secreto) · FB_PIXEL_ID (opcional, default abaixo)
// Cliente envia event_id igual ao do pixel → Meta deduplica (1 evento, não 2).

const GRAPH_VERSION = "v21.0";
const DEFAULT_PIXEL = "2072830730255789";

interface CapiBody {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  fbp?: string;
  fbc?: string;
  custom_data?: Record<string, unknown>;
  test_event_code?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const PIXEL = process.env.FB_PIXEL_ID || DEFAULT_PIXEL;
  const TOKEN = process.env.FB_CAPI_TOKEN;
  if (!TOKEN) {
    res.status(500).json({ error: "missing_FB_CAPI_TOKEN" });
    return;
  }

  let body: CapiBody = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  } catch {
    res.status(400).json({ error: "invalid_json" });
    return;
  }

  if (!body.event_name) {
    res.status(400).json({ error: "missing_event_name" });
    return;
  }

  const fwd = (req.headers["x-forwarded-for"] as string) || "";
  const ip = fwd.split(",")[0].trim() || req.socket?.remoteAddress || undefined;
  const ua = (req.headers["user-agent"] as string) || undefined;

  const user_data: Record<string, unknown> = {};
  if (ip) user_data.client_ip_address = ip;
  if (ua) user_data.client_user_agent = ua;
  if (body.fbp) user_data.fbp = body.fbp;
  if (body.fbc) user_data.fbc = body.fbc;

  const event = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    action_source: "website",
    event_source_url: body.event_source_url,
    user_data,
    custom_data: body.custom_data || {},
  };

  const payload: Record<string, unknown> = { data: [event] };
  if (body.test_event_code) payload.test_event_code = body.test_event_code;

  try {
    const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL}/events?access_token=${encodeURIComponent(TOKEN)}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await r.json();
    res.status(r.ok ? 200 : 502).json(j);
  } catch (err) {
    res.status(502).json({ error: "capi_request_failed", detail: String(err) });
  }
}
