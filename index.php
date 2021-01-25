<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jump It Up</title>
    <!-- css -->
    <link rel="stylesheet" href="style/global.css">
    <link rel="stylesheet" href="style/index.css">

    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="scripts/jQuery.js"></script>
     <!-- ikony -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

     <!-- skripty -->
     <script src="scripts/index.js"></script>

</head>
<body>
    <?php 
        session_start();
        error_reporting(E_ERROR);
    ?>

    <div style="font-family: pixel; position: absolute; left: -1000px; visibility: hidden;">.</div>
    <div style="font-family: pixelBold; position: absolute; left: -1000px; visibility: hidden;">.</div>

    <header>
        <a id="about" class="headerBtn">About</a>
        <a id="nazov">Jump it up</a>
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
            <a href="pridatKomentar.php">Pridat komentar</a>
            <a href="levelyPouzivatela.php">Moje levely</a>
        </div>
    </header>
   
    
    <main>
        <div id="lavyOkraj">
            <h2 id="nazov">Update: 1.0 Beta</h2>
            <p>Moznost hra levely pouzivatelov</p>
            <p>Moznost ukladat levely z editoru</p>
            <p>Pridavanie recenzii</p>
            <p>Registracia a prihlasovanie</p>
            <p>Pridanie animacii</p>
            <p>Mensia zmena grafiky</p>
            <p>Bug fixy</p>
        </div>

        <div id="overlay-box">
            <div id="overlay" onclick="vypnutiePopUp()">
                <div id="text">
                    <h1>Vitam ta pri hre Jump it up</h1>
                    <p>Pre spravne fungovanie neblokuj vyskakovacie okna (su potrebne pri ukladani a nacitavani levelov :) )</p>
                    <p>Ak sa budes bavit pozdielaj hru medzi kamosmi :)</p>
                </div>
            </div>
        </div>
        
        <div id="spustitHruBtn">
            <h1 onclick="spustenieHry()" id="hraBtn">Spustit hru</h1>
        </div>

        
    <div id="hra">
        <script src="metody.js"></script>
        <script src="phaser.js"></script>
        <script src="StiahnutyLevel.js"></script>
        <script src="komponenty.js"></script>
        <script src="editorTest.js"></script>
        <script src="hlavneMenu.js"></script>
        <script src="pauseMenu.js"></script>
        <script src="deathScreen.js"></script>
        <script src="winScreen.js"></script>
        <script src="level1.js"></script>
        <script src="level2.js"></script>
        <script src="game.js"></script>
        <script src="pohybHraca.js"></script>
       </div>

       <div id="pravyOkraj">
            <?php 
                require_once "php/connectDb.php";
                require_once "php/zobrazenieHviezd.php";
                $sql = "SELECT * FROM comments ORDER BY RAND() LIMIT 3";
                $stmt = $conn->prepare($sql);
                $stmt-> execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if(!$result) echo "<p id='ziadneKomentare'>Nie su ziadne komentare :(</p>";
                //prvy koment
                else{
                    echo "<div class='recenzia'>  <p id='nickPouzivatela'> ";
                    echo  $result[0]['nick'] . "</p>";
                    echo vypisanieHviezd($result[0]['stars']) .  "<p class='koment'>" . $result[0]['comment'] . "</p> </div>";
                    //druhy koment
                    echo "<div class='recenzia'>  <p id='nickPouzivatela'> ";
                    echo  $result[1]['nick'] . "</p>";
                    echo vypisanieHviezd($result[1]['stars']) .  "<p class='koment'>" . $result[1]['comment'] . "</p> </div>";
                    //treti koment
                    echo "<div class='recenzia'>  <p id='nickPouzivatela'> ";
                    echo  $result[2]['nick'] . "</p>";
                    echo vypisanieHviezd($result[2]['stars']) .  "<p class='koment'>" . $result[2]['comment'] . "</p> </div>";
                    echo "<a href='vsetkyKomentare.php' id='preklikNaVsetkyRecenzie'>Zobrazit vsetky recenzie</a>";
                }
           ?>
           
       </div>
    </main>

    <footer>
        <p>Made by Peter Vanat</p>
    </footer>
    
</body>
</html>