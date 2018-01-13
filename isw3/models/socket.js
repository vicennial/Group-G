var io= require('socket.io').listen(server);
var server= require('../app.js').server;
//array holding user name and connection socket
usersCount= [];
connections= [];

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(){
        //if user disconnect then remove it from the array
        if(!socket.username) return;
        usersCount.splice(usersCount.indexOf(socket.username), 1);

        //calling update function for update the user list
        updateUsernames();

        connections.splice(connections.indexOf(socket), 1);
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
        usersCount.push(socket.username);
        updateUsernames();
    })
    
    function updateUsernames(){
        io.sockets.emit('getUsers', usersCount);
    }
});