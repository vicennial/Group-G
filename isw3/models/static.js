var app = require('express')();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');
var express = require('express');

//var mainText =document.getElementById("mainText");
//console.log(mainText);
module.exports.Static= function(data1){
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
    var sql = "UPDATE machine SET machinetype = '"+data1.selection+"',machinename = '"+data1.A1+"',manufacturer = '"+data1.A2+"',modelname = '"+data1.A3+"',modelno = '"+data1.A4+"',date = '"+data1.A5+"',cost = '"+data1.A6+"',warranty = '"+data1.A7+"',buildvolume = '"+data1.A8+"',layerresol = '"+data1.A9+"',extruder = '"+data1.A10+"',size = '"+data1.A11+"',weight = '"+data1.A12+"',consuption = '"+data1.A13+"',connectivity = '"+data1.A14+"',filamentuse = '"+data1.A15+"',nozzledia = '"+data1.A16+"',filament = '"+data1.A17+"',printfile = '"+data1.A18+"',printsize = '"+data1.A19+"',supportfilament = '"+data1.A20+"',resolution = '"+data1.A21+"',accuracy = '"+data1.A22+"',runthrough = '"+data1.A23+"',technology = '"+data1.A24+"',about = '"+data1.A25+"' WHERE machinename = '"+data1.A1+"'";
    //var queryString = "insert into machine (machinetype,machinename,manufacturer,modelname,modelno,date,cost,warranty,buildvolume,layerresol,extruder,size,weight,consuption,connectivity,filamentuse,nozzledia,filament,printfile,printsize,supportfilament,resolution,accuracy,runthrough,technology,about)values('"+data1.selection+"','"+data1.A1+"','"+data1.A2+"','"+data1.A3+"','"+data1.A4+"','"+data1.A5+"','"+data1.A6+"','"+data1.A7+"','"+data1.A8+"','"+data1.A9+"','"+data1.A10+"','"+data1.A11+"','"+data1.A12+"','"+data1.A13+"','"+data1.A14+"','"+data1.A15+"','"+data1.A16+"','"+data1.A17+"','"+data1.A18+"','"+data1.A19+"','"+data1.A20+"','"+data1.A21+"','"+data1.A22+"','"+data1.A23+"','"+data1.A24+"','"+data1.A25+"')";
    //var queryString = "insert into machine (machinetype,machinename) values ('+req.body.A1+,+req.body.A2+')";//+req.body.A2+","+req.body.A3+",,"+req.body.A4+","+req.body.A5+"')";
            //res.send("Successfully Inserted");
            connection.query(sql,function(error,rows,fiels){});
           // connection.query(queryString,function(error,rows, fields) {});
            console.log("INSERTED");
  
}