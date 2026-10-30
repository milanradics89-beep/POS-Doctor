import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';

type StorageAdapter = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
};

const STORAGE_FILE = 'useit-preferences-v1.json';

async function readNativeValues(): Promise<Record<string, string>> {
  const directory = FileSystem.documentDirectory;
  if (!directory) throw new Error('Device document storage is unavailable.');
  const uri = directory + STORAGE_FILE;
  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) return {};
  const raw = await FileSystem.readAsStringAsync(uri);
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Saved device preferences are invalid.');
  }
  return Object.fromEntries(
    Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  );
}

async function writeNativeValues(values: Record<string, string>): Promise<void> {
  const directory = FileSystem.documentDirectory;
  if (!directory) throw new Error('Device document storage is unavailable.');
  await FileSystem.writeAsStringAsync(directory + STORAGE_FILE, JSON.stringify(values));
}

const nativeStorage: StorageAdapter = {
  async getItem(key) {
    const values = await readNativeValues();
    return values[key] ?? null;
  },
  async setItem(key, value) {
    const values = await readNativeValues();
    values[key] = value;
    await writeNativeValues(values);
  },
};

const webStorage: StorageAdapter = {
  async getItem(key) {
    if (typeof globalThis.localStorage === 'undefined') throw new Error('Browser storage is unavailable.');
    return globalThis.localStorage.getItem(key);
  },
  async setItem(key, value) {
    if (typeof globalThis.localStorage === 'undefined') throw new Error('Browser storage is unavailable.');
    globalThis.localStorage.setItem(key, value);
  },
};

const storage: StorageAdapter = Platform.OS === 'web' ? webStorage : nativeStorage;

export async function getItem(key: string): Promise<string | null> {
  return storage.getItem(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  await storage.setItem(key, value);
}
