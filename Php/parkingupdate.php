<?php  
error_reporting(E_ALL); 
ini_set('display_errors',1); 

$link=mysqli_connect("localhost","root","","parkstem"); 
if (!$link)  
{ 
   echo "MySQL 접속 에러 : ";
   echo mysqli_connect_error();
   exit();
}  


mysqli_set_charset($link,"utf8");  

//POST 값을 읽어온다.
/*$snum=isset($_GET['snum']) ? $_GET['snum'] : '';  
$ch=isset($_GET['ch']) ? $_GET['ch'] : '';  */
$num=$_GET["num"];
$ch=$_GET["ch"];


    $sql="update parking set ch='$ch' where snum='$num'";
    $result=mysqli_query($link,$sql);  
    echo "1";



mysqli_close($link);
?>

