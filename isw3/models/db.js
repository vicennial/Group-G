"use strict";
/*requiring mongodb node modules */
const  mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const assert = require('assert');
const MongoUrl='mongodb://localhost:27017/iiti';

module.exports.onConnect = (callback) => {	

	MongoClient.connect(MongoUrl, (err, db) => {
		assert.equal(null, err);
		callback(db,ObjectID);
	});
	
}