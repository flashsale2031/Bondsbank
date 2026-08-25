# Bonds Coin Independent Public Testnet Reference

> **No-value testnet software.** This code is not a production blockchain, stablecoin issuer, wallet, exchange, custody service, or investment product. It disables transactions, allocations, live issuance, customer balances, redemption, private-key collection, and trading.

## Included reference controls

| Capability | Current testnet reference | Still required for production |
|---|---|---|
| Deterministic genesis | Fixed chain ID, canonical encoding, no allocations, reproducible hash | Signed release process and independent verification |
| Consensus | Small proof-of-work reference, bounded adjustment, cumulative-work fork selection | Formal specification, adversarial review, parameter governance |
| Reorganizations | Fork tree, bounded reorg policy, reorg events | Long-horizon simulations and wallet finality policy |
| P2P | Signed node identities, signed bootstrap records, authenticated X25519 session setup, AES-GCM encrypted payloads, strict message sequences | Transport-version governance, public operations, Sybil/eclipsing review |
| State | Checksummed snapshots with fsync/rename commits and temporary-file recovery | Database hardening, backups, operational runbooks |
| DoS controls | Strict message size, parser rejection, per-socket rate limit, handshake timeout, in-process peer scoring and temporary bans | Traffic scrubbing, telemetry, durable scoring, global quotas, chaos tests |
| Multi-node | Three-node local demonstration and two-node propagation test | Persistently operated isolated testnet and monitoring |

## Run

```bash
cd bondscoin-testnet
npm test
npm run demo:three-nodes
```

Before any value-bearing release, complete independent audits for consensus/node behavior, P2P abuse resistance, storage integrity, wallet/key custody, explorer privacy, web/API surfaces, cloud deployment, and incident response. Refer to [`../BONDS_COIN_PRODUCTION_READINESS.md`](../BONDS_COIN_PRODUCTION_READINESS.md) for the full operating gates.

For the current system inventory, threat register, residual-risk record, evidence matrix, and audit handoff, read [THREAT_MODEL.md](./THREAT_MODEL.md). Security researchers should follow [SECURITY.md](./SECURITY.md).

The repository is **not eligible for mainnet activation**. The explicit no-activation boundary and the external evidence required for a future launch are documented in [MAINNET_READINESS.md](./MAINNET_READINESS.md).

Provider-neutral diligence, request-for-information, and evaluation materials are in [PARTNER_ENGAGEMENT_PACKAGE.md](./PARTNER_ENGAGEMENT_PACKAGE.md). They must not be used to retain a provider without separate approval.

The public-source shortlist for review is in [PROSPECTIVE_PROVIDER_SHORTLIST.md](./PROSPECTIVE_PROVIDER_SHORTLIST.md). It does not authorize contact with any organization.
