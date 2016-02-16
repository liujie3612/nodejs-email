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
var ref = new Wilddog("https://task-management.wilddogio.com");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/included');
app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('view engine', 'hbs');
app.use('/', routes);

//取回数据
ref.on('value', function(snap) {
    var userText = snap.val().Auth.User;
    var passText = snap.val().Auth.Pass;

    //邮件配置
    var config_email = {
        host: 'smtp.mxhichina.com',
        port: '25',
        auth: {
            user: userText,
            pass: passText
        }
    };
    var transporter = nodemailer.createTransport(config_email);
    var mailOptions = {
        from: userText,
        to: '1175667160@qq.com',
        subject: 'Hello world',
        text: 'Hello world'
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });　
});



//定时设置
var rule = new schedule.RecurrenceRule();
rule.second = 0;
//var date = new Date(2016, 1, 16, 15, 48, 0);
var j = schedule.scheduleJob(rule, function() {
    console.log('The world is going to end today.');
});
/*
var j = schedule.scheduleJob(date, function () {
    console.log('The world is going to end today.');
});
*/

module.exports = app;
