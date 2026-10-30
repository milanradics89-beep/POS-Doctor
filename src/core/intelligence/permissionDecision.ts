export type PermissionDecision = 'granted' | 'request_again' | 'open_settings';

export function permissionDecision(granted: boolean, canAskAgain: boolean): PermissionDecision {
  if (granted) return 'granted';
  return canAskAgain ? 'request_again' : 'open_settings';
}
