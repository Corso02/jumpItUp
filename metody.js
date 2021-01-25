function zberBronz(player, minca){
    minca.destroy();
    skore = skore + 5;
  }

function  zberZlato(player, minca){
      minca.destroy();
      skore = skore + 20;
  }
  function spikeHit(player, osten){
      player.enableBody = false;
      player.x = (config.scale.width)*cisloPozadia - config.scale.width + playerOriginX;
      player.y = playerOriginY;
      player.body.setGravityY(0);
      player.body.setVelocityX(0);
      player.body.setVelocityY(0);
      player.setFlipY(false);
      pocetZivotov--;
      zmenenaGravitacia = false;
  }
  function instaDeath(){
      pocetZivotov = 0;
  }
  function nepriatelVsHrac(player, nepriatel){
      if((player.y + 48) < nepriatel.y && zmenenaGravitacia == false) nepriatel.destroy();
      else if((player.y - 48) > nepriatel.y && zmenenaGravitacia == true) nepriatel.destroy();
      else pocetZivotov = 0;
  }

  function nepriatelZmenaSmeru(nepriatel){
      if(nepriatel.body.velocity.x <= 0) nepriatel.setVelocityX(-100);
      else nepriatel.setVelocityX(100);    
  }

  function zmenaGravitacieHore(player, token){
    token.destroy();
    player.body.setGravityY(-600);
    player.setVelocityY(-1);
    player.setFlipY(true);
    zmenenaGravitacia = true;
  }

  function zmenaGravitacieDole(player, token){
      token.destroy();
      player.body.setGravityY(0);
      player.setVelocityY(1);
      player.setFlipY(false);
      zmenenaGravitacia = false;
  }

  function remove(trashCan, obj){
     if(otvoreneMenu){ //this is to make sure that my editor menu is opened
        obj.destroy();
        obj = undefined;
    }
  }

  function enemyZmenaSmeru(enemy){
    if(enemy.body.touching.right || enemy.body.touching.left){
        console.log('zmena enemy');
        if(enemy.FlipY) enemy.setVelocityY(0);
        enemy.setFlipX(!enemy.flipX);
        if(enemy.body.velocity.x <= 0) enemy.setVelocityX(-100);
        else enemy.setVelocityX(100);
    }
  }