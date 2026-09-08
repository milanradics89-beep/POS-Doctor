export type DeepLink = {
  originalUrl: string;
  resolvedUrl: string;
  provider: 'direct';
  isAffiliate: false;
};

export function resolveProductDeepLink(url: string): DeepLink {
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) throw new Error('Product URL must be HTTP(S).');
  return { originalUrl: trimmed, resolvedUrl: trimmed, provider: 'direct', isAffiliate: false };
}

export function withDeepLink(url: string): string {
  return resolveProductDeepLink(url).resolvedUrl;
}
