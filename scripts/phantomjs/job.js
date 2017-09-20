let queue = require('async/queue');

let phantomjs = spawn('./node_modules/phantomjs-prebuilt/bin/phantomjs', [
		'--load-images=false',
		`phantomjs/${script}`,
		...args
	]);
  
queueObj = queue()
