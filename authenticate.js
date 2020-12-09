var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/users');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());   //support for session
passport.deserializeUser(User.deserializeUser());   //support for session