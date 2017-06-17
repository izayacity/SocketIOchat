/**
 * Created by Francis Yang on 6/16/17.
 */

var app = require ('express')();

// Express initializes app to be a function handler that you can supply to an HTTP server
var http = require ('http').Server (app);

// SocketIO server that integrates with (or mounts on) the Node.JS HTTP Server
var io = require('socket.io')(http);

// We make the http server listen on port 3000.
http.listen (3000, function () {
    console.log('listening on *: 3000');
});

// we define a route handler / that gets called when we hit our website home.
app.get ('/', function (req, res) {
    res.sendfile (__dirname + '/index.html');
});

// listen on the connection event for incoming sockets, and I log it to the console.
io.on ('connection', function (socket) {
    console.log ('a user connected');

    socket.broadcast.emit ('hi');

    socket.on ('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on ('chat message', function (msg) {
        io.emit ('chat message', msg);
        console.log('message: ' + msg);
    });
});

io.emit ('some event', {for: 'everyone'});
