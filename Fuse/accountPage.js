var Observable = require("FuseJS/Observable");
var Storage = require("FuseJS/Storage");
var userId = Observable("");
var id = Observable("");
var userdata = Observable();
var pwd = Observable("");
var name = Observable("");
var phone = Observable("");
var email = Observable("");

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

fetch('http://192.168.50.148/Account.php', {
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
          userdata.replaceAll(responseObject);
       pwd.value = responseObject[0].pwd;
       name.value = responseObject[0].name;
       phone.value = responseObject[0].phone;
       email.value = responseObject[0].email;

     }).catch(function(err) {
      console.log("Fetch error: " + err);
    });


     module.exports = {
       userId : userId,
       userdata: userdata,
         pwd:pwd, name:name, phone:phone, email:email
     }