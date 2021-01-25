var ovladaniePomocouSipok;
var klavesnica;

class Player extends Phaser.GameObjects.Sprite{
    constructor(scene){

        let x = 0;
        let y = scene.innerHeight/1.5;

        super(scene, x, y, 'player');

        scene.add.existing(this);
        //ovladaniePomocouSipok = this.input.keyboard.createCursorKeys();
        //klavesnica = this.input.keyboard.addKeys('CTRL, SPACE, A, D, SHIFT');
    }
    
    update(){
       /* if(ovladaniePomocouSipok.left.isDown || klavesnica.A.isDown){
            this.setFlipX(true);
            this.setVelocityX(-160);
        }
        else if(ovladaniePomocouSipok.right.isDown || klavesnica.D.isDown){
            this.setFlipX(false);
            this.setVelocityX(160);
        }

        else{
            this.setVelocityX(0);
        }

        if((ovladaniePomocouSipok.up.isDown && this.body.touching.down && klavesnica.CTRL.isDown) || (klavesnica.SPACE.isDown && this.body.touching.down && klavesnica.CTRL.isDown)){
            this.setVelocityY(-500);
            if(window.innerHeight >= 800) this.setVelocityY(-600);
        }

        //maly vyskok
        else if( (ovladaniePomocouSipok.up.isDown && this.body.touching.down && klavesnica.SHIFT.isDown) || (klavesnica.SPACE.isDown && this.body.touching.down && klavesnica.SHIFT.isDown)){
            this.setVelocityY(-130);
            if(window.innerHeight >= 800) this.setVelocityY(-180);
        }

        //klasicky skok
        else if( (ovladaniePomocouSipok.up.isDown && this.body.touching.down) || (klavesnica.SPACE.isDown && this.body.touching.down) ){
            this.setVelocityY(-330);
            if(window.innerHeight >= 800) this.setVelocityY(-440);
        }
        */
    }
}