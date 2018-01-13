
var mongodb=require('mongodb');
var Mongodb= require('./db')
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var url = "mongodb://localhost:27017/iiti";



module.exports.registerUser= function(data,callback){
	Mongodb.onConnect( (db,ObjectID) => {
		db.collection('users').insertOne(data, (err, result) =>{
			db.close();
			callback(err,result);
		});
	});
}

module.exports.logIn= function(data,callback){
	console.log(data);
	Mongodb.onConnect( function(db,ObjectID){
		db.collection('users').findAndModify( data ,[], {$set: {'online': 'Y'}},{},(err, result) => {
			db.close();
			callback(err,result.value);
		});
	});
}

module.exports.userNameCheck= function(data,callback){
	Mongodb.onConnect( (db,ObjectID) => {
		db.collection('users').find(data).count((err, result) => {
			db.close();
			callback(result);
		});
	});
}

