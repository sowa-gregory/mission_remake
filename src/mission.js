var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: "ffffff",

  fps: 60,
  resolution: 4,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

overlapLadder = 0;

function preload() {
  this.load.image("ladder", "res/ladder.png");
  this.load.spritesheet("player", "res/soldier_small.png", {
    frameWidth: 104,
    frameHeight: 104,
  });



  this.load.tilemapTiledJSON('map', 'res/map.json');
  this.load.image('tiles', 'res/tileset.png');

}

function create() {

  textObj = this.add.text(10, 10, '', { font: '32px Courier', fill: '#ff0000' });

  var map = this.make.tilemap({ key: 'map' });
  var tileset = map.addTilesetImage('tileset', 'tiles');
  var layer = map.createLayer('mission', tileset, 0, 0);

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end:4 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "climb",
    frames: this.anims.generateFrameNumbers("player", { start: 5, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  ladder = this.physics.add.staticGroup();
  ladder.create(200, 400, "ladder");

  player = this.physics.add.sprite(250, 50, "player");
  this.physics.world.setBoundsCollision(false, false, false, true);
  player.setCollideWorldBounds(true);

  // collisions
  //this.physics.add.overlap(player, ladder, onLadder, null, this);

  cursors = this.input.keyboard.createCursorKeys();
}

function onLadder(player, ladder) {
  overlapLadder=1;
}

climbing = false;
function update() {
  if (player.y > 500) player.y = 0;
  if (player.x > 800 + player.width) player.x = 0;
  
  overlapLadder= this.physics.overlap(player,ladder);
  textObj.setText(overlapLadder);
  if(!overlapLadder) 
  {
      climbing=false;
      player.setGravity(true);
      player.anims.play("right", true);
  }

  if (cursors.up.isDown) {
      if(overlapLadder)
      {
        player.anims.play("climb", true);
        player.setVelocityY(-200);
        player.setGravity(false);
        climbing = true;
      }
    player.setVelocityY(-200);
  }

  if(! climbing)
  {
  if (cursors.right.isDown) {
    player.setVelocityX(300);
    player.anims.play("right", true);
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-300);
  }
}

  if (!cursors.right.isDown && !cursors.left.isDown) player.setVelocityX(0);

 
}
