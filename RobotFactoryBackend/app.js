var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


/*
DEPENDENCIES FOR LOWDB
*/
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const robotsRouter = require("./routes/robots")


const { setCors } = require("./middleware/security")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));


/**
 *  SET UP THE LOWDB DATABASE
 */
//initialize the adapter to mock db file
const adapter = new FileSync("data/db.json");
// initialize mock db using lowdb
const db = low(adapter);
// add default entries to the database
db.defaults ({
    robots: []
}).write();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(setCors);


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use("/", indexRouter);
app.use("/robots", robotsRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/** EXPORT PATH */
module.exports = app;


//nodemon --exec PORT=3001 npm start --ignore 'data/db.json' --ignore README