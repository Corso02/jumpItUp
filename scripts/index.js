var logOpen = false;
var prepnutieTabu = false;

console.log('ntb: ' + window.innerHeight );

/*function otvoreniePrihlasenia(){
    console.log('haha');
    if(logOpen == false){
        logOpen = true;
        document.getElementById('formular').style.height = '250px';
        document.getElementById('formular').style.width = '300px';
        document.getElementById('formular').style.display = 'block';
        if(window.innerHeight< 626 ){
            document.getElementById('formular').style.top = '120px';
        }
        else{
            document.getElementById('formular').style.top = '94px';
        }
    }
    else{
        logOpen = false;
        document.getElementById('formular').style.display = 'none';
        document.getElementById('formular').style.height = '0px';
        document.getElementById('formular').style.width = '0px';
    }
}*/

function spustenieHry(){
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
   if(window.innerWidth < 1000 || window.innerHeight < 600){
        document.getElementById('hraBtn').innerHTML = "Nemas dostatocne velky monitor na zapnutie hry :(";
    }
    else{
        if(window.innerWidth < 1920 && window.innerWidth > 1366 && window.innerHeight >= 833){ 
            document.getElementById('pravyOkraj').style.display = 'none';
            document.getElementById('lavyOkraj').style.display = 'none';
            document.getElementById('spustitHruBtn').style.display = 'none';
            document.getElementById('hra').style.display = 'block';
        }
        else if(window.innerWidth <= 1366 || window.innerWidth > 1366 && window.innerWidth < 1920){
            console.log('obrazovka je mensia');
            document.getElementById('lavyOkraj').style.display = 'none';
            document.getElementById('pravyOkraj').style.display = 'none';
            document.getElementById('spustitHruBtn').style.display = 'none';
            document.getElementsByTagName('body')[0].style.display = 'block';
            document.getElementsByTagName('main')[0].style.display = 'block';
            document.getElementsByTagName('header')[0].style.display = 'none';
            document.getElementsByTagName('footer')[0].style.display = 'none';
            document.getElementById('hra').style.display = 'block';
            document.getElementById('hra').style.width = '1366px';
        }
        else if(window.innerWidth >= 1920){
            document.getElementById('spustitHruBtn').style.display = 'none';
            document.getElementById('hra').style.display = 'block';
        }
    }
    //console.log('sirka hry: ' + document.getElementById('hra').offsetWidth);
    //console.log('vyska monitoru: '+ window.innerHeight);
}

function zistenieMenaPouzivatela(){
    var userNameElement = document.getElementById('prihlaseny');
    if(userNameElement == null) userName = "Guest";
    else{
        var userName = userNameElement.innerHTML;
        userName = userName.trim(); //orezanie whitespace
    }
    return userName;
}
function zobrazeniePrekliku(){
    document.getElementById("popUpPreklikKomentar").style.display = 'grid';
}
function skrytiePrekliku(){
    document.getElementById("popUpPreklikKomentar").style.display = "none";
}

/*
function zisteniePrihlasenia(){
   
        const prihlasenie = document.cookie.split('; ').find(row => row.startsWith('prihlasenie')).split('=')[1];
        const username = document.cookie.split('; ').find(row => row.startsWith('username')).split('=')[1];
        if(prihlasenie == 1){
            document.getElementById('register').innerHTML = 'Log out';
            document.getElementById('register').setAttribute('onClick', 'logOut()');
            document.getElementById('signUp').innerHTML = username;
            document.getElementById('signUp').setAttribute('onClick', "");
    }
}

function registerOrLogOut(){
    if(document.getElementById('register').innerHTML == "Register"){
        console.log('registrovat sa');
    }
    if(document.getElementById('register').innerHTML == 'Log out'){
        console.log('odhlasit sa');
        alert("<?php echo logout();?>");
    }
}
function logOut(){
    alert("odlasit?");
    document.write('<?php  logout(); ?>');
}*/

document.addEventListener('visibilitychange', function(){
    if(document.visibilityState == 'hidden'){
       prepnutieTabu = true;
    }
    else{
        prepnutieTabu = false;
    }
    //ked sa pouzivatel preklikne na druhy tab tak sa premenna zmeni, a ak je true tak sa dany level pauzne (pauznutie je riesene v update metode v kazdom leveli)
});
window.onloadfunction = function(){
    if(sessionStorage.getItem('prvaNavsteva') == 'true') sessionStorage.setItem('prvaNavsteva', 'false');
    else console.log("nem prva");
    }

$(document).ready(function(){
    if(sessionStorage.getItem('prvaNavsteva') != 'true'){
        sessionStorage.setItem('prvaNavsteva', 'true');
        document.getElementById("overlay-box").style.display = "block";
    }
});

function vypnutiePopUp(){
    document.getElementById("overlay-box").style.display = "none";
}
