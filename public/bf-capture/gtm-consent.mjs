// GTM web (GA4 via sGTM) only after the visitor accepts measurement; revoking stops GA4 at once.
export function createGtmLoader({ hasConsent, containerId, ga4Id, win = window, doc = document }) {
  let loaded = false;
  return {
    load() {
      if (loaded || !hasConsent()) return false;
      loaded = true;
      win[`ga-disable-${ga4Id}`] = false;
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      const script = doc.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
      doc.head.append(script);
      return true;
    },
    revoke() {
      win[`ga-disable-${ga4Id}`] = true;
    },
  };
}
