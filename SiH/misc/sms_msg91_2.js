var express=require('express');
var app=express();

const SendOtp = require('sendotp');

// var http=require('http');
// var request = require('request');


var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get('/otp',function(req,res){

    console.log(req.query.mobile);

    console.log('Sending sms....');

    const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0', 'OTP for your Aadhar no: '+req.query.aadhar+' is {{otp}}, Please DO NOT share it with anybody');

    sendOtp.send(req.query.mobile, 'OTP555', function(err,res,data){
        console.log(res);
    });

    res.redirect('/verify/'+req.query.mobile);
});

app.get('/verify/:mobile',function(req,res){

    console.log('you have been redirected ..');

});

app.post('/verify/:mobile',async function(req,res){

    const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0');
    console.log(req.query.otp);
    console.log(req.params.mobile);
    sendOtp.verify(req.params.mobile, req.query.otp, function(err,res,data){
        console.log(res);
    });

});

app.post('/resend/:mobile',async function(req,res){   //Here is the change....

    const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0');
    sendOtp.retry(req.params.mobile,false,function(err,res,data){
        console.log(res);
    });

});

app.listen(3000);