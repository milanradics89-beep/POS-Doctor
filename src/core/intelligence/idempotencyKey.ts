// This identifier is for request deduplication, not authentication or authorization.
// The server HMACs it before persistence; it never becomes a credential.
export function createIdempotencyKey(): string {
  const entropy = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 0x1_0000_0000).toString(36),
  ).join('-');
  return 'useit-' + Date.now().toString(36) + '-' + entropy;
}
