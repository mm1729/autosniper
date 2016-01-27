var casper = require('casper').create();
var utils = require('utils');
//var url = '' + casper.cli.args[0];
var url = casper.cli.args[0];
var doneUrl = 'https://sims.rutgers.edu/webreg/refresh.htm';

// set up casper's user agent
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

casper.start(url, function(){

  this.fill('form#fm1', {
    'username' : 'mm2177',
    'password' : 'mDeepa010!'
  });

  this.thenClick('input.btn-submit').then(function(){
    this.wait(2000, function(){
      this.thenClick('input.btn-submit').then(function(){
        this.waitForUrl(doneUrl, function(){
          utils.dump(this.getElementsInfo("em[title='Course Index Number']"));
        });
      });
    });
  });
});

casper.run();
