var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var session = require('express-session')
var fs = require('fs');

var path = require('path');

router.use(session({secret: 'mouse'}));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var mongoose = require('mongoose');


// var Schema = mongoose.Schema;
//
// var UserDataSchema = new Schema({              //Creating just the blueprint
//   fisrtname: {type: String,required: true},
//   lastname: {type: String,required: true},
//   age: {type: Number,required: true},
//
//   emcontact1: {type: Number, required: true},
//   emcontact2: {type: Number,required: true},
//   emcontact3: {type: Number,required: true}
// });
//
// var UserData = mongoose.model('UserData', UserDataSchema);  //Creating actual model

const user = require('../Models/User');

router.post('/sign-up',function(req,res,next){

  var email = req.body.email;

  user.user_data.find({email: email})
    .exec()
      .then(function(doc){
        if(doc.length == 0) {
          const User = new user.user_data({

            _id: new mongoose.Types.ObjectId,
            firstname: req.body.fname,
            lastname: req.body.lname,
            dob: req.body.dob,
            sex: req.body.sex,
            email: req.body.email,
            password: req.body.password

          });

          User.save().then(function(result){
             var dir = './uploads/' + req.body.email
             fs.mkdirSync(dir);
             res.send(result);
          });
        }

        else {
          res.send("User Already Exists");
        }
  });
});


router.post('/log-in',function(req,res){

  var email = req.body.email;
  var pass = req.body.password;
  var sess = req.session;
  var sid = req.sessionID;

  var flag = 0;
  var i;

  console.log(sid);

  user.user_data.find({email: email,password: pass}).exec()
    .then(function(doc){
      if(doc.length!=0) {
        user.active_user.find({sid: sid}).exec()
          .then(function(doc){

            for(i=0;i<doc.length;i++)
            {
              if(doc[i].email == email)
                flag = 1;
            }

            if(flag == 0) {
              sess.email = email;
              sess.password = pass;
              sess.id = sid;

              const session_id = new user.active_user({
                _id: new mongoose.Types.ObjectId,
                sid: sess.sid,
                email: sess.email
              });

              session_id.save().then(function(){
                res.send(sid);
              });

            }
            else {
              res.send("error");
              // res.send("\n Logged in Already");
            }
          });
      }
      else {
        res.send("error");
        // res.send("Incorrect ID or Password");
      }
  });
});


// router.get('/download/:file', function(req, res, next){ // this routes all types of file
//   var sess = req.session;
//
//   var path=require('path');
//   var file = req.params.file;
//   var path = path.require('.') + '/uploads/' + sess.email + '/' + file;
//   res.download(path); // magic of download fuction
// });

router.get('/download',function(req,res){
  var sess = req.session;
  var path = require('path');

  user.active_user.find({sid: sess.id})
    .then(function(doc){
      if(doc.length!=0) {
        fs.readdir(path.resolve('.') + '/uploads/' + sess.email , function(err,items){
          if(!err)
          {
            console.log(items);
          }
          console.log(err);
        });
      }
      else {
        res.send("You are not logged in");
      }
    });
});

router.get('/log-out',function(req,res){

  var sess = req.session;
  user.active_user.find({sid: sess.id}).exec()
    .then(function(doc){
      if(doc.length!=0) {
        sess.destroy(function(){
          user.active_user.remove({sid: sess.id}).exec()
            .then(function(doc){
            console.log("you are logged out succesfully\n\n" + doc);
            res.send("you are logged out succesfully");
          });
        });
      }
      else {
        res.send("User is not logged in at all");
      }
    });

});

router.get('/get_data/:type',function(req,res){

   if(req.params.type == "user")
   {
     user.user_data.find()
      .then(function(doc){
        res.send("SIGNED UP USERS \n" + doc);
      });
   }
   else {
     user.active_user.find()
      .then(function(doc){
        res.send("ACTIVE USERS \n" + doc);
      });
   }

});

router.post('/upload',function(req,res){

  var sess = req.session;
  var email = sess.email;
  var File;

  var form = new formidable.IncomingForm();
  var dir = '../uploads/' + req.params.uid;

  form.parse(req);

  form.on('fileBegin', function (name, file){

      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, 0744);
      }

      File = new user.file({
        _id: new mongoose.Types.ObjectId,
        path: '../uploads/' + email + '/' + name,
        date: format(new Date,"dd-mm-yyyy_h:MM:ss_TT"),
        email: email
      });

      //file.name=format(new Date,"dd-mm-yyyy_h:MM:ss_TT");
      //file.name='test';
      file.path = dir + '/' + file.name;
    });

  File.save()
    .then(function(){
      console.log("File Uploaded succesfully");
    });
});

module.exports=router;
