<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registracia</title>

    <link rel="stylesheet" href="style/global.css">
    <link rel="stylesheet" href="style/registracia.css">
</head>
<body>
    <?php 
        $userExist = false;
        error_reporting(E_ERROR);
        session_start();
        require_once "php/connectDb.php";
        if($_POST && $_POST['nick'] && $_POST['mail'] && $_POST['password'] && $_POST['passwordCheck'] && $_POST['password'] == $_POST["passwordCheck"]){
            $sql = "SELECT * FROM users WHERE nickname = :nick";
            $stmt = $conn->prepare($sql);
            $stmt -> bindParam(":nick", $_POST['nick']);
            $stmt -> execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($result){
                $userExist = true;
                $uspesneRegistrovanie = false;
            }else{
                $uspesneRegistrovanie= true;
                $userExist = false;
                $hashPass = hash("md5", $_POST['password']);
                $sql = "INSERT INTO users (nickname, mail, pass) values (:nickName, :mail, :pass)";
                $stmt = $conn->prepare($sql);
                $stmt -> bindParam(":nickName", $_POST['nick']);
                $stmt -> bindParam(":mail", $_POST['mail']);
                $stmt -> bindParam(":pass", $hashPass);
                $stmt -> execute();
            }
        }
    ?>

    <header>
        <a id="about" class="headerBtn">About</a>
        <a id="nazov" href="index.php">Jump it up</a>
        <a id="register" class="headerBtn" href=<?php if($_SESSION['user']) echo "#"; else echo "registraciaForm.php";?>>
            <?php if($_SESSION['user']) echo $_SESSION['user']['nick'];
                  else echo "Register";
            ?>
        </a>
        <a id='signUp' class="headerBtn" href=<?php if($_SESSION['user']) echo "php/odhlasenie.php"; else echo "prihlasenieForm.php";?> > 
            <?php if($_SESSION['user']) echo "Log out";
                  else echo "Sign up";
            ?>
        </a> 
    </header>

    <div id="popUpPreklikKomentar">
        <a href="#">Pridat komentar</a>
    </div>

    <main>
        <div id="formular">
        <form action="" method="POST">
            <label for="nick">Nickname:</label>
            <input type="text" name="nick" value="<?php echo $_POST['nick'];?>" placeholder="Zadaj nickname">
            <span><?php if($_POST && !$_POST['nick']) echo "Zadaj nickname!"; else if($userExist) echo "Pouzivatel existuje"; else echo "*"?></span>

            <label for="mail">E-mail:</label>
            <input type="email" name="mail" value="<?php echo $_POST['mail']?>" placeholder="Zadaj email">
            <span><?php if($_POST && !$_POST['mail']) echo "Zadaj mail!"; else echo "*"?></span>

            <label for="password">Heslo:</label>
            <input type="password" name="password" placeholder="Zadaj heslo">
            <span><?php if($_POST && !$_POST['password']) echo "Zadaj heslo!"; else echo "*"?></span>

            <label for="passwordCheck">Zadaj heslo znovu:</label>
            <input type="password" name="passwordCheck" placeholder="Zadaj heslo znovu">
            <span><?php if($_POST && !$_POST['passwordCheck']) echo "Zadaj heslo na kontrolu!"; 
                        else if($_POST && $_POST['password'] && $_POST['passwordCheck'] && $_POST['password'] != $_POST['passwordCheck']) echo "Hesla sa nezhoduju! Zadaj znovu";
                        else echo "*"; 
                  ?>
            </span>

            <div id="mamUcet">
                <p>Uz mate ucet?</p>
                <a href="prihlasenieForm.php">Prihlaste sa!</a>
            </div>
            <button>Register</button>
        </form>
            <p id="uspesnaRegistracia"><?php if($uspesneRegistrovanie) echo "Uspesne ste sa zaregistrovali mozete sa <a href=prihlasenieForm.php> prihlasit</a>"; else echo "chyba";?></p>
        </div>

    </main>
    
    <footer>
        <p>Made by Peter Vanat</p>
    </footer>

</body>
</html>