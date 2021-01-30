
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
const { sessionSecret } = require('./config');
const { restoreUser } = require('./auth');

const app = express();

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(cookieParser(sessionSecret));
app.use(session({
  name: 'reading-list.sid',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use(restoreUser);
app.use(express.urlencoded({ extended: false }));
app.use(bookRoutes);
app.use(userRoutes);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
