'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(session({
    secret: 'tongiscool'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

app.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function(user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.sendStatus(204);
    }
  })
  .catch(next);
});

app.post('/signup', function (req, res, next) {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(function(user) {
    req.session.email = user.email;
    req.session.password = user.password;
    res.sendStatus(204);
  })
  .catch(next);
});

app.put('/logout', function(req, res, next){
  console.log(req.session.userId);

  req.session.userId = null;

  console.log('req session: ', req.session);
  // req.session.destroy();
});


app.get('/auth/me', function(req, res, next){
  User.findOne({
    where: {
      id : req.session.userId
    }
  })
  .then(function(user){
    if(!user){
      res.sendStatus(401);
    } else {
      // console.log(user);
      res.send(user);
    }
  });
});

// Google authentication and login
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/stories', // or wherever
    failureRedirect : '/users' // or wherever
  })
);

passport.use(
 new GoogleStrategy({
   clientID: '747541816255-7ujcnta6i9loqap6000a3kc289m01f2r.apps.googleusercontent.com',
   clientSecret: '_pPgRyKoeLUT4SH9j6c6giFY',
   callbackURL: 'http://localhost:8080/auth/google/callback'
 },
 // Google will send back the token and profile
 function (token, refreshToken, profile, done) {
  console.log('---', 'in verification callback', profile, '---');
   // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
   /*
   --- fill this part in ---
   */
  var info = {
    name: profile.displayName,
    email: profile.emails[0].value,
    photo: profile.photos ? profile.photos[0].value : undefined
  };
  User.findOrCreate({
    where: {googleId: profile.id},
    defaults: info
  })
  .spread(function (user) {
    done(null, user);
  })
  .catch(done);

 })
);

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
