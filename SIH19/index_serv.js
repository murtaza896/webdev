var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var callme = require('../call');
const SendOtp = require('sendotp');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//------------------------------------------ CALL ------------------------------------------------

router.get('/get-audio/:id', function(req, res){
    var id = parsesInt(req.params.id,10);
    res.setHeader('Content-Type', 'text/plain');
    console.log(req);
    if(id == 0)
        res.send('Mein Hindi mein hoon');
    else if(id == 1)
        res.send('I am in English');
});

router.get('/get-audio-demo', function(req, res){
	
    var lang = req.query.CustomField;
    var response = '';
    var arr = ["hi", "ta", "bn", "en"];

    arr.forEach(function(item,index){
        if(lang == item)
        {
            lang = index;
        }
    });
    
    switch(lang)
    {
        case 0: response ="I am in Hindi";
                break;
        case 1: response = "I am in Tamil";
                break;
        case 2: response = "https://s3-ap-southeast-1.amazonaws.com/exotelaudiouploads/e4ee15bf5b11e06b0b51ce98924016da.wav";
                break;
        case 3: response = "I am in English";
                break;
    } 

    res.setHeader('Content-Type', 'text/plain');
    res.send(response);
});

router.get('/', function(req, res){
    res.send('index.html');
});

router.post('/callme', function(req, res){
    var numbers = req.body.numbers;
    var lang = req.body.lang;

    console.log(numbers);
    console.log(lang);
    // if(lang == 0)
    //     appid = '215749';
    // else if(lang == 1)
    //     appid = '214054';

    callme.outboundCall(numbers, lang).pipe(res);
    // callme.twilioApp(lang);
    // callme.twilioCall(numbers, lang);
    // res.send('call placed');  
});

//-------------------------------------------- Sign-up -----------------------------------------------------

router.post('/otp', function(req, res){         //OTP validate + Sign Up

    // var flag=0;
    const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0');
    // console.log(req.body.otp);
    // console.log(req.body.phone);
    // console.log(req.body.pincode);
    
    sendOtp.verify(req.body.phone, req.body.otp, function(err,res,data){
        console.log(res);
    });

    // if(flag == 1)
        // res.render('otp.ejs', {name: req.body.name, phone: req.body.phone, pincode: req.body.pincode, lang: req.body.lang, placeholder: 'OTP doesn\'t match, try again'});
    
    console.log(req.body);

    // console.log('/signup \n\n' + req.body );

    var name = req.body.name;
    var phone1 = req.body.phone;
    var pincode = req.body.pincode;
    var lang = req.body.lang;

    var sql_in = "INSERT INTO base (name, phn_no, pincode, language) VALUES ('" + name + "'," + phone1 + "," + pincode + ",'" + lang + "')";

    // var phone2 = req.body.phone2;
    // var locality = req.body.locality;
    // var state = req.body.state;
    // var district = req.body.district;
    // var subdiv = req.body.subdiv;
    // var address = req.body.addr;

    con.query(sql_in, function(err, result){
        if(err)
        {
                if(err == "ER_DUP_ENTRY")
                        console.log("Duplicate Entry in base table");
                else
                        res.send(err);
        }
        else
        {
            console.log("Values Inserted");

            var sql_in2 = "INSERT ignore INTO timeTab(pinCode) SELECT DISTINCT pinCode FROM base";

            con.query(sql_in2, function(err, result) {
                    if (err) {
                        if (err = "dup entry") {
                            console.log('Duplicate Entry in timeTab');         //post/get this line to show Duplicate Entry.
                        }
                        else
                            console.log(err);
                    }
                    else
                    {
                        console.log("New Value Inserted in timeTab!");               //o/p: Value Inserted! (for unique entries only)
                        var sql_sel = "SELECT DISTINCT pinCode FROM base";
                        var sql_cre_tab = "CREATE TABLE if not exists ?? (name VARCHAR(50), phn_no VARCHAR(13), language VARCHAR(2), date INT(4), PRIMARY KEY(name, phn_no))";
                        con.query(sql_sel, function(err, result, fields) {
                                if (err) console.log(err);
                                console.log(result);
                                Object.keys(result).forEach(function(key){
                                        con.query(sql_cre_tab, 'a'+result[key].pinCode, function(err, result) {
                                                if (err) console.log(err);
                                                console.log("Table Created!");
                                                var sql_sel2 = "SELECT base.pinCode AS pinCode, base.name AS name, base.phn_no AS phn_no, base.language AS language FROM base";
                                                var sql_in3 = "INSERT INTO ?? (name, phn_no,language,date) VALUES ?";
                                                con.query(sql_sel2, function(err, result, fields) {
                                                        if (err) console.log(err);
                                                        Object.keys(result).forEach(function(key) {
                                                                var values = [[result[key].name, result[key].phn_no, result[key].language, result[key].date]];
                                                                con.query(sql_in3, ['a'+result[key].pinCode, values], function(err, result) {
                                                                        if (err) {
                                                                                if (err = "Duplicate entry %") {
                                                                                        console.log('Duplicate Entry');         //post/get this line to show Duplicate Entry.
                                                                                }else throw err;
                                                                        }else console.log("Value Inserted!");           //o/p: Value Inserted! (for unique entries only)
                                                                });
                                                        });
                                                });


                                            });
                                });
                        });
                        // res.render('landing.ejs', {name: name, status: 'Registered Succesfully'});

                        //if(req.params.id == "web")
                            // res.send({'name': name, 'phone': phone1, 'pincode':pincode, 'lang':lang, 'device': 'web'});
                        //else if(req.params.id == "mobile")
                          //  res.send({'name': name, 'phone': phone1, 'pincode':pincode, 'lang':lang, 'device': 'app'})
                        res.render('landing',{name: name, status:'Succesfully'})
                    }
            });
        }
    });

});

//-------------------------------------------- Sign-up mobile -------------------------------------------------

router.post('/otp-mobile', function(req, res){         //OTP validate + Sign Up Mobile

    // var flag=0;
    const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0');
    // console.log(req.body.otp);
    // console.log(req.body.phone);
    // console.log(req.body.pincode);
    
    sendOtp.verify(req.body.phone, req.body.otp, function(err,res,data){
        console.log(res);
        // if(res.message == "otp_not_verified")
        // {
        //     flag = 1;
        // }
    });

    // if(flag == 1)
        // res.render('otp.ejs', {name: req.body.name, phone: req.body.phone, pincode: req.body.pincode, lang: req.body.lang, placeholder: 'OTP doesn\'t match, try again'});
    
    console.log(req.body);

    // console.log('/signup \n\n' + req.body );

    var name = req.body.name;
    var phone1 = req.body.phone;
    var pincode = req.body.pincode;
    var lang = req.body.lang;

    var sql_in = "INSERT INTO base (name, phn_no, pincode, language) VALUES ('" + name + "'," + phone1 + "," + pincode + ",'" + lang + "')";

    // var phone2 = req.body.phone2;
    // var locality = req.body.locality;
    // var state = req.body.state;
    // var district = req.body.district;
    // var subdiv = req.body.subdiv;
    // var address = req.body.addr;

    con.query(sql_in, function(err, result){
        if(err)
        {
                if(err == "dup entry")
                        console.log("Duplicate Entry in base table");
                else
                        res.send(err);
        }
        else
        {
            console.log("Values Inserted");

            var sql_in2 = "INSERT ignore INTO timeTab(pinCode) SELECT DISTINCT pinCode FROM base";

            con.query(sql_in2, function(err, result) {
                    if (err) {
                        if (err = "dup entry") {
                            console.log('Duplicate Entry in timeTab');         //post/get this line to show Duplicate Entry.
                        }
                        else
                            console.log(err);
                    }
                    else
                    {
                        console.log("New Value Inserted in timeTab!");               //o/p: Value Inserted! (for unique entries only)
                        var sql_sel = "SELECT DISTINCT pinCode FROM base";
                        var sql_cre_tab = "CREATE TABLE if not exists ?? (name VARCHAR(50), phn_no VARCHAR(13), language VARCHAR(2), date INT(4), PRIMARY KEY(name, phn_no))";
                        con.query(sql_sel, function(err, result, fields) {
                                if (err) console.log(err);
                                console.log(result);
                                Object.keys(result).forEach(function(key){
                                        con.query(sql_cre_tab, 'a'+result[key].pinCode, function(err, result) {
                                                if (err) console.log(err);
                                                console.log("Table Created!");
                                                var sql_sel2 = "SELECT base.pinCode AS pinCode, base.name AS name, base.phn_no AS phn_no, base.language AS language FROM base";
                                                var sql_in3 = "INSERT INTO ?? (name, phn_no,language,date) VALUES ?";
                                                con.query(sql_sel2, function(err, result, fields) {
                                                        if (err) console.log(err);
                                                        Object.keys(result).forEach(function(key) {
                                                                var values = [[result[key].name, result[key].phn_no, result[key].language, result[key].date]];
                                                                con.query(sql_in3, ['a'+result[key].pinCode, values], function(err, result) {
                                                                        if (err) {
                                                                                if (err = "Duplicate entry %") {
                                                                                        console.log('Duplicate Entry');         //post/get this line to show Duplicate Entry.
                                                                                }else throw err;
                                                                        }else console.log("Value Inserted!");           //o/p: Value Inserted! (for unique entries only)
                                                                });
                                                        });
                                                });


                                            });
                                });
                        });
                        // res.render('landing.ejs', {name: name, status: 'Registered Succesfully'});

                        //if(req.params.id == "web")
                        res.send({'name': name, 'phone': phone1, 'pincode':pincode, 'lang':lang, 'device': 'mobile'});
                        //else if(req.params.id == "mobile")
                          //  res.send({'name': name, 'phone': phone1, 'pincode':pincode, 'lang':lang, 'device': 'app'})
                        
                    }
            });
        }
    });

});

//--------------------------------------------- OTP web -----------------------------------------------------------------


router.post('/get-otp',function(req,res){            //requesting otp

    // var sql_qr = "SELECT name, phn_no FROM base WHERE name=" + "'" + req.body.name + "'";
    // con.query(sql_qr, function(err, result, fields){
    //     Object.keys(result).forEach(function(key){
    //         if('+' + result[key].phn_no == req.body.phone)
    //         {
    //             console.log('Duplicate_entry');
    //         }
    //     });
    // });


    console.log(req.body.phone);

    console.log('Sending sms....');

    const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0', 'OTP : ' + req.body.phone + ' is {{otp}}, Enter to confirm Sign-up');

    sendOtp.send(req.body.phone, 'OTP555', function(err,res,data){
        console.log(res);
    });

    //if(req.params.id == "web")
        res.render('otp', {name: req.body.name, phone: req.body.phone, pincode: req.body.pincode, lang: req.body.lang, placeholder: 'Enter OTP'});
    //else(req.params.id == "mobile")
      //  res.send('OTP sent');
        // res.redirect('/verify/' + req.query.phone);

});

//--------------------------------------------- OTP mobile ---------------------------------------------------------

router.post('/get-otp-mobile',function(req,res){            //requesting otp Mobile

    console.log(req.body.phone);
    var flag = 0;
    console.log('Sending sms to mobile....');

    const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0', 'OTP : ' + req.body.phone + ' is {{otp}}, Enter to confirm Sign-up');

    sendOtp.send(req.body.phone, 'OTP555', function(err,res,data){
        console.log(res);
        if(res.type == 'success')
           flag = 1;
    });

    if(flag == 1)
        res.send('OTP sent successfully');
    else
        res.send('OTP couldn\'t be sent');

    //if(req.params.id == "web")
        //res.render('otp.ejs', {name: req.body.name, phone: req.body.phone, pincode: req.body.pincode, lang: req.body.lang, placeholder: 'Enter OTP'});
    //else(req.params.id == "mobile")
        // res.redirect('/verify/' + req.query.phone);

});



// router.get('/verify/:phone',function(req,res){
//     console.log('you have been redirected ..');
//     res.render('otp.html',{phone: req.params.phone});
// });

// router.post('/otp',async function(req,res){

//     const sendOtp = new SendOtp('205854Ac4x00dWn75ab7f2c0');
//     // console.log(req.body.otp);
//     // console.log(req.body.phone);
//     // console.log(req.body.pincode);
    
//     sendOtp.verify(req.body.phone, req.body.otp, function(err,res,data){
//         console.log(res);
//     });

//     console.log(req.body);
//     res.redirect('/signup');
// });

// router.get('/autofill', function(req, res){
//     console.log(req.query.pincode);

//     res.send('I am hit');
// });

//-------------------------- webhook azib ------------------------------
router.post('/azib', function(req, res){
    var date = req.body.date;
    console.log(date);

    var arr=date.split('-');

    var m = parseInt(arr[1]);
    var d = parseInt(arr[0]);

    console.log('month: ' + m);
    console.log('day ' + d);
    

    var sql_qr = "SELECT pinCode FROM timeTab WHERE date=" + "'" + date + "'";
    
    con.query(sql_qr, function(err,result, fields){
        console.log(result);
        var numbers = [];
        var lang = [];

        Object.keys(result).forEach(function(key){
            // console.log(data);
            console.log('a' + result[key].pinCode);

            var sql_qr2 = "SELECT phn_no, language FROM ??";
            con.query(sql_qr2, 'a'+result[key].pinCode, function(err, result2, fields){
                Object.keys(result2).forEach(function(key){
                    console.log(result2[key].phn_no);                    
                    // var numbers = [];
                    // var lang = [];
                    
                    console.log("\n-------------------------------------\n");
                    console.log(result2[key].language);
                    console.log(result2[key].phn_no);
                    console.log(result2[key].name);
                    console.log("\n---------------------------------------\n");

                    callme.outboundCall(result2[key].phn_no, result2[key].language);
                    
                    // langs.push(result2[key].language);
                    // numbers.push(result2[key].phn_no);    
                    // names.push(result2[key].name);
                    //call em up from here .........
                });
                
            });
            // console.log(err);
        });
    });

    res.status(200).send('Thanks');
});

module.exports = router;
