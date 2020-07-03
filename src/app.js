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


// Redirect to main
app.get('/', (req, res) => {
    res.redirect('/main');
});

app.get('/successRegister', (req, res) => {
    res.render('successRegister.html');
});


//--------------------------------------------------------------------
// add routers

// login/*
app.use('/login', require('./login/login'));
app.use('/register', require('./login/register'));

// dataReceiver/*
app.use('/logoneg', require('./dataReceiver/logoneg'));
app.use('/logonec', require('./dataReceiver/logonec'));
app.use('/logoneth', require('./dataReceiver/logoneth'));
app.use('/logonecth', require('./dataReceiver/logonecth'));

// porestleaf/*
app.use('/porest_leaf', require('./porest_leaf'));
app.use('/upload', require('./upload'));
app.use('/results', require('./results'));

// admin/*
app.use('/memberList', require('./admin/memberList'));
app.use('/memberProfile', require('./admin/memberProfile'));
app.use('/check', require('./admin/check'));

// utils/*
app.use('/time', require('./utils/time'));

// spangi/*
app.use('/spangiNotification', require('./spangi/gcm/pushNotificationRouter'));
app.use('/spangi', require('./spangi/location'));

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
