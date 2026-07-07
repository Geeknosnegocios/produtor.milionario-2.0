// Meta Pixel (client) + Conversions API (server, dedup) + GTM event tracking
// Pixel ID: 2072830730255789 (FPM2)
// GTM ID: GTM-N393KNX3
// Client dispara fbq com {eventID}. Server (/api/capi) recebe o mesmo event_id → Meta deduplica.

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

function getCookie(name: string): string | undefined {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : undefined;
  } catch {
    return undefined;
  }
}

function newEventId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch { /* noop */ }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function testEventCode(): string | undefined {
  try {
    return localStorage.getItem('fb_test_event_code') || undefined;
  } catch {
    return undefined;
  }
}

// Envia o mesmo evento server-side (CAPI) com event_id idêntico ao do pixel → dedup.
function sendServerEvent(event_name: string, custom_data: Record<string, unknown>, event_id: string) {
  try {
    const body = {
      event_name,
      event_id,
      event_source_url: typeof location !== 'undefined' ? location.href : undefined,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      custom_data,
      test_event_code: testEventCode(),
    };
    fetch('/api/capi', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => { /* silencioso: não bloqueia UX */ });
  } catch { /* noop */ }
}

// Dispara pixel (com eventID) + dataLayer + CAPI, compartilhando o mesmo event_id.
function fireEvent(event_name: string, data: Record<string, unknown>, dataLayerEvent: string) {
  const event_id = newEventId();
  safeCall(window.fbq, 'track', event_name, data, { eventID: event_id });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: dataLayerEvent, ...data });
  sendServerEvent(event_name, data, event_id);
}

export function trackInitiateCheckout(params: CheckoutEventParams) {
  const data = {
    value: params.value,
    currency: params.currency ?? 'BRL',
    content_name: params.content_name ?? 'Produtor Milionário 2.0',
    content_ids: params.content_ids ?? ['produtor-milionario-2'],
    content_type: 'product',
    source: params.source ?? 'unknown',
  };
  fireEvent('InitiateCheckout', data, 'initiate_checkout');
}

export function trackLead(source: string, value = 247) {
  const data = { value, currency: 'BRL', content_name: 'Produtor Milionário 2.0', source };
  fireEvent('Lead', data, 'lead');
}

export function trackViewContent() {
  const data = {
    content_name: 'Produtor Milionário 2.0',
    content_ids: ['produtor-milionario-2'],
    content_type: 'product',
    value: 247,
    currency: 'BRL',
  };
  fireEvent('ViewContent', data, 'view_content');
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
