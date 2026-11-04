import { describe, expect, it } from 'vitest';
import { parseSimctlLaunchPid } from './ios-simulator-launch.mjs';

describe('parseSimctlLaunchPid', () => {
  it('extracts the process ID from successful simctl launch output', () => {
    expect(parseSimctlLaunchPid('com.useit.app: 59448\\n', 'com.useit.app')).toBe('59448');
  });

  it('accepts surrounding whitespace without accepting extra output', () => {
    expect(parseSimctlLaunchPid('  com.useit.app: 42  ', 'com.useit.app')).toBe('42');
  });

  it('rejects output for a different bundle identifier', () => {
    expect(parseSimctlLaunchPid('com.other.app: 42', 'com.useit.app')).toBeNull();
  });

  it.each(['', 'com.useit.app:', 'com.useit.app: unknown', 'com.useit.app: 0'])(
    'rejects a missing or invalid process ID: %j',
    (output) => {
      expect(parseSimctlLaunchPid(output, 'com.useit.app')).toBeNull();
    },
  );

  it('rejects ambiguous multi-line output', () => {
    expect(parseSimctlLaunchPid('warning\\ncom.useit.app: 42', 'com.useit.app')).toBeNull();
  });
});
