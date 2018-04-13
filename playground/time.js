//jan 1st 1970 00:00:00 am, in javascript everything is in ms if u do -1000ms then dec 31 11:59:59 am
//0 is valid timestamp
// getting a timestamp is new Date().getTime();

// var date = new Date();
// var month = ['jan', 'feb']
// console.log(date.getMonth());

var moment = require('moment');

// var date = moment();
// date.add(100, 'year').subtract(10,'month');
// console.log(date.format('MMM Do,YYYY'));


// //1;03 am
// //padded version for minute and unpadded version for hours

// console.log(moment().format('LT'));

var sometimestamp = moment().valueOf();
console.log(sometimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'))