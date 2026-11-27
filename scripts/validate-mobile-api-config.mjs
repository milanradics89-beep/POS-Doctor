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

function ipv6ToBigInt(address) {
  let source = address.toLowerCase().split('%')[0];

  if (source.includes('.')) {
    const lastColon = source.lastIndexOf(':');
    const ipv4 = source.slice(lastColon + 1);
    if (isIP(ipv4) !== 4) return null;
    const octets = ipv4.split('.').map(Number);
    const high = ((octets[0] << 8) | octets[1]).toString(16);
    const low = ((octets[2] << 8) | octets[3]).toString(16);
    source = source.slice(0, lastColon + 1) + high + ':' + low;
  }

  const halves = source.split('::');
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(':') : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  const missing = halves.length === 2 ? 8 - left.length - right.length : 0;
  if ((halves.length === 2 && missing < 1) || (halves.length === 1 && left.length !== 8)) return null;

  const groups = halves.length === 2
    ? [...left, ...Array(missing).fill('0'), ...right]
    : left;
  if (groups.length !== 8 || groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return null;

  return groups.reduce((value, group) => (value << 16n) | BigInt(parseInt(group, 16)), 0n);
}

function isPublicAddress(address) {
  const family = isIP(address);
  if (family === 4) {
    return !IPV4_NON_PUBLIC_RANGES.some(([network, prefix]) => isInIpv4Range(address, network, prefix));
  }
  if (family !== 6) return false;

  const value = ipv6ToBigInt(address);
  if (value === null) return false;

  // Only global-unicast space is eligible. This excludes unspecified,
  // loopback, IPv4-mapped, ULA, link-local and multicast addresses.
  const firstHextet = Number((value >> 112n) & 0xffffn);
  if (firstHextet < 0x2000 || firstHextet > 0x3fff) return false;

  const secondHextet = Number((value >> 96n) & 0xffffn);
  if (firstHextet === 0x2001 && secondHextet <= 0x01ff) return false; // IETF protocol assignments
  if (firstHextet === 0x2001 && secondHextet === 0x0db8) return false; // Documentation
  if (firstHextet === 0x2002) return false; // 6to4 transition space
  if (firstHextet === 0x3fff && secondHextet <= 0x0fff) return false; // Documentation

  return true;
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

function createPinnedLookup(expectedHostname, records) {
  return (requestedHostname, options, callback) => {
    const requested = String(requestedHostname).toLowerCase().replace(/\.$/, '');
    if (requested !== expectedHostname) {
      callback(new Error('Unexpected hostname requested by the HTTPS transport.'));
      return;
    }

    const candidates = options?.family
      ? records.filter((record) => record.family === options.family)
      : records;
    if (candidates.length === 0) {
      callback(new Error('No validated DNS address matches the requested address family.'));
      return;
    }

    if (options?.all) {
      callback(null, candidates);
      return;
    }

    callback(null, candidates[0].address, candidates[0].family);
  };
}

function requestJson(url, hostname, records, requestImpl = httpsRequest) {
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
    try {
      request = requestImpl(options, (response) => {
        const chunks = [];
        let totalBytes = 0;

        response.on('data', (chunk) => {
          const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
          totalBytes += buffer.length;
          if (totalBytes > MAX_RESPONSE_BYTES) {
            request.destroy(new Error('USEIT backend readiness response exceeded the size limit.'));
            return;
          }
          chunks.push(buffer);
        });
        response.on('error', reject);
        response.on('aborted', () => reject(new Error('USEIT backend readiness response was interrupted.')));
        response.on('end', () => resolve({
          statusCode: response.statusCode ?? 0,
          body: Buffer.concat(chunks).toString('utf8'),
        }));
      });
    } catch (error) {
      reject(error);
      return;
    }

    request.on('error', reject);
    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error('USEIT backend readiness request timed out.'));
    });
    request.end();
  });
}

async function verifyBackendReady(baseUrl, dependencies = {}) {
  const lookupImpl = dependencies.lookupImpl ?? lookup;
  const requestImpl = dependencies.requestImpl ?? httpsRequest;
  const validatedBase = validateMobileApiConfig(baseUrl);
  const base = validatedBase.endsWith('/') ? validatedBase : validatedBase + '/';
  const baseUrlObject = new URL(base);
  const hostname = baseUrlObject.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');

  // Resolve exactly once, reject the entire answer if any result is non-public,
  // then pin both anonymous HTTPS probes to this validated address set.
  const addresses = await resolvePublicAddresses(hostname, lookupImpl);

  for (const path of ['/health', '/ready']) {
    let response;
    try {
      response = await requestJson(new URL(path.slice(1), base), hostname, addresses, requestImpl);
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
