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
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
}

function layout(content, active='dashboard') {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="side-brand"><img src="bonds-lion.png?v=brand-2026-09-03" alt="BONDS lion"><span>BONDS</span></div>
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
        </nav>
      </aside>
      <div class="main-area">
        <header class="topbar">
          <button class="mobile-menu" id="menuBtn" aria-label="Open menu">${icon('menu')}</button>
          <div class="mobile-brand"><img src="bonds-lion.png?v=brand-2026-09-03" alt="BONDS lion"><strong>BONDS</strong></div>
          <div class="topbar-right">
            <span class="mode-pill"><i></i> WEALTH WORKSPACE</span>
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
      ${navItem('security','Security','shield',active)}
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
  layout(`<section class="page-heading"><p class="kicker">ASSET MAP</p><h1>Everything you own.<br><em>One clear view.</em></h1><p>Bring cash, retirement assets and long-term holdings into one organized wealth picture.</p></section><section class="balance-strip"><div><span>Total wealth</span><b>${data.netWorth}</b></div><div><span>Cash</span><b>$41,384.32</b></div><div><span>Investments</span><b>$31,920.17</b></div><div><span>Reserve</span><b>$9,400.00</b></div></section><section class="asset-grid"><article class="asset-large"><div class="asset-large-head"><div><span class="asset-type">CASH • PRIMARY</span><h2>Everyday Checking</h2></div><span class="live-dot">DEMO</span></div><b class="large-balance">$12,480.22</b><div class="account-meta"><span>Available balance</span><span>•• 4812</span></div><div class="asset-actions">${button('Move money','transfers')} ${button('Details','assets',true)}</div></article><article class="asset-large light"><div class="asset-large-head"><div><span class="asset-type">CASH • RESERVE</span><h2>High-Yield Savings</h2></div><span class="gold-mark">R</span></div><b class="large-balance">$28,904.10</b><div class="account-meta"><span>Safety reserve</span><span>•• 1029</span></div><div class="asset-actions">${button('Add money','transfers')} ${button('Details','assets',true)}</div></article><article class="asset-wide"><div class="wide-copy"><span class="asset-type">RETIREMENT • LONG TERM</span><h2>Bonds IRA</h2><p>Illustrative retirement workspace for contribution planning, allocation and future custodian integration.</p><div class="retirement-stat"><span>Current value</span><b>$41,320.17</b><strong>+6.8% YTD</strong></div></div><div class="allocation-bars"><span style="width:62%"></span><span style="width:24%"></span><span style="width:14%"></span><div><i>Growth 62%</i><i>Income 24%</i><i>Reserve 14%</i></div></div></article></section><div class="demo-note">Asset values shown here are illustrative demonstration data. Production account aggregation, custody, securities execution and money movement require the applicable regulated providers and integrations.</div>`,'assets');
}

function renderFreedom() { layout(`<section class="freedom-heading"><div><p class="kicker">BONDS / FREEDOM PLAN</p><h1>Wealth is the tool.<br><em>Freedom is the goal.</em></h1><p>See the distance between where you are and the life your assets can support.</p></div><div class="target-card"><span>Freedom target</span><b>$250,000</b><small>Illustrative planning goal</small></div></section><section class="freedom-dashboard"><div class="freedom-score"><span>PROGRESS TO FREEDOM</span><b>33.1%</b><div class="big-progress"><i></i></div><div class="score-row"><span>Current wealth<br><strong>$82,704.49</strong></span><span>Remaining<br><strong>$167,295.51</strong></span></div></div><div class="freedom-insight"><span class="insight-icon">✦</span><p class="kicker">YOUR NEXT MOVE</p><h2>Protect the base before chasing the upside.</h2><p>Your reserve is currently 11.4% of organized wealth. A larger liquidity cushion can create more flexibility for future investing.</p><a href="#assets">Review your reserve →</a></div></section><section class="section-title"><div><p class="kicker">THREE PILLARS</p><h2>Build freedom from a strong base.</h2></div></section><div class="pillars"><article><span>01</span><h3>Protect</h3><p>Build a dependable cash reserve and keep essential money accessible.</p><b>Reserve goal</b><strong>$25,000</strong></article><article><span>02</span><h3>Grow</h3><p>Direct long-term capital toward a diversified investment strategy.</p><b>Investment goal</b><strong>$150,000</strong></article><article><span>03</span><h3>Own your time</h3><p>Measure wealth by the options it creates, not only by the number on the screen.</p><b>Freedom threshold</b><strong>$250,000</strong></article></div>`,'freedom'); }
function renderTransfers() { layout(`<section class="page-heading"><p class="kicker">MOVE MONEY</p><h1>Put money<br><em>where it belongs.</em></h1><p>Organize transfers and deposits from one clear workspace.</p></section><div class="transfer-layout"><article class="transfer-card"><span class="asset-type">DEMO TRANSFER</span><h2>Move between accounts</h2><label>From<select><option>Everyday Checking • $12,480.22</option></select></label><label>To<select><option>High-Yield Savings • $28,904.10</option></select></label><label>Amount<input value="$500.00" inputmode="decimal"></label><button class="btn" type="button">Review transfer</button></article><article class="transfer-card light"><span class="asset-type">FUNDING</span><h2>Deposit planning</h2><p>Connect an approved financial institution or funding provider when production rails are enabled.</p><div class="funding-row"><b>Bank transfer</b><span>Available after provider integration</span></div><div class="funding-row"><b>Card funding</b><span>Requires authorized processor</span></div><div class="funding-row"><b>Cash deposit</b><span>Requires controlled operational workflow</span></div></article></div><div class="demo-note">Transfers in this interface are demonstrations only. No funds are moved.</div>`,'transfers'); }
function renderActivity() { layout(`<section class="page-heading"><p class="kicker">RECENT ACTIVITY</p><h1>Money<br><em>in motion.</em></h1><p>A clear history of illustrative account activity.</p></section><section class="activity-preview full-activity">${activityRow('Aug 31','Bonds IRA contribution','Retirement','$1,250.00','up')}${activityRow('Aug 29','Savings transfer','High-Yield Savings','$500.00','up')}${activityRow('Aug 27','Card purchase','Everyday Checking','$84.32','down')}${activityRow('Aug 25','Paycheck deposit','Everyday Checking','$3,200.00','up')}</section><div class="demo-note">Activity shown here is illustrative demonstration data.</div>`,'activity'); }
function renderProfile() { layout(`<section class="page-heading"><p class="kicker">PROFILE</p><h1>Your BONDS<br><em>workspace.</em></h1><p>Personal settings and workspace preferences.</p></section><div class="profile-grid"><article class="profile-card"><span class="asset-type">PROFILE</span><h2>YB</h2><p>Private wealth workspace</p><button class="btn" type="button">Edit profile</button></article><article class="profile-card light"><span class="asset-type">PREFERENCES</span><h2>Workspace settings</h2><div class="setting-row"><span>Private view</span><b>ON</b></div><div class="setting-row"><span>Notifications</span><b>ON</b></div><div class="setting-row"><span>Security alerts</span><b>ON</b></div></article></div>`,'profile'); }
function renderSecurity() { layout(`<section class="page-heading"><p class="kicker">SECURITY CENTER</p><h1>Protection<br><em>by design.</em></h1><p>Security controls and production readiness status.</p></section><div class="security-grid"><article class="security-card"><span class="status-dot"></span><h2>Workspace protected</h2><p>Frontend demonstration environment is isolated from live funds.</p></article><article class="security-card"><span class="asset-type">PRODUCTION GATE</span><h2>Provider verification required</h2><p>Live payments, custody, cards and account services require approved regulated providers and production credentials.</p></article></div>`,'security'); }

function route() { const key = location.hash.replace('#','') || 'dashboard'; (routes[key] || routes.dashboard)(); }
window.addEventListener('hashchange', route); route();
