/**
 * Diagnostic history storage
 * Stores diagnostic sessions per terminal serial number using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY_PREFIX = '@pos_doctor:history:';
const DEVICE_LIST_KEY = '@pos_doctor:known_devices';
const MAX_HISTORY_PER_DEVICE = 20;

// DiagnosticReport type - matches the shape from DiagnosticsScreen
export interface DiagnosticCategory {
  id: string;
  title: string;
  status: 'ok' | 'warning' | 'fault' | 'unknown';
  summary: string;
  data: Array<{ key: string; value: string }>;
  rawOutput: string;
}

export interface DiagnosticReport {
  timestamp: string;
  overallScore: number;
  overallStatus: 'ok' | 'warning' | 'fault';
  deviceManufacturer: string;
  deviceModel: string;
  deviceSerial: string;
  androidVersion: string;
  categories: DiagnosticCategory[];
}

export interface DiscoveredDevice {
  ip: string;
  port: number;
  manufacturer: string;
  model: string;
  serial: string;
  lastSeen: string;
  lastStatus?: 'ok' | 'warning' | 'fault' | 'unknown';
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  report: DiagnosticReport;
}

function deviceKey(serial: string) {
  return `${HISTORY_KEY_PREFIX}${serial.replace(/[^a-zA-Z0-9]/g, '_')}`;
}

export async function saveHistoryEntry(
  serial: string,
  report: DiagnosticReport
): Promise<void> {
  try {
    const key = deviceKey(serial);
    const existing = await loadHistory(serial);

    const entry: HistoryEntry = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: report.timestamp,
      report,
    };

    const updated = [entry, ...existing].slice(0, MAX_HISTORY_PER_DEVICE);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save history:', e);
  }
}

export async function loadHistory(serial: string): Promise<HistoryEntry[]> {
  try {
    const key = deviceKey(serial);
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch (_e) {
    return [];
  }
}

export async function clearHistory(serial: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(deviceKey(serial));
  } catch (_e) {}
}

// Device list for known/recent devices
export async function saveKnownDevice(device: DiscoveredDevice): Promise<void> {
  try {
    const devices = await loadKnownDevices();
    const existing = devices.findIndex((d) => d.serial === device.serial || d.ip === device.ip);
    if (existing >= 0) {
      devices[existing] = { ...devices[existing], ...device };
    } else {
      devices.unshift(device);
    }
    // Keep last 50 known devices
    await AsyncStorage.setItem(DEVICE_LIST_KEY, JSON.stringify(devices.slice(0, 50)));
  } catch (_e) {}
}

export async function loadKnownDevices(): Promise<DiscoveredDevice[]> {
  try {
    const raw = await AsyncStorage.getItem(DEVICE_LIST_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DiscoveredDevice[];
  } catch (_e) {
    return [];
  }
}
