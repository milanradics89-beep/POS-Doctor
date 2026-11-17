export type RequestToken = number;

export interface RequestGate {
  begin(): RequestToken;
  invalidate(): void;
  isCurrent(token: RequestToken): boolean;
}

/**
 * Prevents an older asynchronous operation from publishing state after a
 * newer request, photo replacement, reset, or screen unmount.
 */
export function createRequestGate(): RequestGate {
  let currentToken = 0;

  return {
    begin() {
      currentToken += 1;
      return currentToken;
    },
    invalidate() {
      currentToken += 1;
    },
    isCurrent(token) {
      return token === currentToken;
    },
  };
}
