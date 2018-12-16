// API ROUTES -------------------

// get an instance of the router for api routes
var express=require('express');
var app=express();

var apiRoutes=express.Router();

var username='murtz6378';
var pass='password';

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token


// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {


});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
app.listen(3000);