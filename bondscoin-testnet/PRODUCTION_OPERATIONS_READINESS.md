# Bonds Coin Production Operations Readiness Framework

> **Draft operating framework — not an operating authorization.** The current Bonds Coin system remains a no-value reference testnet. This document does not create an issuer, reserve, bank account, custody account, customer relationship, wallet, redemption right, compliance program, audit engagement, or live production service. It defines the design, evidence, ownership, and action-level approvals required before any such activity can be considered.

## 1. Non-negotiable operating boundary

`MAINNET_ACTIVATION.enabled` remains `false`. No allocation, customer balance, issuance, transfer, custody, reserve claim, USD-parity claim, redemption, trading, IRA account, or customer onboarding function may be activated under this framework.

The stated legal authorization has not been independently verified and no issuer entity, jurisdiction, regulatory approval, reserve arrangement, or provider contract has been supplied. Accordingly, every live-operating field below is intentionally marked **unverified** until qualified counsel and the accountable operating owner provide written evidence.

The OCC’s proposed implementation framework covers issuer activities, reserve assets, redemption, risk management, audits, reports, custody, applications, supervision, and capital/operational backstops.[1] FinCEN’s April 2026 notice is a proposed rulemaking for permitted payment-stablecoin issuer AML/CFT and sanctions-compliance programs.[2] These sources guide the control inventory; they do not establish that Bonds Coin is permitted to issue a payment stablecoin.

## 2. Preconditions and execution gates

| Gate | Minimum evidence required | Current state | What remains prohibited until the gate is green |
|---|---|---|---|
| P-01 Issuer authority | Identified legal entity, governing documents, beneficial ownership, target jurisdictions, written legal analysis, required approvals/registrations | Unverified | Issuance, marketing, customer contracting, reserve holding, redemption |
| P-02 Product and disclosure approval | Counsel-approved product terms, risk disclosures, customer agreements, complaint process, marketing review, jurisdiction restrictions | Unverified | Any public product claim, dollar-stability claim, or customer solicitation |
| P-03 Reserve governance | Board-approved reserve policy, eligible-assets schedule, segregation design, valuation/reconciliation method, concentration/liquidity limits, independent oversight | Unverified | Reserve claim, mint authority, redemption promise, reserve investment |
| P-04 Redemption operations | Approved redemption terms, identity/eligibility process, sanctions/AML controls, cut-off and service levels, exception handling, liquidity stress tests | Unverified | Customer redemptions or dollar-conversion statements |
| P-05 Qualified custody | Legal/counsel confirmation of custody model; signed provider agreement; segregation, keys, recovery, insolvency, and control evidence | Unverified | Customer assets, private-key management, production wallets, treasury movement |
| P-06 AML/CFT and sanctions | Risk assessment, accountable compliance officer, customer and transaction-control design, escalation, reporting, testing, training, recordkeeping | Unverified | Onboarding, transfers, redemptions, or financial-service access |
| P-07 Independent assurance | Independence confirmation, approved scope, evidence plan, remediation/retest process, board/audit-committee oversight | Unverified | Claims of audited reserves, secure code, compliant operations, or production readiness |
| P-08 Production reliability | Verified operators, signed releases/SBOM, monitoring, backups, incident response, drills, recovery objectives, change control | Unverified | Persistent public deployment or mainnet activation |
| P-09 Governance approval | Complete evidence register, exceptions register, risk acceptance record, and formal documented go/no-go decision | Unverified | Any value-bearing launch or pilot |

## 3. Target operating model

The design separates issuer, reserve, custody, compliance, assurance, and operations authority. No individual or vendor may independently create tokens, move reserve assets, approve a redemption, alter sanctions controls, certify reserves, or authorize a release. Segregation of duties must be enforced technically and contractually.

| Control domain | Accountable role to appoint | Minimum separation requirement | Required evidence |
|---|---|---|---|
| Issuer governance | Board or delegated governing body | Cannot hold sole reserve, custody, compliance, and audit authority | Charter, delegation matrix, minutes, conflicts register |
| Reserve oversight | Treasury/reserve officer | Cannot be the sole signer for custody movements or reserve attester | Reserve policy, limits, daily reconciliation, exceptions log |
| Redemption operations | Operations lead | Cannot approve own exceptions or override compliance holds | Terms, workflow, service levels, exception log, stress tests |
| Custody and key governance | Custody officer and qualified external custodian | Dual authorization; no developer-only production key access | Provider agreement, key policy, recovery test, access reviews |
| AML/CFT and sanctions | Independent compliance officer | Cannot report to sales or treasury for case disposition | Risk assessment, monitoring rules, case logs, training, testing |
| Financial assurance | Audit committee / independent assurance firm | Assurance provider cannot operate or manage the controlled process it attests to | Independence letter, scope, report, remediation evidence |
| Security and production | Head of security / SRE owner | Release author and production approver must be distinct | Threat model, SBOM, signed build, monitoring, drill reports |

## 4. Reserve and redemption control design

### 4.1 Reserve governance

Before any reserve-backed claim, the program must have a counsel-approved reserve policy specifying the legal owner, account titles, eligible assets, valuation source, liquidity horizon, issuer access, prohibited uses, segregation, reconciliation cadence, concentration limits, counterparty limits, and wind-down sequence. The policy must prohibit lending, rehypothecation, pledging, encumbrance, or affiliate transfers unless expressly permitted by law, disclosed, contractually controlled, and independently reviewed.

Daily reconciliation must compare, at minimum, authorized issuance liability, circulating supply if any, reserve ledger balance, custodian statements, bank statements, pending settlement items, blocked assets, and reconciliation exceptions. The control owner must not be the person who can unilaterally release assets. Reserve reports must state the period, scope, limitations, liabilities considered, and whether any balances are restricted, borrowed, encumbered, or held at third parties.

> **No proof-of-reserve shortcut.** The PCAOB warns that proof-of-reserve reports are inherently limited, are not audits, and may not address liabilities, borrowed assets, internal controls, governance, or continuing availability of assets.[3]

### 4.2 Redemption control

No redemption function exists today. A future, counsel-approved procedure must require: verified eligible request; legal and contractual basis; compliance disposition; confirmed available liquidity; dual operational approval; immutable event record; customer confirmation; settlement reconciliation; and daily exception review. A denied, delayed, partially fulfilled, or sanctions-restricted request must follow documented notice, escalation, reporting, and complaint procedures. Any exception affecting price, timing, eligibility, or service level must be reviewed outside the operations team.

## 5. Qualified custody and treasury-key design

A future custody design must establish whether the legal model is issuer treasury custody, customer asset custody, or both, and obtain counsel’s analysis before technical implementation. It must specify named legal entities, permitted assets, segregation, sub-custody, geographic and jurisdictional limits, insolvency treatment, key generation and recovery, authorization thresholds, device and access controls, logging, independent access reviews, incident notification, and audit rights.

Production signing authority must use a documented multi-party authorization policy. It must prohibit shared credentials, single-person recovery, developer-held customer keys, unlogged emergency access, and simultaneous authority to initiate and approve the same movement. Any future key ceremony must be independently witnessed, recorded, and tested—but no ceremony, wallet creation, or asset movement is authorized by this document.

## 6. AML/CFT, sanctions, privacy, and customer-protection controls

OFAC states that sanctions obligations apply equally to virtual-currency and traditional-fiat transactions and encourages a tailored, risk-based compliance program.[4] The program’s target design therefore requires management commitment, a documented risk assessment, controls, testing/auditing, training, sanctions-list and geographic screening, alert disposition, recordkeeping, escalation, and regulator-reporting pathways where applicable.

| Control objective | Future control design | Minimum evidence before any customer activity |
|---|---|---|
| Customer and counterparty eligibility | Counsel-approved jurisdiction, product, and risk rules; accountable decision owner | Legal matrix; policy; approved customer terms; exception authority |
| Sanctions screening and response | Risk-based screening, disposition rationale, hold/block/reject workflow, reporting and recordkeeping paths | Control design; test evidence; list-update procedures; case and escalation logs |
| Transaction monitoring | Calibrated scenarios, transparent risk rationale, human review, alert quality metrics, investigation record | Risk assessment; model/rule governance; sampling and QA plan; audit trail |
| AML/CFT governance | Appointed independent compliance lead, training, independent testing, board reporting | Appointment; risk assessment; policies; training/test schedule; reports |
| Privacy and data minimization | Minimum-necessary data, retention schedule, access controls, secure vendor exchange, breach response | Data map; legal basis; retention/destruction policy; access reviews |
| Complaints and vulnerable-customer safeguards | Plain-language disclosures, complaints log, escalation and remediation process | Approved disclosures; service procedures; management reporting |

No customer or wallet screening, identity collection, personal-data processing, blocking, or reporting activity may begin until applicable law, privacy basis, provider agreements, and accountable personnel are confirmed.

## 7. Independent assurance program

Independent assurance must be staged and must not be marketed as completed until the relevant report is final, its scope is disclosed, and material findings are remediated or formally risk-accepted by authorized governance.

| Assurance layer | Target scope | Required independence/evidence |
|---|---|---|
| Legal and regulatory review | Issuer model, product classification, jurisdiction, disclosures, redemption, custody, compliance obligations | Written engagement, conflicts check, signed legal analysis |
| Financial controls and reserve assurance | Reserve and liability reconciliation, valuation, custody evidence, reporting, exceptions, governance | Independent scope, method, report, remediation/retest evidence |
| Security audit | Consensus, P2P, cryptography, state, API/UI, keys, cloud, monitoring, incident response | Independent scope, threat model, findings, retest and disclosure decision |
| Compliance independent testing | Program design, screening/monitoring controls, escalation, training, recordkeeping | Independent test plan, sampled evidence, findings, remediation |
| Operational resilience assessment | Backups, recovery, communications, vendor dependencies, incident exercise | Exercise records, recovery objectives, gap log, management approval |

## 8. Production operations and security controls

The production program should use the NIST CSF 2.0 functions—Govern, Identify, Protect, Detect, Respond, and Recover—to organize its security and operational-risk profile.[5] NIST SP 800-61 Rev. 3 links incident-response planning to cybersecurity risk management, and NIST’s SSDF calls for secure-development preparation, software protection, secure production, and vulnerability response.[6] [7]

| Operating domain | Required control | Evidence to retain |
|---|---|---|
| Change management | Reviewed, reproducible, signed release; staged promotion; rollback plan; no direct production changes | Pull requests, approvals, build provenance, SBOM, release signatures, rollout log |
| Environment security | Segmented environments, least privilege, secrets management, hardened baseline, continuous access review | Asset inventory, access reviews, configuration baseline, secret-rotation log |
| Observability | Metrics, logs, traces, alerts, capacity/error thresholds, on-call ownership | Dashboard inventory, alert tests, retention policy, weekly review record |
| Backups and recovery | Encrypted backups, tested restoration, documented recovery targets and dependency map | Backup reports, restore-drill evidence, RTO/RPO approval, exception log |
| Incident response | Severity matrix, incident commander, containment, communications, forensics, lessons learned | Runbook, tabletop/drill reports, incident records, postmortems |
| Supplier management | Due diligence, criticality tiering, security obligations, outage escalation, exit plan | Supplier register, contracts, SOC/control evidence, continuity tests |
| Release and vulnerability response | Intake, severity, disclosure, remediation, retest, emergency change approval | Security advisories, remediation SLAs, retest reports, change records |

## 9. Evidence register and action-level approvals

The program must maintain an immutable evidence register. Each record must identify the control, owner, source, date, version, reviewer, result, exception, remediation owner, and expiry/retest date. An absent, stale, unverifiable, or materially qualified record keeps its linked gate red.

| Proposed action | Evidence that must exist first | Separate user confirmation required |
|---|---|---|
| Open a bank, reserve, or custody account | Legal entity, counsel approval, named institution, account purpose, authorized signers, data-sharing package | Yes — exact institution, account type, signers, terms, and consequences |
| Sign a provider contract or NDA | Approved recipient, conflicts, scope, fee schedule, data classification, legal review | Yes — exact counterparty, document, cost, term, and disclosure scope |
| Move or commit assets | Counsel-approved authority, reserve policy, named source/destination, amount, dual controls, settlement instructions | Yes — exact amount, asset, source, destination, timing, and irreversibility |
| Start customer onboarding or screening | Compliance program, privacy basis, named accountable officers, tested workflows, retention/disclosure terms | Yes — exact product, jurisdictions, data collected, providers, and customer impact |
| Issue, redeem, or market BONDS | Every G-01–G-12 and P-01–P-09 gate evidenced; governance decision; production readiness certificate | Yes — exact network, terms, supply, customer population, jurisdiction, and launch consequence |

## 10. Current decision

This document advances readiness documentation only. It does **not** authorize a production rollout, reserve funding, custody relationship, audit engagement, compliance operation, redemption service, or BONDS mainnet. The next eligible implementation step is user approval of a narrowly defined provider RFI wave and the information that may be shared—not operational execution.

Detailed tabletop procedures, evidence-register fields, and controlled provider-handoff boundaries are maintained in [`PRODUCTION_OPERATIONS_RUNBOOKS.md`](./PRODUCTION_OPERATIONS_RUNBOOKS.md).

## References

[1] [OCC, *GENIUS Act Regulations: Notice of Proposed Rulemaking* (February 25, 2026)](https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-3.html)

[2] [FinCEN, *Permitted Payment Stablecoin Issuer Anti-Money Laundering/Countering the Financing of Terrorism Program and Sanctions Compliance Program Requirements* (April 8, 2026)](https://www.fincen.gov/resources/statutes-regulations/federal-register-notices/permitted-payment-stablecoin-issuer-anti)

[3] [PCAOB, *Investor Advisory—Exercise Caution With Third-Party Verification/Proof of Reserve Reports* (March 8, 2023)](https://pcaobus.org/resources/information-for-investors/investor-advisories/investor-advisory-exercise-caution-with-third-party-verification-proof-of-reserve-reports)

[4] [OFAC, *Sanctions Compliance Guidance for the Virtual Currency Industry* (October 15, 2021)](https://ofac.treasury.gov/media/913571/download?inline)

[5] [NIST, *The Cybersecurity Framework (CSF) 2.0* (February 26, 2024)](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf)

[6] [NIST SP 800-61 Rev. 3, *Incident Response Recommendations and Considerations for Cybersecurity Risk Management* (April 2025)](https://csrc.nist.gov/pubs/sp/800/61/r3/final)

[7] [NIST, *Secure Software Development Framework (SSDF)*](https://csrc.nist.gov/projects/ssdf)
