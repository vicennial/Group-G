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
var machineDetails2=require('./models/model2');

var app = express();

//connect to mongo db
//Using database Industry_4_0
mongoose.connect('mongodb://localhost/Industry_4_0');
mongoose.Promise=global.Promise;

// Insert data to mongodb
// Inserting data in machine_types collection
/*
var machine1=new machineDetails1({
    username:"Printer 111",
    type:"printer",
    tag:"Printer 111 aPrinter val_1 aPrinter val_2 aPrinter val_4 aPrinter val_3"
});
machine1.save();
// Inserting data in details collection
var machine2=new machineDetails2({
    username:"Printer 111",
    property_1:"aPrinter val_1",
    property_2:"Printer val_2",
    property_3:"Printer val_3",
    property_4:"Printer val_4"

});
machine2.save();
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
        var dbo = db.db("Industry_4_0");
        var search_key=req.body.search;
        // Composite text index on tag
        dbo.collection("machine_types").createIndex(
            {
                tag: "text"

            }
        );
        var length=search_key.length/2;
        //first half of user input
        var part_key=search_key.substr(0,length);
        //last half of user input
        var part_key_ending=search_key.substr(length-1,search_key.length-1);
        // initializing array to store username
        var arr=new Array("1");
		var arr2=new Array("1");
	    var arr3=new Array("1");
	    //querying for similar entry using $text with meta textscore
        dbo.collection("machine_types").find({"$text": {"$search": search_key,$caseSensitive: false}},{textScore: {$meta: "textScore"}},{
    	 sort: {textScore: {$meta: "textScore"}}}).toArray(function(err, result1) {
		    if (err) throw err;
		    //console.log("1111");
		    for(var i=1;i<=result1.length;i++){
                arr[i]=result1[i-1].username;
                //console.log(arr[i]);
            }
            //querying for data similar to first half of user input and which are not in previous query
            dbo.collection("machine_types").find({$and :[{ username: { $nin: arr } }, { tag: { $regex: part_key, $options : "i" } }]}).toArray(function(err, result2){
                if (err) throw err;
                //console.log("222222");
                for(var i=1;i<=result2.length;i++){
	                arr2[i]=result2[i-1].username;
	                //console.log(arr2[i]);
	            }
	            //querying for data similar to last half of user input and which are not in previous querys
	            dbo.collection("machine_types").find({$and :[{ username: { $nin: arr } },{ username: { $nin: arr2 } }, { tag: { $regex: part_key_ending, $options : "i" } }]}).toArray(function(err, result3){
                	if (err) throw err;
	                //console.log("33333");
	                for(var i=1;i<=result3.length;i++){
		                arr3[i]=result3[i-1].username;
		                //console.log(arr3[i]);
		            }
		            ////querying for data which doesnot come in any previous query
		            dbo.collection("machine_types").find({$and :[{ username: { $nin: arr } },{ username: { $nin: arr3 } },{ username: { $nin: arr2 } }]}).toArray(function(err, result4) {
		            	if(err) throw err;
		            	db.close();
		            	//console.log("4444444");
		            	/*for(var i=0;i<result4.length;i++){
	                		console.log(result4[i].username);
	            		}*/
	            		res.render('search', { result1:result1,result2:result2,result3:result3,result4:result4,username:search_key });

		    		});
	        });
	        });
            
          
  		});
    });
});
app.get('/details/:username',urlencodedParser,function(req, res, next) {
    MongoClient.connect('mongodb://localhost', function(err, db) {
        if (err) throw err;
        var dbo = db.db("Industry_4_0");      //Connecting to Industry_4_0 database
        var details_search_key=req.params.username;        //receiving username
        dbo.collection("details").find({ username: details_search_key}).toArray(function(err, result3){
            if (err) throw err;
            db.close();
            console.log(result3);
            res.render('details', { detailed_result:result3  });
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
