// --- TO DO/IDEAS ---
//  - add color gradient
//  - improve worlds
//  - add ball size to checkCollision
//  - mobile version
//  - implement area of visibility/just show frame around ball
//    - make it round
//  - implement shooting feature
//  - make black hole attract damage cells

/**************************** 
  --- GLOBAL VARIABLES ---
****************************/
// GET CANVAS PROPERTIES
let canvas = document.querySelector("#main");
let ctx = canvas.getContext("2d");

// GET CANVAS PROPERTIES FOR MODELS
let canvasBlackHole = document.querySelector("#black-hole");
let ctxBlackHole = canvasBlackHole.getContext("2d");
let canvasPortal = document.querySelector("#portal");
let ctxPortal = canvasPortal.getContext("2d");

let canvasItem1 = document.querySelector("#item1");
let ctxItem1 = canvasItem1.getContext("2d");
let canvasItem2 = document.querySelector("#item2");
let ctxItem2 = canvasItem2.getContext("2d");
let canvasItem3 = document.querySelector("#item3");
let ctxItem3 = canvasItem3.getContext("2d");
let canvasItem4 = document.querySelector("#item4");
let ctxItem4 = canvasItem4.getContext("2d");
let canvasItem5 = document.querySelector("#item5");
let ctxItem5 = canvasItem5.getContext("2d");

let $body = document.querySelector("body");

// let modelWidth = canvasPortal.width;
// let modelHeight = canvasPortal.height;
let modelWidth = 200;
let modelHeight = 200;

// let width = canvas.width;
// let height = canvas.height;
let width = 800;
let height = 1200;

// SET GAME PROPERTIES
let ratio = width / height;
// cols and rows are dependend in order to make pixels appear squared
let cols = 120;
let rows = cols / ratio;

let resolution = width / cols; // size of one cell ==> 6.66
const radius = 1.5 * resolution; // ==> 10
const MAX_RADIUS = 25;
const MAX_SPEED = 20;
let justAccelerated = false;

let populationDensity = 0.07;
const MAX_AGE = false;

// AUDIO
let backgroundMusicOn = true;
let niju;
let portalSqueeze;
let itemSound;
let gameOverSound;
let blackHoleBounce;
let blackHoleCloses;

// ANIMATION PROPERTIES
let static = false;

// GAME
let setIntervalUsed = false;
let requestAnimationFrameUsed = true;
let requestId;

// MODELS
let setIntervalUsedModels = true;
let requestAnimationFrameUsedModels = false;
let frameRate = 100;
let intervalId;

let justHitDamage;
let justHitHealth;
let justHitPortal;
let justHitBlackHole;
let justGameOver;
let level;
let itemsCollected;

let ball;

// MODELS
let blackHoleModel;
let portalModel;

let item1Model;
let item2Model;
let item3Model;
let item4Model;
let item5Model;

let models;

// MAIN WORLD
let damage;
let mainLandscape;

let mainWorld;

// WORLD1
let damage1;
let landscape1;
let item1;

let world1;

// WORLD2
let damage2;
let landscape2;
let item2;

let world2;

// WORLD3
let damage3;
let landscape3;
let item3;

let world3;

// WORLD4
let damage4;
let landscape4;
let item4;

let world4;

// WORLD5
let damage5;
let landscape5;
let item5;

let world5;

/**************************** 
  --- INITIALISE GAME ---
****************************/
function initModels() {
  // MODELS
  blackHoleModel = new GameOfLife(30, 30, 0);
  blackHoleModel.setup("black hole", "dark blue", 0);
  blackHoleModel.setupExploder(12, 13, "black hole", "dark blue");
  portalModel = new GameOfLife(30, 30, 0);
  portalModel.setup("portal", "light blue", 0);
  portalModel.setupPortal(14, 11, "portal", "light blue", "vertical");

  item1Model = new GameOfLife(30, 30, 0);
  item1Model.setup("item", "pink", 0);
  item1Model.setupBlinker(6, 6, "item", "pink");
  item2Model = new GameOfLife(30, 30, 0);
  item2Model.setup("item", "pink", 0);
  item2Model.setupBeacon(5, 6, "item", "pink");
  item3Model = new GameOfLife(30, 30, 0);
  item3Model.setup("item", "pink", 0);
  item3Model.setupToad(6, 6, "item", "pink");
  item4Model = new GameOfLife(30, 30, 0);
  item4Model.setup("item", "pink", 0);
  item4Model.setupClock(6, 6, "item", "pink");
  item5Model = new GameOfLife(30, 30, 0);
  item5Model.setup("item", "pink", 0);
  item5Model.setupBipole(5, 5, "item", "pink");

  // load audio
  niju = new Audio("audio/zazou-anonbest_ticogo_niju-remix.mp3");
  niju.load();
  portalSqueeze = new Audio("audio/portal0.mp3");
  itemSound = new Audio("audio/item2.mp3");
  gameOverSound = new Audio("audio/gameOver.mp3");
  blackHoleBounce = new Audio("audio/blackHole-bounce.mp3");
  blackHoleCloses = new Audio("audio/blackHole-closes.mp3");

  models = [
    blackHoleModel,
    portalModel,
    item1Model,
    item2Model,
    item3Model,
    item4Model,
    item5Model
  ];
}

function initNewGame() {
  justHitDamage = false;
  justHitHealth = false;
  justHitPortal = false;
  justHitBlackHole = false;
  justGameOver = false;
  level = 0;
  itemsCollected = 0;

  ball = new Ball(300, 300, 0, radius);
  // MAIN WORLD
  damage = new GameOfLife(rows, cols, MAX_AGE);
  damage.setup("damage", "red", 0.8 * populationDensity);
  mainLandscape = new GameOfLife(rows, cols, MAX_AGE);
  mainLandscape.setup("health", "yellow", 1.2 * populationDensity);
  mainLandscape.setupExploder(100, 160, "black hole", "dark blue");
  mainLandscape.setupPortal(20, 120, "portal1", "light blue", "horizontal");
  mainLandscape.setupPortal(100, 60, "portal2", "light blue", "vertical");
  mainLandscape.setupPortal(90, 10, "portal3", "light blue", "horizontal");
  mainLandscape.setupPortal(10, 10, "portal4", "light blue", "vertical");
  mainLandscape.setupPortal(60, 90, "portal5", "light blue", "horizontal");

  mainWorld = [0, "limited", ball, damage, mainLandscape];

  // WORLD1
  damage1 = new GameOfLife(rows, cols);
  damage1.setup("damage", "red", 1 * populationDensity);
  landscape1 = new GameOfLife(rows, cols);
  landscape1.setup("health", "silver", 0.6 * populationDensity);
  landscape1.setupPortal(20, 120, "portal1", "light blue", "horizontal");
  item1 = new GameOfLife(rows, cols);
  item1.setup("item", "pink", 0);
  item1.setupBlinker(100, 10, "item", "pink");

  world1 = [1, "full", ball, damage1, landscape1, item1];

  // WORLD2
  damage2 = new GameOfLife(rows, cols);
  damage2.setup("damage", "red", 1.1 * populationDensity);
  landscape2 = new GameOfLife(rows, cols);
  landscape2.setup("health", "blue", 0.7 * populationDensity);
  landscape2.setupPortal(100, 60, "portal2", "light blue", "vertical");
  item2 = new GameOfLife(rows, cols);
  item2.setup("item", "pink", 0);
  item2.setupBeacon(20, 120, "item", "pink");

  world2 = [2, "full", ball, damage2, landscape2, item2];

  // WORLD3
  damage3 = new GameOfLife(rows, cols);
  damage3.setup("damage", "red", 1.1 * populationDensity);
  landscape3 = new GameOfLife(rows, cols);
  landscape3.setup("health", "green", 0.9 * populationDensity);
  landscape3.setupPortal(90, 10, "portal3", "light blue", "horizontal");
  item3 = new GameOfLife(rows, cols);
  item3.setup("item", "pink", 0);
  item3.setupToad(30, 170, "item", "pink");

  world3 = [3, "full", ball, damage3, landscape3, item3];

  // WORLD4
  damage4 = new GameOfLife(rows, cols);
  damage4.setup("damage", "red", 0.5 * populationDensity);
  landscape4 = new GameOfLife(rows, cols);
  landscape4.setup("health", "yellow", 0.9 * populationDensity);
  landscape4.setupPortal(10, 10, "portal4", "light blue", "vertical");
  item4 = new GameOfLife(rows, cols);
  item4.setup("item", "pink", 0);
  item4.setupClock(90, 170, "item", "pink");

  world4 = [4, "narrow", ball, damage4, landscape4, item4];

  // WORLD5
  damage5 = new GameOfLife(rows, cols);
  damage5.setup("damage", "red", 1.1 * populationDensity);
  landscape5 = new GameOfLife(rows, cols);
  landscape5.setup("health", "orange", 0.9 * populationDensity);
  landscape5.setupPortal(60, 90, "portal5", "light blue", "horizontal");
  item5 = new GameOfLife(rows, cols);
  item5.setup("item", "pink", 0);
  item5.setupBipole(10, 10, "item", "pink");

  world5 = [5, "full", ball, damage5, landscape5, item5];
}

/**************************** 
  --- UPDATE & DRAWING ---
****************************/
function updateEverything(world) {
  // update ball
  if (!gameOver(ball)) {
    world[2].update();

    // update everything else
    for (let i = 3; i < world.length; i++) {
      world[i].update();

      // do collision check
      if (
        checkCollision(world[2], world[i])[0] &&
        checkCollision(world[2], world[i])[1].includes("damage") &&
        !justHitDamage
      ) {
        // console.log("checkCollision called DAMAGE");
        justHitDamage = true;
        if (!gameOver(ball)) {
          ball.radius *= 0.9;
          ball.speed *= 0.9;
        }
        setTimeout(() => (justHitDamage = false), 100);
      }

      if (
        checkCollision(world[2], world[i])[0] &&
        checkCollision(world[2], world[i])[1].includes("health") &&
        !justHitHealth
      ) {
        // console.log("checkCollision called HEALTH");
        justHitHealth = true;
        if (gainHealth(ball, radius) && gainSpeed(ball)) {
          ball.radius *= 1.1;
          ball.speed *= 1.1;
        }
        setTimeout(() => (justHitHealth = false), 2000);
      } else if (
        checkCollision(world[2], world[i])[0] &&
        checkCollision(world[2], world[i])[1].includes("portal") &&
        !justHitPortal
      ) {
        // console.log("checkCollision called PORTAL");
        justHitPortal = true;
        portalSqueeze.play();
        let portal = checkCollision(world[2], world[i])[1];
        switch (portal) {
          case "portal1":
            level = 1;
            document.querySelector("#black-hole").classList.toggle("highlighted");
            document.querySelector(".item1").classList.toggle("highlighted");
            break;
          case "portal2":
            level = 2;
            document.querySelector("#black-hole").classList.toggle("highlighted");
            document.querySelector(".item2").classList.toggle("highlighted");
            break;
          case "portal3":
            level = 3;
            document.querySelector("#black-hole").classList.toggle("highlighted");
            document.querySelector(".item3").classList.toggle("highlighted");
            break;
          case "portal4":
            level = 4;
            document.querySelector("#black-hole").classList.toggle("highlighted");
            document.querySelector(".item4").classList.toggle("highlighted");
            break;
          case "portal5":
            document.querySelector("#black-hole").classList.toggle("highlighted");
            document.querySelector(".item5").classList.toggle("highlighted");
            level = 5;
            break;
        }
        if (world !== mainWorld) level = 0;
        start();
        setTimeout(() => (justHitPortal = false), 2000);
      } else if (
        checkCollision(world[2], world[i])[0] &&
        checkCollision(world[2], world[i])[1].includes("black hole") &&
        !justHitBlackHole
      ) {
        // console.log("checkCollision called BLACK HOLE");
        justHitBlackHole = true;
        if (itemsCollected === 5) {
          gameWin();
        } else {
          blackHoleBounce.play();
          ball.speed *= -0.2;
        }
        setTimeout(() => (justHitBlackHole = false), 500);
      } else if (
        checkCollision(world[2], world[i])[0] &&
        checkCollision(world[2], world[i])[1].includes("item")
      ) {
        // console.log("checkCollision called ITEM");
        itemSound.play();
        switch (world[i]) {
          case item1:
            document.querySelector(".item1").classList.add("collected");
            break;
          case item2:
            document.querySelector(".item2").classList.add("collected");
            break;
          case item3:
            document.querySelector(".item3").classList.add("collected");
            break;
          case item4:
            document.querySelector(".item4").classList.add("collected");
            break;
          case item5:
            document.querySelector(".item5").classList.add("collected");
            break;
        }
        ball.speed *= -1;
        world.pop();
        itemsCollected++;
      }
    }
  }
  // else {
  //   stop();
  // }
}
function drawEverything(world) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  // draw everything except ball
  for (let i = 3; i < world.length; i++) {
    switch (world[1]) {
      case "limited":
        world[i].drawLimitedSight(ctx, ball);
        break;
      case "narrow":
        world[i].drawLimitedSightNarrow(ctx, ball);
        break;

      default:
        world[i].draw(ctx);
        break;
    }
  }

  // draw ball
  world[2].draw(ctx);
}

function updateModels() {
  for (let i = 0; i < models.length; i++) {
    models[i].update();
  }
}
function drawModels() {
  ctxBlackHole.clearRect(0, 0, modelWidth, modelHeight);
  ctxBlackHole.fillStyle = "rgb(0, 0, 0)";
  ctxBlackHole.fillRect(0, 0, modelWidth, modelHeight);
  ctxPortal.clearRect(0, 0, modelWidth, modelHeight);
  ctxPortal.fillStyle = "rgb(0, 0, 0)";
  ctxPortal.fillRect(0, 0, modelWidth, modelHeight);

  ctxItem1.clearRect(0, 0, modelWidth, modelHeight);
  ctxItem1.fillStyle = "rgb(0, 0, 0)";
  ctxItem1.fillRect(0, 0, modelWidth, modelHeight);
  ctxItem2.clearRect(0, 0, modelWidth, modelHeight);
  ctxItem2.fillStyle = "rgb(0, 0, 0)";
  ctxItem2.fillRect(0, 0, modelWidth, modelHeight);
  ctxItem3.clearRect(0, 0, modelWidth, modelHeight);
  ctxItem3.fillStyle = "rgb(0, 0, 0)";
  ctxItem3.fillRect(0, 0, modelWidth, modelHeight);
  ctxItem4.clearRect(0, 0, modelWidth, modelHeight);
  ctxItem4.fillStyle = "rgb(0, 0, 0)";
  ctxItem4.fillRect(0, 0, modelWidth, modelHeight);
  ctxItem5.clearRect(0, 0, modelWidth, modelHeight);
  ctxItem5.fillStyle = "rgb(0, 0, 0)";
  ctxItem5.fillRect(0, 0, modelWidth, modelHeight);

  models[0].draw(ctxBlackHole);
  models[1].draw(ctxPortal);
  models[2].draw(ctxItem1);
  models[3].draw(ctxItem2);
  models[4].draw(ctxItem3);
  models[5].draw(ctxItem4);
  models[6].draw(ctxItem5);
}

/**************************** 
  --- ANIMATION & STOP ---
****************************/
function animation() {
  if (setIntervalUsed) {
    switch (level) {
      case 0:
        updateEverything(mainWorld);
        drawEverything(mainWorld);
        break;
      case 1:
        updateEverything(world1);
        drawEverything(world1);
        break;
      case 2:
        updateEverything(world2);
        drawEverything(world2);
        break;
      case 3:
        updateEverything(world3);
        drawEverything(world3);
        break;
      case 4:
        updateEverything(world4);
        drawEverything(world4);
        break;
      case 5:
        updateEverything(world5);
        drawEverything(world5);
        break;
    }
  }
  if (requestAnimationFrameUsed) {
    requestId = undefined;
    switch (level) {
      case 0:
        updateEverything(mainWorld);
        drawEverything(mainWorld);
        break;
      case 1:
        updateEverything(world1);
        drawEverything(world1);
        break;
      case 2:
        updateEverything(world2);
        drawEverything(world2);
        break;
      case 3:
        updateEverything(world3);
        drawEverything(world3);
        break;
      case 4:
        updateEverything(world4);
        drawEverything(world4);
        break;
      case 5:
        updateEverything(world5);
        drawEverything(world5);
        break;
    }
    start();
  }
}
function start() {
  if (setIntervalUsed) {
    intervalId = setInterval(animation, frameRate);
  }
  if (requestAnimationFrameUsed) {
    if (!requestId) {
      requestId = window.requestAnimationFrame(animation);
    }
  }
}
function stop() {
  if (setIntervalUsed) {
    console.log("STOP setIntervall called");
    clearInterval(intervalId);
  }
  if (requestAnimationFrameUsed) {
    if (requestId) {
      console.log("STOP requestAnimationFrame called");
      window.cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  }
}

function animateModels() {
  if (setIntervalUsedModels) {
    updateModels();
    drawModels();
  }
  if (requestAnimationFrameUsedModels) {
    updateModels();
    drawModels();
    startModels();
  }
}
function startModels() {
  if (setIntervalUsedModels) {
    setInterval(animateModels, frameRate);
  }
  if (requestAnimationFrameUsedModels) {
    window.requestAnimationFrame(animateModels);
  }
}

/**************************** 
  --- USER INTERFACE ---
****************************/
// PAGE ROUTING
function displayPage(selectedPage) {
  // Save all the tags with the attribute `data-page` in $pages
  var $pages = document.querySelectorAll("[data-page]");
  for (var i = 0; i < $pages.length; i++) {
    // If the current page as the attribute data-page equals to the selectedPage
    if ($pages[i].getAttribute("data-page") === selectedPage) {
      if ($pages[i].getAttribute("data-page") === "play" && backgroundMusicOn) {
        niju.play();
      }
      $pages[i].style.display = ""; // display the current page
    } else {
      $pages[i].style.display = "none"; // hide the current page
    }
  }
}

function initRouting() {
  // First, display only the page "home", the default page
  displayPage("rules");

  // Listen for click events on buttons (or any other elements) to change the page
  var $buttons = document.querySelectorAll("[data-target]");
  for (var i = 0; i < $buttons.length; i++) {
    $buttons[i].onclick = function(e) {
      e.preventDefault(); // stop the default behaviour (usefull for <a>)
      var target = this.getAttribute("data-target");
      displayPage(target);
    };
  }
}

initRouting();

// USER INTERACTION
window.onload = function() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  if (!static) {
    initModels();
    startModels();
    initNewGame();
  }
  document.querySelector("#pause-play").style.display = "none";

  document.querySelector("#start-restart").onclick = function() {
    // console.log("START");
    if (this.innerHTML === "START") {
      this.innerHTML = "RESTART";
      document.querySelector("#pause-play").style.display = "inline";
      // $body.requestFullscreen();
      start();
    } else if (this.innerHTML === "RESTART") {
      document.querySelector("#pause-play").innerHTML = "PAUSE";
      restart();
      start();
    }
  };
  document.querySelector("#pause-play").onclick = function() {
    // console.log("STOP");
    if (this.innerHTML === "PAUSE") {
      this.innerHTML = "PLAY";
      stop();
    } else if (this.innerHTML === "PLAY") {
      this.innerHTML = "PAUSE";
      start();
    }
  };

  // listen for key events
  document.onkeydown = function(e) {
    e.preventDefault(); // stop default behaviour (scrolling)
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 13: // enter
        // start();
        break;
      case 38: // up
        if (gainSpeed(ball) && !justAccelerated) {
          justAccelerated = true;
          ball.speed += 1;
        }
        break;
      case 40: // down
        if (gainSpeed(ball) && !justAccelerated) {
          justAccelerated = true;
          ball.speed -= 1;
        }
        break;
      case 37: // left
        ball.vAngle = -0.07;
        break;
      case 39: // right
        ball.vAngle = 0.07;
        break;
    }
  };
  document.onkeyup = function(e) {
    switch (e.keyCode) {
      case 38: // left
      case 40: // right
        justAccelerated = false;
        break;
      case 37: // left
      case 39: // right
        ball.vAngle = 0;
        break;
    }
  };
};
