import crypto from 'node:crypto';

const RAILS = new Set(['ACH','WIRE','RTP','FEDNOW','VISA_DIRECT_ELIGIBLE']);

export function createTransfer({ sourceAccountId, destination, amount, currency='USD', rail, idempotencyKey }) {
  if (!RAILS.has(rail)) throw new Error(`Unsupported rail: ${rail}`);
  if (!idempotencyKey) throw new Error('Idempotency key required');
  if (!(Number(amount) > 0)) throw new Error('Amount must be positive');
  return {
    transferId: `tr_${crypto.randomUUID()}`,
    sourceAccountId,
    destination,
    amount: String(amount),
    currency,
    rail,
    status: 'PENDING_PROVIDER_AUTHORIZATION',
    idempotencyKey
  };
}
