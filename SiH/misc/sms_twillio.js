// Twilio Credentials
const accountSid = 'AC7bc55f2c9887a764c47e09b4293b8b62';
const authToken = '74b8cc9926f334348ebdfc12a60d4d17';

var twilio = require('twilio');
//var config = require('../config');

// create an authenticated Twilio REST API client
var client = twilio(accountSid, authToken);


var options={
    to: '+919836707352',
    from: '+12679302147',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?'
};

client.sendMessage(options,function(err,response){

    if (err) {
        // Just log it for now
        console.error(err);
    } else {
        console.log('Message delivered ' + response);
    }


});

