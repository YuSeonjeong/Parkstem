var Observable = require("FuseJS/Observable");
var pay= Observable("");

var paydata = Observable();
var name =Observable();
var date =Observable();
var fee =Observable();
var Storage = require("FuseJS/Storage");

var userId = Storage.readSync("login.txt");

function formEncode(obj) {
  var str = [];
  for(var p in obj)
   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
 return str.join("&");
}

var userId = Storage.readSync("login.txt");

var status = 0;
var response_ok = false;

var requestObject = {
  id: userId,
};
fetch('http://192.168.50.148/Usermoney.php', {
//fetch('http://10.1.59.177/Usermoney.php', {
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
          pay.value = responseObject[0].money;

        }).catch(function(err) {
          console.log("Fetch error: " + err);
        });




        var status = 0;
        var response_ok = false;
        var requestObject = {
          id: userId,
        };
fetch('http://192.168.50.148/Payinfo.php', {
     //   fetch('http://10.1.59.177/Payinfo.php', {
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
          paydata.replaceAll(responseObject);

        }).catch(function(err) {
          console.log("hi");
          console.log("Fetch error: " + err);
        });






       //pay="25,000";
  /*     paydata=[{
       	name : "건양대학교 주차장", date : "2017년 12월 1일", fee :"-1000"
       },{name : "건양대학교 주차장", date : "2017년 12월 2일", fee :"-1500"
     }];*/
// pay 잔액
// fetch('http://10.1.44.252/parkingch.php')
    // .then(function(response) { 
    //     return response.json(); 
    // })
    // .then(function(responseObject) {
    //     data.replaceAll(responseObject);
    // });



// pay 내역
// fetch('http://10.1.48.155/parkinglist.php')
// .then(function(response) { 
// 	return response.json(); 
// })
// .then(function(responseObject) {
// 	paydata.replaceAll(responseObject);
// });

module.exports = {
	pay : pay,
	paydata: paydata
};