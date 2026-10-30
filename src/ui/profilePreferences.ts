export type ProfilePreferences = {
  personalizedIdeas: boolean;
  productSuggestions: boolean;
  saveHistory: boolean;
};

export const PREFERENCES_KEY = '@useit/profile-preferences/v1';
export const DEFAULT_PROFILE_PREFERENCES: ProfilePreferences = {
  personalizedIdeas: true,
  productSuggestions: true,
  saveHistory: false,
};

export function parsePreferences(raw: string | null): ProfilePreferences {
  if (!raw) return DEFAULT_PROFILE_PREFERENCES;
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return DEFAULT_PROFILE_PREFERENCES;
  const value = parsed as Partial<ProfilePreferences>;
  return {
    personalizedIdeas: typeof value.personalizedIdeas === 'boolean' ? value.personalizedIdeas : true,
    productSuggestions: typeof value.productSuggestions === 'boolean' ? value.productSuggestions : true,
    saveHistory: typeof value.saveHistory === 'boolean' ? value.saveHistory : false,
  };
}
