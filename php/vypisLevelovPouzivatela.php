<?php 
    session_start();
    require_once "php/connectDb.php";

    $sql = "SELECT * FROM levels WHERE nick = :nick";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(":nick", $_SESSION['user']['nick']);
    $stmt -> execute();
    $results = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    ?>
    