let verzia = "Beta 0.5";
var menoPouzivatela = zistenieMenaPouzivatela(); //tu sa bude volat metoda co bude preberat meno registrovaneho pouzivatela, ak nebude pouzivatel prihlaseny tak default bude guest
let playerOriginX; //suradnice spawnPointu
let playerOriginY; 
let origoZivoty;
let kamera;
let player;
let ovladaniePomocouSipok;
let klavesnica;        
let cisloPozadia = 1;
let platformy;
let bronzMince; 
let zlateMince;
let instaDeathToken;
let ostne;
let skore = 0;
let zobrazenieSkore;
let pocetZivotov;
let zobrazeniePoctuZivotov;
let nepriatelia;
let vlajka;
let lava;
let zmenaGravitacieHoreToken;
let zmenaGravitacieDoleToken;
let zmenenaGravitacia = false;
let zivoty;
let zivotyPole;
let particlesDoStran, emitterDoStran, emitterSkok, particlesSkok;
let skok = false; //pri emittery particloch po skoku ked dopadnes, true se zada pri skoku 
let malaObrazovka = false;
let velkostZoom = 1;