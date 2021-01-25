let siva = '#8E8E8E';
let pixelFont = '20px pixel';
let mierkaSirka, mierkaVyska;

class HlavneMenu extends Phaser.Scene{

    constructor(){
        super({key: "HlavneMenu"});
    }

    preload(){
        //nacitanie assetov, prvy argument je nazov ktory ho zastupuje v programe a druhy argument je cesta k nemu
        this.load.image('background', 'images/background.png');
        //this.load.image('menuBtn', 'images/menuBtn.png');
        this.load.image('settingsCog', 'images/settingsCog.png');
        //this.load.image('editorBtn', 'images/editorBtnBeta.png');
        //this.load.image('tutorialBtn', 'images/tutorialBtnBeta.png');
        this.load.image('btn', 'images/btnBeta.png');
        this.load.image('btn2', 'images/pauseBtnBeta.png');
        // this.load.audio('theme', [
        //     "audio/theme.mp3",
        //     "audio/theme.ogg"
        // ]);
    }
        create(){
            console.log('vitaj v hlavnom menu');

            //if(window.innerWidth < config.scale.width || window.innerHeight < config.scale.height){
                if(window.innerWidth < config.scale.width)  mierkaSirka = window.innerWidth*100 / config.scale.width;
                else mierkaSirka = 100;
                if(window.innerHeight < config.scale.height) mierkaVyska = window.innerHeight*100 / config.scale.height;
                else mierkaVyska = 100;
                //malaObrazovka = true;

                let pozadieMenu = this.add.image(config.scale.width * (mierkaSirka/100)/2, config.scale.height * (mierkaVyska/100)/2, 'background').setDisplaySize(config.scale.width*(mierkaSirka/100), config.scale.height*(mierkaVyska/100)).setSize(config.scale.width*(mierkaSirka/100), config.scale.height*(mierkaVyska/100));
                var hlavneTlacidlo = this.add.image(pozadieMenu.x, pozadieMenu.y - 50*(mierkaVyska/100), 'btn').setInteractive().setDisplaySize(300, 150).setSize(300, 150);
                console.log("sirka pozadie: " + pozadieMenu.width);
                console.log("vyska pozadie: " + pozadieMenu.height);
                console.log("pozadie stred x: " + pozadieMenu.x)
                console.log("pozadie stred y: " + pozadieMenu.y);
                //this.add.text(window.innerWidth/2 - 122, window.innerHeight/2 - 75, 'Spusti hru', { font: " 29px pixelBold", color: siva});
                this.add.text(hlavneTlacidlo.x - 122 , hlavneTlacidlo.y - 25, 'Spusti hru', {font: "40px pixelBold", color: siva});
                //var nastavenie = this.add.image(window.innerWidth - 50, window.innerHeight - 50, 'settingsCog').setInteractive().setDisplaySize(32,32);
                var nastavenie = this.add.image(pozadieMenu.width - 50, pozadieMenu.height - 50, 'settingsCog').setInteractive().setDisplaySize(32,32);
                console.log("nastavenie x: " + nastavenie.x);
                console.log("nastavenie y:" + nastavenie.y);
                var editor = this.add.image(pozadieMenu.x - 75*(mierkaSirka/100), pozadieMenu.y + 75*(mierkaVyska/100), 'btn').setInteractive().setDisplaySize(hlavneTlacidlo.width/3, hlavneTlacidlo.height/3);
                this.add.text(editor.x - 30, editor.y - 10, 'Editor', {font: '18px pixelBold', color: siva});
                var tutorialOkno = this.add.image(pozadieMenu.x + 75*(mierkaSirka/100), pozadieMenu.y + 75*(mierkaVyska/100), 'btn').setInteractive().setDisplaySize(hlavneTlacidlo.width/3, hlavneTlacidlo.height/3);
                this.add.text(tutorialOkno.x - 40, tutorialOkno.y - 10, 'Tutorial', {font: '18px pixelBold', color: siva});
                var quitBtn = this.add.image(50, pozadieMenu.height - 25, 'btn2').setDisplaySize(125, 50).setInteractive();
                this.add.text(quitBtn.x - 45, quitBtn.y - 5, 'Vypnut hru', {font: '15px pixel', color: siva});
                this.add.text(150, quitBtn.y - 5, 'Hrac: ' + menoPouzivatela, {font: '18px pixelBold', color: 'black'});
                this.input.on('pointerdown', function(pointer){
                    console.log("x: "+ pointer.x);
                    console.log("y: " + pointer.y);
                })
           // }
            /*else{
                //vytvorim si obrazok (pozadie), a urcim ulozenie jeho stredu (sirka, vyska) a potom nazov obrazka ktory sme urcili v metode preload()
                var pozadie = this.add.image((config.scale.width)/2, config.scale.height/2, 'background');
                //pre obrazok "pozadie" nastavim sirku a vysku
                pozadie.setDisplaySize((config.scale.width), config.scale.height);
                var hlavneTlacidlo = this.add.image((config.scale.width)/2, config.scale.height/2 - 50, 'btn').setInteractive().setDisplaySize(300, 150);
                this.add.text(config.scale.width/2 - 122, config.scale.height/2 - 75 , 'Spusti hru', {font: ' 40px pixelBold', color: siva});
                var nastavenie = this.add.image((config.scale.width)-50, config.scale.height-50, 'settingsCog').setInteractive();
                nastavenie.setDisplaySize(64,64);
                var editor = this.add.image((config.scale.width)/2 - 75, config.scale.height/2 + 75, 'btn').setInteractive().setDisplaySize(100, 50);
                this.add.text(config.scale.width/2 - 105, config.scale.height/2 + 65, 'Editor', {font: '18px pixelBold', color: siva});
                var tutorialOkno = this.add.image((config.scale.width)/2 + 75, config.scale.height/2 + 75, 'btn').setInteractive().setDisplaySize(100, 50);
                this.add.text(config.scale.width/2 + 35, config.scale.height/2 + 65, 'Tutorial', {font: '18px pixelBold', color: siva});
                var quitBtn = this.add.image(50, config.scale.height - 25, 'btn2').setDisplaySize(125, 50).setInteractive();
                this.add.text(5, config.scale.height - 30, 'Vypnut hru', {font: '15px pixel', color: siva});
                this.add.text(150, config.scale.height - 30, 'Hrac: ' + menoPouzivatela, {font: "18px pixelBold", color:"black"});
            }*/
   
       
    
        const self = this;
        //pri stlaceni tlacidla sa stane....
        hlavneTlacidlo.on('pointerdown' , function(event){
          this.scene.pause();
          this.scene.launch('vyberModu');
        }, this);

       

        nastavenie.on('pointerdown', function(){
            this.scene.pause();
            this.scene.launch('nastavenia');
        }, this);

        
        editor.on('pointerdown', function(){
            console.log('editor');
            this.scene.start('Editor');
        }, this);

    
        tutorialOkno.on('pointerdown', function (){
            this.scene.pause();
            this.scene.launch('tutorial');
        }, this);

        quitBtn.on('pointerdown', function(){
            this.scale.stopFullscreen();
            if(window.innerWidth < 1920){
                console.log('obrazovka je mensia');
                document.getElementById('lavyOkraj').style.display = 'grid';
                document.getElementById('pravyOkraj').style.display = 'grid';
                document.getElementById('spustitHruBtn').style.display = 'grid';
                document.getElementById('hra').style.display = 'none';
                document.getElementsByTagName('main')[0].style.display = 'grid';
                document.getElementsByTagName('header')[0].style.display = 'grid';
                document.getElementsByTagName('footer')[0].style.display = 'grid';
               document.getElementsByTagName('body')[0].style.display = 'grid';
                
            }
            else if(window.innerWidth < 1920 && window.innerWidth > 1366 && window.innerHeight >= 833){ 
                document.getElementById('pravyOkraj').style.display = 'grid';
                document.getElementById('lavyOkraj').style.display = 'grid';
                document.getElementById('spustitHruBtn').style.display = 'grid';
                document.getElementById('hra').style.display = 'none';
            }
            else{
                document.getElementById('spustitHruBtn').style.display = 'grid';
                document.getElementById('hra').style.display = 'none';
            }
        }, this);
        // let music = this.sound.add('theme');
        // music.play();
        // console.log('hudba hraj');
    }  
    update(){
        if(fullOn == false){
            this.scale.stopFullscreen();
        }
        else{
            this.scale.startFullscreen();
        }
    } 
}

var fullOn = false;
var easyDif = true;
var hardDif = false;
var easyDifFrame = 1;
var hardDifFrame = 0;

var Nastavenia = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function Nastavenia() {
        Phaser.Scene.call(this, {key: 'nastavenia'});
    },

    preload(){
        this.load.image('hlavneOkno', 'images/oknoBeta.png');
        this.load.image('exitBtn', 'images/exitBtnBeta.png');
        this.load.spritesheet('selectBtn', 'images/selectBtnBeta.png', {frameWidth: 60, frameHeight: 60});
        this.load.image('plus', 'images/editorPlusBtn.png');
        this.load.image('minus', 'images/editorMinusBtn.png');
    },

    create(){

        /*if(malaObrazovka){ //default je false, v HL menu pri create urcim true ak je mala obrazovka 
             mierkaSirka = window.innerWidth*100 / config.scale.width;
             mierkaVyska = window.innerHeight*100 / config.scale.height;
            //var hlavneOkno = this.add.image(window.innerWidth/2, window.innerHeight/2, 'hlavneOkno').setDisplaySize(500,400);
            //this.add.text(config.scale.width*(mierkaSirka/100)/2 - 225*(mierkaSirka/100) , config.scale.height*(mierkaVyska/100)/2 - 120*(mierkaVyska/100), 'Fullscreen');
        }
        else{
           // var hlavneOkno = this.add.image((config.scale.width)/2, config.scale.height/2, 'hlavneOkno').setDisplaySize(500, 400);
            mierkaSirka = 100;
            mierkaVyska = 100;
        }*/
            let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2, 'hlavneOkno').setDisplaySize(500,400);
            //this.add.text((config.scale.width/2 - 225), config.scale.height/2 - 120, 'Fullscreen', {font: ' 45px pixelBold', color:siva});
            this.add.text(okno.x - 225, okno.y - 120, 'Fullscreen', {font: '30px pixelBold', color: siva});
           // this.add.text(config.scale.width/2 - 225, config.scale.height/2 - 50, 'Obtiaznost:', {font: '50px pixelBold', color: 'black'});
            this.add.text(okno.x - 225, okno.y - 70, 'Obtiaznost', {font: '35px pixelBold', color: 'black'});
            //this.add.text(config.scale.width/2 - 225, config.scale.height/2 + 30, 'Easy', {font: '45px pixelBold', color: siva});
            this.add.text(okno.x - 225, okno.y  -10, 'Easy', {font: '30px pixelBold', color: siva});
           // this.add.text(config.scale.width/2 - 225, config.scale.height/2 + 105, 'Hard', {font: '45px pixelBold', color: siva});
            this.add.text(okno.x - 225, okno.y + 40, 'Hard', {font: '30px pixelBold', color: siva});
           // this.add.text(config.scale.width/2 - 225, config.scale.height/2 + 175, 'Verzia: ' + verzia, {font: '18px pixel', color:siva});
            this.add.text(okno.x - 225, okno.y + 175, 'Verzia:' + verzia, {font: '18px pixel', color: siva});

            this.add.text(okno.x - 225, okno.y + 90, 'Zoom kamery', {font: '25px pixelBold', color: siva});
            
            let zoomPlusBtn = this.add.image(okno.x + 190, okno.y + 100, 'plus').setDisplaySize(20,20).setInteractive();
            let zoomMinusBtn = this.add.image(zoomPlusBtn.x + 35, zoomPlusBtn.y, 'minus').setDisplaySize(20,20).setInteractive();
            let zoomHodnotaText = this.add.text(okno.x + 130, okno.y + 90, velkostZoom, {font: '20px pixelBold', color: 'black'});


            zoomPlusBtn.on('pointerdown', function(){
                velkostZoom += 0.2;
                velkostZoom = Math.round(velkostZoom*100)/100;
                if(velkostZoom > 2) velkostZoom = 2;
                zoomHodnotaText.setText(velkostZoom);
            }, this);

            zoomMinusBtn.on('pointerdown', function(){
                velkostZoom -= 0.2;
                velkostZoom = Math.round(velkostZoom*100)/100;
                if(velkostZoom < 1) velkostZoom = 1;
                zoomHodnotaText.setText(velkostZoom);
            }, this);

            //var exitBtn = this.add.image((config.scale.width)/2 + 217, config.scale.height/2 - 169,  'exitBtn').setDisplaySize(60,55).setInteractive();
            var exitBtn = this.add.image(okno.x + 217, okno.y - 169, 'exitBtn').setDisplaySize(60,55).setInteractive();
            exitBtn.on('pointerdown', function(){
                this.scene.resume('HlavneMenu');
                this.scene.stop();
            }, this);

        var selectBtn = this.add.sprite(okno.x + 215, okno.y - 105, 'selectBtn').setInteractive().setDisplaySize(45,45);
        selectBtn.setFrame(fullOn);
        
        selectBtn.on('pointerdown', function(){
            if(fullOn == 0){
                selectBtn.setFrame(1);
                fullOn = true;
            } 
            else{
                selectBtn.setFrame(0);
                fullOn = false;
            }
        }, this);

        var easyBtn = this.add.sprite(okno.x + 215, okno.y, 'selectBtn').setInteractive().setDisplaySize(45,45);
        easyBtn.setFrame(easyDifFrame);

        var hardBtn = this.add.sprite(easyBtn.x, easyBtn.y + 50, 'selectBtn').setInteractive().setDisplaySize(45,45);
        hardBtn.setFrame(hardDifFrame);

        easyBtn.on('pointerdown', function(){
            if(easyDifFrame == 1){
                easyBtn.setFrame(0);
                easyDifFrame = 0;
                easyDif = false;

                hardBtn.setFrame(1);
                hardDifFrame = 1;
                hardDif = true;

            }
            else{
                easyBtn.setFrame(1);
                easyDifFrame = 1;
                easyDif = true;

                hardBtn.setFrame(0);
                hardDifFrame = 0;
                hardDif = false;
            }
        }, this);

        hardBtn.on('pointerdown', function(){
            if(hardDifFrame == 0){
                hardBtn.setFrame(1);
                hardDifFrame = 1;
                hardDif = true;

                easyBtn.setFrame(0);
                easyDifFrame = 0;
                easyDif = false;
            }
            else{
                hardBtn.setFrame(0);
                hardDifFrame = 0;
                hardDif = false;

                easyBtn.setFrame(1);
                easyDifFrame = 1;
                easyDif = true;
            }
        }, this);
    }
});

var Tutorial = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Tutorial(){
        Phaser.Scene.call(this, {key: 'tutorial'});
    },
    preload(){
        this.load.image('tutorialOkno', 'images/oknoBeta.png');
        this.load.image('spike', 'images/spikesBeta.png');
        this.load.image('deathToken', 'images/instaDeathBeta.png');
        this.load.image('exitBtn', 'images/exitBtnBeta.png');
        this.load.image('sipkaDalej', 'images/sipkaDalej.png');
    },

    create(){
        let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2, 'tutorialOkno').setDisplaySize(500,400);
        this.add.text(okno.x - 235, okno.y - 175, 'Zivoty a prekazky', {font: '25px pixelBold', color: 'black'});
        this.add.text(okno.x - 235, okno.y - 125, 'Mate 3 zivoty(easy) alebo 1 zivot(hard)', {font: '20px pixel', color:siva});

        var exitBtn = this.add.image(okno.x + 217, okno.y - 169,  'exitBtn').setDisplaySize(60,55).setInteractive();

        exitBtn.on('pointerdown', function(){
            this.scene.resume('HlavneMenu');
            this.scene.stop();
        }, this);

        this.add.text(okno.x - 235, okno.y - 75, 'Ak trafite', {font: pixelFont, color: siva});
        this.add.image(okno.x - 75, okno.y - 65, 'spike');
        this.add.text(okno.x - 25, okno.y - 75, 'stratite 1 zivot', {font: pixelFont, color:siva});

        this.add.text(okno.x - 235, okno.y - 40, 'Ak trafite', {font: pixelFont, color: siva});
        this.add.image(okno.x - 75, okno.y - 30, 'deathToken');
        this.add.text(okno.x - 25, okno.y - 40, 'stratite vsetky zivoty', {font: pixelFont, color:siva});

        this.add.text(okno.x - 235, okno.y - 10, 'Ovladanie', {font: '25px pixelBold', color: 'black'});
        this.add.text(okno.x - 235, okno.y + 20, 'Pohyb do stran: A/D alebo sipkami', {font: pixelFont, color:siva});
        this.add.text(okno.x - 235, okno.y + 50, 'Skok: medzernik alebo sipka hore', {font: pixelFont, color:siva});
        this.add.text(okno.x - 235, okno.y + 80, 'Velky skok: CTRL + skok', {font: pixelFont, color: siva});
        this.add.text(okno.x - 235, okno.y + 110, 'Maly skok: SHIFT + skok', {font: pixelFont, color: siva});
        this.add.text(okno.x - 235, okno.y + 140, 'Pauza: ESC', {font: pixelFont, color: siva});
        this.add.text(okno.x - 235, okno.y + 170, 'Restart levelu: r', {font: pixelFont, color: siva});

        var sipkaDalej = this.add.image(okno.x + 200, okno.y + 175, 'sipkaDalej').setInteractive().setDisplaySize(25,30);

        sipkaDalej.on('pointerdown', function(){
            this.scene.launch('tutorial2');
            this.scene.stop();
        }, this);
    },
});

var Tutorial2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function Tutorial2(){
        Phaser.Scene.call(this, {key: 'tutorial2'});
    },

    preload(){
        this.load.image('tutorialOkno2', 'images/oknoBeta.png');
        this.load.image('bronzMinca', 'images/bronzCoinBeta.png');
        this.load.image('zlataMinca', 'images/goldCoinBeta.png');
        this.load.image('nepriatel', 'images/enemyBeta.png');
        this.load.image('exitBtn', 'images/exitBtnBeta.png');
        this.load.image('sipkaSpat', 'images/sipkaSpat.png');
        this.load.image('sipkaDalej', 'images/sipkaDalej.png');
    },

    create(){
        let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2, 'tutorialOkno2').setDisplaySize(500,400);
        this.add.text(okno.x - 235, okno.y - 175, 'Ciel hry', {font: '25px pixelBold', color: 'black'});
        this.add.text(okno.x - 235, okno.y - 125, 'Cielom hry je dostat sa na koniec', {font: pixelFont, color: siva});
        this.add.text(okno.x - 235, okno.y - 95, 'levelu a pozbierat co najviac minci', {font: pixelFont, color: siva});

        var exitBtn = this.add.image(okno.x + 217, okno.y - 169,  'exitBtn').setDisplaySize(60,55).setInteractive();

        exitBtn.on('pointerdown', function(){
            this.scene.resume('HlavneMenu');
            this.scene.stop();
        }, this);

        this.add.text(okno.x - 235, okno.y - 50, 'Mince', {font: '25px pixelBold', color: 'black'});

        this.add.text(okno.x - 235, okno.y - 5, 'Ak zoberiete', {font: pixelFont, color: siva});
        this.add.image(okno.x - 45, okno.y + 5, 'bronzMinca');
        this.add.text(okno.x , okno.y - 5, 'ziskate 5 bodov', {font: pixelFont, color: siva});

        this.add.text(okno.x - 235, okno.y + 30, 'Ak zoberiete', {font: pixelFont, color: siva});
        this.add.image(okno.x - 45, okno.y + 40, 'zlataMinca');
        this.add.text(okno.x , okno.y + 30, 'ziskate 20 bodov', {font: pixelFont, color: siva});

        this.add.text(okno.x - 235, okno.y + 100, '!!! Davaj pozor na', {font:'25px pixelBold', color: 'black'});
        this.add.image(okno.x + 75, okno.y + 110, 'nepriatel');
        this.add.text(okno.x + 125, okno.y + 100, '!!!', {font: '25px pixelBold', color: 'black'});
        
        var sipkaSpat = this.add.image(okno.x + 150, okno.y + 175, 'sipkaSpat').setInteractive().setDisplaySize(25,30);
        sipkaSpat.on('pointerdown', function(){
            this.scene.launch('tutorial');
            this.scene.stop();
        }, this);

        var sipkaDalej = this.add.image(okno.x + 200, okno.y + 175, 'sipkaDalej').setInteractive().setDisplaySize(25,30);
        sipkaDalej.on('pointerdown', function(){
            this.scene.launch('tutorial3');
            this.scene.stop();
        }, this);
    }
});

var Tutorial3 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function Tutorial3(){
        Phaser.Scene.call(this, {key: 'tutorial3'});
    },

    preload(){
        this.load.image('tutorialOkno3', 'images/oknoBeta.png');
        this.load.image('exitBtn', 'images/exitBtnBeta.png');
        this.load.image('sipkaSpat', 'images/sipkaSpat.png');
        this.load.image('downArrow', 'images/downArrow.png');
        this.load.image('upArrow', 'images/upArrow.png');
    },
    create(){
        let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2, 'tutorialOkno3').setDisplaySize(500,400);
        var exitBtn = this.add.image(okno.x + 217, okno.y - 169,  'exitBtn').setDisplaySize(60,55).setInteractive();

        this.add.text(okno.x - 235, okno.y - 175, 'Gravitacia: ', {font: '25px pixelBold', color: 'black'});
        this.add.text(okno.x - 235, okno.y - 140, "Ked zoberiete", {font: pixelFont, color: siva});
        this.add.image(okno.x - 25, okno.y - 130, 'upArrow');
        this.add.text(okno.x + 10, okno.y - 140, "otocite gravitaciu", {font: pixelFont, color:siva});
        this.add.text(okno.x - 235, okno.y - 105, "dole hlavou", {font: pixelFont, color: siva});

        this.add.text(okno.x - 235, okno.y - 70, "Ked zoberiete", {font: pixelFont, color: siva});
        this.add.image(okno.x - 25, okno.y - 60, 'downArrow');
        this.add.text(okno.x + 10, okno.y - 70, 'otocite gravitaciu', {font: pixelFont, color: siva});
        this.add.text(okno.x - 235, okno.y - 35, "hore hlavou", {font: pixelFont, color: siva});

        this.add.text(okno.x - 235, okno.y, "! Gravitacia sa meni iba pre hraca !", {font: "22px pixelBold", color: "black"});

        exitBtn.on('pointerdown', function(){
            this.scene.resume('HlavneMenu');
            this.scene.stop();
        }, this);

        var sipkaSpat = this.add.image(okno.x + 150, okno.y + 175, 'sipkaSpat').setInteractive().setDisplaySize(25,30);
        sipkaSpat.on('pointerdown', function(){
            this.scene.launch('tutorial2');
            this.scene.stop();
        }, this);
    }
});

var VyberModu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 
    function vyberModu(){
        Phaser.Scene.call(this, {key: "vyberModu"});
    },

    preload(){
        this.load.image("vyberModuOkno", "images/oknoBeta.png");
        this.load.image("vyberModuBtn", "images/pauseBtnBeta.png");
        this.load.image("exitBtn", "images/exitBtnBeta.png");
    },
    create(){
        let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2 - 50, 'vyberModuOkno').setDisplaySize(500,200);

        let exitBtn = this.add.image(okno.x + 222, okno.y - 73, 'exitBtn').setDisplaySize(50,50).setInteractive();

        let onlineLevely = this.add.image(okno.x - 100, okno.y + 20 , 'vyberModuBtn').setDisplaySize(150,50).setInteractive();
        this.add.text(okno.x - 170, okno.y + 10, "Online levely", {font: "18px pixel", color: "black"});

        let offlineLevely = this.add.image(okno.x + 100, okno.y + 20, 'vyberModuBtn').setDisplaySize(150,50).setInteractive();
        this.add.text(okno.x + 30, okno.y + 10 , "Offline levely", {font: "18px pixel", color: "black"});

        exitBtn.on('pointerdown', function(){
            this.scene.stop();
            this.scene.resume("HlavneMenu");
        }, this);

        offlineLevely.on('pointerdown', function(){
            this.scene.stop();
            this.scene.stop("HlavneMenu");
            this.scene.launch("Level1");
        }, this);

        onlineLevely.on('pointerdown', function(){
            this.scene.pause();
            this.scene.launch("vyberVyhladanieOnlineLevelu");
        }, this);

        
    }
});

var vyberVyhladanieOnline = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
    function vyberVyhladanieOnline(){
        Phaser.Scene.call(this, {key: "vyberVyhladanieOnlineLevelu"});
    },

    preload(){
        this.load.image('vyberVyhladanieOkno', 'images/oknoBeta.png');
        this.load.image('vyberVyhladanieBtn', 'images/pauseBtnBeta.png');
        this.load.image('sipka', 'images/sipkaSpat.png'); 
    },

    create(){
        let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2 ,config.scale.height*(mierkaVyska/100)/2 - 50, 'vyberVyhladanieOkno').setDisplaySize(600,200);

        let sipkaSpat = this.add.image(okno.x - 280, okno.y - 80, 'sipka').setDisplaySize(25,25).setInteractive();

        let vyhladatCezIDLevelu = this.add.image(okno.x - 200, okno.y, 'vyberVyhladanieBtn').setDisplaySize(150,50).setInteractive();
        this.add.text(okno.x - 260, okno.y - 20, "Vyhladat cez", {font: "16px pixel", color: "black"});
        this.add.text(okno.x - 210, okno.y, "ID", {font: "16px pixel", color: "black"});

        //nebude to cez nick usera ale ked bude pouzivatel ukladat level tak vybehne prompt na pomenovanie levelu, cize budeme vyhladavat cez mena levelov (actually hladat cez usera mozno pridat casom :D)
        let vyhladatCezNickUsera = this.add.image(okno.x, okno.y, 'vyberVyhladanieBtn').setDisplaySize(150,50);

        let randomLevel = this.add.image(okno.x + 200, okno.y, 'vyberVyhladanieBtn').setDisplaySize(150,50).setInteractive();
        this.add.text(okno.x + 127, okno.y - 20, "Spustit random", {font: "16px pixel", color: "black"});
        this.add.text(okno.x + 180, okno.y, "level", {font: "16px pixel", color: "black"});

        sipkaSpat.on('pointerdown', function(){
            this.scene.stop();
            this.scene.resume("vyberModu");
        }, this);

        vyhladatCezIDLevelu.on('pointerdown', function(){
            const self = this;
            sessionStorage.setItem("dataLevelu", null);
            let zadaneId = prompt("Zadaj ID levelu ktory si chces zahrat", "ID");
            if(zadaneId !== null){
                console.log("zadane id: " + zadaneId);
                //this.scene.launch("loadingScreen");
                ziskanieLevelDataCezID(zadaneId);
                setTimeout(function(){
                    let levelData = sessionStorage.getItem("dataLevelu");
                    if(levelData != 'null'){
                        self.scene.launch('loadingScreen');
                        setTimeout(function(){
                            self.scene.stop("loadingScreen");
                            self.scene.stop("HlavneMenu");
                            self.scene.stop("vyberModu");
                            self.scene.stop();
                            self.scene.launch("onlineLevel", {levelData: levelData});
                        }, 2000);
                    }
                }, 500);
                //while(localStorage.getItem("dataLevelu") == null) console.log("null");
                /*setTimeout(function(){
                    console.log("data: " + JSON.parse(JSON.stringify(levelData)));
                    if(levelData != 'null'){
                        
                    }else{
                        self.scene.stop("loadingScreen"); // loading screen sa mi spusti bez ohladu na to ci bolo zadane platne ID alebo nie preto ho musim vypnut aj tu 
                    }
                }, 2000);*/
            }
            /* pri vytvarani levelu si vytvoris takuto groupu a z nej budes vytvarat zvysne groupy
            let group = this.physics.add.staticGroup();
            group.children = JSON.parse(levelData);
            console.log(group); */
        }, this);

        randomLevel.on('pointerdown', function(){
            const self = this;
            sessionStorage.setItem("dataLevelu", null);
            ziskatRandomLevelData();
            this.scene.launch("loadingScreen");
            setTimeout(function(){
                let levelData = sessionStorage.getItem("dataLevelu");
                console.log("random data: " + JSON.parse(JSON.stringify(levelData)));
                if(levelData != 'null'){
                    self.scene.stop('loadingScreen');
                    self.scene.stop("HlavneMenu");
                    self.scene.stop("vyberModu");
                    self.scene.stop();
                    self.scene.launch("onlineLevel", {levelData: levelData});
                }
            }, 2000);
            
        }, this);
    }
});

let loadingBar; 

var LoadingScreen = new Phaser.Class({
    Extends: Phaser.Scene, 

    initialize: 
    function loadingScreen(){
        Phaser.Scene.call(this, {key: "loadingScreen"});
    },
    create(){
        console.log("loading");
        let okno = this.add.rectangle(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2 - 50, 300, 100, "0xFCA14E").setStrokeStyle(2, "0x000000");
        this.add.rectangle(okno.x, okno.y + 20, 200, 50, "0xCFFFB3");
        loadingBar = this.add.rectangle(okno.x - 70, okno.y + 20, 50, 30, "0x000000");
        this.add.text(okno.x - 75, okno.y - 30, "Nacitavam level", {font: "16px pixel", color: "black"});
    },
    update(){
        for(let i = 0; i < 2; i++){
            loadingBar.width += 0.55;
        }
    }
});