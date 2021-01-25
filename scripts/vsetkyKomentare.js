let zobrazitFiltre = false;

function zmena(){
    zobrazitFiltre = !zobrazitFiltre;
    if(zobrazitFiltre)document.getElementById('filter').style.visibility = "visible";
    else document.getElementById('filter').style.visibility = "hidden";
}