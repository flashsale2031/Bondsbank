/** Bonds Bank Insurance Department
 * Compliance orchestration layer. It does not itself provide insurance or create coverage.
 * It evaluates product eligibility, coverage evidence, reserve/insurance status, and blocks
 * activation or settlement when required coverage evidence is missing or stale.
 */

const PRODUCT_CLASSES = Object.freeze({
  checking: 'deposit', savings: 'deposit', business: 'deposit', businessSavings: 'deposit',
  credit: 'credit', businessCredit: 'credit', ira: 'retirement', ledger: 'ledger', vault: 'custody',
  virtualDebitCard: 'card', virtualCreditCard: 'card', pos: 'payments', wallet: 'payments',
  bondsCoin: 'token', bondsBankCreditToken: 'token'
});

export class InsuranceDepartment {
  constructor({ policies = [], evidenceStore = new Map(), now = () => new Date() } = {}) {
    this.policies = policies;
    this.evidenceStore = evidenceStore;
    this.now = now;
  }

  evaluate(productType, context = {}) {
    const cls = PRODUCT_CLASSES[productType] || 'unknown';
    const policies = this.policies.filter(p => p.productClasses.includes(cls));
    const applicable = policies.filter(p => p.enabled !== false);
    const evidence = applicable.map(p => this.evidenceStore.get(p.id)).filter(Boolean);
    const stale = evidence.filter(e => e.expiresAt && new Date(e.expiresAt) <= this.now());
    const uncovered = applicable.filter(p => !this.evidenceStore.has(p.id));
    const blocked = productType !== 'unknown' && (uncovered.length > 0 || stale.length > 0);
    return {
      productType, classification: cls, eligible: !blocked,
      blocked, requiredPolicies: applicable.map(p => p.id),
      missingPolicies: uncovered.map(p => p.id),
      stalePolicies: stale.map(e => e.policyId),
      coverage: evidence,
      reason: blocked ? 'Required insurance/coverage evidence is missing or stale.' : 'Coverage evidence is current.'
    };
  }

  assertCovered(productType, context = {}) {
    const result = this.evaluate(productType, context);
    if (!result.eligible) throw new Error(`INSURANCE_BLOCKED:${productType}:${result.reason}`);
    return result;
  }

  recordEvidence(policyId, evidence) {
    if (!policyId || !evidence) throw new Error('policyId and evidence are required');
    this.evidenceStore.set(policyId, { policyId, ...evidence, recordedAt: this.now().toISOString() });
  }
}

export { PRODUCT_CLASSES };
