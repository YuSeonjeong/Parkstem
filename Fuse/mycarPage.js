var Observable = require("FuseJS/Observable");
var Storage = require("FuseJS/Storage");
var userId = Storage.readSync("login.txt");
var car_id=Observable("");
var car_num=Observable("");
var formOK = Observable(true);
var cardata = Observable();
var maincardata = Observable();

    function formEncode(obj) {
      var str = [];
      for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    };


    function formCheck(){
      formOK.value=true;

      if(car_id.value == '' || car_id.value == null) {
        console.log("update fail : car_id null ");
        formOK.value=false;
        return false;
      }

      if(car_num.value == '' || car_num.value == null) {
        console.log("update fail : car_num null ");
        formOK.value=false;
        return false;
      }

      console.log("formCheck OK")
    //formCheck OK면 0.8초 뒤 실행
    carplusOK();

  };


  function carplusOK() {

    var status = 0;
    var response_ok = false;

    var requestObject = {
      id: userId,
      car_id:car_id.value,
      car_num:car_num.value
    };

    fetch('http://192.168.50.148/Mycarplus.php', {
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

           console.log("Success");
           setTimeout(mycarPage, 800);


         }).catch(function(err) {
          console.log("Fetch error: " + err);
        });
       };

       //자동차 정보
       var status = 0;
       var response_ok = false;

       var requestObject = {
        id: userId,
      };

      fetch('http://192.168.50.148/Carinfo.php', {
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

          cardata.replaceAll(responseObject);


        }).catch(function(err) {
          console.log("Fetch error: " + err);
        });


        //메인카 정보 불러오기
        var status = 0;
        var response_ok = false;

        var requestObject = {
          id: userId,
        };

        fetch('http://192.168.50.148/Carinfo_main.php', {
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

          maincardata.replaceAll(responseObject);


        }).catch(function(err) {
          console.log("Fetch error: " + err);
        });



        function mycarPage()
        {
          router.push("mycarPage");

        };

        function deletMycarPage()
        {
          router.push("deletMycarPage");

        };



        module.exports = {
          formOK:formOK,
          formCheck:formCheck,
          car_id:car_id,
          car_num:car_num,
          cardata:cardata,
          maincardata:maincardata,
          deletMycarPage:deletMycarPage

   };