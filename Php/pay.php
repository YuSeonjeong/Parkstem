<?php

header('Content-Type: application/json; charset=utf8');

$con=mysqli_connect("localhost","root","","parkstem");

if(mysqli_connect_errno($con)) //mysql error
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
//mysql 연결 성공
mysqli_set_charset($con,"utf8");

$id=isset($_POST['id']) ? $_POST['id'] : '';  

$code=isset($_POST['code']) ? $_POST['code'] : '';

$sql = "select fee from paycode where code='12345'";

$result_set = mysqli_query($con, $sql); 

$row = mysqli_fetch_assoc($result_set);

if($row){

	$data = $row['fee'];
	$string ="+"."data";
	echo $string;

}

else {

	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($con);
}



mysqli_close($con);

?>