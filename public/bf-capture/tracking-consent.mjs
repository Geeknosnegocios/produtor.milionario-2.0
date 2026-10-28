function isExternalConsentConfig(config) {
  if (!config || config.configured !== true || config.consent_required !== true || typeof config.script_url !== 'string') return false;
  try {
    const url = new URL(config.script_url);
    return url.protocol === 'https:' && url.searchParams.get('consent') === 'external';
  } catch {
    return false;
  }
}

export function createTrackingLoader({ hasConsent, fetchConfig, appendScript }) {
  let pending = null;
  return async function ensureTrackingLoaded() {
    if (!hasConsent()) return false;
    if (pending) return pending;
    const attempt = (async () => {
      const config = await fetchConfig();
      if (!hasConsent() || !isExternalConsentConfig(config)) return false;
      if (await appendScript(config.script_url) !== true) return false;
      return hasConsent();
    })().catch(() => false);
    pending = attempt;
    const result = await attempt;
    if (!result && pending === attempt) pending = null;
    return result;
  };
}
