  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");

  var tankImage = new Image();
  tankImage.src = "img/abrams.png";

  var lewo = document.getElementById("left");
  var prawo = document.getElementById("r");
  var strzał = document.getElementById("s");

  var shotSound = new Audio("audio/shot.mp3");
  var abramsSound = new Audio("audio/abramsSound.mp3");
  var engineSound = new Audio("audio/engineSound.mp3");

  // var tankImageFlame = new Image();
  // tankImageFlame.src = "img/abramsflame.png"

  var flameImg = new Image();
  flameImg.src = "img/1.png"

  var bgImg = new Image();
  bgImg.src = "img/bgimg.jpg";

  var tank = {
    x: 400,
    y: 150,
    width: 608,
    height: 456,
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

  var snowflakes = []; 
  function createSnowflake() {
    var snowflake = {
      x: Math.random() * canvas.width, 
      y: 0, 
      speed: 1 + Math.random(), 
      radius: 1 + Math.random() * 2, 
    };
    snowflakes.push(snowflake); 
  }

  for (var i = 0; i < 200; i++) {
    createSnowflake(); 
  }

  function updateSnowflakes() {
    for (var i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];
      snowflake.y += snowflake.speed; 
      if (snowflake.y > canvas.height) {
        snowflake.y = 0; 
      }
    }
  }

  function drawSnowflakes() {
    ctx.fillStyle = "white";
    for (var i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 1.5);
      ctx.fill();
    }
  }

  function draw() {
    ctx.drawImage(bgImg, bg.x, bg.y, bg.width, bg.height);
    ctx.drawImage(tankImage, tank.x, tank.y, tank.width, tank.height);
    if(keys.space){
      ctx.drawImage(flameImg, tank.x + 400, tank.y, flame.width, flame.height);
      shotSound.currentTime = 0;
      shotSound.play();
    }
  }

  function playEngineSound() {
    if (abramsSound.paused) {
      abramsSound.currentTime = 0;
      abramsSound.play();
    }
  }

  function stopEngineSound() {
    abramsSound.pause();
    abramsSound.currentTime = 0;
  }

  function playEngineSoundMain(){
    if(engineSound.paused){
      engineSound.currentTime = 0;
      engineSound.play();
    }
  }

  function stopEngineSoundMain() {
    engineSound.pause();
    engineSound.currentTime = 0;
  }


  function update(){
    if (keys.left && tank.x >= 0) {
      tank.x -= tank.speed;
      playEngineSound();
      stopEngineSoundMain();
    } else if (keys.right && tank.x <= 575) {
      tank.x += tank.speed;
      playEngineSound();
      stopEngineSoundMain();
    }else{
          stopEngineSound();
    }
  }

  function gameLoop() {
    update();
    updateSnowflakes();
    draw();
    drawSnowflakes();
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
    stopEngineSound();
    playEngineSoundMain();
  });

  lewo.addEventListener("mousedown", function(){
    keys.left = true;
    stopEngineSound();
  });

  lewo.addEventListener("mouseup", function(){
    keys.left = false;
    playEngineSoundMain();
  })

  prawo.addEventListener("mousedown", function(){
    keys.right = true;
    stopEngineSound();
  })

  prawo.addEventListener("mouseup", function(){
    keys.right = false;
    playEngineSoundMain();
  })

  strzał.addEventListener("mousedown", function(){
    keys.space = true;
    stopEngineSound();
  })

  strzał.addEventListener("mouseup", function(){
    keys.space = false;
    playEngineSoundMain();
  })

  window.onload = function () {
    gameLoop();
  };

