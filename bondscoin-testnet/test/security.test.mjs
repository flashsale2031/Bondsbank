import test from "node:test";
import assert from "node:assert/strict";
import { createEphemeralKeypair, NonceReplayGuard, PeerScoreBook, SecureChannel } from "../src/security.mjs";

test("replay guard accepts a nonce once and rejects its replay", () => {
  const guard = new NonceReplayGuard({ ttlMs: 1000 });
  assert.equal(guard.accept("node-a", "f".repeat(32), 100), true);
  assert.equal(guard.accept("node-a", "f".repeat(32), 200), false);
  assert.equal(guard.accept("node-a", "f".repeat(32), 1200), true);
});

test("peer score book bans repeated severe protocol violations", () => {
  const scores = new PeerScoreBook({ banThreshold: -100, banMs: 1000 });
  scores.penalize("attacker", "invalid-signature", 50, 10);
  assert.equal(scores.isBanned("attacker", 10), false);
  const result = scores.penalize("attacker", "replayed-hello", 50, 20);
  assert.equal(result.banned, true);
  assert.equal(scores.isBanned("attacker", 21), true);
  assert.equal(scores.snapshot("attacker").strikes.length, 2);
});

test("authenticated encrypted channels protect content and reject replayed sequences", () => {
  const a = createEphemeralKeypair(); const b = createEphemeralKeypair();
  const sender = new SecureChannel({ localNodeId: "alice", remoteNodeId: "bob", localEphemeral: a, remoteEphemeralPublicKeyPem: b.publicKeyPem, chainId: "bonds-public-testnet-1" });
  const receiver = new SecureChannel({ localNodeId: "bob", remoteNodeId: "alice", localEphemeral: b, remoteEphemeralPublicKeyPem: a.publicKeyPem, chainId: "bonds-public-testnet-1" });
  const envelope = sender.encrypt({ type: "PING", nonce: "test" });
  assert.notEqual(envelope.ciphertext, Buffer.from(JSON.stringify({ type: "PING", nonce: "test" })).toString("base64"));
  assert.deepEqual(receiver.decrypt(envelope), { type: "PING", nonce: "test" });
  assert.throws(() => receiver.decrypt(envelope));
});
