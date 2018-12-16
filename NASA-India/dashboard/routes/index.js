var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost:27017/test');
const user = require('../models/user');

router.get('/signin',function(req,res){
  res.render('Login_v12/index');
});

router.get('/signup',function(req,res){
  res.render('Login_v12/index2');
});

router.post('/signin',function(req,res){
  var email = req.body.email;
  var password = req.body.password;

  user.user_data.find({email: email, password: password}).exec()
    .then(function(doc){
      if(doc.length!=0)
      {
          res.render('homepage');
          socket.emit('myEvent', { data: {lat: 28.7041, lng: 77.1025} });
      }
      else
      {
        console.log("Log in unsuccesfull");
        res.end;
      }
    });
});

router.post('/signup',function(req,res){
  user.user_data.find({pid: req.body.pid})
    .exec()
      .then(function(doc){

        if(doc.length == 0)
        {
          const User = new user.user_data({

            _id: new mongoose.Types.ObjectId,
            fname: req.body.fname,
            lname: req.body.lname,
            pid: req.body.pid,
            email: req.body.email,
            password: req.body.password

          });

          User.save().then(function(result){
             //var dir = '../uploads/' + req.body.pid
             //fs.mkdirSync(dir);
             res.send('SignUp succesfull');
          });
        }
        else
        {
          res.send('User Already exists');
        }
    });
});

router.get('/home',function(req,res){
  res.render('home');
});

module.exports = router;
