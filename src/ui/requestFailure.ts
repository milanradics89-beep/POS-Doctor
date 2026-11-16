export type RequestFailureKind = 'offline' | 'error';

export function requestFailureKind(error: unknown): RequestFailureKind {
  if (!(error instanceof TypeError)) return 'error';

  const message = error.message.toLowerCase();
  return /network request failed|failed to fetch|networkerror|network is unreachable|internet connection/.test(message)
    ? 'offline'
    : 'error';
}
