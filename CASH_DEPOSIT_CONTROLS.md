# Cash Deposit Transaction Controls

## Required record
- Unique deposit ID and idempotency key
- Account receiving the deposit
- Exact amount and currency
- Date/time and location
- Depositor name and customer/account reference where applicable
- Identification/verification result as required by policy
- Cash deposit method
- Cash count and denomination record where applicable
- Source of funds and purpose fields
- Receiving employee/system identity
- Deposit slip and receipt references
- Reconciliation/count evidence
- Double-entry journal lines
- Risk/AML review decision and escalation reference when required
- Approval record for configured thresholds
- Final posting/distribution timestamp and status
- Reversal/adjustment history without destructive edits
- Immutable audit event and receipt hash

## Distribution rule
The Ledger Account may distribute funds only after the cash deposit reaches the configured reconciliation state. The sum of all distributions must equal the reconciled deposit amount. No distribution may create an overdraft or bypass settlement/risk controls.
