
// NODE server SSL. HTTPS
// https://www.digitalocean.com/community/tutorials/how-to-create-a-ssl-certificate-on-apache-for-ubuntu-14-04
// https://stackoverflow.com/questions/31156884/how-to-use-https-on-node-js-using-express-socket-io
var fs = require('fs');

require('https').globalAgent.options.rejectUnauthorized = false;

var options = {
  key: fs.readFileSync('/etc/apache2/ssl/apache.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/apache.crt'),
  ca: fs.readFileSync('/etc/apache2/ssl/apache.crt')
};

var app = require('https').createServer(options, handler)
var io = require('socket.io').listen(app);
io.set('heartbeat timeout', 40000);
io.set('heartbeat interval', 20000);
io.set('rejectUnauthorized ', false);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(7736);

//for testing
function handler (req, res) {
      res.writeHead(200);
      res.end("welcome to NODE HTTPS SERVER\n");
}


/*
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(8080, function() {
	console.log('Servidor corriendo en http://localhost:8080');
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
app.use(express.static('../../client/client')); */
