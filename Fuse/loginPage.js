    var Observable = require("FuseJS/Observable");
    var data = Observable();
    var id=Observable("");
    var pwd=Observable("");
    var login = Observable(true);
    var d = Observable("");
    var Storage = require("FuseJS/Storage");
/*    var user_Json = ("user_Json.json");
    var userId = Observable("");
    var savedData = Observable("Loading...");*/

    function formEncode(obj) {
      var str = [];
      for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }

    function loginClicked() {
      var status = 0;
      var response_ok = false;

      var requestObject = {
        id: id.value,
        pwd: pwd.value,
      };

      //fetch('http://192.168.0.3/Login2.php', {
      fetch('http://192.168.50.148/Login2.php', {
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
          login.value=true;

          d = responseObject[0].id
          console.log(d);
          
          //Storage 저장

          Storage.writeSync("login.txt",d);
          
          var contents = Storage.readSync("login.txt");
          console.log(contents);
       /*   var storeObj = {userId: d};
          Storage.write(user_Json, JSON.stringify(storeObj));
          savedData.value = d;*/

          data.replaceAll(responseObject);
          console.log("완료")
          setTimeout(GoMain, 800);


        }).catch(function(err) {
          login.value=false;
          console.log("login fail");
        });
      };


/*
    function loginClicked(){    
          login.value=false;
 
      fetch('http://10.1.34.32/Login2.php')
      .then(function(response) { 
        return response.json(); 
      })
      .then(function(jsonData) {
        for (var i in jsonData.result){
          items.push(new member(jsonData.result[i]));
        }
        //console.log(items[2].name);
        data.replaceAll(items);
        //console.log(items.length);


        for(var i =0; i<items.length; i++){
         if(items[i].id==id.value && items[i].pwd == pwd.value){
          login.value=true;
            //router.goto("mainPage");
          }
        }
      });
//console.log(login.value);

};*/


function GoSignUp(){
 router.goto("signupPage");

}

function goBack() {
  router.goBack();
}
function GoHelp(){
 router.goto("helpidPage");
}

function GoMain(){
  router.goto("main");

}

module.exports = {
  id : id,
  pwd : pwd,
  login : login,
  loginClicked : loginClicked,
  goBack : goBack,
  GoSignUp : GoSignUp,
  GoHelp : GoHelp,
  GoMain : GoMain

};