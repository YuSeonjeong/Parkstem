var Observable = require("FuseJS/Observable");
var ticketData = Observable();
var UsedticketData = Observable();
var Storage = require("FuseJS/Storage");
var userId = Storage.readSync("login.txt");
var ticket= Observable("");

function formEncode(obj) {
  var str = [];
  for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
return str.join("&");
};

/*var ticketName =Observable();
var ticketDate =Observable();
var ticketHour =Observable();
var ticketCarNum =Observable();
var Space =Observable();
var fee =Observable();

var PastticketData = Observable();
var PastticketName =Observable();
var PastticketDate =Observable();
var PastticketHour =Observable();
var PastticketCarNum =Observable();
var PastSpace =Observable();
var Pastfee =Observable();

 ticketData=[{
    ticketName : "건양대 주차권(충남 논산 대학로123)", 
    ticketDate : "2017월 12월 17일 수요일", 
    ticketHour:"11:00 - 12:00(총 1시간)" ,
    ticketCarNum:"14가 1901",
    Space: "일반 1층 B구역",
    fee : "1,000"
 },{ticketName : "홈플러스 주차권(충남 논산시 시민로 187)", 
    ticketDate : "2017월 11월 17일 금요일", 
    ticketHour:"17:35 - 19:05(총 1시간 30분)" ,
    ticketCarNum:"14가 1901",
    Space: "자율구역",
    fee : "1,500"
 }];

 PastticketData=[{
    PastticketName : "건양대 주차권(충남 논산 대학로123)", 
    PastticketDate : "2017월 10월 17일 수요일", 
    PastticketHour:"11:00 - 12:00(총 1시간)" ,
    PastticketCarNum:"14가 1901",
    PastSpace: "일반 1층 B구역",
    Pastfee : "1,000"
}];*/

         //사용 예정 티켓
         var status = 0;
         var response_ok = false;

         var requestObject = {
          id: userId,
      };

      fetch('http://192.168.50.148/Ticketinfo.php', {
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

          ticketData.replaceAll(responseObject);



      }).catch(function(err) {
          console.log("Fetch error: " + err);
      });


         //사용 완료 티켓
         var status = 0;
         var response_ok = false;

         var requestObject = {
          id: userId,
      };

      fetch('http://192.168.50.148/Ticketinfo_used.php', {
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

          UsedticketData.replaceAll(responseObject);

         // var time = responseObject[0].s_time.getTime();
          //console.log(time);


      }).catch(function(err) {
          console.log("Fetch error: " + err);
      });


  //티켓 수 카운트
  var status = 0;
  var response_ok = false;

  var requestObject = {
      id: userId,
  };

  fetch('http://192.168.50.148/Ticket_count.php', {
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

        ticket.value = responseObject; 
       // console.log(ticket.value);

    }).catch(function(err) {
      console.log("Fetch error: " + err);
  });

    function delticketPage()
    {
      router.push("delticketPage");

  };

  module.exports = {
    ticketData: ticketData,
    UsedticketData : UsedticketData,
    ticket:ticket,
    delticketPage:delticketPage
       // PastticketData:PastticketData
    // addticketName: addticketName,
    // addticketNum: addticketNum,
    // addticketOk,addticketOk,
    // addticketCheck:addticketCheck
};