<?php 
    $url = "/tiu/rop-testing/index.php";
    session_start();
    session_destroy();
    header("Location:" .$url );
?>