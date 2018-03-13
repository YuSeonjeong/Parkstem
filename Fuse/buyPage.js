var Observable = require("FuseJS/Observable");
var Storage = require("FuseJS/Storage");
var userId = Storage.readSync("login.txt");
var ticket= Observable("");

function formEncode(obj) {
  var str = [];
  for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
};

function buyOK(){

  setTimeout(GoMain, 800);
};
function GoMain(){
  router.goto("main");

};

module.exports = {

  buyOK:buyOK
       // PastticketData:PastticketData
    // addticketName: addticketName,
    // addticketNum: addticketNum,
    // addticketOk,addticketOk,
    // addticketCheck:addticketCheck
  }
