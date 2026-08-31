# Bonds Bank — Public Launch V1

## Launch profile

This branch is the first publicly deployable Bonds Bank release profile. It is intentionally **launchable as a static HTTPS site** while keeping financial capabilities that require external authorization or production integrations disabled.

### Enabled

- Public Bonds Bank product interface
- Demo access / demonstration navigation
- Bonds IRA product blueprint
- Bonds Coin policy/reference console
- BONDS Vault custody blueprint
- Explorer/testnet observability interface
- Trading-desk interface in non-executing preview mode
- Static hosting over HTTPS
- Installable web-app metadata
- Branded 404 fallback
- Static security-header configuration for compatible hosts

### Disabled until the required production gates are complete

- Virtual debit-card creation and live Visa card issuance
- Live VisaNet Connect — Issuing calls
- Live card PAN/CVV generation
- Deposits and withdrawals
- ACH/wire/payment-rail transfers
- Wallet funding
- Customer asset custody
- Token minting/redemption
- Live trading/order routing
- Production authentication and customer account access

## Visa card gate

Virtual cards remain disabled until the Visa program has the required issuer/processor configuration, issuer identifier/program data, production credentials, mutual TLS, MLE configuration, HSM/key-management controls, card-product configuration, and applicable production authorization.

The public frontend must never contain Visa API keys, client secrets, private certificates, HSM credentials, PANs, CVVs, or other production secrets.

## Deployment

The repository remains a static frontend. Deploy the contents of this branch to a static HTTPS host such as Cloudflare Pages, GitHub Pages, or another approved static host. Production banking services must be separate authenticated backend services and must not be simulated by the frontend.

## Release principle

A disabled capability is represented as unavailable; the interface must not imply that a blocked payment, card, custody, token, or trading operation actually occurred.
