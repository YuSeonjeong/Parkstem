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
$id=isset($_POST['id']) ? $_POST['id'] : '';  
$pwd=isset($_POST['pwd']) ? $_POST['pwd'] : '';  
$name=isset($_POST['name']) ? $_POST['name'] : '';  
$phone=isset($_POST['phone']) ? $_POST['phone'] : '';  
$email=isset($_POST['email']) ? $_POST['email'] : '';  


$sql="update member set pwd='$pwd',name='$name',phone='$phone',email='$email' where id='$id'";
$result=mysqli_query($link,$sql); 
if($result){ //값이 존재하면

	echo("true");
}
else{
	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($link);
}

mysqli_close($link);
?>

