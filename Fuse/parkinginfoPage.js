var Observable = require("FuseJS/Observable");
var parkingdata = Observable();
var name= Observable("");
var type_a = Observable(false);
var type_b = Observable(false);
var type_c = Observable(false);
var type_d = Observable(false);
var faclicked =  Observable(false);
function formEncode(obj) {
  var str = [];
  for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

var name = this.Parameter.map(function(param) {
  return param.name;
});

name.subscribe(module);
console.log(name.value);

var status = 0;
var response_ok = false;

//name
//페이지 넘길때 이름 받기
/*name.value="건양점"
*/
function favCliked(){
faclicked.value=true;
  console.log("click");
}
var requestObject = {
  name: name.value,
};

fetch('http://192.168.50.148/Parkinglotinfo.php', {
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
          var check1 = responseObject[0].type_a;
          if(check1==1){type_a.value=true;}
          var check2 = responseObject[0].type_b;
          if(check2==1){type_b.value=true;}
          var check3 = responseObject[0].type_c;
          if(check3==1){type_c.value=true;}
          var check4 = responseObject[0].type_d;
          if(check4==1){type_d.value=true;}

        }).catch(function(err) {
          console.log("Fetch error: " + err);
        });

        module.exports = {
         parkingdata: parkingdata,
         type_a:type_a,
         type_b:type_b,
         type_c:type_c,
         type_d:type_d,
         favCliked:favCliked,
         faclicked:faclicked

       }