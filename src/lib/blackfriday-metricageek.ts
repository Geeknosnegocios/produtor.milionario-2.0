import { createHash, createHmac } from 'node:crypto';
import { isAllowedMetricageekIngestUrl } from './metricageek-endpoint.ts';

type LeadForTracking = {
  request_id: string;
  created_at: string;
  full_name: string;
  email: string;
  whatsapp: string;
  consent: boolean;
  measurement_consent: boolean;
  attribution?: Record<string, unknown> | null;
};

type Delivery = { ok: boolean; code: string };

export function classifyMetricageekReceipt(status: number, body: { status?: unknown; duplicate?: unknown }): Delivery {
  if (status === 200 && body.status === 'sent') return { ok: true, code: 'accepted' };
  if (status >= 200 && status < 300 && (body.status === 'pending' || body.status === 'processing')) {
    return { ok: false, code: 'metricageek_delivery_pending' };
  }
  if (status >= 200 && status < 300 && body.duplicate === true && body.status === 'sent') return { ok: true, code: 'accepted' };
  return { ok: false, code: status >= 400 ? `metricageek_http_${status}` : 'metricageek_delivery_unconfirmed' };
}

const sha256 = (value: string) => createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

function normalizedBrazilPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (/^\d{10,11}$/.test(digits)) return `55${digits}`;
  if (/^55\d{10,11}$/.test(digits)) return digits;
  throw new Error('invalid_phone_for_tracking');
}

function cookieId(value: unknown, prefix: 'fbp' | 'fbc'): string | undefined {
  if (typeof value !== 'string' || value.length > 600 || /[\r\n]/.test(value)) return undefined;
  const pattern = prefix === 'fbp'
    ? /^fb\.1\.\d{10,13}\.[A-Za-z0-9_.-]{1,512}$/
    : /^fb\.1\.\d{10,13}\.[A-Za-z0-9_.-]{1,512}$/;
  return pattern.test(value) ? value : undefined;
}

export async function deliverBlackFridayLead(lead: LeadForTracking, attemptCount: number): Promise<Delivery> {
  if (!lead.measurement_consent) return { ok: true, code: 'not_required' };
  const endpoint = process.env.BLACKFRIDAY_METRICAGEEK_INGEST_URL || '';
  const signingSecret = process.env.BLACKFRIDAY_METRICAGEEK_SIGNING_SECRET || '';
  if (!endpoint || signingSecret.length < 32) return { ok: false, code: 'metricageek_tracking_not_configured' };

  if (!isAllowedMetricageekIngestUrl(endpoint)) return { ok: false, code: 'metricageek_endpoint_not_allowed' };

  let phoneHash: string;
  try { phoneHash = sha256(normalizedBrazilPhone(lead.whatsapp)); }
  catch { return { ok: false, code: 'invalid_phone_for_tracking' }; }

  const attribution = lead.attribution || {};
  const identity: Record<string, string> = {
    em_hash: sha256(lead.email),
    ph_hash: phoneHash,
  };
  const fbp = cookieId(attribution.fbp, 'fbp');
  const fbc = cookieId(attribution.fbc, 'fbc');
  if (fbp) identity.fbp = fbp;
  if (fbc) identity.fbc = fbc;

  const event = {
    event_id: lead.request_id,
    event_name: 'Lead',
    event_time: Math.floor(new Date(lead.created_at).getTime() / 1000),
    campaign_key: 'blackfriday-2026',
    contact_id: lead.request_id,
    consent: { measurement: true, whatsapp: lead.consent },
    identity,
    data: { page_url: 'https://produtor.geekacademy.site/blackfriday' },
  };
  const raw = JSON.stringify(event);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac('sha256', signingSecret).update(`${timestamp}.${raw}`).digest('hex');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Metricageek-Key': signingSecret,
        'X-Metricageek-Timestamp': timestamp,
        'X-Metricageek-Signature': `sha256=${signature}`,
        'Idempotency-Key': lead.request_id,
      },
      body: raw,
      signal: AbortSignal.timeout(6000),
    });
    const result = await response.json().catch(() => ({})) as { status?: string; duplicate?: boolean };
    return classifyMetricageekReceipt(response.status, result);
  } catch {
    return { ok: false, code: 'metricageek_network_error' };
  }
}

export function nextTrackingRetry(attempts: number): string {
  const backoffMinutes = [1, 5, 15, 60, 240, 720, 1440];
  const minutes = backoffMinutes[Math.min(Math.max(attempts - 1, 0), backoffMinutes.length - 1)];
  return new Date(Date.now() + minutes * 60_000).toISOString();
}
