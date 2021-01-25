class Level1 extends Phaser.Scene{
    constructor(){
        super({key: "Level1"});
    }

    preload(){
        this.load.image('background', 'images/background.png');
        this.load.spritesheet('player', 'images/playerFin.png' ,  { frameWidth: 36, frameHeight: 60 } );
        this.load.image('platform', 'images/platformBeta.png');
        this.load.spritesheet('bronzMinca', 'images/bronzCoin.png', {frameWidth: 24, frameHeight: 22});
        this.load.spritesheet('zlataMinca', 'images/goldCoin.png', {frameWidth: 24, frameHeight: 22});
        this.load.image('spike', 'images/spikesBeta.png');
        this.load.image('instaDeath', 'images/instaDeathBeta.png');
        this.load.image('enemy', 'images/enemyBeta.png');
        this.load.image('vlajka', 'images/flagBeta.png');
        this.load.image('lava', 'images/lava2Beta.png');
        this.load.image('heart', 'images/heartBeta.png');
        this.load.image('particle', 'images/particle.png');
    }

    create(){
        zmenenaGravitacia = false;
        
        if(fullOn == true){
            this.scale.startFullscreen();
        } 
        let posun = 0;
        if(window.innerWidth < 1366) posun = config.scale.width - config.scale.width*(mierkaSirka/100);

        kamera = this.cameras.main;
        kamera.setBounds(0,0, ((config.scale.width*3) + posun), config.scale.height);
    
        //musi byt 7 a potom pripocitavat 2 k 'i' lebo cez 'add' a ptm suradnicami urcujem kam ma byt ulozeny stred obrazku
        for(let i = 1; i < 7; i++){
            this.add.image(((config.scale.width)/2)*i, (config.scale.height/2) , 'background').setDisplaySize(config.scale.width, config.scale.height);
            i++;
        }

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
        zivoty = this.physics.add.staticGroup();

        skore = 0;
        if(hardDif == true){ 
            pocetZivotov = 1;
            zivoty.create(150, 15, 'heart').setDisplaySize(20,15);
        }
        if(easyDif == true) {
            pocetZivotov = 6;
            zivoty.create(150, 15, 'heart').setDisplaySize(20,15); //origo 30,25
            zivoty.create(185, 15, 'heart').setDisplaySize(20,15);
            zivoty.create(220, 15, 'heart').setDisplaySize(20,15);
        }
        zivotyPole = zivoty.getChildren();

        zobrazenieSkore = this.add.text(15 , 0, skore, {font: "15px pixel", color: "black"});
        origoZivoty = pocetZivotov;

        this.vytvorPlatformy();
        this.vytvorCollectible();
        this.vytvorPrekazky();

        //vytvorim si hraca
        player = this.physics.add.sprite(20, config.scale.height - 150, 'player');
       // player = new Player(this);
        //player.setCollideWorldBounds(true);
        //player.setBounce(0.2);
        playerOriginX = player.x;
        playerOriginY = player.y;

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

        bronzMince.playAnimation('bronzCoinRotate');
        zlateMince.playAnimation('goldCoinRotate');

        
        //aby hrac stal a narazal do platforiem        
        this.physics.add.collider(player, platformy);
        this.physics.add.collider(nepriatelia, platformy, nepriatelZmenaSmeru, null, this);
        this.physics.add.collider(nepriatelia, platformy);
        this.physics.add.overlap(player, bronzMince, zberBronz, null, this);
        this.physics.add.overlap(player, ostne, spikeHit, null, this);
        this.physics.add.overlap(player, zlateMince, zberZlato, null, this);
        this.physics.add.overlap(player, instaDeathToken, instaDeath, null, this);
        this.physics.add.collider(player, nepriatelia, nepriatelVsHrac, null, this);
        this.physics.add.collider(player, lava, instaDeath, null, this);
        
        ovladaniePomocouSipok = this.input.keyboard.createCursorKeys();

        klavesnica = this.input.keyboard.addKeys('CTRL, SPACE, A, D, SHIFT, ESC, R, M');

        //podstava
        platformy.create(( (config.scale.width)*3)/2 , config.scale.height, 'platform').setDisplaySize(config.scale.width*3, config.scale.height/10).refreshBody();

        //collider hraca a hranic sveta je vypnuty kvoli tomu, aby som sa vedel pohybovat medzi jednotlivymi obrazovkami, preto musim na zaciatok, koniec a strop dat platformu
        //s hrubkou 1px, tym padom hrac nebude vediet vypadnut zo sveta 
        platformy.create(0, config.scale.height/2, 'platform').setSize(2, config.scale.height).setDisplaySize(2, config.scale.height);
        platformy.create(config.scale.width*3, config.scale.height/2, 'platform').setSize(2, config.scale.height).setDisplaySize(2, config.scale.height);
        platformy.create(config.scale.width*1.5, 0, 'platform').setSize(config.scale.width*3, 2).setDisplaySize(config.scale.width*3,2);

        vlajka = this.physics.add.staticImage(config.scale.width*3 - 50, config.scale.height - config.scale.height/20 - 62.5, 'vlajka').setSize(50,125).setDisplaySize(50,125);
        /*
        -------------------------------------------------------------------------------------------------------
        Scale mi urci displaySize a ptm renderovanu velkost riesim cez object.body.center.x/y 
        cize setSize mi meni hodnotu center.x (sirka) a center.y (vyska)
        cez displaySize menim Scale, scaleX(sirka) a scaleY (vyska)
        TENTO FAKT VIES VYUZIT PRI EDITOR a to tak ze dane objekty budu v jednom JSON file, a budes potrebovat iba hodnoty center.x/y a scaleX/Y aby si urcil ich velkost
        --------------------------------------------------------------------------------------------------------
        let haha = this.physics.add.staticImage(0 + 50 ,0 + 50, 'vlajka').setSize(50,50).setDisplaySize(50,50);
        console.log(haha);
        console.log(haha.scaleY);
        console.log(haha.body.center.x);
        let jooj = this.physics.add.staticImage(config.scale.width/2, config.scale.height/2, 'vlajka').setSize(haha.body.center.x, haha.body.center.y).setScale(haha.scaleX, haha.scaleY);
       */
        //test ako dostanem JSON subor z static groupy VYUZITIE: EDITOR (ukladanie levelu)
        /*var grupaPlat = JSON.stringify(platformy.children);
        console.log(grupaPlat);
        console.log('parse:');
        console.log(JSON.parse(grupaPlat));*/
        
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

        klavesnica.M.on('down', function(){
            console.log(player.x);
            //console.log(kamera.y);
        });
        this.input.on('pointerdown', function(pointer){
            console.log(pointer.x);
        })

        kamera.startFollow(player, false, 1, 1, -500/velkostZoom, 50);
        //if(window.innerHeight < 626) kamera.setZoom(1.5);
        kamera.setZoom(velkostZoom);
        kamera.setViewport(0,0, config.scale.width, config.scale.height);
        //kamera.setSize(config.scale.width/velkostZoom, config.scale.height/velkostZoom);
    }

    update(){
        // let playerOldY = 0, playerNewY = 0;
        // playerOldY = playerNewY;
        // playerNewY = player.y;
        //emitterSkok.setPosition(player.x+25, player.y - 25);
        //emitterSkok.setVisible(false);
        if(!player.body.touching.down) skok = true;

        let j;
        for(let i = 0; i < pocetZivotov/2; i++){
            if(i == 0) j = -25; //-25 player 
            /*if(kamera.scrollX < 0) zivotyPole[i].x = 150 + j;
            else zivotyPole[i].x = kamera.scrollX + 150*velkostZoom + j;
            if(kamera.scrollY < 0) zivotyPole[i].y = 20;
            else zivotyPole[i].y = kamera.scrollY + 100*velkostZoom;*/
            //if(kamera.scrollX <= 0) zivotyPole[i].x = 100 + j; nic
            /*zivotyPole[i].x = kamera.scrollX + kamera.width - kamera.width/velkostZoom - kamera.width/velkostZoom/8 + j;
            if(kamera.scrollY <= 0) zivotyPole[i].y = 20;
            else  zivotyPole[i].y = kamera.scrollY + kamera.height - kamera.height/velkostZoom;*/
            zivotyPole[i].y = player.y - 50;
            zivotyPole[i].x = player.x + j;
            //zivotyPole[i].y = /*Math.abs(kamera.scrollY - kamera.height) + 20;*/ kamera.scrollY + 20;
            //zivotyPole[i].x = /*kamera.width*(cisloPozadia) - kamera.width +*/ kamera.scrollX + j;
            //zivotyPole[i].x = config.scale.width*cisloPozadia - config.scale.width + j; nic
            j += 25; //origo 35
        }
        
        if(player.x >= vlajka.x && player.y >= vlajka.y){
            this.scene.pause();
            this.scene.launch('winScreen', {key: this.scene.key, score: skore});
        }
        if(player.y > config.scale.height + 15 || player.y < -10) pocetZivotov = 0;

       // kamera.setViewport(-((cisloPozadia - 1) * (config.scale.width) + 1),0, config.scale.width, config.scale.height);
        
        console.log('cislo pozadia: ' + cisloPozadia);

        //player.enableBody = true;
        //ostne.refresh();
        
        zobrazenieSkore.setText('Skore: ' + skore);
        zobrazenieSkore.x = 15 + kamera.scrollX;

        if(easyDif == true){
            if(pocetZivotov == 0){ //ked mam lubovolny pocet zivotov a pridem naraz o vsetky tak mi zmiznu vsetky srdiecka
                let j = origoZivoty/2 - 1;
                for(let i = j; i >= 0; i--){
                    zivotyPole[i].destroy();
                }
            }
            else if(origoZivoty != pocetZivotov){
                if(pocetZivotov%2 == 0){
                   zivotyPole[pocetZivotov/2].destroy();
                }
                origoZivoty = pocetZivotov;
            }
            pocetZivotov = pocetZivotov - pocetZivotov%2;
        }
        //emitter po skoku
        if(skok && player.body.touching.down){
            skok = false;
            emitterSkok.explode(10, player.x, player.y + 29 );
            console.log("skocil si a uz si dopadol");
        }


        //riadenia pohybu hraca zo suboru pohybHraca.js
        pohybHraca(player, emitterDoStran);
        
        //posun kamery na scene
        if(player.x + 0.5 >=  ((config.scale.width) * cisloPozadia)){
            //kamera.setPosition(-((config.scale.width) * cisloPozadia), 0);
            cisloPozadia++;
            if(cisloPozadia >= 3) cisloPozadia = 3;
        } 
        if(player.x - 0.5 <= (config.scale.width * cisloPozadia - config.scale.width)){
            cisloPozadia--;
            if(cisloPozadia <= 1) cisloPozadia = 1;
        }

        if(pocetZivotov <= 0){
           
            this.scene.pause();
            this.scene.launch('deathMenu', {score: skore, key: this.scene.key});
            player.destroy();
        }
        
        if(klavesnica.ESC.isDown){
            klavesnica.ESC.isDown = false;
            this.scene.pause();
            this.scene.launch('PauseMenu', {key: this.scene.key});
        }
        
        if(klavesnica.R.isDown){
            console.log(player);
            //klavesnica.R.isDown = false;
            //this.scene.restart();
        }
        if(prepnutieTabu){
            this.scene.pause();
            this.scene.launch('PauseMenu', {key: this.scene.key});
        }
    }

    vytvorPlatformy(){
        this.vytvorPlatformyAStenyPrvaObrazovka();
        this.vytvorPlatformyAStenyDruhaObrazovka();
        this.vytvorPlatformyAStenyTretiaObrazovka();
    }
    vytvorCollectible(){
        this.vytvorCollectiblePrvaObrazovka();
        this.vytvorCollectibleDruhaObrazovka();
        this.vytvorCollectibleTretiaObrazovka();
    }
    vytvorPrekazky(){
        this.vytvorPrekazkyPrvaObrazovka();
        this.vytvorPrekazkyDruhaObrazovka();
        this.vytvorPrekazkyTretiaObrazovka();
    }

    vytvorPlatformyAStenyPrvaObrazovka(){
       
        //platformy na prvej obrazovke (1,2,3 = poradie na obrazovke)
        /*1*/platformy.create(( (config.scale.width) - (config.scale.width)/1.5), (config.scale.height - config.scale.height/4), 'platform').setSize(350, 25).setDisplaySize(350, 25);
        /*2*/platformy.create(  (config.scale.width)/11, (config.scale.height - config.scale.height/2.2), 'platform').setSize(250, 25).setDisplaySize(250, 25);
        /*3*/platformy.create(( (config.scale.width)/11), (config.scale.height - config.scale.height/1.2), 'platform').setSize(125,25).setDisplaySize(125,25);
        /*4*/platformy.create(( (config.scale.width)/1.5 - 35), (config.scale.height - config.scale.height/1.2), 'platform').setSize(125, 25).setDisplaySize(125, 25);
        /*5*/platformy.create(( (config.scale.width) - (config.scale.width)/4), config.scale.height/2, 'platform').setSize(250,25).setDisplaySize(250,25);
    }

    vytvorCollectiblePrvaObrazovka(){
        //pridam bronzove mince 
        /*1*/bronzMince.create(( (config.scale.width) - (config.scale.width)/1.5), (config.scale.height - config.scale.height/6.5 + 10), 'bronzMinca');
        /*2*/bronzMince.create(( (config.scale.width)/11 + 112.5), (config.scale.height- config.scale.height/2.2 - 75), 'bronzMinca');
        /*3-5*/
        let j = -70;
        for(let i = 0; i < 3; i++){
            bronzMince.create(( (config.scale.width) - (config.scale.width)/4 + j ), config.scale.height/2 - 50, 'bronzMinca');
            j += 80;
        }

        //pridam zlate mince 
        /*2*/zlateMince.create( (config.scale.width)/11, (config.scale.height - config.scale.height/1.2 - 50), 'zlataMinca');
        /*2*/zlateMince.create(( (config.scale.width)/1.5 - 35), (config.scale.height - config.scale.height/1.2 - 50), 'zlataMinca');

    }

    vytvorPrekazkyPrvaObrazovka(){
        //pridam spikey
       /*1*/ostne.create(( (config.scale.width) - (config.scale.width)/1.5), (config.scale.height - config.scale.height/4 + 25), 'spike').setFlipY(true);
       /*2*/ostne.create(( (config.scale.width) - (config.scale.width)/1.5), (config.scale.height - config.scale.height/20 - 15), 'spike');
       /*3*/ostne.create(( (config.scale.width)/11 + 112.5), (config.scale.height - config.scale.height/2.2 - 25), 'spike');
       /*4*/ostne.create(( (config.scale.width)/11 + 87.5), (config.scale.height - config.scale.height/2.2 - 25), 'spike');
       /*5*/ostne.create(( (config.scale.width)/11 - 50), (config.scale.height - config.scale.height/1.2 - 25), 'spike');
       /*6*/ostne.create(( (config.scale.width)/11 + 50), (config.scale.height - config.scale.height/1.2 - 25), 'spike');
       /*7-9*/
       let j = -110;
       for(let i = 0; i < 3; i++){
           ostne.create(( (config.scale.width) - (config.scale.width)/4 + j), config.scale.height/2 - 25, 'spike');
           j += 80;
       }
       /*10*/ostne.create(( (config.scale.width)/1.5 + 15), (config.scale.height - config.scale.height/1.2 - 25), 'spike');

       //pridam insta death tokeny
       /*1*/instaDeathToken.create(( (config.scale.width) - (config.scale.width)/1.5 - 100), (config.scale.height - config.scale.height/4 - 50), 'instaDeath');
   }

    vytvorPlatformyAStenyDruhaObrazovka(){
        //platformy na druhej obrazovke (1,2,3,4,5,6 = poradie na obrazovke)
      /*1*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/1.1), config.scale.height - config.scale.height/5, 'platform').setSize(180, 25).setDisplaySize(180, 25);
      /*2*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/1.1), config.scale.height - config.scale.height/2, 'platform').setSize(90, 25).setDisplaySize(90, 25);
      /*3*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/1.4), config.scale.height - config.scale.height/1.2, 'platform').setSize(25, 25).setDisplaySize(25, 25);
      /*4*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/1.65), config.scale.height - config.scale.height/1.2, 'platform').setSize(25, 25).setDisplaySize(25, 25); 
      /*5*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/2), config.scale.height - config.scale.height/1.2, 'platform').setSize(25, 25).setDisplaySize(25, 25);
      /*6*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/4.5) - 225, (config.scale.height - config.scale.height/1.5) - 25, 'platform').setSize(25, 75).setDisplaySize(25, 75);
      /*7*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/4.5), config.scale.height - config.scale.height/1.5, 'platform').setSize(450, 25).setDisplaySize(450, 25);
      /*8*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/4.5) + 225, (config.scale.height - config.scale.height/1.5) - 87.5, 'platform').setSize(25, 200).setDisplaySize(25, 200);
      /*9*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/4.5 - 130), config.scale.height/2 + 50, 'platform').setSize(250,25).setDisplaySize(250,25);  
      /*10*/platformy.create(( (config.scale.width)*2 - (config.scale.width)/4.5 - 242), config.scale.height/2 + 25, 'platform').setSize(25,40).setDisplaySize(25,40);
    }


    vytvorCollectibleDruhaObrazovka(){
        //bronzove mince na druhej obrazovke
        bronzMince.create(( (config.scale.width)*2 - (config.scale.width)/1.1), (config.scale.height - config.scale.height/5 - 50), 'bronzMinca');
        bronzMince.create(( (config.scale.width)*2 - (config.scale.width)/1.1), (config.scale.height - config.scale.height/2 - 50), 'bronzMinca');
        bronzMince.create(( (config.scale.width)*2 - (config.scale.width)/1.4), (config.scale.height - config.scale.height/1.2) - 50, 'bronzMinca');
        bronzMince.create(( (config.scale.width)*2 - (config.scale.width)/1.65), (config.scale.height - config.scale.height/1.2) - 50, 'bronzMinca');
        bronzMince.create(( (config.scale.width)*2 - (config.scale.width)/2), (config.scale.height - config.scale.height/1.2) - 50, 'bronzMinca');


        zlateMince.create(( (config.scale.width)*2 - (config.scale.width)/4.5 ) + 200, (config.scale.height - config.scale.height/1.2) - 70, 'zlataMinca');
        zlateMince.create(( (config.scale.width)*2 - (config.scale.width)/4.5 - 130), config.scale.height/2,'zlataMinca');
    }

    vytvorPrekazkyDruhaObrazovka(){
        //pridam nepriatelov
        nepriatelia.create( (config.scale.width)*2 - (config.scale.width/4.5), (config.scale.height - config.scale.height/1.5) - 60, 'enemy').setVelocityX(100);
        nepriatelia.create(( (config.scale.width)*2 - (config.scale.width)/4.5) - 100, (config.scale.height - config.scale.height/1.5) - 60, 'enemy').setVelocityX(-100);

        ostne.create(( (config.scale.width)*2 - (config.scale.width)/1.1 - 75), (config.scale.height - config.scale.height/5 - 25), 'spike');
        ostne.create(( (config.scale.width)*2 - (config.scale.width)/1.1 + 75), (config.scale.height - config.scale.height/5 - 25), 'spike');
        ostne.create(( (config.scale.width)*2 - (config.scale.width)/1.1), config.scale.height/2 + 25, 'spike').setFlipY(true);
        ostne.create(( (config.scale.width)*2 - (config.scale.width)/4.5 - 242), config.scale.height/2 - 8, 'spike');
        ostne.create(( (config.scale.width)*2 - (config.scale.width)/4.5 - 20), config.scale.height/2 + 25, 'spike');
        let j = 0;
        for(let i = 0; i < 10; i++){
            ostne.create(( ((config.scale.width)*2 - (config.scale.width)/1.4 + 25) + j ), (config.scale.height - config.scale.height/20 - 13), 'spike');
            j += 30;
        }
    }
    
    vytvorPlatformyAStenyTretiaObrazovka(){
        platformy.create((config.scale.width)*3 - (config.scale.width)/2 - (config.scale.width)/3 - 15, config.scale.height - config.scale.height/20 - 13, 'platform').setSize(25,50).setDisplaySize(25,50);
        platformy.create((config.scale.width)*3 - (config.scale.width)/2 + (config.scale.width)/3 - 15, config.scale.height - config.scale.height/20 - 13, 'platform').setSize(25,50).setDisplaySize(25,50);
        let j = 40;
        let k = -30;
        for(let i = 0; i < 5; i++){
            platformy.create((config.scale.width)*3 - (config.scale.width)/2 - (config.scale.width)/2.5 + j, config.scale.height - config.scale.height/4 - k, 'platform').setSize(150,25).setDisplaySize(150,25);
            j += 140;
            k += 40;
        }
        platformy.create(( (config.scale.width)*3 - ((config.scale.width)/4*3)), config.scale.height - (config.scale.height/4 * 3) - 15 , 'platform').setSize((config.scale.width)/2,25).setDisplaySize((config.scale.width)/2 ,25);
        platformy.create(( (config.scale.width)*3 - (config.scale.width)/4) + 75, config.scale.height - (config.scale.height/4 * 3) - 15 , 'platform').setSize((config.scale.width)/2 - 50,25).setDisplaySize((config.scale.width)/2 - 50,25);
        
        platformy.create(config.scale.width*3 - config.scale.width/2 - 12.5, config.scale.height - (config.scale.height/4 * 3) - 18.5, 'platform').setSize(25,35).setDisplaySize(25,35);
        platformy.create(config.scale.width*3 - config.scale.width/2 + 112.5, config.scale.height - (config.scale.height/4 * 3) - 18.5, 'platform').setSize(25,35).setDisplaySize(25,35);
        platformy.create(config.scale.width*3 - config.scale.width + 1, config.scale.height - (config.scale.height/4*3) - 18.5, 'platform').setSize(2,35).setDisplaySize(2,35);
    }

    vytvorCollectibleTretiaObrazovka(){
        let j = 40;
        let k = 20;
        for(let i =0; i < 5; i++){
            bronzMince.create((config.scale.width)*3 - (config.scale.width)/2 - (config.scale.width)/2.5 + j, config.scale.height - config.scale.height/4 - k, 'bronzMinca');
            j += 140;
            k += 40;
        }
        zlateMince.create(config.scale.width*3 - config.scale.width + 50, 75, 'zlataMinca');
        zlateMince.create(config.scale.width*3 - 50, 75, 'zlataMinca');
    }

    vytvorPrekazkyTretiaObrazovka(){
        lava.create(config.scale.width*3 - config.scale.width/2 - 15, config.scale.height - config.scale.height/20 - 17, 'lava').setSize(config.scale.width/1.5 - 22, 35).setDisplaySize(config.scale.width/1.5 - 22, 35);
        
        nepriatelia.create(config.scale.width*3 - 60, config.scale.height - (config.scale.height/4 * 3) - 75, 'enemy').setVelocityX(100);
        nepriatelia.create(config.scale.width*3 - config.scale.width + 15, config.scale.height - (config.scale.height/4 * 3) - 75, 'enemy').setVelocityX(100);
    }
} 