"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var controllerCom = require('./controllers/computer_controller');

var controllerUser = require('./controllers/user_controller');

var app = express();
var port = process.env.PORT | 3000;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(controllerCom);
app.use(controllerUser);
mongoose.connect('mongodb://localhost:27017/computers_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err, res) {
  if (err) throw err;
  console.log("BD connect");
});
app.listen(port, function () {
  console.log("API Listening at http://localhost:".concat(port));
});