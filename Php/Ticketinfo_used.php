<?php  
error_reporting(E_ALL); 
ini_set('display_errors',1); 

//header('Content-Type: application/json; charset=utf8');

$con=mysqli_connect("localhost","root","","parkstem");

if(mysqli_connect_errno($con)) //mysql error
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
//mysql 연결 성공
mysqli_set_charset($con,"utf8");

$id=isset($_POST['id']) ? $_POST['id'] : '';  

$sql = "select * from reservation where userid='$id' and used = '1'";

$res = mysqli_query($con,$sql); // mysqli_query 를 통해 얻은 값 저장

$result = array();

if($res){ //값이 존재하면
   
   while ($row = mysqli_fetch_assoc($res)){

   	$result[] = $row;
   }

   print json_encode($result);

}
else{
	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($con);
}

mysqli_close($con);



?>