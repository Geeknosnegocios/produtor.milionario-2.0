// Meta Pixel + GTM event tracking
// Pixel ID: 983187334220036 (GN)
// GTM ID: GTM-N393KNX3

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

type Currency = 'BRL';

interface CheckoutEventParams {
  value: number;
  currency?: Currency;
  content_name?: string;
  content_ids?: string[];
  source?: string; // hero | header | fixed-cta | exit-modal | cta-section | value-section
}

function safeCall(fn?: (...args: unknown[]) => void, ...args: unknown[]) {
  try {
    fn?.(...args);
  } catch (err) {
    console.warn('[tracking] error firing event', err);
  }
}

export function trackInitiateCheckout(params: CheckoutEventParams) {
  const data = {
    value: params.value,
    currency: params.currency ?? 'BRL',
    content_name: params.content_name ?? 'Produtor Milionário 2.0',
    content_ids: params.content_ids ?? ['produtor-milionario-2'],
    content_type: 'product',
  };
  safeCall(window.fbq, 'track', 'InitiateCheckout', data);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'initiate_checkout',
    cta_source: params.source ?? 'unknown',
    ...data,
  });
}

export function trackLead(source: string, value = 147) {
  const data = { value, currency: 'BRL', content_name: 'Produtor Milionário 2.0', source };
  safeCall(window.fbq, 'track', 'Lead', data);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'lead', ...data });
}

export function trackViewContent() {
  safeCall(window.fbq, 'track', 'ViewContent', {
    content_name: 'Produtor Milionário 2.0',
    content_ids: ['produtor-milionario-2'],
    content_type: 'product',
    value: 147,
    currency: 'BRL',
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'view_content', value: 147, currency: 'BRL' });
}

export function trackScrollDepth(percent: number) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'scroll_depth', percent });
}

export function trackCustomEvent(name: string, payload: Record<string, unknown> = {}) {
  safeCall(window.fbq, 'trackCustom', name, payload);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
}
