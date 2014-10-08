var request = require('request');

request.get('http://joshhartigan.github.io/rcv.json', // TODO: get urls (obvs)
    function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var json = JSON.parse(body);

        console.log( 'Installing ' + json['name'] + '...' );
        console.log( 'by ' + json['author'] );
      }
    }
);

