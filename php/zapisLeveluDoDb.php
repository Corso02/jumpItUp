<?php 
    session_start();
    require_once "connectDb.php";
    error_reporting(E_ERROR);

    if($_POST && $_POST['data'] && $_POST['nazov']){
        $levelData = $_POST['data'];
        $nazovLevelu = $_POST['nazov'];
    }
    $levelId = crc32(uniqid(rand(), true));
    if($_SESSION['user']) $nick = $_SESSION['user']['nick'];
    else $nick = "Guest";

    //kontrola ci level exituje 
    $sql = "SELECT * FROM levels WHERE level = :levelData";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(":levelData", $levelData);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    if(empty($result)){ //result je empty ak sa nenasiel rovnaky level 
        $sql = "INSERT INTO levels (nick, levelid, level, nazovLevelu) VALUES (:nick, :levelId, :levelData, :nazovLevelu)";
        $stmt = $conn -> prepare($sql);
        $stmt -> bindParam(":nick", $nick);
        $stmt -> bindParam(":levelId", $levelId);
        $stmt -> bindParam(":levelData", $levelData);
        $stmt -> bindParam(":nazovLevelu", $nazovLevelu);
        if($stmt -> execute()) echo $levelId; //pri uspesnom zapise do db sa ukaze pouzivatelovi ID levelu
        else echo "chyba";
    }
    else{
        echo "Level uz je zapisany!";
    }
?>