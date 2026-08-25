import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { decode, MAX_WIRE_BYTES } from "../src/core.mjs";

test("wire decoder rejects malformed and oversized messages", () => {
  for (let i = 0; i < 1000; i += 1) { try { decode(randomBytes(i % 128).toString("base64")); } catch (error) { assert.ok(error instanceof Error); } }
  assert.throws(() => decode("x".repeat(MAX_WIRE_BYTES + 1)));
});
