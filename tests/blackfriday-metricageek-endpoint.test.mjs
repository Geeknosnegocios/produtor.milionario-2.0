import test from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedMetricageekIngestUrl, isAllowedMetricageekScriptUrl } from '../src/lib/metricageek-endpoint.ts';

test('allows the Metricageek production campaign endpoint', () => {
  assert.equal(isAllowedMetricageekIngestUrl('https://metricageek.vercel.app/api/campaign-events/93b13cea-9087-4a34-a7e2-a4bf7966db0b'), true);
});

test('allows this Vercel team project preview endpoint', () => {
  assert.equal(isAllowedMetricageekIngestUrl('https://metricageek-b2uogwcv9-andreys-projects-5cafebdf.vercel.app/api/campaign-events/93b13cea-9087-4a34-a7e2-a4bf7966db0b'), true);
});

test('rejects lookalike hosts, cleartext URLs, query strings and untrusted routes', () => {
  const id = '93b13cea-9087-4a34-a7e2-a4bf7966db0b';
  assert.equal(isAllowedMetricageekIngestUrl(`https://metricageek.vercel.app.evil.test/api/campaign-events/${id}`), false);
  assert.equal(isAllowedMetricageekIngestUrl(`http://metricageek.vercel.app/api/campaign-events/${id}`), false);
  assert.equal(isAllowedMetricageekIngestUrl(`https://metricageek.vercel.app/api/campaign-events/${id}?next=https://evil.test`), false);
  assert.equal(isAllowedMetricageekIngestUrl(`https://metricageek.vercel.app/api/other/${id}`), false);
});

test('allows only the Metricageek tracker script on canonical and project preview hosts', () => {
  const slug = 'blackfriday-fpm2-2026';
  assert.equal(isAllowedMetricageekScriptUrl(`https://metricageek.vercel.app/p/${slug}.js?consent=external`), true);
  assert.equal(isAllowedMetricageekScriptUrl(`https://metricageek-b2uogwcv9-andreys-projects-5cafebdf.vercel.app/p/${slug}.js?consent=external`), true);
  assert.equal(isAllowedMetricageekScriptUrl(`https://metricageek.vercel.app/p/${slug}.js?next=https://evil.test`), false);
  assert.equal(isAllowedMetricageekScriptUrl(`https://metricageek.vercel.app/p/${slug}.js.evil`), false);
});
