
const defaults = {
  hostname: document.location.hostname.replace('www.', ''),
  tradingViewChartsEnabled: true,
};

// default chart settings
const tradingViewDefaultSettings = {
  symbol: '',
  autosize: true,
  interval: 15,
  timezone: 'America/New_York',
  theme: 'Light',
  style: 1,
  locale: 'en',
  toolbar_bg: '#f1f3f6',
  enable_publishing: false,
  hide_side_toolbar: false,
  save_image: false,
  hideideas: true,
  studies: [],
  container_id: 'tradingview_69562'
};

// move out of charts
// set asap
const exchanges = {
  'gdax.com': 'COINBASE',
  'kucoin.com': 'KUCOIN',
  'binance.com': 'BINANCE',
  'bittrex.com': 'BITTREX',
};

// we will have a larger list of exchanges, some may be supported, some not
// try to set the exchange asap
try {
  const exchange = settings.activeExchange = exchanges[settings.hostname];
  if (exchange) {
    chrome.storage.sync.set({ 'chrome-crypto-active-exchange': exchange });
  }
  // not supported by tradingview
  // already supported
  if (exchanges[exchange] === 'KUCOIN') {
    chrome.storage.sync.set({ 'chrome-crypto-tradingview-charts-enabled': false });
  }
}
catch(e) {
  console.warn('Exchange not supported.')
}

// default storage keys
const tradingViewStorageKeys = [
  'chrome-crypto-active-exchange',
  'chrome-crypto-tradingview-enabled',
  'chrome-crypto-tradingview-settings',
  'chrome-crypto-premium-signals',
  'chrome-crypto-premium-order-management'
];

// settings to send
const tradingViewSettings = {};

// update settings onMessage
chrome.runtime.onMessage.addListener(function(request, sender, respond) {
  if (request.working) {
    chrome.storage.sync.get(tradingViewStorageKeys, function(data) {
      tradingViewSettings.chartSettings = data.tradingViewChartsSettings;
      respond(tradingViewSettings);
    });
  }
  return true;
});

// set settings
chrome.storage.sync.get(tradingViewStorageKeys, function(data) {
  alert('sync');
  if (!data.tradingViewChartSettings) {
    chrome.storage.sync.set({ tradingViewChartsSettings: tradingViewDefaultSettings });
  }
})
