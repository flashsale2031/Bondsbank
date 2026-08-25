# Bonds Bank Web Package

This package contains two responsive web frontends:
- `customer-web/`: customer banking interface covering Checking, Savings, Business Checking, Business Savings, Credit, Business Credit, IRA, Wallet, Security Center, and Business POS.
- `admin-web/`: administrator interface for user/account management, verification review, and audit views.

These are deployment-ready frontend shells. They do not themselves execute banking transactions. Connect them to the authenticated Bonds Bank backend/API before production use. Never place bank credentials, OAuth client secrets, SSNs, ID documents, CVVs, signing keys, or provider private keys in frontend code.

Recommended deployment: serve each directory as a static site over HTTPS and configure the backend API plus OAuth/OIDC redirect URIs separately.
