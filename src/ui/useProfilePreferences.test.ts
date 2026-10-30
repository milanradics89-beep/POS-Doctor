import { describe, expect, it } from 'vitest';

import { DEFAULT_PROFILE_PREFERENCES, type ProfilePreferences, parsePreferences } from './profilePreferences';


describe('profile preferences storage contract', () => {
  it('uses conservative defaults for a new profile', () => {
    expect(DEFAULT_PROFILE_PREFERENCES).toEqual({
      personalizedIdeas: true,
      productSuggestions: true,
      saveHistory: false,
    });
  });

  it('parses only the three supported preference flags', () => {
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
