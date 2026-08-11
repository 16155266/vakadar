// Web Crypto (globalThis.crypto.subtle) works both in Node.js and in the
// Edge runtime that Next.js middleware runs in — unlike the Node `crypto`
// module, which the middleware runtime can't load.
export const GATE_COOKIE = 'vakadar_gate';

export async function gateTokenFor(password) {
  const data = new TextEncoder().encode(password || '');
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
