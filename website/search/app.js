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

// Insert data to database
// Inserting data in machine_types collection
/*
var machine1=new machineDetails1({
    username:"Printer_2",
    type:"3D Printer"
});
machine1.save();
// Inserting data in details collection
var machine2=new machineDetails2({
    username:"Printer_2",
    property_1:"Printer_2_P_1",
    property_2:"Printer_2_P_2",
    property_3:"Printer_2_P_3",
    property_4:"Printer_2_P_4"

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
                username: "text",
                type: "text"

            }
        );
        dbo.collection("details").createIndex(
            {
                property_1: "text",
                property_2: "text",
                property_3: "text",
                property_2: "text"
            }
        );
        var length=search_key.length/2;
        //first half of user input
        var part_key=search_key.substr(0,length);
        //last half of user input
        var part_key_ending=search_key.substr(length-1,search_key.length-1);
        // initializing array to store username
        var arr=new Array("1");
        var arr_2_1=new Array("1");
        var arr_2_2=new Array("1");
        var arr_2_3=new Array("1");
		var arr2=new Array("1");
	    var arr3=new Array("1");
	    //querying for similar entry in "machine_types" collection
        dbo.collection("machine_types").find({"$text": {"$search": search_key,$caseSensitive: false}},{textScore: {$meta: "textScore"}},{
    	 sort: {textScore: {$meta: "textScore"}}}).toArray(function(err, result1) {
		    if (err) throw err;
		    for(var i=1;i<=result1.length;i++){
                arr[i]=result1[i-1].username;
            }
            //querying for similar entry in "details" collection
            dbo.collection("details").find({"$text": {"$search": search_key,$caseSensitive: false}},{textScore: {$meta: "textScore"}},{
            sort: {textScore: {$meta: "textScore"}}}).toArray(function(err, result_2_1) {
                if (err) throw err;
                for(var i=1;i<=result_2_1.length;i++){
                    arr_2_1[i]=result_2_1[i-1].username;
                }
                //querying for 'type' property in "machine_types" collection (For those which are result of querying "details" collection)
            	dbo.collection("machine_types").find({username:{$in: arr_2_1}}).toArray(function(err, result_2_1_types) {
            		if (err) throw err;
					//querying for data similar to first half of user input and which are not in previous query, in "machine_types" colllection
	            	dbo.collection("machine_types").find({$and :[{ username: { $nin: arr } },{ username: { $nin: arr_2_1 } }, 
	            	{ $or:[{username: { $regex: part_key, $options : "i" }},{type: { $regex: part_key, $options : "i" }} ]}]})
	            	.toArray(function(err, result2){
	                	if (err) throw err;
	                	for(var i=1;i<=result2.length;i++){
		                	arr2[i]=result2[i-1].username;
		            	}
		            	//querying for data similar to last half of user input and which are not in previous querys, in "machine_types" colllection
		            	dbo.collection("machine_types").find({$and :[{ username: { $nin: arr } },{ username: { $nin: arr_2_1 } },
		            	{ username: { $nin: arr2 } }, { $or:[{username: { $regex: part_key_ending, $options : "i" }},{type: 
		            	{ $regex: part_key_ending, $options : "i" }} ] }]}).toArray(function(err, result3){
		                	if (err) throw err;
			                for(var i=1;i<=result3.length;i++){
				                arr3[i]=result3[i-1].username;
				            }
				            //querying for data similar to first half of user input and which are not in previous query, in "details" colllection
	                    	dbo.collection("details").find({$and :[{ username: { $nin: arr } },{ username: { $nin: arr3 } },
	                    	{ username: { $nin: arr_2_1 } },{ username: { $nin: arr2 } }, 
	                    	{ $or:[{property_1: { $regex: part_key, $options : "i" }},
	                    	{property_2: { $regex: part_key, $options : "i" }},{property_3: { $regex: part_key, $options : "i" }},
	                    	{property_4: { $regex: part_key, $options : "i" }}]}]}).toArray(function(err, result_2_2){
		                        if (err) throw err;
		                        for(var i=1;i<=result_2_2.length;i++){
		                            arr_2_2[i]=result_2_2[i-1].username;
		                        }
	                			//querying for data similar to first half of user input and which are not in previous query, in "details" colllection
	                        	dbo.collection("details").find({$and :[{ username: { $nin: arr } },{ username: { $nin: arr_2_2 } },
	                        		{ username: { $nin: arr3 } },{ username: { $nin: arr_2_1 } },{ username: { $nin: arr2 } }, 
	                        		{ $or:[{property_1: { $regex: part_key_ending, $options : "i" }},
	                        		{property_2: { $regex: part_key_ending, $options : "i" }},{property_3: { $regex: part_key_ending, $options : "i" }},
	                        		{property_4: { $regex: part_key_ending, $options : "i" }} ] }]}).toArray(function(err, result_2_3){
		                            if (err) throw err;
		                            for(var i=1;i<=result_2_3.length;i++){
		                                arr_2_3[i]=result_2_3[i-1].username;
		                            }
		                            //querying for 'type' property in "machine_types" collection (For those which are result of querying "details" collection using first half of user input)
		                            dbo.collection("machine_types").find({username:{$in: arr_2_2}}).toArray(function(err, result_2_2_types) {
		                            	 //querying for 'type' property in "machine_types" collection (For those which are result of querying "details" collection using first last of user input)
		                            	dbo.collection("machine_types").find({username:{$in: arr_2_3}}).toArray(function(err, result_2_3_types) {
		                            		res.render('search', { result1:result1,result_2_1_types:result_2_1_types,result2:result2,result_2_2_types:result_2_2_types,result3:result3,result_2_3_types:result_2_3_types,username:search_key });
		                        		});
	                        		});
	                        	});
	                    	});
		        		});
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
