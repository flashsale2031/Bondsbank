import test from "node:test";
import assert from "node:assert/strict";
import { assertMainnetInactive, MAINNET_ACTIVATION } from "../src/mainnet-boundary.mjs";

test("reference node has an explicit no-mainnet-activation boundary", () => {
  assert.equal(MAINNET_ACTIVATION.enabled, false);
  assert.equal(MAINNET_ACTIVATION.network, "bonds-public-testnet-1");
  assert.ok(MAINNET_ACTIVATION.requiredExternalEvidence.length >= 6);
  assert.equal(assertMainnetInactive(), true);
});
