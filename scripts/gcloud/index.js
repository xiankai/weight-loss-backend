const fetch = require('node-fetch');
const csvtojson = require('csvtojson');

/**
 * Cloud Function.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} The callback function.
 */
exports.helloWorld = function helloWorld (event, callback) {
  console.log(`My Cloud Function: ${event.data.message}`);
  callback();
};

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloHttp = function helloHttp (req, res) {
  const id = '19AOlwTsfAHr8dSEA2Qssm1cxBcA76ufPpd93UqFYF0w';
  const url = `https://spreadsheets.google.com/feeds/list/${id}/1/public/basic?alt=json`;
  const altUrl = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`;
  const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/pub?output=csv`;

  fetch(csvUrl)
  .then(resp => resp.text())
  // .then(body => res.send(body));
  .then(body =>
    csvtojson({ noheader: true })
    .fromString(body)
    .on('csv', (csvRow) => { // this func will be called 3 times
      console.log(csvRow); // => [1,2,3] , [4,5,6]  , [7,8,9]
    })
    .on('done', () => {
      // parsing finished
    })
  );
};
