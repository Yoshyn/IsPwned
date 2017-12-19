for (let node of document.querySelectorAll('[data-i18n]')) {
  text = browser.i18n.getMessage(node.dataset.i18n);
  node.appendChild(document.createTextNode(text));
}
