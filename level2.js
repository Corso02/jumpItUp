//kedze do tohto levelu sa dostat iba ked sa prejde prvy level, to znamena ze polozky su nacitane, nepotrebujem ich znovu nacitavat 
class Level2 extends Phaser.Scene{
    constructor(){
        super({key: "Level2"});
    }
    preload(){
        // this.load.image('background', 'images/backgorund');
        // this.load.spritesheet('player', 'images/dude.png' ,  { frameWidth: 32, frameHeight: 48 } );
        // this.load.image('platform', 'images/platformBeta.png');
        // this.load.image('bronzMinca', 'images/bronzCoinBeta.png');
        // this.load.image('zlataMinca', 'images/goldCoinBeta.png');
        // this.load.image('spike', 'images/spikesBeta.png');
        // this.load.image('instaDeath', 'images/instaDeathBeta.png');
        // this.load.image('enemy', 'images/enemyBeta.png');
        // this.load.image('vlajka', 'images/flagBeta.png');
        // this.load.image('lava', 'images/lava2Beta.png');
        this.load.image('upArrow', 'images/upArrow.png');
        this.load.image('downArrow', 'images/downArrow.png');
        // this.load.image('heart', 'images/heartBeta.png');

    }
    create(){
        cisloPozadia = 1;

        if(fullOn == true){
            this.scale.startFullscreen();
        }
        for(let i = 1; i < 7; i++){
            this.add.image(((config.scale.width)/2)*i, (config.scale.height/2) , 'background').setDisplaySize(config.scale.width, config.scale.height);
            i++;
        }
        let posun = 0;
        if(window.innerWidth < 1366) posun = config.scale.width - config.scale.width*(mierkaSirka/100);

        kamera = this.cameras.main;
        kamera.setBounds(0,0, (config.scale.width*3) + posun, config.scale.height);

        platformy = this.physics.add.staticGroup();
        //cisloPozadia = 1;
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
        zivoty = this.physics.add.staticGroup();

        skore = 0;
        if(hardDif == true){ 
            pocetZivotov = 1;
            zivoty.create(150, 15, 'heart').setDisplaySize(20,15);
        }
        if(easyDif == true) {
            pocetZivotov = 6;
            zivoty.create(150, 15, 'heart').setDisplaySize(20,15);
            zivoty.create(185, 15, 'heart').setDisplaySize(20,15);
            zivoty.create(220, 15, 'heart').setDisplaySize(20,15);
        }
        zivotyPole = zivoty.getChildren();

        zobrazenieSkore = this.add.text(15 , 0, skore, {font: "15px pixel", color: "black"});
        //zobrazeniePoctuZivotov = this.add.text((config.scale.width) - 150, 20, pocetZivotov);
        origoZivoty = pocetZivotov;

        player = this.physics.add.sprite(50, config.scale.height - 150, 'player');
        player.setBounce(0.2);
        playerOriginX = player.x;
        playerOriginY = player.y;

        this.physics.add.collider(player, platformy);
        this.physics.add.collider(nepriatelia, platformy, nepriatelZmenaSmeru, null, this);
        this.physics.add.collider(nepriatelia, platformy);
        this.physics.add.overlap(player, bronzMince, zberBronz, null, this);
        this.physics.add.overlap(player, ostne, spikeHit, null, this);
        this.physics.add.overlap(player, zlateMince, zberZlato, null, this);
        this.physics.add.overlap(player, instaDeathToken, instaDeath, null, this);
        this.physics.add.collider(player, nepriatelia, nepriatelVsHrac, null, this);
        this.physics.add.collider(player, lava, instaDeath, null, this);
        this.physics.add.overlap(player, zmenaGravitacieHoreToken, zmenaGravitacieHore, null, this);
        this.physics.add.overlap(player, zmenaGravitacieDoleToken, zmenaGravitacieDole, null, this);

        ovladaniePomocouSipok = this.input.keyboard.createCursorKeys();

        klavesnica = this.input.keyboard.addKeys('CTRL, SPACE, A, D, SHIFT, ESC, R, M');

        platformy.create(0, config.scale.height/2, 'platform').setSize(1, config.scale.height).setDisplaySize(1, config.scale.height);
       // platformy.create(config.scale.width*3, config.scale.height/2, 'platform').setSize(1, config.scale.height).setDisplaySize(1, config.scale.height);

       vlajka = this.physics.add.staticImage(config.scale.width*3 - 30, config.scale.height - 125, 'vlajka').setSize(50,125).setDisplaySize(50,125);

        this.vytvortPrvuObrazovku();
        this.vytvorDruhuObrazovku();
        this.vytvorTretiuObrazovku();

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
        })

        bronzMince.playAnimation('bronzCoinRotate');
        zlateMince.playAnimation('goldCoinRotate');

        kamera.startFollow(player, false, 1, 1, -500/velkostZoom, 50);
        kamera.setZoom(velkostZoom);
        kamera.setViewport(0,0, config.scale.width, config.scale.height);

        klavesnica.M.on('down', function(){
            console.log(player);
        });
        
    }
    update(){

        if( (!player.body.touching.down && !zmenenaGravitacia) || (zmenenaGravitacia && !player.body.touching.up)) skok = true;

        if(skok && player.body.touching.down || (skok && zmenenaGravitacia && player.body.touching.up)){
            skok = false;
            if(zmenenaGravitacia) emitterSkok.explode(10, player.x, player.y - 29);
            else emitterSkok.explode(10, player.x, player.y + 29 );
            console.log("skocil si a uz si dopadol");
        }

        let j;
        for(let i = 0; i < pocetZivotov/2; i++){
            if(i == 0) j = -25; //-25 player 
            if(zmenenaGravitacia) zivotyPole[i].y = player.y + 50;
            else zivotyPole[i].y = player.y - 50;
            zivotyPole[i].x = player.x + j;
            j += 25; //origo 35
        }
        if(player.y > config.scale.height + 15 || player.y < -10) pocetZivotov = 0; 

        if(player.x >= vlajka.x && player.y >= vlajka.y){
            this.scene.pause();
            this.scene.launch('winScreen', {key: this.scene.key, score: skore});
        }

        //kamera.setViewport(-((cisloPozadia - 1) * (config.scale.width) + 1),0, config.scale.width, config.scale.height);

        zobrazenieSkore.setText('Skore: ' + skore);
        zobrazenieSkore.x = 15 + kamera.scrollX;

        //zobrazeniePoctuZivotov.x = (config.scale.width)*cisloPozadia - config.scale.width + 150;
        
        if(pocetZivotov <= 0){
            player.destroy();
            this.scene.pause();
            this.scene.launch('deathMenu', {score: skore, key: this.scene.key});
        }

        if(easyDif == true){
            if(pocetZivotov == 0){ 
                let j = origoZivoty/2 - 1;
                for(let i = j; i >= 0; i--){
                    zivotyPole[i].destroy();
                }
            }
            else if(origoZivoty != pocetZivotov){
                switch(cisloPozadia){
                    case 1: this.vytvorTokenyPrvaObrazovka();
                            break;
                    case 2: this.vytvorTokenyDruhaObrazovka();
                            break;
                    case 3: this.vytvorTokenyTretiaObrazovka();
                }
                if(pocetZivotov%2 == 0){
                   zivotyPole[pocetZivotov/2].destroy();
                }
                origoZivoty = pocetZivotov;
            }
            pocetZivotov = pocetZivotov - pocetZivotov%2;
            
        }

        if(player.x + 0.5 >=  ((config.scale.width) * cisloPozadia)){
            //kamera.setPosition(-((config.scale.width) * cisloPozadia), 0);
            cisloPozadia++;
            if(cisloPozadia >= 3) cisloPozadia = 3;
        } 
        if(player.x - 0.5 <= (config.scale.width * cisloPozadia - config.scale.width)){
            cisloPozadia--;
            if(cisloPozadia <= 1) cisloPozadia = 1;
        }


        
        if(klavesnica.ESC.isDown){
            klavesnica.ESC.isDown = false;
            this.scene.pause();
            this.scene.launch('PauseMenu', {key: this.scene.key});
        }

        if(klavesnica.R.isDown){
            klavesnica.R.isDown = false;
            this.scene.restart();
        }
        
        if(prepnutieTabu){
            this.scene.pause();
            this.scene.launch('PauseMenu', {key: this.scene.key});
        }

        pohybHraca(player, emitterDoStran);
    }
    vytvortPrvuObrazovku(){
        this.vytvorPlatformyPrvaObrazovka();
        this.vytvorTokenyPrvaObrazovka();
        this.vytvorPrekazkyPrvaObrazovka();
        this.vytvorCollectiblePrvaObrazovka();
    }
    vytvorDruhuObrazovku(){
        this.vytvorPlatformyDruhaObrazovka();
        this.vytvorPrekazkyDruhaObrazovka();
        this.vytvorTokenyDruhaObrazovka();
        this.vytvorCollectibleDruhaObrazovka();
    }
    vytvorTretiuObrazovku(){
        this.vytvorPlatformyTretiaObrazovka();
        this.vytvorPrekazkyTretiaObrazovka();
        this.vytvorCollectibleTretiaObrazovka();
        this.vytvorTokenyTretiaObrazovka();
    }
    vytvorPlatformyPrvaObrazovka(){
        //pociatocna platforma
        platformy.create(175, config.scale.height-100, 'platform').setSize(350,25).setDisplaySize(350,25);
        //nad lavou
        platformy.create(config.scale.width/2 - 135, config.scale.height-350, 'platform').setSize(350,25).setDisplaySize(350,25);
        //zvisle vedla lavy
        platformy.create(335, config.scale.height-50, 'platform').setSize(25,125).setDisplaySize(25,125);
        platformy.create(config.scale.width/2 + 75, config.scale.height-50, 'platform').setSize(25,125).setDisplaySize(25,125);
        //nad zaciatocnou
        platformy.create(175, config.scale.height - 500, 'platform').setSize(250, 25).setDisplaySize(250,25);
        //horne schpdy
        platformy.create(config.scale.width/2 + 175, config.scale.height - 500, 'platform').setSize(250,25).setDisplaySize(250,25);
        platformy.create(config.scale.width/2 + 475, config.scale.height - 600, 'platform').setSize(200,25).setDisplaySize(200,25);
        //schody
        platformy.create(config.scale.width/2 + 185, config.scale.height - 100, 'platform').setSize(200,25).setDisplaySize(200,25);
        platformy.create(config.scale.width/2 + 385, config.scale.height - 75, 'platform').setSize(200,25).setDisplaySize(200,25);
        platformy.create(config.scale.width/2 + 585, config.scale.height - 50, 'platform').setSize(200,25).setDisplaySize(200,25);
    }
    vytvorTokenyPrvaObrazovka(){
        zmenaGravitacieHoreToken.create(config.scale.width/4 - 15, config.scale.height - 140, 'upArrow');
        zmenaGravitacieHoreToken.create(config.scale.width/2 + 15, config.scale.height - 400, 'upArrow');

        zmenaGravitacieDoleToken.create(275, config.scale.height - 460, 'downArrow');
        zmenaGravitacieDoleToken.create(config.scale.width/2 + 15, config.scale.height - 310, 'downArrow');
        zmenaGravitacieDoleToken.create(config.scale.width/2 + 550, config.scale.height - 560, 'downArrow');
    }
    vytvorPrekazkyPrvaObrazovka(){
        lava.create(config.scale.width/2 - 135, config.scale.height - 10, 'lava').setSize(400, 50).setDisplaySize(400,50);
        
        //pociatocna
        ostne.create(config.scale.width/4 - 100, config.scale.height - 125, 'spike');
        //nad pociatoconou
        ostne.create(config.scale.width/4 - 150, config.scale.height - 475, 'spike').setFlipY(true);
        //nad lavou
        let j = 235;
        for(let i = 0; i < 5; i++){
            if(i%2 == 0)  ostne.create(config.scale.width/2 - j, config.scale.height - 325, 'spike').setFlipY(true);
            else  ostne.create(config.scale.width/2 - j, config.scale.height - 375, 'spike');
            j -= 50;
        }
        //horne schody
        ostne.create(config.scale.width/2 + 100, config.scale.height - 475, 'spike').setFlipY(true);
        ostne.create(config.scale.width/2 + 250, config.scale.height - 475, 'spike').setFlipY(true);
        ostne.create(config.scale.width/2 + 425, config.scale.height - 575, 'spike').setFlipY(true);
        //schody
        ostne.create(config.scale.width/2 + 270, config.scale.height - 125, 'spike');
        ostne.create(config.scale.width/2 + 470, config.scale.height - 100, 'spike');
        ostne.create(config.scale.width/2 + 660, config.scale.height - 75, 'spike');
    }

    vytvorCollectiblePrvaObrazovka(){
        //pociatocna
        bronzMince.create(config.scale.width/4 - 175, config.scale.height - 150, 'bronzMinca');
        //nad pociatocnou
        bronzMince.create(config.scale.width/4 - 200, config.scale.height - 465, 'bronzMinca');
        //nad lavou
        let j = 235;
        for(let i = 0; i < 4; i++){
            if(i%2 == 0) bronzMince.create(config.scale.width/2 - j, config.scale.height - 400, 'bronzMinca');
            else bronzMince.create(config.scale.width/2 - j, config.scale.height - 300, 'bronzMinca');
            j -= 50;
        }
        //horne schody
        bronzMince.create(config.scale.width/2 + 175, config.scale.height - 450, 'bronzMinca');
        zlateMince.create(config.scale.width/2 + 485, config.scale.height - 560, 'zlataMinca');
        //schody
        bronzMince.create(config.scale.width/2 + 195, config.scale.height - 150, 'bronzMinca');
        bronzMince.create(config.scale.width/2 + 395, config.scale.height - 125, 'bronzMinca');
        bronzMince.create(config.scale.width/2 + 585, config.scale.height - 100, 'bronzMinca');
    }

    vytvorPlatformyDruhaObrazovka(){
        //spodne
        platformy.create((config.scale.width*2) - config.scale.width + 150, config.scale.height-50, 'platform').setSize(300,25).setDisplaySize(300,25);
        let j = 500;
        for(let i = 0; i < 3; i++){
            platformy.create(config.scale.width*2 - config.scale.width + j, config.scale.height - 50, 'platform').setSize(200,25).setDisplaySize(200,25);
            j += 350;
        }
        //hore kde behaju
        platformy.create(config.scale.width*2 - config.scale.width/2, config.scale.height/2 - 175, 'platform').setSize(800,25).setDisplaySize(800,25);
        platformy.create(config.scale.width*2 - config.scale.width/2 - 400, config.scale.height/2 - 137, 'platform').setSize(25,100).setDisplaySize(25,100);
        platformy.create(config.scale.width*2 - config.scale.width/2 + 400, config.scale.height/2 - 137, 'platform').setSize(25,100).setDisplaySize(25,100);
        //uplne hore
        platformy.create(config.scale.width*2 - config.scale.width/2, 20, 'platform').setSize(825,20).setDisplaySize(825,20);
    }
    vytvorPrekazkyDruhaObrazovka(){
        nepriatelia.create(config.scale.width*2 - config.scale.width/2 - 350, config.scale.height/2 - 100,'enemy').setVelocityX(100).setGravityY(-600).setFlipY(true);
        nepriatelia.create(config.scale.width*2 - config.scale.width/2 + 350, config.scale.height/2 - 100, 'enemy').setVelocityX(-100).setGravityY(-600).setFlipY(true).setFlipX(true);
        //spodne
        let j = 413;
        for(let i = 0; i < 6; i++){
            ostne.create(config.scale.width*2 - config.scale.width + j, config.scale.height - 75, 'spike');
            j += 175;
        }
        //uplne hore
        j = 350;
        for(let i = 0; i < 8; i++){
            ostne.create(config.scale.width*2 - config.scale.width + j, 43, 'spike').setFlipY(true);
            j += 100;
        }
    }
    vytvorTokenyDruhaObrazovka(){
        zmenaGravitacieHoreToken.create(config.scale.width*2 - config.scale.width + 275, config.scale.height - 100, 'upArrow');
        zmenaGravitacieDoleToken.create(config.scale.width*2 - config.scale.width/2 + 400, config.scale.height/2 - 37, 'downArrow');
        zmenaGravitacieDoleToken.create(config.scale.width*2 - config.scale.width/2 + 400, 90, 'downArrow');
    }

    vytvorCollectibleDruhaObrazovka(){
        let j = 500;
        for(let i = 0; i < 3; i++){
            bronzMince.create(config.scale.width*2 - config.scale.width + j, config.scale.height - 100, 'bronzMinca');
            j += 350;
        }
        bronzMince.create(config.scale.width*2 - config.scale.width/2, config.scale.height/2 - 125, 'bronzMinca');
        bronzMince.create(config.scale.width*2 - config.scale.width/2 - 200, config.scale.height/2 - 125, 'bronzMinca');
        bronzMince.create(config.scale.width*2 - config.scale.width/2 + 200, config.scale.height/2 - 125, 'bronzMinca');

        j = 400; 
        for(let i = 0; i < 6; i++){
            zlateMince.create(config.scale.width*2 - config.scale.width + j, 90, 'zlataMinca');
            j += 100;
        }
    }
    vytvorPlatformyTretiaObrazovka(){
        //spodne a horne
        let j = 100;
        for(let i = 0; i < 5; i++){
            platformy.create(config.scale.width*3 - config.scale.width + j, config.scale.height - 50, 'platform').setSize(200,25).setDisplaySize(200,25);
            platformy.create(config.scale.width*3 - config.scale.width + j, 50, 'platform').setSize(200,25).setDisplaySize(200,25);
            j += 300;
        }
        //stred
        j = 260;
        for(let i = 0; i < 4; i++){
            platformy.create(config.scale.width*3 - config.scale.width + j, config.scale.height/2, 'platform').setSize(200,25).setDisplaySize(200,25);
            j += 300;
        }
    }
    vytvorPrekazkyTretiaObrazovka(){
        let j = 187;
        for(let i = 0; i < 4; i++){
            ostne.create(config.scale.width*3 - config.scale.width + j, config.scale.height - 75, 'spike');
            j += 300;
        }
        j = 260;
        for(let i = 0; i < 4; i++){
            ostne.create(config.scale.width*3 - config.scale.width + j, config.scale.height/2 - 25, 'spike');
            j += 300;
        }
        j = 100;
        for(let i = 0; i < 5; i++){
            ostne.create(config.scale.width*3 - config.scale.width + j, 75, 'spike').setFlipY(true);
            j += 300;
        }
    }
    vytvorCollectibleTretiaObrazovka(){
        //spodne
        let j = 400;
        for(let i = 0; i < 3; i++){
            bronzMince.create(config.scale.width*3 - config.scale.width + j, config.scale.height - 100, 'bronzMinca');
            j += 300;
        }
        //stred zdola
        j = 260; 
        for(let i = 0; i < 4; i++){
            bronzMince.create(config.scale.width*3 - config.scale.width + j, config.scale.height/2 + 50, 'bronzMinca');
            j += 300;
        }
        //horne
        j = 40;
        for(let i = 0; i < 4; i++){
            bronzMince.create(config.scale.width*3 - config.scale.width + j, 80, 'bronzMinca');
            j += 300;
        }
        //stred zhora
        j = 200;
        for(let i = 0; i < 8; i++){
            if(i%2 == 0) bronzMince.create(config.scale.width*3 - config.scale.width + j, config.scale.height/2 - 50, 'bronzMinca');
            else{
                bronzMince.create(config.scale.width*3 - config.scale.width + j + 120, config.scale.height/2 - 50, 'bronzMinca');
                j += 300;
            }
        }
        zlateMince.create(config.scale.width*3 - config.scale.width + 1240, 80, 'zlataMinca');
    }
    vytvorTokenyTretiaObrazovka(){
       zmenaGravitacieHoreToken.create(config.scale.width*3 - config.scale.width + 150, config.scale.height - 100, 'upArrow');
       zmenaGravitacieDoleToken.create(config.scale.width*3 - 20, 100, 'downArrow'); 
    }
}