# Bonds Coin Mainnet Readiness Program

> **Current release decision: DO NOT ACTIVATE MAINNET.** The repository contains a no-value public-testnet reference only. `MAINNET_ACTIVATION.enabled` is intentionally `false`, and no action in this repository may issue BONDS, accept funds, custody assets, create customer accounts, claim USD parity, enable redemption, or route trades.

## 1. Purpose and launch boundary

This document defines the evidence and governance required to consider a future value-bearing Bonds Coin mainnet. It is not a launch authorization, legal opinion, prospectus, stablecoin disclosure, reserve attestation, or audit report. The purpose is to ensure that a codebase can never be mistaken for a complete mainnet program.

The intended product combines two separately governed domains: an independent network protocol and, if pursued, a USD-referenced token plus retirement product surfaces. The protocol cannot make a token maintain a USD value. Under the current U.S. framework, issuing a payment stablecoin requires a permitted issuer model and brings requirements addressing reserves, redemption, risk management, audits, reports, custody, applications, supervision, and capital/operational backstops.[1] A mainnet decision therefore requires business, regulatory, custody, and security evidence in addition to node software.

| Capability | Current repository state | Activation condition |
|---|---|---|
| Public P2P reference | Local, no-value testnet code; authenticated encrypted sessions and controlled peer admission | Independently operated persistent testnet, formal spec, threat-model review, load/chaos evidence |
| BONDS issuance | Disabled; no allocations, minting, or transactions | Permitted issuer authorization, reserve/custody contracts, auditable mint/burn control plane, governance approval |
| USD reference | Illustrative UI label only | Enforceable redemption policy, eligible reserves, independent attestation, approved disclosures, legal clearance |
| Vault and wallet | UX/control-boundary concepts only | Qualified custody, audited key management, reconciliation, recovery, customer support, monitoring |
| IRA product | Account-opening concept only | Qualified custodian, tax and retirement counsel, disclosures, suitability, recordkeeping, operations approval |
| Trading | Quote-preview UX only | Legal and venue analysis, custody, liquidity, surveillance, market-integrity controls, kill switch, audit |

## 2. Non-negotiable launch gates

Every gate below must be **green**, have a named accountable owner, and include independently reviewable evidence. A partial control, management intent, or passing unit test is not sufficient.

| ID | Gate | Evidence required | Accountable role | Current state |
|---|---|---|---|---|
| G-01 | Legal issuer authority | Written legal classification, permitted-issuer authorization or approved operating structure, jurisdiction map | General counsel | **Blocked** |
| G-02 | Reserve and redemption operations | Eligible-reserve policy, segregated account agreements, daily reconciliation design, redemption contract, failure-mode controls | Treasury / finance lead | **Blocked** |
| G-03 | Custody and wallet control | Qualified custody model, key ceremony, recovery policy, withdrawal controls, independent custody audit | Custody lead | **Blocked** |
| G-04 | Financial-crime controls | AML/CFT, sanctions, customer identification, transaction monitoring, escalation, records, independent testing | Compliance officer | **Blocked** |
| G-05 | Retirement operations | Qualified IRA custodian contract, tax reporting workflow, prohibited-transaction review, approved disclosures | IRA product lead | **Blocked** |
| G-06 | Consensus specification | Versioned protocol specification, deterministic test vectors, independent implementation review, governance policy | Protocol lead | **Blocked** |
| G-07 | Network security | Replay, eclipse, Sybil, DoS, partition, reorganization, and upgrade hardening with test evidence | Network security lead | **Partial** |
| G-08 | Node reliability | Persistent storage design, backup/restore drill, monitoring, alerting, capacity plan, disaster recovery | Reliability lead | **Blocked** |
| G-09 | Supply-chain integrity | Reproducible builds, signed releases, SBOM, protected branches, CI attestations, secret controls | Release engineering lead | **Blocked** |
| G-10 | Independent audits | Protocol, cryptography, P2P, storage, custody, web/API, infrastructure, and operational audits plus retests | Security lead | **Blocked** |
| G-11 | Customer protection | Clear risk disclosures, complaints, privacy, accessibility, incident communications, support escalation | Product risk lead | **Blocked** |
| G-12 | Launch governance | Board/authorized-governance decision, go/no-go record, emergency pause policy, named incident command | Executive sponsor | **Blocked** |

> The OCC’s proposed GENIUS Act regulations describe requirements related to reserve assets, redemption, risk management, audits, reports, custody, issuer applications, supervision, and capital/operational backstops. A technical mainnet alone cannot satisfy these operating gates.[1]

## 3. Mainnet architecture package

The future architecture must separate the protocol, regulated issuance operations, custody, customer applications, and observability. No service should combine customer private-key access, reserve movement, mint authority, and public-node duties in a single trust domain.

| Domain | Mainnet target architecture | Mandatory isolation |
|---|---|---|
| Consensus nodes | Independently operated nodes with signed releases, encrypted authenticated transport, data snapshots, telemetry, and strict resource limits | Nodes must not carry customer keys, reserve access, or unrestricted mint authority |
| Bootstrap and upgrades | Offline-root or threshold-controlled authority, signed peer registries, versioned manifests, emergency revocation, compatibility policy | Bootstrap signing must be separated from routine node operations |
| Issuance control plane | Multi-party approved mint/burn requests, policy engine, reserve/reconciliation check, immutable audit log, emergency disable | Must be separate from the public node and require independent custody/treasury evidence |
| Custody | Segregated customer and treasury arrangements, hardware-backed or threshold key operations, recovery ceremonies, monitoring | Customer custody must be distinct from protocol identities and developer access |
| Reserve evidence | Reconciled ledger, third-party data feeds, attestation process, customer-facing status with stale-data fail-closed behavior | Reserve system must not trust frontend values or self-reported node state |
| Explorer and APIs | Read-only replicated indexers, rate limits, privacy filters, proof/verification endpoints, abuse monitoring | Must not accept private keys, credentials, or administrative commands |
| Operations | SIEM, metrics, logs, alerting, on-call coverage, backup/restore, change control, incident command | Operational access must be least-privilege, reviewed, and recorded |

## 4. Controlled rollout ladder

The rollout sequence is deliberately conservative. A stage may not be skipped because it is convenient, commercially desirable, or technically difficult.

| Stage | Allowed activity | Exit evidence | Prohibited activity |
|---|---|---|---|
| 0 — Reference | Local no-value development and automated tests | Threat model, reproducible test instructions, no-value boundary | Persistent public service, tokens, customer data |
| 1 — Isolated testnet | Multi-operator nodes in a closed environment, signed manifests, monitoring, fault injection | Network reliability report, backup/restore drill, security review findings | Token value, public custody, customer onboarding |
| 2 — Public testnet | Publicly reachable no-value nodes, vulnerability reporting, telemetry, reset policy, adversarial exercises | Third-party penetration test, protocol review, remediation retest | Mainnet claims, redeemable tokens, reserve assertions |
| 3 — Pre-launch review | External audits, legal/issuer/custody/reserve readiness, governance simulations | Every G-01 through G-12 green with decision record | Issuance or public financial marketing |
| 4 — Mainnet activation | Only after authorized governance approval and all external evidence is validated | Signed launch record, immutable release tag, operational handoff | Unapproved feature expansion or bypassing controls |

## 5. Operational runbooks required before Stage 2

The following runbooks must be written, tabletop-tested, and assigned to on-call owners before a public testnet. Each procedure needs timestamps, decision authority, communications guidance, customer-impact classification, and an evidence-retention policy.

| Runbook | Minimum scenario |
|---|---|
| Node compromise | Revoke node identity, remove bootstrap record, rotate authority material, preserve forensic evidence |
| Network partition | Detect divergent tips, pause upgrades, evaluate reorganization evidence, publish network status |
| Critical vulnerability | Triage, contain, coordinate disclosure, release signed patch, confirm adoption and retest |
| State corruption | Stop affected node, restore from verified snapshot, compare state root, document recovery |
| Abuse/DDoS | Apply rate limits and bans, escalate to infrastructure provider, preserve logs, verify recovery |
| Reserve or redemption incident | Freeze issuance/redemption, reconcile data, notify accountable leaders, follow legally approved communications |
| Key compromise | Disable affected authority, invoke threshold recovery, rotate credentials, conduct post-incident review |

## 6. External evidence and audit package

The audit package must include source revision hashes, deterministic build instructions, SBOM, genesis manifest, protocol specification, threat model, test corpus, fuzz seeds, multi-node logs, upgrade process, operations runbooks, known issues, and a remediation tracker. A mainnet audit must include retesting of resolved findings; a report that merely lists open findings is not a launch gate.

The financial-control package must separately include issuer authorization, reserve and redemption documentation, custody agreements, reconciliation design, policies for sanctions and AML/CFT, independent test evidence, privacy and customer-protection materials, and a reviewed operating model. FinCEN’s April 2026 proposal states that permitted payment stablecoin issuers would be subject to financial-institution requirements concerning money-laundering prevention and would need an effective sanctions compliance program.[2]

## 7. Current decision

**Mainnet status: not eligible for activation.** The current code is a useful no-value reference, not a mainnet candidate. It lacks the independent audits, persistent operations, legal authorization, reserve and redemption arrangements, custody operations, compliance program, upgrade governance, durable peer-reputation system, global resource quotas, authority-key rotation and revocation, and release-integrity controls required by the gate framework.

No user-facing interface may be changed to imply that BONDS is live, USD-pegged, redeemable, collateralized, IRS-approved, insured, or available for investment unless the corresponding legal, operational, and audit evidence is complete and the launch governance decision is recorded.

The provider-neutral diligence process and request-for-information materials are maintained in [`PARTNER_ENGAGEMENT_PACKAGE.md`](./PARTNER_ENGAGEMENT_PACKAGE.md). That package does not select, retain, pay, or authorize any provider.

## References

[1] [OCC, *GENIUS Act Regulations: Notice of Proposed Rulemaking* (February 25, 2026)](https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-3.html)

[2] [FinCEN, *Treasury Proposes Rule To Implement the GENIUS Act’s Requirements to Counter Illicit Finance* (April 8, 2026)](https://www.fincen.gov/news/news-releases/treasury-proposes-rule-implement-genius-acts-requirements-counter-illicit)
