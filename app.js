var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var bookingRouter = require('./routes/booking');
var contactRouter = require('./routes/contact');
var packagesRouter = require('./routes/packages');
var servicesRouter = require('./routes/services');
var usersRouter = require('./routes/users');
var addCarsRouter = require('./routes/addCars');
var thankyouCars = require('./routes/thankyouCars');
var thankyouPlace = require('./routes/thankyouPlace');
var addPlace = require('./routes/addPlace');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/javascripts'));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/booking',bookingRouter);
app.use('/contact', contactRouter);
app.use('/packages', packagesRouter);
app.use('/services', servicesRouter);
app.use('/addcars', addCarsRouter);
app.use('/thankyouCars', thankyouCars);
app.use('/addplace', addPlace);
app.use('/thankyouPlace', thankyouPlace);


//ese hi he
app.use('/users', usersRouter);



module.exports = app;
