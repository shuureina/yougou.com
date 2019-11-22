<?php
header("content-type:text/html;charset=utf-8");

$myslq_conf = array(
    'host' => 'localhost:3306',
    'db_user' => 'root',
    'db_psw' => '',
    'db' => 'yougou'
);

$mysqli = @new mysqli($myslq_conf['host'],$myslq_conf['db_user'],$myslq_conf['db_psw']);


if( $mysqli->connect_errno ){
    die( '连接数据库错误'.$mysqli->connect_errno );
}

$mysqli->query("set names utf8");

$select_db = $mysqli->select_db($myslq_conf['db']);

if(!$select_db){
    die('选择数据库错误'.$mysqli->error);
}

?>