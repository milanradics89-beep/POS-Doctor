import { useCallback, useEffect, useState } from 'react';
import { getItem, setItem } from '../storage/deviceStorage';

export type ProfilePreferences = {
  personalizedIdeas: boolean;
  productSuggestions: boolean;
  saveHistory: boolean;
};

export const DEFAULT_PROFILE_PREFERENCES: ProfilePreferences = {
  personalizedIdeas: true,
  productSuggestions: true,
  saveHistory: false,
};

const PREFERENCES_KEY = '@useit/profile-preferences/v1';

function parsePreferences(raw: string | null): ProfilePreferences {
  if (!raw) return DEFAULT_PROFILE_PREFERENCES;
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return DEFAULT_PROFILE_PREFERENCES;
  const value = parsed as Partial<ProfilePreferences>;
  return {
    personalizedIdeas: typeof value.personalizedIdeas === 'boolean' ? value.personalizedIdeas : DEFAULT_PROFILE_PREFERENCES.personalizedIdeas,
    productSuggestions: typeof value.productSuggestions === 'boolean' ? value.productSuggestions : DEFAULT_PROFILE_PREFERENCES.productSuggestions,
    saveHistory: typeof value.saveHistory === 'boolean' ? value.saveHistory : DEFAULT_PROFILE_PREFERENCES.saveHistory,
  };
}

export function useProfilePreferences() {
  const [preferences, setPreferences] = useState<ProfilePreferences>(DEFAULT_PROFILE_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getItem(PREFERENCES_KEY)
      .then((raw) => {
        if (!active) return;
        try {
          setPreferences(parsePreferences(raw));
        } catch {
          setError('Saved preferences could not be read. Default settings are shown.');
        }
      })
      .catch(() => {
        if (active) setError('Device storage is unavailable. Changes will remain temporary.');
      })
      .finally(() => {
        if (active) setHydrated(true);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    let active = true;
    setItem(PREFERENCES_KEY, JSON.stringify(preferences))
      .then(() => { if (active) setError(null); })
      .catch(() => { if (active) setError('Preferences could not be saved on this device.'); });
    return () => { active = false; };
  }, [hydrated, preferences]);

  const updatePreference = useCallback((key: keyof ProfilePreferences, value: boolean) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  }, []);

  return { preferences, updatePreference, hydrated, error };
}
