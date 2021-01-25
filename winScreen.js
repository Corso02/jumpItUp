let finalneSkore = 0;
let menuBnt;
let restartBtn;
let nextLevelBtn;
let klucSceny;
let editorKey;
let lvlDataDb;

var WinScreen = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 
    function winScreen(){
        Phaser.Scene.call(this, {key: 'winScreen'});
    },

    init: function(data){
        finalneSkore = data.score;
        klucSceny = data.key;
        if(klucSceny == "offlinePouzivatelomVytvorenyLevel") lvlDataDb = data.level;
    },

    preload(){
        this.load.image('winOkno', 'images/oknoBeta.png');
        this.load.image('winBtn', 'images/pauseBtnBeta.png'); 
    },
    create(){
        let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2, 'winOkno').setDisplaySize(600, 400);

        this.add.text(okno.x - 125, okno.y - 150, 'Vyhral si!', {font: '48px pixelBold', color: 'black'});

        this.add.text(okno.x - 150 , okno.y - 25, 'Dosiahnute skore: ' + finalneSkore, {font: '25px pixelBold', color: 'black'});

        if(klucSceny == "Level1"){
            menuBtn = this.add.image(okno.x - 200, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x - 265, okno.y + 115, 'Hlavne menu', {font: '18px pixel', color: siva});

            restartBtn = this.add.image(okno.x, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x - 65, okno.y + 115, 'Restartovat', {font: '18px pixel', color: siva});

            nextLevelBtn = this.add.image(okno.x + 200, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x + 134, okno.y + 115, 'Druhy level', {font: '18px pixel', color: siva});

            nextLevelBtn.on('pointerdown', function(){
                this.scene.stop();
                this.scene.stop(klucSceny);
                this.scene.launch('Level2');
            }, this);
        }
        else if (klucSceny == "Level2" || klucSceny == "onlineLevel"){
            menuBtn = this.add.image(okno.x - 100, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x - 165, okno.y + 115, 'Hlavne menu', {font: '18px pixel', color: siva});

            restartBtn = this.add.image(okno.x + 100, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x + 35, okno.y + 115, 'Restartovat', {font: '18px pixel', color: siva});

        }
        else if(klucSceny == "offlinePouzivatelomVytvorenyLevel"){
            menuBtn = this.add.image(okno.x - 200, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x - 255, okno.y + 105, 'Navrat do ', {font: '18px pixel', color: siva});
            this.add.text(okno.x - 240, okno.y + 130, 'editoru', {font: '18px pixel', color: siva});

            restartBtn = this.add.image(okno.x, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x - 65, okno.y + 115, 'Restartovat', {font: '18px pixel', color: siva});

            let ulozitLevelBtn = this.add.image(okno.x + 200, okno.y + 125, 'winBtn').setDisplaySize(150,50).setInteractive();
            this.add.text(okno.x + 140, okno.y + 115, 'Ulozit level', {font: "18px pixel", color: siva});

            ulozitLevelBtn.on('pointerdown', function(){
                let nazovLevelu = prompt("Zadaj nazov levelu");
                while(nazovLevelu == "null"){
                    nazovLevelu = prompt("Zadaj nazov levelu");
                }
                zapisLeveluDoDb(lvlDataDb, nazovLevelu);
            }, this);

        }
        if(klucSceny != "offlinePouzivatelomVytvorenyLevel"){
            menuBtn.on('pointerdown', function(){
                this.scene.stop();
                this.scene.stop(klucSceny);
                this.scene.start('HlavneMenu');
            }, this);
        }
        else{
            menuBtn.on('pointerdown', function(){
                this.scene.stop();
                this.scene.stop(klucSceny);
                this.scene.sleep('druhaObrazovkaEditoru');
                this.scene.sleep('tretiaObrazovkaEditoru');
                this.scene.wake('prvaObrazovkaEditoru');
            }, this);
        }

        restartBtn.on('pointerdown', function(){
            this.scene.stop();
            this.scene.start(klucSceny);
        }, this);
    }
});