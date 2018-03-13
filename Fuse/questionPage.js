var Observable = require("FuseJS/Observable");

//사용자가 작성한 질문
var question =Observable("");

//사용자가 작성한 질문 추가
var questionAdd =Observable(true);

function questionAddOk(){
  if(question!=""){
    questionAdd=true;
  }
};
//수정한 정보

   module.exports = {
 question:question,
 questionAdd:questionAdd,
 questionAddOk:questionAddOk
   };
