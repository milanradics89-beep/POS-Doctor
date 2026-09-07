export async function fingerprintImage(dataUrl: string): Promise<string> {
  const comma = dataUrl.indexOf(',');
  if (comma < 0) throw new Error('Invalid image data URL.');
  const raw = dataUrl.slice(comma + 1);
  const bytes = Uint8Array.from(atob(raw), c => c.charCodeAt(0));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}
