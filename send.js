#!/usr/local/bin/node

var Firebase = require('firebase');
var program = require('commander');
var colors = require('colors');
var base = new Firebase('https://receive-repo.firebaseio.com/');

var sndLog = function(msg) {
  console.log(' > snd: '.magenta + msg);
};

program.version('0.1.0')
    .usage('<thing> <url>')
    .parse(process.argv);

function send(thing, url) {
    base.child(thing).once('value', function(snapshot) {
        if (snapshot.val() == null) {
            sndLog('ok: '.green + 'no existing data');
            base.child(thing).set(url, function(error) {
                if (error) {
                    sndLog('error'.bold.red + ' putting file ' + url.red);
                    sndLog('try again');
                } else {
                    sndLog('put file as ' + thing.green);
                    process.exit();
                }
            });
        } else {
            sndLog('fail: '.bold.red + 'data already exists at thing ' + thing.red);
            process.exit();
        }
    });
}

var sendThing = function() {
    var thingArg = process.argv[process.argv.length - 2];
    var urlArg = process.argv[process.argv.length - 1];
    
    sndLog('package ' + thingArg.green + ' scheduled for adding');
    sndLog('json file located at ' + urlArg.green);
    sndLog('checking for existing data');
    
    send(thingArg, urlArg);
}

sendThing();