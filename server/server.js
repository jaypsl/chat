const path = require('path');
const http = require('http');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public' );

var app = express();
var server = http.createServer(app);

var io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket)=> {
	console.log('new user is connected');

 

// socket.emit from admin text welcome to chat app

socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));

//socket.broadcast.emit from admin text new user joined

socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined'));

socket.on('join', (params,callback)=> {
if(!isRealString(params.name) || !isRealString(params.room)){
	callback('NAME and ROOM are required');
}
callback();
});


socket.on('createMessage', function(message,callback){
	console.log('createMessage', message);
	io.emit('newMessage', generateMessage(message.from,message.text));
	callback();
// socket.broadcast.emit('newMessage', generateMessage(message.from,message.text));

});

 



 socket.on('createLocationMessage', (coords)=> {
	io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
});


 socket.on('disconnect', ()=> {
 	console.log('user was disconnected');
 });
});

server.listen(port, ()=> {
	console.log(`server is running at ${port}`);
});


// socket.emit('newEmail', {
 // 	from:'jay@example.com',
 // 	text:'hey whats up',
 // 	CreateAt: 123
 // });

//  socket.on('CreateEmail', function(newEmail){
// 	console.log('createemail', newEmail);
// });

// socket.emit('newMessage', {
 // 	from:'tisha@example.com',
 // 	text:'hey whats going on',
 // 	createdAt: 456
 // });




