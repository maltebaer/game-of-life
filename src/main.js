// --- NOT WORKING ---
//  - start/stop

// --- TO DO/IDEAS ---
//  - implement area of visibility/just show frame around ball
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

//
// --- GLOBAL VARIABLES ---
// ___ GET CANVAS PROPERTIES ___
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

//
// ___ SET GAME PROPERTIES ___
// canvas size: 800 x 1200 ==> ratio: 2 / 3
let ratio = width / height;
// cols and rows are dependend in order to make pixels appear squared
let cols = 120;
let rows = cols / ratio;

let resolution = width / cols; // size of one cell
let radius = 1.5 * resolution;

let populationDensity = 0.07;
let maxAge = false;

let intervalId;

//
// --- INITIALISE GAME ---
// ___ MAIN WORLD ___
let health = new GameOfLife(
  rows,
  cols,
  0.5 * populationDensity,
  "health",
  maxAge
);
health.setup();
let damage = new GameOfLife(rows, cols, populationDensity, "damage", maxAge);
damage.setup();
let blackHole = new GameOfLife(rows, cols, 0, "black hole");
blackHole.setupExploder(cols - cols / 5, rows - rows / 6);
let gliderGun = new GameOfLife(rows, cols, 0, "damage");
gliderGun.setupGilderGun(rows / 5, cols / 5);

let ball = new Ball(cols / 2, rows / 2, 0, radius);

//
// ___ WORLD1 ___
let portal1 = new GameOfLife(rows, cols, 0, "portal");
portal1.setupPortal(cols / 6, rows - rows / 3, "horizontal");
let health1 = new GameOfLife(rows, cols, populationDensity, "health", maxAge);
health1.setup();
let damage1 = new GameOfLife(
  rows,
  cols,
  0.1 * populationDensity,
  "damage",
  maxAge
);
damage1.setup();

// let portal2 = new GameOfLife(rows, cols, 0, "portal");
// portal2.setupPortal(cols - 10 * resolution, rows - 40 * resolution, "vertical");

//
// --- GAME LOGIC AND DRAWING ---
// ___ MAIN WORLD ___
function updateEverything() {
  // update game of life objects
  health.nextGeneration();
  damage.nextGeneration();
  blackHole.nextGeneration();
  portal1.nextGeneration();
  gliderGun.nextGeneration();

  // update ball
  ball.update();

  // check for collision
  if (checkCollision(ball, health)) {
    console.log("checkCollision called HEALTH");
    if (ball.radius < 2.5 * radius) {
      ball.radius *= 1.1;
      ball.speed *= 1.1;
    }
  }
  if (checkCollision(ball, damage)) {
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
  if (checkCollision(ball, gliderGun)) {
    console.log("checkCollision called GLIDER GUN");
    if (!gameOver(ball, radius)) {
      ball.radius *= 0.9;
      ball.speed *= 0.9;
    } else {
      ball.radius = 0;
      ball.speed = 0;
      stop();
    }
  }
  if (checkCollision(ball, blackHole)) {
    console.log("checkCollision called BLACK HOLE");
    ball.radius = 0;
    ball.speed = 0;
    stop();
  }
  if (checkCollision(ball, portal1)) {
    console.log("checkCollision called PORTAL1");
    // ball.radius = 0;
    // ball.speed = 0;
    stop();
    intervalId = setInterval(animation1, 1000 / 60);
  }
}

function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  health.draw(ctx);
  damage.draw(ctx);
  blackHole.draw(ctx);
  portal1.draw(ctx);
  gliderGun.draw(ctx);

  ball.draw(ctx);
}
function animation() {
  updateEverything();
  drawEverything();
}
function stop() {
  clearInterval(intervalId);
}

//
// ___ WORLD1 ___
function updateEverything1() {
  // update game of life objects
  health1.nextGeneration();
  damage1.nextGeneration();
  portal1.nextGeneration();

  // update ball
  ball.update();

  // check for collision
  if (checkCollision(ball, health1)) {
    console.log("checkCollision called HEALTH");
    if (ball.radius < 3 * radius) {
      ball.radius *= 1.1;
      ball.speed *= 1.1;
    }
  }
  if (checkCollision(ball, damage1)) {
    console.log("checkCollision called DAMAGE");
    if (ball.radius > (1 / 3) * radius) {
      ball.radius *= 0.9;
      ball.speed *= 0.9;
    } else {
      ball.radius = 0;
      ball.speed = 0;
    }
  }
  if (checkCollision(ball, portal1)) {
    console.log("checkCollision called PORTAL1");
    ball.radius = 0;
    ball.speed = 0;
  }
}
function drawEverything1() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  health1.draw(ctx);
  damage1.draw(ctx);
  portal1.draw(ctx);

  ball.draw(ctx);
}

function animation1() {
  updateEverything1();
  drawEverything1();
}

//
// --- USER INTERFACE ---
window.onload = function() {
  drawEverything();

  document.querySelector(".btn-start").onclick = function() {
    console.log("START");
    intervalId = setInterval(animation, 1000 / 60);
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
