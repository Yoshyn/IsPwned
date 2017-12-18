(function () {

  function saveOptions(e) {
    e.preventDefault();
    browser.runtime.sendMessage(
      {
        what: 'setUpdateFrequency',
        value: document.querySelector("#updateFrequency").value
      }
    );
    browser.runtime.sendMessage(
      {
        what: 'setDisplayPageAction',
        value: document.querySelector("#displayPageAction").checked
      }
    );
  }

  function restoreOptions() {
    browser.runtime.sendMessage(
      { what: 'getUpdateFrequency' },
      function(response) {
        document.querySelector('#updateFrequency').value = response.toString();
      }
    );
    browser.runtime.sendMessage(
      { what: 'getDisplayPageAction' },
      function(response) {
        document.querySelector('#displayPageAction').checked = response;
      }
    );
  }

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);

})();
