import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { buildBlackFridayClaimFilter } from '../src/lib/blackfriday-tracking-claim.ts';
import { classifyMetricageekReceipt } from '../src/lib/blackfriday-metricageek.ts';

test('finalize filter fences a worker to its own processing claim', () => {
  const id = randomUUID();
  const token = randomUUID();
  assert.equal(
    buildBlackFridayClaimFilter(id, token),
    `id=eq.${id}&tracking_status=eq.processing&tracking_claim_token=eq.${token}`,
  );
});

test('claim filter rejects non-UUID IDs and tokens', () => {
  assert.throws(() => buildBlackFridayClaimFilter('not-a-uuid', randomUUID()), /invalid_claim/);
  assert.throws(() => buildBlackFridayClaimFilter(randomUUID(), 'not-a-token'), /invalid_claim/);
});

test('Metricageek pending receipts stay retryable instead of being reported as sent', () => {
  assert.deepEqual(classifyMetricageekReceipt(200, { ok: true, status: 'sent' }), { ok: true, code: 'accepted' });
  assert.deepEqual(classifyMetricageekReceipt(202, { ok: true, status: 'pending' }), { ok: false, code: 'metricageek_delivery_pending' });
  assert.deepEqual(classifyMetricageekReceipt(202, { ok: true, status: 'processing' }), { ok: false, code: 'metricageek_delivery_pending' });
  assert.deepEqual(classifyMetricageekReceipt(503, { error: 'busy' }), { ok: false, code: 'metricageek_http_503' });
});
