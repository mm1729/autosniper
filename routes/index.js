var express = require('express');
var path = require('path');
var router = express.Router();
var loki = require('lokijs');

var dB = new loki(path.resolve(__dirname, '../app.db'));
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('/ accessed');
  var file = "index.html";
  res.sendfile(file, {'root' : path.join(__dirname, '../public/views/')});
});

router.post('/login', function(req, res, next) {
  var loginInfo = dB.getCollection('loginInfo');

  if(!loginInfo) {
    dB.addCollection('loginInfo');
    dB.saveDatabase();
    loginInfo = dB.getCollection('loginInfo');
  }

  var user = {};
  user.username = req.body.username;
  user.password = req.body.password;
  console.log('login attempt by ' + JSON.stringify(user));

  // check username and password validity
  if(!checkFields(user)) {
      res.json({error : 'username and password must be valid'});
  }

  // check if username already exists
  var userExists = loginInfo.findOne({username : user.username});

  if(userExists) {
    var existPassword = userExists.password;

    if(existPassword === user.password) { // login
      var file = 'dashboard.html';
      res.sendfile(file, {'root' : path.join(__dirname, '../public/views')});
      console.log('success login');
      next();
    } else {
      res.json({error : 'username and password do not match'});
    }
  } else {
    // user does not exist
    res.json({error : 'user does not exist'});
  }
});


router.post('/signup', function(req, res, next) {
  var loginInfo = dB.getCollection('loginInfo');

  if(!loginInfo) {
    dB.addCollection('loginInfo');
    dB.saveDatabase();
    loginInfo = dB.getCollection('loginInfo');
  }

  var newUser = {};
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.netId = req.body.netId;
  newUser.caspass = req.body.caspass;
  console.log('Signup attempt ' + JSON.stringify(newUser));

  // check newUser fields
  if(!checkFields(newUser)) {
      res.json({error : 'All signup fields must be valid'});
  }

  var userExists = loginInfo.findOne({username : newUser.username});

  if(userExists) {
    res.json({error : 'User already exists'});
  } else {
    loginInfo.insert(newUser);
    dB.saveDatabase();
    var file = 'dashboard.html';
    res.sendfile(file, {'root' : path.join(__dirname, '../public/views')});
  }

});

/*
  Checks if the fields are not undefined or empty strings
*/
var checkFields = function(obj) {
  var keys = Object.keys(obj);

  var key;
  for(var i in keys) {
    key = keys[i];
    console.log(key + " " + obj[key]);
    if(typeof obj[key] === 'undefined' || obj[key] === '')
      return false;
  }

  return true;
};

module.exports = router;
