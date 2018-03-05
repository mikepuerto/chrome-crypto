
/**
 * TradingViewChart
 * @TODO Use utils to manipulate the DOM
 * @return {void}
 */

(function() {

  'use strict';

  const TradingViewChart = {

    instance: null,

    settings: {
      ticker: null,
      enabled: null,
      exchange: null,
      wrapper: null,
      hostname: null,
      container_id: null,
      chartSettings: null
    },

    init() {
      // If an instance exists we have already created a chart
      // for the page so there is no need to re-create it.
      this.messageHandler(function() {
        if (!this.instance) {
          this.setTicker();
          document.addEventListener('DOMContentLoaded', function() {
            this.injectChart();
          })
        }
      });
      return this;
    },

    setTicker() {
      // works for binance and bittrex, gdax does not
      // use a query string.
      const search = document.location.search.slice(1);

      // not implemented yet
      if (this.settings.exchange === 'COINBASE') {}
      if (this.settings.exchange === 'BINANCE') {}

      // example search: MarketName=BTC-SHIFT
      if (this.settings.exchange === 'BITTREX' && search.indexOf('MarketName') > -1) {
        const markets = search.split('=')[1].split('-');
        this.settings.market = markets[0].toUpperCase();
        this.settings.symbol = `${this.settings.exchange}:${markets[1].toUpperCase()}${markets[0].toUpperCase()}`;
        // bittrex does not convert ETH to USD(T)
        if (this.settings.market === 'ETH') {
          this.convertETHtoUSD();
        }
      }

    },

    injectChart() {
      this.hideExistingChart();
      this.createChartContainer();
      this.createChart();
    },

    // @TODO Add other exchanges
    hideExistingChart() {
      this.settings.wrapper = document.querySelectorAll('.chart-wrapper')[0];
      this.settings.wrapper.getElementsByTagName('iframe')[0].style.display = 'none';
    },

    // @TODO Make a generic function to create elements
    createChartContainer() {
      const element = document.createElement('div');
      const size = this.getSize();
      element.id = this.settings.container_id = 'tradingview-' + this.settings.ticker;
      element.style.width = size.width;
      element.style.height = size.height;
      this.settings.wrapper.appendChild(element);
    },

    // @TODO
    //  - Adjust classes for responsive grids
    //  - Allow user sizes where it makes sense
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

    // @TODO
    //  - Use websockets to listen for incoming prices
    //  - Inject price conversion element
    //  - Setup data binding to update element
    convertETHtoUSD() {
      const nodes = document.querySelector('.market-stats');
      const last = utils.findTextNode('Last', nodes, findTextNode('.base-market'));
    }

    /**
     * Send messages to background
     * @TODO Needs work
     * @method messageBackground
     * @return {void}
     */
    messageHandler(callback) {
      chrome.runtime.sendMessage({ working: true }, function(settings) {
        if (!settings) {
          return false;
        }
        const keys = Object.keys(settings);
        const opts = {};

        for (let i = 0, len = keys.length; i++) {
          opts[utils.convertStorageKey(key[i])] = settings[i];
        }

        this.settings = Object.assign({}, this.settings, opts);

        callback();

      }.bind(this));
    }

  };

})();
