const path = require('path');
const http = require('http');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public' );

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();


app.use(express.static(publicPath));


io.on('connection', (socket)=> {
	console.log('new user is connected');

 

// socket.emit from admin text welcome to chat app


//socket.broadcast.emit from admin text new user joined


socket.on('join', (params,callback)=> {
if(!isRealString(params.name) || !isRealString(params.room)){
	return callback('NAME and ROOM are required');
}

//use return to make sure that none op the code below fires if the data is not valid.

// code from line 42 to 55 is not gonna run if there is a validation error. means if u dont provide param name & param.room  
socket.join(params.room);
//126
users.removeUsers(socket.id);
users.addUsers(socket.id,params.name,params.room);
//socket.leave('the office fans');

//io.emit -> io.to('the office fans').emit io.to is the method that we gonna use to provide room for users of that room. io.to takes the argument as the name of the room. 
//socket.broadcast.emit -> socket.broadcast.to('the office fans').emit
//socket.emit -> socket.emit
//126
io.to(params.room).emit('updateUserList', users.getUserList(params.room));

socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));
socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

callback();
//information gets lost once the callback is completed. info like name and room are not persisted anywhere. we need that info down below at event listener called createMessage. createmessage need to know the room and name to send the message to the specific room. same goes with createLocationMessage. we dont have access to tthe join up above. but we have access to socket.id

});


socket.on('createMessage', function(message,callback){
	//console.log('createMessage', message);
	//127
	var user = users.getUser(socket.id);

	if(user && isRealString(message.text)){
		io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
	
	}
	callback();
// socket.broadcast.emit('newMessage', generateMessage(message.from,message.text));
});

 



 socket.on('createLocationMessage', (coords)=> {

 	var user = users.getUser(socket.id);
 	if(user){
	io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
}
});


 socket.on('disconnect', ()=> {
 	// console.log('user was disconnected');
 	var user = users.removeUsers(socket.id);
 	if(user){
 		io.to(user.room).emit('updateUserList',users.getUserList(user.room));
 		io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left`));
 	
 	}
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




