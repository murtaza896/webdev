var express = require('express');
var app = express();
var router = require('./routes/index');
var bodyParser = require('body-parser');
var path = require('path');

var mysql = require('mysql');

// var con =  mysql.createConnection({
//         host: "localhost",  //put your hostname
//         user: "D_S",            //put your username here
//         password: "sih19",      //put your user password here
//         database: "SiH"
// });

// con.connect(function(err){
//         if(err) console.log(err);
//         else console.log('DB connected');
// });

// global.con = con;



// var expressLayouts = require('express-ejs-layouts');

// var mysql = require('mysql');

// var con = mysql.createConnection({

// });
// var expressLayouts = require('express-ejs-layouts');
// var router = require('./routes/index');
const dotenv = require('dotenv');

dotenv.config();
// app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(expressLayouts);
// app.use('/',router);

//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
// app.set('views', path.join( __dirname, 'views'));
// app.set('view engine', 'ejs');

app.use( express.static("public/ContactFrom_v4"));
app.use('/',router);


app.listen(process.env.PORT, function(){
    console.log('Listening at ' + process.env.PORT);
});