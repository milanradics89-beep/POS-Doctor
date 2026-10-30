import { useCallback, useEffect, useState } from 'react';
import { createPreferencesStore } from './profilePreferencesStore';
import { getItem, setItem } from '../storage/deviceStorage';
import { DEFAULT_PROFILE_PREFERENCES, PREFERENCES_KEY, type ProfilePreferences } from './profilePreferences';

const preferencesStore = createPreferencesStore({ getItem, setItem }, PREFERENCES_KEY);


export function useProfilePreferences() {
  const [preferences, setPreferences] = useState<ProfilePreferences>(DEFAULT_PROFILE_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    preferencesStore.read()
      .then((saved) => {
        if (!active) return;
        try {
          setPreferences(saved);
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
    preferencesStore.write(preferences)
      .then(() => { if (active) setError(null); })
      .catch(() => { if (active) setError('Preferences could not be saved on this device.'); });
    return () => { active = false; };
  }, [hydrated, preferences]);

  const updatePreference = useCallback((key: keyof ProfilePreferences, value: boolean) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  }, []);

  return { preferences, updatePreference, hydrated, error };
}
