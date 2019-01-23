// --- TO DO/IDEAS ---
//  - add restart
//  - add explanation
//  - add little games
//  - add music
//  - add pixel frame
//  - add color gradient
//  - make variables const
//  - mobile version
//  - implement area of visibility/just show frame around ball
//    - make it round
//  - implement more worlds
//  - make ball pixely
//  - implement shooting feature
//  - make black hole attract damage cells
//  - make black hole erase all cells
//  - implement initial conditions
//    - patterns to collect in the other worlds

//
// --- GLOBAL VARIABLES ---
// ___ GET CANVAS PROPERTIES ___
let canvas = document.querySelector("#main");
let ctx = canvas.getContext("2d");

// ___ GET CANVAS PROTPERTIES FOR MODELS ___
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

// let modelWidth = canvasPortal.width;
// let modelHeight = canvasPortal.height;
let modelWidth = 200;
let modelHeight = 200;

// let width = canvas.width;
// let height = canvas.height;
let width = 800;
let height = 1200;

//
// ___ SET GAME PROPERTIES ___
// // canvas size: 800 x 1200 ==> ratio: 2 / 3
let ratio = width / height;
// cols and rows are dependend in order to make pixels appear squared
let cols = 120;
let rows = cols / ratio;

let resolution = width / cols; // size of one cell ==> 6.66
let radius = 1.5 * resolution; // ==> 10

let populationDensity = 0.07;
let maxAge = false;

let intervalId;
let level = 0;
let justHitPortal = false;
let justHitBlackHole = false;
let itemsCollected = 0;

let ball;

// ___ MODELS ___
let blackHoleModel;
let portalModel;

let item1Model;
let item2Model;
let item3Model;
let item4Model;
let item5Model;

let models;

// ___ MAIN WORLD ___
let health;
let damage;
let gliderGun;
let blackHole;
let portal1;
let portal2;

let mainWorld;

// ___ WORLD1 ___
let health1;
let damage1;
let item1;

let world1;

// ___ WORLD2 ___
let health2;
let damage2;
let item2;

let world2;

//
// --- INITIALISE GAME ---
function initModels() {
  //
  // ___ MODELS ___
  blackHoleModel = new GameOfLife(30, 30, 0, "black hole", "dark blue");
  blackHoleModel.setupExploder(12, 13);
  portalModel = new GameOfLife(30, 30, 0, "portal", "light blue");
  portalModel.setupPortal(14, 11, "vertical");

  item1Model = new GameOfLife(30, 30, 0, "item", "pink");
  item1Model.setupBlinker(6, 6);
  item2Model = new GameOfLife(30, 30, 0, "item", "pink");
  item2Model.setupBeacon(5, 6);
  item3Model = new GameOfLife(30, 30, 0, "item", "pink");
  item3Model.setupToad(6, 6);
  item4Model = new GameOfLife(30, 30, 0, "item", "pink");
  item4Model.setupClock(6, 6);
  item5Model = new GameOfLife(30, 30, 0, "item", "pink");
  item5Model.setupBipole(5, 5);

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

function newGame() {
  ball = new Ball(300, 300, 0, radius);

  // ___ MAIN WORLD ___
  health = new GameOfLife(rows, cols, 0.6 * populationDensity, "health", "yellow", maxAge);
  health.setup();
  damage = new GameOfLife(rows, cols, 0.8 * populationDensity, "damage", "red", maxAge);
  damage.setup();
  gliderGun = new GameOfLife(rows, cols, 0, "damage", "red");
  gliderGun.setupGilderGun(rows / 5, cols / 5);
  blackHole = new GameOfLife(rows, cols, 0, "black hole", "dark blue");
  blackHole.setupExploder(cols - cols / 5, rows - rows / 6);
  portal1 = new GameOfLife(rows, cols, 0, "portal", "light blue");
  portal1.setupPortal(cols / 6, rows - rows / 3, "horizontal");
  portal2 = new GameOfLife(rows, cols, 0, "portal", "light blue");
  portal2.setupPortal(cols - cols / 6, rows / 3, "vertical");
  portal3 = new GameOfLife(rows, cols, 0, "portal", "light blue");
  portal3.setupPortal(90, 10, "horizontal");
  portal4 = new GameOfLife(rows, cols, 0, "portal", "light blue");
  portal4.setupPortal(10, 10, "vertical");
  portal5 = new GameOfLife(rows, cols, 0, "portal", "light blue");
  portal5.setupPortal(60, 90, "vertical");

  mainWorld = [
    0,
    "limited",
    ball,
    health,
    damage,
    gliderGun,
    portal1,
    portal2,
    portal3,
    portal4,
    portal5,
    blackHole
  ];

  //
  // ___ WORLD1 ___
  health1 = new GameOfLife(rows, cols, 0.6 * populationDensity, "health", "green", maxAge);
  health1.setup();
  damage1 = new GameOfLife(rows, cols, 1 * populationDensity, "damage", "red", maxAge);
  damage1.setup();
  item1 = new GameOfLife(rows, cols, 0, "item", "pink");
  item1.setupBlinker(100, 10);

  world1 = [1, "full", ball, health1, damage1, portal1, item1];

  //
  // ___ WORLD2 ___
  health2 = new GameOfLife(rows, cols, 0.9 * populationDensity, "health", "green", maxAge);
  health2.setup();
  damage2 = new GameOfLife(rows, cols, 1.1 * populationDensity, "damage", "red", maxAge);
  damage2.setup();
  item2 = new GameOfLife(rows, cols, 0, "item", "pink");
  item2.setupBeacon(20, 120);

  world2 = [2, "full", ball, health2, damage2, portal2, item2];

  //
  // ___ WORLD3 ___
  health3 = new GameOfLife(rows, cols, 0.9 * populationDensity, "health", "dark blue", maxAge);
  health3.setup();
  damage3 = new GameOfLife(rows, cols, 1.1 * populationDensity, "damage", "red", maxAge);
  damage3.setup();
  item3 = new GameOfLife(rows, cols, 0, "item", "pink");
  item3.setupToad(90, 170);

  world3 = [3, "full", ball, health3, damage3, portal3, item3];

  //
  // ___ WORLD4 ___
  health4 = new GameOfLife(rows, cols, 0.9 * populationDensity, "health", "dark blue", maxAge);
  health4.setup();
  damage4 = new GameOfLife(rows, cols, 1.1 * populationDensity, "damage", "red", maxAge);
  damage4.setup();
  item4 = new GameOfLife(rows, cols, 0, "item", "pink");
  item4.setupClock(90, 170);

  world4 = [4, "full", ball, health4, damage4, portal4, item4];

  //
  // ___ WORLD5 ___
  health5 = new GameOfLife(rows, cols, 0.9 * populationDensity, "health", "dark blue", maxAge);
  health5.setup();
  damage5 = new GameOfLife(rows, cols, 1.1 * populationDensity, "damage", "red", maxAge);
  damage5.setup();
  item5 = new GameOfLife(rows, cols, 0, "item", "pink");
  item5.setupBipole(10, 10);

  world5 = [5, "full", ball, health5, damage5, portal5, item5];
}
//
// --- GAME LOGIC AND DRAWING ---
// ___ MAIN WORLD ___

function updateEverything(world) {
  // update ball
  world[2].update();

  // update rest
  for (let i = 3; i < world.length; i++) {
    world[i].update();

    // do collision check
    if (checkCollision(world[2], world[i]) && world[i].type === "health") {
      // console.log("checkCollision called HEALTH");
      if (gainHealth(ball, radius)) {
        ball.radius *= 1.1;
        ball.speed *= 1.1;
      }
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "damage") {
      // console.log("checkCollision called DAMAGE");
      // if (!gameOver(ball, radius)) {
      //   ball.radius *= 0.9;
      //   ball.speed *= 0.9;
      // } else {
      //   ball.radius = 0;
      //   ball.speed = 0;
      //   stop();
      // }
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "black hole" && !justHitBlackHole) {
      // console.log("checkCollision called BLACK HOLE");
      justHitBlackHole = true;
      if (itemsCollected === 5) {
        ball.radius = 0;
        ball.speed = 0;
        mainWorld.splice(2, mainWorld.length - 3);
      } else {
        ball.speed *= -0.2;
      }
      setTimeout(() => (justHitBlackHole = false), 500);
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "item") {
      // console.log("checkCollision called ITEM");
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
    if (checkCollision(world[2], world[i]) && world[i].type === "portal" && !justHitPortal) {
      // console.log("checkCollision called PORTAL");
      justHitPortal = true;
      switch (world[i]) {
        case portal1:
          level = 1;
          document.querySelector("#black-hole").classList.toggle("highlighted");
          document.querySelector(".item1").classList.toggle("highlighted");
          break;
          case portal2:
          level = 2;
          document.querySelector("#black-hole").classList.toggle("highlighted");
          document.querySelector(".item2").classList.toggle("highlighted");
          break;
          case portal3:
          level = 3;
          document.querySelector("#black-hole").classList.toggle("highlighted");
          document.querySelector(".item3").classList.toggle("highlighted");
          break;
          case portal4:
          level = 4;
          document.querySelector("#black-hole").classList.toggle("highlighted");
          document.querySelector(".item4").classList.toggle("highlighted");
          break;
          case portal5:
          document.querySelector("#black-hole").classList.toggle("highlighted");
          document.querySelector(".item5").classList.toggle("highlighted");
          level = 5;
          break;
      }
      // stop();
      if (world !== mainWorld) level = 0;
      intervalId = setInterval(animation, 1000 / 60);
      setTimeout(() => (justHitPortal = false), 2000);
    }
  }
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

      default:
        world[i].draw(ctx);
        break;
    }
  }

  // draw ball
  world[2].draw(ctx);
}
function animation() {
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

    default:
      break;
  }
}
function stop() {
  clearInterval(intervalId);
}

function updateModels() {
  // update models
  for (let i = 0; i < models.length; i++) {
    models[i].update();
  }
}
function drawModels() {
  // draw models
  ctxBlackHole.clearRect(0, 0, modelWidth, modelHeight);
  ctxBlackHole.fillStyle = "rgb(0, 0, 0)";
  ctxBlackHole.fillRect(0, 0, modelWidth, modelHeight);
  ctxPortal.clearRect(0, 0, modelWidth, modelHeight);
  ctxPortal.fillStyle = "rgb(0, 0, 0)";
  ctxPortal.fillRect(0, 0, modelWidth, modelHeight);
  //
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
function animateModels() {
  updateModels();
  drawModels();
}

//
// --- USER INTERFACE ---
window.onload = function() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  initModels();
  // updateModels();
  // drawModels();
  setInterval(animateModels, 100);
  // level = 5;
  // newGame();
  // intervalId = setInterval(animation, 100);

  document.querySelector(".btn-start").onclick = function() {
    // console.log("START");
    newGame();
    intervalId = setInterval(animation, 100);
  };
  document.querySelector(".btn-stop").onclick = function() {
    // console.log("STOP");
    stop();
  };
  document.querySelector(".btn-restart").onclick = function() {
    // console.log("RESTART");
    level = 0;
    newGame();
    intervalId = setInterval(animation, 100);
  };

  // listen for key events
  document.onkeydown = function(e) {
    e.preventDefault(); // stop default behaviour (scrolling)
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 13: // enter
        newGame();
        intervalId = setInterval(animation, 100);
        break;
      case 38: // up
        ball.speed += 1;
        break;
      case 40: // down
        ball.speed -= 1;
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
      case 37: // left
      case 39: // right
        ball.vAngle = 0;
        break;
    }
  };
};
