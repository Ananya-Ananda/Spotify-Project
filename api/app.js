var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const discoverPageRouter = require("./routes/discoverpg");

var authRouter = require('./routes/auth');
var savedsongsRouter = require('./routes/savedsongs');
var topsongsRouter = require('./routes/topsongs');
var topartistsRouter = require('./routes/topartists');


const spotifyPageRouter = require("./routes/spotify");
require('dotenv').config();
const forumPageRouter = require("./routes/forumpg");
require('dotenv').config();

var app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 }); 

 // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/spotify", spotifyPageRouter);
app.use("/discoverpg", discoverPageRouter);
app.use('/forumpg',forumPageRouter);
app.use('/auth', authRouter);
app.use('/savedsongs', savedsongsRouter);
app.use('/topsongs', topsongsRouter);
app.use('/topartists', topartistsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
