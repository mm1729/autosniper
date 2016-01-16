var casper = require('casper').create();
//var url = '' + casper.cli.args[0];
var url = 'https://sims.rutgers.edu/webreg/editSchedule.htm?login=cas&semesterSelection=12016&indexList=02667';
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
          this.captureSelector('yes.png', 'body');
        });
      });
    });
  });
});

casper.run();
