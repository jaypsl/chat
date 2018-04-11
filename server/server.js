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

  socket.on('createMessage', function(message){
	console.log('createMessage', message);
});

 socket.emit('newMessage', {
 	from:'tisha@example.com',
 	text:'hey whats going on',
 	CreateAt: 456
 });


 socket.on('disconnect', ()=> {
 	console.log('user was disconnected');
 });
});

server.listen(port, ()=> {
	console.log(`server is running at ${port}`);
});