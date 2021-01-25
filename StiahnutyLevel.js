let onlinePlayer, onlinePlatformy, onlineSpike, onlineLava, onlineBronzMince, onlineZlateMince, onlineHoreToken, onlineDoleToken, onlineDeathToken, onlineEnemy, onlineVlajka,
    stiahnuteDataGroup, stiahnuteData;
let pctDoleToken = 0, pctHoreToken = 0, horeTokenPrvyIndex, horeTokenPoslednyIndex, horeTokenPrvy = true, doleTokenPrvy = true, doleTokenExistujeOnline = false, horeTokenExistujeOnline = false;
let arr;

var OnlineStiahnutyLevel = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function  constructor(){
        Phaser.Scene.call(this, {key: "onlineLevel"});
    },
    init: function(data){
        stiahnuteData = data.levelData;
    },
    preload(){
        this.load.image('background', 'images/backgorund');
        this.load.spritesheet('player', 'images/playerFin.png' ,  { frameWidth: 36, frameHeight: 60 } );
        this.load.image('platform', 'images/platformBeta.png');
        this.load.spritesheet('bronzMinca', 'images/bronzCoin.png', {frameWidth: 24, frameHeight: 22});
        this.load.spritesheet('zlataMinca', 'images/goldCoin.png', {frameWidth: 24, frameHeight: 22});
        this.load.image('spike', 'images/spikesBeta.png');
        this.load.image('instaDeath', 'images/instaDeathBeta.png');
        this.load.image('enemy', 'images/enemyBeta.png');
        this.load.image('vlajka', 'images/flagBeta.png');
        this.load.image('lava', 'images/lava2Beta.png');
        this.load.image('upArrow', 'images/upArrow.png');
        this.load.image('downArrow', 'images/downArrow.png');
        this.load.image('heart', 'images/heartBeta.png');
        this.load.image('particle', 'images/particle.png');

    },
    create(){
        horeTokenExistujeOnline = false;
        doleTokenExistujeOnline = false;
        doleTokenPrvy = true;
        horeTokenPrvy = true;
        horeTokenPrvyIndex = 0;
        doleTokenPrvyIndex = 0;
        pctDoleToken = 0;
        pctHoreToken = 0;
        zmenenaGravitacia = false;

        cisloPozadia = 1;

        for(let i = 1; i < 7; i++){
            this.add.image(((config.scale.width)/2)*i, (config.scale.height/2) , 'background').setDisplaySize(config.scale.width, config.scale.height);
            i++;
        }
        let posun = 0;
        if(window.innerWidth < 1366) posun = config.scale.width - config.scale.width*(mierkaSirka/100);

        kamera = this.cameras.main;
        kamera.setBounds(0,0, (config.scale.width*3) + posun, config.scale.height);

        skore = 0;
        zivoty = this.physics.add.staticGroup();

        zobrazenieSkore = this.add.text(15 , 0, skore, {font: "15px pixel", color: "black"}).setDepth(1);

        klavesnica = this.input.keyboard.addKeys('CTRL, SPACE, A, D, SHIFT, ESC, R, M');
        ovladaniePomocouSipok = this.input.keyboard.createCursorKeys();

        arr = JSON.parse(stiahnuteData);
        //console.log(arr);
        //stiahnuteDataGroup = this.physics.add.staticGroup();
       // for(let i = 0; i < arr.entries.length; i++){
          //  stiahnuteDataGroup.create(arr.entries[i].x, arr.entries[i].y, arr.entries[i].texture.key).setFlip(arr.entries[i].flipX, arr.entries[i].flipY).setScale(arr.entries[i].scale.x, arr.entries[i].scale.y).setVisible(false);
            //stiahnuteDataGroup.add(arr.entries[i]);
       // }



        //stiahnuteDataGroup.children = JSON.parse(stiahnuteData);
        //console.log(stiahnuteDataGroup);

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
        origoZivoty = pocetZivotov;
        zivotyPole = zivoty.getChildren();

        onlinePlatformy = this.physics.add.staticGroup();
        onlineSpike = this.physics.add.staticGroup();
        onlineLava = this.physics.add.staticGroup();
        onlineBronzMince = this.physics.add.staticGroup();
        onlineZlateMince = this.physics.add.staticGroup();
        onlineHoreToken = this.physics.add.staticGroup();
        onlineDoleToken = this.physics.add.staticGroup();
        onlineDeathToken = this.physics.add.staticGroup();
        onlineEnemy = this.physics.add.group({
            bounceX: 0.1
        });

        onlinePlayer = this.physics.add.sprite(arr.entries[0].x, arr.entries[0].y, 'player').setVisible(true).setFlipY(arr.entries[0].flipY);
        playerOriginX = onlinePlayer.x;
        playerOriginY = onlinePlayer.y;
        if(onlinePlayer.flipY){
            zmenenaGravitacia = true;
            onlinePlayer.setGravityY(-600);
        }

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

        onlineVlajka = this.physics.add.staticImage(arr.entries[1].x, arr.entries[0].y - 20, 'vlajka').setSize(50,125).setDisplaySize(50,125).setVisible(true);

        //zacinam na indexe 2, lebo na 0. indexe je hrac a na 1.indexe je vlajka
        //elementy su zoradene v tomto poradi: hrac, vlajka, platfromy, spike, bronz mince, zlate mince, dole token, hore token, death token, lava, enemy
        for(let i = 2; i < arr.entries.length; i++){
            switch(arr.entries[i].textureKey){
                case "platform" : pridanieElementu(arr.entries[i], onlinePlatformy);
                                  break;
                case "lava": pridanieElementu(arr.entries[i], onlineLava);
                             break;
                case "bronzMinca": pridanieElementu(arr.entries[i], onlineBronzMince);
                                   break;
                case "zlataMinca": pridanieElementu(arr.entries[i], onlineZlateMince);
                                   break;
                case "spike": pridanieElementu(arr.entries[i], onlineSpike);
                              break;
                case "instaDeath": pridanieElementu(arr.entries[i], onlineDeathToken);
                                   break;
                case "upArrow": if(horeTokenPrvy){
                                    console.log("hore exituje");
                                    horeTokenExistujeOnline = true;
                                    horeTokenPrvy = false;
                                    horeTokenPrvyIndex = i;
                                }
                                pctHoreToken++;
                                pridanieElementu(arr.entries[i], onlineHoreToken);
                                break;
                case "downArrow": if(doleTokenPrvy){
                                    console.log('dole exituje');
                                    doleTokenExistujeOnline = true;
                                    doleTokenPrvy = false;
                                    doleTokenPrvyIndex = i;
                                  }
                                  pctDoleToken++;
                                  pridanieElementu(arr.entries[i], onlineDoleToken);
                                  break;
                case "enemy": pridanieElementu(arr.entries[i], onlineEnemy);
                              break;

            }
        }
        
        this.physics.add.collider(onlinePlayer, onlinePlatformy);
        this.physics.add.collider(onlineEnemy, onlinePlatformy, enemyZmenaSmeru, null, this);
        //this.physics.add.collider(onlineEnemy, onlinePlatformy);
        this.physics.add.overlap(onlinePlayer, onlineDoleToken, zmenaGravitacieDole);
        this.physics.add.overlap(onlinePlayer, onlineHoreToken, zmenaGravitacieHore);
        this.physics.add.overlap(onlinePlayer, onlineBronzMince, zberBronz);
        this.physics.add.overlap(onlinePlayer, onlineZlateMince, zberZlato);
        this.physics.add.overlap(onlinePlayer, onlineSpike, spikeHit);
        this.physics.add.collider(onlinePlayer, onlineLava, instaDeath, null, this);
        this.physics.add.overlap(onlinePlayer, onlineDeathToken, instaDeath, null, this);
        this.physics.add.collider(onlinePlayer, onlineEnemy, nepriatelVsHrac, null, this);
    
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

        onlineZlateMince.playAnimation('goldCoinRotate');
        onlineBronzMince.playAnimation('bronzCoinRotate');

        kamera.startFollow(onlinePlayer, false, 1, 1, -500/velkostZoom, 50);
        kamera.setZoom(velkostZoom);
        kamera.setViewport(0,0, config.scale.width, config.scale.height);

    },
    update(){

        if( (!onlinePlayer.body.touching.down && !zmenenaGravitacia) || (zmenenaGravitacia && !onlinePlayer.body.touching.up)) skok = true;
        
        if(skok && onlinePlayer.body.touching.down || (zmenenaGravitacia && onlinePlayer.body.touching.up && skok)){
            skok = false;
            if(zmenenaGravitacia) emitterSkok.explode(10, onlinePlayer.x, onlinePlayer.y - 29);
            else emitterSkok.explode(10, onlinePlayer.x, onlinePlayer.y + 29 );
            console.log("skocil si a uz si dopadol");
        }

        let j;
        for(let i = 0; i < pocetZivotov/2; i++){
            if(i == 0) j = -25; //-25 player 
            if(zmenenaGravitacia) zivotyPole[i].y = onlinePlayer.y + 50;
            else zivotyPole[i].y = onlinePlayer.y - 50;
            zivotyPole[i].x = onlinePlayer.x + j;
            j += 25; //origo 35
        }
        if(onlinePlayer.y > config.scale.height + 15 || onlinePlayer.y < -10) pocetZivotov = 0; 

        //kamera.setViewport(-((cisloPozadia - 1) * (config.scale.width) + 1),0, config.scale.width, config.scale.height);

        zobrazenieSkore.setText('Skore: ' + skore);
        zobrazenieSkore.x = 15 + kamera.scrollX;
        
        if(pocetZivotov <= 0){
            onlinePlayer.destroy();
            this.scene.pause();
            this.scene.launch('deathMenu', {score: skore, key: this.scene.key});
        }

        if(onlinePlayer.x >= onlineVlajka.x && onlinePlayer.y >= onlineVlajka.y){
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
                vytvorenieHoreTokenOnlineLevel();
                vytvorenieDoleTokenOnlineLevel();
                if(pocetZivotov%2 == 0){
                   zivotyPole[pocetZivotov/2].destroy();
                }
                origoZivoty = pocetZivotov;
            }
            pocetZivotov = pocetZivotov - pocetZivotov%2;
            
        }

        if(onlinePlayer.x + 0.5 >=  ((config.scale.width) * cisloPozadia)){
            //kamera.setPosition(-((config.scale.width) * cisloPozadia), 0);
            cisloPozadia++;
            if(cisloPozadia >= 3) cisloPozadia = 3;
        } 
        if(onlinePlayer.x - 0.5 <= (config.scale.width * cisloPozadia - config.scale.width)){
            cisloPozadia--;
            if(cisloPozadia <= 1) cisloPozadia = 1;
        }

        pohybHraca(onlinePlayer, emitterDoStran);

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

function pridanieElementu(element, group){
    if(element.textureKey == "platform" || element.textureKey == "lava"){ //hodnoty 100 a 25 su vyska a sirka povodneho img platformy a lavy
        group.create(element.x, element.y, element.textureKey).setSize(100 * element.scale.x, 25 * element.scale.y).setDisplaySize(100 * element.scale.x, 25 * element.scale.y).setVisible(true);
    }
    else if(element.textureKey == "spike"){
        group.create(element.x, element.y, element.textureKey).setFlipY(element.flipY).setVisible(true);
    }
    else if(element.textureKey == "enemy"){
        if(element.flipY && element.flipX) group.create(element.x, element.y, 'enemy').setFlip(element.flipX, element.flipY).setGravityY(-600).setVelocityX(100).setVisible(true);
        else if(element.flipY && !element.flipX) group.create(element.x, element.y, 'enemy').setFlip(element.flipX, element.flipY).setGravityY(-600).setVelocityX(-100).setVisible(true);
        else if (!element.flipY && element.flipX) group.create(element.x, element.y, 'enemy').setFlip(element.flipX, element.flipY).setVelocityX(100).setVisible(true);
        else group.create(element.x, element.y, 'enemy').setFlip(element.flipX, element.flipY).setVelocityX(-100).setVisible(true);
        
    }
    else{
        group.create(element.x, element.y, element.textureKey).setVisible(true);
    }
}

function vytvorenieHoreTokenOnlineLevel(){
    if(horeTokenExistujeOnline){
        console.log("hore: " + horeTokenExistujeOnline);
        for(let i = horeTokenPrvyIndex; i <= horeTokenPrvyIndex + pctHoreToken -1 ; i++){
            onlineHoreToken.create(arr.entries[i].x, arr.entries[i].y, 'upArrow');
        }
    }
}

function vytvorenieDoleTokenOnlineLevel(){
    if(doleTokenExistujeOnline){
        console.log("dole: " + doleTokenExistujeOnline);
        for(let i = doleTokenPrvyIndex; i <= doleTokenPrvyIndex + pctDoleToken - 1; i++){
            onlineDoleToken.create(arr.entries[i].x, arr.entries[i].y, 'downArrow');
        }
    }
}