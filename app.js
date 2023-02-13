// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// The code is importing four modules (aboutRouter, addcostRouter, adduserRouter, and reportRouter)
// and assigning them to constants.
// Once these modules are imported, they can be used in the main application code
// to handle specific routes and respond to HTTP requests from the client.
const aboutRouter = require('./routes/about');
const addcostRouter = require('./routes/addcost');
const adduserRouter = require('./routes/adduser');
const reportRouter = require('./routes/report');
const welcomeRouter = require('./routes/welcome');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// This code is using the Express.js framework to set up routing for a web application.
// Each line of code maps a URL path to a specific router.
// The routers imported from the ./routes directory will handle requests to the corresponding URL paths
// For example, when a client sends a request to the /about URL, the aboutRouter router
// will handle the request and send a response back to the client.
app.use('/about',aboutRouter);
app.use('/addcost',addcostRouter);
app.use('/adduser',adduserRouter);
app.use('/report',reportRouter);
app.use('/',welcomeRouter);

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
