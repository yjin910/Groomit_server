'use strict'

//import required libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //use the html as a template engine
app.engine('html', require('ejs').renderFile);


//basic set ups
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'views')));
app.use('/public', express.static(path.join(__dirname, 'public')));


//--------------------------------------------------------------------
// BodyParser for raw contents

//TODO need to test these codes

var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

app.use(bodyParser.json({
    verify: rawBodySaver
}));
app.use(bodyParser.urlencoded({
    verify: rawBodySaver,
    extended: true
}));
app.use(bodyParser.raw({
    verify: rawBodySaver,
    type: function () {
        return true
    }
}));

//--------------------------------------------------------------------
// IP Blacklist for security
//
// Reference: <https://stackoverrun.com/ko/q/10543379>


var expressDefend = require("express-defend");
var blacklist = require("express-blacklist");

app.use(blacklist.blockRequests('blacklist.txt'));
app.use(expressDefend.protect({ 
    maxAttempts: 7, 
    dropSuspiciousRequest: true, 
    logFile: 'suspicious.log', 
    onMaxAttemptsReached: function(ipAddress, url){
        blacklist.addAddress(ipAddress);
    }
}));


//--------------------------------------------------------------------
// add routers

// Redirect to main
app.get('/', (req, res) => {
    res.redirect('/main');
});

app.get('/successRegister', (req, res) => {
    res.render('successRegister.html');
});

// login/*
app.use('/login', require('./login/login'));
app.use('/register', require('./login/register'));

// dataReceiver/*
app.use('/logoneg', require('./dataReceiver/logoneg'));
app.use('/logonec', require('./dataReceiver/logonec'));
app.use('/logoneth', require('./dataReceiver/logoneth'));
app.use('/logonecth', require('./dataReceiver/logonecth'));

// porestleaf/*
app.use('/porest_leaf', require('./porestleaf/porest_leaf'));
app.use('/upload', require('./porestleaf/upload'));
app.use('/results', require('./porestleaf/results'));

// admin/*
app.use('/memberList', require('./admin/memberList'));
app.use('/memberProfile', require('./admin/memberProfile'));
app.use('/check', require('./admin/check'));

// utils/*
app.use('/time', require('./utils/time'));

// spange/*
app.use('/spangeNotification', require('./spange/spange'));

// 9room service
app.use('/getdata', require('./getdata'));
app.use('/profile', require('./profile'));
app.use('/main', require('./main'));
app.use('/graph', require('./graph'));

//--------------------------------------------------------------------


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.html');
});

// module.exports.app = app;
module.exports = app;
