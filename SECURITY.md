# Security controls

- No real SSN, PAN, CVV, bank credentials, Visa credentials, or private keys in source control.
- Token encryption keys are externalized to KMS/HSM.
- Vault issuance requires dual control and reserve attestation.
- Transfer creation requires idempotency keys and provider authorization.
- EmailJS must receive notification-safe data only.
- Production rails remain disabled until provider approval and certification are complete.
