var express = require('express');
var app = express();
//var router = require('./routes/index');
var bodyParser = require('body-parser');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var router = require('./routes/index');
var socket = require('socket.io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use('/',router);

//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');
app.use( express.static("public"));
app.use('/',router);

//------------- Mongoose --------------

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(require('express-session')({
    secret: 'mouse',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//-------------------------------------------

// app.get('/home',function(req,res){
//   res.render('partials/login');
// });
//
// app.get('/signup',function(req,res){
//     res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });
//
// app.get('/signin', function(req, res){
//   //validate succesfull log in -- Pending
//   var coords = {lat: 7.8731, lng: 80.7718, tab: 'Murtaza', account_id: 'murtaza896'};
//   res.render('partials/dashboard', coords);
// });

// app.get('/maps', function(req,res){
//   res.render('partials/maps',{login_status: '1', tab: 'Murtaza', account_id: 'murtaza896'});
// })
var server = app.listen(8000,function(){
  console.log('listening at port 8000');
});

var io = socket(server);
var id;

io.on('connection', function(socket){
  id = socket.id;
  console.log(socket.id);
});

app.post('/pi',function(req,res){

  var lat = req.body.lat;
  var lng = req.body.lng;

  io.sockets.emit('marker',{
    lat: lat,
    lng: lng,
    id: id
  });

  res.send();

});
