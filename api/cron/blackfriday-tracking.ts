import { deliverBlackFridayLead, nextTrackingRetry } from '../../src/lib/blackfriday-metricageek.ts';
import { randomUUID } from 'node:crypto';
import { buildBlackFridayClaimFilter } from '../../src/lib/blackfriday-tracking-claim.ts';

type ApiRequest = { method?: string; headers: Record<string, string | string[] | undefined> };
type ApiResponse = { setHeader(name: string, value: string): void; status(code: number): ApiResponse; json(body: Record<string, unknown>): void };

function respond(res: ApiResponse, status: number, body: Record<string, unknown>) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(status).json(body);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') return respond(res, 405, { error: 'method_not_allowed' });
  const secret = process.env.CRON_SECRET || '';
  const authHeader = Array.isArray(req.headers.authorization) ? req.headers.authorization[0] : req.headers.authorization;
  if (secret.length < 32) return respond(res, 503, { error: 'cron_not_configured' });
  if (authHeader !== `Bearer ${secret}`) return respond(res, 401, { error: 'unauthorized' });

  const supabaseUrl = process.env.BLACKFRIDAY_SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseSecret = process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseSecret) return respond(res, 503, { error: 'registration_unavailable' });

  const now = new Date();
  const stale = new Date(Date.now() - 5 * 60_000);
  const dueQuery = new URLSearchParams({
    measurement_consent: 'is.true',
    or: `(and(tracking_status.eq.pending,tracking_next_retry_at.lte.${now.toISOString()}),and(tracking_status.eq.processing,tracking_claimed_at.lt.${stale.toISOString()}))`,
    select: 'id,request_id,created_at,full_name,email,whatsapp,consent,measurement_consent,attribution,tracking_status,tracking_attempts',
    order: 'tracking_next_retry_at.asc',
    limit: '8',
  });
  const due = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?${dueQuery}`, {
    headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}` },
  });
  if (!due.ok) return respond(res, 503, { error: 'tracking_queue_unavailable' });
  const leads = await due.json() as Record<string, unknown>[];

  let claimedCount = 0;
  let sent = 0;
  let pending = 0;
  let dead = 0;
  for (const lead of leads) {
    const attempts = Number(lead.tracking_attempts || 0) + 1;
    const claimToken = randomUUID();
    const retryFilter = `(and(tracking_status.eq.pending,tracking_next_retry_at.lte.${now.toISOString()}),and(tracking_status.eq.processing,tracking_claimed_at.lt.${stale.toISOString()}))`;
    const claim = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?id=eq.${encodeURIComponent(String(lead.id))}&measurement_consent=is.true&or=${encodeURIComponent(retryFilter)}`, {
      method: 'PATCH',
      headers: {
        apikey: supabaseSecret,
        Authorization: `Bearer ${supabaseSecret}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ tracking_status: 'processing', tracking_attempts: attempts, tracking_claimed_at: new Date().toISOString(), tracking_claim_token: claimToken }),
    });
    if (!claim.ok) continue;
    const claimRows = await claim.json().catch(() => []) as Record<string, unknown>[];
    if (!claimRows[0]) continue;
    claimedCount++;

    const delivery = await deliverBlackFridayLead(claimRows[0] as unknown as Parameters<typeof deliverBlackFridayLead>[0], attempts);
    const status = delivery.ok ? 'sent' : attempts >= 8 ? 'dead' : 'pending';
    const update = await fetch(`${supabaseUrl}/rest/v1/blackfriday_leads?${buildBlackFridayClaimFilter(String(lead.id), claimToken)}`, {
      method: 'PATCH',
      headers: { apikey: supabaseSecret, Authorization: `Bearer ${supabaseSecret}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify({
        tracking_status: status,
        tracking_claimed_at: null,
        tracking_claim_token: null,
        tracking_next_retry_at: status === 'pending' ? nextTrackingRetry(attempts) : null,
        tracking_last_error: delivery.ok ? null : delivery.code,
      }),
    });
    if (!update.ok) { pending++; continue; }
    const finalized = await update.json().catch(() => []) as Record<string, unknown>[];
    if (!finalized[0]) continue;
    if (status === 'sent') sent++;
    else if (status === 'dead') dead++;
    else pending++;
  }

  return respond(res, 200, { ok: true, claimed: claimedCount, sent, pending, dead });
}
