import { isIP } from 'node:net';

const raw = process.env.EXPO_PUBLIC_USEIT_API_URL?.trim() ?? '';

function validateMobileApiConfig(value) {
  if (!value) {
    throw new Error('EXPO_PUBLIC_USEIT_API_URL is required for remote mobile builds. Configure the deployed HTTPS USEIT backend URL in Codemagic Environment Variables.');
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('EXPO_PUBLIC_USEIT_API_URL must be an absolute HTTPS URL.');
  }

  if (url.protocol !== 'https:') {
    throw new Error('EXPO_PUBLIC_USEIT_API_URL must use HTTPS for remote mobile builds.');
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new Error('EXPO_PUBLIC_USEIT_API_URL must not contain credentials, query parameters, or fragments.');
  }
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  const localSuffixes = ['.localhost', '.local', '.localdomain', '.internal', '.lan', '.home', '.home.arpa', '.intranet'];
  if (host === 'localhost' || localSuffixes.some((suffix) => host.endsWith(suffix)) || host === '0.0.0.0' || isIP(host)) {
    throw new Error('EXPO_PUBLIC_USEIT_API_URL must point to a deployed public hostname, not localhost or an IP address.');
  }

  return url.toString().replace(/\/$/, '');
}

async function verifyBackendReady(baseUrl, fetchImpl = fetch) {
  for (const path of ['/health', '/ready']) {
    let response;
    try {
      response = await fetchImpl(new URL(path.slice(1), `${baseUrl}/`), {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      throw new Error(`USEIT backend ${path} is unreachable from the mobile build environment.`);
    }

    if (!response.ok) {
      throw new Error(`USEIT backend ${path} returned HTTP ${response.status}; the deployment is not ready for mobile builds.`);
    }

    let payload;
    try {
      payload = await response.json();
    } catch {
      throw new Error(`USEIT backend ${path} returned invalid JSON.`);
    }

    const expectedStatus = path === '/health' ? 'ok' : 'ready';
    if (!payload || payload.status !== expectedStatus) {
      throw new Error(`USEIT backend ${path} did not report status "${expectedStatus}".`);
    }
  }
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  try {
    const apiUrl = validateMobileApiConfig(raw);
    await verifyBackendReady(apiUrl);
    process.stdout.write('Remote USEIT API configuration and backend readiness are valid.\\n');
  } catch (error) {
    process.stderr.write(`Mobile build configuration error: ${error.message}\\n`);
    process.exitCode = 1;
  }
}

export { validateMobileApiConfig, verifyBackendReady };
