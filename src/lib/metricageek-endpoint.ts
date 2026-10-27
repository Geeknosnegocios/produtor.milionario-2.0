const METRICAGEEK_CANONICAL_HOST = 'metricageek.vercel.app';
const METRICAGEEK_VERCEL_TEAM_SUFFIX = '-andreys-projects-5cafebdf.vercel.app';
const SOURCE_ID = '[0-9a-f-]{36}';

export function isMetricageekHost(hostname: string): boolean {
  return hostname === METRICAGEEK_CANONICAL_HOST ||
    (hostname.startsWith('metricageek-') && hostname.endsWith(METRICAGEEK_VERCEL_TEAM_SUFFIX));
}

export function isAllowedMetricageekIngestUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && isMetricageekHost(url.hostname) && !url.search && !url.hash &&
      new RegExp(`^/api/campaign-events/${SOURCE_ID}$`, 'i').test(url.pathname);
  } catch {
    return false;
  }
}

export function isAllowedMetricageekScriptUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && isMetricageekHost(url.hostname) && !url.hash &&
      /^\/p\/[a-z0-9][a-z0-9_-]{0,79}\.js$/i.test(url.pathname) &&
      (!url.search || url.search === '?consent=external');
  } catch {
    return false;
  }
}
