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

	var li = jQuery('<li></li>');
	li.text(`${message.from} → ${message.text}`);

	jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'vis',
// 	text:'hey how u doing'
// },function(v){
// 	console.log('got it',v);
// })

// socket.emit('createMessage', {
// 	from:'laila@dice.com',
// 	text:'where r u'
// });

jQuery('#message-form').on('submit',function(e){
	e.preventDefault();

	// to make something happen

	socket.emit('createMessage',{
		from: 'User',
		text: jQuery('[name=message]').val()
	},function(){})
})