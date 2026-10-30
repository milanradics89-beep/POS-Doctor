import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { getItem, setItem } from '../storage/deviceStorage';
import { PREFERENCES_KEY, type ProfilePreferences } from './profilePreferences';
import { createProfilePreferencesController } from './profilePreferencesController';

const controller = createProfilePreferencesController({ getItem, setItem }, PREFERENCES_KEY);

export function useProfilePreferences() {
  const snapshot = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot,
  );

  useEffect(() => {
    void controller.hydrate();
  }, []);

  const updatePreference = useCallback(
    (key: keyof ProfilePreferences, value: boolean) => controller.updatePreference(key, value),
    [],
  );

  return {
    preferences: snapshot.preferences,
    updatePreference,
    hydrated: snapshot.hydrated,
    error: snapshot.error,
  };
}
