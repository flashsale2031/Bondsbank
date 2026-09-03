const app = document.getElementById('app');

const data = {
  netWorth: '$82,704.49',
  available: '$41,384.22',
  invested: '$31,920.17',
  reserve: '$9,400.10',
  change: '+$2,184.40',
  changePct: '+2.71%'
};

const routes = {
  dashboard: renderDashboard,
  assets: renderAssets,
  freedom: renderFreedom,
  transfers: renderTransfers,
  activity: renderActivity,
  profile: renderProfile,
  security: renderSecurity
};

function money(v) { return v; }
function go(route) { location.hash = route; }
function button(label, route, secondary = false) {
  return `<button class="${secondary ? 'btn secondary' : 'btn'}" data-route="${route}">${label}</button>`;
}
function icon(name) {
  const paths = {
    grid:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    chart:'<path d="M4 19V5M4 19h17M8 16l3-4 3 2 5-7"/>',
    spark:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    wallet:'<path d="M4 7V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2V7Zm0 0h15M16 13h3"/>',
    shield:'<path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/>',
    user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
}

function layout(content, active='dashboard') {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="side-brand"><img src="bonds-lion.png" alt="BONDS lion"><span>BONDS</span></div>
        <div class="side-label">WEALTH PLATFORM</div>
        <nav class="side-nav">
          ${navItem('dashboard','Overview','grid',active)}
          ${navItem('assets','Assets','chart',active)}
          ${navItem('freedom','Freedom Plan','spark',active)}
          ${navItem('transfers','Move Money','arrow',active)}
          ${navItem('activity','Activity','wallet',active)}
        </nav>
        <div class="side-spacer"></div>
        <nav class="side-nav side-bottom">
          ${navItem('security','Security','shield',active)}
          ${navItem('profile','Profile','user',active)}
        </nav>
        <div class="side-status"><span></span><div><b>Protected workspace</b><small>Demo data • no live funds</small></div></div>
      </aside>
      <div class="main-area">
        <header class="topbar">
          <button class="mobile-menu" id="menuBtn" aria-label="Open menu">${icon('menu')}</button>
          <div class="mobile-brand"><img src="bonds-lion.png" alt="BONDS lion"><strong>BONDS</strong></div>
          <div class="topbar-right">
            <span class="mode-pill"><i></i> Wealth workspace</span>
            <button class="avatar" data-route="profile" aria-label="Profile">YB</button>
          </div>
        </header>
        <main class="content">${content}</main>
      </div>
    </div>
    <div class="mobile-nav">
      ${navItem('dashboard','Home','grid',active)}
      ${navItem('assets','Assets','chart',active)}
      ${navItem('freedom','Freedom','spark',active)}
      ${navItem('activity','Activity','wallet',active)}
      ${navItem('profile','Profile','user',active)}
    </div>
  `;
  document.querySelectorAll('[data-route]').forEach(el => el.addEventListener('click', () => go(el.dataset.route)));
  const menu = document.getElementById('menuBtn');
  if (menu) menu.addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
}

function navItem(route, label, ico, active) {
  return `<a class="nav-item ${active===route?'active':''}" href="#${route}">${icon(ico)}<span>${label}</span></a>`;
}

function renderDashboard() {
  layout(`
    <section class="welcome-row">
      <div><p class="kicker">BONDS / ASSET • WEALTH • FREEDOM</p><h1>Good afternoon.</h1><p class="subhead">Your money, organized around the life you want to build.</p></div>
      <div class="date-chip">SEPTEMBER 02, 2026 <span>•</span> PRIVATE VIEW</div>
    </section>

    <section class="wealth-hero">
      <div class="wealth-main">
        <div class="hero-top"><span>Total wealth</span><span class="eyebrow-chip">DEMO PORTFOLIO</span></div>
        <div class="wealth-number">${data.netWorth}</div>
        <div class="wealth-change"><strong>${data.change}</strong> <span>${data.changePct} this period</span></div>
        <div class="sparkline"><span style="height:31%"></span><span style="height:42%"></span><span style="height:37%"></span><span style="height:55%"></span><span style="height:51%"></span><span style="height:63%"></span><span style="height:58%"></span><span style="height:72%"></span><span style="height:68%"></span><span style="height:81%"></span><span style="height:75%"></span><span style="height:92%"></span></div>
        <div class="chart-labels"><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span></div>
      </div>
      <div class="wealth-side">
        <div class="mini-stat"><span>Available</span><b>${data.available}</b><small>Cash & near-cash</small></div>
        <div class="mini-stat"><span>Invested</span><b>${data.invested}</b><small>Long-term assets</small></div>
        <div class="mini-stat"><span>Reserve</span><b>${data.reserve}</b><small>Freedom buffer</small></div>
      </div>
    </section>

    <section class="quick-actions">
      ${quick('arrow','Move money','Transfer, deposit or organize cash','transfers')}
      ${quick('chart','View assets','See every account and holding','assets')}
      ${quick('spark','Freedom plan','Track your path to financial freedom','freedom')}
    </section>

    <section class="section-title"><div><p class="kicker">WEALTH MAP</p><h2>Where your wealth lives</h2></div><a href="#assets">View all assets →</a></section>
    <section class="asset-overview">
      <div class="allocation-card"><div class="allocation-ring"><div><b>100%</b><small>organized</small></div></div><div class="allocation-legend"><div><i class="dot cash"></i><span>Cash</span><b>50.0%</b></div><div><i class="dot invest"></i><span>Investments</span><b>38.6%</b></div><div><i class="dot reserve"></i><span>Reserve</span><b>11.4%</b></div></div></div>
      <div class="accounts-card">
        ${accountRow('Everyday Checking','$12,480.22','Available now','Primary cash','cash')}
        ${accountRow('High-Yield Savings','$28,904.10','Available','Safety reserve','reserve')}
        ${accountRow('Bonds IRA','$41,320.17','Retirement','Long-term growth','invest')}
      </div>
    </section>

    <section class="freedom-banner"><div><p class="kicker">FREEDOM PLAN</p><h2>Build the freedom number.</h2><p>Your plan turns today's assets into tomorrow's options.</p></div><div class="freedom-progress"><div class="progress-head"><span>Freedom target</span><b>$250,000</b></div><div class="progress"><i></i></div><div class="progress-foot"><span>$82,704.49 today</span><span>33.1% funded</span></div></div><a class="round-arrow" href="#freedom">→</a></section>

    <section class="activity-preview"><div class="section-title compact"><div><p class="kicker">RECENT ACTIVITY</p><h2>Money in motion</h2></div><a href="#activity">See activity →</a></div>${activityRow('Aug 31','Bonds IRA contribution','Retirement','$1,250.00','up')}${activityRow('Aug 29','Savings transfer','High-Yield Savings','$500.00','up')}${activityRow('Aug 27','Card purchase','Everyday Checking','$84.32','down')}</section>
    <div class="demo-note">This redesigned Wealth Freedom interface uses illustrative account values. It does not represent an active deposit account, custody relationship, securities account, or live payment capability.</div>
  `,'dashboard');
}

function quick(ico,title,desc,route) { return `<a class="quick-card" href="#${route}">${icon(ico)}<div><b>${title}</b><span>${desc}</span></div><strong>→</strong></a>`; }
function accountRow(name,balance,status,type,kind) { return `<a class="account-row" href="#assets"><div class="asset-icon ${kind}">${kind==='cash'?'$':kind==='reserve'?'R':'B'}</div><div class="account-copy"><b>${name}</b><span>${type} • ${status}</span></div><strong>${balance}</strong><span class="row-arrow">→</span></a>`; }
function activityRow(date,title,sub,amount,direction) { return `<div class="activity-row"><span class="activity-date">${date}</span><div class="activity-icon ${direction}">${direction==='up'?'+':'−'}</div><div class="activity-copy"><b>${title}</b><span>${sub}</span></div><strong class="${direction}">${direction==='up'?'+':'−'}${amount}</strong></div>`; }

function renderAssets() {
  layout(`
    <section class="page-heading"><p class="kicker">ASSET MAP</p><h1>Everything you own.<br><em>One clear view.</em></h1><p>Bring cash, retirement assets and long-term holdings into one organized wealth picture.</p></section>
    <section class="balance-strip"><div><span>Total wealth</span><b>${data.netWorth}</b></div><div><span>Cash</span><b>$41,384.32</b></div><div><span>Investments</span><b>$31,920.17</b></div><div><span>Reserve</span><b>$9,400.00</b></div></section>
    <section class="asset-grid">
      <article class="asset-large"><div class="asset-large-head"><div><span class="asset-type">CASH • PRIMARY</span><h2>Everyday Checking</h2></div><span class="live-dot">DEMO</span></div><b class="large-balance">$12,480.22</b><div class="account-meta"><span>Available balance</span><span>•• 4812</span></div><div class="asset-actions">${button('Move money','transfers')} ${button('Details','assets',true)}</div></article>
      <article class="asset-large light"><div class="asset-large-head"><div><span class="asset-type">CASH • RESERVE</span><h2>High-Yield Savings</h2></div><span class="gold-mark">R</span></div><b class="large-balance">$28,904.10</b><div class="account-meta"><span>Safety reserve</span><span>•• 1029</span></div><div class="asset-actions">${button('Add money','transfers')} ${button('Details','assets',true)}</div></article>
      <article class="asset-wide"><div class="wide-copy"><span class="asset-type">RETIREMENT • LONG TERM</span><h2>Bonds IRA</h2><p>Illustrative retirement workspace for contribution planning, allocation and future custodian integration.</p><div class="retirement-stat"><span>Current value</span><b>$41,320.17</b><strong>+6.8% YTD</strong></div></div><div class="allocation-bars"><span style="width:62%"></span><span style="width:24%"></span><span style="width:14%"></span><div><i>Growth 62%</i><i>Income 24%</i><i>Reserve 14%</i></div></div></article>
    </section>
    <div class="demo-note">Asset values shown here are illustrative demonstration data. Production account aggregation, custody, securities execution and money movement require the applicable regulated providers and integrations.</div>
  `,'assets');
}

function renderFreedom() {
  layout(`
    <section class="freedom-heading"><div><p class="kicker">BONDS / FREEDOM PLAN</p><h1>Wealth is the tool.<br><em>Freedom is the goal.</em></h1><p>See the distance between where you are and the life your assets can support.</p></div><div class="target-card"><span>Freedom target</span><b>$250,000</b><small>Illustrative planning goal</small></div></section>
    <section class="freedom-dashboard"><div class="freedom-score"><span>PROGRESS TO FREEDOM</span><b>33.1%</b><div class="big-progress"><i></i></div><div class="score-row"><span>Current wealth<br><strong>$82,704.49</strong></span><span>Remaining<br><strong>$167,295.51</strong></span></div></div><div class="freedom-insight"><span class="insight-icon">✦</span><p class="kicker">YOUR NEXT MOVE</p><h2>Protect the base before chasing the upside.</h2><p>Your reserve is currently 11.4% of organized wealth. A larger liquidity cushion can create more flexibility for future investing.</p><a href="#assets">Review your reserve →</a></div></section>
    <section class="section-title"><div><p class="kicker">THREE PILLARS</p><h2>Build freedom from a strong base.</h2></div></section>
    <div class="pillars"><article><span>01</span><h3>Protect</h3><p>Build a dependable cash reserve and keep essential money accessible.</p><b>Reserve goal</b><strong>$25,000</strong></article><article><span>02</span><h3>Grow</h3><p>Direct long-term capital toward a diversified investment strategy.</p><b>Investment goal</b><strong>$150,000</strong></article><article><span>03</span><h3>Own your time</h3><p>Measure wealth by the options it creates, not only by the number on the screen.</p><b>Freedom threshold</b><strong>$250,000</strong></article></div>
    <section class="milestone-card"><div><p class="kicker">MILESTONE TRACKER</p><h2>Your next three milestones</h2></div><div class="milestones"><div class="done"><span>✓</span><b>$50K</b><small>Foundation</small></div><div class="current"><span>2</span><b>$100K</b><small>Momentum</small></div><div><span>3</span><b>$250K</b><small>Freedom</small></div></div></section>
    <div class="demo-note">Planning targets and recommendations are illustrative and are not individualized investment, tax, legal or financial advice.</div>
  `,'freedom');
}

function renderTransfers() {
  layout(`
    <section class="page-heading"><p class="kicker">MOVE MONEY</p><h1>Move money with<br><em>clarity.</em></h1><p>A simple home for transfers, funding and future payment connections.</p></section>
    <section class="transfer-layout"><article class="transfer-card"><div class="transfer-head"><span class="step">01</span><div><p class="kicker">FROM</p><h2>Everyday Checking</h2><span>Available • $12,480.22</span></div></div><div class="transfer-arrow">↓</div><div class="transfer-head"><span class="step gold">02</span><div><p class="kicker">TO</p><h2>High-Yield Savings</h2><span>Reserve • $28,904.10</span></div></div><div class="transfer-amount"><label>Amount</label><b>$500.00</b><small>Illustrative transfer</small></div><button class="btn full" id="transferPreview">Preview transfer</button></article><aside class="transfer-side"><p class="kicker">PAYMENT RAILS</p><h2>Connected when authorized.</h2><div class="rail"><b>ACH</b><span>Bank-to-bank transfers</span><i>Planned</i></div><div class="rail"><b>VISA</b><span>Card and wallet services</span><i>Planned</i></div><div class="rail"><b>WIRE</b><span>High-value transfers</span><i>Planned</i></div><div class="rail"><b>INTERNAL</b><span>BONDS account movement</span><i>Demo</i></div></aside></section>
    <div class="security-callout">${icon('shield')} <div><b>Every transfer gets a control layer.</b><span>Identity, authorization, limits, fraud screening, ledger posting, settlement and reconciliation are required before production money movement.</span></div></div>
    <div class="demo-note">No real transfer is submitted from this interface. The controls above are a product-design representation for the future regulated payment stack.</div>
  `,'transfers');
  const btn = document.getElementById('transferPreview'); if (btn) btn.addEventListener('click',()=>alert('Transfer preview only. No funds, accounts, credentials, or payment orders are created.'));
}

function renderActivity() {
  layout(`
    <section class="page-heading compact-heading"><p class="kicker">ACTIVITY</p><h1>Your financial timeline.</h1><p>One chronological view of the events shaping your wealth.</p></section>
    <section class="filter-row"><button class="filter active">All activity</button><button class="filter">Income</button><button class="filter">Transfers</button><button class="filter">Investing</button><span class="filter-date">Last 30 days ▾</span></section>
    <section class="timeline-list"><div class="timeline-date">AUGUST 31, 2026</div>${activityRow('09:42 AM','Bonds IRA contribution','Retirement • contribution','$1,250.00','up')}${activityRow('08:14 AM','Direct deposit','Everyday Checking','$2,800.00','up')}<div class="timeline-date">AUGUST 29, 2026</div>${activityRow('04:28 PM','Savings transfer','Everyday Checking → Savings','$500.00','up')}${activityRow('11:06 AM','Card purchase','Everyday Checking','$84.32','down')}<div class="timeline-date">AUGUST 27, 2026</div>${activityRow('07:51 PM','Portfolio rebalance','Bonds IRA','$0.00','neutral')}</section>
  `,'activity');
}

function renderProfile() {
  layout(`
    <section class="page-heading compact-heading"><p class="kicker">PROFILE</p><h1>Your BONDS identity.</h1><p>Personal settings for your wealth workspace.</p></section>
    <section class="profile-grid"><article class="profile-card"><div class="profile-avatar">YB</div><p class="kicker">ACCOUNT HOLDER</p><h2>Yohyness Bonds</h2><span>Private wealth workspace</span><hr><div class="profile-line"><span>Email</span><b>Verified</b></div><div class="profile-line"><span>Identity status</span><b class="green">Demo verified</b></div></article><article class="settings-card"><p class="kicker">PREFERENCES</p><h2>Workspace settings</h2><label><span>Wealth summary</span><input type="checkbox" checked></label><label><span>Activity alerts</span><input type="checkbox" checked></label><label><span>Monthly freedom review</span><input type="checkbox" checked></label><label><span>Marketing communications</span><input type="checkbox"></label></article></section>
    <div class="demo-note">This profile is a frontend demonstration. Production identity verification and customer authentication must be provided by the authorized identity and banking stack.</div>
  `,'profile');
}

function renderSecurity() {
  layout(`
    <section class="page-heading compact-heading"><p class="kicker">SECURITY</p><h1>Protected by design.</h1><p>The wealth experience separates customer experience from the controls that protect money, identity and access.</p></section>
    <section class="security-grid"><article class="security-score"><span>SECURITY STATUS</span><b>READY FOR INTEGRATION</b><div class="security-meter"><i></i></div><p>Frontend safeguards are staged. Production authentication, KYC, secrets, HSM/MLE, fraud and payment controls remain integration gates.</p></article><article class="security-list"><securityItem('Identity','Customer verification before account activation.','Planned')<securityItem('Access','MFA, session controls and privileged-access separation.','Planned')<securityItem('Payments','Authorization, limits, monitoring and reconciliation.','Planned')<securityItem('Audit','Immutable activity and evidence trails.','Designed')}</article></section>
    <div class="security-callout">${icon('shield')} <div><b>Production is a controlled release.</b><span>The UI can be public while regulated account, custody, issuance and payment capabilities remain disabled until their required approvals and integrations are complete.</span></div></div>
  `,'security');
}
function securityItem(title,detail,status) { return `<div class="security-item"><span class="check">✓</span><div><b>${title}</b><p>${detail}</p></div><i>${status}</i></div>`; }

function page() {
  const route = location.hash.slice(1) || 'dashboard';
  (routes[route] || renderDashboard)();
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange', page);
page();
