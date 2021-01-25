<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vsetky komentare</title>

    <link rel="stylesheet" href="style/global.css">
    <link rel="stylesheet" href="style/vsetkyKomentare.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <script src="scripts/vsetkyKomentare.js"></script>
    <script src="scripts/index.js"></script>


</head>
<body>
    <?php 
        session_start();
        error_reporting(E_ERROR);
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
            <a href="pridatKomentar.php">Pridat komentar</a>
        </div>
    </header>

    <main>
        <div id='filterBox'>
            <div id='zobrazenie'>
                <label>Zobrazit filtre</label>
                <input type="checkbox" name="zobrazitFiltre" id="zobrazitFiltre" onclick="zmena()">
            </div>
            <div id="filter">
                <p>Filtrovat podla: </p>
                <form method="GET">
                    <select name="filter" id="filtre">
                        <option value="pocetHviezdHore">Pocet hviezd (od 1 po 5)</option>
                        <option value="pocetHviezdDole">Pocet hviezd (od 5 po 1)</option>
                        <option value="pocetHviezd1">S jednou hviezdou</option>
                        <option value="pocetHviezd2">S dvoma hviezdami</option>
                        <option value="pocetHviezd3">S troma hviezdami</option>
                        <option value="pocetHviezd4">So styroma hviezdami</option>
                        <option value="pocetHviezd5">S piatimi hviezdami</option>
                        <option value="zobrazitVsetky">Zobrazit vsetky</option>
                    </select>
                    <button>Vyfiltrovat</button>
                </form>
            </div>
        </div>
        <div id="komentareBox">
            <?php 
                require_once "php/connectDb.php";
                require_once "php/zobrazenieHviezd.php";
                if($_GET){
                    switch($_GET['filter']){
                        case "pocetHviezd1": $sql = "SELECT * FROM comments WHERE stars = 1";
                                             break;
                        case "pocetHviezd2": $sql = "SELECT * FROM comments WHERE stars = 2";
                                             break;
                        case "pocetHviezd3": $sql = "SELECT * FROM comments WHERE stars = 3";
                                             break;
                        case "pocetHviezd4": $sql = "SELECT * FROM comments WHERE stars = 4";
                                             break;
                        case "pocetHviezd5": $sql = "SELECT * FROM comments WHERE stars = 5";
                                             break;
                        case "pocetHviezdHore": $sql = "SELECT * FROM comments ORDER BY stars";
                                                break;
                        case "pocetHviezdDole": $sql = "SELECT * FROM comments ORDER BY stars DESC";
                                                break;
                        case "zobrazitVsetky":  $sql = "SELECT * FROM comments";
                                                break;
                    }
                }
                else{
                    $sql = "SELECT * FROM comments";
                }
                $stmt = $conn->prepare($sql);
                $stmt-> execute();
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if(!$results) echo "nejsu komenty";
                else{
                    foreach($results as $comment){
                        echo "<div class='recenzia'>  <p id='nickPouzivatela'> ";
                        echo  $comment['nick'] . "</p>";
                        echo vypisanieHviezd($comment['stars']) .  "<p class='koment'>" . $comment['comment'] . "</p> </div>";
                    }
                }
            ?> 
        </div>
    </main>

    <footer>
        <p>Made by Peter Vanat</p>
    </footer>

</body>
</html>