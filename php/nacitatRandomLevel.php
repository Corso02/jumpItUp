<?php

    require_once "connectDb.php";
    error_reporting(E_ERROR);
    $sql = "SELECT * FROM levels ORDER BY RAND() LIMIT 1";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    if(empty($result)) echo "chyba";
    else echo $result[0]['level'];
    
?>