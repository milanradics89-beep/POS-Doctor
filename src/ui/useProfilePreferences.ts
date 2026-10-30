import { useCallback, useEffect, useState } from 'react';
import { getItem, setItem } from '../storage/deviceStorage';
import { DEFAULT_PROFILE_PREFERENCES, PREFERENCES_KEY, parsePreferences, type ProfilePreferences } from './profilePreferences';


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
