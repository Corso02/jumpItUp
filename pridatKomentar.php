<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pridat komentar</title>

    <link rel="stylesheet" href="style/global.css">
    <link rel="stylesheet" href="style/pridatKomentar.css">

    <script src="scripts/index.js"></script>
    <script src="scripts/pridatKomentar.js"></script>

    <!-- ikony -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body>
    <?php 
        session_start();
        error_reporting(E_ERROR);
        if($_SESSION['user']['nick'] == "") header("location: index.php"); //pokial nie je pouzivatel prihlaseny a pokusi sa dostat na tuto podstranku, tak ho to vrati na index
        require_once "php/connectDb.php";
        require_once "php/kontrolaNadavok.php";
        $nula = "0";
        $chybnyInput = false;
        if($_POST && $_POST['komentar']){
            if(!kontrolaNadavok($_POST['komentar'])){
                $sql = "INSERT INTO comments (nick, comment, stars) VALUES (:nick, :comment, :stars)";
                $stmt = $conn->prepare($sql);
                $stmt-> bindParam(":nick", $_SESSION['user']['nick']);
                $stmt-> bindParam(":comment", $_POST['komentar']);
                if(!$_POST['pctHviezd']){
                    $stmt-> bindParam(":stars", $nula);
                }
                else $stmt-> bindParam(":stars", $_POST['pctHviezd']);
                $stmt-> execute();
            }
            else{
                $chybnyInput = true;
            }
        }
    ?>
    <header>
        <a id="about" class="headerBtn">About</a>
        <a id="nazov" href="index.php">Jump it up</a>
        <a id=<?php if($_SESSION['user']) echo "prihlaseny"; else echo "register"?> class="headerBtn" href=<?php if($_SESSION['user']) echo "#"; else echo "registraciaForm.php";?> 
            onmouseover=<?php if($_SESSION['user']) echo "zobrazeniePrekliku()"; else echo ""?> onmouseout=<?php if($_SESSION['user']) echo "skrytiePrekliku()"; else echo "";?>>
            <?php if($_SESSION['user']) echo $_SESSION['user']['nick'];
                  else echo "Register";
            ?>
        </a>
        <a id='signUp' class="headerBtn" href=<?php if($_SESSION['user']) echo "php/odhlasenie.php"; else echo "prihlasenieForm.php";?> >
            <?php if($_SESSION['user']) echo "Log out";
                  else echo "Sign up";
            ?>
        </a> 
        <div id="popUpPreklikKomentar" onmouseover="zobrazeniePrekliku()" onmouseout="skrytiePrekliku()">
            <a href="#">Pridat komentar</a>
        </div>
    </header>
   
    <main>
        <div id = "hodnotenieHviezdami">
            <span class="fa fa-star" onclick="zvolenieHviezd(1)"></span>
            <span class="fa fa-star" onclick="zvolenieHviezd(2)"></span>
            <span class="fa fa-star" onclick="zvolenieHviezd(3)"></span>
            <span class="fa fa-star" onclick="zvolenieHviezd(4)"></span>
            <span class="fa fa-star" onclick="zvolenieHviezd(5)"></span>
        </div>
        <div id="formular">
            <form method="POST">
                <textarea name="komentar" maxlength="50" rows='2' cols='50' placeholder="Tu napis svoju recenziu(50 znkov max)"></textarea>
                <input type="hidden" name="pctHviezd" id="pocetHviezd" value="0"> <!-- toto sa aktualizuje stale ked pouzivatel zmeni pocet hviezd -->
                <button>Pridat komentar</button>
            </form>
        </div>
        <p id="chybnyInput"><?php if($chybnyInput) echo "Tvoj komentar nesmie obsahovat nadavku!! Tvoj komentar nebude pridany pokial bude obsahovat nadavky!"; else echo ""; ?></p>
    </main>

    <footer>
        <p>Made by Peter Vanat</p>
    </footer>

</body>
</html>