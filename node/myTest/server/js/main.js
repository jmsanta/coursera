var express = require('express');
var app = express();

var allowedOrigins = "http://localhost:* http://127.0.0.1:*";

var server = require('http').Server(app);

var path ='../../client/client'; // you need this if you want to connect to something other than the default socket.io path

var io  = require('socket.io')(server, {
    origins: allowedOrigins,
    path : path
});


var port = '8080';
var host = 'localhost';
var URL = 'http://' + host + ':' + port;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

io.listen(port, function() {
	console.log('Servidor corriendo en http://localhost:' + port);
});

var messages = [{
	author: "John cobra",
    text: "Hello, how are you?"
},{
	author: "Michael knight",
    text: "Very well and you?"
},{
	author: "Peter Petreli",
    text: "Good!"
}];

io.on('connection', function(socket) {
	console.log('A client is connected');
    socket.emit('messages', messages);

		// cuando se emite el mensaje por el cliente
		// añadimos el mensaje y emitimos la respuesta al cliente.

		socket.on('new-message', function(data) {
			messages.push(data);
			io.sockets.emit('messages', messages);
		});

});
// we put were we are going to put the PUBLIC static files
app.use(express.static('../../client/client'));
