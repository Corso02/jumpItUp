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
let testBtn;
let hracExistuje = false;
let vlajkaExistuje = false
let stareCisloPozadia = 1;

class Editor extends Phaser.Scene{
    constructor(){
        super({key: "Editor"});
    }
    preload(){
        this.load.image('background', 'images/backgorund');
        //assety pre level (v kazdom leveli su)
        this.load.spritesheet('player', 'images/dude.png' ,  { frameWidth: 32, frameHeight: 48 } ); //
        this.load.image('platform', 'images/platformBeta.png');
        this.load.image('bronzMinca', 'images/bronzCoinBeta.png');
        this.load.image('zlataMinca', 'images/goldCoinBeta.png');
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

        platformy = this.physics.add.staticGroup({
            defaultKey: 'platform',
            maxSize: 5,
            draggable: true
        });
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

        for(let i = 1; i < 7; i++){
            this.add.image(((config.scale.width)/2)*i, (config.scale.height/2) , 'background').setDisplaySize(config.scale.width, config.scale.height);
            i++;
        }
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

        klavesnica = this.input.keyboard.addKeys('R , M, L, V, DELETE');

        //this.input.activePointer.downElement.width = config.scale.width*3;
       
        klavesnica.M.on('down', function(){
           
            if(otvoreneMenu){
                this.scene.stop('editorMenu');
                otvoreneMenu = false;
            }
            else if(otvoreneMenu == false){
                this.scene.launch('editorMenu');
                otvoreneMenu = true;
            }
        }, this);

      /*  this.input.activePointer.on('pointerdown', function(){
            this.input.activePointer.downX = this.input.activePointer.downX + (config.scale.width*cisloPozadia);
            console.log("sirka: " + this.input.activePointer.downX);
        });*/
    }
    update(){
        //this.input.activePointer.downX = config.scale.width * (cisloPozadia-1) + this.input.activePointer.downX;


        kamera.setViewport(-((cisloPozadia - 1) * (config.scale.width) + 1),0, config.scale.width, config.scale.height);

        novyPctPlatforiem = platformy.children.entries.length;
        novyPctBronzMince = bronzMince.children.entries.length;
        novyPctLavy = lava.children.entries.length;
        novyPctGoldMinca = zlateMince.children.entries.length;
        novyPctDoleToken = zmenaGravitacieDoleToken.children.entries.length;
        novyPctHoreToken = zmenaGravitacieHoreToken.children.entries.length;
        novyPctSpike = ostne.children.entries.length;
        novyPctEnemy = nepriatelia.children.entries.length;
        novyPctDeathToken = instaDeathToken.children.entries.length;

        if(zvolenyObjekt !== undefined){
            zvolenyObjekt.syncBounds = true;
            zvolenyObjekt.setInteractive();
            this.input.setDraggable(zvolenyObjekt);
            zvolenyObjekt.on('drag', function(pointer){
                zvolenyObjekt.x = config.scale.width*cisloPozadia - config.scale.width + pointer.x;
                zvolenyObjekt.y = pointer.y;
                zvolenyObjekt.body.x = config.scale.width*cisloPozadia - config.scale.width + pointer.x - (zvolenyObjekt.width*zvolenyObjekt.scaleX)/2;
                zvolenyObjekt.body.y = pointer.y - (zvolenyObjekt.height*zvolenyObjekt.scaleY)/2;
            });
            klavesnica.DELETE.on('down', function(){
                if(zvolenyObjekt === undefined){}
                else{
                    zvolenyObjekt.destroy();
                    zvolenyObjekt = undefined;
                    klavesnica.DELETE.isDown = false;
                }
            });
        }
         if(staryPctPlatforiem != novyPctPlatforiem){
             console.log('plat update');
             for(let i = 0; i < novyPctPlatforiem; i++){
                 platformy.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = platformy.children.entries[i];
                 },this);
             }
             staryPctPlatforiem = novyPctPlatforiem;
         }
         if(staryPctBronzMince != novyPctBronzMince){
             for(let i = 0; i < novyPctBronzMince; i++){
                 bronzMince.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = bronzMince.children.entries[i];
                 },this);
             }
             staryPctBronzMince = novyPctBronzMince;
         }
         if(staryPctLavy != novyPctLavy){
             for(let i = 0; i < novyPctLavy; i++){
                 lava.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = lava.children.entries[i];
                 }, this);
             }
             staryPctLavy = novyPctLavy;
         }
         if(staryPctGoldMince != novyPctGoldMinca){
             for(let i = 0; i < novyPctGoldMinca; i++){
                 zlateMince.children.entries[i].on('pointerdown', function(){
                    zvolenyObjekt = zlateMince.children.entries[i];
                 }, this);
             }
             staryPctGoldMince = novyPctGoldMinca;
         }
         if(staryPctDoleToken != novyPctDoleToken){
             for(let i = 0; i < novyPctDoleToken; i++){
                 zmenaGravitacieDoleToken.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = zmenaGravitacieDoleToken.children.entries[i];
                 }, this);
             }
             staryPctDoleToken = novyPctDoleToken;
         }
         if(staryPctHoreToken != novyPctHoreToken){
             for(let i = 0; i < novyPctHoreToken; i++){
                 zmenaGravitacieHoreToken.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = zmenaGravitacieHoreToken.children.entries[i];
                 }, this);
             }
             staryPctHoreToken = novyPctHoreToken;
         }
         if(staryPctSpike != novyPctSpike){
             for(let i = 0; i < novyPctSpike; i++){
                 ostne.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = ostne.children.entries[i];
                 }, this);
             }
             staryPctSpike = novyPctSpike;
         }
         if(staryPctEnemy != novyPctEnemy){
             for(let i = 0; i < novyPctEnemy; i++){
                 nepriatelia.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = nepriatelia.children.entries[i];
                 }, this);
             }
             staryPctEnemy = novyPctEnemy;
         }
         if(staryPctDeathToken != novyPctDeathToken){
             for(let i = 0; i < novyPctDeathToken; i++){
                 instaDeathToken.children.entries[i].on('pointerdown', function(){
                     zvolenyObjekt = instaDeathToken.children.entries[i];
                 }, this);
             }
             staryPctDeathToken = novyPctDeathToken;
         }

         if(player.children.entries.length == 1){
            hracExistuje = true;
            player.children.entries[0].on('pointerdown', function(){
                zvolenyObjekt = player.children.entries[0];
            }, this);
         } 
         else hracExistuje = false;

         if(vlajka.children.entries.length == 1){
             vlajkaExistuje = true;
             vlajka.children.entries[0].on('pointerdown', function(){
                 zvolenyObjekt = vlajka.children.entries[0];
             }, this);
         }
         else{
             vlajkaExistuje = false;
        }
        

         if(klavesnica.R.isDown){
             //console.log(cisloPozadia);
            // console.log(otvorZatvorBtn.children.entries[0]);
             console.log(this.input.activePointer);
         }
    }
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

EditorMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function editorMenu(){
        Phaser.Scene.call(this,{key: "editorMenu"});
    },
    preload(){
        this.load.image('editorMenuBackground', 'images/editorMenuBeta.png');
        this.load.image('trashCan', 'images/trashCanBeta.png');
        this.load.image('plusBtn', 'images/editorPlusBtn.png');
        this.load.image('minusBtn', 'images/editorMinusBtn.png');
        this.load.image('choseBtnZaskrtnuty', 'images/editoChoseBtn.png');
        this.load.image('choseBtnNezaskrtnuty', 'images/editoChoseBtn2.png');
    },
    create(){
        this.add.image(config.scale.width  - 150, config.scale.height/2, 'editorMenuBackground');
        //menu
        this.add.text(config.scale.width - 280, config.scale.height/2 - 240, 'Platformy a lava', {font: '16px pixelBold', color: 'black'});
        let platforma = this.add.image(config.scale.width - 230, config.scale.height/2 - 200, 'platform').setDisplaySize(100,25).setInteractive();
        let lavaE = this.add.image(config.scale.width - 80, config.scale.height/2 - 200, 'lava').setDisplaySize(100,25).setInteractive();
        this.add.text(config.scale.width - 280, config.scale.height/2 - 185, 'Mince', {font: '16px pixelBold', color: 'black'});
        let bronzMinca = this.add.image(config.scale.width - 260, config.scale.height/2 - 150, 'bronzMinca').setInteractive();
        let zlataMinca = this.add.image(config.scale.width - 220, config.scale.height/2 - 150, 'zlataMinca').setInteractive();
        this.add.text(config.scale.width - 280, config.scale.height/2 - 135, 'Tokeny', {font: '16px pixelBold', color: 'black'});
        let zmenaHore = this.add.image(config.scale.width - 260, config.scale.height/2 - 90, 'upArrow').setInteractive();
        let zmenaDole = this.add.image(config.scale.width - 200, config.scale.height/2 - 90, 'downArrow').setInteractive();
        this.add.text(config.scale.width - 280, config.scale.height/2 - 65, 'Prekazky', {font: '16px pixelBold', color: 'black'});
        let spike = this.add.image(config.scale.width - 260, config.scale.height/2 - 25, 'spike').setInteractive();
        let nepriatel = this.add.image(config.scale.width - 200, config.scale.height/2 - 25, 'enemy').setInteractive();
        let deathToken = this.add.image(config.scale.width - 130, config.scale.height/2 - 25 , 'instaDeath').setInteractive();
        this.add.text(config.scale.width - 280, config.scale.height/2, 'Hrac a vlajka', {font: '16px pixelBold', color: 'black'});
        hrac = this.add.image(config.scale.width - 260, config.scale.height/2 + 45 , 'player').setInteractive().setFlipX(true);
        vlajkaEditor = this.add.image(config.scale.width - 200, config.scale.height/2 + 45, 'vlajka').setInteractive().setSize(12.5,50).setDisplaySize(12.5, 50);
        //menenie rozmerov
        this.add.text(config.scale.width - 280, config.scale.height/2 + 90, 'Nastavenie parametrov: ', {font: '16px pixelBold', color: 'black'});
        sirkaObjektu = this.add.text(config.scale.width - 280, config.scale.height/2 + 120, 'Sirka: ', {font: '16px pixelBold', color: 'black'}).setVisible(false);
        sirkaPbjektuPlus = this.add.image(config.scale.width - 125, config.scale.height/2 + 128, 'plusBtn').setInteractive().setSize(20,20).setDisplaySize(20,20).setVisible(false);
        sirkaObjektuMinus = this.add.image(config.scale.width - 75, config.scale.height/2 + 128, 'minusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive().setVisible(false);
        vyskaObjektu = this.add.text(config.scale.width - 280, config.scale.height/2 + 150, 'Vyska: ', {font: '16px pixelBold', color: 'black'}).setVisible(false);
        vyskaObjektuPlus = this.add.image(config.scale.width - 125, config.scale.height/2 + 158, 'plusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive().setVisible(false);
        vyskaObjektuMinus = this.add.image(config.scale.width - 75, config.scale.height/2 + 158, 'minusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive().setVisible(false);
        flipY = this.add.text(config.scale.width - 280, config.scale.height/2 + 180, 'Otocit hore nohami: ', {font: '16px pixelBold', color: 'black'}).setVisible(false);
        flipYBtn = this.add.image(config.scale.width - 50, config.scale.height/2 + 188, 'choseBtnNezaskrtnuty').setInteractive().setVisible(false);
        //kos a menenie cisla obrazovky
        //this.add.image(config.scale.width - 40, config.scale.height/2 + 220, 'trashCan');
        let infoCisloObrazovky = this.add.text(config.scale.width- 280, config.scale.height/2 + 230, 'Cislo obrazovky: ' + cisloPozadia, {font: '14px pixelBold', color: 'black'});
        let plusBtn = this.add.image(config.scale.width - 110, config.scale.height/2 + 235, 'plusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive();
        let minusBtn = this.add.image(config.scale.width  - 80, config.scale.height/2 + 235, 'minusBtn').setSize(20,20).setDisplaySize(20,20).setInteractive();

        plusBtn.on('pointerdown', function(){
            cisloPozadia++;
            if(cisloPozadia > 3) cisloPozadia = 3;
            otvoreneMenu = false;
           // kos.x = config.scale.width*cisloPozadia - 40;
            //kos.y = config.scale.height/2 + 220;
            //otvorZatvorBtn.children.entries[0].x = config.scale.width*cisloPozadia - 40; 
            //otvorZatvorBtn.children.entries[0].body.x = config.scale.width*cisloPozadia - 60;
            //otvorZatvorBtn.x = config.scale.width*cisloPozadia - 40;
          //  testBtn.x = (config.scale.width*cisloPozadia) - config.scale.width/2;
            infoCisloObrazovky.setText("Cislo obrazovky: " + cisloPozadia);
            //testBtn.x = testBtn.x + config.scale.width;
            this.scene.stop();
        }, this);

        minusBtn.on('pointerdown', function(){
            cisloPozadia--;
            if(cisloPozadia < 1) cisloPozadia = 1;
            //kos.x = config.scale.width*cisloPozadia - 40;
            //otvorZatvorBtn.x = config.scale.width*cisloPozadia - 40;
            infoCisloObrazovky.setText("Cislo obrazovky: " + cisloPozadia);
        }, this);


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
            platforma.x = config.scale.width - 230; // these two are used to return platform from editor menu to original position in menu
            platforma.y = config.scale.height/2 - 200;
            platformy.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'platform').setSize(100,25).setDisplaySize(100,25).setInteractive(); // this one is to create new platform in group "platformy"
        },this);

        bronzMinca.on('drag', function(pointer, dragX, dragY){
            bronzMinca.x = config.scale.width*cisloPozadia - config.scale.width + dragX;
            bronzMinca.y = dragY;
        });
        bronzMinca.on('dragend', function(pointer){
            bronzMinca.x = config.scale.width - 260;
            bronzMinca.y = config.scale.height/2 - 150;
            bronzMince.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'bronzMinca').setInteractive();
        });

        lavaE.on('drag', function(pointer, dragX, dragY){
            lavaE.x = config.scale.width*cisloPozadia - config.scale.width + dragX;
            lavaE.y = dragY;
        });

        lavaE.on('dragend', function(pointer){
            lavaE.x = config.scale.width - 80;
            lavaE.y = config.scale.height/2 - 200;
            lava.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'lava').setSize(100,25).setDisplaySize(100,25).setInteractive();
        });

        zlataMinca.on('drag', function(pointer, dragX, dragY){
            zlataMinca.x = config.scale.width*cisloPozadia - config.scale.width + dragX;
            zlataMinca.y = dragY;
        });

        zlataMinca.on('dragend', function(pointer){
            zlataMinca.x = config.scale.width - 220;
            zlataMinca.y = config.scale.height/2 - 150;
            zlateMince.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'zlataMinca').setInteractive();
        });

        zmenaDole.on('drag', function(pointer, dragX, dragY){
            zmenaDole.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            zmenaDole.y = dragY;
        });

        zmenaDole.on('dragend', function(pointer){
            zmenaDole.x = config.scale.width - 200;
            zmenaDole.y = config.scale.height/2 - 90;
            zmenaGravitacieDoleToken.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'downArrow').setInteractive();
        });

        zmenaHore.on('drag', function(pointer, dragX, dragY){
            zmenaHore.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            zmenaHore.y = dragY;
        });

        zmenaHore.on('dragend', function(pointer){
            zmenaHore.x = config.scale.width - 260;
            zmenaHore.y = config.scale.height/2 - 90;
            zmenaGravitacieHoreToken.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'upArrow').setInteractive();
        });

        spike.on('drag', function(pointer, dragX, dragY){
            spike.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            spike.y = dragY;
        });

        spike.on('dragend', function(pointer){
            spike.x = config.scale.width - 260;
            spike.y = config.scale.height/2 - 25;
            ostne.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'spike').setInteractive();
        });

        nepriatel.on('drag', function(pointer, dragX, dragY){
            nepriatel.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            nepriatel.y = dragY;
        });

        nepriatel.on('dragend', function(pointer){
            nepriatel.x = config.scale.width - 200;
            nepriatel.y = config.scale.height/2 - 25;
            nepriatelia.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'enemy').setInteractive().setGravityY(-300);
        });

        deathToken.on('drag', function(poiner, dragX, dragY){
            deathToken.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            deathToken.y = dragY;
        });

        deathToken.on('dragend', function(pointer){
            deathToken.x = config.scale.width - 130;
            deathToken.y = config.scale.height/2 - 25;
            instaDeathToken.get(config.scale.width * cisloPozadia - config.scale.width + pointer.x, pointer.y, 'instaDeath').setInteractive();
        });

        hrac.on('drag', function(pointer, dragX, dragY){
            hrac.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            hrac.y = dragY;
        });

        hrac.on('dragend', function(pointer){
            hrac.x = config.scale.width - 260;
            hrac.y = config.scale.height/2 + 45;
            player.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'player').setInteractive().setFlipX(true);
        });

        vlajkaEditor.on('drag', function(pointer, dragX, dragY){
            vlajkaEditor.x = config.scale.width * cisloPozadia - config.scale.width + dragX;
            vlajkaEditor.y = dragY;
        });

        vlajkaEditor.on('dragend', function(pointer){
            vlajkaEditor.x = config.scale.width - 200;
            vlajkaEditor.y = config.scale.height/2 + 45;
            vlajka.get(config.scale.width*cisloPozadia - config.scale.width + pointer.x, pointer.y, 'vlajka').setInteractive().setSize(50,125).setDisplaySize(50,125);
        });
    },
    update(){
        if(hracExistuje){
            hrac.setTint(0x666363);
            this.input.setDraggable(hrac, false);
        }
        else{
            hrac.clearTint();
            this.input.setDraggable(hrac);
        }

        if(vlajkaExistuje){
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
                })

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
    }
});
