import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createIdentity, peerRecord, sleep, TestnetNode } from "../src/core.mjs";

const directory = mkdtempSync(join(tmpdir(), "bonds-three-node-")); const authority = createIdentity();
const nodes = ["atlas", "beacon", "citadel"].map((name) => new TestnetNode({ name, dataDir: directory, identity: createIdentity(), authorityPublicKeyPem: authority.publicKeyPem }));
for (const node of nodes) await node.start();
const records = nodes.map((node) => peerRecord({ host: "127.0.0.1", port: node.port, identity: node.identity }, authority));
for (const node of nodes) { node.setPeers(records); for (const peer of nodes) if (peer !== node) node.connect(peer.identity.nodeId); }
await sleep(300); nodes[0].mineEmpty(1735689605000); await sleep(300);
console.table(nodes.map((node) => ({ node: node.name, port: node.port, peers: node.peers.size, height: node.height, tip: node.chain.tip.slice(0, 12) })));
for (const node of nodes) await node.stop();
