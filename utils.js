
const utils = (function() {

  return {

    /**
     * Listen for document ready.
     *  - If ready remove document.onreadystatechange.
     *  - If not set document.onreadystatechange to callback.
     * @TODO move to utils
     * @method ready
     * @param  {Function} callback function to be called on ready
     * @return {void}
     */
    ready(callback) {
      if (document.readyState === 'complete') {
        document.onreadystatechange = null;
        return callback();
      }
      document.onreadystatechange = callback.bind(this);
    },

    /**
     * Find text node.
     * @TODO move to utils
     * @method findTextNode
     * @param  {String} text Text to find.
     * @param  {HTMLNode} parentNode Node to traverse.
     * @param  {String} elementType Type of element to find.
     * @return {String} Found text.
     */
    findTextNode(text, selector, parentNode) {
      const tags = parentNode.querySelectorAll(selector);
      const node = parentNode || document;
      const searchText = text;

      let result;

      // loop found elements
      for (let i = 0, len = tags.length; i < len; i++) {
        if (tags[i].textContent === searchText) {
          result = tags[i];
          break;
        }
      }

      return result;

    },

    injectCss() {},

    findElement() {},

    createElement() {},

    convertStorageKey(key) {
      key = key.replace('chrome-crypto-', '');
      key.replace(/-([a-z])/g, function (original, replacement) {
        return replacement.toUpperCase();
      });
    }

  }

})();
