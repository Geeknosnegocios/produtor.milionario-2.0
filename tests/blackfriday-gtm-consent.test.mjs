import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createGtmLoader } from '../public/bf-capture/gtm-consent.mjs';

function fakeDom() {
  const appended = [];
  const doc = { createElement: () => ({}), head: { append: (el) => appended.push(el) } };
  return { win: {}, doc, appended };
}

test('GTM web is not loaded before measurement consent', () => {
  const { win, doc, appended } = fakeDom();
  let consent = false;
  const gtm = createGtmLoader({ hasConsent: () => consent, containerId: 'GTM-N393KNX3', ga4Id: 'G-7M9K48M7DF', win, doc });
  assert.equal(gtm.load(), false);
  assert.equal(appended.length, 0);
  assert.equal(win.dataLayer, undefined);
  consent = true;
  assert.equal(gtm.load(), true);
  assert.equal(appended[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-N393KNX3');
  assert.equal(win.dataLayer[0].event, 'gtm.js');
});

test('GTM loads once and revoking consent disables GA4 immediately', () => {
  const { win, doc, appended } = fakeDom();
  const gtm = createGtmLoader({ hasConsent: () => true, containerId: 'GTM-N393KNX3', ga4Id: 'G-7M9K48M7DF', win, doc });
  gtm.load();
  assert.equal(gtm.load(), false);
  assert.equal(appended.length, 1);
  gtm.revoke();
  assert.equal(win['ga-disable-G-7M9K48M7DF'], true);
});

test('form_start state is declared once and the measurement choice comes from the banner', () => {
  const site = readFileSync(new URL('../public/bf-capture/site.js', import.meta.url), 'utf8');
  const html = readFileSync(new URL('../public/bf-capture/index.html', import.meta.url), 'utf8');
  assert.equal((site.match(/let formStarted = false;/g) || []).length, 1);
  assert.ok(site.indexOf('let formStarted = false;') < site.indexOf('const applyChoice'));
  assert.doesNotMatch(site, /measurementBox/);
  assert.doesNotMatch(html, /measurement-consent/);
  assert.match(site, /let measurementAllowed = \(\) => readChoice\(\) === '1';/);
  assert.match(site, /if \(readChoice\(\) === null\) buildBanner\(\);/);
});

test('the banner decides measurement: refusing revokes the tracker and GTM, accepting loads them', () => {
  const site = readFileSync(new URL('../public/bf-capture/site.js', import.meta.url), 'utf8');
  assert.match(site, /writeChoice\(granted \? '1' : '0'\);/);
  assert.match(site, /if \(granted\) void trackingReady\(\);/);
  assert.match(site, /else \{ window\.gpx\?\.consent\(false\); gtm\.revoke\(\); \}/);
  assert.match(site, /const measurementConsent = measurementAllowed\(\);/);
});

test('the anonymous visit counter sends only the UTM values and only once per session', () => {
  const site = readFileSync(new URL('../public/bf-capture/site.js', import.meta.url), 'utf8');
  assert.match(site, /fetch\('\/api\/blackfriday-visit', \{ method: 'POST', headers: \{ 'Content-Type': 'application\/json' \}, body: JSON\.stringify\(\{ utm: campaign \}\)/);
  assert.match(site, /bf_visit_sent/);
});

test('the capture page wires GTM to the same consent as the tracking script', () => {
  const site = readFileSync(new URL('../public/bf-capture/site.js', import.meta.url), 'utf8');
  assert.match(site, /gtmId: 'GTM-N393KNX3', ga4Id: 'G-7M9K48M7DF'/);
  assert.match(site, /createGtmLoader\(\{ hasConsent: \(\) => measurementAllowed\(\)/);
  assert.ok(site.indexOf('gtm.load()') > site.indexOf('trackingReady = async'), 'GTM loads inside the consented tracking path');
  assert.match(site, /window\.gpx\?\.consent\(false\); gtm\.revoke\(\);/);
});
