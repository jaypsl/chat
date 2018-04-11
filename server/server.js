const path = require('path');
const http = require('http');
const express = require('express');


const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public' );

var app = express();
var server = http.createServer(app);

var io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket)=> {
	console.log('new user is connected');

 // socket.emit('newEmail', {
 // 	from:'jay@example.com',
 // 	text:'hey whats up',
 // 	CreateAt: 123
 // });

//  socket.on('CreateEmail', function(newEmail){
// 	console.log('createemail', newEmail);
// });



	// socket.emit from admin text welcome to chat app

	socket.emit('newMessage', {
		from:'Admin',
		text:'welcome to chat app',
		createdAt : new Date().getTime()
	});


	//socket.broadcast.emit from admin text new user joined

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'new user joined',
		createdAt : new Date().getTime()
	});

  socket.on('createMessage', function(message){
	console.log('createMessage', message);
	// io.emit('newMessage', {
	// 	from: message.from,
	// 	text: message.text,
	// 	createdAt : new Date().getTime()
	// });

socket.broadcast.emit('newMessage', {
		from: message.from,
		text: message.text,
		createdAt : new Date().getTime()
	});


});

 // socket.emit('newMessage', {
 // 	from:'tisha@example.com',
 // 	text:'hey whats going on',
 // 	createdAt: 456
 // });


 socket.on('disconnect', ()=> {
 	console.log('user was disconnected');
 });
});

server.listen(port, ()=> {
	console.log(`server is running at ${port}`);
});