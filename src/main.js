// --- NOT WORKING ---
// - start/stop

// --- TO DO/IDEAS ---
//  - implement initial conditions
//    - black holes
//  - area of visibility

// --- GET CANVAS PROPERTIES ---
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

// --- SET GAME PROPERTIES ---
let resolution = 20; // size of one cell
let radius = resolution;
let cols = width / resolution;
let rows = height / resolution;

let populationDensity = 0.06;
let maxAge = false;

let running = false;

// --- INITIALISE GAME ---
let health = new GameOfLife(rows, cols, populationDensity, "health", maxAge);
health.setup();
let damage = new GameOfLife(rows, cols, populationDensity, "damage", maxAge);
damage.setup();
let blackHole = new GameOfLife(rows, cols, 0, "black hole");
blackHole.setupExploder(cols - 3 * resolution, rows - 3 * resolution);
let ball = new Ball(0, 0, 0, radius);

function checkCollision(object, game) {
  switch (game.type) {
    case "health":
      return health.grid[object.y][object.x].state === 1;
    case "damage":
      return damage.grid[object.y][object.x].state === 1;
    case "black hole":
      return blackHole.grid[object.y][object.x].state === 1;

    default:
      break;
  }
}

function updateEverything() {
  health.nextGeneration();
  damage.nextGeneration();
  blackHole.nextGeneration();
  ball.update();
  if (checkCollision(ball, health)) {
    console.log("collision!");
  }
}
function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  health.draw(ctx);
  damage.draw(ctx);
  blackHole.draw(ctx);
  ball.draw(ctx);
}
function animation() {
  updateEverything();
  drawEverything();
  window.requestAnimationFrame(animation);
}

// --- USER INTERFACE ---
window.onload = function() {
  drawEverything();

  document.querySelector(".btn-start").onclick = function() {
    console.log("START");
    running = true;
    animation();
    // if (running) animation();
    // else {
    //   updateEverything();
    //   drawEverything();
    // }
  };
  document.querySelector(".btn-stop").onclick = function() {
    console.log("STOP");
    running = false;
    // if (running) animation();
    // else {
    //   updateEverything();
    //   drawEverything();
    // }
  };

  // listen for key events
  document.onkeydown = function(e) {
    e.preventDefault(); // stop default behaviour (scrolling)
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 38: // up
        ball.speed += 1;
        break;
      case 40: // down
        ball.speed -= 1;
        break;
      case 37: // left
        ball.vAngle = -0.03;
        break;
      case 39: // right
        ball.vAngle = 0.03;
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
