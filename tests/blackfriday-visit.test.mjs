import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/blackfriday-visit.ts';

const HOST = 'produtor.geekacademy.site';

function response() {
  return {
    headers: {}, statusCode: 0, body: undefined,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; },
  };
}

function withEnv(t) {
  const previous = { url: process.env.BLACKFRIDAY_SUPABASE_URL, key: process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY };
  process.env.BLACKFRIDAY_SUPABASE_URL = 'https://supabase.example.test';
  process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY = 'test-only-server-key';
  t.after(() => {
    if (previous.url === undefined) delete process.env.BLACKFRIDAY_SUPABASE_URL; else process.env.BLACKFRIDAY_SUPABASE_URL = previous.url;
    if (previous.key === undefined) delete process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY; else process.env.BLACKFRIDAY_SUPABASE_SECRET_KEY = previous.key;
  });
}

function withFetch(t, fn) {
  const prior = globalThis.fetch;
  globalThis.fetch = fn;
  t.after(() => { globalThis.fetch = prior; });
}

const request = (body, headers = {}) => ({ method: 'POST', headers: { host: HOST, origin: `https://${HOST}`, ...headers }, body });

test('a visit stores only the UTM values, trimmed and bounded', async t => {
  withEnv(t);
  const writes = [];
  withFetch(t, async (url, options) => { writes.push({ url: String(url), body: JSON.parse(options.body) }); return new Response(null, { status: 201 }); });
  const res = response();
  await handler(request({ utm: { utm_source: ' meta ', utm_content: 'M01-abas', utm_term: 'x'.repeat(300), ignored: 'no', utm_medium: 42 }, ip: '1.2.3.4' }), res);
  assert.equal(res.statusCode, 202);
  assert.equal(writes.length, 1);
  assert.match(writes[0].url, /\/rest\/v1\/blackfriday_page_views$/);
  assert.deepEqual(Object.keys(writes[0].body).sort(), ['utm_content', 'utm_source', 'utm_term']);
  assert.equal(writes[0].body.utm_source, 'meta');
  assert.equal(writes[0].body.utm_term.length, 100);
});

test('robots, foreign origins and other methods store nothing', async t => {
  withEnv(t);
  let writes = 0;
  withFetch(t, async () => { writes++; return new Response(null, { status: 201 }); });
  const bot = response();
  await handler(request({ utm: {} }, { 'user-agent': 'facebookexternalhit/1.1' }), bot);
  assert.equal(bot.statusCode, 202);
  const foreign = response();
  await handler({ method: 'POST', headers: { host: HOST, origin: 'https://evil.test' }, body: {} }, foreign);
  assert.equal(foreign.statusCode, 403);
  const get = response();
  await handler({ method: 'GET', headers: { host: HOST } }, get);
  assert.equal(get.statusCode, 405);
  assert.equal(writes, 0);
});

test('a database failure is reported without throwing', async t => {
  withEnv(t);
  withFetch(t, async () => { throw new Error('network'); });
  const res = response();
  await handler(request({ utm: {} }), res);
  assert.equal(res.statusCode, 502);
});
