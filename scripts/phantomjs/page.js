var webpage = require('webpage');

function crawlPage(
  url,
  onJqueryLoad,
  args,
  callback,
  exit
) {
  console.log('opening page ' + url);
  var page = webpage.create();
  page.open(url, function onPageLoad(status) {
    if (status !== 'success') {
      console.error('Unable to access network');
    } else if (page.injectJs('scripts/jquery.js')) {
      try {
        var result = page.evaluate(onJqueryLoad);
        if (callback) {
          callback(result);
        }
      } catch (err) {
        console.error(err);
      }

      if (exit) {
        phantom.exit();
      }
    } else {
      console.error('Unable to inject jQuery');
    }
  });
}

module.exports = {
  crawl: crawlPage
};
