var isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};

//use trim method so that it converts string like '    ' into string like ''. in this leading and trailing spaces are gonna removed