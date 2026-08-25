import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createPrivateKey,
  createPublicKey,
  diffieHellman,
  generateKeyPairSync,
  hkdfSync,
  randomBytes,
  sign,
  verify,
} from "node:crypto";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

function fingerprint(value) { return createHash("sha256").update(value).digest("hex"); }

function signPayload(payload, privateKeyPem) {
  return sign(null, Buffer.from(canonical(payload)), privateKeyPem).toString("base64");
}

function verifyPayload(payload, signature, publicKeyPem) {
  try { return verify(null, Buffer.from(canonical(payload)), publicKeyPem, Buffer.from(signature, "base64")); } catch { return false; }
}

export function createEphemeralKeypair() {
  const { publicKey, privateKey } = generateKeyPairSync("x25519");
  return {
    publicKeyPem: publicKey.export({ type: "spki", format: "pem" }),
    privateKeyPem: privateKey.export({ type: "pkcs8", format: "pem" }),
  };
}

export function makeSecureHello(identity, chainId, ephemeral, now = Date.now()) {
  const payload = {
    type: "SECURE_HELLO",
    chainId,
    nodeId: identity.nodeId,
    publicKeyPem: identity.publicKeyPem,
    ephemeralPublicKeyPem: ephemeral.publicKeyPem,
    nonce: randomBytes(16).toString("hex"),
    timestamp: now,
  };
  return { ...payload, signature: signPayload(payload, identity.privateKeyPem) };
}

export function verifySecureHello(message, chainId, now = Date.now(), maxDriftMs = 120000) {
  const { signature, ...payload } = message || {};
  return payload.type === "SECURE_HELLO"
    && payload.chainId === chainId
    && payload.nodeId === fingerprint(payload.publicKeyPem || "")
    && typeof payload.ephemeralPublicKeyPem === "string"
    && typeof payload.nonce === "string"
    && /^[a-f0-9]{32}$/u.test(payload.nonce)
    && Math.abs(now - payload.timestamp) <= maxDriftMs
    && verifyPayload(payload, signature, payload.publicKeyPem);
}

export class NonceReplayGuard {
  constructor({ ttlMs = 120000, maxEntries = 4096 } = {}) { this.ttlMs = ttlMs; this.maxEntries = maxEntries; this.seen = new Map(); }
  accept(nodeId, nonce, now = Date.now()) {
    for (const [key, expiresAt] of this.seen) if (expiresAt <= now) this.seen.delete(key);
    const key = `${nodeId}:${nonce}`;
    if (this.seen.has(key)) return false;
    if (this.seen.size >= this.maxEntries) this.seen.delete(this.seen.keys().next().value);
    this.seen.set(key, now + this.ttlMs);
    return true;
  }
}

export class PeerScoreBook {
  constructor({ banThreshold = -100, banMs = 5 * 60 * 1000 } = {}) { this.banThreshold = banThreshold; this.banMs = banMs; this.entries = new Map(); }
  entry(nodeId) { if (!this.entries.has(nodeId)) this.entries.set(nodeId, { score: 0, strikes: [], bannedUntil: 0 }); return this.entries.get(nodeId); }
  penalize(nodeId, reason, points = 25, now = Date.now()) {
    const entry = this.entry(nodeId); entry.score -= points; entry.strikes.push({ reason, points, at: now });
    if (entry.score <= this.banThreshold) entry.bannedUntil = Math.max(entry.bannedUntil, now + this.banMs);
    return { ...entry, banned: entry.bannedUntil > now };
  }
  reward(nodeId, points = 1) { const entry = this.entry(nodeId); entry.score = Math.min(0, entry.score + points); return { ...entry }; }
  isBanned(nodeId, now = Date.now()) { const entry = this.entry(nodeId); return entry.bannedUntil > now; }
  snapshot(nodeId) { return { ...this.entry(nodeId), strikes: [...this.entry(nodeId).strikes] }; }
}

export class SecureChannel {
  constructor({ localNodeId, remoteNodeId, localEphemeral, remoteEphemeralPublicKeyPem, chainId }) {
    const sharedSecret = diffieHellman({
      privateKey: createPrivateKey(localEphemeral.privateKeyPem),
      publicKey: createPublicKey(remoteEphemeralPublicKeyPem),
    });
    const participants = [localNodeId, remoteNodeId].sort().join(":");
    this.key = Buffer.from(hkdfSync("sha256", sharedSecret, Buffer.from(participants), Buffer.from(`BONDS-TESTNET/${chainId}/v1`), 32));
    this.localNodeId = localNodeId;
    this.remoteNodeId = remoteNodeId;
    this.chainId = chainId;
    this.sendSequence = 0;
    this.receiveSequence = 0;
  }

  aad(sequence, from, to) { return Buffer.from(`${this.chainId}:${from}:${to}:${sequence}`); }

  encrypt(message) {
    const sequence = this.sendSequence++;
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", this.key, iv);
    cipher.setAAD(this.aad(sequence, this.localNodeId, this.remoteNodeId));
    const ciphertext = Buffer.concat([cipher.update(JSON.stringify(message), "utf8"), cipher.final()]);
    return { type: "SECURE_DATA", sequence, iv: iv.toString("base64"), ciphertext: ciphertext.toString("base64"), tag: cipher.getAuthTag().toString("base64") };
  }

  decrypt(envelope) {
    if (!envelope || envelope.type !== "SECURE_DATA" || envelope.sequence !== this.receiveSequence) throw new Error("Unexpected secure-message sequence");
    const decipher = createDecipheriv("aes-256-gcm", this.key, Buffer.from(envelope.iv, "base64"));
    decipher.setAAD(this.aad(envelope.sequence, this.remoteNodeId, this.localNodeId));
    decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
    const plaintext = Buffer.concat([decipher.update(Buffer.from(envelope.ciphertext, "base64")), decipher.final()]);
    this.receiveSequence += 1;
    return JSON.parse(plaintext.toString("utf8"));
  }
}
