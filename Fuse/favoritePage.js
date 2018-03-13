var Observable = require("FuseJS/Observable");
var Fdata = Observable();
var FName =Observable();
var Flocate =Observable();
var FSeat1 =Observable();
var FSeat2 =Observable();
var FSeat3 =Observable();


Fdata=[{
    FName : "건양점", 
    Flocate : "충남 논산 대학로123", 
    FSeat1:25 ,
    FSeat2:5,
    FSeat3: 3
 }];

module.exports = {
    Fdata: Fdata,
};