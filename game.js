var config = {
    type: Phaser.AUTO,
    scale:{
        width: 1366,
        height: 626,
        parent: "hra", 
        //mode: Phaser.Scale.NONE,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y: 300},
            debug: true, 
        }
    },
    scene: [HlavneMenu, OnlineStiahnutyLevel, Level1, Level2, Editor, Nastavenia, Tutorial,
             Tutorial2, Tutorial3,  PrvaObrazovkaEditoru, 
             DruhaObrazovkaEditoru, TretiaObrazovkaEditoru, EditorMenu, DokoncenieLevelu, offlinePouzivatelomVytvorenyLevel, PauseMenu, DeathMenu, WinScreen, pauseMenuEditor, VyberModu, 
             vyberVyhladanieOnline, LoadingScreen]
};

var game = new Phaser.Game(config);
