var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var SocketServer = require('ws').Server;

var app = express();

var routes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', routes);
// set up the error function
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
