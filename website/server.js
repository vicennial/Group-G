var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var router = express.Router();
var Schema = mongoose.Schema;
var cookieParser = require('cookie-parser');

//creating server
var server = require('http').createServer(app);
var io=require('socket.io')(server);
var socket = require('socket.io-client')('http://localhost:3500/');

// Support JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Support URL-encoded bodies 						 
app.use(bodyParser.urlencoded({ extended: true }));

//setting port
app.set('port', (process.env.PORT || 3100));

//starting server
server.listen(app.get('port'), '0.0.0.0', function () {
    console.log('Server started on port ' + app.get('port'));
});

//Sending prediction request
app.get('/send',function(req,res){
    var data=["1","2","3","4","5","6","7"];
    socket.emit("getpred",data,function(res){
        console.log("Prediction result is:"+res);
    });
    console.log("Prediction request sent to app.js!");
    res.send("Sent");
});
//Setting dummy users
var users=['Machine1','Akhil','Manish'];
var pwds=['test123','hi','iiti'];

io.on('connection',function(client){
    client.on('login',function(data,res){
        var uid_idx=users.indexOf(data.UserID);
        var pwd_idx=pwds.indexOf(data.pwd);
        var flag="False";
        if (pwd_idx==uid_idx && uid_idx!=-1){
            flag="True";
        }
        res(flag);
    });
    client.on('state',function(data,res){
        console.log(JSON.stringify(data));
    });
});
