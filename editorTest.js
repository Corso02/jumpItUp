let otvoreneMenu = false;
var EditorMenu;
let platform;
var kos; 
let otvorZatvorBtn;
let novyPctPlatforiem = 0;
let staryPctPlatforiem = 0;
let novyPctBronzMince = 0;
let staryPctBronzMince = 0;
let staryPctLavy = 0;
let novyPctLavy = 0;
let staryPctGoldMince = 0;
let novyPctGoldMinca = 0;
let novyPctDoleToken = 0;
let staryPctDoleToken = 0;
let novyPctHoreToken = 0;
let staryPctHoreToken = 0;
let novyPctSpike = 0;
let staryPctSpike = 0;
let novyPctEnemy = 0;
let staryPctEnemy = 0;
let novyPctDeathToken = 0;
let staryPctDeathToken = 0;
let myska;
let zvolenyObjekt;
let kopirovanyObjekt;
let testBtn;
let hracExistuje = false;
let vlajkaExistuje = false;
let stareCisloPozadia = 1;
let klavesnicaEditor;
let aktualnaObrazovkaEditoru;
let kameraEditor;
//let mierkaSirka, mierkaVyska;

class Editor extends Phaser.Scene{
    constructor(){
        super({key: "Editor"});
    }
    preload(){
        this.load.image('background', 'images/backgorund');
        //assety pre level (v kazdom leveli su)
        this.load.spritesheet('player', 'images/playerFin.png' ,  { frameWidth: 36, frameHeight: 60 } );
        this.load.image('platform', 'images/platformBeta.png');
        this.load.spritesheet('bronzMinca', 'images/bronzCoin.png', {frameWidth: 24, frameHeight: 22});
        this.load.spritesheet('zlataMinca', 'images/goldCoin.png', {frameWidth: 24, frameHeight: 22});
        this.load.image('spike', 'images/spikesBeta.png'); 
        this.load.image('instaDeath', 'images/instaDeathBeta.png'); 
        this.load.image('enemy', 'images/enemyBeta.png'); 
        this.load.image('vlajka', 'images/flagBeta.png'); //
        this.load.image('lava', 'images/lava2Beta.png'); 
        this.load.image('upArrow', 'images/upArrow.png'); 
        this.load.image('downArrow', 'images/downArrow.png'); 
        this.load.image('heart', 'images/heartBeta.png');
        //assety iba pre editor (teda su pouzite iba pri editore)
        this.load.image('openCloseBtn', 'images/editorOpenCloseBtnBeta.png');
        this.load.image('trashCan', 'images/trashCanBeta.png');
        
    }
    create(){
       // kos = this.physics.add.sprite(config.scale.width - 40, config.scale.height/2 + 220, 'trashCan').setGravityY(-300);

        cisloPozadia = 1;
        kamera = this.cameras.main;
        kamera.setBounds(0,0, (config.scale.width), config.scale.height);

        platformy = this.physics.add.staticGroup();
        cisloPozadia = 1;
        platformy = this.physics.add.staticGroup();
        bronzMince = this.physics.add.staticGroup();
        zlateMince = this.physics.add.staticGroup();
        ostne = this.physics.add.staticGroup({
            x: 25,
            y: 25
        });
        instaDeathToken = this.physics.add.staticGroup();
        nepriatelia = this.physics.add.group({
            bounceX: 0.1
        });
        lava = this.physics.add.staticGroup();
        zmenaGravitacieDoleToken = this.physics.add.staticGroup();
        zmenaGravitacieHoreToken = this.physics.add.staticGroup();
        player = this.physics.add.staticGroup();
        vlajka = this.physics.add.staticGroup();

        if(window.innerWidth < config.scale.width)  mierkaSirka = window.innerWidth*100 / config.scale.width;
        else mierkaSirka = 100;
        if(window.innerHeight < config.scale.height) mierkaVyska = window.innerHeight*100 / config.scale.height;
        else mierkaVyska = 100;

        

       /* for(let i = 1; i < 7; i++){
            this.add.image(((config.scale.width)/2)*i, (config.scale.height/2) , 'background').setDisplaySize(config.scale.width, config.scale.height);
            i++;
        }*/
      /*  otvorZatvorBtn = this.physics.add.staticGroup();
        otvorZatvorBtn.create(config.scale.width - 40, 40, 'openCloseBtn');
        otvorZatvorBtn.create(config.scale.width*2 - 80, 40, 'openCloseBtn');
        otvorZatvorBtn.create(config.scale.width*3 - 120, 40, 'openCloseBtn');
        for(let i = 0; i < 3; i++){
            otvorZatvorBtn.children.entries[i].setInteractive();
            otvorZatvorBtn.children.entries[i].alwaysEnabled = true;
            otvorZatvorBtn.children.entries[i].on('pointerdown', function(){
                console.log('klik: ' + i);
                if(otvoreneMenu){
                    this.scene.stop('editorMenu');
                    otvoreneMenu = false;
                }
                else if(otvoreneMenu == false){
                    this.scene.launch('editorMenu');
                    otvoreneMenu = true;
                }
                else{
                    console.log("chybenzie");
                }
            },this);
        } */
       /* this.add.image(config.scale.width - 40, 40, 'openCloseBtn');
        otvorZatvorBtn.setInteractive();
        otvorZatvorBtn.on('pointerdown', function(){
            if(otvoreneMenu){
                this.scene.stop('editorMenu');
                otvoreneMenu = false;
            }
            else if(otvoreneMenu == false){
                this.scene.launch('editorMenu');
                otvoreneMenu = true;
            }
            else{
                console.log("chybenzie");
            }
        },this);*/

        klavesnicaEditor = this.input.keyboard.addKeys('R , M, L, V, DELETE, ESC, CTRL, C');

        //this.input.activePointer.downElement.width = config.scale.width*3;
       
        /*klavesnica.M.on('down', function(){
            if(otvoreneMenu){
                this.scene.stop('editorMenu');
                otvoreneMenu = false;
            }
            else if(otvoreneMenu == false){
                this.scene.launch('editorMenu');
                otvoreneMenu = true;
            }
        }, this);*/

      /*  this.input.activePointer.on('pointerdown', function(){
            this.input.activePointer.downX = this.input.activePointer.downX + (config.scale.width*cisloPozadia);
            console.log("sirka: " + this.input.activePointer.downX);
        });*/
        /*this.scene.launch('prvaObrazovkaEditoru');
        this.scene.launch("druhaObrazovkaEditoru");
        this.scene.sleep('druhaObrazovkaEditoru');
        this.scene.launch('tretiaObrazovkaEditoru');
        this.scene.sleep("tretiaObrazovkaEditoru");*/

        // this.scene.launch('tretiaObrazovkaEditoru');
        // this.scene.sleep('tretiaObrazovkaEditoru');
        // this.scene.launch('druhaObrazovkaEditoru');
        // this.scene.sleep('druhaObrazovkaEditoru');
        this.scene.launch('prvaObrazovkaEditoru');
        aktualnaObrazovkaEditoru = 'prvaObrazovkaEditoru';
/*
        klavesnicaEditor.CTRL.emitOnRepeat = false;
        
        klavesnicaEditor.CTRL.on('down', function(){
            klavesnicaEditor.CTRL.repeats = 0;
           
           
            klavesnicaEditor.C.on('down', function(){
                klavesnicaEditor.C.repeats = 0;
                console.log('ctrl + c');
                if(zvolenyObjekt !== undefined){
                    kopirovanyObjekt = zvolenyObjekt;
                }
            }, this);
            klavesnicaEditor.V.on('down', function(){
                klavesnicaEditor.V.repeats = 0;
                console.log('ctrl + v');
                if(kopirovanyObjekt !== undefined){
                    platformyPrvaObrazovka.create(kopirovanyObjekt.x, kopirovanyObjekt.y, 'platform').setSize(kopirovanyObjekt.width * kopirovanyObjekt.scaleX, kopirovanyObjekt.height * kopirovanyObjekt.scaleY).setDisplaySize(kopirovanyObjekt.width * kopirovanyObjekt.scaleX, kopirovanyObjekt.height * kopirovanyObjekt.scaleY);
                    console.log(platformyPrvaObrazovka.children);
                }
            }, this);
        }, this);*/
        
    }
    /*update(){

    }*/
}


let hrac;
let vlajkaEditor;
let sirkaObjektu;
let vyskaObjektu;
let flipY;
let sirkaPbjektuPlus;
let sirkaObjektuMinus;
let vyskaObjektuPlus;
let vyskaObjektuMinus;
let flipYBtn; 
let zmenaFLipY = false;
let zmenaSirkyPlus = false;
let zmenaSirkyMinus = false;
let zmenaVyskyPlus = false;
let zmenaVyskyMinus = false;
let casDrzania = 0;
let zelenaKvacka;
let flipX; 
let flipXbtn;

//premenne pre plaformy
let platformyPrvaObrazovka;
let platformyDruhaObrazovka;
let platformyTretiaObrazovka;
let staryPctPlatforiemPrva = 0;
let staryPctPlatforiemDruha = 0;
let staryPctPlatforiemTretia = 0;

//premenne pre lavu
let lavaPrvaObrazovka;
let lavaDruhaObrazovka;
let lavaTretiaObrazovka;
let staryPctLavyPrva = 0;
let staryPctLavyDruha = 0;
let staryPctLavyTretia = 0;

//premenne pre bronz mince
let bronzMincePrva;
let bronzMinceDruha;
let bronzMinceTretia;
let staryPctBronzPrva = 0;
let staryPctBronzDruha = 0;
let staryPctBronzTretia = 0;

//premenne pre zlate mince
let zlateMincePrva;
let zlateMinceDruha;
let zlateMinceTretia;
let staryPctZlatoPrva = 0;
let staryPctZlatoDruha = 0;
let staryPctZlatoTretia = 0;

//premenne pre tokeny dole
let doleTokenPrva;
let doleTokenDruha;
let doleTokenTretia;
let staryPctDolePrva = 0;
let staryPctDoleDruha = 0;
let staryPctDoleTretia = 0;

//premenne pre tokeny hore
let horeTokenPrva;
let horeTokenDruha;
let horeTokenTretia;
let staryPctHorePrva = 0;
let staryPctHoreDruha = 0;
let staryPctHoreTretia = 0;

//premenne pre spike
let spikePrva;
let spikeDruha;
let spikeTretia;
let staryPctSpikePrva = 0;
let staryPctSpikeDruha = 0;
let staryPctSpikeTretia = 0;

//premenne pre enemy
let enemyPrva;
let enemyDruha;
let enemyTretia;
let staryPctEnemyPrva = 0;
let staryPctEnemyDruha = 0;
let staryPctEnemyTretia = 0;

//premenne pre death tokeny
let deathTokenPrva;
let deathTokenDruha;
let deathTokenTretia;
let staryPctDeathPrva = 0;
let staryPctDeathDruha = 0;
let staryPctDeathTretia = 0;

//premenne pre hraca a vlajku
let hracPrva;
let vlajkaPosledna;

let zmenaPozicieEditorMenu, editorMenuPozadie;
let platformLavaText, minceText, tokenyText, prekazkyText, hracText, parametreText;
let zmenaPozicieMenu = false;

let oznacenieObjektu;
let oznacenieObjektuPrvaObrazovka;
let oznacenieObjektuDruhaObrazovka;
let oznacenieObjektuTretiaObrazovka;

let popUpOkno, popUpBtnMenu, popUpBtnPokracovat;
let cervenyKrizik;
let offset;
let prveZapnutieDruhejSceny = true, prveZapnutieTretejSceny = true;



EditorMenu = new Phaser.Class({
    Extends: Phaser.Scene,
    
    // init: function (data)
    // {
    //     console.log('init', data);
    //     this.offset = data.offset;
    //     console.log(this.offset);
    // },
   

    initialize:
    function editorMenu(){
        Phaser.Scene.call(this,{key: "editorMenu"});
    },

    init: function(data){
        console.log(data);
        offset = data.offset;
        console.log("offset: " + offset);
    },
   
    preload(){
        this.load.image('editorMenuBackground', 'images/editorMenuBeta.png');
        this.load.image('plusBtn', 'images/editorPlusBtn.png');
        this.load.image('minusBtn', 'images/editorMinusBtn.png');
        this.load.image('choseBtnZaskrtnuty', 'images/editoChoseBtn.png');
        this.load.image('choseBtnNezaskrtnuty', 'images/editoChoseBtn2.png');
        this.load.image('greenTick', 'images/greenTickBeta.png');
        this.load.image('sipkaDolava', 'images/sipkaSpat.png');
        this.load.image('sipkaDoprava', 'images/sipkaDalej.png');
        this.load.image('redCross', 'images/redCross.png');
    },
    create(){
        let self = this;
        console.log('haha');
        editorMenuPozadie = this.add.image(config.scale.width*(mierkaSirka/100) - 150, config.scale.height*(mierkaVyska/100)/2, 'editorMenuBackground');//
        //menu
        zmenaPozicieEditorMenu = this.add.image(editorMenuPozadie.x + 100, 80, 'sipkaDolava').setInteractive().setSize(25,25).setDisplaySize(25,25);//
        platformLavaText = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y - 240, 'Platformy a lava', {font: '16px pixelBold', color: 'black'});//
        let platforma = this.add.image(editorMenuPozadie.x - 80, editorMenuPozadie.y - 200, 'platform').setDisplaySize(100,25).setInteractive();//
        let lavaE = this.add.image(editorMenuPozadie.x + 70, editorMenuPozadie.y - 200, 'lava').setDisplaySize(100,25).setInteractive();//
        minceText = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y - 185, 'Mince', {font: '16px pixelBold', color: 'black'});//
        let bronzMinca = this.add.image(editorMenuPozadie.x - 110, editorMenuPozadie.y - 150, 'bronzMinca').setInteractive();
        let zlataMinca = this.add.image(editorMenuPozadie.x - 70, editorMenuPozadie.y - 150, 'zlataMinca').setInteractive();
        tokenyText = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y - 135, 'Tokeny', {font: '16px pixelBold', color: 'black'});
        let zmenaHore = this.add.image(editorMenuPozadie.x - 110, editorMenuPozadie.y - 90, 'upArrow').setInteractive();
        let zmenaDole = this.add.image(editorMenuPozadie.x - 50, editorMenuPozadie.y - 90, 'downArrow').setInteractive();
        prekazkyText = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y - 65, 'Prekazky', {font: '16px pixelBold', color: 'black'});
        let spike = this.add.image(editorMenuPozadie.x - 110, editorMenuPozadie.y - 25, 'spike').setInteractive();
        let nepriatel = this.add.image(editorMenuPozadie.x - 50, editorMenuPozadie.y - 25, 'enemy').setInteractive();
        let deathToken = this.add.image(editorMenuPozadie.x + 20, editorMenuPozadie.y - 25 , 'instaDeath').setInteractive();
        hracText = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y, 'Hrac a vlajka', {font: '16px pixelBold', color: 'black'});
        hrac = this.add.image(editorMenuPozadie.x - 110, editorMenuPozadie.y + 45 , 'player').setInteractive().setFlipX(true);
        vlajkaEditor = this.add.image(editorMenuPozadie.x - 50, editorMenuPozadie.y + 45, 'vlajka').setInteractive().setSize(12.5,50).setDisplaySize(12.5, 50);
        //menenie rozmerov
        parametreText = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y + 90, 'Nastavenie parametrov: ', {font: '16px pixelBold', color: 'black'});
        sirkaObjektu = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y + 120, 'Sirka: ', {font: '16px pixelBold', color: 'black'}).setVisible(false);
        sirkaPbjektuPlus = this.add.image(editorMenuPozadie.x + 25, editorMenuPozadie.y + 128, 'plusBtn').setInteractive().setSize(20,20).setDisplaySize(20,20).setVisible(false);
        sirkaObjektuMinus = this.add.image(editorMenuPozadie.x + 75, editorMenuPozadie.y + 128, 'minusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive().setVisible(false);
        vyskaObjektu = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y + 150, 'Vyska: ', {font: '16px pixelBold', color: 'black'}).setVisible(false);
        vyskaObjektuPlus = this.add.image(editorMenuPozadie.x + 25, editorMenuPozadie.y + 158, 'plusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive().setVisible(false);
        vyskaObjektuMinus = this.add.image(editorMenuPozadie.x + 75, editorMenuPozadie.y + 158, 'minusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive().setVisible(false);
        flipY = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y + 180, 'Otocit hore nohami: ', {font: '16px pixelBold', color: 'black'}).setVisible(false);
        flipYBtn = this.add.image(editorMenuPozadie.x + 100, editorMenuPozadie.y + 188, 'choseBtnNezaskrtnuty').setInteractive().setVisible(false);
        flipX = this.add.text(editorMenuPozadie.x - 130, editorMenuPozadie.y + 150, 'Obratit strany: ', {font: '16px pixelBold', color: 'black'}).setVisible(false);
        flipXbtn = this.add.image(editorMenuPozadie.x + 100, editorMenuPozadie.y + 158, 'choseBtnNezaskrtnuty').setInteractive().setVisible(false);
        //kvacka a menenie cisla obrazovky
        zelenaKvacka = this.add.image(editorMenuPozadie.x + 110, editorMenuPozadie.y + 230, 'greenTick').setInteractive();
        let infoCisloObrazovky = this.add.text(editorMenuPozadie.x- 250, editorMenuPozadie.y + 230, 'Cislo obrazovky: ' + cisloPozadia, {font: '14px pixelBold', color: 'black'});
        let plusBtn = this.add.image(editorMenuPozadie.x + 20, editorMenuPozadie.y + 235, 'plusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive();
        let minusBtn = this.add.image(editorMenuPozadie.x  + 50, editorMenuPozadie.y + 235, 'minusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive();
        let cervenyKrizik = this.add.image(0,0,'redCross').setInteractive();

      
        plusBtn.on('pointerdown', function(){
            cisloPozadia++;
            if(cisloPozadia > 3) cisloPozadia = 3;
            otvoreneMenu = false;
            switch(cisloPozadia){
                case 2: if(prveZapnutieDruhejSceny){
                            prveZapnutieDruhejSceny = false;
                            this.scene.sleep('prvaObrazovkaEditoru');
                            this.scene.launch('druhaObrazovkaEditoru');
                            aktualnaObrazovkaEditoru = 'druhaObrazovkaEditoru';
                        } 
                        else{
                            this.scene.wake('druhaObrazovkaEditoru');
                            this.scene.sleep('prvaObrazovkaEditoru');
                            this.scene.swapPosition('prvaObrazovkaEditoru', 'druhaObrazovkaEditoru');
                            aktualnaObrazovkaEditoru = 'druhaObrazovkaEditoru';
                        }
                        break;

                case 3: if(prveZapnutieTretejSceny){
                            prveZapnutieTretejSceny = false;
                            this.scene.sleep('druhaObrazovkaEditoru');
                            this.scene.launch('tretiaObrazovkaEditoru');
                            aktualnaObrazovkaEditoru = 'tretiaObrazovkaEditoru';
                        }
                        else{
                            this.scene.wake('tretiaObrazovkaEditoru');
                            this.scene.sleep('druhaObrazovkaEditoru');
                            this.scene.swapPosition('druhaObrazovkaEditoru', 'tretiaObrazovkaEditoru');
                            aktualnaObrazovkaEditoru = 'tretiaObrazovkaEditoru';
                        }
                        break;
                default: console.log('si na maxime');
            }
           // kos.x = config.scale.width*cisloPozadia - 40;
            //kos.y = config.scale.height/2 + 220;
            //otvorZatvorBtn.children.entries[0].x = config.scale.width*cisloPozadia - 40; 
            //otvorZatvorBtn.children.entries[0].body.x = config.scale.width*cisloPozadia - 60;
            //otvorZatvorBtn.x = config.scale.width*cisloPozadia - 40;
          //  testBtn.x = (config.scale.width*cisloPozadia) - config.scale.width/2;
            infoCisloObrazovky.setText("Cislo obrazovky: " + cisloPozadia);
            //testBtn.x = testBtn.x + config.scale.width;
            this.scene.stop();
            zvolenyObjekt = undefined;
        }, this);

        minusBtn.on('pointerdown', function(){
            cisloPozadia--;
            if(cisloPozadia < 1) cisloPozadia = 1;
            otvoreneMenu = false
            switch(cisloPozadia){
                case 2: this.scene.wake('druhaObrazovkaEditoru');
                        this.scene.sleep('tretiaObrazovkaEditoru');
                        this.scene.swapPosition('druhaObrazovkaEditoru', 'tretiaObrazovkaEditoru');
                        aktualnaObrazovkaEditoru = 'druhaObrazovkaEditoru';
                        break;
                case 1: this.scene.wake('prvaObrazovkaEditoru');
                        this.scene.sleep('druhaObrazovkaEditoru');
                        this.scene.swapPosition('prvaObrazovkaEditoru', 'druhaObrazovkaEditoru');
                        aktualnaObrazovkaEditoru = 'tretiaObrazovkaEditoru';
                        break;
                default: console.log('si na minime');
            }
            //kos.x = config.scale.width*cisloPozadia - 40;
            //otvorZatvorBtn.x = config.scale.width*cisloPozadia - 40;
            infoCisloObrazovky.setText("Cislo obrazovky: " + cisloPozadia);
            this.scene.stop();
            zvolenyObjekt = undefined;
        }, this);

        zelenaKvacka.on('pointerdown', function(){
            console.log("ukoncenie");
            let klucSceny;
            switch(cisloPozadia){
                case 1: klucSceny = "prvaObrazovkaEditoru";
                        break;
                case 2: klucSceny = "druhaObrazovkaEditoru";
                        break;
                case 3: klucSceny = "tretiaObrazovkaEditoru";
                        break;
                default: console.log('chyba');
            }
            this.scene.launch('DokoncenieLevelu', {key: klucSceny}); //, {key: klucSceny}
            this.scene.pause(klucSceny);
            otvoreneMenu = false;
            this.scene.stop();
           
        }, this);

        cervenyKrizik.on('pointerdown', function(){
            let klucSceny;
            switch(cisloPozadia){
                case 1: klucSceny = "prvaObrazovkaEditoru";
                        break;
                case 2: klucSceny = "druhaObrazovkaEditoru";
                        break;
                case 3: klucSceny = "tretiaObrazovkaEditoru";
                        break;
                default: console.log('chyba');
            }
            this.scene.launch('pauseMenuEditor', {key: klucSceny}); //, {key: klucSceny}
            this.scene.pause(klucSceny);
            otvoreneMenu = false;
            this.scene.stop();
        }, this);

        if(zmenaPozicieMenu){
            zmenaPozicieEditorMenu.setTexture('sipkaDoprava');
        }
        else{
            zmenaPozicieEditorMenu.setTexture('sipkaDolava');
        }
        zmenaPozicieEditorMenu.on('pointerdown', function(){
            if(zmenaPozicieEditorMenu.texture.key == 'sipkaDolava'){
                zmenaPozicieMenu = true;
                zmenaPozicieEditorMenu.setTexture('sipkaDoprava');
                zmenaPozicieEditorMenu.setPosition(275, 80);
                editorMenuPozadie.setPosition(150, config.scale.height*(mierkaVyska/100)/2);
                platformLavaText.setPosition(10,editorMenuPozadie.y - 240);
                platforma.setPosition(60,editorMenuPozadie.y - 200);
                lavaE.setPosition(210,editorMenuPozadie.y - 200);
                minceText.setPosition(10,editorMenuPozadie.y - 185);
                bronzMinca.setPosition(30,editorMenuPozadie.y - 150);
                zlataMinca.setPosition(70,editorMenuPozadie.y - 150);
                tokenyText.setPosition(10,editorMenuPozadie.y - 135);
                zmenaHore.setPosition(30,editorMenuPozadie.y - 90);
                zmenaDole.setPosition(90,editorMenuPozadie.y - 90);
                prekazkyText.setPosition(10,editorMenuPozadie.y - 65);
                spike.setPosition(30,editorMenuPozadie.y - 25);
                nepriatel.setPosition(90,editorMenuPozadie.y - 25);
                deathToken.setPosition(160,editorMenuPozadie.y - 25);
                hracText.setPosition(10,editorMenuPozadie.y);
                hrac.setPosition(30,editorMenuPozadie.y + 45);
                vlajkaEditor.setPosition(90,editorMenuPozadie.y + 45);
                parametreText.setPosition(10,editorMenuPozadie.y + 90);
                sirkaObjektu.setPosition(10,editorMenuPozadie.y + 120);
                sirkaPbjektuPlus.setPosition(165,editorMenuPozadie.y + 128);
                sirkaObjektuMinus.setPosition(215,editorMenuPozadie.y + 128);
                vyskaObjektu.setPosition(10,editorMenuPozadie.y + 150);
                vyskaObjektuPlus.setPosition(165,editorMenuPozadie.y + 158);
                vyskaObjektuMinus.setPosition(215,editorMenuPozadie.y + 158);
                flipY.setPosition(10,editorMenuPozadie.y + 180);
                flipYBtn.setPosition(265,editorMenuPozadie.y + 188);
                flipX.setPosition(10,editorMenuPozadie.y + 150);
                flipXbtn.setPosition(265,editorMenuPozadie.y + 150);
                zelenaKvacka.setPosition(245,editorMenuPozadie.y + 230);
                infoCisloObrazovky.setPosition(10,editorMenuPozadie.y + 230);
                plusBtn.setPosition(180,editorMenuPozadie.y + 235);
                minusBtn.setPosition(210,editorMenuPozadie.y + 235);
                cervenyKrizik.setPosition(285,editorMenuPozadie.y+230);
            }
            else{
                editorMenuPozadie.setPosition(config.scale.width*(mierkaSirka/100)  - 150, config.scale.height*(mierkaVyska/100)/2);
                zmenaPozicieMenu = false;
                zmenaPozicieEditorMenu.setTexture('sipkaDolava');
                zmenaPozicieEditorMenu.setPosition(editorMenuPozadie.x + 100, 80);
                platformLavaText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 240);
                platforma.setPosition(editorMenuPozadie.x - 80, editorMenuPozadie.y - 200);
                lavaE.setPosition(editorMenuPozadie.x + 70, editorMenuPozadie.y - 200);
                minceText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 185);
                bronzMinca.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y - 150);
                zlataMinca.setPosition(editorMenuPozadie.x - 70, editorMenuPozadie.y - 150);
                tokenyText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 135);
                zmenaHore.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y - 90);
                zmenaDole.setPosition(editorMenuPozadie.x - 50, editorMenuPozadie.y - 90);
                prekazkyText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 65);
                spike.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y - 25);
                nepriatel.setPosition(editorMenuPozadie.x - 50, editorMenuPozadie.y - 25);
                deathToken.setPosition(editorMenuPozadie.x + 20, editorMenuPozadie.y - 25);
                hracText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y);
                hrac.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y + 45 );
                vlajkaEditor.setPosition(editorMenuPozadie.x - 50, editorMenuPozadie.y + 45);
                parametreText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 90);
                sirkaObjektu.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 120);
                sirkaPbjektuPlus.setPosition(editorMenuPozadie.x + 25, editorMenuPozadie.y + 128);
                sirkaObjektuMinus.setPosition(editorMenuPozadie.x + 75, editorMenuPozadie.y + 128);
                vyskaObjektu.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 150);
                vyskaObjektuPlus.setPosition(editorMenuPozadie.x + 25, editorMenuPozadie.y + 158);
                vyskaObjektuMinus.setPosition(editorMenuPozadie.x + 75, editorMenuPozadie.y + 158);
                flipY.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 180);
                flipYBtn.setPosition(editorMenuPozadie.x + 100, editorMenuPozadie.y + 188);
                flipX.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 150);
                flipXbtn.setPosition(editorMenuPozadie.x + 100, editorMenuPozadie.y + 158);
                zelenaKvacka.setPosition(editorMenuPozadie.x + 90, editorMenuPozadie.y + 230);
                infoCisloObrazovky.setPosition(editorMenuPozadie.x - 150, editorMenuPozadie.y + 230);
                plusBtn.setPosition(editorMenuPozadie.x + 20, editorMenuPozadie.y + 235);
                minusBtn.setPosition(editorMenuPozadie.x  + 50, editorMenuPozadie.y + 235);
                cervenyKrizik.setPosition(editorMenuPozadie.x + 130, editorMenuPozadie.y+230);
            }
            console.log('hm');
        }, this);
        
        if(zmenaPozicieEditorMenu.texture.key == 'sipkaDolava'){
            editorMenuPozadie.setPosition(config.scale.width*(mierkaSirka/100)  - 150, config.scale.height*(mierkaVyska/100)/2);
            zmenaPozicieEditorMenu.setPosition(editorMenuPozadie.x + 100, 80);
            platformLavaText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 240);
            platforma.setPosition(editorMenuPozadie.x - 80, editorMenuPozadie.y - 200);
            lavaE.setPosition(editorMenuPozadie.x + 70, editorMenuPozadie.y - 200);
            minceText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 185);
            bronzMinca.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y - 150);
            zlataMinca.setPosition(editorMenuPozadie.x - 70, editorMenuPozadie.y - 150);
            tokenyText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 135);
            zmenaHore.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y - 90);
            zmenaDole.setPosition(editorMenuPozadie.x - 50, editorMenuPozadie.y - 90);
            prekazkyText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y - 65);
            spike.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y - 25);
            nepriatel.setPosition(editorMenuPozadie.x - 50, editorMenuPozadie.y - 25);
            deathToken.setPosition(editorMenuPozadie.x + 20, editorMenuPozadie.y - 25);
            hracText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y);
            hrac.setPosition(editorMenuPozadie.x - 110, editorMenuPozadie.y + 45 );
            vlajkaEditor.setPosition(editorMenuPozadie.x - 50, editorMenuPozadie.y + 45);
            parametreText.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 90);
            sirkaObjektu.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 120);
            sirkaPbjektuPlus.setPosition(editorMenuPozadie.x + 25, editorMenuPozadie.y + 128);
            sirkaObjektuMinus.setPosition(editorMenuPozadie.x + 75, editorMenuPozadie.y + 128);
            vyskaObjektu.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 150);
            vyskaObjektuPlus.setPosition(editorMenuPozadie.x + 25, editorMenuPozadie.y + 158);
            vyskaObjektuMinus.setPosition(editorMenuPozadie.x + 75, editorMenuPozadie.y + 158);
            flipY.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 180);
            flipYBtn.setPosition(editorMenuPozadie.x + 100, editorMenuPozadie.y + 188);
            flipX.setPosition(editorMenuPozadie.x - 130, editorMenuPozadie.y + 150);
            flipXbtn.setPosition(editorMenuPozadie.x + 100, editorMenuPozadie.y + 158);
            zelenaKvacka.setPosition(editorMenuPozadie.x + 90, editorMenuPozadie.y + 230);
            infoCisloObrazovky.setPosition(editorMenuPozadie.x - 150, editorMenuPozadie.y + 230);
            plusBtn.setPosition(editorMenuPozadie.x + 20, editorMenuPozadie.y + 235);
            minusBtn.setPosition(editorMenuPozadie.x  + 50, editorMenuPozadie.y + 235);
            cervenyKrizik.setPosition(editorMenuPozadie.x + 130, editorMenuPozadie.y+230);
        }
        else{
            zmenaPozicieEditorMenu.setPosition(275, 80);
            editorMenuPozadie.setPosition(150, config.scale.height*(mierkaVyska/100)/2);
            platformLavaText.setPosition(10,editorMenuPozadie.y - 240);
            platforma.setPosition(60,editorMenuPozadie.y - 200);
            lavaE.setPosition(210,editorMenuPozadie.y - 200);
            minceText.setPosition(10,editorMenuPozadie.y - 185);
            bronzMinca.setPosition(30,editorMenuPozadie.y - 150);
            zlataMinca.setPosition(70,editorMenuPozadie.y - 150);
            tokenyText.setPosition(10,editorMenuPozadie.y - 135);
            zmenaHore.setPosition(30,editorMenuPozadie.y - 90);
            zmenaDole.setPosition(90,editorMenuPozadie.y - 90);
            prekazkyText.setPosition(10,editorMenuPozadie.y - 65);
            spike.setPosition(30,editorMenuPozadie.y - 25);
            nepriatel.setPosition(90,editorMenuPozadie.y - 25);
            deathToken.setPosition(160,editorMenuPozadie.y - 25);
            hracText.setPosition(10,editorMenuPozadie.y);
            hrac.setPosition(30,editorMenuPozadie.y + 45);
            vlajkaEditor.setPosition(90,editorMenuPozadie.y + 45);
            parametreText.setPosition(10,editorMenuPozadie.y + 90);
            sirkaObjektu.setPosition(10,editorMenuPozadie.y + 120);
            sirkaPbjektuPlus.setPosition(165,editorMenuPozadie.y + 128);
            sirkaObjektuMinus.setPosition(215,editorMenuPozadie.y + 128);
            vyskaObjektu.setPosition(10,editorMenuPozadie.y + 150);
            vyskaObjektuPlus.setPosition(165,editorMenuPozadie.y + 158);
            vyskaObjektuMinus.setPosition(215,editorMenuPozadie.y + 158);
            flipY.setPosition(10,editorMenuPozadie.y + 180);
            flipYBtn.setPosition(265,editorMenuPozadie.y + 188);
            flipX.setPosition(10,editorMenuPozadie.y + 150);
            flipXbtn.setPosition(265,editorMenuPozadie.y + 150);
            zelenaKvacka.setPosition(245,editorMenuPozadie.y + 230);
            infoCisloObrazovky.setPosition(10,editorMenuPozadie.y + 230);
            plusBtn.setPosition(180,editorMenuPozadie.y + 235);
            minusBtn.setPosition(210,editorMenuPozadie.y + 235);
            cervenyKrizik.setPosition(285,editorMenuPozadie.y+230);
        }
        

        this.input.setDraggable(platforma);
        this.input.setDraggable(bronzMinca);
        this.input.setDraggable(lavaE);
        this.input.setDraggable(zlataMinca);
        this.input.setDraggable(zmenaDole);
        this.input.setDraggable(zmenaHore);
        this.input.setDraggable(spike);
        this.input.setDraggable(nepriatel);
        this.input.setDraggable(deathToken);
        this.input.setDraggable(hrac);
        this.input.setDraggable(vlajkaEditor);

        platforma.on('drag', function(pointer, dragX, dragY){
            platforma.x = config.scale.width*cisloPozadia - config.scale.width + dragX; // this one is used to make my platform from editor menu follow my pointer
            platforma.y = dragY;
        });
        platforma.on('dragend' ,function(pointer){
            if(zmenaPozicieMenu) platforma.x = 60;
            else platforma.x = editorMenuPozadie.x - 80; // these two are used to return platform from editor menu to original position in menu
            platforma.y = editorMenuPozadie.y - 200;
            switch(cisloPozadia){
                case 1: platformyPrvaObrazovka.get(pointer.x + offset, pointer.y, 'platform').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: platformyDruhaObrazovka.get(pointer.x + offset, pointer.y, 'platform').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: platformyTretiaObrazovka.get(pointer.x + offset, pointer.y, 'platform').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            platformy.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'platform').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia; // this one is to create new platform in group "platformy"
        },this);

        bronzMinca.on('drag', function(pointer, dragX, dragY){
            bronzMinca.x = config.scale.width*cisloPozadia - config.scale.width + dragX;
            bronzMinca.y = dragY;
        });
        bronzMinca.on('dragend', function(pointer){
            if(zmenaPozicieMenu) bronzMinca.x = 30;
            else bronzMinca.x = editorMenuPozadie.x - 110;

            bronzMinca.y = editorMenuPozadie.y - 150;
            switch(cisloPozadia){
                case 1: bronzMincePrva.get(pointer.x + offset, pointer.y, 'bronzMinca').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: bronzMinceDruha.get(pointer.x + offset, pointer.y, 'bronzMinca').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: bronzMinceTretia.get(pointer.x + offset, pointer.y, 'bronzMinca').setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            bronzMince.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'bronzMinca').setInteractive().cPozadia = cisloPozadia;
        });

        lavaE.on('drag', function(pointer, dragX, dragY){
            lavaE.x = config.scale.width*cisloPozadia - config.scale.width + dragX;
            lavaE.y = dragY;
        });

        lavaE.on('dragend', function(pointer){
            if(zmenaPozicieMenu) lavaE.x = 210;
            else lavaE.x = editorMenuPozadie.x + 70;

            lavaE.y = editorMenuPozadie.y - 200;
            switch(cisloPozadia){
                case 1: lavaPrvaObrazovka.get(pointer.x + offset, pointer.y, 'lava').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: lavaDruhaObrazovka.get(pointer.x + offset, pointer.y, 'lava').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: lavaTretiaObrazovka.get(pointer.x + offset, pointer.y, 'lava').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            lava.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'lava').setSize(100,25).setDisplaySize(100,25).setInteractive().cPozadia = cisloPozadia;
        });

        zlataMinca.on('drag', function(pointer, dragX, dragY){
            zlataMinca.x = config.scale.width*cisloPozadia - config.scale.width + dragX;
            zlataMinca.y = dragY;
        });

        zlataMinca.on('dragend', function(pointer){
            if(zmenaPozicieMenu) zlataMinca.x = 70;
            else zlataMinca.x = editorMenuPozadie.x - 70;

            zlataMinca.y = editorMenuPozadie.y - 150;
            switch(cisloPozadia){
                case 1: zlateMincePrva.get(pointer.x + offset, pointer.y, 'zlataMinca').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: zlateMinceDruha.get(pointer.x + offset, pointer.y, 'zlataMinca').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: zlateMinceTretia.get(pointer.x + offset, pointer.y, 'zlataMinca').setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            zlateMince.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'zlataMinca').setInteractive().cPozadia = cisloPozadia;
        });

        zmenaDole.on('drag', function(pointer, dragX, dragY){
            zmenaDole.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            zmenaDole.y = dragY;
        });

        zmenaDole.on('dragend', function(pointer){
            if(zmenaPozicieMenu) zmenaDole.x = 90;
            else zmenaDole.x = editorMenuPozadie.x - 50;

            zmenaDole.y = editorMenuPozadie.y - 90;
            switch(cisloPozadia){
                case 1: doleTokenPrva.get(pointer.x + offset, pointer.y, 'downArrow').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: doleTokenDruha.get(pointer.x + offset, pointer.y, 'downArrow').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: doleTokenTretia.get(pointer.x + offset, pointer.y, 'downArrow').setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            zmenaGravitacieDoleToken.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'downArrow').setInteractive().cPozadia = cisloPozadia;
        });

        zmenaHore.on('drag', function(pointer, dragX, dragY){
            zmenaHore.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            zmenaHore.y = dragY;
        });

        zmenaHore.on('dragend', function(pointer){
            if(zmenaPozicieMenu) zmenaHore.x = 30;
            else zmenaHore.x = editorMenuPozadie.x - 110;

            zmenaHore.y = editorMenuPozadie.y - 90;
            switch(cisloPozadia){
                case 1: horeTokenPrva.get(pointer.x + offset, pointer.y, 'upArrow').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: horeTokenDruha.get(pointer.x + offset, pointer.y, 'upArrow').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: horeTokenTretia.get(pointer.x + offset, pointer.y, 'upArrow').setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            zmenaGravitacieHoreToken.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'upArrow').setInteractive().cPozadia = cisloPozadia;
        });

        spike.on('drag', function(pointer, dragX, dragY){
            spike.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            spike.y = dragY;
        });

        spike.on('dragend', function(pointer){
            if(zmenaPozicieMenu) spike.x = 30;
            else spike.x = editorMenuPozadie.x - 110;

            spike.y = editorMenuPozadie.y - 25;
            switch(cisloPozadia){
                case 1: spikePrva.get(pointer.x + offset, pointer.y, 'spike').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: spikeDruha.get(pointer.x + offset, pointer.y, 'spike').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: spikeTretia.get(pointer.x + offset, pointer.y, 'spike').setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            ostne.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'spike').setInteractive().cPozadia = cisloPozadia;
        });

        nepriatel.on('drag', function(pointer, dragX, dragY){
            nepriatel.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            nepriatel.y = dragY;
        });

        nepriatel.on('dragend', function(pointer){
            if(zmenaPozicieMenu) nepriatel.x = 90;
            else nepriatel.x = editorMenuPozadie.x - 50;

            nepriatel.y = editorMenuPozadie.y - 25;
            switch(cisloPozadia){
                case 1: enemyPrva.get(pointer.x + offset, pointer.y, 'enemy').setInteractive()/*.setGravityY(-300)*/.cPozadia = cisloPozadia;
                        break;
                case 2: enemyDruha.get(pointer.x + offset, pointer.y, 'enemy').setInteractive()/*.setGravityY(-300)*/.cPozadia = cisloPozadia;
                        break;
                case 3: enemyTretia.get(pointer.x + offset, pointer.y, 'enemy').setInteractive()/*.setGravityY(-300)*/.cPozadia = cisloPozadia;
                        break;
            }
            nepriatelia.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'enemy').setInteractive()/*.setGravityY(-300)*/.cPozadia = cisloPozadia;
        });

        deathToken.on('drag', function(poiner, dragX, dragY){
            deathToken.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            deathToken.y = dragY;
        });

        deathToken.on('dragend', function(pointer){
            if(zmenaPozicieMenu) deathToken.x = 160;
            else deathToken.x = editorMenuPozadie.x + 20;

            deathToken.y = editorMenuPozadie.y - 25;
            switch(cisloPozadia){
                case 1: deathTokenPrva.get(pointer.x + offset, pointer.y, 'instaDeath').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 2: deathTokenDruha.get(pointer.x + offset, pointer.y, 'instaDeath').setInteractive().cPozadia = cisloPozadia;
                        break;
                case 3: deathTokenTretia.get(pointer.x + offset, pointer.y, 'instaDeath').setInteractive().cPozadia = cisloPozadia;
                        break;
            }
            instaDeathToken.get(config.scale.width * cisloPozadia - config.scale.width + pointer.x, pointer.y, 'instaDeath').setInteractive().cPozadia = cisloPozadia;
        });

        hrac.on('drag', function(pointer, dragX, dragY){
            hrac.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            hrac.y = dragY;
        });

        hrac.on('dragend', function(pointer){
            if(zmenaPozicieMenu) hrac.x = 30;
            else hrac.x = editorMenuPozadie.x - 110;

            hrac.y = editorMenuPozadie.y + 45;
           
            hracPrva.get(pointer.x + offset, pointer.y, 'player').setInteractive().setFlipX(true).cPozadia = cisloPozadia;
            //player.get(pointer.x, pointer.y, 'player').setInteractive().setFlipX(true);
        }, this);

        vlajkaEditor.on('drag', function(pointer, dragX, dragY){
            vlajkaEditor.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            vlajkaEditor.y = dragY;
        });

        vlajkaEditor.on('dragend', function(pointer){
            if(zmenaPozicieMenu) vlajkaEditor.x = 90;
            else vlajkaEditor.x = editorMenuPozadie.x - 50;

            vlajkaEditor.y = editorMenuPozadie.y + 45;
            vlajkaPosledna.get(pointer.x + offset, pointer.y, 'vlajka').setInteractive().setSize(50,125).setDisplaySize(50,125).cPozadia = cisloPozadia;;
        });
    },
    update(){
     
        if(klavesnicaEditor.R.isDown){
            console.log(hracPrva);
        }
        if(hracExistuje || cisloPozadia >= 2){
            hrac.setTint(0x666363);
            this.input.setDraggable(hrac, false);
        }
        else{
            hrac.clearTint();
            this.input.setDraggable(hrac);
        }

        if(vlajkaExistuje || cisloPozadia < 3){
            vlajkaEditor.setTint(0x666363);
            this.input.setDraggable(vlajkaEditor, false);
        }
        else{
            vlajkaEditor.clearTint();
            this.input.setDraggable(vlajkaEditor);
        }

        if(zvolenyObjekt != undefined){
            if(zvolenyObjekt.texture.key == 'platform' || zvolenyObjekt.texture.key == 'lava'){
                flipY.setVisible(false);
                flipYBtn.setVisible(false);
                flipX.setVisible(false);
                flipXbtn.setVisible(false);
                sirkaObjektu.setVisible(true);
                sirkaObjektuMinus.setVisible(true);
                sirkaPbjektuPlus.setVisible(true);
                vyskaObjektu.setVisible(true);
                vyskaObjektuMinus.setVisible(true);
                vyskaObjektuPlus.setVisible(true);

                //ak dosiahnem hranicne hodnoty dane tlacidlo zmizne
                if(zvolenyObjekt.body.height <= 12.5) vyskaObjektuMinus.setVisible(false);
                if(zvolenyObjekt.body.height >= 450) vyskaObjektuPlus.setVisible(false);
                if(zvolenyObjekt.body.width <= 25) sirkaObjektuMinus.setVisible(false);
                if(zvolenyObjekt.body.width >= 450) sirkaPbjektuPlus.setVisible(false);

                vyskaObjektuPlus.on('pointerdown', function(){
                     zmenaVyskyPlus = true;
                }, this);
                vyskaObjektuMinus.on('pointerdown', function(){
                   zmenaVyskyMinus = true;
                }, this);

                sirkaPbjektuPlus.on('pointerdown', function(){
                    zmenaSirkyPlus = true;
                }, this);
                sirkaObjektuMinus.on('pointerdown', function(){
                    zmenaSirkyMinus = true;
                }, this);

                if(zmenaVyskyPlus){
                    zmenaVyskyPlus = false;
                    zvolenyObjekt.body.height += 12.5;
                    if(zvolenyObjekt.body.height >= 450) zvolenyObjekt.body.height = 450;
                    zvolenyObjekt.setDisplaySize(zvolenyObjekt.body.width, zvolenyObjekt.body.height);
                    zvolenyObjekt.body.y -= 6.25;
                }
                else if(zmenaVyskyMinus){
                    zmenaVyskyMinus = false;
                    zvolenyObjekt.body.height -= 12.5;
                    if(zvolenyObjekt.body.height <= 0) zvolenyObjekt.body.height = 12.5;
                    zvolenyObjekt.setDisplaySize(zvolenyObjekt.body.width, zvolenyObjekt.body.height);
                    zvolenyObjekt.body.y += 6.25;
                   
                }
                else if(zmenaSirkyPlus){
                    zmenaSirkyPlus = false;
                    zvolenyObjekt.body.width += 25;
                    if(zvolenyObjekt.body.width >= 450) zvolenyObjekt.body.width = 450;
                    zvolenyObjekt.setDisplaySize(zvolenyObjekt.body.width, zvolenyObjekt.body.height);
                    zvolenyObjekt.body.x -= 12.5;
                }
                else if(zmenaSirkyMinus){
                    zmenaSirkyMinus = false;
                    zvolenyObjekt.body.width -= 25;
                    if(zvolenyObjekt.body.width <= 0) zvolenyObjekt.body.width = 25;
                    zvolenyObjekt.setDisplaySize(zvolenyObjekt.body.width, zvolenyObjekt.body.height);
                    zvolenyObjekt.body.x += 12.5;
                }
                

                sirkaObjektu.setText('Sirka: ' + zvolenyObjekt.body.width);
                vyskaObjektu.setText('Vyska: ' + zvolenyObjekt.body.height);
            }   
            else if(zvolenyObjekt.texture.key == 'spike' || zvolenyObjekt.texture.key == 'enemy' || zvolenyObjekt.texture.key == 'player'){
                sirkaObjektu.setVisible(false);
                sirkaObjektuMinus.setVisible(false);
                sirkaPbjektuPlus.setVisible(false);
                vyskaObjektu.setVisible(false);
                vyskaObjektuMinus.setVisible(false);
                vyskaObjektuPlus.setVisible(false);
                flipY.setVisible(true);
                flipYBtn.setVisible(true);
                flipXbtn.setVisible(false);
                flipX.setVisible(false);
                if(zvolenyObjekt.flipY){ // ked prepnem objekt na iny, a jeho flipY je iny ako flipY objektu ktory som mal pred tym zvoleny musim zmenit checkBox
                    flipYBtn.setTexture('choseBtnZaskrtnuty');
                }
                else{
                    flipYBtn.setTexture('choseBtnNezaskrtnuty');
                }
                flipYBtn.on('pointerdown', function(){
                    if(zmenaFLipY){
                        zmenaFLipY = false;
                        flipYBtn.setTexture('choseBtnNezaskrtnuty');
                        zvolenyObjekt.setFlipY(false);
                    }
                    else{
                        zmenaFLipY = true;
                        flipYBtn.setTexture('choseBtnZaskrtnuty');
                        zvolenyObjekt.setFlipY(true);
                    }
                });
                if(zvolenyObjekt.texture.key == 'enemy'){
                    flipX.setVisible(true);
                    flipXbtn.setVisible(true);
                    if(zvolenyObjekt.flipX){
                        flipXbtn.setTexture('choseBtnZaskrtnuty');
                    }
                    else{
                        flipXbtn.setTexture('choseBtnNezaskrtnuty');
                    }
                    flipXbtn.on('pointerdown', function(){
                        if(zvolenyObjekt.flipX){
                            flipXbtn.setTexture('choseBtnNezaskrtnuty');
                            zvolenyObjekt.setFlipX(false);
                        }
                        else{
                            flipXbtn.setTexture('choseBtnZaskrtnuty');
                            zvolenyObjekt.setFlipX(true);
                        }
                    });
                }

            }
            else{
                sirkaObjektu.setVisible(false);
                sirkaObjektuMinus.setVisible(false);
                sirkaPbjektuPlus.setVisible(false);
                vyskaObjektu.setVisible(false);
                vyskaObjektuMinus.setVisible(false);
                vyskaObjektuPlus.setVisible(false);
                flipY.setVisible(false);
                flipYBtn.setVisible(false);
            }
        }
    },
});

var pauseMenuEditor = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 

    function pauseMenuEditor(){
        Phaser.Scene.call(this, {key: 'pauseMenuEditor'});
    },

    init: function(data){
        obrazovkaEditoru = data.key;
        console.log(obrazovkaEditoru);
    },

    preload(){
        this.load.image('popUp', 'images/oknoBeta.png');
    },
    create(){
        popUpOkno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2, 'popUp').setDisplaySize(350,200);
        this.add.text(popUpOkno.x - 150, popUpOkno.y - 50, "Chcete sa vratit do hlavneho menu?", {font: "14px pixel", color: "black"});
        this.add.text(popUpOkno.x - 100, popUpOkno.y - 25, "(level nebude ulozeny)", {font: "14px pixel", color: "black"});
        popUpBtnMenu = this.add.image(popUpOkno.x - 100, popUpOkno.y + 50, 'popUp').setDisplaySize(125,25).setInteractive();
        this.add.text(popUpOkno.x - 150, popUpOkno.y + 40, 'Hlavne menu', {font: "14px pixel", color: "black"});
        popUpBtnPokracovat = this.add.image(popUpOkno.x + 100, popUpOkno.y + 50, 'popUp').setDisplaySize(125,25).setInteractive();
        this.add.text(popUpOkno.x + 50, popUpOkno.y + 40, 'Pokracovat', {font: "14px pixel", color: "black"});

        popUpBtnMenu.on('pointerdown', function(){
            this.scene.stop();
            this.scene.stop("editorMenu");
            this.scene.stop('prvaObrazovkaEditoru');
            this.scene.stop('druhaObrazovkaEditoru');
            this.scene.stop('tretiaObrazovkaEditoru');
            this.scene.stop('offlinePouzivatelomVytvorenyLevel');
            this.scene.stop('Editor');
            this.scene.launch("HlavneMenu");
        }, this);

        popUpBtnPokracovat.on('pointerdown', function(){
            this.scene.resume(obrazovkaEditoru);
            this.scene.stop();
        }, this);


    }
});

let indexObjektu = 0;

function hlavnyUpdate(self, offset){
    //v tomto switchi menim obsah parent groupy podla potrebnej dcerskej groupy - cize ak je aktivna prva obrazovka tak vsetky parent groupy budu mat obsah danej dcerkej groupy
    if(hracPrva === undefined){
        console.log("ERORR :)");
        self.scene.launch("prvaObrazovkaEditoru");
        self.scene.sleep("prvaObrazovkaEditoru");
    }
    if(hracPrva.children.entries[0] != undefined) player.children = hracPrva.children;

    switch(cisloPozadia){
        case 1: platformy.children = platformyPrvaObrazovka.children;
                staryPctPlatforiem = staryPctPlatforiemPrva;
                lava.children = lavaPrvaObrazovka.children;
                staryPctLavy = staryPctLavyPrva;
                bronzMince.children = bronzMincePrva.children;
                staryPctBronzMince = staryPctBronzPrva;
                zlateMince.children = zlateMincePrva.children;
                staryPctGoldMince = staryPctZlatoPrva;
                zmenaGravitacieDoleToken.children = doleTokenPrva.children;
                staryPctDoleToken = staryPctDolePrva;
                zmenaGravitacieHoreToken.children = horeTokenPrva.children;
                staryPctHoreToken = staryPctHorePrva;
                ostne.children = spikePrva.children;
                staryPctSpike = staryPctSpikePrva;
                nepriatelia.children = enemyPrva.children;
                staryPctEnemy = staryPctEnemyPrva;
                instaDeathToken.children = deathTokenPrva.children;
                staryPctDeathToken = staryPctDeathPrva;
                oznacenieObjektu = oznacenieObjektuPrvaObrazovka;
                break;

        case 2: platformy.children = platformyDruhaObrazovka.children;
                staryPctPlatforiem = staryPctPlatforiemDruha;
                lava.children = lavaDruhaObrazovka.children;
                staryPctLavy = staryPctLavyDruha;
                bronzMince.children = bronzMinceDruha.children;
                staryPctBronzMince = staryPctBronzDruha;
                zlateMince.children = zlateMinceDruha.children;
                staryPctGoldMince = staryPctZlatoDruha;
                zmenaGravitacieDoleToken.children = doleTokenDruha.children;
                staryPctDoleToken = staryPctDoleDruha;
                zmenaGravitacieHoreToken.children = horeTokenDruha.children;
                staryPctHoreToken = staryPctHoreDruha;
                ostne.children = spikeDruha.children;
                staryPctSpike = staryPctSpikeDruha;
                nepriatelia.children = enemyDruha.children;
                staryPctEnemy = staryPctEnemyDruha;
                instaDeathToken.children = deathTokenDruha.children;
                staryPctDeathToken = staryPctDeathDruha;
                oznacenieObjektu = oznacenieObjektuDruhaObrazovka;
                break;

        case 3: platformy.children = platformyTretiaObrazovka.children;
                staryPctPlatforiem = staryPctPlatforiemTretia;
                lava.children = lavaTretiaObrazovka.children;
                staryPctLavy = staryPctLavyTretia;
                bronzMince.children = bronzMinceTretia.children;
                staryPctBronzMince = staryPctBronzTretia;
                zlateMince.children = zlateMinceTretia.children;
                staryPctGoldMince = staryPctZlatoTretia;
                zmenaGravitacieDoleToken.children = doleTokenTretia.children;
                staryPctDoleToken = staryPctDoleTretia;
                zmenaGravitacieHoreToken.children = horeTokenTretia.children;
                staryPctHoreToken = staryPctHoreTretia;
                ostne.children = spikeTretia.children;
                staryPctSpike = staryPctSpikeTretia;
                nepriatelia.children = enemyTretia.children;
                staryPctEnemy = staryPctEnemyTretia;
                instaDeathToken.children = deathTokenTretia.children;
                staryPctDeathToken = staryPctDeathTretia;
                oznacenieObjektu = oznacenieObjektuTretiaObrazovka;
                break;
    }
    
    
    novyPctPlatforiem = platformy.children.entries.length;//
    novyPctBronzMince = bronzMince.children.entries.length;//
    novyPctLavy = lava.children.entries.length;//
    novyPctGoldMinca = zlateMince.children.entries.length;//
    novyPctDoleToken = zmenaGravitacieDoleToken.children.entries.length;//
    novyPctHoreToken = zmenaGravitacieHoreToken.children.entries.length;//
    novyPctSpike = ostne.children.entries.length;//
    novyPctEnemy = nepriatelia.children.entries.length;//
    novyPctDeathToken = instaDeathToken.children.entries.length;

    if(zvolenyObjekt !== undefined){
        //zvolenyObjekt.syncBounds = true; 
        //kameraEditor.startFollow(zvolenyObjekt, 1, 1, -10, -50);
        zvolenyObjekt.setInteractive();
        oznacenieObjektu.setVisible(true);
        oznacenieObjektu.x = zvolenyObjekt.x;
        oznacenieObjektu.y = zvolenyObjekt.y + (zvolenyObjekt.height/2*(-zvolenyObjekt.scaleY) - 25);
        self.input.setDraggable(zvolenyObjekt);
        zvolenyObjekt.on('drag', function(pointer){
            zvolenyObjekt.x =  pointer.x + offset;
            zvolenyObjekt.y = pointer.y;
            zvolenyObjekt.body.x =  pointer.x - (zvolenyObjekt.width*zvolenyObjekt.scaleX)/2 + offset;
            zvolenyObjekt.body.y = pointer.y - (zvolenyObjekt.height*zvolenyObjekt.scaleY)/2;
            oznacenieObjektu.x = zvolenyObjekt.x + offset;
            oznacenieObjektu.y = zvolenyObjekt.y + (zvolenyObjekt.height/2 - 50);
            // if(zvolenyObjekt.x + 10 > config.scale.width*(mierkaSirka/100) && zvolenyObjekt.x + 10 <= 1366){
            //     kameraEditor.setScroll(kameraEditor.scrollX + 0.2, kameraEditor.scrollY);
            //     console.log('posun');
            // }
            // else if(zvolenyObjekt.x - 10 < kameraEditor.scrollX) kameraEditor.setScroll(kameraEditor.scrollX - 0.2, kameraEditor.scrollY);
        });
        // zvolenyObjekt.on('dragend', function(){
        //     console.log("pustil si");
        //     console.log(zvolenyObjekt.x);
        //     console.log("sirka obrazovka: " + config.scale.width*(mierkaSirka/100));
        // }, this);
        klavesnicaEditor.DELETE.on('down', function(){
            if(zvolenyObjekt === undefined){}
            else{
                console.log('znicim objekt na indexe: ' + indexObjektu);
                switch(zvolenyObjekt.texture.key){ //jeden objekt je zapisany na dvoch po sebe iducich miestach, musim zmazat oba vyskyty, aby potom pri generovani sa zobrazili len nevymazane
                    case 'platform': if(cisloPozadia == 1) platformyPrvaObrazovka.children.entries[indexObjektu+1].destroy();
                                     else if(cisloPozadia == 2) platformyDruhaObrazovka.children.entries[indexObjektu+1].destroy();
                                     else platformyTretiaObrazovka.children.entries[indexObjektu+1].destroy();
                                     break;

                    case 'bronzMinca': if(cisloPozadia == 1) bronzMincePrva.children.entries[indexObjektu+1].destroy();
                                       else if (cisloPozadia == 2) bronzMinceDruha.children.entries[indexObjektu+1].destroy();
                                       else bronzMinceTretia.children.entries[indexObjektu+1].destroy();
                                       break;

                    case 'lava': if(cisloPozadia == 1) lavaPrvaObrazovka.children.entries[indexObjektu+1].destroy();
                                 else if(cisloPozadia == 2) lavaDruhaObrazovka.children.entries[indexObjektu+1].destroy();
                                 else lavaTretiaObrazovka.children.entries[indexObjektu+1].destroy();
                                 break;

                    case 'zlataMinca': if(cisloPozadia == 1) zlateMincePrva.children.entries[indexObjektu+1].destroy();
                                       else if(cisloPozadia == 2) zlateMinceDruha.children.entries[indexObjektu+1].destroy();
                                       else zlateMinceTretia.children.entries[indexObjektu+1].destroy();
                                       break;

                    case 'downArrow': if(cisloPozadia == 1) doleTokenPrva.children.entries[indexObjektu+1].destroy();
                                      else if(cisloPozadia == 2) doleTokenDruha.children.entries[indexObjektu+1].destroy();
                                      else doleTokenTretia.children.entries[indexObjektu+1].destroy();
                                      break;

                    case 'upArrow': if(cisloPozadia == 1) horeTokenPrva.children.entries[indexObjektu+1].destroy();
                                    else if(cisloPozadia == 2) horeTokenDruha.children.entries[indexObjektu+1].destroy();
                                    else horeTokenTretia.children.entries[indexObjektu+1].destroy();
                                    break;
                    
                    case 'spike': if(cisloPozadia == 1) spikePrva.children.entries[indexObjektu+1].destroy();
                                  else if(cisloPozadia == 2) spikeDruha.children.entries[indexObjektu+1].destroy();
                                  else spikeTretia.children.entries[indexObjektu+1].destroy();
                                  break;
                    
                    case 'enemy': if(cisloPozadia == 1) enemyPrva.children.entries[indexObjektu+1].destroy();
                                  else if(cisloPozadia == 2) enemyDruha.children.entries[indexObjektu+1].destroy();
                                  else enemyTretia.children.entries[indexObjektu+1].destroy();
                                  break;
                    
                    case 'instaDeath': if(cisloPozadia == 1) deathTokenPrva.children.entries[indexObjektu+1].destroy();
                                       else if(cisloPozadia == 2) deathTokenDruha.children.entries[indexObjektu+1].destroy();
                                       else deathTokenTretia.children.entries[indexObjektu+1].destroy();
                                       break;

                    case 'player': hracPrva.clear(true, true);
                                   break;
                    
                    default: break;

                }
                zvolenyObjekt.destroy();
                zvolenyObjekt = undefined;
                klavesnicaEditor.DELETE.isDown = false;
            }
        });
    } 
    else{
        oznacenieObjektu.setVisible(false);
        //kameraEditor.stopFollow();
    }
    if(staryPctPlatforiem != novyPctPlatforiem){
         console.log('plat update');
         for(let i = 0; i < novyPctPlatforiem; i++){
             platformy.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = platformy.children.entries[i];
                 indexObjektu = i;
             },self);
         }
         if(cisloPozadia == 1) staryPctPlatforiemPrva = novyPctPlatforiem;
         else if(cisloPozadia == 2) staryPctPlatforiemDruha = novyPctPlatforiem;
         else staryPctPlatforiemTretia = novyPctPlatforiem;
     }
     if(staryPctBronzMince != novyPctBronzMince){
         for(let i = 0; i < novyPctBronzMince; i++){
             bronzMince.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = bronzMince.children.entries[i];
                 indexObjektu = i;
             },self);
         }
         if(cisloPozadia == 1) staryPctBronzPrva = novyPctBronzMince;
         else if(cisloPozadia == 2) staryPctBronzDruha = novyPctBronzMince;
         else staryPctBronzDruha = novyPctBronzMince;
     }
     if(staryPctLavy != novyPctLavy){
         for(let i = 0; i < novyPctLavy; i++){
             lava.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = lava.children.entries[i];
                 indexObjektu = i;
             }, self);
         }
         if(cisloPozadia == 1) staryPctLavyPrva = novyPctLavy;
         else if(cisloPozadia == 2) staryPctLavyDruha = novyPctLavy;
         else staryPctLavyTretia = novyPctLavy;
     }
     if(staryPctGoldMince != novyPctGoldMinca){
         for(let i = 0; i < novyPctGoldMinca; i++){
             zlateMince.children.entries[i].on('pointerdown', function(){
                zvolenyObjekt = zlateMince.children.entries[i];
                indexObjektu = i;
             }, self);
         }
         if(cisloPozadia == 1) staryPctZlatoPrva = novyPctGoldMinca;
         else if(cisloPozadia == 2) staryPctZlatoDruha = novyPctGoldMinca;
         else staryPctZlatoTretia = novyPctGoldMinca;
     }
     if(staryPctDoleToken != novyPctDoleToken){
         for(let i = 0; i < novyPctDoleToken; i++){
             zmenaGravitacieDoleToken.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = zmenaGravitacieDoleToken.children.entries[i];
                 indexObjektu = i;
             }, self);
         }
         if(cisloPozadia == 1) staryPctDolePrva = novyPctDoleToken;
         else if(cisloPozadia == 2) staryPctDoleDruha = novyPctDoleToken;
         else staryPctDoleTretia = novyPctDoleToken;
     }
     if(staryPctHoreToken != novyPctHoreToken){
         for(let i = 0; i < novyPctHoreToken; i++){
             zmenaGravitacieHoreToken.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = zmenaGravitacieHoreToken.children.entries[i];
                 indexObjektu = i;
             }, self);
         }
         if(cisloPozadia == 1) staryPctHorePrva = novyPctHoreToken;
         else if(cisloPozadia == 2) staryPctHoreDruha = novyPctHoreToken;
         else staryPctHoreTretia = novyPctHoreToken;
     }
     if(staryPctSpike != novyPctSpike){
         for(let i = 0; i < novyPctSpike; i++){
             ostne.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = ostne.children.entries[i];
                 indexObjektu = i;
             }, self);
         }
         if(cisloPozadia == 1) staryPctSpikePrva = novyPctSpike;
         else if(cisloPozadia == 2) staryPctSpikeDruha = novyPctSpike;
         else staryPctSpikeTretia = novyPctSpike;
     }
     if(staryPctEnemy != novyPctEnemy){
         for(let i = 0; i < novyPctEnemy; i++){
             nepriatelia.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = nepriatelia.children.entries[i];
                 indexObjektu = i;
             }, self);
         }
         if(cisloPozadia == 1) staryPctEnemyPrva = novyPctEnemy;
         else if(cisloPozadia == 2) staryPctEnemyDruha = novyPctEnemy;
         else staryPctEnemyTretia = novyPctEnemy;
     }
     if(staryPctDeathToken != novyPctDeathToken){
         for(let i = 0; i < novyPctDeathToken; i++){
             instaDeathToken.children.entries[i].on('pointerdown', function(){
                 zvolenyObjekt = instaDeathToken.children.entries[i];
                 indexObjektu = i;
             }, self);
         }
         if(cisloPozadia == 1) staryPctDeathPrva = novyPctDeathToken;
         else if(cisloPozadia == 2) staryPctDeathDruha = novyPctDeathToken;
         else staryPctDeathTretia = novyPctDeathToken;
     }

     
     if(player.children.entries[0] != undefined){
        console.log('hrac vytv');
        hracExistuje = true;
        player.children.entries[0].on('pointerdown', function(){
            zvolenyObjekt = player.children.entries[0];
        }, self);
     } 

     else hracExistuje = false;
     //else if(hracPrva.children.entries.length == 0 && hracDruha.children.entries.length == 0 && hracTretia.children.entries.length == 0 )hracExistuje = false;

     if(vlajkaPosledna !== undefined){
        if(vlajkaPosledna.children.entries[0] != undefined){
            vlajkaExistuje = true;
            vlajkaPosledna.children.entries[0].on('pointerdown', function(){
                zvolenyObjekt = vlajkaPosledna.children.entries[0];
            }, self);
        }
        else{
            vlajkaExistuje = false;
        }
    }
    //else console.log("AJAJJJJAJAAJAJA");
}

let btnEdit1, btnEdit2, btnEdit3;
let posunObrazovky = false, posunObrazovky2 = false, posunObrazovky3 = false;
let chybajucaCastRozmer = 0;
let malaObrazovkaEditor = false;

PrvaObrazovkaEditoru = new Phaser.Class({
Extends: Phaser.Scene,

initialize: 

function prvaObrazovkaEditoru(){
    Phaser.Scene.call(this, {key: 'prvaObrazovkaEditoru'});
},
preload(){
    this.load.image('sipkaDolava1', 'images/sipkaDalej.png');
},
create(){
    this.add.image(config.scale.width/2, config.scale.height/2, 'background').setDisplaySize(config.scale.width, config.scale.height);
    //config.scale.width - (config.scale.width - config.scale.width*(mierkaSirka/100)
    platformyPrvaObrazovka = this.physics.add.staticGroup();
    lavaPrvaObrazovka = this.physics.add.staticGroup();
    bronzMincePrva = this.physics.add.staticGroup();
    zlateMincePrva = this.physics.add.staticGroup();
    doleTokenPrva = this.physics.add.staticGroup();
    horeTokenPrva = this.physics.add.staticGroup();
    spikePrva = this.physics.add.staticGroup();
    enemyPrva = this.physics.add.staticGroup();
    deathTokenPrva = this.physics.add.staticGroup();
    hracPrva = this.physics.add.staticGroup();
    oznacenieObjektuPrvaObrazovka = this.add.triangle(this).setFillStyle("#FFFFFF").setDepth(1).setDisplaySize(15,15); 

    btnEdit1 = this.add.image(config.scale.width*(mierkaSirka/100) - 40, 40, 'openCloseBtn').setInteractive();

    kameraEditor = this.cameras.main;
    //kameraEditor.setBounds(0,0, config.scale.width, config.scale.height);
    kameraEditor.setViewport(0,0, config.scale.width, config.scale.height);
   
   

    this.input.on('pointerdown', function(pointer){
        console.log("x: " + pointer.x);
        console.log(this.scene.key);
    }, this);

    if(config.scale.width*(mierkaSirka/100) < 1366){
        malaObrazovkaEditor = true;
        chybajucaCastRozmer = config.scale.width - config.scale.width*(mierkaSirka/100);
        console.log('cast co nevidno: ' + chybajucaCastRozmer);
        // let sliderBox = this.add.rectangle(config.scale.width*(mierkaSirka/100)/2, config.scale.height, config.scale.width*(mierkaSirka/100), 25, "0x999966");
        // let posunSirka = this.add.rectangle(0 + (config.scale.width*(mierkaSirka/100) - chybajucaCastRozmer)/2, config.scale.height*(mierkaVyska/100) - 5, config.scale.width*(mierkaSirka/100) - chybajucaCastRozmer, 15, "0x000000");
        this.sipkaDoprava = this.add.image(config.scale.width*(mierkaSirka/100) - 30, config.scale.height*(mierkaVyska/100) - 30, 'sipkaDolava1').setDisplaySize(15,15).setInteractive();
        this.sipkaDolava = this.add.image(chybajucaCastRozmer + 30, config.scale.height*(mierkaVyska/100) - 30, 'sipkaDolava1').setFlipX(true).setDisplaySize(15,15).setVisible(false).setInteractive();
        this.sipkaDoprava.on('pointerdown', function(){
            console.log("hm: " + btnEdit1.x);
            posunObrazovky = true;
            btnEdit1.x += chybajucaCastRozmer;
            kameraEditor.setScroll(chybajucaCastRozmer, 0);
            this.sipkaDolava.setVisible(true);
            this.sipkaDoprava.setVisible(false);
        }, this);
        this.sipkaDolava.on('pointerdown', function(){
            posunObrazovky = false;
            btnEdit1.x -= chybajucaCastRozmer;
            kameraEditor.setScroll(0,0);
            this.sipkaDolava.setVisible(false);
            this.sipkaDoprava.setVisible(true);
        }, this);
    }
        /*posunSirka.setInteractive();
        this.input.setDraggable(posunSirka);  
        console.log("origin: " + posunSirka.x);
        let originXSliderX = posunSirka.x;  
        let maximalnaHodnotaX = config.scale.width*(mierkaSirka/100);
        let jedenDielScrollX = chybajucaCastRozmer/(maximalnaHodnotaX-originXSliderX);
        console.log("jeden dielik: " + jedenDielScrollX);
        posunSirka.on('drag', function(pointer){
            if(posunSirka.x + posunSirka.width/2 <= 1340 || posunSirka.x - posunSirka.width/2 <= 0)posunSirka.x = pointer.x - posunSirka.width/2;   
            if(posunSirka.x - posunSirka.width/2 <= 0) posunSirka.x = 0 + (config.scale.width*(mierkaSirka/100) - chybajucaCastRozmer)/2;
        });
        posunSirka.on('dragend', function(){
            let konecneHodnota = posunSirka.x + posunSirka.width/2 - finScroll;
            console.log('konecna hodnota: ' + (konecneHodnota-posunSirka.width/2)); 
            if(posunSirka.x == originXSliderX) finScroll = 0;
            else finScroll = Math.abs(jedenDielScrollX * (originXSliderX - (posunSirka.x + posunSirka.width/2)));
            if(finScroll < predchadzajuciScroll){
                predchadzajuciScroll = finScroll;
                posunSirka.x = originXSliderX;
                sliderBox.x = config.scale.width*(mierkaSirka/100)/2;
            }
            else{
                posunSirka.x = posunSirka.x + finScroll;
                sliderBox.x = sliderBox.x + finScroll;
                btnEdit1.x = btnEdit1.x + finScroll;
            }
            console.log("fin scroll: " + finScroll);
            kameraEditor.setScroll(finScroll, 0);
            //if(konecneHodnota > 900) kameraEditor.setScroll(366,0);
        }, this);*/
        btnEdit1.on('pointerdown', function(){
            console.log('stlacil si');
            if(malaObrazovkaEditor){
                if(otvoreneMenu){
                    this.scene.stop('editorMenu');
                    otvoreneMenu = false;
                    if(posunObrazovky) this.sipkaDolava.setVisible(true);
                    else this.sipkaDoprava.setVisible(true);
                }
                else if(otvoreneMenu == false){
                    console.log("otvorenie chyb: " + chybajucaCastRozmer);
                    if(posunObrazovky){
                        this.scene.launch('editorMenu', { offset: chybajucaCastRozmer}); //this.scene.launch('pauseMenuEditor', {key: klucSceny});
                        this.sipkaDolava.setVisible(false);
                    }
                    else{
                        this.scene.launch('editorMenu', { offset: 0});
                        this.sipkaDoprava.setVisible(false);
                    }
                    otvoreneMenu = true;
                }
            }
            else{
                console.log('nem mala');
                if(otvoreneMenu){
                    this.scene.stop('editorMenu');
                    otvoreneMenu = false;
                }
                else{
                    this.scene.launch('editorMenu', {offset: 0});
                    otvoreneMenu = true;
                }
            }
        },this);
    
        klavesnicaEditor.C.on('down', function(){
            console.log(btnEdit1.x);
            console.log(kameraEditor.scrollX);
        });
    
},
update(){
    cisloPozadia = 1;
    if(zmenaPozicieMenu){
       btnEdit1.setPosition(40 + kameraEditor.scrollX ,40);
    }
    else{
        btnEdit1.setPosition(config.scale.width*(mierkaSirka/100) - 40 + kameraEditor.scrollX,40);
    }
    if(malaObrazovkaEditor){
        if(posunObrazovky) hlavnyUpdate(this, chybajucaCastRozmer);
        else hlavnyUpdate(this, 0);
    }
    else hlavnyUpdate(this, 0);
}
});

DruhaObrazovkaEditoru = new Phaser.Class({
Extends: Phaser.Scene,

initialize: 

function druhaObrazovkaEditoru(){
    Phaser.Scene.call(this, {key: 'druhaObrazovkaEditoru'});
},

preload(){
    this.load.image('sipka', 'images/sipkaDalej.png');
},

create(){
    this.add.image(config.scale.width/2, config.scale.height/2, 'background').setDisplaySize(config.scale.width, config.scale.height);

    platformyDruhaObrazovka = this.physics.add.staticGroup();
    lavaDruhaObrazovka = this.physics.add.staticGroup();
    bronzMinceDruha = this.physics.add.staticGroup();
    zlateMinceDruha = this.physics.add.staticGroup();
    doleTokenDruha = this.physics.add.staticGroup();
    horeTokenDruha = this.physics.add.staticGroup();
    spikeDruha = this.physics.add.staticGroup();
    enemyDruha = this.physics.add.staticGroup();
    deathTokenDruha = this.physics.add.staticGroup();
    oznacenieObjektuDruhaObrazovka = this.add.triangle(this).setFillStyle("#FFFFFF").setDepth(1).setDisplaySize(15,15); 

    kameraEditorDruhaObrazovka = this.cameras.main;
    kameraEditorDruhaObrazovka.setViewport(0,0, config.scale.width, config.scale.height);
    kameraEditorDruhaObrazovka.setScroll(0,0);

    btnEdit2 = this.add.image(config.scale.width*(mierkaSirka/100) - 40, 40, 'openCloseBtn').setInteractive();
   
   
    if(config.scale.width*(mierkaSirka/100) < 1366){
        //chybajucaCastRozmer = config.scale.width - config.scale.width*(mierkaSirka/100);
        this.sipkaDopravaDruhaObrazovka = this.add.image(config.scale.width*(mierkaSirka/100) - 30, config.scale.height*(mierkaVyska/100) - 30, 'sipka').setDisplaySize(15,15).setInteractive();
        this.sipkaDolavaDruhaObrazovka = this.add.image(chybajucaCastRozmer + 30, config.scale.height*(mierkaVyska/100) - 30, 'sipka').setFlipX(true).setDisplaySize(15,15).setVisible(false).setInteractive();
        this.sipkaDopravaDruhaObrazovka.on('pointerdown', function(){
            console.log("hm: " + btnEdit2.x);
            posunObrazovky2 = true;
            btnEdit2.x += chybajucaCastRozmer;
            kameraEditorDruhaObrazovka.setScroll(chybajucaCastRozmer, 0);
            this.sipkaDolavaDruhaObrazovka.setVisible(true);
            this.sipkaDopravaDruhaObrazovka.setVisible(false);
        }, this);
        this.sipkaDolavaDruhaObrazovka.on('pointerdown', function(){
            posunObrazovky2 = false;
            btnEdit2.x -= chybajucaCastRozmer;
            kameraEditorDruhaObrazovka.setScroll(0,0);
            this.sipkaDolavaDruhaObrazovka.setVisible(false);
            this.sipkaDopravaDruhaObrazovka.setVisible(true);
        }, this);
    }

    btnEdit2.on('pointerdown', function(){
        if(malaObrazovkaEditor){
            if(otvoreneMenu){
                this.scene.stop('editorMenu');
                otvoreneMenu = false;
                if(posunObrazovky2) this.sipkaDolavaDruhaObrazovka.setVisible(true);
                else this.sipkaDopravaDruhaObrazovka.setVisible(true);
            }
            else if(otvoreneMenu == false){
                console.log("otvorenie chyb: " + chybajucaCastRozmer);
                if(posunObrazovky2){
                    this.scene.launch('editorMenu', { offset: chybajucaCastRozmer}); //this.scene.launch('pauseMenuEditor', {key: klucSceny});
                    this.sipkaDolavaDruhaObrazovka.setVisible(false);
                }
                else{
                    this.scene.launch('editorMenu', { offset: 0});
                    this.sipkaDopravaDruhaObrazovka.setVisible(false);
                }
                otvoreneMenu = true;
            }
        }
        else{
            console.log('nem mala');
            if(otvoreneMenu){
                this.scene.stop('editorMenu');
                otvoreneMenu = false;
            }
            else{
                this.scene.launch('editorMenu', {offset: 0});
                otvoreneMenu = true;
            }
        }
    },this);

    this.input.on('pointerdown', function(pointer){
       console.log("menu otvorene: " + otvoreneMenu);
       console.log("posun: " + posunObrazovky2);
    }, this);
   
},
update(){
    cisloPozadia = 2;
    if(zmenaPozicieMenu){
        btnEdit2.setPosition(40 + kameraEditorDruhaObrazovka.scrollX,40);
     }
     else{
         btnEdit2.setPosition(config.scale.width*(mierkaSirka/100) - 40 + kameraEditorDruhaObrazovka.scrollX,40);
     }
     if(hracPrva !== undefined){
        if(posunObrazovky2) hlavnyUpdate(this, chybajucaCastRozmer);
        else hlavnyUpdate(this, 0);
     }
     else console.log("2. update loop erorr hrac");
}
});

TretiaObrazovkaEditoru = new Phaser.Class({
Extends: Phaser.Scene,

initialize: 

function tretiaObrazovkaEditoru(){
    Phaser.Scene.call(this, {key: 'tretiaObrazovkaEditoru'});
},

preload(){
    this.load.image('sipka1', 'images/sipkaDalej.png');
},

create(){
    this.add.image(config.scale.width/2, config.scale.height/2, 'background').setDisplaySize(config.scale.width, config.scale.height);

    platformyTretiaObrazovka = this.physics.add.staticGroup();
    lavaTretiaObrazovka = this.physics.add.staticGroup();
    bronzMinceTretia = this.physics.add.staticGroup();
    zlateMinceTretia = this.physics.add.staticGroup();
    doleTokenTretia = this.physics.add.staticGroup();
    horeTokenTretia = this.physics.add.staticGroup();
    spikeTretia = this.physics.add.staticGroup();
    enemyTretia = this.physics.add.staticGroup();
    deathTokenTretia = this.physics.add.staticGroup();
    vlajkaPosledna = this.physics.add.staticGroup();
    oznacenieObjektuTretiaObrazovka = this.add.triangle(this).setFillStyle("#FFFFFF").setDepth(1).setDisplaySize(15,15); 

    kameraEditorTretiaObrazovka = this.cameras.main;
    kameraEditorTretiaObrazovka.setViewport(0,0, config.scale.width, config.scale.height);
    kameraEditorTretiaObrazovka.setScroll(0,0);

    btnEdit3 = this.add.image(config.scale.width*(mierkaSirka/100) - 40, 40, 'openCloseBtn').setInteractive();
   
    if(config.scale.width*(mierkaSirka/100) < 1366){
        chybajucaCastRozmer = config.scale.width - config.scale.width*(mierkaSirka/100);
        this.sipkaDopravaTretiaObrazovka = this.add.image(config.scale.width*(mierkaSirka/100) - 30, config.scale.height*(mierkaVyska/100) - 30, 'sipka1').setDisplaySize(15,15).setInteractive();
        this.sipkaDolavaTretiaObrazovka = this.add.image(chybajucaCastRozmer + 30, config.scale.height*(mierkaVyska/100) - 30, 'sipka1').setFlipX(true).setDisplaySize(15,15).setVisible(false).setInteractive();
        this.sipkaDopravaTretiaObrazovka.on('pointerdown', function(){
            console.log("hm: " + btnEdit2.x);
            posunObrazovky3 = true;
            btnEdit3.x += chybajucaCastRozmer;
            kameraEditorTretiaObrazovka.setScroll(chybajucaCastRozmer, 0);
            this.sipkaDolavaTretiaObrazovka.setVisible(true);
            this.sipkaDopravaTretiaObrazovka.setVisible(false);
        }, this);
        this.sipkaDolavaTretiaObrazovka.on('pointerdown', function(){
            posunObrazovky3 = false;
            btnEdit3.x -= chybajucaCastRozmer;
            kameraEditorTretiaObrazovka.setScroll(0,0);
            this.sipkaDolavaTretiaObrazovka.setVisible(false);
            this.sipkaDopravaTretiaObrazovka.setVisible(true);
        }, this);
    }


    btnEdit3.on('pointerdown', function(){
        if(malaObrazovkaEditor){
            if(otvoreneMenu){
                this.scene.stop('editorMenu');
                otvoreneMenu = false;
                if(posunObrazovky3) this.sipkaDolavaTretiaObrazovka.setVisible(true);
                else this.sipkaDopravaTretiaObrazovka.setVisible(true);
            }
            else if(otvoreneMenu == false){
                console.log("otvorenie chyb: " + chybajucaCastRozmer);
                if(posunObrazovky3){
                    this.scene.launch('editorMenu', { offset: chybajucaCastRozmer}); //this.scene.launch('pauseMenuEditor', {key: klucSceny});
                    this.sipkaDolavaTretiaObrazovka.setVisible(false);
                }
                else{
                    this.scene.launch('editorMenu', { offset: 0});
                    this.sipkaDopravaTretiaObrazovka.setVisible(false);
                }
                otvoreneMenu = true;
            }
        }
        else{
            console.log('nem mala');
            if(otvoreneMenu){
                this.scene.stop('editorMenu');
                otvoreneMenu = false;
            }
            else{
                this.scene.launch('editorMenu', {offset: 0});
                otvoreneMenu = true;
            }
        }
    },this);


    this.input.on('pointerdown', function(pointer){
        console.log("x: " + pointer.x);
        console.log(this.scene.key);
    }, this);
},
update(){
    cisloPozadia = 3;
    if(zmenaPozicieMenu){
        btnEdit3.setPosition(40 + kameraEditorTretiaObrazovka.scrollX,40);
     }
     else{
         btnEdit3.setPosition(config.scale.width*(mierkaSirka/100) - 40 + kameraEditorTretiaObrazovka.scrollX,40);
     }
     if(hracPrva !== undefined){
        if(posunObrazovky3) hlavnyUpdate(this, chybajucaCastRozmer);
        else hlavnyUpdate(this, 0);
     }
     else console.log("3. update loop error hrac");
}
});

let pokracovatBtnEditor;
let dokoncitBtn; 

var DokoncenieLevelu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 
    function DokoncenieLevelu(){
        Phaser.Scene.call(this, {key: "DokoncenieLevelu"});
    },

    init: function(data){
        this.aktualnaObrazovka = data.key;
    },

    preload(){
       this.load.image('okno', 'images/oknoBeta.png');
       this.load.image('editorDokoncenieBtn', 'images/pauseBtnBeta.png'); 
    },

    create(){
        console.log('menu dokoncenia');
        let oknoDokoncenie = this.add.image(( config.scale.width*(mierkaSirka/100)/2), config.scale.height*(mierkaVyska/100)/2, 'okno').setDisplaySize(500,400);
        this.add.text(oknoDokoncenie.x - 238, oknoDokoncenie.y - 150, 'Chces dokoncit tvorenie levelu?', {font: '25px pixelBold', color: 'black'});

        pokracovatBtnEditor = this.add.image(( oknoDokoncenie.x) - 100 , oknoDokoncenie.y + 75, 'editorDokoncenieBtn').setInteractive().setDisplaySize(150,60);
        this.add.text(oknoDokoncenie.x - 150, oknoDokoncenie.y + 65, 'Vratit sa', {font: '18px pixel', color: siva});

        dokoncitBtn = this.add.image(( oknoDokoncenie.x) + 100, oknoDokoncenie.y + 75, 'editorDokoncenieBtn').setInteractive().setDisplaySize(150,60);
        this.add.text(oknoDokoncenie.x + 55, oknoDokoncenie.y + 65, 'Dokoncit', {font: '18px pixel', color: siva});

        pokracovatBtnEditor.on('pointerdown', function(){
            this.scene.resume(this.aktualnaObrazovka);
            this.scene.stop();
        }, this);

        dokoncitBtn.on('pointerdown', function(){
            //console.log(platformyPrvaObrazovka.children);
            if(hracExistuje == false || vlajkaExistuje == false){
                if(hracExistuje == false && vlajkaExistuje == false) this.add.text(oknoDokoncenie.x - 235, oknoDokoncenie.y - 50, 'Musis pridat hraca a ciel!', {font: '30px pixelBold', color: 'black'});
                else if(hracExistuje == false) this.add.text(oknoDokoncenie.x - 190, oknoDokoncenie.y - 50, 'Musis pridat hraca!', {font: '32px pixelBold', color: 'black'});
                else  this.add.text(oknoDokoncenie.x - 180, oknoDokoncenie.y - 50, 'Musis pridat ciel!', {font: '32px pixelBold', color: 'black'});
                
            }
            else{
                this.scene.stop();
                this.scene.launch('offlinePouzivatelomVytvorenyLevel', {key:this.aktualnaObrazovka});
            }
        }, this);
    },
});

let platformyFinal;
let spikeFinal;
let bronzMincaFinal;
let zlataMincaFinal;
let doleTokenFinal;
let horeTokenFinal;
let enemyFinal;
let lavaFinal;
let deathTokenFinal;
let playerFinal;
let vlajkaFinal;
let lvlData;

var offlinePouzivatelomVytvorenyLevel = new Phaser.Class({
    Extends: Phaser.Scene, 

    initialize: 
    function offlinePouzivatelomVytvorenyLevel(){
        Phaser.Scene.call(this, {key: 'offlinePouzivatelomVytvorenyLevel'});
    },

    init: function(data){
        this.aktualnaObrazovka = data.key;
    },
    preload(){
        this.load.image('particle', 'images/particle.png');
    },

    create(){
        console.log('level');
        console.log(platformyPrvaObrazovka.children);

        zmenenaGravitacia = false;

        let posun = 0;
        if(window.innerWidth < 1366) posun = config.scale.width - config.scale.width*(mierkaSirka/100);

        kamera = this.cameras.main;
        kamera.setBounds(0,0, (config.scale.width*3) + posun, config.scale.height);
        cisloPozadia = 1;
        skore = 0;
        zivoty = this.physics.add.staticGroup();

        zobrazenieSkore = this.add.text(15 , 0, skore, {font: "15px pixel", color: "black"}).setDepth(1);

        ovladaniePomocouSipok = this.input.keyboard.createCursorKeys();

        klavesnica = this.input.keyboard.addKeys('CTRL, SPACE, A, D, SHIFT, ESC, R, M');

        if(hardDif == true){ 
            pocetZivotov = 1;
            zivoty.create(150, 15, 'heart').setDisplaySize(20,15);
        }
        if(easyDif == true) {
            pocetZivotov = 6;
            zivoty.create(150, 15, 'heart').setDisplaySize(20,15).setDepth(1);
            zivoty.create(185, 15, 'heart').setDisplaySize(20,15).setDepth(1);
            zivoty.create(220, 15, 'heart').setDisplaySize(20,15).setDepth(1);
        }

        playerFinal = this.physics.add.sprite(hracPrva.children.entries[0].x, hracPrva.children.entries[0].y, 'player').setDepth(1).setFlipY(hracPrva.children.entries[0].flipY);
        if(playerFinal.flipY){
            zmenenaGravitacia = true;
            playerFinal.setGravityY(-600);
        }
        //playerFinal.setBounce(0.2);
        playerOriginX = playerFinal.x;
        playerOriginY = playerFinal.y;
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 8 } ],
            frameRate: 20
        });

           this.anims.create({
            key: 'bronzCoinRotate',
            frames: this.anims.generateFrameNumbers('bronzMinca', {start: 0, end: 8}),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'goldCoinRotate',
            frames: this.anims.generateFrameNumbers('zlataMinca', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });


        origoZivoty = pocetZivotov;

        platformyFinal = this.physics.add.staticGroup();
        spikeFinal = this.physics.add.staticGroup();
        bronzMincaFinal = this.physics.add.staticGroup();
        zlataMincaFinal = this.physics.add.staticGroup();
        doleTokenFinal = this.physics.add.staticGroup();
        horeTokenFinal = this.physics.add.staticGroup();
        enemyFinal = this.physics.add.group(
            //bounceX: 0.1;  
         );
        lavaFinal = this.physics.add.staticGroup();
        deathTokenFinal = this.physics.add.staticGroup();

        for(let i = 1; i < 7; i++){
            this.add.image(((config.scale.width)/2)*i, (config.scale.height/2) , 'background').setDisplaySize(config.scale.width, config.scale.height);
            i++;
        }
        zivotyPole = zivoty.getChildren();

        vytvoreniePlatforiemHratelnyLevel();
        vytvorenieOstnovHratelnyLevel();
        vytvorenieBronzHratelnyLevel();
        vytvorenieGoldHratelnyLevel();
        vytvorenieDoleTokenHratelnyLevel();
        vytvorenieHoreTokenHratelnyLevel();
        vytvorenieEnemyHratelnyLevel();
        vytvorenieLavaHratelnyLevel();
        vytvorenieDeathTokenHratelnyLevel();

        klavesnica.M.on('down', function(){
            console.log(playerFinal);
            console.log(enemyFinal);
       });

        vlajkaFinal = this.physics.add.staticImage(config.scale.width * 2 + vlajkaPosledna.children.entries[0].x, vlajkaPosledna.children.entries[0].y, 'vlajka').setSize(50,125).setDisplaySize(50,125);

        this.physics.add.collider(playerFinal, platformyFinal);
        this.physics.add.collider(enemyFinal, platformyFinal, enemyZmenaSmeru, null, this);
        this.physics.add.collider(enemyFinal, platformyFinal);
        this.physics.add.overlap(playerFinal, spikeFinal, spikeHit, null, this);
        this.physics.add.overlap(playerFinal, bronzMincaFinal, zberBronz, null, this);
        this.physics.add.overlap(playerFinal, zlataMincaFinal, zberZlato, null, this);
        this.physics.add.overlap(playerFinal, deathTokenFinal, instaDeath, null, this);
        this.physics.add.collider(playerFinal, lavaFinal, instaDeath, null, this);
        this.physics.add.collider(playerFinal, enemyFinal, nepriatelVsHrac, null, this);
        this.physics.add.overlap(playerFinal, doleTokenFinal, zmenaGravitacieDole, null, this);
        this.physics.add.overlap(playerFinal, horeTokenFinal, zmenaGravitacieHore, null, this);
        
        let parentGroup = this.physics.add.staticGroup(); //vsetky groupy su spojene v jednej velkej triede (pri vytvarani sa budes odpichovat od texture)
        parentGroup.add(playerFinal);
        parentGroup.add(vlajkaFinal);
        if(platformyFinal.children.entries.length > 0){ //kontrola ci dcerska groupa nie je prazdna
            vytvorenieParentGroup(parentGroup, platformyFinal);
        }
        if(spikeFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, spikeFinal);
        }
        if(bronzMincaFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, bronzMincaFinal);
        }
        if(zlataMincaFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, zlataMincaFinal);
        }
        if(doleTokenFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, doleTokenFinal);
        }
        if(horeTokenFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, horeTokenFinal);
        }
        if(deathTokenFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, deathTokenFinal);
        }
        if(lavaFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, lavaFinal);
        }
        if(enemyFinal.children.entries.length > 0){
            vytvorenieParentGroup(parentGroup, enemyFinal);
        }
        //console.log(JSON.parse(JSON.stringify(platformyFinal.children)));        
        lvlData = JSON.stringify(parentGroup.children); //+ JSON.stringify(spikeFinal.children);
        console.log(JSON.parse(lvlData));

        particlesDoStran = this.add.particles('particle');
        emitterDoStran = particlesDoStran.createEmitter({
            lifespan: 100,
            speedX: {min: -100, max: 100},
            speedY: {min: -50, max: - 200},
            angle: 90,
            gravity: -300,
            quantity: 1,
            blendMode: 'NORMAL'
        });
        particlesSkok = this.add.particles('particle');
        emitterSkok = particlesSkok.createEmitter({
            lifespan: 250,
            speedX: {min: -100, max: 100},
            speedY: {min: -100, max: 100},
            angle: 180,
            gravity: -100,
            quantity: 1,
            blendMode: 'NORMAL'
        });

        zlataMincaFinal.playAnimation('goldCoinRotate');
        bronzMincaFinal.playAnimation('bronzCoinRotate');
        

        kamera.startFollow(playerFinal, false, 1, 1, -500/velkostZoom, 50);
        kamera.setZoom(velkostZoom);
        kamera.setViewport(0,0, config.scale.width, config.scale.height);

    },
    update(){

        if( (!playerFinal.body.touching.down && !zmenenaGravitacia) || (zmenenaGravitacia && !playerFinal.body.touching.up)) skok = true;

        if(skok && playerFinal.body.touching.down || (zmenenaGravitacia && playerFinal.body.touching.up && skok)){
            skok = false;
            if(zmenenaGravitacia) emitterSkok.explode(10, playerFinal.x, playerFinal.y - 29);
            else emitterSkok.explode(10, playerFinal.x, playerFinal.y + 29 );
            console.log("skocil si a uz si dopadol");
        }


        let j;
        for(let i = 0; i < pocetZivotov/2; i++){
            if(i == 0) j = -25; //-25 player 
            if(zmenenaGravitacia) zivotyPole[i].y = playerFinal.y + 50;
            else zivotyPole[i].y = playerFinal.y - 50;
            zivotyPole[i].x = playerFinal.x + j;
            j += 25; //origo 35
        }
        if(playerFinal.y > config.scale.height + 15 || playerFinal.y < -10) pocetZivotov = 0; 

        //kamera.setViewport(-((cisloPozadia - 1) * (config.scale.width) + 1),0, config.scale.width, config.scale.height);

        zobrazenieSkore.setText('Skore: ' + skore);
        zobrazenieSkore.x = 15 + kamera.scrollX;
        
        if(pocetZivotov <= 0){
            playerFinal.destroy();
            this.scene.pause();
            this.scene.launch('deathMenu', {score: skore, key: this.scene.key});
        }

        if(playerFinal.x >= vlajkaFinal.x && playerFinal.y >= vlajkaFinal.y){
            this.scene.pause();
            this.scene.launch('winScreen', {key: this.scene.key, score: skore, level: lvlData});
        }

        if(easyDif == true){
            if(pocetZivotov == 0){ 
                let j = origoZivoty/2 - 1;
                for(let i = j; i >= 0; i--){
                    zivotyPole[i].destroy();
                }
            }
            else if(origoZivoty != pocetZivotov){
               vytvorenieDoleTokenHratelnyLevel();
               vytvorenieHoreTokenHratelnyLevel();
                if(pocetZivotov%2 == 0){
                   zivotyPole[pocetZivotov/2].destroy();
                }
                origoZivoty = pocetZivotov;
            }
            pocetZivotov = pocetZivotov - pocetZivotov%2;
            
        }

        if(playerFinal.x + 0.5 >=  ((config.scale.width) * cisloPozadia)){
            //kamera.setPosition(-((config.scale.width) * cisloPozadia), 0);
            cisloPozadia++;
            if(cisloPozadia >= 3) cisloPozadia = 3;
        } 
        if(playerFinal.x - 0.5 <= (config.scale.width * cisloPozadia - config.scale.width)){
            cisloPozadia--;
            if(cisloPozadia <= 1) cisloPozadia = 1;
        }

        pohybHraca(playerFinal, emitterDoStran);

        if(klavesnica.ESC.isDown){
            klavesnica.ESC.isDown = false;
            this.scene.pause();
            this.scene.launch('PauseMenu', {key: this.scene.key, key2: this.aktualnaObrazovka});
        }
        if(klavesnica.R.isDown){
            klavesnica.R.isDown = false;
            this.scene.restart();
        }
        if(prepnutieTabu){
            this.scene.pause();
            this.scene.launch('PauseMenu', {key: this.scene.key});
        }
    }
});

function vytvoreniePlatforiemHratelnyLevel(){
    //v poli objektov je jeden objekt zastupeny 2 krat, prvy zaznam ma aktualne informacie (je updatovany stale po zmene pozicie/sirky/vysky) tento zaznam je stale na parnom indexe, druhy zaznam je 
    //originalna pozicia (ihned po potiahnuti z menu)

    //prva obrazovka
    for(let i = 0; i < platformyPrvaObrazovka.children.entries.length; i++){
        if(i%2 == 0) platformyFinal.create(platformyPrvaObrazovka.children.entries[i].x, platformyPrvaObrazovka.children.entries[i].y, 'platform').setSize(platformyPrvaObrazovka.children.entries[i].width * platformyPrvaObrazovka.children.entries[i].scaleX, platformyPrvaObrazovka.children.entries[i].height * platformyPrvaObrazovka.children.entries[i].scaleY).setDisplaySize(platformyPrvaObrazovka.children.entries[i].width * platformyPrvaObrazovka.children.entries[i].scaleX, platformyPrvaObrazovka.children.entries[i].height * platformyPrvaObrazovka.children.entries[i].scaleY);
    }

    //druha obrazovka
    for(let i = 0; i < platformyDruhaObrazovka.children.entries.length; i++){
        if(i%2 == 0) platformyFinal.create(config.scale.width + platformyDruhaObrazovka.children.entries[i].x, platformyDruhaObrazovka.children.entries[i].y, 'platform').setSize(platformyDruhaObrazovka.children.entries[i].width * platformyDruhaObrazovka.children.entries[i].scaleX, platformyDruhaObrazovka.children.entries[i].height * platformyDruhaObrazovka.children.entries[i].scaleY).setDisplaySize(platformyDruhaObrazovka.children.entries[i].width * platformyDruhaObrazovka.children.entries[i].scaleX, platformyDruhaObrazovka.children.entries[i].height * platformyDruhaObrazovka.children.entries[i].scaleY);
    }
    //tretia 
    for(let i = 0; i < platformyTretiaObrazovka.children.entries.length; i++){
        if(i%2 == 0) platformyFinal.create(config.scale.width*2 + platformyTretiaObrazovka.children.entries[i].x, platformyTretiaObrazovka.children.entries[i].y, 'platform').setSize(platformyTretiaObrazovka.children.entries[i].width * platformyTretiaObrazovka.children.entries[i].scaleX, platformyTretiaObrazovka.children.entries[i].height * platformyTretiaObrazovka.children.entries[i].scaleY).setDisplaySize(platformyTretiaObrazovka.children.entries[i].width * platformyTretiaObrazovka.children.entries[i].scaleX, platformyTretiaObrazovka.children.entries[i].height * platformyTretiaObrazovka.children.entries[i].scaleY);
    }
}

function vytvorenieOstnovHratelnyLevel(){
    for(let i = 0; i < spikePrva.children.entries.length; i++){
        if(i%2 == 0) spikeFinal.create(spikePrva.children.entries[i].x, spikePrva.children.entries[i].y, 'spike').setFlipY(spikePrva.children.entries[i].flipY);
    }
    for(let i = 0; i < spikeDruha.children.entries.length; i++){
        if(i%2 == 0) spikeFinal.create(config.scale.width + spikeDruha.children.entries[i].x, spikeDruha.children.entries[i].y, 'spike').setFlipY(spikeDruha.children.entries[i].flipY);
    }
    for(let i = 0; i < spikeTretia.children.entries.length; i++){
        if(i%2 == 0) spikeFinal.create(config.scale.width*2 + spikeTretia.children.entries[i].x, spikeTretia.children.entries[i].y, 'spike').setFlipY(spikeTretia.children.entries[i].flipY);
    }
}

function vytvorenieBronzHratelnyLevel(){
    for(let i = 0; i < bronzMincePrva.children.entries.length; i++){
        if(i%2 == 0) bronzMincaFinal.create(bronzMincePrva.children.entries[i].x, bronzMincePrva.children.entries[i].y, 'bronzMinca');
    } 
    for(let i = 0; i < bronzMinceDruha.children.entries.length; i++){
        if(i%2 == 0) bronzMincaFinal.create(config.scale.width + bronzMinceDruha.children.entries[i].x, bronzMinceDruha.children.entries[i].y, 'bronzMinca');
    }
    for(let i = 0; i < bronzMinceTretia.children.entries.length; i++){
        if(i%2 == 0) bronzMincaFinal.create(config.scale.width *2 + bronzMinceTretia.children.entries[i].x, bronzMinceTretia.children.entries[i].y, 'bronzMinca');
    }
}

function vytvorenieGoldHratelnyLevel(){
    for(let i = 0; i < zlateMincePrva.children.entries.length; i++){
        if(i%2 == 0) zlataMincaFinal.create(zlateMincePrva.children.entries[i].x, zlateMincePrva.children.entries[i].y, 'zlataMinca');
    }
    for(let i = 0; i < zlateMinceDruha.children.entries.length; i++){
        if(i%2 == 0) zlataMincaFinal.create(config.scale.width + zlateMinceDruha.children.entries[i].x, zlateMinceDruha.children.entries[i].y, 'zlataMinca');
    }
    for(let i = 0; i < zlateMinceTretia.children.entries.length; i++){
        if(i%2 == 0) zlataMincaFinal.create(config.scale.width *2 + zlateMinceTretia.children.entries[i].x, zlateMinceTretia.children.entries[i].y, 'zlataMinca');
    }
}

function vytvorenieDoleTokenHratelnyLevel(){
    for(let i = 0; i < doleTokenPrva.children.entries.length; i++){
        if(i%2 == 0) doleTokenFinal.create(doleTokenPrva.children.entries[i].x, doleTokenPrva.children.entries[i].y, 'downArrow');
    }
    for(let i = 0; i < doleTokenDruha.children.entries.length; i++){
        if(i%2 == 0) doleTokenFinal.create(config.scale.width + doleTokenDruha.children.entries[i].x, doleTokenDruha.children.entries[i].y, 'downArrow');
    }
    for(let i = 0; i < doleTokenTretia.children.entries.length; i++){
        if(i%2 == 0) doleTokenFinal.create(config.scale.width*2 + doleTokenTretia.children.entries[i].x, doleTokenTretia.children.entries[i].y, 'downArrow');
    }
}

function vytvorenieHoreTokenHratelnyLevel(){
    for(let i = 0; i < horeTokenPrva.children.entries.length; i++){
        if(i%2 == 0) horeTokenFinal.create(horeTokenPrva.children.entries[i].x, horeTokenPrva.children.entries[i].y, 'upArrow');
    }
    for(let i = 0; i < horeTokenDruha.children.entries.length; i++){
        if(i%2 == 0) horeTokenFinal.create(config.scale.width + horeTokenDruha.children.entries[i].x, horeTokenDruha.children.entries[i].y, 'upArrow');
    }
    for(let i = 0; i < horeTokenTretia.children.entries.length; i++){
        if(i%2 == 0) horeTokenFinal.create(config.scale.width*2 + horeTokenTretia.children.entries[i].x, horeTokenTretia.children.entries[i].y, 'upArrow');
    }
}

function vytvorenieEnemyHratelnyLevel(){
    for(let i = 0; i < enemyPrva.children.entries.length; i++){
        if(i%2 == 0) enemyFinal.create(enemyPrva.children.entries[i].x, enemyPrva.children.entries[i].y, 'enemy').setFlipX(enemyPrva.children.entries[i].flipX).setFlipY(enemyPrva.children.entries[i].flipY);
    }
    for(let i = 0; i < enemyDruha.children.entries.length; i++){
        if(i%2 == 0) enemyFinal.create(config.scale.width + enemyDruha.children.entries[i].x, enemyDruha.children.entries[i].y, 'enemy').setFlipX(enemyDruha.children.entries[i].flipX).setFlipY(enemyDruha.children.entries[i].flipY);
    }
    for(let i = 0; i < enemyTretia.children.entries.length; i++){
        if(i%2 == 0) enemyFinal.create(config.scale.width*2 + enemyTretia.children.entries[i].x, enemyTretia.children.entries[i].y, 'enemy').setFlipX(enemyTretia.children.entries[i].flipX).setFlipY(enemyTretia.children.entries[i].flipY);
    }

  
    for(let i = 0; i < enemyFinal.children.entries.length; i++){
        if(enemyFinal.children.entries[i].flipY){
            enemyFinal.children.entries[i].setGravityY(-600);
        }
        else enemyFinal.children.entries[i].setGravityY(0);

        if(enemyFinal.children.entries[i].flipX){
            enemyFinal.children.entries[i].setVelocityX(100);
        }
        else enemyFinal.children.entries[i].setVelocityX(-100);

        enemyFinal.children.entries[i].setBounceX(0.1);
        enemyFinal.children.entries[i].setVelocityY(0);
    }
}

function vytvorenieLavaHratelnyLevel(){
    for(let i = 0; i < lavaPrvaObrazovka.children.entries.length; i++){
        if(i%2 == 0) lavaFinal.create(lavaPrvaObrazovka.children.entries[i].x, lavaPrvaObrazovka.children.entries[i].y, 'lava').setSize(lavaPrvaObrazovka.children.entries[i].width * lavaPrvaObrazovka.children.entries[i].scaleX, lavaPrvaObrazovka.children.entries[i].height * lavaPrvaObrazovka.children.entries[i].scaleY).setDisplaySize(lavaPrvaObrazovka.children.entries[i].width * lavaPrvaObrazovka.children.entries[i].scaleX, lavaPrvaObrazovka.children.entries[i].height * lavaPrvaObrazovka.children.entries[i].scaleY);
    }
    for(let i = 0; i < lavaDruhaObrazovka.children.entries.length; i++){
        if(i%2 == 0) lavaFinal.create(config.scale.width + lavaDruhaObrazovka.children.entries[i].x, lavaDruhaObrazovka.children.entries[i].y, 'lava').setSize(lavaDruhaObrazovka.children.entries[i].width * lavaDruhaObrazovka.children.entries[i].scaleX, lavaDruhaObrazovka.children.entries[i].height * lavaDruhaObrazovka.children.entries[i].scaleY).setDisplaySize(lavaDruhaObrazovka.children.entries[i].width * lavaDruhaObrazovka.children.entries[i].scaleX, lavaDruhaObrazovka.children.entries[i].height * lavaDruhaObrazovka.children.entries[i].scaleY);
    }
    for(let i = 0; i < lavaTretiaObrazovka.children.entries.length; i++){
        if(i%2 == 0) lavaFinal.create(config.scale.width*2 + lavaTretiaObrazovka.children.entries[i].x, lavaTretiaObrazovka.children.entries[i].y, 'lava').setSize(lavaTretiaObrazovka.children.entries[i].width * lavaTretiaObrazovka.children.entries[i].scaleX, lavaTretiaObrazovka.children.entries[i].height * lavaTretiaObrazovka.children.entries[i].scaleY).setDisplaySize(lavaTretiaObrazovka.children.entries[i].width * lavaTretiaObrazovka.children.entries[i].scaleX, lavaTretiaObrazovka.children.entries[i].height * lavaTretiaObrazovka.children.entries[i].scaleY);
    }
}

function vytvorenieDeathTokenHratelnyLevel(){
    for(let i = 0; i < deathTokenPrva.children.entries.length; i++){
        deathTokenFinal.create(deathTokenPrva.children.entries[i].x, deathTokenPrva.children.entries[i].y, 'instaDeath');
    }
    for(let i = 0; i < deathTokenDruha.children.entries.length; i++){
        deathTokenFinal.create(config.scale.width + deathTokenDruha.children.entries[i].x, deathTokenDruha.children.entries[i].y, 'instaDeath');
    }
    for(let i = 0; i < deathTokenTretia.children.entries.length; i++){
        deathTokenFinal.create(config.scale.width*2 + deathTokenTretia.children.entries[i].x, deathTokenTretia.children.entries[i].y, 'instaDeath');
    }
}

function vytvorenieParentGroup(rodicovskaGroup, dcerskaGroup){
    for(let i = 0; i < dcerskaGroup.children.entries.length; i++){
        rodicovskaGroup.add(dcerskaGroup.children.entries[i]);
    }
}