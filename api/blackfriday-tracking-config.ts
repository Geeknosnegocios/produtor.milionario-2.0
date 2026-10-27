import { isAllowedMetricageekIngestUrl, isAllowedMetricageekScriptUrl } from '../src/lib/metricageek-endpoint.ts';

type ApiRequest = { method?: string };
type ApiResponse = { setHeader(name: string, value: string): void; status(code: number): ApiResponse; json(body: Record<string, unknown>): void };

function respond(res: ApiResponse, status: number, body: Record<string, unknown>) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(status).json(body);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') return respond(res, 405, { error: 'method_not_allowed' });
  const ingestUrl = process.env.BLACKFRIDAY_METRICAGEEK_INGEST_URL || '';
  let configUrl: URL;
  try {
    const ingest = new URL(ingestUrl);
    if (!isAllowedMetricageekIngestUrl(ingestUrl)) {
      return respond(res, 503, { configured: false });
    }
    configUrl = new URL(`${ingest.pathname}/config`, ingest.origin);
  } catch {
    return respond(res, 503, { configured: false });
  }

  try {
    const response = await fetch(configUrl, { signal: AbortSignal.timeout(4000), cache: 'no-store' });
    if (!response.ok) return respond(res, 503, { configured: false });
    const config = await response.json() as { script_url?: string; pixel_id?: string; consent_required?: boolean; campaign_key?: string };
    if (typeof config.script_url !== 'string' || !isAllowedMetricageekScriptUrl(config.script_url)) {
      return respond(res, 503, { configured: false });
    }
    return respond(res, 200, {
      configured: true,
      script_url: config.script_url,
      pixel_id: config.pixel_id,
      consent_required: config.consent_required === true,
      campaign_key: config.campaign_key,
    });
  } catch {
    return respond(res, 503, { configured: false });
  }
}
