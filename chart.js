
/**
 * TradingViewChart Main Script
 * @return {void}
 */

(function() {

  'use strict';

  const exchanges = {
    'gdax.com': 'COINBASE',
    'binance.com': 'BINANCE',
    'bittrex.com': 'BITTREX'
  };

  const TradingViewChart = {

    instance: null,

    settings: {
      ticker: null,
      enabled: null,
      wrapper: null,
      hostname: null,
      container_id: null,
      chartSettings: null
    },

    init() {
      if (!this.instance) {
        this.setETHToUsdEstimates(  )
        this.setExchange();
        this.setTicker();
        this.insertChart();
      }
    },

    setExchange() {
      const hostname = this.settings.hostname = document.location.hostname.replace('www.');
      this.settings.exchange = exchanges[hostname] ? exchanges[hostname] : false;
    },

    setTicker() {
      const search = document.location.search.slice(1);

      // not implemented yet
      if (this.settings.exchange === 'COINBASE') {}
      if (this.settings.exchange === 'BINANCE') {}

      // example search: MarketName=BTC-SHIFT
      if (this.settings.exchange === 'BITTREX' && search.indexOf('MarketName') > -1) {
        const markets = search.split('=')[1].split('-');
        this.settings.market = markets[0].toUpperCase();
        this.settings.symbol = `${this.settings.exchange}:${markets[1].toUpperCase()}${markets[0].toUpperCase()}`;
      }

      if (this.settings.market === 'ETH') {
        this.setUsdEstimates();
      }

    },

    insertChart() {
      this.hideExistingChart();
      this.createChartContainer();
      this.createChart();
    },

    hideExistingChart() {
      this.settings.wrapper = document.querySelectorAll('.chart-wrapper')[0];
      this.settings.wrapper.getElementsByTagName('iframe')[0].style.display = 'none';
    },

    createChartContainer() {
      const element = document.createElement('div');
      const size = this.getSize();
      element.id = this.settings.container_id = 'tradingview-' + this.settings.ticker;
      element.style.width = size.width;
      element.style.height = size.height;
      this.settings.wrapper.appendChild(element);
    },

    getSize() {
      let size = { autosize: true };

      // not implemented yet
      if (this.settings.exchange === 'GDAX') {}
      if (this.settings.exchange === 'BINANCE') {}

      if (this.settings.exchange === 'BITTREX') {
        size = { width: '100%', height: 550 }
      }

      this.settings.chartSettings = Object.assign({}, this.settings.chartSettings, size);

    },

    createChart() {
      const settings = this.settings.chartSettings = Object.assign({}, this.settings.chartSettings, {
        symbol: this.settings.symbol,
        container_id: this.settings.container_id
      });
      this.instance = new TradingView.widget(settings);
    },

    setETHToUsdEstimates() {
      const nodes = document.querySelector('.market-stats');
      const last = nodes.findTextNode('Last', node, findTextNode('.base-market'));
    }

  };

  /**
   * Find text node.
   * @method findTextNode
   * @param  {String} text Text to find.
   * @param  {HTMLNode} parentNode Node to traverse.
   * @param  {String} elementType Type of element to find.
   * @return {String} Found text.
   */
  function findTextNode(text, parentNode, selector) {
    const tags = parentNode.querySelector(selector);
    const searchText = text;
    let result;
    // loop found elements
    for (let i = 0, len = tags.length; i < len; i++) {
      if (tags[i].textContent == searchText) {
        result = tags[i];
        break;
      }
    }
    return result;
  }

  /**
   * Send messages to background
   * @method messageBackground
   * @return {void}
   */
  function messageBackground() {
    chrome.runtime.sendMessage({ working: true }, function(settings) {
      if (settings && settings.chartSettings) {
        this.settings.chartSettings = settings.chartSettings;
        this.init();
      }
    }.bind(this));
  }

  /**
   * Listen for document ready.
   *  - If ready remove document.onreadystatechange.
   *  - If not set document.onreadystatechange to callback.
   * @method ready
   * @param  {Function} callback function to be called on ready
   * @return {void}
   */
  function ready(callback) {
    if (document.readyState === 'complete') {
      document.onreadystatechange = null;
      return callback();
    }
    document.onreadystatechange = callback.bind(this);
  }

  // kick off
  ready(function() {
    messageBackground(this);
  });

})();
