/**
 * Native Diagnostics Wrapper
 * Provides a clean TypeScript interface to the native Android diagnostics module
 */

import PosDoctorDiagnosticsModule, {
  type DiagnosticsPayload,
  type BatteryInfo,
  type WifiInfo,
  type TelephonyInfo,
  type NfcInfo,
  type DeviceInfo,
  type MemoryInfo,
  type StorageInfo,
  type DisplayInfo,
  type SensorInfo,
  type PowerInfo,
  type SystemFeatures,
  runDiagnostics as runNativeDiagnostics,
  requestPermissions as requestNativePermissions,
} from '../../modules/pos-doctor-diagnostics';

export type {
  DiagnosticsPayload,
  BatteryInfo,
  WifiInfo,
  TelephonyInfo,
  NfcInfo,
  DeviceInfo,
  MemoryInfo,
  StorageInfo,
  DisplayInfo,
  SensorInfo,
  PowerInfo,
  SystemFeatures,
};

export interface PermissionStatus {
  location: boolean;
  phoneState: boolean;
}

export interface PermissionsInfo {
  location: 'granted' | 'denied' | 'unknown';
  phoneState: 'granted' | 'denied' | 'unknown';
  simPresent: boolean;
  networkAvailable: boolean;
}

/**
 * Run comprehensive on-device diagnostics
 * @returns Full diagnostics payload with all system information
 */
export async function getDiagnostics(): Promise<DiagnosticsPayload> {
  try {
    const result = await runNativeDiagnostics();
    return result;
  } catch (error) {
    console.error('Failed to run diagnostics:', error);
    throw error;
  }
}

/**
 * Check current permission status
 * @returns Object with location and phoneState permission status
 */
export async function checkPermissions(): Promise<PermissionStatus> {
  try {
    return await PosDoctorDiagnosticsModule.checkPermissions();
  } catch (error) {
    console.warn('Failed to check permissions:', error);
    return { location: false, phoneState: false };
  }
}

/**
 * Get detailed permissions info including basic device state
 * @returns Object with permission status and basic SIM/network info
 */
export async function getPermissionsInfo(): Promise<PermissionsInfo> {
  try {
    return await PosDoctorDiagnosticsModule.getPermissionsInfo();
  } catch (error) {
    console.warn('Failed to get permissions info:', error);
    return {
      location: 'unknown',
      phoneState: 'unknown',
      simPresent: false,
      networkAvailable: false,
    };
  }
}

/**
 * Get a stable device identifier for history keying
 * Prefers Build.SERIAL, falls back to composite key
 */
export function getDeviceKey(deviceInfo: DeviceInfo): string {
  if (deviceInfo.serial && deviceInfo.serial !== '<Restricted>' && deviceInfo.serial !== 'unknown') {
    return deviceInfo.serial;
  }
  // Fallback: composite key from manufacturer, model, and fingerprint
  return `${deviceInfo.manufacturer}:${deviceInfo.model}:${deviceInfo.fingerprint}`.replace(/[^a-zA-Z0-9:]/g, '_');
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Format RAM to human-readable string
 */
export function formatRam(bytes: number): string {
  return formatBytes(bytes);
}
