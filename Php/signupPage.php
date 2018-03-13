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

//POST 값을 읽어온다.
$id=isset($_POST['id']) ? $_POST['id'] : '';  
$pwd=isset($_POST['pwd']) ? $_POST['pwd'] : '';  
$name=isset($_POST['name']) ? $_POST['name'] : '';  
$phone=isset($_POST['phone']) ? $_POST['phone'] : '';  
$email=isset($_POST['email']) ? $_POST['email'] : '';  


$sql="insert into member(id,pwd,name,phone,email) values('$id','$pwd','$name','$phone','$email')";  
$result=mysqli_query($con,$sql); 

if($result){ //값이 존재하면

	echo("true");
}
else{
	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($con);
}

mysqli_close($con);
?>
