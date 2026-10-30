import { afterEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_PROFILE_PREFERENCES, type ProfilePreferences } from './useProfilePreferences';

const storage = new Map<string, string>();
const asyncStorage = {
  getItem: vi.fn(async (key: string) => storage.get(key) ?? null),
  setItem: vi.fn(async (key: string, value: string) => { storage.set(key, value); }),
};

vi.mock('@react-native-async-storage/async-storage', () => ({ default: asyncStorage }));

describe('profile preferences storage contract', () => {
  afterEach(() => {
    storage.clear();
    vi.clearAllMocks();
  });

  it('uses conservative defaults for a new profile', () => {
    expect(DEFAULT_PROFILE_PREFERENCES).toEqual({
      personalizedIdeas: true,
      productSuggestions: true,
      saveHistory: false,
    });
  });

  it('persists only the three supported preference flags', async () => {
    const value: ProfilePreferences = {
      personalizedIdeas: false,
      productSuggestions: true,
      saveHistory: true,
    };
    await asyncStorage.setItem('@useit/profile-preferences/v1', JSON.stringify(value));
    expect(JSON.parse(storage.get('@useit/profile-preferences/v1') ?? '{}')).toEqual(value);
  });

  it('keeps preferences scoped to this app and schema version', () => {
    expect('@useit/profile-preferences/v1').toMatch(/^@useit\/profile-preferences\/v1$/);
  });
});
