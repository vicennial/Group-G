var express= require('express');
var path= require('path');
var cookieParser= require('cookie-parser');
var bodyParser= require('body-parser');
var exphbs= require('express-handlebars');
var expressValidator= require('express-validator');
var flash= require('connect-flash');
var session= require('express-session');
var passport= require('passport');
var LocalStrategy= require('passport-local'),Strategy;
var mongo= require('mongodb');
var mongoose= require('mongoose');
var mysql      = require('mysql');
var socketEvents= require('./models/socket');
var loginUser= require('./routes/users');

var app= express();
var server= require('http').createServer(app)
var io= require('socket.io').listen(server);




var io= require('socket.io').listen(server);



// allow CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

/*
var t;
app.get('/machineProfile/:temp', function(req,res){
        t = req.params.temp;
        console.log(t);
        //calling socket event for updating the changes in temperature values
        updateTemperature(t);
});
*/

//array holding user name and connection socket
loginUsers= [];
connections= [];

io.sockets.on('connection', function(socket){
    var t=0;
    io.sockets.emit('updateTemp', t);
    app.get('/machineProfile/:temp', function(req,res){
        t = req.params.temp;
        console.log(t);
        //calling socket event for updating the changes in temperature values
        io.sockets.emit('updateTemp', t);
    });
    
    
    
    //console.log(socket);
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(){
        //if user disconnect then remove it from the array
        //if(!socket.username) return;
        loginUsers.splice(loginUsers.indexOf(socket.username), 1);
        connections.splice(connections.indexOf(socket), 1);
        
        //calling update function for update the user list    
        updateUsernames();
        console.log('Disconnected: %s sockets connected', connections.length);
    });
    
    //send smg
    socket.on('msgSent', function(data){
        //console.log(data);
        io.sockets.emit('newMsg', {msg:data});
    });

    //newUser
    socket.on('newUser', function(data, callback){
        callback(true);
        socket.username= data;
        //console.log(socket.username);
        loginUsers.push(socket.username);
        updateUsernames();
    })

    function updateUsernames(){
        io.sockets.emit('getUsers', loginUsers);
    }

    //machine status get and show
    socket.on('getMachineStatus', function(data){
        io.sockets.emit('setMachineStatus',data);
    })

});






/*
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
*/
//'use strict';

var routes= require('./routes/index');
var users= require('./routes/users');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tempuser',
  password : '123',
  //database : 'iiti'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
connection.end();



//Init app



//View Engine
app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Expres Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace= param.split('.')
        , root= namespace.shift()
        , formParam= root;
        while(namespace.length){
            formParam += '[' + namespace.shift()+ ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


//Connect flash
app.use(flash());


//Global Flash
app.use(function(req, res, next){
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    res.locals.user= req.user || null;
    next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/routes', users);

app.post('/sendCmd', function(req, res){
    console.log("hey");
    res.send('ok');
});


//Set Port
app.set('port',(process.env.PORT || 80));
server.listen(app.get('port'),'0.0.0.0', function(){
    console.log('Server started on port '+app.get('port'));    
});