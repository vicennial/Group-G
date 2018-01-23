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
var uid;
//creating server
var server = require('http').createServer(app);
var io=require('socket.io')(server);
var socket = require('socket.io-client')('http://localhost:3100/');

// Support JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Read Cookie
app.use(cookieParser());
// serves static files from public
app.use(express.static(path.join(__dirname, 'public')));
// serves files frow views
app.use(express.static(path.join(__dirname, 'views')));
// Support URL-encoded bodies 						 
app.use(bodyParser.urlencoded({ extended: true }));  

//setting port
app.set('port', (process.env.PORT || 3500));

//starting server
server.listen(app.get('port'), '0.0.0.0', function () {
    console.log('Server started on port ' + app.get('port'));
});

//Body Parser : Print to Log the Value of Selected Machine State
app.post("/SendState", function(req, res) {
	var obj=req.body;
	obj.machine=uid;
  console.log(JSON.stringify(obj));
  socket.emit("state",obj);
  res.send(req.body);
});


app.get('/',function(req,res)
{
	res.redirect('index.html');
    //res.render('index');
});


// app.get('/MainPage',function(req,res)
// {
// 	if (req.cookies.UserID == 'Machine1') {
// 		console.log(req.cookies);
// 		console.log("Redirect");
// 		res.redirect('machine.html');
// 	} else {
// 		res.redirect('index.html');
// 	}
// });

app.get('/Logout', function(req,res) {
	res.clearCookie("UserID");
	res.redirect('index.html');
});

app.get('/machine',function(req,res)
{
	console.log("Redirect");
	res.redirect('index.html');
});

app.get('/machine.html',function(req,res)
{
	console.log("Redirect");
	res.redirect('index.html');
});
socket.on('connect', function () {
	console.log("App.js Socket Connected");
});
app.post('/MainPage', function(req, res)
{
	var data={};
	data.UserID=req.body.uid;
	data.pwd=req.body.pwd;
	var user_id=data.UserID;
	// console.log(data);
	socket.emit("login",data,function(data){
		if(data=="True"){
			console.log("Login successfull!");
			uid=user_id;
			res.redirect('/machine.html');
		}
		else{
			console.log("Login attempt failed!");
			uid='null';
			res.redirect('/index.html');
		}
	});
});