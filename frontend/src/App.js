import React, { useState, useEffect } from 'react';
import './App.css';

// Design tokens (matching React Native app)
const C = {
  bg: '#0B0D10',
  bgElevated: '#10141A',
  card: '#121823',
  card2: '#0F1520',
  border: '#243042',
  divider: '#1B2533',
  textPrimary: '#EAF0F7',
  textSecondary: '#B7C3D4',
  textMuted: '#7F8EA3',
  ok: '#22c55e',
  warning: '#f59e0b',
  fault: '#ef4444',
  scanning: '#3b82f6',
  okBg: 'rgba(34,197,94,0.14)',
  warningBg: 'rgba(245,158,11,0.16)',
  faultBg: 'rgba(239,68,68,0.16)',
  infoBg: 'rgba(59,130,246,0.14)',
};

// ---- Translations ----
const T = {
  en: {
    appName: 'POS Doctor',
    nav: { scan: 'Network Scan', diagnostics: 'Diagnostics', history: 'History', build: 'Build APK' },
    scan: {
      title: 'Network Scan',
      subtitle: 'Find ADB terminals on your WiFi network',
      subnet: 'Subnet',
      auto: 'Auto',
      scanBtn: 'Scan Network',
      manualBtn: '+ Manual Connect',
      found: (n) => `${n} terminal${n !== 1 ? 's' : ''} found`,
      noDevices: 'No ADB terminals found',
      noHint: 'Check WiFi and subnet, or use Manual Connect',
      filterAll: 'All', filterOnline: 'Online', filterWarning: 'Warning', filterFault: 'Fault',
    },
    device: {
      title: 'Terminal',
      runDiag: 'Run Diagnostics',
      viewHistory: 'View History',
      ip: 'IP Address', manufacturer: 'Manufacturer', model: 'Model',
      serial: 'Serial Number', android: 'Android Version', adb: 'ADB Status',
    },
    diag: {
      title: 'Diagnostics',
      overallHealth: 'Overall Health',
      healthy: 'Healthy', warning: 'Warning', critical: 'Critical',
      rerun: 'Re-run Diagnostics',
      export: 'Export Report',
      rawData: 'Raw Data',
    },
    history: {
      title: 'History',
      noHistory: 'No diagnostic history',
      noHint: 'Run diagnostics to see history here',
    },
    build: {
      title: 'Build Your APK',
      subtitle: 'This preview shows the app UI. Download the source and build the real Android APK.',
    },
    status: { ok: 'OK', warning: 'Warning', fault: 'Fault', unknown: 'Unknown', scanning: 'Scanning' },
  },
  hu: {
    appName: 'POS Doktor',
    nav: { scan: 'Hálózat', diagnostics: 'Diagnosztika', history: 'Előzmények', build: 'APK Build' },
    scan: {
      title: 'Hálózat keresés',
      subtitle: 'ADB terminálok keresése a WiFi hálózaton',
      subnet: 'Alhálózat',
      auto: 'Auto',
      scanBtn: 'Hálózat keresése',
      manualBtn: '+ Manuális kapcsolat',
      found: (n) => `${n} terminál találva`,
      noDevices: 'Nem található ADB terminál',
      noHint: 'Ellenőrizd a WiFi-t és az alhálózatot',
      filterAll: 'Mind', filterOnline: 'Online', filterWarning: 'Figyelmeztetés', filterFault: 'Hiba',
    },
    device: {
      title: 'Terminál',
      runDiag: 'Diagnosztika indítása',
      viewHistory: 'Előzmények',
      ip: 'IP cím', manufacturer: 'Gyártó', model: 'Modell',
      serial: 'Sorozatszám', android: 'Android verzió', adb: 'ADB állapot',
    },
    diag: {
      title: 'Diagnosztika',
      overallHealth: 'Általános állapot',
      healthy: 'Egészséges', warning: 'Figyelmeztetés', critical: 'Kritikus',
      rerun: 'Diagnosztika újrafuttatása',
      export: 'Jelentés exportálása',
      rawData: 'Nyers adat',
    },
    history: {
      title: 'Előzmények',
      noHistory: 'Nincs diagnosztikai előzmény',
      noHint: 'Futtasd a diagnosztikát az előzmények megjelenítéséhez',
    },
    build: {
      title: 'APK Build',
      subtitle: 'Ez az előnézet az app UI-ját mutatja. Töltsd le a forrást és build-eld az Android APK-t.',
    },
    status: { ok: 'Rendben', warning: 'Figyelmeztetés', fault: 'Hiba', unknown: 'Ismeretlen', scanning: 'Keresés' },
  },
};

// ---- Mock data (for preview only) ----
const MOCK_DEVICES = [
  { ip: '192.168.1.45', manufacturer: 'Ingenico', model: 'iCT250', serial: 'ING2024001', port: 5555, lastStatus: 'ok' },
  { ip: '192.168.1.50', manufacturer: 'Verifone', model: 'VX520', serial: 'VFN2024002', port: 5555, lastStatus: 'warning' },
  { ip: '192.168.1.63', manufacturer: 'PAX', model: 'A920', serial: 'PAX2024003', port: 5555, lastStatus: 'fault' },
];

const MOCK_CATEGORIES = [
  {
    id: 'battery', title: { en: 'Battery', hu: 'Akkumulátor' }, status: 'ok',
    summary: { en: 'Battery 87% · Good · 29.5°C', hu: 'Akkumulátor 87% · Rendben · 29.5°C' },
    fields: [
      { key: 'Level', value: '87%', status: 'ok' },
      { key: 'Status', value: 'Charging' },
      { key: 'Health', value: 'Good', status: 'ok' },
      { key: 'Temperature', value: '29.5°C', status: 'ok' },
      { key: 'Voltage', value: '4150 mV' },
      { key: 'Technology', value: 'Li-ion' },
    ],
    rawOutput: 'Current Battery Service state:\n  level: 87\n  scale: 100\n  status: 2\n  health: 2\n  temperature: 295\n  voltage: 4150\n  technology: Li-ion',
  },
  {
    id: 'nfc', title: { en: 'NFC Module', hu: 'NFC Modul' }, status: 'warning',
    summary: { en: 'NFC module Off', hu: 'NFC modul kikapcsolva' },
    fields: [
      { key: 'Module', value: 'Present', status: 'ok' },
      { key: 'State', value: 'Off', status: 'warning' },
      { key: 'NDEF Push', value: 'false' },
    ],
    rawOutput: 'mState=off\nmIsNdefPushEnabled=false\nmScreenState=ON_UNLOCKED',
  },
  {
    id: 'cardReader', title: { en: 'Card Reader (MSR)', hu: 'Kártyaolvasó (MSR)' }, status: 'ok',
    summary: { en: 'MSR reader detected', hu: 'MSR olvasó érzékelhető' },
    fields: [
      { key: 'MSR Services', value: 'Found', status: 'ok' },
      { key: 'Card Services', value: 'Running', status: 'ok' },
    ],
    rawOutput: '5 com.ingenico.msr: [com.ingenico.msr.MsrService]\n7 com.ingenico.card: [com.ingenico.card.CardService]',
  },
  {
    id: 'emv', title: { en: 'EMV Chip Reader', hu: 'EMV Chipolvasó' }, status: 'ok',
    summary: { en: 'EMV chip reader detected', hu: 'EMV chipolvasó érzékelhető' },
    fields: [
      { key: 'EMV Services', value: 'Found', status: 'ok' },
    ],
    rawOutput: '12 com.ingenico.emv: [com.ingenico.emv.EmvService]',
  },
  {
    id: 'contactless', title: { en: 'Contactless / NFC Payment', hu: 'Érintéses / NFC fizetés' }, status: 'warning',
    summary: { en: 'Contactless reader not ready (NFC Off)', hu: 'Érintéses olvasó nem kész (NFC ki)' },
    fields: [
      { key: 'NFC Module', value: 'Present', status: 'ok' },
      { key: 'NFC State', value: 'Off', status: 'warning' },
      { key: 'Contactless Detected', value: 'Not via ADB', status: 'unknown' },
    ],
    rawOutput: 'mState=off\nmIsNdefPushEnabled=false',
  },
  {
    id: 'wifi', title: { en: 'WiFi', hu: 'WiFi' }, status: 'ok',
    summary: { en: 'Connected to "StoreWifi" (-58 dBm)', hu: 'Csatlakozva: "StoreWifi" (-58 dBm)' },
    fields: [
      { key: 'State', value: 'Enabled', status: 'ok' },
      { key: 'Connection', value: 'Connected', status: 'ok' },
      { key: 'SSID', value: 'StoreWifi' },
      { key: 'Signal (RSSI)', value: '-58 dBm', status: 'ok' },
      { key: 'IP Address', value: '192.168.1.45' },
    ],
    rawOutput: 'Wi-Fi is enabled\nextraInfo: "StoreWifi"\nlinkLayerStats.rssi: -58\nipAddress: 192.168.1.45',
  },
  {
    id: 'mobile', title: { en: 'Mobile Network', hu: 'Mobilhálózat' }, status: 'fault',
    summary: { en: 'SIM not active or no service', hu: 'SIM inaktív vagy nincs szolgáltatás' },
    fields: [
      { key: 'Operator', value: 'N/A', status: 'fault' },
      { key: 'SIM State', value: 'ABSENT', status: 'fault' },
      { key: 'In Service', value: 'No', status: 'fault' },
      { key: 'Signal', value: 'N/A' },
    ],
    rawOutput: 'mSimState=ABSENT\nmNetworkOperatorName=\nmServiceState=OUT_OF_SERVICE',
  },
  {
    id: 'deviceInfo', title: { en: 'Device Info', hu: 'Eszközinformáció' }, status: 'ok',
    summary: { en: 'Ingenico iCT250 · Android 9', hu: 'Ingenico iCT250 · Android 9' },
    fields: [
      { key: 'Manufacturer', value: 'Ingenico' },
      { key: 'Model', value: 'iCT250' },
      { key: 'Serial', value: 'ING2024001' },
      { key: 'Android Version', value: '9' },
      { key: 'SDK Level', value: '28' },
      { key: 'Build Type', value: 'user' },
    ],
    rawOutput: 'ro.product.manufacturer=Ingenico\nro.product.model=iCT250\nro.serialno=ING2024001\nro.build.version.release=9',
  },
  {
    id: 'memory', title: { en: 'Memory & Storage', hu: 'Memória és tároló' }, status: 'ok',
    summary: { en: 'RAM 62% used · Storage 34% used', hu: 'RAM 62% használt · Tároló 34% használt' },
    fields: [
      { key: 'Total RAM', value: '2048 MB' },
      { key: 'Free RAM', value: '779 MB' },
      { key: 'RAM Usage', value: '62%', status: 'ok' },
      { key: 'Storage Total', value: '16G' },
      { key: 'Storage Available', value: '10G' },
      { key: 'Storage Use', value: '34%', status: 'ok' },
    ],
    rawOutput: 'Total RAM: 2,097,152K\nFree RAM: 798,042K\n/data: 16G 5.4G 10G 34%',
  },
  {
    id: 'uptime', title: { en: 'System Uptime', hu: 'Rendszer futási idő' }, status: 'ok',
    summary: { en: 'Running for 2d 14h 32m', hu: 'Futási idő: 2d 14h 32m' },
    fields: [
      { key: 'Uptime', value: '2d 14h 32m', status: 'ok' },
      { key: 'Days', value: '2' },
      { key: 'Hours', value: '14' },
      { key: 'Minutes', value: '32' },
    ],
    rawOutput: '224832.45 198231.12',
  },
];

// ---- Components ----

function StatusBadge({ status, size = 'md', t }) {
  const configs = {
    ok: { bg: C.okBg, color: C.ok, icon: '✓' },
    warning: { bg: C.warningBg, color: C.warning, icon: '⚠' },
    fault: { bg: C.faultBg, color: C.fault, icon: '✗' },
    unknown: { bg: 'rgba(127,142,163,0.14)', color: C.textSecondary, icon: '?' },
    scanning: { bg: C.infoBg, color: C.scanning, icon: '●' },
  };
  const cfg = configs[status] || configs.unknown;
  const labels = t.status;
  const label = labels[status] || status;

  return (
    <span
      className={`status-badge ${size}`}
      style={{ background: cfg.bg, color: cfg.color }}
      data-testid="status-badge"
    >
      <span className="badge-icon">{cfg.icon}</span>
      {label}
    </span>
  );
}

function CollapsibleCard({ cat, lang, t }) {
  const [open, setOpen] = useState(cat.status === 'fault' || cat.status === 'warning');
  const [showRaw, setShowRaw] = useState(false);

  const title = lang === 'hu' ? cat.title.hu : cat.title.en;
  const summary = lang === 'hu' ? cat.summary.hu : cat.summary.en;

  return (
    <div className="collapsible-card" data-testid="diagnostic-card">
      <button
        className="card-header"
        onClick={() => setOpen(!open)}
        data-testid="diagnostic-card-toggle"
      >
        <div className="card-header-left">
          <span className="card-title">{title}</span>
          {!open && <span className="card-summary-inline">{summary}</span>}
        </div>
        <div className="card-header-right">
          <StatusBadge status={cat.status} size="sm" t={t} />
          <span className={`chevron ${open ? 'open' : ''}`}>›</span>
        </div>
      </button>

      {open && (
        <div className="card-body">
          <p className="card-summary" data-testid="diagnostic-card-summary">{summary}</p>

          <div className="fields-table">
            {cat.fields.map((f, i) => (
              <div key={i} className="field-row" data-testid="key-value-row">
                <span className="field-key">{f.key}</span>
                <span
                  className="field-value"
                  style={{
                    color: f.status === 'ok' ? C.ok : f.status === 'warning' ? C.warning : f.status === 'fault' ? C.fault : C.textPrimary
                  }}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          <button
            className="raw-toggle"
            onClick={() => setShowRaw(!showRaw)}
          >
            {showRaw ? `▼ ${t.diag.rawData}` : `▶ ${t.diag.rawData}`}
          </button>

          {showRaw && (
            <pre className="raw-output" data-testid="diagnostic-card-raw-data">
              {cat.rawOutput}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// ---- Screens ----

function ScanScreen({ t, lang, onConnect }) {
  const [subnet, setSubnet] = useState('192.168.1');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleScan = () => {
    if (scanning) { setScanning(false); return; }
    setScanning(true);
    setDevices([]);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 25) + 10;
      setProgress(Math.min(p, 100));
      if (p >= 40 && devices.length === 0) {
        setDevices([MOCK_DEVICES[0]]);
      }
      if (p >= 65) setDevices([MOCK_DEVICES[0], MOCK_DEVICES[1]]);
      if (p >= 85) setDevices([MOCK_DEVICES[0], MOCK_DEVICES[1], MOCK_DEVICES[2]]);
      if (p >= 100) {
        clearInterval(interval);
        setScanning(false);
      }
    }, 400);
  };

  const filtered = devices.filter(d => filter === 'all' || d.lastStatus === (filter === 'online' ? 'ok' : filter));

  return (
    <div className="screen-content" data-testid="scan-screen">
      <h1 className="screen-title">{t.scan.title}</h1>
      <p className="screen-subtitle">{t.scan.subtitle}</p>

      {/* Subnet input */}
      <div className="subnet-row">
        <div className="subnet-input-wrap">
          <label className="field-label">{t.scan.subnet}</label>
          <input
            className="text-input mono"
            value={subnet}
            onChange={e => setSubnet(e.target.value)}
            placeholder="192.168.1"
            data-testid="scan-subnet-input"
          />
        </div>
        <button className="auto-btn" data-testid="scan-subnet-auto-button">
          {t.scan.auto}
        </button>
      </div>

      {/* Scan button */}
      <button
        className={`btn-primary scan-btn ${scanning ? 'scanning' : ''}`}
        onClick={handleScan}
        data-testid="scan-start-button"
      >
        {scanning ? (
          <span className="btn-inner">
            <span className="spinner" />
            {`Scanning ${Math.min(progress * 2.54, 254) | 0}/254`}
          </span>
        ) : t.scan.scanBtn}
      </button>

      {scanning && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Filters */}
      {devices.length > 0 && (
        <div className="filter-row">
          {[
            ['all', t.scan.filterAll],
            ['online', t.scan.filterOnline],
            ['warning', t.scan.filterWarning],
            ['fault', t.scan.filterFault],
          ].map(([f, label]) => (
            <button
              key={f}
              className={`filter-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              data-testid={`scan-filter-chip-${f}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {devices.length > 0 && (
        <p className="results-count">{t.scan.found(filtered.length)}</p>
      )}

      {/* Device list */}
      <div className="device-list" data-testid="scan-results-list">
        {filtered.map(device => (
          <button
            key={device.ip}
            className="device-item"
            onClick={() => onConnect(device)}
            data-testid="scan-device-list-item"
          >
            <div className={`status-dot dot-${device.lastStatus}`} />
            <div className="device-info">
              <span className="device-ip mono">{device.ip}</span>
              <span className="device-model">{device.manufacturer} · {device.model}</span>
              <span className="device-serial mono">S/N: {device.serial}</span>
            </div>
            <div className="device-right">
              <StatusBadge status={device.lastStatus} size="sm" t={t} />
              <span className="chevron">›</span>
            </div>
          </button>
        ))}
      </div>

      {!scanning && devices.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p className="empty-text">{t.scan.noDevices}</p>
          <p className="empty-hint">{t.scan.noHint}</p>
        </div>
      )}

      <button className="btn-secondary" data-testid="manual-connect-open-button">
        {t.scan.manualBtn}
      </button>
    </div>
  );
}

function DeviceDetailScreen({ device, t, lang, onRunDiag, onHistory, onBack }) {
  const fields = [
    { key: t.device.ip, value: device.ip, mono: true },
    { key: t.device.manufacturer, value: device.manufacturer },
    { key: t.device.model, value: device.model },
    { key: t.device.serial, value: device.serial, mono: true },
    { key: t.device.adb, value: lang === 'hu' ? 'Csatlakozva' : 'Connected' },
  ];

  return (
    <div className="screen-content" data-testid="device-detail-screen">
      <div className="info-card" data-testid="device-info-card">
        <div className="info-card-header">
          <div>
            <h2 className="device-title">{device.manufacturer} {device.model}</h2>
            <span className="device-ip mono">{device.ip}</span>
          </div>
          <StatusBadge status={device.lastStatus} t={t} />
        </div>
        <div className="divider" />
        {fields.map((f, i) => (
          <div key={i} className="field-row" data-testid="key-value-row">
            <span className="field-key">{f.key}</span>
            <span className={`field-value ${f.mono ? 'mono' : ''}`}>{f.value}</span>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={onRunDiag} data-testid="run-diagnostics-button">
        {t.device.runDiag}
      </button>
      <button className="btn-secondary mt-sm" onClick={onHistory} data-testid="view-history-button">
        {t.device.viewHistory}
      </button>
    </div>
  );
}

function DiagnosticsScreen({ device, t, lang, onBack }) {
  const [running, setRunning] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRunning(false);
      setReport({
        overallScore: 75,
        overallStatus: 'warning',
        categories: MOCK_CATEGORIES,
        deviceModel: device.model,
        deviceSerial: device.serial,
        deviceIp: device.ip,
      });
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const rerun = () => {
    setRunning(true);
    setReport(null);
    setTimeout(() => {
      setRunning(false);
      setReport({
        overallScore: 75,
        overallStatus: 'warning',
        categories: MOCK_CATEGORIES,
        deviceModel: device.model,
        deviceSerial: device.serial,
        deviceIp: device.ip,
      });
    }, 2200);
  };

  const scoreColor = !report ? C.textMuted :
    report.overallScore >= 80 ? C.ok :
    report.overallScore >= 60 ? C.warning : C.fault;

  const healthLabel = !report ? '' :
    report.overallScore >= 80 ? t.diag.healthy :
    report.overallScore >= 60 ? t.diag.warning : t.diag.critical;

  return (
    <div className="screen-content diag-screen" data-testid="diagnostics-screen">
      {/* Overall health */}
      <div className="health-card" data-testid="overall-health-score">
        <div className="health-left">
          <span className="health-label">{t.diag.overallHealth}</span>
          {running ? (
            <div className="health-loading">
              <span className="spinner" />
              <span className="health-loading-text">Running...</span>
            </div>
          ) : (
            <>
              <span className="health-score" style={{ color: scoreColor }}>
                {report?.overallScore}%
              </span>
              <span className="health-status-label" style={{ color: scoreColor }}
                data-testid="overall-health-label">
                {healthLabel}
              </span>
            </>
          )}
        </div>
        {report && (
          <div className="health-stats">
            {[{ s: 'ok', c: C.ok }, { s: 'warning', c: C.warning }, { s: 'fault', c: C.fault }].map(({ s, c }) => (
              <div key={s} className="health-stat">
                <span style={{ color: c, fontSize: 22, fontWeight: 700 }}>
                  {report.categories.filter(x => x.status === s).length}
                </span>
                <span className="health-stat-label">{s === 'ok' ? 'OK' : s === 'warning' ? 'Warn' : 'Fault'}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {report && (
        <p className="device-identity" data-testid="diagnostics-device-identity">
          {report.deviceModel} · <span className="mono">{report.deviceSerial}</span> · <span className="mono">{report.deviceIp}</span>
        </p>
      )}

      {/* Skeleton */}
      {running && (
        <div className="skeleton-list">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </div>
      )}

      {/* Categories */}
      {report && (
        <div className="categories">
          {report.categories.map(cat => (
            <CollapsibleCard key={cat.id} cat={cat} lang={lang} t={t} />
          ))}
        </div>
      )}

      {/* Action bar */}
      <div className="bottom-action-bar">
        <button
          className={`btn-primary flex-1 ${running ? 'disabled' : ''}`}
          onClick={rerun}
          disabled={running}
          data-testid="diagnostics-rerun-button"
        >
          {running ? <span className="spinner" /> : t.diag.rerun}
        </button>
        {report && (
          <button
            className="btn-secondary export-btn"
            data-testid="diagnostics-export-button"
          >
            📄 {t.diag.export}
          </button>
        )}
      </div>
    </div>
  );
}

function HistoryScreen({ device, t, lang }) {
  const mockEntries = [
    { id: '1', date: new Date(Date.now() - 86400000).toLocaleString(), score: 75, status: 'warning', note: 'NFC, Mobile Network' },
    { id: '2', date: new Date(Date.now() - 172800000).toLocaleString(), score: 90, status: 'ok', note: '' },
    { id: '3', date: new Date(Date.now() - 259200000).toLocaleString(), score: 45, status: 'fault', note: 'Battery, NFC, Mobile' },
  ];

  return (
    <div className="screen-content" data-testid="history-screen">
      <div className="history-header">
        <span className="history-device">{device.manufacturer} {device.model}</span>
        <button className="clear-btn">Clear All</button>
      </div>

      <div className="history-list" data-testid="history-list">
        {mockEntries.map(e => (
          <div key={e.id} className="history-item" data-testid="history-list-item">
            <div className="history-item-left">
              <span className="history-date">{e.date}</span>
              {e.note && <span className="history-note">{e.note}</span>}
            </div>
            <div className="history-item-right">
              <span
                className="history-score"
                style={{ color: e.score >= 80 ? C.ok : e.score >= 60 ? C.warning : C.fault }}
              >
                {e.score}%
              </span>
              <StatusBadge status={e.status} size="sm" t={t} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuildScreen({ t, lang }) {
  return (
    <div className="screen-content build-screen">
      <div className="build-hero">
        <span className="build-icon">📱</span>
        <h2 className="build-title">{t.build.title}</h2>
        <p className="build-subtitle">{t.build.subtitle}</p>
      </div>

      <div className="build-step">
        <div className="step-num">1</div>
        <div className="step-content">
          <h3>Install EAS CLI</h3>
          <pre className="code-block">npm install -g eas-cli</pre>
        </div>
      </div>
      <div className="build-step">
        <div className="step-num">2</div>
        <div className="step-content">
          <h3>Install Dependencies</h3>
          <pre className="code-block">cd mobile && npm install</pre>
        </div>
      </div>
      <div className="build-step">
        <div className="step-num">3</div>
        <div className="step-content">
          <h3>Build APK</h3>
          <pre className="code-block">eas build --platform android --profile preview</pre>
        </div>
      </div>
      <div className="build-step">
        <div className="step-num">4</div>
        <div className="step-content">
          <h3>Download & Install</h3>
          <p style={{ color: C.textSecondary, fontSize: 14 }}>Download the APK from the EAS dashboard and install on your Android device.</p>
        </div>
      </div>

      <div className="tech-stack">
        <h3 className="tech-title">Technical Stack</h3>
        {[
          ['ADB Protocol', 'Pure JavaScript ADB wire protocol over TCP'],
          ['TCP Sockets', 'react-native-tcp-socket'],
          ['RSA Auth', 'node-forge (pure JS RSA for ADB auth)'],
          ['Subnet Scan', 'Parallel TCP probes on port 5555'],
          ['i18n', 'EN / HU toggle with AsyncStorage persistence'],
          ['Export', 'expo-print (PDF) + expo-sharing'],
        ].map(([name, desc]) => (
          <div key={name} className="tech-row">
            <span className="tech-name">{name}</span>
            <span className="tech-desc">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main App ----
export default function App() {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('scan');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const t = T[lang];

  const handleConnect = (device) => {
    setSelectedDevice(device);
    setScreen('device');
  };

  const handleRunDiag = () => setScreen('diagnostics');
  const handleHistory = () => setScreen('history');
  const handleBack = () => {
    if (screen === 'diagnostics' || screen === 'history') setScreen('device');
    else if (screen === 'device') setScreen('scan');
    else setScreen('scan');
  };

  return (
    <div className="app-root">
      {/* Desktop sidebar / mobile top header */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">♥</span>
          <span className="logo-text">{t.appName}</span>
        </div>

        <nav className="sidebar-nav">
          {[
            ['scan', t.nav.scan, '🔍'],
            ['device', t.nav.scan, '📟', true],
            ['diagnostics', t.nav.diagnostics, '🩺'],
            ['history', t.nav.history, '📂'],
            ['build', t.nav.build, '🔧'],
          ].map(([id, label, icon, hidden]) => !hidden && (
            <button
              key={id}
              className={`nav-item ${screen === id ? 'active' : ''}`}
              onClick={() => { setScreen(id); if (id === 'diagnostics' && !selectedDevice) setSelectedDevice(MOCK_DEVICES[0]); }}
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="lang-toggle" data-testid="top-nav-language-toggle">
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              data-testid="top-nav-language-en"
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === 'hu' ? 'active' : ''}`}
              onClick={() => setLang('hu')}
              data-testid="top-nav-language-hu"
            >
              HU
            </button>
          </div>
          <p className="sidebar-note">UI Preview — Real ADB requires Android APK</p>
        </div>
      </aside>

      {/* Phone frame */}
      <main className="main-area">
        <div className="preview-header">
          <h1 className="preview-title">{t.appName}</h1>
          <p className="preview-subtitle">Interactive UI Preview · Android APK required for live ADB</p>
        </div>

        <div className="phone-wrap">
          <div className="phone-frame">
            {/* Phone notch */}
            <div className="phone-notch" />

            {/* Phone screen */}
            <div className="phone-screen">
              {/* In-phone navigation */}
              <div className="phone-nav">
                {screen !== 'scan' && screen !== 'build' && (
                  <button className="phone-back" onClick={handleBack}>← {t.nav.scan.split(' ')[0]}</button>
                )}
                <span className="phone-nav-title">
                  {screen === 'scan' ? t.appName :
                   screen === 'device' ? t.device.title :
                   screen === 'diagnostics' ? t.diag.title :
                   screen === 'history' ? t.history.title :
                   t.build.title}
                </span>
                <div className="phone-lang">
                  <button className={`phone-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
                  <button className={`phone-lang-btn ${lang === 'hu' ? 'active' : ''}`} onClick={() => setLang('hu')}>HU</button>
                </div>
              </div>

              {/* Screen content */}
              <div className="phone-content">
                {screen === 'scan' && <ScanScreen t={t} lang={lang} onConnect={handleConnect} />}
                {screen === 'device' && selectedDevice && (
                  <DeviceDetailScreen
                    device={selectedDevice}
                    t={t}
                    lang={lang}
                    onRunDiag={handleRunDiag}
                    onHistory={handleHistory}
                    onBack={handleBack}
                  />
                )}
                {screen === 'diagnostics' && selectedDevice && (
                  <DiagnosticsScreen device={selectedDevice} t={t} lang={lang} onBack={handleBack} />
                )}
                {screen === 'history' && selectedDevice && (
                  <HistoryScreen device={selectedDevice} t={t} lang={lang} />
                )}
                {screen === 'build' && <BuildScreen t={t} lang={lang} />}
              </div>
            </div>

            {/* Home indicator */}
            <div className="phone-home" />
          </div>
        </div>
      </main>
    </div>
  );
}
