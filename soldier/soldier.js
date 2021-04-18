let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let soldierImg = document.getElementById("soldier");

let pos = 200;
let keyRight = false;
let keyLeft = false;

document.addEventListener(
  "keydown",
  function (event) {
    if (event.key == "ArrowRight") {
      keyRight = true;
    }
    if (event.key == "ArrowLeft") {
      keyLeft = true;
    }
  },
  false
);

document.addEventListener(
  "keyup",
  function (event) {
    if (event.key == "ArrowRight" || event.key == "ArrowLeft")
      keyLeft = keyRight = false;
  },
  false
);

function drawSprite(image, index, x, y) {
  WIDTH = 200;
  HEIGHT = 200;

  horizFrames = image.width / WIDTH;

  srcYPos = Math.floor(index / horizFrames) * WIDTH;
  srcXPos = (index % horizFrames) * HEIGHT;
  ctx.drawImage(image, srcXPos, srcYPos, WIDTH, HEIGHT, x, y, WIDTH, HEIGHT);
}

frame = 0;
DELAY = 6;
delay = 0;
pos = 200;
walking = false;

function update() {
  if (delay > 0) delay--;

  if (!keyLeft && !keyRight) {
    walking = false;
    frame =0;
    return;
  }

  if (!walking) {
    frame = 71;
    delay = DELAY;
    walking = true;
    return;
  }

  if (keyRight) {
    pos += 3.5;
    if (delay == 0) {
      frame++;
      delay = DELAY;
      if (frame > 79) frame = 70;
    }
  }

  if (keyLeft) {
    pos -= 3.5;
    if (delay == 0) {
      frame--;
      delay = DELAY;

      if (frame < 70) frame = 79;
    }
  }
}

function render() {
  update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillText("frame: " + frame, 10, 50);
  drawSprite(soldierImg, frame, Math.floor(pos), 200);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
