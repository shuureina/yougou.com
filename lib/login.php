<?php
  header('Access-Control-Allow-Origin:*'); // CORS
 //1.连接数据库
 include('./conn.php');


     //2.接收数据
     $username = $_REQUEST['username'];
     $password = $_REQUEST['password'];
     $phone = $_REQUEST['phone'];
     $email = $_REQUEST['email'];
    
     $sql = " select * from user  where user_name ='$username' or user_emial = '$email' or user_phone = '$phone' and user_pass = '$password' ";
     $res = $mysqli->query($sql);
     if($res->num_rows>0){
        echo "<script>alert('登陆成功');location.href='./index.html';</script>";
     }else{
         echo  "<script>alert('用户名或密码错误');location.href='./login.html';</script>";
     }

 $mysqli->close();

?>
