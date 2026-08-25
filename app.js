const accounts = [
  ["Checking", "checking", "$12,480.22"],
  ["Savings", "savings", "$28,904.10"],
  ["IRA", "retirement", "$41,320.17"],
  ["Bonds IRA · Testnet", "testnet product", "Preview only"],
];

const app = document.getElementById("app");
let signedIn = true;

function page() {
  const route = location.hash.slice(1) || "dashboard";
  const routes = {
    dashboard,
    accounts: accountsPage,
    ira: ira,
    bondscoin: bondsCoin,
    vault,
    explorer,
    trade,
    wallet,
    security,
    pos,
    signin,
  };
  (routes[route] || dashboard)();
}

function shell(eyebrow, title, body, side = "") {
  app.innerHTML = `<div class="wrap"><section class="testnet-banner"><span class="network-dot"></span><strong>BONDS BANK TESTNET</strong><span>Interface prototype only · no deposits, custody, issuance, trading, or real BONDS balances are enabled.</span><a href="#security">Read safeguards</a></section><div class="page-hero"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div>${side}</div>${body}</div>`;
}

function tag(text, style = "neutral") { return `<span class="tag ${style}">${text}</span>`; }
function action(label, onclick, kind = "") { return `<button class="${kind}" onclick="${onclick}">${label}</button>`; }
function testnetNotice(title, detail) { alert(`${title}\n\n${detail}\n\nThis is a testnet-first interface. No funds, credentials, tokens, or orders are created.`); }

function dashboard() {
  shell("Bonds Bank / testnet product suite", "Build retirement confidence without pretending the infrastructure is live.", `
    <div class="hero-grid">
      <article class="hero-card emerald"><p class="card-label">New retirement product</p><h2>Bonds IRA</h2><p>Explore a self-directed IRA product flow with verified-custodian, suitability, and disclosure gates staged for implementation.</p><a class="text-link" href="#ira">View IRA roadmap <span>→</span></a>
      </article>
      <article class="hero-card coin-card"><div class="coin-mark">B</div><div><p class="card-label">BONDS / testnet reference</p><h2>1.00 test USD</h2><p>Reference display only. A future stable-value product would require regulated issuance, reserves, redemption, and independent assurance.</p></div><a class="text-link" href="#bondscoin">Open BONDS console <span>→</span></a></article>
    </div>
    <section class="section-head"><div><p class="eyebrow">Product control plane</p><h2>What is available today</h2></div><p>Every surface below is intentionally separated from real money movement, private-key custody, token minting, and order execution.</p></section>
    <div class="grid control-grid">
      <article class="card feature-card"><span class="feature-icon">IRA</span><h3>Individual Retirement Account</h3><p>Account-opening, disclosure, and custodian-integration blueprint.</p><a href="#ira">Open product →</a></article>
      <article class="card feature-card"><span class="feature-icon">B</span><h3>Bonds Coin</h3><p>USD-reference design, redemption gates, and issuer controls.</p><a href="#bondscoin">Open policy console →</a></article>
      <article class="card feature-card"><span class="feature-icon">V</span><h3>BONDS Vault</h3><p>Testnet allocation ledger and future custody boundary.</p><a href="#vault">Open vault →</a></article>
      <article class="card feature-card"><span class="feature-icon">⌘</span><h3>Explorer & trade desk</h3><p>Network observability and quote previews without routing.</p><a href="#explorer">Open explorer →</a></article>
    </div>
    <section class="readiness-panel"><div><p class="eyebrow">Release discipline</p><h2>Production is a gated program, not a button.</h2></div><ol><li>Qualified issuer, IRA custodian, reserve bank, and compliance partners.</li><li>Independent audits, security reviews, and controlled multi-node testnet.</li><li>Regulator-reviewed launch controls before any customer asset or BONDS issuance.</li></ol></section>
  `, `<div class="hero-side">${tag("Testnet only", "gold")}<p>USD reference displays are illustrative.</p></div>`);
}

function ira() {
  shell("Retirement / product blueprint", "Bonds IRA", `
    <div class="product-split">
      <section class="card product-main"><p class="card-label">Individual Retirement Account · concept environment</p><h2>Offer retirement access only through a qualified operating model.</h2><p>The product flow is designed around a self-directed IRA structure. It does not open an IRA, accept a rollover, or hold assets in this prototype.</p>
      <div class="timeline"><div><b>01</b><span><strong>Eligibility & disclosures</strong><small>Tax, suitability, risk, and product disclosures reviewed before account funding.</small></span></div><div><b>02</b><span><strong>Qualified custodian workflow</strong><small>Account creation and asset custody delegated to an approved IRA custodian.</small></span></div><div><b>03</b><span><strong>Investment controls</strong><small>Only approved assets and policies can be surfaced after compliance approvals.</small></span></div></div>
      <div class="actions">${action("Preview IRA opening flow", "testnetNotice('IRA opening flow', 'A production implementation must use a qualified IRA custodian and complete all required onboarding and disclosures.')")} ${action("View custody requirements", "location.hash='vault'", "secondary")}</div></section>
      <aside class="card product-aside"><p class="card-label">IRA product guardrails</p><ul class="checklist"><li>${tag("Required", "gold")} Qualified custodian partnership</li><li>${tag("Required", "gold")} Tax and retirement counsel review</li><li>${tag("Required", "gold")} Customer disclosures and suitability controls</li><li>${tag("Required", "gold")} Asset segregation and reconciliation</li><li>${tag("Blocked", "red")} “IRS approved” marketing claims</li></ul></aside>
    </div>
    <section class="section-head"><div><p class="eyebrow">IRA account surfaces</p><h2>Product tabs prepared for integration</h2></div><p>These interface modules are inactive until the required custodian, identity, and compliance services are connected.</p></section>
    <div class="grid account-grid">${["Traditional IRA", "Roth IRA", "Rollover IRA", "Self-directed asset review"].map((name, index) => `<article class="card account-product"><span>${String(index + 1).padStart(2, "0")}</span><h3>${name}</h3><p>${index === 3 ? "Digital-asset eligibility rules, custody model, and prohibited-transaction review." : "Account flow, contribution rules, and custodian-led administration."}</p>${tag("Integration pending")}</article>`).join("")}</div>
  `);
}

function bondsCoin() {
  shell("BONDS / issuance policy", "Bonds Coin", `
    <section class="coin-console">
      <div class="coin-console-top"><div class="coin-mark large">B</div><div><p class="card-label">BONDS / USD-reference testnet</p><h2>1.00 <span>test USD</span></h2><p>No live price, collateral, redemption right, or issued token exists in this environment.</p></div>${tag("Issuance disabled", "red")}</div>
      <div class="metric-strip"><div><small>Circulating supply</small><b>0 BONDS</b><span>Production minting disabled</span></div><div><small>Reserve assets</small><b>Not connected</b><span>No bank reserve or attestation feed</span></div><div><small>Redemption</small><b>Not available</b><span>No customer conversion path</span></div><div><small>Network</small><b>Design stage</b><span>Testnet architecture only</span></div></div>
    </section>
    <div class="product-split policy-grid"><section class="card product-main"><p class="card-label">Stable-value product requirements</p><h2>Parity is an operating obligation—not a consensus feature.</h2><p>Any future claim that 1 BONDS equals USD 1 must be backed by regulated issuer approval, at least 1:1 eligible reserve assets, contractual redemption, segregation, ongoing reconciliation, public reporting, and independent assurance.</p><div class="actions">${action("Open production gates", "location.hash='security'")} ${action("View vault boundary", "location.hash='vault'", "secondary")}</div></section><aside class="card product-aside"><p class="card-label">Reference policy</p><ul class="checklist"><li>${tag("Testnet", "neutral")} Reference display is illustrative</li><li>${tag("Future", "gold")} Reserve proof and attestation feed</li><li>${tag("Future", "gold")} Contractual redemption workflow</li><li>${tag("Future", "gold")} AML/CFT and sanctions controls</li><li>${tag("Blocked", "red")} “Forever” USD-value guarantee</li></ul></aside></div>
    <section class="section-head"><div><p class="eyebrow">Network assurance</p><h2>Production chain readiness</h2></div><p>Architecture requirements are documented before any public chain is launched or any BONDS are minted.</p></section>
    <div class="grid readiness-grid">${[["Deterministic genesis", "Versioned genesis manifest, chain ID, initial state root, and reproducible hash."],["Consensus & reorg safety", "Difficulty, cumulative work, finality policy, reorganization limits, and adversarial simulation."],["Authenticated peers", "Signed node identities, authenticated discovery, rate limits, allowlists, and Sybil controls."],["Crash-safe state", "Atomic commits, write-ahead logging, snapshots, recovery drills, and integrity verification."],["Abuse resistance", "Message validation, resource quotas, peer scoring, mempool policy, and DDoS protection."],["Assurance program", "Fuzzing, multi-node testnet, external audits, incident response, and release sign-off."]].map(([title, detail]) => `<article class="card readiness-card"><span class="check-symbol">✓</span><h3>${title}</h3><p>${detail}</p></article>`).join("")}</div>
  `);
}

function vault() {
  shell("Custody / testnet allocation", "BONDS Vault", `
    <section class="vault-layout"><article class="vault-card"><div class="vault-lock">⌁</div><p class="card-label">Testnet allocation register</p><h2>0 BONDS</h2><p>There are no issued BONDS, customer assets, private keys, or live reserves in this site. The vault concept is a future custody-control boundary.</p><div class="vault-actions">${action("View control matrix", "testnetNotice('Vault control matrix', 'Production custody requires qualified custody, segregated accounts, key-management controls, reconciliation, monitoring, and independent audit.')")} ${action("Open explorer", "location.hash='explorer'", "secondary")}</div></article><aside class="card vault-side"><p class="card-label">Future vault controls</p><div class="control-row"><span>Issuer treasury</span>${tag("Not provisioned")}</div><div class="control-row"><span>Customer assets</span>${tag("Not accepted", "red")}</div><div class="control-row"><span>Key service</span>${tag("Not connected")}</div><div class="control-row"><span>Reserve ledger</span>${tag("Not connected")}</div><div class="control-row"><span>Reconciliation</span>${tag("Design only", "gold")}</div></aside></section>
    <section class="section-head"><div><p class="eyebrow">Custody separation</p><h2>What a production vault must prove</h2></div><p>No user-facing vault should go live until the technical, legal, and operational control owners below are independently verified.</p></section>
    <div class="grid control-grid">${[["Key custody", "Hardware-backed key policy, MPC or multi-party approval, rotation, recovery, and audit trails."],["Reserve custody", "Segregated eligible assets, daily reconciliation, redemption liquidity, and independent attestation."],["Access safety", "Role separation, just-in-time approvals, withdrawal limits, anomaly monitoring, and break-glass drills."],["Customer protection", "Clear ownership records, disclosures, support controls, incident playbooks, and complaint handling."]].map(([title, detail]) => `<article class="card feature-card"><span class="feature-icon">✓</span><h3>${title}</h3><p>${detail}</p></article>`).join("")}</div>
  `);
}

function explorer() {
  shell("Network / observability", "BONDS Explorer", `
    <section class="explorer-panel"><div class="explorer-search"><input id="lookup" placeholder="Search testnet block, transaction, or address" aria-label="Search testnet explorer"><button onclick="testnetNotice('Explorer lookup', 'No node is connected. A production explorer must read from authenticated full-node indexers and must never expose private key material.')">Search</button></div><div class="explorer-metrics"><div><small>Chain ID</small><b>Unassigned</b></div><div><small>Genesis hash</small><b>Pending manifest</b></div><div><small>Connected nodes</small><b>0</b></div><div><small>Finalized height</small><b>—</b></div></div></section>
    <div class="product-split"><section class="card product-main"><p class="card-label">Testnet launch sequence</p><h2>Observe the network before anyone depends on it.</h2><ol class="numbered"><li><b>1</b><span>Publish reproducible genesis configuration and signed release artifacts.</span></li><li><b>2</b><span>Operate a controlled multi-node testnet with monitoring and fault injection.</span></li><li><b>3</b><span>Run property, differential, fuzz, and adversarial network testing.</span></li><li><b>4</b><span>Complete independent protocol, wallet, custody, and web-security reviews.</span></li></ol></section><aside class="card product-aside"><p class="card-label">Explorer safety</p><ul class="checklist"><li>${tag("Never", "red")} Accept private keys</li><li>${tag("Never", "red")} Display customer personal data</li><li>${tag("Required", "gold")} Verify node/indexer provenance</li><li>${tag("Required", "gold")} Rate-limit public queries</li></ul></aside></div>
  `);
}

function trade() {
  shell("BONDS / quote preview", "Trading Desk", `
    <section class="trade-card"><div><p class="card-label">No order routing</p><h2>Quote previews are not trades.</h2><p>This testnet desk demonstrates the future interface boundary. It cannot accept deposits, execute swaps, create orders, or transfer BONDS.</p></div><div class="quote-box"><span>BONDS / USD</span><b>1.00 test USD</b><small>Reference display only</small></div></section>
    <div class="grid trade-grid"><article class="card"><h3>Buy BONDS</h3><p>Disabled until regulated issuance, funding, reserve, and redemption controls are live.</p>${action("Preview buy policy", "testnetNotice('Buy policy', 'No order path is active. A production DEX or trading venue requires applicable legal, market-surveillance, liquidity, custody, and security controls.')")}</article><article class="card"><h3>Sell / redeem</h3><p>Disabled until a lawful redemption arrangement and reserve operations are independently verified.</p>${action("Preview redemption policy", "testnetNotice('Redemption policy', 'No redemption right exists in this testnet prototype.')", "secondary")}</article><article class="card"><h3>Market integrity</h3><p>Future workflow: price integrity controls, liquidity safeguards, market surveillance, and incident response.</p>${tag("Design only", "gold")}</article></div>
  `);
}

function accountsPage() { shell("Accounts / testnet overview", "Accounts", `<div class="grid">${accounts.map((account) => `<div class="card account"><div><b>${account[0]}</b><div class="muted">${account[2]}</div></div>${tag(account[1])}</div>`).join("")}</div><section class="notice-card"><strong>Account balances above are static demonstration values.</strong><span>They do not represent actual bank, IRA, token, wallet, or vault balances.</span></section>`); }
function wallet() { shell("Wallet / integration boundary", "Wallet", `<div class="grid"><article class="card"><h2>Linked bank accounts</h2><p class="muted">No account linking is enabled. A production flow must use an approved provider and server-side token handling.</p>${action("Preview linking controls", "testnetNotice('Account linking', 'No provider is connected and no credentials are accepted.')")}</article><article class="card"><h2>Digital asset wallet</h2><p class="muted">No wallet is generated or connected. Private keys must never be collected in a public frontend.</p>${action("Open vault boundary", "location.hash='vault'", "secondary")}</article></div>`); }
function security() { shell("Security / release gates", "Security Center", `<div class="grid">${[["Customer identity", "Integration pending", "Identity, sanctions, and ongoing monitoring must be operated through approved controls."],["Production keys", "Not provisioned", "No private keys or signing authority exist in this testnet frontend."],["Independent assurance", "Required", "Protocol, wallet, custody, and application audits are required before launch."],["Incident response", "Required", "Runbooks, monitoring, recovery testing, and customer communications must be validated." ]].map(([title, state, text]) => `<article class="card"><h3>${title}</h3><p>${text}</p>${tag(state, state === "Required" ? "gold" : "neutral")}</article>`).join("")}</div><section class="readiness-panel"><div><p class="eyebrow">Production block</p><h2>Do not add real funds or claims until the gates are met.</h2></div><p>Legal, regulatory, reserve, custodial, security, and operational approvals must be completed before BONDS can be issued or presented as USD-redeemable.</p></section>`); }
function pos() { shell("Business POS / unavailable", "Business POS", `<article class="card"><h2>POS is outside the BONDS testnet scope.</h2><p>Payment acceptance is unavailable until merchant onboarding, transaction processing, fraud prevention, and settlement operations are independently approved.</p>${tag("No transaction processing", "red")}</article>`); }
function signin() { shell("Access / demonstration environment", "Welcome to Bonds Bank", `<article class="card signin-card"><img src="lion_icon.png" alt="Bonds Bank lion mark"><p class="muted">This published frontend is a product demonstration. It does not authenticate customers or accept financial information.</p>${action("Enter testnet product demo", "signedIn=true; location.hash='dashboard'")}</article>`); }

function login() { signedIn = true; location.hash = "dashboard"; }
document.getElementById("authBtn").onclick = () => { signedIn = false; location.hash = "signin"; };
addEventListener("hashchange", page);
page();
