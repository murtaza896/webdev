var request = require("request");
var fs = require('fs');

function outboundCall(numbers, lang){
  var accountSid = "student580";
  var accountToken = "edc82e540212f12b53c661755600bbc2d79d5a96";
  var encoding = Buffer.from(accountSid + ':' + accountToken).toString('base64');
  var options = { method: 'POST',
    url: 'https://api.exotel.com/v2/accounts/'+ accountSid + '/campaigns',
    
    headers: 
    { 
      Authorization: 'Basic ' + encoding,
      'Content-Type': 'application/json' 
    },

    body: 
    { campaigns: 
        [ { 
            caller_id: '08047103685',
            url: 'http://my.exotel.in/student580/exoml/start_voice/214054',
            // from: [ '+918240656542','+919162912126', '+919088818131' , '+917979935326' , '+917595825106' ],
            from: [numbers], // numbers [ array of string containing numbers ]
            custom_field: lang
          } ],
        custom_field: { "lang": lang }
    },
    json: true };
    
  return request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(body.response[0].error_data);
    console.log(body);
    // log = body.response;
  });

  // return log;
}


function outboundCall2(number, lang){
  var accountSid = "student580";
  var accountToken = "edc82e540212f12b53c661755600bbc2d79d5a96";
  // var appid = "214054";
  // var CallerId = "08047103685";
  var encoding = Buffer.from(accountSid + ':' + accountToken).toString('base64');
  // var dataString = 'From='+ number +'&CallerId=' + CallerId + '&Url=http://my.exotel.com/' + accountSid + '/exoml/start_voice/' + appid + '&CustomField=' + lang;
  
  var options = { method: 'POST',
    //url: 'https://api.exotel.com/v2/accounts/'+ accountSid + '/campaigns',
    url: 'https://' + accountSid + ':' + accountToken + '@api.exotel.com/v1/Accounts/' + accountSid + '/Calls/connect.json',
     
    headers: 
    { 
      // Authorization: 'Basic ' + encoding,
      // 'Content-Type': 'application/x-www-form-urlencoded' 
    },

    form: 
    { 
      CallerId: '08047103685',
      Url: 'http://my.exotel.in/student580/exoml/start_voice/214054',
      // from: [ '+918240656542','+919162912126', '+919088818131' , '+917979935326' , '+917595825106' ],
      From: number, // numbers [ array of string containing numbers ]
      CustomField: lang
      //CallType: "trans"
    },
    
    json: true };
    

  // var options = {
  //     url: 'https://' + accountSid + ':' + accountToken + '@api.exotel.com/v1/Accounts/' + accountSid + '/Calls/connect.json',
  //     method: 'POST',
  //     body: dataString,
  //     json: true
  // };
  
  // console.log(options);

  return request(options, function (error, response, body) {
    if (error) console.log(error);
    //console.log(body.response[0].error_data);
    console.log(body);
    // log = body.response;
  });
  // return log;
}

function outboundSms(number, lang){
  var accountSid = "student580";
  var accountToken = "edc82e540212f12b53c661755600bbc2d79d5a96";
  // var appid = "214054";
  // var CallerId = "08047103685";
  var encoding = Buffer.from(accountSid + ':' + accountToken).toString('base64');
  // var dataString = 'From='+ number +'&CallerId=' + CallerId + '&Url=http://my.exotel.com/' + accountSid + '/exoml/start_voice/' + appid + '&CustomField=' + lang;
  var sms_body = [process.env.sms_HI, process.env,sms_EN, process.env.sms_BN, process.env.sms_TA, process.env.sms_TE, process.env.sms_KN, process.env.sms_GU, process.env.sms_UR];
  var sms_lang = ['hi', 'en', 'bn', 'ta', 'te', 'kn', 'gu', 'ur'];
  var encodtype;

  if(lang == 'en')
    encodtype = 'plain';
  else 
    encodtype = 'unicode';

  sms_lang.forEach(function(val, index){ 
    if(val == lang)
    {
      body = sms_body[index];
    }
  });
  
  var options = { method: 'POST',
    //url: 'https://api.exotel.com/v2/accounts/'+ accountSid + '/campaigns',
    url: 'https://' + accountSid + ':' + accountToken + '@api.exotel.com/v1/Accounts/' + accountSid + '/Sms/send.json',
     
    headers: 
    { 
      // Authorization: 'Basic ' + encoding,
      // 'Content-Type': 'application/x-www-form-urlencoded' 
    },

    form: 
    { 
      From: '08047103685',
      To: number,
      // Url: 'http://my.exotel.in/student580/exoml/start_voice/214054',
      // from: [ '+918240656542','+919162912126', '+919088818131' , '+917979935326' , '+917595825106' ],
      //From: number, // numbers [ array of string containing numbers ]
      Body: body, 
      EncodingType: encodtype
      //CustomField: lang
      //CallType: "trans"
    },
    
    json: true };
    

  // var options = {
  //     url: 'https://' + accountSid + ':' + accountToken + '@api.exotel.com/v1/Accounts/' + accountSid + '/Calls/connect.json',
  //     method: 'POST',
  //     body: dataString,
  //     json: true
  // };
  
  // console.log(options);

  return request(options, function (error, response, body) {
    if (error) console.log(error);
    //console.log(body.response[0].error_data);
    console.log(body);
    // log = body.response;
  });
  // return log;

}


// function twilioApp(lang)
// {
//   // Download the helper library from https://www.twilio.com/docs/node/install
//   // Your Account Sid and Auth Token from twilio.com/console
//   const accountSid = process.env.TWILIO_SID;
//   const authToken = process.env.TWILIO_AUTH;
//   const client = require('twilio')(accountSid, authToken);

//   client.applications
//         .create({
//           voiceMethod: 'GET',
//           voiceUrl: 'http://demo.twilio.com/docs/voice.xml',
//           friendlyName: lang
//         })
//         .then(application => console.log(application.sid));
// }

// function twilioCall(numbers, lang)
// {
//   const accountSid = process.env.TWILIO_SID;
//   const authToken = process.env.TWILIO_AUTH;
//   const client = require('twilio')(accountSid, authToken);

//   // var sid = ['APaf891cbbd9cf4f71bec22a92e4e373a7','AP404329ad59e84425b0bf6957d0e6aec9','AP853722e7dd224d72b032abcbfcc9115b']; // 0-hindi | 1-english | 2-tamil
//   var twiml_sids = process.env.TWIML_SIDS.split(' ');

//   client.calls
//         .create({
//           url: 'http://demo.twilio.com/docs/voice.xml',
//           to: numbers,
//           from: '+919836707352',
//           ApplicationSid: twiml_sids[lang] 
//         })
//         .then(call => console.log(call.sid));
// }


module.exports.outboundCall = outboundCall;
module.exports.outboundCall2 = outboundCall2;
module.exports.outboundSms = outboundSms;

// module.exports.twilioApp = twilioApp;
// module.exports.twilioCall = twilioCall;
