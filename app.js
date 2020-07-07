const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

let checkError;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//Set view engine to pug
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

app.all('books/*', (req, res, next) => {
    // next(createError(404));
    let err = new Error('This page doesn\'t exist'); //create 404 status error
    err.statusCode = 404;
    checkError = false;
    next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    // next(createError(404));
    let err = new Error('This page doesn\'t exist'); //create 404 status error
    err.statusCode = 404;
    checkError = false;
    next(err);
});

// error handler
app.use( (err, req, res, next) => {
if(checkError === false){
    res.render('page-not-found');
}else {
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}
});

module.exports = app;
