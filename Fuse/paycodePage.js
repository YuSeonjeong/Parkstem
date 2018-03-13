var Observable = require("FuseJS/Observable");
var code = Observable("");
var Storage = require("FuseJS/Storage");
var userId = Storage.readSync("login.txt");
var payplus = Observable(true);
var fee = Observable("");

function formEncode(obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
}

var userId = Storage.readSync("login.txt");

function payplusOk(){

	//console.log(userId);
	//console.log(code.value);

	var status = 0;
	var response_ok = false;

	var requestObject = {
		id: userId,
		code : code.value
	};

	fetch('http://192.168.50.148/Paycode.php', {

	//fetch('http://10.1.59.177/Paycode.php', {
		method: 'POST',
		headers: {
			"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
		},
		body: formEncode(requestObject)
	}).then(function(response) {

           status = response.status; // Get the HTTP status code
           response_ok = response.ok; // Is response.status in the 200-range?
           return response.json(); // This returns a promise

       }).then(function(responseObject) {


       	payplus.value=true;
       	fee.value = responseObject; 
       //	console.log(fee.value);
       	console.log("완료")
       	setTimeout(payPage, 800);

       }).catch(function(err) {
       	payplus.value=false;
       	console.log("Fetch error: " + err);
       });
   };


   function payPage()
   {
   	router.push("payPage");
   };


   module.exports = {
   	payplusOk:payplusOk,
   	payplus:payplus,
   	code:code
   };
