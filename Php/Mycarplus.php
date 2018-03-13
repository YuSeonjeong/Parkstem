<?php  
error_reporting(E_ALL); 
ini_set('display_errors',1); 

$con=mysqli_connect("localhost","root","","parkstem");

if(mysqli_connect_errno($con)) //mysql error
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

//mysql 연결 성공
mysqli_set_charset($con,"utf8");

$id=isset($_POST['id']) ? $_POST['id'] : '';  
$car_id=isset($_POST['car_id']) ? $_POST['car_id'] : '';  
$car_num=isset($_POST['car_num']) ? $_POST['car_num'] : '';  

$sql = "select max(seq) as max from mycar";

$result = mysqli_query($con, $sql); 

$row = mysqli_fetch_assoc($result);

$count = $row['max'];

$count = $count+1;

//sql3값이 null인걸 잡아야됨.
/*$sql3="select userid from mycar where userid='$id' and maincar='1'";
$res = mysqli_query($con,$sql3);*/ // mysqli_query 를 통해 얻은 값 저장
/*
if($result3){ //값이 존재하면

	$sql2="insert into mycar(seq,userid,car_id,car_num,maincar) values('$count','$id','$car_id','$car_num',0)";  

	$result2=mysqli_query($con,$sql2); 

	if($result2){ //값이 존재하면

		echo("true");
	}
	else{
		echo "SQL문 처리중 에러 발생 : ";
		echo mysqli_error($con);
	}
}
else{

	$sql4="insert into mycar(seq,userid,car_id,car_num,maincar) values('$count','$id','$car_id','$car_num',1)";  

	$result4=mysqli_query($con,$sql4); 
	if($result4){ //값이 존재하면

		echo("true");
	}
	else{
		echo "SQL문 처리중 에러 발생 : ";
		echo mysqli_error($con);
	}
}
*/


$sql2="insert into mycar(seq,userid,car_id,car_num) values('$count','$id','$car_id','$car_num')";  

$result2=mysqli_query($con,$sql2); 

if($result2){ //값이 존재하면

	echo("true");
}
else{
	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($con);
}




/*$result = array();

if($res){ //값이 존재하면

	while ($row = mysqli_fetch_assoc($res)){

		$result[] = $row;
	}

	print json_encode($result);

}*/

	//$count = mysqli_num_rows($result4);
//	$count = $count+1;

//echo $count;


//$sql = "select max(seq) from pay";
/*
$result = mysqli_query($con,"select max(seq) as max_seq from pay");
$row = mysql_fetch_array($result);
echo $row["max_seq"];
*/
/*$result=mysqli_query($con,$sql); 

if($result){ //값이 존재하면

	echo("true");
}
else{
	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($con);
}*/
mysqli_close($con);
?>
