var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var helmet=require('helmet');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//app.use(helmet());

//app.use(helmet.hidePoweredBy());
  app.disable("x-powered-by")



  //frameguard
  app.use(helmet.frameguard());
  app.use(
    helmet.frameguard({
      action: "deny",
    })
  );

  // Sets "X-XSS-Protection: 0"
  app.use(helmet.xssFilter());



  // Sets "X-Content-Type-Options: nosniff"
  app.use(helmet.noSniff());


  // Sets "X-Download-Options: noopen"
  app.use(helmet.ieNoOpen());


  //app.use(helmet.dnsPrefetchControl());
  // Sets "X-DNS-Prefetch-Control: off"
  app.use(
  helmet.dnsPrefetchControl({
    allow: false,
  })
  );

  // app.use(helmet.contentSecurityPolicy(helmet.contentSecurityPolicy.getDefaultDirectives()
  // ));
  // Sets "Content-Security-Policy: default-src 'self';script-src 'self' example.com;object-src 'none';upgrade-insecure-requests"
  // app.use(
  // helmet.contentSecurityPolicy({
  //   directives: {
  //     defaultSrc: ["'self'"],
  //     scriptSrc: ["'self'", "github.com"],
  //     objectSrc: ["'none'"],
  //     upgradeInsecureRequests: [],
  //   },
  // })
  // );
  


 // helmet.hsts sets the Strict-Transport-Security header which tells 
 // browsers to prefer HTTPS over insecure HTTP

 // 
 // app.use(
 //   helmet.hsts({
 //     maxAge: 123456,
 //   })
 // );

 // 
 // app.use(
 //   helmet.hsts({
 //     maxAge: 123456,
 //     includeSubDomains: false,
 //   })
 // );

 //
 // app.use(
 //   helmet.hsts({
 //     maxAge: 63072000,
 //     preload: true,
 //   })
 // );

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
