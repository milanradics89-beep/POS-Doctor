/**
 * Diagnostic Commands and Parsers
 * All 10 diagnostic categories with ADB shell commands and output parsers
 */

import type { AdbClient } from './AdbClient';

export type DiagnosticStatus = 'ok' | 'warning' | 'fault' | 'unknown' | 'running';

export interface DiagnosticField {
  key: string;
  value: string;
  status?: DiagnosticStatus;
}

export interface DiagnosticCategory {
  id: string;
  title: { en: string; hu: string };
  status: DiagnosticStatus;
  fields: DiagnosticField[];
  rawOutput: string;
  summary: { en: string; hu: string };
  error?: string;
}

export interface DiagnosticReport {
  deviceSerial: string;
  deviceIp: string;
  deviceModel: string;
  deviceManufacturer: string;
  androidVersion: string;
  timestamp: string;
  overallScore: number;
  overallStatus: DiagnosticStatus;
  categories: DiagnosticCategory[];
}

// ─── Command definitions ────────────────────────────────────────────────────

const COMMANDS = {
  battery: 'dumpsys battery',
  nfc: 'dumpsys nfc',
  wifi: 'dumpsys wifi | head -60',
  telephony: 'dumpsys telephony.registry | head -80',
  meminfo: 'dumpsys meminfo | head -50',
  activity: 'dumpsys activity | grep -E "uptime|realtime|Uptime" | head -10',
  propManufacturer: 'getprop ro.product.manufacturer',
  propModel: 'getprop ro.product.model',
  propSerial: 'getprop ro.serialno',
  propAndroid: 'getprop ro.build.version.release',
  propFirmware: 'getprop ro.build.description',
  propBuildType: 'getprop ro.build.type',
  propSdk: 'getprop ro.build.version.sdk',
  // Card readers: check via service list and getprop
  cardServices: 'service list | grep -iE "msr|swipe|card|emv|chip|contactless|nfc" 2>/dev/null || echo "N/A"',
  cardProps: 'getprop | grep -iE "msr|emv|card|nfc" 2>/dev/null | head -20 || echo "N/A"',
  storage: 'df -h /data 2>/dev/null | tail -2',
  procUptime: 'cat /proc/uptime',
};

// ─── Parsers ────────────────────────────────────────────────────────────────

function parseBattery(raw: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  const get = (key: string) => raw.match(new RegExp(`${key}:\\s*(\\S+)`))?.[1] ?? 'N/A';
  const level = parseInt(get('level')) || 0;
  const tempRaw = parseInt(get('temperature')) || 0;
  const tempC = (tempRaw / 10).toFixed(1);
  const voltage = parseInt(get('voltage')) || 0;
  const statusCode = parseInt(get('status')) || 0;
  const healthCode = parseInt(get('health')) || 0;

  const statusMap: Record<number, string> = {
    1: 'Unknown', 2: 'Charging', 3: 'Discharging', 4: 'Not charging', 5: 'Full',
  };
  const healthMap: Record<number, { label: string; status: DiagnosticStatus }> = {
    1: { label: 'Unknown', status: 'unknown' },
    2: { label: 'Good', status: 'ok' },
    3: { label: 'Overheat', status: 'fault' },
    4: { label: 'Dead', status: 'fault' },
    5: { label: 'Over voltage', status: 'fault' },
    6: { label: 'Unspecified failure', status: 'fault' },
    7: { label: 'Cold', status: 'warning' },
  };

  const health = healthMap[healthCode] || { label: 'Unknown', status: 'unknown' as DiagnosticStatus };
  const statusLabel = statusMap[statusCode] || 'Unknown';
  const present = /present:\s*true/i.test(raw);
  const technology = raw.match(/technology:\s*(\S+)/)?.[1] ?? 'Unknown';

  let status: DiagnosticStatus = 'ok';
  if (level < 15 || health.status === 'fault') status = 'fault';
  else if (level < 40 || health.status === 'warning' || tempRaw > 450) status = 'warning';

  const enSummary = `Battery ${level}% · ${health.label} · ${tempC}°C`;
  const huSummary = `Akkumulátor ${level}% · ${health.label} · ${tempC}°C`;

  return {
    status,
    rawOutput: raw,
    summary: { en: enSummary, hu: huSummary },
    fields: [
      { key: 'Level', value: `${level}%`, status: level < 15 ? 'fault' : level < 40 ? 'warning' : 'ok' },
      { key: 'Status', value: statusLabel },
      { key: 'Health', value: health.label, status: health.status },
      { key: 'Temperature', value: `${tempC}°C`, status: tempRaw > 450 ? 'fault' : tempRaw > 380 ? 'warning' : 'ok' },
      { key: 'Voltage', value: voltage > 0 ? `${voltage} mV` : 'N/A' },
      { key: 'Present', value: present ? 'Yes' : 'No', status: present ? 'ok' : 'fault' },
      { key: 'Technology', value: technology },
    ],
  };
}

function parseNfc(raw: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  const stateMatch = raw.match(/mState=(\w+)/i) || raw.match(/State:\s*(\w+)/i);
  const state = stateMatch?.[1]?.toLowerCase() ?? 'unknown';
  const isEnabled = raw.match(/mIsNdefPushEnabled=(\w+)/)?.[1] ?? 'unknown';
  const hasNfc = raw.length > 20 && !raw.includes('not supported') && !raw.includes('N/A');

  let status: DiagnosticStatus = 'unknown';
  if (!hasNfc) status = 'fault';
  else if (state === 'on' || state === 'enabled') status = 'ok';
  else if (state === 'off' || state === 'disabled') status = 'warning';

  const stateLabel = state === 'on' ? 'On' : state === 'off' ? 'Off' : state;

  return {
    status,
    rawOutput: raw,
    summary: {
      en: hasNfc ? `NFC module ${stateLabel}` : 'NFC module not detected',
      hu: hasNfc ? `NFC modul ${stateLabel === 'On' ? 'bekapcsolva' : 'kikapcsolva'}` : 'NFC modul nem érzékelhető',
    },
    fields: [
      { key: 'Module', value: hasNfc ? 'Present' : 'Not found', status: hasNfc ? 'ok' : 'fault' },
      { key: 'State', value: stateLabel, status: status },
      { key: 'NDEF Push', value: isEnabled },
    ],
  };
}

function parseCardReader(cardServices: string, cardProps: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  const services = cardServices.toLowerCase();
  const props = cardProps.toLowerCase();
  const combined = services + '\n' + props;

  const hasMsr = /msr|magnetic|swipe|magstripe/.test(combined);
  const hasService = cardServices !== 'N/A' && cardServices.trim().length > 0;

  let status: DiagnosticStatus = 'unknown';
  let detail = 'Cannot determine via standard ADB';

  if (hasMsr) { status = 'ok'; detail = 'MSR services/properties detected'; }
  else if (hasService) { status = 'ok'; detail = 'Card services running'; }

  return {
    status,
    rawOutput: cardServices + '\n---\n' + cardProps,
    summary: {
      en: hasMsr ? 'MSR reader detected' : 'MSR status unknown (check vendor docs)',
      hu: hasMsr ? 'MSR olvasó érzékelhető' : 'MSR állapota ismeretlen',
    },
    fields: [
      { key: 'MSR Services', value: hasMsr ? 'Found' : 'Not found via ADB', status: hasMsr ? 'ok' : 'unknown' },
      { key: 'Card Services', value: hasService ? 'Running' : 'Not detected', status: hasService ? 'ok' : 'unknown' },
      { key: 'Note', value: 'Vendor-specific drivers may not appear in dumpsys' },
    ],
  };
}

function parseEmvChipReader(cardServices: string, cardProps: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  const combined = (cardServices + '\n' + cardProps).toLowerCase();
  const hasEmv = /emv|chip|icc|smartcard|smart_card/.test(combined);

  let status: DiagnosticStatus = 'unknown';

  if (hasEmv) status = 'ok';

  return {
    status,
    rawOutput: cardServices + '\n---\n' + cardProps,
    summary: {
      en: hasEmv ? 'EMV chip reader detected' : 'EMV status unknown (check vendor docs)',
      hu: hasEmv ? 'EMV chipolvasó érzékelhető' : 'EMV állapota ismeretlen',
    },
    fields: [
      { key: 'EMV Services', value: hasEmv ? 'Found' : 'Not found via ADB', status: hasEmv ? 'ok' : 'unknown' },
      { key: 'Note', value: 'Vendor EMV stack may use proprietary APIs' },
    ],
  };
}

function parseContactless(
  nfcRaw: string,
  cardProps: string
): Omit<DiagnosticCategory, 'id' | 'title'> {
  const combined = (nfcRaw + '\n' + cardProps).toLowerCase();
  const nfcState = nfcRaw.match(/mState=(\w+)/i)?.[1]?.toLowerCase() ?? 'unknown';
  const hasNfc = nfcRaw.length > 20 && !nfcRaw.includes('not supported');
  const hasContactless = /contactless|paywave|paypass|ctls|qpboc/.test(combined);
  const nfcOn = nfcState === 'on' || nfcState === 'enabled';

  let status: DiagnosticStatus = 'unknown';
  if (!hasNfc) status = 'fault';
  else if (nfcOn) status = 'ok';
  else status = 'warning';

  return {
    status,
    rawOutput: nfcRaw,
    summary: {
      en: nfcOn ? 'Contactless reader ready (NFC On)' : 'Contactless reader not ready (NFC Off)',
      hu: nfcOn ? 'Érintéses olvasó kész (NFC be)' : 'Érintéses olvasó nem kész (NFC ki)',
    },
    fields: [
      { key: 'NFC Module', value: hasNfc ? 'Present' : 'Not found', status: hasNfc ? 'ok' : 'fault' },
      { key: 'NFC State', value: nfcState, status: nfcOn ? 'ok' : 'warning' },
      { key: 'Contactless Detected', value: hasContactless ? 'Yes' : 'Not via ADB', status: hasContactless ? 'ok' : 'unknown' },
    ],
  };
}

function parseWifi(raw: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  const enabled = /Wi-Fi is enabled|mWifiEnabled=true|wifiEnabled=true/i.test(raw);
  const connected = /state: CONNECTED|CONNECTED\/CONNECTED/i.test(raw);
  const ssidMatch = raw.match(/extraInfo: "([^"]+)"|SSID: "([^"]+)"/i);
  const ssid = ssidMatch?.[1] || ssidMatch?.[2] || 'N/A';
  const rssiMatch = raw.match(/rssi: (-\d+)|RSSI: (-\d+)/i);
  const rssi = rssiMatch?.[1] || rssiMatch?.[2];
  const ipMatch = raw.match(/ipAddress: ([\d.]+)|address ([\d.]+)\//);
  const ip = ipMatch?.[1] || ipMatch?.[2] || 'N/A';

  let rssiStatus: DiagnosticStatus = 'unknown';
  if (rssi) {
    const r = parseInt(rssi);
    if (r >= -60) rssiStatus = 'ok';
    else if (r >= -75) rssiStatus = 'warning';
    else rssiStatus = 'fault';
  }

  let status: DiagnosticStatus = 'ok';
  if (!enabled) status = 'fault';
  else if (!connected) status = 'warning';
  else if (rssiStatus === 'fault') status = 'warning';

  return {
    status,
    rawOutput: raw,
    summary: {
      en: connected ? `Connected to "${ssid}"${rssi ? ` (${rssi} dBm)` : ''}` : enabled ? 'WiFi enabled but not connected' : 'WiFi disabled',
      hu: connected ? `Csatlakozva: "${ssid}"${rssi ? ` (${rssi} dBm)` : ''}` : enabled ? 'WiFi engedélyezve, de nem csatlakoztatva' : 'WiFi kikapcsolva',
    },
    fields: [
      { key: 'State', value: enabled ? 'Enabled' : 'Disabled', status: enabled ? 'ok' : 'fault' },
      { key: 'Connection', value: connected ? 'Connected' : 'Disconnected', status: connected ? 'ok' : 'warning' },
      { key: 'SSID', value: ssid },
      { key: 'Signal (RSSI)', value: rssi ? `${rssi} dBm` : 'N/A', status: rssiStatus },
      { key: 'IP Address', value: ip },
    ],
  };
}

function parseTelephony(raw: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  const operatorMatch = raw.match(/mNetworkOperatorName=([^,\n]+)/i) ||
    raw.match(/operator=([^,\n]+)/i);
  const operator = operatorMatch?.[1]?.trim() || 'N/A';
  const simStateMatch = raw.match(/mSimState=(\S+)/i);
  const simState = simStateMatch?.[1] || 'N/A';
  const signalMatch = raw.match(/mSignalStrength=\{([^}]+)\}/);
  const signalStr = signalMatch?.[1] || '';
  const dbmMatch = signalStr.match(/(-\d+) dBm/i);
  const dbm = dbmMatch?.[1] || null;
  const serviceMatch = raw.match(/mServiceState=\{([^}]+)\}/);
  const inService = serviceMatch ? /IN_SERVICE/i.test(serviceMatch[1]) : false;

  let status: DiagnosticStatus = 'unknown';
  const simReady = simState === '5' || simState.toLowerCase() === 'ready' || simState.toLowerCase() === 'loaded';
  if (simReady && inService) status = 'ok';
  else if (operator !== 'N/A') status = 'ok';
  else status = 'warning';

  return {
    status,
    rawOutput: raw,
    summary: {
      en: operator !== 'N/A' ? `${operator}${dbm ? ` · ${dbm} dBm` : ''}` : 'SIM not active or no service',
      hu: operator !== 'N/A' ? `${operator}${dbm ? ` · ${dbm} dBm` : ''}` : 'SIM inaktív vagy nincs szolgáltatás',
    },
    fields: [
      { key: 'Operator', value: operator },
      { key: 'SIM State', value: simState, status: simReady ? 'ok' : 'warning' },
      { key: 'In Service', value: inService ? 'Yes' : 'No', status: inService ? 'ok' : 'warning' },
      { key: 'Signal', value: dbm ? `${dbm} dBm` : 'N/A' },
    ],
  };
}

function parseDeviceInfo(props: Record<string, string>): Omit<DiagnosticCategory, 'id' | 'title'> {
  const manufacturer = props.manufacturer || 'Unknown';
  const model = props.model || 'Unknown';
  const serial = props.serial || 'Unknown';
  const android = props.android || 'Unknown';
  const firmware = props.firmware || 'Unknown';
  const buildType = props.buildType || 'Unknown';
  const sdk = props.sdk || 'Unknown';

  return {
    status: 'ok',
    rawOutput: Object.entries(props).map(([k, v]) => `${k}: ${v}`).join('\n'),
    summary: {
      en: `${manufacturer} ${model} · Android ${android}`,
      hu: `${manufacturer} ${model} · Android ${android}`,
    },
    fields: [
      { key: 'Manufacturer', value: manufacturer },
      { key: 'Model', value: model },
      { key: 'Serial', value: serial },
      { key: 'Android Version', value: android },
      { key: 'SDK Level', value: sdk },
      { key: 'Build Type', value: buildType },
      { key: 'Firmware', value: firmware },
    ],
  };
}

function parseMeminfo(memRaw: string, storageRaw: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  const totalRamMatch = memRaw.match(/Total RAM:\s+([\d,]+)k/i) ||
    memRaw.match(/Mem:\s+(\S+)/i);
  const freeRamMatch = memRaw.match(/Free RAM:\s+([\d,]+)k/i) ||
    memRaw.match(/MemFree:\s+(\d+)/i);

  const totalRam = totalRamMatch?.[1]?.replace(/,/g, '') || null;
  const freeRam = freeRamMatch?.[1]?.replace(/,/g, '') || null;

  let ramUsePct = null;
  if (totalRam && freeRam) {
    ramUsePct = Math.round((1 - parseInt(freeRam) / parseInt(totalRam)) * 100);
  }

  // Parse df output: Filesystem, Size, Used, Avail, Use%, Mount
  const dfLine = storageRaw.split('\n').find(l => l.includes('/data'));
  const dfParts = dfLine?.trim().split(/\s+/) || [];
  const storageTotal = dfParts[1] || 'N/A';
  const storageUsed = dfParts[2] || 'N/A';
  const storageAvail = dfParts[3] || 'N/A';
  const storagePct = dfParts[4] || 'N/A';
  const storagePctNum = parseInt(storagePct) || 0;

  let status: DiagnosticStatus = 'ok';
  if (ramUsePct !== null && ramUsePct > 90) status = 'fault';
  else if (ramUsePct !== null && ramUsePct > 75) status = 'warning';
  if (storagePctNum > 95) status = 'fault';
  else if (storagePctNum > 80 && status === 'ok') status = 'warning';

  const ramLabel = ramUsePct !== null ? `RAM ${ramUsePct}% used` : 'RAM usage unknown';
  const storageLabel = storagePctNum > 0 ? `Storage ${storagePct} used` : 'Storage unknown';

  return {
    status,
    rawOutput: memRaw + '\n--- df output ---\n' + storageRaw,
    summary: {
      en: `${ramLabel} · ${storageLabel}`,
      hu: `${ramLabel} · ${storageLabel}`,
    },
    fields: [
      { key: 'Total RAM', value: totalRam ? `${Math.round(parseInt(totalRam) / 1024)} MB` : 'N/A' },
      { key: 'Free RAM', value: freeRam ? `${Math.round(parseInt(freeRam) / 1024)} MB` : 'N/A' },
      { key: 'RAM Usage', value: ramUsePct !== null ? `${ramUsePct}%` : 'N/A', status: ramUsePct !== null ? (ramUsePct > 90 ? 'fault' : ramUsePct > 75 ? 'warning' : 'ok') : 'unknown' },
      { key: 'Storage Total', value: storageTotal },
      { key: 'Storage Used', value: storageUsed },
      { key: 'Storage Available', value: storageAvail },
      { key: 'Storage Use', value: storagePct, status: storagePctNum > 95 ? 'fault' : storagePctNum > 80 ? 'warning' : 'ok' },
    ],
  };
}

function parseUptime(uptimeRaw: string, activityRaw: string): Omit<DiagnosticCategory, 'id' | 'title'> {
  // /proc/uptime format: "seconds_since_boot idle_seconds"
  const parts = uptimeRaw.trim().split(' ');
  const totalSeconds = parseFloat(parts[0]) || 0;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const uptimeStr = days > 0
    ? `${days}d ${hours}h ${minutes}m`
    : hours > 0
    ? `${hours}h ${minutes}m`
    : `${minutes}m`;

  // Extract from dumpsys activity too
  const activityUptime = activityRaw.match(/uptime=([\d:]+|[\d]+ms)/i)?.[1] || null;

  let status: DiagnosticStatus = 'ok';
  // Very long uptime (>30 days) might warrant attention
  if (days > 30) status = 'warning';
  if (totalSeconds === 0) status = 'unknown';

  return {
    status,
    rawOutput: `proc uptime: ${uptimeRaw}\n--- activity ---\n${activityRaw}`,
    summary: {
      en: totalSeconds > 0 ? `Running for ${uptimeStr}` : 'Uptime unknown',
      hu: totalSeconds > 0 ? `Futási idő: ${uptimeStr}` : 'Futási idő ismeretlen',
    },
    fields: [
      { key: 'Uptime', value: uptimeStr || 'N/A', status: status },
      { key: 'Days', value: `${days}`, status: days > 30 ? 'warning' : 'ok' },
      { key: 'Hours', value: `${hours}` },
      { key: 'Minutes', value: `${minutes}` },
    ],
  };
}

// ─── Main runner ────────────────────────────────────────────────────────────

async function runCommand(
  client: AdbClient,
  cmd: string,
  timeout = 20000
): Promise<string> {
  try {
    const result = await client.executeShell(cmd, timeout);
    return result.trim() || 'N/A';
  } catch (e: any) {
    return `ERROR: ${e?.message || 'command failed'}`;
  }
}

export async function runFullDiagnostics(
  client: AdbClient,
  onCategoryUpdate?: (category: DiagnosticCategory) => void
): Promise<DiagnosticReport> {
  const timestamp = new Date().toISOString();

  const TITLES = {
    battery: { en: 'Battery', hu: 'Akkumulátor' },
    nfc: { en: 'NFC Module', hu: 'NFC Modul' },
    cardReader: { en: 'Card Reader (MSR)', hu: 'Kártyaolvasó (MSR)' },
    emv: { en: 'EMV Chip Reader', hu: 'EMV Chipolvasó' },
    contactless: { en: 'Contactless / NFC Payment', hu: 'Érintéses / NFC fizetés' },
    wifi: { en: 'WiFi', hu: 'WiFi' },
    mobile: { en: 'Mobile Network', hu: 'Mobilhálózat' },
    deviceInfo: { en: 'Device Info', hu: 'Eszközinformáció' },
    memory: { en: 'Memory & Storage', hu: 'Memória és tároló' },
    uptime: { en: 'System Uptime', hu: 'Rendszer futási idő' },
  };

  // Run all commands
  const [batteryRaw, nfcRaw, wifiRaw, telephonyRaw, meminfoRaw, activityRaw,
    manufacturer, model, serial, android, firmware, buildType, sdk,
    cardServices, cardProps, storageRaw, uptimeRaw] = await Promise.all([
    runCommand(client, COMMANDS.battery),
    runCommand(client, COMMANDS.nfc),
    runCommand(client, COMMANDS.wifi),
    runCommand(client, COMMANDS.telephony),
    runCommand(client, COMMANDS.meminfo),
    runCommand(client, COMMANDS.activity),
    runCommand(client, COMMANDS.propManufacturer),
    runCommand(client, COMMANDS.propModel),
    runCommand(client, COMMANDS.propSerial),
    runCommand(client, COMMANDS.propAndroid),
    runCommand(client, COMMANDS.propFirmware),
    runCommand(client, COMMANDS.propBuildType),
    runCommand(client, COMMANDS.propSdk),
    runCommand(client, COMMANDS.cardServices),
    runCommand(client, COMMANDS.cardProps),
    runCommand(client, COMMANDS.storage),
    runCommand(client, COMMANDS.procUptime),
  ]);

  // Build categories
  const categories: DiagnosticCategory[] = [
    { id: 'battery', title: TITLES.battery, ...parseBattery(batteryRaw) },
    { id: 'nfc', title: TITLES.nfc, ...parseNfc(nfcRaw) },
    { id: 'cardReader', title: TITLES.cardReader, ...parseCardReader(cardServices, cardProps) },
    { id: 'emv', title: TITLES.emv, ...parseEmvChipReader(cardServices, cardProps) },
    { id: 'contactless', title: TITLES.contactless, ...parseContactless(nfcRaw, cardProps) },
    { id: 'wifi', title: TITLES.wifi, ...parseWifi(wifiRaw) },
    { id: 'mobile', title: TITLES.mobile, ...parseTelephony(telephonyRaw) },
    {
      id: 'deviceInfo',
      title: TITLES.deviceInfo,
      ...parseDeviceInfo({ manufacturer, model, serial, android, firmware, buildType, sdk }),
    },
    { id: 'memory', title: TITLES.memory, ...parseMeminfo(meminfoRaw, storageRaw) },
    { id: 'uptime', title: TITLES.uptime, ...parseUptime(uptimeRaw, activityRaw) },
  ];

  categories.forEach((cat) => onCategoryUpdate?.(cat));

  // Calculate overall health score
  const weights: Record<DiagnosticStatus, number> = {
    ok: 10, warning: 5, fault: 0, unknown: 7, running: 7,
  };
  const totalWeight = categories.reduce((sum, c) => sum + weights[c.status], 0);
  const maxWeight = categories.length * 10;
  const overallScore = Math.round((totalWeight / maxWeight) * 100);

  const faultCount = categories.filter((c) => c.status === 'fault').length;
  const warnCount = categories.filter((c) => c.status === 'warning').length;
  const overallStatus: DiagnosticStatus =
    faultCount > 0 ? 'fault' : warnCount > 0 ? 'warning' : 'ok';

  return {
    deviceSerial: serial,
    deviceIp: '',
    deviceModel: model,
    deviceManufacturer: manufacturer,
    androidVersion: android,
    timestamp,
    overallScore,
    overallStatus,
    categories,
  };
}

/**
 * Quick device probe: get basic device info (manufacturer, model, serial)
 * Used during subnet scan to enrich discovered devices
 */
export async function probeDeviceInfo(
  client: AdbClient
): Promise<{ manufacturer: string; model: string; serial: string }> {
  const [manufacturer, model, serial] = await Promise.all([
    runCommand(client, 'getprop ro.product.manufacturer', 5000),
    runCommand(client, 'getprop ro.product.model', 5000),
    runCommand(client, 'getprop ro.serialno', 5000),
  ]);
  return {
    manufacturer: manufacturer.replace(/^ERROR.*/, 'Unknown'),
    model: model.replace(/^ERROR.*/, 'Unknown'),
    serial: serial.replace(/^ERROR.*/, 'Unknown'),
  };
}
