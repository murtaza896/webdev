var msg91=require('msg91-sms');

//Authentication Key
var authkey='205854Ac4x00dWn75ab7f2c0';

//for multiple numbers
var numbers=[];
numbers.push('');

//for single number
var number='+919836707352';

//message
var message='Hey bitch';

//Sender ID
var senderid='SIH-test';

//Route
var route='4';

//Country dial code
var dialcode='91';


//send to single number

msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){

//Returns Message ID, If Sent Successfully or the appropriate Error Message
    console.log(response);
});

//send to multiple numbers

// msg91.sendMultiple(authkey,numbers,message,senderid,route,dialcode,function(response){
//
// //Returns Message ID, If Sent Successfully or the appropriate Error Message
//     console.log(response);
//
// });