import crypto from 'node:crypto';

// Encrypts token metadata at rest. The master key must come from a KMS/HSM/secret manager.
// Never hard-code the key or place it in the repository.
export function encryptTokenEnvelope(token, masterKey) {
  if (!Buffer.isBuffer(masterKey) || masterKey.length !== 32) throw new Error('Expected 32-byte KMS-derived key');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', masterKey, iv);
  const plaintext = Buffer.from(JSON.stringify(token), 'utf8');
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return { version: 1, alg: 'AES-256-GCM', iv: iv.toString('base64url'), ciphertext: ciphertext.toString('base64url'), tag: cipher.getAuthTag().toString('base64url') };
}

export function tokenId(namespace, serial) {
  return crypto.createHash('sha256').update(`${namespace}:${serial}`).digest('hex');
}

export function createBatchAllocation({ namespace, units, ownerEmail, reserveStatus }) {
  return { namespace, units: String(units), ownerEmail, reserveStatus, model: 'fungible-batch-with-derived-unit-ids' };
}
