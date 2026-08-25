# Bonds Coin Public Testnet Threat Model

> **Version:** 0.2 — testnet reference baseline with secure-transport controls
> **Scope:** `bondscoin-testnet/` only
> **Security status:** Design and test artifact; **not** an independent audit or a production authorization.

## 1. Purpose and scope

This threat model documents the security properties, trust boundaries, threats, mitigations, evidence, and unresolved risks of the no-value Bonds Coin public-testnet reference node. NIST defines threat modeling as a form of risk assessment that models attack and defense aspects of a logical entity, such as data, an application, a host, a system, or an environment.[1] This document uses that approach to make the current reference-node boundary explicit and to create auditable release gates.

The reference node has a deliberately narrow role. It maintains a deterministic empty chain, relays empty blocks between authenticated local test peers, persists a checksummed snapshot, and rejects malformed or oversized messages. It does **not** accept transactions, create allocations, issue BONDS, store customer assets, provide a wallet, establish custody, prove reserves, process IRA activity, or route trades.

| In scope | Explicitly out of scope |
|---|---|
| Genesis manifest, proof-of-work reference, difficulty adjustment, chain-work selection, bounded reorganization policy | Any live BONDS issuance, USD redemption, collateral or reserve operations |
| Peer identity, signed bootstrap records, encrypted authenticated session, TCP framing, parser limits, per-socket rate gate, and in-process peer penalties | Customer custody, private-key recovery, wallet UX, deposits, withdrawals, payment processing |
| Snapshot durability, recovery behavior, no-value tests, local three-node demonstration | Public persistent node operation, durable peer reputation, public discovery, exchange or DEX execution |
| Repository integrity, release controls, test evidence, audit handoff | Any assurance that an independent audit has occurred or that this code is ready for value-bearing use |

## 2. Security objectives and assumptions

The design prioritizes **chain-integrity experimentation** and **safe failure** over availability or commercial functionality. The primary objectives are that all nodes recognize the same genesis, only structurally valid empty blocks can extend a known parent, the heaviest valid branch is selected within a bounded reorganization policy, unauthenticated peers are rejected, malformed traffic is contained, and recoverable state remains detectable after a failed write.

The testnet assumes that the bootstrap authority key is distributed out of band to each controlled node, local host networking is available for the demonstration, Node.js and the operating system are trusted within the test environment, and no adversary has authority over the source repository or release signing process. These assumptions are deliberately unsuitable for a public value-bearing system and must be revisited before any persistent testnet deployment.

## 3. Architecture and trust boundaries

The reference implementation uses a static genesis manifest and a chain object in process memory. The network boundary is a TCP socket that accepts newline-delimited JSON envelopes. A peer must present an Ed25519-signed `SECURE_HELLO` message whose public key matches a valid, authority-signed bootstrap record. Each accepted handshake presents a fresh X25519 ephemeral key and nonce; the node rejects a replayed nonce for its in-process lifetime. Application messages are then carried only in AES-256-GCM encrypted, sequence-bound `SECURE_DATA` envelopes. The state boundary is a checksummed snapshot written through a temporary path, `fsync`, and atomic rename.[3]

> Bitcoin’s P2P documentation describes TCP communication and message containers with explicit type and payload-length framing. Bonds Coin does not copy that protocol; it uses the reference to justify treating message framing, byte bounds, and network identity as first-class trust boundaries.[2]

| Boundary | Data crossing it | Required control | Current status |
|---|---|---|---|
| Release → node | Genesis constants, source code, authority public key | Reproducible release, signed artifact, independent hash verification | **Partial** — deterministic manifest exists; signed release process is not implemented |
| Bootstrap authority → node | Peer endpoint, node ID, public key, expiry, signature | Authority-key pinning, signature verification, expiry, host/port validation, revocation | **Partial** — signature, identity binding, and expiry exist; revocation and strict endpoint validation do not |
| Peer socket → protocol parser | `SECURE_HELLO` and encrypted sequence-bound `SECURE_DATA` envelopes | Size limit, strict schema, authentication, freshness, replay cache, rate limits, and ban/score policy | **Partial** — encrypted handshake, nonce cache, sequencing, bounds, and temporary in-process penalties exist; schema validation, durable scoring, and global quotas do not |
| Protocol → chain state | Empty blocks and parent references | Chain ID, version, timestamp, proof, difficulty, chain-work, reorg limit | **Partial** — all listed reference checks exist; formal specification and adversarial validation do not |
| Chain state → disk | Snapshot and tip state | Integrity checksum, atomic write, directory sync, recovery test, backup lifecycle | **Partial** — checksum and crash-recovery test exist; snapshots, backups, encryption, and rollback protection do not |
| Operator → node | Test configuration and logs | Least privilege, secrets handling, monitoring, change approval, incident response | **Missing** — no operations platform is deployed |

## 4. Assets and security properties

| Asset | Required property | Consequence if violated |
|---|---|---|
| Genesis manifest and chain ID | Deterministic, immutable, independently reproducible | Nodes may join different networks or accept incompatible histories |
| Chain work and tip selection | Correct validation and heaviest-chain selection within policy | Conflicting histories, incorrect chain view, or unstable reorganization behavior |
| Bootstrap authority key | Authentic, pinned, rotation-controlled | Attackers can introduce malicious peers or partition honest nodes |
| Node identity keys | Confidential private material; verifiable public identity | Spoofed peers, loss of admission control, or impersonation |
| P2P parser and resource budget | Bounded CPU, memory, socket, and disk consumption | Denial of service or process instability |
| Snapshot state | Integrity, atomicity, recoverability | Silent chain corruption, rollback, or loss of availability |
| Repository and build artifacts | Reviewed, traceable, reproducible | Supply-chain compromise or unreviewed consensus change |
| Operator telemetry and incident records | Accurate, privacy-minimized, durable | Undetected attacks or unsafe incident response |

## 5. Threat register

Residual ratings are for the **current testnet reference**, not a production system. “Blocked” means the function is intentionally unavailable; it is not a replacement for an operational control.

| ID | Threat scenario | Primary impact | Current mitigation | Evidence / test | Residual risk and required gate |
|---|---|---|---|---|---|
| TM-01 | Genesis or chain ID changes without coordinated release | Split network | Fixed constants and canonical manifest | `deterministic genesis` test | **Medium.** Add signed release artifacts, CI reproducibility, and independent genesis verification |
| TM-02 | Cross-network block or protocol downgrade | Invalid state acceptance | Chain ID and protocol version validation | Core block validator | **Low–medium.** Add negotiated version policy and downgrade test cases |
| TM-03 | Timestamp manipulation changes adjustment behavior | Chain-work distortion | Monotonic timestamps and two-minute future bound | Reorganization fixture | **Medium.** Add property tests over adjustment windows, median-time policy, and clock-skew simulation |
| TM-04 | Attacker presents a heavier competing fork | Reorganization or chain instability | Cumulative work selection and `MAX_REORG_DEPTH` policy | `chain chooses cumulative work` test | **High.** Reference PoW is intentionally weak; no public value-bearing use until consensus review and economic threat analysis |
| TM-05 | Deep reorganization with expensive replay | State rollback or availability loss | Bounded tip-switch policy and reorg events | Core event recording | **Medium.** Add explicit fork-pruning, wallet finality policy, long-reorg chaos tests, and alerting |
| TM-06 | Invalid or malformed block body | Consensus bug or resource abuse | Empty transactions/allocations only, hash and proof checks | Core validator; fuzz parser test | **Medium.** Add structured block fuzzing, mutation corpus, and independent parser audit |
| TM-07 | Spoofed node identity | Unauthorized peer access | Ed25519-signed secure handshake, node-ID/public-key binding, signed bootstrap records, and X25519 ephemeral keys | Authenticated encrypted two-node relay test | **Medium.** Add key rotation, revocation policy, and independent protocol review |
| TM-08 | Replay of a valid authenticated handshake | Unauthorized or duplicated session | Process-local nonce replay cache, signed ephemeral key material, strict secure-message sequence | Replay and secure-sequence tests | **Medium.** Replay cache is process-local; add persistent/revocation-aware replay policy and external review before public operation |
| TM-09 | Compromised bootstrap authority key | Eclipse, Sybil admission, or partition | Authority public-key pinning and signed records | Peer-record verification path | **High.** Require offline root, threshold signing, rotation/revocation, emergency distribution, and external audit |
| TM-10 | Eclipse/Sybil attack via many valid or compromised peers | Censored view of network | Controlled signed bootstrap list and temporary in-process peer penalties | Local three-node demo and peer-score test | **High.** Add diverse peer selection, durable reputation, quotas, authority rotation, and adversarial network simulation |
| TM-11 | Oversized or malformed wire input | Memory, parser, or CPU denial of service | 64 KiB bound, message type allowlist, exception close | 1,000-sample malformed-input test | **Medium.** Add schema validator, line-fragment fuzzing, decompression prohibition, load test, and metrics |
| TM-12 | Connection or message flood | Socket exhaustion and availability loss | Handshake timeout, 60-message/second socket gate, in-process peer penalty and temporary ban | Peer-penalty test | **Medium.** Add global quotas, IP/subnet limits, durable scoring, OS tuning, and DDoS service plan |
| TM-13 | Unencrypted TCP manipulation or metadata exposure | Traffic observation, tampering, peer privacy loss | Signed ephemeral X25519 handshake and AES-256-GCM encrypted sequence-bound payloads | Secure-channel confidentiality and replay-sequence test | **Medium.** Add transport versioning, key rotation, independent cryptographic review, and privacy review |
| TM-14 | Disk corruption or interrupted write | Corrupt local chain state | Checksum, temporary file, `fsync`, rename, alternate-slot recovery | `checksummed state recovers` test | **Medium.** Add power-loss faults across all write boundaries, snapshots, encrypted backups, and rollback detection |
| TM-15 | State exhaustion from blocks or forks | Disk/memory depletion | No-value blocks only; no mempool | Reference constraints | **High.** Add pruning, quotas, bounded orphan pool, compaction, telemetry, and retention policy |
| TM-16 | Private key leakage from local node | Peer impersonation | No persistent key store in reference demo | No current test | **High.** Require hardware or multi-party key controls, encrypted secrets, rotation/revocation, and compromise playbook |
| TM-17 | Build or dependency compromise | Malicious consensus or P2P behavior | Minimal runtime dependency surface | Repository review only | **High.** Add locked dependencies, SBOM, artifact signing, branch protection, reproducible builds, and CI attestations |
| TM-18 | Vulnerability disclosure is mishandled | Extended exposure | Repository-level security policy | `SECURITY.md` | **Medium.** Establish monitored intake, SLA, safe harbor, triage owner, and coordinated disclosure procedure |
| TM-19 | Operator mistake or unsafe configuration | Network split, data loss, exposure | No persistent deployment exists | Not applicable | **High.** Create runbooks, staged change control, backup/restore drills, least privilege, and incident command roles |
| TM-20 | User interprets testnet or UI as financial product | Consumer or legal harm | Explicit no-value notice and blocked issuance | README and product UI | **Medium.** Legal review, approved disclosures, jurisdiction controls, and removal of ambiguous marketing before public outreach |

## 6. Test and evidence matrix

Current tests demonstrate only narrow technical properties. A passing test does not imply security assurance outside the tested condition.

| Evidence | Threats addressed | Current result | Required next evidence |
|---|---|---|---|
| Deterministic genesis test | TM-01, TM-02 | Verifies reproducible hash and empty allocations | Independent rebuild in clean environment and signed release manifest |
| Cumulative-work/reorganization test | TM-03, TM-04, TM-05 | Verifies a short competing branch can become tip and emits a reorg event | Property tests, differential implementation, long-chain and boundary reorg scenarios |
| Crash-recovery test | TM-14 | Recovers from a corrupt primary using checksum-valid temporary data | Fault injection before/after rename and directory sync; backup/restore drill |
| Authenticated encrypted peer relay | TM-07, TM-09, TM-10, TM-13 | Controlled peers exchange one empty block only after secure session establishment | Invalid signature, expired record, wrong key, replay, eclipse, and partition scenarios |
| Replay and secure-sequence tests | TM-08, TM-13 | Rejects a repeated handshake nonce and repeated encrypted envelope sequence | Persistent replay cache, adversarial clock handling, and transport-interoperability test vectors |
| Peer-score test | TM-12 | Repeated severe protocol penalties result in a temporary local ban | Durable distributed reputation, global resource and subnet quotas |
| Parser fuzz test | TM-06, TM-11 | Rejects 1,000 random malformed samples and over-limit line | Coverage-guided fuzzing, fragmentation corpus, sanitizer runs, and resource profiling |
| Three-node demo | TM-10, TM-12, TM-19 | Three local nodes share a tip and terminate cleanly | Persistent isolated testnet, monitoring, network chaos, and operations exercise |

## 7. Required audit packages

The next independent review must not rely solely on this document. It should receive the source revision, deterministic build instructions, genesis manifest, protocol specification, threat register, test corpus, CI logs, known-issues list, architecture diagram, and a maintained list of operational assumptions. The review should separately examine consensus correctness, P2P abuse resistance, cryptographic key lifecycle, disk recovery, release engineering, web surfaces, and planned operational controls.

No live BONDS issuance, reserve representation, wallet balance, custody function, customer account, payment, redemption, or trading function may be introduced based on this threat model alone. Those functions remain separate legal, operational, and security programs.

## 8. Decision record and ownership

| Gate | Accountable role | Evidence required | Status |
|---|---|---|---|
| Threat model approved | Security lead | Reviewed threat register and accepted residual-risk record | Open |
| Consensus specification | Protocol lead | Formal protocol document and test vectors | Open |
| P2P hardening | Network security lead | Replay, Sybil, eclipse, flood, and encrypted-transport test evidence | Open |
| State durability | Reliability lead | Chaos tests, backup/restore drill, retention and rollback policy | Open |
| Supply-chain controls | Release engineering lead | SBOM, signed artifacts, reproducible build, CI attestations | Open |
| Independent audit | External auditor | Scope, findings, remediation, and retest report | Open |
| Value-bearing product approval | Legal, compliance, custody, and executive owners | Separate issuance, reserve, redemption, and customer-protection approvals | Blocked by design |

## References

[1] [NIST SP 800-154, *Guide to Data-Centric System Threat Modeling*](https://csrc.nist.gov/pubs/sp/800/154/ipd)

[2] [Bitcoin Developer Documentation, *P2P Network*](https://developer.bitcoin.org/reference/p2p_networking.html)

[3] [Node.js Documentation, *Crypto*](https://nodejs.org/api/crypto.html)
