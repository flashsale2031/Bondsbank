export const MAINNET_ACTIVATION = Object.freeze({
  enabled: false,
  network: "bonds-public-testnet-1",
  reason: "No value-bearing network activation is authorized in this reference node.",
  requiredExternalEvidence: Object.freeze([
    "Permitted issuer authorization and legal classification",
    "Eligible reserve, custody, redemption, and reconciliation operations",
    "AML/CFT, sanctions, privacy, tax, and customer-protection approvals",
    "Qualified IRA custodian operations for any retirement product",
    "Independent protocol, wallet, custody, infrastructure, and web-security audits",
    "Governance-approved incident response, monitoring, and launch decision record",
  ]),
});

export function assertMainnetInactive() {
  if (MAINNET_ACTIVATION.enabled) throw new Error("Mainnet activation must not be enabled in the public-testnet reference node");
  return true;
}
