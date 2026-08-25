# Tokenization, reserves, and settlement

## Token model
BONDS and BBCT are represented as fungible ledger units. Each unit can be assigned a deterministic serial-derived token ID and its metadata can be envelope-encrypted with AES-256-GCM. The encryption key must live in a KMS/HSM.

## 100 billion allocations
The sandbox bootstrap allocates:
- 100,000,000,000 BONDS units to the Vault
- 100,000,000,000 BBCT units to the Vault

These are **not asserted to be real USD-backed assets**. A production mint must remain disabled until independent reserve evidence, custody, issuer authority, redemption terms, and reconciliation are verified.

## USD-backed financial products
The system contains a reserve registry interface rather than inventing or purchasing financial products. Eligible reserve records should reference verified custody accounts, T-bills/MMF/deposit products or other legally approved instruments, with issuer/custodian, quantity, valuation timestamp, encumbrance status, and attestation evidence.

## Bank transfers / real-time payments
Checking, Savings, Business, and Business Savings expose tokenized ledger balances to the transfer service. The transfer service supports adapter contracts for ACH, wire, RTP, FedNow, and eligible Visa Direct flows. Actual movement of funds requires approved bank/payment-provider connectivity and reconciliation.
