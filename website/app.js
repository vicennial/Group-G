var express = require("express");
var app = express();
var path = require('path');

//creating server
var server = require('http').createServer(app);

// serves static files from public
app.use(express.static(path.join(__dirname, 'public')));
// serves files frow views
app.use(express.static(path.join(__dirname, 'views')));

//setting port
app.set('port', (process.env.PORT || 3500));

//starting server
server.listen(app.get('port'), '0.0.0.0', function () {
    console.log('Server started on port ' + app.get('port'));
});