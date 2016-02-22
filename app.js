var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var Wilddog = require("wilddog");
var schedule = require("node-schedule");
var nodemailer = require('nodemailer');
var routes = require('./routes/index');
var email = require('./routes/email');
var account = require('./routes/account');
var ref = new Wilddog("https://task-management.wilddogio.com");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/included');
app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('view engine', 'hbs');
app.use('/', routes);
app.use('/email', email);
app.use('/account', account);

ref.on("child_added", function(snapshot) {


});

module.exports = app;
