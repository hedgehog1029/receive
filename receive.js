#!/usr/local/bin/node

var request = require('request');
var program = require('commander');
var colors = require('colors');

var rcvLog = function(msg) {
  console.log(" > rcv: ".magenta + msg);
};

program.version('0.1.0')
  .usage('<options> <url>')
  .option('-l, --local', 'Install Thing locally')
  .option('-g, --global', 'Install Thing globally')
  .option('-i, --info', 'Get info on Thing without installing')
  .parse(process.argv);

var thingsRepo = {};

request.get('http://joshhartigan.github.io/receive/things.json',
  function(err, response, body) {
    if (!err && response.statusCode == 200) {
      thingsRepo = JSON.parse(body);

      receiveThing(thingsRepo);
    }
  }
);

var receiveThing = function(json) {
  var thingArg = process.argv[process.argv.length - 1];

  if ( json[thingArg] ) {

    request.get( json[thingArg],
    function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var thingJson = JSON.parse(body);

        rcvLog('Located thing ' + thingJson['name'].bold.red + ':');
        if ( thingJson['description'] ) {
          rcvLog( '"' + thingJson['description'] + '"' );
        }
      }
    });

  } else {
    rcvLog('Thing ' + thingArg.bold.red + ' not found.');
  }
};
