/**
 * Diagnostics Processor
 * Converts native Android API data into structured diagnostic report with scoring
 */

import type { DiagnosticsPayload, PermissionsInfo } from './PosDoctorDiagnostics';
import { formatBytes, formatRam } from './PosDoctorDiagnostics';

export type DiagnosticStatus = 'ok' | 'warning' | 'fault' | 'unknown';

export interface DiagnosticCategory {
  id: string;
  title: string;
  status: DiagnosticStatus;
  summary: string;
  data: Array<{ key: string; value: string }>;
  rawOutput: string;
}

export interface DiagnosticReport {
  timestamp: string;
  overallScore: number;
  overallStatus: DiagnosticStatus;
  deviceManufacturer: string;
  deviceModel: string;
  deviceSerial: string;
  androidVersion: string;
  categories: DiagnosticCategory[];
}

/**
 * Process native diagnostics payload into app diagnostic report
 */
export function processDiagnostics(payload: DiagnosticsPayload, permissionsInfo?: PermissionsInfo): DiagnosticReport {
  const categories: DiagnosticCategory[] = [
    processBattery(payload),
    processWifi(payload),
    processTelephony(payload),
    processNfc(payload),
    processDeviceInfo(payload),
    processMemoryStorage(payload),
    processDisplay(payload),
    processSensors(payload),
    processPower(payload),
  ];

  // Add permissions card if info is provided
  if (permissionsInfo) {
    categories.unshift(processPermissions(permissionsInfo));
  }

  // Compute overall score
  const scores = categories.map((c) => categoryScore(c.status));
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const overallStatus = scoreToStatus(overallScore);

  return {
    timestamp: new Date().toISOString(),
    overallScore,
    overallStatus,
    deviceManufacturer: payload.device.manufacturer,
    deviceModel: payload.device.model,
    deviceSerial: payload.device.serial,
    androidVersion: payload.device.androidVersion,
    categories,
  };
}

function processPermissions(info: PermissionsInfo): DiagnosticCategory {
  let status: DiagnosticStatus = 'ok';
  
  // If either permission is denied, mark as warning (not critical but limits functionality)
  if (info.location === 'denied' || info.phoneState === 'denied') {
    status = 'warning';
  }

  const deniedCount = [info.location, info.phoneState].filter(p => p === 'denied').length;
  const summary = deniedCount === 0 
    ? 'All permissions granted' 
    : `${deniedCount} permission${deniedCount > 1 ? 's' : ''} denied`;

  const data = [
    { 
      key: 'Location Permission', 
      value: info.location === 'granted' ? '✓ Granted' : '✗ Denied'
    },
    { 
      key: 'Phone State Permission', 
      value: info.phoneState === 'granted' ? '✓ Granted' : '✗ Denied'
    },
    { key: '', value: '' }, // Spacer
    { key: 'SIM Card', value: info.simPresent ? 'Present' : 'Not Present' },
    { key: 'Network', value: info.networkAvailable ? 'Available' : 'Unavailable' },
  ];

  if (info.location === 'denied') {
    data.push({ key: 'Note', value: 'Location permission required for WiFi details (SSID, BSSID)' });
  }
  if (info.phoneState === 'denied') {
    data.push({ key: 'Note', value: 'Phone state permission required for telephony details' });
  }

  return {
    id: 'permissions',
    title: 'Permissions & Access',
    status,
    summary,
    data: data.filter(d => d.key !== '' || d.value !== ''), // Remove empty spacers if no notes
    rawOutput: JSON.stringify(info, null, 2),
  };
}

function processBattery(payload: DiagnosticsPayload): DiagnosticCategory {
  const { battery } = payload;
  
  let status: DiagnosticStatus = 'ok';
  if (battery.level < 15) status = 'fault';
  else if (battery.level < 30) status = 'warning';
  if (battery.health !== 'Good') status = 'warning';
  if (battery.health === 'Dead' || battery.health === 'Overheat') status = 'fault';
  
  const summary = `Level: ${battery.level}%, Health: ${battery.health}, Status: ${battery.status}`;

  const data = [
    { key: 'Level', value: `${battery.level}%` },
    { key: 'Status', value: battery.status },
    { key: 'Health', value: battery.health },
    { key: 'Temperature', value: `${battery.temperature.toFixed(1)}°C` },
    { key: 'Voltage', value: `${battery.voltage} mV` },
    { key: 'Technology', value: battery.technology },
  ];

  if (battery.chargeCounter != null) {
    data.push({ key: 'Charge Counter', value: `${battery.chargeCounter} µAh` });
  }
  if (battery.cycleCount != null && battery.cycleCount > 0) {
    data.push({ key: 'Cycle Count', value: `${battery.cycleCount}` });
  }

  return {
    id: 'battery',
    title: 'Battery',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(battery, null, 2),
  };
}

function processWifi(payload: DiagnosticsPayload): DiagnosticCategory {
  const { wifi } = payload;
  
  let status: DiagnosticStatus = 'ok';
  if (wifi.restricted) {
    status = 'warning';
  } else if (wifi.rssi < -80) {
    status = 'fault';
  } else if (wifi.rssi < -70) {
    status = 'warning';
  }

  const summary = wifi.restricted
    ? 'Limited info (requires location permission)'
    : `${wifi.ssid}, Signal: ${wifi.rssi} dBm`;

  const data = [
    { key: 'SSID', value: wifi.ssid },
    { key: 'BSSID', value: wifi.bssid || 'N/A' },
    { key: 'Signal (RSSI)', value: `${wifi.rssi} dBm` },
    { key: 'Link Speed', value: `${wifi.linkSpeed} Mbps` },
    { key: 'Frequency', value: `${wifi.frequency} MHz` },
    { key: 'IP Address', value: wifi.ipAddress || 'N/A' },
  ];

  if (wifi.restricted) {
    data.push({ key: 'Note', value: 'Grant location permission for full details' });
  }

  return {
    id: 'wifi',
    title: 'WiFi',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(wifi, null, 2),
  };
}

function processTelephony(payload: DiagnosticsPayload): DiagnosticCategory {
  const { telephony, features } = payload;

  if (!features.telephony) {
    return {
      id: 'telephony',
      title: 'Mobile Network',
      status: 'unknown',
      summary: 'Not supported on this device',
      data: [{ key: 'Status', value: 'Feature not available' }],
      rawOutput: 'N/A',
    };
  }

  let status: DiagnosticStatus = 'ok';
  if (telephony.simState !== 'Ready') status = 'warning';
  if (telephony.dataState === 'Disconnected') status = 'warning';

  const summary = telephony.restricted
    ? 'Limited info (requires phone permission)'
    : `${telephony.operator}, ${telephony.networkType}, ${telephony.simState}`;

  const data = [
    { key: 'Operator', value: telephony.operator },
    { key: 'SIM State', value: telephony.simState },
    { key: 'Network Type', value: telephony.networkType },
    { key: 'Data State', value: telephony.dataState },
    { key: 'Roaming', value: telephony.isRoaming ? 'Yes' : 'No' },
  ];

  if (telephony.signalStrength != null) {
    data.push({ key: 'Signal Strength', value: `${telephony.signalStrength} dBm` });
  }

  return {
    id: 'telephony',
    title: 'Mobile Network',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(telephony, null, 2),
  };
}

function processNfc(payload: DiagnosticsPayload): DiagnosticCategory {
  const { nfc } = payload;

  let status: DiagnosticStatus = 'ok';
  if (!nfc.present) {
    status = 'unknown';
  } else if (!nfc.enabled) {
    status = 'warning';
  }

  const summary = !nfc.present ? 'Not available' : nfc.enabled ? 'Enabled' : 'Disabled';

  const data = [
    { key: 'Present', value: nfc.present ? 'Yes' : 'No' },
    { key: 'Enabled', value: nfc.enabled ? 'Yes' : 'No' },
  ];

  return {
    id: 'nfc',
    title: 'NFC',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(nfc, null, 2),
  };
}

function processDeviceInfo(payload: DiagnosticsPayload): DiagnosticCategory {
  const { device } = payload;

  const status: DiagnosticStatus = 'ok';
  const summary = `${device.manufacturer} ${device.model}, Android ${device.androidVersion}`;

  const data = [
    { key: 'Manufacturer', value: device.manufacturer },
    { key: 'Model', value: device.model },
    { key: 'Brand', value: device.brand },
    { key: 'Device', value: device.device },
    { key: 'Serial', value: device.serial },
    { key: 'Android Version', value: device.androidVersion },
    { key: 'SDK Version', value: `${device.sdkVersion}` },
    { key: 'Hardware', value: device.hardware },
    { key: 'ABIs', value: device.abis.join(', ') },
  ];

  return {
    id: 'device',
    title: 'Device Info',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(device, null, 2),
  };
}

function processMemoryStorage(payload: DiagnosticsPayload): DiagnosticCategory {
  const { memory, storage } = payload;

  let status: DiagnosticStatus = 'ok';
  const memUsagePercent = ((memory.totalRam - memory.availableRam) / memory.totalRam) * 100;
  const storageUsagePercent = ((storage.totalSpace - storage.availableSpace) / storage.totalSpace) * 100;

  if (memory.lowMemory || memUsagePercent > 90 || storageUsagePercent > 90) {
    status = 'fault';
  } else if (memUsagePercent > 80 || storageUsagePercent > 80) {
    status = 'warning';
  }

  const summary = `RAM: ${formatRam(memory.availableRam)} / ${formatRam(memory.totalRam)}, Storage: ${formatBytes(storage.availableSpace)} / ${formatBytes(storage.totalSpace)}`;

  const data = [
    { key: 'Total RAM', value: formatRam(memory.totalRam) },
    { key: 'Available RAM', value: formatRam(memory.availableRam) },
    { key: 'Low Memory', value: memory.lowMemory ? 'Yes' : 'No' },
    { key: 'Total Storage', value: formatBytes(storage.totalSpace) },
    { key: 'Free Storage', value: formatBytes(storage.freeSpace) },
    { key: 'Available Storage', value: formatBytes(storage.availableSpace) },
  ];

  return {
    id: 'memory-storage',
    title: 'Memory & Storage',
    status,
    summary,
    data,
    rawOutput: JSON.stringify({ memory, storage }, null, 2),
  };
}

function processDisplay(payload: DiagnosticsPayload): DiagnosticCategory {
  const { display } = payload;

  const status: DiagnosticStatus = 'ok';
  const summary = `${display.width}x${display.height} @ ${display.densityDpi} DPI`;

  const data = [
    { key: 'Resolution', value: `${display.width} x ${display.height}` },
    { key: 'Density', value: `${display.density.toFixed(2)}` },
    { key: 'Density DPI', value: `${display.densityDpi}` },
  ];

  if (display.refreshRate != null) {
    data.push({ key: 'Refresh Rate', value: `${display.refreshRate.toFixed(1)} Hz` });
  }

  return {
    id: 'display',
    title: 'Display',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(display, null, 2),
  };
}

function processSensors(payload: DiagnosticsPayload): DiagnosticCategory {
  const { sensors } = payload;

  const status: DiagnosticStatus = 'ok';
  const summary = `${sensors.length} sensors detected`;

  const data = sensors.map((sensor) => ({
    key: sensor.type,
    value: `${sensor.name} (${sensor.vendor})`,
  }));

  return {
    id: 'sensors',
    title: 'Sensors',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(sensors, null, 2),
  };
}

function processPower(payload: DiagnosticsPayload): DiagnosticCategory {
  const { power } = payload;

  const status: DiagnosticStatus = 'ok';
  const summary = power.powerSaveMode ? 'Power Save Mode ON' : 'Normal';

  const data = [
    { key: 'Power Save Mode', value: power.powerSaveMode ? 'Yes' : 'No' },
    { key: 'Interactive', value: power.interactive ? 'Yes' : 'No' },
  ];

  return {
    id: 'power',
    title: 'Power Management',
    status,
    summary,
    data,
    rawOutput: JSON.stringify(power, null, 2),
  };
}

/**
 * Convert status to numeric score (0-100)
 */
function categoryScore(status: DiagnosticStatus): number {
  switch (status) {
    case 'ok':
      return 100;
    case 'warning':
      return 70;
    case 'fault':
      return 30;
    case 'unknown':
      return 80;
    default:
      return 50;
  }
}

/**
 * Convert numeric score to status
 */
function scoreToStatus(score: number): DiagnosticStatus {
  if (score >= 80) return 'ok';
  if (score >= 60) return 'warning';
  return 'fault';
}
