"use strict";

const levelSettings =  {
  success: {
    title: 'This website has not been pwned... yet. :D',
    iconPath: { 32: 'icons/pwned-32-success.png' },
    badgeColor: '#a7eab7',
    badgeText: ''
  },
  warning: {
    badgeColor: '#e7d6a0',
    title: 'One of the top domain of this website has been Pwned ! :\'x',
    iconPath: { 32: 'icons/pwned-32-warning.png' },
    badgeText: '!'
  },
  danger: {
    badgeColor: '#ea5050',
    title: 'This website has been Pwned ! :\'(',
    iconPath: { 32: 'icons/pwned-32-danger.png' },
    badgeText: '!'
  }
}

function updateView(level, tabId, setting) {
  console.debug("isPwnedModule : updateView(level=", level, " tabId=", tabId, " setting=", setting)

  browser.browserAction.setIcon({path: setting['iconPath'], tabId: tabId});
  browser.pageAction.setIcon({path: setting['iconPath'], tabId: tabId});

  browser.browserAction.setTitle({ title: setting['title'], tabId: tabId });
  browser.pageAction.setTitle({ title: setting['title'], tabId: tabId });

  browser.browserAction.setBadgeBackgroundColor({'color': setting['badgeColor']});
  browser.browserAction.setBadgeText({text: setting['badgeText']});
}

function updateDangerView(tabId, item) {
  let setting = levelSettings['danger'];
  updateView('danger', tabId, setting);
  if (isPwned.settings.displayPageAction)
    browser.pageAction.show(tabId)
}

function updateWarningView(tabId, items) {
  let setting = levelSettings['warning'];
  setting['badgeText'] = items.length.toString();
  updateView('warning', tabId, setting);
  if (isPwned.settings.displayPageAction)
    browser.pageAction.show(tabId);
}

function updateSuccessView(tabId) {
  let setting = levelSettings['success'];
  updateView('success', tabId, setting);
  if (isPwned.settings.displayPageAction)
    browser.pageAction.hide(tabId)
}
