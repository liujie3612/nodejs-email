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

ref.on("value", function(snapshot) {
    snapshot.forEach(function(snap) {
        var userText = snap.val().Auth.User;
        var passText = snap.val().Auth.Pass;
        var emailObj = snap.val().Email;
        var arrayObj = [];
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
                console.log(emailObj);
                var EmailTo = emailObj[date].To;
                var EmailSub = emailObj[date].Subject;
                var EmailText = emailObj[date].Content;
                var rule = emailObj[date].Time;
                var transporter = nodemailer.createTransport(config_email);
                var mailOptions = {
                    from: userText,
                    to: EmailTo,
                    subject: EmailSub,
                    text: EmailText
                };

                /*                var j = schedule.scheduleJob(rule, function() {
                                    transporter.sendMail(mailOptions, function(error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Message sent: ' + info.response + info.messageId + info.envelope + info.accepted + info.rejected);
                                        }
                                    })
                                });*/
            }
        }
    });
});

module.exports = app;
