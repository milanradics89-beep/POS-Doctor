import { requireNativeModule } from 'expo-modules-core';

export interface BatteryInfo {
  level: number;
  status: string;
  health: string;
  temperature: number;
  voltage: number;
  technology: string;
  chargeCounter?: number;
  cycleCount?: number;
}

export interface WifiInfo {
  ssid: string;
  bssid: string;
  rssi: number;
  linkSpeed: number;
  frequency: number;
  ipAddress: string;
  gateway?: string;
  dns?: string;
  restricted: boolean;
}

export interface TelephonyInfo {
  operator: string;
  simState: string;
  networkType: string;
  dataState: string;
  isRoaming: boolean;
  signalStrength?: number;
  restricted: boolean;
}

export interface NfcInfo {
  present: boolean;
  enabled: boolean;
}

export interface DeviceInfo {
  manufacturer: string;
  model: string;
  brand: string;
  device: string;
  product: string;
  fingerprint: string;
  hardware: string;
  serial: string;
  androidVersion: string;
  sdkVersion: number;
  abis: string[];
}

export interface MemoryInfo {
  totalRam: number;
  availableRam: number;
  lowMemory: boolean;
  threshold: number;
}

export interface StorageInfo {
  totalSpace: number;
  freeSpace: number;
  availableSpace: number;
}

export interface DisplayInfo {
  width: number;
  height: number;
  density: number;
  densityDpi: number;
  refreshRate?: number;
}

export interface SensorInfo {
  name: string;
  type: string;
  vendor: string;
}

export interface PowerInfo {
  powerSaveMode: boolean;
  interactive: boolean;
}

export interface SystemFeatures {
  nfc: boolean;
  telephony: boolean;
  camera: boolean;
  bluetooth: boolean;
  location: boolean;
  wifi: boolean;
}

export interface DiagnosticsPayload {
  battery: BatteryInfo;
  wifi: WifiInfo;
  telephony: TelephonyInfo;
  nfc: NfcInfo;
  device: DeviceInfo;
  memory: MemoryInfo;
  storage: StorageInfo;
  display: DisplayInfo;
  sensors: SensorInfo[];
  power: PowerInfo;
  features: SystemFeatures;
}

const PosDoctorDiagnostics = requireNativeModule('PosDoctorDiagnostics');

export default PosDoctorDiagnostics;

export async function runDiagnostics(): Promise<DiagnosticsPayload> {
  return await PosDoctorDiagnostics.runDiagnostics();
}

export async function checkPermissions(): Promise<{ location: boolean; phoneState: boolean }> {
  return await PosDoctorDiagnostics.checkPermissions();
}

export async function getPermissionsInfo(): Promise<{
  location: 'granted' | 'denied' | 'unknown';
  phoneState: 'granted' | 'denied' | 'unknown';
  simPresent: boolean;
  networkAvailable: boolean;
}> {
  return await PosDoctorDiagnostics.getPermissionsInfo();
}
