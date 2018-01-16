var express = require("express");
var app = express();
var server = require('http').createServer(app);



app.set('port', (process.env.PORT || 3500));
server.listen(app.get('port'), '0.0.0.0', function () {
    console.log('Server started on port ' + app.get('port'));
});