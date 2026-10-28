import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import handler from '../api/blackfriday-leads.ts';

const HOST = 'produtor.geekacademy.site';
const COOKIE = 'bf_lead_access';
const ORIGINAL_TOKEN = 'aa'.repeat(32);
const NEW_TOKEN = 'bb'.repeat(32);
const REQUEST_ID = '123e4567-e89b-42d3-a456-426614174000';
const tokenHash = token => createHash('sha256').update(token).digest('hex');

test('valid signup accepts autofill and a device clock ahead of the server', async t => {
  withEnv(t);
  let writes = 0;
  withFetch(t, async (_url, options) => {
    assert.equal(options.method, 'POST');
    writes++;
    return new Response(JSON.stringify([{ id: 'lead-clock-test', measurement_consent: false }]), { status: 201 });
  });
  for (const startedAt of [Date.now(), Date.now() + 3_600_000]) {
    const res = response();
    await handler({ method: 'POST', headers: { host: HOST, origin: `https://${HOST}` }, body: { ...payload(false), startedAt } }, res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.ok, true);
  }
  assert.equal(writes, 2);
});

function response() {
  return {
    headers: {}, statusCode: 0, body: undefined,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; },
  };
}

function withEnv(t) {
  const previous = { url: process.env.BLACKFRIDAY_SUPABASE_URL, key: process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY };
  process.env.BLACKFRIDAY_SUPABASE_URL = 'https://supabase.example.test';
  process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY = 'test-only-server-key';
  t.after(() => {
    if (previous.url === undefined) delete process.env.BLACKFRIDAY_SUPABASE_URL; else process.env.BLACKFRIDAY_SUPABASE_URL = previous.url;
    if (previous.key === undefined) delete process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY; else process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY = previous.key;
  });
}

function withFetch(t, fn) {
  const prior = globalThis.fetch;
  globalThis.fetch = fn;
  t.after(() => { globalThis.fetch = prior; });
}

const payload = (measurementConsent, accessToken = NEW_TOKEN) => ({
  name: 'Ana Silva', email: 'ana@example.com', whatsapp: '11912345678', consent: true,
  measurementConsent, attribution: measurementConsent ? { fbp: 'fb.1.1793100000000.test' } : {},
  requestId: REQUEST_ID, accessToken, startedAt: Date.now() - 3000,
});

test('new signup stores only an access-token hash and sets a secure HttpOnly cookie', async t => {
  withEnv(t);
  let insertBody;
  withFetch(t, async (url, options) => {
    if (options.method === 'POST') {
      insertBody = JSON.parse(options.body);
      return new Response(JSON.stringify([{ id: 'lead-1', request_id: REQUEST_ID, created_at: new Date().toISOString(), full_name: 'Ana Silva', email: 'ana@example.com', whatsapp: '11912345678', consent: true, measurement_consent: false, attribution: {}, tracking_status: 'not_required', tracking_attempts: 0 }]), { status: 201 });
    }
    throw new Error(`unexpected ${options.method} request to ${url}`);
  });
  const res = response();
  await handler({ method: 'POST', headers: { host: HOST, origin: `https://${HOST}` }, body: payload(false) }, res);
  assert.equal(insertBody.browser_token_hash, tokenHash(NEW_TOKEN));
  assert.equal(JSON.stringify(insertBody).includes(NEW_TOKEN), false);
  assert.match(res.headers['set-cookie'], new RegExp(`^${COOKIE}=${NEW_TOKEN};`));
  assert.match(res.headers['set-cookie'], /HttpOnly; Secure; SameSite=Lax/);
});

test('duplicate signup requires the original browser token to change saved measurement consent', async t => {
  withEnv(t);
  const calls = [];
  withFetch(t, async (url, options) => {
    calls.push({ url: String(url), method: options.method });
    if (options.method === 'POST') return new Response('[]', { status: 201 });
    if (!options.method) return new Response(JSON.stringify([{ id: 'lead-1', request_id: REQUEST_ID, created_at: new Date().toISOString(), full_name: 'Ana Silva', email: 'ana@example.com', whatsapp: '11912345678', consent: true, measurement_consent: false, attribution: {}, tracking_status: 'not_required', tracking_attempts: 0, browser_token_hash: tokenHash(ORIGINAL_TOKEN) }]), { status: 200 });
    throw new Error(`unexpected ${options.method} request`);
  });
  const res = response();
  await handler({ method: 'POST', headers: { host: HOST, origin: `https://${HOST}` }, body: payload(true) }, res);
  assert.equal(calls.some(call => call.method === 'PATCH'), false);
  assert.equal(res.statusCode, 409);
  assert.deepEqual(res.body, { ok: false, error: 'consent_change_requires_original_browser' });
});

test('same-browser resubmission may update the saved measurement choice while preserving event ID', async t => {
  withEnv(t);
  const patchBodies = [];
  withFetch(t, async (url, options) => {
    if (options.method === 'POST' && String(url).includes('/rest/v1/')) return new Response('[]', { status: 201 });
    if (!options.method) return new Response(JSON.stringify([{ id: 'lead-1', request_id: REQUEST_ID, created_at: new Date().toISOString(), full_name: 'Ana Silva', email: 'ana@example.com', whatsapp: '11912345678', consent: true, measurement_consent: false, attribution: {}, tracking_status: 'not_required', tracking_attempts: 0, browser_token_hash: tokenHash(ORIGINAL_TOKEN) }]), { status: 200 });
    if (options.method === 'PATCH') {
      const body = JSON.parse(options.body);
      if (String(url).includes('browser_token_hash=eq.')) {
        patchBodies.push(body);
        return new Response(JSON.stringify([{ id: '550e8400-e29b-41d4-a716-446655440001', request_id: REQUEST_ID, created_at: new Date().toISOString(), full_name: 'Ana Silva', email: 'ana@example.com', whatsapp: '11912345678', consent: true, measurement_consent: true, attribution: { fbp: 'fb.1.1793100000000.test' }, tracking_status: 'pending', tracking_attempts: 0, browser_token_hash: tokenHash(ORIGINAL_TOKEN) }]), { status: 200 });
      }
      if (String(url).includes('tracking_status=eq.pending')) {
        return new Response(JSON.stringify([{ id: '550e8400-e29b-41d4-a716-446655440001', request_id: REQUEST_ID, created_at: new Date().toISOString(), full_name: 'Ana Silva', email: 'ana@example.com', whatsapp: '11912345678', consent: true, measurement_consent: true, attribution: { fbp: 'fb.1.1793100000000.test' }, tracking_status: 'processing', tracking_attempts: 1 }]), { status: 200 });
      }
      return new Response('[]', { status: 200 });
    }
    if (options.method === 'POST') return new Response(JSON.stringify({ ok: true, status: 'pending' }), { status: 202 });
    throw new Error(`unexpected ${options.method} request to ${new URL(String(url)).pathname}`);
  });
  const res = response();
  await handler({ method: 'POST', headers: { host: HOST, origin: `https://${HOST}`, cookie: `${COOKIE}=${ORIGINAL_TOKEN}` }, body: payload(true) }, res);
  assert.equal(patchBodies.length, 1);
  assert.equal(patchBodies[0].measurement_consent, true);
  assert.deepEqual(patchBodies[0].attribution, { fbp: 'fb.1.1793100000000.test', fbc: null });
  assert.equal(res.body.measurement_consent, true);
  assert.equal(res.body.event_id, REQUEST_ID);
});
