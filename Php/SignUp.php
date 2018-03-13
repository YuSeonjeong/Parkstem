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

	$sql2= "update member SET money=money+3000 WHERE id='$id'";

	$result2=mysqli_query($con,$sql2); 

	$sql4 = "select max(seq) as max from pay";

	$result4 = mysqli_query($con, $sql4); 

	$row4 = mysqli_fetch_assoc($result4);

	$count = $row4['max'];

	$count = $count+1;


	$sql5="insert into pay(seq,userid,info,fee) values('$count','$id','가입 축하 이벤트','3000')";  
	
	$result5=mysqli_query($con,$sql5); 
	

	echo("true");
}
else{
	echo "SQL문 처리중 에러 발생 : ";
	echo mysqli_error($con);
}

mysqli_close($con);
?>
