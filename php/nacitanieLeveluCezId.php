<?php 
    require_once "connectDb.php";
    error_reporting(E_ERROR);
    if($_POST && $_POST['levelId']) $levelId = $_POST['levelId'];

    $sql = "SELECT * FROM levels WHERE levelid = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(":id", $levelId);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    if(empty($result)) echo "chyba";
    else echo $result[0]['level'];
