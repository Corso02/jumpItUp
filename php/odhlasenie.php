<?php 
    $url = "/tiu/rop-respo/index.php";
    session_start();
    session_destroy();
    header("Location:" .$url );
?>