<?php
header('Content-Type: application/json; charset=utf8');


   //$conn = mysqli_connect("127.0.0.1", "root", "", "parkstem");

  // $select_query = "select * FROM member";

   //$result_set = mysqli_query($conn, $select_query); 

 //  $row = mysqli_fetch_assoc($result_set);

  $query_result = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

   $json = json_encode($query_result);

   echo $json;

  // mysqli_close($conn);

 


/* 
    ;*/
?>