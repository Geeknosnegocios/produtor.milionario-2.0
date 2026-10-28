export async function identifySavedLead(gpx, saved, hasConsent) {
  if (!gpx || !hasConsent() || saved?.measurement_consent !== true || !saved.event_id || !saved.identity) return false;
  await gpx.identify(saved.identity);
  if (!hasConsent()) return false;
  gpx.event('Lead', {}, null, { event_id: saved.event_id, event_time: saved.event_time || Math.floor(Date.now() / 1000), pixel_only: true });
  return true;
}
