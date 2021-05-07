// IMPORTS
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// TODO
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// APP
var app = express();

// LOGGING
app.use(logger('dev'));
// BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// COOKIE PARSER
app.use(cookieParser());
// ACCESS TO STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// TODO
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
