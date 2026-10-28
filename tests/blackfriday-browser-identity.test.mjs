import test from 'node:test';
import assert from 'node:assert/strict';
import * as identity from '../public/bf-capture/tracking-identity.mjs';

test('confirmed authorized Lead identifies before emitting its deduplicated browser copy', async () => {
  const calls = [];
  const gpx = { sid: 'visitor-123', identify: async data => calls.push(['identify', data]), event: (...args) => calls.push(['event', ...args]) };
  const saved = { measurement_consent: true, event_id: 'event-12345678', identity: { em: ['a'.repeat(64)] } };
  assert.equal(await identity.identifySavedLead(gpx, saved, () => true), true);
  assert.equal(calls[0][0], 'identify');
  assert.equal(calls[1][1], 'Lead');
  assert.equal(calls[1][4].event_id, saved.event_id);
  assert.equal(calls[1][4].pixel_only, true);
});

test('denial or revocation while identify is pending prevents the Lead browser event', async () => {
  let granted = true, sent = 0;
  const gpx = { identify: async () => { granted = false; }, event: () => sent++ };
  const saved = { measurement_consent: true, event_id: 'event-12345678', identity: { em: ['a'.repeat(64)] } };
  assert.equal(await identity.identifySavedLead(gpx, saved, () => false), false);
  assert.equal(await identity.identifySavedLead(gpx, saved, () => granted), false);
  assert.equal(sent, 0);
});
