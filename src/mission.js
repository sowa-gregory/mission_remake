var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 512,
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

function preload() {
  this.load.spritesheet("player", "res/soldier_small.png", {
    frameWidth: 200,
    frameHeight: 200,
    startFrame:0,
    endFrame:4
  });
}

function create() {
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  player = this.physics.add.sprite(250, 50, "player");
  this.physics.world.setBoundsCollision(false,false,false,true);
  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if(player.y>500) player.y=0;
    if(player.x>800+player.width) player.x=0;
    if (cursors.up.isDown)
        {
            player.setVelocityY(-330);
        }

        
        if (cursors.right.isDown)
        {
            player.setVelocityX(300);
            player.anims.play('right',true);
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-300);
        }

        if(!cursors.right.isDown && !cursors.left.isDown) player.setVelocityX(0);



}
