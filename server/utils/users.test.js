const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{

var users;
//data we initialize isw users
//beforeEach calls before every single test, helps to initialize some data 
beforeEach(()=>{
users = new Users();
users.users = [{
	id:'1',
	name:'mike',
	room:'node course'
},{
	id:'2',
	name:'jen',
	room:'react course'
},{
	id:'3',
	name:'kay',
	room:'node course'
}];
});


	it('should add new user', ()=> {
		var users = new Users();
		var user = {
			id: '123',
			name: 'jay',
			room: 'the home fans'
		};
		var resUser = users.addUsers(user.id,user.name,user.room);
	

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', ()=>{
		var userId = '1';
		var user = users.removeUsers(userId);

		//expect(user.id).toBe(userId);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', ()=>{
		var userId = '99';
		var user = users.removeUsers(userId);

		//expect(user.id).toBe(userId);
		expect(user).toBeFalsy();
		expect(users.users.length).toBe(3);
	});
	

	it('should find user', ()=>{
		var userId = '2';
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it('should not find user', ()=>{
		var userId = '99';
		var user = users.getUser(userId);
		expect(user).toBeFalsy();
	});

	it('should return names for nodes course', ()=> {
		var userList = users.getUserList('node course');
		expect(userList).toEqual(['mike', 'kay']);
	});

	it('should return names for react course', ()=> {
		var userList = users.getUserList('react course');
		expect(userList).toEqual(['jen']);
	});
});