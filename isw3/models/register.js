var app = require('express')();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');
var express = require('express');

//var mainText =document.getElementById("mainText");
//console.log(mainText);
module.exports.Regis= function(data){
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
    console.log(data.username);
    //var queryString = "insert into isw(Temp,No) values('"+req.body.A1+"','"+req.body.A2+"')";
    var queryString = "insert into machine (machinename)values('"+data.username+"')";
    //var queryString = "insert into machine (machinetype,machinename) values ('+req.body.A1+,+req.body.A2+')";//+req.body.A2+","+req.body.A3+",,"+req.body.A4+","+req.body.A5+"')";
            //res.send("Successfully Inserted");
            connection.query(queryString,function(error,rows, fields) {
        
    });
            console.log("INSERTED");
  
}