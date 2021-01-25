<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign-Up</title>

    <link rel="stylesheet" href="style/global.css">
    <link rel="stylesheet" href="style/prihlasenie.css">
</head>
<body>
    <?php
        session_start();
        error_reporting(E_ERROR);
        require_once "php/connectDb.php";
        if($_POST && $_POST['nickname'] && $_POST['password']){
            $hashPass = hash("md5", $_POST['password']);
            $sql = "SELECT * FROM users WHERE nickname = :nick";
            $stmt = $conn->prepare($sql);
            $stmt -> bindParam(":nick", $_POST['nickname']);
            $stmt -> execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($result){
                $userExist = true;
                if($result[0]['pass'] == $hashPass){
                    $_SESSION['user']['nick'] = $_POST['nickname'];
                    header("location: index.php");
                }
                else{
                    $wrongPass = true;
                }
            }
            else{
                $userExist = false;
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
        <form action="" method="POST">
            <label for="nickname">Nickname</label>
            <input type="text" name="nickname" value="<?php echo $_POST['nickname']?>" placeholder="Zadaj nickname">
            <span><?php if($_POST && !$_POST['nickname']) echo "Zadaj nickname"; else if($_POST && $userExist == false) echo "Pouzivatel neexistuje"; else echo "*";?></span>

            <label for="password">Heslo</label>
            <input type="password" name="password" placeholder="Zadaj heslo">
            <span><?php if($_POST && !$_POST['password']) echo "Zadaj heslo"; else if($_POST && $wrongPass) echo "Zle heslo!"; else echo "*";?></span>

            <div id="nemamUcet">
                <p>Nemate este ucet?</p>
                <a href="registraciaForm.php">Zaregistrujte sa!</a>
            </div>

            <button>Prihlasit sa</button>
        </form>

    </main>

    <footer>
        <p>Made by Peter Vanat</p>
    </footer>

</body>
</html> 