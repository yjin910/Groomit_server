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
// app.use(express.static()

// add routers
app.use('/login', require('./login'));
app.use('/graph', require('./graph'));
app.use('/logoneg', require('./logoneg'));
app.use('/logoneth', require('./logoneth'));
app.use('/time', require('./time'));
app.use('/getdata', require('./getdata'));
app.use('/profile', require('./profile'));
app.use('/main', require('./main'));
app.use('/register', require('./register'));

// module.exports.app = app;
module.exports = app;
