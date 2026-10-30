import { afterEach, describe, expect, it } from 'vitest';

import { DEFAULT_PROFILE_PREFERENCES, type ProfilePreferences } from './useProfilePreferences';

import { parsePreferences, PREFERENCES_KEY } from './profilePreferences';

describe('profile preferences storage contract', () => {
  afterEach(() => {

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
    expect(parsePreferences(JSON.stringify(value))).toEqual(value);
  });

  it('keeps preferences scoped to this app and schema version', () => {
    expect(PREFERENCES_KEY).toMatch(/^@useit\/profile-preferences\/v1$/);
  });
});
