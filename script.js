var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var tankImage = new Image();
tankImage.src = "img/abrams.png";

// var tankImageFlame = new Image();
// tankImageFlame.src = "img/abramsflame.png"

var flameImg = new Image();
flameImg.src = "img/1.png"

var bgImg = new Image();
bgImg.src = "img/bgimg.jpg";

var tank = {
  x: 400,
  y: 200,
  width: 635,
  height: 393,
  speed: 5,
};

var flame = {
  x: 0,
  y: 0,
  width: 666,
  height: 375,
  isVisible: false,
}

var bg = {
  x: 0,
  y: 0,
  width: 1200,
  height: 600,
};

function draw() {
  ctx.drawImage(bgImg, bg.x, bg.y, bg.width, bg.height);
  ctx.drawImage(tankImage, tank.x, tank.y, tank.width, tank.height);
  if(keys.space){
    ctx.drawImage(flameImg, tank.x + 400, tank.y, flame.width, flame.height);
  }
}


function update() {
  if (keys.left && tank.x >= 0) {
    tank.x -= tank.speed;
  } else if (keys.right && tank.x <= 575) {
    tank.x += tank.speed;
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

var keys = {
  left: false,
  right: false,
  space: false,
};

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowLeft") keys.left = true;
  if (e.code === "ArrowRight") keys.right = true;
  if (e.code === "Space") keys.space = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowLeft") keys.left = false;
  if (e.code === "ArrowRight") keys.right = false;
  if (e.code === "Space") keys.space = false;
});

window.onload = function () {
  gameLoop();
};

