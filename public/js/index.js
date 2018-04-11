var socket = io();

socket.on('connect', function() {
	console.log('connnected to server');
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});

// socket.on('newEmail', function(email){
// 	console.log('new email', email);
// });

// socket.emit('CreateEmail', {
// 	to:'kay@dice.com',
// 	text:'u made it'
// });

socket.on('newMessage', function(message){
	console.log('new message', message);
});

socket.emit('createMessage', {
	from:'laila@dice.com',
	text:'where r u'
});