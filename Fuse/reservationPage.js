var Observable = require("FuseJS/Observable");
var parkingdata = Observable();
var name= Observable("");
var tttt= [{nn: "일반", mm:25},
{nn: "장애인", mm:5},
{nn: "여성", mm:3}];

var tt= [{n: "선택"},
{n: "자율"}];

function formEncode(obj) {
  var str = [];
  for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

/*var name = this.Parameter.map(function(param) {
  return param.name;
});*/


var status = 0;
var response_ok = false;

//name
//페이지 넘길때 이름 받기
name.value="건양대학교 파크스템"


var requestObject = {
  name: name.value,
};

fetch('http://10.1.59.15/Parkinglotinfo.php', {
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
          parkingdata.replaceAll(responseObject);

        }).catch(function(err) {
          console.log("Fetch error: " + err);
        });

        module.exports = {
         parkingdata: parkingdata,
         tttt:tttt,
         tt:tt
       }