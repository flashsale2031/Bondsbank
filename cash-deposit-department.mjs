import crypto from 'node:crypto';

const TARGET_ACCOUNTS = new Set([
  'checking','savings','business','business_savings','business_account','credit','business_credit','ira','ledger','vault'
]);

export function createCashDeposit({
  depositor,
  receivingAccountId,
  amount,
  currency='USD',
  receivedAt=new Date().toISOString(),
  location,
  receivedBy,
  depositMethod='BRANCH_CASH',
  sourceOfFunds,
  purpose,
  denominations=[],
  externalReference,
  idempotencyKey
}) {
  if (!idempotencyKey) throw new Error('idempotencyKey required');
  if (!receivingAccountId) throw new Error('receivingAccountId required');
  if (!(Number(amount) > 0)) throw new Error('amount must be positive');
  if (currency !== 'USD') throw new Error('cash deposit currently configured for USD');
  if (!depositor?.name) throw new Error('depositor identity required');
  if (!receivedBy?.userId) throw new Error('receiving employee/system identity required');

  const depositId = `cashdep_${crypto.randomUUID()}`;
  const receiptHash = crypto.createHash('sha256')
    .update(JSON.stringify({depositId, receivingAccountId, amount:String(amount), currency, receivedAt, idempotencyKey}))
    .digest('hex');

  return {
    depositId,
    transactionType: 'CASH_DEPOSIT',
    status: 'PENDING_RECONCILIATION',
    idempotencyKey,
    receivingAccountId,
    amount: String(amount),
    currency,
    receivedAt,
    depositMethod,
    depositor: {
      name: depositor.name,
      customerId: depositor.customerId || null,
      identificationVerified: Boolean(depositor.identificationVerified)
    },
    sourceOfFunds: sourceOfFunds || 'NOT_PROVIDED',
    purpose: purpose || null,
    location: location || null,
    receivedBy: { userId: receivedBy.userId, role: receivedBy.role || null },
    denominations,
    externalReference: externalReference || null,
    receiptHash,
    journal: [
      { side:'DEBIT', account:'CASH_ON_HAND_OR_CASH_CLEARING', amount:String(amount), currency },
      { side:'CREDIT', account:receivingAccountId, amount:String(amount), currency }
    ],
    documentation: {
      receiptRequired: true,
      depositSlipRequired: true,
      cashCountRequired: true,
      reconciliationRequired: true,
      auditEventRequired: true,
      approvalRequired: Number(amount) >= 10000,
      suspiciousActivityReview: 'RISK_ENGINE_DECIDES',
      retentionPolicy: 'CONFIGURED_BY_COMPLIANCE'
    }
  };
}

export function distributeDepositedFunds({ deposit, allocations, idempotencyKey }) {
  if (!deposit || deposit.transactionType !== 'CASH_DEPOSIT') throw new Error('cash deposit required');
  if (deposit.status !== 'PENDING_RECONCILIATION') throw new Error('deposit not ready for distribution');
  if (!idempotencyKey) throw new Error('idempotencyKey required');
  if (!Array.isArray(allocations) || allocations.length === 0) throw new Error('allocations required');

  const total = allocations.reduce((n,a) => n + Number(a.amount), 0);
  if (total !== Number(deposit.amount)) throw new Error('allocation total must equal deposited cash');
  for (const a of allocations) if (!TARGET_ACCOUNTS.has(a.accountType)) throw new Error(`unsupported account type: ${a.accountType}`);

  return {
    distributionId: `dist_${crypto.randomUUID()}`,
    depositId: deposit.depositId,
    status: 'PENDING_LEDGER_POST',
    idempotencyKey,
    allocations: allocations.map(a => ({ accountType:a.accountType, accountId:a.accountId, amount:String(a.amount), currency:deposit.currency })),
    journal: [
      { side:'DEBIT', account:'LEDGER_CLEARING', amount:String(deposit.amount), currency:deposit.currency },
      ...allocations.map(a => ({ side:'CREDIT', account:a.accountId, amount:String(a.amount), currency:deposit.currency }))
    ],
    controls: ['no_overdraft_from_unsettled_cash','double_entry_required','idempotent_posting','audit_log_required']
  };
}
