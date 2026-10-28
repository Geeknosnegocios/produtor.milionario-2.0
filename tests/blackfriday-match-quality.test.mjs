import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import * as producer from '../src/lib/blackfriday-metricageek.ts';

const hash = v => createHash('sha256').update(v).digest('hex');
const lead = { request_id: '123e4567-e89b-42d3-a456-426614174000', full_name: 'Ana Silva', email: ' ANA@EXAMPLE.TEST ', whatsapp: '(55) 99999-1234', measurement_consent: true, attribution: { sid: 'visitor-12345678', client_ip_address: '203.0.113.1', client_user_agent: 'TestBrowser/1', country: 'BR', st: 'SP', ct: 'São Paulo', zp: '01001-000' } };

test('Lead carries stable browser identity and normalized contact and location hashes', () => {
  assert.equal(typeof producer.buildBlackFridayIdentity, 'function');
  const identity = producer.buildBlackFridayIdentity(lead);
  assert.equal(identity.em_hash, hash('ana@example.test'));
  assert.equal(identity.ph_hash, hash('5555999991234'));
  assert.equal(identity.external_id_hash, hash('visitor-12345678'));
  assert.equal(identity.fn_hash, hash('ana'));
  assert.equal(identity.ln_hash, hash('silva'));
  assert.equal(identity.ct_hash, hash('saopaulo'));
  assert.equal(identity.zp_hash, hash('01001000'));
  assert.equal(identity.country_hash, hash('br'));
  assert.equal(identity.client_ip_address, '203.0.113.1');
  assert.equal(identity.client_user_agent, 'TestBrowser/1');
});

test('denial yields no identity and a single name never invents a surname', () => {
  assert.equal(typeof producer.buildBlackFridayIdentity, 'function');
  assert.deepEqual(producer.buildBlackFridayIdentity({ ...lead, measurement_consent: false }), {});
  const identity = producer.buildBlackFridayIdentity({ ...lead, full_name: 'Ana', attribution: {} });
  assert.equal(identity.ln_hash, undefined);
  assert.equal(identity.fbc, undefined);
  assert.equal(identity.client_ip_address, undefined);
  assert.equal(identity.external_id_hash, hash(lead.request_id));
});

test('request context uses bounded visitor headers and excludes a forged body IP', () => {
  assert.equal(typeof producer.captureTrackingContext, 'function');
  const context = producer.captureTrackingContext({ 'x-vercel-forwarded-for': '203.0.113.4', 'user-agent': 'Visitor/1', 'x-vercel-ip-country': 'BR', 'x-vercel-ip-city': 'S%C3%A3o%20Paulo' }, { sid: 'visitor-12345678', client_ip_address: '1.1.1.1', fbc: 'invented' });
  assert.equal(context.client_ip_address, '203.0.113.4');
  assert.equal(context.ct, 'São Paulo');
  assert.equal(context.fbc, null);
  assert.equal(context.sid, 'visitor-12345678');
});
