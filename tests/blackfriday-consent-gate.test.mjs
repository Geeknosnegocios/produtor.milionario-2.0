import test from 'node:test';
import assert from 'node:assert/strict';
import { createTrackingLoader } from '../public/bf-capture/tracking-consent.mjs';

test('does not fetch tracking configuration until measurement consent is granted', async () => {
  let consent = false;
  let fetches = 0;
  const load = createTrackingLoader({
    hasConsent: () => consent,
    fetchConfig: async () => { fetches += 1; return null; },
    appendScript: async () => {},
  });

  assert.equal(await load(), false);
  assert.equal(fetches, 0);
  consent = true;
  await load();
  assert.equal(fetches, 1);
});

test('requires external-consent configuration before loading the tracking script', async () => {
  let loaded = 0;
  const load = createTrackingLoader({
    hasConsent: () => true,
    fetchConfig: async () => ({ configured: true, consent_required: false, script_url: 'https://metricageek.vercel.app/p/demo.js' }),
    appendScript: async () => { loaded += 1; },
  });
  assert.equal(await load(), false);
  assert.equal(loaded, 0);
});

test('waits for opt-in again after a consent revocation during config fetch', async () => {
  let consent = true;
  let loaded = 0;
  const load = createTrackingLoader({
    hasConsent: () => consent,
    fetchConfig: async () => {
      consent = false;
      return { configured: true, consent_required: true, script_url: 'https://metricageek.vercel.app/p/demo.js?consent=external' };
    },
    appendScript: async () => { loaded += 1; },
  });
  assert.equal(await load(), false);
  assert.equal(loaded, 0);
});
