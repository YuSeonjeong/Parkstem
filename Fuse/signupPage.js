   var Observable = require("FuseJS/Observable");
   var id=Observable("");
   var pwd=Observable("");
   var name=Observable("");
   var phone=Observable("");
   var email=Observable("");
   var idcheck =  Observable(true);
   var formOK = Observable(true);
   var data = Observable("");

   function formEncode(obj) {
    var str = [];
    for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
  };


  function signupOK() {

      //console.log("가입완료");
      var status = 0;
      var response_ok = false;

      var requestObject = {
        id: id.value,
        pwd: pwd.value,
        name: name.value,
        phone: phone.value,
        email: email.value
      };

      fetch('http://192.168.50.148/SignUp.php', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded charset=UTF-8"
        },
        body: formEncode(requestObject)
      }).then(function(response) {
           status = response.status; // Get the HTTP status code
           response_ok = response.ok; // Is response.status in the 200-range?
           return response.json(); // This returns a promise

           console.log("1st then");

         }).then(function(responseObject) {

           console.log("signup Success");
           formOK.value=true;
          //loginpage로 0.8초 뒤 이동
          setTimeout(GoLogin, 800);

          //router.goto("loginPage");

        }).catch(function(err) {
          idcheck.value=false;
          console.log("signup fail : id 중복 ");
          //console.log("Fetch error: " + err);
          formOK.value=false;
        });
      };


      function formCheck(){
        idcheck.value=true;
        formOK.value=true;

        if(id.value == '' || id.value == null) {
          console.log("signup fail : id null ");
          formOK.value=false;
          return false;
        }

        if(pwd.value == '' || pwd.value == null) {
          console.log("signup fail : pwd null ");
          formOK.value=false;
          return false;
        }

        if(name.value == '' || name.value == null) {
          console.log("signup fail : nae null ");
          formOK.value=false;
          return false;
        }

        if(phone.value == '' || phone.value == null) {
          console.log("signup fail : phone null ");
          formOK.value=false;         return false;
        }

        if(email.value == '' || email.value == null) {
          console.log("signup fail : email null ");
          formOK.value=false;
          return false;
        }

        console.log("Formcheck OK")
    //formCheck OK면 0.8초 뒤 실행
    signupOK();
    
    //setTimeout(signupOK, 800);

  };


  function GoLogin(){
    router.goto("loginPage");
  }




/*function signupOK(){

     	//form이 ok면 signupOK로 이동
     	//DB에입력
     	//페이지이동
     	router.goto("loginPage");
     	console.log("hi")
     }*/

     function GoBack()
     {
     	router.goto("loginPage");
     };

     module.exports = {
     	GoBack : GoBack,
     	formOK : formOK,
     	idcheck : idcheck,
     	formCheck : formCheck,
     	id:id, pwd:pwd, name:name, phone:phone, email:email,
     	signupOK : signupOK,
      data:data
     };

