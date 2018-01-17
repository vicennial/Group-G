var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
 


//creating server
var server = require('http').createServer(app);

// serves static files from public
app.use(express.static(path.join(__dirname, 'public')));
// serves files frow views
app.use(express.static(path.join(__dirname, 'views')));
// Support JSON bodies
app.use(bodyParser.json());
// Support URL-encoded bodies 						 
app.use(bodyParser.urlencoded({ extended: true }));  


//setting port
app.set('port', (process.env.PORT || 3500));

//starting server
server.listen(app.get('port'), '0.0.0.0', function () {
    console.log('Server started on port ' + app.get('port'));
});

//Body Parser : Print to Log the Value of Selected Machine State
app.post("/SendState", function(req, res) {
  console.log(JSON.stringify(req.body));
  res.send(req.body);
});