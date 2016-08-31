var express = require('express');
var path = require('path');
var http = require('http');
var socketHandler = require('./socketHandler');
var redditController = require('./reddit/redditController.js');
var key = require('./config/keys.js');
var fs = require('fs');
var cloudinary = require('cloudinary');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var request = require('request');

// // Middleware
// var morgan = require('morgan');
var bodyParser = require('body-parser');

// Router
var router = require('./config/route.js');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


// Allow all headers
app.all('*', function(req, res, next) { 
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token' ); 
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', router);
app.use(express.static(path.join(__dirname, '/../client')));

var path = require('path'),
    fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || key.cloud_name,
    api_key: process.env.CLOUDINARY_API_KEY || key.api_key,
    api_secret: process.env.CLOUDINARY_API_SECRET || key.api_secret
})

app.post('/upload/:fileType', function(req, res) {

    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (req.params.fileType == 'jpg' || req.params.fileType == 'png') {
          console.log('i am inside the if statement')

            cloudinary.uploader.upload(files.displayImage.path,
                function(result) {
                    res.status(200).json(JSON.stringify(result))
                })
        } else {
            cloudinary.uploader.upload(files.displayImage.path,
                function(result) {
                    res.status(200).json(JSON.stringify(result))
                }, {
                  resource_type: "video"
                })
        }
    })
})

io.on('connection', socketHandler.newConnection);

var port = process.env.PORT || 9000;

server.listen(port, function() {
    console.log('server up and running on port ' + port);
});

exports.io = io;
exports.app = app;