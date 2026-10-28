import test from 'node:test';
import assert from 'node:assert/strict';
import { submitRegistration, boundedTracking } from '../public/bf-capture/registration-request.mjs';

test('retry preserves exactly the same registration payload after a network failure', async () => {
  const bodies = [];
  const payload = { requestId: 'same-request', accessToken: 'same-token' };
  const result = await submitRegistration(payload, async (_url, options) => {
    bodies.push(options.body);
    if (bodies.length === 1) throw new TypeError('network');
    return Response.json({ ok: true, next: '/blackfriday/obrigado/' });
  });
  assert.equal(result.ok, true);
  assert.equal(bodies.length, 2);
  assert.equal(bodies[0], bodies[1]);
});
test('temporary server and invalid JSON responses recover once', async () => {
  for (const first of [() => Response.json({ error: 'registration_unavailable' }, { status: 503 }), () => new Response('upstream error')]) {
    let calls = 0;
    await submitRegistration({}, async () => ++calls === 1 ? first() : Response.json({ ok: true }));
    assert.equal(calls, 2);
  }
});
test('validation failures show a usable message without automatic retry', async () => {
  let calls = 0;
  await assert.rejects(submitRegistration({}, async () => { calls++; return Response.json({ error: 'invalid_whatsapp' }, { status: 400 }); }), /WhatsApp com DDD/);
  assert.equal(calls, 1);
});
test('timeout aborts each attempt and returns control to the form', async () => {
  let calls = 0;
  await assert.rejects(submitRegistration({}, (_url, options) => new Promise((_resolve, reject) => { calls++; options.signal.addEventListener('abort', () => reject(new Error('aborted'))); }), 5), /dados continuam preenchidos/);
  assert.equal(calls, 2);
});
test('blocked or failing tracking never holds the registration redirect', async () => {
  await boundedTracking(() => new Promise(() => {}), 5);
  await boundedTracking(() => { throw new Error('ad blocker'); }, 5);
});
