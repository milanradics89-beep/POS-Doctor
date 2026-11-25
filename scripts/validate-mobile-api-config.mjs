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
  if (host === 'localhost' || host.endsWith('.localhost') || host === '0.0.0.0' || isIP(host)) {
    throw new Error('EXPO_PUBLIC_USEIT_API_URL must point to a deployed public hostname, not localhost or an IP address.');
  }

  return url.toString().replace(/\/$/, '');
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  try {
    validateMobileApiConfig(raw);
    process.stdout.write('Remote mobile API configuration is valid.\n');
  } catch (error) {
    process.stderr.write(`Mobile build configuration error: ${error.message}\n`);
    process.exitCode = 1;
  }
}

export { validateMobileApiConfig };
