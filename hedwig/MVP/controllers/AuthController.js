var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var path = require('path');

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('partials/login', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.sendFile('/home/murtaza/Desktop/Projects/CIAP/MVP/public/signup.html');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.sendFile('/home/murtaza/Desktop/Projects/CIAP/MVP/public/signup.html');
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('partials/login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.render('partials/dashboard', {name: req.user.name});
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};



module.exports = userController;
