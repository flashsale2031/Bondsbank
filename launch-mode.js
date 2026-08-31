/* Bonds Bank public-launch safety layer.
 * This file intentionally does not create financial functionality.
 * Unsupported money movement, card issuance, custody, and trading remain disabled.
 */
(function () {
  const FEATURES = Object.freeze({
    publicSite: true,
    demoAuthentication: true,
    virtualCards: false,
    liveVisaIssuance: false,
    liveDeposits: false,
    liveTransfers: false,
    liveWalletFunding: false,
    liveTokenIssuance: false,
    liveTrading: false,
    liveCustody: false,
  });

  window.BONDS_BANK_LAUNCH = FEATURES;

  function showLaunchStatus() {
    const banner = document.createElement('div');
    banner.setAttribute('role', 'status');
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;padding:12px 16px;border:1px solid #d8c38b;border-radius:12px;background:#fffaf0;color:#183c37;font:600 13px system-ui;box-shadow:0 8px 30px rgba(0,0,0,.12)';
    banner.innerHTML = '<strong>PUBLIC LAUNCH MODE</strong> · Demonstration/testnet services only. Virtual cards, live Visa issuance, deposits, transfers, custody, token issuance and trading remain disabled until their required production integrations and approvals are active.';
    document.body.appendChild(banner);
  }

  function gateUnsupportedActions() {
    const blocked = /(virtual card|card issuance|deposit|transfer|send money|withdraw|fund wallet|trade|buy bonds|sell bonds|redeem)/i;
    document.addEventListener('click', function (event) {
      const target = event.target.closest('button,a');
      if (!target || !blocked.test(target.textContent || '')) return;
      if (target.dataset.launchAllowed === 'true') return;
      event.preventDefault();
      event.stopPropagation();
      alert('This feature is disabled in the public launch version until the required production integration, authorization, and compliance controls are active.');
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { showLaunchStatus(); gateUnsupportedActions(); });
  } else {
    showLaunchStatus(); gateUnsupportedActions();
  }
})();
