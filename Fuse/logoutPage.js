var Observable = require("FuseJS/Observable");
var Storage = require("FuseJS/Storage");
var logout = Observable(false);

function carbye() {
	logout.value = true;
}
setTimeout(carbye, 1200);

var success = Storage.deleteSync("login.txt");

setTimeout(function(){
	console.log("logout");
	router.goto("loginPage");
}, 4200);



module.exports = {
	logout:logout ,
};




