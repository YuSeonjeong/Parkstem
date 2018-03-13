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

$sql = "SELECT count(*) as total from reservation where userid='$id' and used='0'";

$result = mysqli_query($con, $sql); 

$row = mysqli_fetch_assoc($result);

$count = $row['total'];


echo $count;


mysqli_close($con);

?>