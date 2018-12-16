
var request = require('request');
var FormData = require('form-data');
var fs = require('fs');
var express= require('express');
var app=express();
var router = express.Router();

router.get('/:filename/:uid',function(req,res) {

    var form = new FormData();

    form.append('uploaded_by', req.params.uid);
    form.append('file_name', 'file');



    form.getLength(function (err, length) {
        if (err) {
            return requestCallback(err);
        }
        form.append('datafile', fs.createReadStream( __dirname + '/uploads/' + req.params.uid + '/' + req.params.filename,'utf-8'));
        console.log('your file is being uploaded to the server ... ');

        var r = request.post("http://ec2-13-127-228-106.ap-south-1.compute.amazonaws.com:8000/dataprocessor/upload/", requestCallback);
        r._form = form;
    });

    function requestCallback(err, res, body) {
        if(err)
        {
            console.log('file couldn\'t be uploaded');
            console.log(err);
        }
        else
        {
            console.log('file uploaded succesfully');
            console.log(res);
        }
    }

    res.redirect('/upload/'+req.params.uid);
});

module.exports = router;

