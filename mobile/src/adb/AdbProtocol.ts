/**
 * ADB Wire Protocol - Message encoding/decoding
 * Implements the binary ADB protocol (24-byte header + payload)
 * Proven working by Node.js POC tests (8/8 passed)
 */

export const CMD = {
  CNXN: 0x4e584e43,
  AUTH: 0x48545541,
  OPEN: 0x4e45504f,
  OKAY: 0x59414b4f,
  CLSE: 0x45534c43,
  WRTE: 0x45545257,
} as const;

export const CMD_NAMES: Record<number, string> = Object.fromEntries(
  Object.entries(CMD).map(([k, v]) => [v, k])
);

export const AUTH_TOKEN = 1;
export const AUTH_SIGNATURE = 2;
export const AUTH_RSAPUBLICKEY = 3;

export const ADB_VERSION = 0x01000000;
export const MAX_DATA = 256 * 1024;

const CRC_TABLE = buildCrcTable();

function buildCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
}

export function crc32(buf: Buffer | Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)) >>> 0;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export interface AdbMessage {
  cmd: number;
  cmdName: string;
  arg0: number;
  arg1: number;
  data: Buffer;
  totalLen: number;
}

export function encodeMessage(
  cmd: number,
  arg0: number,
  arg1: number,
  data?: Buffer | Uint8Array
): Buffer {
  const payload = data ? Buffer.from(data) : Buffer.alloc(0);
  const header = Buffer.allocUnsafe(24);
  header.writeUInt32LE(cmd >>> 0, 0);
  header.writeUInt32LE(arg0 >>> 0, 4);
  header.writeUInt32LE(arg1 >>> 0, 8);
  header.writeUInt32LE(payload.length, 12);
  header.writeUInt32LE(crc32(payload), 16);
  header.writeUInt32LE((cmd ^ 0xffffffff) >>> 0, 20);
  return Buffer.concat([header, payload]);
}

export function decodeMessage(buf: Buffer): AdbMessage | null {
  if (buf.length < 24) return null;

  const cmd = buf.readUInt32LE(0);
  const arg0 = buf.readUInt32LE(4);
  const arg1 = buf.readUInt32LE(8);
  const dataLen = buf.readUInt32LE(12);
  const dataCrc = buf.readUInt32LE(16);
  const magic = buf.readUInt32LE(20);

  if (((cmd ^ 0xffffffff) >>> 0) !== magic) {
    throw new Error(`ADB magic mismatch: cmd=0x${cmd.toString(16)}`);
  }

  if (buf.length < 24 + dataLen) return null;

  const data = buf.slice(24, 24 + dataLen);
  const calcCrc = crc32(data);
  if (calcCrc !== dataCrc) {
    throw new Error(`ADB CRC mismatch: expected ${dataCrc}, got ${calcCrc}`);
  }

  return {
    cmd,
    cmdName: CMD_NAMES[cmd] || `0x${cmd.toString(16)}`,
    arg0,
    arg1,
    data,
    totalLen: 24 + dataLen,
  };
}

export class MessageParser {
  private buffer: Buffer = Buffer.alloc(0);
  private readonly onMessage: (msg: AdbMessage) => void;

  constructor(onMessage: (msg: AdbMessage) => void) {
    this.onMessage = onMessage;
  }

  push(chunk: Buffer | Uint8Array): void {
    this.buffer = Buffer.concat([this.buffer, Buffer.from(chunk)]);
    this.process();
  }

  private process(): void {
    while (this.buffer.length >= 24) {
      const msg = decodeMessage(this.buffer);
      if (!msg) break;
      this.buffer = this.buffer.slice(msg.totalLen);
      this.onMessage(msg);
    }
  }

  reset(): void {
    this.buffer = Buffer.alloc(0);
  }
}
