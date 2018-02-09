var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose=require('mongoose');
var MongoClient = require('mongodb').MongoClient;

var index = require('./routes/index');
var machineDetails1=require('./models/model1');


var app = express();

//connect to mongo db

mongoose.connect('mongodb://localhost/machine_details');
mongoose.Promise=global.Promise;

// Insert data to mongodb
/*
var machine1=new machineDetails1({
    username:"Printer",
    type:"Printer"

});
machine1.save();
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// using favicon

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// handling main search page request

app.use('/', index);

// handling entered search key and redirecting to result page

app.use('/search',urlencodedParser,function(req, res, next) {
   MongoClient.connect('mongodb://localhost', function(err, db) {
        if (err) throw err;
        var dbo = db.db("machine_details");
        var search_key=req.body.search;
        // Composite text index on username and type
        dbo.collection("machine_types").createIndex(
            {
                username: "text",
                type:"text"

            }
        );
        var length=search_key.length/2;
        var part_key=search_key.substr(0,length);
        var part_key_ending=search_key.substr(length-1,search_key.length-1);
        // querying database
        dbo.collection("machine_types").find({$or:[{$text: {$search: search_key,$caseSensitive: false}},{ username: { $regex: part_key_ending, $options : "i"   } }, { username: { $regex: part_key, $options : "i" } }]}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.render('search', { title: result });
        });

    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;