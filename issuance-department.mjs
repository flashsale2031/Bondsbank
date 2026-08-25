export class IssuanceDepartment {
  constructor({ issuerRegistry, compliance, risk, insurance, reserves, ledger, cards, audit }) {
    Object.assign(this,{issuerRegistry,compliance,risk,insurance,reserves,ledger,cards,audit});
  }
  async preflight(req){
    const checks = await Promise.all([
      this.issuerRegistry.authorized(req.product),
      this.compliance.clear(req.userId, req.product),
      this.risk.approve(req),
      this.insurance.covered(req.product),
      req.requiresReserve ? this.reserves.attested(req.product) : true,
    ]);
    return checks.every(Boolean);
  }
  async issue(req){
    if (!req.idempotencyKey) throw new Error('idempotencyKey required');
    if (!(await this.preflight(req))) throw new Error('ISSUANCE_BLOCKED');
    const result = await this.issuerRegistry.issue(req);
    await this.ledger.record({type:'ISSUANCE', requestId:req.idempotencyKey, product:req.product, result});
    await this.audit.append({event:'ISSUED', requestId:req.idempotencyKey, product:req.product});
    return result;
  }
  async replaceCard(req){
    if (!(await this.preflight({...req, product:'card'}))) throw new Error('ISSUANCE_BLOCKED');
    await this.cards.close(req.currentCardId);
    const card = await this.cards.issue({accountId:req.accountId, cardType:req.cardType});
    await this.audit.append({event:'CARD_REPLACED', accountId:req.accountId, previousCardId:req.currentCardId, newCardId:card.id});
    return card;
  }
}
