import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Chain, createIdentity, GENESIS_HASH, GENESIS_MANIFEST, mine, peerRecord, sleep, StateStore, TestnetNode } from "../src/core.mjs";

test("deterministic genesis has no allocations or transactions", () => {
  assert.equal(GENESIS_MANIFEST.genesisHash, GENESIS_HASH);
  assert.equal(GENESIS_MANIFEST.noValue, true);
});

test("chain chooses cumulative work and records a reorganization", () => {
  const chain = new Chain(); const a1 = mine({ parent: chain.tipNode.block, chain: chain.main, timestamp: 1735689605000 }); chain.add(a1, Number.MAX_SAFE_INTEGER - 120000);
  const a2 = mine({ parent: chain.tipNode.block, chain: chain.main, timestamp: 1735689610000 }); chain.add(a2, Number.MAX_SAFE_INTEGER - 120000);
  const g = chain.nodes.get(GENESIS_HASH).block; const b1 = mine({ parent: g, chain: [g], timestamp: 1735689606000 }); chain.add(b1, Number.MAX_SAFE_INTEGER - 120000);
  const b2 = mine({ parent: b1, chain: [g, b1], timestamp: 1735689611000 }); chain.add(b2, Number.MAX_SAFE_INTEGER - 120000);
  const b3 = mine({ parent: b2, chain: [g, b1, b2], timestamp: 1735689616000 }); const result = chain.add(b3, Number.MAX_SAFE_INTEGER - 120000);
  assert.equal(result.becameTip, true); assert.equal(chain.tip, b3.hash); assert.equal(chain.events.at(-1)?.type, "reorg");
});

test("checksummed state recovers from a corrupt primary using a temporary slot", () => {
  const dir = mkdtempSync(join(tmpdir(), "bonds-store-")); const file = join(dir, "chain.json"); const chain = new Chain(); const block = mine({ parent: chain.tipNode.block, chain: chain.main, timestamp: 1735689605000 }); chain.add(block, Number.MAX_SAFE_INTEGER - 120000); const store = new StateStore(file); store.save(chain); writeFileSync(`${file}.tmp`, readFileSync(file)); store.corruptForTest(); const recovered = store.load(); assert.equal(recovered.tip, chain.tip);
});

test("authenticated peers relay an empty no-value testnet block", async () => {
  const dir = mkdtempSync(join(tmpdir(), "bonds-p2p-")); const authority = createIdentity();
  const alice = new TestnetNode({ name: "alice", dataDir: dir, identity: createIdentity(), authorityPublicKeyPem: authority.publicKeyPem }); const bob = new TestnetNode({ name: "bob", dataDir: dir, identity: createIdentity(), authorityPublicKeyPem: authority.publicKeyPem });
  await alice.start(); await bob.start(); const records = [peerRecord({ host: "127.0.0.1", port: alice.port, identity: alice.identity }, authority), peerRecord({ host: "127.0.0.1", port: bob.port, identity: bob.identity }, authority)]; alice.setPeers(records); bob.setPeers(records); alice.connect(bob.identity.nodeId);
  for (let i = 0; i < 30 && (!alice.peers.size || !bob.peers.size); i += 1) await sleep(25); assert.equal(alice.peers.size, 1); assert.equal(bob.peers.size, 1); assert.ok(alice.peers.get(bob.identity.nodeId).channel); assert.ok(bob.peers.get(alice.identity.nodeId).channel); alice.mineEmpty(1735689605000); for (let i = 0; i < 30 && bob.height === 0; i += 1) await sleep(25); assert.equal(bob.height, 1); await alice.stop(); await bob.stop();
});
