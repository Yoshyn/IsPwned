"use strict";

let isPwned = {
  version: '0.0.1',
  noopFunc: function() {},
  currentTimestamp: function() { return Math.floor(Date.now() / 1000) },
  onError: function(error) { console.log(`Error: ${error}`); },
  settings: {
    updateFrequency: 7,
    displayPageAction: true
  },
  domainsUpdatedAt: 0,
  domains: {},
  updateSetting: function(key, value) {
    console.debug("isPwnedModule : updateSetting(key=", key, " value=", value);
    this.settings[key] = value;
    browser.storage.local.set({ settings: this.settings });
  },
  updateDomains: function(value) {
    this.domains = value;
    this.domainsUpdatedAt = this.currentTimestamp();
    browser.storage.local.set({
      domains: value,
      domainsUpdatedAt: this.domainsUpdatedAt}
    );
  },
  loadSettings: function() {
    console.debug("isPwnedModule : loadSettings()");
    self.browser.storage.local.get(['settings', 'domainsUpdatedAt'], bin => {
        if ( self.browser.runtime.lastError || bin instanceof Object === false) {
          console.log("isPwnedModule : Error while fetch settings", bin);
          return;
        }
        if (bin.settings instanceof Object) { this.settings = bin.settings; }
        if (bin.domainsUpdatedAt) { this.domainsUpdatedAt = bin.domainsUpdatedAt; }
        this.fetchBreaches();

    })
  },
  fetchBreaches: function() {
    console.debug("isPwnedModule : fetchBreaches()");
    if ((this.currentTimestamp() - isPwned.domainsUpdatedAt) < (isPwned.settings.updateFrequency * 24 * 60 * 60)) {
      console.debug("isPwnedModule : No need to retrieve domains due to updateFrequency.")
      self.browser.storage.local.get('domains', bin => {
        this.domains = bin.domains;
        console.debug("isPwnedModule : use domains from local storage");
        console.log(isPwned);
      })
      return;
    }

    fetchRemoteBreaches().then(results => {
      let domains = {}
      results.forEach(item => {
        if (item["Domain"] && item["Domain"] != "") { domains[item["Domain"]] = item; }
      });
      isPwned.updateDomains(domains)
      console.debug("isPwnedModule : fetchBreaches from haveibeenpwned.com finish successfully !")
    })
  },

  handleTabUpdated: function(tabId, changeInfo, tab) {
    if (tab.active && changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
      pwnedDomainPerform(tab);
    }
  },
  handleTabActivated: function(activeInfo) {
    let gettingTab = browser.tabs.get(activeInfo.tabId);
    gettingTab.then(pwnedDomainPerform, isPwned.onError);
  },

  onbrowserMessage: function(details, sender, callback) {
    let what = details instanceof Object ? details.what : undefined;
    if ( typeof callback !== 'function' ) {
        callback = isPwned.noopFunc;
    }
    let response;
    switch ( what ) {
    case 'getUpdateFrequency':
        response = isPwned.settings.updateFrequency;
        break;
    case 'getDomainsUpdatedAt':
      response = isPwned.domainsUpdatedAt;
      break;
    case 'getDisplayPageAction':
      response = isPwned.settings.displayPageAction;
      break;
    case 'setUpdateFrequency':
      var parsedValue = parseInt(details.value);
      if (!Number.isNaN(parsedValue))
        isPwned.updateSetting("updateFrequency", parsedValue)
      break;
    case 'setDisplayPageAction':
      isPwned.updateSetting("displayPageAction", details.value)
      browser.tabs.query({}).then(tabs =>
        {
          for (let tab of tabs)
            browser.pageAction.hide(tab.id);
        },
        isPwned.onError)
    break;
    default:
        break;
    }
    callback(response);
  },

  start: function() {
    console.log("----------------------------------");
    console.log(" IsPwned : START !!!!!!");
    console.log("----------------------------------");

    this.loadSettings();
    browser.tabs.onUpdated.addListener(this.handleTabUpdated); // update when the tab is updated
    browser.tabs.onActivated.addListener(this.handleTabActivated); // update when the tab is activated
    browser.runtime.onMessage.addListener(this.onbrowserMessage);
  }
};

isPwned.start();
