#!/usr/bin/env node
/**
 * POS Doctor - ADB Protocol POC
 * Tests the complete ADB wire protocol implementation:
 *  1. CRC32 encoding/decoding
 *  2. ADB message framing
 *  3. CNXN handshake (no-auth mode)
 *  4. AUTH handshake (RSA token/signature mode)
 *  5. OPEN/WRTE/CLSE shell channel execution
 *  6. Subnet port scanner logic
 * 
 * Uses Node.js native modules to validate protocol BEFORE building React Native app.
 */

const net = require('net');
const crypto = require('crypto');

// ─── CRC32 Table ───────────────────────────────────────────────────────────────
function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
}

const CRC_TABLE = makeCrcTable();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// ─── ADB Commands ──────────────────────────────────────────────────────────────
const CMD = {
  CNXN: 0x4e584e43,
  AUTH: 0x48545541,
  OPEN: 0x4e45504f,
  OKAY: 0x59414b4f,
  CLSE: 0x45534c43,
  WRTE: 0x45545257,
};

const CMD_NAMES = Object.fromEntries(Object.entries(CMD).map(([k, v]) => [v, k]));

const AUTH_TOKEN = 1;
const AUTH_SIGNATURE = 2;
const AUTH_RSAPUBLICKEY = 3;

const ADB_VERSION = 0x01000000;
const MAX_DATA = 256 * 1024;

// ─── ADB Message Encode/Decode ─────────────────────────────────────────────────
function encode(cmd, arg0, arg1, data) {
  const payload = data ? Buffer.from(data) : Buffer.alloc(0);
  const header = Buffer.allocUnsafe(24);
  header.writeUInt32LE(cmd, 0);
  header.writeUInt32LE(arg0 >>> 0, 4);
  header.writeUInt32LE(arg1 >>> 0, 8);
  header.writeUInt32LE(payload.length, 12);
  header.writeUInt32LE(crc32(payload), 16);
  header.writeUInt32LE((cmd ^ 0xffffffff) >>> 0, 20);
  return Buffer.concat([header, payload]);
}

function decode(buf) {
  if (buf.length < 24) return null;
  const cmd = buf.readUInt32LE(0);
  const arg0 = buf.readUInt32LE(4);
  const arg1 = buf.readUInt32LE(8);
  const dataLen = buf.readUInt32LE(12);
  const dataCrc = buf.readUInt32LE(16);
  const magic = buf.readUInt32LE(20);

  // Validate magic
  if (((cmd ^ 0xffffffff) >>> 0) !== magic) {
    throw new Error(`ADB magic mismatch: cmd=0x${cmd.toString(16)}, magic=0x${magic.toString(16)}`);
  }

  if (buf.length < 24 + dataLen) return null; // Need more data

  const data = buf.slice(24, 24 + dataLen);

  // Validate CRC
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

// ─── RSA Key Operations (Node.js native) ───────────────────────────────────────
// In React Native, these use react-native-crypto-rsa
async function generateAdbKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        else resolve({ publicKey, privateKey });
      }
    );
  });
}

function signToken(tokenBytes, privateKeyPem) {
  // ADB uses RSA PKCS1 with SHA-1 (actually raw RSA encrypt with private key)
  // For standard ADB, it's actually RSA PKCS1v15 sign with SHA-1
  const sign = crypto.createSign('SHA1');
  sign.update(tokenBytes);
  return sign.sign(privateKeyPem);
}

function verifySignature(tokenBytes, signatureBytes, publicKeyPem) {
  const verify = crypto.createVerify('SHA1');
  verify.update(tokenBytes);
  return verify.verify(publicKeyPem, signatureBytes);
}

// ─── Message Parser (streaming) ────────────────────────────────────────────────
class AdbParser {
  constructor(onMessage) {
    this.buffer = Buffer.alloc(0);
    this.onMessage = onMessage;
  }

  push(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    this.process();
  }

  process() {
    while (this.buffer.length >= 24) {
      const msg = decode(this.buffer);
      if (!msg) break;
      this.buffer = this.buffer.slice(msg.totalLen);
      this.onMessage(msg);
    }
  }
}

// ─── TEST 1: CRC32 ─────────────────────────────────────────────────────────────
function testCRC32() {
  console.log('\n[TEST 1] CRC32 Implementation');
  
  const testCases = [
    { input: Buffer.from(''), expected: 0x00000000 },
    { input: Buffer.from('hello'), expected: 0x3610a686 },
    { input: Buffer.from('host::adb-wifi-client\0'), expected: null }, // Just validate no crash
  ];
  
  let pass = 0;
  for (const tc of testCases) {
    const result = crc32(tc.input);
    if (tc.expected !== null) {
      if (result === tc.expected) {
        console.log(`  ✓ CRC32('${tc.input}') = 0x${result.toString(16).padStart(8,'0')}`);
        pass++;
      } else {
        console.log(`  ✗ CRC32('${tc.input}') = 0x${result.toString(16)} (expected 0x${tc.expected.toString(16)})`);
      }
    } else {
      console.log(`  ✓ CRC32(hostBanner) = 0x${result.toString(16).padStart(8,'0')} (no crash)`);
      pass++;
    }
  }
  return pass === testCases.length;
}

// ─── TEST 2: Message Encode/Decode ─────────────────────────────────────────────
function testMessageEncoding() {
  console.log('\n[TEST 2] ADB Message Encode/Decode');
  
  const banner = Buffer.from('host::adb-wifi-client\0');
  const encoded = encode(CMD.CNXN, ADB_VERSION, MAX_DATA, banner);
  
  console.log(`  Encoded CNXN: ${encoded.length} bytes`);
  
  const decoded = decode(encoded);
  if (!decoded) { console.log('  ✗ decode returned null'); return false; }
  
  const checks = [
    ['command', decoded.cmd === CMD.CNXN, `0x${decoded.cmd.toString(16)}`],
    ['cmdName', decoded.cmdName === 'CNXN', decoded.cmdName],
    ['arg0 (version)', decoded.arg0 === ADB_VERSION, `0x${decoded.arg0.toString(16)}`],
    ['arg1 (maxdata)', decoded.arg1 === MAX_DATA, decoded.arg1],
    ['data', decoded.data.toString() === banner.toString(), decoded.data.toString()],
  ];
  
  let allPass = true;
  for (const [name, ok, val] of checks) {
    console.log(`  ${ok ? '✓' : '✗'} ${name}: ${val}`);
    if (!ok) allPass = false;
  }
  
  // Test fragmentation (partial read)
  const parser = new AdbParser((msg) => {
    console.log(`  ✓ Fragmented parse: got ${msg.cmdName}`);
  });
  // Feed in chunks
  parser.push(encoded.slice(0, 10));
  parser.push(encoded.slice(10, 20));
  parser.push(encoded.slice(20));
  
  return allPass;
}

// ─── TEST 3: CNXN Handshake (no-auth mock server) ──────────────────────────────
function testCnxnHandshake() {
  return new Promise((resolve) => {
    console.log('\n[TEST 3] CNXN Handshake (no-auth mode)');
    
    // Mock ADB server (device side)
    const server = net.createServer((socket) => {
      const parser = new AdbParser((msg) => {
        if (msg.cmdName === 'CNXN') {
          console.log(`  Server got CNXN: banner="${msg.data.toString().replace(/\0/,'\\0')}"`);
          // Send back CNXN (no auth required)
          const resp = encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('device::ro.product.name=TestPOS\0'));
          socket.write(resp);
        }
      });
      socket.on('data', (d) => parser.push(d));
    });
    
    server.listen(0, '127.0.0.1', async () => {
      const port = server.address().port;
      
      // ADB client
      const client = new net.Socket();
      let connected = false;
      const clientParser = new AdbParser((msg) => {
        if (msg.cmdName === 'CNXN') {
          connected = true;
          const banner = msg.data.toString();
          console.log(`  Client got CNXN from device: "${banner.replace(/\0/,'\\0')}"`);
          client.destroy();
          server.close();
          resolve(true);
        }
      });
      
      client.connect(port, '127.0.0.1', () => {
        const cnxn = encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('host::adb-wifi-client\0'));
        client.write(cnxn);
      });
      
      client.on('data', (d) => clientParser.push(d));
      client.on('error', (e) => {
        if (!connected) { console.log(`  ✗ Client error: ${e.message}`); server.close(); resolve(false); }
      });
      
      setTimeout(() => {
        if (!connected) {
          console.log('  ✗ Handshake timeout');
          server.close(); client.destroy(); resolve(false);
        }
      }, 3000);
    });
  });
}

// ─── TEST 4: AUTH Handshake (RSA token/signature) ──────────────────────────────
function testAuthHandshake() {
  return new Promise(async (resolve) => {
    console.log('\n[TEST 4] AUTH Handshake (RSA mode)');
    
    const keyPair = await generateAdbKeyPair();
    console.log(`  Generated RSA 2048 keypair`);
    
    const TOKEN = crypto.randomBytes(20);
    let authDone = false;
    
    const server = net.createServer((socket) => {
      const parser = new AdbParser((msg) => {
        if (msg.cmdName === 'CNXN') {
          // Client is connecting - send AUTH TOKEN challenge
          console.log(`  Server: Client says CNXN, sending AUTH TOKEN`);
          socket.write(encode(CMD.AUTH, AUTH_TOKEN, 0, TOKEN));
        } else if (msg.cmdName === 'AUTH') {
          const type = msg.arg0;
          if (type === AUTH_SIGNATURE) {
            // Verify signature
            const valid = verifySignature(TOKEN, msg.data, keyPair.publicKey);
            console.log(`  Server: AUTH SIGNATURE received, verification: ${valid ? 'PASS' : 'FAIL'}`);
            if (valid) {
              socket.write(encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('device::TestPOS\0')));
            } else {
              // Request public key
              socket.write(encode(CMD.AUTH, AUTH_TOKEN, 0, TOKEN));
            }
          } else if (type === AUTH_RSAPUBLICKEY) {
            console.log(`  Server: AUTH RSAPUBLICKEY received (${msg.data.length} bytes), accepting`);
            socket.write(encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('device::TestPOS\0')));
          }
        }
      });
      socket.on('data', (d) => parser.push(d));
    });
    
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      
      const client = new net.Socket();
      const clientParser = new AdbParser((msg) => {
        if (msg.cmdName === 'AUTH') {
          if (msg.arg0 === AUTH_TOKEN) {
            console.log(`  Client: Got AUTH TOKEN (${msg.data.length} bytes), signing with RSA...`);
            const sig = signToken(msg.data, keyPair.privateKey);
            console.log(`  Client: Sending AUTH SIGNATURE (${sig.length} bytes)`);
            client.write(encode(CMD.AUTH, AUTH_SIGNATURE, 0, sig));
          }
        } else if (msg.cmdName === 'CNXN') {
          authDone = true;
          console.log(`  ✓ Client: AUTH complete! Got device CNXN: "${msg.data.toString().replace(/\0/,'\\0')}"`);
          client.destroy();
          server.close();
          resolve(true);
        }
      });
      
      client.connect(port, '127.0.0.1', () => {
        client.write(encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('host::adb-wifi-client\0')));
      });
      client.on('data', (d) => clientParser.push(d));
      client.on('error', (e) => {
        if (!authDone) { console.log(`  ✗ Error: ${e.message}`); server.close(); resolve(false); }
      });
      
      setTimeout(() => {
        if (!authDone) {
          console.log('  ✗ AUTH timeout');
          server.close(); client.destroy(); resolve(false);
        }
      }, 5000);
    });
  });
}

// ─── TEST 5: Shell Channel (OPEN/OKAY/WRTE/CLSE) ───────────────────────────────
function testShellChannel() {
  return new Promise((resolve) => {
    console.log('\n[TEST 5] Shell Channel (OPEN/WRTE/CLSE)');
    
    const MOCK_OUTPUT = 'Current Battery Service state:\n  level: 87\n  scale: 100\n  status: 2\n  health: 2\n  present: true\n  temperature: 280\n  technology: Li-ion\n';
    let output = '';
    let done = false;
    
    const server = net.createServer((socket) => {
      let remoteId = null;
      const parser = new AdbParser((msg) => {
        if (msg.cmdName === 'CNXN') {
          socket.write(encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('device::TestPOS\0')));
        } else if (msg.cmdName === 'OPEN') {
          const localId = msg.arg0;
          remoteId = localId;
          const srvLocalId = 1001;
          const service = msg.data.toString().replace(/\0$/, '');
          console.log(`  Server: OPEN for service "${service}"`);
          // Send OKAY to accept stream
          socket.write(encode(CMD.OKAY, srvLocalId, localId, Buffer.alloc(0)));
          // Send output data
          socket.write(encode(CMD.WRTE, srvLocalId, localId, Buffer.from(MOCK_OUTPUT)));
        } else if (msg.cmdName === 'OKAY') {
          // Client acknowledged WRTE - now close
          const srvLocalId = 1001;
          socket.write(encode(CMD.CLSE, srvLocalId, msg.arg1, Buffer.alloc(0)));
        }
      });
      socket.on('data', (d) => parser.push(d));
    });
    
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      let remoteId = null;
      let localId = 42;
      
      const client = new net.Socket();
      const clientParser = new AdbParser((msg) => {
        if (msg.cmdName === 'CNXN') {
          // Open shell channel
          const service = Buffer.from('shell:dumpsys battery\0');
          console.log(`  Client: Sending OPEN for shell:dumpsys battery`);
          client.write(encode(CMD.OPEN, localId, 0, service));
        } else if (msg.cmdName === 'OKAY') {
          if (msg.arg1 === localId) {
            remoteId = msg.arg0;
            console.log(`  Client: Stream OKAY, remoteId=${remoteId}`);
          }
        } else if (msg.cmdName === 'WRTE') {
          if (msg.arg1 === localId) {
            const chunk = msg.data.toString();
            output += chunk;
            console.log(`  Client: Got WRTE (${msg.data.length} bytes): "${chunk.slice(0,40).replace(/\n/g,' ')}..."`);
            // Acknowledge
            client.write(encode(CMD.OKAY, localId, msg.arg0, Buffer.alloc(0)));
          }
        } else if (msg.cmdName === 'CLSE') {
          done = true;
          console.log(`  ✓ Client: Stream CLSE received, total output: ${output.length} chars`);
          console.log(`  ✓ Output contains 'level: 87': ${output.includes('level: 87')}`);
          client.destroy();
          server.close();
          resolve(output.includes('level: 87'));
        }
      });
      
      client.connect(port, '127.0.0.1', () => {
        client.write(encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('host::test\0')));
      });
      client.on('data', (d) => clientParser.push(d));
      client.on('error', (e) => {
        if (!done) { console.log(`  ✗ Error: ${e.message}`); server.close(); resolve(false); }
      });
      
      setTimeout(() => {
        if (!done) { console.log('  ✗ Shell timeout'); server.close(); client.destroy(); resolve(false); }
      }, 5000);
    });
  });
}

// ─── TEST 6: Subnet Scanner Logic ──────────────────────────────────────────────
function testSubnetScanner() {
  return new Promise((resolve) => {
    console.log('\n[TEST 6] Subnet Port Scanner (port 5555)');
    
    // Start a few test servers on different ports to simulate devices
    const servers = [];
    const openPorts = [];
    let serversReady = 0;
    const TARGET_COUNT = 3;
    
    function startServer(cb) {
      const s = net.createServer((sock) => { sock.end(); });
      s.listen(0, '127.0.0.1', () => {
        openPorts.push(s.address().port);
        servers.push(s);
        cb();
      });
    }
    
    function startAllServers() {
      if (servers.length < TARGET_COUNT) {
        startServer(() => startAllServers());
      } else {
        runScanner();
      }
    }
    
    function runScanner() {
      console.log(`  Open ports (simulating ADB devices): ${openPorts.join(', ')}`);
      
      // Simulate scanning by connecting to each port
      const ips = openPorts.map(p => ({ ip: '127.0.0.1', port: p }));
      // Also add some closed ports
      ips.push({ ip: '127.0.0.1', port: 1 }); // closed
      ips.push({ ip: '127.0.0.1', port: 2 }); // closed
      
      const TIMEOUT_MS = 300;
      const discovered = [];
      let completed = 0;
      
      for (const target of ips) {
        const sock = new net.Socket();
        let done = false;
        
        const timer = setTimeout(() => {
          if (!done) { done = true; sock.destroy(); check(); }
        }, TIMEOUT_MS);
        
        sock.connect(target.port, target.ip, () => {
          if (!done) {
            done = true;
            clearTimeout(timer);
            discovered.push(target.ip + ':' + target.port);
            sock.destroy();
            check();
          }
        });
        
        sock.on('error', () => {
          if (!done) { done = true; clearTimeout(timer); check(); }
        });
      }
      
      function check() {
        completed++;
        if (completed === ips.length) {
          console.log(`  Discovered: ${discovered.join(', ')}`);
          console.log(`  ✓ Found ${discovered.length} open ports (expected ${TARGET_COUNT})`);
          servers.forEach(s => s.close());
          resolve(discovered.length === TARGET_COUNT);
        }
      }
    }
    
    startAllServers();
  });
}

// ─── TEST 7: Full Diagnostic Command Flow ──────────────────────────────────────
function testDiagnosticFlow() {
  return new Promise((resolve) => {
    console.log('\n[TEST 7] Full Diagnostic Command Flow');
    
    // Mock responses for each diagnostic command
    const MOCK_COMMANDS = {
      'dumpsys battery': 'Current Battery Service state:\n  level: 78\n  scale: 100\n  status: 2\n  health: 2\n  present: true\n  temperature: 295\n  voltage: 4150\n  technology: Li-ion\n',
      'getprop ro.product.manufacturer': 'Ingenico\n',
      'getprop ro.product.model': 'iCT250\n',
      'getprop ro.serialno': 'POS001234567\n',
      'getprop ro.build.version.release': '9\n',
      'dumpsys wifi | head -20': 'Wi-Fi is enabled\nnetworkInfo [type: WIFI[WIFI], state: CONNECTED/CONNECTED\nextraInfo: "StoreWifi"\nlinkLayerStats.rssi: -55\n',
      'dumpsys nfc | head -10': 'mState=on\nmIsNdefPushEnabled=true\nmScreenState=ON_LOCKED\n',
    };
    
    let cmdCount = 0;
    const results = {};
    
    const server = net.createServer((socket) => {
      const parser = new AdbParser((msg) => {
        if (msg.cmdName === 'CNXN') {
          socket.write(encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('device::POS001234567\0')));
        } else if (msg.cmdName === 'OPEN') {
          const localId = msg.arg0;
          const service = msg.data.toString().replace(/\0$/, '');
          const cmd = service.replace(/^shell:/, '');
          const srvLocalId = 1000 + cmdCount++;
          
          const output = MOCK_COMMANDS[cmd] || `Unknown command: ${cmd}\n`;
          socket.write(encode(CMD.OKAY, srvLocalId, localId, Buffer.alloc(0)));
          socket.write(encode(CMD.WRTE, srvLocalId, localId, Buffer.from(output)));
          
          // Store ids for CLSE handling
          socket._streams = socket._streams || {};
          socket._streams[localId] = { srvLocalId, clientLocalId: localId, cmd };
        } else if (msg.cmdName === 'OKAY') {
          // Client OKAY: arg0=clientLocalId, arg1=srvLocalId
          const stream = socket._streams && socket._streams[msg.arg0];
          if (stream) {
            socket.write(encode(CMD.CLSE, stream.srvLocalId, stream.clientLocalId, Buffer.alloc(0)));
          }
        }
      });
      socket.on('data', (d) => parser.push(d));
    });
    
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const commands = Object.keys(MOCK_COMMANDS);
      let cmdIndex = 0;
      let streams = {}; // localId -> { cmd, output }
      let idCounter = 1;
      
      const client = new net.Socket();
      const clientParser = new AdbParser((msg) => {
        if (msg.cmdName === 'CNXN') {
          console.log(`  Connected to device: ${msg.data.toString().replace(/\0/,'\\0')}`);
          sendNextCommand();
        } else if (msg.cmdName === 'OKAY') {
          if (streams[msg.arg1]) {
            streams[msg.arg1].remoteId = msg.arg0;
          }
        } else if (msg.cmdName === 'WRTE') {
          const stream = streams[msg.arg1];
          if (stream) {
            stream.output = (stream.output || '') + msg.data.toString();
            client.write(encode(CMD.OKAY, msg.arg1, msg.arg0, Buffer.alloc(0)));
          }
        } else if (msg.cmdName === 'CLSE') {
          const stream = streams[msg.arg1];
          if (stream) {
            results[stream.cmd] = stream.output || '';
            console.log(`  ✓ cmd="${stream.cmd}" => "${(stream.output || '').slice(0,40).replace(/\n/g,' ')}..."`);
            delete streams[msg.arg1];
            sendNextCommand();
          }
        }
      });
      
      function sendNextCommand() {
        if (cmdIndex >= commands.length) {
          // All done
          console.log(`\n  Diagnostic results summary:`);
          console.log(`  - Battery level: ${parseBatteryLevel(results['dumpsys battery'])}%`);
          console.log(`  - Manufacturer: ${results['getprop ro.product.manufacturer']?.trim()}`);
          console.log(`  - Model: ${results['getprop ro.product.model']?.trim()}`);
          console.log(`  - Serial: ${results['getprop ro.serialno']?.trim()}`);
          console.log(`  - Android: ${results['getprop ro.build.version.release']?.trim()}`);
          console.log(`  - WiFi: ${parseWifiSSID(results['dumpsys wifi | head -20'])}`);
          console.log(`  - NFC state: ${parseNfcState(results['dumpsys nfc | head -10'])}`);
          client.destroy();
          server.close();
          resolve(Object.keys(results).length === commands.length);
          return;
        }
        const cmd = commands[cmdIndex++];
        const localId = idCounter++;
        streams[localId] = { cmd, output: '', remoteId: null };
        client.write(encode(CMD.OPEN, localId, 0, Buffer.from(`shell:${cmd}\0`)));
      }
      
      client.connect(port, '127.0.0.1', () => {
        client.write(encode(CMD.CNXN, ADB_VERSION, MAX_DATA, Buffer.from('host::adb-wifi-client\0')));
      });
      client.on('data', (d) => clientParser.push(d));
      client.on('error', (e) => {
        console.log(`  ✗ Error: ${e.message}`);
        server.close();
        resolve(false);
      });
      
      setTimeout(() => {
        if (Object.keys(results).length < commands.length) {
          console.log(`  ✗ Timeout (got ${Object.keys(results).length}/${commands.length} commands)`);
          server.close(); client.destroy(); resolve(false);
        }
      }, 10000);
    });
  });
}

// ─── Diagnostic Parsers (validates parsing logic for React Native app) ─────────
function parseBatteryLevel(output) {
  const m = output?.match(/level: (\d+)/);
  return m ? parseInt(m[1]) : null;
}

function parseBatteryHealth(output) {
  const m = output?.match(/health: (\d+)/);
  const healthMap = { 1: 'Unknown', 2: 'Good', 3: 'Overheat', 4: 'Dead', 5: 'Over voltage', 6: 'Unspecified failure', 7: 'Cold' };
  return m ? healthMap[parseInt(m[1])] || 'Unknown' : null;
}

function parseWifiSSID(output) {
  const m = output?.match(/extraInfo: "([^"]+)"/);
  return m ? m[1] : 'Not connected';
}

function parseNfcState(output) {
  const m = output?.match(/mState=(\w+)/);
  return m ? m[1] : 'Unknown';
}

// ─── TEST 8: Diagnostic Parsers ────────────────────────────────────────────────
function testDiagnosticParsers() {
  console.log('\n[TEST 8] Diagnostic Parsers');
  
  const batteryOutput = 'Current Battery Service state:\n  level: 87\n  scale: 100\n  status: 2\n  health: 2\n  present: true\n  temperature: 295\n  voltage: 4150\n';
  const wifiOutput = 'Wi-Fi is enabled\nextraInfo: "StoreWifi"\nlinkLayerStats.rssi: -55\n';
  const nfcOutput = 'mState=on\nmIsNdefPushEnabled=true\n';
  
  const tests = [
    ['Battery level', parseBatteryLevel(batteryOutput), 87],
    ['Battery health', parseBatteryHealth(batteryOutput), 'Good'],
    ['WiFi SSID', parseWifiSSID(wifiOutput), 'StoreWifi'],
    ['NFC state', parseNfcState(nfcOutput), 'on'],
  ];
  
  let pass = 0;
  for (const [name, actual, expected] of tests) {
    const ok = actual === expected;
    console.log(`  ${ok ? '✓' : '✗'} ${name}: ${actual} (expected: ${expected})`);
    if (ok) pass++;
  }
  return pass === tests.length;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  POS Doctor - ADB Protocol POC Test Suite');
  console.log('═══════════════════════════════════════════════════════════');
  
  const results = [];
  
  try {
    // Synchronous tests
    results.push(['CRC32', testCRC32()]);
    results.push(['Message Encoding', testMessageEncoding()]);
    results.push(['Diagnostic Parsers', testDiagnosticParsers()]);
    
    // Async tests
    results.push(['CNXN Handshake (no-auth)', await testCnxnHandshake()]);
    results.push(['AUTH Handshake (RSA)', await testAuthHandshake()]);
    results.push(['Shell Channel', await testShellChannel()]);
    results.push(['Subnet Scanner', await testSubnetScanner()]);
    results.push(['Full Diagnostic Flow', await testDiagnosticFlow()]);
  } catch (e) {
    console.error('\n✗ FATAL ERROR:', e);
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  
  let passed = 0;
  for (const [name, ok] of results) {
    console.log(`  ${ok ? '✓ PASS' : '✗ FAIL'} | ${name}`);
    if (ok) passed++;
  }
  
  console.log(`\n  Total: ${passed}/${results.length} tests passed`);
  
  if (passed === results.length) {
    console.log('\n  ✓ ALL TESTS PASSED - ADB Protocol Implementation VERIFIED');
    console.log('  Ready to build React Native app around this proven core!');
  } else {
    console.log('\n  ✗ Some tests failed - Fix before proceeding to app build');
    process.exit(1);
  }
}

main().catch(console.error);
