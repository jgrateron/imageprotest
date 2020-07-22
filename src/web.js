//creado por Jairo Grateron jgrateron@gmail.com

var http = require('http');
var express = require('express')
var app = express()
app.use(express.static('public'))

var httpServer = http.createServer(app);
httpServer.listen(8081)
