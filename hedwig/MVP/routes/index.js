var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var bodyParser = require('body-parser');
var socket = require('socket.io');

// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/signup', auth.register);

// route for register action
router.post('/signup', auth.doRegister);

// route to login page
router.get('/', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

// router.get('/refresh',function(req, res){
//   console.log("ajax called");
//   res.render('partials/maps', {layout:false});
// });



// router.get('/apicall', function(req, res){
//   const url = 'http://18.236.62.107:8000/ml/predict_deforestation/?latitude=' + req.query.lat  + '&longitude=' + req.query.lng;
//
//   var request = require('request');
//   var temp;
//
//   request(url, function (error, response, body){
//   //request.get(url).on('response',function (response){
//      console.log(url);
//      console.log('error:', error); // Print the error if one occurred
//      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//      console.log('body:', body);
//      // Print the HTML for the Google homepage.
//   });
//
//   //console.log(body);
//   //res.send(body);
//   // fetch(url, function(data){
//   //     Console.log(JSON.stringify(data));
//   // });
// });

module.exports = router;
