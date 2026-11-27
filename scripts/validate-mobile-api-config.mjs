import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { request as httpsRequest } from 'node:https';

const raw = process.env.EXPO_PUBLIC_USEIT_API_URL?.trim() ?? '';
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 32 * 1024;

const IPV4_NON_PUBLIC_RANGES = [
  [0x00000000n, 8],   // Current network
  [0x0a000000n, 8],   // Private
  [0x64400000n, 10],  // Carrier-grade NAT
  [0x7f000000n, 8],   // Loopback
  [0xa9fe0000n, 16],  // Link-local
  [0xac100000n, 12],  // Private
  [0xc0000000n, 24],  // IETF protocol assignments
  [0xc0000200n, 24],  // Documentation
  [0xc0586300n, 24],  // Deprecated 6to4 relay
  [0xc0a80000n, 16],  // Private
  [0xc6120000n, 15],  // Benchmarking
  [0xc6336400n, 24],  // Documentation
  [0xcb007100n, 24],  // Documentation
  [0xe0000000n, 4],   // Multicast
  [0xf0000000n, 4],   // Reserved and limited broadcast
];

function ipv4ToBigInt(address) {
  return address.split('.').reduce((value, octet) => (value << 8n) | BigInt(Number(octet)), 0n);
}

function isInIpv4Range(address, network, prefix) {
  const mask = ((1n << BigInt(prefix)) - 1n) << BigInt(32 - prefix);
  return (ipv4ToBigInt(address) & mask) === network;
}

function isPublicIpv6(address) {
  const [firstHextet, rawSecondHextet] = address.toLowerCase().split(':');
  if (!/^[23][0-9a-f]{3}$/.test(firstHextet)) return false;

  const secondHextet = rawSecondHextet || '0';
  const secondValue = Number.parseInt(secondHextet, 16);
  const isIetfProtocolRange = firstHextet === '2001' && secondValue <= 0x01ff;
  const isDocumentationRange = (firstHextet === '2001' && secondValue === 0x0db8)
    || (firstHextet === '3fff' && secondValue <= 0x0fff);
  const is6to4Range = firstHextet === '2002';

  return !isIetfProtocolRange && !isDocumentationRange && !is6to4Range;
}

function isPublicAddress(address) {
  const family = isIP(address);
  if (family === 4) {
    return !IPV4_NON_PUBLIC_RANGES.some(([network, prefix]) => isInIpv4Range(address, network, prefix));
  }
  return family === 6 && isPublicIpv6(address);
}

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

  // DNS absolute names may have a trailing dot; normalize it before applying
  // the local/reserved-host guard so localhost cannot bypass the check.
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
  const localSuffixes = [
    '.localhost', '.local', '.localdomain', '.internal', '.lan',
    '.home', '.home.arpa', '.intranet', '.test', '.invalid',
    '.example', '.onion', '.arpa',
  ];
  if (!host.includes('.') || host === 'localhost' || localSuffixes.some((suffix) => host.endsWith(suffix)) || host === '0.0.0.0' || isIP(host)) {
    throw new Error('EXPO_PUBLIC_USEIT_API_URL must point to a deployed public hostname, not localhost or an IP address.');
  }

  return url.toString().replace(/\/$/, '');
}

async function resolvePublicAddresses(hostname, lookupImpl = lookup) {
  let resolved;
  try {
    resolved = await lookupImpl(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error('USEIT backend hostname could not be resolved from the mobile build environment.');
  }

  if (!Array.isArray(resolved) || resolved.length === 0) {
    throw new Error('USEIT backend hostname did not resolve to a public IP address.');
  }

  const records = [];
  const seen = new Set();
  for (const record of resolved) {
    const family = record?.family || isIP(record?.address ?? '');
    if (!record?.address || !family || isIP(record.address) !== family || !isPublicAddress(record.address)) {
      throw new Error('USEIT backend hostname must resolve exclusively to public IPv4 or IPv6 addresses.');
    }
    const key = record.address + '/' + family;
    if (!seen.has(key)) {
      seen.add(key);
      records.push({ address: record.address, family });
    }
  }

  return records;
}

function getPinnedLookupResult(expectedHostname, records, requestedHostname, family) {
  const requested = String(requestedHostname).toLowerCase().replace(/\.$/, '');
  if (requested !== expectedHostname) {
    return { error: new Error('Unexpected hostname requested by the HTTPS transport.') };
  }

  const candidates = family ? records.filter((record) => record.family === family) : records;
  if (candidates.length === 0) {
    return { error: new Error('No validated DNS address matches the requested address family.') };
  }

  return { candidates };
}

function respondToPinnedLookup(result, options, callback) {
  if (result.error) {
    callback(result.error);
    return;
  }
  if (options?.all) {
    callback(null, result.candidates);
    return;
  }

  const [first] = result.candidates;
  callback(null, first.address, first.family);
}

function createPinnedLookup(expectedHostname, records) {
  return function pinnedLookup(requestedHostname, options, callback) {
    const result = getPinnedLookupResult(expectedHostname, records, requestedHostname, options?.family);
    respondToPinnedLookup(result, options, callback);
  };
}

function requestJson(url, hostname, records, requestImpl = httpsRequest, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const options = {
      protocol: 'https:',
      hostname,
      port: url.port ? Number(url.port) : 443,
      method: 'GET',
      path: url.pathname + url.search,
      headers: { Accept: 'application/json' },
      servername: hostname,
      lookup: createPinnedLookup(hostname, records),
    };

    let request;
    let settled = false;
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadline);
      if (error) reject(error);
      else resolve(value);
    };
    const deadline = setTimeout(() => {
      const error = new Error('USEIT backend readiness request exceeded its total time limit.');
      finish(error);
      request?.destroy(error);
    }, timeoutMs);

    try {
      request = requestImpl(options, (response) => {
        const chunks = [];
        let totalBytes = 0;

        response.on('data', (chunk) => {
          const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
          totalBytes += buffer.length;
          if (totalBytes > MAX_RESPONSE_BYTES) {
            const error = new Error('USEIT backend readiness response exceeded the size limit.');
            finish(error);
            request.destroy(error);
            return;
          }
          chunks.push(buffer);
        });
        response.on('error', (error) => finish(error));
        response.on('aborted', () => finish(new Error('USEIT backend readiness response was interrupted.')));
        response.on('end', () => finish(null, {
          statusCode: response.statusCode ?? 0,
          body: Buffer.concat(chunks).toString('utf8'),
        }));
      });
    } catch (error) {
      finish(error);
      return;
    }

    request.on('error', (error) => finish(error));
    request.setTimeout(timeoutMs, () => {
      const error = new Error('USEIT backend readiness request timed out.');
      finish(error);
      request.destroy(error);
    });
    request.end();
  });
}

async function verifyReadinessEndpoint(url, path, hostname, addresses, requestImpl, timeoutMs) {
  let response;
  try {
    response = await requestJson(url, hostname, addresses, requestImpl, timeoutMs);
  } catch {
    throw new Error('USEIT backend ' + path + ' is unreachable from the mobile build environment.');
  }

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error('USEIT backend ' + path + ' returned HTTP ' + response.statusCode + '; the deployment is not ready for mobile builds.');
  }

  let payload;
  try {
    payload = JSON.parse(response.body);
  } catch {
    throw new Error('USEIT backend ' + path + ' returned invalid JSON.');
  }

  const expectedStatus = path === '/health' ? 'ok' : 'ready';
  if (!payload || payload.status !== expectedStatus) {
    throw new Error('USEIT backend ' + path + ' did not report status "' + expectedStatus + '".');
  }
}

async function verifyBackendReady(baseUrl, dependencies = {}) {
  const lookupImpl = dependencies.lookupImpl ?? lookup;
  const requestImpl = dependencies.requestImpl ?? httpsRequest;
  const timeoutMs = dependencies.timeoutMs ?? REQUEST_TIMEOUT_MS;
  const validatedBase = validateMobileApiConfig(baseUrl);
  const base = validatedBase.endsWith('/') ? validatedBase : validatedBase + '/';
  const baseUrlObject = new URL(base);
  const hostname = baseUrlObject.hostname.toLowerCase().replace(/\.$/, '');

  // Resolve exactly once, reject the entire answer if any result is non-public,
  // then pin both anonymous HTTPS probes to this validated address set.
  const addresses = await resolvePublicAddresses(hostname, lookupImpl);

  for (const path of ['/health', '/ready']) {
    await verifyReadinessEndpoint(new URL(path.slice(1), base), path, hostname, addresses, requestImpl, timeoutMs);
  }
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  try {
    const apiUrl = validateMobileApiConfig(raw);
    await verifyBackendReady(apiUrl);
    process.stdout.write('Remote USEIT API configuration and backend readiness are valid.\n');
  } catch (error) {
    process.stderr.write('Mobile build configuration error: ' + error.message + '\n');
    process.exitCode = 1;
  }
}

export {
  isPublicAddress,
  resolvePublicAddresses,
  validateMobileApiConfig,
  verifyBackendReady,
};
