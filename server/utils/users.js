[{
	id:'/qef3f3rqfwdfg',
	name: 'jay',
	room: 'the home fans'
}]

//addUsers(id,name,room)
//removeUsers(id)
//getUser(id)
//getUserList(room)

//u can use this

//var users = [];

// var addUsers = (id,name,room) =>{
// 	users.push({})
// };

// module.exports = {addUsers};


class Users {
	constructor(){
		this.users = [];
	}
	addUsers(id, name, room){
var user = {id,name,room};
this.users.push(user);
return user;
}
removeUsers(id){
	//retun user that was removed 
	var user = this.getUser(id);
	//var user = this.users.filter((user)=>user.id === id)[0]
	if(user){
		this.users = this.users.filter((user)=>user.id !== id);
	}
	return user;
}
getUser(id){
 return this.users.filter((user)=>user.id === id)[0]
}
getUserList(room){
	var users = this.users.filter((user)=> user.room === room);
		var namesArray = users.map((user)=> user.name);
		return namesArray;
	//['mike','jen','kay']
	//filter takes function as argument and this function gets called with each individual user. we can return TRUE to keep this item in array and FALSE to remove from array  
}
}

module.exports = {Users};
// class Person {
// constructor(name,age){ 
// 	this.name = name;
// 	this.age = age;
// // console.log(name,age);
// }
// getUserDescription(){
// 	return `${this.name} is ${this.age} year(s) old`
// }
// }

// // make instance of class

// var me = new Person('jay', 24);
// var description = me.getUserDescription();
// console.log(description);