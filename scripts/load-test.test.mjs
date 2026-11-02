import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const scriptPath = fileURLToPath(new URL('./load-test.mjs', import.meta.url));

async function startServer(handler) {
  const server = createServer(handler);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Expected an IP server address.');
  return { server, origin: `http://127.0.0.1:${address.port}` };
}

async function stopServer(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}

function runLoadTest(overrides = {}) {
  const env = { PATH: process.env.PATH ?? '', ...overrides };
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', (chunk) => { stdout += chunk; });
    child.stderr.setEncoding('utf8').on('data', (chunk) => { stderr += chunk; });
    child.once('error', reject);
    child.once('close', (code, signal) => resolve({ code, signal, stdout, stderr }));
  });
}

function approvedStagingEnv(origin, overrides = {}) {
  return {
    USEIT_LOAD_BASE_URL: origin,
    USEIT_LOAD_TARGET_ENV: 'staging',
    USEIT_LOAD_APPROVED_ORIGIN: origin,
    USEIT_LOAD_REQUESTS: '1',
    USEIT_LOAD_CONCURRENCY: '1',
    USEIT_LOAD_TIMEOUT_MS: '5000',
    ...overrides,
  };
}

describe('load-test safety guards', () => {
  it('requires an explicit environment and approved origin before a GET', async () => {
    const result = await runLoadTest({
      USEIT_LOAD_BASE_URL: 'http://127.0.0.1:1',
    });

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('USEIT_LOAD_TARGET_ENV');
  });

  it('rejects an approved origin that does not match the configured API origin', async () => {
    const result = await runLoadTest(approvedStagingEnv('http://127.0.0.1:1', {
      USEIT_LOAD_APPROVED_ORIGIN: 'http://127.0.0.1:2',
    }));

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('must exactly match');
  });

  it('requires a separate explicit capacity approval for production', async () => {
    const result = await runLoadTest(approvedStagingEnv('https://production.example.test', {
      USEIT_LOAD_TARGET_ENV: 'production',
    }));

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('USEIT_LOAD_ALLOW_PRODUCTION=YES');
  });

  it('requires HTTPS for production even with explicit capacity approval', async () => {
    const result = await runLoadTest(approvedStagingEnv('http://127.0.0.1:1', {
      USEIT_LOAD_TARGET_ENV: 'production',
      USEIT_LOAD_ALLOW_PRODUCTION: 'YES',
    }));

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('require HTTPS');
  });

  it('keeps POST load tests behind their separate opt-in', async () => {
    const result = await runLoadTest(approvedStagingEnv('http://127.0.0.1:1', {
      USEIT_LOAD_METHOD: 'POST',
      USEIT_LOAD_BODY_JSON: '{"probe":true}',
    }));

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('USEIT_LOAD_TEST_ALLOW_POST=YES');
  });

  it('sends an explicitly approved staging GET to the configured origin', async () => {
    let requests = 0;
    const { server, origin } = await startServer((_request, response) => {
      requests += 1;
      response.writeHead(204);
      response.end();
    });

    try {
      const result = await runLoadTest(approvedStagingEnv(origin));
      expect(result.code).toBe(0);
      expect(requests).toBe(1);
      expect(JSON.parse(result.stdout)).toMatchObject({
        target: origin + '/health',
        environment: 'staging',
        method: 'GET',
        requests: 1,
        failures: 0,
      });
    } finally {
      await stopServer(server);
    }
  });

  it('does not follow redirects away from the approved origin', async () => {
    let redirectedRequests = 0;
    const destination = await startServer((_request, response) => {
      redirectedRequests += 1;
      response.writeHead(204);
      response.end();
    });
    const source = await startServer((_request, response) => {
      response.writeHead(302, { Location: destination.origin + '/unexpected' });
      response.end();
    });

    try {
      const result = await runLoadTest(approvedStagingEnv(source.origin));
      expect(result.code).toBe(1);
      expect(redirectedRequests).toBe(0);
      expect(JSON.parse(result.stdout).statusCounts).toEqual({ network_error: 1 });
    } finally {
      await stopServer(source.server);
      await stopServer(destination.server);
    }
  });
});
