/**
 * Bonds Bank Virtual Card Service
 *
 * Production adapter: replace issuer.createVirtualCard / closeCard with an
 * authorized PCI-compliant card issuer/processor. Never generate real PAN/CVV
 * locally and never persist CVV/PIN.
 */
import crypto from "node:crypto";

const ACCOUNT_CARD_TYPE = Object.freeze({
  checking: "virtual_debit",
  savings: "virtual_debit",
  business: "virtual_debit",
  business_savings: "virtual_debit",
  credit: "virtual_credit",
  business_credit: "virtual_credit",
  ira: "virtual_debit",
  ledger: "virtual_debit",
  vault: "virtual_debit"
});

function cardTypeFor(accountType) {
  const type = ACCOUNT_CARD_TYPE[accountType];
  if (!type) throw new Error(`Unsupported account type: ${accountType}`);
  return type;
}

export async function issueInitialVirtualCard({ accountId, accountType, userId, issuer }) {
  const cardType = cardTypeFor(accountType);
  const issued = await issuer.createVirtualCard({
    accountId, userId, cardType,
    metadata: { accountType, initial: true }
  });
  return sanitizeCard(issued);
}

export async function lockCard({ cardId, issuer }) {
  return issuer.lockCard({ cardId });
}

export async function unlockCard({ cardId, issuer }) {
  return issuer.unlockCard({ cardId });
}

export async function replaceVirtualCard({ cardId, accountId, accountType, userId, issuer }) {
  // Replacement is atomic at the application level: close first, then issue.
  // If issuance fails, the account remains cardless and requires recovery review.
  await issuer.closeCard({ cardId, reason: "customer_requested_replacement" });
  const replacement = await issuer.createVirtualCard({
    accountId, userId, cardType: cardTypeFor(accountType),
    metadata: { accountType, replacementOf: cardId }
  });
  return sanitizeCard(replacement);
}

function sanitizeCard(card) {
  return {
    id: card.id,
    accountId: card.accountId,
    type: card.type,
    status: card.status,
    brand: card.brand,
    last4: card.last4,
    expiryMonth: card.expiryMonth,
    expiryYear: card.expiryYear
    // PAN, CVV, PIN and issuer secrets intentionally omitted.
  };
}

export { cardTypeFor };
