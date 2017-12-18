"use strict";

const pwnedClient = {
  fetchBreaches: function () {
    const requestURL = "https://haveibeenpwned.com/api/breaches"
    const requestHeaders = new Headers();
    requestHeaders.append('accept', "application/vnd.haveibeenpwned.v2+json");
    requestHeaders.append('Access-Control-Allow-Origin', '*');
    const driveRequest = new Request(requestURL, {
      method: "GET",
      headers: requestHeaders
    });

    return fetch(driveRequest).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw response.status;
      }
    });
  }
}

function pwnedDomainPerform(tab) {
  let domains = allDomains(new URL(tab.url).hostname);
  let items = domains.map(function(domain) {
    return isPwned.domains[domain];
  }).filter(function(n){ return n != undefined });

  if (items.length > 0) {
    if (items[0].Domain == domains[0]) {
      updateDangerView(tab.id, items[0]);
    } else {
      updateWarningView(tab.id, items);
    }
  } else {
    updateSuccessView(tab.id);
  }
}

function allDomains(hostname) {
  let splited = hostname.split('.');
  let results = [];
  while (splited.length > 1 ) {
    results.push(splited.join('.'));
    splited.shift();
  }
  return results;
}
