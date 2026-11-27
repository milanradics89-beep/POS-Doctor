export function normalizeApiBaseUrl(value: string): string {
  const raw = value.trim().replace(/\/$/, '');
  if (!raw) throw new Error('USEIT API base URL is required.');

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('USEIT API base URL must be an absolute URL.');
  }

  const localHost = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '[::1]';
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && localHost)) {
    throw new Error('USEIT API must use HTTPS outside local development.');
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error('USEIT API base URL cannot contain credentials, query parameters or a fragment.');
  }

  return url.toString().replace(/\/$/, '');
}
