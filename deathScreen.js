let finSkore = 0;
let level = '';
let textHlm;

var DeathMenu = new Phaser.Class({
    
    Extends: Phaser.Scene,

    initialize: 
    
    function deathMenu(){
        Phaser.Scene.call(this, 'deathMenu');
    },

    init: function(data){
        finSkore = data.score;
        level = data.key;
    }, 

    preload(){
        this.load.image('deathOkno', 'images/oknoBeta.png');
        this.load.image('deathBtn', 'images/pauseBtnBeta.png');
    },

    create(){
        let okno = this.add.image(config.scale.width*(mierkaSirka/100)/2, config.scale.height*(mierkaVyska/100)/2, 'deathOkno').setDisplaySize(400,300);
        this.add.text(okno.x - 75, okno.y - 100, 'Prehral si', {font: '25px pixelBold', color: 'black'});

        this.add.text(okno.x - 150, okno.y - 25, 'Dosiahnute skore: ', {font: '18px pixelBold', color: siva});
        this.add.text(okno.x + 50, okno.y -25, finSkore, {font: '18px pixelBold', color: siva});
        
        let navratDoMenuBtn = this.add.image(okno.x - 100, okno.y + 100, 'deathBtn').setDisplaySize(140,65).setInteractive();
        textHlm = this.add.text(okno.x - 160, okno.y + 90, 'Hlavne menu', {font: '16px pixel', color: siva});

        let restartovatLevelBtn = this.add.image(okno.x + 100, okno.y + 100, 'deathBtn').setDisplaySize(140,65).setInteractive();
        this.add.text(okno.x + 65, okno.y + 90, 'Restart', {font: '16px pixel', color: siva});

        

        if(level == 'offlinePouzivatelomVytvorenyLevel'){
            textHlm.setText('Editor');
            textHlm.x = okno.x - 130;
            navratDoMenuBtn.on('pointerdown', function(){
                this.scene.stop();
                this.scene.stop(level);
                this.scene.sleep('tretiaObrazovkaEditoru');
                this.scene.sleep('druhaObrazovkaEditoru');
                this.scene.wake('prvaObrazovkaEditoru');
                /*this.scene.start('HlavneMenu');
                this.scene.stop(level);
                this.scene.stop();
                this.scene.stop('Editor');
                this.scene.stop('editorMenu');
                this.scene.stop('prvaObrazovkaEditoru');
                this.scene.stop('druhaObrazovkaEditoru');
                this.scene.stop('tretiaObrazovkaEditoru');*/
            }, this);
        }
        else{
            navratDoMenuBtn.on('pointerdown', function(){
                this.scene.start('HlavneMenu');
                this.scene.stop(level);
                this.scene.stop();
            }, this);
        }

        restartovatLevelBtn.on('pointerdown', function(){
            this.scene.start(level);
            this.scene.stop();
        }, this);

        klavesnica = this.input.keyboard.addKeys('ENTER');
    },
    update(){
        if(klavesnica.ENTER.isDown){
            this.scene.start(level);
            this.scene.stop();
        }
    }
});
