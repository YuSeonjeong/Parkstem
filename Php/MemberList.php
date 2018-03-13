<?php
header('Content-Type: application/json; charset=utf8');

$con=mysqli_connect("localhost","root","","parkstem");

if(mysqli_connect_errno($con))
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_set_charset($con,"utf8");

$res = mysqli_query($con,"select * from member");

$result = array();

while($row = mysqli_fetch_assoc($res)){

	array_push($result,$row);

}

echo json_encode(array("result"=>$result),JSON_UNESCAPED_UNICODE);

mysqli_close($con);

?>