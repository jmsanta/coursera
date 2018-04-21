// EXPRESS NODE SERVER ( installed only in this Project )
/* const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Express NODE server Running on ULISES')
})

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

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})*/

var fs = require('fs');

require('https').globalAgent.options.rejectUnauthorized = false;

// OPTIONS
var options = {
  key: fs.readFileSync('/etc/apache2/ssl/apache.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/apache.crt'),
  ca: fs.readFileSync('/etc/apache2/ssl/apache.crt')
};

//HANDLER
function handler (req, res) {
    // Set CORS headers
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
    if ( req.method === 'OPTIONS' ) {
      res.writeHead(200);
      res.end();
      return;
    }
 }

var app = require('https').createServer(options, handler);

var io = require('socket.io').listen(app);
io.set('heartbeat timeout', 40000);
io.set('heartbeat interval', 20000);

app.listen(7736);

/*
// BASIC HTTP index.js
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('ULISES Node Server running: without modules BASIC : OK')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened: BASIC NOT WORKING', err)
  }

  console.log(`server is listening on ${port}`)
})

 */
