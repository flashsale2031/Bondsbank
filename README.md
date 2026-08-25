# Bonds Bank

Bonds Bank is a static **testnet-first** product interface for a prospective Bonds IRA and Bonds Coin offering. It is a design and architecture prototype only; it does not issue BONDS, custody assets, open retirement accounts, accept customer funds, execute trades, or operate a blockchain.

The published interface includes distinct product surfaces for the Bonds IRA, Bonds Coin policy console, BONDS Vault boundary, explorer, and quote-preview trading desk. All product claims are intentionally gated behind the operating requirements documented in [BONDS_COIN_PRODUCTION_READINESS.md](./BONDS_COIN_PRODUCTION_READINESS.md).

## Local review

Serve the repository root with any static HTTP server and open `index.html`. The browser interface contains no build step or external runtime dependency.

## Production scope

Before any production release, the project requires approved issuer and reserve arrangements, qualified IRA custody, AML/CFT and sanctions controls, secure custody, independent audits, and a controlled multi-node testnet. See the readiness document for the detailed decision gates.
