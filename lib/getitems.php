<?php
  header('Access-Control-Allow-Origin:*'); // CORS
    include('./conn.php');

    $id = $_REQUEST['id'];

    $sql = "select * from products where id='$id'";

    $res = $mysqli->query($sql);

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;

    $mysqli->close();

?>