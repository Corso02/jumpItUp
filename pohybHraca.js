function skokyHraca(player){
    //velky vyskok
    if(pocetZivotov > 0){
        if((ovladaniePomocouSipok.up.isDown && player.body.touching.up && klavesnica.CTRL.isDown && zmenenaGravitacia == true) || (klavesnica.SPACE.isDown && player.body.touching.up && klavesnica.CTRL.isDown && zmenenaGravitacia == true)){
            player.setVelocityY(500);
        } 
        
        else if((ovladaniePomocouSipok.up.isDown && player.body.touching.down && klavesnica.CTRL.isDown) || (klavesnica.SPACE.isDown && player.body.touching.down && klavesnica.CTRL.isDown )){
            player.setVelocityY(-500); 
        }
        
        else if((ovladaniePomocouSipok.up.isDown && player.body.touching.up && klavesnica.SHIFT.isDown && zmenenaGravitacia == true) || (klavesnica.SPACE.isDown && player.body.touching.up && klavesnica.SHIFT.isDown && zmenenaGravitacia == true )){
            player.setVelocityY(150);
        }

        //maly vyskok
         else if((ovladaniePomocouSipok.up.isDown && player.body.touching.down && klavesnica.SHIFT.isDown) || (klavesnica.SPACE.isDown && player.body.touching.down && klavesnica.SHIFT.isDown )){
            player.setVelocityY(-150);
        }

        else if((ovladaniePomocouSipok.up.isDown && player.body.touching.up && zmenenaGravitacia == true) || (klavesnica.SPACE.isDown && player.body.touching.up && zmenenaGravitacia == true)){
            player.setVelocityY(330);
        }
        //klasicky skok
       /* else if( (ovladaniePomocouSipok.up.isDown && player.body.touching.down && window.innerHeight >= 800) || (klavesnica.SPACE.isDown && player.body.touching.down && window.innerHeight >= 800) ){
            player.setVelocityY(-390);
        }*/
        else if((ovladaniePomocouSipok.up.isDown && player.body.touching.down) || (klavesnica.SPACE.isDown && player.body.touching.down)){
            player.setVelocityY(-330);
        }
    }
}

function pohybDoStran(player, emitter){
    if(player.y < config.scale.height && player.y > 0 && pocetZivotov > 0){
        if(ovladaniePomocouSipok.left.isDown || klavesnica.A.isDown){
            if(player.body.touching.down) emitter.setVisible(true);
            else emitter.setVisible(false);
            player.anims.play('left', true);
            //player.setFlipX(false);
            player.setVelocityX(-160);
            emitter.setPosition(player.x + 5, player.y + 29);
            //kamera.setPosition(0);
            /*if(cisloPozadia <= 3 && player.x >= (((config.scale.width) * cisloPozadia)/((config.scale.width) * cisloPozadia)) ){
                cisloPozadia--;
                if(cisloPozadia <= 1) cisloPozadia = 1;
            }*/
        }

        else if(ovladaniePomocouSipok.right.isDown || klavesnica.D.isDown){
           if(player.body.touching.down) emitter.setVisible(true);
           else emitter.setVisible(false);
            player.anims.play('right', true);
            //player.setFlipX(true);
            player.setVelocityX(160);
            emitter.setPosition(player.x - 5, player.y + 29);
        }

        else{
            player.anims.play('turn', true);
            player.setVelocityX(0);
            emitter.setVisible(false);
        }
    }
}

function pohybHraca(player, emitter){
    skokyHraca(player);
    pohybDoStran(player, emitter);
}

function zastavenieHracaPoPauze(){
    ovladaniePomocouSipok.left.isDown = false;
    klavesnica.A.isDown = false;
    ovladaniePomocouSipok.right.isDown = false;
    klavesnica.D.isDown = false;
}