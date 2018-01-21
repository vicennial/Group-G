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
  console.log(JSON.stringify(req.body));
  res.send(req.body);
});


//Query MongoDB for Login Request

//mongoose.model('isw',User);
//mongoose.connect('mongodb://localhost:27017/');

app.get('/',function(req,res)
{
	res.redirect('index.html');
    //res.render('index');
});


app.get('/MainPage',function(req,res)
{
	if (req.cookies.UserID == 'Machine1') {
		console.log(req.cookies);
		console.log("Redirect");
		res.redirect('machine.html');
	} else {
		res.redirect('index.html');
	}
});

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

app.post('/MainPage', function(req, res)
{
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("isw");
		var rnum = 0;
		var query = { uid: req.body.uid, pwd: req.body.pwd };
		dbo.collection("isw").count(query, function(err, numOfRecords) {
			if (err) { 
				throw err;
			} else {
				rnum = numOfRecords;
				db.close();
			}
		});
		
		dbo.collection("isw").find(query).toArray(function(err, result) {
			if (err) { 
				throw err;
			} else {
				if (rnum > 0) {
					if (result[0].uid == req.body.uid) {
						console.log("Login Successful!");
						// Set cookie
						res.cookie('UserID', req.body.uid)
						res.redirect('/MainPage');
					}
				} else {
					console.log("Wrong UID/Password");
				}
				db.close();
			}
			
		});
	});
});