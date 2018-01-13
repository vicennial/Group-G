var app = require('express')();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');
var express = require('express');

//var mainText =document.getElementById("mainText");
//console.log(mainText);
module.exports.select= function(data,callback){
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ismartware',
    debug: false,
});
connection.connect();

/*
app.get('/', function(req, res) {
    res.render(__dirname +'/StaticShow.html');
    //res.sendFile(path.join(__dirname + 'index.html',{name:name}));
});
*/

    console.log("Connected to Mysql");
    //var queryString = "insert into isw(Temp,No) values('"+req.body.A1+"','"+req.body.A2+"')";
 connection.query('select * from machine where machinename = ?',data.username, function(error,rows,fields){
        if(error) throw error;
        if (error) throw error;
       // console.log(rows);
        callback(rows);
    }); 
}