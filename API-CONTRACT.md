# Backend integration boundaries

Customer API areas: authentication, sessions, accounts, ledger, transfers, wallet funding sources, card tokenization, identity verification, phone verification, 2FA, credit eligibility, POS/merchant operations.

Admin API areas: users, account status, verification status, privileged actions, audit events. Every admin endpoint must enforce server-side RBAC, session assurance, and audit logging.

The web UI intentionally uses placeholders for privileged or financial operations until connected to the real backend.
