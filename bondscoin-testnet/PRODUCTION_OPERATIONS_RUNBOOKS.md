# Production Operations Dry-Run Runbooks and Evidence Register

> **Training and readiness only.** These runbooks are designed for tabletop exercises and control validation. They do not authorize token issuance, reserve funding, redemption, custody, customer onboarding, asset movement, screening, reporting, audit engagement, or production deployment. A future live procedure must be separately approved by qualified counsel, the accountable operating owner, and the user at the exact-action level.

## 1. Shared runbook rules

Every dry run must use synthetic scenarios only: no actual customers, funds, wallets, accounts, private keys, sanctions-list matches, or provider credentials. The facilitator must record the scenario, participants, start/end time, decisions, evidence created, open issues, and remediation owner. A failed drill, missing owner, unavailable evidence, or untested escalation path keeps the associated readiness gate red.

| Rule | Required behavior |
|---|---|
| Dual control | No participant may initiate and approve the same simulated financial, custody, compliance, or release decision. |
| Fail closed | If legal authority, policy, evidence, monitoring, or accountable ownership is missing, the simulated action is denied or paused. |
| Immutable record | Each simulated decision receives a unique ID, timestamp, owner, reviewer, and retained evidence location. |
| Escalation | Material exception, policy conflict, suspected compromise, or customer-impact scenario escalates to the designated incident commander and governance owner. |
| No invented status | A simulation result must not be represented as a completed reserve, audit, custody, or compliance control. |

## 2. Evidence-register template

| Field | Required entry |
|---|---|
| Evidence ID | Unique, non-reused identifier (for example `EV-P03-0001`) |
| Gate/control | G-01–G-12 or P-01–P-09, plus control name |
| Description | What the evidence demonstrates and its known limitations |
| Source and owner | Named accountable individual or organization; source-system or document location |
| Date and version | Date created, effective period, document/build version, and expiry/retest date |
| Reviewer and result | Independent reviewer, approval/qualification/rejection result, and review date |
| Exceptions | Open exceptions, severity, risk owner, remediation target, and acceptance authority |
| Integrity | Hash, signature, access-control record, or other integrity reference where appropriate |
| Disclosure classification | Public, confidential, restricted, or legally privileged; distribution list |

## 3. DR-01 — reserve-reconciliation exception drill

**Purpose.** Validate that a future treasury function can detect, contain, document, and escalate a mismatch without concealing it or treating a reserve assertion as proven.

| Step | Dry-run action | Required evidence | Failure condition |
|---:|---|---|---|
| 1 | Inject a synthetic mismatch between a mock issuance-liability ledger and a mock custodian/bank statement. | Scenario seed; mock ledger; mock statement | Scenario uses actual account data or assets. |
| 2 | Independent reconciler identifies and classifies the variance by source, age, and potential impact. | Reconciliation worksheet; classification record | Reconciler is also sole treasury approver. |
| 3 | Treasury owner freezes the **simulated** issuance/redemption workflow and opens an exception. | Exception record; simulated pause record | Any actual feature, contract, or payment is changed. |
| 4 | Governance owner determines whether legal, custody, accounting, or provider escalation would be required in a live event. | Escalation decision; roles matrix | Decision is made without accountable owner or evidence. |
| 5 | Independent reviewer verifies root-cause analysis and corrective-action owner. | Review record; remediation plan | Issue is closed without independent review. |

## 4. DR-02 — redemption-service interruption drill

**Purpose.** Validate a future response to a synthetic liquidity, custody, banking, compliance, or technical interruption without advertising or performing redemption.

| Step | Dry-run action | Required evidence | Failure condition |
|---:|---|---|---|
| 1 | Create a synthetic redemption request in an isolated worksheet. | Synthetic request identifier; scenario declaration | Real customer information, wallet, or funds are used. |
| 2 | Validate that each required dependency is represented: terms, eligibility, compliance disposition, available liquidity, custody availability, and dual approval. | Dependency checklist | Missing dependency is silently assumed satisfied. |
| 3 | Simulate one unavailable dependency and invoke the pause/notice/escalation path. | Simulated incident ticket; timeline | Staff attempt a workaround outside documented authority. |
| 4 | Draft a plainly worded **internal-only** communications note describing the reason, owner, next review time, and customer-protection concerns. | Internal communications draft | External statement is published without legal/comms approval. |
| 5 | Record recovery prerequisites and test re-entry criteria. | Recovery checklist; governance sign-off | Simulation resumes without verified remediation. |

## 5. DR-03 — custody or key-governance anomaly drill

**Purpose.** Validate that future custody design fails closed on suspected compromise, unauthorized access, missing attestation, or recovery-control failure.

| Step | Dry-run action | Required evidence | Failure condition |
|---:|---|---|---|
| 1 | Simulate an anomalous signing request or missing access-review record using placeholder identities. | Synthetic event; access-review gap record | Real keys, wallet addresses, or custody credentials are used. |
| 2 | Confirm the simulated dual-control and escalation matrix rejects sole approval. | Authorization matrix; rejection record | One person is allowed to approve the simulation. |
| 3 | Invoke simulated authority disablement, forensic preservation, provider notification decision, and recovery review. | Incident log; handoff checklist | Any real credentials are changed without action-specific authority. |
| 4 | Conduct an independent review of root cause, affected scope, and proposed corrective controls. | Review memo; remediation tracker | Cause or scope is unrecorded. |
| 5 | Test only the documentation and approval sequence for a future recovery ceremony. | Tabletop record; signed attendee roles | Any production key ceremony or wallet creation is performed. |

## 6. DR-04 — compliance and sanctions-control drill

**Purpose.** Validate governance, decision logging, escalation, and recordkeeping around a **synthetic** high-risk alert. OFAC describes risk-based sanctions compliance and recordkeeping/reporting obligations for virtual-currency activities; counsel and the compliance owner must tailor the live program to the actual entity and jurisdiction.[1]

| Step | Dry-run action | Required evidence | Failure condition |
|---:|---|---|---|
| 1 | Generate a synthetic alert with no real person, entity, wallet, or list data. | Scenario declaration; synthetic alert | Screening of a real person, account, or wallet occurs without authority. |
| 2 | Independent analyst records rationale, required information, and disposition options. | Case worksheet; policy reference | Alert is closed without documented rationale. |
| 3 | Compliance owner determines whether a live scenario would require hold, reject, block, report, legal escalation, or additional investigation. | Escalation decision record | Operating staff override compliance authority. |
| 4 | Test retention, access-control, and management-reporting requirements for the mock case. | Retention/access test; management report | Mock case contains real personal or confidential data. |
| 5 | Independent tester samples the case for completeness and policy conformance. | QA test result; remediation log | Compliance control is self-certified without independent review. |

## 7. DR-05 — independent-assurance readiness drill

**Purpose.** Validate that the audit handoff is complete, scoped, independent, and does not overstate a limited procedure as a full audit.

| Step | Dry-run action | Required evidence | Failure condition |
|---:|---|---|---|
| 1 | Assemble a mock evidence package aligned to an intended scope: reserve controls, custody, compliance, security, or resilience. | Index; evidence register export; scope map | Scope and evidence limitations are not disclosed. |
| 2 | Collect a mock independence/conflict disclosure for the assurance provider. | Independence checklist | Provider is asked to design, operate, and attest to the same control without safeguards. |
| 3 | Map each evidence item to a control, owner, period, source, reviewer, and exception status. | Traceability matrix | A control is marked complete from management assertion alone. |
| 4 | Simulate a material finding, remediation plan, retest, and governance risk-acceptance decision. | Finding record; retest plan; approval record | A finding is closed without retest or authorized acceptance. |
| 5 | Review all public statements for scope, dates, qualifications, and prohibited claims. | Disclosure review log | Any statement implies audited or reserve-backed status without final applicable evidence. |

## 8. DR-06 — production incident and recovery drill

**Purpose.** Exercise a no-value node or future-production incident process using the NIST CSF 2.0 lifecycle and NIST SP 800-61 Rev. 3 principles for prepared, risk-managed incident response.[2] [3]

| Step | Dry-run action | Required evidence | Failure condition |
|---:|---|---|---|
| 1 | Simulate a critical node compromise, data corruption, dependency outage, or network partition. | Scenario seed; incident declaration | A live network is modified solely for the drill. |
| 2 | Assign incident commander, technical lead, communications lead, legal/compliance liaison, and scribe. | Role assignment; timestamped log | Incident command lacks named, distinct roles. |
| 3 | Simulate containment, evidence preservation, stakeholder notification decision, recovery/rollback, and post-incident review. | Timeline; decision records; recovery checklist | Evidence is overwritten or recovery is untested. |
| 4 | Validate backup and restore procedures against synthetic or no-value state only. | Restore-drill report; state-consistency check | Customer or production data is used without authority. |
| 5 | Record lessons, owners, deadlines, retest evidence, and governance review. | Postmortem; remediation tracker | Incident is declared closed without accountability. |

## 9. DR-07 — secure release and rollback drill

**Purpose.** Validate that future software changes have provenance, independent review, staged promotion, rollback readiness, and vulnerability-response evidence. NIST’s SSDF organizes secure-development practices around preparing the organization, protecting software, producing well-secured software, and responding to vulnerabilities.[4]

| Step | Dry-run action | Required evidence | Failure condition |
|---:|---|---|---|
| 1 | Select a no-value testnet commit and produce a reproducible build candidate. | Commit hash; build instructions; build output hash | A production deployment is triggered. |
| 2 | Generate mock SBOM, dependency, license, test, and security-review records. | SBOM; CI results; review approvals | Build provenance is missing or unverifiable. |
| 3 | Simulate a staged release, health-check failure, and rollback decision. | Staging record; rollback log | Release author is sole production approver. |
| 4 | Open a mock vulnerability and perform severity, remediation, retest, and disclosure-decision workflow. | Vulnerability record; retest evidence | No remediation owner or due date is assigned. |

## 10. Provider handoff package

An approved provider RFI or eventual engagement package should contain only the minimum public or expressly approved material necessary for the requested scope.

| Package element | Permitted status before user approval | Additional control before external sharing |
|---|---|---|
| Public source code and no-value testnet documents | May be identified as public references | Confirm recipient and RFI scope |
| Threat model, readiness documents, and runbooks | May be identified as public references | Redact internal-only annotations and confirm scope |
| Architecture, legal, reserve, custody, customer, audit, security, and operational data | Not shareable by default | User-approved disclosure inventory, data owner, legal review, secure exchange |
| Private keys, credentials, account information, customer data, reserve information, incident forensics | Never shareable through an RFI | Separate controlled process with named legal authority and data-handling agreement |

## 11. Current decision

All procedures are **dry-run only**. A completed exercise proves only that a documented simulation occurred; it does not prove legal authority, customer readiness, reserve adequacy, custody fitness, compliance sufficiency, audit completion, or mainnet eligibility.

## References

[1] [OFAC, *Sanctions Compliance Guidance for the Virtual Currency Industry* (October 15, 2021)](https://ofac.treasury.gov/media/913571/download?inline)

[2] [NIST, *The Cybersecurity Framework (CSF) 2.0* (February 26, 2024)](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf)

[3] [NIST SP 800-61 Rev. 3, *Incident Response Recommendations and Considerations for Cybersecurity Risk Management* (April 2025)](https://csrc.nist.gov/pubs/sp/800/61/r3/final)

[4] [NIST, *Secure Software Development Framework (SSDF)*](https://csrc.nist.gov/projects/ssdf)
