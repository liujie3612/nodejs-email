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
    var emailObj = snap.val().Email;
    var config_email = {
        host: 'smtp.mxhichina.com',
        port: '25',
        auth: {
            user: userText,
            pass: passText
        }
    };

    if (emailObj != undefined) {
        for (date in emailObj) {
            var EmailTo = emailObj[date].To;
            var EmailSub = emailObj[date].Subject;
            var EmailText = emailObj[date].Content;
            var transporter = nodemailer.createTransport(config_email);
            var mailOptions = {
                from: userText,
                to: EmailTo,
                subject: EmailSub,
                text: EmailText
            };

            //定时设置
            /*            //一次
                        var date = new Date(2016, 1, 17, 21, 59, 0);
                        var j = schedule.scheduleJob(date, function() {
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });　
                        });*/

            /*            //周期
                        var rule = new schedule.RecurrenceRule();
                        rule.second = 0;
                        var j = schedule.scheduleJob(rule, function() {
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });　
                        });*/


        };
    }
});





module.exports = app;
