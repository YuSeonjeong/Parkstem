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

$sql = "select fee from paycode where code='$code'";

$result_set = mysqli_query($con, $sql); 

$row = mysqli_fetch_assoc($result_set);

if($row){

	$data = $row['fee'];
	echo $data;

	$sql2= "update member SET money=money+'$data' WHERE id='$id'";

	$result2=mysqli_query($con,$sql2); 

	$sql3 = "delete from paycode where code='$code'";

	$result3=mysqli_query($con,$sql3); 

	$sql4 = "select max(seq) as max from pay";

	$result4 = mysqli_query($con, $sql4); 

	$row4 = mysqli_fetch_assoc($result4);

	$count = $row4['max'];

	$count = $count+1;

	$fee ="+".$data;

	$sql5="insert into pay(seq,userid,info,fee) values('$count','$id','충전','$fee')";  
	
	$result5=mysqli_query($con,$sql5); 


}

else {

	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($con);
}

mysqli_close($con);

?>