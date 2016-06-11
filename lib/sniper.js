var casper = require('casper').create();
var fs = require('fs');
var utils = require('utils');
//var url = '' + casper.cli.args[0];
var url = casper.cli.args[0];
var doneUrl = 'https://sims.rutgers.edu/webreg/refresh.htm';

// set up casper's user agent
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

casper.start(url, function(){
    var data = fs.read('userpass.txt');
    data = data.split('\n');
    var loginData = {'username' : data[0], 'password' : data[1]};
  this.fill('form#fm1', loginData);
  this.thenClick('input.btn-submit').then(function(){
    this.waitForUrl(url, function(){
      this.thenClick('input.btn-submit').then(function(){
        this.waitForUrl(doneUrl, function(){
          utils.dump(this.getElementsInfo("em[title='Course Index Number']"));
        });
      });
    });
  });
});

casper.run();
