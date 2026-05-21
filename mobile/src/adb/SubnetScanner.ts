/**
 * Subnet Scanner
 * Auto-detects device's WiFi subnet and scans for ADB port 5555
 * Uses parallel TCP connection attempts (react-native-tcp-socket)
 */

import TcpSocket from 'react-native-tcp-socket';
import NetInfo from '@react-native-community/netinfo';

export interface ScanResult {
  ip: string;
  port: number;
  open: boolean;
}

export interface ScanProgress {
  scanned: number;
  total: number;
  found: number;
}

/**
 * Auto-detect WiFi subnet from device IP
 * Returns e.g. "192.168.1" or null if not on WiFi
 */
export async function detectSubnet(): Promise<string | null> {
  try {
    const state = await NetInfo.fetch();
    if (
      state.type === 'wifi' &&
      state.details &&
      (state.details as any).ipAddress
    ) {
      const ip: string = (state.details as any).ipAddress;
      const parts = ip.split('.');
      if (parts.length === 4) {
        return `${parts[0]}.${parts[1]}.${parts[2]}`;
      }
    }
  } catch (_e) {
    // NetInfo error
  }
  return null;
}

/**
 * Try TCP connection to ip:port with timeout
 * Returns true if port is open
 */
function probePort(
  ip: string,
  port: number,
  timeoutMs: number
): Promise<boolean> {
  return new Promise((resolve) => {
    let done = false;
    let timer: ReturnType<typeof setTimeout>;
    let sock: any;

    const finish = (open: boolean) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try { sock?.destroy(); } catch (_) {}
      resolve(open);
    };

    timer = setTimeout(() => finish(false), timeoutMs);

    try {
      sock = TcpSocket.createConnection({ host: ip, port, timeout: timeoutMs }, () => {
        finish(true);
      });
      sock.on('error', () => finish(false));
      sock.on('close', () => finish(false));
    } catch (_e) {
      finish(false);
    }
  });
}

/**
 * Scan subnet for open ADB ports
 * @param base - Subnet base, e.g. "192.168.1"
 * @param port - Port to scan (default 5555)
 * @param timeoutMs - Per-host timeout in ms
 * @param concurrency - Parallel connections
 * @param onProgress - Progress callback
 * @param onFound - Callback for each found host
 * @param cancelRef - Set .cancelled = true to stop scan
 */
export async function scanSubnet(
  base: string,
  port = 5555,
  timeoutMs = 600,
  concurrency = 32,
  onProgress?: (p: ScanProgress) => void,
  onFound?: (ip: string) => void,
  cancelRef?: { cancelled: boolean }
): Promise<ScanResult[]> {
  const results: ScanResult[] = [];
  const ips: string[] = [];

  // Build IP list (1-254, skip .0 and .255)
  for (let i = 1; i <= 254; i++) {
    ips.push(`${base}.${i}`);
  }

  const total = ips.length;
  let scanned = 0;
  let found = 0;

  // Process in batches for concurrency control
  for (let i = 0; i < ips.length; i += concurrency) {
    if (cancelRef?.cancelled) break;

    const batch = ips.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(async (ip) => {
        if (cancelRef?.cancelled) return { ip, port, open: false };
        const open = await probePort(ip, port, timeoutMs);
        scanned++;
        if (open) {
          found++;
          onFound?.(ip);
        }
        onProgress?.({ scanned, total, found });
        return { ip, port, open };
      })
    );
    results.push(...batchResults.filter((r) => r.open));
  }

  return results;
}

/**
 * Quick connectivity check to a specific IP:port
 */
export async function checkAdbConnectivity(
  ip: string,
  port = 5555,
  timeoutMs = 3000
): Promise<boolean> {
  return probePort(ip, port, timeoutMs);
}
