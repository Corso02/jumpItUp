function zapisLeveluDoDb(lvlData, lvlNazov){ //data z levelu vytvoreneho v editore
    //console.log("zapisovanie: ");
    //console.log(JSON.parse(lvlData));
    $.post("php/zapisLeveluDoDb.php", {
        data: lvlData,
        nazov: lvlNazov
    }, function(data, status){ //data = ID levelu v databaze (generovane v zapisLeveluDoDb.php)/ chybova hlaska... data je vlastne to co davam echo v php-cku
       if(status){
           if(data == "chyba"){ 
                alert("Nastala chyba pri ukladani levelu :(");
            }
           else if(data == "Level uz je zapisany!"){
               alert(data);
            }
            else{
                alert("Level bol ulozeny. ID = " + data);
            }
       }
    });
}

function ziskanieLevelDataCezID(id){
    console.log("ziskanie dat: ");
    console.log("ID: " + id);
    //$.ajaxSetup({async: false});
    $.post("php/nacitanieLeveluCezId.php", {
        levelId: id
    }, function(data, status){
        if(status){
            if(data == "chyba"){
                alert("Zadali ste neplatne ID!");
            }
            else{
                sessionStorage.setItem("dataLevelu", data);
            }
        }
    });
}

function ziskatRandomLevelData(){
    $.get("php/nacitatRandomLevel.php", function(data, status){
        if(status){
            if(data == "chyba"){
                alert("Nastala chyba pri komunikacii so serverom :( za chvilu skuste znovu");
            }
            else{
                sessionStorage.setItem("dataLevelu", data);
            }
        }
    });
}