/**
 * ADB Client - Main entry point for ADB over WiFi
 * Implements the full ADB client protocol:
 * - TCP connection (react-native-tcp-socket)
 * - CNXN handshake (direct or with RSA auth)
 * - Shell command execution (multiplexed streams)
 */

import TcpSocket from 'react-native-tcp-socket';
import {
  CMD,
  ADB_VERSION,
  MAX_DATA,
  AUTH_TOKEN,
  AUTH_SIGNATURE,
  AUTH_RSAPUBLICKEY,
  encodeMessage,
  MessageParser,
  AdbMessage,
} from './AdbProtocol';
import { loadOrCreateKeyPair, signToken, buildPublicKeyPayload, AdbKeyPair } from './AdbAuth';

interface StreamHandler {
  onMessage: (msg: AdbMessage) => void;
  onError: (e: Error) => void;
}

export type AdbConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'authenticating'
  | 'connected'
  | 'error'
  | 'disconnected';

export class AdbClient {
  private socket: any = null;
  private parser: MessageParser | null = null;
  private deviceBanner = '';
  private localIdCounter = 1;
  private streamHandlers = new Map<number, StreamHandler>();
  private connectResolve: (() => void) | null = null;
  private connectReject: ((e: Error) => void) | null = null;
  private connectTimeout: ReturnType<typeof setTimeout> | null = null;
  private keyPair: AdbKeyPair | null = null;
  private _status: AdbConnectionStatus = 'idle';
  private onStatusChange?: (s: AdbConnectionStatus) => void;

  constructor(onStatusChange?: (s: AdbConnectionStatus) => void) {
    this.onStatusChange = onStatusChange;
  }

  get status(): AdbConnectionStatus {
    return this._status;
  }

  private setStatus(s: AdbConnectionStatus): void {
    this._status = s;
    this.onStatusChange?.(s);
  }

  async connect(ip: string, port = 5555, timeoutMs = 15000): Promise<void> {
    if (this.socket) {
      this.disconnect();
    }

    this.localIdCounter = 1;
    this.setStatus('connecting');

    try {
      this.keyPair = await loadOrCreateKeyPair();
    } catch (e) {
      this.setStatus('error');
      throw new Error('Failed to load/create ADB key pair');
    }

    return new Promise((resolve, reject) => {
      this.connectResolve = resolve;
      this.connectReject = reject;

      this.connectTimeout = setTimeout(() => {
        this.connectReject = null;
        this.connectResolve = null;
        this.disconnect();
        this.setStatus('error');
        reject(new Error(`ADB connection timeout (${ip}:${port})`));
      }, timeoutMs);

      this.parser = new MessageParser((msg) => {
        this.handleMessage(msg).catch((err) => {
          if (this.connectReject) {
            clearTimeout(this.connectTimeout!);
            this.connectReject(err);
            this.connectReject = null;
            this.connectResolve = null;
          }
          this.setStatus('error');
        });
      });

      try {
        this.socket = TcpSocket.createConnection(
          { host: ip, port, timeout: timeoutMs },
          () => {
            this.setStatus('authenticating');
            // Send CNXN
            const banner = Buffer.from('host::adb-wifi-client\0');
            this.writeRaw(encodeMessage(CMD.CNXN, ADB_VERSION, MAX_DATA, banner));
          }
        );

        this.socket.on('data', (data: Buffer) => {
          this.parser?.push(data);
        });

        this.socket.on('error', (err: Error) => {
          clearTimeout(this.connectTimeout!);
          this.connectReject?.(err);
          this.connectReject = null;
          this.connectResolve = null;
          this.setStatus('error');
        });

        this.socket.on('close', () => {
          this.socket = null;
          this.streamHandlers.clear();
          if (this._status === 'connected') {
            this.setStatus('disconnected');
          }
        });
      } catch (err: any) {
        clearTimeout(this.connectTimeout!);
        this.setStatus('error');
        reject(err);
      }
    });
  }

  private async handleMessage(msg: AdbMessage): Promise<void> {
    if (msg.cmdName === 'AUTH') {
      if (msg.arg0 === AUTH_TOKEN) {
        if (!this.keyPair) throw new Error('No key pair available');
        const sig = await signToken(msg.data, this.keyPair.privateKey);
        this.writeRaw(encodeMessage(CMD.AUTH, AUTH_SIGNATURE, 0, sig));
      } else {
        // Unknown key - send public key for device authorization
        if (!this.keyPair) throw new Error('No key pair available');
        const pub = await buildPublicKeyPayload(this.keyPair.publicKey);
        this.writeRaw(encodeMessage(CMD.AUTH, AUTH_RSAPUBLICKEY, 0, pub));
      }
    } else if (msg.cmdName === 'CNXN') {
      this.deviceBanner = msg.data.toString();
      this.setStatus('connected');
      clearTimeout(this.connectTimeout!);
      this.connectResolve?.();
      this.connectResolve = null;
      this.connectReject = null;
    } else {
      // Stream messages - dispatch to handlers
      // For OKAY/WRTE/CLSE: arg1 = local (client) stream ID
      const streamId = msg.arg1;
      const handler = this.streamHandlers.get(streamId);
      if (handler) {
        handler.onMessage(msg);
      }
    }
  }

  async executeShell(
    command: string,
    timeoutMs = 45000,
    onPartialOutput?: (chunk: string) => void
  ): Promise<string> {
    if (!this.socket || this._status !== 'connected') {
      throw new Error('ADB client not connected');
    }

    const localId = this.localIdCounter++;

    return new Promise((resolve, reject) => {
      let output = '';

      const timeout = setTimeout(() => {
        this.streamHandlers.delete(localId);
        reject(new Error(`Shell command timeout: ${command}`));
      }, timeoutMs);

      const handler: StreamHandler = {
        onMessage: (msg) => {
          if (msg.cmdName === 'OKAY') {
            // Stream accepted - remoteId = msg.arg0
          } else if (msg.cmdName === 'WRTE') {
            const chunk = msg.data.toString('utf8');
            output += chunk;
            onPartialOutput?.(chunk);
            // Acknowledge WRTE
            this.writeRaw(
              encodeMessage(CMD.OKAY, localId, msg.arg0, Buffer.alloc(0))
            );
          } else if (msg.cmdName === 'CLSE') {
            clearTimeout(timeout);
            this.streamHandlers.delete(localId);
            resolve(output);
          }
        },
        onError: (e) => {
          clearTimeout(timeout);
          this.streamHandlers.delete(localId);
          reject(e);
        },
      };

      this.streamHandlers.set(localId, handler);

      // Send OPEN
      const service = Buffer.from(`shell:${command}\0`);
      this.writeRaw(encodeMessage(CMD.OPEN, localId, 0, service));
    });
  }

  getDeviceBanner(): string {
    return this.deviceBanner;
  }

  isConnected(): boolean {
    return this._status === 'connected' && this.socket !== null;
  }

  private writeRaw(data: Buffer): void {
    if (!this.socket) return;
    try {
      this.socket.write(data);
    } catch (e) {
      // Socket write error
    }
  }

  disconnect(): void {
    if (this.connectTimeout) {
      clearTimeout(this.connectTimeout);
      this.connectTimeout = null;
    }
    this.streamHandlers.forEach((h) => h.onError(new Error('Disconnected')));
    this.streamHandlers.clear();
    this.parser?.reset();
    this.socket?.destroy();
    this.socket = null;
    if (this._status !== 'error') {
      this.setStatus('disconnected');
    }
  }
}
