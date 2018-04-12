var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');


describe('generateMessage', ()=>{
it('should generate correct message object',()=>{
		var from = 'jen';
		var text = 'some message';
		var message = generateMessage(from,text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});



	//store res in variable 
	// assert from match
	//assert text match
	//assert createdAt is number
});
});


describe('generateLocationMessage', ()=> {
	it('should generate correct location object', ()=> {
		var from ='deb';
		var latitude = 13;
		var longitude = 26;
		var url = 'https://www.google.com/maps?q=13,26';
		var message = generateLocationMessage(from,latitude,longitude);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, url});

	});
});