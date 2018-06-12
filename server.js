var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var fs = require('fs')
var log = require('./log.json')
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

let messages

io.on('connection', (socket) => {
	console.log('User Connected.')

	socket.on('send', (data) => {
		messages.push(data)
		io.emit('message', data)

		fs.writeFile('./log.json', JSON.stringify(messages), (err) => {
			if(err) {
				return console.log(err);
			}
		})
	})

	socket.on('pastMesg', () => {
		socket.emit('sentPast', messages)
	})

	socket.on('disconnect', () => {
		console.log('User Disconnected');
	})

})


var server = http.listen(3000, () => {
	console.log('server is listening on port', server.address().port)

	messages = log
})