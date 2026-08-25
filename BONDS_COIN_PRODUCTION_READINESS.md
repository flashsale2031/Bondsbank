# Bonds Coin and Bonds IRA Production Readiness

> **Status: Testnet-first product specification.** The current Bondsbank site is a static interface prototype. It does not issue BONDS, custody assets, process IRA contributions or rollovers, accept deposits, hold reserves, route trades, or operate a blockchain network.

## Product boundary

The intended production product consists of two independently controlled offerings. **Bonds IRA** is a retirement-account experience administered through a qualified custodian and subject to applicable tax, retirement, identity, disclosure, and prohibited-transaction controls. **BONDS** is a prospective USD-referenced payment token. It must not be described as "IRS approved," guaranteed, live, USD-redeemable, collateralized, or stored in custody until the relevant operating and legal controls have been independently verified.

| Surface | Testnet-first scope | Production gate |
|---|---|---|
| Bonds IRA | Account-opening UX, disclosure sequence, custodian-integration specification | Qualified custodian agreement, tax and retirement counsel, identity and suitability controls |
| BONDS reference | Static illustrative reference of `1.00 test USD` | Permitted issuer status, reserve policy, redemption contract, legal review |
| Vault | Zero-balance allocation register and control matrix | Segregated custody, key-management controls, reconciliation, independent audit |
| Wallet | Interface and integration boundary only | Audited wallet software, recovery controls, transaction monitoring, customer support |
| Explorer | Schema and observability design only | Authenticated full nodes, indexers, privacy review, abuse protection |
| Trade desk | Quote-preview interface only | Applicable venue, liquidity, market-integrity, legal, and customer-protection controls |

## Stable-value operating model

Software and consensus cannot guarantee a USD value. A future USD-referenced BONDS product must establish the commercial and legal obligations that make a stable value meaningful. The minimum production package is a permitted issuer model, eligible reserve assets at least equal to tokens in circulation, segregated custody of those assets, an enforceable redemption policy, frequent reconciliation, public reporting, independent assurance, capital and operational backstops, and continuous risk management. The U.S. payment-stablecoin framework described by the OCC covers reserve assets, redemption, risk management, audits, reports, custody, applications, supervision, and capital/operational backstop requirements.[^occ]

The issuance service must remain disabled until the company has written authorization to issue, a reserve bank or qualified custodian, an approved reconciliation policy, a red-team-tested mint/burn control plane, a sanctions/AML program, and an independent accounting and security assurance plan. The user interface must display a live, verified reserve status rather than a marketing claim. A stale, unavailable, or failed verification feed must disable issuance and clearly communicate the failure.

## IRA operating model

The Bonds IRA workflow should make the custodian—not the web frontend—the system of record for account ownership and asset custody. The product must route account establishment, contributions, rollovers, distributions, tax reporting, and asset administration through qualified operating partners. Product marketing must not say that an IRA investment or a virtual currency is "IRS approved." The CFTC explicitly warns that the IRS does not approve or review investments for IRAs and that virtual-currency IRA marketing must not portray an IRA wrapper as reducing volatility or risk.[^cftc]

## Network architecture: production readiness gates

The following table is a launch requirement, not an assertion that the current site has implemented these controls.

An accompanying no-value public-testnet reference node now lives in [`bondscoin-testnet/`](./bondscoin-testnet/). It provides a narrow, controlled baseline for deterministic genesis, a small proof-of-work consensus reference, authenticated bootstrap discovery, crash-safe snapshots, bounded wire parsing, and local multi-node tests. It is intentionally excluded from any customer, reserve, issuer, custody, or trading operation.

The current mainnet decision is explicitly **do not activate**. The detailed gate framework, operating architecture, rollout ladder, runbook requirements, and external evidence package are maintained in [`bondscoin-testnet/MAINNET_READINESS.md`](./bondscoin-testnet/MAINNET_READINESS.md).

| Layer | Required production control | Test and evidence |
|---|---|---|
| Genesis | Versioned, canonical genesis manifest with chain ID, protocol version, deterministic serialization, initial state root, and signed reproducible artifact | Independent rebuild produces the published genesis hash; release artifacts verified in CI |
| Consensus | Chosen consensus specification with explicit difficulty-adjustment or validator-selection rule, block-time bounds, timestamp policy, and cumulative-work/finality behavior | Property tests and adversarial simulations for time warp, selfish mining/validator faults, and parameter extremes |
| Reorganizations | Chain-work/finality comparison, bounded reorg policy, atomic rollback/replay, mempool reconciliation, and wallet confirmation policy | Differential tests across competing forks and long-reorg recovery drills |
| P2P discovery | Signed node identity records, authenticated handshakes, replay protection, peer scoring, rate limits, allowlists for testnet bootstraps, and Sybil resistance | Integration tests for spoofed discovery, invalid signatures, duplicate identities, and eclipse attempts |
| State durability | Write-ahead log or atomic database batches, checksums, snapshots, crash recovery, pruning policy, and state-root verification | Fault-injection across every write boundary; restore and replay tests from snapshots |
| DoS resistance | Strict message size and parsing limits, CPU/memory/disk/network quotas, bounded queues, ban scores, backpressure, and resource telemetry | Fuzzing, malformed-wire corpus, load tests, and denial-of-service exercises |
| Wallet | Hardware-backed or multi-party approval model, key derivation policy, encrypted backups, recovery ceremony, withdrawal limits, and transaction simulation | External wallet audit, recovery drill, transaction-parser fuzzing, and key-compromise tabletop exercise |
| Explorer | Read-only authenticated indexer feeds, privacy filters, rate limits, proof/verification endpoints, and no private-key input | Privacy review, abuse testing, API schema validation, and availability tests |
| Trading | No order acceptance until venue, liquidity, compliance, custody, surveillance, and incident controls are approved | Market-abuse controls, kill switch, reconciliation tests, and external legal review |

## Testnet and audit program

The first runnable network must be an isolated multi-node testnet with no monetary value. It should use reproducible container or binary builds, named release artifacts, at least three independently operated validator/miner roles as applicable, public status monitoring, and a documented reset policy. The release program needs unit, property, integration, regression, differential, fuzz, and network-chaos testing. Fuzzing must cover transaction decoding, script/contract execution if applicable, block parsing, P2P messages, discovery records, database recovery, and wallet serialization.

Before production, commission independent audits for the consensus/node implementation, wallet and signing flows, custody controls, web application and APIs, smart-contract components if any, cloud and key-management configuration, and operational incident response. Audit findings must be tracked to remediation with retests. A public disclosure and vulnerability-reporting process should exist before launch.

## Compliance and operational controls

The compliance program must include a documented risk assessment, customer due diligence, sanctions controls, transaction monitoring, recordkeeping, escalation, independent testing, and accountable management ownership. FinCEN’s 2026 proposed stablecoin rules describe AML/CFT and sanctions compliance obligations for permitted payment stablecoin issuers, including an effective sanctions compliance program.[^fincen]

If Bonds Bank operates as a broker or other reporting intermediary, the design must also account for applicable digital-asset tax reporting. Treasury and IRS final regulations describe broker gross-proceeds reporting beginning in 2026 for 2025 sales and later basis reporting requirements.[^treasury]

## Release decision record

No production launch occurs until every item below has a named accountable owner and documented evidence:

1. Legal classification and issuer authorization are complete.
2. Reserve, custody, redemption, and reconciliation contracts are executed and tested.
3. Qualified IRA custodian and retirement-product operations are live.
4. AML/CFT, sanctions, privacy, tax, complaints, and reporting controls are approved.
5. Testnet exit criteria, external audits, remediation, and incident drills are signed off.
6. Customer disclosures do not imply a guaranteed investment, government endorsement, IRS approval, or live USD redemption before those claims are legally and operationally valid.

## References

[^occ]: [OCC, *GENIUS Act Regulations: Notice of Proposed Rulemaking* (February 25, 2026)](https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-3.html)
[^cftc]: [CFTC, *Customer Advisory: Beware “IRS Approved” Virtual Currency IRAs*](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/beware_irs_approved_virtual_currency.html)
[^fincen]: [FinCEN, *Treasury Proposes Rule to Implement the GENIUS Act’s Requirements to Counter Illicit Finance* (April 8, 2026)](https://www.fincen.gov/news/news-releases/treasury-proposes-rule-implement-genius-acts-requirements-counter-illicit)
[^treasury]: [U.S. Treasury, *IRS Release Final Regulations Implementing Digital Asset Broker Reporting* (June 28, 2024)](https://home.treasury.gov/news/press-releases/jy2438)
