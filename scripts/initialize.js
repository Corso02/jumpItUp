//tento script mi sluzi na prvotne nastavenie stranky (responzivita)

// $(document).ready(function (){
//     if(window.innerWidth <= 800){
//         let btns = document.getElementsByClassName('small');
//         for(let i = 0; i < 2; i++){
//             btns[i].style.display = "none"
//         }
//         document.getElementById("menuBtn").style.display = "block"
//         console.log("small")
//     }
//     else if(window.innerWidth > 800){
//         document.getElementById("menuBtn").style.display = "none"
//         console.log("ha")
//     }
// })

//urci mi grid v casti komentarov na indexe
$(document).ready( () => {
    let pctKomentov = document.getElementsByClassName("recenzia").length;
    pctKomentov === 1 ? document.getElementById("pravyOkraj").style.gridTemplateRows = "30% 70%":
    pctKomentov === 2 ? document.getElementById("pravyOkraj").style.gridTemplateRows = "30% 30% 40%":
    pctKomentov === 3 ? document.getElementById("pravyOkraj").style.gridTemplateRows = "30% 30% 30% 10%": ""


    if(window.innerWidth < 1000){
        let btn = document.getElementById("hraBtn")
        btn.innerHTML = "Hra nie je urcena na male obrazovky"
        btn.setAttribute("onclick", "");
    }
})

let openedMenu = false

const openMenu = () =>{
    document.getElementById("headerMenu").style.width = "150px"
    if(zistenieMenaPouzivatela() !== "Guest")  document.getElementById("prekliky").style.display = "grid"
    document.getElementById("menuBtn").setAttribute("onclick" , "closeMenu()")
    openedMenu = true
}

const closeMenu = () =>{
    document.getElementById("headerMenu").style.width = "0px"
    document.getElementById("prekliky").style.display = "none"
    document.getElementById("menuBtn").setAttribute("onclick" , "openMenu()")
    openedMenu = false
}

//ked sa testuje responzivita tak openMenu a closeMenu funckie mi menia sirku v html kode, ptm mi nebere css ked dam sirku obrazovky viac ako 800
const resizeCheck = () =>{
    if(window.innerWidth >= 800) document.getElementById("headerMenu").style.width = "auto"
    else if(openedMenu) document.getElementById("headerMenu").style.width = "150px"
    else document.getElementById("headerMenu").style.width = "0px"

    if(window.innerWidth >= 1000){
        let btn = document.getElementById("hraBtn")
        btn.innerHTML = "Spustit hru"
        btn.setAttribute("onclick", "spustenieHry()");
    }
    else{
        let btn = document.getElementById("hraBtn")
        btn.innerHTML = "Hra nie je urcena na male obrazovky"
        btn.setAttribute("onclick", "");
    }
}
