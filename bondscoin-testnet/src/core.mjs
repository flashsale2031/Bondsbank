import { createHash, generateKeyPairSync, randomBytes, sign, verify } from "node:crypto";
import { EventEmitter } from "node:events";
import { existsSync, mkdirSync, openSync, readFileSync, renameSync, unlinkSync, writeFileSync, fsyncSync, closeSync } from "node:fs";
import net from "node:net";
import { dirname, join } from "node:path";

export const CHAIN_ID = "bonds-public-testnet-1";
export const PROTOCOL_VERSION = 1;
export const NOTICE = "BONDS PUBLIC TESTNET — NO VALUE — NO ISSUANCE — NO CUSTODY";
export const TARGET_BLOCK_MS = 5_000;
export const ADJUSTMENT_WINDOW = 8;
export const INITIAL_DIFFICULTY = 2;
export const MAX_REORG_DEPTH = 12;
export const MAX_WIRE_BYTES = 64 * 1024;

export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}
export function hash(value) { return createHash("sha256").update(typeof value === "string" ? value : canonical(value)).digest("hex"); }
export function assert(ok, message) { if (!ok) throw new Error(message); }
export function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const GENESIS_BODY = Object.freeze({ notice: NOTICE, allocations: [], transactions: [] });
export const GENESIS_HEADER = Object.freeze({ chainId: CHAIN_ID, version: PROTOCOL_VERSION, height: 0, previousHash: "0".repeat(64), timestamp: 1735689600000, difficulty: 0, nonce: 0, bodyHash: hash(GENESIS_BODY) });
export const GENESIS_HASH = hash({ header: GENESIS_HEADER, body: GENESIS_BODY });
export const GENESIS = Object.freeze({ header: GENESIS_HEADER, body: GENESIS_BODY, hash: GENESIS_HASH });
export const GENESIS_MANIFEST = Object.freeze({ chainId: CHAIN_ID, protocolVersion: PROTOCOL_VERSION, genesisHash: GENESIS_HASH, noValue: true, canonicalEncoding: canonical({ header: GENESIS_HEADER, body: GENESIS_BODY }) });

function work(difficulty) { return 16n ** BigInt(difficulty); }
function validPow(block) { return block.hash.startsWith("0".repeat(block.header.difficulty)); }
function expectedDifficulty(parent, chain) {
  const height = parent.header.height + 1;
  if (height === 1) return INITIAL_DIFFICULTY;
  if (height % ADJUSTMENT_WINDOW !== 0) return parent.header.difficulty;
  const anchor = chain.find((block) => block.header.height === height - ADJUSTMENT_WINDOW);
  if (!anchor) return parent.header.difficulty;
  const actual = parent.header.timestamp - anchor.header.timestamp;
  const expected = TARGET_BLOCK_MS * ADJUSTMENT_WINDOW;
  if (actual < expected / 2) return Math.min(parent.header.difficulty + 1, 8);
  if (actual > expected * 2) return Math.max(parent.header.difficulty - 1, 1);
  return parent.header.difficulty;
}
export function mine({ parent, chain, timestamp = parent.header.timestamp + TARGET_BLOCK_MS }) {
  const body = { transactions: [], allocations: [] };
  const base = { chainId: CHAIN_ID, version: PROTOCOL_VERSION, height: parent.header.height + 1, previousHash: parent.hash, timestamp, difficulty: expectedDifficulty(parent, chain), bodyHash: hash(body) };
  for (let nonce = 0; nonce < Number.MAX_SAFE_INTEGER; nonce += 1) {
    const header = { ...base, nonce }; const candidate = { header, body, hash: hash({ header, body }) };
    if (validPow(candidate)) return candidate;
  }
  throw new Error("Nonce space exhausted");
}
function validate(block, parent, chain, now = Date.now()) {
  const { header, body } = block || {};
  assert(header && body, "Malformed block");
  assert(header.chainId === CHAIN_ID && header.version === PROTOCOL_VERSION, "Wrong chain or protocol");
  assert(header.previousHash === parent.hash && header.height === parent.header.height + 1, "Invalid parent or height");
  assert(header.timestamp >= parent.header.timestamp && header.timestamp <= now + 120000, "Invalid timestamp");
  assert(header.difficulty === expectedDifficulty(parent, chain), "Invalid difficulty");
  assert(Array.isArray(body.transactions) && body.transactions.length === 0, "Transactions are disabled on this no-value testnet");
  assert(Array.isArray(body.allocations) && body.allocations.length === 0, "Allocations are disabled on this no-value testnet");
  assert(header.bodyHash === hash(body) && block.hash === hash({ header, body }) && validPow(block), "Invalid block proof");
}
export class Chain {
  constructor() { this.nodes = new Map([[GENESIS_HASH, { block: GENESIS, parent: null, work: 0n }]]); this.tip = GENESIS_HASH; this.events = []; }
  get tipNode() { return this.nodes.get(this.tip); }
  get height() { return this.tipNode.block.header.height; }
  get main() { return this.path(this.tip); }
  path(hash) { const result = []; let node = this.nodes.get(hash); while (node) { result.push(node.block); node = node.parent ? this.nodes.get(node.parent) : null; } return result.reverse(); }
  forkHeight(a, b) { const heights = new Map(this.path(a).map((block) => [block.hash, block.header.height])); for (const block of this.path(b).reverse()) if (heights.has(block.hash)) return heights.get(block.hash); return 0; }
  add(block, now = Date.now()) {
    if (this.nodes.has(block.hash)) return { accepted: false, reason: "duplicate" };
    const parentNode = this.nodes.get(block.header.previousHash); if (!parentNode) return { accepted: false, reason: "unknown-parent" };
    validate(block, parentNode.block, this.path(parentNode.block.hash), now);
    const node = { block, parent: parentNode.block.hash, work: parentNode.work + work(block.header.difficulty) };
    this.nodes.set(block.hash, node);
    if (node.work <= this.tipNode.work) return { accepted: true, becameTip: false };
    const oldTip = this.tip; const forkHeight = this.forkHeight(oldTip, block.hash);
    if (this.tipNode.block.header.height - forkHeight > MAX_REORG_DEPTH) return { accepted: false, reason: "reorg-depth-exceeded" };
    this.tip = block.hash; const reorg = oldTip !== parentNode.block.hash;
    if (reorg) this.events.push({ type: "reorg", oldTip, newTip: block.hash, forkHeight });
    return { accepted: true, becameTip: true, reorg };
  }
  snapshot() { return { version: 1, chainId: CHAIN_ID, tip: this.tip, blocks: this.main }; }
  static restore(snapshot) { assert(snapshot.version === 1 && snapshot.chainId === CHAIN_ID, "Wrong state snapshot"); const chain = new Chain(); for (const block of snapshot.blocks.slice(1)) chain.add(block, Number.MAX_SAFE_INTEGER - 120000); assert(chain.tip === snapshot.tip, "Snapshot tip mismatch"); return chain; }
}

export class StateStore {
  constructor(file) { this.file = file; this.temp = `${file}.tmp`; }
  save(chain) { mkdirSync(dirname(this.file), { recursive: true }); const wrapped = { payload: chain.snapshot(), checksum: hash(chain.snapshot()) }; const fd = openSync(this.temp, "w"); try { writeFileSync(fd, canonical(wrapped), "utf8"); fsyncSync(fd); } finally { closeSync(fd); } renameSync(this.temp, this.file); const folder = openSync(dirname(this.file), "r"); try { fsyncSync(folder); } finally { closeSync(folder); } }
  load() { for (const file of [this.file, this.temp]) { if (!existsSync(file)) continue; try { const wrapped = JSON.parse(readFileSync(file, "utf8")); if (wrapped.checksum === hash(wrapped.payload)) return Chain.restore(wrapped.payload); } catch { /* recover from alternate slot */ } } return new Chain(); }
  corruptForTest() { if (existsSync(this.file)) writeFileSync(this.file, "{bad", "utf8"); }
  clear() { for (const file of [this.file, this.temp]) if (existsSync(file)) unlinkSync(file); }
}

export function createIdentity() { const { publicKey, privateKey } = generateKeyPairSync("ed25519"); const publicKeyPem = publicKey.export({ type: "spki", format: "pem" }); const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" }); return { publicKeyPem, privateKeyPem, nodeId: hash(publicKeyPem) }; }
function signPayload(payload, key) { return sign(null, Buffer.from(canonical(payload)), key).toString("base64"); }
function verifyPayload(payload, signature, key) { try { return verify(null, Buffer.from(canonical(payload)), key, Buffer.from(signature, "base64")); } catch { return false; } }
function hello(identity) { const payload = { type: "HELLO", chainId: CHAIN_ID, nodeId: identity.nodeId, publicKeyPem: identity.publicKeyPem, nonce: randomBytes(12).toString("hex"), timestamp: Date.now() }; return { ...payload, signature: signPayload(payload, identity.privateKeyPem) }; }
function validHello(message) { const { signature, ...payload } = message || {}; return payload.type === "HELLO" && payload.chainId === CHAIN_ID && payload.nodeId === hash(payload.publicKeyPem || "") && Math.abs(Date.now() - payload.timestamp) < 120000 && verifyPayload(payload, signature, payload.publicKeyPem); }
export function peerRecord({ host, port, identity }, authority) { const payload = { host, port, nodeId: identity.nodeId, publicKeyPem: identity.publicKeyPem, issuedAt: Date.now(), expiresAt: Date.now() + 86400000 }; return { issuer: authority.nodeId, payload, signature: signPayload(payload, authority.privateKeyPem) }; }
function validRecord(record, authorityPublicKeyPem) { return record && record.issuer === hash(authorityPublicKeyPem) && record.payload.nodeId === hash(record.payload.publicKeyPem || "") && record.payload.expiresAt > Date.now() && verifyPayload(record.payload, record.signature, authorityPublicKeyPem); }
function encode(message) { const line = JSON.stringify(message); if (Buffer.byteLength(line) > MAX_WIRE_BYTES) throw new Error("Wire limit exceeded"); return `${line}\n`; }
export function decode(line) { if (Buffer.byteLength(line) > MAX_WIRE_BYTES) throw new Error("Wire limit exceeded"); const message = JSON.parse(line); if (!message || !["HELLO", "BLOCK", "PING", "STATUS"].includes(message.type)) throw new Error("Unknown message"); return message; }

export class TestnetNode extends EventEmitter {
  constructor({ name, dataDir, identity, authorityPublicKeyPem, port = 0 }) { super(); this.name = name; this.identity = identity; this.authorityPublicKeyPem = authorityPublicKeyPem; this.port = port; this.store = new StateStore(join(dataDir, `${name}.state.json`)); this.chain = this.store.load(); this.records = new Map(); this.peers = new Map(); this.sockets = new Set(); }
  get height() { return this.chain.height; }
  setPeers(records) { this.records.clear(); for (const record of records) if (validRecord(record, this.authorityPublicKeyPem)) this.records.set(record.payload.nodeId, record); }
  async start() { this.server = net.createServer((socket) => this.attach(socket, false)); await new Promise((resolve, reject) => { this.server.once("error", reject); this.server.listen(this.port, "127.0.0.1", resolve); }); this.port = this.server.address().port; }
  connect(nodeId) { const record = this.records.get(nodeId); if (!record) throw new Error("Unverified peer discovery record"); const socket = net.createConnection({ host: record.payload.host, port: record.payload.port }); socket.once("connect", () => this.attach(socket, true)); return socket; }
  attach(socket, outbound) { this.sockets.add(socket); let buffer = ""; let count = 0; let windowStart = Date.now(); let sent = false; const sendHello = () => { if (!sent) { socket.write(encode(hello(this.identity))); sent = true; } }; if (outbound) sendHello(); socket.setTimeout(15000, () => socket.destroy()); socket.on("data", (chunk) => { if (chunk.length + Buffer.byteLength(buffer) > MAX_WIRE_BYTES * 2) return socket.destroy(); buffer += chunk.toString("utf8"); const lines = buffer.split("\n"); buffer = lines.pop(); for (const line of lines) { const now = Date.now(); if (now - windowStart > 1000) { windowStart = now; count = 0; } if (++count > 60) return socket.destroy(); try { const message = decode(line); if (message.type === "HELLO") { if (!validHello(message)) return socket.destroy(); const record = this.records.get(message.nodeId); if (!record || record.payload.publicKeyPem !== message.publicKeyPem) return socket.destroy(); this.peers.set(message.nodeId, socket); socket.setTimeout(0); sendHello(); this.emit("peer", message.nodeId); } else if (message.type === "BLOCK") { const result = this.chain.add(message.block); if (result.accepted) { this.store.save(this.chain); this.emit("block", message.block, result); } } else if (message.type === "PING") socket.write(encode({ type: "STATUS", height: this.chain.height, tip: this.chain.tip })); } catch { return socket.destroy(); } } }); socket.on("error", () => undefined); socket.on("close", () => { this.sockets.delete(socket); for (const [id, peer] of this.peers) if (peer === socket) this.peers.delete(id); }); }
  mineEmpty(timestamp) { const block = mine({ parent: this.chain.tipNode.block, chain: this.chain.main, timestamp }); const result = this.chain.add(block); if (!result.accepted) throw new Error("Locally mined block rejected"); this.store.save(this.chain); const wire = encode({ type: "BLOCK", block }); for (const socket of this.peers.values()) socket.write(wire); return block; }
  async stop() { for (const socket of this.sockets) socket.destroy(); this.sockets.clear(); this.peers.clear(); if (this.server) await new Promise((resolve) => this.server.close(resolve)); }
}
