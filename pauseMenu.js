var menuBtn;
var pokracovatBtn;
var pauzaKlavesnica; 

var PauseMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 

    function PauseMenu(){
        Phaser.Scene.call(this, {key: 'PauseMenu'});
    },

    init: function(data){
       console.log('init', data);
       this.nazovLevelu = data.key;
       if(this.nazovLevelu == 'offlinePouzivatelomVytvorenyLevel' || this.nazovLevelu == 'Editor') this.editor = data.key2;
    },
    preload(){
        this.load.image('pauseOkno', 'images/oknoBeta.png');
        this.load.image('pauseBtn', 'images/pauseBtnBeta.png');
    },

    create(){
        console.log('cislo pozadia pauza: ' + cisloPozadia);
        
        let okno = this.add.image(( config.scale.width*(mierkaSirka/100)/2), config.scale.height*(mierkaVyska/100)/2, 'pauseOkno').setDisplaySize(500,400);
        this.add.text(okno.x - 150, okno.y - 150, 'Hra je zastavena', {font: '30px pixelBold', color: 'black'});

        menuBtn = this.add.image(( okno.x) - 100 , okno.y + 75, 'pauseBtn').setInteractive().setDisplaySize(150,60);
       

        pokracovatBtn = this.add.image(( okno.x) + 100, okno.y + 75, 'pauseBtn').setInteractive().setDisplaySize(150,60);
        this.add.text(okno.x + 40, okno.y + 65, 'Pokracovat', {font: '18px pixel', color: siva});
      
        pokracovatBtn.on('pointerdown', function(){
            zastavenieHracaPoPauze();
            this.scene.stop();
            this.scene.resume(this.nazovLevelu);
        }, this);

        pauzaKlavesnica = this.input.keyboard.addKeys('ESC');

        if(this.nazovLevelu == 'offlinePouzivatelomVytvorenyLevel'){
            this.add.text(okno.x - 155, okno.y + 55, 'Navrat do ', {font: '18px pixel', color: siva});
            this.add.text(okno.x - 140, okno.y + 80, 'editoru', {font: '18px pixel', color: siva});
            menuBtn.on('pointerdown', function(){
                if(this.editor == "prvaObrazovkaEditoru") cisloPozadia = 1;
                else if(this.editor == "druhaObrazovkaEditoru") cisloPozadia = 2;
                else cisloPozadia = 3;
                this.scene.stop('offlinePouzivatelomVytvorenyLevel');
                this.scene.resume(this.editor);
                this.scene.stop();
            }, this);
        }
        else{
            this.add.text(okno.x - 167, okno.y + 65, 'Hlavne Menu', {font: '18px pixel', color: siva});
            menuBtn.on('pointerdown', function(){
                this.scene.stop();
                this.scene.stop(this.nazovLevelu);
                this.scene.start('HlavneMenu');
            }, this);
        }
    },
    update(){
        if(pauzaKlavesnica.ESC.isDown){
            zastavenieHracaPoPauze();
            this.scene.stop();
            this.scene.resume(this.nazovLevelu);
        }
    }
});