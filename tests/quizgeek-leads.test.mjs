import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { Readable } from 'node:stream';
import handler, { normalizeWhatsapp, verifyQuizGeekSignature } from '../api/quizgeek-leads.ts';

const SECRET = 'test-only-quizgeek-webhook-secret-0123456789';
const QUIZ_SLUG = 'black-friday-fpm-2-0-diagnostico-da-aula-64745e7d';
const EVENT_ID = '5b0f2f7e-3c1a-4d2b-9e8f-0a1b2c3d4e5f';

function response() {
  return {
    headers: {}, statusCode: 0, body: undefined,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; },
  };
}

function withEnv(t, values = {}) {
  const keys = ['BLACKFRIDAY_SUPABASE_URL', 'BLACKFRIDAY_SUPABASE_SECRET_KEY', 'QUIZGEEK_WEBHOOK_SECRET'];
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  const next = {
    BLACKFRIDAY_SUPABASE_URL: 'https://supabase.example.test/',
    BLACKFRIDAY_SUPABASE_SECRET_KEY: 'test-only-server-key',
    QUIZGEEK_WEBHOOK_SECRET: SECRET,
    ...values,
  };
  for (const key of keys) { if (next[key] === undefined) delete process.env[key]; else process.env[key] = next[key]; }
  t.after(() => { for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key]; } });
}

function withFetch(t, fn) {
  const prior = globalThis.fetch;
  globalThis.fetch = fn;
  t.after(() => { globalThis.fetch = prior; });
}

function sign(body, timestamp, secret = SECRET) {
  return `v1=${createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('base64url')}`;
}

function payload(overrides = {}) {
  return {
    event: 'lead_submitted', event_id: EVENT_ID, occurred_at: '2026-11-13T18:00:00.000Z',
    contacts: { name: '  Maria   da Silva ', email: 'Maria@Example.test', whatsapp: '+5511987654321' },
    quiz: { slug: QUIZ_SLUG, title: 'Black Friday FPM 2.0 — Diagnóstico da aula' },
    utm: { utm_source: 'meta', utm_campaign: 'bf-quiz', utm_term: 'x'.repeat(300) },
    ...overrides,
  };
}

function signedRequest(body, { timestamp = Math.floor(Date.now() / 1000), signature, method = 'POST' } = {}) {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  const req = Readable.from([Buffer.from(raw)]);
  req.method = method;
  req.headers = {
    'content-type': 'application/json',
    'x-quizgeek-event-id': EVENT_ID,
    'x-quizgeek-timestamp': String(timestamp),
    'x-quizgeek-signature': signature ?? sign(raw, timestamp),
  };
  return req;
}

test('a signed lead from the Black Friday quiz is upserted into blackfriday_leads', async t => {
  withEnv(t);
  const writes = [];
  withFetch(t, async (url, options) => {
    writes.push({ url: String(url), options, body: JSON.parse(options.body) });
    return Response.json([{ id: 'lead-1' }], { status: 201 });
  });
  const res = response();
  await handler(signedRequest(payload()), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true, lead_created: true });
  assert.equal(writes.length, 1);
  assert.equal(writes[0].url, 'https://supabase.example.test/rest/v1/blackfriday_leads?on_conflict=email,campaign&select=id');
  assert.equal(writes[0].options.method, 'POST');
  assert.equal(writes[0].options.headers.Prefer, 'resolution=ignore-duplicates,return=representation');
  assert.equal(writes[0].options.headers.Authorization, 'Bearer test-only-server-key');
  assert.deepEqual(writes[0].body, {
    request_id: EVENT_ID,
    campaign: 'blackfriday-2026',
    full_name: 'Maria da Silva',
    email: 'maria@example.test',
    whatsapp: '11987654321',
    consent: true,
    consent_version: 'quizgeek-2026-11-13-v1',
    consented_at: '2026-11-13T18:00:00.000Z',
    utm: { utm_source: 'meta', utm_campaign: 'bf-quiz', utm_term: 'x'.repeat(250) },
    source: 'quizgeek',
  });
});

test('a duplicate lead is acknowledged with 200 so Quiz Geek does not retry', async t => {
  withEnv(t);
  withFetch(t, async () => Response.json([], { status: 200 }));
  const res = response();
  await handler(signedRequest(payload()), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true, lead_created: false });
});

test('other quizzes, missing quiz and other events are acknowledged and not stored', async t => {
  withEnv(t);
  let writes = 0;
  withFetch(t, async () => { writes++; return new Response(null, { status: 201 }); });
  for (const body of [
    payload({ quiz: { slug: 'outro-quiz', title: 'Outro' } }),
    payload({ quiz: null }),
    payload({ event: 'quiz_started' }),
  ]) {
    const res = response();
    await handler(signedRequest(body), res);
    assert.equal(res.statusCode, 202);
    assert.equal(res.body.ignored, true);
  }
  assert.equal(writes, 0);
});

test('a wrong signature, a stale timestamp or a tampered body is rejected without storing', async t => {
  withEnv(t);
  let writes = 0;
  withFetch(t, async () => { writes++; return new Response(null, { status: 201 }); });
  const now = Math.floor(Date.now() / 1000);
  const raw = JSON.stringify(payload());
  const cases = [
    signedRequest(raw, { signature: sign(raw, now, 'another-secret-with-32-characters-xx') }),
    signedRequest(raw, { timestamp: now - 301, signature: sign(raw, now - 301) }),
    signedRequest(raw.replace('Maria', 'Mario'), { signature: sign(raw, now), timestamp: now }),
    signedRequest(raw, { signature: 'v1=' }),
    signedRequest(raw, { signature: 'sha256=abc' }),
  ];
  for (const req of cases) {
    const res = response();
    await handler(req, res);
    assert.equal(res.statusCode, 401);
  }
  assert.equal(writes, 0);
});

test('only POST is accepted and a missing secret makes Quiz Geek retry later', async t => {
  withEnv(t, { QUIZGEEK_WEBHOOK_SECRET: undefined });
  withFetch(t, async () => { throw new Error('must not be called'); });
  const get = response();
  await handler(signedRequest(payload(), { method: 'GET' }), get);
  assert.equal(get.statusCode, 405);
  const res = response();
  await handler(signedRequest(payload()), res);
  assert.equal(res.statusCode, 503);
});

test('invalid contact data is rejected with 422 (no retry) and is not stored', async t => {
  withEnv(t);
  let writes = 0;
  withFetch(t, async () => { writes++; return new Response(null, { status: 201 }); });
  for (const contacts of [
    { name: 'Maria', email: 'maria@example.test', whatsapp: '+14155550123' },
    { name: 'Maria', email: 'not-an-email', whatsapp: '+5511987654321' },
    { name: 'M', email: 'maria@example.test', whatsapp: '+5511987654321' },
  ]) {
    const res = response();
    await handler(signedRequest(payload({ contacts })), res);
    assert.equal(res.statusCode, 422);
  }
  const badId = response();
  await handler(signedRequest(payload({ event_id: 'not-a-uuid' })), badId);
  assert.equal(badId.statusCode, 422);
  assert.equal(writes, 0);
});

test('a database failure returns 503 so Quiz Geek retries', async t => {
  withEnv(t);
  withFetch(t, async () => new Response('nope', { status: 500 }));
  const res = response();
  await handler(signedRequest(payload()), res);
  assert.equal(res.statusCode, 503);
});

test('the phone field is used when WhatsApp is absent', async t => {
  withEnv(t);
  const writes = [];
  withFetch(t, async (_url, options) => { writes.push(JSON.parse(options.body)); return Response.json([{ id: 'lead-1' }], { status: 201 }); });
  const res = response();
  await handler(signedRequest(payload({ contacts: { name: 'Maria', email: 'maria@example.test', phone: '+55 (21) 99876-5432' } })), res);
  assert.equal(res.statusCode, 200);
  assert.equal(writes[0].whatsapp, '21998765432');
});

test('normalizeWhatsapp keeps only Brazilian mobile numbers in the base format', () => {
  assert.equal(normalizeWhatsapp('+5511987654321'), '11987654321');
  assert.equal(normalizeWhatsapp('11987654321'), '11987654321');
  assert.equal(normalizeWhatsapp('+55 (11) 98765-4321'), '11987654321');
  assert.equal(normalizeWhatsapp('+551187654321'), null);
  assert.equal(normalizeWhatsapp('+14155550123'), null);
  assert.equal(normalizeWhatsapp(undefined), null);
});

test('verifyQuizGeekSignature matches the Quiz Geek v1 scheme', () => {
  const now = 1_800_000_000;
  const body = '{"a":1}';
  assert.equal(verifyQuizGeekSignature(body, String(now), sign(body, now), SECRET, now), true);
  assert.equal(verifyQuizGeekSignature(body, String(now), sign(body, now), SECRET, now + 300), true);
  assert.equal(verifyQuizGeekSignature(body, String(now), sign(body, now), SECRET, now + 301), false);
  assert.equal(verifyQuizGeekSignature(body, 'abc', sign(body, now), SECRET, now), false);
  assert.equal(verifyQuizGeekSignature(body, String(now), undefined, SECRET, now), false);
});
