# Bonds Bank Card Section — v1.0

Each supported Bonds Bank account receives a Card section and an issuer-backed
virtual card when the account is opened.

| Account | Initial virtual card |
|---|---|
| Checking | Virtual Debit |
| Savings | Virtual Debit |
| Business | Virtual Debit |
| Business Savings | Virtual Debit |
| Credit | Virtual Credit |
| Business Credit | Virtual Credit |
| IRA | Virtual Debit |
| Ledger | Virtual Debit |
| Vault | Virtual Debit |

## Card controls
- View card status and masked details.
- Lock/unlock the card.
- Replace the virtual card.
- Replacement closes the existing card and requests a newly generated virtual
  card linked to the same account.

The card service is an issuer/processor adapter. Real PAN/CVV/PIN material must
come from the authorized card issuer and must not be generated, stored, emailed,
or logged by Bonds Bank. The web/mobile UI should display only issuer-approved
masked/tokenized fields.

## Physical-card transition
The virtual card remains associated with the account while the physical card
is pending. The backend should maintain a stable account-to-card relationship
and use the issuer's card lifecycle API to transition or associate the physical
card after delivery/activation.

## Important
The configuration does not itself create regulated payment cards or make Bonds
Bank a card issuer. Production issuance requires an authorized issuer/processor,
appropriate network sponsorship, compliance controls, and approved program
configuration.
