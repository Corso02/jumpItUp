<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moje levely</title>

    <link rel="stylesheet" href="style/global.css">
    <link rel="stylesheet" href="style/levelyPouzivatela.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="scripts/levelyPouzivatela.js"></script>
</head>
<body>
    <?php
        error_reporting(E_ERROR);
        session_start();
    ?>
      <header>
        <a id="about" class="headerBtn">About</a>
        <a id="nazov" href="index.php">Jump it up</a>
        <div id="smallScreen">
            <div id="headerMenu">
                <a id=<?php if($_SESSION['user']) echo "prihlaseny"; else echo "register"?> class="headerBtn small" href=<?php if($_SESSION['user']) echo "#"; else echo "registraciaForm.php";?> 
                    onmouseover=<?php if($_SESSION['user']) echo "zobrazeniePrekliku()"; else echo ""?> onmouseout=<?php if($_SESSION['user']) echo "skrytiePrekliku()"; else echo "";?>>
                    <?php if($_SESSION['user']) echo $_SESSION['user']['nick'];
                        else echo "Register";
                    ?>
                </a>
                <!-- 2 prekliky v menu pri malej obrazovke a prihlasenom pouzivatelovi-->
                <div id="prekliky" style="display: none">
                    <a href="pridatKomentar.php" class="headerBtn">Pridat komentar</a>
                    <a href="levelyPouzivatela.php" class="headerBtn">Moje levely</a>
                </div>
                <a id='signUp' class="headerBtn small" href=<?php if($_SESSION['user']) echo "php/odhlasenie.php"; else echo "prihlasenieForm.php";?> >
                    <?php if($_SESSION['user']) echo "Log out";
                        else echo "Sign up";
                    ?>
                </a> 
            </div>
            <img src="images/editorOpenCloseBtnBeta.png" id="menuBtn" onclick="openMenu()"/>
        </div> 
        <div id="popUpPreklikKomentar" onmouseover="zobrazeniePrekliku()" onmouseout="skrytiePrekliku()">
            <a href="pridatKomentar.php">Pridat komentar</a>
            <a href="levelyPouzivatela.php">Moje levely</a>
        </div>
    </header>
    
    <main>
        <?php 
            if(!$_SESSION['user']){
                echo "<h1 id='neprihlaseny'> Nie si prihlaseny! </h1>";
            } 
            else{
                require_once "php/vypisLevelovPouzivatela.php";
                if(empty($results)) echo "<h1 id='bezLevelov'> Nemas este ziadne levely. Cas nejake vytvorit v editore!</h1>";
                else{
                    echo "<div id='levely'>";
                    foreach ($results as $level) {
                        echo "<div class='level'> <p class='nazovLevelu'> Nazov levelu: ";
                        echo $level['nazovLevelu'];
                        echo "</p>";
                        echo "<p class='idLevelu'> ID: " ;
                        echo $level['levelid'];
                        echo "</p><button class='zmazatLevel' onclick='zmazanieLevelu($level[levelid], `$level[nazovLevelu]`)'>Vymazat level</button>";
                        echo "</div>";
                        
                    }
                    unset($level);
                    echo "</div>";
                }
            }
        ?>
    </main>

    <footer>
        <p>Made by Peter Vanat</p>
    </footer>    
</body>
</html>