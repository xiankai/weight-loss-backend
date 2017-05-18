var page = require('./page');

function onJqueryLoad() {
  return $('.SubGroup').not('.NotSub').find('#lnk_ItemUrlImage').map(function getLinks(i, ele) {
    return $(ele).attr('href');
  })
  .get();
}

function callback(links) {
  console.log(typeof links, links);
}

page.crawl('https://www.subway.com.au/menu', onJqueryLoad, null, callback);
