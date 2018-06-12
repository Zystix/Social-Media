var io = require('socket.io-client')
var readline = require('readline')
var rls = require('readline-sync')
var chalk = require('chalk')
var figlet = require('figlet')

var rl = readline.createInterface(process.stdin, process.stdout)


let username

console.log(
	chalk.yellow(
		figlet.textSync('Moore Chat', {horizontalLayout: 'default' })
		)
	)

rl.question('what is your username? ', (answer) =>{
	username = answer;
	rl.prompt(true);
})

var socket = io('http://192.168.0.12:3000')

socket.emit('pastMesg')

socket.on('sentPast', (messages) =>{
	for (i = 0; i < messages.length; i++)
	{
		console_out(messages[i].name + ": " + messages[i].message)
	}
})

function console_out(msg)
{
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(msg);
	rl.prompt(true);
}

function eval(command)
{
	switch(command)
	{
		case '/message':
			var name = rl.question('Who Would You Like to Message? ')
			var message = rl.question('Whats your Message? ')

			socket.emit(name, {name: name, message: message})
			break;
	}
}

rl.on('line', (line) => {
	if (line.startsWith('/'))
	{
		eval(line)
	}
	else
	{
		socket.emit('send', {name: username, message: line});
		rl.prompt(true);
	}
})

socket.on(username, (message) => 
{
	chalk.red(console_out(data.name + " said to you: " + data.message))
})

socket.on('message', (data) => {
	if (data.name != username) {
	console_out(data.name + ": " + data.message) }
})