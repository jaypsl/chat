var socket = io();

function scrollToBottom(){
//selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child')
//heights
var clientHeight = messages.prop('clientHeight ')
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();



if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
	// console.log('should scroll');
	messages.scrollTop(scrollHeight);
}
}



socket.on('connect', function() {
	console.log('connnected to server');
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});


socket.on('newMessage', function(message){

	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message__template').html();
	var html = Mustache.render(template,{
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	}); //mustache.render takes the template u wanna render
	
	jQuery('#messages').append(html);
	scrollToBottom();
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// // console.log('new message', message);

	// var li = jQuery('<li></li>');
	// li.text(`${message.from} ${formattedTime}→ ${message.text}`);

	// jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	
	var template = jQuery('#location-message__template').html();
	var html = Mustache.render(template,{
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	}); //mustache.render takes the template u wanna render
	
	jQuery('#messages').append(html);
	scrollToBottom();
// var li = jQuery('<li></li>');
// var a = jQuery('<a target="_blank">My current location</a>');
// li.text(`${message.from} ${formattedTime}→  `);
// a.attr('href', message.url);
// li.append(a);
// jQuery('#messages').append(li);

});


jQuery('#message-form').on('submit',function(e){
	e.preventDefault();

	// to make something happen
var messageTextbox = jQuery('[name=message]');

	socket.emit('createMessage',{
		from: 'User',
		text: messageTextbox.val()
	},function(){
		messageTextbox.val('')
	})
});


var locationButton = jQuery('#send-location');

// do something when someon eclicks the button

locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geolocation is not supported by your browser')
	}
//disable the button after user click it once
locationButton.attr('disabled','disabled').text('Sending Location......');

//to fetch user location 
navigator.geolocation.getCurrentPosition(function(position){
// console.log(position);
//remove the disable button attribute
locationButton.removeAttr('disabled').text('SEND LOCATION');
socket.emit('createLocationMessage',{
	latitude: position.coords.latitude,
	longitude: position.coords.longitude
});
},function(){
	alert('unable to fetch the location');
});
});

// socket.on('newEmail', function(email){
// 	console.log('new email', email);
// });

// socket.emit('CreateEmail', {
// 	to:'kay@dice.com',
// 	text:'u made it'
// });


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
















