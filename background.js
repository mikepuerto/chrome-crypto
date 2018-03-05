
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

// default storage keys
const tradingViewStorageKeys = [ 'tradingViewEnabled', 'tradingViewSettings' ];

// settings to send
const tradingViewSettings = {};

// update settings onMessage
chrome.runtime.onMessage.addListener(function(request, sender, respond) {
  console.log('working');
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
