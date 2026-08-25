# Bonds Bank Deployment Boundary

## Current deployment

This repository is a **static Bonds Bank testnet-first product interface**. It may be hosted as a static site over HTTPS and contains no backend API, customer authentication, asset custody, payment processing, IRA administration, private-key handling, token issuance, order routing, or P2P node service.

The interface presents a Bonds IRA, Bonds Coin, BONDS Vault, explorer, and trading-desk experience as product and technical architecture prototypes. Any displayed USD reference is illustrative only. There are no BONDS tokens, reserves, redemption rights, or customer funds in the site.

## Future production split

Production must be deployed as separate, independently reviewed services. The public frontend should communicate with authenticated API gateways only. Custody, issuer controls, reserve reconciliation, KYC/AML and sanctions screening, IRA custodian integrations, market surveillance, blockchain nodes, indexers, and signing services must remain outside the static frontend and must not expose secrets or private keys to the browser.

For the complete launch-gate specification, see [BONDS_COIN_PRODUCTION_READINESS.md](./BONDS_COIN_PRODUCTION_READINESS.md).
