var router=require('./routes/index.js');
var express=require('express');
var app = express();

var mongoose = require('mongoose');
const user = require('./Models/User');

mongoose.connect('mongodb://localhost:27017/test',function(){
  console.log('Connection Established');
  user.active_user.remove().then(function(){
    console.log("Active User reset");
  });
});


app.use('/',router);

app.listen(3000,'192.168.43.179');
