const chrome = require('chrome-remote-interface');
const { launchChrome } = require('../lib/page');
const _ = require('lodash');

function loadSubwayMenu(DOM) {
  return DOM.getDocument()
    .then(result => result.root.nodeId)
    .then(nodeId => Promise.all([ // get subway categories
      DOM.querySelectorAll({ nodeId, selector: '.SubGroup' }),
      DOM.querySelectorAll({ nodeId, selector: '.SubGroup.NotSub' })
    ]))
    .then(([
      allGroups,
      notSubs
    ]) => Promise.all( // narrow to meals
      _.difference(allGroups.nodeIds, notSubs.nodeIds)
      .map(nodeId => DOM.querySelector({ nodeId, selector: '' }))
    ))
    .then(nodeIds => Promise.all(
      nodeIds.map(nodeId => DOM.getAttributes({ nodeId }))
    ))
    .then(nodeAttributes => nodeAttributes.map(({ attributes }) => console.log(attributes)))
    .catch((err) => {
      console.error(err);
    });
}

function loadSubwayMenuItem(DOM) {
  return DOM.getDocument()
    .then(result => result.root.nodeId)
    .then(nodeId => DOM.querySelectorAll({ nodeId, selector: '.CustomItem' }))
    .then(({ nodeIds }) =>
      Promise.all(nodeIds.map(nodeId =>
        DOM.getAttributes({ nodeId })
      ))
      .then(({ attributes }) => console.log(attributes))
    );
}

launchChrome().then((launcher) => {
  chrome((protocol) => {
    // Extract the parts of the DevTools protocol we need for the task.
    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const { Page, DOM } = protocol;

    // First, need to enable the domains we're going to use.
    Promise.all([
      Page.enable(),
      DOM.enable()
    ]).then(() => {
      Page.navigate({ url: 'https://www.subway.com.au/menu' });

      // Wait for window.onload before doing stuff.
      Page.loadEventFired(() => {
        loadSubwayMenu(DOM).then(() => {
          protocol.close();
          launcher.kill(); // Kill Chrome.
        });
      });
    });
  }).on('error', (err) => {
    throw Error(`Cannot connect to Chrome:${err}`);
  });
});
