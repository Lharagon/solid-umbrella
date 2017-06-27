var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');


// require('.server/config/mongoose.js');

var sessionConfig = {
  secret: 'secretFamilyInTheBahamas',
  resave: false,
  saveUninitialized: true,
  name: 'myCookie',
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 3600000
  }
}

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}));
app.use(express.static(path.join(__dirname, 'surveyApp', 'dist')));

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js')
routes_setter(app);

app.listen(8000, function() {
  console.log('Now running on port: 8000')
})