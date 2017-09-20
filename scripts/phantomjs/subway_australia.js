var page = require('./page');

function onMenuLoad() {
  return $('.SubGroup').not('.NotSub').find('#lnk_ItemUrlImage').map(function getLinks(i, ele) {
    return $(ele).attr('href');
  })
  .get();
}

function openMealPages(links) {
  for (i in links) {
    console.log('https://www.subway.com.au' + links[i]);
    page.crawl('https://www.subway.com.au' + links[i], onMealPageLoad, null, saveMealInfo);
  }
}

function onMealPageLoad() {
  return $('.CustomItem').map(function getMealInfo(i, ele) {
    return {
      name: $(ele).find('.txt').html().trim(),
      nutrition: $(ele).attr('nutrition')
    };
  })
  .get();
}

function saveMealInfo(meals) {
  console.log(meals);
}

page.crawl('https://www.subway.com.au/menu', onMenuLoad, null, openMealPages);
