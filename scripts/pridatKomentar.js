function zvolenieHviezd(cisloHviezdy){
    for(let i = 0; i < cisloHviezdy; i++){
        document.getElementsByClassName("fa")[i].style.color = "orange";
        let pctHviezd = cisloHviezdy;
        document.getElementById("pocetHviezd").setAttribute("value", pctHviezd);
    }
   for(let i = cisloHviezdy; i < 5; i++){
        document.getElementsByClassName("fa")[i].style.color = "black";
    }
}