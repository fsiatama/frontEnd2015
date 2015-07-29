var express = require('express')
var app = express()
var http = require('http').Server(app)
var port = 8080
var io = require('socket.io')(http)

/*function middleHandler (req, res, next) {
	console.log('soy un middleHandler suelto')
	next()
}

app.use(function (req, res, next) {
	console.log('soy el primer Middleware')
	next()
})*/
app.use('/', express.static(__dirname + '/public/'))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
	console.log('peticion al home')
})

io.on('connection', function (socket) {
	console.log('user connected')

	socket.on('disconnect', function () {
		console.log('user disconnected')
	})
})

io.on('connection', function (socket) {
	console.log('user connected')

	socket.on('chat message', function (msg) {
		io.emit('chat message', msg)
	})
})

http.listen(port, function (err) {
	console.log(' escuchando en puerto' , port)
})
