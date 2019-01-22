// --- NOT WORKING ---
//  - start/stop

// --- TO DO/IDEAS ---
//  - implement area of visibility/just show frame around ball
//    - make it round
//  - make black hole attract damage cells
//  - make black hole erase all cells
//  - implement more worlds
//  - implement shooting feature
//  - implement initial conditions
//    - black holes
//    - glider gun
//    - other patterns to collect in the other worlds
//  - make ball pixely
//  - add music
//  - add pixel frame
//  - make variables const

//
// --- GLOBAL VARIABLES ---
// ___ GET CANVAS PROPERTIES ___
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

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

let resolution = width / cols; // size of one cell
let radius = 1.5 * resolution;

let populationDensity = 0.07;
let maxAge = false;

let intervalId;

let level = 0;

//
// --- INITIALISE GAME ---
let ball = new Ball(300, 300, 0, radius);

// ___ MAIN WORLD ___
let health = new GameOfLife(rows, cols, 0.6 * populationDensity, "health", "yellow", maxAge);
health.setup();
let damage = new GameOfLife(rows, cols, populationDensity, "damage", "red", maxAge);
damage.setup();
let gliderGun = new GameOfLife(rows, cols, 0, "damage", "red");
gliderGun.setupGilderGun(rows / 5, cols / 5);
let blackHole = new GameOfLife(rows, cols, 0, "black hole", "dark blue");
blackHole.setupExploder(cols - cols / 5, rows - rows / 6);
let portal = new GameOfLife(rows, cols, 0, "portal", "light blue");
portal.setupPortal(cols / 6, rows - rows / 3, "horizontal");

let mainWorld = [0, "limited", ball, health, damage, blackHole, gliderGun, portal];

//
// ___ WORLD1 ___
let health1 = new GameOfLife(rows, cols, 0.6 * populationDensity, "health", "green", maxAge);
health1.setup();
let damage1 = new GameOfLife(rows, cols, 1.2 * populationDensity, "damage", "red", maxAge);
damage1.setup();
// let portal1 = new GameOfLife(rows, cols, 0, "portal");
// portal1.setupPortal(cols / 6, rows - rows / 3, "horizontal");

let world1 = [1, "full", ball, health1, damage1, portal];

// let portal2 = new GameOfLife(rows, cols, 0, "portal");
// portal2.setupPortal(cols - 10 * resolution, rows - 40 * resolution, "vertical");

//
// --- GAME LOGIC AND DRAWING ---
// ___ MAIN WORLD ___
function updateEverything(world) {
  world[2].update();
  for (let i = 3; i < world.length; i++) {
    world[i].update();
    if (checkCollision(world[2], world[i]) && world[i].type === "health") {
      console.log("checkCollision called HEALTH");
      if (gainHealth(ball, radius)) {
        ball.radius *= 1.1;
        ball.speed *= 1.1;
      }
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "damage") {
      console.log("checkCollision called DAMAGE");
      if (!gameOver(ball, radius)) {
        ball.radius *= 0.9;
        ball.speed *= 0.9;
      } else {
        ball.radius = 0;
        ball.speed = 0;
        stop();
      }
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "black hole") {
      console.log("checkCollision called BLACK HOLE");
      ball.radius = 0;
      ball.speed = 0;
      stop();
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "portal") {
      console.log("checkCollision called PORTAL");
      stop();
      if (world !== mainWorld) level = 0
      level = 1;
      intervalId = setInterval(animation, 1000 / 60);
    }
  }
}

function drawEverything(world) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 3; i < world.length; i++) {
    if (world[1] === "limited") {
      world[i].drawLimitedSight(ctx, ball);
    } else {
      world[i].draw(ctx);
    }
  }

  world[2].draw(ctx);
}
function animation() {
  switch (level) {
    case 0:
      updateEverything(mainWorld);
      drawEverything(mainWorld, mainWorld[0]);
      break;
    case 1:
      updateEverything(world1);
      drawEverything(world1, world1[0]);
      break;

    default:
      break;
  }
}
function stop() {
  clearInterval(intervalId);
}

//
// --- USER INTERFACE ---
window.onload = function() {
  drawEverything(mainWorld);

  document.querySelector(".btn-start").onclick = function() {
    console.log("START");
    intervalId = setInterval(animation, 1000 / 30);
  };
  document.querySelector(".btn-stop").onclick = function() {
    console.log("STOP");
    stop();
  };

  // listen for key events
  document.onkeydown = function(e) {
    e.preventDefault(); // stop default behaviour (scrolling)
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 13: // enter
        intervalId = setInterval(animation, 1000 / 60);
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
