<?php

//1.连接数据库
 include('./conn.php');

 //2.接收数据
 $username = $_REQUEST['username'];
 $password = $_REQUEST['password'];
 $phone = $_REQUEST['phone'];
 $email = $_REQUEST['email'];

 //3.验证数据 判断手机号是否已经存在
 $sql = " select * from user  where user_phone ='$phone'";
 $res = $mysqli->query($sql);

 // 4. 根据验证结果进行操作 插入/提示

if($res->num_rows>0){
    echo '{"msg":"该手机号已存在"}';
    $mysqli->close();
    die ;
}

$insertSql = "insert into user (`user_name`,`user_pass`,`user_email`,`user_phone`)values('$username','$password','$email','$phone')";


$res=$mysqli->query($insertSql);

if($res){
    echo '{"msg":"注册成功","src":"./index.html"}';
}

$mysqli->close();



?>