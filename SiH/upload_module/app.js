var express = require('express');
var format=require('dateformat');
var bodyParser = require('body-parser');
var path= require('path');

var db=require(path.join(__dirname , '/file_post/read_write.js'));

var formidable = require('formidable');
var fs=require('fs');
var app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use('/db',db);


app.get('/upload/:uid', function (req, res){
    var token=req.params.uid;
    res.redirect('/fetch/'+token);
    //res.render('index',{message:token,list});
    //res.sendFile(__dirname + '/sih_upload/tsp_upload.ejs');
});

app.post('/upload/:uid', function (req, res){

    var form = new formidable.IncomingForm();
    var dir = __dirname + '/file_post/uploads/' + req.params.uid;

    form.parse(req);

    form.on('fileBegin', function (name, file){

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0744);
        }

        file.name=format(new Date,"dd-mm-yyyy_h:MM:ss_TT");
        //file.name='test';
        file.path=dir +'/' +file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        // res.('/dbupload/'+file.name+'/'+req.params.uid);

        res.redirect('/db/'+file.name+'/'+req.params.uid); //uncomment me !!
        //res.redirect('/upload/'+req.params.uid);
    });

});

app.get('/fetch/:uid',function(req,res){

    var dir=__dirname + '/file_post/uploads/' + req.params.uid;

    //const testFolder = './tests/';

    fs.readdir(dir, function(err, items) {

        if(!err)
        {
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);
            }
        }

        var token=req.params.uid;
        res.render('index',{message:token,message2:items});

    });

    console.log('fetching files .... ');

});


app.listen(3000);
