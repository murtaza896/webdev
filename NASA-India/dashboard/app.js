var express = require('express');
var app = express();
var router = require('./routes/index');
var bodyParser = require('body-parser');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use('/',router);

//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// var io = require('socket.io').listen(3000);
//
//
// io.sockets.on('connection', function (socket) {
//     console.log('client connect');
//     req.io.sockets.emit('myEvent',{data: {lat: 28.7041, lng: 77.1025}});
// });

app.use( express.static( "public"));

app.listen(3000,function(){
  console.log('listening at port 3000');
});
