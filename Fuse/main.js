    var Observable = require("FuseJS/Observable");
    
    function accountPage()
    {
      router.goto("accountPage");
    };

    function modificationPage()
    {
     router.goto("modificationPage");
   };


   function mycarPage()
   {
    router.goto("mycarPage");
  };

  function mycarPlusPage()
  {
    router.goto("mycarPlusPage");
  };

  function payPage()
  {
    router.goto("payPage");
  };

  function paycodePage()
  {
    router.goto("paycodePage");
  };

  function ticketPage()
  {
   router.goto("ticketPage");
 };

 function favoritePage()
 {
   router.goto("favoritePage");
 };

 function questionPage()
 {
  router.goto("questionPage");
};

var itemdata;

function logoutPage()
{
  router.goto("logoutPage");
};

function manualPage()
{
  router.goto("manualPage");
};

function reservationPage()
{
  router.goto("reservationPage");
};

function main()
{
  router.goto("main");
};

function reservationPageTwo()
{
  router.goto("reservationPageTwo");
};


function buyPage()
{
  router.goto("buyPage");
};



var values = Observable();

function parkinginfoPage(){

  console.log(values.value);
  router.goto("parkinginfoPage",{name:values.value});
  //console.log(values.value);
  //console.log("hi");

}


//-------------------------------------------------------------
  //메인 페이지 주차장 리스트 관련
/*
  var items = [
  { num:1,name: "건양점",fee: "1,000", p1:25, p2:5, p3:3, latitude:36.182603, longitude :127.111375},
  { num:2,name: "홈플점",fee: "500", p1:12, p2:3, p3:1,  latitude:36.182000, longitude :127.111000},
  { num:3,name: "내동점",fee: "3,000", p1:10, p2:2, p3:0,latitude:36.182600, longitude :127.111300  },
  { num:4,name: "시청점",fee: "1,000", p1:7, p2:2, p3:2,latitude:36.181003, longitude :127.110000  },
  { num:5,name: "취암점",fee: "0", p1:5, p2:2, p3:2,latitude:36.180603, longitude :127.110375 }
  ];

  var currentPage = Observable(0);

  function activated(arg) {
    currentPage.value = arg.data.index;
  }
  var latitude1 = Observable("");
  var longitude1 = Observable("");
  var label1=Observable("");
  function searchB(){
    for(var i=0; i<items.length; i++){
      if(items[i].name==search){
        latitude1=items[i].latitude;
        longitude1=items[i].longitude;
        label1=items[i].name;
      }
    }
  }


  var defaultRotation = Observable(0);
  

  //var parkOK = Observable("");
 // console.log(items[1].num);

 function goToItem(arg){
  itemdata = arg.data; 
};
*/


//  function parkOK(args){
//    console.log(args.data.idx);
//    if(parkCheck==0){
//     arr.splice(args.data.idx,1,true);
//     parkCheck=args.data.idx;
//    //   check_arr[args.data.idx]=true;
//  }
//  else{
//   if(args.data.idx==parkCheck){
//     arr.splice(parkCheck,1,false);
//     parkCheck=0;
//   }
//   else{
//     arr.splice(args.data.idx,1,true);
//     arr.splice(parkCheck,1,false);
//   }
//    //   check_arr[args.data.idx]=false;
//  }

//  //check();
// };

//--------------------------------------------------------------
//검색창
var search = Observable("");

function searchB(){

};


//  var items = Observable();
var data = Observable();

fetch('http://192.168.50.148/parkinglist.php')
.then(function(response) { 
  return response.json(); 
})
.then(function(jsonData) {     
  data.replaceAll(jsonData);
});

module.exports = {

  values: values,
  accountPage :  accountPage,
  modificationPage: modificationPage,
  mycarPage:  mycarPage,
  mycarPlusPage:mycarPlusPage,
  payPage :payPage,
  paycodePage :paycodePage,
  ticketPage :ticketPage,
  favoritePage :favoritePage,
  questionPage :questionPage,
  parkinginfoPage:parkinginfoPage,
  manualPage :manualPage,
  logoutPage:logoutPage,
  main :main,
  reservationPage:reservationPage,
  reservationPageTwo:reservationPageTwo,
     // items: items,
      //currentPage: currentPage,
     // activated: activated,
      //defaultRotation: defaultRotation,
buyPage:buyPage,

      search:search,
      searchB:searchB,
    //  latitude1:latitude1,
     // longitude1:longitude1,
     //label1:label1,
   //   goToItem:goToItem,
   data:data

 };