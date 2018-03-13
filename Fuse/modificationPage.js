var Observable = require("FuseJS/Observable");
var Storage = require("FuseJS/Storage");
var userId = Observable("");
var userdata = Observable("");
var pwd = Observable("");
var name = Observable("");
var phone = Observable("");
var email = Observable("");
var id = Observable("");
var formOK = Observable(true);

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

function formCheck(){
  formOK.value=true;

  if(pwd.value == '' || pwd.value == null) {
    console.log("update fail : pwd null ");
    formOK.value=false;
    return false;
  }

  if(name.value == '' || name.value == null) {
    console.log("update fail : nae null ");
    formOK.value=false;
    return false;
  }

  if(phone.value == '' || phone.value == null) {
    console.log("update fail : phone null ");
    formOK.value=false;         return false;
  }

  if(email.value == '' || email.value == null) {
    console.log("update fail : email null ");
    formOK.value=false;
    return false;
  }

  console.log("formCheck OK")
    //formCheck OK면 0.8초 뒤 실행
    modifyOk();
    
    //setTimeout(signupOK, 800);

  };

  function modifyOk(){

    var status = 0;
    var response_ok = false;

    var requestObject = {
      id: userId,
      pwd:pwd.value,
      name:name.value,
      phone:phone.value,
      email:email.value

    };

    fetch('http://192.168.50.148/Modification.php', {
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


       // jsondata.replaceAll(responseObject);

       setTimeout(accountPage, 800);

     }).catch(function(err) {
      console.log("Fetch error: " + err);
    });


   };


function accountPage()
{
  router.push("accountPage");

};



   module.exports = {
     userId : userId,
     pwd:pwd, name:name, phone:phone, email:email,
     formOK:formOK,
     formCheck:formCheck
   }