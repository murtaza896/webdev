var path = require('path');
//var mime = require('mime');
var fs = require('fs');
var express= require('express');
var app=express();
var ejs=require('ejs');

app.set('view engine','ejs');

app.set('views',__dirname + '/views');

app.get('/download', function(req, res){

    var file = __dirname + '/upload-folder/dramaticpenguin.MOV';

    var filename = path.basename(file);
    var mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});


app.get('/export',function(req,res){

    var conversion = require("html-to-xlsx")();
    conversion("<table><tr><td>cell value</td></tr></table>" , function(err, stream){
    //readable stream to xlsx file
        stream.pipe(res);
        console.log(res);
    });

});

app.get('/test',function(req,res){

    res.render('dwnld');

});

app.listen(3000);

