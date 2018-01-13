var express= require('express');
var router= express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User= require('../models/user');
var helper = require('../models/helper');
var tempData= require('../app');
var static = require('../models/static');
var select = require('../models/select');
var Registration = require('../models/register');


//Register
router.get('/register', function(req, res){
    res.render('register');
});

//Login
router.get('/login', function(req, res){
    res.render('login');
});


//
router.get('/userprofile', function(req, res){
    res.render('userprofile');
});
router.get('/StaticProfile',function(req,res){

    res.render('Static');
});
router.get('/Static',function(req,res)
{
    res.render("StaticShow");
});

router.post('/afterRegister',function(req,res)
{
    var data = {
        username : req.body.IDD,
        password : req.body.pass
    };
    var selection = req.body.Selection;
    var A1= req.body.A1;
    var A2= req.body.A2;
    var A3= req.body.A3;
    var A4= req.body.A4;
    var A5= req.body.A5;
    var A6= req.body.A6;
    var A7= req.body.A7;
    var A8= req.body.A8;
    var A9= req.body.A9;
    var A10= req.body.A10;
    var A11= req.body.A11;
    var A12= req.body.A12;
    var A13= req.body.A13;
    var A14= req.body.A14;
    var A15= req.body.A15;
    var A16= req.body.A16;
    var A17= req.body.A17;
    var A18= req.body.A18;
    var A19= req.body.A19;
    var A20= req.body.A20;
    var A21= req.body.A21;
    var A22= req.body.A22;
    var A23= req.body.A23;
    var A24= req.body.A24;
    var A25= req.body.A25;
    var data1={
        selection:selection,A1:A1,A2:A2,A3:A3,A4:A4,A5:A5,A6:A6,A7:A7,A8:A8,A9:A9,A10:A10,A11:A11,A12:A12,A13:A13,A14:A14,A15:A15,A16:A16,A17:A17,A18:A18,A19:A19,A20:A20,A21:A21,A22:A22,A23:A23,A24:A24,A25:A25
    };
   console.log(data1);
    static.Static(data1, function(result){});

     select.select(data,function(result){
                
                 var datta = {
                username : req.body.IDD,
                password : req.body.pass,
                selection : result[0].machinetype,
                A2 : result[0].manufacturer
                ,A3 : result[0].modelname
                ,A4 : result[0].modelno
                ,A5 : result[0].date
                ,A6 : result[0].cost
                ,A7 : result[0].warranty
                ,A8 : result[0].buildvolume
                ,A9 : result[0].layerresol
                ,A10 : result[0].extruder
                ,A11 : result[0].size
                ,A12 : result[0].weight
                ,A13 : result[0].consuption
                ,A14 : result[0].connectivity
                ,A15 : result[0].filamentuse
                ,A16 : result[0].nozzledia
                ,A17 : result[0].filament
                ,A18 : result[0].printfile
                ,A19 : result[0].printsize
                ,A20 : result[0].supportfilament
                ,A21 : result[0].resolution
                ,A22 : result[0].accuracy
                ,A23 : result[0].runthrough
                ,A24 : result[0].technology
                ,A25 : result[0].about
            

};

     console.log(datta);
    res.render('userprofile',{data:datta});
});
//res.sendStatus(200);
});

//User Registration
router.post('/register', function(req, res){
    var industryName= req.body.industryName;
    var userName= req.body.userName;
    var email= req.body.email;
    var password= req.body.password;
    var check={
        username:userName
    };

    helper.userNameCheck(check, function(result){
        if(!result){
            var data= {
                industryName: industryName,
                username: userName,
                email:email,
                password: password
            };
            data.timestamp = Math.floor(new Date() / 1000);
            data.online = 'Y' ;
            data.socketId = '' ;

            helper.registerUser( data, function(error,result){

                if (error) {
                    throw error;          
                    req.flash('error_msg', 'User registration unsuccessful,try after some time.');
                }
                else{
                    Registration.Regis(data, function(result){});
                    req.flash('success_msg', 'You are registered and can now login');
                    res.redirect('/users/userprofile'); 
                    console.log(result);       
                }
            });
        }
        else{
            req.flash('error_msg', 'User name is not available');
            res.redirect('/users/register');
        }
    });

});

router.post('/login', function(req,res){

    var data = {
        username : req.body.username,
        password : req.body.password
    };
    
    

    helper.logIn( data, function(error,result){
        if (error || result === null) {
            //throw error;
            req.flash('error_msg', 'Invalid username and password combination.');
            res.redirect('/users/login');
            //loginResponse.error = true;
            //loginResponse.message = `Invalid username and password combination.`;
            //response.status(401).json(loginResponse);
        }
        else{
                select.select(data,function(result){
            var datta = {
                username : req.body.username,
                password : req.body.password,
                //selection : result[0].machinetype,
                A2 : result[0].manufacturer
                ,A3 : result[0].modelname
                ,A4 : result[0].modelno
                ,A5 : result[0].date
                ,A6 : result[0].cost
                ,A7 : result[0].warranty
                ,A8 : result[0].buildvolume
                ,A9 : result[0].layerresol
                ,A10 : result[0].extruder
                ,A11 : result[0].size
                ,A12 : result[0].weight
                ,A13 : result[0].consuption
                ,A14 : result[0].connectivity
                ,A15 : result[0].filamentuse
                ,A16 : result[0].nozzledia
                ,A17 : result[0].filament
                ,A18 : result[0].printfile
                ,A19 : result[0].printsize
                ,A20 : result[0].supportfilament
                ,A21 : result[0].resolution
                ,A22 : result[0].accuracy
                ,A23 : result[0].runthrough
                ,A24 : result[0].technology
                ,A25 : result[0].about
            

};              console.log(result);
               res.render('userprofile',{data:datta});
        });
      }
    });
});

router.post('/sendCmd', function(req, res){
    console.log("hey");
    res.render('userprofile');
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports= router;