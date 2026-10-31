#!/usr/bin/env node

// Bounded, opt-in HTTP load probe for a non-production USEIT deployment.
// Never run against production without an explicit capacity-test approval.

const baseUrlValue = process.env.USEIT_LOAD_BASE_URL;
if (!baseUrlValue) throw new Error('Set USEIT_LOAD_BASE_URL to the staging API origin.');

const baseUrl = new URL(baseUrlValue);
if (!['http:', 'https:'].includes(baseUrl.protocol)) throw new Error('USEIT_LOAD_BASE_URL must use HTTP or HTTPS.');

const path = process.env.USEIT_LOAD_PATH ?? '/health';
const targetUrl = new URL(path, baseUrl);
if (targetUrl.origin !== baseUrl.origin) throw new Error('USEIT_LOAD_PATH must remain on the configured API origin.');

const method = (process.env.USEIT_LOAD_METHOD ?? 'GET').toUpperCase();
if (!['GET', 'POST'].includes(method)) throw new Error('Only GET and POST are supported.');

const requests = Number(process.env.USEIT_LOAD_REQUESTS ?? 50);
const concurrency = Number(process.env.USEIT_LOAD_CONCURRENCY ?? 5);
const timeoutMs = Number(process.env.USEIT_LOAD_TIMEOUT_MS ?? 30_000);
if (!Number.isInteger(requests) || requests < 1 || requests > 1_000) throw new Error('USEIT_LOAD_REQUESTS must be an integer from 1 to 1000.');
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 20) throw new Error('USEIT_LOAD_CONCURRENCY must be an integer from 1 to 20.');
if (!Number.isInteger(timeoutMs) || timeoutMs < 1_000 || timeoutMs > 120_000) throw new Error('USEIT_LOAD_TIMEOUT_MS must be an integer from 1000 to 120000.');

if (method === 'POST' && process.env.USEIT_LOAD_TEST_ALLOW_POST !== 'YES') {
  throw new Error('POST load tests require USEIT_LOAD_TEST_ALLOW_POST=YES. They may trigger billable or state-changing work.');
}

let body;
if (method === 'POST') {
  if (!process.env.USEIT_LOAD_BODY_JSON) throw new Error('POST load tests require USEIT_LOAD_BODY_JSON.');
  body = JSON.stringify(JSON.parse(process.env.USEIT_LOAD_BODY_JSON));
}

const headers = { Accept: 'application/json' };
if (body !== undefined) headers['Content-Type'] = 'application/json';
if (process.env.USEIT_LOAD_API_KEY) headers['X-API-Key'] = process.env.USEIT_LOAD_API_KEY;

const latencies = [];
const statusCounts = new Map();
let failures = 0;
let nextIndex = 0;

async function worker() {
  while (true) {
    const index = nextIndex++;
    if (index >= requests) return;

    const started = performance.now();
    try {
      const response = await fetch(targetUrl, {
        method,
        headers: { ...headers, 'X-Request-ID': `useit-load-${index + 1}` },
        ...(body !== undefined ? { body } : {}),
        signal: AbortSignal.timeout(timeoutMs),
      });
      latencies.push(performance.now() - started);
      statusCounts.set(response.status, (statusCounts.get(response.status) ?? 0) + 1);
      await response.body?.cancel();
      if (!response.ok) failures++;
    } catch {
      latencies.push(performance.now() - started);
      failures++;
      statusCounts.set('network_error', (statusCounts.get('network_error') ?? 0) + 1);
    }
  }
}

const wallStarted = performance.now();
await Promise.all(Array.from({ length: Math.min(concurrency, requests) }, () => worker()));
const wallMs = performance.now() - wallStarted;
latencies.sort((a, b) => a - b);

function percentile(values, percentileValue) {
  if (!values.length) return 0;
  return values[Math.min(values.length - 1, Math.ceil(percentileValue * values.length) - 1)];
}

const result = {
  target: targetUrl.origin + targetUrl.pathname,
  method,
  requests,
  concurrency: Math.min(concurrency, requests),
  durationMs: Math.round(wallMs),
  throughputPerSecond: Number((requests / (wallMs / 1000)).toFixed(2)),
  latencyMs: {
    p50: Math.round(percentile(latencies, 0.50)),
    p95: Math.round(percentile(latencies, 0.95)),
    max: Math.round(latencies.at(-1) ?? 0),
  },
  statusCounts: Object.fromEntries([...statusCounts.entries()].sort(([a], [b]) => String(a).localeCompare(String(b)))),
  failures,
};

console.log(JSON.stringify(result, null, 2));
if (failures > 0) process.exitCode = 1;
