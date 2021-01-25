<?php 
    require_once "connectDb.php";
    if($_POST){
         $levelId = $_POST['idLevelu'];
         $sql = "DELETE FROM levels WHERE levelid = :id";
         $stmt = $conn -> prepare($sql);
         $stmt -> bindParam(":id", $levelId);
         $vymazane =  $stmt -> execute();
         $stmt -> execute();
         if($vymazane) echo "success";
         else echo "chyba";
        
    }