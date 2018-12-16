var express = require('express');
var app = express();
//var router = require('./routes/index');
var bodyParser = require('body-parser');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
// app.use('/',router);
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use( express.static( "public"));

app.get('/home',function(req,res){
  res.render('home');
});

app.get('/signin',function(req,res){
  res.render('Login_v12/index');
});

app.get('/signup',function(req,res){
  res.render('Login_v12/index2');
});

app.listen(3000,function(){
  console.log('listening at port 3000');
});
