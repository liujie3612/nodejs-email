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

var config_email = {
    host: 'smtp.mxhichina.com',
    port: '25',
    auth: {
        user: "tasklist@wilddog.com",
        pass: "Abc123456"
    }
};

var transporter = nodemailer.createTransport(config_email);

ref.on("child_added", function (snapshot) {
    var uid = snapshot.key();

    ref.child(uid).on("child_added", function (snap) {
        var key = snap.key();
        // console.log(key);
        var EmailTo = snap.val().To;
        var EmailSub = snap.val().Subject;
        var EmailText = snap.val().Content;
        var rule = snap.val().Time;
        var mailOptions = {
            from: "tasklist@wilddog.com",
            to: EmailTo,
            subject: EmailSub,
            text: EmailText
        };
         console.log(mailOptions);
        var j = schedule.scheduleJob(rule, function () {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response + info.messageId + info.envelope + info.accepted + info.rejected);
                }
            })
        })

        /*        ref.child(uid).child(key).on("child_removed", function (snap_removed) {
                    if (j != null) {
                        j.cancel();
                    }
                    ref.child(uid).child(key).off();
                });*/

        ref.child(uid).on('child_removed', function (snap_removed) {
            console.log(snap_removed.key());
        })

    });

});

ref.on("child_removed", function (snapshot_removed) {
    var uid = snapshot_removed.key();
    ref.child(uid).off();
});

module.exports = app;