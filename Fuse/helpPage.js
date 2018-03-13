   var Observable = require("FuseJS/Observable");

   var name=Observable("");
   var id=Observable("");

   var phone=Observable("");
   var email=Observable("");
   var data = Observable();
   var d = Observable("");
   var idfindOK = Observable(false);
   var pwdfindOK = Observable(true);
   var userId = this.Parameter.map(function(param) {
    return param.userId;
  });

   var userPwd = this.Parameter.map(function(param) {
    return param.userPwd;
  });

   module.exports = {
    userId: userId
  };

  function GoID(){
    router.goto("helpidPage");
  }

  function GoPWD(){
    router.goto("helppwdPage");

  }

  function GoBack()
  {
    router.goto("loginPage");
  };

  function GoRID()
  {
    //parameter passing
    router.push("helpidRPage", { userId: d });

  };

  function GoRPWD()
  {
    //parameter passing
    router.push("helppwdRPage", { userPwd: d });

  };


  function GoLogin()
  {
    setTimeout(GoLogin2, 800);

  };
  function GoLogin2()
  {
    router.goto("loginPage");

  };

  function formEncode(obj) {
    var str = [];
    for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
  }

  function findID() {

      //console.log("가입완료");
      var status = 0;
      var response_ok = false;

      var requestObject = {

        name: name.value,
        phone: phone.value,
        email: email.value
      };

      fetch('http://192.168.50.148/helpid.php', {
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
          idfindOK.value=true;

          d = responseObject[0].id
          console.log(d);
          
          data.replaceAll(responseObject);
          console.log("완료")
          setTimeout(GoRID, 800);

        }).catch(function(err) {
          idfindOK.value=false;
          console.log("fail : 등록된 정보가 없습니다");
        });
      };


      function findPWD() {
      //console.log("가입완료");
      var status = 0;
      var response_ok = false;

      var requestObject = {
        id:id.value,
        name: name.value,
        phone: phone.value,
        email: email.value
      };

      fetch('http://192.168.50.148/helppwd.php', {
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
          pwdfindOK.value=true;

          d = responseObject[0].pwd
          console.log(d);
          
          data.replaceAll(responseObject);
          setTimeout(GoRPWD, 800);

        }).catch(function(err) {
          pwdfindOK.value=false;
          console.log("fail : 등록된 정보가 없습니다");

        });
      };

//console.log(login.value);



module.exports = {
  GoID : GoID,
  GoPWD : GoPWD,
  GoBack : GoBack,
  GoLogin:GoLogin,
  GoRID:GoRID,GoRPWD:GoRPWD,
  findID:findID,findPWD:findPWD,
  id:id, name:name, phone:phone, email:email,
  data:data,idfindOK:idfindOK,pwdfindOK:pwdfindOK,
  userId: userId,userPwd:userPwd

};

