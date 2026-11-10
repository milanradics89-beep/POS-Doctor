const LOCAL_HOST_SUFFIXES = [
  '.localhost',
  '.local',
  '.localdomain',
  '.internal',
  '.lan',
  '.home',
  '.home.arpa',
  '.intranet',
];

function isIpLiteral(hostname: string): boolean {
  return hostname.includes(':')
    || hostname.startsWith('[')
    || hostname.endsWith(']')
    || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname);
}

function isDnsHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/\.$/, '');
  if (!normalized || normalized.length > 253) return false;
  if (normalized === 'localhost' || LOCAL_HOST_SUFFIXES.some(suffix => normalized.endsWith(suffix))) return false;
  if (isIpLiteral(normalized)) return false;

  const labels = normalized.split('.');
  if (labels.length < 2 || !/[a-z]/i.test(labels[labels.length - 1])) return false;
  return labels.every(label =>
    label.length > 0
    && label.length <= 63
    && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label),
  );
}

/**
 * Accept only absolute public HTTP(S) DNS URLs for links opened outside the app.
 * This is a client-side trust-boundary check, not a substitute for server-side validation.
 */
export function isSafeExternalHttpUrl(value: unknown): value is string {
  if (typeof value !== 'string' || value.length === 0 || value !== value.trim()) return false;
  if (/[\u0000-\u0020\u007f\\]/.test(value)) return false;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
  if (parsed.username || parsed.password || parsed.port) return false;
  return isDnsHostname(parsed.hostname);
}
