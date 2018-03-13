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
$pwd=isset($_POST['pwd']) ? $_POST['pwd'] : '';  

$sql = "select id from member where id='$id' and pwd='$pwd'";

$res = mysqli_query($con,$sql); // mysqli_query 를 통해 얻은 값 저장

$result = array();

if($res){ //값이 존재하면

	while ($row = mysqli_fetch_assoc($res)){

		$result[] = $row;
	}

	

	print json_encode($result);


}
else{

	echo ("false");
	echo mysqli_error($con);
}

mysqli_close($con);



?>