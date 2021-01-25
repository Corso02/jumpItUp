function zmazanieLevelu(id, nazovLevelu){
    let potvrdenie = confirm("Naozaj chcete vymazat tento level s nazvom: " + nazovLevelu );
    console.log("post");
    if(potvrdenie){
        $.post("./php/levelyPouzivatelaFunkcie.php", {
            idLevelu: id
        }, function(data, status){
            if(data == 'success'){
                alert("Level bol vymazany");
                location.reload();
            }
            else{
                alert("nastala chyba :( kontaktujte admina");
            }
        });
    }
}